// ---------- generators for "The Creator's Hour" (local coords, y up = negative). Call inside withSeed(). ----------
const GOLD = ['#e0b04a', '#d9a441', '#e8c46a', '#cf9a38'];
const eggPt = (u, a, b) => [Math.sin(u) * a * (1 - .12 * Math.cos(u)), -Math.cos(u) * b];   // u: 0 = top, PI = bottom
function egg(sc) {   // returns top and bottom halves (split at y = 0), each a stroke list
  const a = 210 * sc, b = 280 * sc, top = [], bot = [];
  for (let i = 0; i < 22; i++) {   // body washes: vertical-ish strokes inside the outline
    const x = lerp(-a * .85, a * .85, i / 21) + rnd(-8, 8), h = b * Math.sqrt(Math.max(0, 1 - (x / a) ** 2)) * .92;
    top.push(mk(qcurve(x, -h, x + rnd(-6, 6), 0, rnd(-10, 10), 10), rnd(34, 48) * sc, pick(GOLD), { prof: 'even', nb: 5, a: rnd(.32, .45) }));
    bot.push(mk(qcurve(x + rnd(-6, 6), 0, x, h * 1.05, rnd(-10, 10), 10), rnd(34, 48) * sc, pick(GOLD), { prof: 'even', nb: 5, a: rnd(.32, .45) }));
  }
  const rim = (u0, u1) => { const pts = []; for (let k = 0; k <= 24; k++) pts.push(eggPt(lerp(u0, u1, k / 24), a, b)); return pts; };
  for (const [u0, u1, L] of [[-Math.PI / 2, 0, top], [0, Math.PI / 2, top], [Math.PI / 2, Math.PI, bot], [-Math.PI, -Math.PI / 2, bot]]) L.push(mk(rim(u0, u1), 6 * sc, '#a8742a', { prof: 'even', nb: 2, a: .7, rough: .3 }));
  for (let i = 0; i < 6; i++) { const x = rnd(-a * .5, a * .1); top.push(mk(qcurve(x, -b * .55, x + 40 * sc, -b * .7, -8, 6), 10 * sc, '#f3dc9a', { prof: 'leaf', nb: 0, a: .6 })); }
  const crack = [[-a * 1.02, 4 * sc]]; for (let k = 1; k <= 12; k++) crack.push([lerp(-a, a, k / 12), (k % 2 ? -14 : 12) * sc + rnd(-4, 4)]);
  return { top, bot, crack: mk(crack, 4 * sc, INK, { prof: 'even', nb: 0, a: .85, rough: .4 }) };
}
function kamandalu(sc) {   // a brass water pot with a spout and handle; origin = base centre
  const S = [], brass = ['#c99a5b', '#b98a4c', '#d4aa6c'];
  for (let i = 0; i < 14; i++) { const y = -20 * sc - i * 13 * sc, w = 150 * Math.sin(Math.PI * (i + 1) / 16) * sc; S.push(mk(qcurve(-w, y, w, y + rnd(-3, 3), rnd(-6, 6), 12), 22 * sc, pick(brass), { prof: 'leaf', nb: 5, a: .55 })); }
  const neck = mk(qcurve(0, -200 * sc, 0, -270 * sc, 0, 6), 46 * sc, '#b98a4c', { prof: 'even', nb: 5, a: .8 }); S.push(neck);
  S.push(mk(qcurve(-40 * sc, -272 * sc, 40 * sc, -272 * sc, 0, 6), 14 * sc, '#a77a3e', { prof: 'even', nb: 3, a: .9 }));
  const sp = mk(qctrl(120 * sc, -110 * sc, 190 * sc, -140 * sc, 220 * sc, -210 * sc, 10), 16 * sc, '#b98a4c', { prof: 'tip', nb: 3, a: .85 }); S.push(sp, edgeOf(sp, 1, 1.6 * sc, INKB, .6));
  const hd = mk(qctrl(-30 * sc, -262 * sc, -170 * sc, -300 * sc, -130 * sc, -120 * sc, 14), 9 * sc, '#8a6a44', { prof: 'even', nb: 2, a: .85 }); S.push(hd);
  const outline = []; for (let k = 0; k <= 30; k++) { const u = k / 30 * Math.PI; outline.push([-Math.cos(u) * 150 * sc * Math.sin(u * .5 + .7), -20 * sc - Math.sin(u) * 180 * sc]); }
  S.push(mk(outline, 3 * sc, INKB, { prof: 'even', nb: 0, a: .55, rough: .4 }));
  for (let i = 0; i < 4; i++) S.push(mk(qcurve(-90 * sc + i * 10, -150 * sc + i * 16 * sc, -40 * sc + i * 10, -170 * sc + i * 14 * sc, -6, 5), 8 * sc, '#efd9a6', { prof: 'leaf', nb: 0, a: .55 }));
  return { S, spout: [220 * sc, -210 * sc] };
}
function bead(sc, col) { return mk(qcurve(-6 * sc, 0, 6 * sc, 0, 0, 4), 22 * sc, col, { prof: 'leaf', nb: 2, a: .88 }); }
function veena(sc) {   // a long neck between two gourds; origin = centre
  const S = [];
  for (const [x, r] of [[-170, 52], [170, 44]]) { for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; S.push(mk(polar(x * sc + Math.cos(a) * r * .3 * sc, 10 * sc + Math.sin(a) * r * .3 * sc, a, r * .75 * sc, 6, 5), 30 * sc, pick(['#b07a4a', '#a06c40', '#c08a56']), { prof: 'leaf', nb: 3, a: .7 })); } }
  const neck = mk(qcurve(-210 * sc, -8 * sc, 230 * sc, -16 * sc, 6, 18), 20 * sc, '#8a6a44', { prof: 'even', nb: 4, a: .9 }); S.push(neck, edgeOf(neck, -1, 1.6 * sc, INKB, .7));
  for (let i = 0; i < 12; i++) { const x = lerp(-120, 140, i / 11) * sc; S.push(mk(qcurve(x, -20 * sc, x, -10 * sc, 0, 2), 3 * sc, '#e0c088', { prof: 'even', nb: 0, a: .9 })); }
  for (let k = 0; k < 4; k++) S.push(mk(qcurve(-200 * sc, (-14 - k * 2) * sc, 220 * sc, (-22 - k * 2) * sc, 0, 10), 1.2 * sc, INK, { prof: 'even', nb: 0, a: .6 }));
  S.push(mk(qcurve(230 * sc, -16 * sc, 262 * sc, -46 * sc, -6, 6), 12 * sc, '#5f8a52', { prof: 'tip', nb: 2, a: .85 }));   // a small parrot-head scroll, as on many veenas
  return { S };
}
function temple(sc) {   // a north-Indian shikhara with a red spire, a porch, a flag; origin = base centre
  const S = [], H_ = 330 * sc, Wd = 110 * sc;
  for (let i = 0; i < 16; i++) {   // the spire: stacked horizontal strokes narrowing in a curve
    const f = i / 16, y = -90 * sc - f * H_, w = Wd * (1 - Math.pow(f, 1.6) * .82);
    S.push(mk(qcurve(-w, y, w, y - 2, -4 * sc, 10), 24 * sc, f > .25 ? pick([C.ver, C.ver2, '#d0552e']) : pick(['#d9b77a', '#e0c088']), { prof: 'even', nb: 5, a: .8 }));
  }
  for (const d of [-1, 1]) S.push(mk(qcurve(d * Wd, -90 * sc, d * Wd * .2, -90 * sc - H_ * 1.02, d * 30 * sc, 14), 3 * sc, INKB, { prof: 'even', nb: 0, a: .6 }));
  S.push(mk(qcurve(-16 * sc, -90 * sc - H_ - 6 * sc, 16 * sc, -90 * sc - H_ - 6 * sc, 0, 4), 22 * sc, '#e0c088', { prof: 'leaf', nb: 2, a: .9 }));   // the amalaka
  S.push(mk(qcurve(0, -90 * sc - H_ - 14 * sc, 0, -90 * sc - H_ - 90 * sc, 0, 6), 3 * sc, INKB, { prof: 'even', nb: 0, a: .85 }));
  S.push(mk(qcurve(2 * sc, -90 * sc - H_ - 88 * sc, 50 * sc, -90 * sc - H_ - 76 * sc, 6 * sc, 6), 16 * sc, C.ver, { prof: 'tip', nb: 2, a: .9 }));   // flag
  for (let i = 0; i < 6; i++) { const y = -8 * sc - i * 15 * sc; S.push(mk(qcurve(-200 * sc, y, 200 * sc, y, 0, 12), 16 * sc, pick(['#ead7b0', '#e2cfa4', '#f0e2c2']), { prof: 'even', nb: 4, a: .75 })); }   // the hall
  for (let i = 0; i < 7; i++) { const x = lerp(-180, 180, i / 6) * sc; S.push(mk(qcurve(x, -4 * sc, x, -84 * sc, 0, 6), 5 * sc, '#b8a07a', { prof: 'even', nb: 0, a: .8 })); }
  S.push(mk(qcurve(-210 * sc, -92 * sc, 210 * sc, -92 * sc, -6 * sc, 12), 10 * sc, '#c99a5b', { prof: 'even', nb: 2, a: .85 }));
  return { S };
}
function ghats(w, sc) {   // stepped bathing ghats down to the water; origin = left, waterline
  const S = [];
  for (let i = 0; i < 9; i++) { const y = -i * 14 * sc, x0 = i * 6 * sc; S.push(mk(qcurve(x0, y, w - x0, y + rnd(-2, 2), 0, 14), 13 * sc, pick(['#d9c9a6', '#cdb98f', '#e2d4b4']), { prof: 'even', nb: 4, a: .75 })); }
  for (let i = 0; i < 5; i++) { const x = rnd(40, w - 80), y = -130 * sc - rnd(0, 60) * sc, ww = rnd(60, 110) * sc, hh = rnd(50, 90) * sc;
    for (let k = 0; k < 4; k++) S.push(mk(qcurve(x, y - k * hh / 4, x + ww, y - k * hh / 4, 0, 6), hh / 3.4, pick(['#efe3c8', '#e6d6b2', '#f2e8d2']), { prof: 'even', nb: 3, a: .8 }));
    S.push(mk(qcurve(x + ww * .3, y - hh * .3, x + ww * .3, y - hh * .05, 0, 3), 9 * sc, '#6b5a48', { prof: 'even', nb: 0, a: .6 })); }
  return { S };
}
