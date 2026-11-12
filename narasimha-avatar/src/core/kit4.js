// Luminous Myth, Varaha cast: the great boar, the Earth, Brahma, a war mace.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, seg, eo, rr, circle, ell, line, lg, rg, glow, rgba, mix } from './lib.js';
import { sparkle, lotus, sage } from './kit.js';

const PI = Math.PI;
const B = ['#0F2A9A', '#2F5BE8', '#7FA8FF'];

/** the Earth. dim 0..1 greys her out (lost in the deep) */
export function earth(x, y, r, t, dim = 0) {
  glow(x, y, r * 1.9, C.cyan, 0.5 * (1 - dim));
  circle(x, y, r, rg(x - r * 0.35, y - r * 0.35, r * 0.1, r * 1.15, [mix('#7FE8FF', '#5A6A8A', dim), mix('#2A8FE8', '#2A3A5A', dim), mix('#0A2A7A', '#0A1230', dim)]));
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); const dx = (t * 26) % (r * 4);
  for (let k = -1; k <= 1; k++) for (const [bx, by, br, bq] of [[-0.5, -0.3, 0.42, 0.3], [-0.2, 0.3, 0.3, 0.44], [0.6, -0.1, 0.36, 0.5], [0.9, 0.5, 0.26, 0.2], [1.5, -0.4, 0.4, 0.26], [1.9, 0.25, 0.3, 0.4]])
    ell(x + bx * r + k * r * 4 - dx + r, y + by * r, br * r, bq * r, lg(0, y - r, 0, y + r, [mix(C.leaf, '#4A5A6A', dim), mix(C.emerald, '#2A3A4A', dim), mix(C.forest, '#1A2434', dim)]), bx);
  ctx.fillStyle = rg(x + r * 0.4, y + r * 0.4, r * 0.3, r * 1.5, [rgba('#05021A', 0), rgba('#05021A', 0.55 + 0.25 * dim)]); ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
  ctx.strokeStyle = rgba(C.cream, 0.7 * (1 - dim * 0.7)); ctx.lineWidth = Math.max(2, r * 0.02); ctx.beginPath(); ctx.arc(x, y, r + r * 0.016, 0, TAU); ctx.stroke();
}
/** Varaha, the cosmic boar, side view facing right. origin = body centre; hooves ≈ +330; tusk tips ≈ (560, -200).
 *  o: t, rot, flip, run (0..1 leg swing), swim (legs trail back), roar (0..1 jaw), glow, carry(x,y) draws something on the tusks */
export function varaha(x, y, s, o = {}) {
  const t = o.t || 0, run = o.run || 0, roar = o.roar || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.flip ? -1 : 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (o.glow) { glow(40, -40, 620, '#5C8BFF', o.glow * 0.6); glow(420, -120, 300, C.gold, o.glow * 0.5); }
  const leg = (lx, ph, far) => { const a = o.swim ? -0.9 + Math.sin(t * 5 + ph) * 0.18 : Math.sin(t * 8 + ph) * 0.5 * run;
    ctx.save(); ctx.translate(lx, 110); ctx.rotate(a);
    ctx.beginPath(); ctx.moveTo(-52, 0); ctx.lineTo(-36, 170); ctx.lineTo(36, 170); ctx.lineTo(52, 0); ctx.closePath(); ctx.fillStyle = far ? B[0] : lg(-52, 0, 52, 0, [B[0], B[1]]); ctx.fill();
    rr(-42, 150, 84, 24, 10); ctx.fillStyle = lg(0, 150, 0, 174, [C.paleGold, C.gold]); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-40, 174); ctx.lineTo(-44, 222); ctx.lineTo(-4, 222); ctx.lineTo(0, 190); ctx.lineTo(4, 222); ctx.lineTo(44, 222); ctx.lineTo(40, 174); ctx.closePath(); ctx.fillStyle = lg(0, 174, 0, 222, [C.cream, C.gold, '#B5720A']); ctx.fill(); ctx.restore(); };
  // tail + far legs
  ctx.strokeStyle = B[0]; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(-290, -40); ctx.bezierCurveTo(-380, -70, -390, 10 + Math.sin(t * 4) * 16, -350, 40); ctx.stroke(); ell(-346, 52, 22, 34, C.gold, 0.4);
  leg(-150, 1.6, true); leg(190, 3.0, true);
  // mane of gold bristles
  for (let i = 0; i < 17; i++) { const u = i / 16, bx = lerp(-270, 300, u), by = -150 - Math.sin(u * PI) * 60 - (u > 0.75 ? (u - 0.75) * 160 : 0), l = 70 + Math.sin(i * 1.7 + t * 6) * 12;
    ctx.beginPath(); ctx.moveTo(bx - 26, by + 40); ctx.lineTo(bx - 16 + u * 30, by - l); ctx.lineTo(bx + 26, by + 40); ctx.closePath(); ctx.fillStyle = lg(0, by - l, 0, by + 40, [C.cream, C.gold, C.saffron]); ctx.fill(); }
  // body
  ell(0, -10, 310, 190, lg(0, -200, 0, 180, [B[2], B[1], B[0]]));
  ell(-20, 110, 210, 60, rgba('#9FC0FF', 0.3)); ell(-60, -130, 190, 34, rgba(C.white, 0.22), -0.08);
  // saddle cloth + near legs
  ctx.beginPath(); ctx.moveTo(-120, -190); ctx.quadraticCurveTo(-30, -214, 70, -194); ctx.lineTo(60, 10); ctx.quadraticCurveTo(-30, 40, -110, 10); ctx.closePath(); ctx.fillStyle = lg(0, -200, 0, 30, [C.pink, C.magenta, C.purple]); ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 9; ctx.stroke();
  for (let i = 0; i < 3; i++) circle(-74 + i * 50, -70, 13, i === 1 ? C.cyan : C.paleGold);
  leg(-230, 0, false); leg(110, 1.4, false);
  // head
  circle(300, -80, 160, lg(160, 0, 460, 0, [B[1], B[2]]));
  // ear
  ctx.beginPath(); ctx.moveTo(220, -200); ctx.quadraticCurveTo(230, -330, 320, -340); ctx.quadraticCurveTo(320, -250, 290, -200); ctx.closePath(); ctx.fillStyle = B[1]; ctx.fill(); ctx.beginPath(); ctx.moveTo(244, -214); ctx.quadraticCurveTo(254, -296, 300, -306); ctx.quadraticCurveTo(298, -246, 280, -212); ctx.closePath(); ctx.fillStyle = '#FF9AC0'; ctx.fill();
  // lower jaw (opens to roar)
  ctx.save(); ctx.translate(360, 10); ctx.rotate(roar * 0.42);
  ctx.beginPath(); ctx.moveTo(-40, -10); ctx.lineTo(190, -4); ctx.quadraticCurveTo(210, 30, 170, 44); ctx.lineTo(-30, 70); ctx.closePath(); ctx.fillStyle = B[0]; ctx.fill();
  if (roar > 0.2) { ctx.beginPath(); ctx.moveTo(-10, -4); ctx.lineTo(170, 0); ctx.lineTo(150, 22); ctx.lineTo(0, 30); ctx.closePath(); ctx.fillStyle = '#B0183A'; ctx.fill(); }
  ctx.restore();
  // snout
  ctx.beginPath(); ctx.moveTo(390, -170); ctx.quadraticCurveTo(500, -150, 580, -100); ctx.lineTo(580, 0); ctx.quadraticCurveTo(480, 30, 380, 40); ctx.closePath(); ctx.fillStyle = lg(380, 0, 590, 0, [B[2], '#9FC0FF']); ctx.fill();
  ell(584, -50, 34, 58, lg(550, 0, 620, 0, ['#FF9AC0', '#FFC8DC'])); ell(590, -70, 9, 13, '#8A2A5A'); ell(590, -28, 9, 13, '#8A2A5A');
  // tusks
  for (const [dx, far] of [[26, true], [0, false]]) { ctx.save(); ctx.translate(430 + dx, 20 - (far ? 10 : 0));
    if (!far) glow(90, -150, 130, C.cream, 0.5);
    ctx.beginPath(); ctx.moveTo(-34, 6); ctx.bezierCurveTo(20, 30, 130, -40, 132, -230); ctx.bezierCurveTo(100, -110, 40, -60, -20, -50); ctx.closePath(); ctx.fillStyle = far ? '#E8D8A8' : lg(0, -230, 0, 20, [C.white, C.cream, C.gold]); ctx.fill();
    if (!far) { ctx.strokeStyle = rgba('#B5720A', 0.5); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-8, -20); ctx.lineTo(6, 14); ctx.moveTo(30, -34); ctx.lineTo(48, 0); ctx.stroke(); }
    ctx.restore(); }
  // eye, brow, tilak
  circle(350, -110, 36, C.white); circle(358, -108, 21, C.ink); circle(366, -116, 8, C.white);
  ctx.strokeStyle = B[0]; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(300, -164 + roar * 14); ctx.quadraticCurveTo(350, -180, 400, -150 - roar * 6); ctx.stroke();
  ctx.strokeStyle = C.cream; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(404, -200); ctx.quadraticCurveTo(410, -168, 426, -164); ctx.quadraticCurveTo(444, -168, 452, -196); ctx.stroke(); circle(428, -182, 8, C.red);
  // crown
  ctx.beginPath(); ctx.moveTo(250, -226); ctx.quadraticCurveTo(262, -330, 320, -372); ctx.quadraticCurveTo(376, -330, 384, -214); ctx.closePath(); ctx.fillStyle = lg(0, -372, 0, -214, [C.cream, C.gold, C.saffron]); ctx.fill();
  ctx.save(); ctx.translate(318, -224); ctx.rotate(0.08); rr(-76, -14, 152, 28, 10); ctx.fillStyle = C.paleGold; ctx.fill(); ctx.restore(); circle(318, -272, 16, C.red); circle(320, -378, 13, C.cyan);
  // necklace + bells
  ctx.strokeStyle = C.gold; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(190, -180); ctx.quadraticCurveTo(150, 0, 230, 120); ctx.stroke();
  for (let i = 0; i < 6; i++) { const u = i / 5, nx = (1 - u) * (1 - u) * 190 + 2 * (1 - u) * u * 150 + u * u * 230, ny = (1 - u) * (1 - u) * -180 + 2 * (1 - u) * u * 0 + u * u * 120; circle(nx, ny, 15, i % 2 ? C.red : C.cyan); }
  if (o.carry) o.carry(540, -230);
  ctx.restore();
}
/** boar head, front view, to set on Vishnu's shoulders (icon form). origin = face centre, r ≈ 70 */
export function boarHead(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 40, -40); ctx.quadraticCurveTo(sd * 110, -110, sd * 96, -10); ctx.closePath(); ctx.fillStyle = B[1]; ctx.fill(); ctx.beginPath(); ctx.moveTo(sd * 54, -40); ctx.quadraticCurveTo(sd * 94, -80, sd * 86, -22); ctx.closePath(); ctx.fillStyle = '#FF9AC0'; ctx.fill(); }
  circle(0, 0, 72, lg(-72, 0, 72, 0, [B[1], B[2]]));
  ctx.beginPath(); ctx.moveTo(-46, 0); ctx.quadraticCurveTo(-52, 84, 0, 96); ctx.quadraticCurveTo(52, 84, 46, 0); ctx.closePath(); ctx.fillStyle = lg(0, 0, 0, 96, [B[2], '#9FC0FF']); ctx.fill();
  ell(0, 80, 34, 20, '#FFB0D0'); ell(-12, 80, 6, 8, '#8A2A5A'); ell(12, 80, 6, 8, '#8A2A5A');
  for (const sd of [-1, 1]) { glow(sd * 60, 20, 50, C.cream, 0.5); ctx.beginPath(); ctx.moveTo(sd * 30, 66); ctx.bezierCurveTo(sd * 60, 80, sd * 96, 40, sd * 84, -30); ctx.bezierCurveTo(sd * 78, 20, sd * 56, 40, sd * 34, 44); ctx.closePath(); ctx.fillStyle = lg(0, -30, 0, 70, [C.white, C.cream, C.gold]); ctx.fill(); }
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 28, -12, 13, 0.1 * PI, 0.9 * PI); ctx.stroke(); }
  ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-9, -52); ctx.quadraticCurveTo(-9, -32, 0, -28); ctx.quadraticCurveTo(9, -32, 9, -52); ctx.stroke(); circle(0, -42, 4, C.red);
  ctx.restore();
}
/** Brahma the creator: three faces showing, four arms, red robes, on a lotus. origin = lotus centre */
export function brahma(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  glow(0, -200, 520, C.gold, 0.5);
  const SK = ['#C98A5E', '#E6B088', '#F8D2A8'];
  const arm = (hx, hy, sd) => { ctx.strokeStyle = SK[0]; ctx.lineWidth = 40; ctx.beginPath(); ctx.moveTo(sd * 80, -200); ctx.quadraticCurveTo(sd * 170, -170, hx, hy); ctx.stroke(); ctx.strokeStyle = SK[1]; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(sd * 80, -200); ctx.quadraticCurveTo(sd * 170, -170, hx, hy); ctx.stroke(); circle(hx, hy, 22, SK[2]); circle(lerp(sd * 80, hx, 0.55), lerp(-200, hy, 0.5) - 6, 22, C.gold); };
  arm(-200, -330, -1); arm(200, -330, 1);
  // book of the Vedas + rosary
  ctx.save(); ctx.translate(-206, -368); ctx.rotate(-0.2); rr(-46, -30, 92, 60, 8); ctx.fillStyle = lg(0, -30, 0, 30, [C.cream, '#F2D48A']); ctx.fill(); ctx.strokeStyle = C.saffron; ctx.lineWidth = 5; ctx.stroke(); line([[-30, -8], [30, -8]], rgba('#8A3A05', 0.6), 4); line([[-30, 8], [30, 8]], rgba('#8A3A05', 0.6), 4); ctx.restore();
  for (let i = 0; i < 12; i++) { const a = i * TAU / 12; circle(204 + Math.cos(a) * 34, -380 + Math.sin(a) * 44, 8, i % 2 ? '#8A3A1A' : C.gold); }
  // side faces
  for (const sd of [-1, 1]) { circle(sd * 78, -306, 54, lg(sd * 30, 0, sd * 130, 0, sd > 0 ? [SK[1], SK[2]] : [SK[2], SK[1]]));
    ctx.beginPath(); ctx.moveTo(sd * 124, -310); ctx.lineTo(sd * 146, -296); ctx.lineTo(sd * 124, -286); ctx.closePath(); ctx.fillStyle = SK[1]; ctx.fill();
    ctx.beginPath(); ctx.moveTo(sd * 60, -280); ctx.quadraticCurveTo(sd * 90, -210, sd * 126, -276); ctx.quadraticCurveTo(sd * 96, -262, sd * 60, -280); ctx.fillStyle = C.cream; ctx.fill();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(sd * 100, -314, 9, 0.1 * PI, 0.9 * PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sd * 34, -348); ctx.lineTo(sd * 60, -430); ctx.lineTo(sd * 126, -350); ctx.closePath(); ctx.fillStyle = lg(0, -430, 0, -348, [C.cream, C.gold]); ctx.fill(); }
  // robe (seated)
  ctx.beginPath(); ctx.moveTo(-210, 40); ctx.quadraticCurveTo(-230, -50, -110, -90); ctx.lineTo(-90, -210); ctx.quadraticCurveTo(0, -240, 90, -210); ctx.lineTo(110, -90); ctx.quadraticCurveTo(230, -50, 210, 40); ctx.quadraticCurveTo(0, 90, -210, 40); ctx.closePath(); ctx.fillStyle = lg(0, -230, 0, 80, ['#FF6A5A', '#D0183A', '#7A0A2A']); ctx.fill();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-80, -200); ctx.lineTo(60, 50); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -214, 50, 0.15 * PI, 0.85 * PI); ctx.stroke();
  arm(-150, -30, -1); arm(150, -40, 1);
  // kamandalu in the lower left hand
  ctx.save(); ctx.translate(-158, -4); ell(0, 14, 34, 30, lg(-34, 0, 34, 0, ['#B5520A', C.gold, '#B5520A'])); rr(-12, -30, 24, 22, 6); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore();
  // centre face
  circle(0, -300, 72, lg(-72, 0, 72, 0, [SK[1], SK[2]]));
  ctx.beginPath(); ctx.moveTo(-62, -290); ctx.quadraticCurveTo(-56, -180, 0, -150); ctx.quadraticCurveTo(56, -180, 62, -290); ctx.quadraticCurveTo(0, -246, -62, -290); ctx.fillStyle = C.cream; ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 26, -310, 12, 0.1 * PI, 0.9 * PI); ctx.stroke(); }
  circle(0, -338, 6, C.red);
  ctx.beginPath(); ctx.moveTo(-70, -350); ctx.lineTo(-60, -410); ctx.quadraticCurveTo(-40, -480, 0, -510); ctx.quadraticCurveTo(40, -480, 60, -410); ctx.lineTo(70, -350); ctx.closePath(); ctx.fillStyle = lg(0, -510, 0, -350, [C.cream, C.gold, C.saffron]); ctx.fill();
  rr(-76, -368, 152, 24, 10); ctx.fillStyle = C.paleGold; ctx.fill(); circle(0, -400, 13, C.red); circle(0, -514, 12, C.cream);
  lotus(0, 120, 2.6, 1);
  ctx.restore();
}
/** war mace (gada). origin = grip, head up */
export function mace(x, y, s, rot = 0, col = C.gold) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round';
  line([[0, 60], [0, -230]], lg(0, -230, 0, 60, [C.cream, col, '#8A3A05']), 24);
  circle(0, -290, 86, rg(-26, -316, 8, 96, [C.cream, col, '#8A3A05'])); for (let i = 0; i < 8; i++) { const a = i * PI / 4; ctx.beginPath(); ctx.moveTo(Math.cos(a - 0.2) * 80, -290 + Math.sin(a - 0.2) * 80); ctx.lineTo(Math.cos(a) * 120, -290 + Math.sin(a) * 120); ctx.lineTo(Math.cos(a + 0.2) * 80, -290 + Math.sin(a + 0.2) * 80); ctx.closePath(); ctx.fillStyle = C.paleGold; ctx.fill(); }
  circle(0, -290, 24, C.red); circle(0, 66, 20, col);
  ctx.restore();
}
/** shock rings (a roar, an impact). p 0..1 */
export function rings(x, y, r, p, col = C.cream, n = 3) {
  ctx.save(); for (let i = 0; i < n; i++) { const q = clamp(p * 1.4 - i * 0.2); if (q <= 0 || q >= 1) continue; ctx.strokeStyle = rgba(col, (1 - q) * 0.9); ctx.lineWidth = 26 * (1 - q) + 4; ctx.beginPath(); ctx.arc(x, y, r * eo(q), 0, TAU); ctx.stroke(); } ctx.restore();
}
