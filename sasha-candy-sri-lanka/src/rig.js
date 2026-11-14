// Character rigs: Sasha and Candy drawn as jointed vector puppets (walk cycle, arm poses, blink, lip-sync, tail).
const SK = { skin: '#e39b5c', skinD: '#c47c42', line: '#6b3a1f', hair: '#4b2f24', hairL: '#70493a', teal: '#3f9a97', tealD: '#2e807d', shorts: '#f0ad3d', cuff: '#f8c35e', pink: '#f08fa9', pinkD: '#d76c8b', sock: '#f8f0e6', band: '#f394b0', glass: '#f4a3bb', eye: '#4a2a1a' };
const CK = { body: '#a69589', dark: '#85746b', cream: '#ead8c4', line: '#6a564d', ear: '#dba9a0', eye: '#f3c331', nose: '#7b4b47', far: '#93837a' };
const OL = 7;
function limb(pts, w, fill, ol = SK.line) { g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.strokeStyle = ol; g.lineWidth = w + OL * 2; g.stroke(); g.strokeStyle = fill; g.lineWidth = w; g.stroke(); }
function shp(fn, fill, ol = SK.line, lw = OL) { g.beginPath(); fn(); if (fill) { g.fillStyle = fill; g.fill(); } if (ol) { g.strokeStyle = ol; g.lineWidth = lw; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); } }
const blink = (t, seed = 0) => { const p = (t + seed * 1.37) % 3.6; return p < .16 ? Math.sin(p / .16 * Math.PI) : (p > 1.9 && p < 2.02 ? Math.sin((p - 1.9) / .12 * Math.PI) * (seed % 2) : 0); };
const POSE = { rest: [.2, .14], wave: [2.3, 2.95], point: [1.45, 2.25], show: [1.0, 2.05], cheer: [2.65, 3.0], hip: [.78, -.85], low: [.75, .9] };
const mixPose = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
// how much Sasha is "mid-sentence" right now (drives gestures)
const speaking = t => { let k = 0; for (const l of T.lines) k = Math.max(k, Math.min(seg(t, l.a - .25, l.a + .25), 1 - seg(t, l.b - .1, l.b + .45))); return E.io(k); };

// mouth shapes: [half-width, opening, round, teeth (1 top, 2 both), tongue (1 low, 2 up)]
const VSH = { R: [34, 0, 0, 0, 0], M: [28, 0, 0, 0, 0], F: [30, 9, 0, 1, 0], S: [34, 12, 0, 2, 0], L: [30, 20, 0, 1, 2], E: [38, 22, 0, 1, 1], I: [42, 15, 0, 1, 0], A: [36, 40, 0, 1, 1], O: [22, 34, 1, 0, 0], U: [14, 16, 1, 0, 0] };
function viseme(t) {
  const vs = T.vis; if (!vs || t < vs[0][0]) return { c: 'R', p: VSH.R };
  let lo = 0, hi = vs.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (vs[m][0] <= t) lo = m; else hi = m - 1; }
  const a = VSH[vs[lo][1]], nx = vs[lo + 1], k = nx ? E.io(seg(t, nx[0] - .07, nx[0])) : 0, b = nx ? VSH[nx[1]] : a;
  return { c: k < .5 ? vs[lo][1] : nx[1], p: [lerp(a[0], b[0], k), lerp(a[1], b[1], k), k < .5 ? a[2] : b[2], k < .5 ? a[3] : b[3], k < .5 ? a[4] : b[4]] };
}
// jump with anticipation, stretch and a landing squash: u 0..1 -> height and squash factor
function hopS(u, hgt) {
  if (u <= 0 || u >= 1) return { y: 0, sq: 1 };
  if (u < .2) return { y: 0, sq: 1 - .17 * Math.sin(u / .2 * Math.PI / 2) };
  if (u < .8) { const v = (u - .2) / .6; return { y: hgt * 4 * v * (1 - v), sq: 1 + .15 * Math.pow(Math.abs(Math.cos(v * Math.PI)), 1.5) - .03 }; }
  return { y: 0, sq: 1 - .2 * Math.sin((u - .8) / .2 * Math.PI) * (1 - (u - .8) / .4) };
}
// when Sasha glances at what she is describing (start of each sentence)
const glance = t => { let k = 0; for (const l of T.lines) k = Math.max(k, Math.min(seg(t, l.a - .35, l.a + .05), 1 - seg(t, l.a + 1.3, l.a + 1.75))); return E.io(k); };

function sashaHead(t, o, pass) {
  const ex = o.expr || 'happy', lx = (o.look ? o.look[0] : 0), ly = o.look ? o.look[1] : 0, sd = o.seed || 0;
  const yaw = clamp(o.head || 0, -1, 1) * .8, sy = Math.sin(yaw), fc = sy * 16;
  const sway = (o.sway || 0) + Math.sin(t * 2.3 + sd) * 5, hs = -sy * 34;
  const F = (fx, R = 138) => { const a0 = Math.asin(clamp(fx / R, -1, 1)), a = a0 + yaw; return { x: R * Math.sin(a), sc: clamp(Math.cos(a) / Math.cos(a0), 0, 1.12) }; };
  const curls = [[-166, -272, 92], [166, -272, 92], [-196, -170, 98], [196, -170, 98], [-208, -60, 86], [208, -60, 86], [-180, 24, 70], [180, 24, 70], [-118, 52, 52], [118, 52, 52]];
  if (pass === 0) {                                                         // hair behind the body
    const cs = curls.map(([a, b, r]) => [a + hs + sway * (b + 300) / 260, b, r]);
    g.fillStyle = SK.line; g.beginPath(); g.ellipse(hs * .5, -215, 218 + OL, 202 + OL, 0, 0, TAU); g.fill(); cs.forEach(([a, b, r]) => circ(a, b, r + OL, SK.line));
    ell(hs * .5, -215, 218, 202, SK.hair); cs.forEach(([a, b, r]) => circ(a, b, r, SK.hair));
    [-1, 1].forEach(sx => { for (let i = 0; i < 4; i++) { const x0 = sx * (150 + i * 34) + hs + sway * .5, y0 = -250 + i * 34; g.beginPath(); g.moveTo(x0, y0); g.bezierCurveTo(x0 + sx * 46, y0 + 60, x0 - sx * 30, y0 + 120, x0 + sx * 22 + sway * .5, y0 + 200 - i * 22); g.strokeStyle = SK.hairL; g.lineWidth = 7; g.lineCap = 'round'; g.stroke(); } });
    return;
  }
  const band = () => { g.lineCap = 'round'; g.beginPath(); g.ellipse(0, -200, 150, 218, 0, Math.PI + .3, TAU - .3); g.strokeStyle = SK.line; g.lineWidth = 46 + OL * 2; g.stroke(); g.strokeStyle = SK.band; g.lineWidth = 46; g.stroke(); for (let i = 0; i < 13; i++) { const a = Math.PI + .36 + i * (Math.PI - .72) / 12, px = Math.cos(a) * 150, py = -200 + Math.sin(a) * 218; g.save(); g.translate(px, py); g.rotate(a + Math.PI / 2 + .7); line(0, -18, 0, 18, SK.pinkD, 5); g.restore(); } };
  if (o.back) { ell(0, -200, 156, 172, SK.hair); for (let i = 0; i < 7; i++) curve([-110 + i * 36, -330 + Math.abs(i - 3) * 14, -120 + i * 38, -200, -100 + i * 34, -60], SK.hairL, 7); band(); return; }
  // ears: the far one disappears behind the head, the near one slides onto the side of the face
  const ears = [-1, 1].map(sx => ({ a: sx * 1.5 + yaw })).filter(e => Math.abs(e.a) < 1.62), ear = e => shp(() => g.ellipse(134 * Math.sin(e.a) + fc * .3, -150, 25 * (.55 + .45 * Math.abs(Math.sin(e.a))), 26, 0, 0, TAU), SK.skin);
  ears.filter(e => Math.abs(e.a) > 1.3).forEach(ear);
  shp(() => g.ellipse(fc, -190, 130, 152, 0, 0, TAU), SK.skin);
  ears.filter(e => Math.abs(e.a) <= 1.3).forEach(e => { ear(e); curve([134 * Math.sin(e.a) + fc * .3 - 6, -160, 134 * Math.sin(e.a) + fc * .3 + 6, -150, 134 * Math.sin(e.a) + fc * .3 - 4, -138], SK.skinD, 4); });
  const part = 150 * Math.sin(yaw) * .8;
  [-1, 1].forEach(sx => { const tx = sx * 134 + fc * .5, L = u => lerp(part, tx, u); shp(() => { g.moveTo(part, -345); g.bezierCurveTo(L(.4), -338, L(.86), -292, tx, -208); g.lineTo(sx * 156, -236); g.bezierCurveTo(sx * 166, -334, lerp(sx * 92, part, .35), -410, part * .6, -410); g.closePath(); }, SK.hair, SK.line, 5); curve([L(.22), -372, L(.66), -350, L(.95), -270], SK.hairL, 6); });
  band();
  [-1, 1].forEach(sx => { const f = F(sx * 88); ell(f.x, -112, 30 * f.sc, 18, 'rgba(240,110,110,.28)'); });
  const bl = ex === 'laughing' ? 1 : blink(t, sd), wide = ex === 'surprised' ? 1.2 : 1, emph = o.talk ? env(t) * 7 : 0, by = (ex === 'surprised' ? -262 : ex === 'laughing' ? -244 : -242) - emph, px = (lx + sy * .25) * 8;
  [-1, 1].forEach(sx => {
    const f = F(sx * 66), cy = -170 + ly * 4, tiltb = ex === 'curious' ? (sx > 0 ? -12 : 6) : 0;
    g.save(); g.translate(f.x, 0); g.scale(Math.max(.28, f.sc), 1);
    curve([-30, by + 6 + tiltb * (sx > 0 ? 0 : 1), 0, by - 10 + tiltb, 30, by + 6 + tiltb * (sx > 0 ? 1 : 0)], SK.hair, 8);
    if (bl > .6) { if (ex === 'laughing') curve([-30, cy + 8, 0, cy - 24, 30, cy + 8], '#3a2015', 9); else curve([-30, cy, 0, cy + 12, 30, cy], '#3a2015', 8); g.restore(); return; }
    const op = 1 - bl * .9;
    g.save(); g.beginPath(); g.ellipse(0, cy, 37 * wide, 33 * wide * op, 0, 0, TAU); g.fillStyle = '#fff8ee'; g.fill(); g.clip();
    circ(px, cy + ly * 6, 26 * (ex === 'surprised' ? .88 : 1), SK.eye); circ(px, cy + ly * 6, 13, '#27150c'); circ(px - 9, cy + ly * 6 - 10, 8, '#fff'); circ(px + 8, cy + ly * 6 + 8, 3.5, 'rgba(255,255,255,.7)'); g.restore();
    curve([-38 * wide, cy - 6, 0, cy - 62 * wide * op, 38 * wide, cy - 6], '#3a2015', 8); if (f.sc > .55) line(sx * 36 * wide, cy - 10, sx * 50 * wide, cy - 24, '#3a2015', 6);
    g.restore();
  });
  const nx = F(0, 152).x; curve([nx - 10 + sy * 4, -128, nx + sy * 16, -116, nx + 10 + sy * 6, -129], SK.skinD, 6);
  // mouth: shaped by the sound being spoken; otherwise the expression's resting mouth
  const vz = o.talk ? viseme(t) : { c: 'R', p: VSH.R }, loud = o.talk ? clamp(env(t) * 2.2) : 0, mp = vz.p, mh = mp[1] * (.7 + .5 * loud), mf = F(0, 126);
  g.save(); g.translate(mf.x, -92); g.scale(Math.max(.62, mf.sc), 1);
  const open = (w, h, teeth, tongue) => { g.save(); shp(() => { g.moveTo(-w, 0); g.quadraticCurveTo(0, 9, w, 0); g.bezierCurveTo(w * .85, h * 1.35, -w * .85, h * 1.35, -w, 0); g.closePath(); }, '#7a2430', SK.line, 5); g.clip(); if (tongue === 2) ell(0, h * .3, w * .5, h * .5, '#ee7f90'); else if (tongue) ell(0, h * .98, w * .6, h * .45, '#ee7f90'); if (teeth === 2) { rect(-w, -2, w * 2, h * 1.4, '#fff'); line(-w, h * .5, w, h * .5, '#b9a9a9', 3); } else if (teeth) rect(-w, -2, w * 2, Math.min(11, h * .5), '#fff'); g.restore(); };
  if (o.talk && mh > 4 && loud > .06) { if (mp[2]) { shp(() => g.ellipse(0, mh * .5 + 2, mp[0], mh * .55 + 4, 0, 0, TAU), '#7a2430', SK.line, 5); ell(0, mh * .8 + 2, mp[0] * .5, mh * .2, '#ee7f90'); } else open(mp[0], mh, mp[3], mp[4]); }
  else if (o.talk && vz.c === 'M' && loud > .06) curve([-26, 4, 0, 8, 26, 4], SK.line, 8);
  else if (ex === 'laughing') open(44, 38, 1, 1);
  else if (ex === 'surprised') shp(() => g.ellipse(0, 8, 15, 20, 0, 0, TAU), '#7a2430', SK.line, 5);
  else if (ex === 'curious') curve([-22, 2, 2, 14, 26, -4], SK.line, 7);
  else { curve([-36, -4, 0, 26, 36, -4], SK.line, 7); line(-40, -8, -34, -2, SK.line, 5); line(40, -8, 34, -2, SK.line, 5); }
  g.restore();
  // glasses
  const lens = [-1, 1].map(sx => { const f = F(sx * 66), w = 120 * Math.max(.3, f.sc); return { x: f.x, w, sc: f.sc, sx }; });
  lens.forEach(l => { g.beginPath(); g.roundRect(l.x - l.w / 2, -220, l.w, 96, Math.min(32, l.w / 2.3)); g.fillStyle = 'rgba(255,255,255,.13)'; g.fill(); g.strokeStyle = SK.glass; g.lineWidth = 10; g.stroke(); if (l.sc > .6) { line(l.x - 34, -196, l.x - 14, -202, 'rgba(255,255,255,.7)', 5); line(l.x + l.sx * l.w / 2, -180, 134 * Math.sin(l.sx * 1.5 + yaw) + fc * .3, -172, SK.glass, 9); } });
  curve([lens[0].x + lens[0].w / 2, -178, (lens[0].x + lens[0].w / 2 + lens[1].x - lens[1].w / 2) / 2, -188, lens[1].x - lens[1].w / 2, -178], SK.glass, 9);
}
function shoe(ax, ay, fd, rot, sx = 1) {
  g.save(); g.translate(ax, ay); g.rotate(rot); g.scale(fd * sx, 1);
  shp(() => { g.moveTo(-50, 74); g.lineTo(-50, -12); g.quadraticCurveTo(-48, -36, -18, -30); g.lineTo(26, -20); g.quadraticCurveTo(76, 12, 114, 44); g.lineTo(116, 74); g.closePath(); }, SK.pink);
  shp(() => { g.moveTo(72, 74); g.quadraticCurveTo(70, 38, 100, 36); g.quadraticCurveTo(120, 46, 118, 74); g.closePath(); }, '#fff', SK.line, 5);
  for (let i = 0; i < 3; i++) line(8 + i * 20, -14 + i * 13, 36 + i * 18, -26 + i * 14, '#fff', 7);
  shp(() => g.roundRect(-56, 70, 178, 38, 16), '#fff');
  g.restore();
}
// Sasha: feet at (x, y), h = full height in px. o.turn: body -1 (faces left) .. 0 (front) .. 1 (faces right); o.head: head turn.
function sasha(x, y, h, t, o = {}) {
  const s = h / 1410, dir = o.dir || 0, wp = o.walk, sd = o.seed || 0, sq = o.sq || 1;
  const tn = o.turn != null ? o.turn : (wp != null ? dir : 0), an = Math.abs(tn), fd = tn >= 0 ? 1 : -1, hy = o.head != null ? o.head : tn * .8;
  g.save(); g.translate(x, y); g.scale(s / Math.sqrt(sq), s * sq);
  const legs = [-1, 1].map(side => {
    const ph = wp != null ? wp + (side > 0 ? Math.PI : 0) : 0, th = wp != null ? Math.sin(ph) * .5 * dir : side * .03 * (1 - an), kb = wp != null ? Math.max(0, -Math.cos(ph)) * .95 + .06 : 0;
    const hip = [side * lerp(72, 38, an), -560], knee = [hip[0] + Math.sin(th) * 262, hip[1] + Math.cos(th) * 262], sh = th - dir * kb, ank = [knee[0] + Math.sin(sh) * 190, knee[1] + Math.cos(sh) * 190];
    return { side, hip, knee, ank, sh, kb };
  });
  const lift = -108 - Math.max(legs[0].ank[1], legs[1].ank[1]);
  const idle = wp != null ? 0 : Math.sin(t * 2.2 + sd) * 3 - (o.talk ? env(t) * 5 : 0);
  g.translate(0, lift);
  const tilt = (o.tilt || 0) + Math.sin(t * 1.3 + sd) * .02 + (o.talk ? env(t) * .03 * Math.sin(t * 7) : 0) + (wp != null ? Math.sin(wp * 2) * .02 : 0);
  const ho = Object.assign({ sway: wp != null ? -dir * 10 + Math.sin(wp * 2) * 8 : 0 }, o, { head: hy });
  const hair = pass => { g.save(); g.translate(tn * 10, -1000 + idle); g.rotate(tilt); sashaHead(t, ho, pass); g.restore(); };
  hair(0);
  const order = fd < 0 ? [1, 0] : [0, 1];
  order.forEach(i => { const L = legs[i], mid = [lerp(L.knee[0], L.ank[0], .5), lerp(L.knee[1], L.ank[1], .5)]; limb([L.hip, L.knee, L.ank], 100, SK.skin); limb([mid, L.ank], 92, SK.sock); shoe(L.ank[0], L.ank[1], an > .3 ? fd : L.side, wp != null ? dir * L.kb * .75 : 0, lerp(.8, 1, an)); });
  const bw = lerp(1, .74, an);
  g.save(); g.scale(bw, 1);
  shp(() => { g.moveTo(-114, -716); g.lineTo(114, -716); g.lineTo(160, -522); g.lineTo(8, -522); g.lineTo(0, -580); g.lineTo(-8, -522); g.lineTo(-160, -522); g.closePath(); }, SK.shorts);
  [-1, 1].forEach(sx => { shp(() => g.roundRect(sx > 0 ? 4 : -164, -566, 160, 46, 10), SK.cuff); if (!o.back) curve([sx * 112, -690, sx * 70, -640, sx * 40, -700], SK.line, 4); else shp(() => g.roundRect(sx * 62 - 34, -680, 68, 70, 10), null, SK.line, 4); });
  line(0, -700, 0, -590, SK.line, 4);
  g.restore();
  g.translate(0, idle);
  function arm(side) {
    let A1, A2; const p = side < 0 ? o.armL : o.armR;
    if (p) { A1 = side * p[0]; A2 = side * p[1]; } else if (wp != null) { const a = Math.sin(wp + (side > 0 ? 0 : Math.PI)) * .5 * dir; A1 = side * .08 + a; A2 = A1 + dir * .4; } else { A1 = side * (.2 + Math.sin(t * 2.2 + sd) * .015) * (1 - an * .6); A2 = side * .14 * (1 - an) + fd * .18 * an; }
    const sh = [side * lerp(120, p ? 78 : 34, an), -925], el = [sh[0] + Math.sin(A1) * 205, sh[1] + Math.cos(A1) * 205], wr = [el[0] + Math.sin(A2) * 200, el[1] + Math.cos(A2) * 200], hx = Math.sin(A2), hyv = Math.cos(A2);
    limb([sh, el, wr], 60, SK.skin);
    const hc = [wr[0] + hx * 26, wr[1] + hyv * 26]; shp(() => g.ellipse(hc[0], hc[1], 34, 42, -Math.atan2(hx, hyv), 0, TAU), SK.skin);
    if (p && p[2]) { for (let i = -1.5; i <= 1.5; i++) { const a = Math.atan2(hx, hyv) + i * .28, fx = hc[0] + Math.sin(a) * 48, fy = hc[1] + Math.cos(a) * 48; limb([[hc[0] + Math.sin(a) * 20, hc[1] + Math.cos(a) * 20], [fx, fy]], 13, SK.skin, SK.line); } circ(hc[0], hc[1], 30, SK.skin); }
    else circ(hc[0] - side * hyv * 26 * (p ? 1 : -1), hc[1] + side * hx * 26 * (p ? 1 : -1) - 6, 13, SK.skin, SK.line, 5), circ(hc[0], hc[1], 30, SK.skin);
    limb([sh, [lerp(sh[0], el[0], .36), lerp(sh[1], el[1], .36)]], 80, SK.teal);
  }
  // when she is turned, the far arm (without a gesture) swings behind the body
  const farSide = -fd, farBehind = an > .45 && !(farSide < 0 ? o.armL : o.armR);
  if (farBehind) arm(farSide);
  g.save(); g.scale(bw, 1);
  shp(() => { g.moveTo(-58, -986); g.lineTo(-142, -946); g.lineTo(-120, -702); g.quadraticCurveTo(0, -690, 120, -702); g.lineTo(142, -946); g.lineTo(58, -986); g.quadraticCurveTo(0, o.back ? -980 : -945, -58, -986); g.closePath(); }, SK.teal);
  g.restore();
  if (!o.back) { limb([[tn * 8, -1000], [tn * 4, -975]], 56, SK.skin); g.beginPath(); g.moveTo(-58 * bw, -986); g.quadraticCurveTo(tn * 10, -945, 58 * bw, -986); g.strokeStyle = SK.line; g.lineWidth = OL; g.stroke(); }
  if (!farBehind) arm(farSide); arm(fd);
  if (o.back) { g.save(); g.translate(0, -1000); g.rotate(tilt); sashaHead(t, o, 0); sashaHead(t, o, 1); g.restore(); } else hair(1);
  g.restore();
}
// just the head and shoulders (plane cockpit, train window)
function sashaBust(x, y, k, t, o = {}) { at(x, y, k, (o.tilt || 0) + Math.sin(t * 1.4) * .03 + (o.talk ? env(t) * .04 * Math.sin(t * 7) : 0), () => { sashaHead(t, o, 0); shp(() => { g.moveTo(-150, 120); g.quadraticCurveTo(-150, 20, -58, 12); g.quadraticCurveTo(0, 50, 58, 12); g.quadraticCurveTo(150, 20, 150, 120); g.closePath(); }, SK.teal); limb([[0, 0], [0, 22]], 56, SK.skin); sashaHead(t, o, 1); }); }

function candyHead(t, o = {}) {
  const ex = o.expr || 'calm', lx = o.look ? o.look[0] : 0, ly = o.look ? o.look[1] : 0, sd = 3, yw = clamp(o.head || 0, -1, 1), tw = Math.max(0, Math.sin(t * 1.1 + 2)) ** 20 * 14;
  [-1, 1].forEach(sx => { const tip = [sx * 124 + (sx > 0 ? tw : 0), -214 - (ex === 'surprised' ? 14 : 0)]; shp(() => { g.moveTo(sx * 40, -100); g.quadraticCurveTo(sx * 70, -180, tip[0], tip[1]); g.quadraticCurveTo(sx * 150, -150, sx * 146, -50); g.closePath(); }, CK.body, CK.line); shp(() => { g.moveTo(sx * 72, -100); g.quadraticCurveTo(sx * 90, -160, tip[0] - sx * 4, tip[1] + 34); g.quadraticCurveTo(sx * 132, -130, sx * 128, -76); g.closePath(); }, CK.ear, null); line(sx * 84, -96, sx * 100, -140, CK.cream, 9); });
  shp(() => { for (let a = 0; a <= 360; a += 3) { const r0 = a * Math.PI / 180, inC = (a > 8 && a < 66) || (a > 114 && a < 172), z = inC ? 26 * Math.abs(((a % 19) / 19) * 2 - 1) + 10 : 0, x = Math.cos(r0) * (150 + z), y = Math.sin(r0) * (134 + z * .8); a ? g.lineTo(x, y) : g.moveTo(x, y); } g.closePath(); }, CK.body, CK.line);
  g.save(); g.beginPath(); g.ellipse(0, 0, 150, 134, 0, 0, TAU); g.clip(); ell(yw * 40, 78, 104, 74, CK.cream); line(yw * 20, -140, yw * 24, -84, CK.dark, 17); line(-40, -134, -32, -88, CK.dark, 13); line(40, -134, 32, -88, CK.dark, 13); line(-140, -20, -100, -14, CK.dark, 12); line(140, -20, 100, -14, CK.dark, 12); g.restore();
  const bl = ex === 'happy' ? 1 : blink(t, sd), wide = ex === 'surprised' ? 1.22 : 1;
  [-1, 1].forEach(sx => {
    const cx = sx * 60 + yw * 34, cy = -6;
    if (bl > .6) { curve(ex === 'happy' ? [cx - 30, cy + 6, cx, cy - 22, cx + 30, cy + 6] : [cx - 30, cy, cx, cy + 10, cx + 30, cy], '#3a2a24', 8); return; }
    const op = 1 - bl * .9;
    g.save(); g.beginPath(); g.ellipse(cx, cy, 35 * wide, 31 * wide * op, sx * -.12, 0, TAU); g.fillStyle = CK.eye; g.fill(); g.clip(); ell(cx, cy - 18, 40, 14, 'rgba(255,255,255,.25)');
    ell(cx + lx * 9, cy + ly * 7, ex === 'surprised' ? 10 : 14, ex === 'surprised' ? 13 : 24, '#2b1a14'); circ(cx + lx * 9 - 8, cy + ly * 7 - 10, 6, '#fff'); g.restore();
    g.beginPath(); g.ellipse(cx, cy, 35 * wide, 31 * wide * op, sx * -.12, 0, TAU); g.strokeStyle = CK.line; g.lineWidth = 5; g.stroke();
    curve([cx - 37 * wide, cy - 6, cx, cy - 60 * wide * op, cx + 37 * wide, cy - 6], '#3a2a24', 8); line(cx + sx * 34 * wide, cy - 8, cx + sx * 50 * wide, cy - 22, '#3a2a24', 6);
  });
  g.save(); g.translate(yw * 46, 0);
  shp(() => { g.moveTo(-15, 36); g.lineTo(15, 36); g.lineTo(0, 52); g.closePath(); }, CK.nose, CK.nose, 7);
  const m = o.meow || (ex === 'playful' ? .7 + .3 * Math.sin(t * 5) : ex === 'surprised' ? .5 : 0);
  if (m > .05) { shp(() => g.ellipse(0, 76, 17, 6 + 18 * m, 0, 0, TAU), '#7a2430', CK.line, 5); ell(0, 80 + 10 * m, 10, 7 * m, '#ee7f90'); }
  curve([0, 52, -3, 72, -27, 66], CK.line, 5); curve([0, 52, 3, 72, 27, 66], CK.line, 5);
  [-1, 1].forEach(sx => { for (let i = -1; i < 2; i++) line(sx * 74, 54 + i * 9, sx * 182 - yw * 30, 44 + i * 28 + Math.sin(t * 3 + i) * 3, 'rgba(255,255,255,.95)', 3.5); });
  g.restore();
}
// Candy: stands facing left; paws at (x, y), h = height in px. flip to face right.
function candy(x, y, h, t, o = {}) {
  const s = h / 880, wp = o.walk, bob = wp != null ? Math.sin(wp * 2) * 7 : Math.sin(t * 2 + 1) * 3;
  g.save(); g.translate(x, y); g.scale((o.flip ? -1 : 1) * s / Math.sqrt(o.sq || 1), s * (o.sq || 1));
  // tail
  const sw = Math.sin(t * (o.tailSpeed || 2.4)) * (o.tailAmp || 45), P = u => { const a = [270, -470 + bob], c = [610 + sw * .5, -470], e = [500 + sw, -900 - (o.tailUp || 0)]; return [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * c[0] + u * u * e[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * c[1] + u * u * e[1]]; };
  const tl = []; for (let i = 0; i < 15; i++) { const u = i / 14; tl.push([...P(u), 74 + 58 * Math.sin(u * Math.PI * .9 + .25)]); }
  tl.forEach(([a, b, r]) => circ(a, b, r + OL, CK.line)); tl.forEach(([a, b, r], i) => circ(a, b, r, i > 9 ? CK.cream : CK.body));
  [3, 6, 8].forEach(i => { const [a, b, r] = tl[i], [a2, b2] = tl[i + 1], nx = -(b2 - b), ny = a2 - a, n = Math.hypot(nx, ny); line(a + nx / n * r * .75, b + ny / n * r * .75, a - nx / n * r * .1, b - ny / n * r * .1, CK.dark, 26); });
  const leg = (x0, ph, col, lineC) => { const a = wp != null ? Math.sin(wp + ph) * .42 : 0, top = [x0, -300 + bob], paw = [x0 + Math.sin(a) * 270, -300 + bob + Math.cos(a) * 270 - (wp != null ? Math.max(0, Math.cos(wp + ph)) * 26 : 0)]; limb([top, paw], 98, col, CK.line); line(top[0] + (paw[0] - top[0]) * .45 - 30, top[1] + 130, top[0] + (paw[0] - top[0]) * .45 + 30, top[1] + 124, CK.dark, 12); shp(() => g.ellipse(paw[0] - 14, paw[1] + 8, 56, 36, 0, 0, TAU), CK.cream, CK.line); line(paw[0] - 34, paw[1] + 10, paw[0] - 34, paw[1] + 34, CK.line, 4); line(paw[0] - 8, paw[1] + 12, paw[0] - 8, paw[1] + 38, CK.line, 4); };
  leg(-170, Math.PI, CK.far); leg(150, 0, CK.far);
  // body
  const body = () => { g.ellipse(50, -440 + bob, 315, 205, 0, 0, TAU); };
  g.fillStyle = CK.line; g.beginPath(); g.ellipse(50, -440 + bob, 315 + OL, 205 + OL, 0, 0, TAU); g.fill(); ell(50, -440 + bob, 315, 205, CK.body);
  g.save(); g.beginPath(); body(); g.clip(); for (let i = 0; i < 7; i++) { const bx = -70 + i * 66; curve([bx, -660 + bob, bx + 44, -570 + bob, bx + 10, -470 + bob - (i % 2) * 30], CK.dark, 30); }
  shp(() => { g.moveTo(-200, -220 + bob); for (let i = 0; i <= 12; i++) g.lineTo(-170 + i * 36, -310 + bob + (i % 2 ? 26 : -8)); g.lineTo(300, -220 + bob); g.closePath(); }, CK.cream, null); g.restore();
  leg(-250, 0, CK.body); leg(250, Math.PI, CK.body);
  // chest fluff
  shp(() => { for (let a = 0; a <= 360; a += 6) { const r0 = a * Math.PI / 180, low = a > 10 && a < 170, z = low ? 30 * Math.abs(((a % 24) / 24) * 2 - 1) : 0, px = -290 + Math.cos(r0) * (178 + z), py = -450 + bob + Math.sin(r0) * (200 + z); a ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); }, CK.cream, CK.line);
  g.save(); g.translate(-305 + (o.headX || 0), -640 + bob + (o.headY || 0)); g.rotate((o.tilt || 0) + Math.sin(t * 1.6) * .03); g.scale(1.22, 1.22); candyHead(t, o); g.restore();
  g.restore();
}
function candyBack(x, y, h, t) {
  at(x, y, h / 600, 0, () => {
    const sw = Math.sin(t * 2.2) * 30; for (let p = 0; p < 2; p++) for (let i = 0; i < 9; i++) { const u = i / 8, a = 150 + u * 190, b = -60 - Math.sin(u * 2.4) * 120 + sw * u * u; circ(a, b, 40 + 22 * Math.sin(u * 3) + (p ? 0 : OL), p ? (i > 5 ? CK.cream : CK.body) : CK.line); }
    shp(() => g.ellipse(0, -190, 200, 200, 0, 0, TAU), CK.body, CK.line); g.save(); g.beginPath(); g.ellipse(0, -190, 200, 200, 0, 0, TAU); g.clip(); line(0, -390, 0, -40, CK.dark, 26); for (let i = 0; i < 4; i++) { curve([-20, -330 + i * 80, -90, -300 + i * 80, -150, -330 + i * 80], CK.dark, 24); curve([20, -330 + i * 80, 90, -300 + i * 80, 150, -330 + i * 80], CK.dark, 24); } g.restore();
    at(0, -430, 1, Math.sin(t * 1.6) * .04, () => { [-1, 1].forEach(sx => shp(() => { g.moveTo(sx * 40, -90); g.quadraticCurveTo(sx * 70, -170, sx * 120, -205); g.quadraticCurveTo(sx * 148, -150, sx * 142, -50); g.closePath(); }, CK.body, CK.line)); shp(() => g.ellipse(0, 0, 150, 130, 0, 0, TAU), CK.body, CK.line); line(0, -120, 0, 60, CK.dark, 18); line(-45, -110, -40, 30, CK.dark, 14); line(45, -110, 40, 30, CK.dark, 14); });
  });
}
let OFFC = null;
function tinted(fn, col) { if (!OFFC) { OFFC = document.createElement('canvas'); OFFC.width = W; OFFC.height = H; } const x = OFFC.getContext('2d'), G = g; x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, W, H); g = x; g.save(); fn(); g.restore(); x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-atop'; x.fillStyle = col; x.fillRect(0, 0, W, H); g = G; g.drawImage(OFFC, 0, 0); }
