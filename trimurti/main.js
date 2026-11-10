// Trimurti — a tall painted sheet: Shiva's mountain above, Brahma's lotus and the living world in the middle,
// Vishnu's ocean below. render(t) is a pure function of t. 1080x1920.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const DUR = 61.5; window.DUR = DUR;
const BEAT = 60 / 72, BAR = BEAT * 4, bar = n => n * BAR;   // the score's grid (72 BPM, 4/4)

// voice lines: [id, start, dur, text]  (dur from voices/dur.json; mix.py reads this table)
const VO = [
  ['v01', 1.40, 3.531, 'Before the world, there was only water, dark and endless.'],
  ['v02', 7.40, 5.363, 'From it rose a lotus. And in the lotus, Brahma, the creator, opened his eyes.'],
  ['v03', 17.20, 5.952, 'With every breath, he painted the world into being: mountains, rivers, every living thing.'],
  ['v04', 24.20, 4.850, 'But what is made must be kept. Vishnu, the preserver, holds it in balance,'],
  ['v05', 29.60, 4.193, 'returning, age after age, whenever the world loses its way.'],
  ['v06', 37.60, 2.747, 'And when an age is complete, Shiva dances.'],
  ['v07', 41.40, 3.961, 'His dance clears the old away, so that something new can begin.'],
  ['v08', 50.90, 2.265, 'Three faces of one turning cosmos.'],
  ['v09', 54.30, 4.646, 'Creation. Preservation. Dissolution. And then, again, the water.'],
];
window.VO = VO;

// ---------- key times (on the bar grid where it matters) ----------
const T = {
  drop: .6, ocean0: .9, ocean1: 6.0,
  stem0: bar(2) + .2, stem1: 10.8, pad0: 9.0, bloom0: 10.4, bloom1: bar(4), halo0: bar(4), halo1: bar(4) + 1.5,
  burst: bar(5),
  coil0: 24.0, coil1: 27.0, conch: bar(8), disc: bar(9),
  sky0: bar(11), kail0: 38.4, kail1: 41.0, moon: 40.4, tri0: 40.9, tri1: 42.3, fire0: 42.45, fire1: bar(13),
  pull: bar(14), mist0: 47.35, mist1: bar(15),
  plate: bar(15), e1: bar(15), e2: bar(15.5), e3: bar(16), title: bar(15) + .4,
  out0: 57.9, out1: 58.9, drop2: 59.35, stem2: 59.7,
};

// ---------- camera: centre y in world px and zoom (x is always centred) ----------
const camY = monotone([[0, 3330], [T.drop, 3330], [5.6, 3220], [6.7, 3150], [13.3, 2470], [bar(5), 2450], [19.6, 2330], [bar(7), 2360],
  [26.3, 3600], [35, 3620], [bar(11), 3540], [42.4, 820], [45.8, 790], [47.6, 2200], [50, 2200]]);
const camZ = monotone([[0, 2.4], [T.drop, 2.4], [5.6, 1.0], [6.7, 1.0], [11, 1.05], [14.5, 1.3], [bar(5), 1.3], [19.6, .78], [bar(7), .8],
  [26.3, 1.0], [35, 1.1], [bar(11), 1.05], [42.4, 1.0], [45.8, 1.16], [47.6, .43], [50, .43]]);
const cam = t => ({ y: camY(t), z: camZ(t) });
const w2s = (t, x, y) => { const c = cam(t); return [540 + (x - 540) * c.z, 960 + (y - c.y) * c.z]; };
function worldXf(t) { const c = cam(t); ctx.setTransform(c.z, 0, 0, c.z, 540 - 540 * c.z, 960 - c.y * c.z); }

// ---------- objects: stroke lists painted in over [t0, t1], cached as sprites when finished ----------
const RES = 1.6, OBJ = [];
function spriteR(L, res = RES) {
  const [x0, y0, x1, y1] = bbox(L), c2 = document.createElement('canvas');
  c2.width = Math.max(1, Math.ceil((x1 - x0) * res)); c2.height = Math.max(1, Math.ceil((y1 - y0) * res));
  const c = c2.getContext('2d'); c.scale(res, res); c.translate(-x0, -y0); for (const s of L) drawS(c, s, 1);
  return { cv: c2, x0, y0, x1, y1 };
}
function obj(L, x, y, t0, t1, o = {}) { const ob = { L, x, y, t0, t1, rot: o.rot || 0, sway: o.sway || 0, ph: o.ph || 0, spr: spriteR(L), layer: o.layer || 0 }; OBJ.push(ob); return ob; }
function drawObj(ob, t, extraRot = 0) {
  const p = seg(t, ob.t0, ob.t1); if (p <= 0) return;
  ctx.save(); ctx.translate(ob.x, ob.y);
  if (ob.rot || extraRot) ctx.rotate(ob.rot + extraRot);
  if (ob.sway) ctx.transform(1, 0, ob.sway * (Math.sin(1.15 * t + ob.ph) + .4 * Math.sin(2.7 * t + 2 * ob.ph)) * p, 1, 0, 0);
  if (p < 1) drawList(ctx, ob.L, p);
  else { const s = ob.spr; ctx.drawImage(s.cv, s.x0, s.y0, s.x1 - s.x0, s.y1 - s.y0); }
  ctx.restore();
}

let PAPER_IMG, W_ = {}, P_ = {};
const EV = []; window.EV = EV;
const ev = (t, type, o = {}) => EV.push({ t: +t.toFixed(3), type, ...o });

function build() {
  // ---- the ocean: bands painted outward from where the drop fell ----
  const bands = [];
  withSeed(11, () => {
    for (let i = 0; i < 34; i++) {
      const y = 3010 + i * 46 + rnd(-10, 10), deep = clamp((y - 3000) / 1500);
      const col = mixc(pick(['#6f8faa', '#5f80a0']), pick(['#2f4c6e', '#2a4464']), deep * .9);
      const sd = i % 2 ? 1 : -1;
      bands.push({ d: Math.abs(y - 3330) + rnd(0, 60), s: mk(qcurve(540 - sd * rnd(640, 700), y + rnd(-6, 6), 540 + sd * rnd(640, 700), y + rnd(-14, 14), rnd(-16, 16), 24), rnd(70, 92), col, { prof: 'even', nb: 8, a: rnd(.34, .46), rough: .26 }) });
    }
    bands.sort((a, b) => a.d - b.d);
    W_.ocean = obj(bands.map(b => b.s), 0, 0, T.ocean0, T.ocean1);
    const surf = [mk(qcurve(-60, 3000, 1140, 2998, 6, 40), 6, '#2f4c6e', { prof: 'even', nb: 3, a: .55, rough: .4 })];
    for (let i = 0; i < 9; i++) { const x = rnd(40, 1040), y = 3000 + rnd(12, 90); surf.push(mk(qcurve(x - 40, y, x + 40, y, -8, 8), 4, '#c9d4dc', { prof: 'leaf', nb: 0, a: .6 })); }
    W_.surf = obj(surf, 0, 0, 4.4, 6.0);
  });
  // ---- Vishnu's serpent couch, deep below; the lotus stem rises from its centre ----
  withSeed(21, () => { const sp = serpent(1); W_.coil = obj(sp.S, 540, 3740, T.coil0, T.coil1, { sway: .004 }); W_.hoodAt = [540 + sp.hood[0], 3740 + sp.hood[1]]; });
  withSeed(22, () => { W_.conch = obj(conch(1.05).S, 760, 3500, T.conch, T.conch + 1.1, { rot: -.12 }); });
  withSeed(23, () => { W_.disc = obj(discus(1).S, 860, 3300, T.disc, T.disc + .9); });
  // ---- the lotus ----
  withSeed(31, () => {
    const stem = mk([[540, 3740], [528, 3500], [552, 3200], [534, 2950], [548, 2700], [540, 2495]].flatMap((p, i, a) => i ? qcurve(a[i - 1][0], a[i - 1][1], p[0], p[1], (i % 2 ? 10 : -10), 6).slice(1) : [p]), 16, C.stem, { prof: 'even', nb: 4, a: .82, rough: .12 });
    W_.stem = { s: stem, e: edgeOf(stem, 1, 2, INK2, .55) };
    W_.pad1 = obj(lotusPad(1).S, 330, 3004, T.pad0, T.pad0 + 1.2); W_.pad2 = obj(lotusPad(.8).S, 780, 3010, T.pad0 + .5, T.pad0 + 1.6);
    const halo = []; for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2, r = rnd(210, 250); halo.push(mk(polar(Math.cos(a) * r * .9, Math.sin(a) * r * .9 - 60, a, rnd(40, 70), rnd(-6, 6), 5), rnd(22, 34), pick(['#e8c77a', '#e3bd66', '#efd398']), { prof: 'leaf', nb: 4, a: .42 })); }
    W_.halo = obj(halo, 540, 2490, T.halo0, T.halo1);
    const lb = lotusBloom(1.3); W_.bloom = obj(lb.S, 540, 2492, T.bloom0, T.bloom1 - .05, { sway: .004 }); W_.spark = obj([lb.spark], 540, 2492, T.bloom1, T.bloom1 + .3);
    W_.bud = lotusBud(1);
  });
  // ---- the world, burst in around the lotus ----
  withSeed(41, () => {
    const B = T.burst, j = k => B + k * .07;
    W_.world = [
      obj(hills(620, 380, C.far, 9, .42).S, -40, 2990, j(0), j(0) + .9),
      obj(hills(640, 300, C.far, 8, .42).S, 470, 2992, j(1), j(1) + .9),
      obj(hills(520, 170, C.sage, 8, .55).S, -60, 3000, j(2), j(2) + .8),
      obj(hills(520, 190, C.sage, 8, .55).S, 600, 3000, j(3), j(3) + .8),
      obj([mk([[150, 2760], [210, 2830], [190, 2900], [290, 2960], [360, 2998]], 14, '#6f8faa', { prof: 'tip', nb: 4, a: .7 })].reverse(), 0, 0, j(4), j(4) + .8),
      obj(hills(300, 90, C.ochre, 5, .45).S, 860, 2996, j(4), j(4) + .7),
    ];
    const trees = [[70, 2930, .8], [150, 2950, .9], [250, 2965, .7], [400, 2985, .6], [700, 2975, .65], [800, 2950, .9], [900, 2935, .8], [1000, 2925, .85], [960, 2960, .6], [40, 2965, .6]];
    trees.forEach(([x, y, s], k) => W_.world.push(obj(tree(s, C.green).S, x, y, j(5 + k * .6), j(5 + k * .6) + .7, { sway: .008, ph: k })));
    [[230, 2050, .8, '#a9b4c0'], [830, 1880, .9, '#b4bcc6'], [470, 1660, .7, '#a9b4c0'], [700, 2250, .55, '#c0c6cc']].forEach(([x, y, s, c], k) => W_.world.push(obj(cloud(s, c).S, x, y, j(2 + k), j(2 + k) + .9)));
  });
  // ---- Shiva's mountain, moon, trident, ring of fire ----
  withSeed(51, () => {
    const sky = []; for (let i = 0; i < 9; i++) { const y = 60 + i * 80 + rnd(-20, 20); sky.push(mk(qcurve(-120, y, 1200, y + rnd(-20, 20), rnd(-30, 30), 16), rnd(110, 150), pick(C.dusk), { prof: 'leaf', nb: 6, a: lerp(.2, .05, i / 11) })); }
    W_.sky = obj(sky, 0, 0, T.sky0, T.sky0 + 2.2);
    W_.kail = obj(kailash(1).S, 560, 1000, T.kail0, T.kail1);
    W_.moon = obj(crescent(1.1).S, 330, 560, T.moon, T.moon + .8, { rot: -.5 });
    W_.tri = obj(trident(.95).S, 560, 1012, T.tri0, T.tri1);
    W_.flames = []; for (let i = 0; i < 46; i++) W_.flames.push(flameStrokes(1));
  });
  // ---- the plate (screen space) ----
  withSeed(61, () => {
    P_.lotus = lotusBloom(.62); P_.disc = discus(.62); P_.tri = trident(.34);
    const arcs = []; const cx = 540, cy = 980, R = 300;
    for (const [a0, a1] of [[-1.32, .32], [.73, 2.42], [2.83, 4.5]]) { const pts = []; for (let i = 0; i <= 30; i++) { const a = lerp(a0, a1, i / 30); pts.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]); } arcs.push(mk(pts, 7, INK2, { prof: 'tip', nb: 2, a: .7, rough: .3 })); }
    P_.arcs = arcs;
    P_.pool = []; for (let i = 0; i < 5; i++) P_.pool.push(mk(qcurve(540 - rnd(60, 90), 1150 + i * 9 - 18, 540 + rnd(60, 90), 1150 + i * 9 - 18, rnd(-4, 4), 10), rnd(16, 22), pick(C.ocean), { prof: 'leaf', nb: 4, a: .45 }));
    P_.stem = mk(qcurve(540, 1150, 540, 880, 14, 16), 15, C.stem, { prof: 'even', nb: 3, a: .82 });
    P_.bud = lotusBud(1.5);
  });

  // ---- sound events for the mixer ----
  ev(T.drop, 'drop', { g: 1 }); ev(T.ocean0, 'brush', { d: 5, g: .5 }); ev(T.ocean0, 'water', { d: 34.5 });
  ev(T.stem0, 'brush', { d: 3.8, g: .45, pan0: 0, pan1: 0 }); ev(T.pad0, 'brush', { d: 1.4, g: .35, pan0: -.5, pan1: -.3 }); ev(T.pad0 + .5, 'brush', { d: 1.2, g: .3, pan0: .4, pan1: .6 });
  ev(T.bloom0, 'brush', { d: 2.9, g: .5, pan0: -.6, pan1: .6 }); ev(T.bloom1, 'bloom'); ev(T.halo0, 'brush', { d: 1.4, g: .3 });
  ev(T.burst, 'burst'); ev(T.burst, 'birds', { d: 7.5 }); ev(T.burst, 'wind', { d: 6.5, g: .5 });
  ev(T.coil0, 'brush', { d: 1.9, g: .5, pan0: -.7, pan1: .3 }); ev(T.coil0 - .4, 'deep', { d: 12 }); ev(T.conch + .8, 'conch'); ev(T.conch + .8, 'brush', { d: 1.0, g: .35, pan0: .2, pan1: .5 });
  ev(T.disc, 'disc'); ev(T.disc, 'brush', { d: .9, g: .35, pan0: .5, pan1: .7 });
  ev(T.sky0, 'brush', { d: 2.2, g: .3 }); ev(T.sky0, 'wind', { d: 9.6, g: .9 }); ev(T.kail0, 'brush', { d: 2.6, g: .45, pan0: -.4, pan1: .6 }); ev(T.moon, 'brush', { d: .8, g: .3, pan0: -.6, pan1: -.4 }); ev(T.tri0, 'brush', { d: 1.4, g: .45, pan0: 0, pan1: 0 });
  for (let b = 0; b < 11; b++) { const t = bar(11) + b * BEAT * 1; if (t < 45.7 && !(t > 38.9 && t < 40.5)) ev(t, 'drum', { g: b % 4 === 0 ? 1 : .6 + (b % 2) * .15 }); }
  ev(T.fire0, 'fire', { d: 45.75 - T.fire0 });
  ev(T.pull, 'gong'); ev(T.mist0, 'mist', { d: T.mist1 - T.mist0 + .4 });
  ev(T.e1, 'brush', { d: 1.2, g: .4 }); ev(T.plate, 'brush', { d: 1.6, g: .3, pan0: -.3, pan1: .5 }); ev(T.e2, 'brush', { d: .9, g: .4, pan0: .4, pan1: .6 }); ev(T.e3, 'brush', { d: 1.1, g: .4, pan0: -.6, pan1: -.4 });
  ev(T.out0, 'mist', { d: 1.2, g: .5 }); ev(T.drop2 - .02, 'drop', { g: .9 }); ev(T.stem2, 'brush', { d: 1.8, g: .4, pan0: 0, pan1: 0 });
  for (const [t, d] of NOTE_WRITE) ev(t, 'pencil', { d });
}

// ---------- notes (screen space, anchored to world points) ----------
const NOTES = [
  { id: 'brahma', t0: 13.4, t1: 17.4, at: [655, 2380], lx: 640, ly: 470, name: 'Brahma', role: 'the Creator', align: 'left' },
  { id: 'vishnu', t0: 29.9, t1: 35.0, at: null, lx: 70, ly: 470, name: 'Vishnu', role: 'the Preserver', align: 'left' },
  { id: 'shiva', t0: 42.9, t1: 46.75, at: [560, 860], lx: 70, ly: 1380, name: 'Shiva', role: 'the Destroyer', align: 'left' },
];
const NOTE_WRITE = NOTES.map(n => [n.t0 + .35, 1.1]).concat([[bar(15) + .4, 1.4], [bar(15) + 1.2, .9], [bar(15.5) + .5, .9], [bar(16) + .5, .9]]);
let TX = [];   // texts on screen this frame, for readcheck
function hand(txt, x, y, p, o = {}) {
  if (p <= 0) return;
  ctx.save(); ctx.font = `${o.w || 600} ${o.size || 44}px Caveat`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = 'middle';
  const w = ctx.measureText(txt).width, x0 = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
  ctx.beginPath(); ctx.rect(x0 - 8, y - o.size, (w + 16) * eo(p), o.size * 2); ctx.clip();
  ctx.globalAlpha = o.alpha ?? 1;
  ctx.shadowColor = rgba(PAPER, .95); ctx.shadowBlur = 14; ctx.fillStyle = rgba(o.col || INK, o.a ?? .92); ctx.fillText(txt, x, y); ctx.fillText(txt, x, y);
  ctx.restore();
  if (o.id && p >= 1 && (o.alpha ?? 1) > .6) TX.push({ id: o.id, text: txt, x0, y0: y - o.size * .6, x1: x0 + w, y1: y + o.size * .6 });
}
function mono(txt, x, y, a, id, size = 22) {
  if (a <= 0) return;
  ctx.save(); ctx.font = `400 ${size}px "IBM Plex Mono"`; ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = rgba(PAPER, .95); ctx.shadowBlur = 10; ctx.fillStyle = rgba(INK, .78 * a); ctx.fillText(txt, x, y); const w = ctx.measureText(txt).width; ctx.restore();
  if (id && a > .6) TX.push({ id, text: txt, x0: x - w / 2, y0: y - size * .6, x1: x + w / 2, y1: y + size * .6 });
}
function leader(x0, y0, x1, y1, p, bend = 30, a = .75) {
  if (p <= 0) return;
  const pts = qcurve(x0, y0, x1, y1, bend, 16), m = Math.max(1, Math.round(16 * clamp(p)));
  ctx.beginPath(); for (let i = 0; i <= m; i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = rgba(INK, a); ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
  if (p >= 1) { ctx.beginPath(); ctx.arc(x1, y1, 3.5, 0, 7); ctx.fillStyle = rgba(INK, a); ctx.fill(); }
}
const fade2 = (t, a, b, fi, fo) => Math.min(ss(seg(t, a, a + fi)), 1 - ss(seg(t, b - fo, b)));
function drawNotes(t) {
  for (const n of NOTES) {
    const f = 1 - ss(seg(t, n.t1 - .45, n.t1)); if (t < n.t0 || f <= 0) continue;
    const at = n.at || W_.hoodAt, [ax, ay] = w2s(t, at[0], at[1]);
    ctx.save(); ctx.globalAlpha = f;
    leader(n.lx + 20, n.ly + 78, ax, ay, seg(t, n.t0 + .9, n.t0 + 1.5), n.lx < 300 ? -40 : 40);
    ctx.restore();
    hand(n.name, n.lx, n.ly, seg(t, n.t0, n.t0 + .7), { size: 70, id: n.id + '_n', alpha: f });
    hand(n.role, n.lx + 6, n.ly + 58, seg(t, n.t0 + .35, n.t0 + 1.1), { size: 42, w: 500, id: n.id + '_r', alpha: f, a: .8 });
  }
}

// ---------- world ----------
function drawFlames(t) {
  const p = seg(t, T.fire0, T.fire1); if (p <= 0) return;
  const cx = 560, cy = 690, R = 410, N = W_.flames.length;
  for (let i = 0; i < N; i++) {
    const k = i / N, q = clamp((p - k * .8) / .2); if (q <= 0) continue;
    const a = -Math.PI / 2 + k * Math.PI * 2, fl = .75 + .4 * vnoise(t * 5.3 + i * 3.7), sk = (vnoise(t * 3.1 + i * 1.3) - .5) * .35;
    ctx.save(); ctx.translate(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.rotate(a + Math.PI / 2); ctx.transform(1, 0, sk, 1, 0, 0); ctx.scale(1, fl * eo(q));
    for (const s of W_.flames[i]) drawS(ctx, s, 1);
    ctx.restore();
  }
  // the ring itself: a thin vermilion line
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * eo(p)); ctx.strokeStyle = rgba(C.ver2, .55); ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
}
function drawDrop(t) {
  if (t >= T.drop || t < 0) return;
  const y = lerp(2860, 3330, ei(t / T.drop));
  withSeed(5, () => drawS(ctx, mk([[540, y], [540, y - 46]], 24, '#2f4c6e', { prof: 'tip', nb: 3, a: .9 }), 1));
}
function drawBloomWash(t) {   // the first drop's stain
  const p = eo(seg(t, T.drop, T.drop + 2.2)); if (p <= 0) return;
  withSeed(7, () => {
    for (let pass = 0; pass < 3; pass++) {
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2, r = (40 + 150 * p) * (1 + .18 * (vnoise(i * .7 + pass * 9) - .5)); const x = 540 + Math.cos(a) * r * 1.25, y = 3330 + Math.sin(a) * r * .8; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.closePath(); ctx.fillStyle = rgba('#2f4c6e', .2 * (1 - .4 * p) * (1 - .8 * ss(seg(t, 3, T.ocean1 + 1)))); ctx.fill();
    }
  });
}
function drawWorld(t) {
  const c = cam(t), top = c.y - 960 / c.z - 200, bot = c.y + 960 / c.z + 200;
  worldXf(t);
  const vis = ob => ob.y + ob.spr.y1 > top && ob.y + ob.spr.y0 < bot;
  // Shiva's sky and mountain
  for (const ob of [W_.sky, W_.kail]) if (vis(ob)) drawObj(ob, t);
  drawObj(W_.moon, t);
  if (bot > 0 && top < 1300) drawFlames(t);
  drawObj(W_.tri, t);
  // the world around the lotus
  for (const ob of W_.world) if (vis(ob)) drawObj(ob, t);
  drawBirds(t);
  // ocean
  drawBloomWash(t); drawObj(W_.ocean, t); drawObj(W_.surf, t);
  drawObj(W_.coil, t); drawObj(W_.conch, t);
  if (t >= T.disc) drawObj(W_.disc, t, (t - T.disc) * Math.PI * 2 / (BAR * 2) * eo(seg(t, T.disc, T.disc + 1.2)));
  // the lotus: halo, stem, pads, bloom
  drawObj(W_.halo, t);
  const sp = seg(t, T.stem0, T.stem1); if (sp > 0) { drawS(ctx, W_.stem.s, eio(sp)); drawS(ctx, W_.stem.e, eio(sp)); }
  drawObj(W_.pad1, t); drawObj(W_.pad2, t);
  if (t > T.stem1 - .6 && t < T.bloom0 + .6) { ctx.save(); ctx.translate(540, 2500); withSeed(9, () => drawList(ctx, W_.bud.S, seg(t, T.stem1 - .6, T.stem1 + .2))); ctx.restore(); }
  drawObj(W_.bloom, t); drawObj(W_.spark, t);
  drawDrop(t);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function drawBirds(t) {
  if (t < T.burst + .2 || t > 36) return;
  for (let i = 0; i < 7; i++) {
    const u = (t - T.burst - .2 - i * .25) / 14; if (u < 0 || u > 1) continue;
    const x = lerp(-80, 1180, u) + (i % 3) * 40 - i * 18, y = lerp(2250, 1950, u) + Math.sin(u * 7 + i) * 26 + (i % 2) * 40 - i * 12;
    const fl = Math.sin(t * 9 + i * 1.7), s = .9 + (i % 3) * .15;
    withSeed(70 + i, () => {
      drawS(ctx, mk(qcurve(x, y, x - 22 * s, y - 10 * s * fl - 2, 3, 5), 4.5 * s, INK2, { prof: 'tip', nb: 0, a: .8 }), 1);
      drawS(ctx, mk(qcurve(x, y, x + 22 * s, y - 10 * s * fl - 2, -3, 5), 4.5 * s, INK2, { prof: 'tip', nb: 0, a: .8 }), 1);
    });
  }
}

// ---------- mist: paper laid back over everything with a wavy edge ----------
function mist(t, c, fromTop) {
  if (c <= 0) return;
  for (const [lift, a] of [[140, .55], [0, 1]]) {
    const edge = fromTop ? -260 + c * 2440 - lift : 2180 - c * 2440 + lift;
    ctx.save(); ctx.beginPath(); ctx.moveTo(-10, fromTop ? -10 : H + 10);
    for (let x = -10; x <= W + 40; x += 30) ctx.lineTo(x, edge + (vnoise(x * .008 + lift) - .5) * 200 + Math.sin(x * .012 + t * 1.3) * 16);
    ctx.lineTo(W + 10, fromTop ? -10 : H + 10); ctx.closePath(); ctx.clip(); ctx.globalAlpha = a; ctx.drawImage(PAPER_IMG, 0, 0); ctx.restore();
  }
}

// ---------- the plate ----------
function drawPlate(t) {
  if (t < T.plate) return;
  const cx = 540, cy = 980, R = 300;
  ctx.save();
  // the closing push-in on the last drop
  const zin = 1 + .3 * eio(seg(t, T.drop2 - .4, DUR));
  ctx.translate(540, 1060); ctx.scale(zin, zin); ctx.translate(-540, -1060);
  if (t < T.out1) {
    P_.arcs.forEach((s, i) => drawS(ctx, s, eio(seg(t, T.plate + i * .45, T.plate + i * .45 + 1.1))));
    const em = (L, x, y, t0, d) => { const p = seg(t, t0, t0 + d); if (p > 0) { ctx.save(); ctx.translate(x, y); drawList(ctx, L, p); ctx.restore(); } };
    em(P_.lotus.S.concat([P_.lotus.spark]), cx, cy - R + 40, T.e1, 1.1);
    const dp = seg(t, T.e2, T.e2 + .9); if (dp > 0) { ctx.save(); ctx.translate(cx + R * .866, cy + R * .5); ctx.rotate((t - T.e2) * .9); drawList(ctx, P_.disc.S, dp); ctx.restore(); }
    em(P_.tri.S, cx - R * .866, cy + R * .5 + 110, T.e3, 1.1);
    // labels
    const L1 = ss(seg(t, T.e1 + .6, T.e1 + 1.1)), L2 = ss(seg(t, T.e2 + .5, T.e2 + 1)), L3 = ss(seg(t, T.e3 + .5, T.e3 + 1));
    mono('CREATION', cx, cy - R + 95, L1, 'l1'); hand('Brahma', cx, cy - R + 145, seg(t, T.e1 + 1.2, T.e1 + 1.9), { size: 50, align: 'center', id: 'n1' });
    mono('PRESERVATION', cx + R * .866, cy + R * .5 + 130, L2, 'l2'); hand('Vishnu', cx + R * .866, cy + R * .5 + 180, seg(t, T.e2 + .5, T.e2 + 1.2), { size: 50, align: 'center', id: 'n2' });
    mono('DISSOLUTION', cx - R * .866, cy + R * .5 + 160, L3, 'l3'); hand('Shiva', cx - R * .866, cy + R * .5 + 210, seg(t, T.e3 + .5, T.e3 + 1.2), { size: 50, align: 'center', id: 'n3' });
    // title
    const tp = seg(t, T.title, T.title + 1.4);
    if (tp > 0) {
      ctx.save(); ctx.font = '500 112px "Cormorant Garamond"'; ctx.letterSpacing = '18px'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
      const w = ctx.measureText('TRIMURTI').width; ctx.beginPath(); ctx.rect(540 - w / 2 - 30, 260, (w + 60) * eio(tp), 160); ctx.clip();
      ctx.fillStyle = rgba(INK, .9); ctx.fillText('TRIMURTI', 549, 395); ctx.restore();
      if (tp >= 1) TX.push({ id: 'title', text: 'TRIMURTI', x0: 540 - w / 2, y0: 300, x1: 540 + w / 2, y1: 400 });
      hand('the holy triad', 540, 470, seg(t, T.title + .9, T.title + 1.8), { size: 54, w: 500, align: 'center', id: 'sub' });
    }
  }
  ctx.restore();
  mist(t, eio(seg(t, T.out0, T.out1)), false);
  // the last drop, and a new lotus beginning
  ctx.save(); ctx.translate(540, 1060); ctx.scale(zin, zin); ctx.translate(-540, -1060);
  if (t >= T.drop2 - .45 && t < T.drop2) { const y = lerp(380, 1150, ei(seg(t, T.drop2 - .45, T.drop2))); withSeed(5, () => drawS(ctx, mk([[540, y], [540, y - 46]], 24, '#2f4c6e', { prof: 'tip', nb: 3, a: .9 }), 1)); }
  if (t >= T.drop2) {
    const p = seg(t, T.drop2, T.drop2 + .8);
    for (let i = 0; i < P_.pool.length; i++) drawS(ctx, P_.pool[i], eo(clamp(p * 1.6 - i * .12)));
    drawS(ctx, P_.stem, eio(seg(t, T.stem2, T.stem2 + 1.2)));
    const bp = seg(t, T.stem2 + 1.0, T.stem2 + 3.4);   // the brush lifts before the bud is finished
    if (bp > 0) { ctx.save(); ctx.translate(540, 884); drawList(ctx, P_.bud.S, bp); ctx.restore(); }
  }
  ctx.restore();
}

// ---------- subtitles ----------
function wrap(txt, maxW) {
  const words = txt.split(' '); if (ctx.measureText(txt).width <= maxW) return [txt];
  let best = [txt], bd = 1e9;
  for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(' '), b = words.slice(i).join(' '), wa = ctx.measureText(a).width, wb = ctx.measureText(b).width; if (wa <= maxW && wb <= maxW && Math.abs(wa - wb) < bd) { bd = Math.abs(wa - wb); best = [a, b]; } }
  return best;
}
function drawSubs(t) {
  for (const [, s, d, en] of VO) {
    const f = fade2(t, s - .15, s + d + .45, .25, .35); if (f <= 0) continue;
    ctx.save(); ctx.globalAlpha = f; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = 'italic 500 50px "Cormorant Garamond"'; const lines = wrap(en, 940), y0 = lines.length > 1 ? 1652 : 1700;
    const yc = y0 + (lines.length - 1) * 27 - 16, g = ctx.createRadialGradient(540, yc, 10, 540, yc, 520);
    g.addColorStop(0, rgba(PAPER, .78)); g.addColorStop(.6, rgba(PAPER, .55)); g.addColorStop(1, rgba(PAPER, 0));
    ctx.save(); ctx.translate(540, yc); ctx.scale(1, .22); ctx.translate(-540, -yc); ctx.fillStyle = g; ctx.fillRect(0, yc - 520, W, 1040); ctx.restore();
    ctx.shadowColor = rgba(PAPER, 1); ctx.shadowBlur = 22;
    for (let k = 0; k < 2; k++) { ctx.fillStyle = rgba(INK, .9); lines.forEach((ln, i) => ctx.fillText(ln, 540, y0 + i * 54)); }
    ctx.restore();
  }
}

// ---------- frame ----------
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.drawImage(PAPER_IMG, 0, 0);
  if (t < T.mist1 + .05) {
    drawWorld(t);
    drawNotes(t);
    mist(t, eio(seg(t, T.mist0, T.mist1)), true);
  }
  drawPlate(t);
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TX; };

(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"', '600 70px Caveat'].map(f => document.fonts.load(f, 'Brahmā Viṣṇu Śiva')));
  build();
  window.READY = true;
})();
