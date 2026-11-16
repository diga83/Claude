/**
 * Statistical (stylometric) AI-writing analysis.
 *
 * Runs entirely locally with no model or network call. It measures surface
 * patterns that are common in machine-generated prose — even sentence rhythm,
 * stock transitions, formulaic phrasing, an absence of informal markers — and
 * turns them into a 0–100 likelihood. These are indicators, not proof.
 */
import { bandFor, type SentenceResult, type SignalResult } from "./types";

const AI_PHRASES = [
  "delve", "delves", "delving", "tapestry", "testament to", "multifaceted",
  "ever-evolving", "ever-changing", "fast-paced world", "in today's world",
  "in today's digital", "in the realm of", "the realm of", "landscape of",
  "plays a crucial role", "plays a vital role", "plays a pivotal role",
  "plays a significant role", "it is important to note", "it's important to note",
  "it is worth noting", "it's worth noting", "it is essential to",
  "it is crucial to", "navigate the complexities", "navigating the complexities",
  "underscores", "underscore the", "underscoring", "pivotal", "seamless",
  "seamlessly", "leverage", "leveraging", "foster", "fosters", "fostering",
  "harness", "harnessing", "holistic", "robust", "nuanced", "intricate",
  "intricacies", "paramount", "myriad", "plethora", "embark", "unlock the",
  "unleash", "game-changer", "cutting-edge", "transformative", "revolutionize",
  "not only", "but also", "in conclusion", "in summary", "to summarize",
  "overall,", "ultimately,", "a wide range of", "a variety of", "serves as a",
  "stands as a", "shed light on", "sheds light on", "by doing so",
  "when it comes to", "at its core", "rich history", "vibrant", "elevate",
  "empower", "empowers", "empowering", "comprehensive", "crucial", "vital",
  "moreover", "furthermore", "additionally", "consequently", "thus,",
  "as a result,", "on the other hand", "in addition,",
];

const TRANSITION_START =
  /^(however|moreover|furthermore|additionally|in addition|consequently|overall|ultimately|in conclusion|in summary|to summarize|as a result|on the other hand|for example|for instance|similarly|therefore|thus|notably|importantly|firstly|secondly|thirdly|finally|in essence|by contrast|in contrast|that said|as such)\b[,:]?/i;

// Possessives ("today's") are excluded; only genuine contractions count.
const CONTRACTION =
  /\b(?:\w+n't|\w+'(?:re|ve|ll|d|m)|(?:it|that|there|what|here|let|he|she|who|how|where)'s)\b/gi;
const FIRST_PERSON = /\b(i|me|my|mine|myself|we|our|us)\b/gi;
const INFORMAL =
  /\b(kinda|sorta|gonna|wanna|yeah|nope|ok|okay|honestly|anyway|anyways|basically|stuff|lol|tbh|btw|pretty much|a lot|sort of|kind of|i guess|i think|i mean|you know)\b/gi;
const TRIAD = /\b[\w-]+(?: [\w-]+){0,2}, [\w-]+(?: [\w-]+){0,2},? and [\w-]+/i;
const ABBREVIATIONS =
  /\b(?:mr|mrs|ms|dr|prof|sr|jr|st|vs|etc|e\.g|i\.e|fig|no|vol|inc|ltd|approx|dept|est|u\.s|u\.k)\.$/i;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
/** Linear map of `value` from [from, to] onto [0, 1], clamped. `from` may exceed `to`. */
const scale = (value: number, from: number, to: number) =>
  clamp01((value - from) / (to - from));

export function countWords(text: string): number {
  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)?.length ?? 0;
}

export function splitParagraphs(text: string): string[] {
  return text
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n|\n(?=\S)/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function splitSentences(paragraph: string): string[] {
  const out: string[] = [];
  let buf = "";
  const parts = paragraph.split(/(?<=[.!?]["'”’)\]]*)\s+(?=["'“‘(\[]?[\p{Lu}\p{N}])/u);
  for (const part of parts) {
    buf = buf ? `${buf} ${part}` : part;
    // Don't break after "Dr." / "e.g." or a single initial like "J."
    if (ABBREVIATIONS.test(buf) || /\b\p{Lu}\.$/u.test(buf)) continue;
    out.push(buf);
    buf = "";
  }
  if (buf) out.push(buf);
  return out;
}

function phraseHits(lower: string): string[] {
  const hits: string[] = [];
  for (const phrase of AI_PHRASES) {
    const idx = lower.indexOf(phrase);
    if (idx === -1) continue;
    const before = idx === 0 ? " " : lower[idx - 1];
    const after = lower[idx + phrase.length] ?? " ";
    const wordChar = /[\p{L}\p{N}]/u;
    if (wordChar.test(before)) continue;
    if (/[\p{L}\p{N}]$/u.test(phrase) && wordChar.test(after)) continue;
    hits.push(phrase.replace(/,$/, ""));
  }
  return hits;
}

function countAllPhraseHits(lower: string): number {
  let total = 0;
  for (const phrase of AI_PHRASES) {
    let from = 0;
    for (;;) {
      const idx = lower.indexOf(phrase, from);
      if (idx === -1) break;
      const before = idx === 0 ? " " : lower[idx - 1];
      if (!/[\p{L}\p{N}]/u.test(before)) total++;
      from = idx + phrase.length;
    }
  }
  return total;
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1);
const stdev = (xs: number[]) => {
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
};
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

export interface StatisticalAnalysis {
  score: number;
  wordCount: number;
  sentenceCount: number;
  signals: SignalResult[];
  paragraphs: SentenceResult[][];
}

export function analyzeStatistical(text: string): StatisticalAnalysis {
  const paragraphTexts = splitParagraphs(text);
  const paragraphSentences = paragraphTexts.map(splitSentences);
  const sentences = paragraphSentences.flat();
  const lengths = sentences.map(countWords);
  const wordCount = lengths.reduce((a, b) => a + b, 0);
  const per100 = (n: number) => (wordCount ? (n * 100) / wordCount : 0);
  const lower = text.toLowerCase().replace(/’/g, "'");

  // 1. Rhythm ("burstiness"): people mix short and long sentences far more than models do.
  const proseLengths = lengths.filter((n) => n >= 3);
  const cv = proseLengths.length >= 4 ? stdev(proseLengths) / mean(proseLengths) : NaN;
  const rhythm = Number.isNaN(cv) ? 0.5 : scale(cv, 0.7, 0.28);

  // 2. Stock vocabulary and phrasing that language models over-use.
  const phraseRate = per100(countAllPhraseHits(lower));
  const vocabulary = scale(phraseRate, 0.3, 3.2);

  // 3. Sentences opening with a formal connective ("Moreover,", "Additionally,").
  const transitionCount = sentences.filter((s) => TRANSITION_START.test(s)).length;
  const transitionShare = sentences.length ? transitionCount / sentences.length : 0;
  const transitions = scale(transitionShare, 0.04, 0.28);

  // 4. Personal voice: contractions, first person and casual wording point to a human.
  const voiceRate =
    per100(lower.match(CONTRACTION)?.length ?? 0) +
    per100(lower.match(FIRST_PERSON)?.length ?? 0) * 0.5 +
    per100(lower.match(INFORMAL)?.length ?? 0) * 1.5;
  // Absence of these markers is only weak evidence (formal human prose lacks them too),
  // so this signal tops out at 50.
  const voice = scale(voiceRate, 3.2, 0.2) * 0.5;

  // 5. Formulaic structure: lists of three, "not only … but also", tidy uniform paragraphs.
  const triadShare = sentences.length
    ? sentences.filter((s) => TRIAD.test(s)).length / sentences.length
    : 0;
  const paraLengths = paragraphTexts.map(countWords).filter((n) => n >= 20);
  const paraCv = paraLengths.length >= 3 ? stdev(paraLengths) / mean(paraLengths) : NaN;
  const structure = clamp01(
    scale(triadShare, 0.05, 0.4) * 0.6 +
      (Number.isNaN(paraCv) ? 0.2 : scale(paraCv, 0.55, 0.12) * 0.4),
  );

  // 6. Surface irregularities: typos, odd spacing, varied punctuation are human tells.
  const irregular =
    (text.match(/ {2,}\S/g)?.length ?? 0) +
    (text.match(/[.!?]\s+[a-z]/g)?.length ?? 0) +
    (text.match(/\s[,.;:]/g)?.length ?? 0) +
    (text.match(/[!?]{2,}|\.{3,}|…/g)?.length ?? 0) +
    (text.match(/[(\[]/g)?.length ?? 0) * 0.5 +
    (text.match(/\?/g)?.length ?? 0) * 0.5;
  const polish = scale(per100(irregular), 1.6, 0.1) * 0.5;

  const weighted: [SignalResult, number][] = [
    [
      {
        key: "rhythm",
        label: "Sentence rhythm",
        score: Math.round(rhythm * 100),
        detail: Number.isNaN(cv)
          ? "Too few sentences to measure variation."
          : `Sentence length varies by ${Math.round(cv * 100)}% around the average. Human writing usually varies more (60%+); uniform lengths are typical of AI text.`,
      },
      0.26,
    ],
    [
      {
        key: "vocabulary",
        label: "Stock AI phrasing",
        score: Math.round(vocabulary * 100),
        detail: `${phraseRate.toFixed(1)} over-used phrases per 100 words (e.g. “delve”, “plays a crucial role”, “moreover”).`,
      },
      0.24,
    ],
    [
      {
        key: "transitions",
        label: "Formal connectives",
        score: Math.round(transitions * 100),
        detail: `${Math.round(transitionShare * 100)}% of sentences open with a connective such as “However,” or “Additionally,”.`,
      },
      0.14,
    ],
    [
      {
        key: "voice",
        label: "Lack of personal voice",
        score: Math.round(voice * 100),
        detail:
          voice > 0.3
            ? "Few contractions, first-person references or casual wording."
            : "Contains contractions, first-person references or casual wording typical of a human author.",
      },
      0.16,
    ],
    [
      {
        key: "structure",
        label: "Formulaic structure",
        score: Math.round(structure * 100),
        detail: `${Math.round(triadShare * 100)}% of sentences use a list-of-three pattern; paragraph sizes are ${Number.isNaN(paraCv) ? "too few to compare" : paraCv < 0.3 ? "very even" : "varied"}.`,
      },
      0.1,
    ],
    [
      {
        key: "polish",
        label: "Uniform polish",
        score: Math.round(polish * 100),
        detail:
          polish > 0.3
            ? "Almost no typos, irregular spacing or expressive punctuation."
            : "Contains the small irregularities common in human drafting.",
      },
      0.1,
    ],
  ];

  const docScore = weighted.reduce((sum, [s, w]) => sum + (s.score / 100) * w, 0);

  // Per-sentence scoring: local evidence, anchored to the document-level score.
  const medianLength = median(proseLengths.length ? proseLengths : [15]);
  const scoreSentence = (sentence: string): SentenceResult => {
    const words = countWords(sentence);
    const sLower = sentence.toLowerCase().replace(/’/g, "'");
    const signals: string[] = [];
    let local = 0.38;

    if (words < 4) {
      const score = Math.round(docScore * 70);
      return { text: sentence, score, band: bandFor(score), signals };
    }

    const hits = phraseHits(sLower);
    if (hits.length) {
      local += Math.min(0.36, 0.14 * hits.length);
      signals.push(`Stock phrasing: ${hits.slice(0, 3).map((h) => `“${h}”`).join(", ")}`);
    }
    if (TRANSITION_START.test(sentence)) {
      local += 0.1;
      signals.push("Opens with a formal connective");
    }
    if (TRIAD.test(sentence)) {
      local += 0.08;
      signals.push("List-of-three pattern");
    }
    if (Math.abs(words - medianLength) <= medianLength * 0.2 && rhythm > 0.55) {
      local += 0.07;
      signals.push("Length matches the document's uniform rhythm");
    }
    if (words >= 12 && /, (which|while|as|and|ensuring|making|allowing|highlighting|reflecting)\b/i.test(sentence)) {
      local += 0.05;
      signals.push("Balanced trailing clause");
    }

    const human =
      (sLower.match(CONTRACTION)?.length ?? 0) +
      (sLower.match(FIRST_PERSON)?.length ?? 0) * 0.6 +
      (sLower.match(INFORMAL)?.length ?? 0) * 1.5 +
      (/[!?]{2,}|\.{3,}|…|\?$/.test(sentence) ? 1 : 0) +
      (/^[a-z]/.test(sentence) ? 1 : 0);
    if (human > 0) {
      local -= Math.min(0.3, 0.11 * human);
      signals.push("Personal or informal voice");
    }
    if (words <= 6 || words >= medianLength * 2.2) {
      local -= 0.08;
      signals.push("Unusually short or long for this document");
    }

    const score = Math.round(clamp01(local * 0.55 + docScore * 0.5) * 100);
    return { text: sentence, score, band: bandFor(score), signals };
  };

  const paragraphs = paragraphSentences.map((ss) => ss.map(scoreSentence));
  const flat = paragraphs.flat();
  const sentenceMean = wordCount
    ? flat.reduce((sum, s, i) => sum + s.score * lengths[i], 0) / wordCount
    : 0;
  const score = Math.round(clamp01(docScore * 0.6 + (sentenceMean / 100) * 0.4) * 100);

  return {
    score,
    wordCount,
    sentenceCount: sentences.length,
    signals: weighted.map(([s]) => s),
    paragraphs,
  };
}
