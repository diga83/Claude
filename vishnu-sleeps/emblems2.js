// ---------- generators for "The Three Answers" (local coords, y up = negative). Call inside withSeed(). ----------
const INKB = '#4a3a2e';
function swan(sc) {   // the hamsa on the water, facing right; origin = waterline centre
  const S = [];
  const body = mk(qcurve(-80 * sc, -14 * sc, 64 * sc, -16 * sc, -16 * sc, 12), 54 * sc, '#f4ecdc', { prof: 'leaf', nb: 5, a: .9 });
  S.push(body, edgeOf(body, -1, 2 * sc, INKB, .65), edgeOf(body, 1, 1.6 * sc, '#b9ad96', .6));
  S.push(mk(qcurve(-56 * sc, -30 * sc, 36 * sc, -34 * sc, -22 * sc, 10), 30 * sc, '#e4d9c2', { prof: 'leaf', nb: 4, a: .85 }));
  for (let i = 0; i < 4; i++) S.push(mk(qcurve(-40 * sc + i * 16 * sc, -34 * sc, -14 * sc + i * 16 * sc, -28 * sc, -4, 4), 2 * sc, '#a69a84', { prof: 'tip', nb: 0, a: .55 }));
  const neck = mk(qctrl(52 * sc, -26 * sc, 92 * sc, -60 * sc, 70 * sc, -112 * sc, 12), 13 * sc, '#f4ecdc', { prof: 'even', nb: 3, a: .92 });
  S.push(neck, edgeOf(neck, 1, 1.8 * sc, INKB, .65));
  S.push(mk(qcurve(66 * sc, -114 * sc, 92 * sc, -114 * sc, -6 * sc, 6), 18 * sc, '#f4ecdc', { prof: 'leaf', nb: 2, a: .92 }));
  S.push(mk(qcurve(92 * sc, -114 * sc, 118 * sc, -106 * sc, -3 * sc, 5), 8 * sc, '#d9822e', { prof: 'tip', nb: 0, a: .95 }));
  S.push(mk(qcurve(80 * sc, -118 * sc, 82 * sc, -118 * sc, 0, 2), 4 * sc, INK, { prof: 'even', nb: 0, a: .9 }));
  for (const [x, w] of [[-60, 70], [30, 90]]) S.push(mk(qcurve((x - w / 2) * sc, 4 * sc, (x + w / 2) * sc, 6 * sc, 3, 8), 4 * sc, '#6f8faa', { prof: 'leaf', nb: 0, a: .7 }));
  return { S };
}
function palmLeaves(sc) {   // a bound palm-leaf manuscript; origin = centre
  const S = [], L = 200 * sc;
  for (let i = 0; i < 4; i++) S.push(mk(qcurve(-L / 2, (i * 7 - 10) * sc, L / 2, (i * 7 - 12) * sc, rnd(-2, 2), 12), 28 * sc, pick(['#d9b77a', '#cfa968', '#e0c088']), { prof: 'even', nb: 5, a: .82 }));
  for (let k = 0; k < 4; k++) { const y = (-8 + k * 6) * sc; S.push(mk(qcurve(-L * .4, y, L * .4, y, 0, 10), 1.6 * sc, INKB, { prof: 'even', nb: 0, a: .55, rough: .5 })); }
  for (const x of [-L * .3, L * .3]) S.push(mk(qcurve(x - 3 * sc, 0, x + 3 * sc, 0, 0, 2), 7 * sc, INK, { prof: 'even', nb: 0, a: .7 }));
  S.push(mk(qcurve(L * .3, 0, L * .42, 30 * sc, 10 * sc, 8), 4 * sc, C.ver, { prof: 'tip', nb: 0, a: .85 }));
  return { S };
}
function serpentTop(sc) {   // Shesha coiled, seen from above; hood fanning over the centre; origin = centre
  const S = [], N = 120, turns = 2.7, R = 360 * sc, pts = [];
  for (let i = 0; i <= N; i++) { const f = i / N, th = -Math.PI / 2 + f * turns * Math.PI * 2, r = R * (1 - f * .7); pts.push([Math.cos(th) * r, Math.sin(th) * r]); }
  const segN = 11;
  for (let k = 0; k < segN; k++) {
    const a = Math.floor(k / segN * N), b = Math.min(N, Math.floor((k + 1) / segN * N) + 2), sg = pts.slice(a, b + 1);
    const s = mk(sg, (58 - k * 2.6) * sc, pick(C.serpent), { prof: 'even', nb: 8, a: .8, rough: .14 });
    S.push(s, edgeOf(s, 1, 2.2 * sc, '#1f3a32', .55), edgeOf(s, -1, 1.6 * sc, C.belly, .5));
  }
  for (let i = 3; i < N; i += 2) { const [x, y] = pts[i]; S.push(mk(qcurve(x - 6 * sc, y - 5 * sc, x + 6 * sc, y + 3 * sc, 2, 3), 7 * sc, pick(C.serpentDark), { prof: 'leaf', nb: 0, a: .45 })); }
  // hood: seven heads fanned inward from the outer end at the top
  const [hx, hy] = pts[0];
  for (let i = 0; i < 7; i++) {
    const a = Math.PI / 2 + (i - 3) * .26, L = 130 * sc;
    S.push(mk(qcurve(hx, hy - 30 * sc, hx + Math.cos(a) * L, hy - 30 * sc + Math.sin(a) * L, (i - 3) * 4 * sc, 10), 44 * sc, pick(C.serpentDark), { prof: 'leaf', nb: 6, a: .78 }));
    const ex = hx + Math.cos(a) * L * .82, ey = hy - 30 * sc + Math.sin(a) * L * .82;
    S.push(mk(qcurve(ex - 4 * sc, ey, ex + 4 * sc, ey, 0, 3), 7 * sc, C.belly, { prof: 'leaf', nb: 0, a: .85 }));
  }
  return { S };
}
function tilak(sc) {   // urdhva pundra: a pale U with a vermilion line
  const S = [];
  S.push(mk(qctrl(-26 * sc, -70 * sc, -26 * sc, 40 * sc, 0, 40 * sc, 10), 13 * sc, '#f3ecdc', { prof: 'even', nb: 3, a: .95 }));
  S.push(mk(qctrl(26 * sc, -70 * sc, 26 * sc, 40 * sc, 0, 40 * sc, 10), 13 * sc, '#f3ecdc', { prof: 'even', nb: 3, a: .95 }));
  S.push(mk(qcurve(0, -64 * sc, 0, 24 * sc, 0, 8), 10 * sc, C.ver, { prof: 'even', nb: 2, a: .95 }));
  return { S };
}
function oceanDisc(sc) {   // the deep water under the coil: concentric strokes
  const S = [];
  for (let i = 0; i < 26; i++) {
    const r = (440 - i * 15) * sc, a0 = rnd(0, 6.3), n = 30, pts = [];
    for (let k = 0; k <= n; k++) { const a = a0 + k / n * Math.PI * 1.9; pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
    S.push(mk(pts, rnd(40, 60) * sc, pick(['#2f4c6e', '#2a4464', '#3d5d80', '#365777']), { prof: 'even', nb: 7, a: rnd(.25, .38), rough: .3 }));
  }
  return { S };
}
// ---- the ten avatar emblems (r ≈ 55 around 0,0) ----
function roundelBg(sc) {
  const S = [];
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; S.push(mk(polar(Math.cos(a) * 30 * sc, Math.sin(a) * 30 * sc, a + 1.6, 64 * sc, 4 * sc, 6), 46 * sc, pick(['#efe6d2', '#e9dfc9', '#f2ead9']), { prof: 'leaf', nb: 3, a: .8 })); }
  const pts = []; for (let k = 0; k <= 36; k++) { const a = k / 36 * Math.PI * 2 - 1.3; pts.push([Math.cos(a) * 72 * sc, Math.sin(a) * 72 * sc]); }
  S.push(mk(pts, 3 * sc, INKB, { prof: 'even', nb: 0, a: .6, rough: .4 }));
  return S;
}
const AV = [
  ['Matsya', 'fish', sc => { const S = []; const b = mk(qcurve(-42 * sc, 0, 30 * sc, 0, -10 * sc, 10), 34 * sc, '#6f8faa', { prof: 'leaf', nb: 5, a: .85 }); S.push(b, edgeOf(b, 1, 1.6 * sc, INKB, .6)); for (const d of [-1, 1]) S.push(mk(qcurve(28 * sc, 0, 50 * sc, d * 20 * sc, 0, 5), 14 * sc, '#4f7090', { prof: 'tip', nb: 2, a: .85 })); S.push(mk(qcurve(-28 * sc, -4 * sc, -26 * sc, -4 * sc, 0, 2), 5 * sc, INK, { prof: 'even', nb: 0 })); return S; }],
  ['Kurma', 'tortoise', sc => { const S = []; for (const d of [-1, 1]) S.push(mk(qcurve(d * 30 * sc, 10 * sc, d * 46 * sc, 22 * sc, 0, 4), 10 * sc, '#8a9a6a', { prof: 'tip', nb: 0, a: .85 })); S.push(mk(qcurve(36 * sc, 0, 54 * sc, -4 * sc, 0, 4), 14 * sc, '#8a9a6a', { prof: 'leaf', nb: 0, a: .9 })); const sh = mk(qcurve(-40 * sc, 6 * sc, 40 * sc, 6 * sc, -40 * sc, 14), 40 * sc, '#7c6a44', { prof: 'leaf', nb: 6, a: .85 }); S.push(sh, edgeOf(sh, -1, 2 * sc, INKB, .6)); for (let i = -1; i <= 1; i++) S.push(mk(qcurve(i * 18 * sc - 6 * sc, -16 * sc, i * 18 * sc + 6 * sc, 0, 0, 4), 2 * sc, '#4a3a2e', { prof: 'even', nb: 0, a: .6 })); return S; }],
  ['Varaha', 'boar', sc => { const S = []; const tusk = mk(qctrl(-44 * sc, 10 * sc, 0, 50 * sc, 44 * sc, 0, 12), 12 * sc, '#efe6d2', { prof: 'tip', nb: 2, a: .95 }); S.push(tusk, edgeOf(tusk, 1, 1.6 * sc, INKB, .7)); clump(S, 0, -10 * sc, 22 * sc, 18, ['#6f8faa', '#7f9f5f', '#5f80a0', '#8aa868'], { l0: 6 * sc, l1: 12 * sc, w0: 8 * sc, w1: 12 * sc, sx: 1, sy: 1 }); return S; }],
  ['Narasimha', 'man-lion', sc => { const S = []; for (let i = 0; i < 14; i++) { const a = -Math.PI + i / 13 * Math.PI; S.push(mk(polar(Math.cos(a) * 10 * sc, -20 * sc + Math.sin(a) * 10 * sc, a, 34 * sc, 3, 5), 10 * sc, pick(['#d9822e', '#e0a83a', '#c9702a']), { prof: 'tip', nb: 2, a: .85 })); } const p = mk(qcurve(0, 50 * sc, 0, -14 * sc, 0, 10), 26 * sc, '#c99a5b', { prof: 'even', nb: 5, a: .85 }); S.push(p, mk([[0, -14 * sc], [-6 * sc, 6 * sc], [5 * sc, 22 * sc], [-3 * sc, 44 * sc]], 2.4 * sc, INK, { prof: 'even', nb: 0, a: .8 })); return S; }],
  ['Vamana', 'dwarf', sc => { const S = []; const pts = []; for (let k = 0; k <= 16; k++) { const a = Math.PI + k / 16 * Math.PI; pts.push([Math.cos(a) * 46 * sc, -6 * sc + Math.sin(a) * 30 * sc]); } S.push(mk(pts, 22 * sc, '#c8442a', { prof: 'leaf', nb: 5, a: .8 }), mk(qcurve(-46 * sc, -6 * sc, 46 * sc, -6 * sc, -4 * sc, 10), 3 * sc, INKB, { prof: 'even', nb: 0, a: .7 }), mk(qctrl(0, -36 * sc, 0, 40 * sc, 12 * sc, 44 * sc, 10), 4 * sc, INKB, { prof: 'even', nb: 0, a: .85 })); return S; }],
  ['Parashurama', 'axe', sc => { const S = []; S.push(mk(qcurve(-30 * sc, 44 * sc, 26 * sc, -40 * sc, 4 * sc, 10), 7 * sc, '#8a6a44', { prof: 'even', nb: 2, a: .9 })); const bl = mk(qcurve(14 * sc, -46 * sc, 36 * sc, -6 * sc, -18 * sc, 8), 30 * sc, '#8d9aa9', { prof: 'leaf', nb: 4, a: .9 }); S.push(bl, edgeOf(bl, -1, 2 * sc, INKB, .7)); return S; }],
  ['Rama', 'bow', sc => { const S = []; const pts = []; for (let k = 0; k <= 16; k++) { const a = -1.25 + k / 16 * 2.5; pts.push([-20 * sc + Math.cos(a) * 52 * sc, Math.sin(a) * 52 * sc]); } S.push(mk(pts, 8 * sc, '#8a6a44', { prof: 'leaf', nb: 2, a: .9 }), mk([pts[0], pts[16]], 1.6 * sc, INKB, { prof: 'even', nb: 0, a: .8 }), mk(qcurve(-6 * sc, 0, 50 * sc, 0, 0, 8), 2.6 * sc, INKB, { prof: 'even', nb: 0, a: .9 }), mk(qcurve(40 * sc, -6 * sc, 52 * sc, 0, 0, 3), 8 * sc, '#8d9aa9', { prof: 'tip', nb: 0, a: .9 })); return S; }],
  ['Krishna', 'flute', sc => { const S = []; S.push(mk(qcurve(-50 * sc, 18 * sc, 44 * sc, 4 * sc, -2, 10), 9 * sc, '#c99a5b', { prof: 'even', nb: 2, a: .9 })); for (let i = 0; i < 4; i++) S.push(mk(qcurve(-10 * sc + i * 12 * sc, 12 * sc, -8 * sc + i * 12 * sc, 12 * sc, 0, 2), 4 * sc, INK, { prof: 'even', nb: 0, a: .8 })); S.push(mk(qcurve(10 * sc, 6 * sc, 30 * sc, -46 * sc, -12 * sc, 10), 20 * sc, '#5f8a52', { prof: 'leaf', nb: 4, a: .8 }), mk(qcurve(24 * sc, -34 * sc, 30 * sc, -38 * sc, 0, 3), 14 * sc, '#2f6a8a', { prof: 'leaf', nb: 0, a: .9 }), mk(qcurve(26 * sc, -36 * sc, 28 * sc, -37 * sc, 0, 2), 6 * sc, '#d9b04a', { prof: 'leaf', nb: 0, a: .95 })); return S; }],
  ['Buddha', 'or Balarama', sc => { const S = []; const pts = []; for (let k = 0; k <= 24; k++) { const u = k / 24 * Math.PI * 2, x = 34 * Math.sin(u) ** 3, y = -(26 * Math.cos(u) - 10 * Math.cos(2 * u) - 4 * Math.cos(3 * u)); pts.push([x * sc * 1.1, y * sc * 1.1 - 4 * sc]); } S.push(mk(pts.slice(0, 13), 20 * sc, '#6f8f52', { prof: 'leaf', nb: 4, a: .8 }), mk(pts.slice(12), 20 * sc, '#7f9f5f', { prof: 'leaf', nb: 4, a: .8 }), mk(qcurve(0, -36 * sc, 0, 50 * sc, 2, 10), 2.4 * sc, '#4f6a3c', { prof: 'tip', nb: 0, a: .8 })); return S; }],
  ['Kalki', 'yet to come', sc => { const S = []; S.push(mk(qcurve(0, 26 * sc, 0, -52 * sc, 0, 10), 12 * sc, '#a7b2bd', { prof: 'tip', nb: 3, a: .9 })); S.push(edgeOf(S[0], 1, 1.6 * sc, INKB, .7), mk(qcurve(-24 * sc, 26 * sc, 24 * sc, 26 * sc, 0, 6), 8 * sc, '#c99a5b', { prof: 'even', nb: 2, a: .9 }), mk(qcurve(0, 26 * sc, 0, 46 * sc, 0, 4), 9 * sc, '#8a6a44', { prof: 'even', nb: 0, a: .9 })); return S; }],
];
// ---- Shiva ----
function jata(sc) {   // matted locks spreading from the top of the page
  const S = [];
  for (let i = 0; i < 46; i++) {
    const a = Math.PI / 2 + (i / 45 - .5) * 2.6, L = rnd(300, 560) * sc, x0 = rnd(-30, 30) * sc;
    S.push(mk(polar(x0, -60 * sc, a, L, rnd(-90, 90) * sc, 16), rnd(8, 20) * sc, pick(['#4a3a2e', '#5b4636', '#6b5440', '#3e3026']), { prof: 'tip', nb: 3, a: rnd(.35, .6), rough: .3 }));
  }
  return { S };
}
function riverStrokes(path, w0, w1, cols, n = 5) {   // a river: several parallel strokes along a path
  const S = [];
  for (let k = 0; k < n; k++) {
    const off = (k / (n - 1) - .5);
    const sm = []; for (let i = 0; i < path.length - 1; i++) { const p0 = path[Math.max(0, i - 1)], p1 = path[i], p2 = path[i + 1], p3 = path[Math.min(path.length - 1, i + 2)];
      for (let k = 0; k < 8; k++) { const u = k / 8, u2 = u * u, u3 = u2 * u; sm.push([0, 1].map(d => .5 * (2 * p1[d] + (-p0[d] + p2[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3))); } }
    sm.push(path[path.length - 1]);
    const pts = sm.map(([x, y], i) => { const f = i / (sm.length - 1), w = lerp(w0, w1, f); return [x + off * w * .8 + rnd(-2, 2), y]; });
    S.push(mk(pts, lerp(w0, w1, .6) / n * 2.2, pick(cols), { prof: 'even', nb: 4, a: .5, rough: .3 }));
  }
  return S;
}
function damaru(sc) {
  const S = [];
  S.push(mk(qcurve(-40 * sc, -2 * sc, 0, 0, 0, 6), 56 * sc, '#b07a4a', { prof: 'tip', nb: 4, a: .88 }));
  S.push(mk(qcurve(40 * sc, 2 * sc, 0, 0, 0, 6), 56 * sc, '#a06c40', { prof: 'tip', nb: 4, a: .88 }));
  S.push(mk(qcurve(-40 * sc, -28 * sc, -40 * sc, 28 * sc, 0, 6), 5 * sc, INKB, { prof: 'even', nb: 0, a: .8 }), mk(qcurve(40 * sc, -28 * sc, 40 * sc, 28 * sc, 0, 6), 5 * sc, INKB, { prof: 'even', nb: 0, a: .8 }));
  S.push(mk(qcurve(0, 4 * sc, 30 * sc, 60 * sc, 16 * sc, 8), 4 * sc, C.ver, { prof: 'tip', nb: 0, a: .9 }), mk(qcurve(0, 4 * sc, -26 * sc, 58 * sc, -14 * sc, 8), 4 * sc, C.ver2, { prof: 'tip', nb: 0, a: .9 }));
  return { S };
}
function agniBowl(sc) {   // a small fire in a bowl; flames drawn live on top
  const S = [];
  const pts = []; for (let k = 0; k <= 14; k++) { const a = k / 14 * Math.PI; pts.push([Math.cos(a) * 46 * sc, Math.sin(a) * 24 * sc]); }
  S.push(mk(pts.reverse(), 18 * sc, '#8a6a44', { prof: 'even', nb: 4, a: .9 }), mk(qcurve(-48 * sc, 0, 48 * sc, 0, 0, 8), 6 * sc, '#6b5440', { prof: 'even', nb: 0, a: .9 }));
  return { S };
}
