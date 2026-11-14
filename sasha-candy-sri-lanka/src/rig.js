// Sasha and Candy drawn from scratch as jointed vector characters, modelled on the two character designs.
// All coordinates are in the design's own pixel space (Sasha 1024x1536, Candy 1536x1024) so proportions match.
const SK = { skin: '#e49451', shade: '#c9773c', neck: '#b96d3a', line: '#4f2410', hair: '#432b1c', hairL: '#63412c', hairD: '#2c190f', band: '#f8a8ac', bandD: '#e8808f', bandL: '#fcc6c8', glass: '#f09ab0', iris: '#5a3118', teal: '#409697', tealD: '#2d7a7d', shorts: '#f3aa3c', cuff: '#fabb55', seam: '#c98227', sock: '#f7ede7', sockD: '#d9cdc6', shoe: '#ee848d', shoeD: '#d9667a', toe: '#f5ebe3', noseL: '#f3ad6c' };
const CK = { body: '#aa958a', dark: '#857166', cream: '#e1cbb8', creamD: '#c9b19e', line: '#513e32', ear: '#c7a498', eye: '#f6c56c', eyeD: '#dc9e3a', nose: '#654b3c' };
const OLW = 5;
const blink = (t, seed = 0) => { const p = (t + seed * 1.37) % 3.6; return p < .16 ? Math.sin(p / .16 * Math.PI) : (p > 1.9 && p < 2.02 ? Math.sin((p - 1.9) / .12 * Math.PI) * (seed % 2) : 0); };
const POSE = { rest: [.2, .35], wave: [2.3, 2.95], point: [1.45, 2.25], show: [1.0, 2.05], cheer: [2.65, 3.0], hip: [.78, -.85], low: [.75, .9] };
const mixPose = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const speaking = t => { let k = 0; for (const l of T.lines) k = Math.max(k, Math.min(seg(t, l.a - .25, l.a + .25), 1 - seg(t, l.b - .1, l.b + .45))); return E.io(k); };
const glance = t => { let k = 0; for (const l of T.lines) k = Math.max(k, Math.min(seg(t, l.a - .35, l.a + .05), 1 - seg(t, l.a + 1.3, l.a + 1.75))); return E.io(k); };
const VSH = { R: [34, 0, 0, 0, 0], M: [28, 0, 0, 0, 0], F: [30, 9, 0, 1, 0], S: [34, 12, 0, 2, 0], L: [30, 20, 0, 1, 2], E: [38, 22, 0, 1, 1], I: [42, 15, 0, 1, 0], A: [36, 40, 0, 1, 1], O: [22, 34, 1, 0, 0], U: [14, 16, 1, 0, 0] };
function viseme(t) {
  const vs = T.vis; if (!vs || t < vs[0][0]) return { c: 'R', p: VSH.R };
  let lo = 0, hi = vs.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (vs[m][0] <= t) lo = m; else hi = m - 1; }
  const a = VSH[vs[lo][1]], nx = vs[lo + 1], k = nx ? E.io(seg(t, nx[0] - .07, nx[0])) : 0, b = nx ? VSH[nx[1]] : a;
  return { c: k < .5 ? vs[lo][1] : nx[1], p: [lerp(a[0], b[0], k), lerp(a[1], b[1], k), k < .5 ? a[2] : b[2], k < .5 ? a[3] : b[3], k < .5 ? a[4] : b[4]] };
}
function hopS(u, hgt) {
  if (u <= 0 || u >= 1) return { y: 0, sq: 1 };
  if (u < .2) return { y: 0, sq: 1 - .17 * Math.sin(u / .2 * Math.PI / 2) };
  if (u < .8) { const v = (u - .2) / .6; return { y: hgt * 4 * v * (1 - v), sq: 1 + .15 * Math.pow(Math.abs(Math.cos(v * Math.PI)), 1.5) - .03 }; }
  return { y: 0, sq: 1 - .2 * Math.sin((u - .8) / .2 * Math.PI) * (1 - (u - .8) / .4) };
}
function shp(fn, fill, ol = SK.line, lw = OLW) { g.beginPath(); fn(); if (fill) { g.fillStyle = fill; g.fill(); } if (ol) { g.strokeStyle = ol; g.lineWidth = lw; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); } }
// tapered limb through joints: pts [[x, y, width], ...]
function tlimb(pts, fill, ol = SK.line) {
  const pass = (grow, col) => { g.fillStyle = col; for (let i = 0; i < pts.length; i++) { const [x, y, w] = pts[i]; g.beginPath(); g.arc(x, y, w / 2 + grow, 0, TAU); g.fill(); if (i) { const [x0, y0, w0] = pts[i - 1], dx = x - x0, dy = y - y0, n = Math.hypot(dx, dy) || 1, nx = -dy / n, ny = dx / n, a = w0 / 2 + grow, b = w / 2 + grow; g.beginPath(); g.moveTo(x0 + nx * a, y0 + ny * a); g.lineTo(x + nx * b, y + ny * b); g.lineTo(x - nx * b, y - ny * b); g.lineTo(x0 - nx * a, y0 - ny * a); g.closePath(); g.fill(); } } };
  pass(OLW, ol); pass(0, fill);
}
// closed fluffy outline: smooth loop through pts with fur tufts of the given size
function furPath(pts, amp, step, lean = .35) {
  const n = pts.length, out = [];
  for (let i = 0; i < n; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n], len = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]), k = Math.max(1, Math.round(len / step)), a1 = p1[2] == null ? amp : p1[2];
    for (let j = 0; j < k; j++) { const u = j / k, u2 = u * u, u3 = u2 * u, f = c => .5 * ((2 * p1[c]) + (-p0[c] + p2[c]) * u + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * u2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * u3), x = f(0), y = f(1), tx = (p2[0] - p0[0]), ty = (p2[1] - p0[1]), tn = Math.hypot(tx, ty) || 1;
      out.push([x, y]); if (a1 > 0) out.push([x + (ty / tn) * a1 + (tx / tn) * a1 * lean + (tx / tn) * len / k * .5, y - (tx / tn) * a1 + (ty / tn) * a1 * lean + (ty / tn) * len / k * .5]); } }
  out.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath();
}

// ---------------------------------------------------------------- Sasha
function sashaHead(t, o, pass) {
  const ex = o.expr || 'happy', lx = o.look ? o.look[0] : 0, ly = o.look ? o.look[1] : 0, sd = o.seed || 0, CX = 516;
  const yaw = clamp(o.head || 0, -1, 1) * .8, sy = Math.sin(yaw), fc = sy * 16, sway = (o.sway || 0) + Math.sin(t * 2.3 + sd) * 4, hs = -sy * 34;
  const F = (fx, R = 138) => { const a0 = Math.asin(clamp(fx / R, -1, 1)), a = a0 + yaw; return { x: CX + R * Math.sin(a), sc: clamp(Math.cos(a) / Math.cos(a0), 0, 1.12) }; };
  if (pass === 0) {                                                        // the wavy hair mass behind the head and shoulders
    const R0 = [[516, 90], [596, 100], [654, 142], [692, 200], [706, 236], [732, 262], [722, 296], [750, 324], [728, 362], [758, 392], [740, 430], [762, 462], [742, 494], [716, 524], [690, 500], [664, 524], [636, 502], [612, 520], [594, 494]];
    const half = sx => R0.map(([px, py]) => [CX + hs * .6 + sx * (px - 516) + sway * clamp((py - 250) / 250), py]);
    const pts = [...half(1), ...half(-1).reverse().slice(0, -1)];
    smooth(pts); g.fillStyle = SK.hair; g.fill(); g.strokeStyle = SK.hairD; g.lineWidth = OLW; g.lineJoin = 'round'; g.stroke();
    g.save(); smooth(pts); g.clip();
    [-1, 1].forEach(sx => { for (let i = 0; i < 6; i++) { const x0 = CX + hs * .6 + sx * (118 + i * 22), y0 = 210 + i * 30, sw = sway * .6; g.beginPath(); g.moveTo(x0, y0); g.bezierCurveTo(x0 + sx * 50, y0 + 46, x0 - sx * 30, y0 + 92, x0 + sx * 26 + sw, y0 + 140); g.bezierCurveTo(x0 + sx * 70 + sw, y0 + 176, x0 + sx * 6 + sw, y0 + 214, x0 + sx * 44 + sw, y0 + 262); g.strokeStyle = i % 2 ? SK.hairL : SK.hairD; g.lineWidth = i % 2 ? 10 : 5; g.lineCap = 'round'; g.stroke(); } [[206, 250, 26], [226, 330, 28], [214, 410, 26], [176, 470, 24], [150, 300, 22]].forEach(([dx, cy0, rr0], i) => { g.beginPath(); g.arc(CX + hs * .6 + sx * dx + sway * .5, cy0, rr0, sx > 0 ? -1.2 : 4.3, sx > 0 ? 2.2 : 7.7); g.strokeStyle = i % 2 ? SK.hairD : SK.hairL; g.lineWidth = 6; g.stroke(); }); });
    g.restore(); return;
  }
  const band = () => {                                                     // twisted pink headband
    const arc = () => { g.beginPath(); g.ellipse(CX, 300, 152, 198, 0, Math.PI + .3, TAU - .3); };
    g.lineCap = 'round'; arc(); g.strokeStyle = SK.line; g.lineWidth = 36 + OLW * 2; g.stroke(); arc(); g.strokeStyle = SK.band; g.lineWidth = 36; g.stroke();
    for (let i = 0; i < 12; i++) { const a = Math.PI + .38 + i * (Math.PI - .76) / 11, px = CX + Math.cos(a) * 152, py = 300 + Math.sin(a) * 198; g.save(); g.translate(px, py); g.rotate(a + Math.PI / 2 + .75); curve([0, -19, 7, 0, 0, 19], SK.bandD, 4); curve([-9, -14, -4, 0, -10, 12], SK.bandL, 5); g.restore(); }
  };
  if (o.back) { shp(() => g.ellipse(CX, 300, 158, 176, 0, 0, TAU), SK.hair, null); for (let i = 0; i < 7; i++) curve([CX - 110 + i * 36, 160 + Math.abs(i - 3) * 14, CX - 120 + i * 38, 290, CX - 100 + i * 34, 430], i % 2 ? SK.hairL : SK.hairD, 6); band(); return; }
  // ears
  const ears = [-1, 1].map(sx => ({ a: sx * 1.5 + yaw, sx })).filter(e => Math.abs(e.a) < 1.62);
  const ear = e => { const x = CX + 126 * Math.sin(e.a) + fc * .3, w = 20 * (.5 + .5 * Math.abs(Math.sin(e.a))); shp(() => g.ellipse(x, 356, w, 30, 0, 0, TAU), SK.skin); curve([x - w * .3 * e.sx, 344, x + w * .5 * e.sx, 356, x - w * .2 * e.sx, 370], SK.shade, 4); };
  ears.filter(e => Math.abs(e.a) > 1.3).forEach(ear);
  // face
  const fx = CX + fc;
  shp(() => { g.moveTo(fx - 121, 250); g.bezierCurveTo(fx - 130, 330, fx - 118, 392, fx - 62, 424); g.quadraticCurveTo(fx, 448, fx + 62, 424); g.bezierCurveTo(fx + 118, 392, fx + 130, 330, fx + 121, 250); g.bezierCurveTo(fx + 100, 140, fx - 100, 140, fx - 121, 250); g.closePath(); }, SK.skin);
  ears.filter(e => Math.abs(e.a) <= 1.3).forEach(ear);
  // front hair: centre part, sweeping down to the temples
  const part = CX + 150 * Math.sin(yaw) * .8;
  [-1, 1].forEach(sx => {
    const tx = CX + sx * 126 + fc * .5, L = u => lerp(part, tx, u);
    shp(() => { g.moveTo(part, 146); g.bezierCurveTo(L(.3), 176, L(.72), 204, L(.86), 250); g.quadraticCurveTo(L(.93), 290, tx - sx * 4, 330); g.lineTo(CX + sx * 150, 300); g.bezierCurveTo(CX + sx * 172, 180, lerp(CX + sx * 100, part, .3), 92, part, 96); g.closePath(); }, SK.hair, SK.hairD, 4);
    curve([L(.1), 150, L(.5), 180, L(.8), 236], SK.hairL, 6); curve([L(.3), 130, L(.75), 170, L(1.0), 250], SK.hairD, 4);
  });
  band();
  // brows + eyes
  const bl = ex === 'laughing' ? 1 : blink(t, sd), wide = ex === 'surprised' ? 1.14 : 1, emph = o.talk ? env(t) * 6 : 0, by = (ex === 'surprised' ? 244 : 258) - emph, px = (lx + sy * .25) * 7;
  [-1, 1].forEach(sx => {
    const f = F(sx * 55), cy = 308 + ly * 3, tb = ex === 'curious' ? (sx > 0 ? -10 : 5) : 0;
    g.save(); g.translate(f.x, 0); g.scale(Math.max(.28, f.sc), 1);
    shp(() => { g.moveTo(-sx * 30, by + 8 + tb); g.quadraticCurveTo(sx * 4, by - 12 + tb, sx * 40, by + 4 + tb); g.quadraticCurveTo(sx * 6, by - 2 + tb, -sx * 30, by + 8 + tb); }, '#2c170d', '#2c170d', 4);
    if (bl > .6) { if (ex === 'laughing') curve([-34, cy + 8, 0, cy - 26, 34, cy + 8], '#2c170d', 8); else curve([-34, cy + 2, 0, cy + 14, 34, cy + 2], '#2c170d', 7); g.restore(); return; }
    const op = 1 - bl * .9;
    g.save(); g.beginPath(); g.moveTo(-sx * 38, cy + 4); g.quadraticCurveTo(0, cy - 60 * wide * op, sx * 42, cy - 4); g.quadraticCurveTo(sx * 6, cy + 50 * wide * op, -sx * 38, cy + 4); g.closePath(); g.fillStyle = '#fbf3ea'; g.fill(); g.clip();
    circ(-sx * 2 + px, cy + ly * 5, 25, SK.iris); circ(-sx * 2 + px, cy + ly * 5, 13, '#1f0f07'); circ(-sx * 2 + px + 10, cy + ly * 5 - 11, 8, '#fff'); g.restore();
    g.beginPath(); g.moveTo(-sx * 40, cy + 6); g.quadraticCurveTo(0, cy - 62 * wide * op, sx * 42, cy - 5); g.strokeStyle = '#24120a'; g.lineWidth = 7; g.lineCap = 'round'; g.stroke();
    if (f.sc > .55) line(sx * 40, cy - 6, sx * 54, cy - 18, '#24120a', 7);
    curve([sx * 34, cy + 10, sx * 8, cy + 30 * op, -sx * 24, cy + 22 * op], '#24120a', 3);
    g.restore();
  });
  // nose
  const nx = F(4, 152).x; ell(nx + sy * 6, 348, 13, 9, SK.noseL); curve([nx - 12 + sy * 4, 362, nx + sy * 14, 369, nx + 12 + sy * 6, 361], SK.shade, 4);
  // mouth
  const vz = o.talk ? viseme(t) : { c: 'R', p: VSH.R }, loud = o.talk ? clamp(env(t) * 2.2) : 0, mp = vz.p, mh = mp[1] * (.7 + .5 * loud), mf = F(4, 126);
  g.save(); g.translate(mf.x, 381); g.scale(Math.max(.62, mf.sc), 1);
  const open = (w, h, teeth, tongue) => { g.save(); shp(() => { g.moveTo(-w, 0); g.quadraticCurveTo(0, 8, w, 0); g.bezierCurveTo(w * .85, h * 1.35, -w * .85, h * 1.35, -w, 0); g.closePath(); }, '#7a2430', SK.line, 4); g.clip(); if (tongue === 2) ell(0, h * .3, w * .5, h * .5, '#ee7f90'); else if (tongue) ell(0, h * .98, w * .6, h * .45, '#ee7f90'); if (teeth === 2) { rect(-w, -2, w * 2, h * 1.4, '#fff'); line(-w, h * .5, w, h * .5, '#b9a9a9', 3); } else if (teeth) rect(-w, -2, w * 2, Math.min(11, h * .5), '#fff'); g.restore(); };
  if (o.talk && mh > 4 && loud > .06) { if (mp[2]) { shp(() => g.ellipse(0, mh * .5 + 2, mp[0], mh * .55 + 4, 0, 0, TAU), '#7a2430', SK.line, 4); ell(0, mh * .8 + 2, mp[0] * .5, mh * .2, '#ee7f90'); } else open(mp[0], mh, mp[3], mp[4]); }
  else if (o.talk && vz.c === 'M' && loud > .06) curve([-28, 4, 0, 9, 28, 4], SK.line, 5);
  else if (ex === 'laughing') open(42, 34, 1, 1);
  else if (ex === 'surprised') shp(() => g.ellipse(0, 8, 14, 18, 0, 0, TAU), '#7a2430', SK.line, 4);
  else if (ex === 'curious') curve([-24, 2, 2, 12, 28, -4], SK.line, 5);
  else { curve([-40, -2, 0, 22, 40, -2], SK.line, 5); line(-44, -5, -39, -1, SK.line, 4); line(44, -5, 39, -1, SK.line, 4); }
  g.restore();
  // glasses: soft-cornered pink frames
  const lens = [-1, 1].map(sx => { const f = F(sx * 67), w = 110 * Math.max(.3, f.sc); return { x: f.x, w, sc: f.sc, sx }; });
  lens.forEach(l => { g.beginPath(); const x0 = l.x - l.w / 2, r = Math.min(26, l.w / 2.4); g.roundRect(x0, 280, l.w, 72, [r * .7, r * .7, r * 1.25, r * 1.25]); g.fillStyle = 'rgba(255,235,225,.10)'; g.fill(); g.strokeStyle = SK.glass; g.lineWidth = 7; g.stroke(); if (l.sc > .6) { circ(l.x + l.sx * (l.w / 2 - 8), 289, 3, '#fff'); line(l.x + l.sx * l.w / 2, 296, CX + 128 * Math.sin(l.sx * 1.5 + yaw) + fc * .3, 318, SK.glass, 6); } });
  curve([lens[0].x + lens[0].w / 2, 302, (lens[0].x + lens[0].w / 2 + lens[1].x - lens[1].w / 2) / 2, 294, lens[1].x - lens[1].w / 2, 302], SK.glass, 7);
}
function shoe(ax, ay, fd, rot, sx = 1) {                                  // ankle at (ax, ay); fd = which way the toe points
  g.save(); g.translate(ax, ay); g.rotate(rot); g.scale(fd * sx, 1);
  shp(() => { g.moveTo(-38, 0); g.quadraticCurveTo(0, -10, 38, 0); g.bezierCurveTo(62, 40, 88, 80, 92, 104); g.quadraticCurveTo(96, 130, 84, 134); g.quadraticCurveTo(20, 146, -34, 138); g.quadraticCurveTo(-50, 130, -46, 108); g.bezierCurveTo(-42, 70, -44, 36, -38, 0); g.closePath(); }, SK.shoe);
  shp(() => { g.moveTo(-38, 0); g.quadraticCurveTo(0, -10, 38, 0); g.quadraticCurveTo(30, 22, 0, 20); g.quadraticCurveTo(-28, 20, -38, 0); }, SK.shoeD, SK.line, 4);
  shp(() => { g.moveTo(-46, 98); g.quadraticCurveTo(10, 112, 92, 94); g.quadraticCurveTo(98, 130, 84, 134); g.quadraticCurveTo(20, 146, -34, 138); g.quadraticCurveTo(-50, 130, -46, 108); g.closePath(); }, SK.toe, SK.line, 4);
  shp(() => { g.moveTo(26, 106); g.quadraticCurveTo(30, 68, 64, 62); g.quadraticCurveTo(90, 78, 92, 95); g.quadraticCurveTo(60, 106, 26, 106); g.closePath(); }, SK.toe, SK.line, 4);
  for (let i = 0; i < 4; i++) { const lx0 = -14 + i * 11, ly0 = 26 + i * 15; line(lx0 - 6, ly0 + 6, lx0 + 40, ly0 - 4, SK.line, 13); line(lx0 - 6, ly0 + 6, lx0 + 40, ly0 - 4, '#fff', 8); }
  g.restore();
}
function hand(wx, wy, ang, side, open) {                                  // wrist position, arm direction (angle from straight down), which side
  g.save(); g.translate(wx, wy); g.rotate(-ang);
  if (open) { for (let i = 0; i < 4; i++) { const a = (i - 1.5) * .26; tlimb([[Math.sin(a) * 30, 34 + Math.cos(a) * 6, 15], [Math.sin(a) * 58, 34 + Math.cos(a) * 46, 13]], SK.skin); } tlimb([[-side * 22, 22, 16], [-side * 44, 34, 13]], SK.skin); shp(() => g.ellipse(0, 30, 31, 34, 0, 0, TAU), SK.skin); }
  else {
    shp(() => { g.moveTo(-22, -4); g.bezierCurveTo(-36, 30, -34, 62, -22, 86); g.quadraticCurveTo(-8, 100, 6, 88); g.bezierCurveTo(24, 78, 30, 40, 22, -4); g.closePath(); }, SK.skin);
    shp(() => { g.moveTo(-side * 20, 22); g.quadraticCurveTo(-side * 40, 46, -side * 30, 68); g.quadraticCurveTo(-side * 20, 74, -side * 14, 58); }, SK.skin);
    curve([side * 2, 56, side * 6, 74, side * 0, 88], SK.line, 3.5); curve([side * 14, 50, side * 18, 66, side * 12, 80], SK.line, 3.5);
    rect(-20, -8, 40, 12, SK.skin);
  }
  g.restore();
}
// Sasha: feet at (x, y), h = full height. o.turn: body -1 (faces left) .. 0 (front) .. 1 (faces right); o.head: head turn.
function sasha(x, y, h, t, o = {}) {
  const s = h / 1412, dir = o.dir || 0, wp = o.walk, sd = o.seed || 0, sq = o.sq || 1, CX = 512;
  const tn = o.turn != null ? o.turn : (wp != null ? dir : 0), an = Math.abs(tn), fd = tn >= 0 ? 1 : -1, hy = o.head != null ? o.head : tn * .8;
  g.save(); g.translate(x, y); g.scale(s / Math.sqrt(sq), s * sq); g.translate(-CX, -1491);
  const legs = [-1, 1].map(side => {
    const ph = wp != null ? wp + (side > 0 ? Math.PI : 0) : 0, th = wp != null ? Math.sin(ph) * .5 * dir : side * .045 * (1 - an), kb = wp != null ? Math.max(0, -Math.cos(ph)) * .95 + .06 : 0;
    const hip = [CX + side * lerp(70, 34, an) - 4, 960], knee = [hip[0] + Math.sin(th) * 215, hip[1] + Math.cos(th) * 215], sh = th - dir * kb + (wp != null ? 0 : side * .01), ank = [knee[0] + Math.sin(sh) * 190, knee[1] + Math.cos(sh) * 190];
    return { side, hip, knee, ank, sh, kb };
  });
  const lift = 1365 - Math.max(legs[0].ank[1], legs[1].ank[1]);
  const idle = wp != null ? 0 : Math.sin(t * 2.2 + sd) * 3 - (o.talk ? env(t) * 5 : 0);
  g.translate(0, lift);
  const tilt = (o.tilt || 0) + Math.sin(t * 1.3 + sd) * .02 + (o.talk ? env(t) * .03 * Math.sin(t * 7) : 0) + (wp != null ? Math.sin(wp * 2) * .02 : 0);
  const ho = Object.assign({ sway: wp != null ? -dir * 10 + Math.sin(wp * 2) * 8 : 0 }, o, { head: hy });
  const head = pass => { g.save(); g.translate(CX + tn * 10, 470 + idle); g.rotate(tilt); g.translate(-CX, -470); sashaHead(t, ho, pass); g.restore(); };
  head(0);
  (fd < 0 ? [1, 0] : [0, 1]).forEach(i => {
    const L = legs[i], m = u => [lerp(L.knee[0], L.ank[0], u), lerp(L.knee[1], L.ank[1], u)];
    tlimb([[L.hip[0], L.hip[1], 112], [L.knee[0], L.knee[1], 92], [L.ank[0], L.ank[1], 72]], SK.skin);
    { const a = m(.5), b = [L.ank[0], L.ank[1] + 10], dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), nx = -dy / n, ny = dx / n; shp(() => { g.moveTo(a[0] + nx * 42, a[1] + ny * 42); g.lineTo(b[0] + nx * 39, b[1] + ny * 39); g.lineTo(b[0] - nx * 39, b[1] - ny * 39); g.lineTo(a[0] - nx * 42, a[1] - ny * 42); g.closePath(); }, SK.sock); const r2 = m(.66); curve([r2[0] + nx * 38, r2[1] + ny * 38, r2[0], r2[1] + 9, r2[0] - nx * 38, r2[1] - ny * 38], SK.sockD, 3); }
    shoe(L.ank[0], L.ank[1] - 10, an > .3 ? fd : L.side, wp != null ? dir * L.kb * .75 : 0, lerp(1, 1.04, an));
  });
  const bw = lerp(1, .74, an);
  g.save(); g.translate(CX, 0); g.scale(bw, 1); g.translate(-CX, 0);
  // shorts with rolled cuffs
  [-1, 1].forEach(sx => { g.save(); g.translate(CX, 0); g.scale(sx, 1); g.translate(-CX, 0); ell(438, 992, 56, 10, SK.shade); g.restore(); });
  shp(() => { g.moveTo(402, 792); g.quadraticCurveTo(512, 804, 620, 792); g.quadraticCurveTo(646, 850, 662, 925); g.lineTo(512, 930); g.lineTo(354, 925); g.quadraticCurveTo(372, 850, 402, 792); g.closePath(); }, SK.shorts);
  [-1, 1].forEach(sx => { g.save(); g.translate(CX, 0); g.scale(sx, 1); g.translate(-CX, 0);
    shp(() => { g.moveTo(354, 918); g.quadraticCurveTo(430, 938, 508, 930); g.lineTo(506, 978); g.quadraticCurveTo(430, 990, 357, 974); g.quadraticCurveTo(346, 946, 354, 918); g.closePath(); }, SK.cuff);
    if (!o.back) { curve([424, 800, 420, 850, 376, 856], SK.seam, 3.5); curve([438, 800, 436, 842, 392, 862], SK.seam, 3); } else shp(() => g.roundRect(400, 820, 70, 74, 10), null, SK.seam, 3.5);
    g.restore(); });
  if (!o.back) { curve([512, 800, 510, 860, 512, 928], SK.seam, 3.5); curve([536, 800, 538, 860, 518, 884], SK.seam, 3); shp(() => { g.moveTo(468, 882); g.quadraticCurveTo(500, 890, 510, 902); g.quadraticCurveTo(524, 890, 556, 880); g.quadraticCurveTo(524, 898, 510, 902); }, SK.seam, null); }
  g.restore();
  g.translate(0, idle);
  function arm(side) {
    let A1, A2; const p = side < 0 ? o.armL : o.armR;
    if (p) { A1 = side * p[0]; A2 = side * p[1]; } else if (wp != null) { const a = Math.sin(wp + (side > 0 ? 0 : Math.PI)) * .5 * dir; A1 = side * .08 + a; A2 = A1 + dir * .4; } else { A1 = side * (.2 + Math.sin(t * 2.2 + sd) * .015) * (1 - an * .6); A2 = side * .35 * (1 - an) + fd * .18 * an; }
    const sh = [CX + side * lerp(114, p ? 76 : 34, an), 556], el = [sh[0] + Math.sin(A1) * 238, sh[1] + Math.cos(A1) * 238], wr = [el[0] + Math.sin(A2) * 112, el[1] + Math.cos(A2) * 112];
    tlimb([[sh[0], sh[1], 62], [el[0], el[1], 56], [wr[0], wr[1], 48]], SK.skin);
    hand(wr[0], wr[1], A2, side, p && p[2]);
    // short sleeve, following the upper arm
    const ux = Math.sin(A1), uy = Math.cos(A1), ox = side * uy, oy = -side * ux, q = (d, wv) => [sh[0] + ux * d + ox * wv, sh[1] + uy * d + oy * wv];
    const p1 = q(-50, -40), p2 = q(-16, 42), p3 = q(60, 48), p4 = q(94, -40);
    shp(() => { g.moveTo(p1[0], p1[1]); g.quadraticCurveTo(...q(-46, 30), p2[0], p2[1]); g.lineTo(p3[0], p3[1]); g.lineTo(p4[0], p4[1]); g.closePath(); }, SK.teal, null);
    g.beginPath(); g.moveTo(p1[0], p1[1]); g.quadraticCurveTo(...q(-46, 30), p2[0], p2[1]); g.lineTo(p3[0], p3[1]); g.lineTo(p4[0], p4[1]); g.strokeStyle = SK.line; g.lineWidth = OLW; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke();
  }
  const farSide = -fd, farBehind = an > .45 && !(farSide < 0 ? o.armL : o.armR);
  if (farBehind) arm(farSide);
  // t-shirt
  g.save(); g.translate(CX, 0); g.scale(bw, 1); g.translate(-CX, 0);
  shp(() => { g.moveTo(468, 496); g.quadraticCurveTo(410, 506, 388, 528); g.quadraticCurveTo(404, 600, 420, 650); g.bezierCurveTo(414, 700, 404, 750, 398, 790); g.quadraticCurveTo(512, 812, 622, 790); g.bezierCurveTo(616, 750, 606, 700, 600, 650); g.quadraticCurveTo(620, 600, 636, 528); g.quadraticCurveTo(612, 506, 558, 496); g.quadraticCurveTo(512, o.back ? 500 : 540, 468, 496); g.closePath(); }, SK.teal);
  if (!o.back) { curve([462, 500, 512, 552, 564, 500], SK.tealD, 4); shp(() => { g.moveTo(410, 756); g.quadraticCurveTo(450, 772, 500, 770); g.quadraticCurveTo(450, 780, 410, 756); }, SK.tealD, null); shp(() => { g.moveTo(520, 760); g.quadraticCurveTo(560, 750, 592, 756); g.quadraticCurveTo(560, 762, 520, 760); }, SK.tealD, null); curve([432, 664, 436, 700, 452, 716], SK.tealD, 4); curve([590, 666, 584, 690, 572, 704], SK.tealD, 4); }
  g.restore();
  if (!o.back) { shp(() => { g.moveTo(480 + tn * 8, 440); g.lineTo(476 + tn * 4, 500); g.quadraticCurveTo(512 + tn * 6, 538, 550 + tn * 4, 500); g.lineTo(548 + tn * 8, 440); g.closePath(); }, SK.skin); g.save(); g.beginPath(); g.rect(470, 436, 90, 60); g.clip(); ell(514 + tn * 8, 440, 46, 30, SK.neck); g.restore(); }
  if (!farBehind) arm(farSide); arm(fd);
  if (o.back) { g.save(); g.translate(CX, 470); g.rotate(tilt); g.translate(-CX, -470); sashaHead(t, o, 0); sashaHead(t, o, 1); g.restore(); } else head(1);
  g.restore();
}
function sashaBust(x, y, k, t, o = {}) {                                  // head and shoulders; origin = base of the neck
  at(x, y, k, (o.tilt || 0) + Math.sin(t * 1.4) * .03 + (o.talk ? env(t) * .04 * Math.sin(t * 7) : 0), () => {
    g.translate(-512, -480); sashaHead(t, o, 0);
    shp(() => { g.moveTo(468, 496); g.quadraticCurveTo(380, 510, 362, 600); g.lineTo(662, 600); g.quadraticCurveTo(644, 510, 558, 496); g.quadraticCurveTo(512, 540, 468, 496); g.closePath(); }, SK.teal);
    shp(() => { g.moveTo(480, 440); g.lineTo(476, 500); g.quadraticCurveTo(512, 538, 550, 500); g.lineTo(548, 440); g.closePath(); }, SK.skin); curve([462, 500, 512, 552, 564, 500], SK.tealD, 4);
    sashaHead(t, o, 1);
  });
}

// ---------------------------------------------------------------- Candy
function candyHead(t, o = {}) {                                           // head centre at (0, 0); she looks a little to her right (screen left)
  const ex = o.expr || 'calm', lx = o.look ? o.look[0] : 0, ly = o.look ? o.look[1] : 0, yw = clamp(-.45 + (o.head || 0) * .6, -1, 1), tw = Math.max(0, Math.sin(t * 1.1 + 2)) ** 20 * 12, fxs = yw * 46;
  // ears
  [-1, 1].forEach(sx => { const bx = sx * 96 - yw * 10, tip = [sx * 128 - yw * 22 + (sx > 0 ? tw : 0), -168 - (ex === 'surprised' ? 12 : 0)];
    shp(() => { g.moveTo(bx - sx * 62, -84); g.quadraticCurveTo(bx - sx * 30, -150, tip[0], tip[1]); g.quadraticCurveTo(bx + sx * 58, -110, bx + sx * 52, -30); g.closePath(); }, CK.body, CK.line);
    shp(() => { g.moveTo(bx - sx * 30, -78); g.quadraticCurveTo(bx - sx * 6, -128, tip[0] - sx * 6, tip[1] + 30); g.quadraticCurveTo(bx + sx * 38, -100, bx + sx * 36, -46); g.closePath(); }, CK.ear, null);
    for (let i = 0; i < 3; i++) { const u = i / 2; shp(() => { g.moveTo(bx - sx * 26 + u * sx * 30, -52); g.quadraticCurveTo(bx - sx * 6 + u * sx * 20, -98 + u * 10, bx + sx * 20 + u * sx * 16, -112 + u * 30); g.quadraticCurveTo(bx + sx * 4 + u * sx * 22, -80, bx - sx * 8 + u * sx * 30, -44); g.closePath(); }, CK.cream, null); } });
  // head: fluffy cheeks
  const hp = [[-10, -130, 0], [-80, -120, 0], [-140, -70, 14], [-176, -8, 30], [-196, 60, 34], [-150, 124, 30], [-70, 158, 22], [20, 164, 22], [110, 140, 30], [182, 80, 34], [176, 0, 30], [150, -66, 14], [86, -118, 0]];
  shp(() => furPath(hp, 22, 46, .8), CK.body, CK.line);
  g.save(); g.beginPath(); furPath(hp, 22, 46, .8); g.clip();
  ell(fxs - 4, 96, 150, 96, CK.cream); ell(-118 + fxs * .4, 40, 70, 80, CK.cream); ell(128 + fxs * .4, 46, 76, 84, CK.cream);          // muzzle + cheek fluff
  ell(fxs - 66, -6, 56, 50, CK.cream); ell(fxs + 70, -6, 62, 52, CK.cream);                                                         // pale eye patches
  ell(fxs, 104, 78, 44, CK.creamD); ell(fxs, 80, 86, 40, CK.cream);
  [[0, 17, 60], [-36, 13, 46], [36, 13, 46]].forEach(([dx, w, len]) => shp(() => { const x0 = fxs * .6 + dx; g.moveTo(x0 - w / 2, -140); g.lineTo(x0 + w / 2, -140); g.lineTo(x0 + dx * .1, -140 + len * 1.5); g.closePath(); }, CK.dark, null));
  shp(() => { g.moveTo(fxs - 16, -40); g.quadraticCurveTo(fxs - 2, 20, fxs - 6, 60); g.quadraticCurveTo(fxs + 20, 20, fxs + 14, -40); g.closePath(); }, CK.dark, null);
  line(-176, 30, -118, 40, CK.dark, 12); line(176, 30, 124, 42, CK.dark, 12);
  g.restore();
  // eyes: big amber almonds with a lash flick
  const bl = ex === 'happy' ? 1 : blink(t, 3), wide = ex === 'surprised' ? 1.16 : 1;
  [-1, 1].forEach(sx => {
    const far = Math.max(0, -sx * Math.sign(yw)) * Math.abs(yw), sc = 1 - .62 * far, cx = sx * 62 + fxs * .8 + 4, cy = 22, w = 46 * sc * wide, hgt = 40 * wide;
    
    if (bl > .6) { curve(ex === 'happy' ? [cx - w, cy + 8, cx, cy - 26, cx + w, cy + 8] : [cx - w, cy, cx, cy + 12, cx + w, cy], '#2b1d18', 8); return; }
    const op = 1 - bl * .9, eye = () => { g.beginPath(); g.moveTo(cx - sx * w, cy + 6); g.quadraticCurveTo(cx - sx * 4, cy - hgt * 1.5 * op, cx + sx * w, cy - 8); g.quadraticCurveTo(cx + sx * 6, cy + hgt * 1.75 * op, cx - sx * w, cy + 6); g.closePath(); };
    g.save(); eye(); g.fillStyle = CK.eye; g.fill(); g.clip(); ell(cx, cy + 26, w, 16, CK.eyeD);
    ell(cx - sx * 2 + lx * 8, cy + ly * 6, ex === 'surprised' ? 12 : 15 * sc + 2, ex === 'surprised' ? 16 : 27, '#2b1a14'); circ(cx - sx * 2 + lx * 8 + 9, cy + ly * 6 - 14, 9, '#fff'); g.restore();
    eye(); g.strokeStyle = '#2b1d18'; g.lineWidth = 6; g.lineJoin = 'round'; g.stroke();
    g.beginPath(); g.moveTo(cx - sx * w, cy + 6); g.quadraticCurveTo(cx - sx * 4, cy - hgt * 1.55 * op, cx + sx * w, cy - 8); g.lineTo(cx + sx * (w + 16), cy - 20); g.strokeStyle = '#2b1d18'; g.lineWidth = 9; g.lineCap = 'round'; g.stroke();
  });
  // nose, mouth, whiskers
  g.save(); g.translate(fxs - 4, 0);
  shp(() => { g.moveTo(-22, 56); g.quadraticCurveTo(0, 50, 22, 56); g.quadraticCurveTo(14, 80, 0, 86); g.quadraticCurveTo(-14, 80, -22, 56); }, CK.nose, '#3d2c24', 4); ell(-6, 62, 8, 4, 'rgba(255,255,255,.18)');
  const m = o.meow || (ex === 'playful' ? .6 + .3 * Math.sin(t * 5) : ex === 'surprised' ? .5 : 0);
  if (m > .05) { shp(() => g.ellipse(0, 112 + 6 * m, 17, 6 + 18 * m, 0, 0, TAU), '#7a2430', CK.line, 4); ell(0, 118 + 14 * m, 10, 7 * m, '#ee7f90'); }
  line(0, 86, 0, 100, CK.line, 4); curve([0, 100, -6, 116, -30, 108], CK.line, 4.5); curve([0, 100, 6, 116, 30, 108], CK.line, 4.5);
  [-1, 1].forEach(sx => { for (let i = -1; i < 2; i++) { const wy = Math.sin(t * 3 + i) * 3; curve([sx * 44, 84 + i * 10, sx * 130, 70 + i * 22, sx * (230 - yw * sx * 30), 86 + i * 44 + wy], '#fffaf4', 3.5); } });
  g.restore();
}
// Candy: stands facing left; paws at (x, y), h = height. flip to face right.
function candy(x, y, h, t, o = {}) {
  const s = h / 880, wp = o.walk, sq = o.sq || 1, bob = wp != null ? Math.sin(wp * 2) * 7 : Math.sin(t * 2 + 1) * 3;
  g.save(); g.translate(x, y); g.scale((o.flip ? -1 : 1) * s / Math.sqrt(sq), s * sq); g.translate(-675, -964);
  // tail: a big plume that curls over
  const sw = Math.sin(t * (o.tailSpeed || 2.4)) * (o.tailAmp || 45) / 300, base = [[1056, 596, 84], [1046, 446, 118], [1068, 304, 142], [1140, 192, 142], [1252, 150, 124], [1340, 208, 96], [1364, 300, 62], [1336, 400, 12]];
  const cl = base.map(([px, py, r], i) => { const a = sw * (i / 7) * 1.5, dx = px - 1050, dy = py - 580; return [1050 + dx * Math.cos(a) - dy * Math.sin(a), 580 + bob + dx * Math.sin(a) + dy * Math.cos(a), r]; });
  const side = (sgn) => cl.map(([px, py, r], i) => { const p0 = cl[Math.max(0, i - 1)], p1 = cl[Math.min(7, i + 1)], tx = p1[0] - p0[0], ty = p1[1] - p0[1], n = Math.hypot(tx, ty); return [px + sgn * (-ty / n) * r, py + sgn * (tx / n) * r]; });
  const tp = [...side(-1), ...side(1).reverse()];
  const tuft = (px, py, ang, len, col) => { g.save(); g.translate(px, py); g.rotate(ang); shp(() => { g.moveTo(-22, 6); g.quadraticCurveTo(-6, -len * .6, 10, -len); g.quadraticCurveTo(14, -len * .4, 24, 6); }, col, CK.line); rect(-24, 2, 50, 16, col); g.restore(); };
  shp(() => smooth(tp), CK.cream, CK.line);
  side(-1).slice(1, 7).forEach(([px, py], i) => { const c = cl[i + 1]; tuft(px, py, Math.atan2(py - c[1], px - c[0]) + Math.PI / 2 + .5, 30, CK.cream); });
  g.save(); g.beginPath(); smooth(tp); g.clip();
  const inner = cl.slice(0, 6).map(([px, py, r], i) => { const p0 = cl[Math.max(0, i - 1)], p1 = cl[i + 1], tx = p1[0] - p0[0], ty = p1[1] - p0[1], n = Math.hypot(tx, ty); return [px - (-ty / n) * r * .42, py - (tx / n) * r * .42, r * 1.05]; });
  g.beginPath(); inner.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.strokeStyle = CK.body; g.lineWidth = 104; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke();
  for (let i = 0; i < 5; i++) { const a = inner[i], b = inner[i + 1], tx = b[0] - a[0], ty = b[1] - a[1], n = Math.hypot(tx, ty), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, nx = -ty / n, ny = tx / n; shp(() => { g.moveTo(mx - nx * 78, my - ny * 78); g.quadraticCurveTo(mx + tx * .2, my + ty * .2, mx + nx * 62 + tx * .5, my + ny * 62 + ty * .5); g.quadraticCurveTo(mx - tx * .1, my - ty * .1, mx - nx * 78 - tx * .28, my - ny * 78 - ty * .28); g.closePath(); }, CK.dark, null); }
  g.restore();
  // legs
  const leg = (top, paw, w, ph, stripes) => {
    const a = wp != null ? Math.sin(wp + ph) * .4 : 0, lf = wp != null ? Math.max(0, Math.cos(wp + ph)) * 24 : 0, ca = Math.cos(a), sa = Math.sin(a), R = (px, py) => [top[0] + (px - top[0]) * ca - (py - top[1]) * sa, top[1] + bob * .5 + (px - top[0]) * sa + (py - top[1]) * ca - lf];
    const P = R(paw[0], paw[1]), M = R((top[0] + paw[0]) / 2 + (paw[2] || 0), (top[1] + paw[1]) / 2);
    tlimb([[top[0], top[1] + bob * .5, w * 1.25], [M[0], M[1], w], [P[0], P[1] - 34, w * .86]], CK.body, CK.line);
    stripes.forEach(u => { const q = [lerp(top[0], P[0], u), lerp(top[1], P[1] - 34, u)]; shp(() => { g.moveTo(q[0] - w * .46, q[1] - 6); g.quadraticCurveTo(q[0], q[1] + 4, q[0] + w * .2, q[1] + 22); g.quadraticCurveTo(q[0] - w * .1, q[1] + 20, q[0] - w * .46, q[1] + 12); g.closePath(); }, CK.dark, null); });
    shp(() => { g.moveTo(P[0] - 56, P[1] - 4); g.quadraticCurveTo(P[0] - 58, P[1] - 50, P[0] - 6, P[1] - 54); g.quadraticCurveTo(P[0] + 46, P[1] - 52, P[0] + 48, P[1] - 6); g.quadraticCurveTo(P[0] + 20, P[1] + 6, P[0] - 30, P[1] + 4); g.quadraticCurveTo(P[0] - 52, P[1] + 4, P[0] - 56, P[1] - 4); }, CK.cream, CK.line);
    curve([P[0] - 30, P[1] - 30, P[0] - 34, P[1] - 12, P[0] - 28, P[1] + 2], CK.line, 4); curve([P[0] - 4, P[1] - 30, P[0] - 8, P[1] - 12, P[0] - 2, P[1] + 3], CK.line, 4);
  };
  leg([498, 700], [460, 962], 84, Math.PI, [.3, .55, .75]); leg([950, 720], [956, 958], 82, 0, [.35, .6]);
  // body
  const bp = [[560, 430 + bob, 0], [640, 404 + bob, 0], [760, 392 + bob, 0], [880, 410 + bob, 0], [968, 450 + bob, 6], [1010, 540 + bob, 14], [1004, 650 + bob, 20], [960, 740 + bob, 22], [860, 775 + bob, 26], [740, 790 + bob, 26], [620, 778 + bob, 26], [520, 730 + bob, 20], [470, 620 + bob, 0], [490, 500 + bob, 0]];
  shp(() => furPath(bp, 15, 96, 1.2), CK.body, CK.line);
  g.save(); g.beginPath(); furPath(bp, 15, 96, 1.2); g.clip();
  shp(() => furPath([[520, 700 + bob], [600, 680 + bob], [700, 700 + bob], [800, 690 + bob], [900, 720 + bob], [960, 800 + bob], [700, 860 + bob], [480, 800 + bob]], 20, 36, .6), CK.cream, null);
  [[620, 420, 60, 250, -30], [720, 398, 76, 290, -40], [820, 400, 70, 270, -34], [900, 424, 60, 220, -20], [960, 480, 50, 180, 0], [560, 470, 44, 190, -10], [670, 560, 40, 150, 30], [790, 600, 40, 130, 30]].forEach(([sx0, sy0, w, len, bend]) => shp(() => { const y0 = sy0 + bob; g.moveTo(sx0 - w / 2, y0 - 10); g.quadraticCurveTo(sx0 + w * .5 + bend, y0 + len * .45, sx0 + bend * 1.6, y0 + len); g.quadraticCurveTo(sx0 + bend * .4 - w * .2, y0 + len * .5, sx0 - w / 2, y0 - 10); g.closePath(); }, CK.dark, null));
  g.restore();
  leg([400, 700], [398, 958], 86, 0, [.3, .52, .74]); leg([772, 730], [748, 950, 6], 104, Math.PI, [.3, .55]);
  // chest ruff
  const rp = [[250, 470 + bob, 16], [240, 540 + bob, 26], [268, 610 + bob, 30], [320, 670 + bob, 34], [390, 700 + bob, 34], [450, 660 + bob, 30], [510, 590 + bob, 26], [556, 500 + bob, 14], [560, 430 + bob, 0], [400, 400 + bob, 0], [280, 420 + bob, 0]];
  shp(() => furPath(rp, 22, 54, .9), CK.cream, CK.line);
  [[300, 520, 40], [370, 560, 56], [440, 520, 44], [340, 620, 36], [420, 610, 36]].forEach(([fx0, fy0, len]) => { curve([fx0, fy0 + bob, fx0 + 10, fy0 + bob + len * .6, fx0 + 2, fy0 + bob + len], CK.creamD, 4); curve([fx0 + 26, fy0 + bob + 4, fx0 + 14, fy0 + bob + len * .6, fx0 + 2, fy0 + bob + len], CK.creamD, 4); });
  g.save(); g.translate(398 + (o.headX || 0), 300 + bob + (o.headY || 0)); g.rotate((o.tilt || 0) + Math.sin(t * 1.6) * .03); g.scale(1.12, 1.12); candyHead(t, o); g.restore();
  g.restore();
}
let OFFC = null;
function tinted(fn, col) { if (!OFFC) { OFFC = document.createElement('canvas'); OFFC.width = W; OFFC.height = H; } const x = OFFC.getContext('2d'), G = g; x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, W, H); g = x; g.save(); fn(); g.restore(); x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-atop'; x.fillStyle = col; x.fillRect(0, 0, W, H); g = G; g.drawImage(OFFC, 0, 0); }
