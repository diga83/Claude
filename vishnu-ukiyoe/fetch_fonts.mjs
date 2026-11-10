// one-time: fetch the OFL fonts into fonts/ (Shippori Mincho B1 latin 500; Yuji Syuku subset to the kanji used here)
import fs from 'fs';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const get = async (u, o) => { const r = await fetch(u, o); if (!r.ok) throw new Error(`${u}: HTTP ${r.status}`); return r; };
const KANJI = '一二三四五六乳海攪拌亀宝吉祥天甘露毘紐';
const fams = [['Shippori', 500, 'family=Shippori+Mincho+B1:wght@500'], ['Yuji', 400, `family=Yuji+Syuku&text=${encodeURIComponent(KANJI)}`]];
let css = '/* Google Fonts, SIL Open Font License 1.1 */\\n'; let n = 0;
for (const [name, w, q] of fams) {
  const src = await (await get(`https://fonts.googleapis.com/css2?${q}&display=block`, { headers: { 'User-Agent': UA } })).text();
  const blocks = src.split('/*').map(b => b.trim()).filter(Boolean);
  for (const b0 of blocks.length ? blocks : [src]) {
    const b = b0.startsWith('@') ? b0 : b0.slice(b0.indexOf('*/') + 2);
    if (name === 'Shippori' && !/latin \*\//.test('/*' + b0) && !b0.startsWith('@')) continue;
    const u = (b.match(/https:\/\/[^)]+/) || [])[0]; if (!u) continue;
    const ur = (b.match(/unicode-range:([^;]*);/) || [])[1];
    const f = `f${n++}.woff2`; fs.writeFileSync('fonts/' + f, Buffer.from(await (await get(u)).arrayBuffer()));
    css += `@font-face { font-family: '${name}'; font-weight: ${w}; font-display: block; src: url(${f}) format('woff2');${ur ? ' unicode-range:' + ur + ';' : ''} }\n`;
  }
}
fs.writeFileSync('fonts/fonts.css', css.replace('\\n', '\n')); console.log('fonts', n);
