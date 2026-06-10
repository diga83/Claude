/* Produces dist-portable/ — a copy of dist/ that renders correctly when
   opened directly from the file system (file://), no web server needed:
   - root-absolute URLs rewritten to relative ones per page depth
   - directory links pointed at their index.html
   - the search index embedded as a script so the palette works without fetch()
   Run after `npm run build`:  node scripts/make-portable.mjs */
import { cpSync, readFileSync, writeFileSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const SRC = "dist";
const OUT = "dist-portable";

rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

/* collect every html file */
function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const files = walk(OUT);
const htmlFiles = files.filter((f) => f.endsWith(".html"));

/* embed the search index as a plain script (fetch() is blocked on file://) */
const indexJson = readFileSync(join(OUT, "search-index.json"), "utf8");
writeFileSync(join(OUT, "search-index.js"), "window.__CE_INDEX = " + indexJson + ";\n");

/* patch site.js to prefer the embedded index */
const siteJsPath = join(OUT, "scripts", "site.js");
let siteJs = readFileSync(siteJsPath, "utf8");
siteJs = siteJs.replace(
  'indexPromise = fetch("/search-index.json").then(function (r) { return r.json(); });',
  'indexPromise = window.__CE_INDEX ? Promise.resolve(window.__CE_INDEX) : fetch("/search-index.json").then(function (r) { return r.json(); });'
);
writeFileSync(siteJsPath, siteJs);

const PAGE_EXT = /\.(css|js|json|xml|txt|ico|png|jpe?g|webp|svg|gif|avif|woff2?)(\?|#|$)/i;

function rewrite(html, depth) {
  const prefix = depth === 0 ? "./" : "../".repeat(depth);

  const fixPath = (path) => {
    // path arrives without the leading slash
    const [clean, suffix = ""] = splitHash(path);
    if (clean === "") return prefix + "index.html" + suffix;
    if (clean.endsWith("/")) return prefix + clean + "index.html" + suffix;
    if (PAGE_EXT.test(clean)) return prefix + clean + suffix;
    // extensionless page path like "blog" -> directory index
    return prefix + clean + "/index.html" + suffix;
  };

  function splitHash(p) {
    const i = p.search(/[#?]/);
    return i === -1 ? [p, ""] : [p.slice(0, i), p.slice(i)];
  }

  return html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (m, attr, path) => {
    return `${attr}="${fixPath(path)}"`;
  });
}

for (const file of htmlFiles) {
  const rel = relative(OUT, file);
  const depth = dirname(rel) === "." ? 0 : dirname(rel).split(/[\\/]/).length;
  let html = readFileSync(file, "utf8");
  html = rewrite(html, depth);
  // set the base prefix and load the embedded search index before site.js
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  html = html.replace(
    /<script src="([^"]*scripts\/site\.js)" defer><\/script>/,
    `<script>window.__CE_BASE="${prefix}";</script><script src="${prefix}search-index.js"></script><script src="$1" defer></script>`
  );
  writeFileSync(file, html);
}

console.log(`portable build: ${htmlFiles.length} pages rewritten -> ${OUT}/`);
