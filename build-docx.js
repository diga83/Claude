const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  AlignmentType, HeadingLevel, PageNumber, Header, Footer,
} = require("docx");

const SRC = "lorem-ipsum-narrative-review.md";
const OUT = "lorem-ipsum-narrative-review.docx";
const lines = fs.readFileSync(SRC, "utf8").split(/\r?\n/);

// ---- inline parser: **bold**, *italic*, `code`, [text](url) ----
function parseInline(text, base = {}) {
  const runs = [];
  let i = 0;
  const pushText = (t, opts) => {
    if (t === "") return;
    runs.push(new TextRun({ text: t, ...base, ...opts }));
  };
  // tokenize
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) pushText(text.slice(last, m.index));
    if (m[1]) pushText(m[2], { bold: true });
    else if (m[3]) pushText(m[4], { italics: true });
    else if (m[5]) pushText(m[6], { font: "Courier New" });
    else if (m[7]) {
      runs.push(new ExternalHyperlink({
        link: m[9],
        children: [new TextRun({ text: m[8], style: "Hyperlink", ...base })],
      }));
    }
    last = re.lastIndex;
  }
  if (last < text.length) pushText(text.slice(last));
  return runs.length ? runs : [new TextRun({ text: "", ...base })];
}

const DOUBLE = { line: 480, lineRule: "auto", after: 0 }; // double spacing
const children = [];
let i = 0;
let titleDone = false;

function isTableSep(s) { return /^\|?\s*:?-{2,}.*\|/.test(s) && s.includes("-"); }

while (i < lines.length) {
  let line = lines[i];

  // skip blank
  if (line.trim() === "") { i++; continue; }

  // horizontal rule
  if (/^---+$/.test(line.trim())) {
    children.push(new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 1 } },
      spacing: { before: 120, after: 120 },
    }));
    i++; continue;
  }

  // headings
  const h = line.match(/^(#{1,3})\s+(.*)$/);
  if (h) {
    const level = h[1].length;
    const txt = h[2];
    if (level === 1 && !titleDone) {
      titleDone = true;
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 240, line: 360, lineRule: "auto" },
        children: parseInline(txt, { bold: true, size: 32 }),
      }));
    } else {
      children.push(new Paragraph({
        heading: level === 1 ? HeadingLevel.HEADING_1
              : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
        spacing: { before: 240, after: 120 },
        children: parseInline(txt),
      }));
    }
    i++; continue;
  }

  // table block
  if (line.trim().startsWith("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
    const tblLines = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) { tblLines.push(lines[i]); i++; }
    const rows = tblLines
      .filter((l, idx) => idx !== 1) // drop separator
      .map(l => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim()));
    const nCols = Math.max(...rows.map(r => r.length));
    const totalW = 9360;
    const colW = Math.floor(totalW / nCols);
    const colWidths = Array(nCols).fill(colW);
    colWidths[nCols - 1] += totalW - colW * nCols;
    const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
    const borders = { top: border, bottom: border, left: border, right: border };
    const tableRows = rows.map((cells, rIdx) =>
      new TableRow({
        tableHeader: rIdx === 0,
        children: Array.from({ length: nCols }, (_, c) => {
          const cellTxt = cells[c] || "";
          return new TableCell({
            borders,
            width: { size: colWidths[c], type: WidthType.DXA },
            shading: rIdx === 0 ? { fill: "D9E2F3", type: ShadingType.CLEAR, color: "auto" } : undefined,
            margins: { top: 60, bottom: 60, left: 110, right: 110 },
            children: [new Paragraph({
              spacing: { line: 276, lineRule: "auto", after: 0 },
              children: parseInline(cellTxt, rIdx === 0 ? { bold: true, size: 20 } : { size: 20 }),
            })],
          });
        }),
      })
    );
    children.push(new Table({
      width: { size: totalW, type: WidthType.DXA },
      columnWidths: colWidths,
      rows: tableRows,
    }));
    children.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
    continue;
  }

  // bullet list
  if (/^\s*-\s+/.test(line)) {
    while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
      const txt = lines[i].replace(/^\s*-\s+/, "");
      children.push(new Paragraph({
        bullet: { level: 0 },
        spacing: DOUBLE,
        children: parseInline(txt),
      }));
      i++;
    }
    continue;
  }

  // detect "References" section -> use hanging indent for following paragraphs
  // normal paragraph (gather until blank)
  const para = [line];
  i++;
  while (i < lines.length && lines[i].trim() !== "" &&
         !/^(#{1,3})\s/.test(lines[i]) && !/^---+$/.test(lines[i].trim()) &&
         !lines[i].trim().startsWith("|") && !/^\s*-\s+/.test(lines[i])) {
    para.push(lines[i]); i++;
  }
  children.push(new Paragraph({
    spacing: DOUBLE,
    children: parseInline(para.join(" ")),
  }));
}

const doc = new Document({
  creator: "Deep Research",
  title: "Lorem ipsum dolor sit amet: A Narrative Review",
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Times New Roman", color: "000000" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Times New Roman", color: "000000" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, italics: true, font: "Times New Roman", color: "000000" },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: [PageNumber.CURRENT], size: 20 })],
        })],
      }),
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log("Wrote " + OUT + " (" + buf.length + " bytes)");
});
