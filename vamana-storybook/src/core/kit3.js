// Luminous Myth, Samudra Manthana cast: Kurma the tortoise, Mount Mandara, Shiva, devas and asuras, the treasures.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, seg, eo, rr, circle, ell, line, lg, rg, glow, rgba, mix } from './lib.js';
import { sparkle, lotus, rays, pot } from './kit.js';
import { hero, LOOK } from './kit2.js';

const PI = Math.PI;
export const DEVA = [
  { skin: ['#E0A040', '#FFD27A', '#FFF1B8'], dhoti: ['#FFFFFF', '#CFE6F8', '#8FB8FF'], sash: ['#FF6FB5', '#E0218A'], crown: 'king' },
  { skin: ['#C98A5E', '#E6B088', '#F8D2A8'], dhoti: ['#FFE36B', '#FFC83D', '#E88A1F'], sash: ['#5CE1FF', '#1257C8'], crown: 'prince' },
  { skin: ['#D49A3A', '#F2C46B', '#FFE9A8'], dhoti: ['#FF8AC2', '#E0218A', '#8A0F5A'], sash: ['#FFE36B', '#F2A01F'], crown: 'prince' },
  { skin: ['#1E4FD0', '#3F7BFF', '#8FB8FF'], dhoti: ['#FFE36B', '#FFC83D', '#E88A1F'], sash: ['#5CE1A0', '#0B8B5F'], crown: 'prince' },
];
export const ASURA = [
  { skin: ['#7A1030', '#B02A4A', '#E0607A'], dhoti: ['#5A2FD0', '#3A1680', '#150A4A'], sash: ['#FFA63D', '#C9501A'], crown: 'jata' },
  { skin: ['#2A5A4A', '#3A8A6A', '#6AC89A'], dhoti: ['#B0103A', '#7A0A3A', '#2A0418'], sash: ['#FFE36B', '#C98A2A'], crown: 'jata' },
  { skin: ['#4A2A8A', '#7A4AC8', '#B08AF0'], dhoti: ['#E0401A', '#9A1A1A', '#3A0A0A'], sash: ['#5CE1FF', '#1257C8'], crown: 'jata' },
];
/** a demon: a hero with horns, fangs and burning eyes. o as hero (keep lean small) */
export function asura(x, y, o = {}) {
  const s = o.s || 1, f = o.face || 1, k = o.look || ASURA[0];
  hero(x, y, { ...o, look: k, eyes: o.eyes || 'open' });
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.rotate(o.lean || 0);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 30, -334); ctx.quadraticCurveTo(sd * 96, -360, sd * 84, -440); ctx.quadraticCurveTo(sd * 64, -380, sd * 52, -326); ctx.closePath(); ctx.fillStyle = lg(0, -440, 0, -330, [C.cream, '#C8A8E0']); ctx.fill(); }
  for (const sd of [-1, 1]) { glow(sd * 22, -288, 26, C.red, 0.8); ctx.beginPath(); ctx.moveTo(sd * 10, -250); ctx.lineTo(sd * 15, -232); ctx.lineTo(sd * 21, -251); ctx.closePath(); ctx.fillStyle = C.cream; ctx.fill(); }
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 36, -314); ctx.lineTo(sd * 8, -300); ctx.stroke(); }
  ctx.restore();
}

/** Kurma, the giant tortoise, side view facing right. origin = centre of the shell's base line. shell top ≈ -200.
 *  o: t, eyes ('open'|'closed'), glow, swim (0..1 flipper motion), flip */
export function kurma(x, y, s, o = {}) {
  const t = o.t || 0, sw = (o.swim ?? 0.4) * Math.sin(t * 2.4);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.flip ? -1 : 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (o.glow) { glow(0, -60, 560, C.gold, o.glow * 0.6); glow(0, -60, 340, C.leaf, o.glow * 0.4); }
  const SK = ['#6AE0A0', '#2AB87A', '#0B7B5F'];
  // tail + far flippers
  ctx.beginPath(); ctx.moveTo(-270, 10); ctx.quadraticCurveTo(-350, 20, -372, 60); ctx.quadraticCurveTo(-310, 60, -262, 40); ctx.closePath(); ctx.fillStyle = SK[2]; ctx.fill();
  const flipper = (fx, fy, rot, len, col) => { ctx.save(); ctx.translate(fx, fy); ctx.rotate(rot); ctx.beginPath(); ctx.moveTo(-34, 0); ctx.bezierCurveTo(-60, len * 0.5, -40, len, 10, len); ctx.bezierCurveTo(60, len, 60, len * 0.4, 34, 0); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    for (let i = 0; i < 4; i++) circle(-18 + i * 14, len * (0.45 + (i % 2) * 0.22), 9, rgba(C.cream, 0.5)); ctx.restore(); };
  flipper(-150, 30, 0.5 + sw * 0.5, 150, lg(0, 0, 0, 150, [SK[2], '#075A4A'])); flipper(170, 30, -0.3 - sw * 0.5, 160, lg(0, 0, 0, 160, [SK[2], '#075A4A']));
  // neck + head
  ctx.strokeStyle = lg(250, 0, 420, 0, [SK[1], SK[0]]); ctx.lineWidth = 96; ctx.beginPath(); ctx.moveTo(230, 0); ctx.quadraticCurveTo(320, 0, 372, -52); ctx.stroke();
  ctx.strokeStyle = rgba(SK[2], 0.6); ctx.lineWidth = 5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(250 + i * 30, 6 - i * 10, 44, -PI * 0.55, PI * 0.4); ctx.stroke(); }
  ell(400, -78, 96, 74, lg(310, 0, 500, 0, [SK[1], SK[0]]), -0.2);
  ell(426, -110, 50, 20, rgba(C.white, 0.3), -0.2);
  if (o.eyes === 'closed') { ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(430, -92, 20, 0.1 * PI, 0.9 * PI); ctx.stroke(); }
  else { circle(430, -96, 26, C.white); circle(436, -94, 15, C.ink); circle(442, -100, 6, C.white); }
  ctx.strokeStyle = '#075A4A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(458, -62, 32, 0.25 * PI, 0.8 * PI); ctx.stroke(); circle(476, -84, 4, '#075A4A');
  ctx.strokeStyle = C.cream; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(376, -146); ctx.quadraticCurveTo(378, -124, 388, -120); ctx.quadraticCurveTo(400, -122, 404, -144); ctx.stroke(); circle(390, -134, 5, C.red);
  // shell
  const dome = () => { ctx.beginPath(); ctx.moveTo(-300, 10); ctx.bezierCurveTo(-300, -150, -160, -214, 0, -214); ctx.bezierCurveTo(160, -214, 300, -150, 300, 10); ctx.closePath(); };
  dome(); ctx.fillStyle = lg(0, -214, 0, 10, ['#FFF1A8', '#7AE08A', '#19A86A', '#0B6B6F']); ctx.fill();
  ctx.save(); dome(); ctx.clip();
  ctx.strokeStyle = rgba(C.paleGold, 0.9); ctx.lineWidth = 8;
  const hexg = (cx, cy, r) => { ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i * PI / 3 + PI / 6; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.82); } ctx.closePath(); ctx.fillStyle = rg(cx - r * 0.3, cy - r * 0.3, 4, r * 1.2, [rgba('#FFF6DC', 0.55), rgba('#3DDC84', 0.1)]); ctx.fill(); ctx.stroke(); };
  for (let r = 0; r < 3; r++) for (let c = -3; c <= 3; c++) hexg(c * 108 + (r % 2) * 54, -170 + r * 84, 62);
  ell(-70, -170, 150, 26, rgba(C.white, 0.35), -0.12);
  ctx.restore();
  // rim
  ctx.beginPath(); ctx.moveTo(-312, 6); ctx.quadraticCurveTo(0, 60, 312, 6); ctx.quadraticCurveTo(318, 34, 290, 44); ctx.quadraticCurveTo(0, 96, -290, 44); ctx.quadraticCurveTo(-318, 34, -312, 6); ctx.closePath(); ctx.fillStyle = lg(0, 0, 0, 90, [C.paleGold, C.gold, '#B5720A']); ctx.fill();
  for (let i = -5; i <= 5; i++) circle(i * 52, 44 + (25 - i * i) * 0.9, 9, i % 2 ? C.red : C.cyan);
  // near flippers
  flipper(-190, 60, 0.7 - sw * 0.6, 170, lg(0, 0, 0, 170, [SK[0], SK[1], SK[2]])); flipper(200, 60, -0.5 + sw * 0.6, 180, lg(0, 0, 0, 180, [SK[0], SK[1], SK[2]]));
  ctx.restore();
}
/** Mount Mandara, the churning rod. x = axis, from yTop to yBase, base width w. spin = phase of rotation */
export function mandara(x, yTop, yBase, w, spin = 0) {
  const h = yBase - yTop, hw = (u) => w * 0.5 * lerp(0.34, 1, Math.pow(u, 0.8));
  const P = () => { ctx.beginPath(); ctx.moveTo(x, yTop - 30); for (let i = 0; i <= 20; i++) { const u = i / 20; ctx.lineTo(x + hw(u) + Math.sin(i * 2.3) * w * 0.035, yTop + u * h); } for (let i = 20; i >= 0; i--) { const u = i / 20; ctx.lineTo(x - hw(u) - Math.sin(i * 1.9 + 1) * w * 0.035, yTop + u * h); } ctx.closePath(); };
  glow(x, yTop, w * 0.9, C.gold, 0.35);
  P(); ctx.fillStyle = lg(x - w / 2, 0, x + w / 2, 0, ['#2A1F8A', '#4A6FE0', '#7AE0D0', '#3A8FD0', '#2A1F8A']); ctx.fill();
  ctx.save(); P(); ctx.clip();
  ctx.fillStyle = lg(0, yTop, 0, yBase, [rgba('#FFF1B8', 0.55), rgba('#3DDC84', 0.15), rgba('#150A4A', 0.45)]); ctx.fillRect(x - w, yTop - 40, w * 2, h + 80);
  ctx.lineCap = 'round';
  for (let k = 0; k < 9; k++) {   // ridges sliding sideways = the mountain turning
    const ph = ((spin + k * TAU / 9) % TAU + TAU) % TAU; if (ph > PI) continue; const c = Math.cos(ph), a = Math.sin(ph);
    ctx.strokeStyle = rgba(k % 2 ? '#150A4A' : C.cream, 0.28 * a); ctx.lineWidth = w * 0.045;
    ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; ctx.lineTo(x - c * hw(u) * 0.96 + Math.sin(i * 1.7 + k) * w * 0.02, yTop + u * h); } ctx.stroke();
    for (let j = 0; j < 4; j++) { const u = 0.18 + j * 0.2 + (k % 3) * 0.04; circle(x - c * hw(u) * 0.8, yTop + u * h, w * 0.05 * a + 3, rgba(j % 2 ? C.leaf : '#19A86A', 0.85 * a)); }
  }
  for (let b = 1; b < 6; b++) { const u = b / 6, yy = yTop + u * h; ctx.strokeStyle = rgba(C.paleGold, 0.35); ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, yy, hw(u), hw(u) * 0.14, 0, 0, PI); ctx.stroke(); }
  ctx.restore();
  lotus(x, yTop - 14, w * 0.0026, 1); circle(x, yTop - 60, w * 0.03, C.cream);
}
/** Vasuki wound round the mountain: three front coils. dx = how far the rope has slid (px) */
export function coils(x, y, hw, dx = 0, w = 40) {
  for (let i = 0; i < 3; i++) {
    const yy = y + i * w * 1.5, r = hw * (1.0 + i * 0.07), pts = [];
    for (let k = 0; k <= 24; k++) { const a = PI * k / 24; pts.push([x - Math.cos(a) * r, yy + Math.sin(a) * r * 0.2 + (k / 24) * w * 0.7]); }
    line(pts, '#064D3A', w); line(pts, lg(x - r, 0, x + r, 0, [C.emerald, C.leaf, C.emerald]), w * 0.72);
    ctx.save(); ctx.lineDashOffset = -dx; line(pts, rgba(C.paleGold, 0.9), w * 0.2, [w * 0.3, w * 0.7]); ctx.restore();
  }
}
/** Shiva (bust). origin = chest. o: t, blue (0..1 throat), drink (0..1 raises the cupped hand), trident */
export function shiva(x, y, s, o = {}) {
  const t = o.t || 0, SK = ['#8FB8E0', '#CFE6F8', '#F0FAFF'], dr = o.drink || 0, bl = o.blue || 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  glow(0, -200, 600, C.cyan, 0.35);
  if (o.trident !== false) { line([[330, 420], [330, -470]], lg(0, -470, 0, 420, [C.cream, C.gold, '#B5720A']), 20); ctx.strokeStyle = C.paleGold; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(250, -500); ctx.quadraticCurveTo(250, -400, 330, -400); ctx.quadraticCurveTo(410, -400, 410, -500); ctx.stroke(); line([[330, -400], [330, -560]], C.paleGold, 20);
    for (const tx of [250, 330, 410]) { ctx.beginPath(); ctx.moveTo(tx - 20, tx === 330 ? -550 : -490); ctx.lineTo(tx, tx === 330 ? -630 : -560); ctx.lineTo(tx + 20, tx === 330 ? -550 : -490); ctx.closePath(); ctx.fillStyle = C.cream; ctx.fill(); } circle(330, -380, 20, C.red); }
  // flowing hair behind
  ctx.beginPath(); ctx.moveTo(-130, -330); ctx.bezierCurveTo(-230, -200, -200, 0, -270, 120 + Math.sin(t * 2) * 10); ctx.lineTo(270, 120 - Math.sin(t * 2) * 10); ctx.bezierCurveTo(200, 0, 230, -200, 130, -330); ctx.closePath(); ctx.fillStyle = '#1A1238'; ctx.fill();
  // shoulders + chest
  ctx.beginPath(); ctx.moveTo(-250, 60); ctx.quadraticCurveTo(-260, -40, -150, -70); ctx.lineTo(150, -70); ctx.quadraticCurveTo(260, -40, 250, 60); ctx.lineTo(210, 480); ctx.lineTo(-210, 480); ctx.closePath(); ctx.fillStyle = lg(-250, 0, 250, 0, SK); ctx.fill();
  // tiger skin
  ctx.save(); ctx.beginPath(); ctx.moveTo(-250, 40); ctx.lineTo(-90, -70); ctx.lineTo(230, 480); ctx.lineTo(-215, 480); ctx.closePath(); ctx.fillStyle = lg(0, -70, 0, 480, ['#FFB03D', '#E0701A']); ctx.fill(); ctx.clip();
  ctx.strokeStyle = '#3A1A0A'; ctx.lineWidth = 16; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-260 + i * 20, 30 + i * 56); ctx.quadraticCurveTo(-140 + i * 22, 20 + i * 56, -80 + i * 34, 60 + i * 56); ctx.stroke(); } ctx.restore();
  // neck: the throat turns blue
  rr(-52, -150, 104, 110, 30); ctx.fillStyle = mix(SK[0], '#1438C8', bl); ctx.fill(); if (bl > 0) glow(0, -100, 150 * bl, '#3F7BFF', 0.9 * bl);
  // serpent + beads
  ctx.strokeStyle = '#064D3A'; ctx.lineWidth = 36; ctx.beginPath(); ctx.moveTo(-110, -60); ctx.bezierCurveTo(-90, 40, 90, 40, 110, -50); ctx.bezierCurveTo(140, -110, 190, -100, 180, -160); ctx.stroke();
  ctx.strokeStyle = C.emerald; ctx.lineWidth = 24; ctx.beginPath(); ctx.moveTo(-110, -60); ctx.bezierCurveTo(-90, 40, 90, 40, 110, -50); ctx.bezierCurveTo(140, -110, 190, -100, 180, -160); ctx.stroke();
  ell(180, -176, 34, 44, C.emerald); circle(168, -186, 6, C.gold); circle(192, -186, 6, C.gold);
  for (let i = 0; i <= 14; i++) { const u = i / 14, bx = lerp(-150, 150, u), by = -30 + Math.sin(u * PI) * 190; circle(bx, by, 17, i % 2 ? '#8A3A1A' : '#B5520A'); }
  // head
  circle(0, -260, 150, lg(-150, 0, 150, 0, [SK[1], SK[2]]));
  ctx.beginPath(); ctx.arc(0, -280, 154, PI * 1.0, PI * 2.0); ctx.quadraticCurveTo(70, -330, 0, -366); ctx.quadraticCurveTo(-70, -330, -154, -280); ctx.fillStyle = '#1A1238'; ctx.fill();
  // topknot + crescent + river
  circle(0, -470, 86, '#1A1238'); ell(0, -410, 120, 44, '#1A1238'); ctx.strokeStyle = '#8A5A2A'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, -440, 80, 0.1 * PI, 0.9 * PI); ctx.stroke();
  glow(-96, -470, 120, C.cream, 0.7); ctx.beginPath(); ctx.arc(-96, -470, 52, 0.25 * PI, 1.55 * PI); ctx.arc(-74, -486, 44, 1.45 * PI, 0.3 * PI, true); ctx.closePath(); ctx.fillStyle = C.cream; ctx.fill();
  ctx.strokeStyle = rgba(C.cyan, 0.9); ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(10, -556); ctx.quadraticCurveTo(70 + Math.sin(t * 4) * 10, -620, 40, -680); ctx.stroke(); circle(40, -690, 9, C.cyan);
  circle(-152, -240, 22, C.gold); circle(152, -240, 22, C.gold);
  // face
  for (let i = 0; i < 3; i++) line([[-70, -340 + i * 16], [70, -340 + i * 16]], rgba(C.cream, 0.95), 7);
  ell(0, -316, 13, 26, C.white); ell(0, -316, 7, 15, C.red);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 11; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 58, -262, 26, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(sd * 92, -296); ctx.quadraticCurveTo(sd * 58, -314, sd * 26, -296); ctx.stroke(); ctx.lineWidth = 11; }
  if (dr < 0.6) { ctx.strokeStyle = '#3A1238'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(0, -212, 34, 0.2 * PI, 0.8 * PI); ctx.stroke(); }
  // drinking arm
  if (dr > 0) { const hx = lerp(-250, -20, eo(dr)), hy = lerp(260, -168, eo(dr));
    ctx.strokeStyle = SK[0]; ctx.lineWidth = 96; ctx.beginPath(); ctx.moveTo(-230, 30); ctx.quadraticCurveTo(-330, 220, hx, hy); ctx.stroke(); ctx.strokeStyle = SK[1]; ctx.lineWidth = 78; ctx.beginPath(); ctx.moveTo(-230, 30); ctx.quadraticCurveTo(-330, 220, hx, hy); ctx.stroke();
    circle(lerp(-230, -300, 0.5), 110, 52, '#8A3A1A');
    const em = o.empty ? 1 : seg(dr, 0.85, 1); glow(hx, hy - 20, 150, '#7B3FE4', 0.8 * (1 - em)); ell(hx, hy, 70, 44, SK[2]); ell(hx, hy - 12, 52, 20, mix('#2A0A5A', SK[2], em)); }
  ctx.restore();
}
/** Kamadhenu, the wish-granting cow, facing right */
export function cow(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  glow(0, -30, 330, C.cream, 0.6);
  const W_ = ['#FFFFFF', '#FFF1DC', '#E8C8B0'];
  ctx.strokeStyle = W_[2]; ctx.lineWidth = 34; for (const lx of [-110, -60, 70, 120]) { ctx.beginPath(); ctx.moveTo(lx, 30); ctx.lineTo(lx, 150); ctx.stroke(); circle(lx, 160, 20, '#8A5A2A'); }
  ell(0, 0, 180, 96, lg(0, -96, 0, 96, W_)); circle(-70, -80, 60, W_[0]);
  ctx.strokeStyle = W_[1]; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-176, -20); ctx.quadraticCurveTo(-230, 20 + Math.sin(t * 3) * 14, -216, 90); ctx.stroke(); circle(-216, 100, 18, '#8A5A2A');
  ctx.lineWidth = 70; ctx.strokeStyle = W_[0]; ctx.beginPath(); ctx.moveTo(140, -30); ctx.lineTo(200, -110); ctx.stroke();
  ell(230, -130, 74, 54, lg(160, 0, 300, 0, [W_[0], W_[1]]), 0.2); ell(280, -112, 34, 30, '#FFC8D0', 0.2);
  circle(274, -116, 5, '#8A3A4A'); circle(292, -106, 5, '#8A3A4A'); circle(232, -146, 11, C.ink); circle(236, -150, 4, C.white);
  ell(178, -150, 34, 16, W_[2], -0.5);
  for (const hx of [196, 240]) { ctx.beginPath(); ctx.moveTo(hx - 12, -176); ctx.quadraticCurveTo(hx - 6, -236, hx + 28, -250); ctx.quadraticCurveTo(hx + 10, -210, hx + 14, -176); ctx.closePath(); ctx.fillStyle = lg(0, -250, 0, -176, [C.cream, C.gold]); ctx.fill(); }
  rr(-90, -98, 170, 110, 20); ctx.fillStyle = lg(0, -98, 0, 12, [C.pink, C.magenta]); ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.stroke(); for (let i = -1; i <= 1; i++) circle(-5 + i * 50, -44, 12, C.paleGold);
  for (let i = 0; i <= 8; i++) { const u = i / 8; circle(lerp(150, 220, u), -60 + Math.sin(u * PI) * 50, 11, i % 2 ? C.saffron : C.pink); }
  ell(40, 96, 40, 22, '#FFC8D0');
  ctx.restore();
}
/** Halahala: roiling poison smoke. a = amount 0..1 */
export function poison(x, y, s, t, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= clamp(a);
  glow(0, -200, 700, '#7BFF4A', 0.3);
  for (let i = 0; i < 46; i++) { const u = i / 46, an = i * 2.4 + t * (0.6 + rnd(i) * 0.8), r = 60 + u * 420, cx = Math.cos(an) * r * 0.55 * (0.4 + u), cy = -u * 760 + Math.sin(an) * 40;
    circle(cx, cy, 70 + rnd(i * 3) * 110 * (0.5 + u), ['#1A0638', '#3A0A6A', '#12301A', '#2A0A4A'][i % 4]); }
  for (let i = 0; i < 16; i++) { const p = ((t * 0.5 + i / 16) % 1); circle(Math.sin(i * 5) * 240, -p * 760, 16 * (1 - p) + 5, rgba('#9BFF5A', 0.9 * (1 - p))); }
  for (const [ex, ey] of [[-90, -330], [110, -480]]) { glow(ex, ey, 60, '#9BFF5A', 0.9); ell(ex, ey, 26, 14, '#D8FFB0'); }
  ctx.restore();
}
/** the kalasha: pot of amrita, brimming with light */
export function kalasha(x, y, s, t, g = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rays(0, -40, 520, t, C.cream, 0.5 * g, 14); glow(0, -40, 360, C.gold, 0.9 * g); glow(0, -90, 170, C.cream, g);
  for (let i = -2; i <= 2; i++) { ctx.save(); ctx.translate(i * 14, -86); ctx.rotate(i * 0.42); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-22, -40, -16, -96, 0, -120); ctx.bezierCurveTo(16, -96, 22, -40, 0, 0); ctx.fillStyle = lg(0, -120, 0, 0, [C.leaf, C.forest]); ctx.fill(); ctx.restore(); }
  circle(0, -116, 40, lg(-40, 0, 40, 0, ['#8A5A2A', '#C98A4A'])); circle(0, -150, 9, C.cream);
  pot(0, 0, 1);
  for (let i = 0; i < 7; i++) { const p = ((t * 0.6 + i / 7) % 1); sparkle(Math.sin(i * 2.6) * 110, -100 - p * 260, 24 * (1 - p * 0.5), (1 - p) * g, C.cream); }
  ctx.restore();
}
export function crescent(x, y, r, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; glow(x, y, r * 2.6, C.cream, 0.6);
  ctx.beginPath(); ctx.arc(x, y, r, 0.3 * PI, 1.7 * PI); ctx.arc(x + r * 0.42, y, r * 0.82, 1.62 * PI, 0.38 * PI, true); ctx.closePath(); ctx.fillStyle = lg(0, y - r, 0, y + r, [C.white, C.cream, '#FFE9A8']); ctx.fill(); ctx.restore();
}
/** Kalpavriksha: the wish-fulfilling tree, hung with jewels */
export function wishTree(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; glow(0, -300, 420, C.gold, 0.5);
  ctx.strokeStyle = lg(0, -300, 0, 0, [C.gold, '#B5720A']); ctx.lineWidth = 40; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-24, -160, 6, -300); ctx.stroke();
  ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(-6, -200); ctx.quadraticCurveTo(-90, -250, -130, -330); ctx.moveTo(0, -220); ctx.quadraticCurveTo(90, -260, 130, -340); ctx.stroke();
  for (const [cx, cy, r] of [[0, -400, 140], [-130, -340, 100], [130, -350, 104], [-50, -490, 92], [70, -480, 88]]) circle(cx, cy, r, rg(cx - r * 0.3, cy - r * 0.3, 8, r * 1.2, ['#FFF1A8', '#5ADC9A', '#0B8B6F']));
  for (let i = 0; i < 16; i++) { const an = rnd(i) * TAU, r = rnd(i * 3) * 190; const jx = Math.cos(an) * r, jy = -400 + Math.sin(an) * r * 0.8; circle(jx, jy, 13, [C.red, C.cyan, C.gold, C.pink][i % 4]); sparkle(jx, jy, 16, 0.5 + 0.5 * Math.sin(t * 5 + i), C.white); }
  ctx.restore();
}
export function coins(t, n = 26, seed = 0, a = 1) {
  for (let i = 0; i < n; i++) { const sp = 260 + rnd(i + seed) * 220, y = ((rnd(i * 3 + seed) * (H + 300) + t * sp) % (H + 300)) - 150, x = rnd(i * 7 + seed) * (W + 100) - 50, sq = Math.abs(Math.cos(t * 5 + i));
    ctx.save(); ctx.globalAlpha *= a; ell(x, y, 22 * sq + 3, 22, lg(x - 22, 0, x + 22, 0, ['#B5720A', C.gold, C.cream, C.gold])); ell(x, y, 12 * sq + 1, 12, rgba('#B5720A', 0.5)); ctx.restore(); }
}
