// The Creator's Hour — Brahma. 1080x1920, render(t) is a pure function of t.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const DUR = 120; window.DUR = DUR;
const BEAT = .8, BAR = 3.2, bar = n => n * BAR;   // 75 BPM, 4/4

const VOICE = [['v01', 1.0], ['v02', 7.4], ['v03', 11.6], ['v04', 20.8], ['v05', 36.8], ['h1', 41.0], ['h2', 49.2], ['h3', 57.2], ['h4', 65.2],
  ['v06', 72.2], ['v07', 80.2], ['v08', 87.6], ['v09', 95.2], ['v10', 100.6], ['v11', 110.4]];
const SUBS = [
  [1.0, 5.537, 'In the beginning, the old stories say, there was only dark water, and on it, a golden egg.'],
  [7.4, 2.236, 'Hiranyagarbha. The golden womb.'],
  [11.6, 7.857, 'When it broke, one half became the sky, and the other, the earth. And the one who woke inside was Brahma, the creator.'],
  [20.8, 7.989, 'He has four faces, so that he sees in every direction at once. From each of his four mouths came one of the four Vedas.'],
  [36.8, 3.62, 'In his four hands, he holds what a world needs to begin.'],
  [41.0, 2.209, 'A water pot, for the waters of life.'],
  [49.2, 2.39, 'A string of beads, to count out time.'],
  [57.2, 2.069, 'The sacred Vedas, for knowledge.'],
  [65.2, 3.009, 'And a lotus, for all that grows pure from the mud.'],
  [72.2, 7.172, 'His mount is the swan, which is said to separate milk from water: the gift of telling the true from the false.'],
  [80.2, 5.061, 'Saraswati, goddess of knowledge and music, rides the same white swan.'],
  [87.6, 6.944, 'One day of Brahma lasts 4,320,000,000 years, and his night is just as long.'],
  [95.2, 3.929, 'He lives for a hundred such years. And then the universe rests.'],
  [100.6, 9.052, 'Few temples are built for him. The best known stands at Pushkar, in Rajasthan, beside a lake said to have formed where his lotus fell.'],
  [110.4, 8.224, 'And the hour before dawn still carries his name: Brahma muhurta, the creator\'s hour, when the world is about to begin again.'],
];
window.VOICE = VOICE; window.SUBS = SUBS;

const T = {
  bloom0: .3, egg0: 2.0, egg1: 6.0, water0: 2.5, crack: 11.9, split: bar(4), sky0: 13.2, earth0: 14.0, lotus0: 16.2, lotus1: 19.0,
  gaze: [bar(7.5), bar(7.75), bar(8), bar(8.25)],
  wipe1: bar(11), hands: 36.4, p: [40.6, 48.8, 57.0, 65.0], wipe2: bar(22),
  swan0: 71.8, bowl0: 74.0, sep0: 76.2, sep1: 79.6, veena: 80.6, mist0: 85.4, mist1: 87.2,
  day0: 88.0, grid0: 95.4, rest0: 98.6, rest1: 100.4,
  hills0: 100.8, lake0: 101.6, ghat0: 102.6, temple0: 103.4, temple1: 105.8, dawn0: 108.5, dawn1: 118.5, light0: 116.0,
};

// ---------- helpers ----------
const RES = 1.5;
function spriteR(L, res = RES) {
  const [x0, y0, x1, y1] = bbox(L), c2 = document.createElement('canvas');
  c2.width = Math.max(1, Math.ceil((x1 - x0) * res)); c2.height = Math.max(1, Math.ceil((y1 - y0) * res));
  const c = c2.getContext('2d'); c.scale(res, res); c.translate(-x0, -y0); for (const s of L) drawS(c, s, 1);
  return { cv: c2, x0, y0, x1, y1 };
}
const O = (L, x, y, t0, t1, o = {}) => ({ L, x, y, t0, t1, rot: o.rot || 0, sway: o.sway || 0, ph: o.ph || 0, spr: spriteR(L) });
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
let PAPER_IMG; const A = {}, Bh = {}, Cs = {}, D_ = {}, E = {};
const EV = []; window.EV = EV; const ev = (t, type, o = {}) => EV.push({ t: +t.toFixed(3), type, ...o });
const paper = c => c.drawImage(PAPER_IMG, 0, 0);

// ================= scene A: the golden egg, the four faces =================
function sceneA(c, t) {
  c.save();
  const s = lerp(2.6, 1, eio(seg(t, .5, 6.5))) + .08 * eio(seg(t, 7, 11)) - .08 * eio(seg(t, 12, 15)) + .3 * eio(seg(t, 19.5, 22.5)) - .3 * eio(seg(t, 23, 26.2));
  const cy = lerp(900, 960, eio(seg(t, 12, 16))) + 40 * eio(seg(t, 19.5, 22.5)) - 40 * eio(seg(t, 23, 26.2));
  camAt(c, s, 540, cy);
  // dark water
  draw(c, A.water, t);
  // the first gold: a wet bloom that becomes the egg
  const bp = eo(seg(t, T.bloom0, 3.5)), bf = 1 - ss(seg(t, 4, 6.5));
  if (bp > 0 && bf > 0) withSeed(7, () => {
    for (let pass = 0; pass < 4; pass++) {
      c.beginPath();
      for (let i = 0; i <= 44; i++) { const a = i / 44 * Math.PI * 2, r = (20 + 170 * bp) * (1 + .22 * (vnoise(i * .6 + pass * 7) - .5)); const x = 540 + Math.cos(a) * r * .8, y = 900 + Math.sin(a) * r; i ? c.lineTo(x, y) : c.moveTo(x, y); }
      c.closePath(); c.fillStyle = rgba(pick(GOLD), .22 * bf); c.fill();
    }
  });
  // the egg (bobbing), its crack and its split
  const bob = Math.sin(t * 1.1) * 6 * (1 - seg(t, T.split - 1, T.split));
  const sp = eio(seg(t, T.split, T.split + 2.8));
  c.save(); c.translate(540, 900 + bob);
  if (sp < 1) {
    const pe = seg(t, T.egg0, T.egg1);
    c.save(); c.translate(0, -sp * 520); c.rotate(-sp * .25); c.globalAlpha = 1 - sp; drawList(c, A.egg.top, pe); c.restore();
    c.save(); c.translate(0, sp * 160); c.globalAlpha = 1 - sp; drawList(c, A.egg.bot, pe); c.restore();
    if (t > T.crack && sp < .3) { c.globalAlpha = 1 - sp / .3; drawS(c, A.egg.crack, eio(seg(t, T.crack, T.crack + .7))); }
  }
  c.restore();
  // sky and earth
  draw(c, A.sky, t); for (const ob of A.earth) draw(c, ob, t);
  // the lotus where Brahma wakes
  draw(c, A.halo, t); draw(c, A.stem, t); draw(c, A.bloom, t); draw(c, A.spark, t);
  // four faces: four gazes, four Vedas
  A.gazes.forEach((g, i) => {
    const p = seg(t, T.gaze[i], T.gaze[i] + .7); if (p <= 0) return;
    drawS(c, g.s, eio(p));
    mono(c, g.dir, g.lx, g.ly - 16, ss(seg(t, T.gaze[i] + .5, T.gaze[i] + 1)) * (1 - ss(seg(t, 34.4, 35.2))), 'dir' + i, { size: 24, light: i === 2 });
    mono(c, g.veda, g.lx, g.ly + 18, ss(seg(t, T.gaze[i] + .6, T.gaze[i] + 1.1)) * (1 - ss(seg(t, 34.4, 35.2))), 'veda' + i, { size: 18, sp: 3, light: i === 2 });
  });
  c.restore();
  note(c, t, 28.4, 35.0, 70, 160, 470, 930, 'Brahma', 'the Creator', 'brahma', -40);
}
// ================= scene B: the four hands =================
const PLATES = [['01 / 04', 'KAMANDALU', 'the water pot', 'the waters of life'], ['02 / 04', 'AKSHAMALA', 'the string of beads', 'counting out time'],
  ['03 / 04', 'VEDA', 'the sacred texts', 'knowledge'], ['04 / 04', 'PADMA', 'the lotus', 'purity, from the mud']];
const plateCam = monotone([[36.4, 960], [47.0, 960], [48.6, 2360], [55.3, 2360], [56.9, 3760], [63.0, 3760], [64.6, 5160], [71.6, 5160]]);
function sceneB(c, t) {
  const off = 960 - plateCam(t);
  mono(c, 'IN HIS FOUR HANDS', 540, 230 + off, fade2(t, 36.6, 46.8, .6, .5), 'four');
  PLATES.forEach(([num, nm, what, mean], k) => {
    const y0 = k * 1400 + off, tp = T.p[k];
    if (Math.abs(plateCam(t) - (960 + y0)) > 1500) return;
    mono(c, num, 540, y0 + 330, ss(seg(t, tp - .4, tp + .2)), 'pn' + k, { size: 20, sp: 4 });
    mono(c, nm, 540, y0 + 380, ss(seg(t, tp, tp + .6)), 'pm' + k, { size: 28, sp: 8 });
    hand(c, what, 540, y0 + 1250, seg(t, tp + 2.6, tp + 3.3), { size: 50, w: 500, align: 'center', id: 'pw' + k });
    hand(c, mean, 540, y0 + 1312, seg(t, tp + 3.1, tp + 3.9), { size: 42, w: 500, align: 'center', a: .75, id: 'pmn' + k });
  });
  c.save(); camAt(c, 1, 540, plateCam(t));
  // 1 the water pot, and the water it pours
  draw(c, Bh.pot, t);
  const wp = seg(t, T.p[0] + 2.2, T.p[0] + 3.8); if (wp > 0) { drawS(c, Bh.pour, eio(wp)); drawList(c, Bh.pool, seg(t, T.p[0] + 3.3, T.p[0] + 4.6)); }
  // 2 the beads, one on each sixteenth
  Bh.beads.forEach((b, i) => { const p = seg(t, T.p[1] + i * .18, T.p[1] + i * .18 + .25); if (p > 0) { c.save(); c.translate(b.x, b.y); c.rotate(b.a); drawS(c, b.s, eo(p)); c.restore(); } });
  draw(c, Bh.tassel, t);
  // 3 the Vedas, 4 the lotus over the mud
  for (const ob of Bh.vedas) draw(c, ob, t);
  draw(c, Bh.mud, t); draw(c, Bh.stem4, t); draw(c, Bh.lotus4, t, {}); draw(c, Bh.spark4, t);
  c.restore();
}
// ================= scene C: the swan, milk and water; Saraswati =================
function sceneC(c, t) {
  draw(c, Cs.water, t);
  const gx = Math.sin(t * .6) * 10;
  draw(c, Cs.swan, t, { dx: gx });
  // the bowl: milk and water, mixed, then parted
  draw(c, Cs.bowl, t);
  const bp = seg(t, T.bowl0, T.bowl0 + 1); if (bp > 0) {
    const sep = eio(seg(t, T.sep0, T.sep1));
    c.save(); c.beginPath(); c.ellipse(540, 1440, 176, 62, 0, 0, 7); c.clip();
    Cs.drops.forEach(d => {
      const a = d.a0 + t * .9 * (1 - sep), x = 540 + Math.cos(a) * d.r * 170, y = 1440 + Math.sin(a) * d.r * 56;
      const tx_ = 540 + (d.milk ? -1 : 1) * (40 + d.r * 110) + Math.cos(d.a0) * 18, ty = 1440 + Math.sin(d.a0) * d.r * 40;
      c.save(); c.translate(lerp(x, tx_, sep), lerp(y, ty, sep)); c.rotate(a + Math.PI / 2 * (1 - sep)); c.globalAlpha = bp; drawS(c, d.s, 1); c.restore();
    });
    c.restore();
  }
  draw(c, Cs.veena, t);
  note(c, t, 74.0, 79.8, 70, 230, 400, 980, 'Hamsa', 'the swan', 'hamsa', -40);
  note(c, t, 81.0, 86.0, 620, 330, 700, 640, 'Saraswati', 'knowledge & music', 'sara', 40);
}
// ================= scene D: the scale of his time =================
function sceneD(c, t) {
  const f1 = 1 - ss(seg(t, 94.6, 95.4));
  if (t < 95.4) {
    c.save(); c.globalAlpha = f1; c.translate(540, 760); drawList(c, D_.sun, seg(t, T.day0, T.day0 + .9)); c.restore();
    c.save(); c.globalAlpha = f1;
    mono(c, 'ONE DAY OF BRAHMA', 540, 520, ss(seg(t, 88.4, 89)), 'dd1');
    serif(c, '4,320,000,000', 540, 1010, seg(t, 88.8, 90.2), { size: 96, id: 'dd2', alpha: f1 });
    hand(c, 'years, and a night as long', 540, 1080, seg(t, 90, 91), { size: 46, w: 500, align: 'center', id: 'dd3', alpha: f1 });
    c.restore();
  }
  const gp = seg(t, T.grid0, T.grid0 + 1.6);
  if (gp > 0) {
    D_.grid.forEach((d, i) => { const p = clamp((gp - i / 100 * .8) / .2); if (p > 0) { c.save(); c.translate(d.x, d.y); drawS(c, d.s, eo(p)); c.restore(); } });
    mono(c, '100 YEARS OF BRAHMA', 540, 470, ss(seg(t, 95.6, 96.2)), 'dg1');
    serif(c, '311,040,000,000,000', 540, 1360, seg(t, 96.3, 97.6), { size: 72, id: 'dg2' });
    hand(c, 'human years', 540, 1420, seg(t, 97.2, 97.9), { size: 44, w: 500, align: 'center', id: 'dg3' });
  }
  // rest: an indigo wash rises from the bottom and becomes the night sky
  const rp = seg(t, T.rest0, T.rest1); if (rp > 0) drawList(c, D_.night, rp);
}
// ================= scene E: Pushkar before dawn =================
const NIGHT = ['#232a44', '#283152', '#2f3a5c', '#3a4668', '#46527a', '#56628a'], DAWN = ['#5b6a8f', '#7f86a3', '#b49aa0', '#d9a98a', '#ebbe82', '#f2d08a'];
function sceneE(c, t) {
  c.save();
  const s = 1 + .06 * eio(seg(t, 110, 120)); camAt(c, s, 540, lerp(960, 990, eio(seg(t, 110, 120))));
  // sky bands, colour following the hour (lower bands warm first)
  E.sky.forEach((st, i) => { const k = eio(seg(t, T.dawn0 + (5 - i) * .5, T.dawn1 - i * .6)); drawS(c, st, 1, mixc(NIGHT[i], DAWN[i], k)); drawS(c, st, 1, mixc(NIGHT[i], DAWN[i], k), .6); });
  draw(c, E.hills, t);
  draw(c, E.lake, t);
  // a glow on the water as the sky warms
  const gl = eio(seg(t, 111, 119)); if (gl > 0) { const g = c.createLinearGradient(0, 1150, 0, 1500); g.addColorStop(0, rgba('#f2d08a', .45 * gl)); g.addColorStop(1, rgba('#f2d08a', 0)); c.fillStyle = g; c.fillRect(-100, 1150, 1300, 360); }
  draw(c, E.ghats, t); draw(c, E.temple, t);
  if (t > T.temple1) { const s_ = E.temple.spr, a = .22 * ss(seg(t, T.temple1, T.temple1 + 1)); c.save(); c.translate(E.temple.x, E.temple.y + 6); c.scale(1, -.8); c.globalAlpha = a; c.drawImage(s_.cv, s_.x0, s_.y0 + Math.sin(t * 2) * 2, s_.x1 - s_.x0, s_.y1 - s_.y0); c.restore(); }
  for (const ob of E.pads) draw(c, ob, t);
  // the first light, painted along the horizon: the brush lifts before it is done
  const lp = seg(t, T.light0, T.light0 + 6.5); if (lp > 0) drawS(c, E.light, eio(lp));
  // birds at first light
  if (t > 112) for (let i = 0; i < 5; i++) { const u = (t - 112 - i * .4) / 9; if (u < 0 || u > 1) continue; const x = lerp(-60, 1100, u) - i * 30, y = 640 - i * 18 + Math.sin(u * 6 + i) * 18, fl = Math.sin(t * 8 + i * 1.7); withSeed(80 + i, () => { drawS(c, mk(qcurve(x, y, x - 20, y - 9 * fl - 2, 3, 5), 4, '#2e2a3a', { prof: 'tip', nb: 0, a: .85 }), 1); drawS(c, mk(qcurve(x, y, x + 20, y - 9 * fl - 2, -3, 5), 4, '#2e2a3a', { prof: 'tip', nb: 0, a: .85 }), 1); }); }
  c.restore();
  const pf = fade2(t, 104.6, 110.2, .6, .5);
  mono(c, 'PUSHKAR · RAJASTHAN', 540, 300, pf, 'pk1', { light: true });
  hand(c, 'where the lotus fell', 540, 360, seg(t, 105.4, 106.2), { size: 48, w: 500, align: 'center', light: true, id: 'pk2', alpha: 1 - ss(seg(t, 109.7, 110.2)) });
  mono(c, 'BRAHMA MUHURTA', 540, 300, ss(seg(t, 113.4, 114.2)), 'bm1', { light: true, size: 30, sp: 10 });
  hand(c, "the creator's hour", 540, 372, seg(t, 114.2, 115.2), { size: 60, w: 500, align: 'center', light: true, id: 'bm2' });
}

// ---------- transitions ----------
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

// ---------- subtitles ----------
function wrap(txt, maxW) {
  if (ctx.measureText(txt).width <= maxW) return [txt];
  const words = txt.split(' '); let best = null, bd = 1e9;
  for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(' '), b = words.slice(i).join(' '), wa = ctx.measureText(a).width, wb = ctx.measureText(b).width; if (wa <= maxW && wb <= maxW && Math.abs(wa - wb) < bd) { bd = Math.abs(wa - wb); best = [a, b]; } }
  if (best) return best;
  for (let i = 1; i < words.length; i++) for (let j = i + 1; j < words.length; j++) { const L = [words.slice(0, i), words.slice(i, j), words.slice(j)].map(w => w.join(' ')); const ws = L.map(l => ctx.measureText(l).width); if (Math.max(...ws) <= maxW && Math.max(...ws) - Math.min(...ws) < bd) { bd = Math.max(...ws) - Math.min(...ws); best = L; } }
  return best || [txt];
}
function drawSubs(t) {
  const dark = t > T.rest1 - .2;   // over the night sky and lake: light type on a dark halo
  for (const [s, d, en] of SUBS) {
    const f = fade2(t, s - .15, s + d + .45, .25, .35); if (f <= 0) continue;
    ctx.save(); ctx.globalAlpha = f; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = 'italic 500 48px "Cormorant Garamond"'; const lines = wrap(en, 960), y0 = 1760 - (lines.length - 1) * 52;
    if (!dark) {
      const yc = y0 + (lines.length - 1) * 26 - 16, g = ctx.createRadialGradient(540, yc, 10, 540, yc, 540);
      g.addColorStop(0, rgba(PAPER, .8)); g.addColorStop(.6, rgba(PAPER, .58)); g.addColorStop(1, rgba(PAPER, 0));
      ctx.save(); ctx.translate(540, yc); ctx.scale(1, .26 * lines.length / 2 + .1); ctx.translate(-540, -yc); ctx.fillStyle = g; ctx.fillRect(0, yc - 540, W, 1080); ctx.restore();
    }
    ctx.shadowColor = dark ? 'rgba(15,18,32,1)' : rgba(PAPER, 1); ctx.shadowBlur = 22;
    for (let k = 0; k < 2; k++) { ctx.fillStyle = dark ? rgba('#f6efe0', .95) : rgba(INK, .9); lines.forEach((ln, i) => ctx.fillText(ln, 540, y0 + i * 52)); }
    ctx.restore();
  }
}

// ---------- frame ----------
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; paper(ctx);
  if (t < T.wipe1) sceneA(ctx, t);
  else if (t < T.wipe1 + 1.2) wipe(t, T.wipe1, 1.2, sceneA, sceneB);
  else if (t < T.wipe2) sceneB(ctx, t);
  else if (t < T.wipe2 + 1.2) wipe(t, T.wipe2, 1.2, sceneB, sceneC);
  else if (t < T.mist1) { sceneC(ctx, t); mist(t, eio(seg(t, T.mist0, T.mist1)), true); }
  else if (t < T.rest1) sceneD(ctx, t);
  else { ctx.fillStyle = NIGHT[0]; ctx.fillRect(0, 0, W, H); sceneE(ctx, t); }
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TX; };

function build() {
  // ---- A ----
  withSeed(11, () => {
    const wb = []; for (let i = 0; i < 22; i++) { const y = 1160 + i * 40 + rnd(-8, 8); wb.push(mk(qcurve(-140, y, 1220, y + rnd(-10, 10), rnd(-14, 14), 22), rnd(56, 76), mixc('#3d5d80', '#1f3350', i / 22), { prof: 'even', nb: 7, a: rnd(.42, .55) })); }
    A.water = O(wb, 0, 0, T.water0, 6.2);
    A.egg = egg(1);
    const sky = []; for (let i = 0; i < 10; i++) { const y = 80 + i * 66 + rnd(-10, 10); sky.push(mk(qcurve(-140, y, 1220, y + rnd(-14, 14), rnd(-20, 20), 20), rnd(80, 110), mixc('#8fa8c2', '#e8c98a', i / 9), { prof: 'leaf', nb: 7, a: rnd(.22, .32) })); }
    A.sky = O(sky, 0, 0, T.sky0, T.sky0 + 2.8);
    A.earth = [O(hills(620, 220, C.ochre, 8, .5).S, -60, 1165, T.earth0, T.earth0 + 1.4), O(hills(620, 200, C.sage, 8, .5).S, 520, 1165, T.earth0 + .4, T.earth0 + 1.8),
      O(hills(520, 120, C.green, 7, .55).S, 120, 1168, T.earth0 + .9, T.earth0 + 2.2)];
    const halo = []; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = rnd(190, 230); halo.push(mk(polar(Math.cos(a) * r * .9, Math.sin(a) * r * .9 - 70, a, rnd(40, 66), rnd(-6, 6), 5), rnd(20, 30), pick(GOLD), { prof: 'leaf', nb: 4, a: .4 })); }
    A.halo = O(halo, 540, 1040, T.lotus1 - .3, T.lotus1 + 1.2);
    A.stem = O([mk([[540, 1200], [532, 1120], [540, 1045]], 14, C.stem, { prof: 'even', nb: 3, a: .85 })], 0, 0, T.lotus0, T.lotus0 + .9);
    const lb = lotusBloom(1.25); A.bloom = O(lb.S, 540, 1045, T.lotus0 + .6, T.lotus1, { sway: .003 }); A.spark = O([lb.spark], 540, 1045, T.lotus1, T.lotus1 + .3);
    const cx = 540, cy = 980, L = 330;
    A.gazes = [[0, -1, 'NORTH', 'ATHARVA'], [1, 0, 'EAST', 'RIG'], [0, 1, 'SOUTH', 'YAJUR'], [-1, 0, 'WEST', 'SAMA']].map(([dx, dy, dir, veda]) => ({
      s: mk(qcurve(cx + dx * 120, cy + dy * 120, cx + dx * L, cy + dy * L, 6, 12), 16, pick(GOLD), { prof: 'tip', nb: 4, a: .85 }),
      lx: cx + dx * (L + (dx ? -10 : 0)), ly: cy + dy * (L + 60) + (dx ? 60 : 0), dir, veda: veda + ' VEDA' }));
    // put the east/west labels under the gaze ends, inside the frame
    A.gazes[1].lx = cx + L - 30; A.gazes[3].lx = cx - L + 30;
  });
  // ---- B ----
  withSeed(21, () => {
    const pk = kamandalu(1.35); Bh.pot = O(pk.S, 500, 1110, T.p[0], T.p[0] + 2.2);
    const [sx, sy] = [500 + pk.spout[0], 1110 + pk.spout[1]];
    Bh.pour = mk(qctrl(sx, sy, sx + 70, sy + 10, sx + 90, 1150, 14), 7, '#6f8faa', { prof: 'even', nb: 2, a: .8 });
    Bh.pool = []; for (let i = 0; i < 4; i++) Bh.pool.push(mk(qcurve(sx + 30 - rnd(10, 40), 1150 + i * 6, sx + 150 + rnd(10, 40), 1150 + i * 6, 0, 8), 12, pick(['#6f8faa', '#8fb0c6']), { prof: 'leaf', nb: 2, a: .6 }));
    const y1 = 1400 + 860; Bh.beads = [];
    for (let i = 0; i < 30; i++) { const a = -Math.PI / 2 + .22 + i / 29 * (Math.PI * 2 - .44), r = 250; Bh.beads.push({ x: 540 + Math.cos(a) * r, y: y1 + Math.sin(a) * r * 1.05, a: a + Math.PI / 2, s: bead(2.1, pick(['#8a5a3a', '#7a4e32', '#9a6a44'])) }); }
    Bh.tassel = O([mk(qcurve(0, 0, -10, 150, 8, 8), 18, C.ver, { prof: 'tip', nb: 3, a: .9 }), mk(qcurve(0, 0, 14, 116, -6, 8), 10, C.ver2, { prof: 'tip', nb: 2, a: .85 })], 540, y1 - 262, T.p[1] + 5.4, T.p[1] + 6.0);
    const y2 = 2800 + 900; Bh.vedas = [O(palmLeaves(3.2).S, 540, y2 - 90, T.p[2], T.p[2] + 1.4), O(palmLeaves(3.0).S, 560, y2 + 70, T.p[2] + .7, T.p[2] + 2.0, { rot: -.05 })];
    const y3 = 4200 + 1000;
    const mud = []; for (let i = 0; i < 8; i++) { const y = y3 + 60 + i * 26; mud.push(mk(qcurve(160, y, 920, y + rnd(-6, 6), rnd(-10, 10), 14), rnd(40, 56), i < 4 ? pick(['#6f8faa', '#8fb0c6']) : pick(['#7a6248', '#8a6e50', '#6b5440']), { prof: 'leaf', nb: 5, a: .5 })); }
    Bh.mud = O(mud, 0, 0, T.p[3], T.p[3] + 1);
    Bh.stem4 = O([mk([[540, y3 + 200], [530, y3 + 120], [540, y3 - 40]], 14, C.stem, { prof: 'even', nb: 3, a: .85 })], 0, 0, T.p[3] + .5, T.p[3] + 1.3);
    const lb = lotusBloom(1.55); Bh.lotus4 = O(lb.S, 540, y3 - 40, T.p[3] + 1.0, T.p[3] + 3.0, { sway: .003 }); Bh.spark4 = O([lb.spark], 540, y3 - 40, T.p[3] + 3.0, T.p[3] + 3.3);
  });
  // ---- C ----
  withSeed(31, () => {
    const wb = []; for (let i = 0; i < 20; i++) { const y = 1080 + i * 44 + rnd(-8, 8); wb.push(mk(qcurve(-140, y, 1220, y + rnd(-10, 10), rnd(-14, 14), 22), rnd(56, 72), mixc('#a9c0d0', '#6f8faa', rnd()), { prof: 'even', nb: 6, a: rnd(.2, .3) })); }
    Cs.water = O(wb, 0, 0, T.wipe2, T.wipe2 + 1.6);
    Cs.swan = O(swan(2.6).S, 460, 1110, T.swan0, T.swan0 + 1.8);
    const bowl = []; for (let i = 0; i < 10; i++) { const a = Math.PI * (.05 + .9 * i / 9); bowl.push(mk(qcurve(540 + Math.cos(a) * 200, 1440 + Math.sin(a) * 40, 540 + Math.cos(a) * 160, 1440 + Math.sin(a) * 110, 0, 6), 34, pick(['#b07a4a', '#a06c40', '#c08a56']), { prof: 'leaf', nb: 4, a: .7 })); }
    const rim = []; for (let k = 0; k <= 36; k++) { const a = k / 36 * Math.PI * 2; rim.push([540 + Math.cos(a) * 196, 1440 + Math.sin(a) * 68]); }
    bowl.push(mk(rim, 8, '#8a6a44', { prof: 'even', nb: 2, a: .85 }));
    Cs.bowl = O(bowl, 0, 0, T.bowl0 - .6, T.bowl0 + .4);
    Cs.drops = []; for (let i = 0; i < 34; i++) { const milk = i % 2 === 0; Cs.drops.push({ milk, a0: rnd(0, 6.3), r: Math.sqrt(rnd(.05, 1)) * .9, s: mk(qcurve(-14, 0, 14, 0, rnd(-4, 4), 5), rnd(14, 20), milk ? pick(['#fbf6ea', '#f6efdf']) : pick(['#6f8faa', '#5f80a0']), { prof: 'leaf', nb: 0, a: milk ? .95 : .7 }) }); }
    Cs.veena = O(veena(1.1).S, 600, 640, T.veena, T.veena + 1.6, { rot: -.12 });
  });
  // ---- D ----
  withSeed(41, () => {
    D_.sun = []; for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; D_.sun.push(mk(polar(Math.cos(a) * 20, Math.sin(a) * 20, a, rnd(110, 150), rnd(-8, 8), 6), rnd(50, 70), pick(GOLD), { prof: 'leaf', nb: 5, a: .5 })); }
    D_.grid = []; for (let r = 0; r < 10; r++) for (let q = 0; q < 10; q++) D_.grid.push({ x: 207 + q * 74, y: 600 + r * 74, s: mk(qcurve(-14, 0, 14, 0, rnd(-4, 4), 5), rnd(36, 44), pick(GOLD), { prof: 'leaf', nb: 3, a: .8 }) });
    D_.night = []; for (let i = 0; i < 22; i++) { const y = 1980 - i * 95; D_.night.push(mk(qcurve(-160, y, 1240, y + rnd(-14, 14), rnd(-20, 20), 20), 150, pick(NIGHT.slice(0, 3)), { prof: 'even', nb: 8, a: .92 })); }
  });
  // ---- E ----
  withSeed(51, () => {
    E.sky = []; for (let i = 0; i < 6; i++) { const y = 90 + i * 185; E.sky.push(mk(qcurve(-200, y, 1280, y + rnd(-14, 14), rnd(-20, 20), 20), 260, '#000000', { prof: 'even', nb: 8, a: .9, rough: .15 })); }
    E.hills = O(hills(1300, 300, ['#3a4258', '#434c64', '#4d566e'], 10, .7).S, -110, 1150, T.hills0, T.hills0 + 1.6);
    const lk = []; for (let i = 0; i < 20; i++) { const y = 1170 + i * 40 + rnd(-6, 6); lk.push(mk(qcurve(-140, y, 1220, y + rnd(-8, 8), rnd(-10, 10), 22), rnd(46, 60), mixc('#3d4f78', '#232a44', i / 20), { prof: 'even', nb: 6, a: rnd(.5, .65) })); }
    E.lake = O(lk, 0, 0, T.lake0, T.lake0 + 1.6);
    E.ghats = O(ghats(520, 1).S, 0, 1160, T.ghat0, T.ghat0 + 1.6);
    E.temple = O(temple(.95).S, 760, 1158, T.temple0, T.temple1);
    E.pads = [[180, 1500, .6], [860, 1620, .5], [420, 1760, .7]].map(([x, y, s], k) => O(lotusPad(s).S, x, y, 104 + k * .3, 105 + k * .3));
    E.light = mk(qcurve(-40, 1146, 1120, 1142, 4, 30), 10, '#f2c46a', { prof: 'even', nb: 4, a: .85 });
  });

  // ---- sound events ----
  VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
  ev(T.bloom0, 'bloom', { g: 1 }); ev(T.water0, 'deep', { d: 32 }); ev(T.egg0, 'brush', { d: 3.6, g: .4, pan0: -.4, pan1: .4 });
  ev(T.crack, 'crack'); ev(T.split, 'swell', { d: 3 }); ev(T.sky0, 'brush', { d: 2.6, g: .45, pan0: -.8, pan1: .8 }); ev(T.earth0, 'brush', { d: 2.2, g: .4, pan0: .6, pan1: -.4 });
  ev(T.lotus0, 'brush', { d: 2.8, g: .45 }); ev(T.lotus1, 'glock', { p: 'D6' });
  T.gaze.forEach((t, i) => { ev(t, 'brush', { d: .7, g: .35, pan0: [0, .7, 0, -.7][i], pan1: [0, .8, 0, -.8][i] }); ev(t, 'glock', { p: ['F#6', 'A6', 'B6', 'D7'][i] }); });
  ev(28.6, 'pencil', { d: 1.1 });
  ev(T.wipe1, 'brush', { d: 1.2, g: .45, pan0: -.9, pan1: .9 }); ev(T.wipe2, 'brush', { d: 1.2, g: .45, pan0: -.9, pan1: .9 });
  T.p.forEach((t, k) => { ev(t, 'brush', { d: 1.2, g: .35 }); ev(t + 2.6, 'pencil', { d: .9 }); });
  ev(T.p[0] + 2.2, 'pour', { d: 2.6 });
  for (let i = 0; i < 30; i++) ev(T.p[1] + i * .18, 'bead', { i });
  ev(T.wipe2 + .4, 'water', { d: 14 }); ev(T.swan0 + 1.2, 'wings'); ev(T.sep0 - 1.6, 'swirl', { d: 5.4 }); ev(T.veena, 'brush', { d: 1.6, g: .35, pan0: .3, pan1: .7 });
  ev(T.mist0, 'mist', { d: 2.2 }); ev(T.day0, 'brush', { d: 1.0, g: .45 }); ev(T.grid0, 'burst');
  ev(T.rest0, 'brush', { d: 1.8, g: .5, pan0: 0, pan1: 0 });
  ev(T.hills0, 'brush', { d: 1.6, g: .35, pan0: -.8, pan1: .8 }); ev(T.lake0, 'brush', { d: 1.6, g: .35 }); ev(T.ghat0, 'brush', { d: 1.6, g: .3, pan0: -.6, pan1: -.2 }); ev(T.temple0, 'brush', { d: 2.4, g: .4, pan0: .3, pan1: .5 });
  ev(T.hills0, 'lake', { d: 19.2 }); ev(T.temple1, 'templebell'); ev(112, 'birds', { d: 7.5 });
  ev(113.4, 'tbell');
}

(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"'].map(f => document.fonts.load(f)));
  build();
  window.READY = true;
})();
