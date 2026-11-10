// The Paper Beneath — Shiva. Scenes and timeline (helpers in main.js). 1080x1920, render(t) is a pure function of t.
const BEAT = 60 / 72, BAR = BEAT * 4, bar = n => n * BAR;   // 72 BPM
const P = [bar(17), bar(21.5), bar(26), bar(30.5), bar(35)];   // the five element pages (15 s each; space runs to the mist)
const SYL = [bar(42), bar(42.5), bar(43), bar(43.5), bar(44)];
const VOICE = [['v01', .8], ['v02', 7.2], ['v03', 11.0], ['v04', 18.0], ['v05', 30.8], ['v06', 44.2], ['e1', P[0] + .8], ['e2', P[1] + .8], ['e3', P[2] + .8], ['e4', P[3] + .8],
  ['e5', P[4] + .8], ['v07', 122.6], ['v08', 135.8], ...SYL.map((t, i) => ['y' + (i + 1), +(t + .02).toFixed(3)]), ['v09', bar(45.5)], ['v10', 164.0]];
const TXT = {
  v01: [5.461, 'When the gods and the demons churned the ocean of milk, the first thing it gave up was poison.'], v02: [2.848, 'Halahala: dark enough to end every world.'],
  v03: [5.77, 'Shiva took it in his hands, and drank it. He held it in his throat, and his throat turned blue.'],
  v04: [6.872, 'So he is called Neelakantha, the blue-throated one: the destroyer who saved the world from destruction.'],
  v05: [8.772, 'He is the ascetic of Mount Kailash, the first of all yogis, and the dancer whose steps undo the world, so that it can begin again.'],
  v06: [6.443, 'In the south of India, five great temples honour him as the five elements of which everything is made.'],
  e1: [6.792, 'Earth, at Kanchipuram, where he is worshipped in a lingam of sand, beneath an ancient mango tree.'],
  e2: [7.142, 'Water, at Thiruvanaikaval, where a spring rises in the sanctum, and the shrine is never fully dry.'],
  e3: [8.104, 'Fire, at Tiruvannamalai. Each year, at the festival of Karthigai, a great flame is lit on the summit of the hill.'],
  e4: [6.784, 'Air, at Srikalahasti, where a lamp in the inner shrine is said to flicker, though no wind can reach it.'],
  e5: [4.008, 'And space, at Chidambaram, where he dances as Nataraja.'],
  v07: [9.042, 'Behind a curtain there, the secret of Chidambaram is revealed: an empty space. Nothing to see, because the formless has no form.'],
  v08: [3.496, 'His mantra has five syllables, one for each element.'], v09: [1.663, 'Om Namah Shivaya.'],
  v10: [5.812, 'The world is painted, kept, and washed away. And the paper beneath it was always there.'] };
const SUBS = VOICE.filter(([id]) => TXT[id]).map(([id, t]) => [t, TXT[id][0], TXT[id][1]]);
SUBS.push([SYL[0], SYL[4] + .6 - SYL[0], 'Na. Ma. Shi. Va. Ya.']); SUBS.sort((a, b) => a[0] - b[0]);
const DUR = 180; window.DUR = DUR;

const EL = [['EARTH', 'PRITHVI', 'Kanchipuram', 'EKAMBARESWARAR TEMPLE · TAMIL NADU', '#c99a5b'], ['WATER', 'APAS', 'Thiruvanaikaval', 'JAMBUKESWARAR TEMPLE · TAMIL NADU', '#4f7090'],
  ['FIRE', 'AGNI', 'Tiruvannamalai', 'ARUNACHALESWARAR TEMPLE · TAMIL NADU', '#c8442a'], ['AIR', 'VAYU', 'Srikalahasti', 'SRIKALAHASTEESWARA TEMPLE · ANDHRA PRADESH', '#9aa7b4'],
  ['SPACE', 'AKASHA', 'Chidambaram', 'THILLAI NATARAJA TEMPLE · TAMIL NADU', null]];
const A = {}, K = {}, I = {}, Ep = [{}, {}, {}, {}, {}], Y = {};

// ================= A: the churning, the poison, the blue throat =================
function poisonPoly(c, cx, cy, r, col, a, seed) {
  for (let pass = 0; pass < 4; pass++) {
    c.beginPath();
    for (let i = 0; i <= 48; i++) { const an = i / 48 * Math.PI * 2, rr = r * (1 + .2 * (vnoise(i * .55 + pass * 9 + seed) - .5)); const x = cx + Math.cos(an) * rr, y = cy + Math.sin(an) * rr; i ? c.lineTo(x, y) : c.moveTo(x, y); }
    c.closePath(); c.fillStyle = rgba(col, a / 2.2); c.fill();
  }
}
function sceneA(c, t) {
  c.save();
  const s = 1 + .12 * eio(seg(t, 6.6, 12)) + .14 * eio(seg(t, 16, 22)) - .1 * eio(seg(t, 26, 30));
  camAt(c, s, 540, 900);
  draw(c, A.ocean, t); draw(c, A.ropeL, t); draw(c, A.ropeR, t); draw(c, A.mount, t);
  if (t > 2.6) { const sp = t < 12 ? 70 : 25; for (let k = 0; k < 9; k++) { const y = 1230 - ((k * 84 + t * sp) % 756); c.save(); c.translate(540, y); drawS(c, A.wrap, 1, null, ss(seg(t, 2.6 + k * .1, 3.4 + k * .1))); c.restore(); } }
  // the poison: blooms out over everything, then gathers into one disc that turns blue
  const grow = eio(seg(t, 6.6, 11.5)), gather = eio(seg(t, 11.8, 15.6)), blue = ss(seg(t, 15.4, 16.9));
  if (grow > 0) {
    const r = lerp(30 + 1500 * grow, 74, gather), cx = 540, cy = lerp(1150, 290, gather);
    poisonPoly(c, cx, cy, r, mixc(INKP[0], BLUE, blue), lerp(.9, .95, blue), 3);
    if (blue > 0) draw(c, A.ring, t);
  }
  c.restore();
  const [ax, ay] = [540, 960 + (290 - 900) * s];
  note(c, t, 18.6, 29.6, 70, 470, ax - 90, ay + 20, 'Neelakantha', 'the blue-throated', 'nk', -40);
}
// ================= K: Kailash =================
function sceneK(c, t) {
  c.save(); camAt(c, 1, 540, lerp(820, 960, eio(seg(t, 31, 38))));
  draw(c, K.sky, t); draw(c, K.peak, t); draw(c, K.moon, t); draw(c, K.hills, t); draw(c, K.tri, t);
  c.restore();
  note(c, t, 34.6, 43.2, 70, 1180, 520, 860, 'Adiyogi', 'the first yogi', 'adi', 40);
}
// ================= I: the five elements, an index =================
function sceneI(c, t) {
  mono(c, 'THE FIVE ELEMENTS', 540, 230, fade2(t, 44.4, 56.6, .6, .4), 'idx', { size: 28, sp: 8 });
  hand(c, 'pancha bhuta', 540, 292, seg(t, 45.0, 45.8), { size: 50, w: 500, align: 'center', id: 'idx2', alpha: 1 - ss(seg(t, 56.2, 56.6)) });
  EL.forEach(([en, sk], i) => {
    const t0 = bar(15.25) + i * BEAT, y = 480 + i * 225, p = seg(t, t0, t0 + .7); if (p <= 0) return;
    c.save(); c.translate(380, y); drawList(c, I.bg, clamp(p * 1.5)); if (I.sym[i].length) drawList(c, I.sym[i], clamp(p * 1.5 - .5)); c.restore();
    mono(c, sk, 500, y - 18, ss(seg(t, t0 + .3, t0 + .8)), 'is' + i, { align: 'left', size: 22, sp: 5 });
    hand(c, en.toLowerCase(), 500, y + 24, seg(t, t0 + .5, t0 + 1.1), { size: 42, w: 500, id: 'ie' + i });
  });
}
// ================= the element pages =================
function header(c, t, k) {
  const t0 = P[k] + .3, f = 1 - ss(seg(t, (k < 4 ? P[k + 1] : 133.4) - .5, (k < 4 ? P[k + 1] : 133.4))), light = k === 2;
  mono(c, `0${k + 1} · ${EL[k][0]} · ${EL[k][1]}`, 540, 200, ss(seg(t, t0, t0 + .6)) * f, 'h' + k, { size: 24, sp: 6, light });
  hand(c, EL[k][2], 540, 272, seg(t, t0 + .5, t0 + 1.3), { size: 66, align: 'center', id: 'hp' + k, alpha: f, light });
  mono(c, EL[k][3], 540, 336, ss(seg(t, t0 + 1.0, t0 + 1.6)) * f, 'ht' + k, { size: 16, sp: 2, light });
}
function pageEarth(c, t) {
  c.save(); camAt(c, 1 + .05 * eio(seg(t, P[0], P[1])), 540, 1000);
  const e = Ep[0]; draw(c, e.ground, t); draw(c, e.gop, t); draw(c, e.tree, t); draw(c, e.ling, t); c.restore(); header(c, t, 0);
}
function pageWater(c, t) {
  c.save(); camAt(c, 1 + .05 * eio(seg(t, P[1], P[2])), 540, 1000);
  const e = Ep[1]; draw(c, e.gop, t); draw(c, e.ling, t); draw(c, e.water, t);
  for (let k = 0; k < 4; k++) { const u = ((t - P[1] - 2) / 2.4 + k / 4) % 1; if (t < P[1] + 2) break; c.save(); c.translate(480, 1300); c.scale(.4 + u * 2.4, .4 + u * 2.4); drawS(c, e.ring, 1, null, 1 - u); c.restore(); }
  c.restore(); header(c, t, 1);
}
function flames(c, x, y, n, sc, t, seed, p = 1) {
  for (let i = 0; i < n; i++) { const fl = .7 + .45 * vnoise(t * 5.5 + i * 3.1 + seed), sk = (vnoise(t * 3 + i * 1.7 + seed) - .5) * .4; c.save(); c.translate(x + (i - (n - 1) / 2) * 16 * sc, y); c.transform(1, 0, sk, 1, 0, 0); c.scale(sc, sc * fl * eo(p)); for (const s of FL[i % FL.length]) drawS(c, s, 1); c.restore(); }
}
function pageFire(c, t) {
  c.save(); camAt(c, 1 + .06 * eio(seg(t, P[2], P[3])), 540, 980);
  const e = Ep[2]; draw(c, e.sky, t); draw(c, e.hill, t); draw(c, e.ground, t);
  const lp = seg(t, P[2] + 2.4, P[2] + 4.4);
  if (lp > 0) for (let i = 0; i < 70; i++) { const x = 40 + hash(i) * 1000, y = 1330 + hash(i * 3.3) * 200, a = (.5 + .5 * vnoise(t * 4 + i)) * clamp(lp * 3 - hash(i * 7) * 2); c.fillStyle = rgba(i % 3 ? '#e09a3a' : C.ver, .9 * a); c.beginPath(); c.arc(x, y, 3.5, 0, 7); c.fill(); }
  const fp = seg(t, P[2] + 4.4, P[2] + 5.6); if (fp > 0) { flames(c, 540, 700, 9, 2.2, t, 1, fp); for (let i = 0; i < 26; i++) { const u = (t * .4 + hash(i)) % 1, x = 540 + (hash(i * 2.2) - .5) * 160 + Math.sin(t * 2 + i) * 20, y = 640 - u * 420; c.fillStyle = rgba(i % 2 ? '#e09a3a' : C.ver, .8 * (1 - u) * fp); c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); } }
  c.restore(); header(c, t, 2);
}
function pageAir(c, t) {
  c.save(); camAt(c, 1 + .05 * eio(seg(t, P[3], P[4])), 540, 980);
  const e = Ep[3]; draw(c, e.hills, t); draw(c, e.lamp, t);
  for (let k = 0; k < 9; k++) { const w = seg(t, P[3] + 1 + k * .3, P[3] + 2 + k * .3); if (w <= 0) continue; const x = ((t - P[3]) * 240 + k * 280) % 1700 - 300, y = 520 + k * 120; c.save(); c.translate(x, y); drawS(c, e.wind[k], 1, null, .5 * w); c.restore(); }
  const fp = seg(t, P[3] + 3.4, P[3] + 4.2); if (fp > 0) flames(c, 540, 924, 1, 2.0, t * 1.6, 5, fp);
  c.restore(); header(c, t, 3);
}
function pageSpace(c, t) {
  const e = Ep[4];
  const rp = seg(t, P[4] + .8, P[4] + 2.4), rf = 1 - ss(seg(t, 122.8, 124.2));
  if (rp > 0 && rf > 0) {
    c.save(); c.globalAlpha = rf;
    const N = e.ring.length, spin = (t - P[4]) * .1;
    for (let i = 0; i < N; i++) { const k = i / N, q = clamp((rp - k * .8) / .2); if (q <= 0) continue; const a = -Math.PI / 2 + k * Math.PI * 2 + spin, fl = .75 + .4 * vnoise(t * 5 + i * 3.7);
      c.save(); c.translate(540 + Math.cos(a) * 380, 860 + Math.sin(a) * 380); c.rotate(a + Math.PI / 2); c.scale(1, fl * eo(q)); for (const s of e.ring[i]) drawS(c, s, 1); c.restore(); }
    c.beginPath(); c.arc(540, 860, 380, -Math.PI / 2 + spin, -Math.PI / 2 + spin + Math.PI * 2 * eo(rp)); c.strokeStyle = rgba(C.ver2, .5); c.lineWidth = 5; c.stroke();
    draw(c, e.dam, t, { rot: Math.sin(t * 2 * Math.PI / BEAT) * .07 }); const ap = seg(t, P[4] + 2.6, P[4] + 3.2); if (ap > 0) flames(c, 700, 880, 5, 1.1, t, 9, ap);
    c.restore();
  }
  // the curtain: painted closed, then drawn apart on an empty space
  const cp = seg(t, 123.2, 124.8), op = eio(seg(t, 126.6, 128.6)), cf = 1 - ss(seg(t, 129.0, 130.4));
  if (cp > 0 && cf > 0) { c.save(); c.globalAlpha = cf; c.translate(540, 560); c.save(); c.translate(-330 * op, 0); drawList(c, e.cur.L, cp); c.restore(); c.save(); c.translate(330 * op, 0); drawList(c, e.cur.R, cp); c.restore(); c.restore(); }
  mono(c, 'CHIDAMBARA RAHASYAM', 540, 1240, fade2(t, 128.4, 133.6, .6, .4), 'cr', { size: 24, sp: 6 });
  hand(c, 'the secret: an empty space', 540, 1300, seg(t, 129.0, 129.9), { size: 50, w: 500, align: 'center', id: 'cr2', alpha: 1 - ss(seg(t, 133.2, 133.6)) });
  header(c, t, 4);
}
const PAGES = [pageEarth, pageWater, pageFire, pageAir, pageSpace];
function wipeUp(t, t0, d, drawA, drawB, col) {   // the next element rises up the page with a coloured brush edge
  drawA(ctx, t);
  const p = eio(seg(t, t0, t0 + d)), ey = lerp(H + 180, -200, p);
  ctx.save(); ctx.beginPath(); ctx.moveTo(-10, H + 10);
  const edge = x => ey + (vnoise(x * .007 + t0) - .5) * 180 + Math.sin(x * .02 + t * 3) * 12;
  for (let x = -10; x <= W + 40; x += 30) ctx.lineTo(x, edge(x));
  ctx.lineTo(W + 10, H + 10); ctx.closePath(); ctx.save(); ctx.clip(); paper(ctx); drawB(ctx, t); ctx.restore();
  ctx.beginPath(); for (let x = -10; x <= W + 40; x += 30) x < 0 ? ctx.moveTo(x, edge(x)) : ctx.lineTo(x, edge(x));
  ctx.strokeStyle = rgba(col, .55); ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.stroke(); ctx.strokeStyle = rgba(col, .35); ctx.lineWidth = 60; ctx.stroke();
  ctx.restore();
}
// ================= the five syllables, the title, the paper =================
const SY = ['Na', 'Ma', 'Shi', 'Va', 'Ya'], SX = [150, 345, 540, 735, 930];
function sceneY(c, t) {
  SY.forEach((s, i) => {
    const t0 = SYL[i];
    serif(c, s, SX[i], 900, seg(t, t0, t0 + .5), { size: 110, id: 'sy' + i });
    const p = seg(t, t0 + .2, t0 + .9); if (p > 0) { c.save(); c.translate(SX[i], 1000); drawList(c, Y.dab[i], p); c.restore(); }
    mono(c, EL[i][0], SX[i], 1086, ss(seg(t, t0 + .5, t0 + 1)), 'sye' + i, { size: 17, sp: 3 });
  });
  mono(c, 'PANCHAKSHARA', 540, 400, fade2(t, 135.6, 154.2, .6, .5), 'pk', { size: 28, sp: 10 });
  hand(c, 'the five syllables', 540, 462, seg(t, 136.2, 137.1), { size: 52, w: 500, align: 'center', id: 'pk2', alpha: 1 - ss(seg(t, 153.8, 154.2)) });
  mono(c, 'OM NAMAH SHIVAYA', 540, 1250, ss(seg(t, bar(45.5), bar(45.5) + .8)), 'mantra', { size: 26, sp: 8 });
  serif(c, 'SHIVA', 540, 560, seg(t, 154.6, 156.2), { size: 120, sp: 22, id: 'title' });
  hand(c, 'the auspicious one', 540, 640, seg(t, 155.8, 156.8), { size: 54, w: 500, align: 'center', id: 'aus' });
}
