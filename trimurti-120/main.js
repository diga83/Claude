// The Three Answers — a Trimurti journal. 1080x1920, render(t) is a pure function of t.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const DUR = 120; window.DUR = DUR;
const BEAT = .75, BAR = 3, bar = n => n * BAR;   // 80 BPM, 4/4

// voice placements [id, start] (mix.py reads these) and subtitle cues [start, dur, text]
const AV_T0 = bar(17.75), AV_STEP = 2 * BEAT;   // avatars: one every two beats from 53.25 s
const VOICE = [['v01', .9], ['v02', 4.0], ['v03', 11.0], ['v04', 19.3], ['v05', 27.2], ['v06', 38.0], ['v07', 46.7],
  ...Array.from({ length: 10 }, (_, k) => ['a' + String(k + 1).padStart(2, '0'), +(AV_T0 + k * AV_STEP + .05).toFixed(2)]),
  ['v10', 71.0], ['v11', 81.6], ['v12', 90.4], ['v13', 103.0], ['v14', 111.2]];
const SUBS = [
  [.9, 2.484, 'Three questions, as old as the world.'],
  [4.0, 3.757, 'Who makes it? Who keeps it? And who, in the end, lets it go?'],
  [11.0, 7.501, 'The first answer is Brahma, the creator, born on a lotus, with four faces that look out in four directions.'],
  [19.3, 5.915, 'From him came the Vedas, the oldest sacred knowledge, and from his thought, the world itself.'],
  [27.2, 5.234, 'A single day of Brahma lasts 4,320,000,000 years.'],
  [38.0, 7.948, 'The second answer is Vishnu, the preserver, at rest on the coils of the serpent Shesha, on the ocean between the worlds.'],
  [46.7, 5.354, 'Whenever the world falls out of balance, he returns, in a new form for each age.'],
  [53.3, 6.4, 'A fish. A great tortoise. A wild boar. Half man, half lion. A dwarf.'],
  [60.8, 7.65, 'A warrior. A prince. A cowherd. A teacher. And a horseman, still to come.'],
  [71.0, 7.893, 'The third answer is Shiva, the destroyer, the ascetic of Mount Kailash, who caught the falling river Ganga in his hair.'],
  [81.6, 7.81, 'His dance keeps the rhythm of the cosmos: in one hand, the drum of creation; in another, the fire that ends it.'],
  [90.4, 7.285, 'Four ages turn, each shorter and darker than the last. At the end of the last, he dances the world away.'],
  [103.0, 6.6, 'Creator, preserver, destroyer. Not three gods apart, but three faces of one reality.'],
  [111.2, 5.049, 'The Trimurti. And when the last page is turned, the first is painted again.'],
];
window.VOICE = VOICE; window.SUBS = SUBS;

const T = {
  q1: 4.05, q2: 5.0, q3: 6.1,
  turn1: bar(3), lotus0: 10.5, lotus1: 14.6, swan: 13.6, veda: [bar(6.5), bar(6.75), bar(7), bar(7.25)], burst: bar(8), sun0: 27.0, sun1: 33.0, data: 28.4,
  turn2: bar(12), ocean0: 37.5, disc0: 38.2, coil0: 39.0, coil1: 43.5, tilak: 44.25, conch: 45.0, chak: 45.75,
  turn3: bar(23), hair0: 70.6, moon: 71.2, river0: 72.4, river1: 77.5, ring0: bar(27), ring1: bar(27.5), dam: 84.0, agni: 87.0,
  wheel0: bar(30) + .4, wheel1: 94.0, mark0: 94.5, mark1: 97.4, burn0: 98.2, burn1: 100.8, ash0: 100.2, ash1: 101.8,
  cards0: 102.4, stack0: 107.2, stack1: 108.8, qpage0: 108.9, qpage1: 110.2, ans: [110.5, 111.2, 111.9], title: bar(38),
};

// ---------- helpers ----------
const RES = 1.5;
function spriteR(L, res = RES) {
  const [x0, y0, x1, y1] = bbox(L), c2 = document.createElement('canvas');
  c2.width = Math.max(1, Math.ceil((x1 - x0) * res)); c2.height = Math.max(1, Math.ceil((y1 - y0) * res));
  const c = c2.getContext('2d'); c.scale(res, res); c.translate(-x0, -y0); for (const s of L) drawS(c, s, 1);
  return { cv: c2, x0, y0, x1, y1 };
}
const O = (L, x, y, t0, t1, o = {}) => ({ L, x, y, t0, t1, rot: o.rot || 0, sway: o.sway || 0, ph: o.ph || 0, sc: o.sc || 1, spr: spriteR(L) });
function draw(c, ob, t, o = {}) {
  const p = seg(t, ob.t0, ob.t1); if (p <= 0) return;
  c.save(); c.translate(ob.x + (o.dx || 0), ob.y + (o.dy || 0)); const r = ob.rot + (o.rot || 0); if (r) c.rotate(r); if (ob.sc !== 1) c.scale(ob.sc, ob.sc);
  if (ob.sway) c.transform(1, 0, ob.sway * (Math.sin(1.15 * t + ob.ph) + .4 * Math.sin(2.7 * t + 2 * ob.ph)) * p, 1, 0, 0);
  if (p < 1) drawList(c, ob.L, p); else { const s = ob.spr; c.drawImage(s.cv, s.x0, s.y0, s.x1 - s.x0, s.y1 - s.y0); }
  c.restore();
}
const fade2 = (t, a, b, fi, fo) => Math.min(ss(seg(t, a, a + fi)), 1 - ss(seg(t, b - fo, b)));
let TX = [], LIVE = true;   // LIVE = false while drawing miniatures (no readcheck entries)
const tx = o => { if (LIVE) TX.push(o); };
function hand(c, txt, x, y, p, o = {}) {
  if (p <= 0) return;
  c.save(); c.font = `${o.w || 600} ${o.size || 44}px Caveat`; c.textAlign = o.align || 'left'; c.textBaseline = 'middle';
  const w = c.measureText(txt).width, x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
  c.beginPath(); c.rect(x0 - 8, y - o.size, (w + 16) * eo(p), o.size * 2); c.clip(); c.globalAlpha = o.alpha ?? 1;
  c.shadowColor = rgba(PAPER, .95); c.shadowBlur = 14; c.fillStyle = rgba(o.col || INK, o.a ?? .92); c.fillText(txt, x, y); c.fillText(txt, x, y);
  c.restore();
  if (o.id && p >= 1 && (o.alpha ?? 1) > .6) tx({ id: o.id, text: txt, x0, y0: y - o.size * .6, x1: x0 + w, y1: y + o.size * .6 });
}
function mono(c, txt, x, y, a, id, o = {}) {
  if (a <= 0) return;
  const size = o.size || 22;
  c.save(); c.font = `400 ${size}px "IBM Plex Mono"`; c.letterSpacing = (o.sp ?? 5) + 'px'; c.textAlign = o.align || 'center'; c.textBaseline = 'middle';
  c.shadowColor = rgba(PAPER, .95); c.shadowBlur = 10; c.fillStyle = rgba(o.col || INK, .8 * a); c.fillText(txt, x, y); const w = c.measureText(txt).width; c.restore();
  const x0 = o.align === 'left' ? x : x - w / 2;
  if (id && a > .6) tx({ id, text: txt, x0, y0: y - size * .6, x1: x0 + w, y1: y + size * .6 });
}
function serif(c, txt, x, y, p, o = {}) {
  if (p <= 0) return;
  const size = o.size || 80;
  c.save(); c.font = `${o.it ? 'italic ' : ''}500 ${size}px "Cormorant Garamond"`; c.letterSpacing = (o.sp || 0) + 'px'; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
  const w = c.measureText(txt).width; c.beginPath(); c.rect(x - w / 2 - 30, y - size, (w + 60) * eio(p), size * 1.4); c.clip();
  c.shadowColor = rgba(PAPER, .9); c.shadowBlur = 12; c.fillStyle = rgba(INK, o.a ?? .9); c.fillText(txt, x + (o.sp || 0) / 2, y); c.restore();
  if (o.id && p >= 1) tx({ id: o.id, text: txt, x0: x - w / 2, y0: y - size * .8, x1: x + w / 2, y1: y + size * .2 });
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

let PAPER_IMG; const B = {}, V = {}, Sh = {};
const EV = []; window.EV = EV; const ev = (t, type, o = {}) => EV.push({ t: +t.toFixed(3), type, ...o });

// ================= pages =================
// 0: the question page (opening, and again at the end with answers)
const QS = [['Who makes the world?', 560, 'Brahma', '#b8606f'], ['Who keeps it?', 820, 'Vishnu', '#2f4c6e'], ['Who lets it go?', 1080, 'Shiva', '#c8442a']];
function pageQ(c, t, answered) {
  mono(c, 'THREE QUESTIONS', 540, 380, answered ? 1 : ss(seg(t, .6, 1.4)), answered ? 'hdr2' : 'hdr');
  QS.forEach(([q, y], i) => {
    const t0 = answered ? -1 : [T.q1, T.q2, T.q3][i];
    hand(c, q, 120, y, seg(t, t0, t0 + .95), { size: 84, id: (answered ? 'qa' : 'q') + i });
    if (answered) {
      const ta = T.ans[i], p = seg(t, ta, ta + .7);
      hand(c, '— ' + QS[i][2], 200, y + 96, p, { size: 76, col: QS[i][3], a: 1, id: 'ans' + i });
      if (p > 0) { const u = B['u' + i]; drawS(c, u, eio(seg(t, ta + .5, ta + 1.1))); }
    }
  });
  if (answered) { serif(c, 'TRIMURTI', 540, 1440, seg(t, T.title, T.title + 1.5), { size: 108, sp: 16, id: 'title' }); hand(c, 'the holy triad', 540, 1510, seg(t, T.title + 1.1, T.title + 2), { size: 52, w: 500, align: 'center', id: 'triad' }); }
}
// 1: Brahma
function pageB(c, t) {
  c.save();
  const s = 1 + .14 * eio(seg(t, 11.5, 18.5)) - .2 * eio(seg(t, 21.8, 25)), cy = lerp(960, 880, eio(seg(t, 11.5, 18.5))) + 80 * eio(seg(t, 21.8, 25));
  camAt(c, s, 540, cy);
  draw(c, B.water, t);
  for (const ob of B.world) draw(c, ob, t);
  draw(c, B.stem, t); draw(c, B.pad1, t); draw(c, B.pad2, t);
  draw(c, B.bloom, t); draw(c, B.spark, t);
  // the hamsa glides in from the left
  const sx = lerp(-200, 300, eo(seg(t, T.swan, T.swan + 7))) + (t - T.swan) * 4;
  if (t > T.swan) { B.swan.x = sx; B.swan.y = 1460 + Math.sin(t * 1.3) * 3; draw(c, B.swan, t); }
  // four Vedas at the four directions
  B.vedas.forEach((ob, i) => { draw(c, ob, t); const [lx, ly] = B.vedaLab[i]; mono(c, ['RIG', 'YAJUR', 'SAMA', 'ATHARVA'][i], lx, ly, ss(seg(t, T.veda[i] + .4, T.veda[i] + .9)) * (1 - ss(seg(t, 34.5, 35.6))), LIVE ? 'veda' + i : null); });
  // the day: a sun crossing an arc
  const sp = seg(t, T.sun0, T.sun1);
  if (sp > 0) {
    drawS(c, B.arc, eio(sp));
    const a = Math.PI + Math.PI * eio(sp), x = 540 + Math.cos(a) * 470, y = 860 + Math.sin(a) * 470 * .62;
    c.save(); c.translate(x, y); drawList(c, B.sun, 1); c.restore();
  }
  c.restore();
  note(c, t, 15.6, 22.0, 640, 300, 650, 700, 'Brahma', 'the Creator', 'brahma', 40);
  const df = fade2(t, T.data, 35.8, .5, .5);
  if (df > 0) { c.save(); c.globalAlpha = df; mono(c, 'ONE DAY OF BRAHMA', 540, 150, 1, 'd1'); serif(c, '4,320,000,000', 540, 245, seg(t, T.data + .4, T.data + 1.6), { size: 84, id: 'd2' }); hand(c, 'human years', 540, 300, seg(t, T.data + 1.4, T.data + 2.1), { size: 42, w: 500, align: 'center', id: 'd3' }); c.restore(); }
}
// 2: Vishnu
function pageV(c, t) {
  c.save();
  const lt = t - T.turn2;
  const s = 1.18 - .18 * eio(seg(t, 39, 46)) - .16 * eio(seg(t, 51, 54.5)), rot = -.05 + .05 * eio(seg(t, 39, 46));
  camAt(c, s, 540, 880 + 30 * eio(seg(t, 51, 54.5)));
  draw(c, V.bands, t);
  c.save(); c.translate(540, 880); c.rotate(rot); c.translate(-540, -880);
  draw(c, V.disc, t); draw(c, V.coil, t); draw(c, V.tilak, t);
  c.restore();
  draw(c, V.conch, t); if (t >= T.chak) draw(c, V.chak, t, { rot: (t - T.chak) * Math.PI * 2 / (BAR * 2) * eo(seg(t, T.chak, T.chak + 1.2)) });
  // the ten avatars, one every two beats, round the ring
  for (let k = 0; k < 10; k++) {
    const t0 = AV_T0 + k * AV_STEP, a = -Math.PI / 2 + k / 10 * Math.PI * 2, x = 540 + Math.cos(a) * 480, y = 880 + Math.sin(a) * 480;
    const p = seg(t, t0, t0 + .9); if (p <= 0) continue;
    c.save(); c.translate(x, y); drawList(c, V.av[k].bg, clamp(p * 1.6)); drawList(c, V.av[k].S, clamp(p * 1.6 - .5)); c.restore();
    mono(c, String(k + 1).padStart(2, '0'), x, (k <= 1 || k === 9) ? y + 92 : y - 92, ss(seg(t, t0 + .3, t0 + .7)), LIVE ? 'avn' + k : null, { size: 18, sp: 3 });
    const up = k <= 1 || k === 9, ly = up ? y - 150 : y + 98;
    hand(c, AV[k][0], x, ly, seg(t, t0 + .4, t0 + 1.0), { size: 36, align: 'center', id: LIVE ? 'av' + k : null });
    hand(c, AV[k][1], x, ly + 32, seg(t, t0 + .6, t0 + 1.2), { size: 28, w: 500, align: 'center', a: .75, id: LIVE ? 'avr' + k : null });
  }
  c.restore();
  note(c, t, 44.6, 51.2, 70, 230, 400, 560, 'Vishnu', 'the Preserver', 'vishnu', -40);
}
// 3: Shiva
function pageS(c, t) {
  c.save();
  const s = 1.2 - .2 * eio(seg(t, 72.5, 79)) - .04 * eio(seg(t, 81, 84)) + .1 * eio(seg(t, 90, 93.5)), cy = lerp(620, 960, eio(seg(t, 72.5, 79)));
  camAt(c, s, 540, cy);
  draw(c, Sh.peak, t);
  draw(c, Sh.hair, t, { rot: 0 });
  draw(c, Sh.moon, t);
  const rp = seg(t, T.river0, T.river1); if (rp > 0) { drawList(c, Sh.riverTop, clamp(rp * 2)); drawList(c, Sh.riverLow, clamp(rp * 2 - 1)); }
  // the ring of fire, turning, then contracting round the wheel of ages
  const R = lerp(470, 390, eio(seg(t, 89.4, 91))), fp = seg(t, T.ring0, T.ring1);
  if (fp > 0) {
    const N = Sh.flames.length, spin = (t - T.ring0) * .12;
    for (let i = 0; i < N; i++) {
      const k = i / N, q = clamp((fp - k * .8) / .2); if (q <= 0) continue;
      const a = -Math.PI / 2 + k * Math.PI * 2 + spin, beat = Math.max(0, 1 - ((t - T.ring0) % BEAT) / BEAT * 3) * (t > bar(27) && t < 97.4 ? .18 : 0);
      const fl = .75 + .4 * vnoise(t * 5.3 + i * 3.7) + beat, sk = (vnoise(t * 3.1 + i * 1.3) - .5) * .35;
      c.save(); c.translate(540 + Math.cos(a) * R, 960 + Math.sin(a) * R); c.rotate(a + Math.PI / 2); c.transform(1, 0, sk, 1, 0, 0); c.scale(1, fl * eo(q));
      for (const st of Sh.flames[i]) drawS(c, st, 1); c.restore();
    }
    c.save(); c.beginPath(); c.arc(540, 960, R, -Math.PI / 2 + spin, -Math.PI / 2 + spin + Math.PI * 2 * eo(fp)); c.strokeStyle = rgba(C.ver2, .5); c.lineWidth = 5; c.stroke(); c.restore();
  }
  // drum and flame, inside the ring; they give way to the wheel
  const hf = 1 - ss(seg(t, 89.4, 90.6));
  if (hf > 0) {
    c.save(); c.globalAlpha = hf;
    const shake = t > T.dam + 1 ? Math.sin(t * 2 * Math.PI / BEAT) * .08 : 0;
    draw(c, Sh.dam, t, { rot: shake });
    draw(c, Sh.bowl, t);
    const ap = seg(t, T.agni + .4, T.agni + 1.2);
    if (ap > 0) for (let i = 0; i < 5; i++) { c.save(); c.translate(820 + (i - 2) * 22, 1004); c.scale(1.1, (.7 + .4 * vnoise(t * 6 + i * 2)) * eo(ap)); for (const st of Sh.flames[i]) drawS(c, st, 1); c.restore(); }
    c.restore();
  }
  // the wheel of four ages: Satya, Treta, Dvapara, Kali in 4:3:2:1
  const W0 = T.wheel0;
  YUGA.forEach(([nm, yrs, col, f0, f1], i) => {
    const p = seg(t, W0 + i * .75, W0 + i * .75 + .9); if (p <= 0) return;
    drawS(c, Sh.arcs[i], eio(p));
    const am = -Math.PI / 2 + (f0 + f1) / 2 * Math.PI * 2, rr = i === 3 ? 175 : 160;
    const la = ss(seg(t, W0 + i * .75 + .6, W0 + i * .75 + 1.1)) * (1 - ss(seg(t, T.burn0 - .2, T.burn0 + .3)));
    mono(c, nm, 540 + Math.cos(am) * rr, 960 + Math.sin(am) * rr - 14, la, LIVE ? 'y' + i : null, { size: 20, sp: 3 });
    mono(c, yrs, 540 + Math.cos(am) * rr, 960 + Math.sin(am) * rr + 14, la, LIVE ? 'yy' + i : null, { size: 17, sp: 1 });
  });
  const mp = seg(t, T.mark0, T.mark1);
  if (mp > 0) { const a = -Math.PI / 2 + eio(mp) * Math.PI * 2; c.save(); c.translate(540 + Math.cos(a) * 300, 960 + Math.sin(a) * 300); c.rotate(a); drawS(c, Sh.mark, 1); c.restore(); }
  c.restore();
  note(c, t, 77.6, 83.6, 70, 1240, 470, 330, 'Shiva', 'the Destroyer', 'shiva', -60);
}
const YUGA = [['SATYA', '1,728,000 YRS', '#e3c26a', 0, .4], ['TRETA', '1,296,000 YRS', '#d39a4e', .4, .7], ['DVAPARA', '864,000 YRS', '#b8643a', .7, .9], ['KALI', '432,000 YRS', '#3d3a5c', .9, 1]];

// ---------- page plumbing ----------
function paper(c) { c.drawImage(PAPER_IMG, 0, 0); }
function pageAt(c, which, t) { if (which === 0) pageQ(c, t, false); else if (which === 1) pageB(c, t); else if (which === 2) pageV(c, t); else if (which === 3) pageS(c, t); else if (which === 4) pageQ(c, t, true); }
function turn(t, t0, d, from, to) {   // a new sheet slides over from the right with a soft shadow
  const p = eio(seg(t, t0, t0 + d)), ex = lerp(W + 120, -140, p), slant = 90 * (1 - p) + 20;
  pageAt(ctx, from, t);
  ctx.save(); ctx.beginPath(); ctx.moveTo(ex + slant, 0); ctx.lineTo(W + 10, 0); ctx.lineTo(W + 10, H); ctx.lineTo(ex - slant * .3, H); ctx.closePath();
  const g = ctx.createLinearGradient(ex - 60, 0, ex + 10, 0); g.addColorStop(0, 'rgba(60,40,20,0)'); g.addColorStop(1, 'rgba(60,40,20,.22)');
  ctx.save(); ctx.translate(-26, 0); ctx.fillStyle = g; ctx.fill(); ctx.restore();
  ctx.clip(); paper(ctx); pageAt(ctx, to, t); ctx.restore();
}
// the burn: the Shiva page darkens from the bottom up behind a glowing edge, then ash mist returns the paper
let LAYER, LCTX;
function burn(t) {
  const p = seg(t, T.burn0, T.burn1);
  LCTX.setTransform(1, 0, 0, 1, 0, 0); LCTX.clearRect(0, 0, W, H); pageS(LCTX, t);
  const front = lerp(H + 160, -260, eio(p));
  // unburnt part above the front
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, front); ctx.clip(); ctx.drawImage(LAYER, 0, 0); ctx.restore();
  // charred part below: the same picture in a burnt colour, fading to ash
  LCTX.globalCompositeOperation = 'source-atop'; LCTX.fillStyle = '#2a2320'; LCTX.fillRect(0, 0, W, H); LCTX.globalCompositeOperation = 'source-over';
  ctx.save(); ctx.beginPath(); ctx.rect(0, front, W, H); ctx.clip(); ctx.globalAlpha = .85 * (1 - ss(seg(t, T.ash0, T.ash1))); ctx.drawImage(LAYER, 0, 0); ctx.restore();
  // the glowing edge + embers
  ctx.save();
  for (let x = -20; x < W + 40; x += 18) {
    const y = front + (vnoise(x * .01 + 3) - .5) * 120 + Math.sin(x * .03 + t * 6) * 8;
    ctx.fillStyle = rgba('#d9822e', .5); ctx.beginPath(); ctx.ellipse(x, y, 16, 7, 0, 0, 7); ctx.fill();
    ctx.fillStyle = rgba(C.ver, .7); ctx.beginPath(); ctx.ellipse(x + 6, y + 4, 8, 4, 0, 0, 7); ctx.fill();
  }
  for (let i = 0; i < 60; i++) { const u = (t * .35 + hash(i)) % 1, x = hash(i * 3.1) * W, y = front - u * 500 + 60; if (y < -10 || y > H) continue; ctx.fillStyle = rgba(i % 3 ? '#e09a3a' : C.ver, .8 * (1 - u)); ctx.beginPath(); ctx.arc(x + Math.sin(t * 3 + i) * 14, y, 3 + 3 * hash(i * 7), 0, 7); ctx.fill(); }
  ctx.restore();
  mist(t, eio(seg(t, T.ash0, T.ash1)));
}
function mist(t, c) {
  if (c <= 0) return;
  for (const [lift, a] of [[140, .55], [0, 1]]) {
    const edge = 2180 - c * 2440 + lift;
    ctx.save(); ctx.beginPath(); ctx.moveTo(-10, H + 10);
    for (let x = -10; x <= W + 40; x += 30) ctx.lineTo(x, edge + (vnoise(x * .008 + lift) - .5) * 200 + Math.sin(x * .012 + t * 1.3) * 16);
    ctx.lineTo(W + 10, H + 10); ctx.closePath(); ctx.clip(); ctx.globalAlpha = a; ctx.drawImage(PAPER_IMG, 0, 0); ctx.restore();
  }
}
// the ending: three pages filed into a stack
const CARDS = [[1, 34.0, [-500, 640], [300, 660], -.07, 'I · Brahma'], [2, 68.5, [1580, 700], [790, 720], .06, 'II · Vishnu'], [3, 96.8, [540, 2400], [540, 1180], -.02, 'III · Shiva']];
function drawCard(which, frozen, x, y, rot, s) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.shadowColor = 'rgba(60,40,20,.28)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 18; ctx.fillStyle = PAPER; ctx.fillRect(-540, -960, W, H); ctx.shadowColor = 'transparent';
  ctx.translate(-540, -960); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); paper(ctx); LIVE = false; pageAt(ctx, which, frozen); LIVE = true;
  ctx.restore();
}
function ending(t) {
  CARDS.forEach(([which, frozen, from, to, rot, lab], i) => {
    const ti = T.cards0 + i * .5, p = eo(seg(t, ti, ti + 1.3)); if (p <= 0) return;
    const sp = eio(seg(t, T.stack0 + i * .25, T.stack0 + i * .25 + 1.3));
    const x = lerp(lerp(from[0], to[0], p), 540 + (i - 1) * 8, sp), y = lerp(lerp(from[1], to[1], p), 960 + (i - 1) * 10, sp), r = lerp(rot, (i - 1) * .03, sp);
    drawCard(which, frozen, x, y, r, lerp(.34, .52, sp));
  });
  CARDS.forEach(([, , , to, , lab], i) => { const ti = T.cards0 + i * .5; hand(ctx, lab, to[0], to[1] + 350, seg(t, ti + 1.0, ti + 1.6), { size: 44, align: 'center', alpha: 1 - ss(seg(t, T.stack0 - .3, T.stack0 + .2)), id: 'card' + i }); });
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
  for (const [s, d, en] of SUBS) {
    const f = fade2(t, s - .15, s + d + .45, .25, .35); if (f <= 0) continue;
    ctx.save(); ctx.globalAlpha = f; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = 'italic 500 48px "Cormorant Garamond"'; const lines = wrap(en, 960), y0 = 1760 - (lines.length - 1) * 52;
    const yc = y0 + (lines.length - 1) * 26 - 16, g = ctx.createRadialGradient(540, yc, 10, 540, yc, 540);
    g.addColorStop(0, rgba(PAPER, .8)); g.addColorStop(.6, rgba(PAPER, .58)); g.addColorStop(1, rgba(PAPER, 0));
    ctx.save(); ctx.translate(540, yc); ctx.scale(1, .26 * lines.length / 2 + .1); ctx.translate(-540, -yc); ctx.fillStyle = g; ctx.fillRect(0, yc - 540, W, 1080); ctx.restore();
    ctx.shadowColor = rgba(PAPER, 1); ctx.shadowBlur = 22;
    for (let k = 0; k < 2; k++) { ctx.fillStyle = rgba(INK, .9); lines.forEach((ln, i) => ctx.fillText(ln, 540, y0 + i * 52)); }
    ctx.restore();
  }
}

// ---------- frame ----------
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; paper(ctx);
  if (t < T.turn1) pageQ(ctx, t, false);
  else if (t < T.turn1 + 1.4) turn(t, T.turn1, 1.4, 0, 1);
  else if (t < T.turn2) pageB(ctx, t);
  else if (t < T.turn2 + 1.4) turn(t, T.turn2, 1.4, 1, 2);
  else if (t < T.turn3) pageV(ctx, t);
  else if (t < T.turn3 + 1.4) turn(t, T.turn3, 1.4, 2, 3);
  else if (t < T.burn0) pageS(ctx, t);
  else if (t < T.ash1 + .05) burn(t);
  if (t >= T.cards0 && t < T.qpage1) ending(t);
  if (t >= T.qpage0 && t < T.qpage1) {   // the question page slides back on top of the stack
    const p = eio(seg(t, T.qpage0, T.qpage1)), ex = lerp(W + 120, -140, p), slant = 90 * (1 - p) + 20;
    ctx.save(); ctx.beginPath(); ctx.moveTo(ex + slant, 0); ctx.lineTo(W + 10, 0); ctx.lineTo(W + 10, H); ctx.lineTo(ex - slant * .3, H); ctx.closePath(); ctx.clip(); paper(ctx); pageQ(ctx, t, true); ctx.restore();
  }
  if (t >= T.qpage1) pageQ(ctx, t, true);
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TX; };

function build() {
  // ---- Brahma ----
  withSeed(101, () => {
    const water = []; for (let i = 0; i < 12; i++) { const y = 1400 + i * 42 + rnd(-8, 8); water.push(mk(qcurve(-120, y, 1200, y + rnd(-10, 10), rnd(-14, 14), 20), rnd(60, 80), mixc('#8fb0c6', '#3d5d80', i / 12), { prof: 'even', nb: 7, a: rnd(.3, .42) })); }
    B.water = O(water, 0, 0, 9.5, 11.4);
    const stem = [mk([[540, 1420], [528, 1300], [550, 1150], [540, 985]], 15, C.stem, { prof: 'even', nb: 4, a: .82 })];
    B.stem = O(stem, 0, 0, 10.6, 12.0);
    B.pad1 = O(lotusPad(1.1).S, 330, 1410, 11.2, 12.4); B.pad2 = O(lotusPad(.85).S, 780, 1420, 11.6, 12.6);
    const lb = lotusBloom(1.5); B.bloom = O(lb.S, 540, 985, 11.8, T.lotus1, { sway: .003 }); B.spark = O([lb.spark], 540, 985, T.lotus1, T.lotus1 + .3);
    B.swan = O(swan(1).S, -200, 1460, T.swan, T.swan + 1.6);
    const P4 = [[540, 470, 0], [935, 900, Math.PI / 2], [540, 1290, 0], [145, 900, -Math.PI / 2]];
    B.vedas = P4.map(([x, y, r], i) => O(palmLeaves(.95).S, x, y, T.veda[i], T.veda[i] + .6, { rot: r }));
    B.vedaLab = [[540, 410], [935, 1040], [540, 1340], [145, 1040]];
    const j = k => T.burst + k * .08; B.world = [
      O(hills(560, 300, C.far, 8, .38).S, -60, 1405, j(0), j(0) + .9), O(hills(560, 260, C.far, 8, .38).S, 560, 1405, j(1), j(1) + .9),
      O(hills(460, 140, C.sage, 7, .5).S, -60, 1410, j(2), j(2) + .8), O(hills(460, 160, C.sage, 7, .5).S, 680, 1410, j(3), j(3) + .8),
      O([mk([[360, 1408], [300, 1370], [230, 1330], [170, 1250]], 14, '#6f8faa', { prof: 'tip', nb: 4, a: .7 })], 0, 0, j(4), j(4) + .8)];
    [[70, 1370, .8], [180, 1385, .7], [890, 1380, .8], [990, 1360, .9], [800, 1395, .6]].forEach(([x, y, s], k) => B.world.push(O(tree(s, C.green).S, x, y, j(5 + k * .7), j(5 + k * .7) + .7, { sway: .008, ph: k })));
    [[250, 330, .7, '#b4bcc6'], [820, 250, .6, '#c0c6cc']].forEach(([x, y, s, c], k) => B.world.push(O(cloud(s, c).S, x, y, j(3 + k), j(3 + k) + .9)));
    const arc = []; for (let k = 0; k <= 40; k++) { const a = Math.PI + k / 40 * Math.PI; arc.push([540 + Math.cos(a) * 470, 860 + Math.sin(a) * 470 * .62]); }
    B.arc = mk(arc, 5, '#d9a441', { prof: 'even', nb: 2, a: .6, rough: .4 });
    B.sun = []; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; B.sun.push(mk(polar(0, 0, a, 30, 3, 5), 20, pick(['#e0a83a', '#e8bd55']), { prof: 'leaf', nb: 3, a: .75 })); }
  });
  // ---- Vishnu ----
  withSeed(201, () => {
    const bands = []; for (let i = 0; i < 44; i++) { const y = 20 + i * 44 + rnd(-8, 8); bands.push(mk(qcurve(-120, y, 1200, y + rnd(-10, 10), rnd(-14, 14), 22), rnd(56, 74), mixc('#a9c0d0', '#6f8faa', rnd()), { prof: 'even', nb: 6, a: rnd(.14, .22) })); }
    V.bands = O(bands, 0, 0, 36.4, 38.0);
    V.disc = O(oceanDisc(.84).S, 540, 880, T.disc0, T.disc0 + 2.0);
    V.coil = O(serpentTop(.86).S, 540, 880, T.coil0, T.coil1);
    V.tilak = O(tilak(1).S, 540, 900, T.tilak, T.tilak + .6);
    V.conch = O(conch(.75).S, 225, 1540, T.conch, T.conch + .8, { rot: -.3 });
    V.chak = O(discus(.7).S, 860, 1540, T.chak, T.chak + .8);
    V.av = AV.map(([, , g]) => ({ bg: roundelBg(1), S: g(1) }));
  });
  // ---- Shiva ----
  withSeed(301, () => {
    Sh.peak = O(hills(1200, 420, C.snowShade, 10, .3).S, -60, 1560, T.hair0 + .2, T.hair0 + 2.6);
    Sh.hair = O(jata(1).S, 540, 0, 69.5, T.hair0 + 2.2);
    Sh.moon = O(crescent(1.1).S, 300, 230, T.moon, T.moon + .8, { rot: -.6 });
    Sh.riverTop = riverStrokes([[1150, -40], [1000, 60], [820, 160], [700, 260], [620, 360]], 120, 60, ['#6f8faa', '#8fb0c6', '#5f80a0'], 6);
    Sh.riverLow = riverStrokes([[560, 560], [600, 760], [480, 980], [560, 1200], [420, 1420], [520, 1640], [460, 1960]], 30, 110, ['#6f8faa', '#8fb0c6', '#5f80a0'], 6);
    Sh.flames = []; for (let i = 0; i < 52; i++) Sh.flames.push(flameStrokes(1));
    Sh.dam = O(damaru(1.5).S, 260, 1000, T.dam, T.dam + .7);
    Sh.bowl = O(agniBowl(1.5).S, 820, 1010, T.agni, T.agni + .5);
    Sh.arcs = YUGA.map(([, , col, f0, f1]) => { const pts = []; for (let k = 0; k <= 40; k++) { const a = -Math.PI / 2 + lerp(f0, f1, k / 40) * Math.PI * 2 + (k === 0 ? .02 : 0); pts.push([540 + Math.cos(a) * 300, 960 + Math.sin(a) * 300]); } return mk(pts, 62, col, { prof: 'even', nb: 8, a: .8, rough: .2 }); });
    Sh.mark = mk(qcurve(0, -50, 0, 50, 6, 8), 18, C.ver, { prof: 'leaf', nb: 3, a: .95 });
  });
  // ---- the answers' underlines ----
  withSeed(401, () => QS.forEach(([, y, nm, col], i) => { B['u' + i] = mk(qcurve(205, y + 140, 205 + 300, y + 136, -4, 16), 9, col, { prof: 'brush', nb: 4, a: .85 }); }));

  // ---- sound events ----
  ev(.6, 'pencil', { d: .8, g: .6 }); T.ans.forEach(t => ev(t, 'pencil', { d: .9 })); [T.q1, T.q2, T.q3].forEach(t => ev(t, 'pencil', { d: 1.0 }));
  for (const t0 of [T.turn1, T.turn2, T.turn3, T.qpage0]) ev(t0, 'page');
  ev(10.4, 'brush', { d: 1.8, g: .4 }); ev(10.6, 'water', { d: 25 }); ev(11.8, 'brush', { d: 2.8, g: .5, pan0: -.5, pan1: .5 }); ev(T.lotus1, 'bloom'); ev(T.swan, 'wings');
  T.veda.forEach((t, i) => { ev(t, 'veda', { i }); ev(t, 'brush', { d: .6, g: .35, pan0: [0, .6, 0, -.6][i], pan1: [0, .6, 0, -.6][i] }); });
  ev(T.burst, 'burst'); ev(T.burst, 'birds', { d: 9 }); ev(T.sun0, 'brush', { d: 6, g: .25, pan0: -.8, pan1: .8 });
  ev(T.data + .3, 'pencil', { d: 1.4 });
  ev(T.ocean0, 'brush', { d: 1.6, g: .35 }); ev(T.disc0, 'deep', { d: 30 }); ev(T.coil0, 'brush', { d: 4.5, g: .4, pan0: -.6, pan1: .6 }); ev(T.tilak, 'brush', { d: .6, g: .3 });
  ev(T.conch + .9, 'conch'); ev(T.chak, 'disc');
  for (let k = 0; k < 10; k++) { ev(AV_T0 + k * AV_STEP, 'brush', { d: .9, g: .28, pan0: Math.cos(-Math.PI / 2 + k / 10 * 6.283) * .7, pan1: Math.cos(-Math.PI / 2 + k / 10 * 6.283) * .7 }); }
  ev(T.hair0, 'brush', { d: 2.4, g: .45, pan0: -.6, pan1: .6 }); ev(T.river0, 'river', { d: T.burn0 - T.river0 }); ev(T.hair0, 'wind', { d: 11 });
  ev(T.ring0, 'fire', { d: 97.4 - T.ring0 }); ev(T.ring0, 'brush', { d: 1.5, g: .4 });
  for (let b = 0; ; b++) { const t = bar(27) + b * BEAT; if (t > 97.3) break; ev(t, 'drum', { g: b % 4 === 0 ? 1 : .6 }); }
  ev(T.dam, 'brush', { d: .7, g: .35, pan0: -.6, pan1: -.6 }); ev(T.agni, 'brush', { d: .5, g: .35, pan0: .6, pan1: .6 });
  YUGA.forEach((_, i) => ev(T.wheel0 + i * .75, 'brush', { d: .9, g: .4, pan0: .3, pan1: -.3 }));
  ev(T.burn0, 'burn', { d: T.ash1 - T.burn0 }); ev(T.ash0, 'mist', { d: 1.8 });
  CARDS.forEach((_, i) => ev(T.cards0 + i * .5, 'slide')); for (let i = 0; i < 3; i++) ev(T.stack0 + i * .25 + 1.1, 'tap');
  ev(T.title, 'bell');
  VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
  for (let k = 0; k < 10; k++) ev(AV_T0 + k * AV_STEP, 'avatar', { k });
}

(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"'].map(f => document.fonts.load(f)));
  LAYER = document.createElement('canvas'); LAYER.width = W; LAYER.height = H; LCTX = LAYER.getContext('2d');
  build();
  window.READY = true;
})();
