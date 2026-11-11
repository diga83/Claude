// The Way Home — Rama's journey as one painted column, Ayodhya (north, top) to Lanka (south, bottom). 1080x1920.
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

// ---------- timeline ----------
const VOICE = [['v01', 1.2], ['v02', 10.4], ['v03', 25.0], ['v04', 41.0], ['v05', 53.0], ['v06', 63.4], ['v07', 72.0], ['v08', 84.0]];
const TXT = { v01: [5.34, 'Rama was a prince of Ayodhya, heir to its throne, and known for keeping his word.'],
  v02: [8.758, "To keep his father's promise, he gave up the crown and walked into the forest for 14 years, with his wife Sita and his brother Lakshmana."],
  v03: [10.901, 'There, a golden deer lured him away, and the demon king Ravana carried Sita off to his island, Lanka. As she flew, she dropped her jewels, to leave a trail.'],
  v04: [7.177, 'Searching for her, Rama found friends: an army of monkeys, and Hanuman, who leapt across the sea to find her.'],
  v05: [5.385, "Then the army built a bridge of floating stones, each one marked with Rama's name."], v06: [4.298, 'In the battle that followed, Ravana fell, and Sita was free at last.'],
  v07: [6.415, 'When they came home, the people lit their way with lamps. Many still do, every autumn, at Diwali.'], v08: [2.173, 'Rama: the one who kept his word.'] };
const SUBS = VOICE.map(([id, t]) => [t, TXT[id][0], TXT[id][1]]);
// the road south: gate → forest → shore, then the bridge → Lanka
const ROAD = [[540, 1260], [450, 1700], [630, 2200], [490, 2700], [570, 3200], [520, 3700], [610, 4200], [470, 4700], [540, 5200], [540, 5580]];
const BRIDGE = [[540, 5640], [540, 7130]];
const camY = monotone([[0, 960], [11.0, 960], [20.5, 3500], [40.0, 3560], [41.6, 5300], [46.2, 5300], [49.4, 6420], [61.6, 6420], [63.0, 7000], [71.0, 7000], [82.6, 960], [DUR, 960]]);
const A = {};
function along(pts, u) { let L = 0; const seg_ = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg_.push(d); L += d; } let s = u * L; for (let i = 0; i < seg_.length; i++) { if (s <= seg_[i]) { const f = s / seg_[i]; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } s -= seg_[i]; } return pts[pts.length - 1]; }
const ALLPATH = [...ROAD, ...BRIDGE, [540, 7240]];

function world(c, t) {
  const cy = camY(t); c.setTransform(1, 0, 0, 1, 0, 960 - cy);
  const vis = ob => ob.y + ob.spr.y1 > cy - 1200 && ob.y + ob.spr.y0 < cy + 1200;
  for (const ob of A.bg) if (vis(ob)) draw(c, ob, t);
  // the road and the footsteps of three walkers
  drawS(c, A.road, eio(seg(t, 10.6, 20.4)));
  A.steps.forEach((s, i) => { if (t > s.t0) { c.save(); c.translate(s.x, s.y); c.rotate(s.a); drawList(c, A.step, seg(t, s.t0, s.t0 + .3)); c.restore(); } });
  for (const ob of A.fg) if (vis(ob)) draw(c, ob, t, ob.sw ? { rot: ob.sw(t) } : {});
  // the golden deer, leaping across the clearing
  const dp = seg(t, 26.2, 29.6); if (dp > 0 && dp < 1) { const x = lerp(-120, 1200, dp), y = 3780 - Math.abs(Math.sin(dp * Math.PI * 4)) * 90; c.save(); c.translate(x, y); c.rotate(-.15 * Math.cos(dp * Math.PI * 8)); c.scale(1.7, 1.7); drawList(c, A.deer, 1); c.restore(); }
  // the chariot streaks south across the sky; the jewels fall in a trail
  const sp = seg(t, 30.0, 31.8); if (sp > 0) for (const s of A.streak) drawS(c, s, eio(sp));
  A.jewels.forEach(j => { const p = seg(t, j.t0, j.t0 + .6); if (p > 0) { c.save(); c.translate(j.x, j.y + (1 - eo(p)) * -60); drawS(c, j.s, 1); c.restore(); } });
  // the monkey army, Hanuman's leap
  A.monkeys.forEach(m => { const p = seg(t, m.t0, m.t0 + .4); if (p > 0) { const hop = Math.abs(Math.sin(Math.floor(t * 8) / 8 * 3 + m.ph)) * 6; c.save(); c.translate(m.x, m.y - hop); c.scale(m.s, m.s); drawList(c, A.monkey, eo(p)); c.restore(); } });
  const lp = seg(t, 46.2, 48.8); if (lp > 0) { drawS(c, A.leap, eio(lp)); if (lp < 1) { const [x, y] = along(A.leap.pts, eio(lp)); c.fillStyle = rgba('#d9822e', .95); c.beginPath(); c.arc(x, y, 14, 0, 7); c.fill(); } }
  // the bridge of floating stones, one per half beat
  A.stones.forEach((s, i) => { const p = seg(t, s.t0, s.t0 + .35); if (p > 0) { c.save(); c.translate(s.x, s.y); drawList(c, s.L, eo(p)); c.restore(); } });
  // the arrow; smoke over Lanka; a flower opens
  const ap = seg(t, 64.6, 65.1); if (ap > 0) drawS(c, A.arrow, ap);
  draw(c, A.smoke, t, { alpha: 1 - ss(seg(t, 67.0, 69.0)) }); draw(c, A.flower, t);
  // the way home: lamps light the whole road, from Lanka back to Ayodhya
  A.lamps.forEach((l, i) => { const p = seg(t, l.t0, l.t0 + .4); if (p <= 0) return; const fl = .8 + .3 * vnoise(t * 6 + i * 2); const gl = c.createRadialGradient(l.x, l.y - 20, 4, l.x, l.y - 20, 90); gl.addColorStop(0, rgba('#f2c46a', .45 * eo(p))); gl.addColorStop(1, rgba('#f2c46a', 0)); c.fillStyle = gl; c.fillRect(l.x - 90, l.y - 110, 180, 180); c.save(); c.translate(l.x, l.y); c.scale(.75 * eo(p), .75 * fl * eo(p)); for (const s of A.flame) drawS(c, s, 1); c.restore(); c.fillStyle = rgba('#8a6a44', .95); c.beginPath(); c.ellipse(l.x, l.y + 6, 22, 8, 0, 0, 7); c.fill(); });
  c.setTransform(1, 0, 0, 1, 0, 0);
}
const LABELS = [[2.0, 9.6, 'AYODHYA', 'the city of his birth'], [14.0, 23.6, '14 YEARS', 'into the forest'], [25.6, 39.6, 'PANCHAVATI', 'the forest home'], [41.8, 51.4, 'THE SOUTHERN SHORE', 'friends'], [53.6, 61.4, 'RAMA SETU', 'the bridge of floating stones'], [63.6, 70.6, 'LANKA', 'the island']];
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; paper(ctx);
  world(ctx, t);
  for (const [t0, t1, m, h] of LABELS) { const f = fade2(t, t0, t1, .5, .5); if (f <= 0) continue; ctx.save(); ctx.globalAlpha = f; const g = ctx.createRadialGradient(540, 250, 10, 540, 250, 420); g.addColorStop(0, rgba(PAPER, .85)); g.addColorStop(1, rgba(PAPER, 0)); ctx.fillStyle = g; ctx.translate(540, 250); ctx.scale(1, .32); ctx.translate(-540, -250); ctx.fillRect(0, -200, W, 900); ctx.restore(); mono(ctx, m, 540, 220, f, 'm' + t0, { size: 26, sp: 8 }); hand(ctx, h, 540, 282, seg(t, t0 + .5, t0 + 1.4), { size: 52, w: 500, align: 'center', id: 'h' + t0, alpha: f }); }
  if (t > 82.4) { serif(ctx, 'RAMA', 540, 330, seg(t, 82.4, 84.0), { size: 124, sp: 24, id: 'title' }); hand(ctx, 'the one who kept his word', 540, 412, seg(t, 84.4, 85.6), { size: 56, w: 500, align: 'center', id: 'tsub' }); }
  drawSubs(t);
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
window.render = render;
window.TEXTS = t => { render(t); return TX; };

function build() {
  const WX = [-80, 1160], R5 = { res: .5 };
  withSeed(11, () => {
    A.bg = [
      O(wash(...WX, 0, 1260, ['#efd398', '#f2dfae', '#e8c46a'], 8, .3), 0, 0, .1, 1.6, R5),
      O(wash(...WX, 1260, 2300, ['#c9d8b8', '#dfe7d0', '#b6c497'], 7, .35), 0, 0, 9.6, 12.0, R5),
      O(wash(...WX, 2300, 5000, ['#8ea860', '#7c9a52', '#93ad66', '#6a8a4c'], 14, .4), 0, 0, 13.0, 18.0, R5),
      O(wash(...WX, 5000, 5600, ['#d4aa6c', '#dcb67e', '#c9a45c'], 5, .5), 0, 0, 39.6, 41.6, R5),
      O(wash(...WX, 5600, 7900, ['#3d5d80', '#4f7090', '#2f4c6e', '#6f8faa'], 16, .5), 0, 0, 40.4, 44.0, R5),
    ];
    A.fg = [O(cityWalls(1.25), 540, 1150, .4, 2.6), O(hills(900, 140, C.far, 6, .4).S, 90, 860, .2, 1.4)];
    for (const [x, y, sc] of [[150, 2500, 1.1], [900, 2700, 1.3], [200, 3050, 1.5], [880, 3150, 1.2], [140, 3450, 1.6], [940, 3480, 1.4], [260, 3900, 1.2], [820, 3950, 1.5], [120, 4300, 1.3], [940, 4400, 1.1], [300, 4700, 1.0], [800, 4800, 1.2]]) A.fg.push(O(tree(sc, C.green).S, x, y, 13.0 + (y - 2400) / 1300 * 3.5, 14.4 + (y - 2400) / 1300 * 3.5, { sway: .008, ph: x }));
    const hut = []; for (let i = 0; i < 6; i++) hut.push(mk(qcurve(300 - i * 4, 3640 - i * 18, 500 + i * 4, 3640 - i * 18, -10, 8), 24, pick(['#a8b06a', '#8a9a52', '#b6a65a']), { prof: 'leaf', nb: 4, a: .8 }));
    hut.push(mk(qcurve(320, 3660, 480, 3660, 0, 6), 80, '#c9a46a', { prof: 'even', nb: 3, a: .6 }), mk(qcurve(395, 3700, 395, 3640, 0, 3), 30, '#5b4636', { prof: 'even', nb: 0, a: .8 }));
    A.fg.push(O(hut, 0, 0, 24.6, 26.0));
    A.fg.push(O(cloud(1.2, '#b4bcc6').S, 600, 3300, 24.0, 25.4));
    // Lanka
    const isl = []; for (let i = 0; i < 9; i++) { const y = 7230 + i * 18; isl.push(mk(qcurve(160 + i * 10, y, 920 - i * 10, y, -30, 14), 40, pick(['#4e7a52', '#3f6f4f', '#5f8a52']), { prof: 'leaf', nb: 5, a: .8 })); }
    A.fg.push(O(isl, 0, 0, 45.6, 47.0), O(cityWalls(.8).map(s => ({ ...s, col: mixc(s.col, '#6b4a3a', .45) })), 540, 7250, 46.4, 47.8));
    A.road = mk(ROAD.flatMap((p, i, a) => i ? qcurve(a[i - 1][0], a[i - 1][1], p[0], p[1], (i % 2 ? 40 : -40), 10).slice(1) : [p]), 26, '#d9c9a6', { prof: 'even', nb: 5, a: .65, rough: .3 });
    A.step = [mk(qcurve(-4, 6, 4, 6, 0, 3), 12, '#6b5440', { prof: 'leaf', nb: 0, a: .7 }), mk(qcurve(-4, -12, 4, -12, 0, 3), 6, '#6b5440', { prof: 'leaf', nb: 0, a: .7 })];
    A.steps = []; for (let i = 0; i < 60; i++) { const u = i / 60, [x, y] = along(A.road.pts, u), [x2, y2] = along(A.road.pts, Math.min(1, u + .01)), a = Math.atan2(y2 - y, x2 - x) + Math.PI / 2; for (let w = -1; w <= 1; w++) A.steps.push({ x: x + w * 22 + (i % 2 ? 6 : -6), y: y + w * 8, a, t0: lerp(10.8, 20.2, u) + (w + 1) * .05 }); }
    // deer
    A.deer = [mk(qcurve(-60, 0, 50, -6, -10, 8), 46, '#e0b04a', { prof: 'leaf', nb: 4, a: .9 }), mk(qcurve(45, -10, 80, -60, 6, 5), 20, '#d9a441', { prof: 'even', nb: 2, a: .9 }), mk(qcurve(78, -66, 104, -58, 0, 4), 20, '#d9a441', { prof: 'leaf', nb: 0, a: .9 }),
      ...[[-40, 10, -80, 46], [-30, 10, -10, 50], [30, 8, 60, 44], [40, 8, 80, 30]].map(([a, b, c2, d]) => mk(qcurve(a, b, c2, d, 4, 4), 6, '#c99a5b', { prof: 'tip', nb: 0, a: .9 })),
      mk(qcurve(80, -70, 70, -110, 6, 4), 4, '#8a6a44', { prof: 'tip', nb: 0, a: .9 }), mk(qcurve(90, -70, 104, -108, -6, 4), 4, '#8a6a44', { prof: 'tip', nb: 0, a: .9 }), ...Array.from({ length: 5 }, (_, i) => mk(qcurve(-30 + i * 16, -10, -26 + i * 16, -10, 0, 2), 7, '#f6efdc', { prof: 'leaf', nb: 0, a: .9 }))];
    A.streak = [mk(qctrl(80, 3220, 500, 3150, 1000, 3600, 20), 30, '#2f2c2a', { prof: 'tip', nb: 6, a: .7 }), mk(qctrl(90, 3240, 500, 3180, 1000, 3620, 20), 8, C.ver, { prof: 'tip', nb: 2, a: .8 })];
    A.jewels = []; for (let i = 0; i < 16; i++) { const u = i / 15; A.jewels.push({ x: lerp(560, 640, u) + Math.sin(i) * 40, y: lerp(3700, 5100, u), t0: 33.0 + i * .2, s: mk(qcurve(-5, 0, 5, 0, 0, 3), 16, i % 3 ? '#e0b04a' : C.ver, { prof: 'leaf', nb: 0, a: .95 }) }); }
    A.monkey = [mk(qcurve(0, 0, 0, -26, 0, 4), 22, '#8a6a44', { prof: 'leaf', nb: 0, a: .9 }), mk(qcurve(-4, -34, 4, -34, 0, 3), 18, '#a77a4a', { prof: 'leaf', nb: 0, a: .9 }), mk(qcurve(8, -6, 26, -40, 10, 5), 4, '#6b5440', { prof: 'tip', nb: 0, a: .9 })];
    A.monkeys = []; for (let i = 0; i < 46; i++) A.monkeys.push({ x: rnd(80, 1000), y: rnd(5420, 5570), s: rnd(.8, 1.2), ph: rnd(0, 6), t0: 43.0 + rnd(0, 1.4) });
    A.leap = mk(qctrl(540, 5540, 1060, 6300, 560, 7200, 40), 10, '#e0a83a', { prof: 'tip', nb: 3, a: .8 });
    A.stones = []; for (let i = 0; i < 26; i++) { const y = lerp(5650, 7120, i / 25), x = 540 + Math.sin(i * 1.7) * 26; const st_ = mk(qcurve(-56, 0, 56, 0, rnd(-6, 6), 6), 54, pick(['#e6dccb', '#d8cdb8', '#efe6d4']), { prof: 'leaf', nb: 3, a: .95 }); const L = [st_, edgeOf(st_, 1, 3, INK2, .7), edgeOf(st_, -1, 2.4, INK2, .5), mk(qcurve(-10, -2, 10, -2, 0, 2), 11, C.ver, { prof: 'leaf', nb: 0, a: .95 })]; A.stones.push({ x, y, L, t0: 53.6 + i * (60.4 - 53.6) / 25 }); }
    A.arrow = mk(qcurve(540, 6200, 560, 7180, 0, 12), 5, '#f2c46a', { prof: 'tip', nb: 1, a: .95 });
    A.smoke = O(wash(...WX, 6900, 7300, ['#8b8a80', '#6b655e'], 4, .5), 0, 0, 65.0, 66.0, R5);
    A.flower = O(lotusBloom(.6).S, 540, 7270, 67.6, 69.0);
    A.flame = flameStrokes(1);
    A.lamps = []; for (let i = 0; i < 46; i++) { const u = i / 45, [x, y] = along(ALLPATH, 1 - u); A.lamps.push({ x: x + (i % 2 ? 34 : -34), y, t0: 71.0 + u * 11.2 }); }
  });
  VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
  SUBS.forEach(([t, d, text]) => ev(t, 'sub', { d, text }));
  ev(.1, 'brush', { d: 2.6, g: .4, pan0: -.8, pan1: .8 }); ev(2.5, 'pencil', { d: 1 }); ev(10.6, 'steps', { d: 9.6 }); ev(13.0, 'brush', { d: 5.0, g: .35 }); ev(14.5, 'pencil', { d: 1 }); ev(13.0, 'leaves', { d: 27 });
  ev(24.6, 'brush', { d: 1.4, g: .3 }); ev(26.1, 'pencil', { d: 1 }); ev(26.2, 'hooves', { d: 3.4 }); ev(30.0, 'whoosh', { d: 1.8 }); ev(33.0, 'jewels', { d: 3.2 });
  ev(39.6, 'brush', { d: 4.4, g: .4, pan0: -.6, pan1: .6 }); ev(40.4, 'sea', { d: 31 }); ev(42.3, 'pencil', { d: 1 }); ev(43.0, 'chatter', { d: 5 }); ev(46.7, 'leap', { d: .8 });   // between 'leapt' and 'to find her'
  A.stones.forEach(s => ev(s.t0, 'stone')); ev(54.1, 'pencil', { d: 1 });
  ev(64.0, 'drum', { d: 1.0 }); ev(64.6, 'arrow'); ev(65.0, 'thud'); ev(67.6, 'brush', { d: 1.4, g: .3 }); ev(64.1, 'pencil', { d: 1 });
  ev(71.0, 'lamps', { d: 11.2 }); ev(82.4, 'bells'); ev(84.4, 'pencil', { d: 1 });
}
(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"'].map(f => document.fonts.load(f)));
  build();
  window.READY = true;
})();
