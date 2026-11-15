// Luminous Myth: the COMPONENT ZOO. Jewel-tone gradients, gold ornament, soft additive glows.
// All functions draw immediately with the shared ctx, in 1080x1920 canvas pixels unless a scale is given.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, seg, eo, rr, circle, ell, line, fillAll, lg, rg, glow, rgba, mix } from './lib.js';

const PI = Math.PI;

// ═════════════════════════ SKIES ═════════════════════════
export const SKY = {
  dawn: ['#2B1466', '#B0277F', '#FF6A3D', '#FFC65C'],
  day: ['#1257C8', '#3FA9F5', '#9BE8E0', '#FFF1B8'],
  dusk: ['#1B0F5C', '#6B1FA8', '#E0218A', '#FF8A1F'],
  night: ['#060321', '#150A4A', '#3A1680', '#7B2FA8'],
  storm: ['#0A0630', '#22157A', '#4A2AA8', '#8A3FC8'],
  cosmic: ['#0A0430', '#2A0E78', '#7B1FA8', '#E0218A'],
  gold: ['#FF5A3D', '#FF8A1F', '#FFC83D', '#FFF1B8'],
  newdawn: ['#3FA9F5', '#8FD8F0', '#FFD9A0', '#FF9A6B'],
};
export function sky(stops) { fillAll(lg(0, 0, 0, H * 0.82, typeof stops === 'string' ? SKY[stops] : stops)); }

export function sparkle(x, y, s, a = 1, col = C.cream) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= clamp(a); ctx.fillStyle = col;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) { const r = i % 2 ? s * 0.16 : s, an = i * PI / 4; ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r); }
  ctx.closePath(); ctx.fill(); ctx.restore();
}
export function stars(t, a = 1, seed = 0, n = 110, yMax = 1300) {
  for (let i = 0; i < n; i++) {
    const x = rnd(i + seed) * (W + 400) - 200, y = rnd(i * 3.1 + seed) * yMax - 100, tw = 0.5 + 0.5 * Math.sin(t * (1.5 + rnd(i) * 3) + i);
    if (i % 9 === 0) sparkle(x, y, 10 + 12 * tw, a * (0.5 + 0.5 * tw));
    else { ctx.globalAlpha = a * (0.35 + 0.65 * tw); circle(x, y, 1.6 + rnd(i * 7) * 2.6, C.cream); ctx.globalAlpha = 1; }
  }
}
/** the sun: glow, rotating petal rays, disc */
export function sun(x, y, r, t, o = {}) {
  const c1 = o.c1 || C.cream, c2 = o.c2 || C.gold, c3 = o.c3 || C.saffron;
  glow(x, y, r * 3.6, c2, o.glow ?? 0.55);
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.12);
  for (let i = 0; i < 24; i++) {
    const long = i % 2 === 0, r1 = r * 1.12, r2 = r * (long ? 1.75 : 1.42), w = long ? 0.11 : 0.08, an = i * TAU / 24;
    ctx.beginPath(); ctx.moveTo(Math.cos(an - w) * r1, Math.sin(an - w) * r1); ctx.lineTo(Math.cos(an) * r2, Math.sin(an) * r2); ctx.lineTo(Math.cos(an + w) * r1, Math.sin(an + w) * r1);
    ctx.fillStyle = rgba(long ? c2 : c1, long ? 0.85 : 0.7); ctx.fill();
  }
  ctx.restore();
  circle(x, y, r, rg(x - r * 0.3, y - r * 0.3, r * 0.1, r * 1.1, [c1, c2, c3]));
  ctx.strokeStyle = rgba(C.cream, 0.7); ctx.lineWidth = r * 0.04; ctx.beginPath(); ctx.arc(x, y, r * 0.8, 0, TAU); ctx.stroke();
}
/** rotating gold-line mandala */
export function mandala(x, y, r, t, col = C.gold, a = 1, rings = 4) {
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineCap = 'round';
  for (let k = 0; k < rings; k++) {
    const r0 = r * (0.28 + k * 0.72 / rings), r1 = r * (0.28 + (k + 1) * 0.72 / rings), n = 8 + k * 4;
    ctx.save(); ctx.rotate(t * 0.18 * (k % 2 ? -1 : 1) + k * 0.2); ctx.lineWidth = Math.max(2, r * 0.008);
    for (let i = 0; i < n; i++) {
      const an = i * TAU / n, w = PI / n * 0.92;
      ctx.beginPath(); ctx.moveTo(Math.cos(an - w) * r0, Math.sin(an - w) * r0);
      ctx.quadraticCurveTo(Math.cos(an - w * 0.6) * r1 * 0.96, Math.sin(an - w * 0.6) * r1 * 0.96, Math.cos(an) * r1, Math.sin(an) * r1);
      ctx.quadraticCurveTo(Math.cos(an + w * 0.6) * r1 * 0.96, Math.sin(an + w * 0.6) * r1 * 0.96, Math.cos(an + w) * r0, Math.sin(an + w) * r0);
      ctx.stroke();
      circle(Math.cos(an) * (r0 + r1) / 2, Math.sin(an) * (r0 + r1) / 2, r * 0.008, col);
    }
    ctx.beginPath(); ctx.arc(0, 0, r0, 0, TAU); ctx.stroke();
    ctx.restore();
  }
  ctx.lineWidth = Math.max(3, r * 0.012); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke();
  ctx.restore();
}
export function rays(x, y, r, t, col = C.paleGold, a = 0.35, n = 14) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.08); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= a;
  ctx.fillStyle = rg(0, 0, 0, r, [rgba(col, 0.9), rgba(col, 0)]);
  for (let i = 0; i < n; i++) { const an = i * TAU / n, w = TAU / n * 0.22; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, an - w, an + w); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
export function hills(yBase, amp, seed, fill, wl = 0.004) {
  ctx.beginPath(); ctx.moveTo(-400, H + 400);
  for (let x = -400; x <= W + 400; x += 30) ctx.lineTo(x, yBase - amp * (0.5 + 0.5 * Math.sin(x * wl + seed)) - amp * 0.25 * Math.sin(x * wl * 2.7 + seed * 2));
  ctx.lineTo(W + 400, H + 400); ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
}
export function mountain(x, y, w, h, c1, c2, snow = true) {
  ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x - w * 0.08, y - h * 0.86); ctx.quadraticCurveTo(x, y - h * 1.02, x + w * 0.08, y - h * 0.86); ctx.lineTo(x + w / 2, y); ctx.closePath();
  ctx.fillStyle = lg(x, y - h, x, y, [c1, c2]); ctx.fill();
  if (snow) { ctx.beginPath(); ctx.moveTo(x - w * 0.17, y - h * 0.66); ctx.lineTo(x - w * 0.08, y - h * 0.86); ctx.quadraticCurveTo(x, y - h * 1.02, x + w * 0.08, y - h * 0.86); ctx.lineTo(x + w * 0.17, y - h * 0.66);
    ctx.lineTo(x + w * 0.09, y - h * 0.72); ctx.lineTo(x + w * 0.02, y - h * 0.62); ctx.lineTo(x - w * 0.07, y - h * 0.73); ctx.closePath(); ctx.fillStyle = rgba(C.cream, 0.9); ctx.fill(); }
}
export function clouds(y, t, col, seed = 0, n = 6, sp = 14, sc = 1) {
  for (let i = 0; i < n; i++) {
    const cx = ((rnd(i + seed) * 1900 + t * sp * (0.6 + rnd(i * 5 + seed))) % 1900) - 400, cy = y + (rnd(i * 2.3 + seed) - 0.5) * 220 * sc;
    for (let k = 0; k < 6; k++) circle(cx + (k - 2.5) * 95 * sc, cy + Math.sin(k * 2.1 + i) * 34 * sc, (95 + rnd(i * 9 + k) * 70) * sc, col);
  }
}
export function rain(t, a = 0.5, n = 150) {
  ctx.save(); ctx.strokeStyle = rgba('#C8E6FF', a); ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const sp = 1700 * (0.7 + rnd(i) * 0.6), y = ((rnd(i * 3.7) * (H + 500) + t * sp) % (H + 500)) - 250, x = rnd(i * 1.9) * (W + 700) - 250 - y * 0.18, l = 50 + rnd(i * 5) * 60;
    ctx.moveTo(x, y); ctx.lineTo(x - l * 0.18, y + l);
  }
  ctx.stroke(); ctx.restore();
}
export function lightning(x0, seed, a = 1, yEnd = 950) {
  if (a <= 0) return;
  const pts = [[x0, -50]]; let x = x0, y = -50, i = 0;
  while (y < yEnd) { y += 70 + rnd(seed + i) * 80; x += (rnd(seed * 3 + i) - 0.5) * 190; pts.push([x, y]); i++; }
  ctx.save(); ctx.globalAlpha *= clamp(a); ctx.globalCompositeOperation = 'lighter';
  line(pts, rgba(C.violet, 0.5), 46); line(pts, rgba(C.cyan, 0.7), 18); line(pts, C.white, 7);
  const b = Math.floor(pts.length / 2), br = [pts[b]]; let bx = pts[b][0], by = pts[b][1];
  for (let k = 0; k < 4; k++) { bx += 60 + rnd(seed + k * 7) * 70; by += 60 + rnd(seed + k * 11) * 60; br.push([bx, by]); }
  line(br, rgba(C.cyan, 0.6), 12); line(br, C.white, 4);
  ctx.restore();
}

// ═════════════════════════ WATER ═════════════════════════
/** scalloped rows of waves from y0 to the bottom. cols = [far, near] */
export function sea(y0, t, o = {}) {
  const n = o.rows || 9, [ca, cb] = o.cols || [C.cyan, C.deep], amp = o.amp ?? 26, sp = o.speed ?? 1, bottom = o.bottom ?? H + 400;
  for (let k = 0; k < n; k++) {
    const u = k / n, yk = y0 + (bottom - y0) * Math.pow(u, 1.25) + Math.sin(t * 1.1 * sp + k * 1.3) * amp * 0.35, a = amp * (0.55 + u * 1.2), wl = (o.wl || 150) * (1 + u * 1.3);
    const ph = t * sp * 60 * (k % 2 ? 1 : -1) * (0.6 + u) + k * 97;
    ctx.beginPath(); ctx.moveTo(-400, bottom + 200);
    for (let x = -400; x <= W + 400; x += 14) ctx.lineTo(x, yk - a * Math.abs(Math.sin((x + ph) / wl * PI)));
    ctx.lineTo(W + 400, bottom + 200); ctx.closePath();
    ctx.fillStyle = mix(ca, cb, u * (o.gamma || 1)); ctx.fill();
    ctx.strokeStyle = rgba(o.crest || C.white, (o.crestA ?? 0.4) * (1 - u * 0.5)); ctx.lineWidth = 3 + u * 4; ctx.stroke();
  }
}
/** y of the nearest-to-top wave row at x, for floating things */
export const bob = (t, k = 0, amp = 18) => Math.sin(t * 1.6 + k) * amp;

export function underwater(t, o = {}) {
  fillAll(lg(0, 0, 0, H, o.cols || ['#2ED3C6', '#0F7FB8', '#0A2A7A', '#07103A']));
  shafts(t, o.shafts ?? 0.22);
  bubbles(t, 26, o.seed || 0, 0.5);
}
export function shafts(t, a = 0.2, x0 = 540) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 6; i++) {
    const x = x0 - 520 + i * 210 + Math.sin(t * 0.4 + i) * 40, w = 60 + rnd(i) * 80, sl = (x - x0) * 0.5 + Math.sin(t * 0.3 + i * 2) * 30;
    ctx.beginPath(); ctx.moveTo(x - w / 2, -300); ctx.lineTo(x + w / 2, -300); ctx.lineTo(x + w * 1.6 + sl, H + 300); ctx.lineTo(x - w * 1.6 + sl, H + 300); ctx.closePath();
    ctx.fillStyle = lg(0, -100, 0, 1500, [rgba(C.cream, a * (0.6 + 0.4 * Math.sin(t * 0.8 + i * 1.7))), rgba(C.cream, 0)]); ctx.fill();
  }
  ctx.restore();
}
export function bubbles(t, n = 24, seed = 0, a = 0.5, sp = 120) {
  ctx.save(); ctx.lineWidth = 3;
  for (let i = 0; i < n; i++) {
    const r = 6 + rnd(i * 3 + seed) * 16, y = H + 100 - ((rnd(i + seed) * (H + 300) + t * sp * (0.5 + rnd(i * 7))) % (H + 300)), x = rnd(i * 5.3 + seed) * W + Math.sin(t * 1.5 + i) * 18;
    ctx.strokeStyle = rgba(C.white, a); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); circle(x - r * 0.35, y - r * 0.35, r * 0.22, rgba(C.white, a));
  }
  ctx.restore();
}
export function seaweed(x, y, h, t, col = C.forest, seed = 0) {
  for (let k = 0; k < 3; k++) {
    const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push([x + (k - 1) * 34 + Math.sin(t * 1.2 + u * 4 + k + seed) * 28 * u, y - h * u * (0.7 + k * 0.15)]); }
    line(pts, col, 20 - k * 3);
  }
}
/** the great flood wave: a tall curling crest */
export function bigWave(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const P = () => { ctx.beginPath(); ctx.moveTo(-900, 900); ctx.bezierCurveTo(-760, 300, -520, -430, 20, -560);
    ctx.bezierCurveTo(260, -610, 470, -500, 480, -330); ctx.bezierCurveTo(430, -420, 290, -450, 210, -380);
    ctx.bezierCurveTo(60, -250, 110, 150, 420, 900); ctx.closePath(); };
  P(); ctx.fillStyle = lg(0, -600, 0, 900, [C.cyan, '#1F8FE0', C.ocean, C.deep]); ctx.fill();
  ctx.save(); P(); ctx.clip(); ctx.lineCap = 'round';
  for (let i = 0; i < 7; i++) { ctx.beginPath(); const o = i * 95 + (t * 40) % 95; ctx.moveTo(-860 + o, 900); ctx.bezierCurveTo(-720 + o, 300, -480 + o * 0.8, -400 + o * 0.5, 40 + o * 0.3, -540 + o * 0.8);
    ctx.strokeStyle = rgba(C.white, 0.22); ctx.lineWidth = 14; ctx.stroke(); }
  ctx.restore();
  for (let i = 0; i < 26; i++) { const u = i / 25, an = lerp(-2.6, 0.25, u), fx = 140 + Math.cos(an) * 380 - (u < 0.3 ? (0.3 - u) * 900 : 0), fy = -250 + Math.sin(an) * 330 + (u < 0.3 ? (0.3 - u) * 900 : 0);
    circle(fx + Math.sin(t * 3 + i) * 8, fy + Math.cos(t * 2.4 + i) * 8, 34 + rnd(i) * 30, C.cream); }
  for (let i = 0; i < 9; i++) { const u = i / 8; circle(470 - u * 60 + Math.sin(t * 4 + i) * 6, -330 + u * 140 + ((t * 120 + i * 30) % 160), 20 - u * 12, rgba(C.cream, 0.9)); }
  ctx.restore();
}
export function splash(x, y, s, p, col = C.cream) {
  if (p <= 0 || p >= 1) return;
  for (let i = 0; i < 12; i++) { const an = -PI * (0.12 + 0.76 * i / 11), d = s * (0.4 + rnd(i) * 0.9) * eo(p); circle(x + Math.cos(an) * d, y + Math.sin(an) * d + s * 0.9 * p * p, (10 + rnd(i * 3) * 14) * (1 - p) * s / 120, col); }
}
export function ripples(x, y, t, n = 3, rx = 120, col = C.white, a = 0.6) {
  ctx.save(); ctx.lineWidth = 4;
  for (let i = 0; i < n; i++) { const p = ((t * 0.5 + i / n) % 1); ctx.strokeStyle = rgba(col, a * (1 - p)); ctx.beginPath(); ctx.ellipse(x, y, rx * (0.2 + p), rx * 0.3 * (0.2 + p), 0, 0, TAU); ctx.stroke(); }
  ctx.restore();
}

// ═════════════════════════ MATSYA ═════════════════════════
/** the golden fish, facing right. local: nose (200,0), tail base (-170,0). o: rot, flip, t, horn, glow, eye ('n'|'happy'|'fear'), swish */
export function fish(x, y, s, o = {}) {
  const t = o.t || 0, sw = Math.sin(t * (o.swish ?? 6)) * 0.3;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.flip ? -1 : 1), s);
  if (o.glow) { glow(0, 0, 420, C.gold, o.glow * 0.8); glow(0, 0, 260, C.cream, o.glow * 0.5); }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // tail
  ctx.save(); ctx.translate(-160, 0); ctx.rotate(sw);
  ctx.beginPath(); ctx.moveTo(20, 0); ctx.bezierCurveTo(-40, -30, -90, -130, -170, -140); ctx.quadraticCurveTo(-110, -40, -120, 0); ctx.quadraticCurveTo(-110, 40, -170, 140); ctx.bezierCurveTo(-90, 130, -40, 30, 20, 0);
  ctx.fillStyle = lg(-170, 0, 20, 0, [C.magenta, C.coral, C.saffron]); ctx.fill();
  ctx.strokeStyle = rgba(C.cream, 0.55); ctx.lineWidth = 4; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(-10, i * 4); ctx.quadraticCurveTo(-70, i * 30, -135, i * 55); ctx.stroke(); }
  ctx.restore();
  // dorsal + belly fins
  ctx.beginPath(); ctx.moveTo(-110, -70); ctx.bezierCurveTo(-70, -190, 30, -200, 100, -86); ctx.closePath(); ctx.fillStyle = lg(0, -200, 0, -70, [C.magenta, C.coral]); ctx.fill();
  ctx.strokeStyle = rgba(C.cream, 0.5); ctx.lineWidth = 4; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-80 + i * 34, -84); ctx.lineTo(-62 + i * 30, -150 + Math.abs(i - 1.6) * 16); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-70, 80); ctx.quadraticCurveTo(-60, 150, -5, 130); ctx.quadraticCurveTo(-10, 100, 10, 86); ctx.closePath(); ctx.fillStyle = C.coral; ctx.fill();
  // body
  const body = () => { ctx.beginPath(); ctx.moveTo(205, 4); ctx.bezierCurveTo(160, -100, -40, -125, -175, -26); ctx.lineTo(-175, 26); ctx.bezierCurveTo(-40, 122, 150, 104, 205, 4); ctx.closePath(); };
  body(); ctx.fillStyle = lg(0, -110, 0, 110, [C.cream, [0.25, C.paleGold], [0.6, C.gold], [1, C.saffron]]); ctx.fill();
  ctx.save(); body(); ctx.clip();
  ctx.lineWidth = 4;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) {
    const cx = -170 + c * 36 + (r % 2) * 18, cy = -100 + r * 32; if (cx > 96) continue;
    ctx.beginPath(); ctx.arc(cx, cy, 22, -PI * 0.42, PI * 0.42); ctx.strokeStyle = rgba('#C2560A', 0.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx - 3, cy, 22, -PI * 0.3, PI * 0.1); ctx.strokeStyle = rgba(C.white, 0.5); ctx.stroke();
  }
  ell(40, -75, 190, 26, rgba(C.white, 0.35));
  ctx.restore();
  // gill + jewels
  ctx.beginPath(); ctx.arc(72, 0, 76, -PI * 0.36, PI * 0.36); ctx.strokeStyle = rgba('#C2560A', 0.75); ctx.lineWidth = 6; ctx.stroke();
  for (let i = -1; i <= 1; i++) circle(132 + Math.abs(i) * -8, -64 + 0 * i + Math.abs(i) * 6 + i * 0, 0, C.red);
  // pectoral fin
  ctx.save(); ctx.translate(60, 36); ctx.rotate(0.5 + Math.sin(t * 5) * 0.25);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-60, 10, -90, 60); ctx.quadraticCurveTo(-30, 60, 0, 0); ctx.fillStyle = lg(-90, 0, 0, 0, [C.magenta, C.orange]); ctx.fill(); ctx.restore();
  // horn
  if (o.horn) {
    const h = o.horn === true ? 0.62 : o.horn;
    ctx.save(); ctx.translate(128, -72); ctx.scale(h, h);
    glow(40, -100, 130, C.cream, 0.55);
    ctx.beginPath(); ctx.moveTo(-26, 4); ctx.quadraticCurveTo(-8, -130, 96, -210); ctx.quadraticCurveTo(58, -100, 34, 14); ctx.closePath();
    ctx.fillStyle = lg(0, -210, 0, 10, [C.white, C.paleGold, C.gold]); ctx.fill();
    ctx.strokeStyle = rgba('#C2560A', 0.6); ctx.lineWidth = 5; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-22 + i * 9, 4 - i * 38); ctx.lineTo(30 + i * 9, 0 - i * 44); ctx.stroke(); }
    ctx.restore();
  }
  // eye + mouth
  const ex = 142, ey = -22;
  circle(ex, ey, 25, C.white);
  if (o.eye === 'happy') { ctx.beginPath(); ctx.arc(ex, ey + 6, 14, PI * 1.1, PI * 1.9); ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.stroke(); }
  else { circle(ex + 3, ey + (o.eye === 'fear' ? -2 : 1), o.eye === 'fear' ? 9 : 14, C.ink); circle(ex + 8, ey - 5, 5, C.white); }
  ctx.beginPath(); ctx.arc(176, 22, 16, PI * 0.55, PI * 1.05); ctx.strokeStyle = '#B0440A'; ctx.lineWidth = 5; ctx.stroke();
  ctx.restore();
}
/** dark hunter fish silhouette (the "bigger fish") */
export function darkFish(x, y, s, flip, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (flip ? -1 : 1), s);
  ctx.save(); ctx.translate(-150, 0); ctx.rotate(Math.sin(t * 4) * 0.25);
  ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(-130, -120); ctx.quadraticCurveTo(-90, 0, -130, 120); ctx.closePath(); ctx.fillStyle = '#0A1B4A'; ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.moveTo(220, 10); ctx.bezierCurveTo(150, -110, -60, -120, -165, -20); ctx.lineTo(-165, 20); ctx.bezierCurveTo(-60, 110, 140, 110, 220, 10); ctx.closePath();
  ctx.fillStyle = lg(0, -110, 0, 110, ['#16307A', '#081440']); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, -90); ctx.lineTo(20, -180); ctx.lineTo(70, -84); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(215, 14); ctx.lineTo(120, 30); ctx.lineTo(205, 46); ctx.closePath(); ctx.fillStyle = '#040A26'; ctx.fill();
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(135 + i * 16, 30); ctx.lineTo(143 + i * 16, 44); ctx.lineTo(151 + i * 16, 31); ctx.fillStyle = C.cream; ctx.fill(); }
  glow(150, -20, 50, C.red, 0.9); circle(150, -20, 11, '#FFD0D0');
  ctx.restore();
}

// ═════════════════════════ PEOPLE ═════════════════════════
/** King Satyavrata. origin = hips. standing: feet +330, head -280, crown top -420.
 *  o: s, face (1|-1), lean (rad), kneel, hands: [[lx,ly],[rx,ry]] in body coords, eyes ('closed'|'open'|'wide'), holding(x,y), t */
export function king(x, y, o = {}) {
  const s = o.s || 1, t = o.t || 0, hands = o.hands || [[-90, -40], [90, -40]];
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // legs / dhoti
  if (o.kneel) {
    ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(-170, 20, -190, 110); ctx.quadraticCurveTo(-60, 150, 130, 120); ctx.quadraticCurveTo(150, 50, 70, -10); ctx.closePath();
    ctx.fillStyle = lg(0, -10, 0, 140, [C.orange, C.saffron, '#D95A0A']); ctx.fill();
    ell(-190, 118, 46, 20, C.skinShade); ctx.strokeStyle = rgba(C.gold, 0.9); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-170, 96); ctx.quadraticCurveTo(-40, 132, 126, 106); ctx.stroke();
  } else {
    const wk = o.walk ? Math.sin(t * 7) * 26 : 0;
    ell(-42 - wk, 322, 44, 18, C.skinShade); ell(42 + wk, 322, 44, 18, C.skinShade);
    ctx.beginPath(); ctx.moveTo(-76, -10); ctx.lineTo(-70 - wk, 300); ctx.lineTo(-12 - wk, 300); ctx.lineTo(0, 110); ctx.lineTo(12 + wk, 300); ctx.lineTo(70 + wk, 300); ctx.lineTo(76, -10); ctx.closePath();
    ctx.fillStyle = lg(0, -10, 0, 300, [C.orange, C.saffron, '#D95A0A']); ctx.fill();
    ctx.strokeStyle = rgba(C.gold, 0.9); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-70 - wk, 290); ctx.lineTo(-12 - wk, 290); ctx.moveTo(12 + wk, 290); ctx.lineTo(70 + wk, 290); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(0, 210); ctx.lineTo(18, 0); ctx.closePath(); ctx.fillStyle = C.magenta; ctx.fill();
  }
  // upper body
  ctx.rotate(o.lean || 0);
  // long hair behind
  ctx.beginPath(); ctx.moveTo(-64, -290); ctx.quadraticCurveTo(-84, -200, -66, -170); ctx.lineTo(66, -170); ctx.quadraticCurveTo(84, -200, 64, -290); ctx.closePath(); ctx.fillStyle = C.hair; ctx.fill();
  // torso
  ctx.beginPath(); ctx.moveTo(-86, -196); ctx.quadraticCurveTo(-92, -214, -60, -218); ctx.lineTo(60, -218); ctx.quadraticCurveTo(92, -214, 86, -196); ctx.lineTo(66, 0); ctx.lineTo(-66, 0); ctx.closePath();
  ctx.fillStyle = lg(-80, 0, 80, 0, [C.skinShade, C.skin, C.skinLight]); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-84, -212); ctx.lineTo(-40, -216); ctx.lineTo(70, -8); ctx.lineTo(30, 0); ctx.closePath(); ctx.fillStyle = lg(0, -216, 0, 0, [C.pink, C.magenta]); ctx.fill();
  rr(-72, -16, 144, 30, 12); ctx.fillStyle = lg(0, -16, 0, 14, [C.paleGold, C.gold]); ctx.fill(); circle(0, -1, 10, C.red);
  ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -214, 46, 0.15 * PI, 0.85 * PI); ctx.stroke(); circle(0, -168, 10, C.cyan);
  // neck + head
  rr(-20, -246, 40, 40, 10); ctx.fillStyle = C.skinShade; ctx.fill();
  circle(0, -284, 60, lg(-60, 0, 60, 0, [C.skin, C.skinLight]));
  ctx.beginPath(); ctx.arc(0, -292, 61, PI * 1.02, PI * 1.98); ctx.quadraticCurveTo(0, -330, -61, -296); ctx.fillStyle = C.hair; ctx.fill();
  circle(-62, -272, 9, C.gold); circle(62, -272, 9, C.gold);
  // crown
  ctx.beginPath(); ctx.moveTo(-60, -322); ctx.lineTo(-70, -392); ctx.lineTo(-36, -360); ctx.lineTo(0, -428); ctx.lineTo(36, -360); ctx.lineTo(70, -392); ctx.lineTo(60, -322); ctx.closePath();
  ctx.fillStyle = lg(0, -428, 0, -322, [C.cream, C.gold, C.saffron]); ctx.fill();
  rr(-62, -334, 124, 20, 8); ctx.fillStyle = C.gold; ctx.fill(); circle(0, -366, 11, C.red); circle(-40, -324, 6, C.cyan); circle(40, -324, 6, C.cyan); circle(0, -428, 9, C.cream);
  // face
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5;
  const e = o.eyes || 'open';
  if (e === 'closed') { ctx.beginPath(); ctx.arc(-22, -288, 10, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.beginPath(); ctx.arc(22, -288, 10, 0.1 * PI, 0.9 * PI); ctx.stroke(); }
  else { const r = e === 'wide' ? 11 : 8; if (e === 'wide') { circle(-22, -288, 14, C.white); circle(22, -288, 14, C.white); } circle(-22 + (o.lookX || 0), -288 + (o.lookY || 0), r, C.ink); circle(22 + (o.lookX || 0), -288 + (o.lookY || 0), r, C.ink); circle(-19 + (o.lookX || 0), -291, 3, C.white); circle(25 + (o.lookX || 0), -291, 3, C.white); }
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-34, -306 - (e === 'wide' ? 8 : 0)); ctx.quadraticCurveTo(-22, -312 - (e === 'wide' ? 8 : 0), -10, -306); ctx.moveTo(10, -306); ctx.quadraticCurveTo(22, -312 - (e === 'wide' ? 8 : 0), 34, -306 - (e === 'wide' ? 8 : 0)); ctx.stroke();
  ctx.strokeStyle = C.hair; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-24, -262); ctx.quadraticCurveTo(-10, -272, 0, -264); ctx.quadraticCurveTo(10, -272, 24, -262); ctx.stroke();
  if (e === 'wide') ell(0, -248, 8, 9, '#5A1F1F'); else { ctx.strokeStyle = '#5A1F1F'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -258, 12, 0.2 * PI, 0.8 * PI); ctx.stroke(); }
  circle(0, -312, 5, C.red);
  // arms
  const prop = o.holding; let mid = null;
  [[-84, -196, hands[0], -1], [84, -196, hands[1], 1]].forEach(([sx, sy, h, side]) => {
    const mx = (sx + h[0]) / 2, my = (sy + h[1]) / 2, dx = h[0] - sx, dy = h[1] - sy, len = Math.hypot(dx, dy) || 1, bend = Math.max(0, 150 - len) * 0.55 + 14;
    const exx = mx + side * bend * 0.9, eyy = my + bend * 0.6;
    ctx.strokeStyle = C.skinShade; ctx.lineWidth = 38; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(exx, eyy); ctx.lineTo(h[0], h[1]); ctx.stroke();
    ctx.strokeStyle = C.skin; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(exx, eyy); ctx.lineTo(h[0], h[1]); ctx.stroke();
    circle(h[0], h[1], 22, C.skinLight);
    const ax = lerp(sx, exx, 0.5), ay = lerp(sy, eyy, 0.5), an = Math.atan2(eyy - sy, exx - sx);
    ctx.save(); ctx.translate(ax, ay); ctx.rotate(an); rr(-9, -20, 18, 40, 6); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore();
  });
  if (o.pray) { const py = (hands[0][1] + hands[1][1]) / 2; ell(0, py - 20, 22, 46, C.skinLight); line([[0, py - 60], [0, py + 18]], C.skinShade, 4); }
  if (prop) prop((hands[0][0] + hands[1][0]) / 2, (hands[0][1] + hands[1][1]) / 2);
  ctx.restore();
}
/** a seated sage (rishi): orange robe, white beard, topknot, halo */
export function sage(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.halo) { glow(0, -120, 150, C.gold, 0.5 * o.halo); ctx.strokeStyle = rgba(C.paleGold, 0.9 * o.halo); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -128, 70, 0, TAU); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-100, 40); ctx.quadraticCurveTo(-110, -10, -52, -40); ctx.lineTo(-44, -90); ctx.quadraticCurveTo(0, -110, 44, -90); ctx.lineTo(52, -40); ctx.quadraticCurveTo(110, -10, 100, 40); ctx.quadraticCurveTo(0, 66, -100, 40); ctx.closePath();
  ctx.fillStyle = lg(0, -100, 0, 50, [o.c1 || C.orange, o.c2 || '#E0560A']); ctx.fill();
  ctx.strokeStyle = rgba(C.paleGold, 0.8); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40, -86); ctx.lineTo(30, 30); ctx.stroke();
  circle(0, -128, 42, o.skin || C.skin);
  ctx.beginPath(); ctx.moveTo(-38, -124); ctx.quadraticCurveTo(-34, -60, 0, -34); ctx.quadraticCurveTo(34, -60, 38, -124); ctx.quadraticCurveTo(0, -96, -38, -124); ctx.fillStyle = C.cream; ctx.fill();
  circle(0, -176, 20, C.cream); ell(0, -158, 36, 14, C.cream);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-15, -134, 7, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.beginPath(); ctx.arc(15, -134, 7, 0.1 * PI, 0.9 * PI); ctx.stroke();
  circle(0, -150, 4, C.red);
  circle(-70, 14, 16, o.skin || C.skin); circle(70, 14, 16, o.skin || C.skin);
  ctx.restore();
}

// ═════════════════════════ VISHNU ═════════════════════════
export function lotus(x, y, s, open = 1, c1 = C.pink, c2 = C.magenta) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const petal = (an, l, w) => { ctx.save(); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-w, -l * 0.4, -w * 0.6, -l * 0.85, 0, -l); ctx.bezierCurveTo(w * 0.6, -l * 0.85, w, -l * 0.4, 0, 0); ctx.fillStyle = lg(0, -l, 0, 0, [C.cream, c1, c2]); ctx.fill(); ctx.strokeStyle = rgba(c2, 0.6); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); };
  for (const i of [-3, 3, -2, 2]) petal(i * 0.42 * open, 96, 34);
  for (const i of [-1, 1, 0]) petal(i * 0.36 * open, 112, 36);
  ell(0, 4, 60, 12, rgba(C.leaf, 0.9));
  ctx.restore();
}
export function chakra(x, y, r, t) {
  glow(x, y, r * 2.4, C.gold, 0.6);
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * 3);
  ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.2; ctx.beginPath(); ctx.arc(0, 0, r * 0.85, 0, TAU); ctx.stroke();
  ctx.lineWidth = r * 0.09; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(i * PI / 4) * r * 0.85, Math.sin(i * PI / 4) * r * 0.85); ctx.stroke(); }
  for (let i = 0; i < 12; i++) { const an = i * TAU / 12; ctx.beginPath(); ctx.moveTo(Math.cos(an - 0.12) * r * 0.95, Math.sin(an - 0.12) * r * 0.95); ctx.lineTo(Math.cos(an + 0.05) * r * 1.25, Math.sin(an + 0.05) * r * 1.25); ctx.lineTo(Math.cos(an + 0.16) * r * 0.95, Math.sin(an + 0.16) * r * 0.95); ctx.fillStyle = C.paleGold; ctx.fill(); }
  circle(0, 0, r * 0.24, C.cream); ctx.restore();
}
export function conch(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, 0, 90, C.cream, 0.45);
  ctx.beginPath(); ctx.moveTo(0, -58); ctx.bezierCurveTo(44, -40, 46, 20, 6, 62); ctx.bezierCurveTo(-8, 40, -44, 24, -38, -14); ctx.bezierCurveTo(-34, -40, -18, -54, 0, -58); ctx.closePath();
  ctx.fillStyle = lg(-40, 0, 44, 0, [C.white, C.cream, '#F4C9D8']); ctx.fill();
  ctx.strokeStyle = rgba(C.magenta, 0.55); ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-30 + i * 6, -22 + i * 16); ctx.quadraticCurveTo(4, -34 + i * 18, 34 - i * 6, -16 + i * 20); ctx.stroke(); }
  circle(0, -60, 7, C.gold); circle(6, 62, 6, C.gold);
  ctx.restore();
}
/** Vishnu rising from the fish (Matsya form). origin = waist. head -300, crown top -480, hands reach ±230.
 *  o: t, a (alpha), tail (0..1 show fish lower body), arms (0..1 raise), halo */
export function vishnu(x, y, s, o = {}) {
  const t = o.t || 0, raise = o.arms ?? 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= o.a ?? 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // halo
  glow(0, -310, 300, C.gold, 0.55 * (o.halo ?? 1));
  ctx.strokeStyle = rgba(C.paleGold, 0.95); ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -318, 150, 0, TAU); ctx.stroke();
  for (let i = 0; i < 20; i++) { const an = i * TAU / 20 + t * 0.2; circle(Math.cos(an) * 172, -318 + Math.sin(an) * 172, 7, C.gold); }
  // fish lower body
  if ((o.tail ?? 1) > 0) {
    const cl = (u) => [Math.sin(u * 2.6 + Math.sin(t * 1.2) * 0.25) * 70 * u + u * u * 90, u * 470];   // centreline
    const wd = (u) => lerp(96, 20, Math.pow(u, 0.8));
    const L = [], R = [];
    for (let i = 0; i <= 24; i++) { const u = i / 24, [cx, cy] = cl(u), [nx, ny] = cl(u + 0.01), an = Math.atan2(ny - cy, nx - cx) + PI / 2, w = wd(u); L.push([cx - Math.cos(an) * w, cy - Math.sin(an) * w]); R.push([cx + Math.cos(an) * w, cy + Math.sin(an) * w]); }
    const [tx, ty] = cl(1), [px, py] = cl(0.97), ta = Math.atan2(ty - py, tx - px);
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta - PI / 2 + Math.sin(t * 2.4) * 0.2);
    ctx.beginPath(); ctx.moveTo(0, -24); ctx.bezierCurveTo(-40, 20, -140, 60, -170, 150); ctx.quadraticCurveTo(-50, 110, 0, 70); ctx.quadraticCurveTo(50, 110, 170, 150); ctx.bezierCurveTo(140, 60, 40, 20, 0, -24);
    ctx.fillStyle = lg(0, -20, 0, 150, [C.saffron, C.coral, C.magenta]); ctx.fill(); ctx.restore();
    const body = () => { ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]); L.forEach((p) => ctx.lineTo(p[0], p[1])); R.slice().reverse().forEach((p) => ctx.lineTo(p[0], p[1])); ctx.closePath(); };
    body(); ctx.fillStyle = lg(-100, 0, 160, 0, [C.saffron, C.gold, C.paleGold, C.gold]); ctx.fill();
    ctx.save(); body(); ctx.clip(); ctx.lineWidth = 4;
    for (let r = 0; r < 15; r++) for (let c = 0; c < 9; c++) { const cx = -120 + c * 40 + (r % 2) * 20, cy = 20 + r * 32; ctx.beginPath(); ctx.arc(cx, cy, 24, PI * 0.08, PI * 0.92); ctx.strokeStyle = rgba('#C2560A', 0.5); ctx.stroke(); }
    ctx.restore();
    // fins at the waist
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 90, 30); ctx.quadraticCurveTo(sd * 190, 20, sd * 210, 110); ctx.quadraticCurveTo(sd * 130, 100, sd * 84, 80); ctx.closePath(); ctx.fillStyle = lg(0, 20, 0, 110, [C.coral, C.magenta]); ctx.fill(); }
  }
  // back arms (upper pair)
  const skinG = lg(-90, 0, 90, 0, [C.vishnuDark, C.vishnu, '#6FA0FF']);
  const arm = (sx, sy, ex, ey, hx, hy) => { ctx.strokeStyle = C.vishnuDark; ctx.lineWidth = 44; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke(); ctx.strokeStyle = C.vishnu; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke(); circle(hx, hy, 24, '#6FA0FF');
    const mx = (sx + ex) / 2, my = (sy + ey) / 2; circle(mx, my, 24, C.gold); circle(mx, my, 12, C.red); const wx = lerp(ex, hx, 0.8), wy = lerp(ey, hy, 0.8); circle(wx, wy, 21, C.gold); };
  const uy = lerp(-120, -330, raise), ux = lerp(150, 220, raise);
  arm(-88, -196, -190, lerp(-150, -210, raise), -ux, uy); arm(88, -196, 190, lerp(-150, -210, raise), ux, uy);
  conch(-ux, uy - 62, 0.95); chakra(ux, uy - 70, 50, t);
  // torso
  ctx.beginPath(); ctx.moveTo(-96, -200); ctx.quadraticCurveTo(-100, -226, -64, -228); ctx.lineTo(64, -228); ctx.quadraticCurveTo(100, -226, 96, -200); ctx.lineTo(76, 16); ctx.lineTo(-76, 16); ctx.closePath(); ctx.fillStyle = skinG; ctx.fill();
  // garland
  ctx.strokeStyle = C.leaf; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-56, -224); ctx.quadraticCurveTo(0, 40, 56, -224); ctx.stroke();
  for (let i = 0; i <= 12; i++) { const u = i / 12, gx = (1 - u) * (1 - u) * -56 + 2 * (1 - u) * u * 0 + u * u * 56, gy = (1 - u) * (1 - u) * -224 + 2 * (1 - u) * u * 40 + u * u * -224; circle(gx, gy, 10, i % 2 ? C.pink : C.cream); }
  ctx.strokeStyle = C.gold; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(0, -226, 50, 0.12 * PI, 0.88 * PI); ctx.stroke(); circle(0, -176, 12, C.red);
  // waist: pitambara sash + belt
  rr(-84, -8, 168, 44, 16); ctx.fillStyle = lg(0, -8, 0, 36, [C.paleGold, C.gold, C.saffron]); ctx.fill(); circle(0, 14, 13, C.red); circle(-44, 14, 7, C.cyan); circle(44, 14, 7, C.cyan);
  // front arms (lower pair): blessing hand + lotus
  arm(-88, -190, -150, -90, -150 - raise * 20, -30); arm(88, -190, 150, -90, 150 + raise * 14, -60);
  lotus(-150 - raise * 20, -44, 0.6, 1);
  ctx.save(); ctx.translate(150 + raise * 14, -72); rr(-22, -34, 44, 52, 14); ctx.fillStyle = '#8FB8FF'; ctx.fill(); circle(0, -6, 9, C.red); ctx.restore();
  // neck + head
  rr(-24, -262, 48, 44, 10); ctx.fillStyle = C.vishnuDark; ctx.fill();
  circle(0, -306, 66, lg(-66, 0, 66, 0, [C.vishnu, '#6FA0FF']));
  ctx.beginPath(); ctx.arc(0, -312, 68, PI * 1.0, PI * 2.0); ctx.quadraticCurveTo(0, -350, -68, -312); ctx.fillStyle = C.hair; ctx.fill();
  // crown (kirita)
  ctx.beginPath(); ctx.moveTo(-70, -346); ctx.lineTo(-60, -400); ctx.quadraticCurveTo(-44, -470, 0, -500); ctx.quadraticCurveTo(44, -470, 60, -400); ctx.lineTo(70, -346); ctx.closePath(); ctx.fillStyle = lg(0, -500, 0, -346, [C.cream, C.gold, C.saffron]); ctx.fill();
  rr(-74, -362, 148, 24, 10); ctx.fillStyle = C.paleGold; ctx.fill(); rr(-58, -410, 116, 14, 7); ctx.fillStyle = C.paleGold; ctx.fill();
  circle(0, -386, 13, C.red); circle(-40, -386, 7, C.cyan); circle(40, -386, 7, C.cyan); circle(0, -440, 10, C.cyan); circle(0, -504, 12, C.cream);
  // peacock feather
  ctx.save(); ctx.translate(34, -470); ctx.rotate(0.5); ell(0, -36, 20, 40, C.emerald); ell(0, -30, 11, 20, C.ocean); circle(0, -26, 6, C.gold); ctx.restore();
  // earrings, face
  circle(-70, -296, 11, C.gold); circle(70, -296, 11, C.gold);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(-25, -310, 13, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.beginPath(); ctx.arc(25, -310, 13, 0.1 * PI, 0.9 * PI); ctx.stroke();
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40, -328); ctx.quadraticCurveTo(-25, -338, -10, -330); ctx.moveTo(10, -330); ctx.quadraticCurveTo(25, -338, 40, -328); ctx.stroke();
  ctx.strokeStyle = '#7A1F3D'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -284, 16, 0.18 * PI, 0.82 * PI); ctx.stroke();
  ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-9, -352); ctx.quadraticCurveTo(-9, -330, 0, -326); ctx.quadraticCurveTo(9, -330, 9, -352); ctx.stroke(); ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(0, -350); ctx.lineTo(0, -334); ctx.stroke();
  ctx.restore();
}

// ═════════════════════════ PROPS ═════════════════════════
export function pot(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.glow) glow(0, -70, 190, C.gold, o.glow);
  ell(0, 78, 60, 12, rgba(C.ink, 0.25));
  ctx.beginPath(); ctx.moveTo(-46, -62); ctx.bezierCurveTo(-130, -40, -120, 80, 0, 80); ctx.bezierCurveTo(120, 80, 130, -40, 46, -62); ctx.closePath();
  ctx.fillStyle = lg(-110, 0, 110, 0, ['#B5520A', C.saffron, C.paleGold, C.gold, '#B5520A']); ctx.fill();
  ctx.strokeStyle = rgba('#8A3A05', 0.7); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-100, -4); ctx.quadraticCurveTo(0, 22, 100, -4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-104, 20); ctx.quadraticCurveTo(0, 48, 104, 20); ctx.stroke();
  for (let i = -3; i <= 3; i++) circle(i * 27, 18 - Math.abs(i) * 2.4, 6, C.red);
  rr(-52, -84, 104, 30, 10); ctx.fillStyle = lg(-52, 0, 52, 0, ['#B5520A', C.gold, C.paleGold, '#B5520A']); ctx.fill();
  ell(0, -84, 60, 16, C.gold); ell(0, -84, 48, 11, lg(0, -95, 0, -73, [C.cyan, C.ocean]));
  ctx.restore();
}
/** stack of glowing palm-leaf manuscripts: the Vedas */
export function vedas(x, y, s, t, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  glow(0, 0, 230, C.gold, 0.75 * a); rays(0, 0, 300, t, C.paleGold, 0.3 * a, 10);
  for (let i = 0; i < 4; i++) {
    ctx.save(); ctx.translate(0, 42 - i * 28 + Math.sin(t * 2 + i) * 3); ctx.rotate((i - 1.5) * 0.06);
    rr(-98, -15, 196, 30, 7); ctx.fillStyle = lg(0, -15, 0, 15, [C.cream, '#F2D48A']); ctx.fill(); ctx.strokeStyle = C.saffron; ctx.lineWidth = 4; ctx.stroke();
    ctx.strokeStyle = rgba('#8A3A05', 0.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-80, -4); ctx.lineTo(-22, -4); ctx.moveTo(22, -4); ctx.lineTo(80, -4); ctx.moveTo(-80, 5); ctx.lineTo(-22, 5); ctx.moveTo(22, 5); ctx.lineTo(80, 5); ctx.stroke();
    circle(0, 0, 6, C.red); ctx.restore();
  }
  ctx.restore();
}
/** the shining boat with the seven sages and the king. origin = waterline centre */
export function boat(x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  glow(0, -70, 520, C.gold, o.glow ?? 0.4);
  // passengers
  for (let i = 0; i < 7; i++) sage(-215 + i * 60, -66 + Math.sin(i * 1.7) * 6, 0.42, { halo: 0, c1: i % 2 ? C.orange : C.saffron });
  ctx.save(); ctx.translate(232, -52); ctx.scale(0.36, 0.36); king(0, 0, { kneel: true, hands: o.kingHands || [[-20, -150], [20, -150]], eyes: 'closed' }); ctx.restore();
  // hull
  ctx.beginPath(); ctx.moveTo(-330, -70); ctx.quadraticCurveTo(-300, 70, -120, 84); ctx.lineTo(160, 84); ctx.quadraticCurveTo(320, 70, 370, -70); ctx.quadraticCurveTo(0, -18, -330, -70); ctx.closePath();
  ctx.fillStyle = lg(0, -70, 0, 84, [C.pink, C.magenta, C.purple]); ctx.fill();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-330, -70); ctx.quadraticCurveTo(0, -18, 370, -70); ctx.stroke();
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-290, 6); ctx.quadraticCurveTo(0, 50, 325, 6); ctx.stroke();
  for (let i = -5; i <= 5; i++) circle(i * 52, 8 - Math.abs(i) * Math.abs(i) * 1.1, 9, i % 2 ? C.cyan : C.paleGold);
  // prow + stern curls
  ctx.strokeStyle = lg(0, -210, 0, -60, [C.cream, C.gold]); ctx.lineWidth = 20;
  ctx.beginPath(); ctx.moveTo(366, -66); ctx.bezierCurveTo(420, -120, 430, -200, 380, -214); ctx.bezierCurveTo(346, -220, 340, -180, 368, -176); ctx.stroke();
  ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(-326, -66); ctx.bezierCurveTo(-370, -110, -372, -170, -336, -178); ctx.stroke();
  circle(368, -180, 9, C.red);
  // mast + pennant
  ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-10, -70); ctx.lineTo(-10, -330); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-10, -330); ctx.quadraticCurveTo(50 + Math.sin(t * 5) * 14, -320, 110, -300 + Math.sin(t * 5 + 1) * 10); ctx.quadraticCurveTo(50, -280 + Math.sin(t * 5) * 8, -10, -276); ctx.closePath(); ctx.fillStyle = C.saffron; ctx.fill();
  circle(-10, -336, 13, C.cream);
  ctx.restore();
}
/** Vasuki as a living rope from A to B (head at B). */
export function serpent(A, B, t, o = {}) {
  const sag = o.sag ?? 80, wig = o.wig ?? 14, w = o.w || 34, n = 50, pts = [];
  for (let i = 0; i <= n * (o.draw ?? 1); i++) { const u = i / n, x = lerp(A[0], B[0], u), y = lerp(A[1], B[1], u) + Math.sin(u * PI) * sag, an = Math.atan2(B[1] - A[1], B[0] - A[0]) + PI / 2, wv = Math.sin(u * 16 - t * 5) * wig * Math.sin(u * PI);
    pts.push([x + Math.cos(an) * wv, y + Math.sin(an) * wv]); }
  if (pts.length < 2) return;
  line(pts, '#064D3A', w); line(pts, lg(A[0], A[1], B[0], B[1], [C.emerald, C.leaf, C.emerald]), w * 0.72); line(pts, rgba(C.paleGold, 0.85), w * 0.2, [w * 0.3, w * 0.7]);
  if (o.head !== false) {
    const p = pts[pts.length - 1], q = pts[pts.length - 3] || pts[0], an = Math.atan2(p[1] - q[1], p[0] - q[0]);
    ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(an); ctx.scale(w / 34, w / 34);
    ell(8, 0, 50, 40, '#064D3A'); ell(10, 0, 42, 33, C.emerald); ell(30, 0, 26, 20, C.leaf);
    circle(34, -11, 6, C.gold); circle(34, 11, 6, C.gold); circle(35, -11, 2.6, C.ink); circle(35, 11, 2.6, C.ink);
    ctx.strokeStyle = C.red; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(54, 0); ctx.lineTo(72, 0); ctx.lineTo(82, -7); ctx.moveTo(72, 0); ctx.lineTo(82, 7); ctx.stroke();
    circle(4, 0, 9, C.paleGold);
    ctx.restore();
  }
}
/** Hayagriva, the horse-headed demon. origin = chest. o: t, a, hold (draw Vedas in claws), rot */
export function demon(x, y, s, o = {}) {
  const t = o.t || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); ctx.globalAlpha *= o.a ?? 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  glow(0, -60, 520, C.red, 0.28);
  // mane flames
  for (let i = 0; i < 11; i++) { const u = i / 10, mx = lerp(-150, 150, u), my = -330 + Math.abs(u - 0.5) * 300, l = 120 + Math.sin(t * 7 + i * 1.9) * 34;
    ctx.beginPath(); ctx.moveTo(mx - 44, my + 60); ctx.quadraticCurveTo(mx - 10 + Math.sin(t * 5 + i) * 18, my - l * 0.5, mx + (u - 0.5) * 80, my - l); ctx.quadraticCurveTo(mx + 30, my - l * 0.3, mx + 44, my + 60); ctx.closePath();
    ctx.fillStyle = lg(0, my - l, 0, my + 60, [C.orange, C.red, C.magenta]); ctx.fill(); }
  // body
  ctx.beginPath(); ctx.moveTo(-250, 330); ctx.bezierCurveTo(-330, 60, -250, -90, -110, -110); ctx.lineTo(110, -110); ctx.bezierCurveTo(250, -90, 330, 60, 250, 330); ctx.closePath();
  ctx.fillStyle = lg(0, -110, 0, 330, ['#4A1070', '#2A0845', '#0D0220']); ctx.fill();
  // arms + claws
  for (const sd of [-1, 1]) {
    const hx = o.hold ? sd * 96 : sd * (250 + Math.sin(t * 2 + sd) * 16), hy = o.hold ? 90 : lerp(40, -120, o.raise ?? 0.6);
    ctx.strokeStyle = '#3A0C5E'; ctx.lineWidth = 78; ctx.beginPath(); ctx.moveTo(sd * 200, -40); ctx.quadraticCurveTo(sd * 300, 120, hx, hy); ctx.stroke();
    for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(hx + k * 20 - 9, hy - 6); ctx.lineTo(hx + k * 24 - sd * 10, hy - 62); ctx.lineTo(hx + k * 20 + 9, hy - 6); ctx.closePath(); ctx.fillStyle = C.cream; ctx.fill(); }
  }
  // horse head: long muzzle
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 70, -330); ctx.lineTo(sd * 128, -450); ctx.lineTo(sd * 132, -300); ctx.closePath(); ctx.fillStyle = '#3A0C5E'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(sd * 96, -340); ctx.quadraticCurveTo(sd * 240, -400, sd * 210, -520); ctx.quadraticCurveTo(sd * 180, -420, sd * 120, -370); ctx.closePath(); ctx.fillStyle = lg(0, -520, 0, -340, [C.cream, '#8A6AA8']); ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(-130, -310); ctx.bezierCurveTo(-140, -400, 140, -400, 130, -310); ctx.bezierCurveTo(124, -180, 96, -80, 84, 0); ctx.bezierCurveTo(70, 50, -70, 50, -84, 0); ctx.bezierCurveTo(-96, -80, -124, -180, -130, -310); ctx.closePath();
  ctx.fillStyle = lg(-130, 0, 130, 0, ['#2A0845', '#5A1A8A', '#2A0845']); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-26, -350); ctx.quadraticCurveTo(0, -200, -20, -60); ctx.lineTo(20, -60); ctx.quadraticCurveTo(0, -200, 26, -350); ctx.closePath(); ctx.fillStyle = rgba('#B080E0', 0.35); ctx.fill();
  // eyes
  for (const sd of [-1, 1]) { glow(sd * 72, -256, 80, C.red, 0.95); ctx.beginPath(); ctx.moveTo(sd * 34, -244); ctx.quadraticCurveTo(sd * 76, -300, sd * 112, -278); ctx.quadraticCurveTo(sd * 84, -232, sd * 34, -244); ctx.fillStyle = '#FFE08A'; ctx.fill(); ell(sd * 74, -258, 7, 15, C.red); }
  // nostrils + fangs
  for (const sd of [-1, 1]) { glow(sd * 38, -18, 34, C.orange, 0.8); ell(sd * 38, -18, 15, 10, '#120018'); }
  ctx.beginPath(); ctx.moveTo(-60, 20); ctx.quadraticCurveTo(0, 46, 60, 20); ctx.strokeStyle = '#120018'; ctx.lineWidth = 8; ctx.stroke();
  for (const k of [-44, -16, 16, 44]) { ctx.beginPath(); ctx.moveTo(k - 10, 26); ctx.lineTo(k, 62); ctx.lineTo(k + 10, 26); ctx.closePath(); ctx.fillStyle = C.cream; ctx.fill(); }
  if (o.hold) vedas(0, 150, 0.9, t, o.hold);
  ctx.restore();
}

// ═════════════════════════ LIFE ═════════════════════════
export function elephant(x, y, s, t, col = '#3A1466') {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 6) * 4); ctx.scale(s, s); ctx.lineCap = 'round';
  const sw = Math.sin(t * 6) * 14;
  ctx.strokeStyle = col; ctx.lineWidth = 44; for (const [lx, k] of [[-80, 1], [-30, -1], [50, 1], [95, -1]]) { ctx.beginPath(); ctx.moveTo(lx, 40); ctx.lineTo(lx + sw * k, 150); ctx.stroke(); }
  ell(0, 0, 150, 100, col); circle(150, -40, 78, col);
  ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(206, -20); ctx.bezierCurveTo(250, 30, 220, 110, 250 + Math.sin(t * 3) * 14, 130); ctx.stroke();
  ell(118, -34, 46, 66, mix(col, '#FFFFFF', 0.14), 0.2);
  ctx.strokeStyle = C.cream; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(190, 10); ctx.quadraticCurveTo(220, 30, 240, 10); ctx.stroke();
  circle(176, -56, 7, C.paleGold);
  ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-146, -20); ctx.quadraticCurveTo(-180, 20, -168, 60); ctx.stroke();
  rr(-70, -100, 120, 60, 14); ctx.fillStyle = C.magenta; ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.stroke();
  ctx.restore();
}
export function deer(x, y, s, t, col = '#5A1A7A') {
  ctx.save(); ctx.translate(x, y + Math.abs(Math.sin(t * 7)) * -8); ctx.scale(s, s); ctx.lineCap = 'round';
  const sw = Math.sin(t * 7) * 18;
  ctx.strokeStyle = col; ctx.lineWidth = 13; for (const [lx, k] of [[-60, 1], [-40, -1], [44, 1], [62, -1]]) { ctx.beginPath(); ctx.moveTo(lx, 20); ctx.lineTo(lx + sw * k * 0.5, 80); ctx.lineTo(lx + sw * k, 140); ctx.stroke(); }
  ell(0, 0, 92, 46, col);
  ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(70, -10); ctx.lineTo(104, -90); ctx.stroke();
  ell(122, -104, 40, 24, col, 0.25); ell(92, -132, 10, 24, col, -0.4);
  ctx.strokeStyle = C.paleGold; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(104, -124); ctx.quadraticCurveTo(96, -180, 122, -210); ctx.moveTo(104, -166); ctx.lineTo(80, -196); ctx.moveTo(112, -190); ctx.lineTo(140, -196); ctx.stroke();
  circle(132, -110, 5, C.paleGold); ell(-90, -14, 14, 8, C.cream, -0.5);
  for (let i = 0; i < 5; i++) circle(-50 + i * 24, -18 + (i % 2) * 14, 5, rgba(C.cream, 0.8));
  ctx.restore();
}
export function bird(x, y, s, t, col = C.ink) {
  const f = Math.sin(t * 9) * 0.6;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-50, -20 * f - 6); ctx.quadraticCurveTo(-24, -30 - 20 * f, 0, 0); ctx.quadraticCurveTo(24, -30 - 20 * f, 50, -20 * f - 6); ctx.stroke(); ctx.restore();
}
/** sprout → sapling → flower. g 0..1 */
export function sprout(x, y, s, g, flower = C.pink) {
  if (g <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  const h = 150 * eo(clamp(g * 1.4));
  ctx.strokeStyle = C.forest; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(14, -h * 0.5, 0, -h); ctx.stroke();
  const lf = eo(seg(g, 0.25, 0.8));
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(4, -h * 0.5); ctx.rotate(sd * 0.9); ctx.scale(lf, lf); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-26, -24, -22, -70, 0, -86); ctx.bezierCurveTo(22, -70, 26, -24, 0, 0); ctx.fillStyle = lg(0, -86, 0, 0, [C.leaf, C.emerald]); ctx.fill(); ctx.restore(); }
  const fl = eo(seg(g, 0.6, 1));
  if (fl > 0) { ctx.save(); ctx.translate(0, -h); ctx.scale(fl, fl); for (let i = 0; i < 6; i++) { ctx.save(); ctx.rotate(i * PI / 3); ell(0, -26, 16, 26, flower); ctx.restore(); } circle(0, 0, 14, C.gold); ctx.restore(); }
  ctx.restore();
}
export function tree(x, y, s, col = '#2A0E66', leaf = '#3A1680') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.lineWidth = 34;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-20, -160, 10, -300); ctx.stroke();
  for (const [cx, cy, r] of [[0, -360, 130], [-110, -300, 95], [110, -310, 100], [-40, -450, 90], [70, -440, 85]]) circle(cx, cy, r, leaf);
  ctx.restore();
}
export function palace(x, y, s, col = '#2A0E66', lit = C.gold) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
  ctx.fillRect(-260, -200, 520, 200); ctx.fillRect(-340, -130, 80, 130); ctx.fillRect(260, -130, 80, 130);
  const dome = (dx, dy, r) => { ctx.beginPath(); ctx.moveTo(dx - r, dy); ctx.bezierCurveTo(dx - r * 1.25, dy - r * 0.9, dx - r * 0.3, dy - r * 1.3, dx, dy - r * 1.9); ctx.bezierCurveTo(dx + r * 0.3, dy - r * 1.3, dx + r * 1.25, dy - r * 0.9, dx + r, dy); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); circle(dx, dy - r * 1.95, r * 0.09, lit); };
  dome(0, -200, 110); dome(-190, -200, 60); dome(190, -200, 60); dome(-300, -130, 42); dome(300, -130, 42);
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 96 - 24, -40); ctx.lineTo(i * 96 - 24, -110); ctx.arc(i * 96, -110, 24, PI, 0); ctx.lineTo(i * 96 + 24, -40); ctx.closePath(); ctx.fillStyle = rgba(lit, 0.9); ctx.fill(); }
  ctx.restore();
}
/** cupped hands holding water (seen from the front, slightly above). origin = water centre */
export function hands(x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // forearms + bangles
  for (const sd of [-1, 1]) {
    ctx.beginPath(); ctx.moveTo(sd * 150, 150); ctx.lineTo(sd * 420, 620); ctx.lineTo(sd * 620, 520); ctx.lineTo(sd * 300, 60); ctx.closePath(); ctx.fillStyle = lg(sd * 150, 0, sd * 500, 0, [C.skin, C.skinShade]); ctx.fill();
    ctx.strokeStyle = lg(0, 200, 0, 330, [C.paleGold, C.gold, C.saffron]); ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(sd * 250, 300); ctx.lineTo(sd * 420, 200); ctx.stroke();
    for (let i = 0; i < 4; i++) circle(sd * lerp(270, 400, i / 3), lerp(288, 212, i / 3), 9, i % 2 ? C.red : C.cyan);
  }
  // back rim (far fingers)
  ctx.beginPath(); ctx.moveTo(-300, -30); ctx.bezierCurveTo(-280, -130, 280, -130, 300, -30); ctx.lineTo(260, 20); ctx.lineTo(-260, 20); ctx.closePath(); ctx.fillStyle = C.skinShade; ctx.fill();
  for (let i = -3; i <= 3; i++) { if (!i) continue; const fx = i * 62 - Math.sign(i) * 20; ctx.beginPath(); ctx.ellipse(fx, -96 + Math.abs(i) * 9, 34, 46, 0, 0, TAU); ctx.fillStyle = lg(0, -140, 0, -40, [C.skinLight, C.skin]); ctx.fill(); }
  // water
  ctx.beginPath(); ctx.ellipse(0, -10, 262, 84, 0, 0, TAU); ctx.fillStyle = lg(0, -94, 0, 74, [C.cyan, '#2A9FE8', C.ocean]); ctx.fill();
  if (o.water) { ctx.save(); ctx.beginPath(); ctx.ellipse(0, -10, 262, 84, 0, 0, TAU); ctx.clip(); o.water(); ctx.restore(); }
  ripples(-90, -30, t, 2, 110, C.white, 0.5); ripples(110, 6, t + 0.6, 2, 90, C.white, 0.4);
  // front bowl of the palms
  ctx.beginPath(); ctx.moveTo(-312, -34); ctx.bezierCurveTo(-330, 150, -150, 250, 0, 250); ctx.bezierCurveTo(150, 250, 330, 150, 312, -34);
  ctx.bezierCurveTo(250, 60, 120, 76, 0, 76); ctx.bezierCurveTo(-120, 76, -250, 60, -312, -34); ctx.closePath();
  ctx.fillStyle = lg(0, -30, 0, 250, [C.skinLight, C.skin, C.skinShade]); ctx.fill();
  ctx.strokeStyle = rgba(C.skinShade, 0.9); ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(0, 78); ctx.lineTo(0, 248); ctx.stroke();
  for (const sd of [-1, 1]) for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(sd * i * 70, 76 - i * 6); ctx.quadraticCurveTo(sd * (i * 70 + 30), 150, sd * (i * 62 + 10), 216 - i * 16); ctx.stroke(); }
  // thumbs
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 300, -40, 40, 70, sd * -0.5, 0, TAU); ctx.fillStyle = lg(0, -110, 0, 30, [C.skinLight, C.skin]); ctx.fill(); }
  ctx.restore();
}
/** a soft shower of drifting petals / light motes */
export function motes(t, n = 40, col = C.paleGold, a = 0.8, seed = 0, up = true) {
  for (let i = 0; i < n; i++) {
    const sp = 40 + rnd(i + seed) * 90, yy = (rnd(i * 3 + seed) * (H + 200) + t * sp) % (H + 200), y = up ? H + 100 - yy : yy - 100, x = rnd(i * 7 + seed) * W + Math.sin(t * 0.9 + i) * 40;
    ctx.globalAlpha = a * (0.4 + 0.6 * Math.sin(t * 2 + i) ** 2); circle(x, y, 3 + rnd(i * 5) * 6, col); ctx.globalAlpha = 1;
  }
}
export function petals(t, n = 26, seed = 0, a = 1) {
  for (let i = 0; i < n; i++) {
    const sp = 120 + rnd(i + seed) * 140, y = ((rnd(i * 3 + seed) * (H + 300) + t * sp) % (H + 300)) - 150, x = rnd(i * 7 + seed) * (W + 200) - 100 + Math.sin(t * 1.3 + i) * 60;
    ctx.save(); ctx.translate(x, y); ctx.rotate(t * (1 + rnd(i)) + i); ctx.globalAlpha *= a; ell(0, 0, 20, 10, i % 3 ? C.pink : C.cream); ctx.restore();
  }
}
/** soft dark vignette to seat captions and focus the eye */
export function vignette(a = 0.5, col = '#05021A') {
  ctx.fillStyle = rg(540, 900, 520, 1350, [rgba(col, 0), rgba(col, a)]); ctx.fillRect(-400, -400, W + 800, H + 800);
}
