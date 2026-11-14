// Cut-out puppets: Sasha and Candy are the original illustrations, cut into parts (tools/parts.py) and animated at the joints.
const PP = window.PARTS, PIMG = {};
const blink = (t, seed = 0) => { const p = (t + seed * 1.37) % 3.6; return p < .13 ? 1 : (p > 1.9 && p < 2.0 ? (seed % 2) : 0); };
const POSE = { rest: [.17, .28], wave: [2.3, 2.95], point: [1.45, 2.25], show: [1.0, 2.05], cheer: [2.65, 3.0], hip: [.78, -.85], low: [.75, .9] };
const mixPose = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const speaking = t => { let k = 0; for (const l of T.lines) k = Math.max(k, Math.min(seg(t, l.a - .25, l.a + .25), 1 - seg(t, l.b - .1, l.b + .45))); return E.io(k); };
const glance = t => { let k = 0; for (const l of T.lines) k = Math.max(k, Math.min(seg(t, l.a - .35, l.a + .05), 1 - seg(t, l.a + 1.3, l.a + 1.75))); return E.io(k); };
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
// draw a part so that its image point (px, py) is the pivot, rotated by rot, placed at (px + dx, py + dy)
function part(name, px, py, rot = 0, dx = 0, dy = 0) { const im = PIMG[name], o = PP[name]; g.save(); g.translate(px + dx, py + dy); g.rotate(rot); g.drawImage(im, o[0] - px, o[1] - py); g.restore(); }
function shpL(fn, fill, ol, lw) { g.beginPath(); fn(); if (fill) { g.fillStyle = fill; g.fill(); } if (ol) { g.strokeStyle = ol; g.lineWidth = lw; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); } }

const SLN = '#3a1d10';
function sashaFace(t, o) {                                     // blink + lip-sync drawn over the head art (image coordinates)
  const ex = o.expr || 'happy', loud = o.talk ? clamp(env(t) * 2.2) : 0, vz = o.talk ? viseme(t) : { c: 'R', p: VSH.R };
  const happyEyes = ex === 'laughing' && loud < .06, shut = happyEyes || blink(t, o.seed || 0) > .5;
  if (shut) {
    part('s_eyeL', 0, 0); part('s_eyeR', 0, 0);
    [[414, 316, 452, 334, 490, 314, 498, 306], [620, 316, 582, 334, 544, 314, 536, 306]].forEach(e => {
      if (happyEyes) curve([e[0], e[1] + 8, e[2], e[3] - 40, e[4], e[5] + 10], SLN, 7); else { curve([e[0], e[1], e[2], e[3], e[4], e[5]], SLN, 7); }
    });
    line(412, happyEyes ? 322 : 316, 402, happyEyes ? 318 : 310, SLN, 5); line(622, happyEyes ? 322 : 316, 632, happyEyes ? 318 : 310, SLN, 5);
  }
  const mp = vz.p, mh = mp[1] * (.7 + .5 * loud), talking = o.talk && loud > .06, big = ex === 'laughing' && !talking, oh = ex === 'surprised' && !talking;
  if (!(talking || big || oh)) return;
  part('s_mouth', 0, 0);
  g.save(); g.translate(517, 381);
  const open = (w, h, teeth, tongue) => { g.save(); shpL(() => { g.moveTo(-w, 0); g.quadraticCurveTo(0, 8, w, 0); g.bezierCurveTo(w * .85, h * 1.35, -w * .85, h * 1.35, -w, 0); g.closePath(); }, '#7a2430', SLN, 5); g.clip(); if (tongue === 2) ell(0, h * .3, w * .5, h * .5, '#ee7f90'); else if (tongue) ell(0, h * .98, w * .6, h * .45, '#ee7f90'); if (teeth === 2) { rect(-w, -2, w * 2, h * 1.4, '#fff'); line(-w, h * .5, w, h * .5, '#b9a9a9', 3); } else if (teeth) rect(-w, -2, w * 2, Math.min(11, h * .5), '#fff'); g.restore(); };
  if (big) open(42, 34, 1, 1);
  else if (oh) shpL(() => g.ellipse(0, 8, 14, 18, 0, 0, TAU), '#7a2430', SLN, 5);
  else if (mh > 4) { if (mp[2]) { shpL(() => g.ellipse(0, mh * .5 + 2, mp[0], mh * .55 + 4, 0, 0, TAU), '#7a2430', SLN, 5); ell(0, mh * .8 + 2, mp[0] * .5, mh * .2, '#ee7f90'); } else open(mp[0], mh, mp[3], mp[4]); }
  else if (vz.c === 'M') curve([-28, 4, 0, 9, 28, 4], SLN, 6);
  else curve([-38, -2, 0, 20, 38, -2], SLN, 5);
  g.restore();
}
// Sasha: feet at (x, y), h = full height in px. Arm poses are [upper, forearm] angles from straight down, outward positive.
function sasha(x, y, h, t, o = {}) {
  const s = h / 1415, sq = o.sq || 1, wp = o.walk, sd = o.seed || 0, st = wp != null ? Math.sin(wp) : 0, loud = o.talk ? env(t) : 0;
  g.save(); g.translate(x, y); g.scale(s / Math.sqrt(sq), s * sq); g.translate(-512, -1495);
  const skin = `rgb(${PP.s_skin})`;
  // legs (behind the shorts); when walking she waddles: lift one foot, then the other
  [['L', 437, 435, -1, Math.max(0, st)], ['R', 578, 574, 1, Math.max(0, -st)]].forEach(([n, hx, kx, side, lift]) => {
    const ru = side * -.13 * lift, rl = ru + side * .3 * lift, dy = -lift * 30, kxw = hx + (kx - hx) * Math.cos(ru) - 195 * Math.sin(ru), kyw = 985 + dy + (kx - hx) * Math.sin(ru) + 195 * Math.cos(ru);
    part('s_leg' + n + '_lo', kx, 1180, rl, kxw - kx, kyw - 1180); part('s_leg' + n + '_up', hx, 985, ru, 0, dy);
  });
  const bob = wp != null ? -Math.abs(st) * 12 : Math.sin(t * 2.2 + sd) * 3 - loud * 5, roll = wp != null ? st * .05 : (o.lean || 0);
  g.translate(508, 985 + bob); g.rotate(roll); g.translate(-508, -985);
  part('s_torso', 0, 0);
  [['L', 394, 352, 1, o.armL], ['R', 632, 674, -1, o.armR]].forEach(([n, sx, ex2, sg, p]) => {
    const sway = Math.sin(t * 2.2 + sd + (sg > 0 ? 0 : 1)) * .012 + (wp != null ? st * .1 : 0);
    const ru = sg * ((p ? p[0] - .17 : 0)) + sway, rl = sg * ((p ? p[1] - .28 : 0)) + sway;
    const exw = sx + (ex2 - sx) * Math.cos(ru) - 248 * Math.sin(ru), eyw = 552 + (ex2 - sx) * Math.sin(ru) + 248 * Math.cos(ru);
    part('s_arm' + n + '_lo', ex2, 800, rl, exw - ex2, eyw - 800); if (Math.abs(rl - ru) > .06) circ(exw, eyw, 30, skin); part('s_arm' + n + '_up', sx, 552, ru);
  });
  const tilt = (o.tilt || 0) + Math.sin(t * 1.3 + sd) * .02 + loud * .035 * Math.sin(t * 7) - roll * .5;
  g.translate(518, 446 - loud * 3); g.rotate(tilt); g.translate(-518, -446);
  part('s_head', 0, 0); sashaFace(t, o);
  g.restore();
}
// head and shoulders only (plane cockpit, train window); origin = base of the neck
function sashaBust(x, y, k, t, o = {}) {
  at(x, y, k, (o.tilt || 0) + Math.sin(t * 1.4) * .03 + (o.talk ? env(t) * .04 * Math.sin(t * 7) : 0), () => {
    g.translate(-518, -470); g.save(); g.beginPath(); g.rect(0, 380, 1024, 250); g.clip(); part('s_torso', 0, 0); part('s_armL_up', 0, 0); part('s_armR_up', 0, 0); g.restore(); part('s_head', 0, 0); sashaFace(t, o);
  });
}

const CL = '#2b1d18';
function candyFace(t, o) {
  const ex = o.expr || 'calm', shut = ex === 'happy' || blink(t, 3) > .5;
  if (shut) { part('c_eyeL', 0, 0); part('c_eyeR', 0, 0); const up = ex === 'happy' ? -30 : 0; curve([268, 328 - up * .2, 300, 346 + up, 334, 324 - up * .2], CL, 7); curve([384, 328 - up * .2, 432, 346 + up, 482, 318 - up * .2], CL, 7); line(482, 318 - up * .2, 496, 308 - up * .2, CL, 5); line(268, 328 - up * .2, 258, 320 - up * .2, CL, 5); }
  const m = o.meow || (ex === 'playful' ? .55 + .35 * Math.sin(t * 5) : ex === 'surprised' ? .6 : 0);
  if (m > .05) { shpL(() => g.ellipse(341, 404 + 8 * m, 15, 5 + 17 * m, 0, 0, TAU), '#7a2430', '#5a4038', 4); ell(341, 410 + 16 * m, 9, 6 * m, '#ee7f90'); }
}
function candyHead(t, o = {}) { g.save(); g.scale(.62, .62); g.translate(-390, -300); part('c_head', 0, 0); candyFace(t, o); g.restore(); }
// Candy: stands facing left; paws at (x, y), h = height in px. flip to face right.
function candy(x, y, h, t, o = {}) {
  const s = h / 880, sq = o.sq || 1, wp = o.walk, bob = wp != null ? Math.sin(wp * 2) * 6 : Math.sin(t * 2 + 1) * 3;
  g.save(); g.translate(x, y); g.scale((o.flip ? -1 : 1) * s / Math.sqrt(sq), s * sq); g.translate(-675, -966);
  part('c_tail', 1035, 540, Math.sin(t * (o.tailSpeed || 2.4)) * (o.tailAmp || 45) / 380 + (wp != null ? Math.sin(wp) * .04 : 0), 0, bob);
  [['f1', 385, 732, 0], ['h2', 958, 788, 0], ['f2', 486, 732, Math.PI], ['h1', 764, 798, Math.PI]].forEach(([n, px, py, ph]) => { const a = wp != null ? Math.sin(wp + ph) * .3 : 0, lift = wp != null ? Math.max(0, Math.cos(wp + ph)) * 16 : 0; part('c_' + n, px, py, a, 0, bob * .4 - lift); });
  part('c_body', 0, 0, 0, 0, bob);
  g.translate(410 + (o.headX || 0), 452 + bob + (o.headY || 0)); g.rotate((o.tilt || 0) + Math.sin(t * 1.6) * .035 + (wp != null ? Math.sin(wp * 2) * .02 : 0)); g.translate(-410, -452);
  part('c_head', 0, 0); candyFace(t, o);
  g.restore();
}
let OFFC = null;
function tinted(fn, col) { if (!OFFC) { OFFC = document.createElement('canvas'); OFFC.width = W; OFFC.height = H; } const x = OFFC.getContext('2d'), G = g; x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, W, H); g = x; g.save(); fn(); g.restore(); x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-atop'; x.fillStyle = col; x.fillRect(0, 0, W, H); g = G; g.drawImage(OFFC, 0, 0); }
