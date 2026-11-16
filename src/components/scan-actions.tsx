"use client";

import { Loader2, Printer, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-hover"
    >
      <Printer aria-hidden className="size-4" />
      Download PDF
    </button>
  );
}

export function DeleteScanButton({ id, title, compact }: { id: string; title: string; compact?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm(`Delete the scan “${title}”? This can't be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/scans/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res?.ok) {
      setBusy(false);
      window.alert("The scan could not be deleted. Please try again.");
      return;
    }
    if (compact) router.refresh();
    else router.push("/dashboard");
  }

  const Icon = busy ? Loader2 : Trash2;
  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      aria-label={compact ? `Delete scan ${title}` : undefined}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md text-sm font-bold text-ai transition-colors duration-200 hover:bg-ai-soft disabled:opacity-50 ${
        compact ? "size-11" : "border border-border-strong bg-surface px-4"
      }`}
    >
      <Icon aria-hidden className={`size-4 ${busy ? "animate-spin" : ""}`} />
      {!compact && "Delete"}
    </button>
  );
}
