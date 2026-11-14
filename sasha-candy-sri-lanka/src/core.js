// Core: canvas, timing helpers, easing, drawing kit shared by every scene.
const W = 1920, H = 1080, TAU = Math.PI * 2;
const cv = document.getElementById('c'), g = cv.getContext('2d');
const T = window.TIMING, IMG = {};
const C = { purple: '#5b2a86', plum: '#3d1a5e', lav: '#eadcf7', cream: '#fff6e4', yellow: '#ffc93c', coral: '#ff6b5a', teal: '#12a5a0', pink: '#ff8fb8', white: '#ffffff' };

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const E = {
  o3: x => 1 - Math.pow(1 - x, 3), o2: x => 1 - (1 - x) * (1 - x), i2: x => x * x,
  io: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  back: x => { const c = 1.9; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); },
  el: x => x <= 0 ? 0 : x >= 1 ? 1 : Math.pow(2, -9 * x) * Math.sin((x * 9 - .75) * (TAU / 3)) + 1,
};
const pop = (t, a, d = .45) => E.back(seg(t, a, a + d));     // 0 -> 1 with a little overshoot
const rise = (t, a, d = .6) => E.o3(seg(t, a, a + d));
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const SC = id => T.scenes.find(s => s.id === id);
const LN = i => T.lines[i];
// time at which a word of line i is spoken (estimated from its position in the sentence)
const Wd = (i, word) => { const l = LN(i), k = l.cap.indexOf(word); return l.a + (l.b - l.a) * (k < 0 ? 0 : k / l.cap.length) * 0.97; };
const env = t => { const f = Math.round(t * 30), e = T.env; return ((e[f - 1] || 0) + (e[f] || 0) * 2 + (e[f + 1] || 0)) / 4; };

// ---------- primitives ----------
function lg(x0, y0, x1, y1, stops) { const G = g.createLinearGradient(x0, y0, x1, y1); stops.forEach(([p, c]) => G.addColorStop(p, c)); return G; }
function rg(x, y, r0, r1, stops) { const G = g.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([p, c]) => G.addColorStop(p, c)); return G; }
function rect(x, y, w, h, f) { g.fillStyle = f; g.fillRect(x, y, w, h); }
function rr(x, y, w, h, r, f, st, lw) { g.beginPath(); g.roundRect(x, y, w, h, r); if (f) { g.fillStyle = f; g.fill(); } if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } }
function circ(x, y, r, f, st, lw) { g.beginPath(); g.arc(x, y, Math.max(0, r), 0, TAU); if (f) { g.fillStyle = f; g.fill(); } if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } }
function ell(x, y, rx, ry, f, rot = 0, st, lw) { g.beginPath(); g.ellipse(x, y, Math.max(0, rx), Math.max(0, ry), rot, 0, TAU); if (f) { g.fillStyle = f; g.fill(); } if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } }
function poly(pts, f, st, lw) { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); if (f) { g.fillStyle = f; g.fill(); } if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.lineJoin = 'round'; g.stroke(); } }
function line(x0, y0, x1, y1, c, w = 4, cap = 'round') { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.strokeStyle = c; g.lineWidth = w; g.lineCap = cap; g.stroke(); }
function curve(pts, c, w = 4) { g.beginPath(); g.moveTo(pts[0], pts[1]); if (pts.length === 6) g.quadraticCurveTo(pts[2], pts[3], pts[4], pts[5]); else g.bezierCurveTo(pts[2], pts[3], pts[4], pts[5], pts[6], pts[7]); g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.stroke(); }
// smooth closed blob through points
function smooth(pts, closed = true) {
  g.beginPath(); const n = pts.length;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    if (i === 0) g.moveTo(p1[0], p1[1]);
    g.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (closed) g.closePath();
}
// a band of land from a wavy top edge down to the bottom
function band(fn, f, bottom = H) { g.beginPath(); g.moveTo(-20, bottom); for (let x = -20; x <= W + 20; x += 20) g.lineTo(x, fn(x)); g.lineTo(W + 20, bottom); g.closePath(); g.fillStyle = f; g.fill(); }
function glow(x, y, r, col, a = 1) { g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha *= a; g.fillStyle = rg(x, y, 0, r, [[0, col], [1, 'rgba(0,0,0,0)']]); g.fillRect(x - r, y - r, r * 2, r * 2); g.restore(); }
function at(x, y, s, rot, fn) { g.save(); g.translate(x, y); if (rot) g.rotate(rot); if (s !== 1) g.scale(s, s); fn(); g.restore(); }

function txt(str, x, y, size, col, o = {}) {
  g.font = `${o.w || 700} ${size}px ${o.f || '"Baloo 2"'}`; g.textAlign = o.al || 'center'; g.textBaseline = o.bl || 'middle';
  if (o.ls) g.letterSpacing = o.ls + 'px'; else g.letterSpacing = '0px';
  if (o.stroke) { g.lineJoin = 'round'; g.lineWidth = o.sw || size * .24; g.strokeStyle = o.stroke; g.strokeText(str, x, y); }
  g.fillStyle = col; g.fillText(str, x, y);
}
function tw(str, size, o = {}) { g.font = `${o.w || 700} ${size}px ${o.f || '"Baloo 2"'}`; g.letterSpacing = '0px'; return g.measureText(str).width; }
// label pill in the style of the model sheets (lavender brush pill, purple text)
function pill(str, x, y, k, o = {}) {
  if (k <= 0.01) return; const size = o.size || 40, w = tw(str, size) + size * 1.5, h = size * 1.7;
  at(x, y, k, o.rot || 0, () => {
    rr(-w / 2 + 4, -h / 2 + 7, w, h, h / 2, 'rgba(60,20,90,.22)');
    rr(-w / 2, -h / 2, w, h, h / 2, o.bg || C.lav, o.bd || C.white, 5);
    txt(str, 0, 3, size, o.fg || C.purple, { w: 700 });
  });
}
function star4(x, y, r, col, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.beginPath(); for (let i = 0; i < 8; i++) { const a = i * TAU / 8, rr2 = i % 2 ? r * .34 : r; g.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); } g.closePath(); g.fillStyle = col; g.fill(); g.restore(); }
function sparkles(x, y, R, n, t, col = '#fff8c9', seed = 1) { for (let i = 0; i < n; i++) { const a = rnd(seed + i) * TAU, d = R * (.35 + .65 * rnd(seed + i * 3.1)), ph = (t * (.7 + rnd(seed + i * 7)) + rnd(seed + i * 5)) % 1, s = Math.sin(ph * Math.PI); star4(x + Math.cos(a) * d, y + Math.sin(a) * d, 5 + 16 * s * rnd(seed + i * 2.3 + 1), col, ph * 2); } }
function heart(x, y, s, col) { at(x, y, s, 0, () => { g.beginPath(); g.moveTo(0, 30); g.bezierCurveTo(-55, -10, -30, -52, 0, -22); g.bezierCurveTo(30, -52, 55, -10, 0, 30); g.fillStyle = col; g.fill(); }); }
// yellow "spark" lines like the ones on the model sheets
function sparks(x, y, k, flip = 1, col = C.yellow) { if (k <= 0) return; g.lineCap = 'round'; [[-.9, 62], [-.45, 70], [0, 62]].forEach(([a, len]) => { const ca = Math.cos(a - .5) * flip, sa = Math.sin(a - .5); line(x + ca * 22, y + sa * 22, x + ca * (22 + len * .55 * k), y + sa * (22 + len * .55 * k), col, 9); }); }

function cloud(x, y, s, a = 1, col = '#ffffff') { g.save(); g.globalAlpha *= a; g.fillStyle = col; g.beginPath(); [[0, 0, 60], [70, -20, 75], [150, 0, 60], [215, 14, 42], [-55, 16, 40]].forEach(([dx, dy, r]) => { g.moveTo(x + dx * s + r * s, y + dy * s); g.arc(x + dx * s, y + dy * s, r * s, 0, TAU); }); g.rect(x - 55 * s, y + 10 * s, 270 * s, 46 * s); g.fill(); rr(x - 95 * s, y + 14 * s, 352 * s, 44 * s, 22 * s, col); g.restore(); }
function sunburst(x, y, R, n, rot, col, a) { g.save(); g.globalAlpha *= a; g.fillStyle = col; g.translate(x, y); g.rotate(rot); for (let i = 0; i < n; i++) { g.beginPath(); g.moveTo(0, 0); const a0 = i * TAU / n, a1 = a0 + TAU / n / 2; g.lineTo(Math.cos(a0) * R, Math.sin(a0) * R); g.lineTo(Math.cos(a1) * R, Math.sin(a1) * R); g.closePath(); g.fill(); } g.restore(); }
function palm(x, y, s, sway = 0, trunk = '#8a5a3c', leaf = '#1f9d6b', leaf2 = '#35c486', lean = .25) {
  at(x, y, s, 0, () => {
    const tx = 120 * lean * 4 + sway * 14, ty = -330;
    g.beginPath(); g.moveTo(-16, 0); g.quadraticCurveTo(10, -170, tx - 9, ty); g.lineTo(tx + 9, ty); g.quadraticCurveTo(40, -170, 18, 0); g.closePath(); g.fillStyle = trunk; g.fill();
    for (let i = 0; i < 7; i++) { const a = -Math.PI + i * Math.PI / 6 + sway * .05, L = 170 + 30 * rnd(i + x), ex = tx + Math.cos(a) * L, ey = ty + Math.sin(a) * L * .55 + 60 * Math.abs(Math.cos(a)) + sway * 6; g.beginPath(); g.moveTo(tx, ty); g.quadraticCurveTo(tx + Math.cos(a) * L * .5, ty + Math.sin(a) * L * .8 - 20, ex, ey); g.quadraticCurveTo(tx + Math.cos(a) * L * .45, ty + Math.sin(a) * L * .35 + 22, tx, ty); g.fillStyle = i % 2 ? leaf : leaf2; g.fill(); }
    circ(tx - 10, ty + 12, 13, '#c96a2b'); circ(tx + 12, ty + 14, 12, '#e07f33');
  });
}
function bird(x, y, s, ph, col = '#3d2a52') { const f = Math.sin(ph) * 14 * s; g.beginPath(); g.moveTo(x - 26 * s, y - f); g.quadraticCurveTo(x - 10 * s, y - 12 * s, x, y); g.quadraticCurveTo(x + 10 * s, y - 12 * s, x + 26 * s, y - f); g.strokeStyle = col; g.lineWidth = 5 * s; g.lineCap = 'round'; g.stroke(); }

// ---------- character sprites (cut from the model sheets) ----------
function spr(name, x, y, h, o = {}) {
  const im = IMG[name]; if (!im) return; const s = h / im.height, w = im.width * s;
  g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot); g.scale((o.flip ? -1 : 1) * (o.sx || 1), o.sy || 1); if (o.a != null) g.globalAlpha *= o.a;
  g.drawImage(im, -w / 2, -h, w, h); g.restore();
}
function shadow(x, y, rx, a = .22) { ell(x, y, rx, rx * .16, `rgba(40,20,60,${a})`); }
// a talking character: bounces gently with the loudness of the voice
function talker(name, x, y, h, t, o = {}) { const e = env(t), b = Math.sin(t * 2.2 + (o.ph || 0)); spr(name, x, y - e * 9, h, Object.assign({ sy: 1 + e * .03 + b * .006, sx: 1 - e * .012, rot: Math.sin(t * 1.3 + (o.ph || 0)) * .012 + e * .02 * Math.sin(t * 9) }, o)); }

// ---------- Sri Lanka outline ----------
const SL = [[80.25, 9.83], [80.6, 9.5], [80.82, 9.25], [81.05, 8.9], [81.23, 8.57], [81.4, 8.2], [81.57, 7.92], [81.7, 7.7], [81.82, 7.3], [81.86, 6.88], [81.75, 6.58], [81.55, 6.36], [81.3, 6.2], [81.1, 6.12], [80.8, 6.02], [80.58, 5.92], [80.22, 6.03], [80.05, 6.3], [79.96, 6.58], [79.86, 6.93], [79.83, 7.2], [79.8, 7.58], [79.8, 8.0], [79.72, 8.3], [79.86, 8.6], [79.95, 8.95], [80.05, 9.25], [79.93, 9.6], [80.0, 9.8]];
const geo = (lon, lat, cx, cy, s) => [cx + (lon - 80.75) * s * .99, cy - (lat - 7.87) * s];
function island(cx, cy, s, o = {}) {
  const pts = SL.map(([a, b]) => geo(a, b, cx, cy, s));
  if (o.shadow !== false) { g.save(); g.translate(s * .07, s * .09); smooth(pts); g.fillStyle = 'rgba(4,50,90,.35)'; g.fill(); g.restore(); }
  smooth(pts); g.strokeStyle = '#fff3c4'; g.lineWidth = s * .13; g.lineJoin = 'round'; g.stroke();           // sandy beaches
  smooth(pts); g.fillStyle = lg(cx, cy - s * 2, cx, cy + s * 2, [[0, '#8fdc6a'], [.5, '#4fc46a'], [1, '#2aa860']]); g.fill();
  g.save(); smooth(pts); g.clip();
  const h = geo(80.75, 7.0, cx, cy, s);                                                                         // central highlands
  ell(h[0], h[1], s * .62, s * .6, '#2f9a58'); ell(h[0] + s * .02, h[1] - s * .05, s * .42, s * .4, '#23834d'); ell(h[0], h[1] - s * .08, s * .2, s * .19, '#1b6f43');
  for (let i = 0; i < 26; i++) { const p = geo(79.9 + rnd(i) * 1.9, 6.1 + rnd(i + 40) * 3.5, cx, cy, s); circ(p[0], p[1], s * (.03 + .03 * rnd(i + 9)), 'rgba(255,255,255,.13)'); }
  g.restore();
}

// ---------- overlay: captions, presenter, transition, paper grain ----------
const CAPS = [];
T.lines.forEach(l => {
  const parts = l.cap.match(/[^,.!?]+[,.!?]*\s*/g).map(s => s.trim()).filter(Boolean), out = [];
  parts.forEach(p => { if (out.length && (out[out.length - 1] + ' ' + p).length <= 46) out[out.length - 1] += ' ' + p; else out.push(p); });
  const fin = []; out.forEach(p => { if (p.length <= 50) return fin.push(p); const m = p.lastIndexOf(' ', p.length / 2 + 6); fin.push(p.slice(0, m), p.slice(m + 1)); });
  let k = 0; const tot = fin.join(' ').length;
  fin.forEach((p, i) => { const a = l.a + (l.b - l.a) * k / tot; k += p.length + 1; CAPS.push({ a, b: i === fin.length - 1 ? l.b + .3 : l.a + (l.b - l.a) * k / tot, s: p }); });
});
function caption(t, cx) {
  const c = CAPS.find(c => t >= c.a - .05 && t < c.b); if (!c) return;
  const k = pop(t, c.a - .05, .22), size = 46, w = tw(c.s, size, { f: 'Fredoka', w: 600 }) + 84, h = 86, y = 1000;
  at(cx, y, .9 + .1 * k, 0, () => {
    g.globalAlpha = clamp(k * 1.5);
    rr(-w / 2 + 3, -h / 2 + 8, w, h, 43, 'rgba(50,15,80,.3)');
    rr(-w / 2, -h / 2, w, h, 43, C.cream, C.purple, 5);
    txt(c.s, 0, 3, size, C.plum, { f: 'Fredoka', w: 600 });
    g.globalAlpha = 1;
  });
}
function curLine(t, id) { const ls = T.lines.filter(l => l.scene === id); let c = ls[0]; ls.forEach(l => { if (t >= l.a - .25) c = l; }); return c; }
// Sasha and Candy as presenters, peeking in from the bottom-left corner
function presenter(t, sc, candy = 'c_attentive') {
  const s = t - sc.a, up = E.back(seg(s, .25, .85)), dn = E.i2(seg(t, sc.b - .5, sc.b - .1)), off = (1 - up) * 560 + dn * 560;
  const l = curLine(t, sc.id), e = env(t);
  shadow(330, 1085 + off, 330, .18);
  at(548, 1118 + off + (1 - E.back(seg(s, .45, 1.05))) * 300, 1, Math.sin(t * 1.7) * .03, () => spr(candy, 0, -Math.abs(Math.sin(t * 2.1)) * 6, 318));
  talker('s_' + l.expr, 232, 1112 + off, 500, t);
}
function swipe(t) {
  for (const sc of T.scenes) {
    if (sc.a === 0) continue; const p = seg(t, sc.a - .42, sc.a + .42); if (p <= 0 || p >= 1) continue;
    [C.yellow, C.coral, C.purple].forEach((col, i) => {
      const R = lerp(-500, W + 500, E.io(seg(p, i * .05, .4 + i * .05))), Lx = lerp(-500, W + 500, E.io(seg(p, .5 + i * .05, .9 + i * .05)));
      poly([[Lx - 260, H], [Lx, 0], [R + 260, 0], [R, H]], col);
    });
  }
}
let GRAIN = null;
function grain() {
  if (!GRAIN) { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), d = x.createImageData(256, 256); for (let i = 0; i < d.data.length; i += 4) { const v = 110 + rnd(i * .37) * 145; d.data[i] = v; d.data[i + 1] = v * .96; d.data[i + 2] = v * .9; d.data[i + 3] = 255; } x.putImageData(d, 0, 0); GRAIN = g.createPattern(c, 'repeat'); }
  g.save(); g.globalCompositeOperation = 'multiply'; g.globalAlpha = .1; g.fillStyle = GRAIN; g.fillRect(0, 0, W, H); g.restore();
  g.fillStyle = rg(W / 2, H / 2, 620, 1250, [[0, 'rgba(60,20,90,0)'], [1, 'rgba(60,20,90,.2)']]); g.fillRect(0, 0, W, H);
}

const SCENES = {};
function renderAt(t) {
  t = clamp(t, 0, T.dur - .001);
  const sc = T.scenes.find(s => t >= s.a && t < s.b) || T.scenes[T.scenes.length - 1];
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  g.save(); const info = SCENES[sc.id](t, sc, t - sc.a) || {}; g.restore();
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  grain();
  if (info.presenter) presenter(t, sc, info.candy);
  caption(t, info.presenter ? 1160 : info.capX || 960);
  swipe(t);
  if (info.fade) rect(0, 0, W, H, `rgba(255,246,228,${info.fade})`);
}
window.renderAt = renderAt;
