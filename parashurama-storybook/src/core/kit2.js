// Luminous Myth, Ramayana cast: Rama, Sita, Lakshmana, Hanuman, Ravana, Jatayu, the Pushpaka chariot, Lanka, lamps.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, seg, eo, rr, circle, ell, line, lg, rg, glow, rgba, mix } from './lib.js';
import { sparkle, lotus } from './kit.js';

const PI = Math.PI;
const BLUE = ['#1E4FD0', '#3F7BFF', '#8FB8FF'], FAIR = ['#C98A5E', '#E6B088', '#F8D2A8'], TAN = [C.skinShade, C.skin, C.skinLight];
export const LOOK = {
  rama: { skin: BLUE, dhoti: ['#FFE36B', '#FFC83D', '#E88A1F'], sash: ['#5CE1A0', '#0B8B5F'], crown: 'prince' },
  ramaForest: { skin: BLUE, dhoti: ['#FFB85C', '#F28A2F', '#C9601A'], sash: ['#F8D2A8', '#D9A066'], crown: 'jata', bow: true },
  ramaKing: { skin: BLUE, dhoti: ['#FFE36B', '#FFC83D', '#E88A1F'], sash: ['#FF6FB5', '#E0218A'], crown: 'king' },
  lakshmana: { skin: FAIR, dhoti: ['#8FD8FF', '#3FA9F5', '#1257C8'], sash: ['#FFE36B', '#F2A01F'], crown: 'jata', bow: true },
  lakshmanaRoyal: { skin: FAIR, dhoti: ['#8FD8FF', '#3FA9F5', '#1257C8'], sash: ['#FFE36B', '#F2A01F'], crown: 'prince' },
  dasharatha: { skin: TAN, dhoti: [C.orange, C.saffron, '#D95A0A'], sash: [C.pink, C.magenta], crown: 'king', beard: true },
};

/** a male hero. origin = hips; standing: feet +330, head -284, crown top -430.
 *  o: look, s, face, lean, kneel, walk, hands [[lx,ly],[rx,ry]], eyes ('open'|'closed'|'wide'|'sad'), holding(x,y), pray, t */
export function hero(x, y, o = {}) {
  const k = o.look || LOOK.rama, s = o.s || 1, t = o.t || 0, hands = o.hands || [[-90, -40], [90, -40]], [sk0, sk1, sk2] = k.skin;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const dh = lg(0, -10, 0, 300, k.dhoti);
  if (o.kneel) {
    ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(-170, 20, -190, 110); ctx.quadraticCurveTo(-60, 150, 130, 120); ctx.quadraticCurveTo(150, 50, 70, -10); ctx.closePath(); ctx.fillStyle = lg(0, -10, 0, 140, k.dhoti); ctx.fill();
    ell(-190, 118, 46, 20, sk0); ctx.strokeStyle = rgba(C.gold, 0.9); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-170, 96); ctx.quadraticCurveTo(-40, 132, 126, 106); ctx.stroke();
  } else {
    const wk = o.walk ? Math.sin(t * 7) * 26 : 0;
    ell(-42 - wk, 322, 44, 18, sk0); ell(42 + wk, 322, 44, 18, sk0);
    ctx.beginPath(); ctx.moveTo(-76, -10); ctx.lineTo(-70 - wk, 300); ctx.lineTo(-12 - wk, 300); ctx.lineTo(0, 110); ctx.lineTo(12 + wk, 300); ctx.lineTo(70 + wk, 300); ctx.lineTo(76, -10); ctx.closePath(); ctx.fillStyle = dh; ctx.fill();
    ctx.strokeStyle = rgba(C.gold, 0.9); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-70 - wk, 290); ctx.lineTo(-12 - wk, 290); ctx.moveTo(12 + wk, 290); ctx.lineTo(70 + wk, 290); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(0, 210); ctx.lineTo(18, 0); ctx.closePath(); ctx.fillStyle = k.sash[1]; ctx.fill();
  }
  ctx.rotate(o.lean || 0);
  if (k.bow) { ctx.strokeStyle = lg(0, -340, 0, 60, [C.paleGold, C.gold, '#B5520A']); ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-120, -330); ctx.quadraticCurveTo(-190, -120, 60, 70); ctx.stroke(); line([[-120, -330], [60, 70]], rgba(C.cream, 0.8), 3); }
  // hair behind
  ctx.beginPath(); ctx.moveTo(-64, -290); ctx.quadraticCurveTo(-88, -200, -68, -166); ctx.lineTo(68, -166); ctx.quadraticCurveTo(88, -200, 64, -290); ctx.closePath(); ctx.fillStyle = C.hair; ctx.fill();
  // torso
  ctx.beginPath(); ctx.moveTo(-86, -196); ctx.quadraticCurveTo(-92, -214, -60, -218); ctx.lineTo(60, -218); ctx.quadraticCurveTo(92, -214, 86, -196); ctx.lineTo(66, 0); ctx.lineTo(-66, 0); ctx.closePath(); ctx.fillStyle = lg(-80, 0, 80, 0, [sk0, sk1, sk2]); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-84, -212); ctx.lineTo(-40, -216); ctx.lineTo(70, -8); ctx.lineTo(30, 0); ctx.closePath(); ctx.fillStyle = lg(0, -216, 0, 0, k.sash); ctx.fill();
  rr(-72, -16, 144, 30, 12); ctx.fillStyle = lg(0, -16, 0, 14, [C.paleGold, C.gold]); ctx.fill(); circle(0, -1, 10, C.red);
  ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -214, 46, 0.15 * PI, 0.85 * PI); ctx.stroke(); circle(0, -168, 10, k.crown === 'jata' ? '#8A5A2A' : C.cyan);
  // head
  rr(-20, -246, 40, 40, 10); ctx.fillStyle = sk0; ctx.fill();
  circle(0, -284, 60, lg(-60, 0, 60, 0, [sk1, sk2]));
  ctx.beginPath(); ctx.arc(0, -292, 61, PI * 1.02, PI * 1.98); ctx.quadraticCurveTo(0, -330, -61, -296); ctx.fillStyle = C.hair; ctx.fill();
  circle(-62, -272, 9, C.gold); circle(62, -272, 9, C.gold);
  if (k.crown === 'king') {
    ctx.beginPath(); ctx.moveTo(-60, -322); ctx.lineTo(-70, -392); ctx.lineTo(-36, -360); ctx.lineTo(0, -428); ctx.lineTo(36, -360); ctx.lineTo(70, -392); ctx.lineTo(60, -322); ctx.closePath(); ctx.fillStyle = lg(0, -428, 0, -322, [C.cream, C.gold, C.saffron]); ctx.fill();
    rr(-62, -334, 124, 20, 8); ctx.fillStyle = C.gold; ctx.fill(); circle(0, -366, 11, C.red); circle(-40, -324, 6, C.cyan); circle(40, -324, 6, C.cyan); circle(0, -428, 9, C.cream);
  } else if (k.crown === 'prince') {
    ctx.beginPath(); ctx.moveTo(-62, -326); ctx.quadraticCurveTo(-50, -396, 0, -416); ctx.quadraticCurveTo(50, -396, 62, -326); ctx.closePath(); ctx.fillStyle = lg(0, -416, 0, -326, [C.cream, C.gold, C.saffron]); ctx.fill();
    rr(-64, -338, 128, 20, 8); ctx.fillStyle = C.paleGold; ctx.fill(); circle(0, -368, 11, C.red); circle(0, -420, 9, C.cyan);
    ctx.save(); ctx.translate(30, -400); ctx.rotate(0.5); ell(0, -30, 16, 34, C.emerald); ell(0, -26, 9, 17, C.ocean); circle(0, -22, 5, C.gold); ctx.restore();
  } else {   // jata: matted topknot of the forest years
    circle(0, -356, 40, C.hair); ell(0, -330, 56, 22, C.hair); ctx.strokeStyle = '#8A5A2A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, -340, 36, 0.1 * PI, 0.9 * PI); ctx.stroke();
  }
  // face
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; const e = o.eyes || 'open', sad = e === 'sad';
  if (e === 'closed' || sad) { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 22, -288, 10, 0.1 * PI, 0.9 * PI); ctx.stroke(); } }
  else { const r = e === 'wide' ? 11 : 8; for (const sd of [-1, 1]) { if (e === 'wide') circle(sd * 22, -288, 14, C.white); circle(sd * 22 + (o.lookX || 0), -288 + (o.lookY || 0), r, C.ink); circle(sd * 22 + 3 + (o.lookX || 0), -291, 3, C.white); } }
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 34, -306 + (sad ? 6 : 0)); ctx.quadraticCurveTo(sd * 22, -312, sd * 10, -306 - (sad ? 6 : 0)); ctx.stroke(); }
  if (sad) { circle(-30, -268 + ((t * 30) % 30), 5, C.cyan); }
  if (k.beard) { ctx.beginPath(); ctx.moveTo(-46, -270); ctx.quadraticCurveTo(-40, -200, 0, -186); ctx.quadraticCurveTo(40, -200, 46, -270); ctx.quadraticCurveTo(0, -244, -46, -270); ctx.fillStyle = C.cream; ctx.fill(); ctx.strokeStyle = C.cream; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-26, -262); ctx.quadraticCurveTo(-10, -272, 0, -264); ctx.quadraticCurveTo(10, -272, 26, -262); ctx.stroke(); }
  ctx.strokeStyle = '#3A0F2A'; ctx.lineWidth = 4; ctx.beginPath(); if (sad) ctx.arc(0, -246, 12, 1.2 * PI, 1.8 * PI); else ctx.arc(0, -262, 13, 0.2 * PI, 0.8 * PI); ctx.stroke();
  ctx.strokeStyle = C.cream; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-7, -322); ctx.quadraticCurveTo(-7, -306, 0, -303); ctx.quadraticCurveTo(7, -306, 7, -322); ctx.stroke(); circle(0, -312, 4, C.red);
  // arms
  [[-84, -196, hands[0], -1], [84, -196, hands[1], 1]].forEach(([sx, sy, h, side]) => {
    const mx = (sx + h[0]) / 2, my = (sy + h[1]) / 2, len = Math.hypot(h[0] - sx, h[1] - sy) || 1, bend = Math.max(0, 150 - len) * 0.55 + 14, ex = mx + side * bend * 0.9, ey = my + bend * 0.6;
    ctx.strokeStyle = sk0; ctx.lineWidth = 38; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(h[0], h[1]); ctx.stroke();
    ctx.strokeStyle = sk1; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(h[0], h[1]); ctx.stroke();
    circle(h[0], h[1], 22, sk2);
    ctx.save(); ctx.translate(lerp(sx, ex, 0.5), lerp(sy, ey, 0.5)); ctx.rotate(Math.atan2(ey - sy, ex - sx)); rr(-9, -20, 18, 40, 6); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore();
  });
  if (o.pray) { const py = (hands[0][1] + hands[1][1]) / 2; ell(0, py - 20, 22, 46, sk2); line([[0, py - 60], [0, py + 18]], sk0, 4); }
  if (o.holding) o.holding((hands[0][0] + hands[1][0]) / 2, (hands[0][1] + hands[1][1]) / 2);
  ctx.restore();
}

export const SARI = { royal: ['#FF8AC2', '#E0218A', '#8A0F5A'], forest: ['#FFD27A', '#FF8A1F', '#C9501A'], queen: ['#B79AE8', '#6B1FA8', '#2A0E66'] };
/** Sita. origin = hips; standing: hem +320, head -270. o: s, face, sari, sit, hands, eyes ('open'|'closed'|'sad'), t */
export function sita(x, y, o = {}) {
  const s = o.s || 1, t = o.t || 0, sr = o.sari || SARI.royal, hands = o.hands || [[-70, -30], [70, -30]], e = o.eyes || 'open', sad = e === 'sad', sk = o.skin || FAIR;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // veil + long hair behind
  ctx.beginPath(); ctx.moveTo(-58, -300); ctx.bezierCurveTo(-130, -220, -120, -40, -150, 60 + Math.sin(t * 2) * 8); ctx.lineTo(-60, 20); ctx.lineTo(60, 20); ctx.lineTo(150, 60 - Math.sin(t * 2) * 8); ctx.bezierCurveTo(120, -40, 130, -220, 58, -300); ctx.closePath(); ctx.fillStyle = rgba(sr[0], 0.55); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-56, -290); ctx.quadraticCurveTo(-80, -150, -50, -30); ctx.lineTo(50, -30); ctx.quadraticCurveTo(80, -150, 56, -290); ctx.closePath(); ctx.fillStyle = C.hair; ctx.fill();
  // skirt
  if (o.sit) { ctx.beginPath(); ctx.moveTo(-56, -10); ctx.bezierCurveTo(-200, 10, -250, 110, -180, 130); ctx.quadraticCurveTo(0, 160, 180, 130); ctx.bezierCurveTo(250, 110, 200, 10, 56, -10); ctx.closePath(); ctx.fillStyle = lg(0, -10, 0, 150, sr); ctx.fill();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-190, 116); ctx.quadraticCurveTo(0, 150, 190, 116); ctx.stroke(); }
  else { const sw = o.walk ? Math.sin(t * 7) * 10 : 0;
    ell(-34 + sw, 324, 32, 12, sk[0]); ell(34 - sw, 324, 32, 12, sk[0]);
    ctx.beginPath(); ctx.moveTo(-56, -10); ctx.bezierCurveTo(-110, 110, -130, 230, -128 + sw, 316); ctx.lineTo(128 + sw, 316); ctx.bezierCurveTo(130, 230, 110, 110, 56, -10); ctx.closePath(); ctx.fillStyle = lg(0, -10, 0, 320, sr); ctx.fill();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-124 + sw, 306); ctx.lineTo(124 + sw, 306); ctx.stroke();
    ctx.strokeStyle = rgba(C.paleGold, 0.7); ctx.lineWidth = 4; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 16, 10); ctx.quadraticCurveTo(i * 40, 160, i * 48 + sw, 296); ctx.stroke(); }
    for (let i = -3; i <= 3; i++) circle(i * 34 + sw, 280, 5, C.paleGold); }
  ctx.rotate(o.lean || 0);
  // torso + pallu
  ctx.beginPath(); ctx.moveTo(-64, -186); ctx.quadraticCurveTo(-68, -206, -44, -208); ctx.lineTo(44, -208); ctx.quadraticCurveTo(68, -206, 64, -186); ctx.lineTo(54, 0); ctx.lineTo(-54, 0); ctx.closePath(); ctx.fillStyle = lg(-60, 0, 60, 0, sk); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-62, -150); ctx.lineTo(62, -170); ctx.lineTo(62, -110); ctx.lineTo(-60, -90); ctx.closePath(); ctx.fillStyle = sr[2]; ctx.fill();
  ctx.beginPath(); ctx.moveTo(66, -206); ctx.lineTo(24, -208); ctx.lineTo(-58, -8); ctx.lineTo(58, 0); ctx.lineTo(62, -110); ctx.closePath(); ctx.fillStyle = lg(0, -208, 0, 0, sr); ctx.fill();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(24, -208); ctx.lineTo(-58, -8); ctx.stroke();
  rr(-58, -14, 116, 24, 10); ctx.fillStyle = lg(0, -14, 0, 10, [C.paleGold, C.gold]); ctx.fill();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, -206, 38, 0.15 * PI, 0.85 * PI); ctx.stroke(); circle(0, -168, 9, C.red);
  // head
  rr(-16, -236, 32, 36, 9); ctx.fillStyle = sk[0]; ctx.fill();
  circle(0, -270, 54, lg(-54, 0, 54, 0, [sk[1], sk[2]]));
  ctx.beginPath(); ctx.arc(0, -276, 56, PI * 0.98, PI * 2.02); ctx.quadraticCurveTo(30, -300, 0, -316); ctx.quadraticCurveTo(-30, -300, -56, -276); ctx.fillStyle = C.hair; ctx.fill();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -330); ctx.lineTo(0, -306); ctx.stroke(); circle(0, -302, 8, C.gold); circle(0, -302, 4, C.red);
  ctx.beginPath(); ctx.arc(0, -276, 60, PI * 1.12, PI * 1.88); ctx.strokeStyle = rgba(sr[0], 0.9); ctx.lineWidth = 10; ctx.stroke();
  circle(-56, -256, 8, C.gold); circle(56, -256, 8, C.gold); circle(-56, -242, 6, C.red); circle(56, -242, 6, C.red);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 4.5;
  if (e === 'closed' || sad) { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 20, -272, 10, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.beginPath(); ctx.moveTo(sd * 31, -268); ctx.lineTo(sd * 37, -264); ctx.stroke(); } }
  else { for (const sd of [-1, 1]) { ell(sd * 20, -272, 11, 9, C.white); circle(sd * 20 + (o.lookX || 0), -272, 7, C.ink); circle(sd * 20 + 2 + (o.lookX || 0), -275, 2.5, C.white); ctx.beginPath(); ctx.moveTo(sd * 30, -278); ctx.lineTo(sd * 37, -283); ctx.stroke(); } }
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 32, -290 + (sad ? 5 : 0)); ctx.quadraticCurveTo(sd * 20, -296, sd * 9, -290 - (sad ? 5 : 0)); ctx.stroke(); }
  if (sad) circle(28, -252 + ((t * 30) % 30), 5, C.cyan);
  circle(0, -290, 5, C.red); circle(11, -254, 3, C.gold);
  ctx.strokeStyle = '#B0183A'; ctx.lineWidth = 4.5; ctx.beginPath(); if (sad) ctx.arc(0, -232, 10, 1.2 * PI, 1.8 * PI); else ctx.arc(0, -250, 11, 0.2 * PI, 0.8 * PI); ctx.stroke();
  // arms
  [[-62, -186, hands[0], -1], [62, -186, hands[1], 1]].forEach(([sx, sy, h, side]) => {
    const mx = (sx + h[0]) / 2, my = (sy + h[1]) / 2, len = Math.hypot(h[0] - sx, h[1] - sy) || 1, bend = Math.max(0, 140 - len) * 0.5 + 10, ex = mx + side * bend * 0.9, ey = my + bend * 0.6;
    ctx.strokeStyle = sk[0]; ctx.lineWidth = 28; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(h[0], h[1]); ctx.stroke();
    ctx.strokeStyle = sk[1]; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(h[0], h[1]); ctx.stroke();
    circle(h[0], h[1], 17, sk[2]);
    for (let i = 0; i < 3; i++) circle(lerp(ex, h[0], 0.62 + i * 0.1), lerp(ey, h[1], 0.62 + i * 0.1), 14, i % 2 ? C.red : C.gold);
  });
  if (o.pray) { const py = (hands[0][1] + hands[1][1]) / 2; ell(0, py - 16, 17, 36, sk[2]); }
  if (o.holding) o.holding((hands[0][0] + hands[1][0]) / 2, (hands[0][1] + hands[1][1]) / 2);
  ctx.restore();
}

export function flame(x, y, s, t, seed = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  glow(0, -60, 190, C.orange, 0.5);
  for (const [w, h, c, k] of [[70, 190, C.red, 0], [52, 150, C.saffron, 1], [34, 104, C.gold, 2], [16, 60, C.cream, 3]]) {
    const sw = Math.sin(t * (9 + k * 2) + seed + k) * 14, hh = h * (0.85 + 0.15 * Math.sin(t * 13 + seed * 3 + k));
    ctx.beginPath(); ctx.moveTo(-w, 0); ctx.bezierCurveTo(-w * 1.1, -hh * 0.5, -w * 0.2 + sw, -hh * 0.7, sw * 1.4, -hh); ctx.bezierCurveTo(w * 0.3 + sw, -hh * 0.6, w * 1.1, -hh * 0.5, w, 0); ctx.quadraticCurveTo(0, w * 0.5, -w, 0); ctx.fillStyle = c; ctx.fill();
  }
  ctx.restore();
}
/** Hanuman. origin = hips; standing: feet +320, head -280. o: s, face, rot, kneel, hands, eyes, tail (0..1 curl), fire, mace, t */
export function hanuman(x, y, o = {}) {
  const s = o.s || 1, t = o.t || 0, hands = o.hands || [[-110, -40], [110, -40]], F = ['#B5520A', '#F28A2F', '#FFB85C'];
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // tail (behind)
  const tp = []; for (let i = 0; i <= 20; i++) { const u = i / 20, a = u * (o.tailCurl ?? 3.4) + Math.sin(t * 3) * 0.12; tp.push([-60 - u * 230 - Math.sin(a) * 60 * u, 10 - Math.sin(u * PI * 0.9) * 330 + Math.cos(a) * 40 * u]); }
  line(tp, F[0], 40); line(tp, F[1], 28);
  const tip = tp[tp.length - 1]; circle(tip[0], tip[1], 26, F[2]);
  if (o.fire) flame(tip[0], tip[1], 1.1 * o.fire, t, 3);
  // legs
  if (o.kneel) { ctx.beginPath(); ctx.moveTo(-76, -10); ctx.quadraticCurveTo(-180, 20, -200, 110); ctx.quadraticCurveTo(-60, 150, 140, 120); ctx.quadraticCurveTo(160, 50, 76, -10); ctx.closePath(); ctx.fillStyle = lg(0, -10, 0, 140, [F[1], F[0]]); ctx.fill(); ell(-200, 118, 50, 22, F[0]);
    ctx.beginPath(); ctx.moveTo(-76, -10); ctx.lineTo(76, -10); ctx.lineTo(60, 60); ctx.lineTo(-70, 60); ctx.closePath(); ctx.fillStyle = C.red; ctx.fill(); }
  else { const wk = o.walk ? Math.sin(t * 7) * 24 : 0;
    for (const sd of [-1, 1]) { ctx.strokeStyle = F[0]; ctx.lineWidth = 62; ctx.beginPath(); ctx.moveTo(sd * 44, 20); ctx.lineTo(sd * (48 + wk * sd), 290); ctx.stroke(); ctx.strokeStyle = F[1]; ctx.lineWidth = 50; ctx.beginPath(); ctx.moveTo(sd * 44, 20); ctx.lineTo(sd * (48 + wk * sd), 290); ctx.stroke(); ell(sd * (54 + wk * sd), 316, 50, 20, F[0]); circle(sd * (48 + wk * sd), 250, 30, C.gold); }
    ctx.beginPath(); ctx.moveTo(-82, -14); ctx.lineTo(82, -14); ctx.lineTo(74, 90); ctx.lineTo(0, 60); ctx.lineTo(-74, 90); ctx.closePath(); ctx.fillStyle = lg(0, -14, 0, 90, [C.coral, C.red]); ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.stroke(); }
  // torso
  ctx.beginPath(); ctx.moveTo(-104, -196); ctx.quadraticCurveTo(-110, -224, -70, -226); ctx.lineTo(70, -226); ctx.quadraticCurveTo(110, -224, 104, -196); ctx.lineTo(76, 0); ctx.lineTo(-76, 0); ctx.closePath(); ctx.fillStyle = lg(-100, 0, 100, 0, F); ctx.fill();
  ell(0, -130, 56, 70, rgba('#FFD9A8', 0.75));
  line([[-70, -222], [40, -10]], C.cream, 6);
  rr(-80, -18, 160, 30, 12); ctx.fillStyle = lg(0, -18, 0, 12, [C.paleGold, C.gold]); ctx.fill(); circle(0, -3, 10, C.cyan);
  ctx.strokeStyle = C.gold; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, -222, 52, 0.12 * PI, 0.88 * PI); ctx.stroke(); circle(0, -170, 12, C.red);
  // head
  circle(-66, -292, 24, F[0]); circle(66, -292, 24, F[0]); circle(-66, -292, 12, '#FFB8A0'); circle(66, -292, 12, '#FFB8A0');
  circle(0, -284, 66, lg(-66, 0, 66, 0, [F[1], F[2]]));
  ctx.beginPath(); ctx.moveTo(0, -306); ctx.bezierCurveTo(-56, -340, -62, -260, -40, -240); ctx.quadraticCurveTo(0, -214, 40, -240); ctx.bezierCurveTo(62, -260, 56, -340, 0, -306); ctx.fillStyle = '#FFD9B8'; ctx.fill();
  ell(0, -248, 44, 32, '#FFC8A8');
  const e = o.eyes || 'open';
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5;
  if (e === 'closed') for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * 22, -288, 10, 0.1 * PI, 0.9 * PI); ctx.stroke(); }
  else for (const sd of [-1, 1]) { circle(sd * 22, -290, 13, C.white); circle(sd * 22 + (o.lookX || 0), -290, 8, '#5A2A0A'); circle(sd * 22 + 3, -293, 3, C.white); }
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 36, -310 - (e === 'fierce' ? -8 : 0)); ctx.quadraticCurveTo(sd * 22, -316, sd * 9, -308 + (e === 'fierce' ? 8 : 0)); ctx.stroke(); }
  circle(-8, -256, 4, '#8A3A1A'); circle(8, -256, 4, '#8A3A1A');
  ctx.strokeStyle = '#8A1F1F'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -246, 22, 0.15 * PI, 0.85 * PI); ctx.stroke();
  ctx.strokeStyle = C.red; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -330); ctx.lineTo(0, -312); ctx.stroke();
  // crown
  ctx.beginPath(); ctx.moveTo(-58, -330); ctx.quadraticCurveTo(-44, -400, 0, -424); ctx.quadraticCurveTo(44, -400, 58, -330); ctx.closePath(); ctx.fillStyle = lg(0, -424, 0, -330, [C.cream, C.gold, C.saffron]); ctx.fill();
  rr(-62, -344, 124, 20, 8); ctx.fillStyle = C.paleGold; ctx.fill(); circle(0, -374, 11, C.red); circle(0, -428, 10, C.cream);
  // arms
  [[-102, -200, hands[0], -1], [102, -200, hands[1], 1]].forEach(([sx, sy, h, side]) => {
    const mx = (sx + h[0]) / 2, my = (sy + h[1]) / 2, len = Math.hypot(h[0] - sx, h[1] - sy) || 1, bend = Math.max(0, 170 - len) * 0.5 + 14, ex = mx + side * bend * 0.9, ey = my + bend * 0.6;
    ctx.strokeStyle = F[0]; ctx.lineWidth = 56; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(h[0], h[1]); ctx.stroke();
    ctx.strokeStyle = F[1]; ctx.lineWidth = 44; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(h[0], h[1]); ctx.stroke();
    circle(h[0], h[1], 30, '#FFC8A8'); circle(lerp(sx, ex, 0.5), lerp(sy, ey, 0.5), 30, C.gold); circle(lerp(ex, h[0], 0.7), lerp(ey, h[1], 0.7), 26, C.gold);
  });
  if (o.pray) { const py = (hands[0][1] + hands[1][1]) / 2; ell(0, py - 20, 26, 50, '#FFC8A8'); }
  if (o.mace) { const [hx, hy] = hands[1]; ctx.save(); ctx.translate(hx, hy); ctx.rotate(o.mace === true ? 0.3 : o.mace); line([[0, 40], [0, -190]], C.gold, 20); circle(0, -230, 64, rg(-20, -250, 6, 70, [C.cream, C.gold, C.saffron])); for (let i = 0; i < 8; i++) circle(Math.cos(i * PI / 4) * 64, -230 + Math.sin(i * PI / 4) * 64, 10, C.paleGold); circle(0, -230, 16, C.red); ctx.restore(); }
  if (o.holding) o.holding((hands[0][0] + hands[1][0]) / 2, (hands[0][1] + hands[1][1]) / 2);
  ctx.restore();
}
/** small monkey of the vanara army; o.carry draws a stone overhead */
export function monkey(x, y, s, t, o = {}) {
  const col = o.col || '#C9601A', wk = Math.sin(t * 9 + (o.ph || 0)) * 14;
  ctx.save(); ctx.translate(x, y + Math.abs(Math.sin(t * 9 + (o.ph || 0))) * -6); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round';
  ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.bezierCurveTo(-90, 0, -90, -90, -60, -100); ctx.stroke();
  ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(-14, 10); ctx.lineTo(-14 - wk, 80); ctx.moveTo(14, 10); ctx.lineTo(14 + wk, 80); ctx.stroke();
  ell(0, -30, 34, 50, col); circle(0, -100, 32, col); circle(-30, -104, 12, col); circle(30, -104, 12, col); ell(4, -94, 20, 18, '#FFD9B8');
  circle(-4, -100, 4, C.ink); circle(12, -100, 4, C.ink);
  ctx.lineWidth = 16; ctx.strokeStyle = col;
  if (o.carry) { ctx.beginPath(); ctx.moveTo(-26, -50); ctx.lineTo(-40, -150); ctx.moveTo(26, -50); ctx.lineTo(40, -150); ctx.stroke(); stone(0, -186, 0.5, 0, false); }
  else if (o.spear) { ctx.beginPath(); ctx.moveTo(-26, -50); ctx.lineTo(-50 - wk, -10); ctx.moveTo(26, -50); ctx.lineTo(56, -80); ctx.stroke(); line([[56, 20], [56, -190]], C.paleGold, 7); }
  else { ctx.beginPath(); ctx.moveTo(-26, -50); ctx.lineTo(-50 - wk, -10); ctx.moveTo(26, -50); ctx.lineTo(50 + wk, -10); ctx.stroke(); }
  ctx.restore();
}
/** a floating stone carved with Rama's name */
export function stone(x, y, s, rot = 0, name = true, g = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (g) glow(0, 0, 260, C.gold, g);
  ctx.beginPath(); ctx.moveTo(-150, 10); ctx.bezierCurveTo(-160, -60, -90, -92, -10, -86); ctx.bezierCurveTo(80, -100, 160, -60, 150, 6); ctx.bezierCurveTo(150, 70, 70, 84, 0, 80); ctx.bezierCurveTo(-80, 88, -146, 66, -150, 10); ctx.closePath();
  ctx.fillStyle = lg(0, -90, 0, 86, ['#B8C8E0', '#7A8AB0', '#3A4A7A']); ctx.fill(); ctx.strokeStyle = rgba('#1B2450', 0.6); ctx.lineWidth = 6; ctx.stroke();
  ell(-50, -52, 60, 14, rgba(C.white, 0.4), -0.1);
  if (name) { ctx.font = '700 104px FreeSans, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#8A3A05'; ctx.lineWidth = 12; ctx.strokeText('राम', 0, 6); ctx.fillStyle = lg(0, -50, 0, 50, [C.cream, C.gold, C.saffron]); ctx.fillText('राम', 0, 6); }
  ctx.restore();
}

/** Ravana, the ten-headed king. origin = chest. o: t, a, rot, sword (0..1 raised), hit */
export function ravana(x, y, s, o = {}) {
  const t = o.t || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); ctx.globalAlpha *= o.a ?? 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  glow(0, -100, 640, C.red, 0.3);
  // cape
  ctx.beginPath(); ctx.moveTo(-250, -70); ctx.bezierCurveTo(-420, 120, -380, 360, -330, 480); ctx.lineTo(330, 480); ctx.bezierCurveTo(380, 360, 420, 120, 250, -70); ctx.closePath(); ctx.fillStyle = lg(0, -70, 0, 480, ['#7A0A3A', '#2A0420']); ctx.fill();
  // arms
  for (const sd of [-1, 1]) {
    const up = sd === 1 ? (o.sword ?? 0.7) : 0.15, hx = sd * lerp(300, 330, up), hy = lerp(200, -200, up);
    ctx.strokeStyle = '#5A1030'; ctx.lineWidth = 96; ctx.beginPath(); ctx.moveTo(sd * 220, -30); ctx.quadraticCurveTo(sd * 360, 60, hx, hy); ctx.stroke();
    ctx.strokeStyle = '#8A2A4A'; ctx.lineWidth = 78; ctx.beginPath(); ctx.moveTo(sd * 220, -30); ctx.quadraticCurveTo(sd * 360, 60, hx, hy); ctx.stroke();
    circle(sd * 290, 20, 54, C.gold); circle(sd * 290, 20, 22, C.red); circle(hx, hy, 46, '#A83A5A');
    if (sd === 1) { ctx.save(); ctx.translate(hx, hy); ctx.rotate(lerp(1.2, -0.25, up)); glow(0, -220, 160, C.red, 0.4);
      ctx.beginPath(); ctx.moveTo(-20, -30); ctx.quadraticCurveTo(-50, -260, 30, -420); ctx.quadraticCurveTo(70, -250, 26, -30); ctx.closePath(); ctx.fillStyle = lg(-40, 0, 60, 0, ['#E8F0FF', '#8A9AC0', '#E8F0FF']); ctx.fill();
      rr(-50, -40, 100, 22, 8); ctx.fillStyle = C.gold; ctx.fill(); rr(-14, -20, 28, 80, 10); ctx.fillStyle = '#3A0A20'; ctx.fill(); ctx.restore(); }
  }
  // armoured torso
  ctx.beginPath(); ctx.moveTo(-250, -40); ctx.quadraticCurveTo(-260, -90, -170, -100); ctx.lineTo(170, -100); ctx.quadraticCurveTo(260, -90, 250, -40); ctx.lineTo(170, 420); ctx.lineTo(-170, 420); ctx.closePath(); ctx.fillStyle = lg(0, -100, 0, 420, ['#9A1A3A', '#5A0A2A', '#2A0418']); ctx.fill();
  for (let r = 0; r < 4; r++) { ctx.beginPath(); ctx.moveTo(-190 + r * 16, 10 + r * 88); ctx.quadraticCurveTo(0, 80 + r * 88, 190 - r * 16, 10 + r * 88); ctx.strokeStyle = lg(-190, 0, 190, 0, ['#B5520A', C.gold, C.paleGold, C.gold, '#B5520A']); ctx.lineWidth = 22; ctx.stroke(); }
  circle(0, 40, 46, rg(-10, 30, 4, 50, [C.cream, C.gold, C.saffron])); circle(0, 40, 20, C.red);
  // heads: nine around, the chief in the centre
  const head = (hx, hy, r, k) => {
    ctx.save(); ctx.translate(hx, hy + Math.sin(t * 2.2 + k) * 5); ctx.scale(r / 80, r / 80);
    rr(-34, 50, 68, 60, 14); ctx.fillStyle = '#6A1A3A'; ctx.fill();
    circle(0, 0, 80, lg(-80, 0, 80, 0, ['#8A2A4A', '#C0506A']));
    ctx.beginPath(); ctx.moveTo(-84, -44); ctx.lineTo(-96, -150); ctx.lineTo(-50, -104); ctx.lineTo(-26, -176); ctx.lineTo(0, -112); ctx.lineTo(26, -176); ctx.lineTo(50, -104); ctx.lineTo(96, -150); ctx.lineTo(84, -44); ctx.closePath(); ctx.fillStyle = lg(0, -176, 0, -44, [C.cream, C.gold, C.saffron]); ctx.fill();
    rr(-88, -62, 176, 28, 10); ctx.fillStyle = C.gold; ctx.fill(); circle(0, -84, 14, C.red);
    for (const sd of [-1, 1]) { glow(sd * 30, -8, 46, C.red, 0.8); ctx.beginPath(); ctx.moveTo(sd * 8, -4); ctx.quadraticCurveTo(sd * 32, -34, sd * 58, -20); ctx.quadraticCurveTo(sd * 36, 6, sd * 8, -4); ctx.fillStyle = '#FFE08A'; ctx.fill(); circle(sd * 32, -12, 7, C.red);
      ctx.strokeStyle = '#1A0410'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(sd * 4, -22); ctx.lineTo(sd * 62, -44); ctx.stroke(); }
    ctx.strokeStyle = '#1A0410'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-30, 16, -60, 30, -74, 10); ctx.moveTo(0, 30); ctx.bezierCurveTo(30, 16, 60, 30, 74, 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-30, 44); ctx.quadraticCurveTo(0, 60, 30, 44); ctx.lineWidth = 7; ctx.stroke();
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 14, 48); ctx.lineTo(sd * 20, 70); ctx.lineTo(sd * 27, 47); ctx.closePath(); ctx.fillStyle = C.cream; ctx.fill(); }
    ctx.restore();
  };
  const hs = []; for (let i = 5; i >= 1; i--) { hs.push([-i, i]); if (i <= 4) hs.push([i, i]); }
  for (const [i, k] of hs) head(i * 92, -196 + k * 12, 70 - k * 4.5, i);
  head(0, -200, 88, 0);
  ctx.restore();
}
/** Jatayu, the old eagle king. origin = body centre, facing right. o: flap, t, hurt */
export function eagle(x, y, s, t, o = {}) {
  const f = Math.sin(t * (o.flap ?? 6)) * 0.45;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round';
  const wing = (sd) => { ctx.save(); ctx.translate(-10, -20); ctx.rotate(sd * (-0.5 + f * sd * -1) - 0.2);
    for (let i = 7; i >= 0; i--) { ctx.save(); ctx.rotate(-1.2 + i * 0.2); ctx.beginPath(); ctx.ellipse(0, -150 - i * 12, 30, 150 + i * 10, 0, 0, TAU); ctx.fillStyle = lg(0, -320, 0, 0, i % 2 ? ['#FFE9A8', '#C9601A', '#7A3A0A'] : ['#FFD27A', '#B5520A', '#5A2A0A']); ctx.fill(); ctx.restore(); }
    ctx.restore(); };
  ctx.save(); ctx.scale(1, 1); wing(1); ctx.restore();
  for (let i = -2; i <= 2; i++) { ctx.save(); ctx.translate(-110, 10); ctx.rotate(PI / 2 + i * 0.16 + 0.1); ell(0, -80, 22, 90, i % 2 ? '#7A3A0A' : '#B5520A'); ctx.restore(); }
  ell(0, 0, 130, 66, lg(0, -66, 0, 66, ['#D98A3A', '#8A4A1A']));
  ell(30, 20, 80, 36, rgba('#FFE9A8', 0.7));
  circle(130, -40, 54, lg(80, 0, 180, 0, ['#FFF6DC', '#F2E0B8']));
  ctx.beginPath(); ctx.moveTo(170, -56); ctx.quadraticCurveTo(236, -50, 226, 8); ctx.quadraticCurveTo(206, -18, 166, -18); ctx.closePath(); ctx.fillStyle = lg(170, 0, 236, 0, [C.gold, C.saffron]); ctx.fill();
  circle(150, -50, 11, C.ink); circle(153, -53, 4, C.white); line([[128, -70], [168, -62]], '#5A2A0A', 7);
  ctx.beginPath(); ctx.moveTo(96, -84); ctx.lineTo(110, -120); ctx.lineTo(128, -92); ctx.lineTo(144, -122); ctx.lineTo(156, -90); ctx.closePath(); ctx.fillStyle = C.gold; ctx.fill();
  for (const dx of [-20, 30]) { line([[dx, 56], [dx + 10, 100]], C.gold, 10); line([[dx + 10, 100], [dx + 36, 110]], C.gold, 8); line([[dx + 10, 100], [dx - 10, 114]], C.gold, 8); }
  ctx.save(); ctx.translate(20, 0); ctx.scale(-1, 1); ctx.translate(-20, 0); ctx.globalAlpha *= 0.0; ctx.restore();
  ctx.save(); ctx.translate(-10, -20); ctx.rotate(-0.9 - f);
  for (let i = 6; i >= 0; i--) { ctx.save(); ctx.rotate(-0.5 + i * 0.2); ctx.beginPath(); ctx.ellipse(0, -140 - i * 10, 28, 140 + i * 8, 0, 0, TAU); ctx.fillStyle = lg(0, -300, 0, 0, i % 2 ? ['#FFF1C8', '#D9782A', '#8A4A1A'] : ['#FFE09A', '#C9601A', '#6A300A']); ctx.fill(); ctx.restore(); }
  ctx.restore();
  ctx.restore();
}
/** the Pushpaka: a flying golden chariot-palace. origin = hull centre. o: dark, riders(), flap */
export function chariot(x, y, s, t, o = {}) {
  const G = o.dark ? ['#5A0A2A', '#9A1A3A', '#E0506A'] : ['#E88A1F', C.gold, C.cream], trim = o.dark ? C.gold : C.magenta;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s * (o.face || 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  glow(0, -60, 560, o.dark ? C.red : C.gold, o.glow ?? 0.45);
  // wings
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 250, 0); ctx.rotate(sd * (0.2 + Math.sin(t * 5) * 0.25));
    for (let i = 5; i >= 0; i--) { ctx.save(); ctx.rotate(sd * (0.3 + i * 0.2)); ctx.beginPath(); ctx.ellipse(0, -110 - i * 10, 28, 120 + i * 8, 0, 0, TAU); ctx.fillStyle = lg(0, -240, 0, 0, o.dark ? ['#E0506A', '#5A0A2A'] : [C.cream, i % 2 ? C.pink : C.gold]); ctx.fill(); ctx.restore(); } ctx.restore(); }
  // pavilion back + riders
  rr(-200, -330, 400, 300, 24); ctx.fillStyle = rgba(o.dark ? '#2A0418' : '#FFF1B8', o.dark ? 0.7 : 0.35); ctx.fill();
  if (o.riders) o.riders();
  // pillars + roof
  for (const px of [-200, 200]) { rr(px - 14, -320, 28, 290, 10); ctx.fillStyle = lg(px - 14, 0, px + 14, 0, G); ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(-260, -310); ctx.quadraticCurveTo(-150, -350, -120, -420); ctx.bezierCurveTo(-110, -500, -30, -500, 0, -580); ctx.bezierCurveTo(30, -500, 110, -500, 120, -420); ctx.quadraticCurveTo(150, -350, 260, -310); ctx.closePath(); ctx.fillStyle = lg(0, -580, 0, -310, [G[2], G[1], G[0]]); ctx.fill();
  rr(-270, -326, 540, 30, 12); ctx.fillStyle = trim; ctx.fill(); for (let i = -4; i <= 4; i++) circle(i * 56, -311, 8, C.paleGold);
  circle(0, -590, 18, C.cream); line([[0, -590], [0, -660]], C.gold, 6);
  ctx.beginPath(); ctx.moveTo(0, -660); ctx.quadraticCurveTo(50 + Math.sin(t * 5) * 12, -650, 90, -634); ctx.quadraticCurveTo(40, -620, 0, -616); ctx.closePath(); ctx.fillStyle = o.dark ? C.red : C.saffron; ctx.fill();
  // hull
  ctx.beginPath(); ctx.moveTo(-330, -40); ctx.quadraticCurveTo(-300, 90, -120, 100); ctx.lineTo(120, 100); ctx.quadraticCurveTo(300, 90, 330, -40); ctx.quadraticCurveTo(0, -4, -330, -40); ctx.closePath(); ctx.fillStyle = lg(0, -40, 0, 100, [G[2], G[1], G[0]]); ctx.fill();
  ctx.strokeStyle = trim; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-330, -40); ctx.quadraticCurveTo(0, -4, 330, -40); ctx.stroke();
  for (let i = -4; i <= 4; i++) circle(i * 60, 30 - i * i * 1.4, 12, i % 2 ? C.cyan : (o.dark ? C.red : C.magenta));
  for (const sd of [-1, 1]) { ctx.strokeStyle = lg(0, -160, 0, -40, [G[2], G[1]]); ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(sd * 326, -36); ctx.bezierCurveTo(sd * 390, -80, sd * 392, -150, sd * 350, -160); ctx.stroke(); }
  // cloud of light beneath
  for (let i = -3; i <= 3; i++) circle(i * 90, 130 + Math.sin(t * 3 + i) * 8, 60 - Math.abs(i) * 8, rgba(o.dark ? '#3A0A30' : C.cream, o.dark ? 0.8 : 0.85));
  ctx.restore();
}
/** recurve bow aimed along +x. pull 0..1; o: arrow, blaze, snap (0..1 breaks it), ornate */
export function bow(x, y, s, rot, pull = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const sn = o.snap || 0, px = -pull * 130;
  const limb = (sd) => { ctx.save(); ctx.rotate(sd * sn * 0.7); ctx.translate(sn * -30, sd * sn * 40);
    ctx.strokeStyle = '#8A3A05'; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(20, 0); ctx.bezierCurveTo(100, sd * 90, 60, sd * 200, -30, sd * 270); ctx.stroke();
    ctx.strokeStyle = lg(0, 0, 0, sd * 270, [C.saffron, C.gold, C.cream]); ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(20, 0); ctx.bezierCurveTo(100, sd * 90, 60, sd * 200, -30, sd * 270); ctx.stroke();
    if (o.ornate) for (let i = 1; i < 6; i++) { const u = i / 6, bx = (1 - u) ** 3 * 20 + 3 * (1 - u) ** 2 * u * 100 + 3 * (1 - u) * u * u * 60 + u ** 3 * -30, by = sd * (3 * (1 - u) ** 2 * u * 90 + 3 * (1 - u) * u * u * 200 + u ** 3 * 270); circle(bx, by, 9, i % 2 ? C.red : C.cyan); }
    circle(-30, sd * 270, 14, C.cream);
    if (!sn) line([[-30, sd * 270], [px, 0]], rgba(C.cream, 0.95), 4); else line([[-30, sd * 270], [-30 - 40 * sn, sd * (270 - 150 * sn)]], rgba(C.cream, 0.8), 4);
    ctx.restore(); };
  limb(-1); limb(1);
  if (!sn) { rr(4, -34, 32, 68, 12); ctx.fillStyle = C.red; ctx.fill(); }
  if (o.arrow) { const ax = px, tipx = px + 330;
    if (o.blaze) { glow(tipx, 0, 200 * o.blaze, C.gold, 0.9); glow(tipx, 0, 90 * o.blaze, C.cream, 1); }
    line([[ax, 0], [tipx, 0]], C.paleGold, 9);
    ctx.beginPath(); ctx.moveTo(tipx + 46, 0); ctx.lineTo(tipx - 10, -22); ctx.lineTo(tipx, 0); ctx.lineTo(tipx - 10, 22); ctx.closePath(); ctx.fillStyle = o.blaze ? C.cream : '#E8F0FF'; ctx.fill();
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(ax, 0); ctx.lineTo(ax - 30, sd * 20); ctx.lineTo(ax + 20, sd * 4); ctx.closePath(); ctx.fillStyle = C.red; ctx.fill(); } }
  ctx.restore();
}
export function arrowFly(x, y, rot, s, blaze = 1, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (let i = 0; i < 10; i++) { glow(-i * 60, Math.sin(t * 20 + i) * 6, 120 - i * 9, i < 3 ? C.cream : C.saffron, (1 - i / 10) * 0.6 * blaze); }
  glow(40, 0, 220, C.gold, blaze); line([[-300, 0], [30, 0]], C.paleGold, 10);
  ctx.beginPath(); ctx.moveTo(80, 0); ctx.lineTo(20, -24); ctx.lineTo(30, 0); ctx.lineTo(20, 24); ctx.closePath(); ctx.fillStyle = C.white; ctx.fill();
  ctx.restore();
}
/** clay lamp */
export function diya(x, y, s, t, lit = 1, seed = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (lit > 0) { glow(0, -40, 150 * lit, C.orange, 0.55); const fl = 1 + Math.sin(t * 11 + seed) * 0.08, sw = Math.sin(t * 7 + seed * 2) * 5;
    ctx.save(); ctx.translate(0, -18); ctx.scale(lit, lit * fl);
    ctx.beginPath(); ctx.moveTo(-18, 0); ctx.bezierCurveTo(-22, -30, -4 + sw, -44, sw * 1.5, -74); ctx.bezierCurveTo(8 + sw, -44, 22, -30, 18, 0); ctx.quadraticCurveTo(0, 12, -18, 0); ctx.fillStyle = lg(0, -74, 0, 6, [C.cream, C.gold, C.saffron]); ctx.fill();
    ell(0, -14, 7, 14, C.white); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-64, -18); ctx.quadraticCurveTo(-50, 34, 0, 34); ctx.quadraticCurveTo(50, 34, 64, -18); ctx.quadraticCurveTo(84, -24, 76, -34); ctx.quadraticCurveTo(0, -4, -64, -18); ctx.closePath(); ctx.fillStyle = lg(0, -30, 0, 34, ['#F28A2F', '#B5420A', '#6A200A']); ctx.fill();
  ell(0, -18, 62, 12, '#FFC83D'); for (let i = -2; i <= 2; i++) circle(i * 22, 8 - Math.abs(i) * 3, 5, C.cream);
  ctx.restore();
}
export function firework(x, y, r, p, col = C.gold, n = 18) {
  if (p <= 0 || p >= 1) return;
  const e = eo(p); glow(x, y, r * 0.9 * e, col, (1 - p) * 0.6);
  for (let i = 0; i < n; i++) { const an = i * TAU / n, r0 = r * e * 0.55, r1 = r * e, dy = p * p * r * 0.25;
    line([[x + Math.cos(an) * r0, y + Math.sin(an) * r0 + dy], [x + Math.cos(an) * r1, y + Math.sin(an) * r1 + dy]], rgba(i % 2 ? col : C.cream, 1 - p), 7);
    circle(x + Math.cos(an) * r1, y + Math.sin(an) * r1 + dy, 7 * (1 - p), C.cream); }
}
/** a skyline of spired towers (Lanka by default; pass gold tones for Ayodhya) */
export function towers(yBase, o = {}) {
  const col = o.col || '#2A0418', lit = o.lit || C.orange, n = o.n || 9, seed = o.seed || 0, sc = o.s || 1;
  for (let i = 0; i < n; i++) {
    const x = -60 + i * (1200 / (n - 1)) + (rnd(i + seed) - 0.5) * 50, w = (90 + rnd(i * 3 + seed) * 70) * sc, h = (260 + rnd(i * 7 + seed) * 380) * sc;
    ctx.fillStyle = typeof col === 'function' ? col(x, yBase - h, h) : col;
    ctx.beginPath(); ctx.moveTo(x - w / 2, yBase + 40); ctx.lineTo(x - w / 2, yBase - h * 0.6); ctx.bezierCurveTo(x - w * 0.75, yBase - h * 0.78, x - w * 0.15, yBase - h * 0.86, x, yBase - h); ctx.bezierCurveTo(x + w * 0.15, yBase - h * 0.86, x + w * 0.75, yBase - h * 0.78, x + w / 2, yBase - h * 0.6); ctx.lineTo(x + w / 2, yBase + 40); ctx.closePath(); ctx.fill();
    line([[x, yBase - h], [x, yBase - h - 40 * sc]], lit, 5); circle(x, yBase - h - 44 * sc, 7 * sc, lit);
    for (let r = 0; r < Math.floor(h * 0.5 / (70 * sc)); r++) for (const dx of [-0.2, 0.2]) if (rnd(i * 11 + r * 5 + dx + seed) > (o.dim ?? 0.25)) { ctx.beginPath(); const wx = x + dx * w, wy = yBase - r * 70 * sc - 20; ctx.moveTo(wx - 11 * sc, wy); ctx.lineTo(wx - 11 * sc, wy - 26 * sc); ctx.arc(wx, wy - 26 * sc, 11 * sc, PI, 0); ctx.lineTo(wx + 11 * sc, wy); ctx.closePath(); ctx.fillStyle = rgba(lit, 0.95); ctx.fill(); }
  }
}
export function throne(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, -200, 520, C.gold, 0.4);
  ctx.beginPath(); ctx.moveTo(-250, 60); ctx.lineTo(-250, -330); ctx.bezierCurveTo(-250, -470, -90, -470, 0, -590); ctx.bezierCurveTo(90, -470, 250, -470, 250, -330); ctx.lineTo(250, 60); ctx.closePath(); ctx.fillStyle = lg(0, -590, 0, 60, [C.cream, C.gold, C.saffron, '#B5520A']); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-190, 40); ctx.lineTo(-190, -320); ctx.bezierCurveTo(-190, -410, -70, -420, 0, -500); ctx.bezierCurveTo(70, -420, 190, -410, 190, -320); ctx.lineTo(190, 40); ctx.closePath(); ctx.fillStyle = lg(0, -500, 0, 40, ['#FF6FB5', '#B0185A', '#5A0A3A']); ctx.fill();
  circle(0, -540, 24, C.red); for (const sd of [-1, 1]) { rr(sd * 250 - 40, -130, 80, 220, 22); ctx.fillStyle = lg(0, -130, 0, 90, [C.paleGold, C.gold, '#B5520A']); ctx.fill(); circle(sd * 250, -140, 42, C.gold); circle(sd * 250, -140, 18, C.red); }
  rr(-300, 60, 600, 70, 20); ctx.fillStyle = lg(0, 60, 0, 130, [C.gold, '#B5520A']); ctx.fill(); rr(-360, 130, 720, 60, 20); ctx.fillStyle = lg(0, 130, 0, 190, [C.saffron, '#8A3A05']); ctx.fill();
  ctx.restore();
}
export function ring(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, 0, 170, C.gold, 0.8);
  ctx.strokeStyle = lg(-50, 0, 50, 0, ['#B5520A', C.gold, C.cream, C.gold]); ctx.lineWidth = 18; ctx.beginPath(); ctx.ellipse(0, 14, 46, 50, 0, 0, TAU); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-26, -40); ctx.lineTo(0, -74); ctx.lineTo(26, -40); ctx.lineTo(0, -22); ctx.closePath(); ctx.fillStyle = lg(-26, 0, 26, 0, ['#FF6FB5', C.red]); ctx.fill();
  sparkle(18, -66, 30 + Math.sin(t * 6) * 8, 1, C.white); ctx.restore();
}
/** thatched forest hut */
export function hut(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(-150, -150, 300, 150, 10); ctx.fillStyle = lg(0, -150, 0, 0, ['#D9A066', '#8A5A2A']); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-210, -140); ctx.quadraticCurveTo(-60, -330, 0, -340); ctx.quadraticCurveTo(60, -330, 210, -140); ctx.closePath(); ctx.fillStyle = lg(0, -340, 0, -140, ['#FFD27A', '#C98A2A']); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-40, -90); ctx.arc(0, -90, 40, PI, 0); ctx.lineTo(40, 0); ctx.closePath(); ctx.fillStyle = '#3A1F0A'; ctx.fill();
  ctx.restore();
}
export function cradle(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  const sw = Math.sin(t * 1.6) * 0.07;
  line([[-230, -420], [-230, 150]], C.gold, 20); line([[230, -420], [230, 150]], C.gold, 20); line([[-270, -420], [270, -420]], C.gold, 22); line([[-300, 150], [-160, 150]], C.gold, 20); line([[160, 150], [300, 150]], C.gold, 20);
  ctx.save(); ctx.translate(0, -420); ctx.rotate(sw);
  line([[-170, 0], [-180, 330]], C.paleGold, 6); line([[170, 0], [180, 330]], C.paleGold, 6);
  glow(0, 330, 330, C.cream, 0.7);
  ell(0, 322, 150, 34, '#FFF6DC');
  circle(-30, 296, 46, lg(-76, 0, 16, 0, ['#3F7BFF', '#8FB8FF'])); ctx.beginPath(); ctx.arc(-30, 290, 47, PI * 1.05, PI * 1.95); ctx.quadraticCurveTo(-30, 262, -77, 284); ctx.fillStyle = C.hair; ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-46, 300, 7, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.beginPath(); ctx.arc(-16, 300, 7, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.beginPath(); ctx.arc(-31, 312, 8, 0.2 * PI, 0.8 * PI); ctx.stroke(); circle(-31, 282, 4, C.red);
  ell(50, 312, 76, 30, lg(0, 282, 0, 342, ['#FFE36B', '#F2A01F']));
  ctx.beginPath(); ctx.moveTo(-200, 320); ctx.quadraticCurveTo(-180, 440, 0, 440); ctx.quadraticCurveTo(180, 440, 200, 320); ctx.quadraticCurveTo(0, 372, -200, 320); ctx.closePath(); ctx.fillStyle = lg(0, 320, 0, 440, [C.pink, C.magenta, C.purple]); ctx.fill();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-200, 320); ctx.quadraticCurveTo(0, 372, 200, 320); ctx.stroke(); for (let i = -3; i <= 3; i++) circle(i * 48, 400 - i * i * 3, 9, i % 2 ? C.cyan : C.paleGold);
  ctx.restore(); ctx.restore();
}
export function garland(x0, y0, x1, y1, sag, t) {
  for (let i = 0; i <= 16; i++) { const u = i / 16, x = lerp(x0, x1, u), y = lerp(y0, y1, u) + Math.sin(u * PI) * sag + Math.sin(t * 3 + i) * 2; circle(x, y, 15, i % 3 === 0 ? C.cream : i % 3 === 1 ? C.pink : C.saffron); }
}
