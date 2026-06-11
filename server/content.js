/* File-backed content the admin edits: blog posts (markdown with
   frontmatter in src/content/blog) and encyclopedia categories
   (content/encyclopedia/*.json). Astro reads the same files at build time. */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");
const ENCY_DIR = path.join(ROOT, "content", "encyclopedia");

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled";
}

function assertSafeSlug(slug) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error("Invalid slug");
}

/* ---------- blog posts ---------- */

/* Minimal frontmatter handling for the known schema (see src/content.config.ts).
   Serialization uses JSON-compatible scalars, which are valid YAML. */
const FM_KEYS = ["title", "description", "pubDate", "updatedDate", "heroImage", "tags", "draft"];

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv || !FM_KEYS.includes(kv[1])) continue;
    const [, key, valueRaw] = kv;
    let value = valueRaw.trim();
    if (value.startsWith("[") || value.startsWith('"')) {
      try { value = JSON.parse(value); } catch { /* keep raw string */ }
    } else if (value === "true" || value === "false") {
      value = value === "true";
    }
    data[key] = value;
  }
  return { data, body: raw.slice(m[0].length) };
}

function serializePost({ title, description, pubDate, updatedDate, heroImage, tags, draft }, body) {
  const lines = ["---"];
  lines.push(`title: ${JSON.stringify(title)}`);
  lines.push(`description: ${JSON.stringify(description)}`);
  lines.push(`pubDate: ${pubDate}`);
  if (updatedDate) lines.push(`updatedDate: ${updatedDate}`);
  if (heroImage) lines.push(`heroImage: ${JSON.stringify(heroImage)}`);
  lines.push(`tags: ${JSON.stringify(tags || [])}`);
  lines.push(`draft: ${draft ? "true" : "false"}`);
  lines.push("---", "");
  return lines.join("\n") + body.replace(/\r\n/g, "\n").trim() + "\n";
}

export function listPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data } = parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, f), "utf8"));
      return { slug, ...data };
    })
    .sort((a, b) => String(b.pubDate).localeCompare(String(a.pubDate)));
}

export function readPost(slug) {
  assertSafeSlug(slug);
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  return { slug, ...data, body };
}

export function writePost(slug, meta, body, { previousSlug } = {}) {
  assertSafeSlug(slug);
  if (!meta.title?.trim()) throw new Error("Title is required");
  if (!meta.description?.trim()) throw new Error("Description is required");
  if (!/^\d{4}-\d{2}-\d{2}/.test(meta.pubDate || "")) throw new Error("Publish date must be YYYY-MM-DD");
  if (previousSlug && previousSlug !== slug) {
    assertSafeSlug(previousSlug);
    fs.rmSync(path.join(BLOG_DIR, `${previousSlug}.md`), { force: true });
  }
  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), serializePost(meta, body));
}

export function deletePost(slug) {
  assertSafeSlug(slug);
  fs.rmSync(path.join(BLOG_DIR, `${slug}.md`), { force: true });
}

/* ---------- encyclopedia ---------- */

export function listCategories() {
  return fs
    .readdirSync(ENCY_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(ENCY_DIR, f), "utf8")))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function readCategory(slug) {
  assertSafeSlug(slug);
  const file = path.join(ENCY_DIR, `${slug}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
}

function writeCategory(cat) {
  fs.writeFileSync(path.join(ENCY_DIR, `${cat.slug}.json`), JSON.stringify(cat, null, 2) + "\n");
}

export function saveEntry(catSlug, entryId, { q, a, tags }, { isNew = false } = {}) {
  const cat = readCategory(catSlug);
  if (!cat) throw new Error("Unknown category");
  if (!q?.trim() || !a?.trim()) throw new Error("Question and answer are required");
  assertSafeSlug(entryId);
  const tagList = (Array.isArray(tags) ? tags : String(tags || "").split(","))
    .map((t) => String(t).trim())
    .filter(Boolean);
  const existing = cat.entries.findIndex((e) => e.id === entryId);
  const entry = { id: entryId, q: q.trim(), a: a.trim(), tags: tagList };
  if (isNew) {
    if (existing !== -1) throw new Error("An entry with that ID already exists");
    cat.entries.push(entry);
  } else {
    if (existing === -1) throw new Error("Entry not found");
    cat.entries[existing] = entry;
  }
  writeCategory(cat);
}

export function deleteEntry(catSlug, entryId) {
  const cat = readCategory(catSlug);
  if (!cat) throw new Error("Unknown category");
  cat.entries = cat.entries.filter((e) => e.id !== entryId);
  writeCategory(cat);
}
