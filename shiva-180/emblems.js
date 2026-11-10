// ---------- generators: local coords, y negative upward; each returns { S: strokes in paint order, ... } ----------
// Every generator consumes the global RNG: call inside withSeed().
const C = {
  ocean: ['#2f4c6e', '#3d5d80', '#4f7090', '#6f8faa', '#365777'],
  lotus: ['#e7aab2', '#e2a0a8', '#dc96a2'], lotusMid: ['#d48594', '#cf7f8e'], lotusDeep: ['#b8606f', '#ad5767'],
  leaf: ['#7f9f5f', '#6f8f52', '#8aa868', '#5f7f48'], stem: '#6f8d5a',
  sage: ['#a9b98a', '#9db07c', '#b6c497'], green: ['#8ea860', '#7c9a52', '#6a8a4c', '#93ad66'],
  ochre: ['#c99a5b', '#d4aa6c', '#bf8f52'], far: ['#9aa7b4', '#a8b3be', '#8f9cab'],
  serpent: ['#3f6f5e', '#386854', '#487a66'], serpentDark: ['#2a4e40', '#24463a'], belly: '#b9cdb4',
  gold: '#d8b04a', ver: '#c8442a', ver2: '#b23a22', flame: ['#d9822e', '#e09a3a', '#cf6a2a'],
  snowShade: ['#9aa7b4', '#8d9aa9', '#a7b2bd', '#7f8d9e'], snowLite: ['#c9d1d8', '#d4dade'],
  dusk: ['#7d86a6', '#8e95b1', '#a9aec4', '#6f7898'], moon: ['#e3c77a', '#ebd28c'],
};

// a lotus in full bloom; origin = the base of the flower
function lotusBloom(sc) {
  const S = [], petal = (a, len, w, cols, al, bend) => S.push(mk(qcurve(0, 0, Math.cos(a) * len, Math.sin(a) * len, bend, 12), w, pick(cols), { prof: 'leaf', nb: 5, a: al, rough: .18 }));
  // sepals
  for (const a of [-2.75, -.39]) S.push(mk(qcurve(0, 6 * sc, Math.cos(a) * 70 * sc, Math.sin(a) * 40 * sc + 8 * sc, 8 * sc, 8), 30 * sc, pick(C.leaf), { prof: 'leaf', nb: 4, a: .75 }));
  // back row: wide fan
  for (let i = 0; i < 7; i++) { const a = -Math.PI + .28 + i / 6 * (Math.PI - .56); petal(a, rnd(150, 170) * sc, rnd(64, 74) * sc, C.lotus, .55, rnd(-8, 8) * sc); }
  // middle row
  for (let i = 0; i < 5; i++) { const a = -Math.PI + .6 + i / 4 * (Math.PI - 1.2); petal(a, rnd(128, 142) * sc, rnd(58, 64) * sc, C.lotusMid, .6, rnd(-6, 6) * sc); }
  // front row
  for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + (i - 1) * .55; petal(a, rnd(96, 106) * sc, rnd(56, 62) * sc, C.lotusMid, .66, (i - 1) * 6 * sc); }
  // tips: darker accents
  for (let i = 0; i < 9; i++) {
    const a = -Math.PI + .35 + i / 8 * (Math.PI - .7), r0 = rnd(110, 140) * sc, r1 = r0 + rnd(18, 28) * sc;
    S.push(mk(qcurve(Math.cos(a) * r0, Math.sin(a) * r0, Math.cos(a) * r1, Math.sin(a) * r1, 2, 5), rnd(10, 14) * sc, pick(C.lotusDeep), { prof: 'leaf', nb: 3, a: .55 }));
  }
  // veins
  for (let i = 0; i < 6; i++) { const a = -Math.PI + .5 + i / 5 * (Math.PI - 1); S.push(mk(qcurve(Math.cos(a) * 30 * sc, Math.sin(a) * 30 * sc, Math.cos(a) * 110 * sc, Math.sin(a) * 110 * sc, rnd(-4, 4), 8), 2.2 * sc, '#a85466', { prof: 'tip', nb: 0, a: .45 })); }
  // seed pod and the vermilion spark
  S.push(mk(qcurve(-30 * sc, -46 * sc, 30 * sc, -46 * sc, -6 * sc, 8), 26 * sc, C.gold, { prof: 'even', nb: 5, a: .85 }));
  const spark = mk(qcurve(-8 * sc, -50 * sc, 8 * sc, -50 * sc, 0, 4), 14 * sc, C.ver, { prof: 'leaf', nb: 3, a: .95 });
  return { S, spark };
}
function lotusBud(sc) {
  const S = [];
  S.push(mk(qcurve(0, 0, -20 * sc, -90 * sc, -16 * sc, 10), 40 * sc, pick(C.lotus), { prof: 'leaf', nb: 5, a: .6 }));
  S.push(mk(qcurve(0, 0, 18 * sc, -92 * sc, 14 * sc, 10), 40 * sc, pick(C.lotusMid), { prof: 'leaf', nb: 5, a: .62 }));
  S.push(mk(qcurve(0, 0, 0, -100 * sc, 0, 10), 34 * sc, pick(C.lotusDeep), { prof: 'leaf', nb: 4, a: .5 }));
  return { S };
}
// a lotus pad floating on the water, seen low: origin = centre
function lotusPad(sc) {
  const S = [], R = 110 * sc;
  for (let i = 0; i < 13; i++) {
    const a = -Math.PI + .12 + i / 12 * (2 * Math.PI - .24) + Math.PI / 2;   // a notch at the front
    S.push(mk(qcurve(0, 0, Math.cos(a) * R, Math.sin(a) * R * .3, rnd(-10, 10) * sc, 8), rnd(30, 40) * sc, pick(C.leaf), { prof: 'leaf', nb: 4, a: .7 }));
  }
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; S.push(mk(qcurve(0, 0, Math.cos(a) * R * .85, Math.sin(a) * R * .26, 0, 6), 1.8 * sc, '#4f6a3c', { prof: 'tip', nb: 0, a: .5 })); }
  return { S };
}

// far mountain range as stroke bands; origin = left base; width w
function hills(w, h, cols, n = 9, a = .55) {
  const S = [];
  for (let i = 0; i < n; i++) {
    const y = -h * (1 - i / n) * rnd(.85, 1.05), x0 = rnd(-40, w * .3), x1 = rnd(w * .7, w + 40);
    S.push(mk(qcurve(x0, y, x1, y + rnd(-20, 20), rnd(-h * .5, h * .2), 16), h / n * 2.6, pick(cols), { prof: 'leaf', nb: 6, a, rough: .3 }));
  }
  return { S };
}
function tree(sc, cols) {
  const S = [], Hh = rnd(70, 110) * sc;
  S.push(mk(qcurve(0, 0, rnd(-4, 4), -Hh * .75, 3, 6), 4 * sc, INK2, { prof: 'tip', nb: 0, a: .7 }));
  clump(S, 0, -Hh, Hh * .36, 14, cols, { l0: 9 * sc, l1: 18 * sc, w0: 7 * sc, w1: 12 * sc, sx: 1.15, sy: .8 });
  return { S };
}
function cloud(sc, col) {
  const S = [], w = rnd(260, 420) * sc;
  for (let i = 0; i < 5; i++) { const y = rnd(-16, 16) * sc, x = rnd(-w * .2, w * .2); S.push(mk(qcurve(x - w / 2, y, x + w / 2, y + rnd(-8, 8), rnd(-12, 12) * sc, 14), rnd(18, 30) * sc, col, { prof: 'leaf', nb: 7, a: rnd(.16, .26) })); }
  return { S };
}

// Shesha: a coiled serpent seen from the side, a couch on the ocean; origin = centre of the coil
function serpent(sc) {
  const S = [], R = 330 * sc, turns = 2.6, N = 90, pts = [];
  for (let i = 0; i <= N; i++) {
    const th = i / N * turns * Math.PI * 2, r = R * (1 - i / N * .62);
    pts.push([Math.cos(th + Math.PI) * r, Math.sin(th + Math.PI) * r * .36]);
  }
  // body in overlapping segments (paint order: outer coil first)
  const segN = 9;
  for (let k = 0; k < segN; k++) {
    const a = Math.floor(k / segN * N), b = Math.min(N, Math.floor((k + 1) / segN * N) + 2), seg_ = pts.slice(a, b + 1);
    const s = mk(seg_, (48 - k * 2.2) * sc, pick(C.serpent), { prof: 'even', nb: 7, a: .78, rough: .14 });
    S.push(s, edgeOf(s, 1, 2.4 * sc, INK2, .6));
    S.push(mk(seg_.map(([x, y]) => [x, y + 8 * sc]), 9 * sc, C.belly, { prof: 'even', nb: 3, a: .5 }));
  }
  // scale dabs
  for (let i = 4; i < N; i += 2) { const [x, y] = pts[i]; S.push(mk(qcurve(x - 7 * sc, y - 6 * sc, x + 7 * sc, y - 4 * sc, 2, 3), 7 * sc, pick(C.serpentDark), { prof: 'leaf', nb: 0, a: .45 })); }
  // neck rises from the outer end, the hood spreads over the coil
  const [nx, ny] = pts[0], hx = nx + 30 * sc, hy = ny - 300 * sc;
  const neck = mk(qctrl(nx, ny, nx - 70 * sc, ny - 150 * sc, hx, hy, 14), 44 * sc, pick(C.serpent), { prof: 'even', nb: 7, a: .8 });
  S.push(neck, edgeOf(neck, -1, 2.4 * sc, INK2, .6));
  const hood = [];
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i - 2) * .42 + .35;   // leaning toward the coil
    hood.push(mk(qcurve(hx, hy, hx + Math.cos(a) * 110 * sc, hy + Math.sin(a) * 110 * sc, (i - 2) * 6 * sc, 10), 52 * sc, pick(C.serpentDark), { prof: 'leaf', nb: 6, a: .72 }));
    const ex = hx + Math.cos(a) * 92 * sc, ey = hy + Math.sin(a) * 92 * sc;
    hood.push(mk(qcurve(ex - 5 * sc, ey, ex + 5 * sc, ey, 0, 3), 8 * sc, C.belly, { prof: 'leaf', nb: 0, a: .8 }));
  }
  return { S: S.concat(hood), pts, hood: [hx, hy] };
}
// the conch (shankha); origin = centre, lying left-right
function conch(sc) {
  const S = [], ink = '#7a644c';
  const body = mk(qcurve(-90 * sc, -4 * sc, 90 * sc, 6 * sc, -22 * sc, 14), 92 * sc, '#efe2c4', { prof: 'leaf', nb: 6, a: .85 });
  S.push(body, edgeOf(body, 1, 2.4 * sc, ink, .75), edgeOf(body, -1, 2 * sc, ink, .6));
  S.push(mk(qcurve(-30 * sc, 30 * sc, 70 * sc, 26 * sc, 12 * sc, 10), 22 * sc, '#e0a48a', { prof: 'leaf', nb: 4, a: .7 }));   // the lip
  for (let i = 0; i < 4; i++) { const x = -88 * sc + i * 18 * sc; S.push(mk(qcurve(x, -36 * sc + i * 4 * sc, x + 10 * sc, 30 * sc - i * 6 * sc, 14 * sc, 8), 2.2 * sc, ink, { prof: 'even', nb: 0, a: .7 })); }
  S.push(mk(qcurve(-90 * sc, -4 * sc, -130 * sc, -10 * sc, -6 * sc, 6), 18 * sc, '#e6d6b2', { prof: 'tip', nb: 3, a: .8 }));   // spire
  for (let i = 0; i < 5; i++) { const x = -40 * sc + i * 26 * sc; S.push(mk(qcurve(x, -42 * sc, x + 14 * sc, 36 * sc, -18 * sc, 8), 1.8 * sc, '#c9a87e', { prof: 'tip', nb: 0, a: .55 })); }
  return { S };
}
// the discus (Sudarshana chakra); origin = centre; drawn as a sprite and turned
function discus(sc) {
  const S = [], R = 90 * sc, r = 34 * sc;
  for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2, x = Math.cos(a) * (R + 26 * sc), y = Math.sin(a) * (R + 26 * sc), x1 = Math.cos(a + .1) * (R + 50 * sc), y1 = Math.sin(a + .1) * (R + 50 * sc); S.push(mk(qcurve(x, y, x1, y1, 3 * sc, 5), 12 * sc, pick([C.ver, C.ver2, '#d0552e']), { prof: 'tip', nb: 3, a: .85 })); }
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; S.push(mk(polar(Math.cos(a) * R, Math.sin(a) * R, a + Math.PI / 2 + .02, 2 * Math.PI * R / 10 + 8 * sc, 4 * sc, 8), 20 * sc, pick(C.ochre), { prof: 'even', nb: 5, a: .82 })); }
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + .2; S.push(mk(qcurve(Math.cos(a) * r, Math.sin(a) * r, Math.cos(a) * (R - 8 * sc), Math.sin(a) * (R - 8 * sc), 4 * sc, 6), 7 * sc, '#a77a3e', { prof: 'even', nb: 0, a: .8 })); }
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; S.push(mk(polar(Math.cos(a) * r, Math.sin(a) * r, a + Math.PI / 2, 2 * Math.PI * r / 6 + 6 * sc, 2 * sc, 6), 14 * sc, C.gold, { prof: 'even', nb: 4, a: .85 })); }
  S.push(mk(qcurve(-8 * sc, 0, 8 * sc, 0, 0, 4), 14 * sc, C.ver, { prof: 'leaf', nb: 3, a: .95 }));
  return { S };
}

// Kailash: one tall peak, shadow face painted, lit face left mostly as paper; origin = peak
function kailash(sc) {
  const S = [], L = 760 * sc, Rr = 720 * sc, h = 640 * sc;
  // shadow face (right), strokes falling from the ridge
  for (let i = 0; i < 34; i++) {
    const f = i / 34, x = f * Rr * .95, y = f * h * .9;
    S.push(mk(qcurve(x * .3 + rnd(-6, 6), y * .3, x + rnd(30, 120) * sc, y + rnd(160, 300) * sc, rnd(-30, 10) * sc, 12), rnd(40, 70) * sc, pick(C.snowShade), { prof: 'brush', nb: 7, a: .5, rough: .28 }));
  }
  // lit face (left): a few pale strokes
  for (let i = 0; i < 16; i++) { const f = i / 16 + .05, x = -f * L * .8; S.push(mk(qcurve(x * .5, f * h * .45, x - rnd(20, 70) * sc, f * h + rnd(80, 200) * sc, rnd(-10, 20) * sc, 10), rnd(30, 52) * sc, pick(C.snowLite), { prof: 'brush', nb: 5, a: .38 })); }
  // snow gullies on the shadow face
  for (let i = 0; i < 8; i++) { const x = rnd(40, 400) * sc, y = x * .8 + rnd(10, 80) * sc; S.push(mk(qcurve(x, y, x + rnd(10, 50) * sc, y + rnd(80, 180) * sc, rnd(-10, 10), 6), rnd(4, 7) * sc, '#f0ece4', { prof: 'tip', nb: 0, a: .7 })); }
  // ridge lines in ink
  S.push(mk(qcurve(0, 0, -L, h + 60 * sc, 30 * sc, 18), 3 * sc, INK2, { prof: 'tip', nb: 0, a: .6, rough: .4 }));
  S.push(mk(qcurve(0, 0, Rr, h + 30 * sc, -40 * sc, 18), 3.4 * sc, INK2, { prof: 'tip', nb: 0, a: .65, rough: .4 }));
  // foothills band
  for (let i = 0; i < 7; i++) { const y = h + rnd(20, 140) * sc; S.push(mk(qcurve(-L - 100 * sc, y + rnd(-20, 40), Rr + 100 * sc, y + rnd(-20, 40), rnd(-60, 30) * sc, 16), rnd(60, 90) * sc, pick(['#5f7486', '#6d8194', '#56697c']), { prof: 'leaf', nb: 7, a: .45 })); }
  return { S };
}
function crescent(sc) {
  const S = [], R = 62 * sc, pts = [], pts2 = [];
  for (let i = 0; i <= 20; i++) { const a = -1.9 + i / 20 * 3.8; pts.push([Math.cos(a) * R, Math.sin(a) * R]); pts2.push([Math.cos(a) * R * .92 + 6 * sc, Math.sin(a) * R * .9]); }
  S.push(mk(pts, 30 * sc, C.moon[0], { prof: 'leaf', nb: 6, a: .78 }), mk(pts2, 14 * sc, C.moon[1], { prof: 'leaf', nb: 3, a: .6 }));
  return { S };
}
// the trident with a small drum (damaru) tied below the prongs; origin = base of the shaft
function trident(sc) {
  const S = [], Hs = 560 * sc, top = -Hs, col = '#4a3a2e';
  const shaft = mk(qcurve(0, 0, 0, top, 3 * sc, 18), 13 * sc, col, { prof: 'even', nb: 4, a: .9, rough: .1 });
  S.push(shaft);
  S.push(mk(qcurve(-58 * sc, top + 4 * sc, 58 * sc, top + 4 * sc, -16 * sc, 10), 11 * sc, col, { prof: 'even', nb: 3, a: .9 }));
  S.push(mk(qcurve(0, top, 0, top - 120 * sc, 0, 10), 15 * sc, col, { prof: 'tip', nb: 4, a: .92 }));
  for (const sd of [-1, 1]) S.push(mk(qctrl(sd * 56 * sc, top + 2 * sc, sd * 78 * sc, top - 40 * sc, sd * 40 * sc, top - 100 * sc, 12), 12 * sc, col, { prof: 'tip', nb: 4, a: .9 }));
  // damaru: two cones meeting at the waist, a cord, a vermilion ribbon
  const dy = top + 70 * sc, dx = 0;
  S.push(mk(qcurve(dx - 34 * sc, dy - 2 * sc, dx, dy, 0, 6), 46 * sc, '#b07a4a', { prof: 'tip', nb: 4, a: .85 }));
  S.push(mk(qcurve(dx + 34 * sc, dy + 2 * sc, dx, dy, 0, 6), 46 * sc, '#a06c40', { prof: 'tip', nb: 4, a: .85 }));
  S.push(mk(qcurve(dx, dy + 6 * sc, dx + 44 * sc, dy + 70 * sc, 18 * sc, 10), 6 * sc, C.ver, { prof: 'tip', nb: 2, a: .85 }));
  S.push(mk(qcurve(dx, dy + 6 * sc, dx + 26 * sc, dy + 86 * sc, -10 * sc, 10), 5 * sc, C.ver2, { prof: 'tip', nb: 2, a: .8 }));
  return { S };
}
// one flame, local: base at 0,0 pointing up (-y)
function flameStrokes(sc) {
  const h = rnd(60, 95) * sc, b = rnd(-14, 14) * sc;
  return [mk(qcurve(0, 0, b * .5, -h, b, 8), rnd(22, 30) * sc, pick(C.flame), { prof: 'tip', nb: 4, a: .7 }),
          mk(qcurve(0, -2, b * .3, -h * .62, b * .6, 6), rnd(10, 14) * sc, C.ver, { prof: 'tip', nb: 2, a: .8 })];
}
