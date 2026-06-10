/* Build-time search index consumed lazily by the command palette. */
import { CATEGORIES, entryUrl } from "../lib/data.js";

export function GET() {
  const index = [];
  for (const cat of CATEGORIES) {
    for (const entry of cat.entries) {
      index.push({
        q: entry.q,
        a: entry.a,
        t: (entry.tags || []).join(" "),
        cat: cat.slug,
        catName: cat.name,
        icon: cat.icon,
        url: entryUrl(cat, entry)
      });
    }
  }
  const categories = CATEGORIES.map((c) => ({
    name: c.name,
    icon: c.icon,
    count: c.entries.length,
    url: `/${c.slug}/`
  }));
  return new Response(JSON.stringify({ index, categories }), {
    headers: { "Content-Type": "application/json" }
  });
}
