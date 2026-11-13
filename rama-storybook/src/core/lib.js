// Luminous Myth engine: canvas, jewel palette, math and drawing primitives.
// Every drawing function in the kit uses the shared `ctx` exported here (main.js swaps it for cross-fades).
export const W = 1080, H = 1920, FPS = 30;
export let ctx = null;
export function setCtx(c) { ctx = c; }

export const C = {
  night: '#0D0630', indigo: '#1B0F5C', purple: '#4A1D96', violet: '#7B3FE4', magenta: '#E0218A', pink: '#FF6FB5',
  coral: '#FF5A5F', saffron: '#FF8A1F', orange: '#FFA63D', gold: '#FFC83D', paleGold: '#FFE9A8', cream: '#FFF6DC',
  teal: '#0FB5A6', aqua: '#3FE0D0', cyan: '#5CE1FF', ocean: '#1257C8', deep: '#082A6B', abyss: '#050B2E',
  vishnu: '#3F7BFF', vishnuDark: '#1E3FCC', skin: '#C98A5E', skinShade: '#A4673F', skinLight: '#E0A77C',
  ink: '#12082E', white: '#FFFFFF', emerald: '#19C37D', leaf: '#3DDC84', forest: '#0B6B4F', red: '#FF2E4D', hair: '#1A0F2E',
};

// ---------- math ----------
export const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const seg = (t, a, b) => clamp((t - a) / ((b - a) || 1e-6));
export const eo = (t) => 1 - Math.pow(1 - t, 3);
export const ei = (t) => t * t * t;
export const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const eob = (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
export const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const TAU = Math.PI * 2;

// ---------- colour ----------
const hx = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
export const rgba = (h, a = 1) => { const [r, g, b] = hx(h); return `rgba(${r},${g},${b},${a})`; };
export const mix = (a, b, t) => { const A = hx(a), B = hx(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(t)))).join(',')})`; };
export function lg(x0, y0, x1, y1, stops) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach((s, i) => (Array.isArray(s) ? g.addColorStop(s[0], s[1]) : g.addColorStop(i / (stops.length - 1), s))); return g; }
export function rg(x, y, r0, r1, stops) { const g = ctx.createRadialGradient(x, y, r0, x, y, r1); stops.forEach((s, i) => (Array.isArray(s) ? g.addColorStop(s[0], s[1]) : g.addColorStop(i / (stops.length - 1), s))); return g; }
/** soft additive glow */
export function glow(x, y, r, color, a = 1) {
  if (a <= 0 || r <= 0) return;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= clamp(a);
  ctx.fillStyle = rg(x, y, 0, r, [rgba(color, 0.95), [0.35, rgba(color, 0.45)], [1, rgba(color, 0)]]);
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
}

// ---------- primitives ----------
export function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
export function circle(x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
export function ell(x, y, rx, ry, fill, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(0, rx), Math.max(0, ry), rot, 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
export function line(pts, color, w, dash) {
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.stroke(); if (dash) ctx.setLineDash([]);
}
export function fillAll(fill) { ctx.fillStyle = fill; ctx.fillRect(-400, -400, W + 800, H + 800); }
/** ornamental title text: gold gradient, ink outline */
export function bigText(text, x, y, size, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(o.sc ?? 1, o.sc ?? 1); ctx.globalAlpha *= o.a ?? 1;
  ctx.font = `900 ${size}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.letterSpacing = (o.ls ?? 0) + 'px';
  ctx.lineWidth = size * 0.16; ctx.strokeStyle = o.stroke || C.ink; ctx.strokeText(text, 0, size * 0.04); ctx.strokeText(text, 0, 0);
  ctx.fillStyle = o.fill || lg(0, -size / 2, 0, size / 2, [C.cream, C.gold, C.saffron]); ctx.fillText(text, 0, 0);
  ctx.letterSpacing = '0px'; ctx.restore();
}
