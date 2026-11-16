// BUDDHA AVATAR (storybook cut): paper puppets in front of soft-focus backdrops. One shot (or two) per narration line.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as P6 from './core/kit6.js';
import * as B from './core/kit8.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.3);
  const P = B.puppet, Wh = B.WHO, NAM = [0.25, -2.36], DHY = [0.2, -1.2], ABH = [0.5, 2.3], bobY = (t, ph = 0) => Math.abs(Math.sin(t * 5.5 + ph)) * -12;
  const INK = '#2B1B14';
  const fs = (fill, lw = 3.4) => { ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); };

  // ---------- props ----------
  const bowl = (g = 0) => () => { if (g) glow(0, -10, 120, C.gold, 0.6 * g); ctx.beginPath(); ctx.moveTo(-52, -14); ctx.bezierCurveTo(-50, 40, 50, 40, 52, -14); ctx.closePath(); fs(lg(0, -14, 0, 30, ['#5A3A2A', '#2A1A14'])); ctx.beginPath(); ctx.ellipse(0, -14, 52, 13, 0, 0, TAU); fs(g ? '#FFF6DC' : '#3A2418'); };
  const staff = () => { line([[0, -230], [0, 330]], INK, 19); line([[0, -230], [0, 330]], '#9A6A3A', 12); };
  const baby = () => { glow(0, 0, 150, C.gold, 0.5); ctx.save(); ctx.rotate(-0.3); ctx.beginPath(); ctx.ellipse(0, 0, 78, 44, 0, 0, TAU); fs(lg(0, -44, 0, 44, ['#FFFDF0', '#FFE08A'])); ctx.beginPath(); ctx.arc(-58, -8, 32, 0, TAU); fs('#F6CF98'); line([[-70, -10], [-62, -6]], INK, 3); line([[-52, -10], [-44, -6]], INK, 3); ctx.restore(); };
  const wheel = (x, y, r, t, a = 1, col = C.gold) => { ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.4); ctx.globalAlpha *= a; glow(0, 0, r * 2, col, 0.5); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = r * 0.13; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke(); ctx.lineWidth = r * 0.08; for (let i = 0; i < 8; i++) { const an = i * TAU / 8; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * r * 1.16, Math.sin(an) * r * 1.16); ctx.stroke(); } circle(0, 0, r * 0.2, C.cream); ctx.restore(); };
  const halo = (x, y, r, t, a = 1) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; glow(x, y, r * 2.2, C.gold, 0.6); circle(x, y, r, rgba('#FFF1B8', 0.5)); ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.lineWidth = 3; ctx.setLineDash([4, 16]); ctx.beginPath(); ctx.arc(x, y, r + 18, t * 0.3, t * 0.3 + TAU); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); };
  /** white horse facing right; origin = saddle */
  const horse = (x, y, s, t, o = {}) => { ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const g = o.walk ? Math.sin(t * 7) : 0, body = lg(0, -20, 0, 150, ['#FFFFFF', '#D8DCEC']);
    ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-170, 30); ctx.quadraticCurveTo(-260, 60, -240, 220 + g * 10); ctx.stroke(); ctx.strokeStyle = '#C8CCE0'; ctx.lineWidth = 22; ctx.stroke();
    for (const [lx, k] of [[-120, 1], [-80, -1], [90, 1], [130, -1]]) { const fx = lx + g * k * 36; ctx.strokeStyle = INK; ctx.lineWidth = 45; ctx.beginPath(); ctx.moveTo(lx, 100); ctx.lineTo(fx, 330); ctx.stroke(); ctx.strokeStyle = k > 0 ? '#F4F6FF' : '#D0D4E8'; ctx.lineWidth = 38; ctx.stroke(); circle(fx, 336, 21, '#4A3A3A'); }
    ctx.beginPath(); ctx.ellipse(0, 70, 185, 86, 0, 0, TAU); fs(body);
    ctx.beginPath(); ctx.moveTo(70, 0); ctx.quadraticCurveTo(130, -110, 176, -200); ctx.lineTo(282, -170); ctx.quadraticCurveTo(250, -20, 190, 110); ctx.closePath(); fs(body);
    ctx.beginPath(); ctx.moveTo(186, -214); ctx.lineTo(204, -276); ctx.lineTo(236, -214); ctx.closePath(); fs('#F4F6FF');
    ctx.save(); ctx.translate(236, -178); ctx.rotate(0.55); ctx.beginPath(); ctx.moveTo(-40, -52); ctx.bezierCurveTo(60, -62, 150, -40, 156, 4); ctx.bezierCurveTo(156, 44, 80, 56, -30, 52); ctx.closePath(); fs(body); circle(30, -14, 10, INK); circle(33, -17, 3.5, '#FFFFFF'); circle(136, 4, 6, rgba(INK, 0.6)); ctx.strokeStyle = '#E0218A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(84, -50); ctx.lineTo(90, 52); ctx.stroke(); ctx.restore();
    ctx.strokeStyle = INK; ctx.lineWidth = 36; ctx.beginPath(); ctx.moveTo(180, -206); ctx.quadraticCurveTo(116, -110, 78, -6); ctx.stroke(); ctx.strokeStyle = '#8A94C8'; ctx.lineWidth = 29; ctx.stroke();
    rr(-70, -22, 140, 60, 16); fs(lg(0, -22, 0, 38, ['#E0218A', '#8A146A'])); ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-66, 26); ctx.lineTo(66, 26); ctx.stroke(); ctx.restore(); };

  const lotusSeat = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, 0, 420, C.pink, 0.4);
    const petal = (px, an, l, w, up) => { ctx.save(); ctx.translate(px, 0); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-w, 0); ctx.bezierCurveTo(-w, -l * 0.6 * up, -w * 0.3, -l * 0.9 * up, 0, -l * up); ctx.bezierCurveTo(w * 0.3, -l * 0.9 * up, w, -l * 0.6 * up, w, 0); ctx.closePath(); fs(lg(0, -l * up, 0, 0, up > 0 ? ['#FFF1F6', '#FF8AC2', '#E0218A'] : ['#B8146A', '#E0218A', '#FF8AC2'])); ctx.restore(); };
    for (let i = -3; i <= 3; i++) petal(i * 84, i * 0.2, 120, 58, -0.75);
    for (let i = -4; i <= 4; i++) petal(i * 72, i * 0.17, 150, 52, 1);
    for (let i = -3; i <= 3; i++) petal(i * 76 + 38, i * 0.15, 104, 50, 1); ctx.restore(); };

  // ---------- backdrops (drawn out of focus) ----------
  const bdGarden = (t, sc = 0) => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFB8C8', '#7ADCA8', '#0B8A5F'])); K.rays(820, 200, 1900, t, C.cream, 0.4, 12);
    for (let i = 0; i < 5; i++) { const x = ((i * 300 - sc) % 1500 + 1500) % 1500 - 200; K.tree(x, 1180 + (i % 2) * 40, 1.6, '#7A4A3A', i % 2 ? '#FF9AC2' : '#5ADC9A'); }
    K.hills(1320, 70, 3.1, '#0B8A5F', 0.003); for (let i = 0; i < 5; i++) K.lotus(120 + i * 220, 1560 + (i % 2) * 50, 1.1, 1); };
  const bdPalace = (t, night = 0) => { const m = (a, b) => mix(a, b, night); fillAll(lg(0, 0, 0, H, [m('#FFD9A0', '#0A0A3A'), m('#FF9AC0', '#1A1466'), m('#B07AE8', '#3A2A8A'), m('#5A2FD0', '#150A4A')])); K.stars(t, night, 3, 90, 900);
    if (night) { glow(820, 320, 300, C.cream, 0.6); circle(820, 320, 90, C.cream); }
    K.palace(540, 1260, 1.5, m('#B0185A', '#1A0E4A'), C.gold); R.towers(1500, { col: m('#8A146A', '#120A3A'), lit: C.gold, n: 6, seed: 4, s: 0.7 }); };
  const bdRoad = (t, grey = 0) => { const m = (a, b) => mix(a, b, grey); fillAll(lg(0, 0, 0, H, [m('#FFD9A0', '#8A8A9A'), m('#F2B06A', '#6A6A7A'), m('#C9803A', '#4A4A5A'), m('#7A4A2A', '#2A2A34')])); K.hills(1100, 120, 5, m('#B8703A', '#3A3A48')); for (let i = 0; i < 3; i++) R.hut(160 + i * 380, 1240 + (i % 2) * 30, 1.1); K.hills(1420, 60, 2.2, m('#8A5A2A', '#2A2A34'), 0.003); };
  const bodhi = (x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-150, 0); ctx.bezierCurveTo(-70, -80, -90, -360, -60, -560); ctx.lineTo(70, -560); ctx.bezierCurveTo(90, -360, 70, -80, 160, 0); ctx.closePath(); ctx.fillStyle = lg(-100, 0, 100, 0, ['#5A3420', '#9A6A3A', '#5A3420']); ctx.fill();
    ctx.strokeStyle = '#5A3420'; ctx.lineWidth = 46; for (const [ex, ey] of [[-330, -760], [300, -780], [-120, -900], [130, -880]]) { ctx.beginPath(); ctx.moveTo(0, -520); ctx.quadraticCurveTo(ex * 0.3, -640, ex, ey); ctx.stroke(); }
    for (let i = 0; i < 26; i++) { const cx = (rnd(i * 3 + 1) - 0.5) * 1100, cy = -760 - rnd(i * 7 + 2) * 420 + Math.abs(cx) * 0.25, r = 120 + rnd(i * 5) * 90; circle(cx + Math.sin(t * 0.8 + i) * 6, cy, r, ['#1E8A4F', '#2FB86A', '#5ADC8A', '#178A5A'][i % 4]); }
    for (let i = 0; i < 14; i++) { const cx = (rnd(i * 11) - 0.5) * 900, cy = -620 - rnd(i * 13) * 200; glow(cx, cy, 70, C.gold, 0.25 + 0.2 * Math.sin(t * 2 + i)); } ctx.restore(); };
  const bdBodhi = (t, mood = 0) => { /* mood 0 dusk · 1 storm · 2 dawn */ const cols = [['#2B1466', '#8A3FB8', '#FF8A7A', '#FFC87A'], ['#06020F', '#1A0A3A', '#4A0A4A', '#1A0418'], ['#3FA9F5', '#FFD9C0', '#FFB36B', '#FF8A5A']][mood];
    fillAll(lg(0, 0, 0, H, cols)); if (mood === 2) { K.rays(540, 1000, 1800, t, C.cream, 0.5, 18); K.sun(540, 1040, 260, t); } if (mood === 0) K.stars(t, 0.5, 4, 60, 500);
    K.hills(1260, 80, 2.4, mood === 1 ? '#0A0418' : mood === 2 ? '#3AB87A' : '#3A1F7A'); bodhi(540, 1500, 1.25, t); K.hills(1560, 40, 1.1, mood === 1 ? '#06020F' : mood === 2 ? '#178A5A' : '#2A1458', 0.003); };
  const petals = (t, n = 22, seed = 0) => K.petals(t, n, seed, 0.9);
  const leafFall = (t, n = 14) => { for (let i = 0; i < n; i++) { const x = (rnd(i * 3) * 1200 + Math.sin(t + i) * 60) % 1200 - 60, y = (rnd(i * 7) * 1900 + t * (60 + rnd(i) * 50)) % 1900; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.8 + i); ctx.beginPath(); ctx.moveTo(0, -20); ctx.bezierCurveTo(22, -16, 20, 12, 0, 30); ctx.bezierCurveTo(-20, 12, -22, -16, 0, -20); ctx.fillStyle = ['#5ADC8A', '#F2C23D', '#2FB86A'][i % 3]; ctx.fill(); ctx.restore(); } };

  // ── 0 · "Long ago, in a garden called Lumbini, a prince was born, named Siddhartha." ─
  add({ id: 'S01', at: 0, cam: [540, 900], zoom: 0.08, note: 'the garden of Lumbini in blossom: Queen Maya holds a glowing newborn; lotuses open at her feet; serif title',
    draw(lt, d, t) { B.backdrop(() => bdGarden(t), 3); B.bokeh(t, 18, '#FFF1B8', 0.24); B.marigolds(t, 7, 420, 2);
      for (let i = 0; i < 7; i++) K.lotus(150 + i * 130, 1700 - Math.abs(i - 3) * 14, 0.9 * eob(seg(lt, 1.6 + i * 0.25, 2.1 + i * 0.25)), 1);
      P(540, 1010, 1.2, { ...Wh.maya, t, eyes: 'happy', look: [-3, 4], tilt: -0.08, armL: [0.4, -1.9], armR: [0.5, -1.9], holdL: baby });
      const a = eo(seg(lt, 0.3, 1.1)) * (1 - seg(lt, 2.4, 3.1)); B.serif('Buddha', 540, 620, 170, { italic: true, w: 600, a }); B.serif('the awakened one', 540, 700, 56, { a, ls: 3 }); petals(t, 18, 4); } });
  cue(0.1, 'bell', { gain: 0.8 }); cue(0.7, 'shimmer', { dur: 2.0, gain: 0.6 }); for (let i = 0; i < 7; i++) cue(1.6 + i * 0.25, 'chime', { gain: 0.4, note: i });

  // ── 1 · "A wise man foretold, he would become a great king, or a great teacher." ─
  { const st = cut(1), kg = Wd('king', 1) - st, tc = Wd('teacher', 1) - st;
    add({ id: 'S02', at: st, cam: [540, 880], zoom: 0.08, note: 'an old seer raises his hands: a crown appears over one, a wheel of teaching over the other',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#2A0E78', '#7B1FA8', '#E0218A', '#FF9A6B'])); K.stars(t, 0.8, 5, 90, 900); K.mandala(540, 760, 520, t, C.gold, 0.5); }, 3); B.bokeh(t, 16, '#FFC8F0', 0.22, 3);
        const a = eob(seg(lt, kg - 0.3, kg + 0.2)), b = eob(seg(lt, tc - 0.3, tc + 0.2));
        if (a > 0) { glow(250, 600, 200, C.gold, 0.6 * a); P6.crown(250, 640 + Math.sin(t * 2) * 8, 2.3 * a, -0.1, 1); } if (b > 0) wheel(830, 590 + Math.cos(t * 2) * 8, 105 * b, t, 1);
        P(540, 1040, 1.2, { ...Wh.shukra, t, eyes: lt > tc ? 'happy' : 'wide', look: [lt > tc ? 4 : -4, -5], armL: [2.2, 0.5], armR: [2.2, 0.5] }); } });
    cue(st, 'bell', { gain: 0.6 }); cue(st + kg - 0.2, 'sparkle', { dur: 1.0 }); cue(st + tc - 0.2, 'shimmer', { dur: 1.6 }); cue(st + tc, 'chime', { note: 4 }); }

  // ── 2 · "His father wanted a king, so he hid every sorrow behind the palace walls." ─
  { const st = cut(2), hd = Wd('hid', 2) - st;
    add({ id: 'S03', at: st, cam: [540, 900], zoom: 0.08, note: 'the king, a hand on his small son; behind them high golden walls rise and shut out a grey world',
      draw(lt, d, t) { const u = eio(seg(lt, hd - 0.3, d));
        B.backdrop(() => { bdRoad(t, 1); const top = lerp(1700, 420, u); ctx.fillStyle = lg(0, top, 0, 1920, ['#FFD27A', '#E0802A', '#B0185A']); ctx.fillRect(-100, top, 1300, 1700); for (let i = 0; i < 9; i++) { ctx.fillStyle = '#FFE08A'; ctx.fillRect(-60 + i * 150, top - 70, 90, 80); } for (let i = 0; i < 4; i++) { ctx.fillStyle = rgba('#7A0A3A', 0.5); rr(90 + i * 270, top + 240, 120, 300, 60); ctx.fill(); } }, 3);
        B.bokeh(t, 14, '#FFD9A0', 0.2, 2);
        P(400, 960, 1.2, { ...Wh.suddhodana, t, eyes: 'open', mouth: 'grim', look: [4, 3], armR: [0.7, 0.3] });
        P(740, 1190, 0.8, { ...Wh.siddBoy, t, ph: 2, eyes: 'happy' }); } });
    cue(st + hd - 0.2, 'rumble', { dur: 2.6, gain: 0.7 }); cue(st + hd + 1.8, 'thud', { gain: 0.6 }); }

  // ── 3 · "Siddhartha grew up among music, gardens, and endless spring." ───
  { const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 900], zoom: 0.08, note: 'the young prince in a garden of blossom and marigolds, a lotus in his hand, his bride beside him',
      draw(lt, d, t) { B.backdrop(() => { bdGarden(t, lt * 30); for (let i = 0; i < 4; i++) K.bird(200 + i * 220 + lt * 40, 380 + (i % 2) * 90, 1.4, t + i, '#7A2A6A'); }, 3); B.bokeh(t, 20, '#FFE0F0', 0.26, 5); B.marigolds(t, 7, 520, 1); B.leaves(t, 1);
        P(790, 1040, 1.02, { ...Wh.queen, t, ph: 1, eyes: 'happy', armL: NAM, armR: NAM });
        P(380, 1000, 1.2, { ...Wh.siddhartha, t, eyes: 'happy', armR: [0.9, 1.4], holdR: () => K.lotus(0, 0, 0.55, 1) }); petals(t, 30, 2); } });
    for (let i = 0; i < 5; i++) cue(st + 0.3 + i * 0.55, 'chime', { gain: 0.5, note: [0, 2, 4, 2, 5][i] }); }

  // ── 4 · "But one day, he rode out beyond the gates." ────────────────────
  { const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 900], zoom: 0.1, note: 'the great gates swing open; he rides out on his white horse',
      draw(lt, d, t) { const u = eio(seg(lt, 0.1, 1.6));
        B.backdrop(() => { bdRoad(t, 0.4); ctx.fillStyle = lg(0, 0, 0, H, ['#E0802A', '#B0185A', '#5A0A3A']); ctx.fillRect(-100, -100, lerp(640, 180, u), 2200); ctx.fillRect(lerp(540, 1000, u), -100, 800, 2200); ctx.fillStyle = '#FFE08A'; ctx.fillRect(lerp(520, 60, u), -100, 26, 2200); ctx.fillRect(lerp(534, 994, u), -100, 26, 2200); }, 3);
        B.bokeh(t, 12, '#FFD9A0', 0.18, 4);
        const x = lerp(260, 520, eo(seg(lt, 0, d))), y = 1180 + bobY(t * 1.2) * 0.6;
        ctx.save(); ctx.beginPath(); ctx.rect(-200, -200, 1500, y + 200); ctx.clip(); P(x, y - 290, 1.1, { ...Wh.siddhartha, t, eyes: 'wide', look: [5, 0], armL: [0.5, -1.0], armR: [0.6, 0.8] }); ctx.restore();
        horse(x, y, 1.25, t, { walk: true }); } });
    cue(st, 'slide', { dur: 1.4, gain: 0.7 }); for (let i = 0; i < 6; i++) cue(st + 0.4 + i * 0.32, 'tock', { gain: 0.5 }); }

  // ── 5 · "He saw an old man, bent with age. A sick man, shaking with fever." ─
  { const st = cut(5), sk = Wd('sick', 5) - st - 0.5;
    add({ id: 'S06', at: st, cam: [540, 900], zoom: 0.1, note: 'FIRST SIGHT: a white-bearded man bent over his staff; the prince stares',
      draw(lt, d, t) { B.backdrop(() => bdRoad(t, 0.75), 3, 0.1); B.bokeh(t, 8, '#C8C8D8', 0.12, 2);
        P(700, 1080, 1.1, { ...Wh.oldMan, t, eyes: 'closed', mouth: 'grim', flip: true, lean: -0.3, tilt: -0.2, armR: [0.9, 0.5], holdR: staff });
        P(210, 1000, 1.0, { ...Wh.siddhartha, t, ph: 1, eyes: 'wide', look: [6, 2] }); } });
    cue(st, 'bell', { gain: 0.4 }); for (let i = 0; i < 3; i++) cue(st + 0.6 + i * 0.7, 'tock', { gain: 0.4 });
    add({ id: 'S07', at: st + sk, cam: [540, 900], zoom: 0.1, note: 'SECOND SIGHT: a grey, shivering man wrapped in his own arms',
      draw(lt, d, t) { B.backdrop(() => bdRoad(t, 0.9), 3, 0.15); B.bokeh(t, 8, '#B8C8D8', 0.12, 5);
        P(690 + Math.sin(t * 38) * 5, 1060, 1.15, { ...Wh.sickMan, t, eyes: 'sad', flip: true, tilt: -0.14, armL: [0.3, -2.0], armR: [0.3, -2.0] });
        P(200, 1010, 1.0, { ...Wh.siddhartha, t, ph: 1, eyes: 'sad', mouth: 'grim', look: [6, 2] }); } });
    cue(st + sk, 'rumble', { dur: 2.0, gain: 0.5 }); }

  // ── 6 · "And a silent procession, carrying someone who would never wake." ─
  { const st = cut(6);
    add({ id: 'S08', at: st, cam: [540, 900], zoom: 0.08, note: 'THIRD SIGHT: far off, four figures carry a white-shrouded bier across the dusk',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#1A1A3A', '#4A3A6A', '#9A6A7A', '#3A2A3A'])); circle(820, 520, 110, rgba('#FFE0C0', 0.7)); K.hills(1120, 90, 3, '#2A2038');
          const x0 = lerp(1150, 380, seg(lt, 0, d + 0.5)); ctx.save(); ctx.filter = 'brightness(0.3)'; for (let i = 0; i < 4; i++) P(x0 + i * 150, 900 + bobY(t * 0.6, i) * 0.5, 0.52, { ...Wh.villager, t, ph: i, flip: true, armR: [2.7, 0.2] }); ctx.restore();
          rr(x0 - 80, 690, 610, 44, 22); ctx.fillStyle = '#F4F0E8'; ctx.fill(); ell(x0 + 40, 676, 60, 30, '#F4F0E8'); K.hills(1300, 50, 1.4, '#1A1424', 0.003); }, 2.5, 0.1);
        B.bokeh(t, 8, '#C8B8D8', 0.1, 3);
        P(250, 1060, 1.25, { ...Wh.siddhartha, t, eyes: 'sad', tilt: 0.12, look: [5, -2], armR: [0.3, -2.0] }); } });
    cue(st, 'bell', { gain: 0.5 }); cue(st + 1.8, 'bell', { gain: 0.35 }); cue(st, 'rumble', { dur: 3.4, gain: 0.5 }); }

  // ── 7 · "Then he saw a wandering monk, who owned nothing, and yet was at peace." ─
  { const st = cut(7), pc = Wd('peace', 7) - st;
    add({ id: 'S09', at: st, cam: [540, 900], zoom: 0.1, note: 'FOURTH SIGHT: a monk with only a bowl, serene, lit from within',
      draw(lt, d, t) { const g = eo(seg(lt, pc - 1.2, pc + 0.4));
        B.backdrop(() => { bdRoad(t, 0.5 - 0.5 * g); K.rays(700, 800, 1500, t, C.cream, 0.5 * g, 14); }, 3); B.bokeh(t, 16, '#FFE9B8', 0.1 + 0.16 * g, 6);
        glow(700, 900, 520, C.gold, 0.4 * g);
        P(700, 1010, 1.2, { ...Wh.monk, t, eyes: 'closed', mouth: 'smile', flip: true, armL: [0.3, -1.3], holdL: bowl(), armR: [0.15, 0.1] });
        P(190, 1040, 1.0, { ...Wh.siddhartha, t, ph: 1, eyes: g > 0.5 ? 'open' : 'sad', look: [6, 0] }); } });
    cue(st, 'chime', { note: 2 }); cue(st + pc - 0.8, 'shimmer', { dur: 2.0, gain: 0.6 }); cue(st + pc, 'bell', { gain: 0.7 }); }

  // ── 8 · "That night, he looked once at his sleeping wife and son, and quietly left the palace." ─
  { const st = cut(8), lf = Wd('quietly', 8) - st - 0.3;
    add({ id: 'S10', at: st, cam: [540, 900], zoom: 0.1, note: 'midnight: his wife asleep with their baby by one lamp; he looks back from the doorway',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#0A0A3A', '#2A1A6A', '#5A2A7A', '#1A0A3A'])); ctx.fillStyle = '#1A1466'; rr(560, 300, 420, 1300, 210); ctx.fill(); circle(770, 520, 80, C.cream); glow(770, 520, 260, C.cream, 0.5); glow(200, 1300, 420, C.orange, 0.5); }, 3, 0.1);
        B.bokeh(t, 10, '#FFC88A', 0.14, 3);
        P(330, 1100, 1.05, { ...Wh.queen, t, eyes: 'closed', tilt: 0.3, lean: 0.08, armL: [0.3, -1.5], armR: [0.5, -1.7], holdL: baby }); R.diya(110, 1600, 1.2, t, 1, 2);
        P(820, 1020, 1.1, { ...Wh.siddhartha, t, ph: 1, eyes: 'sad', flip: true, tilt: 0.1, look: [5, 3], armR: [0.3, -2.0] }); } });
    cue(st, 'bell', { gain: 0.4 });
    add({ id: 'S11', at: st + lf, cam: [540, 900], zoom: 0.08, note: 'THE GREAT DEPARTURE: a white horse carries him away under the full moon',
      draw(lt, d, t) { B.backdrop(() => bdPalace(t, 1), 3); B.bokeh(t, 12, '#BFD0FF', 0.16, 7);
        const x = lerp(240, 620, seg(lt, 0, d + 0.4)), y = 1200 + bobY(t * 1.2) * 0.6;
        ctx.save(); ctx.beginPath(); ctx.rect(-200, -200, 1500, y + 200); ctx.clip(); P(x, y - 290, 1.1, { ...Wh.siddhartha, t, eyes: 'open', mouth: 'grim', look: [5, 0], armL: [0.5, -1.0], armR: [0.6, 0.8] }); ctx.restore();
        horse(x, y, 1.25, t, { walk: true }); } });
    for (let i = 0; i < 6; i++) cue(st + lf + 0.2 + i * 0.34, 'tock', { gain: 0.35 }); }

  // ── 9 · "He cut off his long hair, and traded his silks for a simple robe." ─
  { const st = cut(9), tr = Wd('traded', 9) - st;
    add({ id: 'S12', at: st, cam: [540, 880], zoom: 0.1, note: 'by a river at dawn the prince becomes a seeker: crown and jewels on the ground, a plain ochre robe',
      draw(lt, d, t) { const u = seg(lt, tr - 0.5, tr + 0.3);
        B.backdrop(() => { K.sky('dawn'); K.sun(760, 900, 200, t); K.hills(1080, 120, 4, '#7A4AB8'); ctx.fillStyle = lg(0, 1200, 0, 1700, ['#8FD8F0', '#3A6FD0']); ctx.fillRect(-100, 1200, 1300, 600); K.hills(1560, 40, 1.4, '#3A2A7A', 0.003); }, 3);
        B.bokeh(t, 14, '#FFE0C0', 0.2, 2);
        if (u < 1) P(540, 1020, 1.25, { ...Wh.siddhartha, head: 'jata', pearls: u < 0.3, t, eyes: 'closed', a: 1 - u, armR: [2.3, 1.2], holdR: () => { ctx.save(); ctx.rotate(-0.9); ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-4, -230); ctx.lineTo(8, -250); ctx.lineTo(10, 0); ctx.closePath(); ctx.fillStyle = '#E8F0FF'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); rr(-22, 0, 46, 14, 5); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore(); } });
        if (u > 0) { glow(540, 900, 600, C.cream, 0.5 * Math.sin(u * PI)); P(540, 1020, 1.25, { ...Wh.seeker, t, eyes: 'closed', mouth: 'smile', a: u, armL: NAM, armR: NAM }); }
        const dr = eob(seg(lt, 0.9, 1.5)); if (dr > 0) { P6.crown(840, 1560, 1.2 * dr, 0.3, 1); for (let i = 0; i < 9; i++) circle(700 + i * 16, 1610 + Math.sin(i) * 8, 9 * dr, '#FFF6E6'); } } });
    cue(st + 0.5, 'zip', { gain: 0.6 }); cue(st + 0.9, 'thud', { gain: 0.5 }); cue(st + tr - 0.3, 'shimmer', { dur: 1.6 }); cue(st + tr, 'bell', { gain: 0.6 }); }

  // ── 10 · "For six years he searched, fasting until he was thin as a reed." ─
  { const st = cut(10);
    add({ id: 'S13', at: st, cam: [540, 900], zoom: 0.1, note: 'he sits unmoving while six years of suns, moons and seasons wheel past; his ribs begin to show',
      draw(lt, d, t) { const day = 0.5 + 0.5 * Math.sin(lt * 5), n = clamp(Math.floor(seg(lt, 0.2, 3.2) * 6) + 1, 1, 6);
        B.backdrop(() => { fillAll(lg(0, 0, 0, H, [mix('#0A0A3A', '#7AB8E8', day), mix('#2A2A6A', '#C8D8C8', day), mix('#3A3A5A', '#C8B88A', day), '#5A4A3A'])); K.stars(t, 1 - day, 7, 80, 800); const a = lt * 5; circle(540 + Math.cos(a - PI / 2) * 460, 800 + Math.sin(a - PI / 2) * 460, 90, C.gold); circle(540 - Math.cos(a - PI / 2) * 460, 800 - Math.sin(a - PI / 2) * 460, 64, C.cream);
          for (let i = 0; i < 5; i++) K.tree(60 + i * 250, 1240 + (i % 2) * 30, 1.5, '#3A2A24', mix('#5A8A4A', '#8A6A3A', seg(lt, 0, d))); K.hills(1420, 50, 2, '#3A2A24', 0.003); }, 3, 0.08);
        for (let i = 0; i < 6; i++) { const on = i < n; if (on) glow(315 + i * 90, 560, 44, C.gold, 0.6); circle(315 + i * 90, 560, on ? 15 : 9, on ? C.cream : rgba(C.cream, 0.3)); }
        P(540, 920, 1.2, { ...Wh.seeker, drape: null, ribs: lt > 1.4, bottom: 'sit', t, eyes: 'closed', mouth: 'grim', armL: DHY, armR: DHY }); leafFall(t, 12); } });
    for (let i = 0; i < 6; i++) cue(st + 0.2 + i * 0.5, 'tock', { gain: 0.45 }); cue(st, 'rumble', { dur: 3.6, gain: 0.5 }); }

  // ── 11 · "But starving the body did not free the mind." ─────────────────
  { const st = cut(11);
    add({ id: 'S14', at: st, cam: [540, 820], zoom: 0.14, note: 'close: hollow and worn, he opens his eyes; this is not the way',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#2A2A3A', '#5A5A6A', '#8A7A6A', '#3A2A24'])); K.hills(1300, 60, 2, '#2A2020'); }, 3, 0.12);
        P(540, 900, 1.5, { ...Wh.seeker, drape: null, ribs: true, bottom: 'sit', t, eyes: lt > 0.9 ? 'open' : 'closed', mouth: 'grim', tilt: 0.1, look: [0, 4], armL: DHY, armR: DHY }); leafFall(t, 6); } });
    cue(st + 0.9, 'bell', { gain: 0.4 }); }

  // ── 12 · "So he accepted a bowl of rice milk from a village girl, and chose the middle path." ─
  { const st = cut(12), ch = Wd('chose', 12) - st;
    add({ id: 'S15', at: st, cam: [540, 900], zoom: 0.08, note: 'a village girl kneels with a bowl of rice milk; he takes it, and colour returns to the world',
      draw(lt, d, t) { const u = eio(seg(lt, 0.4, 1.8)), g = eo(seg(lt, ch - 0.4, ch + 0.8));
        B.backdrop(() => { fillAll(lg(0, 0, 0, H, [mix('#8A8A9A', '#FFE9A8', g), mix('#7A8A7A', '#9AE0A8', g), mix('#4A6A5A', '#2AB87A', g), mix('#2A3A34', '#0B6B4F', g)])); K.rays(540, 400, 1700, t, C.cream, 0.45 * g, 14); for (let i = 0; i < 4; i++) K.tree(80 + i * 320, 1200 + (i % 2) * 30, 1.5, '#3A2A24', mix('#4A6A5A', '#3AC88A', g));
          ctx.strokeStyle = rgba('#FFF1B8', 0.8 * g); ctx.lineWidth = 90; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(540, 1900); ctx.quadraticCurveTo(620, 1500, 540, 1150); ctx.stroke(); }, 3);
        B.bokeh(t, 16, '#FFF1B8', 0.1 + 0.14 * g, 3);
        P(330, 940, 1.1, { ...Wh.seeker, drape: g > 0.5 ? Wh.seeker.drape : null, ribs: g < 0.5, bottom: 'sit', t, eyes: g > 0.3 ? 'happy' : 'open', look: [5, 2], armL: [0.2, -1.0], armR: [lerp(lerp(0.2, 0.9, u), 0.3, g), lerp(lerp(0.2, 1.1, u), -1.25, g)], holdR: u > 0.9 ? bowl(1) : null });
        P(820, 1060, 0.95, { ...Wh.sujata, t, ph: 1, eyes: 'happy', flip: true, armR: u > 0.95 ? NAM : [0.9, 1.1], armL: u > 0.95 ? NAM : [0.2, 0.2], holdR: u <= 0.9 ? bowl(1) : null }); } });
    cue(st + 0.4, 'chime', { note: 1 }); cue(st + 1.7, 'gulp', { gain: 0.5 }); cue(st + ch - 0.2, 'shimmer', { dur: 2.0 }); cue(st + ch, 'bell', { gain: 0.7 }); }

  // ── 13 · "He sat beneath a great fig tree, and vowed not to rise until he understood." ─
  { const st = cut(13), vw = Wd('vowed', 13) - st;
    add({ id: 'S16', at: st, cam: [540, 860], zoom: 0.1, pan: [0, 60], note: 'the Bodhi tree, vast and gold-lit at dusk; he sits at its foot and closes his eyes',
      draw(lt, d, t) { B.backdrop(() => bdBodhi(t, 0), 2); B.bokeh(t, 18, '#FFD9A0', 0.22, 4);
        const y = lerp(1040, 960, eo(seg(lt, 0, 1.4)));
        P(540, y, 1.1, { ...Wh.seeker, bottom: 'sit', t, eyes: lt > vw ? 'closed' : 'open', mouth: 'smile', armL: DHY, armR: DHY }); leafFall(t, 10); } });
    cue(st, 'bell', { gain: 0.6 }); cue(st + vw, 'thud', { gain: 0.5 }); cue(st + vw + 0.2, 'shimmer', { dur: 2.2, gain: 0.5 }); }

  // ── 14 · "Mara, lord of illusion, sent storms, and armies, and fear. He simply touched the earth." ─
  { const st = cut(14), th = Wd('touched', 14) - st - 0.5;
    const mara = (t, a) => { ctx.save(); ctx.globalAlpha = a; P(540, 700, 1.7, { ...Wh.mara, t, eyes: 'angry', mouth: 'grim', armL: [1.9, 0.6], armR: [1.9, 0.6] }); for (let i = 0; i < 8; i++) P6.soldier(60 + i * 140, 1250 + (i % 2) * 40, 1.2, t, { ph: i, face: i < 4 ? 1 : -1 }); for (let i = 0; i < 6; i++) R.flame(60 + i * 200, 1460, 1.6, t, i); ctx.restore(); };
    add({ id: 'S17', at: st, cam: [540, 900], zoom: 0.1, note: 'MARA: a towering shadow, storm, flame and an army; the arrows that reach him fall as flowers',
      draw(lt, d, t) { const fl = Math.max(0, 1 - Math.abs(((lt * 0.9) % 1) - 0.1) * 6);
        B.backdrop(() => { bdBodhi(t, 1); fillAll(rgba('#FFD0E8', 0.25 * fl)); K.lightning(240 + (Math.floor(lt * 0.9) % 3) * 300, Math.floor(lt * 0.9) * 3 + 1, fl, 1000); mara(t, eo(seg(lt, 0.1, 1.2))); }, 2.5, 0.1);
        for (let i = 0; i < 10; i++) { const p = ((lt * 0.45 + i / 10) % 1), an = -PI * (0.1 + 0.8 * rnd(i * 3)), r = lerp(1100, 200, p), x = 540 + Math.cos(an) * r, y = 1000 + Math.sin(an) * r;
          if (r > 430) { line([[x, y], [x + Math.cos(an) * 110, y + Math.sin(an) * 110]], '#FF9A6B', 7); } else K.lotus(x, y + (430 - r) * 1.2, 0.34, 1); }
        halo(540, 960 - 130, 250, t, 0.5);
        P(540, 960, 1.1, { ...Wh.seeker, bottom: 'sit', t, eyes: 'closed', mouth: 'smile', armL: DHY, armR: DHY }); K.rain(t, 0.3, 110); } });
    cue(st, 'thunder', { gain: 0.9 }); cue(st, 'growl', { gain: 0.8 }); cue(st, 'rain', { dur: th }); cue(st + 1.6, 'thunder', { gain: 0.7 }); for (let i = 0; i < 4; i++) cue(st + 0.8 + i * 0.6, 'whoosh', { gain: 0.6 });
    add({ id: 'S18', at: st + th, cam: [540, 980], zoom: 0.12, tr: 0.3, note: 'EARTH-TOUCHING: one hand reaches down; rings of gold roll out and the darkness is gone',
      draw(lt, d, t) { const u = eio(seg(lt, 0.1, 0.7)), g = eo(seg(lt, 0.6, 2.0));
        B.backdrop(() => { bdBodhi(t, 1); fillAll(rgba('#FFC87A', 0.45 * g)); mara(t, 1 - g); }, 2.5, 0.1 * (1 - g));
        for (let i = 0; i < 4; i++) { const p = clamp((lt - 0.7) * 0.5 - i * 0.16); if (p > 0 && p < 1) { ctx.strokeStyle = rgba(C.gold, (1 - p) * 0.9); ctx.lineWidth = 16 * (1 - p) + 2; ctx.beginPath(); ctx.ellipse(700, 1390, p * 1000, p * 300, 0, 0, TAU); ctx.stroke(); } }
        halo(540, 960 - 130, 250, t, 0.5 + 0.5 * g);
        P(540, 960, 1.1, { ...Wh.seeker, bottom: 'sit', t, eyes: 'closed', mouth: 'smile', armL: DHY, armR: [lerp(0.2, 0.3, u), lerp(-1.2, 0.05, u)] });
        if (lt > 0.7) glow(700, 1380, 200, C.gold, 0.8 * (1 - seg(lt, 0.7, 2.0)) + 0.2); } });
    cue(st + th + 0.7, 'slam', { gain: 0.7 }); cue(st + th + 0.7, 'bell', { gain: 1.0 }); cue(st + th + 0.8, 'shimmer', { dur: 2.2 }); }

  // ── 15 · "And as the morning star rose, he awoke. He was the Buddha, the awakened one." ─
  { const st = cut(15), aw = Wd('awoke', 15) - st, bd = Wd('Buddha', 15) - st - 0.5;
    add({ id: 'S19', at: st, cam: [540, 880], zoom: 0.1, note: 'the morning star climbs over the tree; his eyes open',
      draw(lt, d, t) { const u = eo(seg(lt, 0, 2.2)), o = lt > aw;
        B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#1A1466', '#5A3FB8', '#FF9AC0', '#FFD9A0'])); K.stars(t, 0.6, 4, 60, 500); K.hills(1260, 80, 2.4, '#3A2A8A'); bodhi(540, 1500, 1.25, t); }, 2);
        const sy = lerp(900, 330, u); glow(840, sy, 220, C.cream, 0.8); K.sparkle(840, sy, 110, 1); B.bokeh(t, 16, '#FFE9D0', 0.22, 2);
        halo(540, 960 - 130, 250, t, o ? 1 : 0.4);
        P(540, 960, 1.1, { ...(o ? Wh.buddha : Wh.seeker), bottom: 'sit', t, eyes: o ? 'open' : 'closed', mouth: 'smile', armL: DHY, armR: [0.3, 0.05] }); } });
    cue(st, 'chime', { note: 4 }); cue(st + 0.8, 'shimmer', { dur: 2.0 }); cue(st + aw, 'bell', { gain: 0.9 });
    add({ id: 'S20', at: st + bd, cam: [540, 860], zoom: 0.08, flash: true, note: 'THE BUDDHA: seated on a great lotus, haloed, the whole sky a wheel of light',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFB03D', '#FF6FA8', '#B04AE0', '#3A1FA8'])); K.rays(540, 760, 1800, t, C.cream, 0.55, 20); K.mandala(540, 760, 600, t, C.cream, 0.7, 5); }, 2.5);
        B.bokeh(t, 22, '#FFF1C8', 0.28, 5); halo(540, 800, 300, t, 1);
        lotusSeat(540, 940 + 372 * 1.2 - 10, 1.25); P(540, 940, 1.2, { ...Wh.buddha, bottom: 'sit', t, eyes: 'closed', mouth: 'smile', armL: DHY, armR: DHY }); petals(t, 30, 3); } });
    cue(st + bd, 'conch', { gain: 0.9 }); cue(st + bd + 0.1, 'bell', { gain: 1.0 }); cue(st + bd + 0.3, 'sparkle', { dur: 2.0 }); }

  // ── 16 · "For forty five years he walked from village to village, teaching kindness, and a calm mind." ─
  { const st = cut(16), tc = Wd('teaching', 16) - st - 0.4;
    add({ id: 'S21', at: st, cam: [540, 900], zoom: 0.06, note: 'he walks the roads with his bowl, monks behind him, villages sliding by',
      draw(lt, d, t) { B.backdrop(() => { K.sky('newdawn'); K.sun(820, 420, 180, t); K.hills(1080, 130, 3, '#5ADC9A'); for (let i = 0; i < 5; i++) { const x = ((i * 380 - lt * 260) % 1900 + 1900) % 1900 - 300; if (i % 2) R.hut(x, 1260, 1.2); else K.tree(x, 1280, 1.6, '#7A4A3A', '#2FB86A'); } K.hills(1420, 50, 1.6, '#19A86A', 0.003); }, 3);
        B.bokeh(t, 14, '#FFF1B8', 0.2, 4);
        for (let i = 0; i < 2; i++) P(150 + i * 180, 1120 + bobY(t, i + 1), 0.8, { ...(i ? Wh.monk2 : Wh.monk), t, ph: i + 1, eyes: 'happy', armL: NAM, armR: NAM });
        halo(690, 1000 - 150, 230, t, 0.8);
        P(690, 1000 + bobY(t), 1.15, { ...Wh.buddha, t, eyes: 'happy', armL: [0.3, -1.3], holdL: bowl(), armR: [0.2, 0.3] }); } });
    for (let i = 0; i < 6; i++) cue(st + 0.3 + i * 0.5, 'tock', { gain: 0.3 }); cue(st, 'chime', { note: 0 });
    add({ id: 'S22', at: st + tc, cam: [540, 900], zoom: 0.08, note: 'the first teaching: a raised hand, a turning wheel, listeners with folded hands, deer in the grove',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFC87A', '#7ADCA8', '#0B8A5F'])); K.rays(540, 620, 1700, t, C.cream, 0.45, 16); for (let i = 0; i < 4; i++) K.tree(60 + i * 330, 1160, 1.6, '#7A4A3A', '#2FB86A'); K.deer(180, 1160, 1.5, 0, '#B8703A'); K.deer(900, 1180, 1.3, 0.4, '#C9803A'); K.hills(1380, 50, 2, '#178A5A', 0.003); }, 3);
        B.bokeh(t, 16, '#FFF1B8', 0.22, 6); wheel(540, 400, 105 * eob(seg(lt, 0.2, 0.9)), t, 0.9); halo(540, 730, 240, t, 1);
        P(540, 860, 1.05, { ...Wh.buddha, bottom: 'sit', t, eyes: 'happy', armL: DHY, armR: ABH });
        for (const [x, ph, f, w] of [[170, 1, false, Wh.monk], [910, 2, true, Wh.monk2], [540, 3, false, Wh.sujata]]) P(x, 1400 + (x === 540 ? 90 : 0), 0.78, { ...w, bottom: w.female ? 'skirt' : 'sit', t, ph, flip: f, eyes: 'closed', armL: NAM, armR: NAM }); petals(t, 14, 6); } });
    cue(st + tc, 'bell', { gain: 0.7 }); cue(st + tc + 0.3, 'shimmer', { dur: 2.0, gain: 0.6 }); }

  // ── 17 · "In many traditions, he is honoured as the ninth avatar of Vishnu," ─
  { const st = cut(17);
    add({ id: 'S23', at: st, cam: [540, 860], zoom: 0.08, note: 'the Buddha stands, hand raised in blessing; Vishnu\'s form, out of focus, in the mandala behind',
      draw(lt, d, t) { B.backdrop(() => { K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700); K.rays(540, 640, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 640, 560, t, C.gold, 0.8); K.vishnu(540, 1060, 1.6, { t, tail: 0 }); }, 2.5);
        B.bokeh(t, 16, '#C8A8FF', 0.2, 5); halo(540, 1020 - 160, 240, t, 0.9);
        P(540, 1020, 1.3, { ...Wh.buddha, t, eyes: 'open', armR: ABH, armL: [0.3, -1.3], holdL: () => K.lotus(0, 0, 0.5, 1) }); petals(t, 16, 8); } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + 1.8, 'bell', { gain: 0.9 }); }

  // ── 18 · "a reminder that peace is not found in palaces, but within." ───
  { const st = cut(18), wi = Wd('within', 18) - st;
    add({ id: 'S24', at: st, cam: [540, 900], zoom: 0.06, tr: 0.7, note: 'sunrise: the palace small and far away; he sits on a lotus, a soft light in his chest; end title',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#5A3FB8', '#FF9AC0', '#FFC87A', '#FFE9A8'])); K.rays(540, 1000, 1700, t, C.cream, 0.45, 16); K.sun(540, 1020, 280, t); K.palace(200, 1150, 0.5, '#B04A9A', C.gold); K.hills(1180, 90, 2, '#7A4AB8'); ctx.fillStyle = lg(0, 1300, 0, 1920, ['#FF9AC0', '#5A3FB8']); ctx.fillRect(-100, 1300, 1300, 700); for (let i = 0; i < 6; i++) K.lotus(80 + i * 200, 1640 + (i % 2) * 60, 1.2, 1); }, 3);
        B.bokeh(t, 22, '#FFE0C0', 0.28, 6); halo(540, 900, 280, t, 1);
        lotusSeat(540, 1030 + 372 * 1.1 - 10, 1.15); P(540, 1030, 1.1, { ...Wh.buddha, bottom: 'sit', t, eyes: 'closed', mouth: 'smile', armL: DHY, armR: DHY });
        const g = eo(seg(lt, wi - 0.4, wi + 0.8)); if (g > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(540, 1170, 90 + 150 * g, C.cream, 0.4 * g); ctx.restore(); K.sparkle(540, 1170, 70 * g, g); }
        const a = eo(seg(lt, Le(18) - st + 0.1, Le(18) - st + 1.0)); B.serif('Buddha', 540, 580, 170, { italic: true, w: 600, a }); B.serif('the ninth avatar of Vishnu', 540, 660, 52, { a, ls: 2 }); petals(t, 14, 9); } });
    cue(st, 'chime', { note: 2 }); cue(st + wi - 0.2, 'shimmer', { dur: 2.4 }); cue(st + wi, 'chime', { note: 4 });
    cue(Le(18) + 0.2, 'conch', { gain: 0.7 }); cue(Le(18) + 0.3, 'bell', { gain: 1.0 }); }

  return { shots: S, cues: CUES };
}
