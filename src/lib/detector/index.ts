import "server-only";
import { analyzeWithLlm, describeLlmError, llmConfigured } from "./llm";
import { analyzeStatistical } from "./statistical";
import { bandFor, verdictFor, type ScanResult } from "./types";

export const MIN_WORDS = 40;
export const MAX_CHARS = 60_000;

export async function scanText(text: string): Promise<ScanResult> {
  const stat = analyzeStatistical(text);
  const notes: string[] = [];
  let paragraphs = stat.paragraphs;
  let score = stat.score;
  let llm: ScanResult["llm"] = null;
  let llmError: string | undefined;

  // Length drives how much any detector can be trusted.
  let confidence: ScanResult["confidence"] =
    stat.wordCount < 150 ? "low" : stat.wordCount < 400 ? "medium" : "high";

  if (llmConfigured()) {
    try {
      const { opinion, flagged } = await analyzeWithLlm(paragraphs.flat().map((s) => s.text));
      llm = opinion;
      score = Math.round(stat.score * 0.35 + opinion.score * 0.65);

      let i = 0;
      paragraphs = paragraphs.map((p) =>
        p.map((s) => {
          const flag = flagged.get(i++);
          // The model reads for meaning; where it didn't flag a sentence, pull the
          // surface-pattern score toward its overall view of the document.
          const blended = flag
            ? Math.round(s.score * 0.3 + flag.score * 0.7)
            : Math.round(s.score * 0.6 + Math.min(opinion.score, 45) * 0.4);
          return {
            ...s,
            score: blended,
            band: bandFor(blended),
            signals: flag ? [`AI review: ${flag.reason}`, ...s.signals] : s.signals,
          };
        }),
      );

      if (opinion.confidence === "low") confidence = "low";
      else if (Math.abs(opinion.score - stat.score) > 35) {
        confidence = "low";
        notes.push(
          "The statistical analysis and the AI review disagree strongly on this document. Treat the result with extra caution.",
        );
      }
    } catch (err) {
      console.error("LLM analysis failed", err);
      llmError = describeLlmError(err);
    }
  }

  if (!llm && confidence === "high") confidence = "medium";
  if (stat.wordCount < 150) {
    notes.push("Short texts are hard to judge reliably. Scan at least 150 words for a more dependable result.");
  }

  const flat = paragraphs.flat();
  let aiWords = 0;
  let total = 0;
  for (const s of flat) {
    const w = s.text.split(/\s+/).length;
    total += w;
    if (s.band === "ai") aiWords += w;
  }

  const band = bandFor(score);
  return {
    score,
    band,
    verdict: verdictFor(band),
    confidence,
    engine: llm ? "hybrid" : "statistical",
    wordCount: stat.wordCount,
    sentenceCount: stat.sentenceCount,
    aiShare: total ? Math.round((aiWords * 100) / total) : 0,
    statisticalScore: stat.score,
    signals: stat.signals,
    paragraphs,
    llm,
    llmError,
    notes,
  };
}
