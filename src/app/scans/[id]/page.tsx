import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ResultView } from "@/components/result-view";
import { DeleteScanButton, PrintButton } from "@/components/scan-actions";
import { getScan } from "@/lib/db";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Scan report" };

async function Report({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const scan = await getScan(user.id, id);
  if (!scan) notFound();

  const date = new Intl.DateTimeFormat("en", { dateStyle: "long", timeStyle: "short" }).format(
    new Date(scan.createdAt),
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            AI writing report
          </p>
          <h1 className="break-words font-serif text-4xl font-semibold tracking-tight">
            {scan.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {scan.source} · Scanned {date} · Prepared for {user.name}
          </p>
        </div>
        <div className="no-print flex flex-wrap gap-2">
          <DeleteScanButton id={scan.id} title={scan.title} />
          <PrintButton />
        </div>
      </div>
      <ResultView result={scan.result} />
    </>
  );
}

export default function ScanPage({ params }: PageProps<"/scans/[id]">) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/dashboard"
        className="no-print mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent hover:underline"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Back to history
      </Link>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-muted" />}>
        <Report params={params} />
      </Suspense>
    </div>
  );
}
