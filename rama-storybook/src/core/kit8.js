// Storybook kit: soft-focus backdrops, bokeh, and the paper-puppet rig (thin ink outline, jointed limbs, big eyes).
import { ctx, setCtx, C, W, H, TAU, lerp, clamp, rnd, seg, eo, rr, circle, ell, line, lg, rg, glow, rgba, mix } from './lib.js';

const PI = Math.PI, INK = '#2B1B14';

// ═════════════════════════ BACKDROP ═════════════════════════
const b1 = document.createElement('canvas'); b1.width = 270; b1.height = 480; const x1 = b1.getContext('2d');
const b2 = document.createElement('canvas'); b2.width = 270; b2.height = 480; const x2 = b2.getContext('2d');
/** draw fn() out of focus: rendered small, blurred, and scaled up behind the puppets. blur in small-canvas px (2-5) */
export function backdrop(fn, blur = 3, dim = 0) {
  const prev = ctx; setCtx(x1);
  x1.setTransform(0.25, 0, 0, 0.25, 0, 0); x1.globalAlpha = 1; x1.globalCompositeOperation = 'source-over'; x1.fillStyle = '#000'; x1.fillRect(0, 0, W, H);
  x1.save(); fn(); x1.restore(); setCtx(prev);
  x2.setTransform(1, 0, 0, 1, 0, 0); x2.filter = `blur(${blur}px)`; x2.drawImage(b1, 0, 0); x2.filter = 'none';
  prev.save(); prev.imageSmoothingEnabled = true; prev.imageSmoothingQuality = 'high'; prev.drawImage(b2, 6, 6, 258, 468, -40, -70, W + 80, H + 140); prev.restore();
  if (dim) { prev.fillStyle = rgba('#0A0402', dim); prev.fillRect(-200, -200, W + 400, H + 400); }
}
/** drifting discs of light */
export function bokeh(t, n = 16, col = '#FFD9A0', a = 0.2, seed = 0, yMax = 1500) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const r = 30 + rnd(i * 3 + seed) * 90, x = rnd(i + seed) * (W + 200) - 100 + Math.sin(t * 0.3 + i) * 30, y = ((rnd(i * 7 + seed) * yMax - t * (8 + rnd(i) * 14)) % yMax + yMax) % yMax, al = a * (0.4 + 0.6 * Math.sin(t * 0.8 + i * 2) ** 2);
    ctx.fillStyle = rg(x, y, 0, r, [rgba(col, al), [0.7, rgba(col, al * 0.8)], [1, rgba(col, 0)]]); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
  ctx.restore();
}
/** hanging marigold strings (sharp, in front of the backdrop) */
export function marigolds(t, n = 7, len = 520, seed = 0) {
  for (let i = 0; i < n; i++) { const x = 60 + i * (960 / (n - 1)) + rnd(i + seed) * 30, l = len * (0.6 + rnd(i * 3 + seed) * 0.5), sw = Math.sin(t * 0.9 + i) * 10;
    for (let k = 0; k < l / 30; k++) { const y = -20 + k * 30, xx = x + sw * (k * 30 / l); circle(xx, y, 15, k % 3 === 2 ? '#FFD23D' : '#FF8A1F'); circle(xx - 4, y - 4, 6, rgba('#FFF1B8', 0.5)); }
    circle(x + sw, -20 + l, 22, '#E0401A'); }
}
export function leaves(t, side = 1) {
  ctx.save(); ctx.globalAlpha = 0.85;
  for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(side > 0 ? W + 60 : -60, 420 + i * 150); ctx.rotate((side > 0 ? PI : 0) + (i - 1.5) * 0.28 * side + Math.sin(t * 0.7 + i) * 0.03); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(140, -90, 420, -70, 560, 0); ctx.bezierCurveTo(420, 70, 140, 90, 0, 0); ctx.fillStyle = lg(0, 0, 560, 0, ['#2E8B3A', '#5FC25A']); ctx.fill(); line([[10, 0], [540, 0]], rgba('#1F6A2A', 0.6), 5); ctx.restore(); }
  ctx.restore();
}

// ═════════════════════════ PUPPET ═════════════════════════
const SKIN = { tan: ['#C98A5E', '#E3A878'], fair: ['#E2B089', '#F3CDA6'], blue: ['#6D97D8', '#9EC0F0'], dark: ['#8A5A40', '#A8765A'], fur: ['#C9702A', '#E89A4A'], demon: ['#8A4A5A', '#B06A78'] };
export const WHO = {
  ramaForest: { skin: 'blue', head: 'jata', top: 'bare', drape: ['#F2A04A', '#C9601A'], mala: true, quiver: true, tilak: 'v', bottom: 'dhoti', bottomCol: ['#F6B25A', '#D9782A'] },
  ramaRoyal: { skin: 'blue', head: 'crown', top: 'kurta', topCol: ['#FFF4D6', '#F2DDA8'], sash: ['#C0273A', '#8A1226'], pearls: true, tilak: 'v', bottom: 'dhoti', bottomCol: ['#FFF4D6', '#EBD49A'] },
  ramaBoy: { skin: 'blue', head: 'crown', top: 'bare', drape: ['#FFD86B', '#F2A01F'], mala: true, tilak: 'v', bottom: 'dhoti', bottomCol: ['#FFE08A', '#F2A01F'] },
  lakshmana: { skin: 'tan', head: 'jata', top: 'bare', drape: ['#F2A04A', '#C9601A'], mala: true, quiver: true, tilak: 'v', bottom: 'dhoti', bottomCol: ['#F6B25A', '#D9782A'] },
  sitaBride: { skin: 'fair', head: 'veil', veilCol: ['#D93A4A', '#A81830'], top: 'blouse', topCol: ['#D12F3E', '#A81830'], bottom: 'skirt', bottomCol: ['#D12F3E', '#8A1226'], necklace: true, tilak: 'bindi', female: true },
  sitaForest: { skin: 'fair', head: 'veil', veilCol: ['#F6C63D', '#E89A1F'], top: 'blouse', topCol: ['#F2B52A', '#D9861A'], bottom: 'skirt', bottomCol: ['#F2B52A', '#C96A14'], necklace: true, tilak: 'bindi', female: true },
  queen: { skin: 'fair', head: 'veil', veilCol: ['#E77FB0', '#B8427A'], top: 'blouse', topCol: ['#D95C98', '#A82E6A'], bottom: 'skirt', bottomCol: ['#D95C98', '#8A1F58'], necklace: true, tilak: 'bindi', female: true },
  kaikeyi: { skin: 'fair', head: 'veil', veilCol: ['#7A4AC8', '#4A1F90'], top: 'blouse', topCol: ['#6A3AB8', '#3A1680'], bottom: 'skirt', bottomCol: ['#6A3AB8', '#2A0E66'], necklace: true, tilak: 'bindi', female: true },
  dasharatha: { skin: 'tan', head: 'kingcrown', top: 'kurta', topCol: ['#F2B04A', '#D9781A'], sash: ['#C0273A', '#8A1226'], pearls: true, beard: '#F4EEE0', tilak: 'v', bottom: 'dhoti', bottomCol: ['#F2B04A', '#C9601A'] },
  hanuman: { skin: 'fur', head: 'monkey', top: 'bare', mala: true, sash: ['#D93A2A', '#A81818'], tilak: 'v', bottom: 'dhoti', bottomCol: ['#D93A2A', '#9A1414'], tail: true },
  ravana: { skin: 'demon', head: 'kingcrown', top: 'kurta', topCol: ['#5A1030', '#2A0418'], sash: ['#E0A82A', '#B5720A'], pearls: true, mustache: true, bottom: 'dhoti', bottomCol: ['#3A0A30', '#1A0418'], heads: true },
};
const stroke = (lw) => { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); };
function fillStroke(fill, lw) { ctx.fillStyle = fill; ctx.fill(); stroke(lw); }
function limb(ax, ay, bx, by, w, fill, lw) { ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = w + lw * 2; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.strokeStyle = fill; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); }

function face(o, lw, sk, t) {
  const e = o.eyes || 'open', fem = o.female, look = o.look || [0, 0], blink = ((t * 0.31 + (o.ph || 0)) % 1) < 0.035;
  ell(-44, -74, 20, 12, rgba('#F27A8A', fem ? 0.32 : 0.2)); ell(44, -74, 20, 12, rgba('#F27A8A', fem ? 0.32 : 0.2));
  for (const sd of [-1, 1]) {
    const ex = sd * 31, ey = -106;
    ctx.lineCap = 'round';
    const tilt = e === 'sad' ? sd * 0.2 : e === 'angry' ? -sd * 0.3 : 0;
    ctx.save(); ctx.translate(ex, ey - 27); ctx.rotate(tilt); ctx.beginPath(); ctx.moveTo(-17, 2); ctx.quadraticCurveTo(0, e === 'wide' ? -12 : -7, 17, 2); ctx.strokeStyle = INK; ctx.lineWidth = lw * 1.25; ctx.stroke(); ctx.restore();
    if (e === 'closed' || e === 'happy' || blink) { ctx.beginPath(); if (e === 'happy') ctx.arc(ex, ey + 6, 16, PI * 1.12, PI * 1.88); else ctx.arc(ex, ey - 4, 16, PI * 0.14, PI * 0.86); ctx.strokeStyle = INK; ctx.lineWidth = lw * 1.5; ctx.stroke(); if (fem) { line([[ex + sd * 15, ey + (e === 'happy' ? 0 : 6)], [ex + sd * 24, ey + (e === 'happy' ? -6 : 2)]], INK, lw); } continue; }
    const hgt = e === 'wide' ? 17 : e === 'angry' ? 10 : 13;
    ctx.beginPath(); ctx.ellipse(ex, ey, 19, hgt, 0, 0, TAU); ctx.fillStyle = '#FFFDF6'; ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, 19, hgt, 0, 0, TAU); ctx.clip(); circle(ex + look[0], ey + look[1] + 1, 12.5, o.iris || '#6A3A1F'); circle(ex + look[0], ey + look[1] + 1, 6.5, '#1A0E0A'); circle(ex + look[0] + 4, ey + look[1] - 4, 3.6, '#FFFFFF'); ctx.restore();
    ctx.beginPath(); ctx.moveTo(ex - 20, ey + 1); ctx.quadraticCurveTo(ex, ey - hgt * 1.5, ex + 20, ey + 1); ctx.strokeStyle = INK; ctx.lineWidth = lw * 1.6; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ex - 15, ey + hgt * 0.8); ctx.quadraticCurveTo(ex, ey + hgt * 1.15, ex + 15, ey + hgt * 0.8); ctx.lineWidth = lw * 0.6; ctx.stroke();
    if (fem) line([[ex + sd * 19, ey - 1], [ex + sd * 28, ey - 8]], INK, lw * 1.1);
    if (e === 'sad') circle(ex + sd * 6, ey + 26 + ((t * 26) % 26), 4.5, '#BFE6FF');
  }
  ctx.beginPath(); ctx.moveTo(1, -98); ctx.lineTo(6, -76); ctx.lineTo(-3, -74); ctx.strokeStyle = rgba(INK, 0.7); ctx.lineWidth = lw * 0.8; ctx.lineJoin = 'round'; ctx.stroke();
  const m = o.mouth || (e === 'sad' ? 'sad' : e === 'angry' ? 'grim' : e === 'wide' ? 'o' : 'smile');
  ctx.strokeStyle = fem ? '#A8283A' : '#6A2A1A'; ctx.lineWidth = lw * 1.1; ctx.lineCap = 'round'; ctx.beginPath();
  if (m === 'smile') ctx.arc(0, -64, 16, PI * 0.2, PI * 0.8); else if (m === 'sad') ctx.arc(0, -40, 14, PI * 1.25, PI * 1.75); else if (m === 'grim') { ctx.moveTo(-14, -52); ctx.lineTo(14, -54); } else { ctx.ellipse(0, -52, 8, 10, 0, 0, TAU); }
  ctx.stroke(); if (m === 'o') { ctx.fillStyle = '#5A1A1A'; ctx.fill(); }
}
function crownShape(lw, king) {
  const g = lg(0, -300, 0, -160, ['#FFF1B0', '#F2C23D', '#C98A1A']);
  if (king) { ctx.beginPath(); ctx.moveTo(-74, -160); ctx.lineTo(-88, -262); ctx.lineTo(-46, -214); ctx.lineTo(0, -306); ctx.lineTo(46, -214); ctx.lineTo(88, -262); ctx.lineTo(74, -160); ctx.closePath(); fillStroke(g, lw); }
  else { ctx.beginPath(); ctx.moveTo(-74, -160); ctx.bezierCurveTo(-92, -196, -70, -214, -62, -220); ctx.lineTo(-40, -262); ctx.lineTo(-18, -280); ctx.lineTo(0, -312); ctx.lineTo(18, -280); ctx.lineTo(40, -262); ctx.lineTo(62, -220); ctx.bezierCurveTo(70, -214, 92, -196, 74, -160); ctx.closePath(); fillStroke(g, lw);
    for (const yy of [-222, -262]) { ctx.beginPath(); ctx.moveTo(-60 + (yy + 222) * -0.5, yy); ctx.quadraticCurveTo(0, yy + 12, 60 - (yy + 222) * -0.5, yy); ctx.strokeStyle = rgba('#8A5A0A', 0.7); ctx.lineWidth = lw; ctx.stroke(); } }
  rr(-80, -178, 160, 26, 10); fillStroke('#FFE08A', lw);
  for (let i = -3; i <= 3; i++) circle(i * 22, -165, 6, i % 2 ? '#D12F3E' : '#2E9A6A');
  circle(0, -206, 10, '#D12F3E'); circle(0, -246, 8, '#2E9A6A'); circle(0, -312, 7, '#FFF6DC');
}
function miniHead(x, y, r, sk, lw, k) {
  ctx.save(); ctx.translate(x, y); ctx.scale(r / 70, r / 70);
  ctx.beginPath(); ctx.moveTo(-62, -40); ctx.lineTo(-72, -122); ctx.lineTo(-36, -86); ctx.lineTo(0, -146); ctx.lineTo(36, -86); ctx.lineTo(72, -122); ctx.lineTo(62, -40); ctx.closePath(); fillStroke(lg(0, -146, 0, -40, ['#FFF1B0', '#F2C23D', '#C98A1A']), lw * 1.4);
  ctx.beginPath(); ctx.ellipse(0, 0, 64, 72, 0, 0, TAU); fillStroke(lg(-64, 0, 64, 0, sk), lw * 1.4);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 24, -8, 15, 9, 0, 0, TAU); ctx.fillStyle = '#FFF6DC'; ctx.fill(); circle(sd * 24, -8, 7, '#B0182A'); line([[sd * 6, -28], [sd * 42, -36]], INK, lw * 2); }
  ctx.strokeStyle = INK; ctx.lineWidth = lw * 2.4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 26); ctx.bezierCurveTo(-18, 14, -38, 30, -48, 12); ctx.moveTo(0, 26); ctx.bezierCurveTo(18, 14, 38, 30, 48, 12); ctx.stroke();
  ctx.restore();
}
/** A paper puppet. origin = base of the neck; shoulders ±100, waist y 250, hem ≈ 640. (x, y, s, { ...WHO.x, eyes, mouth, look, armL: [shoulder, elbow], armR, holdL(fn), holdR(fn), tilt, lean, t, ph, flip, a }) */
export function puppet(x, y, s, o = {}) {
  const t = o.t || 0, ph = o.ph || 0, lw = 3.4 / s, sk = SKIN[o.skin || 'tan'], skG = lg(-90, 0, 90, 0, [sk[0], sk[1]]);
  const armL = o.armL || [0.12, 0.1], armR = o.armR || [0.12, 0.1];
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.lean || 0) + Math.sin(t * 1.1 + ph) * 0.012); ctx.scale(s * (o.flip ? -1 : 1), s * (1 + Math.sin(t * 1.7 + ph) * 0.004)); ctx.globalAlpha *= o.a ?? 1; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ell(0, 560, 190, 40, rgba('#0A0402', 0.22));
  // extra heads (Ravana)
  if (o.heads) { for (let i = 5; i >= 1; i--) { miniHead(-i * 96 - 20, -84 + i * 6, 62 - i * 5, sk, lw, i); if (i <= 4) miniHead(i * 96 + 20, -84 + i * 6, 62 - i * 5, sk, lw, i); } }
  // tail
  if (o.tail) { const pts = []; for (let i = 0; i <= 18; i++) { const u = i / 18; pts.push([-70 - u * 210 - Math.sin(u * 3 + t * 1.5) * 40 * u, 300 - Math.sin(u * PI * 0.85) * 420]); } ctx.strokeStyle = INK; ctx.lineWidth = 40 + lw * 2; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.strokeStyle = sk[0]; ctx.lineWidth = 40; ctx.stroke(); if (o.tailFn) o.tailFn(pts[18][0], pts[18][1]); }
  // quiver
  if (o.quiver) { ctx.save(); ctx.translate(92, -6); ctx.rotate(0.42); for (let i = 0; i < 3; i++) { const ax = -18 + i * 18; line([[ax, -40], [ax, -150 - i * 10]], '#E8D8B8', 5); ctx.beginPath(); ctx.moveTo(ax, -150 - i * 10); ctx.lineTo(ax - 20, -96 - i * 10); ctx.lineTo(ax, -108 - i * 10); ctx.lineTo(ax + 20, -96 - i * 10); ctx.closePath(); fillStroke(i % 2 ? '#F6EFE2' : '#D93A3A', lw); }
    rr(-34, -60, 68, 230, 16); fillStroke(lg(-34, 0, 34, 0, ['#8A4A1A', '#C9802A']), lw); rr(-38, -64, 76, 24, 10); fillStroke('#F2C23D', lw); ctx.restore(); }
  // veil + hair behind
  if (o.head === 'veil') { ctx.beginPath(); ctx.moveTo(0, -214); ctx.bezierCurveTo(-120, -214, -128, -90, -132, 40); ctx.lineTo(-176, 250 + Math.sin(t * 1.3 + ph) * 6); ctx.lineTo(-70, 210); ctx.lineTo(70, 210); ctx.lineTo(176, 250 - Math.sin(t * 1.3 + ph) * 6); ctx.lineTo(132, 40); ctx.bezierCurveTo(128, -90, 120, -214, 0, -214); ctx.closePath(); fillStroke(lg(0, -214, 0, 250, o.veilCol), lw); }
  else if (o.head !== 'monkey') { ctx.beginPath(); ctx.moveTo(-76, -130); ctx.quadraticCurveTo(-96, -40, -78, 6); ctx.lineTo(78, 6); ctx.quadraticCurveTo(96, -40, 76, -130); ctx.closePath(); fillStroke(o.beard ? '#D8D0C0' : '#2A1A1E', lw); }
  // lower body
  if (o.bottom === 'skirt') { ctx.beginPath(); ctx.moveTo(-80, 240); ctx.bezierCurveTo(-140, 380, -176, 520, -188, 700); ctx.lineTo(188, 700); ctx.bezierCurveTo(176, 520, 140, 380, 80, 240); ctx.closePath(); fillStroke(lg(0, 240, 0, 700, o.bottomCol), lw);
    ctx.save(); ctx.clip(); for (let r = 0; r < 6; r++) for (let c = -4; c <= 4; c++) { const dx = c * 44 + (r % 2) * 22, dy = 310 + r * 64; ctx.save(); ctx.translate(dx * (1 + r * 0.06), dy); ctx.rotate(PI / 4); ctx.fillStyle = rgba('#FFE08A', 0.75); ctx.fillRect(-5, -5, 10, 10); ctx.restore(); }
    for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(i * 20, 250); ctx.quadraticCurveTo(i * 40, 470, i * 54, 700); ctx.strokeStyle = rgba(INK, 0.16); ctx.lineWidth = lw; ctx.stroke(); } ctx.restore(); }
  else { ctx.beginPath(); ctx.moveTo(-88, 240); ctx.lineTo(-110, 660); ctx.lineTo(-10, 660); ctx.lineTo(0, 420); ctx.lineTo(10, 660); ctx.lineTo(110, 660); ctx.lineTo(88, 240); ctx.closePath(); fillStroke(lg(0, 240, 0, 660, o.bottomCol || ['#F6B25A', '#D9782A']), lw);
    for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(sd * (30 + i * 28), 270); ctx.quadraticCurveTo(sd * (44 + i * 30), 460, sd * (36 + i * 36), 650); ctx.strokeStyle = rgba(INK, 0.22); ctx.lineWidth = lw; ctx.stroke(); } }
  // arms
  const arm = (sd, a, hold, sleeve) => { const S = [sd * 102, 28], d1 = PI / 2 - sd * a[0], E = [S[0] + Math.cos(d1) * 150, S[1] + Math.sin(d1) * 150], d2 = d1 - sd * a[1], Hd = [E[0] + Math.cos(d2) * 138, E[1] + Math.sin(d2) * 138];
    const c1 = sleeve >= 1 ? o.topCol[0] : sk[0], c2 = sleeve >= 2 ? o.topCol[1] : sk[1];
    limb(E[0], E[1], Hd[0], Hd[1], 40, c2, lw); limb(S[0], S[1], E[0], E[1], 46, c1, lw);
    ctx.beginPath(); ctx.arc(E[0], E[1], 23, d1 + PI * 0.75, d1 + PI * 1.25); ctx.strokeStyle = rgba(INK, 0.5); ctx.lineWidth = lw; ctx.stroke();
    if (!sleeve && !o.female && o.head !== 'monkey') { for (let i = 0; i < 5; i++) { const u = 0.36, bx = lerp(S[0], E[0], u) + Math.cos(d1 + PI / 2) * (i - 2) * 10, by = lerp(S[1], E[1], u) + Math.sin(d1 + PI / 2) * (i - 2) * 10; circle(bx, by, 5.5, '#8A3A1A'); } }
    if (o.female) for (let i = 0; i < 3; i++) { const u = 0.78 + i * 0.08; limb(lerp(E[0], Hd[0], u) - Math.cos(d2 + PI / 2) * 19, lerp(E[1], Hd[1], u) - Math.sin(d2 + PI / 2) * 19, lerp(E[0], Hd[0], u) + Math.cos(d2 + PI / 2) * 19, lerp(E[1], Hd[1], u) + Math.sin(d2 + PI / 2) * 19, 5, i % 2 ? '#F2C23D' : '#D12F3E', lw * 0.5); }
    ctx.save(); ctx.translate(Hd[0], Hd[1]); ctx.rotate(d2 - PI / 2); ctx.beginPath(); ctx.moveTo(-20, -6); ctx.bezierCurveTo(-26, 30, -14, 52, 2, 54); ctx.bezierCurveTo(20, 52, 24, 26, 20, -6); ctx.closePath(); fillStroke(sk[1], lw); ctx.beginPath(); ctx.moveTo(sd * 18, 2); ctx.quadraticCurveTo(sd * 34, 14, sd * 24, 34); ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); line([[-6, 26], [-6, 46]], rgba(INK, 0.45), lw * 0.7); line([[6, 26], [6, 46]], rgba(INK, 0.45), lw * 0.7); ctx.restore();
    if (hold) { ctx.save(); ctx.translate(Hd[0], Hd[1] + 24); hold(d2); ctx.restore(); } };
  const sleeve = o.top === 'kurta' ? 2 : o.top === 'blouse' ? 2 : 0;
  if (armL[1] >= 0) arm(-1, armL, o.holdL, sleeve);
  // torso
  const torso = () => { ctx.beginPath(); ctx.moveTo(-104, 12); ctx.quadraticCurveTo(-108, -8, -70, -10); ctx.lineTo(70, -10); ctx.quadraticCurveTo(108, -8, 104, 12); ctx.lineTo(86, 250); ctx.lineTo(-86, 250); ctx.closePath(); };
  torso(); fillStroke(o.top === 'bare' ? skG : lg(0, -10, 0, 250, o.topCol), lw);
  if (o.head === 'monkey') { ctx.save(); torso(); ctx.clip(); ell(0, 120, 60, 100, rgba('#FFD9A8', 0.7)); ctx.restore(); }
  if (o.top === 'blouse') { ctx.save(); torso(); ctx.clip(); for (let r = 0; r < 5; r++) for (let c = -3; c <= 3; c++) { ctx.save(); ctx.translate(c * 46 + (r % 2) * 23, 40 + r * 46); ctx.rotate(PI / 4); ctx.fillStyle = rgba('#FFE08A', 0.75); ctx.fillRect(-5, -5, 10, 10); ctx.restore(); } ctx.restore(); line([[-80, 150], [80, 150]], rgba(INK, 0.25), lw); }
  if (o.drape) { ctx.beginPath(); ctx.moveTo(34, -10); ctx.lineTo(70, -10); ctx.quadraticCurveTo(108, -8, 104, 12); ctx.lineTo(100, 150); ctx.lineTo(-40, 250); ctx.lineTo(-86, 250); ctx.lineTo(-84, 196); ctx.closePath(); fillStroke(lg(100, 0, -80, 250, o.drape), lw);
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(56 + i * 16, -6); ctx.lineTo(-80 + i * 22, 236 - i * 6); ctx.strokeStyle = rgba('#FFF1C8', 0.5); ctx.lineWidth = lw; ctx.stroke(); } }
  if (o.sash) { ctx.beginPath(); ctx.moveTo(-104, 10); ctx.lineTo(-60, -10); ctx.lineTo(90, 210); ctx.lineTo(86, 250); ctx.lineTo(40, 250); ctx.closePath(); fillStroke(lg(-100, 0, 90, 250, o.sash), lw); line([[-78, 8], [62, 240]], rgba('#F2C23D', 0.9), lw * 1.4); }
  rr(-90, 232, 180, 30, 10); fillStroke(lg(0, 232, 0, 262, ['#FFE08A', '#D9A02A']), lw); circle(0, 247, 8, '#D12F3E');
  const beads = (x0, y0, x1, y1, sag, n, r, c1, c2) => { for (let i = 0; i <= n; i++) { const u = i / n; circle(lerp(x0, x1, u), lerp(y0, y1, u) + Math.sin(u * PI) * sag, r, i % 2 ? c1 : c2); } };
  if (o.mala) beads(-56, -4, 56, -4, 118, 22, 6.5, '#8A3A1A', '#A8522A');
  if (o.pearls) { beads(-60, -4, 60, -4, 150, 24, 6.5, '#FFF6E6', '#F2E4C8'); beads(-64, -2, 64, -2, 210, 26, 7, '#FFF6E6', '#D12F3E'); }
  if (o.necklace) { beads(-44, -2, 44, -2, 58, 14, 6.5, '#F2C23D', '#FFE08A'); circle(0, 60, 9, '#D12F3E'); }
  if (armL[1] < 0) arm(-1, armL, o.holdL, sleeve);
  arm(1, armR, o.holdR, sleeve);
  // neck + head
  ctx.save(); ctx.translate(0, -18); ctx.rotate(o.tilt || 0); ctx.translate(0, 18);
  rr(-24, -36, 48, 44, 10); fillStroke(sk[0], lw);
  if (o.head === 'monkey') { circle(-84, -112, 30, sk[0]); circle(84, -112, 30, sk[0]); circle(-84, -112, 15, '#F2B8A0'); circle(84, -112, 15, '#F2B8A0'); }
  else { ctx.beginPath(); ctx.ellipse(-76, -100, 13, 21, 0, 0, TAU); fillStroke(sk[0], lw); ctx.beginPath(); ctx.ellipse(76, -100, 13, 21, 0, 0, TAU); fillStroke(sk[0], lw); }
  ctx.beginPath(); ctx.moveTo(-74, -132); ctx.bezierCurveTo(-74, -204, 74, -204, 74, -132); ctx.lineTo(72, -86); ctx.bezierCurveTo(68, -40, 32, -16, 0, -16); ctx.bezierCurveTo(-32, -16, -68, -40, -72, -86); ctx.closePath(); fillStroke(lg(-74, 0, 74, 0, [sk[0], sk[1]]), lw);
  if (o.head === 'monkey') { ctx.beginPath(); ctx.moveTo(0, -150); ctx.bezierCurveTo(-64, -190, -70, -96, -50, -64); ctx.quadraticCurveTo(0, -22, 50, -64); ctx.bezierCurveTo(70, -96, 64, -190, 0, -150); ctx.fillStyle = '#F8D8B8'; ctx.fill(); ell(0, -62, 46, 34, '#F4C8A4'); }
  face({ ...o, mouth: o.mouth }, lw, sk, t);
  if (o.head === 'monkey') { circle(-8, -76, 3.5, '#8A3A1A'); circle(8, -76, 3.5, '#8A3A1A'); }
  if (o.mustache) { ctx.strokeStyle = INK; ctx.lineWidth = lw * 3; ctx.beginPath(); ctx.moveTo(0, -62); ctx.bezierCurveTo(-20, -74, -44, -54, -58, -72); ctx.moveTo(0, -62); ctx.bezierCurveTo(20, -74, 44, -54, 58, -72); ctx.stroke(); }
  if (o.beard) { ctx.beginPath(); ctx.moveTo(-60, -70); ctx.quadraticCurveTo(-54, 20, 0, 44); ctx.quadraticCurveTo(54, 20, 60, -70); ctx.quadraticCurveTo(30, -34, 0, -40); ctx.quadraticCurveTo(-30, -34, -60, -70); fillStroke(o.beard, lw); ctx.strokeStyle = o.beard; ctx.lineWidth = lw * 3; ctx.beginPath(); ctx.moveTo(0, -62); ctx.bezierCurveTo(-18, -72, -36, -58, -46, -68); ctx.moveTo(0, -62); ctx.bezierCurveTo(18, -72, 36, -58, 46, -68); ctx.stroke(); }
  // hair / headgear
  if (o.head === 'jata') { ctx.beginPath(); ctx.moveTo(-78, -116); ctx.bezierCurveTo(-88, -222, 88, -222, 78, -116); ctx.bezierCurveTo(56, -166, -56, -166, -78, -116); ctx.closePath(); fillStroke('#2A1A1E', lw);
    ctx.beginPath(); ctx.ellipse(0, -222, 50, 44, 0, 0, TAU); fillStroke('#2A1A1E', lw); for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 16, -262); ctx.quadraticCurveTo(i * 22, -224, i * 16, -184); ctx.strokeStyle = rgba('#6A4A4A', 0.6); ctx.lineWidth = lw; ctx.stroke(); }
    for (let i = -4; i <= 4; i++) circle(i * 12, -180 - Math.cos(i / 4 * PI / 2) * 6, 6, '#B5622A'); }
  else if (o.head === 'crown' || o.head === 'kingcrown') { ctx.beginPath(); ctx.moveTo(-78, -116); ctx.bezierCurveTo(-86, -196, 86, -196, 78, -116); ctx.bezierCurveTo(56, -160, -56, -160, -78, -116); ctx.closePath(); fillStroke(o.beard ? '#D8D0C0' : '#2A1A1E', lw); crownShape(lw, o.head === 'kingcrown'); }
  else if (o.head === 'veil') { ctx.beginPath(); ctx.moveTo(-70, -128); ctx.bezierCurveTo(-60, -182, 60, -182, 70, -128); ctx.bezierCurveTo(40, -156, 14, -160, 0, -150); ctx.bezierCurveTo(-14, -160, -40, -156, -70, -128); ctx.closePath(); fillStroke('#2A1A1E', lw);
    ctx.beginPath(); ctx.moveTo(-84, -70); ctx.bezierCurveTo(-96, -180, -50, -216, 0, -216); ctx.bezierCurveTo(50, -216, 96, -180, 84, -70); ctx.lineTo(70, -104); ctx.bezierCurveTo(70, -160, 36, -186, 0, -186); ctx.bezierCurveTo(-36, -186, -70, -160, -70, -104); ctx.closePath(); fillStroke(lg(0, -216, 0, -70, o.veilCol), lw);
    ctx.beginPath(); ctx.moveTo(-72, -96); ctx.bezierCurveTo(-72, -158, -36, -182, 0, -182); ctx.bezierCurveTo(36, -182, 72, -158, 72, -96); ctx.strokeStyle = '#F2C23D'; ctx.lineWidth = lw * 2.6; ctx.stroke();
    line([[0, -184], [0, -152]], '#F2C23D', lw * 1.4); circle(0, -146, 8, '#F2C23D'); circle(0, -146, 4, '#D12F3E');
    for (const sd of [-1, 1]) { circle(sd * 78, -76, 9, '#F2C23D'); ctx.beginPath(); ctx.moveTo(sd * 78 - 11, -64); ctx.lineTo(sd * 78 + 11, -64); ctx.lineTo(sd * 78 + 14, -44); ctx.lineTo(sd * 78 - 14, -44); ctx.closePath(); fillStroke('#F2C23D', lw * 0.7); } circle(9, -80, 3, '#F2C23D'); }
  else if (o.head === 'monkey') { ctx.beginPath(); ctx.moveTo(-60, -176); ctx.quadraticCurveTo(-46, -250, 0, -274); ctx.quadraticCurveTo(46, -250, 60, -176); ctx.closePath(); fillStroke(lg(0, -274, 0, -176, ['#FFF1B0', '#F2C23D', '#C98A1A']), lw); rr(-66, -190, 132, 24, 10); fillStroke('#FFE08A', lw); circle(0, -222, 9, '#D12F3E'); }
  // tilak
  if (o.tilak === 'v') { ctx.strokeStyle = '#FFF6E6'; ctx.lineWidth = lw * 1.6; ctx.beginPath(); ctx.moveTo(-9, -168); ctx.quadraticCurveTo(-9, -142, 0, -138); ctx.quadraticCurveTo(9, -142, 9, -168); ctx.stroke(); line([[0, -166], [0, -144]], '#D12F3E', lw * 1.6); }
  else if (o.tilak === 'bindi') circle(0, -134, 6.5, '#D12F3E');
  ctx.restore();
  ctx.restore();
}
/** serif title card */
export function serif(text, x, y, size, o = {}) {
  ctx.save(); ctx.globalAlpha *= o.a ?? 1; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'alphabetic'; ctx.font = `${o.italic ? 'italic ' : ''}${o.w || 500} ${size}px Cormorant`; ctx.letterSpacing = (o.ls || 0) + 'px';
  ctx.shadowColor = 'rgba(10,4,2,0.8)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 4; ctx.fillStyle = o.fill || '#FFF8EC'; ctx.fillText(text, x, y); ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; ctx.fillText(text, x, y); ctx.letterSpacing = '0px'; ctx.restore();
}
