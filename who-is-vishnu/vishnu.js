// ---------- generators for "An Ocean, a Step, a Stone" (local coords, y up = negative). Call inside withSeed(). ----------
const VBLUE = ['#3d6fa8', '#4f7fb6', '#5f8ac0', '#2f5f98'];
function garudaWing(sc, side) {   // one wing, root at 0,0, spreading to side (+1 right, -1 left)
  const S = [];
  for (let i = 0; i < 11; i++) {
    const a = -Math.PI / 2 + side * (.5 + i / 10 * 1.35), L = (200 + i * 22) * sc * (i > 7 ? .9 : 1);
    S.push(mk(qcurve(0, 0, Math.cos(a) * L, Math.sin(a) * L * .8, side * 12 * sc, 10), (38 - i) * sc, pick(['#b8643a', '#c97a44', '#a85a32']), { prof: 'leaf', nb: 5, a: .72 }));
    S.push(mk(qcurve(Math.cos(a) * L * .7, Math.sin(a) * L * .56, Math.cos(a) * L * 1.04, Math.sin(a) * L * .84, 4, 6), 18 * sc, pick(['#5b3a26', '#6b4430']), { prof: 'tip', nb: 2, a: .7 }));
  }
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + side * (.4 + i / 6 * 1.1); S.push(mk(polar(0, 0, a, 120 * sc, side * 6, 6), 26 * sc, pick(['#d9a441', '#e0b04a']), { prof: 'leaf', nb: 3, a: .7 })); }
  return S;
}
function garudaBody(sc) {
  const S = [];
  S.push(mk(qcurve(0, -40 * sc, 0, 160 * sc, 0, 10), 90 * sc, '#c9883e', { prof: 'leaf', nb: 6, a: .8 }));   // body
  for (let i = 0; i < 7; i++) { const a = Math.PI / 2 + (i / 6 - .5) * .9; S.push(mk(polar(0, 150 * sc, a, 130 * sc, 6, 8), 24 * sc, pick(['#b8643a', '#a85a32', '#c97a44']), { prof: 'leaf', nb: 4, a: .75 })); }   // tail fan
  S.push(mk(qcurve(0, -60 * sc, 0, -130 * sc, 0, 6), 56 * sc, '#e8d8b0', { prof: 'leaf', nb: 4, a: .9 }));   // head
  S.push(mk(qctrl(14 * sc, -112 * sc, 52 * sc, -110 * sc, 38 * sc, -84 * sc, 6), 14 * sc, '#d9822e', { prof: 'tip', nb: 2, a: .95 }));   // hooked beak
  S.push(mk(qcurve(8 * sc, -110 * sc, 10 * sc, -110 * sc, 0, 2), 6 * sc, INK, { prof: 'even', nb: 0, a: .95 }));
  S.push(mk(qcurve(-30 * sc, -150 * sc, 30 * sc, -150 * sc, -14 * sc, 8), 14 * sc, '#d9a441', { prof: 'even', nb: 3, a: .9 }));   // a small crest
  return S;
}
function mace(sc) {   // gada: a shaft and a ribbed head; origin = bottom of the shaft
  const S = [];
  S.push(mk(qcurve(0, 0, 0, -200 * sc, 0, 10), 12 * sc, '#8a6a44', { prof: 'even', nb: 2, a: .9 }));
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; S.push(mk(polar(0, -250 * sc, a, 46 * sc, 6, 5), 30 * sc, pick(['#d9a441', '#c99a5b', '#e0b04a']), { prof: 'leaf', nb: 3, a: .82 })); }
  S.push(mk(qcurve(0, -296 * sc, 0, -320 * sc, 0, 3), 14 * sc, '#e0b04a', { prof: 'leaf', nb: 0, a: .9 }));
  return S;
}
function footprint(sc) {   // a revered footprint: blue sole, gold rim, five toes, a small wheel inside; origin = centre; toes point up
  const S = [], L = 300 * sc, Wd = 110 * sc;
  for (let i = 0; i < 7; i++) { const x = lerp(-Wd * .55, Wd * .55, i / 6); S.push(mk(qcurve(x * .7, L * .45, x, -L * .25, x * .2, 12), 44 * sc, pick(VBLUE), { prof: 'leaf', nb: 5, a: .38 })); }
  const rim = []; for (let k = 0; k <= 40; k++) { const u = k / 40 * Math.PI * 2, x = Math.sin(u) * Wd * (Math.cos(u) < 0 ? .62 : .45 + .17 * (1 - Math.cos(u))) , y = -Math.cos(u) * L * .5 + L * .02; rim.push([x, y]); }
  S.push(mk(rim, 5 * sc, '#d9a441', { prof: 'even', nb: 2, a: .8, rough: .3 }));
  [[-56, -.6, 26], [-26, -.68, 22], [4, -.7, 20], [32, -.66, 18], [56, -.58, 16]].forEach(([x, y, r]) => S.push(mk(qcurve(x * sc, y * L - r * .4 * sc, x * sc, y * L + r * .4 * sc, 0, 4), r * 1.6 * sc, pick(VBLUE), { prof: 'leaf', nb: 2, a: .55 })));
  const wl = []; for (let k = 0; k <= 24; k++) { const a = k / 24 * Math.PI * 2; wl.push([Math.cos(a) * 34 * sc, -L * .1 + Math.sin(a) * 34 * sc]); } S.push(mk(wl, 4 * sc, '#d9a441', { prof: 'even', nb: 0, a: .85 }));
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; S.push(mk(qcurve(0, -L * .1, Math.cos(a) * 32 * sc, -L * .1 + Math.sin(a) * 32 * sc, 0, 3), 2.4 * sc, '#d9a441', { prof: 'even', nb: 0, a: .8 })); }
  return S;
}
function crown(sc) {   // a king's crown on a cushion; origin = base centre
  const S = [];
  for (let i = 0; i < 4; i++) S.push(mk(qcurve(-120 * sc, -i * 12 * sc + 30 * sc, 120 * sc, -i * 12 * sc + 30 * sc, -10 * sc, 10), 22 * sc, pick([C.ver, C.ver2, '#b23a22']), { prof: 'leaf', nb: 4, a: .75 }));
  S.push(mk(qcurve(-80 * sc, -30 * sc, 80 * sc, -30 * sc, 0, 10), 40 * sc, '#d9a441', { prof: 'even', nb: 5, a: .9 }));
  for (let i = 0; i < 5; i++) { const x = lerp(-70, 70, i / 4) * sc, h = (i === 2 ? 110 : i % 2 ? 70 : 85) * sc; S.push(mk(qcurve(x, -40 * sc, x, -40 * sc - h, 0, 6), 26 * sc, pick(['#d9a441', '#e0b04a', '#cf9a38']), { prof: 'tip', nb: 3, a: .9 })); }
  for (let i = 0; i < 3; i++) S.push(mk(qcurve(lerp(-50, 50, i / 2) * sc - 4, -30 * sc, lerp(-50, 50, i / 2) * sc + 4, -30 * sc, 0, 2), 14 * sc, i === 1 ? '#2f6fa8' : C.ver, { prof: 'leaf', nb: 0, a: .95 }));
  return S;
}
function stoneShaligram(sc) {   // a dark river stone with an ammonite spiral; origin = centre
  const S = [], R = 230 * sc;
  for (let i = 0; i < 16; i++) { const y = lerp(-R * .8, R * .8, i / 15), w = R * Math.sqrt(1 - (y / (R * .88)) ** 2) * .98; S.push(mk(qcurve(-w, y, w, y + rnd(-6, 6), rnd(-10, 10), 12), R * .16, pick(['#2f2c2a', '#3a3633', '#26231f']), { prof: 'even', nb: 6, a: .7 })); }
  for (let i = 0; i < 26; i++) { const a = rnd(0, 6.3), r = Math.sqrt(rnd()) * R * .75; S.push(mk(polar(Math.cos(a) * r, Math.sin(a) * r * .86, a + rnd(-1, 1), rnd(80, 140) * sc, rnd(-20, 20), 6), rnd(70, 100) * sc, pick(['#2f2c2a', '#3a3633', '#26231f', '#45403a']), { prof: 'leaf', nb: 5, a: .5 })); }
  const rim = []; for (let k = 0; k <= 40; k++) { const a = k / 40 * Math.PI * 2; rim.push([Math.cos(a) * R * (1 + .05 * Math.sin(a * 3)), Math.sin(a) * R * .88]); }
  S.push(mk(rim, 4 * sc, INK, { prof: 'even', nb: 0, a: .5, rough: .4 }));
  return S;
}
function ammonite(sc, turns = 3.2) {   // a log spiral with ribs; origin = centre
  const S = [], b = Math.log(180 / 8) / (turns * Math.PI * 2), pts = [];
  for (let i = 0; i <= 160; i++) { const th = i / 160 * turns * Math.PI * 2, r = 8 * Math.exp(b * th) * sc; pts.push([Math.cos(th) * r, Math.sin(th) * r]); }
  S.push(mk(pts, 5 * sc, '#cdbf9a', { prof: 'even', nb: 2, a: .85, rough: .25 }));
  for (let i = 12; i <= 160; i += 4) { const th = i / 160 * turns * Math.PI * 2, r = 8 * Math.exp(b * th) * sc, r0 = r * Math.exp(-b * Math.PI * 2); S.push(mk(qcurve(Math.cos(th) * r0, Math.sin(th) * r0, Math.cos(th) * r, Math.sin(th) * r, 2, 3), 2.2 * sc, '#b8a77e', { prof: 'even', nb: 0, a: .7 })); }
  return S;
}
function templeWall(sc) {   // a Kerala temple front: sloping roofs, a stone wall with three doorways; origin = centre of the wall
  const S = [];
  for (let i = 0; i < 6; i++) S.push(mk(qcurve(-600, -360 + i * 26, 600, -360 + i * 26, i < 3 ? -30 : 0, 16), 30, pick(['#5b3a26', '#6b4430', '#4e3020']), { prof: 'even', nb: 6, a: .8 }));   // roof
  for (let i = 0; i < 4; i++) S.push(mk(qcurve(-560, -440 + i * 20, 560, -440 + i * 20, 40, 16), 24, pick(['#7a5236', '#6b4430']), { prof: 'leaf', nb: 5, a: .75 }));
  for (let i = 0; i < 18; i++) { const y = -200 + i * 30; S.push(mk(qcurve(-600, y, 600, y + rnd(-4, 4), 0, 16), 30, pick(['#c9a46a', '#bf9a5e', '#d4b07a']), { prof: 'even', nb: 6, a: .7 })); }   // wall
  for (let i = 0; i < 40; i++) { const x = lerp(-520, 520, i / 39); S.push(mk(qcurve(x - 3, 330, x + 3, 330, 0, 2), 7, C.ver, { prof: 'leaf', nb: 0, a: .85 })); }   // lamps along the base
  return S;
}
