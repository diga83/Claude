export type Band = "human" | "mixed" | "ai";

export interface SentenceResult {
  text: string;
  /** 0–100 likelihood this sentence reads as AI-generated */
  score: number;
  band: Band;
  /** Short human-readable reasons shown on hover / in the report */
  signals: string[];
}

export interface SignalResult {
  key: string;
  label: string;
  /** 0–100, higher means more AI-like */
  score: number;
  detail: string;
}

export interface LlmOpinion {
  score: number;
  confidence: "low" | "medium" | "high";
  summary: string;
  indicators: string[];
  model: string;
}

export interface ScanResult {
  /** 0–100 overall AI likelihood */
  score: number;
  band: Band;
  verdict: string;
  confidence: "low" | "medium" | "high";
  engine: "statistical" | "hybrid";
  wordCount: number;
  sentenceCount: number;
  /** Share of words sitting in sentences flagged as AI-like, 0–100 */
  aiShare: number;
  statisticalScore: number;
  signals: SignalResult[];
  /** Paragraphs → sentences, preserving the document's structure */
  paragraphs: SentenceResult[][];
  llm: LlmOpinion | null;
  /** Set when the AI second opinion was configured but failed */
  llmError?: string;
  notes: string[];
}

export function bandFor(score: number): Band {
  if (score >= 60) return "ai";
  if (score >= 30) return "mixed";
  return "human";
}

export function verdictFor(band: Band): string {
  if (band === "ai") return "Likely AI-generated";
  if (band === "mixed") return "Mixed or uncertain";
  return "Likely human-written";
}
