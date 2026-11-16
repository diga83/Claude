import "server-only";

export const MAX_FILE_BYTES = 8 * 1024 * 1024;

export class ExtractError extends Error {}

/**
 * PDF text comes out hard-wrapped, one string per visual line. Rejoin wrapped lines
 * so sentences stay intact, keeping a paragraph break where a line ends a sentence
 * well short of the full line width.
 */
function unwrapLines(page: string): string {
  const lines = page.split("\n").map((l) => l.trim());
  const full = Math.max(...lines.map((l) => l.length), 1);
  let out = "";
  for (const line of lines) {
    if (!line) {
      out += "\n\n";
      continue;
    }
    out += line;
    out += /[.!?:"”’)]$/.test(line) && line.length < full * 0.8 ? "\n\n" : " ";
  }
  return out.trim();
}

/** Pull plain text out of an uploaded TXT, DOCX or PDF file. */
export async function extractText(file: File): Promise<string> {
  if (file.size > MAX_FILE_BYTES) {
    throw new ExtractError("That file is larger than 8 MB. Upload a smaller file or paste the text.");
  }
  const name = file.name.toLowerCase();
  const bytes = new Uint8Array(await file.arrayBuffer());

  try {
    if (name.endsWith(".pdf")) {
      const { extractText: pdfText, getDocumentProxy } = await import("unpdf");
      const pdf = await getDocumentProxy(bytes);
      const { text } = await pdfText(pdf, { mergePages: false });
      const joined = text.map(unwrapLines).join("\n\n").trim();
      if (!joined) {
        throw new ExtractError(
          "No selectable text was found in that PDF. It may be a scanned image; paste the text instead.",
        );
      }
      return joined;
    }
    if (name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const { value } = await mammoth.extractRawText({ buffer: Buffer.from(bytes) });
      return value.trim();
    }
    if (name.endsWith(".txt") || name.endsWith(".md") || file.type.startsWith("text/")) {
      return new TextDecoder("utf-8").decode(bytes).trim();
    }
  } catch (err) {
    if (err instanceof ExtractError) throw err;
    console.error("File extraction failed", err);
    throw new ExtractError("That file could not be read. Check it isn't corrupted or password-protected.");
  }
  throw new ExtractError("Unsupported file type. Upload a PDF, DOCX or TXT file.");
}
