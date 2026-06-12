#!/usr/bin/env node
/* Builds assets/js/search-index.js from the chapter HTML files.
   Run with: node build_search_index.js
   Extracts each chapter's <h2> sections and their text content so the
   site-wide search and the print summaries page can use them. */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, 'chapters');
const OUT = path.join(__dirname, 'assets', 'js', 'search-index.js');

// Pull chapter titles from data.js
const dataSrc = fs.readFileSync(path.join(__dirname, 'assets', 'js', 'data.js'), 'utf8');
const titles = {};
const re = /id:\s*(\d+),[\s\S]*?title:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(dataSrc)) !== null) titles[Number(m[1])] = m[2];

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

const index = [];
const files = fs.readdirSync(CHAPTERS_DIR).filter(f => /^chapter-\d+\.html$/.test(f));
files.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

for (const file of files) {
  const chId = parseInt(file.match(/\d+/)[0]);
  const html = fs.readFileSync(path.join(CHAPTERS_DIR, file), 'utf8');
  const contentMatch = html.match(/<div class="chapter-content">([\s\S]*?)<div class="chapter-actions">/);
  const content = contentMatch ? contentMatch[1] : html;

  // Walk h2/h3 headings in document order — app.js assigns ids h-1, h-2, ...
  // to BOTH h2 and h3, so we must count them the same way. Sections are
  // delimited by h2s; the id recorded is the h2's position in the combined
  // h2+h3 sequence.
  const headingRe = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const matches = [];
  let hm;
  while ((hm = headingRe.exec(content)) !== null) {
    matches.push({ level: hm[1], heading: stripTags(hm[2]), start: hm.index, end: headingRe.lastIndex });
  }
  const sections = [];
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].level !== '2') continue;
    // Body runs to the next h2 (text under intervening h3s belongs to this section)
    let bodyEnd = content.length;
    for (let j = i + 1; j < matches.length; j++) {
      if (matches[j].level === '2') { bodyEnd = matches[j].start; break; }
    }
    const body = stripTags(content.slice(matches[i].end, bodyEnd)).slice(0, 6000);
    sections.push({ heading: matches[i].heading, id: 'h-' + (i + 1), text: body });
  }
  index.push({ chId, title: titles[chId] || `Chapter ${chId}`, sections });
}

const out =
  '/* Auto-generated full-text search index for chapter content.\n' +
  '   Built by build_search_index.js — do not edit by hand.\n*/\n' +
  'const CHAPTER_SEARCH_INDEX = ' + JSON.stringify(index, null, 1) + ';\n' +
  "if (typeof window !== 'undefined') window.CHAPTER_SEARCH_INDEX = CHAPTER_SEARCH_INDEX;\n";

fs.writeFileSync(OUT, out);
console.log(`Wrote ${OUT}: ${index.length} chapters, ` +
  index.reduce((s, c) => s + c.sections.length, 0) + ' sections');
