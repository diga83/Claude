// ---------- generators for "The Paper Beneath" (local coords, y up = negative). Call inside withSeed(). ----------
const BLUE = '#2f6fa8', INKP = ['#1f2433', '#2a2440', '#232a3c', '#1c1f2c'];
function mandara(sc) {   // the churning mountain: a tall stony shaft; origin = base centre
  const S = [], H_ = 760 * sc;
  for (let i = 0; i < 18; i++) { const x = rnd(-60, 60) * sc, w = rnd(50, 80) * sc; S.push(mk(qcurve(x, 0, x * .3 + rnd(-10, 10), -H_ * rnd(.8, 1), rnd(-20, 20), 12), w, pick(['#8d8a7e', '#7c7a70', '#9a968a', '#6f6d64']), { prof: 'trunk', nb: 6, a: .55 })); }
  S.push(mk(qcurve(-10 * sc, -H_ * .98, 10 * sc, -H_ * 1.02, 0, 4), 70 * sc, '#a6a294', { prof: 'leaf', nb: 4, a: .6 }));
  for (let i = 0; i < 4; i++) { const y = -rnd(100, 600) * sc; S.push(mk(qcurve(-40 * sc, y, -20 * sc, y - 60 * sc, 6, 5), 3 * sc, INK2, { prof: 'tip', nb: 0, a: .5 })); }
  return { S };
}
function gopuram(sc, cols = ['#d9b77a', '#cfa968', '#e0c088', '#c99a5b']) {   // a tiered temple gateway tower; origin = base centre
  const S = [], tiers = 9, W0 = 170 * sc, H_ = 430 * sc;
  for (let i = 0; i < tiers; i++) {
    const f = i / tiers, y = -f * H_, w = W0 * (1 - f * .6), h = H_ / tiers;
    S.push(mk(qcurve(-w, y - h * .45, w, y - h * .45, 0, 10), h * 1.05, pick(cols), { prof: 'even', nb: 5, a: .78 }));
    S.push(mk(qcurve(-w, y - h * .05, w, y - h * .05, 0, 10), 2.2 * sc, '#8a6a44', { prof: 'even', nb: 0, a: .6 }));
    for (let k = -2; k <= 2; k++) S.push(mk(qcurve(k * w * .35, y - h * .2, k * w * .35, y - h * .7, 0, 3), 6 * sc, '#a77a3e', { prof: 'even', nb: 0, a: .55 }));
  }
  const top = -H_ - 10 * sc, wt = W0 * .4;
  S.push(mk(qcurve(-wt, top, wt, top, -40 * sc, 12), 40 * sc, pick(cols), { prof: 'even', nb: 5, a: .85 }));   // barrel vault
  for (let k = -3; k <= 3; k++) S.push(mk(qcurve(k * wt * .3, top - 28 * sc, k * wt * .3, top - 46 * sc, 0, 3), 9 * sc, '#d9a441', { prof: 'leaf', nb: 0, a: .95 }));   // kalasams
  S.push(mk(qcurve(-W0 * .25, -2, -W0 * .25, -H_ / tiers * 1.4, 0, 4), 34 * sc, '#5b4636', { prof: 'even', nb: 2, a: .7 }));   // the door
  return { S };
}
function lingam(sc, col = ['#5f5a54', '#6b655e', '#55504a'], stipple = false) {   // a rounded form on a pedestal with a spout; origin = base centre
  const S = [];
  for (let i = 0; i < 6; i++) { const y = -i * 9 * sc; S.push(mk(qcurve(-120 * sc + i * 4, y, 120 * sc - i * 4, y, 0, 10), 14 * sc, pick(['#8a8178', '#7d756c', '#968c82']), { prof: 'even', nb: 4, a: .8 })); }
  S.push(mk(qcurve(110 * sc, -24 * sc, 190 * sc, -18 * sc, 4, 6), 22 * sc, '#8a8178', { prof: 'tip', nb: 3, a: .8 }));
  if (stipple) { for (let i = 0; i < 90; i++) { const a = rnd(-Math.PI, 0), r = Math.sqrt(rnd()) * 70 * sc; S.push(mk(qcurve(Math.cos(a) * r * 1.1 - 4, -56 * sc + Math.sin(a) * r * 1.5, Math.cos(a) * r * 1.1 + 4, -56 * sc + Math.sin(a) * r * 1.5, 0, 2), rnd(7, 11) * sc, pick(['#c99a5b', '#d4aa6c', '#bf8f52', '#dcb67e']), { prof: 'leaf', nb: 0, a: .8 })); } }
  else { for (let i = 0; i < 9; i++) { const x = lerp(-60, 60, i / 8) * sc, h = 110 * Math.sqrt(1 - (x / (62 * sc)) ** 2) * sc; S.push(mk(qcurve(x, -50 * sc, x, -50 * sc - h, 0, 8), 18 * sc, pick(col), { prof: 'even', nb: 4, a: .75 })); } }
  return { S };
}
function mangoTree(sc) {
  const S = [], H_ = 360 * sc;
  const tr = mk(qcurve(0, 0, 10 * sc, -H_ * .55, -14 * sc, 10), 30 * sc, '#6b5440', { prof: 'trunk', nb: 3, a: .9 }); S.push(tr, edgeOf(tr, 1, 2 * sc, INK, .7));
  for (const [dx, dy, r] of [[-90, -.62, 110], [80, -.66, 120], [0, -.85, 130], [-30, -.6, 90], [120, -.5, 80]]) clump(S, dx * sc, H_ * dy, r * sc, 30, ['#3f6f4f', '#4e7a52', '#5f8a52', '#355f44'], { l0: 14 * sc, l1: 26 * sc, w0: 8 * sc, w1: 13 * sc, sx: 1.3, sy: .8 });
  for (let i = 0; i < 9; i++) { const x = rnd(-140, 160) * sc, y = -H_ * rnd(.45, .7); S.push(mk(qcurve(x, y, x + 2, y + 16 * sc, 3, 4), 13 * sc, pick(['#e0a83a', '#d9822e', '#e8bd55']), { prof: 'leaf', nb: 0, a: .9 })); }
  return { S };
}
function deepam(sc) {   // a tall brass oil-lamp stand; origin = base; the flame is drawn live at the top
  const S = [], brass = ['#c99a5b', '#b98a4c', '#d4aa6c'];
  S.push(mk(qcurve(-80 * sc, 0, 80 * sc, 0, -10 * sc, 10), 26 * sc, pick(brass), { prof: 'even', nb: 4, a: .85 }));
  const st = mk(qcurve(0, -10 * sc, 0, -520 * sc, 0, 14), 16 * sc, pick(brass), { prof: 'even', nb: 4, a: .85 }); S.push(st, edgeOf(st, 1, 1.6 * sc, INKB, .6));
  for (const y of [-160, -330]) S.push(mk(qcurve(-30 * sc, y * sc, 30 * sc, y * sc, 4 * sc, 6), 22 * sc, pick(brass), { prof: 'leaf', nb: 3, a: .85 }));
  S.push(mk(qcurve(-90 * sc, -540 * sc, 90 * sc, -540 * sc, 30 * sc, 12), 34 * sc, pick(brass), { prof: 'even', nb: 5, a: .9 }));
  return { S, top: [0, -566 * sc] };
}
function curtain(sc) {   // two panels with a golden garland of leaves; returns {L, R}
  const mkPanel = side => { const S = []; for (let i = 0; i < 9; i++) { const x = side * (14 + i * 20) * sc; S.push(mk(qcurve(x, 0, x + side * 6, 560 * sc, side * 8, 14), 26 * sc, i % 3 === 1 ? pick([C.ver, C.ver2]) : pick(['#6e2a2a', '#7a3030', '#622424']), { prof: 'even', nb: 5, a: .85 })); }
    for (let i = 0; i < 9; i++) { const x = side * (16 + i * 20) * sc; S.push(mk(qcurve(x - 6, 8 * sc, x + 6, 8 * sc, -2, 3), 14 * sc, pick(['#e0b04a', '#e8c46a']), { prof: 'leaf', nb: 0, a: .95 })); }
    return S; };
  return { L: mkPanel(-1), R: mkPanel(1) };
}
