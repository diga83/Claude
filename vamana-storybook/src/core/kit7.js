// Luminous Myth, Narasimha cast: the man-lion, little Prahlada, the pillar, the five conditions of the boon.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, seg, eo, rr, circle, ell, line, lg, rg, glow, rgba, mix } from './lib.js';
import { sparkle, chakra, conch } from './kit.js';
import { hero } from './kit2.js';

const PI = Math.PI;
const G = ['#D9801A', '#FFB83D', '#FFE9A8'];
export const NARA = { skin: G, dhoti: ['#FF8A5A', '#E0301A', '#8A0F1A'], sash: ['#FFF1A8', '#F2B01F'], crown: 'jata' };
export const HIRA = { skin: ['#7A1030', '#C0304A', '#F0707A'], dhoti: ['#FFD86B', '#D9901A', '#7A3A0A'], sash: ['#3A1680', '#150A4A'], crown: 'king' };

/** Narasimha: a golden hero's body under a lion's head and blazing mane. o as hero; + fury (0..1), four (upper arms with chakra + conch), claws */
export function narasimha(x, y, o = {}) {
  const s = o.s || 1, f = o.face || 1, t = o.t || 0, fury = o.fury ?? 1, hands = o.hands || [[-190, -230], [190, -230]];
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.rotate(o.lean || 0); ctx.lineCap = 'round';
  glow(0, -260, 420, fury > 0.5 ? '#FF6A1F' : '#FFC83D', 0.55);
  if (o.four) { for (const sd of [-1, 1]) { ctx.strokeStyle = G[0]; ctx.lineWidth = 38; ctx.beginPath(); ctx.moveTo(sd * 84, -196); ctx.lineTo(sd * 220, -250); ctx.lineTo(sd * 250, -400); ctx.stroke(); ctx.strokeStyle = G[1]; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(sd * 84, -196); ctx.lineTo(sd * 220, -250); ctx.lineTo(sd * 250, -400); ctx.stroke(); circle(sd * 250, -400, 22, G[2]); circle(sd * 220, -250, 22, C.gold); }
    conch(-250, -456, 0.85); chakra(250, -462, 46, t); }
  ctx.restore();
  hero(x, y, { look: NARA, ...o, hands, eyes: 'closed' });
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.rotate(o.lean || 0); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // mane
  for (let ring = 0; ring < 2; ring++) for (let i = 0; i < 18; i++) { const a = i * TAU / 18 + ring * 0.17 + Math.sin(t * 3 + i) * 0.03 * (1 + fury), r0 = 60, r1 = (ring ? 128 : 162) + Math.sin(t * 7 + i * 1.7) * 10 * fury + fury * 14;
    ctx.beginPath(); ctx.moveTo(Math.cos(a - 0.2) * r0, -284 + Math.sin(a - 0.2) * r0); ctx.quadraticCurveTo(Math.cos(a - 0.06) * r1 * 0.8, -284 + Math.sin(a - 0.06) * r1 * 0.8, Math.cos(a + 0.05) * r1, -284 + Math.sin(a + 0.05) * r1); ctx.quadraticCurveTo(Math.cos(a + 0.16) * r1 * 0.7, -284 + Math.sin(a + 0.16) * r1 * 0.7, Math.cos(a + 0.2) * r0, -284 + Math.sin(a + 0.2) * r0); ctx.closePath();
    ctx.fillStyle = ring ? lg(0, -420, 0, -150, [C.cream, C.gold, C.saffron]) : lg(0, -450, 0, -120, [mix('#FFC83D', '#FF2E4D', fury), C.saffron, '#B5420A']); ctx.fill(); }
  // face
  circle(-52, -340, 20, G[1]); circle(52, -340, 20, G[1]); circle(-52, -340, 10, '#FFB0A0'); circle(52, -340, 10, '#FFB0A0');
  circle(0, -284, 68, lg(-68, 0, 68, 0, [G[1], G[2]]));
  ell(0, -258, 40, 30, '#FFF1D0');
  ctx.beginPath(); ctx.moveTo(-15, -280); ctx.lineTo(15, -280); ctx.lineTo(0, -262); ctx.closePath(); ctx.fillStyle = '#7A2A1A'; ctx.fill();
  if (fury > 0.5) { ctx.beginPath(); ctx.moveTo(-30, -252); ctx.quadraticCurveTo(0, -262, 30, -252); ctx.quadraticCurveTo(22, -214, 0, -212); ctx.quadraticCurveTo(-22, -214, -30, -252); ctx.fillStyle = '#8A0A2A'; ctx.fill();
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 24, -254); ctx.lineTo(sd * 18, -228); ctx.lineTo(sd * 10, -254); ctx.closePath(); ctx.fillStyle = C.white; ctx.fill(); }
    for (const sd of [-1, 1]) { glow(sd * 26, -302, 40, '#FFE36B', 1); ctx.beginPath(); ctx.moveTo(sd * 8, -298); ctx.quadraticCurveTo(sd * 28, -322, sd * 48, -310); ctx.quadraticCurveTo(sd * 30, -290, sd * 8, -298); ctx.fillStyle = '#FFF6DC'; ctx.fill(); circle(sd * 28, -305, 6, C.red); ctx.strokeStyle = '#5A1A0A'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(sd * 4, -314); ctx.lineTo(sd * 52, -332); ctx.stroke(); } }
  else { ctx.strokeStyle = '#7A2A1A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -262); ctx.lineTo(0, -250); ctx.moveTo(-22, -246); ctx.quadraticCurveTo(-10, -236, 0, -250); ctx.quadraticCurveTo(10, -236, 22, -246); ctx.stroke();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 6; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 27, -302, 12, 0.1 * PI, 0.9 * PI); ctx.stroke(); } }
  for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) line([[sd * 34, -258 + i * 10], [sd * 76, -264 + i * 18]], rgba('#7A2A1A', 0.6), 3);
  ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-8, -340); ctx.quadraticCurveTo(-8, -322, 0, -318); ctx.quadraticCurveTo(8, -322, 8, -340); ctx.stroke(); circle(0, -330, 4, C.red);
  // crown
  ctx.beginPath(); ctx.moveTo(-50, -346); ctx.quadraticCurveTo(-40, -420, 0, -446); ctx.quadraticCurveTo(40, -420, 50, -346); ctx.closePath(); ctx.fillStyle = lg(0, -446, 0, -346, [C.cream, C.gold, C.saffron]); ctx.fill();
  rr(-54, -358, 108, 18, 8); ctx.fillStyle = C.paleGold; ctx.fill(); circle(0, -388, 11, C.red); circle(0, -450, 9, C.cyan);
  // claws
  if (o.claws !== false) for (const h of hands) for (let k = -1; k <= 1; k++) { const a = Math.atan2(h[1] + 196, h[0] - Math.sign(h[0] || 1) * 84) + k * 0.4; ctx.beginPath(); ctx.moveTo(h[0] + Math.cos(a - 0.5) * 16, h[1] + Math.sin(a - 0.5) * 16); ctx.lineTo(h[0] + Math.cos(a) * 46, h[1] + Math.sin(a) * 46); ctx.lineTo(h[0] + Math.cos(a + 0.5) * 16, h[1] + Math.sin(a + 0.5) * 16); ctx.closePath(); ctx.fillStyle = C.white; ctx.fill(); }
  ctx.restore();
}
/** Prahlada: a small prince. origin = feet centre; ≈ 430 tall at s 1. o: t, face, walk, eyes, pray, glow, arms ('up') */
export function prahlada(x, y, o = {}) {
  const s = o.s || 1, t = o.t || 0, wk = o.walk ? Math.sin(t * 9) * 16 : 0, SK = ['#C98A5E', '#E6B088', '#F8D2A8'];
  ctx.save(); ctx.translate(x, y + (o.walk ? Math.abs(Math.sin(t * 9)) * -8 * s : 0)); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (o.glow) { glow(0, -220, 380, C.gold, o.glow * 0.7); glow(0, -220, 210, C.cream, o.glow * 0.5); }
  for (const sd of [-1, 1]) { ctx.strokeStyle = SK[1]; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(sd * 26, -70); ctx.lineTo(sd * 26 + sd * wk, -12); ctx.stroke(); ell(sd * 30 + sd * wk + 6, -6, 34, 14, SK[0]); }
  ctx.beginPath(); ctx.moveTo(-62, -150); ctx.lineTo(-72, -48); ctx.quadraticCurveTo(0, -30, 72, -48); ctx.lineTo(62, -150); ctx.closePath(); ctx.fillStyle = lg(0, -150, 0, -40, ['#C8A8FF', '#7B3FE4', '#3A1680']); ctx.fill();
  ctx.strokeStyle = rgba(C.gold, 0.95); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-70, -56); ctx.quadraticCurveTo(0, -38, 70, -56); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-58, -238); ctx.quadraticCurveTo(-62, -252, -40, -254); ctx.lineTo(40, -254); ctx.quadraticCurveTo(62, -252, 58, -238); ctx.lineTo(56, -140); ctx.lineTo(-56, -140); ctx.closePath(); ctx.fillStyle = lg(-58, 0, 58, 0, SK); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-56, -250); ctx.lineTo(-30, -254); ctx.lineTo(56, -150); ctx.lineTo(30, -142); ctx.closePath(); ctx.fillStyle = lg(0, -254, 0, -142, ['#FFE36B', '#F2A01F']); ctx.fill();
  rr(-60, -156, 120, 22, 9); ctx.fillStyle = lg(0, -156, 0, -134, [C.paleGold, C.gold]); ctx.fill(); circle(0, -145, 8, C.red);
  ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -252, 30, 0.15 * PI, 0.85 * PI); ctx.stroke();
  const arm = (sx, hx, hy) => { ctx.strokeStyle = SK[0]; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(sx, -238); ctx.lineTo(hx, hy); ctx.stroke(); ctx.strokeStyle = SK[1]; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(sx, -238); ctx.lineTo(hx, hy); ctx.stroke(); circle(hx, hy, 17, SK[2]); };
  if (o.arms === 'up') { arm(-54, -110, -320); arm(54, 110, -320); }
  else if (o.pray !== false) { arm(-54, -14, -190); arm(54, 14, -190); ell(0, -204, 16, 32, SK[2]); }
  else { arm(-54, -86, -150); arm(54, 86, -150); }
  rr(-16, -276, 32, 30, 8); ctx.fillStyle = SK[0]; ctx.fill();
  circle(0, -338, 84, lg(-84, 0, 84, 0, [SK[1], SK[2]]));
  circle(-84, -330, 16, SK[1]); circle(84, -330, 16, SK[1]); circle(-84, -316, 8, C.gold); circle(84, -316, 8, C.gold);
  ctx.beginPath(); ctx.arc(0, -350, 84, PI * 1.04, PI * 1.96); ctx.quadraticCurveTo(40, -384, 0, -400); ctx.quadraticCurveTo(-40, -384, -84, -362); ctx.fillStyle = C.hair; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-50, -404); ctx.quadraticCurveTo(-36, -470, 0, -486); ctx.quadraticCurveTo(36, -470, 50, -404); ctx.closePath(); ctx.fillStyle = lg(0, -486, 0, -404, [C.cream, C.gold, C.saffron]); ctx.fill(); rr(-56, -416, 112, 18, 8); ctx.fillStyle = C.paleGold; ctx.fill(); circle(0, -444, 10, C.red); circle(0, -490, 8, C.cyan);
  const e = o.eyes || 'closed'; ctx.strokeStyle = C.ink; ctx.lineWidth = 6;
  if (e === 'closed') for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 32, -330, 14, 0.1 * PI, 0.9 * PI); ctx.stroke(); }
  else for (const sd of [-1, 1]) { circle(sd * 32, -332, 19, C.white); circle(sd * 32 + (o.lookX || 0), -330 + (o.lookY || 0), 12, C.ink); circle(sd * 32 + 4 + (o.lookX || 0), -336, 5, C.white); }
  ctx.lineWidth = 5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 48, -364); ctx.quadraticCurveTo(sd * 32, -372, sd * 16, -364); ctx.stroke(); }
  ell(-52, -302, 14, 9, rgba('#FF9AC0', 0.6)); ell(52, -302, 14, 9, rgba('#FF9AC0', 0.6));
  ctx.strokeStyle = '#3A0F2A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -306, 20, 0.15 * PI, 0.85 * PI); ctx.stroke();
  ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-9, -392); ctx.quadraticCurveTo(-9, -374, 0, -370); ctx.quadraticCurveTo(9, -374, 9, -392); ctx.stroke(); circle(0, -382, 5, C.red);
  ctx.restore();
}
/** the great hall pillar. x = axis; crack 0..1 lights fissures; split 0..1 pushes the halves apart */
export function pillar(x, yTop, yBase, w, o = {}) {
  const cr = o.crack || 0, sp = o.split || 0;
  for (const sd of [-1, 1]) {
    ctx.save(); ctx.translate(sd * sp * w * 0.9, 0); ctx.rotate(sd * sp * 0.08);
    ctx.beginPath(); ctx.rect(sd > 0 ? x : x - w, yTop - 200, w, yBase - yTop + 400); ctx.clip();
    rr(x - w / 2, yTop, w, yBase - yTop, 24); ctx.fillStyle = lg(x - w / 2, 0, x + w / 2, 0, ['#8A3A05', C.gold, C.cream, C.gold, '#8A3A05']); ctx.fill();
    for (let i = 0; i < 6; i++) { const yy = lerp(yTop + 120, yBase - 120, i / 5); rr(x - w / 2 - 12, yy - 16, w + 24, 32, 12); ctx.fillStyle = lg(0, yy - 16, 0, yy + 16, [C.paleGold, '#B5720A']); ctx.fill(); circle(x - w * 0.25, yy, 9, C.red); circle(x + w * 0.25, yy, 9, C.cyan); }
    rr(x - w * 0.75, yTop - 60, w * 1.5, 80, 20); ctx.fillStyle = lg(0, yTop - 60, 0, yTop + 20, [C.cream, C.gold]); ctx.fill(); rr(x - w * 0.75, yBase - 30, w * 1.5, 80, 20); ctx.fillStyle = lg(0, yBase - 30, 0, yBase + 50, [C.gold, '#8A3A05']); ctx.fill();
    ctx.restore();
  }
  if (cr > 0) { const pts = [[x, yTop + 40]]; let px = x; for (let i = 1; i <= 14; i++) { px = x + (rnd(i * 3.3) - 0.5) * w * 0.7; pts.push([px, lerp(yTop + 40, yBase - 20, i / 14)]); }
    const n = Math.max(2, Math.round(pts.length * clamp(cr))); const pp = pts.slice(0, n);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; line(pp, rgba(C.orange, 0.7), 40 + sp * 200); line(pp, rgba(C.cream, 0.95), 14 + sp * 120); ctx.restore(); line(pp, C.white, 5);
    for (let i = 2; i < n; i += 3) { line([pp[i], [pp[i][0] + (i % 2 ? 1 : -1) * w * 0.4, pp[i][1] - 50]], C.cream, 6); } }
}
/** one condition of the boon as a round badge. kind 0 man/beast · 1 day/night · 2 indoors/outdoors · 3 earth/sky · 4 weapon. state: 0 dim, 1 lit (protecting him), 2 broken (met) */
export function badge(kind, x, y, r, state = 1, t = 0, pop = 1) {
  if (pop <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(pop, pop); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const col = state === 2 ? C.cream : state === 1 ? C.gold : '#8A6AB0';
  if (state) glow(0, 0, r * 2.1, state === 2 ? C.cream : C.red, state === 2 ? 0.7 : 0.45);
  circle(0, 0, r, state === 2 ? rgba('#FFF6DC', 0.95) : rgba('#2A0418', 0.9)); ctx.strokeStyle = col; ctx.lineWidth = r * 0.1; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke();
  const ink = state === 2 ? '#7A1030' : col, u = r / 60;
  ctx.fillStyle = ink; ctx.strokeStyle = ink; ctx.lineWidth = 6 * u;
  if (kind === 0) { circle(-20 * u, -16 * u, 11 * u, ink); rr(-32 * u, -2 * u, 24 * u, 34 * u, 8 * u); ctx.fillStyle = ink; ctx.fill(); circle(22 * u, 12 * u, 13 * u, ink); for (let i = -1; i <= 1; i++) circle((22 + i * 13) * u, (-8 - (1 - Math.abs(i)) * 6) * u, 6 * u, ink); }
  else if (kind === 1) { circle(-18 * u, 0, 13 * u, ink); for (let i = 0; i < 8; i++) { const a = i * PI / 4; line([[-18 * u + Math.cos(a) * 18 * u, Math.sin(a) * 18 * u], [-18 * u + Math.cos(a) * 25 * u, Math.sin(a) * 25 * u]], ink, 4 * u); } ctx.beginPath(); ctx.arc(22 * u, 0, 16 * u, 0.3 * PI, 1.7 * PI); ctx.arc(30 * u, 0, 13 * u, 1.6 * PI, 0.4 * PI, true); ctx.closePath(); ctx.fillStyle = ink; ctx.fill(); }
  else if (kind === 2) { ctx.beginPath(); ctx.moveTo(-24 * u, 30 * u); ctx.lineTo(-24 * u, -10 * u); ctx.arc(0, -10 * u, 24 * u, PI, 0); ctx.lineTo(24 * u, 30 * u); ctx.stroke(); line([[-36 * u, 30 * u], [36 * u, 30 * u]], ink, 6 * u); line([[0, -30 * u], [0, 30 * u]], ink, 3 * u, [6 * u, 6 * u]); }
  else if (kind === 3) { circle(0, 14 * u, 20 * u, ink); for (const [cx, cr2] of [[-16, 10], [0, 13], [16, 10]]) circle(cx * u, -22 * u, cr2 * u, ink); }
  else { line([[-22 * u, 26 * u], [18 * u, -22 * u]], ink, 8 * u); ctx.beginPath(); ctx.moveTo(10 * u, -30 * u); ctx.lineTo(30 * u, -34 * u); ctx.lineTo(26 * u, -14 * u); ctx.closePath(); ctx.fillStyle = ink; ctx.fill(); line([[-30 * u, 8 * u], [-8 * u, 30 * u]], ink, 6 * u); }
  if (state === 2) { line([[-r * 0.72, -r * 0.72], [r * 0.72, r * 0.72]], C.red, r * 0.14); sparkle(r * 0.7, -r * 0.7, r * 0.5 * (0.8 + 0.2 * Math.sin(t * 6)), 1, C.white); }
  ctx.restore();
}
