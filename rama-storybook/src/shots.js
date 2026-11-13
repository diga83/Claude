// RAMA AVATAR (storybook cut): paper puppets in front of soft-focus backdrops. One shot (or two) per narration line.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as M from './core/kit4.js';
import * as B from './core/kit8.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.3);
  const P = B.puppet, Wh = B.WHO, NAM = [0.25, -2.36], bobY = (t, ph = 0) => Math.abs(Math.sin(t * 5.5 + ph)) * -12;

  // ---------- backdrops (drawn out of focus) ----------
  const bdCity = (t) => { K.sky('gold'); K.sun(540, 700, 280, t); R.towers(1040, { col: '#F2A04D', lit: C.cream, n: 9, seed: 2, s: 0.95 }); K.palace(540, 1110, 1.05, '#D9601A', C.cream); R.towers(1210, { col: '#A8275A', lit: C.gold, n: 7, seed: 5, s: 0.6 }); fillAll(rgba('#7A2A0A', 0.18)); };
  const bdHall = (t, cols = ['#4A1608', '#9A4A14', '#D9781A', '#5A1F0A']) => { fillAll(lg(0, 0, 0, H, cols)); for (const px of [90, 990]) { rr(px - 70, 0, 140, 1400, 20); ctx.fillStyle = lg(px - 70, 0, px + 70, 0, [rgba('#3A1408', 0.9), rgba('#F2B04D', 0.8), rgba('#3A1408', 0.9)]); ctx.fill(); } for (let i = 0; i < 5; i++) glow(170 + i * 185, 1180 + (i % 2) * 40, 150, '#FFC878', 0.5); };
  const bdForest = (t, dark = 0, sc = 0) => { const m = (a, b) => mix(a, b, dark);
    fillAll(lg(0, 0, 0, H, [m('#FFE9A8', '#0A1238'), m('#8AD88A', '#0B2F4F'), m('#2A9A6A', '#0A2F3F'), m('#0B5B3F', '#04202A')]));
    if (dark < 0.6) K.rays(860, 120, 1900, t, C.cream, 0.4 * (1 - dark), 12);
    for (let i = 0; i < 6; i++) K.tree(((i * 330 - sc * 0.3) % 1980 + 1980) % 1980 - 300, 1010 + (i % 2) * 30, 1.3 + (i % 3) * 0.15, m('#1A7A4F', '#06262F'), m('#3AB87A', '#0A3A45'));
    for (let i = 0; i < 4; i++) K.tree(((i * 520 + 60 - sc * 0.6) % 2100 + 2100) % 2100 - 320, 1250 + (i % 2) * 24, 1.9, m('#0B4B2F', '#041A22'), m('#178A5A', '#062A38'));
    K.hills(1300, 80, 4.1, m('#0B6B4F', '#052530'), 0.0025); };
  const bdCosmos = (t) => { K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700); K.rays(540, 640, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 640, 560, t, C.gold, 0.8); };
  const bdLanka = (t, fire = 0) => { fillAll(lg(0, 0, 0, H, ['#0A0018', '#4A0028', '#B0103A', '#1A0020'])); R.towers(1200, { col: '#16030E', lit: C.orange, n: 8, seed: 3, s: 0.85 }); if (fire) for (let i = 0; i < 8; i++) R.flame(40 + i * 150, 1150 - (i % 3) * 90, 2.6 * fire, t, i); };
  const bdSea = (t, sky = 'dusk') => { K.sky(sky); K.sun(540, 980, 240, t, { c2: C.orange, c3: C.magenta }); K.sea(1040, t, { cols: ['#FF9A8A', '#3A1FA8'], amp: 26, rows: 7, crest: C.cream, speed: 2 }); };
  const bdNightCity = (t, lit = 1) => { K.sky('night'); K.stars(t, 1, 8, 110, 900); glow(540, 1100, 900, C.orange, 0.35 * lit); R.towers(1040, { col: '#3A1680', lit: C.gold, n: 9, seed: 2, s: 0.95, dim: 1 - lit * 0.9 }); K.palace(540, 1110, 1.05, '#2A0E66', '#FFD27A'); R.towers(1210, { col: '#1B0F5C', lit: C.gold, n: 7, seed: 5, s: 0.6 });
    for (let i = 0; i < 40; i++) glow(40 + rnd(i) * 1000, 640 + rnd(i * 3) * 640, 40, C.orange, lit * (0.5 + 0.4 * Math.sin(t * 3 + i))); };
  const crown = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, -20, 260, C.gold, 0.7); ctx.beginPath(); ctx.moveTo(-74, 40); ctx.lineTo(-88, -62); ctx.lineTo(-46, -14); ctx.lineTo(0, -106); ctx.lineTo(46, -14); ctx.lineTo(88, -62); ctx.lineTo(74, 40); ctx.closePath(); ctx.fillStyle = lg(0, -106, 0, 40, ['#FFF1B0', '#F2C23D', '#C98A1A']); ctx.fill(); ctx.strokeStyle = '#2B1B14'; ctx.lineWidth = 3.4 / s; ctx.stroke(); rr(-80, 22, 160, 26, 10); ctx.fillStyle = '#FFE08A'; ctx.fill(); ctx.stroke(); circle(0, -24, 12, '#D12F3E'); for (let i = -3; i <= 3; i++) circle(i * 22, 35, 6, i % 2 ? '#D12F3E' : '#2E9A6A'); ctx.restore(); };
  const petals = (t, n = 22, seed = 0) => K.petals(t, n, seed, 0.9);

  // ── 0 · "Long ago, in the golden city of Ayodhya," ──────────────────────
  add({ id: 'S01', at: 0, cam: [540, 820], zoom: 0.08, note: 'soft-focus Ayodhya at sunrise; a serif title card',
    draw(lt, d, t) { B.backdrop(() => bdCity(t), 3); B.bokeh(t, 18, '#FFD9A0', 0.24); petals(t, 16, 2);
      const a = eo(seg(lt, 0.4, 1.4)) * (1 - seg(lt, d - 0.7, d - 0.1)); B.serif('Rama', 540, 800, 250, { italic: true, w: 600, a }); B.serif('the seventh avatar', 540, 890, 62, { a, ls: 3 }); } });
  cue(0.1, 'conch', { gain: 0.6 }); cue(0.6, 'bell', { gain: 0.8 }); cue(1.2, 'sparkle', { dur: 1.6, gain: 0.5 });

  // ── 1 · "a prince was born to King Dasharatha, and his name was Rama." ──
  { const st = cut(1), nm = Wd('Rama', 1) - st;
    add({ id: 'S02', at: st, cam: [480, 900], zoom: 0.08, note: 'the queen cradles a blue-skinned baby; the old king beams',
      draw(lt, d, t) { B.backdrop(() => bdHall(t, ['#5A1430', '#B0407A', '#F2A04A', '#5A1F0A']), 3); B.bokeh(t, 16, '#FFD0B0', 0.22, 3); B.marigolds(t, 7, 420);
        P(770, 900, 1.0, { ...Wh.dasharatha, t, ph: 2, eyes: 'happy', armL: [0.9, 1.2] });
        P(360, 920, 1.08, { ...Wh.queen, t, eyes: 'happy', tilt: 0.1, armL: [0.2, -1.5], armR: [0.2, -1.5] });
        const g = seg(lt, nm - 0.2, nm + 0.5), by = 1160 + Math.sin(t * 1.4) * 5; glow(380, by, 200 + 160 * g, C.cream, 0.45 + 0.3 * g);
        ctx.save(); ctx.translate(380, by); ctx.rotate(-0.12); ctx.beginPath(); ctx.ellipse(0, 0, 150, 62, 0, 0, TAU); ctx.fillStyle = lg(0, -62, 0, 62, ['#FFF6DC', '#F2D9A0']); ctx.fill(); ctx.strokeStyle = '#2B1B14'; ctx.lineWidth = 3.4; ctx.stroke();
        circle(-92, -14, 50, '#9EC0F0'); ctx.beginPath(); ctx.arc(-92, -14, 50, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(-92, -24, 50, PI * 1.1, PI * 1.9); ctx.fillStyle = '#2A1A1E'; ctx.fill();
        ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-108, -8, 9, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.beginPath(); ctx.arc(-76, -8, 9, 0.1 * PI, 0.9 * PI); ctx.stroke(); ctx.beginPath(); ctx.arc(-92, 8, 9, 0.2 * PI, 0.8 * PI); ctx.stroke(); circle(-92, -30, 4, '#D12F3E'); ctx.restore();
        petals(t, 18, 4); } });
    cue(st + 0.2, 'chime', { note: 2 }); cue(st + nm, 'bell', { gain: 0.9 }); cue(st + nm, 'sparkle', { dur: 1.2, gain: 0.6 }); }

  // ── 2 · "He was Vishnu himself, the seventh avatar," ────────────────────
  { const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 820], zoom: 0.08, note: 'a young prince with closed eyes; Vishnu glows, out of focus, behind him',
      draw(lt, d, t) { B.backdrop(() => { bdCosmos(t); K.vishnu(540, 1040, 1.5, { t, tail: 0 }); }, 2.5); B.bokeh(t, 14, '#C8A8FF', 0.2, 5);
        P(540, 1010, 1.25, { ...Wh.ramaBoy, t, eyes: 'closed', armL: NAM, armR: NAM }); petals(t, 14, 3); } });
    cue(st, 'conch', { gain: 0.8 }); cue(st + 0.3, 'shimmer', { dur: 2.0, gain: 0.7 }); }

  // ── 3 · "born to end the terror of Ravana, the ten headed king of Lanka." ─
  { const st = cut(3), ten = Wd('ten', 3) - st;
    add({ id: 'S04', at: st, cam: [540, 860], zoom: 0.1, note: 'Ravana: ten crowned heads in a row against burning Lanka',
      draw(lt, d, t) { B.backdrop(() => bdLanka(t, 0.5), 3, 0.1); B.bokeh(t, 14, '#FF7A4A', 0.2, 7);
        const r = eo(seg(lt, 0, 1.3)); P(540, lerp(1500, 940, r), 0.9, { ...Wh.ravana, t, eyes: 'angry', armR: [lerp(0.2, 1.5, eo(seg(lt, ten, ten + 0.7))), 1.0], armL: [0.5, 0.4] }); } });
    cue(st, 'rumble', { dur: 4.2 }); cue(st + 0.4, 'growl', { gain: 0.8 }); cue(st + ten, 'slam', { gain: 0.5 }); }

  // ── 4 · "Rama grew up brave and gentle, and when he lifted the mighty bow of Shiva," ─
  { const st = cut(4), wh = Wd('when', 4) - st - 0.2, lf = Wd('lifted', 4) - st;
    add({ id: 'S05', at: st, cam: [540, 900], zoom: 0.08, note: 'the boy prince in a sunlit garden, a fawn nosing his hand',
      draw(lt, d, t) { B.backdrop(() => { K.sky('newdawn'); K.sun(800, 430, 200, t); K.hills(940, 220, 1.2, '#5ADC9A'); K.palace(250, 900, 0.6, '#E88A3D', C.cream); K.tree(960, 1200, 1.6, '#0B5B3F', '#19A86A'); K.hills(1260, 110, 2.5, '#0B8B5F', 0.003); }, 3);
        B.bokeh(t, 14, '#FFF1B8', 0.2, 2); P(420, 900, 1.15, { ...Wh.ramaBoy, t, eyes: 'happy', armR: [0.8, 0.5] }); K.deer(800, 1240, 1.3, t * 0.2, '#C9601A'); } });
    cue(st + 0.3, 'chime', { note: 1 }); cue(st + 1.0, 'chime', { note: 3 });
    add({ id: 'S06', at: st + wh, cam: [560, 860], zoom: 0.1, note: 'in the great hall he raises Shiva\'s bow as if it weighed nothing',
      draw(lt, d, t) { B.backdrop(() => bdHall(t, ['#2A0E66', '#6B1FA8', '#C8327F', '#3A1280']), 3); B.bokeh(t, 14, '#C8A8FF', 0.2, 4);
        const u = eio(seg(lt, lf - wh - 0.3, lf - wh + 0.9)); glow(700, 760, 420, C.cyan, 0.3 + 0.3 * u);
        R.bow(700, lerp(1060, 780, u), 1.75, lerp(-1.3, -0.1, u), 0, { ornate: true });
        P(400, 940, 1.1, { ...Wh.ramaRoyal, t, eyes: 'open', look: [4, -2], armR: [lerp(0.5, 1.5, u), 0.3] }); } });
    cue(st + lf - 0.2, 'shimmer', { dur: 1.4 }); }

  // ── 5 · "it snapped in two," ────────────────────────────────────────────
  { const st = L(5) - 0.1, sn = Wd('snapped', 5) - st;
    add({ id: 'S07', at: st, cam: [600, 820], zoom: 0.12, tr: 0, note: 'CRACK: the bow breaks in a burst of light',
      draw(lt, d, t) { const p = seg(lt, sn - 0.05, sn + 0.5), sh = Math.sin(t * 60) * 10 * Math.max(0, 1 - Math.abs(lt - sn - 0.1) * 3);
        ctx.save(); ctx.translate(sh, 0); B.backdrop(() => bdHall(t, ['#2A0E66', '#6B1FA8', '#C8327F', '#3A1280']), 3);
        ctx.fillStyle = rgba('#DFF6FF', 0.6 * Math.max(0, 1 - Math.abs(lt - sn) * 4)); ctx.fillRect(-200, -200, W + 400, H + 400);
        K.rays(700, 780, 1500, t * 4, C.cyan, 0.6 * p * (1 - seg(lt, sn + 0.6, d)), 16);
        R.bow(700, 780, 1.75, -0.1, 0, { ornate: true, snap: eo(p) });
        P(400, 940, 1.1, { ...Wh.ramaRoyal, t, eyes: p > 0 ? 'wide' : 'open', armR: [1.5, 0.3] });
        for (let i = 0; i < 14; i++) { const an = i * TAU / 14, r = eo(p) * (200 + rnd(i) * 400); K.sparkle(700 + Math.cos(an) * r, 780 + Math.sin(an) * r, 34, p > 0 ? 1 - p * 0.7 : 0, i % 2 ? C.cyan : C.cream); }
        ctx.restore(); } });
    cue(st + sn, 'thunder', { gain: 0.8 }); cue(st + sn, 'slam', { gain: 0.8 }); }

  // ── 6 · "and he won the hand of Princess Sita." ─────────────────────────
  { const st = cut(6);
    add({ id: 'S08', at: st, cam: [540, 900], zoom: 0.08, note: 'the wedding: marigold strings, banana leaves, two hands joined',
      draw(lt, d, t) { B.backdrop(() => fillAll(lg(0, 0, 0, H, ['#3A1408', '#8A3A14', '#C9601A', '#5A1F0A'])), 3); B.bokeh(t, 20, '#FFC878', 0.26, 1); B.leaves(t, 1); B.leaves(t, -1); B.marigolds(t, 7, 460);
        P(350, 900, 1.1, { ...Wh.ramaRoyal, t, eyes: 'happy', armR: [0.42, 0.05] }); P(748, 930, 1.05, { ...Wh.sitaBride, t, ph: 1, eyes: 'happy', tilt: -0.06, armL: [0.42, 0.05] });
        glow(548, 1250, 110, C.cream, 0.5 + 0.2 * Math.sin(t * 3)); petals(t, 26, 2); } });
    cue(st, 'bell'); cue(st + 0.2, 'sparkle', { dur: 1.8, gain: 0.6 }); }

  // ── 7 · "But on the eve of his crowning, his stepmother claimed an old promise from the king," ─
  { const st = cut(7), sm = Wd('stepmother', 7) - st - 0.3;
    add({ id: 'S09', at: st, cam: [540, 860], zoom: 0.12, note: 'the crown waits on its cushion, lamps lit for morning',
      draw(lt, d, t) { B.backdrop(() => { bdHall(t, ['#3A1280', '#8A1FA8', '#E0507A', '#3A1280']); R.throne(540, 1200, 1.1); }, 3); B.bokeh(t, 16, '#FFD9A0', 0.24, 6);
        const cy = 820 + Math.sin(t * 1.5) * 10; ctx.beginPath(); ctx.ellipse(540, cy + 110, 230, 60, 0, 0, TAU); ctx.fillStyle = lg(0, cy + 50, 0, cy + 170, ['#D12F3E', '#8A1226']); ctx.fill(); ctx.strokeStyle = '#2B1B14'; ctx.lineWidth = 3.4; ctx.stroke();
        crown(540, cy, 1.9); for (const dx of [170, 910]) R.diya(dx, 1300, 1.3, t, 1, dx); } });
    cue(st + 0.2, 'shimmer', { dur: 1.6, gain: 0.6 });
    add({ id: 'S10', at: st + sm, cam: [540, 900], zoom: 0.1, note: 'Queen Kaikeyi points; the old king\'s head sinks',
      draw(lt, d, t) { B.backdrop(() => bdHall(t, ['#120636', '#3A1280', '#7A1F6A', '#120636']), 3, 0.2); B.bokeh(t, 10, '#B080FF', 0.14, 8);
        const u = eio(seg(lt, 0.2, 1.3));
        P(320, 960, 1.0, { ...Wh.dasharatha, t, eyes: 'sad', tilt: 0.16 * u, lean: -0.06 * u, armR: [0.3, lerp(0.2, -2.7, u)] });
        P(770, 900, 1.08, { ...Wh.kaikeyi, t, ph: 1, eyes: 'angry', armL: [lerp(0.2, 1.3, u), 0.2] }); } });
    cue(st + sm, 'rumble', { dur: 3.0, gain: 0.7 }); }

  // ── 8 · "fourteen years of exile in the forest." ────────────────────────
  { const st = cut(8);
    add({ id: 'S11', at: st, cam: [540, 860], zoom: 0.1, note: 'night forest, a full moon, a hut out of focus; Rama in hermit\'s cloth',
      draw(lt, d, t) { B.backdrop(() => { K.sky('night'); K.stars(t, 1, 3, 80, 800); glow(820, 330, 240, C.cream, 0.6); circle(820, 330, 80, C.cream); K.tree(820, 1320, 2.3, '#0A2A1A', '#0F4A2A'); R.hut(300, 1320, 1.6); K.hills(1380, 80, 2, '#062018', 0.003); }, 3, 0.12);
        B.bokeh(t, 10, '#9FC0FF', 0.12, 2); P(540, 930, 1.25, { ...Wh.ramaForest, t, mouth: 'grim' }); } });
    cue(st, 'bell', { gain: 0.7 }); cue(st + 0.2, 'rumble', { dur: 2.0, gain: 0.5 }); }

  // ── 9 · "Rama simply smiled and obeyed," ────────────────────────────────
  { const st = cut(9);
    add({ id: 'S12', at: st, cam: [540, 800], zoom: 0.1, note: 'close: a calm smile, hands folded',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFB85C', '#3AC88A', '#0B6B4F'])); K.rays(540, 700, 1500, t, C.cream, 0.5); }, 3); B.bokeh(t, 18, '#FFF1B8', 0.26, 4);
        P(540, 1100, 1.75, { ...Wh.ramaForest, t, eyes: 'happy', armL: NAM, armR: NAM, quiver: false }); petals(t, 12, 6); } });
    cue(st + 0.2, 'chime', { note: 2 }); cue(st + 0.9, 'chime', { note: 4 }); }

  // ── 10 · "and Sita and his brother Lakshmana walked beside him." ────────
  { const st = L(10) - 0.15;
    add({ id: 'S13', at: st, cam: [540, 900], zoom: 0.06, note: 'three travellers in the sunlit forest',
      draw(lt, d, t) { B.backdrop(() => bdForest(t, 0, lt * 160), 3); B.bokeh(t, 16, '#FFF1B8', 0.2, 5);
        P(215, 960 + bobY(t, 0.5), 0.86, { ...Wh.lakshmana, t, ph: 1, look: [3, 0], armL: [0.15 + Math.sin(t * 5.5) * 0.2, 0.2], armR: [0.15 - Math.sin(t * 5.5) * 0.2, 0.2] });
        P(540, 990 + bobY(t, 1.2), 0.84, { ...Wh.sitaForest, t, ph: 2, eyes: 'happy', look: [3, 0] });
        P(860, 950 + bobY(t, 0), 0.9, { ...Wh.ramaForest, t, look: [3, 0], armL: [0.15 - Math.sin(t * 5.5) * 0.2, 0.2], armR: [0.15 + Math.sin(t * 5.5) * 0.2, 0.2] }); } });
    for (let i = 0; i < 6; i++) cue(st + 0.3 + i * 0.5, 'tock', { gain: 0.35 }); }

  // ── 11 · "One day, a dazzling golden deer lured Rama away," ─────────────
  { const st = cut(11), dz = Wd('dazzling', 11) - st;
    add({ id: 'S14', at: st, cam: [600, 900], zoom: 0.08, note: 'a golden deer, sparkling; Rama turns to follow',
      draw(lt, d, t) { B.backdrop(() => bdForest(t, 0.2, lt * 60), 3); B.bokeh(t, 14, '#FFE9A8', 0.2, 6);
        P(lerp(180, 300, seg(lt, 1.2, d)), 950, 0.95, { ...Wh.ramaForest, t, eyes: 'wide', look: [6, 2], armR: [0.9, 0.4] });
        const x = lerp(640, 900, eio(seg(lt, 0.8, d + 0.6))), y = 1130 - Math.abs(Math.sin(lt * 3.2)) * 90; glow(x, y - 40, 380, C.gold, 0.5 + 0.3 * seg(lt, dz - 0.2, dz + 0.3));
        for (let i = 1; i < 9; i++) K.sparkle(x - i * 46, 1090 - Math.abs(Math.sin((lt - i * 0.045) * 3.2)) * 90 + Math.sin(i * 3) * 30, 34 - i * 3, 1 - i / 9, i % 2 ? C.cream : C.gold);
        K.deer(x, y, 1.5, t, '#FFB21F'); } });
    cue(st + dz, 'shimmer', { dur: 2.0 }); cue(st + dz, 'bell', { gain: 0.5 }); }

  // ── 12 · "and Ravana swooped down in his flying chariot," ───────────────
  { const st = cut(12);
    add({ id: 'S15', at: st, cam: [540, 900], zoom: 0.1, note: 'a shadow crosses the hut: the dark chariot drops out of the sky toward Sita',
      draw(lt, d, t) { const u = eio(seg(lt, 0, d));
        B.backdrop(() => { bdForest(t, 0.35 + 0.4 * u, 0); R.hut(230, 1300, 1.3); fillAll(rgba('#7A0A3A', 0.3 * u)); }, 3);
        R.chariot(lerp(1400, 760, u), lerp(-200, 520, u), 0.62, t, { dark: true, rot: lerp(0.35, 0.05, u), face: -1, riders: () => P(0, -250, 0.42, { ...Wh.ravana, t, eyes: 'angry', heads: false }) });
        P(430, 1000, 1.2, { ...Wh.sitaForest, t, eyes: 'wide', look: [5, -7], armL: [lerp(0.2, 2.0, u), 0.7], armR: [lerp(0.2, 2.2, u), 0.7] }); } });
    cue(st, 'whoosh'); cue(st + 0.3, 'rumble', { dur: 2.6 }); cue(st + 1.4, 'growl', { gain: 0.6 }); }

  // ── 13 · "and carried Sita off across the sea." ─────────────────────────
  { const st = cut(13);
    add({ id: 'S16', at: st, cam: [540, 820], zoom: 0.08, note: 'the chariot over a red sea; her jewels fall behind like sparks',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H * 0.8, ['#1A0030', '#7A0A4A', '#E0403A', '#FF9A4D'])); K.sun(540, 980, 240, t, { c2: C.orange, c3: C.red, glow: 0.4 }); K.sea(1080, t, { cols: ['#E0507A', '#2A0440'], amp: 30, rows: 7, speed: 3, crest: C.cream }); }, 3);
        B.bokeh(t, 10, '#FF9A6B', 0.16, 3); const x = lerp(260, 800, seg(lt, 0, d + 0.4)), y = 700 + Math.sin(t * 2) * 14;
        for (let i = 0; i < 9; i++) { const p = ((t * 0.7 + i / 9) % 1); K.sparkle(x - 260 - p * 200 + Math.sin(i * 4) * 40, y + 40 + p * 520, 26 * (1 - p * 0.5), 1 - p, i % 2 ? C.gold : C.cream); }
        R.chariot(x, y, 0.8, t, { dark: true, rot: -0.08, riders: () => { P(80, -250, 0.4, { ...Wh.ravana, t, eyes: 'angry', heads: false }); P(-110, -240, 0.4, { ...Wh.sitaForest, t, eyes: 'sad', flip: true, armR: [2.4, 0.4] }); } }); } });
    cue(st, 'whoosh'); cue(st, 'waves', { dur: 2.4, gain: 0.7 }); }

  // ── 14 · "The brave old eagle Jatayu fought to stop him, but could not." ─
  { const st = cut(14), bt = Wd('but', 14) - st;
    add({ id: 'S17', at: st, cam: [540, 800], zoom: 0.08, note: 'Jatayu dives at the chariot, then falls, feathers drifting',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H * 0.8, ['#1A0030', '#7A0A4A', '#E0403A', '#FF9A4D'])); K.sun(540, 1000, 240, t, { c2: C.orange, c3: C.red, glow: 0.4 }); R.chariot(lerp(820, 1000, seg(lt, 0, d)), lerp(520, 360, seg(lt, 0, d)), lerp(0.5, 0.3, seg(lt, 0, d)), t, { dark: true }); K.sea(1140, t, { cols: ['#E0507A', '#2A0440'], amp: 30, rows: 6, speed: 3, crest: C.cream }); }, 2.5);
        const u = eio(seg(lt, 0, 1.2)), f = seg(lt, bt - 0.2, d + 0.3);
        R.eagle(lerp(-200, 430, u) - f * 60, lerp(300, 720, u) + ei(f) * 420, 1.3, t, { rot: lerp(0.5, -0.1, u) + f * 1.5, flap: f > 0 ? 2 : 9 });
        const hit = seg(lt, 1.15, 1.6); if (hit > 0 && hit < 1) { for (let i = 0; i < 12; i++) K.sparkle(680 + Math.cos(i * 0.52) * 130 * hit, 640 + Math.sin(i * 0.52) * 130 * hit, 40, 1 - hit, i % 2 ? C.gold : C.white); }
        if (f > 0) for (let i = 0; i < 10; i++) { const p = ((t * 0.3 + i / 10) % 1); ctx.save(); ctx.translate(260 + rnd(i) * 460 + Math.sin(t * 2 + i) * 50, 480 + p * 800); ctx.rotate(t * 1.4 + i); ctx.globalAlpha = (1 - p) * f; ell(0, 0, 12, 42, i % 2 ? '#FFE09A' : '#D9782A'); ctx.restore(); } } });
    cue(st, 'conch', { gain: 0.5 }); cue(st + 0.2, 'whoosh'); cue(st + 1.2, 'slam', { gain: 0.7 }); cue(st + bt, 'slide', { dur: 1.4 }); }

  // ── 15 · "Heartbroken, Rama searched the forests," ──────────────────────
  { const st = cut(15);
    add({ id: 'S18', at: st, cam: [500, 920], zoom: 0.1, note: 'blue dusk and rain: Rama, a tear on his cheek; his brother behind him',
      draw(lt, d, t) { B.backdrop(() => bdForest(t, 0.95, 0), 3, 0.1); B.bokeh(t, 8, '#8FB8FF', 0.1, 4);
        P(810, 980, 0.92, { ...Wh.lakshmana, t, ph: 1, eyes: 'sad', flip: true });
        P(420, 960, 1.25, { ...Wh.ramaForest, t, eyes: 'sad', tilt: 0.14, armR: [0.3, -2.1] });
        glow(470, 1130, 110, C.gold, 0.7); K.sparkle(470, 1130, 36 + Math.sin(t * 5) * 8, 1, C.gold); K.rain(t, 0.4, 130); } });
    cue(st, 'rain', { dur: 3.0 }); cue(st + 0.3, 'bell', { gain: 0.4 }); }

  // ── 16 · "until he met Hanuman, the mighty monkey hero, who vowed to find her." ─
  { const st = L(16) - 0.15, hn = Wd('Hanuman', 16) - st, vw = Wd('who', 16) - st - 0.2;
    add({ id: 'S19', at: st, cam: [540, 820], zoom: 0.1, note: 'HANUMAN against the sunrise, bright-eyed, hands joined',
      draw(lt, d, t) { B.backdrop(() => { K.sky('gold'); K.rays(540, 700, 1600, t, C.cream, 0.45, 16); K.sun(540, 700, 330, t); K.mountain(180, 1500, 700, 620, '#C9501A', '#7A1F4A', false); K.mountain(900, 1500, 800, 700, '#D9601A', '#8A1F5A', false); }, 3);
        B.bokeh(t, 16, '#FFE9A8', 0.22, 2); const p = eob(seg(lt, hn - 0.35, hn + 0.15));
        P(540, lerp(1700, 980, clamp(p)), 1.3, { ...Wh.hanuman, t, eyes: 'open', armL: NAM, armR: NAM }); } });
    cue(st + hn - 0.3, 'conch', { gain: 0.9 }); cue(st + hn + 0.2, 'sparkle', { dur: 1.2 });
    add({ id: 'S20', at: st + vw, cam: [540, 900], zoom: 0.08, note: 'he bows to Rama and gives his word',
      draw(lt, d, t) { B.backdrop(() => { K.sky('gold'); K.sun(760, 520, 240, t); K.mountain(240, 1500, 800, 640, '#D9601A', '#8A1F5A', false); K.hills(1300, 130, 2, '#6A1670', 0.003); }, 3); B.bokeh(t, 16, '#FFE9A8', 0.22, 6);
        P(330, 1010, 1.02, { ...Wh.hanuman, t, eyes: 'closed', lean: 0.14, tilt: 0.1, armL: NAM, armR: NAM });
        P(800, 930, 1.05, { ...Wh.ramaForest, t, ph: 1, eyes: 'happy', flip: true, armR: [0.75, 1.5] }); } });
    cue(st + vw + 0.2, 'bell', { gain: 0.6 }); }

  // ── 17 · "With one giant leap, Hanuman crossed the ocean," ──────────────
  { const st = cut(17);
    add({ id: 'S21', at: st, cam: [540, 820], zoom: 0.08, note: 'THE LEAP: arms out ahead, clouds tearing past, the sea far below',
      draw(lt, d, t) { B.backdrop(() => { K.sky('day'); K.sun(880, 380, 200, t); K.clouds(300, t, rgba(C.white, 0.9), 2, 6, 700, 0.9); K.clouds(620, t, rgba('#FFE9D0', 0.8), 7, 5, 1000, 0.7); K.sea(1180, t, { cols: [C.cyan, C.deep], amp: 30, rows: 7, speed: 6, wl: 190 }); }, 3);
        const u = eo(seg(lt, 0, 1.2)), x = lerp(60, 470, u), y = lerp(1150, 800, u) + Math.sin(t * 2.2) * 16;
        ctx.save(); ctx.strokeStyle = rgba(C.white, 0.7); ctx.lineWidth = 8; ctx.lineCap = 'round'; for (let i = 0; i < 14; i++) { const ly = 430 + i * 60, lx = ((rnd(i) * 1300 - t * 1500) % 1400 + 1400) % 1400 - 200; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx - 150, ly + 26); ctx.stroke(); } ctx.restore();
        glow(x + 100, y, 460, C.gold, 0.4);
        P(x, y, 1.0, { ...Wh.hanuman, t, eyes: 'angry', mouth: 'smile', lean: 1.25, armL: [2.95, 0.1], armR: [2.95, 0.1] }); } });
    cue(st, 'whoosh', { gain: 1.3 }); cue(st + 0.1, 'conch', { gain: 0.7 }); cue(st + 0.3, 'waves', { dur: 3.0, gain: 0.8 }); }

  // ── 18 · "found Sita in a garden in Lanka, and gave her Rama's ring." ───
  const bdGrove = (t) => { fillAll(lg(0, 0, 0, H, ['#0A0A4A', '#1F2A8A', '#0B6B7F', '#062F3A'])); K.stars(t, 0.9, 6, 70, 700); glow(210, 330, 230, C.cream, 0.5); circle(210, 330, 80, C.cream); R.towers(1100, { col: '#150A40', lit: C.orange, n: 7, seed: 9, s: 0.6 }); K.tree(760, 1300, 2.2, '#3A1F0A', '#0B6B4F'); for (let i = 0; i < 26; i++) { const an = rnd(i) * TAU, r = rnd(i * 3) * 280; circle(760 + Math.cos(an) * r * 1.2, 520 + Math.sin(an) * r * 0.9, 18 + rnd(i * 5) * 10, i % 3 ? C.red : C.coral); } };
  { const st = cut(18), gv = Wd('gave', 18) - st - 0.25;
    add({ id: 'S22', at: st, cam: [540, 920], zoom: 0.1, note: 'the Ashoka grove by moonlight: Sita alone, eyes lowered',
      draw(lt, d, t) { B.backdrop(() => bdGrove(t), 3, 0.1); B.bokeh(t, 10, '#9FC0FF', 0.12, 5);
        P(540, 980, 1.3, { ...Wh.sitaForest, t, eyes: 'sad', tilt: 0.1, armL: [0.2, -2.0], armR: [0.2, -2.0] });
        for (let i = 0; i < 6; i++) { const q = ((t * 0.25 + i / 6) % 1); ctx.save(); ctx.translate(300 + rnd(i) * 500, 400 + q * 900); ctx.rotate(t + i); ctx.globalAlpha = 1 - q; ell(0, 0, 18, 10, C.coral); ctx.restore(); } } });
    cue(st + 0.2, 'chime', { note: 0 });
    add({ id: 'S23', at: st + gv, cam: [540, 900], zoom: 0.1, note: 'Hanuman holds out Rama\'s ring; her face lights',
      draw(lt, d, t) { B.backdrop(() => bdGrove(t), 3, 0.15); const g = eo(seg(lt, 0.2, 1.0));
        P(790, 960, 1.05, { ...Wh.sitaForest, t, ph: 1, eyes: g > 0.5 ? 'happy' : 'sad', armL: [lerp(0.2, 0.9, g), lerp(0.2, 1.3, g)] });
        P(300, 1000, 1.0, { ...Wh.hanuman, t, eyes: 'open', look: [4, -2], armR: [1.15, 0.9] });
        K.rays(560, 860, 700, t, C.paleGold, 0.5 * g, 12); R.ring(560, 860 + Math.sin(t * 2) * 8, lerp(0.7, 1.4, g), t); } });
    cue(st + gv + 0.3, 'bell', { gain: 0.8 }); cue(st + gv + 0.3, 'sparkle', { dur: 1.4 }); }

  // ── 19 · "Then he set the demon city ablaze with his burning tail." ─────
  { const st = cut(19);
    add({ id: 'S24', at: st, cam: [540, 820], zoom: 0.1, note: 'Lanka in flames behind him; his tail a torch',
      draw(lt, d, t) { const u = seg(lt, 0, d + 0.2); B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#0A0018', '#5A0A2A', '#E0401A', '#FFB03D'])); R.towers(1200, { col: '#3A0A20', lit: C.gold, n: 8, seed: 3, s: 0.8 }); for (let i = 0; i < 9; i++) R.flame(40 + i * 125, 1000 + (i % 3) * 90, (2.2 + (i % 2)) * clamp(u * 3), t, i); }, 2.5);
        B.bokeh(t, 22, '#FF9A3D', 0.3, 9); const x = lerp(240, 700, u), y = 900 - Math.abs(Math.sin(u * PI * 2)) * 170;
        P(x, y, 0.95, { ...Wh.hanuman, t, eyes: 'angry', mouth: 'smile', lean: 0.35, armL: [2.4, 0.5], armR: [1.2, 1.4], tailFn: (tx, ty) => R.flame(tx, ty, 1.6, t, 3) });
        K.motes(t, 40, C.orange, 0.9, 9); } });
    cue(st, 'whoosh'); cue(st + 0.2, 'sizzle', { dur: 3.0, gain: 1.4 }); cue(st + 0.3, 'rumble', { dur: 3.0 }); }

  // ── 20 · "Back on the shore, an army of monkeys built a bridge of floating stones," ─
  { const st = cut(20), bl = Wd('built', 20) - st - 0.2;
    add({ id: 'S25', at: st, cam: [540, 920], zoom: 0.06, note: 'on the shore the monkey army hauls boulders past Rama',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dawn'); K.sun(820, 560, 200, t); K.sea(900, t, { cols: ['#FFB27A', '#5A1FA8'], amp: 16, rows: 5, bottom: 1200, crest: C.cream }); K.hills(1220, 120, 2.2, '#5A1F8A', 0.0022); }, 3); B.bokeh(t, 12, '#FFD9C0', 0.18, 3);
        P(230, 900, 0.95, { ...Wh.ramaForest, t, look: [4, 2], armR: [1.2, 0.3] });
        for (let i = 0; i < 7; i++) { const x = ((i * 190 + lt * 170) % 1350) - 130, row = i % 2; R.monkey(x, 1250 + row * 90, 1.0 + row * 0.2, t, { carry: true, ph: i, col: ['#C9601A', '#A84A12'][row] }); } } });
    for (let i = 0; i < 5; i++) cue(st + 0.2 + i * 0.4, 'tock', { gain: 0.5 });
    add({ id: 'S26', at: st + bl, cam: [600, 800], zoom: 0.08, note: 'stone after stone floats, a path toward Lanka',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dawn'); K.sun(280, 520, 180, t); R.towers(820, { col: '#5A1466', lit: C.gold, n: 5, seed: 3, s: 0.34 }); K.sea(800, t, { cols: ['#FF9A8A', '#3A1FA8'], amp: 18, rows: 10, crest: C.cream }); }, 3);
        const N = 10; for (let i = N - 1; i >= 0; i--) { const u = i / (N - 1), p = seg(lt, 0.1 + i * 0.2, 0.3 + i * 0.2); if (p <= 0) continue; const x = lerp(170, 880, u), y = lerp(1260, 880, Math.pow(u, 0.8)), s = lerp(0.95, 0.24, u);
          K.ripples(x, y + 30 * s, t + i, 2, 190 * s, C.white, 0.5); R.stone(x, y + K.bob(t, i, 5) + (1 - eob(p)) * -140, s, Math.sin(i * 3) * 0.08, true); K.splash(x, y, 200 * s, seg(lt, 0.25 + i * 0.2, 0.75 + i * 0.2), C.cream); } } });
    for (let i = 0; i < 9; i++) cue(st + bl + 0.25 + i * 0.2, 'plop', { gain: 0.7 }); }

  // ── 21 · "each one carved with Rama's name." ────────────────────────────
  { const st = cut(21), nm = Wd('name', 21) - st;
    add({ id: 'S27', at: st, cam: [540, 840], zoom: 0.12, note: 'one stone, close: राम in gold',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFB27A', '#E0508A', '#5A2FD0', '#1B0F5C'])); K.sea(560, t, { cols: ['#FF9A8A', '#2A1F9A'], amp: 22, rows: 10, crest: C.cream }); }, 3); B.bokeh(t, 14, '#FFD9C0', 0.2, 4);
        const g = seg(lt, nm - 0.3, nm + 0.3), y = 860 + K.bob(t, 0, 16); K.ripples(540, y + 110, t, 4, 520, C.white, 0.6); K.rays(540, y, 1100, t, C.paleGold, 0.45 * g, 14); R.stone(540, y, 2.2, Math.sin(t * 1.2) * 0.04, true, 0.4 + 0.5 * g); } });
    cue(st + nm, 'bell', { gain: 0.9 }); cue(st + nm, 'sparkle', { dur: 1.0 }); }

  // ── 22 · "They marched into Lanka, and a great battle shook the earth." ─
  { const st = cut(22), gr = Wd('great', 22) - st;
    add({ id: 'S28', at: st, cam: [540, 880], zoom: 0.1, note: 'Rama and Hanuman at the head of the charge; arrows cross a red sky',
      draw(lt, d, t) { const k = seg(lt, gr - 0.2, gr + 0.2), sh = Math.sin(t * 50) * 7 * k; ctx.save(); ctx.translate(sh, Math.cos(t * 43) * 5 * k);
        B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#3A0420', '#C0302A', '#FF8A3D', '#5A0A2A'])); R.towers(1100, { col: '#2A0418', lit: C.orange, n: 6, seed: 7, s: 0.8 }); for (let i = 0; i < 8; i++) R.monkey(60 + i * 140, 1330 + (i % 2) * 40, 1.1, t, { spear: true, ph: i }); }, 3);
        B.bokeh(t, 16, '#FF9A3D', 0.22, 2);
        for (let i = 0; i < 9; i++) { const p = ((t * 1.3 + i / 9) % 1); const ax = lerp(-100, 1200, p), ay = 420 + i * 40 - Math.sin(p * PI) * 140; line([[ax - 90, ay + 20 - Math.cos(p * PI) * 30], [ax, ay]], i % 3 ? C.cream : C.gold, 6); }
        P(840, 980 + bobY(t, 1), 0.95, { ...Wh.hanuman, t, ph: 1, eyes: 'angry', mouth: 'grim', armR: [2.3, 0.5], holdR: () => M.mace(0, -20, 0.8, 0.2) });
        P(300, 940 + bobY(t, 0), 1.1, { ...Wh.ramaForest, t, eyes: 'angry', mouth: 'grim', look: [4, 0], armR: [1.1, 0.5], holdR: () => R.bow(10, -20, 0.7, 0, 0, {}) });
        ctx.restore(); } });
    cue(st + 0.1, 'conch', { gain: 0.8 }); cue(st + gr, 'slam', { gain: 0.9 }); cue(st + gr, 'rumble', { dur: 2.2, gain: 1.1 }); cue(st + gr + 0.6, 'thunder', { gain: 0.5 }); }

  // ── 23 · "At last, Rama drew a blazing arrow," ──────────────────────────
  const fallAt = Le(23) + 0.1;
  { const st = cut(23), dr = Wd('drew', 23) - st;
    add({ id: 'S29', at: st, cam: [600, 860], zoom: 0.12, note: 'the bow drawn to his ear; the arrowhead burns',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0274A', '#FF9A3D', '#3A1280'])); K.mandala(430, 760, 600, t, C.gold, 0.6, 4); K.rays(430, 760, 1500, t, C.paleGold, 0.4); }, 3); B.bokeh(t, 14, '#FFD9A0', 0.2, 6);
        const p = eio(seg(lt, dr - 0.3, dr + 0.6));
        P(400, 960, 1.25, { ...Wh.ramaForest, t, eyes: 'angry', mouth: 'grim', look: [5, 0], armL: [lerp(-0.6, -1.25, p), lerp(-1.2, -0.9, p)], armR: [1.47, 0.06], holdR: () => R.bow(6, -22, 0.8, 0, p, { arrow: true, blaze: p }) }); } });
    cue(st + dr - 0.2, 'slide', { dur: 0.9 }); cue(st + dr, 'shimmer', { dur: 1.4 });
    // ── 24 · "and Ravana fell." ───────────────────────────────────────────
    add({ id: 'S30', at: fallAt, cam: [540, 860], zoom: 0.08, tr: 0, note: 'the arrow strikes; Ravana topples in a storm of light',
      draw(lt, d, t) { B.backdrop(() => bdLanka(t, 0), 3); const hit = 0.4, a = seg(lt, 0, hit), f = eio(seg(lt, hit, d + 0.2));
        P(560 + f * 80, 960 + f * 260, 0.9, { ...Wh.ravana, t, eyes: 'wide', lean: f * 0.7, a: 1 - f * 0.6, armL: [1.6, 0.6], armR: [1.6, 0.6] });
        if (a < 1) R.arrowFly(lerp(-200, 560, a), lerp(1000, 900, a), -0.12, 1.1, 1, t);
        else { const b = seg(lt, hit, hit + 0.9); K.rays(560, 900, 1700, t * 4, C.cream, 0.8 * (1 - b), 18); glow(560, 900, 300 + 1200 * eo(b), C.cream, 1 - b); } } });
    cue(fallAt, 'zip'); cue(fallAt + 0.4, 'slam', { gain: 1.2 }); cue(fallAt + 0.4, 'thunder', { gain: 0.8 }); }

  // ── 25 · "Rama and Sita were together again," ───────────────────────────
  { const st = L(25) - 0.12;
    add({ id: 'S31', at: st, cam: [540, 900], zoom: 0.1, flash: true, note: 'sunrise: hands joined again, eyes closed, petals',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9A8A', '#E0508A', '#5A1F9A'])); K.rays(540, 760, 1600, t, C.cream, 0.5); K.sun(540, lerp(980, 760, eo(seg(lt, 0, 2))), 280, t); }, 3); B.bokeh(t, 20, '#FFE0C0', 0.26, 1);
        P(350, 920, 1.1, { ...Wh.ramaForest, t, eyes: 'happy', armR: [0.42, 0.05], quiver: false }); P(748, 950, 1.05, { ...Wh.sitaForest, t, ph: 1, eyes: 'happy', tilt: -0.08, armL: [0.42, 0.05] });
        glow(548, 1270, 120, C.cream, 0.6); petals(t, 30, 3); } });
    cue(st, 'bell', { gain: 0.9 }); cue(st + 0.2, 'sparkle', { dur: 2.0, gain: 0.6 }); }

  // ── 26 · "and after fourteen long years, they flew home to Ayodhya," ────
  { const st = cut(26), fl = Wd('they', 26) - st - 0.2;
    add({ id: 'S32', at: st, cam: [540, 820], zoom: 0.08, note: 'fourteen lamps kindle one by one',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dusk'); K.stars(t, 0.8, 3, 70, 700); K.sun(540, 1100, 240, t, { c2: C.orange, c3: C.magenta }); K.hills(1140, 180, 2, '#4A1580'); K.hills(1320, 80, 1, '#150A4A', 0.003); }, 3); B.bokeh(t, 12, '#FFC8A0', 0.18, 2);
        for (let i = 0; i < 14; i++) { const u = i / 13, on = seg(lt, 0.1 + i * (fl - 0.3) / 14, 0.25 + i * (fl - 0.3) / 14); R.diya(120 + u * 840, 760 - Math.sin(u * PI) * 240, 0.66, t, eob(on), i); } } });
    for (let i = 0; i < 14; i++) cue(st + 0.1 + i * (fl - 0.3) / 14, 'chime', { gain: 0.45, note: i % 7 });
    add({ id: 'S33', at: st + fl, cam: [540, 800], zoom: 0.08, note: 'the golden Pushpaka sails home through pink cloud',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dusk'); K.stars(t, 0.9, 3, 80, 900); K.sun(240, 1150, 260, t, { c2: C.orange, c3: C.magenta }); K.clouds(1100, t, rgba('#FF9AC0', 0.8), 2, 5, 200, 1.1); K.clouds(1380, t, rgba('#FFD0E0', 0.9), 6, 5, 320, 1.2); }, 3); B.bokeh(t, 14, '#FFD0E0', 0.2, 5);
        const x = lerp(380, 600, eo(seg(lt, 0, d + 0.5))), y = 900 + Math.sin(t * 1.6) * 16;
        R.chariot(x, y, 0.95, t, { rot: -0.05, glow: 0.7, riders: () => { P(-120, -250, 0.36, { ...Wh.lakshmana, t, ph: 1 }); P(0, -262, 0.4, { ...Wh.ramaForest, t, eyes: 'happy' }); P(120, -250, 0.36, { ...Wh.sitaForest, t, ph: 2, eyes: 'happy' }); } });
        for (let i = 0; i < 8; i++) { const p = ((t * 0.6 + i / 8) % 1); K.sparkle(x - 330 - p * 300, y + Math.sin(i * 3) * 80, 24 * (1 - p), 1 - p, C.gold); } } });
    cue(st + fl, 'whoosh'); cue(st + fl + 0.1, 'shimmer', { dur: 2.0 }); }

  // ── 27 · "where every street glowed with tiny lamps." ───────────────────
  { const st = cut(27);
    add({ id: 'S34', at: st, cam: [520, 920], zoom: 0.08, note: 'a woman kneels to light one more lamp; the whole city glows behind her',
      draw(lt, d, t) { const w = seg(lt, 0.1, 2.0); B.backdrop(() => bdNightCity(t, w), 3); B.bokeh(t, 26, '#FFB85C', 0.3 * w, 3);
        P(380, 960, 1.15, { ...Wh.queen, t, eyes: 'happy', tilt: 0.08, look: [3, 5], armR: [0.7, 1.1], holdR: () => R.diya(40, 40, 1.0, t, 1, 2) });
        for (let i = 0; i < 6; i++) R.diya(90 + i * 180, 1560 + (i % 2) * 20, 1.1, t, seg(w, i / 8, i / 8 + 0.15), i + 10); } });
    cue(st + 0.2, 'shimmer', { dur: 2.2 }); cue(st + 1.2, 'bell', { gain: 0.6 }); }

  // ── 28 · "That night of lights is still celebrated as Diwali." ──────────
  { const st = cut(28), dw = Wd('Diwali', 28) - st;
    const fw = [[250, 420, 230, 0.2, C.gold], [820, 360, 260, 0.7, C.pink], [540, 560, 200, 1.2, C.cyan], [200, 700, 180, 1.7, C.leaf], [880, 680, 210, 2.1, C.saffron], [540, 330, 300, 2.6, C.magenta]];
    add({ id: 'S35', at: st, cam: [540, 880], zoom: 0.08, note: 'DIWALI: fireworks out of focus; two smiling faces lit by the lamps they hold',
      draw(lt, d, t) { B.backdrop(() => { bdNightCity(t, 1); for (const [x, y, r, at, c] of fw) R.firework(x, y, r, seg(lt, at, at + 1.2), c); }, 2); B.bokeh(t, 26, '#FFC878', 0.3, 6);
        for (const [x, y, r, at, c] of fw) glow(x, y, r * 1.2 * Math.sin(clamp(seg(lt, at, at + 1.2)) * PI), c, 0.25);
        P(300, 990, 1.0, { ...Wh.lakshmana, t, ph: 1, eyes: 'happy', quiver: false, armR: [0.7, 1.3], holdR: () => R.diya(30, 30, 0.9, t, 1, 1) });
        P(760, 1000, 1.0, { ...Wh.sitaForest, t, eyes: 'happy', armL: [0.7, 1.3], holdL: () => R.diya(-30, 30, 0.9, t, 1, 2) }); } });
    for (const f of fw) cue(st + f[3], 'pop', { gain: 0.8 }); cue(st + dw, 'bell', { gain: 0.9 }); }

  // ── 29 · "Rama was crowned king, and his reign became an age of peace." ─
  { const st = cut(29), cr = Wd('crowned', 29) - st;
    add({ id: 'S36', at: st, cam: [540, 880], zoom: 0.1, note: 'the coronation: crowned at last, Sita beside him, Hanuman looking on',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9A6B', '#E0218A', '#4A1D96'])); K.rays(540, 640, 1600, t, C.cream, 0.5, 18); R.throne(540, 1300, 1.3); }, 3); B.bokeh(t, 20, '#FFE0B0', 0.26, 4); B.marigolds(t, 7, 380, 3);
        P(120, 1120, 0.62, { ...Wh.hanuman, t, ph: 2, eyes: 'happy', armL: NAM, armR: NAM });
        const k = lt > cr + 0.25; P(370, 930, 1.1, { ...(k ? Wh.ramaRoyal : { ...Wh.ramaRoyal, head: 'jata' }), t, eyes: 'happy', armR: [0.42, 0.05] }); P(760, 960, 1.05, { ...Wh.sitaBride, t, ph: 1, eyes: 'happy', armL: [0.42, 0.05] });
        const g = seg(lt, cr, cr + 0.3) * (1 - seg(lt, cr + 0.5, cr + 1.2)); glow(370, 640, 300 * g, C.cream, g); K.sparkle(370, 630, 150 * g, g, C.white); petals(t, 34, 5); } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + cr + 0.25, 'bell', { gain: 1.0 }); cue(st + cr + 0.25, 'sparkle', { dur: 1.6 }); }

  // ── 30 · "This is Rama, the seventh avatar of Vishnu," ──────────────────
  { const st = cut(30);
    add({ id: 'S37', at: st, cam: [540, 820], zoom: 0.08, note: 'Rama with his bow; Vishnu\'s form, out of focus, in the mandala behind',
      draw(lt, d, t) { B.backdrop(() => { bdCosmos(t); K.vishnu(540, 1060, 1.6, { t, tail: 0 }); }, 2.5); B.bokeh(t, 16, '#C8A8FF', 0.2, 5);
        P(520, 960, 1.3, { ...Wh.ramaForest, t, eyes: 'open', armR: [0.5, 0.25], holdR: () => R.bow(20, -120, 0.9, 0.08, 0, {}) }); petals(t, 16, 8); } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + 1.4, 'bell', { gain: 0.9 }); }

  // ── 31 · "a reminder to do what is right, even when it is hard," ────────
  { const st = cut(31);
    add({ id: 'S38', at: st, cam: [540, 900], zoom: 0.1, note: 'in the dark, rainy forest he carries one small lamp',
      draw(lt, d, t) { B.backdrop(() => bdForest(t, 1, lt * 90), 3, 0.15);
        glow(690, 1160, 520, C.gold, 0.4); P(500, 960 + bobY(t), 1.2, { ...Wh.ramaForest, t, eyes: 'open', look: [3, 3], armR: [0.6, 1.0], holdR: () => R.diya(40, 36, 1.0, t, 1, 2) });
        K.rain(t, 0.22, 80); B.bokeh(t, 8, '#FFC878', 0.14, 4); } });
    cue(st, 'rain', { dur: 3.6, gain: 0.6 }); }

  // ── 32 · "because the light always finds its way home." ─────────────────
  { const st = cut(32);
    add({ id: 'S39', at: st, cam: [540, 860], zoom: 0.06, tr: 0.7, note: 'one lamp in sharp focus before the glowing city; end title',
      draw(lt, d, t) { B.backdrop(() => bdNightCity(t, 1), 3.5, 0.1); B.bokeh(t, 30, '#FFC878', 0.34, 8);
        glow(540, 1120, 520, C.gold, 0.55); R.diya(540, 1220, 2.6, t, 1, 1);
        const a = eo(seg(lt, Le(32) - st + 0.1, Le(32) - st + 1.1)); B.serif('Rama', 540, 720, 230, { italic: true, w: 600, a }); B.serif('the seventh avatar of Vishnu', 540, 806, 56, { a, ls: 2 }); } });
    cue(st, 'shimmer', { dur: 2.6 }); cue(Le(32) + 0.2, 'conch', { gain: 0.8 }); cue(Le(32) + 0.3, 'bell', { gain: 1.0 }); }

  return { shots: S, cues: CUES };
}
