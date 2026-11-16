"use client";

import { FileText, Loader2, RotateCcw, ScanSearch, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { ScanResult } from "@/lib/detector/types";
import { ResultView } from "./result-view";

const MIN_WORDS = 40;
const MAX_CHARS = 60_000;
const ACCEPT = ".pdf,.docx,.txt,.md";

const SAMPLE = `In today's fast-paced world, artificial intelligence plays a crucial role in shaping the landscape of modern education. It is important to note that these tools offer a wide range of benefits for students, teachers, and institutions. Moreover, they foster personalized learning experiences that empower learners to reach their full potential.

Furthermore, AI-driven platforms provide robust, seamless, and comprehensive support for educators. By leveraging data, teachers can navigate the complexities of diverse classrooms more effectively. Additionally, this technology serves as a testament to the transformative power of innovation in the realm of learning.

In conclusion, the integration of artificial intelligence into education is not only beneficial but also essential. Ultimately, embracing these tools will unlock new opportunities and pave the way for a brighter, more inclusive future.`;

interface ScanResponse {
  id: string | null;
  title: string;
  source: string;
  result: ScanResult;
}

export function Scanner() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ScanResponse | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const tooLong = text.length > MAX_CHARS;
  const canSubmit = !busy && (mode === "text" ? words >= MIN_WORDS && !tooLong : file !== null);

  function chooseFile(f: File | undefined | null) {
    if (!f) return;
    if (!/\.(pdf|docx|txt|md)$/i.test(f.name)) {
      setError("Unsupported file type. Upload a PDF, DOCX or TXT file.");
      return;
    }
    setError(null);
    setFile(f);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    setError(null);
    const body = new FormData();
    if (mode === "file" && file) body.set("file", file);
    else body.set("text", text);
    try {
      const res = await fetch("/api/scan", { method: "POST", body });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.result) {
        setError(data?.error ?? "The scan failed. Please try again.");
        return;
      }
      setResponse(data as ScanResponse);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (response) {
    return (
      <div ref={resultRef} tabIndex={-1} className="outline-none">
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate font-serif text-2xl font-semibold">
              {response.title || "Scan result"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {response.id ? (
                "Saved to your history."
              ) : (
                <>
                  Not saved.{" "}
                  <Link href="/signup" className="font-bold text-accent underline">
                    Create an account
                  </Link>{" "}
                  to keep a history and download reports.
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {response.id && (
              <Link
                href={`/scans/${response.id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border-strong bg-surface px-4 text-sm font-bold transition-colors duration-200 hover:bg-muted"
              >
                <FileText aria-hidden className="size-4" />
                Open report
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                setResponse(null);
                setFile(null);
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              <RotateCcw aria-hidden className="size-4" />
              New scan
            </button>
          </div>
        </div>
        <ResultView result={response.result} />
      </div>
    );
  }

  const tab = (value: "text" | "file", label: string) => (
    <button
      type="button"
      role="tab"
      id={`tab-${value}`}
      aria-selected={mode === value}
      aria-controls="scan-panel"
      onClick={() => {
        setMode(value);
        setError(null);
      }}
      className={`min-h-11 flex-1 rounded-md px-4 text-sm font-bold transition-colors duration-200 sm:flex-none ${
        mode === value ? "bg-surface text-primary shadow-sm" : "text-muted-foreground hover:text-primary"
      }`}
    >
      {label}
    </button>
  );

  return (
    <form
      onSubmit={submit}
      className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6"
      aria-busy={busy}
    >
      <div role="tablist" aria-label="Input method" className="flex gap-1 rounded-lg bg-muted p-1 sm:inline-flex">
        {tab("text", "Paste text")}
        {tab("file", "Upload file")}
      </div>

      <div id="scan-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} className="mt-4">
        {mode === "text" ? (
          <div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="scan-text" className="font-bold">
                Text to check
              </label>
              <button
                type="button"
                onClick={() => setText(SAMPLE)}
                className="min-h-11 rounded-md px-2 text-sm font-bold text-accent hover:underline"
              >
                Try a sample
              </button>
            </div>
            <textarea
              id="scan-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              aria-describedby="scan-text-help"
              placeholder="Paste an essay, article or assignment here…"
              className="mt-1 block w-full resize-y rounded-lg border border-border-strong bg-surface p-3 text-base leading-relaxed placeholder:text-slate-500 focus:border-accent"
            />
            <p
              id="scan-text-help"
              className={`mt-2 text-sm tabular-nums ${tooLong ? "font-bold text-ai" : "text-muted-foreground"}`}
            >
              {tooLong
                ? `Too long: ${text.length.toLocaleString("en")} of ${MAX_CHARS.toLocaleString("en")} characters. Scan it in sections.`
                : words < MIN_WORDS
                  ? `${words} words. At least ${MIN_WORDS} needed; 150 or more gives a more reliable result.`
                  : `${words.toLocaleString("en")} words`}
            </p>
          </div>
        ) : (
          <div>
            <input
              ref={fileInput}
              id="scan-file"
              type="file"
              accept={ACCEPT}
              className="sr-only"
              onChange={(e) => chooseFile(e.target.files?.[0])}
            />
            {file ? (
              <div className="flex items-center gap-3 rounded-lg border border-border-strong p-4">
                <FileText aria-hidden className="size-6 shrink-0 text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => {
                    setFile(null);
                    if (fileInput.current) fileInput.current.value = "";
                  }}
                  className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="scan-file"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  chooseFile(e.dataTransfer.files?.[0]);
                }}
                className={`flex min-h-56 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-200 focus-within:border-accent ${
                  dragging ? "border-accent bg-accent-soft" : "border-border-strong hover:bg-muted"
                }`}
              >
                <Upload aria-hidden className="size-8 text-accent" />
                <span className="font-bold">Choose a file or drag it here</span>
                <span className="text-sm text-muted-foreground">PDF, DOCX or TXT, up to 8 MB</span>
              </label>
            )}
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg border border-ai/30 bg-ai-soft/60 p-3 text-sm font-bold text-ai">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 text-base font-bold text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {busy ? (
            <Loader2 aria-hidden className="size-5 animate-spin" />
          ) : (
            <ScanSearch aria-hidden className="size-5" />
          )}
          {busy ? "Analysing…" : "Check for AI writing"}
        </button>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {busy ? "This can take up to a minute for long documents." : ""}
        </p>
      </div>
    </form>
  );
}
