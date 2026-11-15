// Luminous Myth, Parashurama cast: the axe-bearing sage, the thousand-armed king, soldiers, palms.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, seg, eo, rr, circle, ell, line, lg, rg, glow, rgba, mix } from './lib.js';
import { sparkle } from './kit.js';
import { hero } from './kit2.js';

const PI = Math.PI;
const TAN = ['#A4673F', '#C98A5E', '#E0A77C'];
export const PR = { skin: TAN, dhoti: ['#FF9A4D', '#E0401A', '#8A1F0A'], sash: ['#FFB03D', '#C9601A'], crown: 'jata', bow: true };
export const PR_BOY = { skin: TAN, dhoti: ['#FFD27A', '#FF8A1F', '#C9501A'], sash: ['#F8D2A8', '#D9A066'], crown: 'jata' };
export const JAMAD = { skin: TAN, dhoti: ['#FFE9A8', '#FFC83D', '#E88A1F'], sash: ['#F8D2A8', '#D9A066'], crown: 'jata', beard: true };
export const KING = { skin: ['#7A1030', '#C0304A', '#F0707A'], dhoti: ['#FFD86B', '#D9901A', '#7A3A0A'], sash: ['#3A1680', '#150A4A'], crown: 'king' };
export const PRINCE = { skin: ['#5A0A2A', '#9A1A3A', '#D0506A'], dhoti: ['#3A1680', '#2A0E46', '#150A2A'], sash: ['#FFD86B', '#D9901A'], crown: 'prince' };

/** the divine axe (parashu). origin = grip; the blade is up. g = blaze 0..1 */
export function axe(x, y, s, rot = 0, g = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (g > 0) { glow(40, -380, 300, C.orange, 0.7 * g); glow(60, -380, 150, C.cream, 0.8 * g); }
  line([[0, 110], [0, -470]], lg(0, -470, 0, 110, [C.cream, C.gold, '#8A3A05']), 22);
  for (const yy of [-40, 40]) { rr(-15, yy - 10, 30, 20, 6); ctx.fillStyle = C.red; ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(8, -460); ctx.bezierCurveTo(120, -520, 230, -470, 250, -350); ctx.bezierCurveTo(190, -390, 120, -390, 60, -340); ctx.bezierCurveTo(100, -300, 150, -290, 210, -310); ctx.bezierCurveTo(160, -230, 60, -230, 8, -290); ctx.closePath();
  ctx.fillStyle = lg(0, -500, 250, -260, ['#FFFFFF', '#DFF0FF', '#8FB8E8', '#FFE9A8']); ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-8, -450); ctx.lineTo(-70, -410); ctx.lineTo(-8, -330); ctx.closePath(); ctx.fillStyle = lg(-70, 0, 0, 0, [C.cream, C.gold]); ctx.fill();
  circle(34, -376, 18, C.red); circle(0, -484, 16, C.cream);
  if (g > 0) sparkle(236, -356, 44 * g, g, C.white);
  ctx.restore();
}
/** Parashurama: matted hair, dark beard, beads, the axe in his right hand. o as hero; + axe (rotation, false = none), blaze, boy */
export function pr(x, y, o = {}) {
  const s = o.s || 1, f = o.face || 1, hands = o.hands || [[-90, -40], [150, -150]];
  hero(x, y, { look: o.boy ? PR_BOY : PR, ...o, hands });
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.rotate(o.lean || 0); ctx.lineCap = 'round';
  if (!o.boy) { ctx.beginPath(); ctx.moveTo(-48, -272); ctx.quadraticCurveTo(-42, -212, 0, -200); ctx.quadraticCurveTo(42, -212, 48, -272); ctx.quadraticCurveTo(26, -236, 0, -240); ctx.quadraticCurveTo(-26, -236, -48, -272); ctx.fillStyle = C.hair; ctx.fill();
    ctx.strokeStyle = C.hair; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-26, -262); ctx.quadraticCurveTo(-10, -272, 0, -264); ctx.quadraticCurveTo(10, -272, 26, -262); ctx.stroke(); }
  for (let i = 0; i < 3; i++) line([[-30, -322 + i * 8], [30, -322 + i * 8]], rgba(C.cream, 0.9), 4);
  for (let i = 0; i <= 10; i++) { const u = i / 10; circle(lerp(-58, 58, u), -206 + Math.sin(u * PI) * 74, 9, i % 2 ? '#8A3A1A' : '#B5520A'); }
  ctx.restore();
  if (o.axe !== false && !o.boy) axe(x + f * s * hands[1][0], y + s * hands[1][1], s * 0.8, f * (o.axe ?? 0.25), o.blaze ?? 1);
}
/** Kartavirya, the thousand-armed king: a hero in front of a great fan of arms. o as hero */
export function king1000(x, y, o = {}) {
  const s = o.s || 1, t = o.t || 0, f = o.face || 1;
  ctx.save(); ctx.translate(x, y - 200 * s); ctx.scale(s * f, s); ctx.globalAlpha *= o.a ?? 1; ctx.lineCap = 'round';
  glow(0, -40, 620, C.red, 0.3);
  for (let ring = 2; ring >= 0; ring--) { const n = 14 + ring * 6, len = 250 + ring * 110;
    for (let i = 0; i < n; i++) { const a = -PI * (0.02 + 0.96 * i / (n - 1)) + Math.sin(t * 2 + i + ring) * 0.03, ex = Math.cos(a) * len, ey = Math.sin(a) * len;
      ctx.strokeStyle = ring % 2 ? '#9A1A3A' : '#C0304A'; ctx.lineWidth = 26 - ring * 5; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 60, Math.sin(a) * 60); ctx.lineTo(ex, ey); ctx.stroke();
      circle(ex, ey, 16 - ring * 3, '#F0707A'); if ((i + ring) % 3 === 0) { line([[ex, ey], [ex + Math.cos(a) * 70, ey + Math.sin(a) * 70]], '#DFF0FF', 7); } circle(Math.cos(a) * len * 0.62, Math.sin(a) * len * 0.62, 10 - ring * 2, C.gold); } }
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= o.a ?? 1; hero(x, y, { look: KING, ...o }); ctx.restore();
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.rotate(o.lean || 0); ctx.globalAlpha *= o.a ?? 1; ctx.lineCap = 'round';
  ctx.strokeStyle = C.hair; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(0, -266); ctx.bezierCurveTo(-18, -282, -44, -258, -56, -280); ctx.moveTo(0, -266); ctx.bezierCurveTo(18, -282, 44, -258, 56, -280); ctx.stroke();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 36, -316); ctx.lineTo(sd * 8, -302); ctx.stroke(); }
  ctx.restore();
}
/** a spear soldier (dark silhouette with a gleam). face 1 = facing right */
export function soldier(x, y, s, t, o = {}) {
  const c = o.col || '#2A0A30', w = Math.sin(t * 8 + (o.ph || 0)) * 16 * (o.still ? 0 : 1);
  ctx.save(); ctx.translate(x, y + Math.abs(Math.sin(t * 8 + (o.ph || 0))) * -8 * (o.still ? 0 : 1)); ctx.rotate(o.rot || 0); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round';
  ctx.strokeStyle = c; ctx.lineWidth = 24; ctx.beginPath(); ctx.moveTo(-14, 10); ctx.lineTo(-14 - w, 90); ctx.moveTo(14, 10); ctx.lineTo(14 + w, 90); ctx.stroke();
  ell(0, -40, 50, 70, c); circle(0, -130, 40, c);
  ctx.beginPath(); ctx.moveTo(-40, -150); ctx.quadraticCurveTo(0, -210, 40, -150); ctx.closePath(); ctx.fillStyle = o.helm || '#C9901A'; ctx.fill(); circle(0, -196, 9, o.helm || '#C9901A');
  ell(-20, -30, 36, 46, o.shield || '#8A1F3A'); circle(-20, -30, 12, C.gold);
  ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(30, -60); ctx.lineTo(60, -90); ctx.stroke(); line([[60, 30], [60, -230]], '#DFF0FF', 7);
  ctx.beginPath(); ctx.moveTo(48, -230); ctx.lineTo(60, -280); ctx.lineTo(72, -230); ctx.closePath(); ctx.fillStyle = '#DFF0FF'; ctx.fill();
  ctx.restore();
}
export function palm(x, y, s, t, g = 1) {
  if (g <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * g, s * g); ctx.lineCap = 'round';
  ctx.strokeStyle = lg(0, -330, 0, 0, ['#C98A4A', '#7A4A1A']); ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(40, -170, 10, -330); ctx.stroke();
  for (let i = 0; i < 7; i++) { const a = -PI * (0.02 + 0.96 * i / 6) + Math.sin(t * 2 + i) * 0.05; ctx.save(); ctx.translate(10, -330); ctx.rotate(a + PI / 2); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-44, -60, -30, -170, 0, -210); ctx.bezierCurveTo(30, -170, 44, -60, 0, 0); ctx.fillStyle = lg(0, -210, 0, 0, i % 2 ? ['#5ADC9A', '#0B8B5F'] : ['#3DDC84', '#0B6B4F']); ctx.fill(); ctx.restore(); }
  circle(4, -318, 20, '#8A5A2A'); circle(28, -310, 18, '#7A4A1A');
  ctx.restore();
}
/** a toppling crown */
export function crown(x, y, s, rot = 0, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(-60, 40); ctx.lineTo(-74, -40); ctx.lineTo(-36, -4); ctx.lineTo(0, -80); ctx.lineTo(36, -4); ctx.lineTo(74, -40); ctx.lineTo(60, 40); ctx.closePath(); ctx.fillStyle = lg(0, -80, 0, 40, [C.cream, C.gold, C.saffron]); ctx.fill(); rr(-64, 24, 128, 22, 8); ctx.fillStyle = C.paleGold; ctx.fill(); circle(0, -14, 12, C.red);
  ctx.restore();
}
