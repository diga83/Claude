import { NextResponse } from "next/server";
import { saveScan } from "@/lib/db";
import { MAX_CHARS, MIN_WORDS, scanText } from "@/lib/detector";
import { countWords } from "@/lib/detector/statistical";
import { ExtractError, extractText } from "@/lib/extract";
import { getCurrentUser } from "@/lib/session";

export const maxDuration = 120;

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("The request could not be read.");
  }

  const file = form.get("file");
  let text = String(form.get("text") ?? "");
  let source = "Pasted text";
  let title = String(form.get("title") ?? "").trim().slice(0, 120);

  if (file instanceof File && file.size > 0) {
    try {
      text = await extractText(file);
    } catch (err) {
      if (err instanceof ExtractError) return fail(err.message);
      throw err;
    }
    source = file.name.slice(0, 120);
    title ||= file.name.replace(/\.[^.]+$/, "").slice(0, 120);
  }

  text = text.trim();
  if (!text) return fail("Paste some text or upload a file to scan.");
  if (text.length > MAX_CHARS) {
    return fail(
      `This document is ${text.length.toLocaleString("en")} characters; the limit is ${MAX_CHARS.toLocaleString("en")}. Split it into sections and scan each one.`,
    );
  }
  const words = countWords(text);
  if (words < MIN_WORDS) {
    return fail(`Only ${words} words found. At least ${MIN_WORDS} are needed for a meaningful result.`);
  }

  const result = await scanText(text);

  const user = await getCurrentUser();
  let id: string | null = null;
  if (user) {
    title ||= text.replace(/\s+/g, " ").slice(0, 60).trim() + (text.length > 60 ? "…" : "");
    id = await saveScan(user.id, title, source, result);
  }

  return NextResponse.json({ id, title, source, result });
}
