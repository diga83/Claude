// The Paper Beneath — Shiva: helpers, build, render. Scenes and timeline are in scenes.js.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
let PAPER_IMG, FL = [];
const EV = []; window.EV = EV; const ev = (t, type, o = {}) => EV.push({ t: +t.toFixed(3), type, ...o });
const paper = c => c.drawImage(PAPER_IMG, 0, 0);
// ---------- helpers ----------
const RES = 1.5;
function spriteR(L, res = RES) {
  const [x0, y0, x1, y1] = bbox(L), c2 = document.createElement('canvas');
  c2.width = Math.max(1, Math.ceil((x1 - x0) * res)); c2.height = Math.max(1, Math.ceil((y1 - y0) * res));
  const c = c2.getContext('2d'); c.scale(res, res); c.translate(-x0, -y0); for (const s of L) drawS(c, s, 1);
  return { cv: c2, x0, y0, x1, y1 };
}
const O = (L, x, y, t0, t1, o = {}) => ({ L, x, y, t0, t1, rot: o.rot || 0, sway: o.sway || 0, ph: o.ph || 0, spr: spriteR(L) });
function draw(c, ob, t, o = {}) {
  const p = seg(t, ob.t0, ob.t1); if (p <= 0) return;
  c.save(); c.translate(ob.x + (o.dx || 0), ob.y + (o.dy || 0)); const r = ob.rot + (o.rot || 0); if (r) c.rotate(r);
  if (o.sy) c.scale(1, o.sy);
  if (o.alpha !== undefined) c.globalAlpha *= o.alpha;
  if (ob.sway) c.transform(1, 0, ob.sway * (Math.sin(1.15 * t + ob.ph) + .4 * Math.sin(2.7 * t + 2 * ob.ph)) * p, 1, 0, 0);
  if (p < 1) drawList(c, ob.L, p); else { const s = ob.spr; c.drawImage(s.cv, s.x0, s.y0, s.x1 - s.x0, s.y1 - s.y0); }
  c.restore();
}
const fade2 = (t, a, b, fi, fo) => Math.min(ss(seg(t, a, a + fi)), 1 - ss(seg(t, b - fo, b)));
let TX = [];
function hand(c, txt, x, y, p, o = {}) {
  if (p <= 0) return;
  c.save(); c.font = `${o.w || 600} ${o.size || 44}px Caveat`; c.textAlign = o.align || 'left'; c.textBaseline = 'middle';
  const w = c.measureText(txt).width, x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
  c.beginPath(); c.rect(x0 - 8, y - o.size, (w + 16) * eo(p), o.size * 2); c.clip(); c.globalAlpha = o.alpha ?? 1;
  c.shadowColor = o.light ? 'rgba(20,24,40,.9)' : rgba(PAPER, .95); c.shadowBlur = 14; c.fillStyle = o.light ? rgba('#f6efe0', .95) : rgba(o.col || INK, o.a ?? .92); c.fillText(txt, x, y); c.fillText(txt, x, y);
  c.restore();
  if (o.id && p >= 1 && (o.alpha ?? 1) > .6) TX.push({ id: o.id, text: txt, x0, y0: y - o.size * .6, x1: x0 + w, y1: y + o.size * .6 });
}
function mono(c, txt, x, y, a, id, o = {}) {
  if (a <= 0) return;
  const size = o.size || 22;
  c.save(); c.font = `400 ${size}px "IBM Plex Mono"`; c.letterSpacing = (o.sp ?? 5) + 'px'; c.textAlign = o.align || 'center'; c.textBaseline = 'middle';
  c.shadowColor = o.light ? 'rgba(20,24,40,.9)' : rgba(PAPER, .95); c.shadowBlur = 10; c.fillStyle = o.light ? rgba('#f6efe0', .92 * a) : rgba(o.col || INK, .8 * a); c.fillText(txt, x, y); const w = c.measureText(txt).width; c.restore();
  const x0 = o.align === 'left' ? x : x - w / 2;
  if (id && a > .6) TX.push({ id, text: txt, x0, y0: y - size * .6, x1: x0 + w, y1: y + size * .6 });
}
function serif(c, txt, x, y, p, o = {}) {
  if (p <= 0) return;
  const size = o.size || 80;
  c.save(); c.font = `${o.it ? 'italic ' : ''}500 ${size}px "Cormorant Garamond"`; c.letterSpacing = (o.sp || 0) + 'px'; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
  const w = c.measureText(txt).width; c.beginPath(); c.rect(x - w / 2 - 30, y - size, (w + 60) * eio(p), size * 1.4); c.clip(); c.globalAlpha = o.alpha ?? 1;
  c.shadowColor = o.light ? 'rgba(20,24,40,.9)' : rgba(PAPER, .9); c.shadowBlur = 12; c.fillStyle = o.light ? rgba('#f6efe0', .95) : rgba(INK, o.a ?? .9); c.fillText(txt, x + (o.sp || 0) / 2, y); c.restore();
  if (o.id && p >= 1 && (o.alpha ?? 1) > .6) TX.push({ id: o.id, text: txt, x0: x - w / 2, y0: y - size * .8, x1: x + w / 2, y1: y + size * .2 });
}
function leader(c, x0, y0, x1, y1, p, bend = 30, a = .75) {
  if (p <= 0) return;
  const pts = qcurve(x0, y0, x1, y1, bend, 16), m = Math.max(1, Math.round(16 * clamp(p)));
  c.beginPath(); for (let i = 0; i <= m; i++) i ? c.lineTo(pts[i][0], pts[i][1]) : c.moveTo(pts[i][0], pts[i][1]);
  c.strokeStyle = rgba(INK, a); c.lineWidth = 2; c.lineCap = 'round'; c.stroke();
  if (p >= 1) { c.beginPath(); c.arc(x1, y1, 3.5, 0, 7); c.fillStyle = rgba(INK, a); c.fill(); }
}
function note(c, t, t0, t1, lx, ly, ax, ay, name, role, id, bend = 40) {
  const f = 1 - ss(seg(t, t1 - .45, t1)); if (t < t0 || f <= 0) return;
  c.save(); c.globalAlpha = f; leader(c, lx + 20, ly + 80, ax, ay, seg(t, t0 + .9, t0 + 1.5), bend); c.restore();
  hand(c, name, lx, ly, seg(t, t0, t0 + .7), { size: 70, id: id + '_n', alpha: f });
  hand(c, role, lx + 6, ly + 58, seg(t, t0 + .35, t0 + 1.1), { size: 42, w: 500, id: id + '_r', alpha: f, a: .8 });
}
const camAt = (c, s, cx, cy) => { c.translate(540, 960); c.scale(s, s); c.translate(-cx, -cy); };

function wipe(t, t0, d, drawA, drawB) {   // a brush-edge wipe: a wavy vertical edge sweeps left to right
  drawA(ctx, t);
  const p = eio(seg(t, t0, t0 + d)), ex = lerp(-160, W + 160, p);
  ctx.save(); ctx.beginPath(); ctx.moveTo(-10, -10);
  for (let y = -10; y <= H + 40; y += 30) ctx.lineTo(ex + (vnoise(y * .006 + 3) - .5) * 220 + Math.sin(y * .02 + t * 3) * 14, y);
  ctx.lineTo(-10, H + 10); ctx.closePath(); ctx.clip(); paper(ctx); drawB(ctx, t); ctx.restore();
}
function mist(t, c_, fromTop) {
  if (c_ <= 0) return;
  for (const [lift, a] of [[140, .55], [0, 1]]) {
    const edge = fromTop ? -260 + c_ * 2440 - lift : 2180 - c_ * 2440 + lift;
    ctx.save(); ctx.beginPath(); ctx.moveTo(-10, fromTop ? -10 : H + 10);
    for (let x = -10; x <= W + 40; x += 30) ctx.lineTo(x, edge + (vnoise(x * .008 + lift) - .5) * 200 + Math.sin(x * .012 + t * 1.3) * 16);
    ctx.lineTo(W + 10, fromTop ? -10 : H + 10); ctx.closePath(); ctx.clip(); ctx.globalAlpha = a; ctx.drawImage(PAPER_IMG, 0, 0); ctx.restore();
  }
}


function wrap(txt, maxW) {
  if (ctx.measureText(txt).width <= maxW) return [txt];
  const words = txt.split(' '); let best = null, bd = 1e9;
  for (let i = 1; i < words.length; i++) { const a = words.slice(0, i).join(' '), b = words.slice(i).join(' '), wa = ctx.measureText(a).width, wb = ctx.measureText(b).width; if (wa <= maxW && wb <= maxW && Math.abs(wa - wb) < bd) { bd = Math.abs(wa - wb); best = [a, b]; } }
  if (best) return best;
  for (let i = 1; i < words.length; i++) for (let j = i + 1; j < words.length; j++) { const L = [words.slice(0, i), words.slice(i, j), words.slice(j)].map(w => w.join(' ')); const ws = L.map(l => ctx.measureText(l).width); if (Math.max(...ws) <= maxW && Math.max(...ws) - Math.min(...ws) < bd) { bd = Math.max(...ws) - Math.min(...ws); best = L; } }
  return best || [txt];
}
function mist(t, c_, fromTop) {
  if (c_ <= 0) return;
  for (const [lift, a] of [[140, .55], [0, 1]]) {
    const edge = fromTop ? -260 + c_ * 2440 - lift : 2180 - c_ * 2440 + lift;
    ctx.save(); ctx.beginPath(); ctx.moveTo(-10, fromTop ? -10 : H + 10);
    for (let x = -10; x <= W + 40; x += 30) ctx.lineTo(x, edge + (vnoise(x * .008 + lift) - .5) * 200 + Math.sin(x * .012 + t * 1.3) * 16);
    ctx.lineTo(W + 10, fromTop ? -10 : H + 10); ctx.closePath(); ctx.clip(); ctx.globalAlpha = a; ctx.drawImage(PAPER_IMG, 0, 0); ctx.restore();
  }
}
const darkSub = t => (t > 8.4 && t < 12.2) || (t >= P[2] + 1 && t < P[3] + .6);
function drawSubs(t) {
  const dark = darkSub(t);
  for (const [s, d, en] of SUBS) {
    const f = fade2(t, s - .15, s + d + .45, .25, .35); if (f <= 0) continue;
    ctx.save(); ctx.globalAlpha = f; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = 'italic 500 48px "Cormorant Garamond"'; const lines = wrap(en, 960), y0 = 1760 - (lines.length - 1) * 52;
    if (!dark) {
      const yc = y0 + (lines.length - 1) * 26 - 16, g = ctx.createRadialGradient(540, yc, 10, 540, yc, 540);
      g.addColorStop(0, rgba(PAPER, .8)); g.addColorStop(.6, rgba(PAPER, .58)); g.addColorStop(1, rgba(PAPER, 0));
      ctx.save(); ctx.translate(540, yc); ctx.scale(1, .26 * lines.length / 2 + .1); ctx.translate(-540, -yc); ctx.fillStyle = g; ctx.fillRect(0, yc - 540, W, 1080); ctx.restore();
    }
    ctx.shadowColor = dark ? 'rgba(15,18,32,1)' : rgba(PAPER, 1); ctx.shadowBlur = 22;
    for (let k = 0; k < 2; k++) { ctx.fillStyle = dark ? rgba('#f6efe0', .95) : rgba(INK, .9); lines.forEach((ln, i) => ctx.fillText(ln, 540, y0 + i * 52)); }
    ctx.restore();
  }
}
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; paper(ctx);
  if (t < 30) sceneA(ctx, t);
  else if (t < 31.2) wipe(t, 30, 1.2, sceneA, sceneK);
  else if (t < bar(13)) sceneK(ctx, t);
  else if (t < bar(13) + 1.2) wipe(t, bar(13), 1.2, sceneK, sceneI);
  else if (t < P[0]) sceneI(ctx, t);
  else if (t < P[0] + 1.4) wipeUp(t, P[0], 1.4, sceneI, PAGES[0], EL[0][4]);
  else if (t < P[4] + 18) {
    let k = 0; while (k < 4 && t >= P[k + 1]) k++;
    if (k > 0 && t < P[k] + 1.4) wipeUp(t, P[k], 1.4, PAGES[k - 1], PAGES[k], EL[k][4] || '#e8e2d2'); else PAGES[k](ctx, t);
    mist(t, eio(seg(t, 133.6, 135.0)), true);
  }
  else if (t < 168.5 + 5) { sceneY(ctx, t); mist(t, eio(seg(t, 168.5, 173.0)), true); }
  // the last thing painted: one blue dot
  const bp = seg(t, 174.0, 175.4); if (bp > 0) { ctx.save(); ctx.translate(540, 960); drawList(ctx, A.dot, bp); ctx.restore(); }
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TX; };

function build() {
  withSeed(5, () => { for (let i = 0; i < 12; i++) FL.push(flameStrokes(1)); });
  // ---- A ----
  withSeed(11, () => {
    const oc = []; for (let i = 0; i < 24; i++) { const y = 1010 + i * 40 + rnd(-8, 8); oc.push(mk(qcurve(-140, y, 1220, y + rnd(-10, 10), rnd(-14, 14), 22), rnd(56, 74), pick(['#eef0ea', '#dfe7ea', '#cfdde6', '#e6ece8']), { prof: 'even', nb: 6, a: rnd(.5, .7) })); }
    A.ocean = O(oc, 0, 0, .2, 3.0);
    A.mount = O(mandara(1).S, 540, 1250, .6, 3.2);
    A.wrap = mk(qcurve(-80, 22, 80, -22, -8, 8), 22, '#4f7f78', { prof: 'even', nb: 4, a: .85 });
    A.ropeL = O([mk(qcurve(470, 1180, -120, 1060, 30, 18), 20, '#4f7f78', { prof: 'even', nb: 4, a: .8 })], 0, 0, 2.4, 4.0);
    A.ropeR = O([mk(qcurve(610, 1140, 1200, 1030, -30, 18), 20, '#4f7f78', { prof: 'even', nb: 4, a: .8 })], 0, 0, 2.8, 4.4);
    const ring = []; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; ring.push(mk(polar(Math.cos(a) * 96, Math.sin(a) * 96, a + 1.6, 46, 4, 6), 10, pick(['#8fb0c6', '#6f8faa', BLUE]), { prof: 'leaf', nb: 2, a: .6 })); }
    A.ring = O(ring, 540, 290, 16.6, 18.0);
    A.dot = []; for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; A.dot.push(mk(polar(0, 0, a, 16, 2, 4), 18, BLUE, { prof: 'leaf', nb: 0, a: .7 })); }
  });
  // ---- K ----
  withSeed(21, () => {
    const sky = []; for (let i = 0; i < 8; i++) { const y = 100 + i * 80; sky.push(mk(qcurve(-120, y, 1200, y + rnd(-14, 14), rnd(-20, 20), 16), rnd(100, 130), pick(C.dusk), { prof: 'leaf', nb: 6, a: lerp(.22, .06, i / 7) })); }
    K.sky = O(sky, 0, 0, 30.4, 32.2);
    K.peak = O(kailash(1.15).S, 560, 640, 31.0, 34.2);
    K.moon = O(crescent(1.1).S, 300, 360, 33.6, 34.4, { rot: -.6 });
    K.hills = O(hills(1300, 220, ['#5f7486', '#6d8194', '#56697c'], 9, .55).S, -110, 1560, 32.0, 33.6);
    K.tri = O(trident(.85).S, 860, 1560, 35.4, 37.0);
  });
  // ---- I ----
  withSeed(31, () => {
    I.bg = roundelBg(1.1); const sym = [[], [], [], [], []];
    for (let i = 0; i < 26; i++) { const a = rnd(0, 6.3), r = Math.sqrt(rnd()) * 42; sym[0].push(mk(qcurve(Math.cos(a) * r - 3, Math.sin(a) * r, Math.cos(a) * r + 3, Math.sin(a) * r, 0, 2), rnd(8, 12), pick(C.ochre), { prof: 'leaf', nb: 0, a: .85 })); }
    for (let k = 0; k < 3; k++) { const pts = []; for (let j = 0; j <= 20; j++) { const a = j / 20 * Math.PI * 2; pts.push([Math.cos(a) * (14 + k * 15), Math.sin(a) * (8 + k * 9)]); } sym[1].push(mk(pts, 5, pick(['#4f7090', '#6f8faa']), { prof: 'even', nb: 0, a: .8 })); }
    for (let i = 0; i < 3; i++) for (const s of flameStrokes(.8)) { const pts = s.pts.map(([x, y]) => [x + (i - 1) * 16, y + 34]); sym[2].push({ ...s, pts }); }
    for (let k = 0; k < 3; k++) sym[3].push(mk(qcurve(-44, -20 + k * 20, 40, -26 + k * 20, -18, 10), 6, '#7f8d9e', { prof: 'tip', nb: 0, a: .75 }));
    I.sym = sym;
  });
  // ---- the element pages ----
  withSeed(41, () => {   // earth
    const g = []; for (let i = 0; i < 18; i++) { const y = 1260 + i * 40 + rnd(-8, 8); g.push(mk(qcurve(-140, y, 1220, y + rnd(-10, 10), rnd(-14, 14), 22), rnd(56, 70), pick(['#d4aa6c', '#c99a5b', '#bf8f52', '#dcb67e']), { prof: 'even', nb: 6, a: rnd(.4, .55) })); }
    Ep[0].ground = O(g, 0, 0, P[0] + .2, P[0] + 1.8);
    Ep[0].gop = O(gopuram(.85).S, 220, 1262, P[0] + 1.0, P[0] + 3.0);
    Ep[0].tree = O(mangoTree(1.05).S, 800, 1275, P[0] + 1.8, P[0] + 4.4, { sway: .005 });
    Ep[0].ling = O(lingam(1.15, null, true).S, 520, 1330, P[0] + 3.8, P[0] + 6.0);
  });
  withSeed(51, () => {   // water
    const w = []; for (let i = 0; i < 20; i++) { const y = 1160 + i * 40 + rnd(-8, 8); w.push(mk(qcurve(-140, y, 1220, y + rnd(-10, 10), rnd(-14, 14), 22), rnd(50, 64), mixc('#8fb0c6', '#3d5d80', i / 20), { prof: 'even', nb: 6, a: rnd(.3, .42) })); }
    Ep[1].water = O(w, 0, 0, P[1] + .3, P[1] + 2.0);
    Ep[1].gop = O(gopuram(.75).S, 860, 1160, P[1] + 1.0, P[1] + 3.0);
    Ep[1].ling = O(lingam(1.0).S, 480, 1330, P[1] + 1.6, P[1] + 3.4);
    const pts = []; for (let k = 0; k <= 40; k++) { const a = k / 40 * Math.PI * 2; pts.push([Math.cos(a) * 60, Math.sin(a) * 18]); } Ep[1].ring = mk(pts, 3, '#e6eef2', { prof: 'even', nb: 0, a: .9 });
  });
  withSeed(61, () => {   // fire
    const sky = []; for (let i = 0; i < 12; i++) { const y = 60 + i * 95; sky.push(mk(qcurve(-160, y, 1240, y + rnd(-12, 12), rnd(-20, 20), 20), 150, mixc('#232a44', '#5a4a6a', i / 11), { prof: 'even', nb: 7, a: .9 })); }
    Ep[2].sky = O(sky, 0, 0, P[2] + .2, P[2] + 1.6);
    Ep[2].hill = O(hills(1300, 640, ['#5f5040', '#6b5a48', '#56483a'], 14, .85).S, -110, 1340, P[2] + .8, P[2] + 2.6);
    const g = []; for (let i = 0; i < 16; i++) { const y = 1330 + i * 42; g.push(mk(qcurve(-160, y, 1240, y + rnd(-10, 10), rnd(-14, 14), 22), 70, mixc('#3a3030', '#1f1c22', i / 16), { prof: 'even', nb: 6, a: .9 })); }
    Ep[2].ground = O(g, 0, 0, P[2] + 1.4, P[2] + 2.6);
  });
  withSeed(71, () => {   // air
    Ep[3].hills = O(hills(1300, 300, ['#c4ccd2', '#b6c0c8', '#d4dade'], 9, .45).S, -110, 1560, P[3] + .3, P[3] + 1.8);
    const dp = deepam(1.2); Ep[3].lamp = O(dp.S, 540, 1600, P[3] + 1.4, P[3] + 3.4);
    Ep[3].wind = []; for (let k = 0; k < 9; k++) Ep[3].wind.push(mk(qcurve(0, 0, 520, rnd(-30, 30), rnd(-60, 60), 16), rnd(10, 18), pick(['#9aa7b4', '#b6c0c8', '#8d9aa9']), { prof: 'tip', nb: 3, a: .6 }));
  });
  withSeed(81, () => {   // space
    Ep[4].ring = []; for (let i = 0; i < 48; i++) Ep[4].ring.push(flameStrokes(1));
    Ep[4].dam = O(damaru(1.1).S, 380, 880, P[4] + 2.4, P[4] + 3.0);
    Ep[4].cur = curtain(1);
  });
  withSeed(91, () => { Y.dab = EL.map(([, , , , col]) => { const S = []; if (col) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; S.push(mk(polar(0, 0, a, 30, 3, 5), 28, col, { prof: 'leaf', nb: 3, a: .75 })); } else { const pts = []; for (let k = 0; k <= 30; k++) { const a = k / 30 * Math.PI * 2 - 1.2; pts.push([Math.cos(a) * 34, Math.sin(a) * 34]); } S.push(mk(pts, 3, INK2, { prof: 'even', nb: 0, a: .6, rough: .4 })); } return S; }); });

  // ---- sound events ----
  VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
  SUBS.forEach(([t, d, text]) => ev(t, 'sub', { d, text }));
  ev(.2, 'sea', { d: 29.5 }); ev(.2, 'brush', { d: 2.8, g: .4, pan0: -.8, pan1: .8 }); ev(.6, 'brush', { d: 2.6, g: .4, pan0: 0, pan1: 0 }); ev(2.6, 'churn', { d: 9.2 });
  ev(6.6, 'poison', { d: 5.2 }); ev(11.8, 'gather', { d: 3.8 }); ev(16.67, 'chime'); ev(18.8, 'pencil', { d: 1.1 });
  ev(30, 'brush', { d: 1.2, g: .45, pan0: -.9, pan1: .9 }); ev(30.4, 'wind', { d: 13 }); ev(31.0, 'brush', { d: 3.2, g: .45, pan0: -.4, pan1: .6 }); ev(35.4, 'brush', { d: 1.6, g: .35, pan0: .5, pan1: .7 }); ev(34.8, 'pencil', { d: 1.1 });
  ev(bar(13), 'brush', { d: 1.2, g: .45, pan0: -.9, pan1: .9 }); ev(45.0, 'pencil', { d: .8 });
  EL.forEach((_, i) => ev(bar(15.25) + i * BEAT, 'brush', { d: .7, g: .3, pan0: -.3, pan1: .2 }));
  P.forEach((t0, k) => { ev(t0, 'rise', { d: 1.4, k }); ev(t0 + .8, 'pencil', { d: 1.2 }); ev(t0 + 1.0, 'brush', { d: 3.0, g: .4, pan0: -.6, pan1: .6 }); });
  ev(P[0] + .5, 'leaves', { d: 14 }); ev(P[1] + .5, 'spring', { d: 14.5 }); ev(P[2] + .5, 'fire', { d: 14.5 }); ev(P[3] + .5, 'wind', { d: 14.5, g: 1.4 });
  for (let b = 0; ; b++) { const t = P[2] + 4.4 + b * BEAT * 2; if (t > P[3] - .5) break; ev(t, 'drum', { g: b % 2 ? .6 : 1 }); }
  for (let b = 0; ; b++) { const t = P[4] + 1.0 + b * BEAT; if (t > 122.2) break; ev(t, 'drum', { g: b % 4 ? .6 : 1 }); }
  ev(P[4] + .8, 'fireS', { d: 6.6 }); ev(123.2, 'cloth', { d: 1.6 }); ev(126.6, 'cloth', { d: 2.0 }); ev(128.6, 'bells');
  ev(133.6, 'mist', { d: 1.8 });
  SYL.forEach((t, i) => ev(t + .2, 'brush', { d: .7, g: .3, pan0: -.8 + i * .4, pan1: -.8 + i * .4 }));
  ev(136.2, 'pencil', { d: 1.0 });
  ev(bar(46.25), 'tbell'); ev(168.5, 'mist', { d: 4.5 }); ev(174.0, 'brush', { d: 1.2, g: .3, pan0: 0, pan1: 0 });
}
(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"'].map(f => document.fonts.load(f)));
  build();
  window.READY = true;
})();
