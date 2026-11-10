// ---------- generators for "Who is Vishnu?" (local coords, y up = negative). Call inside withSeed(). ----------
const AINK = '#4a3a2e';
const wash = (x0, x1, y0, y1, cols, n, a, prof = 'even') =>   // horizontal span x0..x1, vertical span y0..y1
  { const S = []; n = n * 2; for (let i = 0; i < n; i++) { const y = lerp(y0, y1, (i + .5) / n) + rnd(-10, 10); S.push(mk(qcurve(x0, y, x1, y + rnd(-14, 14), rnd(-24, 24), 24), (y1 - y0) / n * 1.7, pick(cols), { prof: 'even', nb: 8, a: rnd(a * .8, a * 1.1), rough: .28 })); } return S; };   // flat horizontal bands
function boat(sc) {
  const S = [];
  const hull = mk(qcurve(-90 * sc, -10 * sc, 90 * sc, -10 * sc, 30 * sc, 12), 34 * sc, '#8a6a44', { prof: 'even', nb: 4, a: .9 }); S.push(hull, edgeOf(hull, 1, 2.4 * sc, AINK, .8));
  S.push(mk(qcurve(0, -20 * sc, 0, -170 * sc, 0, 8), 6 * sc, AINK, { prof: 'even', nb: 0, a: .9 }));
  S.push(mk(qcurve(6 * sc, -160 * sc, 6 * sc, -40 * sc, -50 * sc, 10), 60 * sc, '#efe2c4', { prof: 'leaf', nb: 4, a: .85 }));
  return S;
}
function hornFish(sc) {   // Matsya: a great golden fish with a horn
  const S = [];
  const b = mk(qcurve(-200 * sc, 0, 160 * sc, 0, -30 * sc, 14), 130 * sc, pick(['#d9a441', '#e0b04a']), { prof: 'leaf', nb: 7, a: .85 }); S.push(b, edgeOf(b, 1, 3 * sc, AINK, .7), edgeOf(b, -1, 2 * sc, '#a77a3e', .6));
  for (const d of [-1, 1]) S.push(mk(qcurve(-180 * sc, 0, -300 * sc, d * 90 * sc, d * 10, 8), 60 * sc, '#c99a5b', { prof: 'tip', nb: 4, a: .85 }));
  for (let i = 0; i < 14; i++) { const x = lerp(-140, 110, i / 13) * sc, y = (i % 2 ? -18 : 18) * sc; S.push(mk(qcurve(x - 10 * sc, y, x + 10 * sc, y + 4, 4, 3), 14 * sc, '#cf9a38', { prof: 'leaf', nb: 0, a: .6 })); }
  S.push(mk(qcurve(110 * sc, -50 * sc, 170 * sc, -150 * sc, -10 * sc, 8), 18 * sc, '#efe2c4', { prof: 'tip', nb: 2, a: .95 }));   // the horn
  S.push(mk(qcurve(120 * sc, -14 * sc, 124 * sc, -14 * sc, 0, 2), 12 * sc, INK, { prof: 'even', nb: 0, a: .95 }));
  return S;
}
function boar(sc) {   // Varaha rising from the water, the earth on his tusks
  const S = [];
  const b = mk(qcurve(-170 * sc, 40 * sc, 120 * sc, -10 * sc, -50 * sc, 14), 170 * sc, '#3a3633', { prof: 'leaf', nb: 7, a: .85 }); S.push(b);
  S.push(mk(qcurve(110 * sc, -20 * sc, 220 * sc, -70 * sc, -10 * sc, 8), 90 * sc, '#2f2c2a', { prof: 'tip', nb: 5, a: .9 }));   // head and snout
  for (let i = 0; i < 9; i++) { const x = lerp(-140, 60, i / 8) * sc; S.push(mk(qcurve(x, -60 * sc, x + 10 * sc, -100 * sc, 4, 4), 10 * sc, '#26231f', { prof: 'tip', nb: 0, a: .8 })); }   // bristles
  S.push(mk(qctrl(200 * sc, -60 * sc, 250 * sc, -60 * sc, 240 * sc, -130 * sc, 8), 14 * sc, '#efe6d2', { prof: 'tip', nb: 2, a: .95 }));   // tusk
  S.push(mk(qcurve(150 * sc, -70 * sc, 154 * sc, -70 * sc, 0, 2), 9 * sc, '#c8442a', { prof: 'even', nb: 0, a: .95 }));
  return S;
}
function earthDisc(sc) { const S = []; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; S.push(mk(polar(Math.cos(a) * 20 * sc, Math.sin(a) * 20 * sc, a + 1.4, 70 * sc, 6, 6), 50 * sc, pick(['#6f8faa', '#7f9f5f', '#5f80a0', '#8ea860']), { prof: 'leaf', nb: 3, a: .8 })); } const rim = []; for (let k = 0; k <= 30; k++) { const a = k / 30 * Math.PI * 2; rim.push([Math.cos(a) * 82 * sc, Math.sin(a) * 82 * sc]); } S.push(mk(rim, 3 * sc, AINK, { prof: 'even', nb: 0, a: .6, rough: .4 })); return S; }
function splitPillar(sc) {   // Narasimha: a stone pillar on a threshold, split open by a burst of mane
  const S = [];
  for (const sd of [-1, 1]) { const p = mk(qcurve(sd * 50 * sc, 0, sd * 70 * sc, -560 * sc, sd * 20 * sc, 12), 80 * sc, pick(['#b8a07a', '#c9b48e']), { prof: 'even', nb: 6, a: .85 }); S.push(p, edgeOf(p, sd, 3 * sc, AINK, .7)); }
  S.push(mk(qcurve(-260 * sc, 10 * sc, 260 * sc, 10 * sc, 0, 12), 30 * sc, '#8a7a62', { prof: 'even', nb: 5, a: .85 }));   // the doorstep
  return S;
}
function mane(sc) { const S = []; for (let i = 0; i < 26; i++) { const a = -Math.PI / 2 + (i / 25 - .5) * 2.6; S.push(mk(polar(0, 0, a, rnd(150, 240) * sc, rnd(-20, 20), 8), rnd(22, 34) * sc, pick(['#d9822e', '#e0a83a', '#c9702a', '#c8442a']), { prof: 'tip', nb: 4, a: .8 })); } for (const d of [-1, 1]) S.push(mk(qcurve(d * 30 * sc, -30 * sc, d * 34 * sc, -30 * sc, 0, 2), 14 * sc, '#2f2c2a', { prof: 'leaf', nb: 0, a: .95 })); return S; }
function axe(sc) { const S = []; S.push(mk(qcurve(0, 0, 30 * sc, -420 * sc, 10 * sc, 12), 16 * sc, '#8a6a44', { prof: 'even', nb: 3, a: .9 })); const bl = mk(qcurve(10 * sc, -420 * sc, 140 * sc, -330 * sc, -60 * sc, 10), 90 * sc, '#8d9aa9', { prof: 'leaf', nb: 5, a: .9 }); S.push(bl, edgeOf(bl, -1, 3 * sc, AINK, .7)); S.push(mk(qcurve(-90 * sc, 20 * sc, 90 * sc, 20 * sc, -10 * sc, 8), 50 * sc, '#6b5440', { prof: 'even', nb: 4, a: .85 })); return S; }
function bowArrow(sc) {
  const S = [], pts = []; for (let k = 0; k <= 20; k++) { const a = -1.2 + k / 20 * 2.4; pts.push([-60 * sc + Math.cos(a) * 260 * sc, Math.sin(a) * 260 * sc]); }
  const b = mk(pts, 18 * sc, '#8a6a44', { prof: 'leaf', nb: 4, a: .9 }); S.push(b, edgeOf(b, 1, 2.4 * sc, AINK, .7));
  S.push(mk([pts[0], pts[20]], 2.4 * sc, AINK, { prof: 'even', nb: 0, a: .8 }));
  S.push(mk(qcurve(-60 * sc, 0, 280 * sc, 0, 0, 12), 5 * sc, AINK, { prof: 'even', nb: 0, a: .9 }), mk(qcurve(250 * sc, -12 * sc, 290 * sc, 0, 0, 4), 20 * sc, '#8d9aa9', { prof: 'tip', nb: 0, a: .95 }));
  for (const d of [-1, 1]) S.push(mk(qcurve(-50 * sc, 0, -20 * sc, d * 18 * sc, 0, 4), 10 * sc, '#c8442a', { prof: 'leaf', nb: 0, a: .9 }));
  return S;
}
function cityWalls(sc) { const S = []; for (let i = 0; i < 4; i++) S.push(mk(qcurve(-480 * sc, -i * 26 * sc, 480 * sc, -i * 26 * sc, 0, 16), 30 * sc, pick(['#d4aa6c', '#c99a5b', '#dcb67e']), { prof: 'even', nb: 5, a: .75 })); for (let i = 0; i < 9; i++) { const x = lerp(-440, 440, i / 8) * sc; S.push(mk(qcurve(x, -100 * sc, x, -170 * sc - (i % 3 === 1 ? 80 : 0) * sc, 0, 6), 50 * sc, pick(['#d4aa6c', '#c99a5b']), { prof: 'even', nb: 4, a: .8 })); if (i % 3 === 1) S.push(mk(qcurve(x - 30 * sc, -250 * sc, x + 30 * sc, -250 * sc, -30 * sc, 8), 26 * sc, '#c8442a', { prof: 'even', nb: 3, a: .8 })); } return S; }
function whiteCow(sc) {
  const S = [], body = mk(qcurve(-150 * sc, 0, 120 * sc, -6 * sc, -20 * sc, 14), 120 * sc, '#f2ecdf', { prof: 'even', nb: 5, a: .95 }); S.push(body, edgeOf(body, 1, 3 * sc, AINK, .7), edgeOf(body, -1, 3 * sc, AINK, .7));
  for (const x of [-120, -80, 70, 110]) S.push(mk(qcurve(x * sc, 40 * sc, x * sc + 4, 150 * sc, 0, 6), 22 * sc, '#ebe4d4', { prof: 'even', nb: 2, a: .95 }), mk(qcurve(x * sc - 11 * sc, 40 * sc, x * sc - 9 * sc, 150 * sc, 0, 6), 2.4 * sc, AINK, { prof: 'even', nb: 0, a: .7 }));
  const head = mk(qcurve(140 * sc, -30 * sc, 210 * sc, 10 * sc, -6, 6), 60 * sc, '#f2ecdf', { prof: 'leaf', nb: 3, a: .95 }); S.push(head, edgeOf(head, 1, 2.4 * sc, AINK, .7), edgeOf(head, -1, 2.4 * sc, AINK, .7));
  S.push(mk(qcurve(160 * sc, -56 * sc, 190 * sc, -100 * sc, 10, 5), 8 * sc, AINK, { prof: 'tip', nb: 0, a: .85 }), mk(qcurve(180 * sc, -50 * sc, 220 * sc, -80 * sc, 8, 5), 8 * sc, AINK, { prof: 'tip', nb: 0, a: .85 }));
  S.push(mk(qcurve(-30 * sc, -10 * sc, 40 * sc, 6 * sc, 6, 6), 60 * sc, '#d4aa6c', { prof: 'leaf', nb: 3, a: .6 }));
  return S;
}
function bodhiTree(sc) {
  const S = [], tr = mk(qcurve(0, 0, -10 * sc, -360 * sc, -20 * sc, 12), 60 * sc, '#6b5440', { prof: 'trunk', nb: 4, a: .9 }); S.push(tr, edgeOf(tr, 1, 3 * sc, INK, .7));
  for (const [dx, dy, r] of [[-200, -420, 170], [180, -440, 170], [0, -560, 190], [-90, -330, 140], [130, -320, 130]]) {
    for (let i = 0; i < 26; i++) { const a = rnd(0, 6.3), rr = Math.sqrt(rnd()) * r * sc, x = dx * sc + Math.cos(a) * rr * 1.2, y = dy * sc + Math.sin(a) * rr * .7; const L = rnd(22, 34) * sc;
      S.push(mk(qcurve(x, y, x + 2, y + L, rnd(-4, 4), 5), L * .9, pick(['#5f8a52', '#6f9a5a', '#4e7a52', '#7fa860']), { prof: 'leaf', nb: 2, a: .8 })); }
  }
  return S;
}
function plough(sc) { const S = []; S.push(mk(qcurve(0, 0, -140 * sc, -150 * sc, 10, 10), 10 * sc, '#8a6a44', { prof: 'even', nb: 2, a: .9 }), mk(qcurve(-10 * sc, 0, 60 * sc, 20 * sc, 4, 6), 22 * sc, '#8d9aa9', { prof: 'tip', nb: 2, a: .9 }), mk(qcurve(-140 * sc, -150 * sc, -170 * sc, -130 * sc, 0, 4), 8 * sc, '#8a6a44', { prof: 'even', nb: 0, a: .9 })); return S; }
function whiteHorse(sc) {   // Kalki's horse at a gallop: paper white with ink edges
  const S = [];
  const body = mk(qcurve(-160 * sc, 0, 120 * sc, -20 * sc, -20 * sc, 14), 120 * sc, '#f6f1e6', { prof: 'even', nb: 4, a: .95 }); S.push(body, edgeOf(body, 1, 3 * sc, AINK, .75), edgeOf(body, -1, 3 * sc, AINK, .75));
  const neck = mk(qcurve(90 * sc, -40 * sc, 190 * sc, -190 * sc, 20 * sc, 10), 64 * sc, '#f6f1e6', { prof: 'even', nb: 3, a: .95 }); S.push(neck, edgeOf(neck, -1, 3 * sc, AINK, .75));
  const head = mk(qcurve(180 * sc, -200 * sc, 280 * sc, -150 * sc, -10, 8), 54 * sc, '#f6f1e6', { prof: 'leaf', nb: 3, a: .95 }); S.push(head, edgeOf(head, 1, 2.4 * sc, AINK, .75), edgeOf(head, -1, 2.4 * sc, AINK, .75));
  for (let i = 0; i < 9; i++) S.push(mk(qcurve(150 * sc - i * 8 * sc, -200 * sc + i * 18 * sc, 100 * sc - i * 12 * sc, -190 * sc + i * 22 * sc, 6, 5), 10 * sc, pick(['#d9a441', '#c99a5b']), { prof: 'tip', nb: 0, a: .9 }));   // mane
  for (const [x0, y0, x1, y1] of [[-130, 40, -230, 110], [-100, 40, -60, 150], [80, 30, 190, 80], [100, 30, 60, 150]]) S.push(mk(qcurve(x0 * sc, y0 * sc, x1 * sc, y1 * sc, 10, 6), 22 * sc, '#efe9dc', { prof: 'tip', nb: 2, a: .95 }), mk(qcurve(x0 * sc - 8 * sc, y0 * sc, x1 * sc - 6 * sc, y1 * sc, 10, 6), 2.4 * sc, AINK, { prof: 'even', nb: 0, a: .7 }));
  S.push(mk(qcurve(-160 * sc, -10 * sc, -260 * sc, 40 * sc, 20, 8), 26 * sc, '#d9a441', { prof: 'tip', nb: 4, a: .85 }));   // tail
  S.push(mk(qcurve(240 * sc, -170 * sc, 244 * sc, -170 * sc, 0, 2), 9 * sc, INK, { prof: 'even', nb: 0, a: .95 }));
  S.push(mk(qcurve(20 * sc, -80 * sc, 60 * sc, -360 * sc, 0, 8), 10 * sc, '#c4ccd2', { prof: 'tip', nb: 2, a: .95 }));   // a raised sword
  return S;
}
