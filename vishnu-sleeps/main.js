// The Sleeping Keeper — Vishnu's four months of sleep. 1080x1920, render(t) is a pure function of t.
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
const M = [31.0, 37.0, 43.0, 49.6];                       // the four months, on the locked landscape
const SC = { B: 27.0, C: 56.0, D: 77.0 };
const VOICE = [['v01', 1.0], ['v02', 5.2], ['v03', 16.4], ['m1', M[0] + .3], ['m2', M[1] + .3], ['m3', M[2] + .3], ['m4', M[3] + .3], ['v04', 57.6], ['v05', 63.8], ['v06', 72.2], ['v07', 79.0]];
const TXT = { v01: [3.286, 'Once a year, the preserver of the world goes to sleep.'], v02: [9.98, 'On a night in the rainy season, Devshayani Ekadashi, Vishnu lies down on the serpent Shesha, on the cosmic ocean, and closes his eyes.'],
  v03: [4.868, 'For four months, the monsoon months, he sleeps. This time is called Chaturmas.'], m1: [.975, 'The rain comes.'], m2: [1.162, 'The rivers rise.'], m3: [2.278, 'The fields turn green, then gold.'], m4: [1.636, 'And the lamps of autumn are lit.'],
  v04: [5.172, 'Then, on Prabodhini Ekadashi, the day of awakening, he opens his eyes.'], v05: [7.398, 'Homes celebrate by marrying a sacred basil plant, Tulsi, to Vishnu, under a canopy of sugarcane.'],
  v06: [2.248, 'And the season of weddings begins again.'], v07: [5.266, 'Even asleep, he holds the world. And every year, the world waits for him to wake.'] };
const SUBS = VOICE.map(([id, t]) => [t, Math.max(TXT[id][0], 1.6), TXT[id][1]]);
const MONTHS = [['SHRAVANA', 'July – August'], ['BHADRAPADA', 'August – September'], ['ASHVIN', 'September – October'], ['KARTIKA', 'October – November']];
const A = {}, Bl = {}, Cc = {}, D = {};
const rainLines = (c, t, a, n = 80) => { if (a <= 0) return; c.strokeStyle = rgba('#5f7486', .4 * a); c.lineWidth = 2.2; const tt = Math.floor(t * 12) / 12; for (let i = 0; i < n; i++) { const x = (hash(i) * 1300 + tt * 60) % 1300 - 110, y = (hash(i * 3) * 2000 + tt * 1400) % 2000 - 40; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 14, y + 60); c.stroke(); } };

// ================= A: the night he lies down =================
function sceneA(c, t) {
  c.save(); camAt(c, 1 + .06 * eio(seg(t, 4, 24)), 540, 1060);
  draw(c, A.sky, t); for (const s of A.stars) { const p = seg(t, s.t0, s.t0 + .4); if (p > 0) { c.save(); c.translate(s.x, s.y); c.scale(s.sc, s.sc); drawList(c, A.star, 1, null, eo(p) * (.7 + .3 * Math.sin(t * 2 + s.x))); c.restore(); } }
  draw(c, A.clouds, t); draw(c, A.ocean, t); draw(c, A.coil, t); draw(c, A.haze, t, { alpha: 1 - .35 * ss(seg(t, 13.5, 16)) });
  c.restore();
  rainLines(c, t, ss(seg(t, 18, 22)) * .6);
  const f1 = fade2(t, 6.0, 15.6, .6, .5); mono(c, 'DEVSHAYANI EKADASHI', 540, 220, f1, 'de', { size: 26, sp: 6, light: true }); hand(c, 'the night he lies down', 540, 282, seg(t, 6.6, 7.6), { size: 52, w: 500, align: 'center', id: 'de2', alpha: f1, light: true }); mono(c, 'ASHADHA · JUNE – JULY', 540, 342, f1 * ss(seg(t, 7.6, 8.2)), 'de3', { size: 18, sp: 4, light: true });
  const f2 = fade2(t, 16.8, 25.6, .6, .5); mono(c, 'CHATURMAS', 540, 220, f2, 'ch', { size: 26, sp: 8, light: true }); hand(c, 'four months of sleep', 540, 282, seg(t, 17.4, 18.4), { size: 52, w: 500, align: 'center', id: 'ch2', alpha: f2, light: true });
}
// ================= B: one landscape, four months =================
function sceneB(c, t) {
  draw(c, Bl.sky0, t); for (let k = 0; k < 4; k++) draw(c, Bl.sky[k], t);
  draw(c, Bl.hills, t); draw(c, Bl.fields0, t); draw(c, Bl.green, t); draw(c, Bl.gold, t);
  draw(c, Bl.river0, t); draw(c, Bl.riverHigh, t); draw(c, Bl.tree, t); draw(c, Bl.hut, t);
  const lp = seg(t, M[3] + .2, M[3] + 1.6); if (lp > 0) for (let i = 0; i < 9; i++) { const q = clamp(lp * 1.6 - i * .07); if (q <= 0) continue; const x = 600 + i * 40, y = 1302, fl = .8 + .3 * vnoise(t * 6 + i); c.save(); c.translate(x, y); c.scale(.42 * eo(q), .42 * fl * eo(q)); for (const s of Bl.flame) drawS(c, s, 1); c.restore(); c.fillStyle = rgba('#8a6a44', .9); c.beginPath(); c.ellipse(x, y + 4, 12, 5, 0, 0, 7); c.fill(); }
  rainLines(c, t, Math.min(ss(seg(t, M[0] - .4, M[0] + .6)), 1 - ss(seg(t, M[2] - 1, M[2] + .4))), 110);
  MONTHS.forEach(([nm, when], k) => { const t0 = M[k], t1 = k < 3 ? M[k + 1] - .1 : SC.C; const f = fade2(t, t0, t1, .4, .4); mono(c, `${k + 1} / 4 · ${nm}`, 540, 220, f, 'mo' + k, { size: 24, sp: 6 }); hand(c, when, 540, 280, seg(t, t0 + .3, t0 + 1.0), { size: 46, w: 500, align: 'center', id: 'mw' + k, alpha: f }); });
}
// ================= C: the awakening; Tulsi's wedding =================
function sceneC(c, t) {
  draw(c, Cc.wall, t); draw(c, Cc.dawn, t); draw(c, Cc.ground, t); draw(c, Cc.cane, t); draw(c, Cc.pot, t); draw(c, Cc.tulsi, t); draw(c, Cc.garland, t);
  const lp = seg(t, 67.4, 68.6); if (lp > 0) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, x = 540 + Math.cos(a) * 250, y = 1460 + Math.sin(a) * 60, q = clamp(lp * 1.6 - i * .08); if (q <= 0) continue; const fl = .8 + .3 * vnoise(t * 6 + i * 2); c.save(); c.translate(x, y); c.scale(.5 * eo(q), .5 * fl * eo(q)); for (const s of Bl.flame) drawS(c, s, 1); c.restore(); c.fillStyle = rgba('#8a6a44', .9); c.beginPath(); c.ellipse(x, y + 5, 15, 6, 0, 0, 7); c.fill(); }
  const pp = seg(t, 72.4, 77.2); if (pp > 0) for (let i = 0; i < 26; i++) { const u = (pp * 1.4 + hash(i)) % 1, x = 300 + hash(i * 3) * 480 + Math.sin(t * 2 + i) * 24, y = 520 + u * 900; c.fillStyle = rgba(i % 3 ? '#e8902e' : '#c8442a', .85 * (1 - u * .6)); c.beginPath(); c.ellipse(x, y, 9, 6, t + i, 0, 7); c.fill(); }   // falling marigold petals
  const f1 = fade2(t, 57.8, 63.4, .5, .4); mono(c, 'PRABODHINI EKADASHI', 540, 220, f1, 'pr', { size: 26, sp: 6 }); hand(c, 'the day of awakening', 540, 282, seg(t, 58.4, 59.4), { size: 52, w: 500, align: 'center', id: 'pr2', alpha: f1 }); mono(c, 'KARTIKA · OCTOBER – NOVEMBER', 540, 342, f1 * ss(seg(t, 59.2, 59.8)), 'pr3', { size: 18, sp: 4 });
  const f2 = fade2(t, 64.2, 76.6, .6, .5); mono(c, 'TULSI VIVAH', 540, 220, f2, 'tv', { size: 26, sp: 8 }); hand(c, "the basil's wedding", 540, 282, seg(t, 64.8, 65.8), { size: 52, w: 500, align: 'center', id: 'tv2', alpha: f2 });
}
// ================= D: the lotus, the title =================
function sceneD(c, t) {
  draw(c, D.sky, t); draw(c, D.ocean, t); draw(c, D.bloom, t); draw(c, D.spark, t);
  serif(c, 'VISHNU', 540, 330, seg(t, 84.6, 86.2), { size: 120, sp: 22, id: 'title' }); hand(c, 'the keeper who sleeps', 540, 410, seg(t, 85.8, 86.8), { size: 56, w: 500, align: 'center', id: 'tsub' });
}
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
const SCENES = [[0, sceneA], [SC.B, sceneB], [SC.C, sceneC], [SC.D, sceneD]];
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; paper(ctx);
  if (t < SC.B) { sceneA(ctx, t); mist(t, eio(seg(t, 25.0, 27.0)), true); }
  else if (t < SC.C) sceneB(ctx, t);
  else if (t < SC.C + 1.2) wipe(t, SC.C, 1.2, sceneB, sceneC);
  else if (t < SC.D) sceneC(ctx, t);
  else if (t < SC.D + 1.2) wipe(t, SC.D, 1.2, sceneC, sceneD);
  else sceneD(ctx, t);
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TX; };

function build() {
  const WX = [-80, 1160];
  withSeed(11, () => {   // ---- A ----
    A.sky = O(wash(...WX, 0, 1140, ['#232a44', '#283152', '#2f3a5c', '#3a4668'], 9, .75), 0, 0, .2, 2.4, { res: .5 });
    A.star = []; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; A.star.push(mk(polar(0, 0, a, i % 2 ? 10 : 18, 0, 4), i % 2 ? 4 : 6, pick(['#ecd08a', '#e0b04a']), { prof: 'tip', nb: 0, a: .9 })); }
    A.stars = []; for (let i = 0; i < 40; i++) A.stars.push({ x: rnd(40, 1040), y: rnd(380, 900), sc: rnd(.6, 1.2), t0: rnd(1.6, 6) });
    A.clouds = O([...cloud(1.6, '#6d7590').S.map(s => ({ ...s, pts: s.pts.map(([u, v]) => [u + 300, v + 560]) })), ...cloud(1.3, '#5f6880').S.map(s => ({ ...s, pts: s.pts.map(([u, v]) => [u + 820, v + 700]) }))], 0, 0, 18.0, 21.0);
    A.ocean = O(wash(...WX, 1140, 1920, ['#2f4c6e', '#3d5d80', '#26405e'], 9, .65), 0, 0, 1.0, 3.6, { res: .5 });
    A.coil = O(serpent(.9).S, 560, 1300, 5.6, 9.0, { sway: .003 });
    const hz = []; for (let i = 0; i < 16; i++) { const cx = rnd(320, 800), y = 1150 + rnd(-30, 40), L = rnd(160, 340); hz.push(mk(qcurve(cx - L / 2, y, cx + L / 2, y + rnd(-14, 14), rnd(-30, -6), 12), rnd(26, 50), pick(VBLUE), { prof: 'leaf', nb: 5, a: .3, rough: .35 })); }
    A.haze = O(hz, 0, 0, 9.4, 12.0);
  });
  withSeed(21, () => {   // ---- B: the locked landscape and its four repaintings ----
    Bl.sky0 = O(wash(...WX, 0, 900, ['#d4dade', '#c9d1d8'], 8, .4), 0, 0, SC.B + .2, SC.B + 2.0, { res: .5 });
    const SK = [['#8d9aa9', '#7f8d9e', '#a8b3be'], ['#a9c0d0', '#bcd0d6'], ['#efd398', '#e8c46a', '#f2dfae'], ['#d9a98a', '#b49aa0', '#7f86a3']];
    Bl.sky = SK.map((cols, k) => O(wash(...WX, 0, 900, cols, 8, .45), 0, 0, M[k] - .2, M[k] + 1.2, { res: .5 }));
    Bl.hills = O(hills(1300, 300, ['#7c9a52', '#6a8a4c', '#8ea860'], 9, .55).S, -110, 980, SC.B + .6, SC.B + 2.2);
    Bl.fields0 = O(wash(...WX, 980, 1920, ['#b6c497', '#a9b98a'], 9, .45), 0, 0, SC.B + 1.0, SC.B + 2.8, { res: .5 });
    Bl.green = O(wash(...WX, 1380, 1920, ['#6a8a4c', '#7c9a52', '#5f8a4c'], 6, .55), 0, 0, M[2] - .2, M[2] + 1.0, { res: .5 });
    Bl.gold = O(wash(...WX, 1380, 1920, ['#d4aa6c', '#e0b04a', '#c99a5b'], 6, .6), 0, 0, M[2] + 2.0, M[2] + 3.4, { res: .5 });
    Bl.river0 = O(riverStrokes([[-80, 1120], [300, 1180], [620, 1150], [1160, 1220]], 40, 70, ['#6f8faa', '#8fb0c6'], 4), 0, 0, SC.B + 1.6, SC.B + 2.8);
    Bl.riverHigh = O(riverStrokes([[-80, 1110], [300, 1170], [620, 1140], [1160, 1210]], 120, 180, ['#5f80a0', '#6f8faa', '#8fb0c6'], 7), 0, 0, M[1] - .3, M[1] + 1.6);
    Bl.tree = O(tree(2.2, C.green).S, 860, 1340, SC.B + 1.4, SC.B + 3.0, { sway: .006 });
    const hut = []; for (let i = 0; i < 6; i++) hut.push(mk(qcurve(560, 1300 - i * 22, 1000, 1300 - i * 22, 0, 10), 24, pick(['#efe2c4', '#e6d6b2']), { prof: 'even', nb: 4, a: .85 }));
    for (let i = 0; i < 7; i++) hut.push(mk(qcurve(520 + i * 10, 1170 - i * 20, 1040 - i * 10, 1170 - i * 20, -10, 10), 30, pick(['#c99a5b', '#b98a4c', '#a77a3e']), { prof: 'even', nb: 6, a: .85 }));
    hut.push(mk(qcurve(740, 1300, 740, 1220, 0, 4), 50, '#5b4636', { prof: 'even', nb: 2, a: .85 }));
    Bl.hut = O(hut, 0, 0, SC.B + 1.8, SC.B + 3.2);
    Bl.flame = flameStrokes(1);
  });
  withSeed(31, () => {   // ---- C ----
    Cc.wall = O(wash(...WX, 0, 1200, ['#efe2c4', '#e6d6b2', '#f2ead0'], 9, .45), 0, 0, SC.C + .2, SC.C + 1.4, { res: .5 });
    Cc.dawn = O(wash(...WX, 0, 600, ['#7f9fbe', '#a9c0d0', '#8fb0c6'], 6, .45), 0, 0, 58.2, 61.0, { res: .5 });
    Cc.ground = O(wash(...WX, 1200, 1920, ['#c99a5b', '#d4aa6c', '#bf8f52'], 8, .55), 0, 0, SC.C + .4, SC.C + 1.6, { res: .5 });
    const pot = []; for (let i = 0; i < 12; i++) pot.push(mk(qcurve(400, 1460 - i * 30, 680, 1460 - i * 30, 0, 10), 32, i % 4 === 0 ? '#c8442a' : pick(['#e6d6b2', '#efe2c4']), { prof: 'even', nb: 4, a: .85 }));
    pot.push(mk(qcurve(500, 1300, 580, 1300, -40, 8), 30, '#5b4636', { prof: 'even', nb: 2, a: .8 }));
    Cc.pot = O(pot, 0, 0, 62.8, 64.6);
    const tl = []; for (const [dx, dy, r] of [[0, -90, 80], [-50, -40, 60], [50, -50, 60], [0, -150, 50]]) clump(tl, 540 + dx, 1100 + dy, r, 30, ['#4e7a52', '#5f8a52', '#6b5a7a', '#3f6f4f'], { l0: 8, l1: 16, w0: 6, w1: 10, sx: 1, sy: 1 });
    tl.unshift(mk(qcurve(540, 1110, 540, 960, 0, 6), 8, '#5b4636', { prof: 'tip', nb: 0, a: .8 }));
    Cc.tulsi = O(tl, 0, 0, 64.4, 66.4, { sway: .006 });
    const cane = []; for (const [x0, x1] of [[300, 520], [780, 560], [360, 530], [720, 550]]) { const st = mk(qcurve(x0, 1480, x1, 640, 0, 14), 16, pick(['#7c9a52', '#8ea860']), { prof: 'even', nb: 3, a: .85 }); cane.push(st); for (let k = 1; k < 8; k++) { const u = k / 8; cane.push(mk(qcurve(lerp(x0, x1, u) - 9, lerp(1480, 640, u), lerp(x0, x1, u) + 9, lerp(1480, 640, u), 0, 3), 4, '#5f7a40', { prof: 'even', nb: 0, a: .8 })); } }
    for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i / 7 - .5) * 2.4; cane.push(mk(polar(540, 640, a, rnd(120, 200), rnd(-30, 30), 8), 16, pick(['#7c9a52', '#8ea860', '#93ad66']), { prof: 'leaf', nb: 3, a: .8 })); }
    Cc.cane = O(cane, 0, 0, 65.6, 67.6);
    const gar = []; for (const [x0, y0, x1, y1] of [[330, 1000, 750, 1000], [380, 820, 700, 820]]) for (let i = 0; i <= 16; i++) { const u = i / 16, x = lerp(x0, x1, u), y = lerp(y0, y1, u) + Math.sin(u * Math.PI) * 60; gar.push(mk(qcurve(x - 6, y, x + 6, y, 0, 3), 18, i % 2 ? '#e8902e' : '#e0b04a', { prof: 'leaf', nb: 0, a: .9 })); }
    Cc.garland = O(gar, 0, 0, 70.6, 72.0);
  });
  withSeed(41, () => {   // ---- D ----
    D.sky = O(wash(...WX, 0, 1150, ['#bcd0d6', '#efd398', '#f2dfae'], 9, .35), 0, 0, SC.D + .2, SC.D + 1.6, { res: .5 });
    D.ocean = O(wash(...WX, 1150, 1920, ['#3d5d80', '#4f7090', '#2f4c6e'], 9, .6), 0, 0, SC.D + .4, SC.D + 1.8, { res: .5 });
    const lb = lotusBloom(1.6); D.bloom = O(lb.S, 540, 1160, 78.4, 81.4, { sway: .003 }); D.spark = O([lb.spark], 540, 1160, 81.4, 81.8);
  });

  VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
  SUBS.forEach(([t, d, text]) => ev(t, 'sub', { d, text }));
  ev(.2, 'brush', { d: 2.2, g: .4, pan0: -.8, pan1: .8 }); ev(1.0, 'sea', { d: 25 }); ev(5.6, 'brush', { d: 3.4, g: .4, pan0: -.6, pan1: .6 }); ev(9.4, 'brush', { d: 2.6, g: .3 }); ev(6.6, 'pencil', { d: 1.0 }); ev(17.4, 'pencil', { d: 1.0 });
  ev(18.0, 'rain', { d: 9.4, g: .6 }); ev(20.6, 'thunder'); ev(25.0, 'mist', { d: 2.2 });
  ev(SC.B + .2, 'brush', { d: 3.0, g: .4, pan0: -.8, pan1: .8 });
  M.forEach((t, k) => { ev(t - .2, 'brush', { d: 1.4, g: .35, pan0: .6, pan1: -.6 }); ev(t + .3, 'pencil', { d: .8 }); });
  ev(M[0] - .4, 'rain', { d: M[2] - M[0] + .6, g: 1 }); ev(M[0] + .6, 'thunder'); ev(M[1] - .3, 'river', { d: 12 }); ev(M[2] + 2.0, 'brush', { d: 1.4, g: .35 }); ev(M[3] + .2, 'lamps');
  [SC.C, SC.D].forEach(t => ev(t, 'brush', { d: 1.2, g: .45, pan0: -.9, pan1: .9 }));
  ev(58.2, 'brush', { d: 2.8, g: .3 }); ev(58.4, 'pencil', { d: 1 }); ev(62.8, 'brush', { d: 1.8, g: .35 }); ev(64.4, 'brush', { d: 2.0, g: .3 }); ev(64.8, 'pencil', { d: 1 }); ev(65.6, 'brush', { d: 2.0, g: .35 }); ev(67.4, 'lamps'); ev(70.6, 'brush', { d: 1.4, g: .3 }); ev(72.4, 'wedding', { d: 4.6 });
  ev(SC.D + .2, 'sea', { d: 12 }); ev(78.4, 'brush', { d: 3.0, g: .4 }); ev(85.8, 'pencil', { d: 1.0 });
}
(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"'].map(f => document.fonts.load(f)));
  build();
  window.READY = true;
})();
