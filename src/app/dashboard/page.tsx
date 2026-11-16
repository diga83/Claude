import { FileText, ScanSearch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DeleteScanButton } from "@/components/scan-actions";
import { listScans } from "@/lib/db";
import { verdictFor, type Band } from "@/lib/detector/types";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "History" };

const pill: Record<Band, string> = {
  human: "bg-human-soft text-human",
  mixed: "bg-mixed-soft text-mixed",
  ai: "bg-ai-soft text-ai",
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));

async function History() {
  const user = await requireUser();
  const scans = await listScans(user.id);

  if (scans.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-strong bg-surface p-10 text-center">
        <FileText aria-hidden className="mx-auto size-10 text-muted-foreground" />
        <h2 className="mt-4 font-serif text-2xl font-semibold">No scans yet</h2>
        <p className="mt-1 text-muted-foreground">
          Documents you check while signed in are saved here.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-5 font-bold text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          <ScanSearch aria-hidden className="size-4" />
          Run your first scan
        </Link>
      </div>
    );
  }

  const average = Math.round(scans.reduce((sum, s) => sum + s.score, 0) / scans.length);
  const flagged = scans.filter((s) => s.band === "ai").length;

  return (
    <>
      <dl className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          ["Scans", scans.length],
          ["Flagged as likely AI", flagged],
          ["Average AI likelihood", `${average}%`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border bg-surface p-4">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="font-serif text-3xl font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
        {scans.map((s) => (
          <li key={s.id} className="flex items-center gap-2 p-2 pl-4 sm:gap-4">
            <span
              className={`w-14 shrink-0 text-center font-serif text-2xl font-semibold tabular-nums ${pill[s.band].split(" ")[1]}`}
            >
              {s.score}%
            </span>
            <Link
              href={`/scans/${s.id}`}
              className="min-w-0 flex-1 rounded-md px-2 py-2 transition-colors duration-200 hover:bg-muted"
            >
              <span className="block truncate font-bold">{s.title}</span>
              <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${pill[s.band]}`}>
                  {verdictFor(s.band)}
                </span>
                <span className="tabular-nums">{s.wordCount.toLocaleString("en")} words</span>
                <span>{formatDate(s.createdAt)}</span>
              </span>
            </Link>
            <DeleteScanButton id={s.id} title={s.title} compact />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Scan history</h1>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          <ScanSearch aria-hidden className="size-4" />
          New scan
        </Link>
      </div>
      <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
        <History />
      </Suspense>
    </div>
  );
}
