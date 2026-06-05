const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  AlignmentType,
} = require("docx");

const SRC = "lorem-ipsum-narrative-review.md";
const OUT = "lorem-ipsum-narrative-review.docx";
const lines = fs.readFileSync(SRC, "utf8").split(/\r?\n/);

// ---- inline parser: **bold**, *italic*, `code`, [text](url) ----
function parseInline(text, base = {}) {
  const runs = [];
  const pushText = (t, opts) => { if (t !== "") runs.push(new TextRun({ text: t, ...base, ...opts })); };
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) pushText(text.slice(last, m.index));
    if (m[1]) pushText(m[2], { bold: true });
    else if (m[3]) pushText(m[4], { italics: true });
    else if (m[5]) pushText(m[6], { font: "Courier New" });
    else if (m[7]) runs.push(new ExternalHyperlink({
      link: m[9], children: [new TextRun({ text: m[8], style: "Hyperlink", ...base })],
    }));
    last = re.lastIndex;
  }
  if (last < text.length) pushText(text.slice(last));
  return runs.length ? runs : [new TextRun({ text: "", ...base })];
}

const SINGLE = { line: 240, lineRule: "auto" };
const children = [];
let i = 0, titleDone = false, inAbstract = false, inRefs = false;

function isTableSep(s) { return /^\|?\s*:?-{2,}.*\|/.test(s) && s.includes("-"); }

function pushAuthorBlock() {
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 40, ...SINGLE },
    children: parseInline("[Author Name]¹*", { size: 24 }),
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 240, ...SINGLE },
    children: parseInline("¹ [Department / Faculty, Institution, City, Country]    * Corresponding author: [email]", { size: 20 }),
  }));
}

while (i < lines.length) {
  let line = lines[i];
  if (line.trim() === "") { i++; continue; }

  // horizontal rule -> skip (template has none)
  if (/^---+$/.test(line.trim())) { i++; continue; }

  // headings
  const h = line.match(/^(#{1,3})\s+(.*)$/);
  if (h) {
    const level = h[1].length, txt = h[2];
    inAbstract = false;
    if (level === 1 && !titleDone) {
      titleDone = true;
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 120, ...SINGLE },
        children: parseInline(txt, { bold: true, size: 32 }),
      }));
      pushAuthorBlock();
    } else if (/^Abstract$/i.test(txt.trim())) {
      inAbstract = true;
      children.push(new Paragraph({
        spacing: { before: 0, after: 40, ...SINGLE },
        children: parseInline(txt, { bold: true, size: 24 }),
      }));
    } else if (level === 2) {
      inRefs = /^references$/i.test(txt.trim());
      children.push(new Paragraph({
        spacing: { before: 240, after: 80, ...SINGLE },
        children: parseInline(txt, { bold: true, size: 26 }),
      }));
    } else { // level 3 subsection
      children.push(new Paragraph({
        spacing: { before: 160, after: 40, ...SINGLE },
        children: parseInline(txt, { bold: true, size: 24 }),
      }));
    }
    i++; continue;
  }

  // table block
  if (line.trim().startsWith("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
    const tblLines = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) { tblLines.push(lines[i]); i++; }
    const rows = tblLines.filter((l, idx) => idx !== 1)
      .map(l => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim()));
    const nCols = Math.max(...rows.map(r => r.length));
    const totalW = 9360, colW = Math.floor(totalW / nCols);
    const colWidths = Array(nCols).fill(colW);
    colWidths[nCols - 1] += totalW - colW * nCols;
    const line1 = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
    const lineL = { style: BorderStyle.SINGLE, size: 2, color: "BFBFBF" };
    const tableRows = rows.map((cells, rIdx) =>
      new TableRow({
        tableHeader: rIdx === 0,
        children: Array.from({ length: nCols }, (_, c) =>
          new TableCell({
            borders: {
              top: rIdx === 0 ? line1 : lineL,
              bottom: rIdx === 0 ? line1 : (rIdx === rows.length - 1 ? line1 : lineL),
              left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
            },
            width: { size: colWidths[c], type: WidthType.DXA },
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({
              spacing: { after: 0, ...SINGLE },
              children: parseInline(cells[c] || "", { size: 18, ...(rIdx === 0 ? { bold: true } : {}) }),
            })],
          })),
      }));
    children.push(new Table({ width: { size: totalW, type: WidthType.DXA }, columnWidths: colWidths, rows: tableRows }));
    children.push(new Paragraph({ spacing: { after: 120, ...SINGLE }, children: [] }));
    continue;
  }

  // bullet list
  if (/^\s*-\s+/.test(line)) {
    while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
      children.push(new Paragraph({
        bullet: { level: 0 }, alignment: AlignmentType.JUSTIFIED, spacing: { after: 80, ...SINGLE },
        children: parseInline(lines[i].replace(/^\s*-\s+/, "")),
      }));
      i++;
    }
    continue;
  }

  // gather paragraph
  const para = [line]; i++;
  while (i < lines.length && lines[i].trim() !== "" &&
         !/^(#{1,3})\s/.test(lines[i]) && !/^---+$/.test(lines[i].trim()) &&
         !lines[i].trim().startsWith("|") && !/^\s*-\s+/.test(lines[i])) {
    para.push(lines[i]); i++;
  }
  const text = para.join(" ");

  if (inRefs) {
    children.push(new Paragraph({
      spacing: { after: 80, ...SINGLE }, indent: { left: 720, hanging: 720 },
      children: parseInline(text, { size: 20 }),
    }));
  } else if (inAbstract) {
    const isKw = /^\*\*Keywords/i.test(text);
    children.push(new Paragraph({
      alignment: AlignmentType.JUSTIFIED, spacing: { after: isKw ? 200 : 120, ...SINGLE },
      children: parseInline(text, { size: 20 }),
    }));
  } else if (/^\*\*Table\s/i.test(text)) { // table caption
    children.push(new Paragraph({
      spacing: { before: 80, after: 60, ...SINGLE }, children: parseInline(text, { size: 20 }),
    }));
  } else if (/^\*Note\./i.test(text)) { // table note
    children.push(new Paragraph({
      spacing: { after: 120, ...SINGLE }, children: parseInline(text, { size: 18 }),
    }));
  } else {
    children.push(new Paragraph({
      alignment: AlignmentType.JUSTIFIED, spacing: { after: 120, ...SINGLE },
      children: parseInline(text),
    }));
  }
}

const doc = new Document({
  creator: "Deep Research",
  title: "Lorem ipsum dolor sit amet: A Narrative Review",
  styles: { default: { document: { run: { font: "Times New Roman", size: 22 } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440, header: 720, footer: 720 },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync(OUT, buf); console.log("Wrote " + OUT + " (" + buf.length + " bytes)"); });
