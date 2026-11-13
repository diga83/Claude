// VAMANA AVATAR (storybook cut): paper puppets in front of soft-focus backdrops. One shot (or two) per narration line.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as Q from './core/kit3.js';
import * as M from './core/kit4.js';
import * as V from './core/kit5.js';
import * as P6 from './core/kit6.js';
import * as B from './core/kit8.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.3);
  const P = B.puppet, Wh = B.WHO, NAM = [0.25, -2.36], bobY = (t, ph = 0) => Math.abs(Math.sin(t * 5.5 + ph)) * -12;
  const INK = '#2B1B14';

  // ---------- backdrops (drawn out of focus) ----------
  const bdHall = (t, cols = ['#3A1280', '#8A1FA8', '#E0507A', '#3A1280']) => { fillAll(lg(0, 0, 0, H, cols)); for (const px of [90, 990]) { rr(px - 70, 0, 140, 1400, 20); ctx.fillStyle = lg(px - 70, 0, px + 70, 0, [rgba('#3A1408', 0.9), rgba('#F2B04D', 0.85), rgba('#3A1408', 0.9)]); ctx.fill(); } for (let i = 0; i < 5; i++) glow(170 + i * 185, 1180 + (i % 2) * 40, 150, '#FFC878', 0.5); };
  const bdSvarga = (t, dim = 0) => { fillAll(lg(0, 0, 0, H, ['#FFC65C', '#FF6FA0', '#9A4AE0', '#4A2AC8'])); K.rays(540, 620, 1700, t, C.cream, 0.3, 16); R.towers(1010, { col: '#F2B04D', lit: C.cream, n: 8, seed: 4, s: 0.8 }); K.clouds(1060, t, '#FFD9EC', 3, 6, 14, 1.0); K.clouds(1300, t, '#FFE4F2', 6, 7, 20, 1.2); if (dim) fillAll(rgba('#1B0F5C', dim)); };
  const bdFest = (t) => { K.sky('gold'); K.sun(820, 420, 190, t); K.hills(980, 180, 2, '#E0703A'); K.sea(1000, t, { cols: ['#FFD27A', '#E0508A'], amp: 10, rows: 3, bottom: 1100, crest: C.cream }); K.hills(1180, 80, 1, '#7A1F6A', 0.002); for (const px of [70, 1010]) { rr(px - 34, 380, 68, 900, 16); ctx.fillStyle = lg(px - 34, 0, px + 34, 0, ['#8A3A05', C.gold, C.cream, '#8A3A05']); ctx.fill(); } };
  const bdCosmos = (t) => { K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700); K.rays(540, 640, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 640, 560, t, C.gold, 0.8); };
  const bdSutala = (t) => { fillAll(lg(0, 0, 0, H, ['#0A0430', '#3A1280', '#0F6B8A', '#0B3B5F'])); for (let i = 0; i < 40; i++) glow(rnd(i) * W, rnd(i * 3) * 1300, 40, [C.cyan, C.pink, C.leaf, C.gold][i % 4], 0.5 + 0.4 * Math.sin(t * 3 + i)); R.towers(1150, { col: '#0FB5A6', lit: C.gold, n: 8, seed: 12, s: 0.8 }); };
  const bdNight = (t) => { K.sky('night'); K.stars(t, 1, 4, 100, 900); glow(820, 330, 240, C.cream, 0.6); circle(820, 330, 80, C.cream); K.tree(170, 1320, 2.0, '#0A2A1A', '#0F4A2A'); R.hut(820, 1320, 1.5); K.hills(1380, 80, 2, '#062018', 0.003); };
  const crown = (x, y, s, rot = 0) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); glow(0, -20, 220, C.gold, 0.5); ctx.beginPath(); ctx.moveTo(-74, 40); ctx.lineTo(-88, -62); ctx.lineTo(-46, -14); ctx.lineTo(0, -106); ctx.lineTo(46, -14); ctx.lineTo(88, -62); ctx.lineTo(74, 40); ctx.closePath(); ctx.fillStyle = lg(0, -106, 0, 40, ['#FFF1B0', '#F2C23D', '#C98A1A']); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3.4 / s; ctx.stroke(); rr(-80, 22, 160, 26, 10); ctx.fillStyle = '#FFE08A'; ctx.fill(); ctx.stroke(); circle(0, -24, 12, '#D12F3E'); ctx.restore(); };
  const petals = (t, n = 22, seed = 0) => K.petals(t, n, seed, 0.9);
  /** little Vamana with his props. props: umbrella in the right hand, pot in the left */
  const boy = (x, y, s, o = {}) => P(x, y, s, { ...Wh.vamana, t: o.t, ...o, armR: o.armR || [0.5, 1.0], armL: o.armL || [0.25, 0.2],
    holdR: o.props === false ? o.holdR : () => V.umbrella(0, -10, 0.62, -0.1), holdL: o.props === false ? o.holdL : () => { ctx.save(); ctx.translate(0, 40); ctx.beginPath(); ctx.ellipse(0, 14, 40, 36, 0, 0, TAU); ctx.fillStyle = lg(-40, 0, 40, 0, ['#B5520A', C.gold, C.paleGold, '#B5520A']); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); rr(-15, -34, 30, 22, 6); ctx.fillStyle = C.gold; ctx.fill(); ctx.stroke(); ctx.restore(); } });
  const prints3 = (lt, at, y) => { for (let i = 0; i < 3; i++) { const x = 300 + i * 240; if (i < 2) V.footprint(x, y, 1.3, 1, 0.2); else { ctx.save(); ctx.setLineDash([16, 14]); ctx.strokeStyle = rgba(C.cream, 0.6 + 0.4 * Math.sin(lt * 8)); ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(x, y, 62, 96, 0.2, 0, TAU); ctx.stroke(); ctx.restore(); B.serif('?', x, y + 40, 150, { italic: true, w: 600, a: seg(lt, at, at + 0.3) }); } } };

  // ── 0 · "Long ago, there lived a demon king named Bali, the grandson of gentle Prahlada." ─
  { const bl = Wd('Bali', 0) - 0.5;
    add({ id: 'S01', at: 0, cam: [540, 820], zoom: 0.08, note: 'a soft-focus throne room; serif title card',
      draw(lt, d, t) { B.backdrop(() => { bdHall(t); R.throne(540, 1250, 1.2); }, 3); B.bokeh(t, 18, '#FFD9A0', 0.24); petals(t, 14, 2);
        const a = eo(seg(lt, 0.4, 1.3)) * (1 - seg(lt, d - 0.6, d - 0.1)); B.serif('Vamana', 540, 800, 220, { italic: true, w: 600, a }); B.serif('the fifth avatar', 540, 890, 62, { a, ls: 3 }); } });
    cue(0.1, 'conch', { gain: 0.6 }); cue(0.6, 'bell', { gain: 0.8 });
    add({ id: 'S02', at: bl, cam: [540, 880], zoom: 0.08, note: 'King Bali: crowned, moustached, kind-eyed',
      draw(lt, d, t) { B.backdrop(() => { bdHall(t); R.throne(540, 1250, 1.2); }, 3); B.bokeh(t, 18, '#FFD9A0', 0.24, 2); B.marigolds(t, 7, 380);
        P(540, 960, 1.3, { ...Wh.bali, t, eyes: 'open', armL: [0.2, 0.15], armR: [0.2, 0.15] }); } });
    cue(bl + 0.2, 'chime', { note: 2 }); }

  // ── 1 · "He was brave, and fair, and so generous that no one who asked ever left his door with empty hands." ─
  { const st = cut(1), gn = Wd('generous', 1) - st;
    add({ id: 'S03', at: st, cam: [540, 900], zoom: 0.08, note: 'he presses gold into a poor man\'s hands',
      draw(lt, d, t) { B.backdrop(() => bdHall(t, ['#5A1F0A', '#B0601A', '#F2A04A', '#5A1F0A']), 3); B.bokeh(t, 18, '#FFC878', 0.24, 3); B.marigolds(t, 7, 420, 2);
        const u = eio(seg(lt, gn - 0.4, gn + 0.6));
        P(740, 950, 1.0, { ...Wh.villager, t, ph: 1, eyes: u > 0.6 ? 'happy' : 'open', flip: true, armR: [0.5, lerp(0.2, 1.3, u)], armL: [0.3, 0.2] });
        P(330, 920, 1.12, { ...Wh.bali, t, eyes: 'happy', armR: [lerp(0.2, 0.75, u), lerp(0.2, 0.9, u)], holdR: () => { if (u > 0.2) { glow(10, 20, 120, C.gold, 0.6); V.gold(10, 50, 0.42, t); } } });
        Q.coins(t, 8, 4, 0.8 * u); } });
    cue(st + gn, 'chime', { note: 3 }); cue(st + gn + 0.4, 'sparkle', { dur: 1.2, gain: 0.5 }); }

  // ── 2 · "But his armies conquered the earth, and then the heavens, and the gods were driven from their home." ─
  { const st = cut(2), gd = Wd('gods', 2) - st - 0.5;
    add({ id: 'S04', at: st, cam: [540, 880], zoom: 0.1, note: 'Bali in war colours, banners rising over earth and sky',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#12001F', '#5A0A3A', '#E0401A', '#3A0A30'])); R.towers(1200, { col: '#2A0418', lit: C.orange, n: 7, seed: 6, s: 0.7 }); for (let i = 0; i < 6; i++) P6.soldier(80 + i * 190, 1340, 1.3, t, { ph: i, still: true }); }, 3); B.bokeh(t, 14, '#FF8A4A', 0.2, 6);
        P(540, 960, 1.25, { ...Wh.bali, t, eyes: 'angry', mouth: 'grim', armR: [lerp(0.3, 2.4, eo(seg(lt, 0.4, 1.4))), 0.4], holdR: () => M.mace(0, -10, 0.7, 0.1) }); } });
    cue(st, 'rumble', { dur: 3.0 }); cue(st + 0.6, 'slam', { gain: 0.5 });
    add({ id: 'S05', at: st + gd, cam: [540, 900], zoom: 0.08, note: 'two gods look back at the gates of heaven as they leave',
      draw(lt, d, t) { B.backdrop(() => bdSvarga(t, 0.35), 3); B.bokeh(t, 12, '#C8A8FF', 0.16, 8);
        const u = seg(lt, 0, d + 0.4);
        P(lerp(700, 620, u), 960 + bobY(t, 1), 1.0, { ...Wh.deva2, t, ph: 1, eyes: 'sad', flip: true, tilt: 0.1 });
        P(lerp(380, 300, u), 940 + bobY(t, 0), 1.08, { ...Wh.deva, t, eyes: 'sad', flip: true, tilt: 0.12 }); } });
    cue(st + gd, 'bell', { gain: 0.5 }); }

  // ── 3 · "Their mother, Aditi, could not bear it. She prayed to Vishnu, day after day." ─
  { const st = cut(3), vi = Wd('Vishnu', 3) - st;
    add({ id: 'S06', at: st, cam: [540, 900], zoom: 0.1, note: 'Aditi prays by a single lamp; Vishnu glimmers, out of focus, above',
      draw(lt, d, t) { const a = eo(seg(lt, vi - 0.6, vi + 0.8));
        B.backdrop(() => { bdNight(t); if (a > 0) { ctx.save(); ctx.globalAlpha = a; K.rays(540, 520, 1200, t, C.paleGold, 0.5, 16); K.vishnu(540, 760, 1.1, { t, tail: 0 }); ctx.restore(); } }, 3, 0.1); B.bokeh(t, 12, '#FFD9A0', 0.14 + 0.1 * a, 3);
        P(540, 1000, 1.25, { ...Wh.aditi, t, eyes: 'closed', tilt: 0.06, armL: NAM, armR: NAM });
        R.diya(250, 1500, 1.3, t, 1, 1); R.diya(830, 1500, 1.3, t, 1, 2); } });
    cue(st + vi - 0.3, 'shimmer', { dur: 2.0, gain: 0.7 }); cue(st + vi, 'bell', { gain: 0.7 }); }

  // ── 4 · "And Vishnu answered. He was born as her own son, a small, bright eyed boy named Vamana." ─
  { const st = cut(4), sm = Wd('small', 4) - st - 0.3, nm = Wd('Vamana', 4) - st;
    add({ id: 'S07', at: st, cam: [540, 900], zoom: 0.08, note: 'a child of light at his mother\'s side',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9A8A', '#C850A8', '#5A1F9A'])); K.rays(680, 900, 1500, t, C.cream, 0.5, 16); }, 3); B.bokeh(t, 18, '#FFE0C0', 0.24, 2);
        P(360, 940, 1.1, { ...Wh.aditi, t, eyes: 'happy', tilt: 0.1, look: [4, 4], armR: [0.6, 0.4] });
        const p = eo(seg(lt, 0.4, 1.8)); glow(740, lerp(500, 1080, p), lerp(420, 240, p), C.cream, 0.9);
        if (p > 0.6) boy(740, 1130, 0.72, { t, a: seg(p, 0.6, 1), eyes: 'closed', props: false }); petals(t, 20, 4); } });
    cue(st, 'conch', { gain: 0.7 }); cue(st + 0.4, 'shimmer', { dur: 1.6 });
    add({ id: 'S08', at: st + sm, cam: [540, 860], zoom: 0.1, note: 'VAMANA: big bright eyes, a tuft of hair, an umbrella over his shoulder',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFB03D', '#FF5A8A', '#7B1FA8'])); K.rays(540, 760, 1600, t, C.cream, 0.5, 18); }, 3); B.bokeh(t, 20, '#FFF1C8', 0.26, 5);
        boy(520, 1080, 1.35, { t, eyes: lt > nm - sm ? 'happy' : 'open' }); petals(t, 16, 6); } });
    cue(st + nm, 'bell', { gain: 0.9 }); cue(st + nm, 'sparkle', { dur: 1.2 }); }

  // ── 5 · "One morning, King Bali held a great ceremony by the river, promising a gift to anyone who asked." ─
  { const st = cut(5), pr = Wd('promising', 5) - st - 0.3;
    add({ id: 'S09', at: st, cam: [540, 880], zoom: 0.08, note: 'the river ceremony: banners, a sacred fire out of focus',
      draw(lt, d, t) { B.backdrop(() => { bdFest(t); V.altar(540, 1320, 1.4, t); }, 3); B.bokeh(t, 18, '#FFC878', 0.26, 1); B.marigolds(t, 7, 360, 4);
        P(330, 960, 1.0, { ...Wh.shukra, t, ph: 1, eyes: 'closed', armL: NAM, armR: NAM }); P(760, 940, 1.1, { ...Wh.bali, t, eyes: 'closed', armL: NAM, armR: NAM }); } });
    cue(st, 'conch', { gain: 0.8 }); cue(st + 0.2, 'sizzle', { dur: 2.4, gain: 0.8 });
    add({ id: 'S10', at: st + pr, cam: [540, 900], zoom: 0.08, note: 'open arms: gifts for anyone who asks',
      draw(lt, d, t) { B.backdrop(() => bdFest(t), 3); B.bokeh(t, 18, '#FFC878', 0.26, 3); B.marigolds(t, 7, 360, 4); Q.coins(t, 10, 2, 0.8);
        P(540, 950, 1.25, { ...Wh.bali, t, eyes: 'happy', armL: [1.1, 0.6], armR: [1.1, 0.6] }); } });
    for (let i = 0; i < 3; i++) cue(st + pr + 0.3 + i * 0.4, 'chime', { gain: 0.6, note: i * 2 }); }

  // ── 6 · "Through the crowd came Vamana, carrying only a little umbrella and a water pot." ─
  { const st = cut(6);
    add({ id: 'S11', at: st, cam: [540, 920], zoom: 0.08, note: 'between two tall guards walks one very small boy',
      draw(lt, d, t) { B.backdrop(() => bdHall(t), 3, 0.12); B.bokeh(t, 14, '#FFD9A0', 0.2, 4);
        const x = lerp(-140, 540, eo(seg(lt, 0, 2.8)));
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); ctx.moveTo(x - 60, -100); ctx.lineTo(x + 60, -100); ctx.lineTo(x + 300, 1700); ctx.lineTo(x - 300, 1700); ctx.closePath(); ctx.fillStyle = lg(0, 0, 0, 1600, [rgba(C.paleGold, 0.35), rgba(C.paleGold, 0.05)]); ctx.fill(); ctx.restore();
        P(130, 760, 1.5, { ...Wh.villager, t, ph: 1, eyes: 'wide', look: [5, 7] }); P(950, 760, 1.5, { ...Wh.villager, t, ph: 2, eyes: 'wide', look: [-5, 7], flip: true });
        boy(x, 1180 + (lt < 2.8 ? bobY(t) : 0), 0.82, { t, look: [3, 0] }); } });
    for (let i = 0; i < 6; i++) cue(st + 0.2 + i * 0.42, 'tock', { gain: 0.4 }); cue(st + 2.8, 'chime', { note: 2 }); }

  // ── 7 · "Bali bowed to the child. Ask for anything, he said. Gold, elephants, a whole kingdom." ─
  { const st = cut(7), w = ['Gold', 'elephants', 'kingdom'].map((x) => Wd(x, 7) - st);
    add({ id: 'S12', at: st, cam: [540, 900], zoom: 0.08, note: 'the king bows low; three bright offers float up as he names them',
      draw(lt, d, t) { B.backdrop(() => bdHall(t), 3); B.bokeh(t, 16, '#FFD9A0', 0.22, 5);
        const b = Math.sin(clamp(seg(lt, 0.1, 1.6)) * PI);
        P(310, 940, 1.1, { ...Wh.bali, t, eyes: b > 0.3 ? 'closed' : 'happy', lean: 0.22 * b, tilt: 0.2 * b, armR: [lerp(0.2, 2.0, seg(lt, 1.8, 2.6)), 0.5] });
        boy(860, 1170, 0.8, { t, flip: true, look: [3, -4] });
        const bub = (i, x, y, fn) => { const p = eob(seg(lt, w[i] - 0.15, w[i] + 0.25)); if (p <= 0) return; ctx.save(); ctx.translate(x, y + Math.sin(t * 2 + i) * 8); ctx.scale(p, p); glow(0, 0, 220, C.cream, 0.6); circle(0, 0, 120, rgba('#FFF6DC', 0.94)); ctx.strokeStyle = INK; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.arc(0, 0, 120, 0, TAU); ctx.stroke(); fn(); ctx.restore(); };
        bub(0, 600, 420, () => V.gold(0, 46, 0.55, t)); bub(1, 840, 600, () => K.elephant(-18, 0, 0.42, t * 0.2, '#6A3A8A')); bub(2, 620, 760, () => K.palace(0, 64, 0.26, '#B0277F', C.gold)); } });
    w.forEach((x, i) => { cue(st + x - 0.1, 'pop', { gain: 0.8 }); cue(st + x, 'chime', { note: i * 2 }); }); }

  // ── 8 · "Vamana smiled. I need only three steps of land, measured by my own feet." ─
  { const st = cut(8), th = Wd('three', 8) - st;
    add({ id: 'S13', at: st, cam: [540, 880], zoom: 0.1, note: 'close on the boy; three small footprints glow in the air',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#2A0E78', '#7B1FA8', '#E0218A', '#FF8A3D'])); K.rays(540, 800, 1600, t, C.cream, 0.35, 16); }, 3); B.bokeh(t, 18, '#FFC8E0', 0.22, 7);
        boy(430, 1120, 1.45, { t, eyes: 'happy', props: false, armR: [lerp(0.3, 2.0, eo(seg(lt, th - 0.5, th))), 0.7] });
        for (let i = 0; i < 3; i++) V.footprint(760 + i * 90, 760 - i * 170, 1.05, eob(seg(lt, th - 0.1 + i * 0.3, th + 0.2 + i * 0.3)), 0.5); } });
    for (let i = 0; i < 3; i++) cue(st + th - 0.1 + i * 0.3, 'chime', { note: i * 2 + 1 }); }

  // ── 9 · "The court laughed. But Bali's teacher whispered, be careful, this is Vishnu himself." ─
  { const st = cut(9), bt = Wd('But', 9) - st - 0.3, vi = Wd('Vishnu', 9) - st;
    add({ id: 'S14', at: st, cam: [540, 900], zoom: 0.08, note: 'courtiers laughing behind their hands',
      draw(lt, d, t) { B.backdrop(() => bdHall(t, ['#5A1F0A', '#B0601A', '#F2A04A', '#5A1F0A']), 3); B.bokeh(t, 16, '#FFC878', 0.22, 2);
        const j = Math.sin(t * 14) * 6;
        P(240, 960 + j, 1.0, { ...Wh.villager, t, eyes: 'happy', mouth: 'o', armR: [0.3, -2.4] }); P(820, 950 - j, 1.0, { ...Wh.woman, t, ph: 2, eyes: 'happy', armL: [0.3, -2.3] }); P(540, 1000 + j * 0.6, 0.92, { ...Wh.deva2, t, ph: 1, eyes: 'happy', mouth: 'o' }); } });
    cue(st + 0.2, 'boing', { gain: 0.5 }); cue(st + 0.6, 'boing', { gain: 0.4 });
    add({ id: 'S15', at: st + bt, cam: [540, 900], zoom: 0.1, note: 'the old teacher leans in; behind the boy a crowned, four-armed shadow',
      draw(lt, d, t) { const a = eo(seg(lt, vi - bt - 0.5, vi - bt + 0.6));
        B.backdrop(() => { bdHall(t, ['#120636', '#3A1280', '#7A1F6A', '#120636']); ctx.save(); ctx.globalAlpha = 0.75 * a; ctx.filter = 'brightness(0.15)'; K.vishnu(540, 1000, 1.7, { t, tail: 0, halo: 0 }); ctx.filter = 'none'; ctx.restore(); glow(540, 700, 500, C.gold, 0.25 * a); }, 3, 0.1);
        P(250, 980, 1.0, { ...Wh.shukra, t, eyes: 'angry', mouth: 'grim', lean: 0.1, look: [5, 0], armR: [1.0, 1.1] });
        P(800, 950, 1.08, { ...Wh.bali, t, ph: 1, eyes: a > 0.5 ? 'wide' : 'open', flip: true, look: [0, 0] });
        boy(540, 1420, 0.62, { t, eyes: 'closed' }); } });
    cue(st + bt, 'rumble', { dur: 3.0, gain: 0.7 }); cue(st + vi, 'shimmer', { dur: 1.6, gain: 0.6 }); }

  // ── 10 · "Bali answered, I have given my word. And he poured the water to seal his promise." ─
  { const st = cut(10), po = Wd('poured', 10) - st - 0.4;
    add({ id: 'S16', at: st, cam: [540, 880], zoom: 0.12, note: 'Bali, eyes closed, a hand on his heart',
      draw(lt, d, t) { B.backdrop(() => { bdHall(t); K.rays(540, 700, 1500, t, C.paleGold, 0.4); }, 3); B.bokeh(t, 16, '#FFD9A0', 0.22, 4);
        P(540, 1040, 1.6, { ...Wh.bali, t, eyes: 'closed', armL: [0.2, 0.15], armR: [0.3, -2.2] }); glow(520, 1240, 130 + 30 * Math.sin(t * 5), C.gold, 0.5); } });
    cue(st + 0.3, 'bell', { gain: 0.7 });
    add({ id: 'S17', at: st + po, cam: [560, 920], zoom: 0.12, note: 'water streams from the king\'s pot into two small cupped hands',
      draw(lt, d, t) { B.backdrop(() => bdFest(t), 3); B.bokeh(t, 18, '#FFC878', 0.24, 6);
        const p = seg(lt, 0.2, 0.8), g = seg(lt, 0.9, d);
        boy(660, 1100, 1.2, { t, eyes: 'closed', props: false, armL: [0.3, -1.9], armR: [0.3, -1.9] });
        glow(660, 1300, 200 * g, C.cyan, 0.6 * g);
        line([[-100, 1190], [200, 1180]], '#8A5A40', 84); line([[-100, 1190], [200, 1180]], '#A8765A', 74);
        ctx.save(); ctx.translate(300, 1140); ctx.rotate(1.0); K.pot(0, 0, 1.2, { glow: 0.3 }); ctx.restore();
        if (p > 0) { const pts = []; for (let i = 0; i <= 16; i++) { const u = i / 16 * p; pts.push([lerp(410, 648, u) + Math.sin(u * 8 - t * 10) * 3, lerp(1186, 1262, u * u) - Math.sin(u * Math.PI) * 26]); } ctx.save(); ctx.globalCompositeOperation = 'lighter'; line(pts, rgba(C.cyan, 0.5), 40); ctx.restore(); line(pts, '#DFF6FF', 14); }
        for (let i = 0; i < 8; i++) K.sparkle(660 + Math.cos(i * 0.8 + t * 2) * 240 * g, 1280 + Math.sin(i * 0.8 + t * 2) * 160 * g, 30, g * (0.5 + 0.5 * Math.sin(t * 5 + i)), C.cyan); } });
    cue(st + po + 0.2, 'bubbles', { dur: 1.4 }); cue(st + po + 0.8, 'plop'); cue(st + po + 1.0, 'shimmer', { dur: 1.4 }); }

  // ── 11 · "The moment it touched his hands, Vamana began to grow, past the trees, past the clouds, past the stars." ─
  { const st = cut(11), gr = Wd('grow', 11) - st - 0.5, marks = ['trees', 'clouds', 'stars'].map((x) => Wd(x, 11) - st - gr);
    add({ id: 'S18', at: st, cam: [540, 900], zoom: 0.12, flash: true, note: 'light pours out of the boy',
      draw(lt, d, t) { B.backdrop(() => { bdFest(t); K.rays(540, 950, 1700, t * 3, C.cream, 0.7, 18); }, 3); B.bokeh(t, 20, '#FFF1C8', 0.3, 2);
        for (let i = 0; i < 3; i++) M.rings(540, 1000, 1100, ((t * 0.7 + i / 3) % 1), C.cream, 1);
        glow(540, 900, 600, C.cream, 0.5); boy(540, 1100, lerp(1.0, 1.3, ei(seg(lt, 0, d))), { t, eyes: 'closed', props: false, armL: [0.6, 0.3], armR: [0.6, 0.3] }); } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + 0.1, 'shimmer', { dur: gr });
    add({ id: 'S19', at: st + gr, cam: [540, 860], zoom: 0.04, tr: 0.4, note: 'TRIVIKRAMA: trees, then clouds, then stars slide down past him',
      draw(lt, d, t) { const g = eio(seg(lt, 0, d + 0.3));
        B.backdrop(() => { fillAll(lg(0, 0, 0, H, [mix('#3FA9F5', '#0A0430', g), mix('#9BE8E0', '#2A0E78', g), mix('#FFF1B8', '#7B1FA8', g), mix('#FFC65C', '#E0218A', g)])); K.stars(t, seg(g, 0.5, 0.85), 5, 140, 1900);
          const ty = g * 2600; for (let i = 0; i < 6; i++) K.tree(-60 + i * 240, 1500 + ty, 2.4 * (1 - g * 0.5), '#0B5B3F', '#19A86A'); K.hills(1700 + ty, 140, 2, '#0B8B5F');
          ctx.save(); ctx.translate(0, -1900 + g * 3600); K.clouds(700, t, '#FFF1F6', 3, 8, 30, 1.6); K.clouds(1100, t, '#FFE4F2', 7, 8, 40, 1.8); ctx.restore();
          if (g > 0.7) M.earth(540, lerp(3000, 2050, seg(g, 0.7, 1)), 520, t, 0); K.mandala(540, 640, 600, t, C.gold, 0.5 * seg(g, 0.5, 1), 4); }, 3);
        B.bokeh(t, 16, '#FFE9C8', 0.2, 9); glow(540, 800, 640, C.gold, 0.4);
        P(540, lerp(980, 900, g), lerp(1.05, 1.5, g), { ...Wh.trivikrama, t, eyes: 'closed', armL: [1.5, 0.9], armR: [1.5, 0.9], holdL: () => K.conch(0, -30, 0.7), holdR: () => K.chakra(0, -34, 36, t) }); } });
    marks.forEach((m, i) => { cue(st + gr + m - 0.15, 'whoosh', { gain: 0.8 + i * 0.2 }); cue(st + gr + m, 'chime', { note: i * 2 + 2 }); }); cue(st + gr, 'rumble', { dur: 5.0, gain: 1.0 }); }

  // ── 12 · "With his first step, he covered the whole earth." ─────────────
  { const st = cut(12), cv = Wd('covered', 12) - st;
    add({ id: 'S20', at: st, cam: [540, 820], zoom: 0.08, note: 'STEP ONE: a vast foot settles on the Earth',
      draw(lt, d, t) { B.backdrop(() => bdCosmos(t), 3); B.bokeh(t, 14, '#C8A8FF', 0.18, 3);
        const u = ei(seg(lt, 0.1, cv)), land = seg(lt, cv, cv + 1.0), sh = Math.sin(t * 60) * 10 * Math.max(0, 1 - land * 2) * (land > 0 ? 1 : 0);
        ctx.save(); ctx.translate(sh, 0); M.earth(540, 1180, 330, t, 0); V.foot(520, lerp(-300, 852, u), 0.82, lerp(-0.25, 0, u));
        M.rings(540, 860, 900, land, C.cream, 3); glow(540, 860, 500 * Math.sin(clamp(land) * PI), C.cream, 0.7 * Math.sin(clamp(land) * PI)); ctx.restore(); } });
    cue(st + 0.1, 'whoosh', { gain: 1.2 }); cue(st + cv, 'slam', { gain: 1.3 }); cue(st + cv, 'thunder', { gain: 0.7 }); }

  // ── 13 · "With his second, he covered the heavens." ─────────────────────
  { const st = cut(13), cv = Wd('covered', 13) - st;
    add({ id: 'S21', at: st, cam: [540, 800], zoom: 0.08, note: 'STEP TWO: the other foot sweeps up through heaven; light springs from his toe',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#0A0430', '#4A1D96', '#B0277F', '#FF9A6B'])); K.stars(t, 1, 9, 140, 1500); R.towers(1300, { col: '#F2B04D', lit: C.cream, n: 7, seed: 4, s: 0.7 }); K.clouds(1360, t, '#FFE4F2', 3, 6, 14, 1.1); }, 3); B.bokeh(t, 14, '#FFD0E0', 0.18, 5);
        const u = eo(seg(lt, 0.05, cv + 0.2));
        ctx.save(); ctx.translate(lerp(-200, 470, u), lerp(2300, 760, u)); ctx.rotate(lerp(-1.2, -0.62, u)); V.foot(0, 0, 0.84, 0); ctx.restore();
        const tx = lerp(-200, 470, u) + 330, ty = lerp(2300, 760, u) - 240, g = seg(lt, cv, cv + 0.6);
        if (g > 0) { const pts = []; for (let i = 0; i <= 20; i++) { const q = i / 20 * g; pts.push([tx + 60 + q * 180 + Math.sin(q * 9 - t * 8) * 14, ty + q * q * 900]); } ctx.save(); ctx.globalCompositeOperation = 'lighter'; line(pts, rgba(C.cyan, 0.5), 60); ctx.restore(); line(pts, '#DFF6FF', 18); glow(tx + 40, ty, 200, C.cream, 0.9); } } });
    cue(st, 'whoosh', { gain: 1.3 }); cue(st + cv, 'slam', { gain: 0.9 }); cue(st + cv + 0.2, 'sparkle', { dur: 1.4 }); }

  // ── 14 · "In all creation, there was nowhere left to stand." ────────────
  { const st = cut(14);
    add({ id: 'S22', at: st, cam: [540, 880], zoom: 0.08, note: 'heaven above and Earth below both carry his footprint; Bali stands between with empty hands',
      draw(lt, d, t) { B.backdrop(() => { K.sky('cosmic'); K.stars(t, 1, 5, 130, 1800); R.towers(460, { col: '#F2B04D', lit: C.cream, n: 7, seed: 4, s: 0.5 }); K.clouds(500, t, '#FFE4F2', 3, 6, 14, 0.8); M.earth(540, 2000, 560, t, 0); }, 3); B.bokeh(t, 12, '#C8A8FF', 0.16, 2);
        V.footprint(540, 400, 1.6, 1, 0.2); V.footprint(540, 1620, 1.6, 1, 0.2);
        P(540, 900, 1.0, { ...Wh.bali, t, eyes: 'sad', armL: [0.9, 0.5], armR: [0.9, 0.5] }); } });
    cue(st, 'shimmer', { dur: 2.2, gain: 0.5 }); }

  // ── 15 · "Then he looked down, and asked, where shall I place my third?" ─
  { const st = cut(15), wh = Wd('where', 15) - st;
    add({ id: 'S23', at: st, cam: [540, 820], zoom: 0.1, note: 'the giant looks down from among the stars: two prints lit, the third an empty outline',
      draw(lt, d, t) { B.backdrop(() => bdCosmos(t), 3); B.bokeh(t, 16, '#C8A8FF', 0.2, 4);
        P(540, 920, 1.55, { ...Wh.trivikrama, t, eyes: 'open', look: [0, 7], tilt: 0.05, armL: [0.3, 0.2], armR: [0.3, 0.2] });
        prints3(lt, wh, 1560); } });
    cue(st + wh, 'bell', { gain: 0.8 }); cue(st + wh + 0.3, 'pop'); }

  // ── 16 · "Bali had nothing left, except himself. He knelt, and offered his own head." ─
  { const st = cut(16), kn = Wd('knelt', 16) - st;
    add({ id: 'S24', at: st, cam: [540, 920], zoom: 0.12, note: 'the crown set down beside him, Bali bows his head',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#2A0E78', '#7B1FA8', '#E0507A', '#FFB85C'])); K.stars(t, 0.7, 5, 80, 800); K.rays(540, 400, 1600, t, C.cream, 0.5, 16); }, 3); B.bokeh(t, 16, '#FFD9C0', 0.22, 6);
        const b = eio(seg(lt, kn - 0.4, kn + 0.8));
        P(540, lerp(960, 1160, b), 1.25, { ...(b > 0.25 ? Wh.baliBare : Wh.bali), t, eyes: 'closed', tilt: 0.3 * b, lean: 0.1 * b, armL: NAM, armR: NAM });
        if (b > 0.25) crown(220, 1560, 1.1, -0.3); } });
    cue(st + kn, 'thud', { gain: 0.5 }); cue(st + kn + 0.6, 'bell', { gain: 0.8 }); }

  // ── 17 · "Vishnu's foot came down as gently as a blessing, and the last of Bali's pride melted away." ─
  { const st = cut(17), bl = Wd('blessing', 17) - st;
    add({ id: 'S25', at: st, cam: [540, 900], zoom: 0.1, note: 'the foot rests on his head as lightly as a hand; gold light, petals',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFB03D', '#FF5A8A', '#7B1FA8'])); K.rays(540, 800, 1700, t * 2, C.cream, 0.6, 18); }, 3); B.bokeh(t, 22, '#FFF1C8', 0.3, 3);
        const u = eio(seg(lt, 0, bl));
        P(560, 1280, 1.25, { ...Wh.baliBare, t, eyes: 'closed', tilt: 0.3, lean: 0.1, mouth: 'smile', armL: NAM, armR: NAM });
        V.foot(470, lerp(300, 880, u), 0.7, 0, { glow: 0.8 });
        const g = seg(lt, bl, bl + 0.7); glow(600, 900, 600 * g, C.cream, 0.7 * g); M.rings(600, 900, 900, seg(lt, bl, bl + 1.4), C.cream, 3); petals(t, 36, 3); } });
    cue(st, 'conch', { gain: 0.6 }); cue(st + bl, 'bell', { gain: 1.0 }); cue(st + bl, 'sparkle', { dur: 2.0 }); }

  // ── 18 · "He made Bali king of the world below, and promised to guard his door forever." ─
  { const st = cut(18), pm = Wd('promised', 18) - st - 0.3;
    add({ id: 'S26', at: st, cam: [540, 880], zoom: 0.08, note: 'the jewelled world below: Bali crowned again, smiling',
      draw(lt, d, t) { B.backdrop(() => { bdSutala(t); R.throne(540, 1300, 1.3); }, 3); B.bokeh(t, 20, '#8FE8FF', 0.24, 2);
        P(540, 960, 1.25, { ...Wh.bali, t, eyes: 'happy', armL: [0.2, 0.15], armR: [0.9, 1.3] }); } });
    cue(st, 'shimmer', { dur: 2.0 });
    add({ id: 'S27', at: st + pm, cam: [540, 880], zoom: 0.08, note: 'at the palace door stands the guard: Vishnu himself, mace in hand',
      draw(lt, d, t) { B.backdrop(() => { bdSutala(t); ctx.beginPath(); ctx.moveTo(240, 1500); ctx.lineTo(240, 620); ctx.bezierCurveTo(240, 380, 440, 360, 540, 220); ctx.bezierCurveTo(640, 360, 840, 380, 840, 620); ctx.lineTo(840, 1500); ctx.closePath(); ctx.fillStyle = lg(0, 220, 0, 1500, [C.cream, C.gold, '#B5720A']); ctx.fill(); ctx.beginPath(); ctx.moveTo(300, 1500); ctx.lineTo(300, 640); ctx.bezierCurveTo(300, 450, 470, 430, 540, 330); ctx.bezierCurveTo(610, 430, 780, 450, 780, 640); ctx.lineTo(780, 1500); ctx.closePath(); ctx.fillStyle = lg(0, 330, 0, 1500, ['#FFE9A8', '#FF9A6B', '#B0277F']); ctx.fill(); }, 3); B.bokeh(t, 18, '#FFE0A0', 0.24, 6);
        P(520, 940, 1.25, { ...Wh.trivikrama, t, eyes: 'closed', armR: [0.5, 0.35], holdR: () => M.mace(10, -30, 0.75, 0.05) });
        for (const dx of [140, 940]) R.diya(dx, 1560, 1.3, t, 1, dx); } });
    cue(st + pm, 'conch', { gain: 0.7 }); cue(st + pm + 0.6, 'bell', { gain: 0.7 }); }

  // ── 19 · "And once every year, they say, Bali returns to visit the people who love him. That day is Onam." ─
  { const st = cut(19), on = Wd('Onam', 19) - st;
    add({ id: 'S28', at: st, cam: [540, 900], zoom: 0.08, note: 'ONAM: palms and backwater, a flower carpet, and the old king home for a day under his umbrella',
      draw(lt, d, t) { B.backdrop(() => { K.sky('newdawn'); K.sun(800, 440, 190, t); K.hills(1000, 200, 1.2, '#5ADC9A'); K.sea(1060, t, { cols: [C.cyan, C.ocean], amp: 10, rows: 3, bottom: 1180, speed: 0.6 }); for (let i = 0; i < 6; i++) P6.palm(40 + i * 200, 1260 + (i % 2) * 30, 1.5 + (i % 3) * 0.2, t, 1); K.hills(1300, 80, 2.5, '#0B8B5F', 0.003); }, 3);
        B.bokeh(t, 18, '#FFF1B8', 0.22, 4); B.marigolds(t, 7, 300, 6);
        const x = lerp(-200, 540, eo(seg(lt, 0, 2.6)));
        P(190, 1000, 0.85, { ...Wh.woman, t, ph: 1, eyes: 'happy', look: [4, 0], armL: NAM, armR: NAM }); P(900, 1010, 0.85, { ...Wh.villager, t, ph: 2, eyes: 'happy', flip: true, armL: [2.2, 0.5], armR: [0.2, 0.2] });
        P(x, 940 + (lt < 2.6 ? bobY(t) : 0), 1.15, { ...Wh.bali, t, eyes: 'happy', armL: [0.2, 0.2], armR: [0.5, 1.0], holdR: () => V.umbrella(0, -10, 0.95, -0.08) });
        const g = eob(seg(lt, on - 0.4, on + 0.2)); ctx.save(); ctx.translate(540, 1640); ctx.scale(1, 0.34); for (let r = 5; r >= 1; r--) { for (let i = 0; i < r * 9; i++) { const a = i * TAU / (r * 9) + r; circle(Math.cos(a) * r * 62 * g, Math.sin(a) * r * 62 * g, 26, [C.gold, '#FF8A1F', C.magenta, C.cream, '#D12F3E'][r - 1]); } } circle(0, 0, 40 * g, C.cream); ctx.restore(); petals(t, 24, 8); } });
    cue(st, 'conch', { gain: 0.6 }); for (let i = 0; i < 5; i++) cue(st + 0.3 + i * 0.5, 'tock', { gain: 0.35 }); cue(st + on, 'bell', { gain: 0.9 }); cue(st + on, 'sparkle', { dur: 1.4 }); }

  // ── 20 · "This is Vamana, the fifth avatar of Vishnu," ──────────────────
  { const st = cut(20);
    add({ id: 'S29', at: st, cam: [540, 840], zoom: 0.08, note: 'the boy with his umbrella; Vishnu\'s form, out of focus, in the mandala behind',
      draw(lt, d, t) { B.backdrop(() => { bdCosmos(t); K.vishnu(540, 1060, 1.6, { t, tail: 0 }); }, 2.5); B.bokeh(t, 16, '#C8A8FF', 0.2, 5);
        boy(520, 1120, 1.35, { t, eyes: 'happy' }); petals(t, 16, 8); } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + 1.4, 'bell', { gain: 0.9 }); }

  // ── 21 · "a reminder that true greatness lies in humility, and in keeping your word." ─
  { const st = cut(21);
    add({ id: 'S30', at: st, cam: [540, 880], zoom: 0.06, tr: 0.7, note: 'sunset: he walks on, three glowing footprints behind him; end title',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dusk'); K.stars(t, 0.7, 3, 70, 700); K.rays(540, 900, 1600, t, C.cream, 0.4); K.sun(540, 900, 280, t, { c2: C.orange, c3: C.magenta }); K.hills(1100, 180, 2, '#6B1FA8'); K.tree(150, 1300, 1.6, '#2A0E66', '#3D1690'); K.hills(1400, 90, 1, '#2A0E66', 0.002); }, 3);
        B.bokeh(t, 22, '#FFC8A0', 0.28, 6); const x = lerp(330, 620, seg(lt, 0, d));
        for (let i = 0; i < 3; i++) V.footprint(x - 190 - i * 150, 1600 + (i % 2) * 24, 1.0, seg(lt, 0.4 + i * 0.3, 0.8 + i * 0.3), 1.5);
        boy(x, 1160 + bobY(t), 0.9, { t, look: [3, 0] });
        const a = eo(seg(lt, Le(21) - st + 0.1, Le(21) - st + 1.0)); B.serif('Vamana', 540, 600, 200, { italic: true, w: 600, a }); B.serif('the fifth avatar of Vishnu', 540, 680, 54, { a, ls: 2 }); } });
    for (let i = 0; i < 6; i++) cue(st + 0.3 + i * 0.55, 'tock', { gain: 0.35 }); cue(st + 0.4, 'shimmer', { dur: 2.6, gain: 0.5 });
    cue(Le(21) + 0.2, 'conch', { gain: 0.8 }); cue(Le(21) + 0.3, 'bell', { gain: 1.0 }); }

  return { shots: S, cues: CUES };
}
