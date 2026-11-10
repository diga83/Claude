// The Patient Tortoise — Vishnu and the churning of the ocean, as six woodblock prints on one mounting scroll. 1080x1920, 24 fps.
import { clamp, lerp, seg, ss, eio, eo, hash, mulberry, TAU } from '/core/lib.js';
import { W, H, FR, PAL, TX, mk, buildTextures, inkify, stampLayer, stampFn, drawSeal, cartouche, rgba } from './print.js';
import { VIEWS } from './prints.js';

const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const DUR = 120; window.DUR = DUR;
const J = async f => { try { const r = await fetch(f); if (r.ok) return await r.json(); } catch (e) { } return null; };
const DURS = (await J('voices/dur.json')) || {};

// ---------- timeline (single source of truth; mix.py reads events.json) ----------
const T = {
  print: [.3, 15.8, 37.9, 49.4, 70.4, 85.4],        // when each sheet starts printing (key, then three colour blocks)
  cart: [3.0, 18.6, 41.0, 51.4, 73.4, 88.0],          // each view's cartouche (seal 0.4 s later)
  imp: [54.0, 57.6, 61.2, 64.8],                      // print IV: the four impressions
  ma: [37.0, 38.6],                                   // the held silence before the tortoise
  pull: [95.0, 101.0], home: [103.0, 109.4], wash: [111.0, 115.4], seal: 115.6,
};
const VOICE = [['v01', 1.8], ['v02', 7.6], ['v03', 19.2], ['v04', 32.4], ['v05', 39.2], ['v06', 50.8], ['i1', T.imp[0] + .25], ['i2', T.imp[1] + .25], ['i3', T.imp[2] + .25], ['i4', T.imp[3] + .25], ['v07', 72.2], ['v08', 86.8], ['v09', 103.4]];
const TEXT = {
  v01: 'Long ago, the gods had grown weak, and they turned to Vishnu for help.', v02: 'Go and churn the ocean of milk, he told them, and it will give you the nectar of immortality.',
  v03: 'So they made a mountain their churning rod, and the serpent Vasuki their rope. Gods on one side, demons on the other, they pulled.',
  v04: 'But the mountain began to sink.', v05: 'So Vishnu became Kurma, a great tortoise, and carried the mountain on his back.', v06: 'The ocean turned, and gave up its treasures.',
  i1: 'The moon.', i2: 'A white elephant.', i3: 'A tree that grants every wish.', i4: 'A cow of plenty.',
  v07: 'Then, standing on a lotus, came Lakshmi, the goddess of fortune. She looked at the gods and the demons, and she chose Vishnu.',
  v08: 'Last of all rose the healer of the gods, holding a pot of amrita, the nectar.', v09: 'This is the churning of the ocean: how the world was steadied, on the patient back of a tortoise.' };
const SUBS = VOICE.map(([id, t0]) => ({ id, t0, t1: t0 + Math.max(1.8, (DURS[id] || 2) + .6), text: TEXT[id] }));
SUBS.forEach((s, i) => { if (SUBS[i + 1] && s.t1 > SUBS[i + 1].t0 - .1) s.t1 = SUBS[i + 1].t0 - .1; });
// short treasure lines read better held together on one slip
const SUBVIEW = SUBS.filter(s => !s.id.startsWith('i')).concat([{ id: 'imp', t0: T.imp[0] + .1, t1: T.imp[3] + 3.4, text: 'The moon. A white elephant. A tree that grants every wish. A cow of plenty.' }]).sort((a, b) => a.t0 - b.t0);

// ---------- the mounting scroll: sheet positions; II and III hang as a vertical diptych ----------
const GAP = 240, VGAP = 70;
const POS = [[0, 0], [-1, 0], [-1, 1], [-2, 1], [-3, 1], [-4, 1]].map(([c, r]) => [c * (W + GAP), r * (H + VGAP)]);
const CEN = POS.map(([x, y]) => [x + W / 2, y + H / 2]);
const ALL = [(POS[0][0] + W + POS[5][0]) / 2, (POS[0][1] + POS[5][1] + H) / 2];
const zAll = Math.min(W / (POS[0][0] + W - POS[5][0] + 200), H / (POS[5][1] + H + 200));
const KEYS = [[0, CEN[0], 1], [15.0, CEN[0], 1], [17.0, CEN[1], 1], [35.6, CEN[1], 1], [37.8, CEN[2], 1], [48.0, CEN[2], 1], [50.0, CEN[3], 1], [69.0, CEN[3], 1], [71.0, CEN[4], 1],
  [84.0, CEN[4], 1], [86.0, CEN[5], 1], [T.pull[0], CEN[5], 1], [T.pull[1], ALL, zAll], [T.home[0], ALL, zAll], [T.home[1], CEN[2], 1], [DUR, CEN[2], 1]];
function cam(t) {
  let i = 0; while (i < KEYS.length - 2 && t >= KEYS[i + 1][0]) i++;
  const [t0, c0, z0] = KEYS[i], [t1, c1, z1] = KEYS[i + 1], u = eio(seg(t, t0, t1));
  const z = Math.exp(lerp(Math.log(z0), Math.log(z1), u));
  // move in zoom-corrected space so the travel doesn't swoop
  const w0 = 1 / z0, w1 = 1 / z1, k = Math.abs(w1 - w0) < 1e-6 ? u : (1 / z - w0) / (w1 - w0);
  return [lerp(c0[0], c1[0], z0 === z1 ? u : k), lerp(c0[1], c1[1], z0 === z1 ? u : k), z];
}

// ---------- colour blocks ----------
const REG = [[0, 0], [2.2, -1.3], [-1.8, 1.9], [1.5, 2.2]], SHIFT = [[4, -5], [-6, 4], [5, 5], [-5, -4]];
const cache = new Map();
function layer(v, name) {
  const k = v.id + ':' + name; if (cache.has(k)) return cache.get(k);
  const d = v.layers[name], c = mk(), x = c.getContext('2d'); d.draw(x);
  const hk = hash(k.length * 7.3 + k.charCodeAt(k.length - 1)); inkify(c, { speck: d.speck ?? .3, grain: (d.grain || 0) * 1.7, gx: hk * 400 - 200, baren: d.baren ?? (d.g ? .38 : .12), bx: (hk - .5) * 300, by: (hash(hk) - .5) * 200 });
  cache.set(k, c); return c;
}
const RDUR = .34;
const revFor = (i, g, t) => clamp((t - (T.print[i] + g * .42)) / RDUR);
const CART = [['一 乳海', 980], ['二 攪拌', 100], ['三 亀', 980], ['四 宝', 100], ['五 吉祥天', 980], ['六 甘露', 100]];

function drawSheet(i, t, M) {
  const v = VIEWS[i];
  ctx.save(); ctx.setTransform(...M);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip();
  ctx.drawImage(TX.paper, 0, 0);
  if (t >= T.print[i]) {
    ctx.save(); ctx.beginPath(); ctx.rect(FR.x0, FR.y0, FR.x1 - FR.x0, FR.y1 - FR.y0); ctx.clip();
    const R = {
      L: name => { const g = v.layers[name].g; stampLayer(ctx, layer(v, name), revFor(i, g, t), REG[g], SHIFT[g]); },
      Lr: (name, r, dy = 0) => { const g = v.layers[name].g; stampLayer(ctx, layer(v, name), Math.min(r, revFor(i, g, t)), [REG[g][0], REG[g][1] + dy], SHIFT[g]); },
      Lt: (name, dx, dy) => { const g = v.layers[name].g; ctx.drawImage(layer(v, name), REG[g][0] + dx, REG[g][1] + dy); },
      D: (g, fn) => { const r = revFor(i, g, t); if (r >= 1) { ctx.save(); ctx.translate(REG[g][0], REG[g][1]); fn(ctx); ctx.restore(); } else stampFn(ctx, fn, r, SHIFT[g]); },
      imp: tt => { let k = 0; while (k < 3 && tt >= T.imp[k + 1]) k++; return k; },
      impRev: tt => { let k = 0; while (k < 3 && tt >= T.imp[k + 1]) k++; return k === 0 ? 1 : clamp((tt - T.imp[k]) / .55); },
      impAge: tt => { let k = 0; while (k < 3 && tt >= T.imp[k + 1]) k++; return tt - (k === 0 ? T.print[3] : T.imp[k]); },
    };
    v.paint(ctx, t, R);
    ctx.restore();
    const br = revFor(i, 0, t);
    stampFn(ctx, x => { x.strokeStyle = PAL.sumi; x.lineWidth = 3.4; x.strokeRect(FR.x0, FR.y0, FR.x1 - FR.x0, FR.y1 - FR.y0); x.lineWidth = 1.3; x.strokeRect(FR.x0 - 9, FR.y0 - 9, FR.x1 - FR.x0 + 18, FR.y1 - FR.y0 + 18); }, br, SHIFT[0]);
    const ct = T.cart[i];
    if (t > ct) {
      const p = clamp((t - ct) / .35), [title, cx] = CART[i];
      stampFn(ctx, x => cartouche(x, cx, 84, title, { w: 78, size: 46, ssize: 24 }), p, [0, -14]);
      drawSeal(ctx, '毘紐', cx, 84 + 112 + 46 * 1.06 * [...title].length + 70, 56, clamp((t - ct - .45) / .3), { seed: i + 1 });
      if (LIVE && p >= 1) TXS.push({ id: 'cart' + i, text: title, x0: 0, y0: 0, x1: 1, y1: 1, pass: true });
    }
  }
  ctx.drawImage(TX.fiber, 0, 0);
  ctx.restore(); ctx.restore();
}

// ---------- subtitle slips ----------
function wrap(x, txt, maxW) {
  if (x.measureText(txt).width <= maxW) return [txt];
  const w = txt.split(' '); let best = null, bd = 1e9;
  for (let i = 1; i < w.length; i++) { const a = w.slice(0, i).join(' '), b = w.slice(i).join(' '), wa = x.measureText(a).width, wb = x.measureText(b).width; if (wa <= maxW && wb <= maxW && Math.abs(wa - wb) < bd) { bd = Math.abs(wa - wb); best = [a, b]; } }
  if (best) return best;
  for (let i = 1; i < w.length; i++) for (let j = i + 1; j < w.length; j++) { const L = [w.slice(0, i), w.slice(i, j), w.slice(j)].map(a => a.join(' ')), ws = L.map(l => x.measureText(l).width); if (Math.max(...ws) <= maxW && Math.max(...ws) - Math.min(...ws) < bd) { bd = Math.max(...ws) - Math.min(...ws); best = L; } }
  return best || [txt];
}
function drawSubs(t) {
  for (const s of SUBVIEW) {
    if (t < s.t0 - .15 || t > s.t1 + .3) continue;
    const pin = clamp((t - (s.t0 - .15)) / .22), fo = 1 - clamp((t - s.t1) / .25);
    ctx.save(); ctx.font = '500 38px Shippori'; const lines = wrap(ctx, s.text, 860), lh = 48, h = lines.length * lh + 40, wmax = Math.max(...lines.map(l => ctx.measureText(l).width)) + 120;
    const x0 = 540 - wmax / 2, y0 = 1840 - h;
    const draw = x => {
      x.fillStyle = 'rgba(243,231,198,.96)'; x.fillRect(x0, y0, wmax, h); x.strokeStyle = PAL.sumi; x.lineWidth = 2.6; x.strokeRect(x0, y0, wmax, h); x.lineWidth = 1; x.strokeRect(x0 + 5, y0 + 5, wmax - 10, h - 10);
      x.font = '500 38px Shippori'; x.fillStyle = PAL.sumi; x.textAlign = 'center'; x.textBaseline = 'middle'; lines.forEach((l, k) => x.fillText(l, 540 + 24, y0 + 20 + lh / 2 + k * lh));
    };
    ctx.globalAlpha = fo; stampFn(ctx, draw, pin, [0, 8]);
    drawSeal(ctx, '毘', x0 + 40, y0 + h / 2, 40, pin, { seed: 9, normal: true });
    ctx.restore();
  }
}

// ---------- frame ----------
let TXS = [], LIVE = true;
function render(t) {
  TXS = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = PAL.mount; ctx.fillRect(0, 0, W, H);
  const [cx, cy, z] = cam(t);
  ctx.save(); ctx.globalAlpha = .35; ctx.drawImage(TX.paper, 0, 0); ctx.restore();   // the mount's own paper texture, tinted by its colour
  POS.forEach(([sx, sy], i) => {
    const a = [z, 0, 0, z, (sx - cx) * z + W / 2, (sy - cy) * z + H / 2];
    if (a[4] > W || a[4] + W * z < 0 || a[5] > H || a[5] + H * z < 0) return;
    drawSheet(i, t, a);
  });
  // the English title slip, laid on the first print, lifted before the story starts
  const ts = seg(t, 1.0, 1.4) * (1 - seg(t, 6.6, 7.2));
  if (ts > 0) { const [, , zz] = [cx, cy, z]; stampFn(ctx, x => { x.fillStyle = 'rgba(243,231,198,.97)'; x.fillRect(190, 300, 700, 120); x.strokeStyle = PAL.sumi; x.lineWidth = 2.6; x.strokeRect(190, 300, 700, 120); x.lineWidth = 1; x.strokeRect(195, 305, 690, 110); x.font = '500 54px Shippori'; x.fillStyle = PAL.sumi; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('The Patient Tortoise', 540, 362); }, ts < 1 && t < 4 ? ts : 1);
    if (t > 1.6 && t < 6.6) { drawSeal(ctx, '毘紐', 850, 404, 54, clamp((t - 1.8) / .3), { seed: 3 }); TXS.push({ id: 'title', text: 'The Patient Tortoise', x0: 190, y0: 300, x1: 890, y1: 420 }); }
  }
  // the end: every print washes back to paper; one seal remains
  const wp = seg(t, T.wash[0], T.wash[1]);
  if (wp > 0) { const k = Math.min(12, Math.floor(wp * 12.999)), tmp = TX.tmp, x = tmp.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'copy'; x.drawImage(TX.paper, 0, 0); x.globalCompositeOperation = 'destination-in'; x.drawImage(TX.reveal[k], 0, 0, W, H); x.globalCompositeOperation = 'source-over'; ctx.drawImage(tmp, 0, 0); if (wp >= 1) ctx.drawImage(TX.paper, 0, 0); }
  if (t > T.seal) drawSeal(ctx, '毘紐', 540, 900, 210, clamp((t - T.seal) / .4), { seed: 21, normal: true });
  drawSubs(t);
}
window.render = render;
window.TEXTS = t => { render(t); return TXS; };

// ---------- sound events ----------
const EV = []; const ev = (t, type, o = {}) => EV.push({ t: +t.toFixed(3), type, ...o });
VOICE.forEach(([id, t]) => ev(t, 'voice', { id }));
SUBVIEW.forEach(s => ev(s.t0, 'sub', { d: s.t1 - s.t0, text: s.text }));
T.print.forEach((t0, i) => { for (let g = 0; g < 4; g++) ev(t0 + g * .42, 'baren', { g }); });
T.cart.forEach(t0 => { ev(t0, 'slip'); ev(t0 + .45, 'seal'); });
[[15.0, 2.0], [48.0, 2.0], [69.0, 2.0], [84.0, 2.0]].forEach(([t0, d]) => ev(t0, 'slide', { d }));
ev(35.6, 'slide', { d: 2.2, down: 1 });
T.imp.slice(1).forEach(t0 => { for (let g = 2; g < 4; g++) ev(t0 + (g - 2) * .2, 'baren', { g }); });
ev(T.pull[0], 'slide', { d: 6 }); ev(T.home[0], 'slide', { d: 6.4 }); ev(T.wash[0], 'wash', { d: 4.4 }); ev(T.seal, 'seal', { big: 1 });
ev(78.0, 'garland', { d: 2.4 });
window.EV = EV; window.T = T;

await document.fonts.load('400 40px Yuji', '一二三四五六乳海攪拌亀宝吉祥天甘露毘紐'); await document.fonts.load('500 40px Shippori', 'Aa');
buildTextures();
window.READY = true;
