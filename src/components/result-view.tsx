import { AlertTriangle, Bot, CheckCircle2, HelpCircle, Info } from "lucide-react";
import type { Band, ScanResult } from "@/lib/detector/types";

const bandText: Record<Band, string> = {
  human: "text-human",
  mixed: "text-mixed",
  ai: "text-ai",
};
const bandBar: Record<Band, string> = { human: "bg-human", mixed: "bg-mixed", ai: "bg-ai" };
const bandStroke: Record<Band, string> = {
  human: "stroke-human",
  mixed: "stroke-mixed",
  ai: "stroke-ai",
};
const BandIcon = { human: CheckCircle2, mixed: HelpCircle, ai: Bot };

function Gauge({ score, band }: { score: number; band: Band }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-36 shrink-0" role="img" aria-label={`AI likelihood ${score} percent`}>
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-muted" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * c} ${c}`}
          className={bandStroke[band]}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-serif text-4xl font-semibold tabular-nums ${bandText[band]}`}>
          {score}%
        </span>
        <span className="text-xs text-muted-foreground">AI likelihood</span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-lg font-bold tabular-nums">{value}</dd>
    </div>
  );
}

const card = "print-plain rounded-xl border border-border bg-surface p-5 sm:p-6";
const h2 = "font-serif text-2xl font-semibold";

export function ResultView({ result }: { result: ScanResult }) {
  const Icon = BandIcon[result.band];
  const flagged = result.paragraphs
    .flat()
    .filter((s) => s.band !== "human" && s.signals.length > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  return (
    <div className="space-y-6">
      <section className={`${card} flex flex-col gap-6 sm:flex-row sm:items-center`}>
        <Gauge score={result.score} band={result.band} />
        <div className="min-w-0 flex-1">
          <p className={`flex items-center gap-2 font-serif text-3xl font-semibold ${bandText[result.band]}`}>
            <Icon aria-hidden className="size-7 shrink-0" />
            {result.verdict}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            <Stat label="Confidence" value={result.confidence[0].toUpperCase() + result.confidence.slice(1)} />
            <Stat label="AI-like text" value={`${result.aiShare}%`} />
            <Stat label="Words" value={result.wordCount.toLocaleString("en")} />
            <Stat label="Sentences" value={result.sentenceCount.toLocaleString("en")} />
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">
            {result.engine === "hybrid"
              ? "Hybrid analysis: statistical patterns combined with an AI model's review."
              : "Statistical analysis only. Add an API key to enable the AI second opinion."}
          </p>
        </div>
      </section>

      {(result.notes.length > 0 || result.llmError) && (
        <section className="print-plain flex gap-3 rounded-xl border border-mixed/40 bg-mixed-soft/50 p-4">
          <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0 text-mixed" />
          <ul className="space-y-1 text-sm">
            {result.llmError && (
              <li>
                The AI second opinion was unavailable ({result.llmError}) so this result uses
                statistical analysis only.
              </li>
            )}
            {result.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      )}

      {result.llm && (
        <section className={card}>
          <h2 className={h2}>AI review</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Scored {result.llm.score}% with {result.llm.confidence} confidence
          </p>
          <p className="mt-3 max-w-prose">{result.llm.summary}</p>
          {result.llm.indicators.length > 0 && (
            <ul className="mt-3 max-w-prose list-disc space-y-1 pl-5">
              {result.llm.indicators.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className={`${card} allow-break`}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className={h2}>Document</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm" aria-label="Highlight legend">
            <li>
              <span className="s-ai px-1">Likely AI</span>
            </li>
            <li>
              <span className="s-mixed px-1">Uncertain</span>
            </li>
            <li className="text-muted-foreground">No highlight: likely human</li>
          </ul>
        </div>
        <div className="mt-4 max-w-prose space-y-4 text-[1.0625rem] leading-relaxed">
          {result.paragraphs.map((sentences, i) => (
            <p key={i}>
              {sentences.map((s, j) =>
                s.band === "human" ? (
                  <span key={j}>{s.text} </span>
                ) : (
                  <span key={j}>
                    <mark
                      className={s.band === "ai" ? "s-ai" : "s-mixed"}
                      title={`${s.score}% AI-like${s.signals.length ? ` — ${s.signals.join("; ")}` : ""}`}
                    >
                      {s.text}
                    </mark>{" "}
                  </span>
                ),
              )}
            </p>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className={h2}>What the analysis measured</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Statistical score {result.statisticalScore}%. Each bar shows how AI-like the document is on
          that measure.
        </p>
        <ul className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2">
          {result.signals.map((s) => {
            const band: Band = s.score >= 60 ? "ai" : s.score >= 30 ? "mixed" : "human";
            return (
              <li key={s.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold">{s.label}</span>
                  <span className={`font-bold tabular-nums ${bandText[band]}`}>{s.score}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
                  <div className={`h-full rounded-full ${bandBar[band]}`} style={{ width: `${Math.max(s.score, 2)}%` }} />
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.detail}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {flagged.length > 0 && (
        <section className={`${card} allow-break`}>
          <h2 className={h2}>Most AI-like sentences</h2>
          <ol className="mt-4 space-y-4">
            {flagged.map((s, i) => (
              <li key={i} className="border-l-4 border-border-strong pl-4">
                <p className="max-w-prose">“{s.text}”</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className={`font-bold tabular-nums ${bandText[s.band]}`}>{s.score}%</span>
                  {" · "}
                  {s.signals.join(" · ")}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="flex gap-3 text-sm text-muted-foreground">
        <Info aria-hidden className="mt-0.5 size-5 shrink-0" />
        <p className="max-w-prose">
          No AI detector is fully reliable. Formal, edited or non-native English writing can be
          flagged incorrectly, and AI text that has been paraphrased can pass. Use this report as
          one piece of evidence alongside drafts, version history and a conversation with the
          author.
        </p>
      </section>
    </div>
  );
}
