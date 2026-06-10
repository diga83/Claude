/* Aggregates the 14 category content modules into the structures
   the pages and the search index endpoint build from. */
import behavior from "../data/behavior.js";
import communication from "../data/communication.js";
import health from "../data/health.js";
import nutrition from "../data/nutrition.js";
import canCatsEat from "../data/can-cats-eat.js";
import toxic from "../data/toxic.js";
import kittens from "../data/kittens.js";
import breeds from "../data/breeds.js";
import grooming from "../data/grooming.js";
import litterTraining from "../data/litter-training.js";
import senior from "../data/senior.js";
import reproduction from "../data/reproduction.js";
import living from "../data/living.js";
import science from "../data/science.js";

export const CATEGORIES = [
  behavior, communication, health, nutrition, canCatsEat, toxic, kittens,
  breeds, grooming, litterTraining, senior, reproduction, living, science
];

/* per-category color hue (drives card gradients) */
const HUES = {
  behavior: 25, communication: 200, health: 350, nutrition: 145,
  "can-cats-eat": 95, toxic: 8, kittens: 320, breeds: 265,
  grooming: 178, "litter-training": 45, senior: 222,
  reproduction: 335, living: 160, science: 285
};

export function hue(slug) {
  return HUES[slug] ?? 25;
}

export const TOTAL_ENTRIES = CATEGORIES.reduce((n, c) => n + c.entries.length, 0);

export function categoryUrl(cat) {
  return `/${cat.slug}/`;
}

export function entryUrl(cat, entry) {
  return `/${cat.slug}/${entry.id}/`;
}

/* flat list used by the search-index endpoint and related-question picking */
export const FLAT = CATEGORIES.flatMap((cat) =>
  cat.entries.map((entry) => ({ cat, entry }))
);

/* naive related-entry picker: same category first, then tag overlap elsewhere */
export function relatedEntries(cat, entry, count = 4) {
  const tags = new Set(entry.tags || []);
  const scored = [];
  for (const item of FLAT) {
    if (item.entry === entry) continue;
    let score = item.cat === cat ? 2 : 0;
    for (const t of item.entry.tags || []) if (tags.has(t)) score += 3;
    if (score > 0) scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const picks = scored.slice(0, count).map((s) => s.item);
  // pad from same category if tag overlap was thin
  for (const item of FLAT) {
    if (picks.length >= count) break;
    if (item.cat === cat && item.entry !== entry && !picks.includes(item)) picks.push(item);
  }
  return picks;
}

export const POPULAR = [
  ["behavior", "why-do-cats-purr"],
  ["behavior", "why-do-cats-knead"],
  ["health", "cat-vomiting-when-to-worry"],
  ["can-cats-eat", "can-cats-eat-chocolate"],
  ["toxic", "are-lilies-toxic-to-cats"],
  ["litter-training", "why-is-my-cat-peeing-outside-the-box"],
  ["senior", "how-long-do-cats-live"],
  ["nutrition", "wet-vs-dry-food"],
  ["science", "do-cats-always-land-on-their-feet"],
  ["communication", "cat-tail-positions-meaning"],
  ["kittens", "when-can-kittens-leave-mother"],
  ["science", "do-cats-love-their-owners"]
].map(([slug, id]) => {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const entry = cat?.entries.find((e) => e.id === id);
  return cat && entry ? { cat, entry } : null;
}).filter(Boolean);
