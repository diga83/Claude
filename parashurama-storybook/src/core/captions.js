// Storybook captions: a serif line that builds word by word, white with one italic coral word, soft shadow.
// Chunks are cut from the narration itself (at commas / full stops, 3-6 words); each word appears as it is spoken.
import { ctx, clamp, seg, eo } from './lib.js';
import { T, lineWords } from './timing.js';

export const CAP = { y: 1390, size: 82, maxW: 900, lh: 96 };
const KEY = ['ayodhya', 'dasharatha', 'rama', "rama's", 'vishnu', 'ravana', 'lanka', 'shiva', 'sita', 'exile', 'lakshmana', 'deer', 'chariot', 'sea', 'jatayu', 'hanuman', 'ocean', 'ring', 'ablaze', 'bridge', 'name', 'battle', 'arrow', 'fell', 'together', 'home', 'lamps', 'diwali', 'peace', 'seventh', 'right', 'light', 'promise', 'smiled', 'gentle', 'forests', 'heartbroken', 'revenge', 'crowned', 'avatar', 'terror', 'two'];
const norm = (w) => String(w).toLowerCase().replace(/[^a-z0-9']+/g, '');
let caps = [];

export function buildCaptions(script) {
  caps = []; if (script.keywords) { KEY.length = 0; KEY.push(...script.keywords.map((k) => k.toLowerCase())); }
  script.lines.forEach((ln, i) => {
    const ws = lineWords(i); if (!ws.length) return;
    let cur = [];
    const flush = () => { if (cur.length) { caps.push({ line: i, words: cur }); cur = []; } };
    const P = (k) => /[,.?!]$/.test(ws[k].w), STOP = ['the', 'a', 'an', 'of', 'to', 'in', 'on', 'his', 'her', 'and', 'with', 'by', 'for', 'that', 'was', 'is', 'he', 'it', 'they', 'no', 'or', 'as', 'at', 'from', 'into', 'its', 'your', 'this', 'had', 'him', 'them', 'old'];
    ws.forEach((w, k) => { cur.push({ txt: w.w, s: w.s });
      const rest = ws.length - k - 1, near = (k + 1 < ws.length && P(k + 1)) || (k + 2 < ws.length && P(k + 2));
      if (rest === 0) return;
      if ((P(k) && cur.length >= 2 && rest >= 2) || (cur.length >= 5 && rest >= 3 && !near && !STOP.includes(norm(w.w)))) flush(); });
    flush();
  });
  for (let k = caps.length - 1; k > 0; k--) if (caps[k].words.length < 2 && caps[k - 1].line === caps[k].line) { caps[k - 1].words.push(...caps[k].words); caps.splice(k, 1); }
  caps.forEach((c, k) => {
    let hi = -1; for (let j = c.words.length - 1; j >= 0; j--) if (KEY.includes(norm(c.words[j].txt))) { hi = j; break; }
    if (hi < 0) { const sc = (w) => (['but', 'when', 'then', 'that', 'where', 'because', 'every', 'even', 'only', 'after', 'until', 'still'].includes(norm(w.txt)) ? 1 : norm(w.txt).length); hi = c.words.reduce((b, w, j) => (sc(w) >= sc(c.words[b]) ? j : b), 0); }
    c.words.forEach((w, j) => (w.hi = j === hi));
    c.s = c.words[0].s - 0.06; const next = caps[k + 1], lineEnd = T.lines[c.line].end;
    c.e = next ? Math.min(next.words[0].s - 0.06, lineEnd + 0.9) : T.dur;
  });
  return caps;
}
export const captionList = () => caps.map((c) => ({ s: c.s, e: c.e, words: c.words.map((w) => ({ txt: w.txt, hi: w.hi })) }));

const font = (hi, size) => (hi ? `italic 600 ${size * 1.06}px Cormorant` : `500 ${size}px Cormorant`);
export function drawCaption(t) {
  const c = caps.find((c) => t >= c.s && t < c.e); if (!c) return;
  const size = CAP.size, sp = size * 0.26;
  c.words.forEach((w) => { ctx.font = font(w.hi, size); w.w = ctx.measureText(w.txt).width; });
  const lines = [[]]; let x = 0;
  for (const w of c.words) { if (x + w.w > CAP.maxW && lines[lines.length - 1].length) { lines.push([]); x = 0; } lines[lines.length - 1].push(w); x += w.w + sp; }
  if (lines.length === 2 && lines[1].length === 1 && lines[0].length > 2) lines[1].unshift(lines[0].pop());
  const out = clamp((c.e - t) / 0.18);
  ctx.save(); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  { const g = ctx.createRadialGradient(540, CAP.y - 20, 40, 540, CAP.y - 20, 560); g.addColorStop(0, `rgba(14,6,3,${0.62 * out})`); g.addColorStop(1, 'rgba(14,6,3,0)'); ctx.save(); ctx.translate(540, CAP.y - 20); ctx.scale(1, 0.34); ctx.translate(-540, -(CAP.y - 20)); ctx.fillStyle = g; ctx.fillRect(-100, CAP.y - 700, 1280, 1400); ctx.restore(); }
  const y0 = CAP.y - (lines.length - 1) * CAP.lh / 2;
  lines.forEach((ln, li) => {
    const wd = ln.reduce((a, w) => a + w.w, 0) + sp * (ln.length - 1); let px = 540 - wd / 2; const y = y0 + li * CAP.lh;
    for (const w of ln) { const a = eo(seg(t, w.s - 0.06, w.s + 0.16)) * out;
      if (a > 0) { ctx.globalAlpha = a; ctx.font = font(w.hi, size);
        ctx.shadowColor = 'rgba(10,4,2,0.85)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 4; ctx.fillStyle = w.hi ? '#FFB9A6' : '#FFF8EC'; ctx.fillText(w.txt, px, y + (1 - a) * 14);
        ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; ctx.fillText(w.txt, px, y + (1 - a) * 14); }
      px += w.w + sp; }
  });
  ctx.restore(); ctx.globalAlpha = 1;
}
