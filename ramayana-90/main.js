// The Ramayana in 90 seconds: thirteen full-bleed watercolour panels, narration wall to wall. 1080x1920.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const DUR = 90; window.DUR = DUR;
let PAPER_IMG;
const EV = []; window.EV = EV; const ev = (t, type, o = {}) => EV.push({ t: +t.toFixed(3), type, ...o });
const paper = c => c.drawImage(PAPER_IMG, 0, 0);
// ---------- helpers ----------
const RES = 1.5;
function spriteR(L, res = RES) {
  const [x0, y0, x1, y1] = bbox(L), c2 = document.createElement('canvas');
  c2.width = Math.max(1, Math.ceil((x1 - x0) * res)); c2.height = Math.max(1, Math.ceil((y1 - y0) * res));
  const c = c2.getContext('2d'); c.scale(res, res); c.translate(-x0, -y0); for (const s of L) drawS(c, s, 1);
  return { cv: c2, x0, y0, x1, y1 };
}
const O = (L, x, y, t0, t1, o = {}) => ({ L, x, y, t0, t1, rot: o.rot || 0, sway: o.sway || 0, ph: o.ph || 0, spr: spriteR(L, o.res || RES) });
function draw(c, ob, t, o = {}) {
  const p = seg(t, ob.t0, ob.t1); if (p <= 0) return;
  c.save(); c.translate(ob.x + (o.dx || 0), ob.y + (o.dy || 0)); const r = ob.rot + (o.rot || 0); if (r) c.rotate(r);
  if (o.sy) c.scale(1, o.sy);
  if (o.alpha !== undefined) c.globalAlpha *= o.alpha;
  if (ob.sway) c.transform(1, 0, ob.sway * (Math.sin(1.15 * t + ob.ph) + .4 * Math.sin(2.7 * t + 2 * ob.ph)) * p, 1, 0, 0);
  if (p < 1) drawList(c, ob.L, p); else { const s = ob.spr; c.drawImage(s.cv, s.x0, s.y0, s.x1 - s.x0, s.y1 - s.y0); }
  c.restore();
}
const fade2 = (t, a, b, fi, fo) => Math.min(ss(seg(t, a, a + fi)), 1 - ss(seg(t, b - fo, b)));
let TX = [];
function hand(c, txt, x, y, p, o = {}) {
  if (p <= 0) return;
  c.save(); c.font = `${o.w || 600} ${o.size || 44}px Caveat`; c.textAlign = o.align || 'left'; c.textBaseline = 'middle';
  const w = c.measureText(txt).width, x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
  c.beginPath(); c.rect(x0 - 8, y - o.size, (w + 16) * eo(p), o.size * 2); c.clip(); c.globalAlpha = o.alpha ?? 1;
  c.shadowColor = o.light ? 'rgba(20,24,40,.9)' : rgba(PAPER, .95); c.shadowBlur = 14; c.fillStyle = o.light ? rgba('#f6efe0', .95) : rgba(o.col || INK, o.a ?? .92); c.fillText(txt, x, y); c.fillText(txt, x, y);
  c.restore();
  if (o.id && p >= 1 && (o.alpha ?? 1) > .6) TX.push({ id: o.id, text: txt, x0, y0: y - o.size * .6, x1: x0 + w, y1: y + o.size * .6 });
}
function mono(c, txt, x, y, a, id, o = {}) {
  if (a <= 0) return;
  const size = o.size || 22;
  c.save(); c.font = `400 ${size}px "IBM Plex Mono"`; c.letterSpacing = (o.sp ?? 5) + 'px'; c.textAlign = o.align || 'center'; c.textBaseline = 'middle';
  c.shadowColor = o.light ? 'rgba(20,24,40,.9)' : rgba(PAPER, .95); c.shadowBlur = 10; c.fillStyle = o.light ? rgba('#f6efe0', .92 * a) : rgba(o.col || INK, .8 * a); c.fillText(txt, x, y); const w = c.measureText(txt).width; c.restore();
  const x0 = o.align === 'left' ? x : x - w / 2;
  if (id && a > .6) TX.push({ id, text: txt, x0, y0: y - size * .6, x1: x0 + w, y1: y + size * .6 });
}
function serif(c, txt, x, y, p, o = {}) {
  if (p <= 0) return;
  const size = o.size || 80;
  c.save(); c.font = `${o.it ? 'italic ' : ''}500 ${size}px "Cormorant Garamond"`; c.letterSpacing = (o.sp || 0) + 'px'; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
  const w = c.measureText(txt).width; c.beginPath(); c.rect(x - w / 2 - 30, y - size, (w + 60) * eio(p), size * 1.4); c.clip(); c.globalAlpha = o.alpha ?? 1;
  c.shadowColor = o.light ? 'rgba(20,24,40,.9)' : rgba(PAPER, .9); c.shadowBlur = 12; c.fillStyle = o.light ? rgba('#f6efe0', .95) : rgba(INK, o.a ?? .9); c.fillText(txt, x + (o.sp || 0) / 2, y); c.restore();
  if (o.id && p >= 1 && (o.alpha ?? 1) > .6) TX.push({ id: o.id, text: txt, x0: x - w / 2, y0: y - size * .8, x1: x + w / 2, y1: y + size * .2 });
}
function leader(c, x0, y0, x1, y1, p, bend = 30, a = .75) {
  if (p <= 0) return;
  const pts = qcurve(x0, y0, x1, y1, bend, 16), m = Math.max(1, Math.round(16 * clamp(p)));
  c.beginPath(); for (let i = 0; i <= m; i++) i ? c.lineTo(pts[i][0], pts[i][1]) : c.moveTo(pts[i][0], pts[i][1]);
  c.strokeStyle = rgba(INK, a); c.lineWidth = 2; c.lineCap = 'round'; c.stroke();
  if (p >= 1) { c.beginPath(); c.arc(x1, y1, 3.5, 0, 7); c.fillStyle = rgba(INK, a); c.fill(); }
}
function note(c, t, t0, t1, lx, ly, ax, ay, name, role, id, bend = 40) {
  const f = 1 - ss(seg(t, t1 - .45, t1)); if (t < t0 || f <= 0) return;
  c.save(); c.globalAlpha = f; leader(c, lx + 20, ly + 80, ax, ay, seg(t, t0 + .9, t0 + 1.5), bend); c.restore();
  hand(c, name, lx, ly, seg(t, t0, t0 + .7), { size: 70, id: id + '_n', alpha: f });
  hand(c, role, lx + 6, ly + 58, seg(t, t0 + .35, t0 + 1.1), { size: 42, w: 500, id: id + '_r', alpha: f, a: .8 });
}
const camAt = (c, s, cx, cy) => { c.translate(540, 960); c.scale(s, s); c.translate(-cx, -cy); };
function wipe(t, t0, d, drawA, drawB) {   // a brush-edge wipe: a wavy vertical edge sweeps left to right
  drawA(ctx, t);
  const p = eio(seg(t, t0, t0 + d)), ex = lerp(-160, W + 160, p);
  ctx.save(); ctx.beginPath(); ctx.moveTo(-10, -10);
  for (let y = -10; y <= H + 40; y += 30) ctx.lineTo(ex + (vnoise(y * .006 + 3) - .5) * 220 + Math.sin(y * .02 + t * 3) * 14, y);
  ctx.lineTo(-10, H + 10); ctx.closePath(); ctx.clip(); paper(ctx); drawB(ctx, t); ctx.restore();
}
function wrap(txt, maxW) {
  if (ctx.measureText(txt).width <= maxW) return [txt];
  const words = txt.split(' '); let best = null, bd = 1e9;
  for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(' '), b = words.slice(i).join(' '), wa = ctx.measureText(a).width, wb = ctx.measureText(b).width; if (wa <= maxW && wb <= maxW && Math.abs(wa - wb) < bd) { bd = Math.abs(wa - wb); best = [a, b]; } }
  if (best) return best;
  for (let i = 1; i < words.length; i++) for (let j = i + 1; j < words.length; j++) { const L = [words.slice(0, i), words.slice(i, j), words.slice(j)].map(w => w.join(' ')); const ws = L.map(l => ctx.measureText(l).width); if (Math.max(...ws) <= maxW && Math.max(...ws) - Math.min(...ws) < bd) { bd = Math.max(...ws) - Math.min(...ws); best = L; } }
  return best || [txt];
}
function drawSubs(t) {
  for (const [s, d, en] of SUBS) {
    const f = fade2(t, s - .15, s + d + .45, .25, .35); if (f <= 0) continue;
    ctx.save(); ctx.globalAlpha = f; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = 'italic 500 48px "Cormorant Garamond"'; const lines = wrap(en, 960), y0 = 1760 - (lines.length - 1) * 52;
    const yc = y0 + (lines.length - 1) * 26 - 16, g = ctx.createRadialGradient(540, yc, 10, 540, yc, 540);
    g.addColorStop(0, rgba(PAPER, .86)); g.addColorStop(.6, rgba(PAPER, .64)); g.addColorStop(1, rgba(PAPER, 0));
    ctx.save(); ctx.translate(540, yc); ctx.scale(1, .26 * lines.length / 2 + .1); ctx.translate(-540, -yc); ctx.fillStyle = g; ctx.fillRect(0, yc - 540, W, 1080); ctx.restore();
    ctx.shadowColor = rgba(PAPER, 1); ctx.shadowBlur = 22;
    for (let k = 0; k < 2; k++) { ctx.fillStyle = rgba(INK, .9); lines.forEach((ln, i) => ctx.fillText(ln, 540, y0 + i * 52)); }
    ctx.restore();
  }
}

// ---------- timeline: lines back to back; each panel begins just before its line ----------
const DURS = { c01: 7.291, c02: 8.027, c03: 9.12, c04: 4.968, c05: 4.94, c06: 5.919, c07: 7.726, c08: 5.05, c09: 6.355, c10: 4.774, c11: 4.926, c12: 6.058, c13: 2.491, c14: 2.103 };
const TEXT = ["In Ayodhya, King Dasharatha had four sons. The eldest, Rama, was brave, gentle, and true to his word.",
  "In Mithila, Princess Sita would marry whoever could string the mighty bow of Shiva. Rama lifted it, and it snapped in two.",
  "But on the eve of his crowning, Queen Kaikeyi claimed two old promises: her son Bharata as king, and Rama exiled for 14 years.",
  "Rama left without anger. Sita and his brother Lakshmana walked beside him.", "Bharata would not take the throne. He placed Rama's sandals upon it, and waited.",
  "In the forest, a golden deer appeared. Rama chased it, but it was a demon in disguise.", "Then Ravana, king of Lanka, seized Sita in his flying chariot. The brave vulture Jatayu fought him, and fell.",
  "Searching for her, Rama found friends: the monkey king Sugriva, and Hanuman.", "Hanuman leapt across the sea, gave Sita Rama's ring, and set Lanka ablaze with his burning tail.",
  "The army built a bridge of floating stones, each one marked with Rama's name.", "After a long war, Rama's arrow struck Ravana down, and Sita was free.",
  "They came home to Ayodhya, where every road was lit with lamps, and Rama was crowned at last.", "Every Diwali, those lamps are lit again.", "Rama: the one who kept his word."];
const VOICE = []; { let t = .5; Object.keys(DURS).forEach((id, i) => { VOICE.push([id, +t.toFixed(3)]); t += DURS[id] + (i === 12 ? .3 : .3); }); }
const SUBS = VOICE.map(([id, t], i) => [t, DURS[id], TEXT[i]]);
const PS = VOICE.slice(0, 13).map(([, t], i) => i === 0 ? -1 : t - .5);   // panel starts (13 panels; c14 shares the last)
const LAB = [['I', 'AYODHYA', 'four princes'], ['II', 'MITHILA', "Shiva's bow"], ['III', 'TWO PROMISES', "Kaikeyi's claim"], ['IV', 'EXILE', 'fourteen years'], ['V', 'THE SANDALS', "Bharata's throne"], ['VI', 'PANCHAVATI', 'the golden deer'],
  ['VII', 'THE ABDUCTION', 'Jatayu falls'], ['VIII', 'KISHKINDHA', 'Sugriva and Hanuman'], ['IX', 'LANKA', 'the ring, the fire'], ['X', 'RAMA SETU', 'the floating stones'], ['XI', 'THE WAR', "Ravana's fall"], ['XII', 'HOMECOMING', 'the lamps'], ['XIII', 'DIWALI', 'lit again']];
const P = Array.from({ length: 13 }, () => ({ bg: [], fg: [], live: null }));
const panelAt = t => { let k = 0; while (k < 12 && t >= PS[k + 1]) k++; return k; };
function drawPanel(c, t, k) {
  const p = P[k]; for (const ob of p.bg) draw(c, ob, t); for (const ob of p.fg) draw(c, ob, t, ob.liveRot ? { rot: ob.liveRot(t), dy: ob.liveDy ? ob.liveDy(t) : 0, dx: ob.liveDx ? ob.liveDx(t) : 0 } : {});
  if (p.live) p.live(c, t);
  const lt = k === 0 ? 0 : PS[k] + .6, end = k < 12 ? PS[k + 1] : DUR; const f = fade2(t, lt, end + .3, .4, .5);
  c.save(); c.globalAlpha = f; const g = c.createRadialGradient(540, 250, 10, 540, 250, 440); g.addColorStop(0, rgba(PAPER, .88)); g.addColorStop(1, rgba(PAPER, 0)); c.fillStyle = g; c.translate(540, 250); c.scale(1, .34); c.translate(-540, -250); c.fillRect(0, -300, W, 1100); c.restore();
  if (k < 12 || t < 84.4) { mono(c, `${LAB[k][0]} · ${LAB[k][1]}`, 540, 222, f, 'l' + k, { size: 26, sp: 7 }); hand(c, LAB[k][2], 540, 284, seg(t, lt + .3, lt + 1.1), { size: 52, w: 500, align: 'center', id: 'n' + k, alpha: f }); }
}
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; paper(ctx);
  const k = panelAt(t);
  if (k > 0 && t < PS[k] + .8) wipe(t, PS[k], .8, (c, tt) => drawPanel(c, tt, k - 1), (c, tt) => drawPanel(c, tt, k)); else drawPanel(ctx, t, k);
  if (t > 84.0) { serif(ctx, 'RAMA', 540, 330, seg(t, 84.0, 85.4), { size: 124, sp: 24, id: 'title' }); hand(ctx, 'the one who kept his word', 540, 412, seg(t, 85.6, 86.6), { size: 56, w: 500, align: 'center', id: 'tsub' }); }
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TX; };

// ---------- small figures ----------
function walker(c, x, y, s, robe, t, ph, bow = false) {
  const step = Math.floor(t * 8) / 8, sw = Math.sin(step * 7 + ph);
  c.save(); c.translate(x, y); c.scale(s, s);
  c.strokeStyle = rgba('#4a3a2e', .9); c.lineWidth = 7; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, -40); c.lineTo(-10 * sw, 0); c.moveTo(0, -40); c.lineTo(10 * sw, 0); c.stroke();
  c.fillStyle = robe; c.beginPath(); c.moveTo(-16, -40); c.lineTo(16, -40); c.lineTo(10, -92); c.lineTo(-10, -92); c.closePath(); c.fill();
  c.fillStyle = '#e2c9a2'; c.beginPath(); c.arc(0, -104, 12, 0, 7); c.fill(); c.fillStyle = '#3a2c22'; c.beginPath(); c.arc(0, -110, 11, Math.PI, 7); c.fill();
  if (bow) { c.strokeStyle = '#6b4a30'; c.lineWidth = 4; c.beginPath(); c.arc(-4, -70, 36, -1.2, 1.2); c.stroke(); }
  c.restore();
}
const flick = (c, x, y, s, t, i) => { const fl = .8 + .3 * vnoise(t * 6 + i * 2.3); c.save(); c.translate(x, y); c.scale(s, s * fl); for (const st of FLAME) drawS(c, st, 1); c.restore(); };
let FLAME;
function lamp(c, x, y, s, t, i, p = 1) { if (p <= 0) return; const gl = c.createRadialGradient(x, y - 18 * s, 2, x, y - 18 * s, 80 * s); gl.addColorStop(0, rgba('#f2c46a', .5 * p)); gl.addColorStop(1, rgba('#f2c46a', 0)); c.fillStyle = gl; c.fillRect(x - 80 * s, y - 100 * s, 160 * s, 160 * s); flick(c, x, y, .7 * s * eo(p), t, i); c.fillStyle = rgba('#8a6a44', .95); c.beginPath(); c.ellipse(x, y + 6 * s, 22 * s, 8 * s, 0, 0, 7); c.fill(); }

function build() {
  const WX = [-80, 1160], R5 = { res: .5 }, pre = k => (k === 0 ? -3 : PS[k] - 3), O2 = (L, k, a = .1, b = 1.4, o = {}) => O(L, o.x || 0, o.y || 0, PS[k] + a, PS[k] + b, o);
  const BG = (k, bands) => { P[k].bg = bands.map(([y0, y1, cols, n, a]) => O(wash(...WX, y0, y1, cols, n, a), 0, 0, pre(k), pre(k) + .01, R5)); };
  withSeed(5, () => { FLAME = flameStrokes(1); });
  withSeed(11, () => {   // I Ayodhya
    BG(0, [[0, 1100, ['#efd398', '#f2dfae', '#e8c46a'], 8, .45], [1100, 1400, ['#d4aa6c', '#dcb67e'], 3, .55], [1400, 1920, ['#6f8faa', '#8fb0c6', '#4f7090'], 7, .5]]);
    P[0].fg = [O(cityWalls(1.4), 540, 1180, -1, -.5), ...[[230, .42], [420, .42], [640, .42], [860, .62]].map(([x, s], i) => O(lotusBloom(s).S, x, 1470, .6 + i * .5, 1.6 + i * .5))];
  });
  withSeed(21, () => {   // II the bow
    BG(1, [[0, 1250, ['#f2ead0', '#efe2c4', '#e6d6b2'], 9, .5], [1250, 1920, ['#c99a5b', '#d4aa6c', '#b98a4c'], 7, .55]]);
    const bowPts = h => { const pts = []; for (let k = 0; k <= 14; k++) { const a = h < 0 ? -1.05 + k / 14 * 1.05 : k / 14 * 1.05; pts.push([Math.sin(a) * 430, -Math.cos(a) * 300 + 300]); } return h < 0 ? pts : pts; };   // around the grip (540, 760)
    const L = mk(bowPts(-1), 44, '#8a6a44', { prof: 'even', nb: 5, a: .95 }), Rr = mk(bowPts(1), 44, '#8a6a44', { prof: 'even', nb: 5, a: .95 });
    const half = (s_, sd) => ({ ...O([s_, edgeOf(s_, 1, 3, '#3a2c22', .7)], 540, 760, PS[1] + .2, PS[1] + 1.4), liveRot: t => sd * .55 * eio(seg(t, PS[1] + 7.0, PS[1] + 7.6)), liveDy: t => 90 * eio(seg(t, PS[1] + 7.0, PS[1] + 7.6)), liveDx: t => sd * 60 * eio(seg(t, PS[1] + 7.0, PS[1] + 7.6)) });
    P[1].fg = [half(L, -1), half(Rr, 1), O([mk(qcurve(-30, 0, 30, 0, 0, 3), 30, '#c8442a', { prof: 'even', nb: 2, a: .9 })], 540, 760, PS[1] + 1.0, PS[1] + 1.4)];
    const string_ = mk(qcurve(540 - 430 * Math.sin(1.05), 760 - 300 * Math.cos(1.05) + 300, 540 + 430 * Math.sin(1.05), 760 - 300 * Math.cos(1.05) + 300, 0, 10), 2.4, '#3a2c22', { prof: 'even', nb: 0, a: .8 });
    P[1].live = (c, t) => { if (t < PS[1] + 7.0) drawS(c, string_, seg(t, PS[1] + 1.2, PS[1] + 2.0)); const fl = seg(t, PS[1] + 7.0, PS[1] + 7.5); if (fl > 0 && fl < 1) { c.fillStyle = rgba('#f6efdc', .9 * (1 - fl)); c.beginPath(); c.arc(540, 760, 160 * fl + 20, 0, 7); c.fill(); }
      const gp = seg(t, PS[1] + 3.0, PS[1] + 4.2); if (gp > 0) for (let i = 0; i <= 22; i++) { const u = i / 22; if (u > gp) break; const x = 340 + u * 400, y = 1380 + Math.sin(u * Math.PI) * 120; c.fillStyle = i % 2 ? '#e8902e' : '#e0b04a'; c.beginPath(); c.arc(x, y, 14, 0, 7); c.fill(); } };
  });
  withSeed(31, () => {   // III two promises
    BG(2, [[0, 1920, ['#7a3a3a', '#8a4a3a', '#6e2a2a', '#9a5a3a'], 12, .55]]);
    P[2].fg = [O2(crown(1.2), 2, .2, 1.4, { x: 540, y: 1080 }), O2([mk(qcurve(320, 1260, 760, 1260, 0, 10), 60, '#c99a5b', { prof: 'even', nb: 4, a: .9 })], 2, .1, .8)];
    for (const [x, i] of [[300, 0], [780, 1]]) P[2].fg.push(O2([mk(qcurve(x - 70, 1500, x + 70, 1500, 0, 8), 40, '#efe2c4', { prof: 'even', nb: 3, a: .95 }), mk(qcurve(x - 10, 1500, x + 10, 1500, 0, 3), 30, '#c8442a', { prof: 'leaf', nb: 0, a: .95 })], 2, 2.2 + i * .6, 2.8 + i * .6));
    P[2].live = (c, t) => { const lp = seg(t, PS[2] + .4, PS[2] + 1.2); lamp(c, 200, 1180, 1.2, t, 1, lp); lamp(c, 880, 1180, 1.2, t, 2, lp); };
  });
  withSeed(41, () => {   // IV exile
    BG(3, [[0, 1000, ['#dfe7d0', '#c9d8b8', '#e6ecd8'], 8, .45], [1000, 1920, ['#8ea860', '#7c9a52', '#93ad66'], 9, .55]]);
    P[3].fg = [O2(riverStrokes([[540, 1000], [600, 1250], [480, 1500], [560, 1920]], 30, 200, ['#d9c9a6', '#cdb98f'], 5), 3, .1, .9)];
    for (const [x, y, s] of [[160, 1100, 1.6], [900, 1080, 1.4], [120, 1500, 1.8], [960, 1460, 1.6]]) P[3].fg.push(O2(tree(s, C.green).S, 3, .3, 1.4, { x, y, sway: .008 }));
    P[3].live = (c, t) => { const u = seg(t, PS[3] + .4, PS[3] + 5.6); const y = lerp(1700, 1140, u), s = lerp(1.4, .6, u); walker(c, 540 - 70 * s, y, s, '#2f5f98', t, 0, true); walker(c, 540, y + 10 * s, s * .92, '#c8442a', t, 1.2); walker(c, 540 + 70 * s, y, s, '#cf9f4a', t, 2.4, true); };
  });
  withSeed(51, () => {   // V the sandals
    BG(4, [[0, 1920, ['#6e2a2a', '#7a3a3a', '#5e2424'], 10, .5]]);
    const th = []; th.push(mk(qcurve(360, 1500, 720, 1500, 0, 10), 50, '#d9a441', { prof: 'even', nb: 5, a: .9 }), mk(qcurve(360, 1500, 360, 900, 0, 10), 40, '#d9a441', { prof: 'even', nb: 4, a: .9 }), mk(qcurve(720, 1500, 720, 900, 0, 10), 40, '#d9a441', { prof: 'even', nb: 4, a: .9 }), mk(qcurve(360, 900, 720, 900, -80, 12), 50, '#e0b04a', { prof: 'even', nb: 5, a: .9 }), mk(qcurve(380, 1300, 700, 1300, 0, 10), 80, '#c8442a', { prof: 'even', nb: 4, a: .85 }));
    P[4].fg = [O2(th, 4, .1, 1.0)];
    for (const x of [470, 610]) P[4].fg.push(O2([mk(qcurve(x, 1220, x, 1360, 0, 8), 56, '#8a6a44', { prof: 'leaf', nb: 3, a: .95 }), mk(qcurve(x, 1250, x, 1262, 0, 2), 18, '#e0b04a', { prof: 'leaf', nb: 0, a: .95 })], 4, 2.0, 2.6));
    P[4].live = (c, t) => lamp(c, 860, 1460, 1.3, t, 4, seg(t, PS[4] + 3.0, PS[4] + 3.6));
  });
  withSeed(61, () => {   // VI the golden deer
    BG(5, [[0, 1920, ['#6a8a4c', '#7c9a52', '#5f7a40', '#8ea860'], 12, .5]]);
    for (const [x, y, s] of [[140, 900, 2.0], [940, 860, 1.8], [260, 1500, 2.2], [880, 1560, 2.0], [540, 760, 1.4]]) P[5].fg.push(O2(tree(s, ['#3f6f4f', '#4e7a52', '#5f8a52']).S, 5, .1, 1.0, { x, y, sway: .008 }));
    const deer = [mk(qcurve(-60, 0, 50, -6, -10, 8), 46, '#e0b04a', { prof: 'leaf', nb: 4, a: .95 }), mk(qcurve(45, -10, 80, -60, 6, 5), 20, '#d9a441', { prof: 'even', nb: 2, a: .95 }), mk(qcurve(78, -66, 104, -58, 0, 4), 20, '#d9a441', { prof: 'leaf', nb: 0, a: .95 }),
      ...[[-40, 10, -80, 46], [-30, 10, -10, 50], [30, 8, 60, 44], [40, 8, 80, 30]].map(([a, b, c2, d]) => mk(qcurve(a, b, c2, d, 4, 4), 6, '#c99a5b', { prof: 'tip', nb: 0, a: .95 })), mk(qcurve(80, -70, 70, -110, 6, 4), 4, '#6b4a30', { prof: 'tip', nb: 0, a: .9 }), mk(qcurve(90, -70, 104, -108, -6, 4), 4, '#6b4a30', { prof: 'tip', nb: 0, a: .9 })];
    P[5].live = (c, t) => { const dp = seg(t, PS[5] + .6, PS[5] + 5.6); if (dp > 0 && dp < 1) { const x = lerp(-150, 1250, dp), y = 1220 - Math.abs(Math.sin(dp * Math.PI * 5)) * 110; c.save(); c.translate(x, y); c.scale(2.2, 2.2); drawList(c, deer, 1); c.restore(); }
      const rp = seg(t, PS[5] + 2.6, PS[5] + 6.0); if (rp > 0) walker(c, lerp(-80, 760, rp), 1460, 1.5, '#2f5f98', t, 0, true); };
  });
  withSeed(71, () => {   // VII the abduction
    BG(6, [[0, 1300, ['#3a4258', '#4d566e', '#2f3a5c', '#5f6880'], 10, .6], [1300, 1920, ['#5f5040', '#6b5a48'], 6, .6]]);
    const streak = [mk(qctrl(-60, 500, 500, 380, 1140, 760, 24), 46, '#231f1c', { prof: 'tip', nb: 6, a: .8 }), mk(qctrl(-60, 520, 500, 400, 1140, 780, 24), 12, '#d9a441', { prof: 'tip', nb: 3, a: .9 })];
    const wingL = garudaWing(.9, -1).map(s => ({ ...s, col: '#4a3a2e' })), wingR = garudaWing(.9, 1).map(s => ({ ...s, col: '#5b4636' }));
    const jw = []; for (let i = 0; i < 14; i++) jw.push({ x: 300 + i * 50 + Math.sin(i) * 30, y: 560 + i * 14, s: mk(qcurve(-5, 0, 5, 0, 0, 3), 16, i % 3 ? '#e0b04a' : '#c8442a', { prof: 'leaf', nb: 0, a: .95 }) });
    P[6].live = (c, t) => { const sp = seg(t, PS[6] + .3, PS[6] + 2.0); if (sp > 0) for (const s of streak) drawS(c, s, eio(sp));
      jw.forEach((j, i) => { const p = seg(t, PS[6] + 1.2 + i * .12, PS[6] + 3.6 + i * .12); if (p > 0) { c.save(); c.translate(j.x, j.y + eio(p) * 900); drawS(c, j.s, 1); c.restore(); } });
      const wp = seg(t, PS[6] + 3.4, PS[6] + 4.4), fall = eio(seg(t, PS[6] + 6.4, PS[6] + 8.0)), flap = Math.sin(Math.floor(t * 8) / 8 * 5) * .25 * (1 - fall);
      if (wp > 0) { c.save(); c.translate(560, lerp(820, 1460, fall)); c.rotate(fall * .9); for (const [sd, L] of [[-1, wingL], [1, wingR]]) { c.save(); c.rotate(sd * flap); drawList(c, L, wp); c.restore(); } c.fillStyle = '#4a3a2e'; c.beginPath(); c.ellipse(0, 30, 40, 70, 0, 0, 7); c.fill(); c.fillStyle = '#e8d8b0'; c.beginPath(); c.arc(0, -46, 26, 0, 7); c.fill(); c.restore(); } };
  });
  withSeed(81, () => {   // VIII Kishkindha
    BG(7, [[0, 1000, ['#efd398', '#f2dfae'], 7, .45], [1000, 1920, ['#c99a5b', '#b98a4c', '#d4aa6c', '#a77a3e'], 10, .6]]);
    P[7].fg = [O2(hills(1300, 360, ['#a77a3e', '#b98a4c', '#c99a5b'], 10, .7).S, 7, .1, .8, { x: -110, y: 1060 })];
    const mk1 = [mk(qcurve(0, 0, 0, -26, 0, 4), 22, '#8a6a44', { prof: 'leaf', nb: 0, a: .95 }), mk(qcurve(-4, -34, 4, -34, 0, 3), 18, '#a77a4a', { prof: 'leaf', nb: 0, a: .95 }), mk(qcurve(8, -6, 26, -40, 10, 5), 4, '#6b5440', { prof: 'tip', nb: 0, a: .95 })];
    const army = []; for (let i = 0; i < 70; i++) army.push({ x: rnd(60, 1020), y: rnd(1180, 1600), s: rnd(1.0, 1.6), ph: rnd(0, 6), t0: PS[7] + .3 + rnd(0, 1.6) });
    army.sort((a, b) => a.y - b.y);
    P[7].live = (c, t) => { army.forEach(m => { const p = seg(t, m.t0, m.t0 + .3); if (p > 0) { const hop = Math.abs(Math.sin(Math.floor(t * 8) / 8 * 3 + m.ph)) * 8; c.save(); c.translate(m.x, m.y - hop); c.scale(m.s, m.s); drawList(c, mk1, eo(p)); c.restore(); } });
      const hp = seg(t, PS[7] + 2.8, PS[7] + 3.6); if (hp > 0) { const gl = c.createRadialGradient(560, 1020, 10, 560, 1020, 200); gl.addColorStop(0, rgba('#f2d08a', .7 * hp)); gl.addColorStop(1, rgba('#f2d08a', 0)); c.fillStyle = gl; c.fillRect(360, 820, 400, 400); c.save(); c.translate(540, 1080); c.scale(2.6 * eo(hp), 2.6 * eo(hp)); drawList(c, mk1, 1); c.restore(); c.save(); c.translate(600, 1080); c.rotate(.3); drawList(c, mace(.9), hp); c.restore(); } };
  });
  withSeed(91, () => {   // IX Lanka: ring, fire
    BG(8, [[0, 1100, ['#232a44', '#2f3a5c', '#3a4668'], 8, .65], [1100, 1920, ['#2f4c6e', '#26405e', '#3d5d80'], 8, .6]]);
    const city = cityWalls(1.2).map(s => ({ ...s, col: mixc(s.col, '#3a2c22', .45) }));
    P[8].fg = [O2(city, 8, .1, .8, { x: 540, y: 1100 }), O2(bodhiTree(.9).map(s => ({ ...s, col: pick(['#c8442a', '#b23a22', '#d0552e', '#5f8a52']) })), 8, .2, 1.0, { x: 220, y: 1500 })];
    const arc = mk(qctrl(1100, 1700, 900, 300, 300, 1260, 30), 10, '#e0a83a', { prof: 'tip', nb: 3, a: .85 });
    P[8].live = (c, t) => { const ap = seg(t, PS[8] + .3, PS[8] + 1.8); if (ap > 0) drawS(c, arc, eio(ap));
      const rp = seg(t, PS[8] + 2.0, PS[8] + 2.8); if (rp > 0) { const gl = c.createRadialGradient(300, 1260, 4, 300, 1260, 90); gl.addColorStop(0, rgba('#f2c46a', .7 * rp)); gl.addColorStop(1, rgba('#f2c46a', 0)); c.fillStyle = gl; c.fillRect(200, 1160, 200, 200); c.strokeStyle = rgba('#e0b04a', rp); c.lineWidth = 8; c.beginPath(); c.arc(300, 1260, 22, 0, 7); c.stroke(); c.fillStyle = rgba('#c8442a', rp); c.beginPath(); c.arc(300, 1236, 9, 0, 7); c.fill(); }
      const fp = seg(t, PS[8] + 4.0, PS[8] + 5.6); if (fp > 0) for (let i = 0; i < 14; i++) { const q = clamp(fp * 1.5 - i * .05); if (q > 0) flick(c, 140 + i * 62, 1000 + (i % 3) * 30, 1.5 * eo(q), t, i); } };
  });
  withSeed(101, () => {   // X the bridge
    BG(9, [[0, 700, ['#a9c0d0', '#bcd0d6'], 5, .45], [700, 1920, ['#3d5d80', '#4f7090', '#2f4c6e', '#6f8faa'], 12, .55]]);
    P[9].fg = [O2(wash(-80, 400, 1600, 1920, ['#d4aa6c', '#c99a5b'], 2, .7), 9, .1, .6), O2(cityWalls(.6).map(s => ({ ...s, col: mixc(s.col, '#3a2c22', .4) })), 9, .2, .8, { x: 860, y: 720 })];
    const stones = []; for (let i = 0; i < 22; i++) { const u = i / 21, x = lerp(240, 820, u), y = lerp(1560, 780, u), st_ = mk(qcurve(-50, 0, 50, 0, rnd(-6, 6), 6), 46, pick(['#e6dccb', '#d8cdb8', '#efe6d4']), { prof: 'leaf', nb: 3, a: .95 }); stones.push({ x, y, L: [st_, edgeOf(st_, 1, 3, '#4a3a2e', .7), mk(qcurve(-9, -2, 9, -2, 0, 2), 10, '#c8442a', { prof: 'leaf', nb: 0, a: .95 })], t0: PS[9] + .5 + i * .18 }); }
    P[9].stones = stones;
    P[9].live = (c, t) => stones.forEach(s => { const p = seg(t, s.t0, s.t0 + .3); if (p > 0) { c.save(); c.translate(s.x, s.y); drawList(c, s.L, eo(p)); c.restore(); } });
  });
  withSeed(111, () => {   // XI the war
    BG(10, [[0, 1300, ['#d98a6a', '#c8704a', '#e8a86a', '#b05a3a'], 10, .55], [1300, 1920, ['#6b5a48', '#5f5040'], 6, .6]]);
    const rain = []; for (let i = 0; i < 40; i++) { const x = rnd(-200, 700), y = rnd(300, 1300); rain.push({ s: mk(qcurve(x, y, x + 320, y + 200, 0, 6), 3, '#3a2c22', { prof: 'tip', nb: 0, a: .7 }), t0: PS[10] + .2 + rnd(0, 1.8) }); }
    const big = mk(qcurve(-60, 1400, 760, 860, 0, 12), 8, '#f2c46a', { prof: 'tip', nb: 2, a: .95 }), rc = crown(1.0).map(s => ({ ...s, col: mixc(s.col, '#231f1c', .55) }));
    P[10].live = (c, t) => { rain.forEach(r => { const p = seg(t, r.t0, r.t0 + .3); if (p > 0) drawS(c, r.s, p); });
      const bp = seg(t, PS[10] + 2.8, PS[10] + 3.3); if (bp > 0) drawS(c, big, bp);
      const fall = eio(seg(t, PS[10] + 3.3, PS[10] + 4.6)); c.save(); c.translate(800, lerp(880, 1520, fall)); c.rotate(fall * 1.8); drawList(c, rc, seg(t, PS[10] + .2, PS[10] + 1.0)); c.restore(); };
  });
  withSeed(121, () => {   // XII homecoming; XIII Diwali
    for (const k of [11, 12]) { BG(k, [[0, 1150, ['#232a44', '#2f3a5c', '#3a4668'], 8, .65], [1150, 1920, ['#3a3030', '#2a2420', '#4a3a30'], 8, .65]]); P[k].fg = [O(cityWalls(1.4).map(s => ({ ...s, col: mixc(s.col, '#6b4a3a', .3) })), 540, 1180, pre(k), pre(k) + .01)]; }
    const L1 = []; for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) L1.push({ x: 90 + i * 112 + (r % 2) * 50, y: 1300 + r * 110, t0: PS[11] + .4 + (r * 9 + i) * .08 });
    const ch = lotusBloom(.0001); const cr = crown(.9);
    P[11].live = (c, t) => { L1.forEach((l, i) => lamp(c, l.x, l.y, 1.0, t, i, seg(t, l.t0, l.t0 + .4)));
      const cp = eio(seg(t, PS[11] + 4.4, PS[11] + 5.6)); c.save(); c.translate(540, lerp(600, 1030, cp)); drawList(c, cr, seg(t, PS[11] + 3.8, PS[11] + 4.4)); c.restore(); };
    const ring = []; for (let r = 0; r < 5; r++) { const n = 8 + r * 6; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = 40 + r * 70; ring.push({ x: 540 + Math.cos(a) * rr, y: 1440 + Math.sin(a) * rr * .45, col: ['#c8442a', '#e0b04a', '#2f6fa8', '#5f8a52', '#e8902e'][r], t0: PS[12] + .2 + r * .35 + i * .01 }); } }
    P[12].live = (c, t) => { L1.forEach((l, i) => lamp(c, l.x, l.y - 160, 1.0, t, i, 1));
      ring.forEach(d => { const p = seg(t, d.t0, d.t0 + .3); if (p > 0) { c.fillStyle = rgba(d.col, .9 * p); c.beginPath(); c.ellipse(d.x, d.y, 16 * p, 9 * p, 0, 0, 7); c.fill(); } });
      lamp(c, 540, 1440, 1.6, t, 50, 1); };
  });

  VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
  SUBS.forEach(([t, d, text]) => ev(t, 'sub', { d, text }));
  PS.forEach((t, k) => { if (k > 0) ev(t, 'brush', { d: .8, g: .35, pan0: -.9, pan1: .9 }); ev(Math.max(0, t) + (k === 8 ? 2.2 : .7), 'pencil', { d: .8 }); ev(Math.max(0, t) + .1, 'panel', { k, d: (k < 12 ? PS[k + 1] : DUR) - Math.max(0, t) }); });
  ev(PS[1] + 7.0, 'snap'); ev(PS[3] + .4, 'steps', { d: 5.2 }); ev(PS[5] + .6, 'hooves', { d: 5 }); ev(PS[6] + .3, 'whoosh', { d: 1.7 }); ev(PS[6] + 1.2, 'jewels', { d: 2.6 }); ev(PS[6] + 3.4, 'wings', { d: 3 }); ev(PS[6] + 6.6, 'thud');
  ev(PS[7] + .3, 'chatter', { d: 4.5 }); ev(PS[8] + 1.45, 'whoosh', { d: .8 });   // after the word 'leapt' ev(PS[8] + 2.0, 'ring'); ev(PS[8] + 4.0, 'fire', { d: 3.0 }); P[9].stones.forEach(s => ev(s.t0, 'stone'));
  for (let i = 0; i < 8; i++) ev(PS[10] + .3 + i * .22, 'arrow'); ev(PS[10] + 2.8, 'bigarrow'); ev(PS[10] + 4.5, 'thud'); ev(PS[11] + .4, 'lamps', { d: 3.2 }); ev(PS[11] + 5.4, 'bells'); ev(PS[12] + .2, 'lamps', { d: 2 }); ev(84.0, 'bell2');
}
(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"'].map(f => document.fonts.load(f)));
  build();
  window.READY = true;
})();
