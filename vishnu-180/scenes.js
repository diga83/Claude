// An Ocean, a Step, a Stone — Vishnu. Scenes and timeline (helpers in main.js). 1080x1920, render(t) is a pure function of t.
const BEAT = 60 / 70, BAR = BEAT * 4, bar = n => n * BAR;   // 70 BPM
const DUR = 180; window.DUR = DUR;
const SC = { G: bar(10), V: bar(15.5), D: bar(25.5), K: bar(31), S: bar(36) };   // scene starts (each with a 1.2 s brush-edge wipe)
const VOICE = [['v01', 1.0], ['v02', 7.6], ['v03', 10.4], ['v04', 18.0], ['v05', 25.2], ['v06', 36.2], ['v07', 45.0], ['v08', 54.0], ['v09', 62.4], ['v10', 72.0], ['v11', 75.6], ['v12', 79.6],
  ['t1', 89.2], ['t2', 97.0], ['v13', 107.4], ['v14', 124.4], ['v15', 133.6], ['v16', 163.0]];
const TXT = {
  v01: [5.673, 'Before anything had a name, there was an ocean of milk, and on it, a serpent with no end.'], v02: [1.866, 'Ananta: the endless one.'],
  v03: [6.75, 'On its coils, Vishnu rests: the preserver, with Lakshmi at his feet, the goddess of good fortune.'],
  v04: [6.268, 'His name is often read as the one who pervades everything. The sky and the ocean are his colour.'],
  v05: [6.596, 'He holds a conch, a discus, a mace, and a lotus, and he rides on Garuda, king of the birds.'],
  v06: [5.748, 'Garuda is the enemy of every serpent, and still he carries the god who sleeps on one.'],
  v07: [6.622, 'When the world falls out of balance, Vishnu comes down to set it right. Once, he came as a dwarf.'],
  v08: [7.134, 'Vamana asked the great king Bali for a small gift: only as much land as he could cover in three steps.'],
  v09: [3.68, 'The king laughed, and agreed. And the dwarf began to grow.'], v10: [2.411, 'With his first step, he covered the earth.'],
  v11: [1.959, 'With his second step, the heavens.'], v12: [4.799, 'There was nowhere left for the third. So Bali bowed, and offered his own head.'],
  t1: [7.142, 'In the far south, the city of Thiruvananthapuram takes its name from him: the city of the endless serpent.'],
  t2: [7.804, 'In its great temple, Padmanabhaswamy, he lies at rest, so long that he can only be seen through three doors.'],
  v13: [8.039, 'In the Bhagavad Gita, as Krishna, he makes a promise: whenever goodness declines, I come again, age after age.'],
  v14: [8.149, 'And some say he is closer than that. In a Himalayan river in Nepal, pilgrims gather black stones marked with spirals.'],
  v15: [8.96, 'They are ammonites, sea creatures turned to stone some 150 million years ago, honoured as Vishnu himself: the shaligram.'],
  v16: [5.846, 'An ocean, a step, a stone. The one who pervades everything, in a line without an end.'] };
const SUBS = VOICE.map(([id, t]) => [t, TXT[id][0], TXT[id][1]]);
const A = {}, G = {}, V = {}, D = {}, K = {}, S2 = {};

// ================= A: the ocean of milk, the endless serpent =================
function serpentTip(p) { const pts = A.path, m = (pts.length - 1) * clamp(p), k = Math.floor(m), f = m - k; const a = pts[k], b = pts[Math.min(pts.length - 1, k + 1)]; return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; }
function sceneA(c, t) {
  const sp = eio(seg(t, .6, 9.0)), [tx_, ty] = serpentTip(sp), z = eio(seg(t, 5, 9.6));
  c.save(); camAt(c, lerp(2.0, 1, z) + .05 * eio(seg(t, 12, 30)), lerp(tx_, 540, z), lerp(ty, 980, z));
  draw(c, A.ocean, t); draw(c, A.sky, t); draw(c, A.oceanBlue, t);
  draw(c, A.haze, t);
  if (sp > 0) { const n = A.segs.length; A.segs.forEach((s, i) => drawS(c, s, clamp(sp * n - i))); }
  if (t > 9.0) for (const s of A.scales) drawS(c, s, 1, null, ss(seg(t, 9.0, 10.0)));
  draw(c, A.hood, t); draw(c, A.lotus, t); draw(c, A.coins, t);
  A.attr.forEach(([ob, nm, lx, ly], i) => { draw(c, ob, t, ob.spin ? { rot: (t - ob.t0) * .8 } : {}); mono(c, nm, lx, ly, ss(seg(t, ob.t0 + .4, ob.t0 + .9)) * (1 - ss(seg(t, 33.4, 34.2))), 'at' + i, { size: 20, sp: 5 }); });
  c.restore();
  note(c, t, 13.6, 20.2, 70, 560, 440, 960, 'Vishnu', 'the preserver', 'vi', -40);
  note(c, t, 15.0, 23.6, 600, 1310, 860, 1100, 'Lakshmi', 'good fortune', 'la', 40);
}
// ================= G: Garuda =================
function sceneG(c, t) {
  draw(c, G.clouds, t);
  const lift = -60 * eio(seg(t, 49, 53.2)), flap = Math.sin((t - SC.G) * 2.2) * .07, wp = seg(t, SC.G + 1.0, SC.G + 3.6);
  c.save(); c.translate(540, 900 + lift + Math.sin(t * 1.3) * 8);
  if (wp > 0) for (const [side, L] of [[-1, G.wingL], [1, G.wingR]]) { c.save(); c.translate(side * 30, -10); c.rotate(side * flap); drawList(c, L, wp); c.restore(); }
  drawList(c, G.body, seg(t, SC.G + .8, SC.G + 2.6));
  c.restore();
  note(c, t, 41.0, 48.6, 70, 1300, 520, 800, 'Garuda', 'king of the birds', 'ga', 40);
}
// ================= V: Vamana, three steps =================
const vCam = t => {   // zoom out with the growing step, back in for the king
  const out = eio(seg(t, 64.6, 71.2)), back = eio(seg(t, 78.4, 82.6));
  const s = Math.exp(lerp(lerp(0, Math.log(.05), out), 0, back)), cx = 540 + 180 * back, cy = lerp(lerp(1330, 1500, out), 1330, back);
  return [s, cx, cy];
};
function sceneV(c, t) {
  const [s, cx, cy] = vCam(t);
  c.save(); camAt(c, s, cx, cy);
  // the earth: one huge painted globe whose top is the ground
  const ep = seg(t, SC.V + .2, SC.V + 2.2); if (ep > 0) withSeed(9, () => { for (let pass = 0; pass < 4; pass++) { c.beginPath(); for (let i = 0; i <= 120; i++) { const a = i / 120 * Math.PI * 2, r = 7000 * (1 + .006 * (vnoise(i * .4 + pass * 5) - .5)); const x = 540 + Math.cos(a) * r, y = 8500 + Math.sin(a) * r; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); c.fillStyle = rgba(pass % 2 ? '#7f9f5f' : '#6f8faa', .16 * ep); c.fill(); } });
  draw(c, V.ground, t);
  for (const st of V.stars) { const p = seg(t, st.t0, st.t0 + .4); if (p > 0) { c.save(); c.translate(st.x, st.y); c.scale(st.sc, st.sc); drawList(c, V.star, 1, null, eo(p)); c.restore(); } }
  // the dwarf's parasol, and the glow that grows from it
  const gp = eio(seg(t, 64.4, 71.0)), gf = 1 - ss(seg(t, 74.4, 75.6));
  if (gp > 0 && gf > 0) { c.save(); c.globalAlpha = gf; for (let i = 0; i < 5; i++) { const h = 80 + gp * 15000 * (1 - i * .12), w = 60 + gp * 4200 * (1 - i * .15); c.beginPath(); c.ellipse(380, 1450 - h / 2, w / 2, h / 2, 0, 0, 7); c.fillStyle = rgba(VBLUE[i % 4], .07); c.fill(); } c.restore(); }
  draw(c, V.parasol, t, { alpha: 1 - ss(seg(t, 64.6, 66.0)) });
  // the crown bows; the third step rests above it
  const bow = eio(seg(t, 82.4, 83.6)); draw(c, V.crown, t, { rot: -.32 * bow, dy: 26 * bow });
  // the three steps
  for (const [ob, k] of V.fps) { const p = seg(t, ob.t0, ob.t1); if (p <= 0) continue; c.save(); c.translate(ob.x, ob.y); c.rotate(ob.rot); c.scale(k, k); if (p < 1) drawList(c, ob.L, p); else { const q = ob.spr; c.drawImage(q.cv, q.x0, q.y0, q.x1 - q.x0, q.y1 - q.y0); } c.restore(); }
  c.restore();
  const hf = fade2(t, 56.0, 63.6, .6, .5);
  if (hf > 0) { const [x1, y1] = [540 + (380 - cx) * s, 960 + (1530 - cy) * s], [x2, y2] = [540 + (720 - cx) * s, 960 + (1530 - cy) * s];
    hand(c, 'Vamana', x1, y1, seg(t, 56.0, 56.7), { size: 48, align: 'center', id: 'vam', alpha: hf }); hand(c, 'King Bali', x2, y2, seg(t, 56.8, 57.5), { size: 48, align: 'center', id: 'bal', alpha: hf }); }
  mono(c, 'TRIVIKRAMA', 540, 190, fade2(t, 71.6, 78.6, .6, .5), 'tri', { size: 28, sp: 10 });
  hand(c, 'the three steps', 540, 252, seg(t, 72.2, 73.0), { size: 50, w: 500, align: 'center', id: 'tri2', alpha: 1 - ss(seg(t, 78.1, 78.6)) });
}
// ================= D: Padmanabhaswamy, three doors =================
const DOORS = [-330, 0, 330];
function doorPath(c, x, y) { c.beginPath(); c.moveTo(x - 110, y + 210); c.lineTo(x - 110, y - 120); c.quadraticCurveTo(x, y - 240, x + 110, y - 120); c.lineTo(x + 110, y + 210); c.closePath(); }
function sceneD(c, t) {
  c.save(); camAt(c, 1 + .05 * eio(seg(t, SC.D, SC.K)), 540, 960);
  draw(c, D.wall, t);
  const dp = seg(t, SC.D + 2.0, SC.D + 3.2);
  DOORS.forEach((dx, i) => {
    const x = 540 + dx, y = 1060; if (dp <= 0) return;
    c.save(); doorPath(c, x, y); c.globalAlpha = dp; c.fillStyle = '#231d1a'; c.fill(); c.clip();
    const rp = seg(t, D.reveal[i], D.reveal[i] + 1.0);   // one body seen through three doors
    if (rp > 0) { c.globalAlpha = rp; drawList(c, D.body, 1); drawList(c, D.inner[i], 1); }
    c.restore();
    c.save(); doorPath(c, x, y); c.strokeStyle = rgba('#6b4430', .9 * dp); c.lineWidth = 16; c.stroke(); c.restore();
    mono(c, String(i + 1), x, y + 260, ss(seg(t, D.reveal[i] + .4, D.reveal[i] + .9)), 'dn' + i, { size: 22 });
  });
  c.restore();
  mono(c, 'PADMANABHASWAMY TEMPLE', 540, 230, fade2(t, SC.D + 2.2, SC.K - .2, .6, .5), 'pd', { size: 24, sp: 6 });
  hand(c, 'Thiruvananthapuram, Kerala', 540, 292, seg(t, SC.D + 2.8, SC.D + 3.8), { size: 50, w: 500, align: 'center', id: 'pd2', alpha: 1 - ss(seg(t, SC.K - .7, SC.K - .2)) });
}
// ================= K: the promise =================
function sceneK(c, t) {
  draw(c, K.halo, t);
  drawList(c, K.flute, seg(t, SC.K + .8, SC.K + 3.2));
  mono(c, 'BHAGAVAD GITA · 4.7–8', 540, 330, fade2(t, SC.K + 2.4, SC.S - .2, .6, .5), 'bg', { size: 24, sp: 5 });
  hand(c, 'yada yada hi dharmasya...', 540, 1380, seg(t, SC.K + 4.0, SC.K + 5.4), { size: 52, w: 500, align: 'center', id: 'yy', alpha: 1 - ss(seg(t, SC.S - .7, SC.S - .2)) });
}
// ================= S: the river stone, and the line without an end =================
function sceneS(c, t) {
  const pin = eio(seg(t, 140, 149)), out = eio(seg(t, 150, 168));
  const s = Math.exp(lerp(lerp(0, Math.log(2.3), pin), Math.log(.42), out));
  c.save(); camAt(c, s, 540, 1000);
  draw(c, S2.river, t, { alpha: 1 - .6 * pin }); draw(c, S2.pebbles, t, { alpha: 1 - .6 * pin });
  draw(c, S2.stone, t); draw(c, S2.amm, t);
  const lp = seg(t, 147.5, 186); if (lp > 0) { const n = S2.line.length; S2.line.forEach((st, i) => drawS(c, st, clamp(lp * n - i))); }
  c.restore();
  const f1 = 1 - ss(seg(t, 139.4, 140.2));
  mono(c, 'KALI GANDAKI · NEPAL', 540, 240, ss(seg(t, 126.0, 126.6)) * f1, 'kg', { size: 22, sp: 6 });
  hand(c, 'a Himalayan river', 540, 300, seg(t, 126.6, 127.5), { size: 50, w: 500, align: 'center', id: 'kg2', alpha: f1 });
  const f2 = fade2(t, 134.6, 147.0, .6, .6);
  mono(c, 'SHALIGRAM', 540, 1360, f2, 'sh', { size: 30, sp: 10 });
  hand(c, 'an ammonite fossil', 540, 1420, seg(t, 135.2, 136.0), { size: 48, w: 500, align: 'center', id: 'sh2', alpha: f2 });
  mono(c, '≈ 150,000,000 YEARS', 540, 1480, f2 * ss(seg(t, 136.6, 137.2)), 'sh3', { size: 22, sp: 4 });
  serif(c, 'VISHNU', 540, 330, seg(t, 170.2, 171.8), { size: 120, sp: 22, id: 'title' });
  hand(c, 'the all-pervading', 540, 410, seg(t, 171.4, 172.4), { size: 54, w: 500, align: 'center', id: 'allp' });
}
