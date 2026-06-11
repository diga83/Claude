/* One-off migration: src/data/*.js modules -> content/encyclopedia/*.json
   so the admin backend can edit encyclopedia content without touching code. */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src", "data");
const OUT = path.join(ROOT, "content", "encyclopedia");

const ORDER = [
  "behavior", "communication", "health", "nutrition", "can-cats-eat", "toxic",
  "kittens", "breeds", "grooming", "litter-training", "senior", "reproduction",
  "living", "science"
];

fs.mkdirSync(OUT, { recursive: true });

for (const file of fs.readdirSync(SRC)) {
  if (!file.endsWith(".js")) continue;
  const mod = await import(pathToFileURL(path.join(SRC, file)).href);
  const cat = mod.default;
  const order = ORDER.indexOf(cat.slug);
  const json = { slug: cat.slug, name: cat.name, tagline: cat.tagline, icon: cat.icon, order, entries: cat.entries };
  fs.writeFileSync(path.join(OUT, `${cat.slug}.json`), JSON.stringify(json, null, 2) + "\n");
  console.log(`${cat.slug}.json  (${cat.entries.length} entries)`);
}
