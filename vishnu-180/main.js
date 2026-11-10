// An Ocean, a Step, a Stone — Vishnu: helpers, build, render. Scenes and timeline are in scenes.js.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
let PAPER_IMG;
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
function drawSubs(t) {
  for (const [s, d, en] of SUBS) {
    const f = fade2(t, s - .15, s + d + .45, .25, .35); if (f <= 0) continue;
    ctx.save(); ctx.globalAlpha = f; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = 'italic 500 48px "Cormorant Garamond"'; const lines = wrap(en, 960), y0 = 1760 - (lines.length - 1) * 52;
    const yc = y0 + (lines.length - 1) * 26 - 16, g = ctx.createRadialGradient(540, yc, 10, 540, yc, 540);
    g.addColorStop(0, rgba(PAPER, .82)); g.addColorStop(.6, rgba(PAPER, .6)); g.addColorStop(1, rgba(PAPER, 0));
    ctx.save(); ctx.translate(540, yc); ctx.scale(1, .26 * lines.length / 2 + .1); ctx.translate(-540, -yc); ctx.fillStyle = g; ctx.fillRect(0, yc - 540, W, 1080); ctx.restore();
    ctx.shadowColor = rgba(PAPER, 1); ctx.shadowBlur = 22;
    for (let k = 0; k < 2; k++) { ctx.fillStyle = rgba(INK, .9); lines.forEach((ln, i) => ctx.fillText(ln, 540, y0 + i * 52)); }
    ctx.restore();
  }
}
const SCENES = [[0, sceneA], [SC.G, sceneG], [SC.V, sceneV], [SC.D, sceneD], [SC.K, sceneK], [SC.S, sceneS]];
function render(t) {
  TX = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; paper(ctx);
  let k = 0; while (k < SCENES.length - 1 && t >= SCENES[k + 1][0]) k++;
  if (k > 0 && t < SCENES[k][0] + 1.2) wipe(t, SCENES[k][0], 1.2, SCENES[k - 1][1], SCENES[k][1]); else SCENES[k][1](ctx, t);
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TX; };

function build() {
  // ---- A ----
  withSeed(11, () => {
    const oc = []; for (let i = 0; i < 22; i++) { const y = 1000 + i * 44 + rnd(-8, 8); oc.push(mk(qcurve(-140, y, 1220, y + rnd(-10, 10), rnd(-14, 14), 22), rnd(56, 74), pick(['#f1efe6', '#e8ecea', '#dfe7ea', '#ecebe2']), { prof: 'even', nb: 6, a: rnd(.55, .75) })); }
    A.ocean = O(oc, 0, 0, 3.8, 7.6);
    const ob = []; for (let i = 0; i < 14; i++) { const y = 1100 + i * 60; ob.push(mk(qcurve(-140, y, 1220, y + rnd(-10, 10), rnd(-14, 14), 22), 70, pick(VBLUE), { prof: 'even', nb: 6, a: .16 })); }
    A.oceanBlue = O(ob, 0, 0, 19.4, 22.4);
    const sk = []; for (let i = 0; i < 9; i++) { const y = 80 + i * 80; sk.push(mk(qcurve(-140, y, 1220, y + rnd(-10, 10), rnd(-20, 20), 20), 120, pick(['#8fb0c6', '#a9c0d0', '#7f9fbe']), { prof: 'leaf', nb: 6, a: lerp(.34, .12, i / 8) })); }
    A.sky = O(sk, 0, 0, 18.6, 21.6);
    // the serpent: one continuous coil, painted from its tail inward
    const pts = []; for (let i = 0; i <= 240; i++) { const f = i / 240, th = Math.PI + f * 2.6 * Math.PI * 2, r = 380 * (1 - f * .72); pts.push([540 + Math.cos(th) * r, 1080 + Math.sin(th) * r * .4]); }
    A.path = pts; A.segs = [];
    for (let k = 0; k < 16; k++) { const a = Math.floor(k / 16 * 240), b = Math.min(240, Math.floor((k + 1) / 16 * 240) + 1); A.segs.push(mk(pts.slice(a, b + 1), 50 - k * 1.6, pick(['#3f6f5e', '#386854', '#487a66']), { prof: 'even', nb: 7, a: .82, rough: .12 })); }
    A.scales = []; for (let i = 3; i < 236; i += 3) { const [x, y] = pts[i]; A.scales.push(mk(qcurve(x - 7, y - 4, x + 7, y - 2, 2, 3), 7, pick(['#2a4e40', '#24463a']), { prof: 'leaf', nb: 0, a: .45 })); }
    const hood = []; const [hx, hy] = pts[0]; for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .24 + .35; hood.push(mk(qcurve(hx + 20, hy - 20, hx + 20 + Math.cos(a) * 130, hy - 20 + Math.sin(a) * 150, (i - 3) * 4, 10), 46, pick(['#2a4e40', '#24463a']), { prof: 'leaf', nb: 6, a: .8 })); }
    hood.unshift(mk(qctrl(hx, hy, hx - 40, hy - 80, hx + 20, hy - 30, 10), 44, '#3f6f5e', { prof: 'even', nb: 5, a: .85 }));
    A.hood = O(hood, 0, 0, 8.0, 9.4);
    const hz = []; for (let i = 0; i < 9; i++) { const y = 930 + i * 12 + rnd(-6, 6); hz.push(mk(qcurve(250 + rnd(-30, 30), y, 830 + rnd(-30, 30), y + rnd(-10, 10), rnd(-30, -10), 16), rnd(40, 60), pick(VBLUE), { prof: 'leaf', nb: 6, a: .3 })); }
    A.haze = O(hz, 0, 0, 11.0, 13.4);
    A.lotus = O(lotusBloom(.5).S, 860, 1060, 13.4, 14.4); const co = []; for (let i = 0; i < 9; i++) co.push(mk(qcurve(800 + i * 12, 1090 + (i % 3) * 8, 806 + i * 12, 1090 + (i % 3) * 8, 0, 2), 14, pick(['#e0b04a', '#d9a441']), { prof: 'leaf', nb: 0, a: .9 })); A.coins = O(co, 0, 0, 14.2, 14.8);
    const at = [26.4, 27.25, 28.1, 28.95];
    const cs = O(conch(.62).S, 250, 520, at[0], at[0] + .7, { rot: -.2 }), dc = O(discus(.55).S, 830, 520, at[1], at[1] + .7); dc.spin = true;
    A.attr = [[cs, 'SHANKHA', 250, 620], [dc, 'CHAKRA', 830, 620], [O(mace(.75), 250, 860, at[2], at[2] + .7), 'GADA', 250, 890], [O(lotusBloom(.5).S, 830, 800, at[3], at[3] + .7), 'PADMA', 830, 890]];
  });
  // ---- G ----
  withSeed(21, () => {
    const cl = []; for (const [x, y, s] of [[230, 420, .8], [820, 1380, 1], [880, 360, .6], [180, 1500, .7]]) cl.push(...cloud(s, '#b4bcc6').S.map(st => ({ ...st, pts: st.pts.map(([a, b]) => [a + x, b + y]) })));
    G.clouds = O(cl, 0, 0, SC.G + .2, SC.G + 2.0);
    G.wingL = garudaWing(1.15, -1); G.wingR = garudaWing(1.15, 1); G.body = garudaBody(1.1);
  });
  // ---- V ----
  withSeed(31, () => {
    const gr = []; for (let i = 0; i < 10; i++) { const y = 1500 + i * 26; gr.push(mk(qcurve(-200, y, 1280, y + rnd(-6, 6), 0, 16), 40, pick(['#8ea860', '#7c9a52', '#93ad66']), { prof: 'even', nb: 5, a: .5 })); }
    V.ground = O(gr, 0, 0, SC.V + .3, SC.V + 1.8);
    V.parasol = O(AV[4][2](2.2), 380, 1380, SC.V + 1.2, SC.V + 2.4);
    V.crown = O(crown(.9), 720, 1440, SC.V + 1.8, SC.V + 3.0);
    V.star = []; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; V.star.push(mk(polar(0, 0, a, i % 2 ? 14 : 26, 0, 4), i % 2 ? 6 : 8, pick(['#d9a441', '#e0b04a']), { prof: 'tip', nb: 0, a: .9 })); }
    V.stars = []; for (let i = 0; i < 150; i++) { const a = rnd(0, 6.3), r = rnd(8000, 16000), x = 540 + Math.cos(a) * r, y = 2600 + Math.sin(a) * r * 1.1; if (y > 1000 && Math.hypot(x - 540, y - 8500) < 7600) continue; V.stars.push({ x, y, sc: rnd(14, 26), t0: 67.4 + rnd(0, 3.4) }); }
    V.fps = [[O(footprint(1), 540, 8500, 72.3, 74.4, { rot: .12 }), 46], [O(footprint(1), 640, -7000, 75.8, 77.6, { rot: -.1 }), 30], [O(footprint(1), 720, 1240, 83.4, 85.0), .95]];
  });
  // ---- D ----
  withSeed(41, () => {
    D.wall = O(templeWall(1), 540, 1000, SC.D + .3, SC.D + 2.4);
    const body = []; for (let i = 0; i < 10; i++) { const y = 1020 + i * 14 + rnd(-6, 6); body.push(mk(qcurve(80, y, 1000, y + rnd(-8, 8), -30, 20), 46, pick(VBLUE), { prof: 'even', nb: 6, a: .45 })); } D.body = body;
    D.inner = [[], [], []];
    for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .28; D.inner[0].push(mk(polar(210, 1000, a, 110, 6, 8), 40, pick(['#2a4e40', '#3f6f5e']), { prof: 'leaf', nb: 5, a: .85 })); }
    D.inner[1] = lotusBloom(.6).S.map(s => ({ ...s, pts: s.pts.map(([x, y]) => [x + 540, y + 1000]) }));
    for (let i = 0; i < 5; i++) D.inner[2].push(mk(qcurve(830 + i * 14, 1110, 836 + i * 14, 1110, 0, 2), 14, pick(['#e0b04a', '#d9a441']), { prof: 'leaf', nb: 0, a: .95 }));
    D.inner[2].push(...lotusBloom(.4).S.map(s => ({ ...s, pts: s.pts.map(([x, y]) => [x + 880, y + 1180]) })));
    D.reveal = [bar(28.5) + .2, bar(28.75) + .2, bar(29) + .2];
  });
  // ---- K ----
  withSeed(51, () => {
    const h = []; for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2, r = rnd(330, 380); h.push(mk(polar(540 + Math.cos(a) * r * .9, 900 + Math.sin(a) * r * .9, a, rnd(50, 80), rnd(-6, 6), 5), rnd(24, 34), pick(['#e8c46a', '#efd398', '#e0b04a']), { prof: 'leaf', nb: 4, a: .4 })); }
    K.halo = O(h, 0, 0, SC.K + .4, SC.K + 2.0);
    const fl = []; const f0 = [190, 1080], f1 = [890, 820];
    const fb = mk(qcurve(f0[0], f0[1], f1[0], f1[1], -6, 20), 26, '#c99a5b', { prof: 'even', nb: 5, a: .9 }); fl.push(fb, edgeOf(fb, 1, 2, INKB, .6));
    for (let i = 0; i < 7; i++) { const u = .35 + i * .07; fl.push(mk(qcurve(lerp(f0[0], f1[0], u) - 6, lerp(f0[1], f1[1], u) - 2, lerp(f0[0], f1[0], u) + 6, lerp(f0[1], f1[1], u) - 2, 0, 2), 9, INK, { prof: 'even', nb: 0, a: .85 })); }
    for (const u of [.12, .9]) fl.push(mk(qcurve(lerp(f0[0], f1[0], u) - 4, lerp(f0[1], f1[1], u) - 14, lerp(f0[0], f1[0], u) + 4, lerp(f0[1], f1[1], u) + 14, 0, 3), 8, C.ver, { prof: 'even', nb: 0, a: .9 }));
    // a peacock feather tucked beside it: a long quill, a soft green vane, the eye at the tip
    const q0 = [700, 1160], q1 = [420, 520]; fl.push(mk(qcurve(q0[0], q0[1], q1[0], q1[1], 30, 20), 4, '#8a7a50', { prof: 'tip', nb: 0, a: .85 }));
    for (let i = 0; i < 26; i++) { const u = .3 + i / 26 * .66, x = lerp(q0[0], q1[0], u), y = lerp(q0[1], q1[1], u); for (const sd of [-1, 1]) fl.push(mk(polar(x, y, Math.atan2(q1[1] - q0[1], q1[0] - q0[0]) + sd * 1.1, lerp(20, 70, Math.sin(Math.PI * (u - .3) / .66)), 6, 4), 5, pick(['#5f8a52', '#6f9a5a', '#4e7a52']), { prof: 'tip', nb: 0, a: .55 })); }
    fl.push(mk(qcurve(q1[0] + 10, q1[1] + 26, q1[0] - 10, q1[1] - 26, 0, 6), 70, '#3f8a6a', { prof: 'leaf', nb: 4, a: .7 }), mk(qcurve(q1[0] + 6, q1[1] + 14, q1[0] - 6, q1[1] - 14, 0, 4), 42, '#d9a441', { prof: 'leaf', nb: 2, a: .85 }), mk(qcurve(q1[0] + 3, q1[1] + 8, q1[0] - 3, q1[1] - 8, 0, 3), 24, '#2f5f98', { prof: 'leaf', nb: 0, a: .95 }));
    K.flute = fl;
  });
  // ---- S ----
  withSeed(61, () => {
    const rv = riverStrokes([[100, -60], [260, 300], [180, 640], [380, 980], [300, 1320], [520, 1700], [460, 2000]], 160, 260, ['#8d9aa9', '#9aa7b4', '#7f8d9e', '#a8b8c4'], 7);
    S2.river = O(rv, 0, 0, SC.S + .3, SC.S + 3.0);
    const pb = []; for (let i = 0; i < 40; i++) { const x = rnd(40, 1040), y = rnd(1300, 1620); pb.push(mk(qcurve(x - 10, y, x + 10, y, rnd(-3, 3), 4), rnd(16, 30), pick(['#8a8178', '#7d756c', '#a29a8f', '#5a554f']), { prof: 'leaf', nb: 0, a: .7 })); }
    S2.pebbles = O(pb, 0, 0, SC.S + 1.6, SC.S + 3.4);
    S2.stone = O(stoneShaligram(1), 540, 1000, 128.0, 129.8);
    S2.amm = O(ammonite(1.1), 540, 1000, 129.6, 133.0);
    // the endless line: the ammonite's spiral, carried on outward as the serpent's colour
    const b = Math.log(180 / 8) / (3.2 * Math.PI * 2), th0 = 3.2 * Math.PI * 2, pts = [];
    for (let i = 0; i <= 420; i++) { const th = th0 + i / 420 * 2.6 * Math.PI * 2, r = 8 * 1.1 * Math.exp(b * th) * Math.exp(.06 * (th - th0)); pts.push([540 + Math.cos(th) * r, 1000 + Math.sin(th) * r]); }
    S2.line = []; for (let k = 0; k < 24; k++) { const a = Math.floor(k / 24 * 420), e = Math.min(420, Math.floor((k + 1) / 24 * 420) + 1); S2.line.push(mk(pts.slice(a, e + 1), 6 + k * 2.4, k < 3 ? '#b8a77e' : pick(['#3f6f5e', '#386854', '#487a66']), { prof: 'even', nb: 6, a: .82, rough: .12 })); }
  });

  // ---- sound events ----
  VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
  SUBS.forEach(([t, d, text]) => ev(t, 'sub', { d, text }));
  ev(.6, 'brush', { d: 8.4, g: .4, pan0: -.6, pan1: .6 }); ev(3.8, 'sea', { d: 30 }); ev(8.0, 'hiss', { d: 1.4 }); ev(11.0, 'brush', { d: 2.4, g: .35 }); ev(13.4, 'coins');
  ev(13.8, 'pencil', { d: 1.1 }); ev(15.2, 'pencil', { d: 1.1 }); ev(18.6, 'brush', { d: 3.0, g: .35, pan0: -.8, pan1: .8 });
  [26.4, 27.25, 28.1, 28.95].forEach((t, i) => ev(t, 'brush', { d: .7, g: .3, pan0: [-.6, .6, -.6, .6][i], pan1: [-.6, .6, -.6, .6][i] }));
  ev(26.4, 'conch');
  Object.values(SC).forEach(t => ev(t, 'brush', { d: 1.2, g: .45, pan0: -.9, pan1: .9 }));
  ev(SC.G + .2, 'wind', { d: 18 }); ev(SC.G + 1.0, 'wings', { d: 15 }); ev(41.2, 'pencil', { d: 1.1 }); ev(48.8, 'cry');
  ev(SC.V + .3, 'brush', { d: 2.6, g: .35 }); ev(56.0, 'pencil', { d: 1.4 }); ev(63.5, 'laugh'); ev(64.6, 'swell', { d: 6.6 }); ev(67.4, 'stars', { d: 3.6 });
  ev(72.3, 'step', { g: 1 }); ev(75.8, 'step', { g: .9 }); ev(72.2, 'pencil', { d: 1 }); ev(78.4, 'swell', { d: 4.2 }); ev(83.4, 'step', { g: .4 });
  ev(SC.D + .3, 'brush', { d: 2.0, g: .4 }); ev(SC.D + 2.8, 'pencil', { d: 1.2 }); D.reveal.forEach((t, i) => ev(t, 'door', { i })); ev(SC.D + .5, 'temple', { d: 18 });
  ev(SC.K + 2.6, 'brush', { d: 1.0, g: .25, pan0: -.5, pan1: .5 });   // after the words 'Bhagavad Gita' ev(SC.K + 4.0, 'pencil', { d: 1.4 });
  ev(SC.S + .3, 'river', { d: 22 }); ev(126.6, 'pencil', { d: 1 }); ev(128.0, 'brush', { d: 1.8, g: .4 }); ev(129.6, 'brush', { d: 3.4, g: .3, pan0: 0, pan1: 0 }); ev(135.2, 'pencil', { d: 1 });
  ev(147.5, 'brush', { d: 32, g: .22, pan0: -.7, pan1: .7 }); ev(171.4, 'pencil', { d: 1.0 }); ev(bar(49.5), 'tbell');
}
(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['500 50px "Cormorant Garamond"', 'italic 500 50px "Cormorant Garamond"', '600 44px Caveat', '500 44px Caveat', '400 22px "IBM Plex Mono"'].map(f => document.fonts.load(f)));
  build();
  window.READY = true;
})();
