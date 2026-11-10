// Who is Vishnu? — a climb through the ten avatars, one painted column. 1080x1920, render(t) is a pure function of t.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const DUR = 170; window.DUR = DUR;
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
function mist(t, c_, fromTop) {
  if (c_ <= 0) return;
  for (const [lift, a] of [[140, .55], [0, 1]]) {
    const edge = fromTop ? -260 + c_ * 2440 - lift : 2180 - c_ * 2440 + lift;
    ctx.save(); ctx.beginPath(); ctx.moveTo(-10, fromTop ? -10 : H + 10);
    for (let x = -10; x <= W + 40; x += 30) ctx.lineTo(x, edge + (vnoise(x * .008 + lift) - .5) * 200 + Math.sin(x * .012 + t * 1.3) * 16);
    ctx.lineTo(W + 10, fromTop ? -10 : H + 10); ctx.closePath(); ctx.clip(); ctx.globalAlpha = a; ctx.drawImage(PAPER_IMG, 0, 0); ctx.restore();
  }
}


function wrap(txt, maxW) {
  if (ctx.measureText(txt).width <= maxW) return [txt];
  const words = txt.split(' '); let best = null, bd = 1e9;
  for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(' '), b = words.slice(i).join(' '), wa = ctx.measureText(a).width, wb = ctx.measureText(b).width; if (wa <= maxW && wb <= maxW && Math.abs(wa - wb) < bd) { bd = Math.abs(wa - wb); best = [a, b]; } }
  if (best) return best;
  for (let i = 1; i < words.length; i++) for (let j = i + 1; j < words.length; j++) { const L = [words.slice(0, i), words.slice(i, j), words.slice(j)].map(w => w.join(' ')); const ws = L.map(l => ctx.measureText(l).width); if (Math.max(...ws) <= maxW && Math.max(...ws) - Math.min(...ws) < bd) { bd = Math.max(...ws) - Math.min(...ws); best = L; } }
  return best || [txt];
}

// ---------- timeline ----------
const BANDH = 1920, TOP = 1920, COLH = TOP + 10 * BANDH;
const Yc = k => COLH - BANDH / 2 - (k - 1) * BANDH;            // band k (1 = the flood, at the bottom) → its centre
const LEN = [11.5, 10, 11, 15, 11, 9, 10, 10.5, 11, 11.5], SK = []; { let t = 22.0; for (const l of LEN) { SK.push(t); t += l; } }
const END10 = SK[9] + LEN[9];                                    // 132.5
const T = { dive: [21.0, 22.4], pull: [END10, END10 + 7], gold: [141.5, 150.0], loop: [153.0, 158.0], title: 156.4 };
const VOICE = [['v01', .8], ['v02', 5.4], ['v03', 13.4], ...SK.map((s, i) => ['a' + (i + 1), +(s + .6).toFixed(2)]), ['v04', END10 + .9], ['v05', 141.8], ['v06', 153.0]];
const TXT = {
  v01: [3.658, 'Who is Vishnu? Ask, and you may be given ten answers.'], v02: [7.515, 'He is the preserver of the world, the keeper of its balance, often painted blue: the colour of the sky and the sea.'],
  v03: [7.573, 'And whenever that balance fails, he comes down into the world, each time in a new form. These are his avatars.'],
  a1: [6.491, 'First, a fish. In a great flood, Matsya towed the boat of Manu, the first man, to safety.'], a2: [4.676, 'A tortoise. Kurma held a mountain on his back, while the ocean was churned.'],
  a3: [5.903, 'A boar. Varaha dived to the bottom of the sea, and lifted the drowned earth on his tusks.'],
  a4: [10.59, 'A man-lion. A demon king could not be killed by man or beast, by day or by night, inside or out. So Narasimha came at dusk, on a doorstep.'],
  a5: [5.713, 'A dwarf. Vamana asked for three steps of land, and covered the universe in two.'], a6: [2.429, 'A warrior with an axe: Parashurama.'],
  a7: [3.63, 'A prince with a bow: Rama, hero of the Ramayana.'], a8: [4.071, 'A cowherd with a flute: Krishna, who taught the Bhagavad Gita.'],
  a9: [4.835, 'A teacher of peace. In many lists, the Buddha. In some others, Balarama.'], a10: [4.679, 'And one still to come: Kalki, on a white horse, at the end of this age.'],
  v04: [7.094, 'Some readers see a pattern in them: from the water, to the shore, to the land; from animal, to human, to sage.'],
  v05: [8.806, 'So who is Vishnu? Perhaps the answer is in the word itself. Avatar means a descent. He is the one who keeps coming down to help.'],
  v06: [1.227, 'Again, and again.'] };
const SUBS = VOICE.map(([id, t]) => [t, TXT[id][0], TXT[id][1]]);
const NAMES = [['MATSYA', 'the fish'], ['KURMA', 'the tortoise'], ['VARAHA', 'the boar'], ['NARASIMHA', 'the man-lion'], ['VAMANA', 'the dwarf'], ['PARASHURAMA', 'the warrior'], ['RAMA', 'the prince'], ['KRISHNA', 'the cowherd'], ['BUDDHA · BALARAMA', 'the teacher'], ['KALKI', 'the one to come']];
const B = Array.from({ length: 11 }, () => ({}));   // B[1..10] band objects

// ---------- camera: the climb, then the whole column ----------
function cam(t) {
  if (t < T.dive[1]) return [540, Yc(1), 1];
  if (t >= T.pull[0]) return [540, Yc(10), 1];
  if (t < T.pull[0]) { let k = 1; while (k < 10 && t >= SK[k] - 1.4) k++; const t0 = SK[k - 1] - 1.4, u = k > 1 ? eio(seg(t, t0, SK[k - 1])) : 1; return [540, lerp(Yc(Math.max(1, k - 1)), Yc(k), k > 1 ? u : 1), 1]; }
  const zAll = H / (COLH + 600), u = eio(seg(t, T.pull[0], T.pull[1]));
  return [540, lerp(Yc(10), COLH / 2, u), Math.exp(lerp(0, Math.log(zAll), u))];
}
function worldXf(c, t, dy = 0) { const [cx, cy, z] = cam(t); c.setTransform(z, 0, 0, z, 540 - cx * z, 960 - cy * z + dy); return z; }

// ---------- the column ----------
function drawBand(c, t, k) {
  const b = B[k], s = SK[k - 1];
  for (const ob of b.bg) draw(c, ob, t);
  for (const ob of b.fg) draw(c, ob, t, ob.liveRot ? { rot: ob.liveRot(t) } : {});
  if (b.live) b.live(c, t);
}
function drawColumn(c, t, dy = 0) {
  const z = worldXf(c, t, dy), [, cy] = cam(t), half = 960 / z + 400;
  draw(c, B[0].sky, t);
  for (let k = 1; k <= 10; k++) if (Math.abs(Yc(k) - cy) < half + BANDH / 2) drawBand(c, t, k);
  for (const ob of B[0].mists) draw(c, ob, t);
  // labels: mono name + hand note at the top of each band, while it is the one in view
  c.setTransform(1, 0, 0, 1, 0, dy);
  if (z > .95 && t > T.dive[0]) for (let k = 1; k <= 10; k++) {
    const s = SK[k - 1], f = fade2(t, s + .3, (k < 10 ? SK[k] - 1.1 : T.pull[0] + .4), .5, .5); if (f <= 0) continue;
    const sy = 960 + (Yc(k) - 700 - cam(t)[1]);
    mono(c, `${String(k).padStart(2, '0')} · ${NAMES[k - 1][0]}`, 540, sy, f, 'n' + k, { size: 26, sp: 6 });
    hand(c, NAMES[k - 1][1], 540, sy + 62, seg(t, s + .8, s + 1.6), { size: 56, w: 500, align: 'center', id: 'h' + k, alpha: f });
  }
  c.setTransform(1, 0, 0, 1, 0, 0);
}
// the ending: a gold line descends through all ten, then loops back to the top
function drawGold(c, t) {
  const gp = seg(t, T.gold[0], T.gold[1]), lp = seg(t, T.loop[0], T.loop[1]); if (gp <= 0) return;
  worldXf(c, t); const n = B[0].gold.length; B[0].gold.forEach((s, i) => drawS(c, s, clamp(eio(gp) * n - i)));
  if (lp > 0) drawS(c, B[0].loop, eio(lp));
  for (let k = 1; k <= 10; k++) { const p = clamp(eio(gp) * 10 - (10 - k)); if (p > 0) { c.save(); c.translate(540, Yc(k)); c.scale(9, 9); drawList(c, B[0].dot, p); c.restore(); } }
  c.setTransform(1, 0, 0, 1, 0, 0);
}

// ---------- the question ----------
function sceneQ(c, t, dy = 0) {
  c.save(); c.translate(0, dy);
  draw(c, B[0].qsky, t); draw(c, B[0].qsea, t);
  hand(c, 'Who is Vishnu?', 540, 700, seg(t, .4, 2.4), { size: 120, align: 'center', id: dy ? null : 'q' });
  for (let i = 0; i < 10; i++) { const p = seg(t, 2.6 + i * .12, 2.9 + i * .12); if (p > 0) { c.save(); c.translate(540 + (i - 4.5) * 70, 860); drawList(c, B[0].dot, p); c.restore(); } }
  const f = fade2(t, 16.6, 21.0, .6, .3);
  mono(c, 'DASHAVATARA', 540, 1180, f, dy ? null : 'da', { size: 30, sp: 10 });
  hand(c, 'the ten descents', 540, 1250, seg(t, 17.2, 18.0), { size: 60, w: 500, align: 'center', id: dy ? null : 'da2', alpha: f });
  c.restore();
}

// ---------- subtitles ----------
function drawSubs(t) {
  for (const [s, d, en] of SUBS) {
    const f = fade2(t, s - .15, s + d + .45, .25, .35); if (f <= 0) continue;
    ctx.save(); ctx.globalAlpha = f; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = 'italic 500 48px "Cormorant Garamond"'; const lines = wrap(en, 960), y0 = 1760 - (lines.length - 1) * 52;
    const yc = y0 + (lines.length - 1) * 26 - 16, g = ctx.createRadialGradient(540, yc, 10, 540, yc, 540);
    g.addColorStop(0, rgba(PAPER, .84)); g.addColorStop(.6, rgba(PAPER, .62)); g.addColorStop(1, rgba(PAPER, 0));
    ctx.save(); ctx.translate(540, yc); ctx.scale(1, .26 * lines.length / 2 + .1); ctx.translate(-540, -yc); ctx.fillStyle = g; ctx.fillRect(0, yc - 540, W, 1080); ctx.restore();
    ctx.shadowColor = rgba(PAPER, 1); ctx.shadowBlur = 22;
    for (let k = 0; k < 2; k++) { ctx.fillStyle = rgba(INK, .9); lines.forEach((ln, i) => ctx.fillText(ln, 540, y0 + i * 52)); }
    ctx.restore();
  }
}
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; paper(ctx);
  if (t < T.dive[0]) sceneQ(ctx, t);
  else if (t < T.dive[1]) { const p = eio(seg(t, T.dive[0], T.dive[1])); sceneQ(ctx, t, -H * p); drawColumn(ctx, t, H * (1 - p)); }
  else if (t < T.pull[0]) drawColumn(ctx, t);
  else if (t < T.pull[0] + 1.2) wipe(t, T.pull[0], 1.2, (c, tt) => drawColumn(c, tt), sceneGrid);
  else sceneGrid(ctx, t);
  if (t > T.title) { ctx.save(); const g = ctx.createRadialGradient(540, 330, 20, 540, 330, 460); g.addColorStop(0, rgba(PAPER, .9)); g.addColorStop(1, rgba(PAPER, 0)); ctx.fillStyle = g; ctx.globalAlpha = ss(seg(t, T.title, T.title + 1)); ctx.fillRect(0, 0, W, 760); ctx.restore();
    serif(ctx, 'VISHNU', 540, 340, seg(t, T.title, T.title + 1.6), { size: 120, sp: 22, id: 'title' }); hand(ctx, 'the one who comes down', 540, 420, seg(t, T.title + 1.4, T.title + 2.4), { size: 56, w: 500, align: 'center', id: 'tsub' }); }
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TX; };

// ---------- the ending page: the ten, gathered as panels; the gold descent threads them ----------
const CELL = Array.from({ length: 10 }, (_, i) => { const col = i % 2, row = Math.floor(i / 2); return [70 + col * 480, 500 + row * 236, 460, 214]; });
function sceneGrid(c, t) {
  for (let i = 0; i < 10; i++) {
    const [x, y, w, h] = CELL[i], p = seg(t, T.pull[0] + .4 + i * .18, T.pull[0] + .9 + i * .18); if (p <= 0) continue;
    const s = w / 1080;
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.globalAlpha = ss(p);
    c.setTransform(s, 0, 0, s, x + w / 2 - 540 * s, y + h / 2 - (Yc(i + 1) - 140) * s); drawBand(c, T.pull[0] - .01 > SK[i] + LEN[i] - .5 ? SK[i] + LEN[i] - .6 : t, i + 1);
    c.restore();
    c.save(); c.globalAlpha = ss(p); c.strokeStyle = rgba(INK, .55); c.lineWidth = 2; c.strokeRect(x, y, w, h); c.restore();
    mono(c, String(i + 1).padStart(2, '0'), x + 34, y + 30, ss(p), 'g' + i, { size: 18, sp: 2 });
  }
  const gp = seg(t, T.gold[0], T.gold[1]), lp = seg(t, T.loop[0], T.loop[1]);
  if (gp > 0) { const n = B[0].gold.length; B[0].gold.forEach((s, i) => drawS(c, s, clamp(eio(gp) * n - i)));
    for (let i = 0; i < 10; i++) { const p = clamp(eio(gp) * 10.4 - i); if (p > 0) { const [x, y, w, h] = CELL[i]; c.save(); c.translate(x + w / 2, y + h / 2); c.scale(1.3, 1.3); drawList(c, B[0].dot, p); c.restore(); } } }
  if (lp > 0) drawS(c, B[0].loop, eio(lp));
  mono(c, 'THE TEN AVATARS', 540, 430, fade2(t, T.pull[0] + 1.2, T.title - .3, .6, .4), 'ten', { size: 26, sp: 8 });
}

function build() {
  const W2 = [-80, 1160];
  const bandObj = (k, bg, fg, live) => { B[k] = { bg, fg, live }; };
  const s0 = k => SK[k - 1], y = k => Yc(k);
  // ---- the top sky, and mist bands between the bands ----
  withSeed(5, () => {
    B[0].sky = O(wash(...W2, 0, TOP + 200, ['#efd398', '#f2dfae', '#e8c46a'], 8, .3), 0, 0, 0, .01, { res: .5 });
    B[0].mists = []; for (let k = 1; k < 10; k++) { const yb = y(k) - BANDH / 2; B[0].mists.push(O(wash(...W2, yb - 60, yb + 60, [PAPER], 3, .8, 'even'), 0, 0, 0, .01, { res: .5 })); }
    B[0].dot = []; for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; B[0].dot.push(mk(polar(0, 0, a, 14, 2, 4), 16, pick(GOLD), { prof: 'leaf', nb: 0, a: .9 })); }
    B[0].qsky = O(wash(-200, 1280, 0, 960, ['#8fb0c6', '#a9c0d0', '#7f9fbe'], 9, .3), 0, 0, 5.0, 8.0, { res: .5 });
    B[0].qsea = O(wash(-200, 1280, 1000, 1920, ['#3d5d80', '#2f4c6e', '#4f7090'], 10, .5, 'even'), 0, 0, 6.6, 9.6, { res: .5 });
    const gp = []; for (let i = 0; i <= 10; i++) { const cell = CELL[Math.min(9, i)], [x, yy, w, h] = cell; gp.push(i === 0 ? [540, 470] : [x + w / 2, yy + h / 2]); }
    B[0].gold = []; for (let i = 0; i < 10; i++) B[0].gold.push(mk(qcurve(gp[i][0], gp[i][1], gp[i + 1][0], gp[i + 1][1], (i % 2 ? -60 : 60), 14), 9, pick(GOLD), { prof: 'even', nb: 3, a: .9 }));
    const lpts = []; for (let k = 0; k <= 40; k++) { const a = Math.PI / 2 - k / 40 * Math.PI; lpts.push([540 + Math.cos(a) * 520 * (k / 40 < .5 ? 1 : 1), 1000 + Math.sin(a) * 640]); } lpts.reverse();
    B[0].loop = mk(qcurve(CELL[9][0] + CELL[9][2] / 2, CELL[9][1] + CELL[9][3] / 2, 540, 470, -620, 40), 8, '#e0b04a', { prof: 'tip', nb: 3, a: .85 });
  });
  // ---- 1 · Matsya: the flood ----
  withSeed(11, () => { const s = s0(1), Y = y(1);
    bandObj(1, [O(wash(...W2, Y - 960, Y, ['#8d9aa9', '#a8b3be', '#7f8d9e'], 8, .4), 0, 0, s - 1.6, s, { res: .5 }), O(wash(...W2, Y, Y + 960, ['#3d5d80', '#2f4c6e', '#4f7090'], 10, .55, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 })],
      [O(boat(1.3), 700, Y + 6, s + .4, s + 1.8), O(hornFish(1.3), 360, Y + 330, s + .8, s + 3.2)],
      (c, t) => { if (t < s + 1.8) return; const p = seg(t, s + 2.6, s + 3.4); if (p > 0) withSeed(13, () => drawS(c, mk(qcurve(360 + 220, Y + 330 - 190, 700 - 60, Y - 4, 40, 12), 3, AINK, { prof: 'even', nb: 0, a: .8 }), p));
        c.strokeStyle = rgba('#4f6070', .35); c.lineWidth = 2; const tt = Math.floor(t * 12) / 12; for (let i = 0; i < 70; i++) { const x = (hash(i) * 1300 + tt * 40) % 1300 - 110, yy = Y - 960 + ((hash(i * 3) * 900 + tt * 900) % 900); c.beginPath(); c.moveTo(x, yy); c.lineTo(x - 10, yy + 46); c.stroke(); } }); });
  // ---- 2 · Kurma ----
  withSeed(21, () => { const s = s0(2), Y = y(2);
    const mt = []; for (let i = 0; i < 14; i++) { const yy = Y - 40 - i * 46, w = lerp(180, 70, i / 13); mt.push(mk(qcurve(540 - w, yy, 540 + w, yy - 4, 0, 10), 52, pick(['#b3b0a2', '#8b8a80', '#a29a8f']), { prof: 'even', nb: 5, a: .7 })); }
    for (let i = 0; i < 5; i++) { const yy = Y - 120 - i * 120, w = lerp(190, 90, i / 4); mt.push(mk(qcurve(540 - w - 20, yy + 30, 540 + w + 20, yy - 30, 10, 8), 30, '#4f7f5e', { prof: 'even', nb: 4, a: .85 })); }
    bandObj(2, [O(wash(...W2, Y - 960, Y, ['#a9c0d0', '#bcd0d6'], 7, .3), 0, 0, s - 1.6, s, { res: .5 }), O(wash(...W2, Y, Y + 960, ['#4f7090', '#3d5d80', '#2f4c6e'], 10, .55, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 })],
      [O(mt, 0, 0, s + .4, s + 2.2), O([...stoneShaligram(0).slice(0, 0), ...(() => { const S = []; S.push(mk(qcurve(220, Y + 260, 860, Y + 260, -150, 16), 140, '#9a8a56', { prof: 'leaf', nb: 7, a: .85 })); for (let r = 0; r < 2; r++) for (let k = -2; k <= 2; k++) { const cx = 540 + k * 110, cy = Y + 230 - r * 50; S.push(mk(qcurve(cx - 40, cy, cx + 40, cy, -14, 6), 3, AINK, { prof: 'even', nb: 0, a: .6 })); } S.push(mk(qcurve(160, Y + 290, 230, Y + 280, 0, 4), 46, '#7f9a6c', { prof: 'leaf', nb: 3, a: .85 })); for (const [x0, a] of [[280, 2.4], [800, .7]]) S.push(mk(polar(x0, Y + 300, a, 120, 10, 6), 40, '#7f9a6c', { prof: 'leaf', nb: 3, a: .85 })); return S; })()], 0, 0, s + 1.2, s + 3.2)]); });
  // ---- 3 · Varaha ----
  withSeed(31, () => { const s = s0(3), Y = y(3);
    bandObj(3, [O(wash(...W2, Y - 960, Y - 200, ['#bcd0d6', '#a9c0d0'], 6, .3), 0, 0, s - 1.6, s, { res: .5 }), O(wash(...W2, Y - 200, Y + 960, ['#2f4c6e', '#26405e', '#3d5d80'], 12, .65, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 })],
      [O(boar(1.5), 480, Y + 60, s + .5, s + 2.4), O(earthDisc(1.5), 840, Y - 140, s + 2.0, s + 3.2)]); });
  // ---- 4 · Narasimha: dusk, a doorstep ----
  withSeed(41, () => { const s = s0(4), Y = y(4);
    bandObj(4, [O(wash(...W2, Y - 960, Y + 300, ['#e8a86a', '#d98a6a', '#b07a8a', '#8a6a8e'], 12, .4), 0, 0, s - 1.6, s, { res: .5 }), O(wash(...W2, Y + 300, Y + 960, ['#8a7a62', '#6b5a48'], 7, .55, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 })],
      [O(splitPillar(1.3), 540, Y + 300, s + .4, s + 2.4), O(mane(1.4), 540, Y - 160, s + 7.4, s + 8.6)],
      (c, t) => { const p = seg(t, s + 7.2, s + 8.0); if (p > 0) { c.save(); c.globalAlpha = .5 * p; c.fillStyle = '#f2c46a'; c.beginPath(); c.ellipse(540, Y - 120, 120 * p, 380, 0, 0, 7); c.fill(); c.restore(); } }); });
  // ---- 5 · Vamana ----
  withSeed(51, () => { const s = s0(5), Y = y(5);
    const fp = (sc, x, yy, a) => footprint(sc).map(st => ({ ...st, pts: st.pts.map(([u, v]) => [x + u * Math.cos(a) - v * Math.sin(a), yy + u * Math.sin(a) + v * Math.cos(a)]) }));
    bandObj(5, [O(wash(...W2, Y - 960, Y + 300, ['#bcd0d6', '#d4dade', '#a9c0d0'], 9, .3), 0, 0, s - 1.6, s, { res: .5 }), O(wash(...W2, Y + 300, Y + 960, ['#8ea860', '#7c9a52'], 6, .5, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 }),
      O(cloud(.9, '#b4bcc6').S, 700, Y - 360, s - 1, s)],
      [O(AV[4][2](2.4), 300, Y + 220, s + .4, s + 1.6), O(fp(.7, 520, Y + 280, -.2), 0, 0, s + 2.2, s + 2.9), O(fp(.85, 720, Y - 340, -.1), 0, 0, s + 3.2, s + 3.9)]); });
  // ---- 6 · Parashurama ----
  withSeed(61, () => { const s = s0(6), Y = y(6);
    const trees = []; for (const [x, sc] of [[90, 1.6], [220, 1.2], [880, 1.5], [1000, 1.1], [330, .9], [760, .9]]) trees.push(...tree(sc, C.green).S.map(st => ({ ...st, pts: st.pts.map(([u, v]) => [u + x, v + Y + 380]) })));
    bandObj(6, [O(wash(...W2, Y - 960, Y + 380, ['#dfe7d0', '#c9d8b8', '#e6ecd8'], 9, .3), 0, 0, s - 1.6, s, { res: .5 }), O(wash(...W2, Y + 380, Y + 960, ['#6a8a4c', '#50703c'], 6, .55, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 }), O(trees, 0, 0, s - .6, s + 1.4)],
      [O(axe(1.4), 540, Y + 390, s + .4, s + 1.8)]); });
  // ---- 7 · Rama ----
  withSeed(71, () => { const s = s0(7), Y = y(7);
    bandObj(7, [O(wash(...W2, Y - 960, Y + 200, ['#efd398', '#e8c46a', '#f2dfae'], 9, .3), 0, 0, s - 1.6, s, { res: .5 }), O(cityWalls(1), 540, Y + 220, s - .8, s + 1.0), O(wash(...W2, Y + 220, Y + 960, ['#8fb0c6', '#6f8faa', '#d4aa6c'], 7, .5, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 })],
      [O(bowArrow(1.3), 520, Y - 220, s + .4, s + 1.8, { rot: -.2 })]); });
  // ---- 8 · Krishna ----
  withSeed(81, () => { const s = s0(8), Y = y(8);
    bandObj(8, [O(wash(...W2, Y - 960, Y + 100, ['#dfe7d0', '#c9d8b8'], 8, .25), 0, 0, s - 1.6, s, { res: .5 }), O(wash(...W2, Y + 100, Y + 960, ['#8ea860', '#93ad66', '#7c9a52'], 8, .5, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 }),
      O(riverStrokes([[-100, Y + 260], [300, Y + 330], [700, Y + 280], [1180, Y + 360]], 70, 110, ['#6f8faa', '#8fb0c6'], 5), 0, 0, s - .8, s + .6)],
      [O(whiteCow(1.1), 320, Y + 120, s + .4, s + 1.8), O(K_FLUTE(), 0, Y - 760, s + 1.4, s + 3.2)]); });
  // ---- 9 · Buddha · Balarama ----
  withSeed(91, () => { const s = s0(9), Y = y(9);
    bandObj(9, [O(wash(...W2, Y - 960, Y + 300, ['#efe6c8', '#e6ecd8', '#f2ead0'], 9, .3), 0, 0, s - 1.6, s, { res: .5 }), O(wash(...W2, Y + 300, Y + 960, ['#a9b98a', '#8ea860'], 6, .5, 'even'), 0, 0, s - 1.2, s + .4, { res: .5 })],
      [O(bodhiTree(1.3), 470, Y + 320, s + .4, s + 2.8), O(plough(1.2), 820, Y + 320, s + 2.6, s + 3.4)]); });
  // ---- 10 · Kalki ----
  withSeed(101, () => { const s = s0(10), Y = y(10);
    bandObj(10, [O(wash(...W2, Y - 960, Y + 960, ['#efd398', '#e8c46a', '#f2dfae', '#e0b04a'], 14, .35), 0, 0, s - 1.6, s, { res: .5 }), O([...cloud(1.2, '#f6f1e6').S, ...cloud(1, '#f6f1e6').S.map(st => ({ ...st, pts: st.pts.map(([u, v]) => [u + 300, v + 500]) }))], 380, Y + 300, s - .8, s + .6)],
      [O(whiteHorse(1.5), 500, Y + 80, s + .4, s + 2.6)]);
    B[10].fg[0].liveRot = t => Math.sin(Math.floor(t * 8) / 8 * 3) * .02; });

  // ---- sound events ----
  VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
  SUBS.forEach(([t, d, text]) => ev(t, 'sub', { d, text }));
  ev(.4, 'pencil', { d: 2.0 }); for (let i = 0; i < 10; i++) ev(2.6 + i * .12, 'dot', { i });
  ev(5.0, 'brush', { d: 3.0, g: .4, pan0: -.8, pan1: .8 }); ev(6.6, 'brush', { d: 3.0, g: .4, pan0: .8, pan1: -.8 }); ev(6.6, 'sea', { d: 15 }); ev(17.2, 'pencil', { d: .9 });
  ev(T.dive[0], 'dive', { d: 1.4 });
  SK.forEach((s, i) => { ev(s, 'band', { k: i + 1 }); ev(s - 1.6, 'brush', { d: 1.6, g: .35, pan0: -.7, pan1: .7 }); ev(s + .4, 'brush', { d: 1.2, g: .35, pan0: -.3, pan1: .3 }); ev(s + .8, 'pencil', { d: 1.0 }); });
  ev(SK[0], 'rain', { d: LEN[0] }); ev(SK[0], 'waves', { d: LEN[0] + LEN[1] }); ev(SK[2], 'deep', { d: LEN[2] }); ev(SK[3] + 7.4, 'roar'); ev(SK[4] + 2.2, 'step', { g: .6 }); ev(SK[4] + 3.2, 'step', { g: .9 });
  ev(SK[5] + .4, 'leaves', { d: LEN[5] }); ev(SK[7], 'river', { d: LEN[7] }); ev(SK[7] + 1.0, 'moo'); ev(SK[8], 'birds', { d: LEN[8] }); ev(SK[9], 'wind', { d: LEN[9] }); ev(SK[9] + .6, 'gallop', { d: 4.0 });
  ev(T.pull[0], 'brush', { d: 1.2, g: .45, pan0: -.9, pan1: .9 }); for (let i = 0; i < 10; i++) ev(T.pull[0] + .4 + i * .18, 'dot', { i });
  ev(T.gold[0], 'brush', { d: T.gold[1] - T.gold[0], g: .3, pan0: -.5, pan1: .5 }); for (let i = 0; i < 10; i++) ev(T.gold[0] + (i + .6) / 10.4 * (T.gold[1] - T.gold[0]) * .92, 'touch', { i });
  ev(T.loop[0], 'brush', { d: 5, g: .25, pan0: .6, pan1: -.6 }); ev(T.title + 1.4, 'pencil', { d: 1.0 });
}
const K_FLUTE = () => { const fl = []; const f0 = [420, 1180], f1 = [1000, 940];
  const fb = mk(qcurve(f0[0], f0[1], f1[0], f1[1], -6, 20), 22, '#c99a5b', { prof: 'even', nb: 5, a: .9 }); fl.push(fb, edgeOf(fb, 1, 2, AINK, .6));
  for (let i = 0; i < 6; i++) { const u = .35 + i * .08; fl.push(mk(qcurve(lerp(f0[0], f1[0], u) - 5, lerp(f0[1], f1[1], u) - 2, lerp(f0[0], f1[0], u) + 5, lerp(f0[1], f1[1], u) - 2, 0, 2), 8, INK, { prof: 'even', nb: 0, a: .85 })); }
  const q0 = [860, 1200], q1 = [700, 760]; fl.push(mk(qcurve(q0[0], q0[1], q1[0], q1[1], 20, 20), 4, '#8a7a50', { prof: 'tip', nb: 0, a: .85 }));
  for (let i = 0; i < 18; i++) { const u = .3 + i / 18 * .66, x = lerp(q0[0], q1[0], u), yy = lerp(q0[1], q1[1], u); for (const sd of [-1, 1]) fl.push(mk(polar(x, yy, Math.atan2(q1[1] - q0[1], q1[0] - q0[0]) + sd * 1.1, lerp(16, 50, Math.sin(Math.PI * (u - .3) / .66)), 5, 4), 4, pick(['#5f8a52', '#6f9a5a']), { prof: 'tip', nb: 0, a: .55 })); }
  fl.push(mk(qcurve(q1[0] + 8, q1[1] + 20, q1[0] - 8, q1[1] - 20, 0, 6), 54, '#3f8a6a', { prof: 'leaf', nb: 4, a: .7 }), mk(qcurve(q1[0] + 5, q1[1] + 11, q1[0] - 5, q1[1] - 11, 0, 4), 32, '#d9a441', { prof: 'leaf', nb: 2, a: .85 }), mk(qcurve(q1[0] + 3, q1[1] + 6, q1[0] - 3, q1[1] - 6, 0, 3), 18, '#2f5f98', { prof: 'leaf', nb: 0, a: .95 }));
  return fl; };
(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"'].map(f => document.fonts.load(f)));
  build();
  window.READY = true;
})();
