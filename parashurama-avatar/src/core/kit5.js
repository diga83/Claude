// Luminous Myth, Vamana cast: the dwarf boy with his umbrella, King Bali, the cosmic foot, the fire altar.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, seg, eo, rr, circle, ell, line, lg, rg, glow, rgba, mix } from './lib.js';
import { sparkle, lotus } from './kit.js';
import { hero, flame } from './kit2.js';

const PI = Math.PI;
const BL = ['#1E4FD0', '#3F7BFF', '#8FB8FF'];
export const BALI = { skin: ['#8A3A2A', '#C0603A', '#E8946A'], dhoti: ['#B07AE8', '#6B1FA8', '#2A0E66'], sash: ['#FFE36B', '#E0901A'], crown: 'king' };
export const BALI_BARE = { ...BALI, crown: 'jata' };
export const TRIV = { skin: BL, dhoti: ['#FFE36B', '#FFC83D', '#E88A1F'], sash: ['#FF6FB5', '#E0218A'], crown: 'king' };

/** King Bali: a hero with a proud moustache and small gold horns. o as hero */
export function bali(x, y, o = {}) {
  const s = o.s || 1, f = o.face || 1;
  hero(x, y, { look: o.bare ? BALI_BARE : BALI, ...o });
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.rotate(o.lean || 0); ctx.lineCap = 'round';
  ctx.strokeStyle = C.hair; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, -266); ctx.bezierCurveTo(-18, -280, -40, -262, -50, -276); ctx.moveTo(0, -266); ctx.bezierCurveTo(18, -280, 40, -262, 50, -276); ctx.stroke();
  if (!o.bare) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 62, -330); ctx.quadraticCurveTo(sd * 112, -340, sd * 104, -400); ctx.quadraticCurveTo(sd * 86, -356, sd * 66, -348); ctx.closePath(); ctx.fillStyle = lg(0, -400, 0, -330, [C.cream, C.gold]); ctx.fill(); }
  ctx.restore();
}
/** palm-leaf umbrella on a staff. origin = grip */
export function umbrella(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round';
  line([[0, 120], [0, -300]], lg(0, -300, 0, 120, ['#C98A4A', '#7A4A1A']), 14);
  ctx.beginPath(); ctx.moveTo(-190, -290); ctx.bezierCurveTo(-170, -420, 170, -420, 190, -290); ctx.quadraticCurveTo(0, -330, -190, -290); ctx.closePath(); ctx.fillStyle = lg(0, -420, 0, -290, ['#FFE9A8', '#F2B04D', '#C9701A']); ctx.fill();
  ctx.strokeStyle = rgba('#7A4A1A', 0.6); ctx.lineWidth = 5; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(0, -396); ctx.quadraticCurveTo(i * 40, -360, i * 58, -300 - Math.abs(i) * 2); ctx.stroke(); }
  for (let i = -3; i <= 3; i++) circle(i * 60, -292 - (9 - i * i) * 3, 9, i % 2 ? C.red : C.gold);
  circle(0, -404, 13, C.gold);
  ctx.restore();
}
/** Vamana: a small brahmin boy. origin = feet centre; he stands ≈ 430 tall at s 1.
 *  o: t, face, walk, eyes ('open'|'closed'|'wide'), fingers (0..3 raised on his free hand), props (umbrella + pot), cup (hands cupped), glow */
export function vamana(x, y, o = {}) {
  const s = o.s || 1, t = o.t || 0, wk = o.walk ? Math.sin(t * 9) * 16 : 0, bobY = o.walk ? Math.abs(Math.sin(t * 9)) * -8 : 0;
  ctx.save(); ctx.translate(x, y + bobY * s); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (o.glow) { glow(0, -220, 360, C.gold, o.glow * 0.7); glow(0, -220, 200, C.cream, o.glow * 0.5); }
  // umbrella behind (held in his left hand, screen right)
  if (o.props !== false && !o.cup) umbrella(96, -150, 0.62, 0.06 + Math.sin(t * 3) * 0.02);
  // legs + feet
  for (const sd of [-1, 1]) { ctx.strokeStyle = BL[1]; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(sd * 26, -70); ctx.lineTo(sd * 26 + sd * wk, -12); ctx.stroke(); ell(sd * 30 + sd * wk + 6, -6, 34, 14, BL[0]); }
  // dhoti
  ctx.beginPath(); ctx.moveTo(-62, -150); ctx.lineTo(-70, -48); ctx.quadraticCurveTo(0, -30, 70, -48); ctx.lineTo(62, -150); ctx.closePath(); ctx.fillStyle = lg(0, -150, 0, -40, ['#FFB85C', '#F28A2F', '#C9601A']); ctx.fill();
  ctx.strokeStyle = rgba(C.gold, 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-68, -56); ctx.quadraticCurveTo(0, -38, 68, -56); ctx.stroke();
  // torso + thread
  ctx.beginPath(); ctx.moveTo(-58, -238); ctx.quadraticCurveTo(-62, -252, -40, -254); ctx.lineTo(40, -254); ctx.quadraticCurveTo(62, -252, 58, -238); ctx.lineTo(56, -140); ctx.lineTo(-56, -140); ctx.closePath(); ctx.fillStyle = lg(-58, 0, 58, 0, BL); ctx.fill();
  line([[-44, -250], [34, -146]], C.cream, 5);
  rr(-60, -156, 120, 22, 9); ctx.fillStyle = lg(0, -156, 0, -134, [C.paleGold, C.gold]); ctx.fill();
  // arms
  const arm = (sx, hx, hy) => { ctx.strokeStyle = BL[0]; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(sx, -238); ctx.lineTo(hx, hy); ctx.stroke(); ctx.strokeStyle = BL[1]; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(sx, -238); ctx.lineTo(hx, hy); ctx.stroke(); circle(hx, hy, 17, BL[2]); };
  if (o.cup) { arm(-54, -30, -170); arm(54, 30, -170); ell(0, -166, 44, 18, BL[2]); if (o.cup > 0.01) { glow(0, -176, 110 * o.cup, C.cyan, 0.9 * o.cup); ell(0, -172, 34, 10, C.cyan); } }
  else {
    arm(54, 98, -164);
    if (o.fingers) { arm(-54, -110, -300); for (let i = 0; i < o.fingers; i++) { ctx.strokeStyle = BL[2]; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-122 + i * 13, -306); ctx.lineTo(-136 + i * 20, -346); ctx.stroke(); } }
    else { arm(-54, -86, -150); if (o.props !== false) { ctx.save(); ctx.translate(-92, -112); ell(0, 14, 34, 30, lg(-34, 0, 34, 0, ['#B5520A', C.gold, C.paleGold, '#B5520A'])); rr(-13, -26, 26, 20, 6); ctx.fillStyle = C.gold; ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -30, 20, PI, TAU); ctx.stroke(); ctx.restore(); } }
  }
  // big head
  rr(-16, -276, 32, 30, 8); ctx.fillStyle = BL[0]; ctx.fill();
  circle(0, -338, 84, lg(-84, 0, 84, 0, [BL[1], BL[2]]));
  circle(-84, -330, 16, BL[1]); circle(84, -330, 16, BL[1]); circle(-84, -316, 8, C.gold); circle(84, -316, 8, C.gold);
  ctx.beginPath(); ctx.arc(0, -350, 84, PI * 1.08, PI * 1.92); ctx.quadraticCurveTo(0, -396, -80, -372); ctx.fillStyle = C.hair; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-10, -420); ctx.quadraticCurveTo(-20, -470, 16, -476 + Math.sin(t * 5) * 4); ctx.quadraticCurveTo(10, -450, 14, -418); ctx.closePath(); ctx.fillStyle = C.hair; ctx.fill();
  const e = o.eyes || 'open'; ctx.strokeStyle = C.ink; ctx.lineWidth = 6;
  if (e === 'closed') for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 32, -330, 14, 0.1 * PI, 0.9 * PI); ctx.stroke(); }
  else for (const sd of [-1, 1]) { circle(sd * 32, -332, e === 'wide' ? 22 : 19, C.white); circle(sd * 32 + (o.lookX || 0), -330 + (o.lookY || 0), 12, C.ink); circle(sd * 32 + 4 + (o.lookX || 0), -336, 5, C.white); }
  ctx.lineWidth = 5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 48, -364); ctx.quadraticCurveTo(sd * 32, -372, sd * 16, -364); ctx.stroke(); }
  ell(-52, -302, 14, 9, rgba('#FF9AC0', 0.6)); ell(52, -302, 14, 9, rgba('#FF9AC0', 0.6));
  ctx.strokeStyle = '#3A0F2A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -306, 20, 0.15 * PI, 0.85 * PI); ctx.stroke();
  ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-9, -396); ctx.quadraticCurveTo(-9, -374, 0, -370); ctx.quadraticCurveTo(9, -374, 9, -396); ctx.stroke(); circle(0, -384, 5, C.red);
  ctx.restore();
}
/** the giant's foot, seen from the side, toes to the right. origin = sole centre. The shin runs up and out of frame */
export function foot(x, y, s, rot = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * (o.flip ? -1 : 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  glow(0, -60, 520, C.gold, o.glow ?? 0.5);
  // shin + dhoti hem
  ctx.beginPath(); ctx.moveTo(-250, -1900); ctx.lineTo(-210, -260); ctx.lineTo(60, -260); ctx.lineTo(110, -1900); ctx.closePath(); ctx.fillStyle = lg(-250, 0, 110, 0, BL); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-330, -1900); ctx.lineTo(-290, -620); ctx.quadraticCurveTo(-70, -560, 150, -620); ctx.lineTo(190, -1900); ctx.closePath(); ctx.fillStyle = lg(0, -1900, 0, -580, ['#FFC83D', '#FFE36B', '#F2A01F']); ctx.fill();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(-290, -624); ctx.quadraticCurveTo(-70, -566, 150, -624); ctx.stroke();
  // foot
  ctx.beginPath(); ctx.moveTo(-260, -260); ctx.bezierCurveTo(-330, -150, -320, -20, -230, 0); ctx.lineTo(330, 0); ctx.bezierCurveTo(400, -6, 400, -80, 330, -100); ctx.bezierCurveTo(200, -130, 110, -200, 70, -270); ctx.closePath(); ctx.fillStyle = lg(0, -270, 0, 0, [BL[2], BL[1], BL[0]]); ctx.fill();
  for (let i = 0; i < 5; i++) { const tx = 356 - i * 50, r = 44 - i * 5; circle(tx, -40 - i * 5, r, lg(tx - r, 0, tx + r, 0, [BL[1], BL[2]])); ell(tx + 8, -56 - i * 5, r * 0.5, r * 0.34, '#FFD9E8'); }
  // anklet + toe ring
  ctx.strokeStyle = lg(0, -300, 0, -230, [C.cream, C.gold, '#B5720A']); ctx.lineWidth = 44; ctx.beginPath(); ctx.moveTo(-246, -268); ctx.quadraticCurveTo(-80, -236, 74, -276); ctx.stroke();
  for (let i = 0; i < 6; i++) { const u = i / 5; circle(lerp(-236, 64, u), -262 + Math.sin(u * PI) * 12, 13, i % 2 ? C.red : C.cyan); circle(lerp(-236, 64, u), -226 + Math.sin(u * PI) * 12, 10, C.paleGold); }
  ctx.strokeStyle = C.gold; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(306, -46, 40, PI * 0.9, PI * 1.9); ctx.stroke();
  ell(-40, -150, 150, 40, rgba(C.white, 0.2), -0.25);
  ctx.restore();
}
/** a glowing footprint */
export function footprint(x, y, s, a = 1, rot = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= clamp(a);
  glow(0, 0, 150, C.gold, 0.8); ell(0, 14, 34, 56, lg(0, -42, 0, 70, [C.cream, C.gold])); ell(-4, -24, 38, 30, C.cream);
  for (let i = 0; i < 5; i++) circle(-34 + i * 17, -66 - Math.sin(i / 4 * PI) * 12 + i * 2, 11 - i, C.cream);
  ctx.restore();
}
/** the sacrificial fire on its brick altar. origin = altar base centre */
export function altar(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  glow(0, -160, 520, C.orange, 0.5);
  for (let r = 0; r < 3; r++) { const w = 400 - r * 70; for (let i = 0; i < 6 - r; i++) { rr(-w / 2 + i * (w / (6 - r)), -50 - r * 50, w / (6 - r) - 6, 44, 8); ctx.fillStyle = lg(0, -50 - r * 50, 0, -6 - r * 50, i % 2 ? ['#E0703A', '#9A3A1A'] : ['#F28A4A', '#B04A1A']); ctx.fill(); } }
  for (let i = -2; i <= 2; i++) circle(i * 62, -26, 9, C.cream);
  flame(-60, -150, 1.3, t, 1); flame(60, -150, 1.4, t, 4); flame(0, -150, 2.0, t, 2);
  for (let i = 0; i < 8; i++) { const p = ((t * 0.7 + i / 8) % 1); circle(Math.sin(i * 3) * 120, -260 - p * 420, 8 * (1 - p), rgba(C.gold, 1 - p)); }
  ctx.restore();
}
/** a heap of gold with a few jewels */
export function gold(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, -50, 260, C.gold, 0.5);
  for (let r = 0; r < 5; r++) for (let i = 0; i <= 8 - r * 2; i++) { const cx = (i - (8 - r * 2) / 2) * 42 + (r % 2) * 6, cy = -r * 30; ell(cx, cy, 26, 13, lg(cx - 26, 0, cx + 26, 0, ['#B5720A', C.gold, C.cream, C.gold])); ell(cx, cy - 4, 18, 7, rgba(C.cream, 0.5)); }
  circle(-70, -40, 18, C.red); circle(60, -70, 16, C.cyan); circle(10, -130, 15, C.leaf);
  for (let i = 0; i < 4; i++) sparkle(-110 + i * 72, -70 - (i % 2) * 60, 22, 0.5 + 0.5 * Math.sin(t * 5 + i * 2), C.white);
  ctx.restore();
}
