// NARASIMHA AVATAR: the shot list. One shot (or more) per narration line; everything lands on the voice's clock.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, bigText, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as Q from './core/kit3.js';
import * as M from './core/kit4.js';
import * as N from './core/kit7.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.25);

  const title = (a, y = 250) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    bigText('NARASIMHA', 540, y, 132, { ls: 5, sc: lerp(0.9, 1, eo(a)) });
    bigText('THE FOURTH AVATAR OF VISHNU', 540, y + 114, 42, { ls: 7, fill: C.cream });
    line([[220, y + 166], [470, y + 166]], rgba(C.gold, 0.9), 4); line([[610, y + 166], [860, y + 166]], rgba(C.gold, 0.9), 4); K.lotus(540, y + 182, 0.34, 1);
    ctx.restore();
  };
  const lotusRow = (lit, on, y = 1236) => { for (let i = 0; i < 10; i++) { const x = 135 + i * 90; if (i === lit && on > 0) { glow(x, y - 16, 110 * on, C.gold, 0.8); K.lotus(x, y + 4, 0.5 * on + 0.3, 1); } else K.lotus(x, y, 0.34, 0.6, '#B79AE8', '#7A5AC8'); } };
  /** Hiranyakashipu with his mace */
  const hira = (x, y, o = {}) => {
    const s = o.s || 1, f = o.face || 1, hands = o.hands || [[-150, -60], [170, -200]];
    if (o.glow !== 0) glow(x, y - 200 * s, 520 * s, C.red, 0.3);
    Q.asura(x, y, { look: N.HIRA, s, face: f, t: o.t, hands, eyes: o.eyes || 'open', walk: o.walk, lean: o.lean || 0, kneel: o.kneel, lookX: 3 });
    if (o.mace !== false) M.mace(x + f * s * hands[1][0], y + s * hands[1][1], s * 0.9, f * (o.mrot ?? 0.3));
  };
  const hall = (t, dim = 0) => {
    fillAll(lg(0, 0, 0, H, ['#2A0420', '#7A0A3A', '#C0302A', '#2A0420']));
    for (const px of [70, 1010]) { rr(px - 50, 100, 100, 1120, 18); ctx.fillStyle = lg(px - 50, 0, px + 50, 0, ['#5A2A05', '#C9901A', '#FFD27A', '#C9901A', '#5A2A05']); ctx.fill(); rr(px - 76, 70, 152, 54, 14); ctx.fillStyle = '#C9901A'; ctx.fill(); }
    K.mandala(540, 700, 520, t, C.gold, 0.2, 4);
    ctx.fillStyle = lg(0, 1180, 0, 1920, ['#4A0A30', '#1A0418']); ctx.fillRect(-400, 1190, W + 800, 1200);
    for (let i = 0; i < 6; i++) line([[i * 216 - 200, 1920], [540 + (i - 2.5) * 110, 1190]], rgba(C.gold, 0.12), 4);
    if (dim) fillAll(rgba('#0A0010', dim));
  };
  const twilight = (t) => {
    fillAll(lg(0, 0, 0, H * 0.75, ['#150A4A', '#6B1FA8', '#E0407A', '#FF9A3D'])); K.stars(t, 0.6, 4, 60, 520);
    K.sun(230, 1080, 190, t, { c2: C.orange, c3: C.red, glow: 0.5 }); Q.crescent(860, 330, 80);
  };
  const HUD = (states, lt = 99, y = 170) => { for (let i = 0; i < 5; i++) N.badge(i, 200 + i * 170, y, 62, states[i], lt, 1); };
  /** the doorway: warm hall on the left, twilight on the right, one step between them */
  const threshold = (t) => {
    twilight(t); K.hills(1150, 120, 2, '#3A1466', 0.003);
    ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, 940, 3000); ctx.clip(); hall(t, 0.1); R.diya(150, 1250, 1.0, t, 1, 1); ctx.restore();
    ctx.beginPath(); ctx.moveTo(150, 1260); ctx.lineTo(150, 620); ctx.bezierCurveTo(150, 340, 400, 320, 540, 150); ctx.bezierCurveTo(680, 320, 930, 340, 930, 620); ctx.lineTo(930, 1260); ctx.lineTo(1000, 1260); ctx.lineTo(1000, 600); ctx.bezierCurveTo(1000, 280, 700, 260, 540, 60); ctx.bezierCurveTo(380, 260, 80, 280, 80, 600); ctx.lineTo(80, 1260); ctx.closePath(); ctx.fillStyle = lg(0, 60, 0, 1260, [C.cream, C.gold, '#8A3A05']); ctx.fill();
    rr(40, 1250, 1000, 70, 16); ctx.fillStyle = lg(0, 1250, 0, 1320, [C.gold, '#8A3A05']); ctx.fill(); rr(-20, 1320, 1120, 90, 16); ctx.fillStyle = lg(0, 1320, 0, 1410, ['#C9701A', '#5A2A05']); ctx.fill();
  };

  // ── 0 · "Long ago, a demon king named Hiranyakashipu prayed for years, until Brahma offered him a wish." ─
  {
    const un = Wd('until', 0) - 0.3;
    add({ id: 'S01', at: 0, cam: [540, 860], zoom: 0.1, note: 'on a burning peak the demon king stands in prayer as suns and moons wheel past; title',
      draw(lt, d, t) {
        const day = 0.5 + 0.5 * Math.sin(lt * 3.2);
        fillAll(lg(0, 0, 0, H, [mix('#12001F', '#7A1F4A', day), mix('#5A0A3A', '#E0507A', day), '#E0401A', '#3A0A30'])); K.stars(t, 1 - day, 7, 80, 800);
        const a = lt * 3.2; K.sun(540 + Math.cos(a - PI / 2) * 470, 760 + Math.sin(a - PI / 2) * 470, 80, t); circle(540 - Math.cos(a - PI / 2) * 470, 760 - Math.sin(a - PI / 2) * 470, 54, C.cream);
        K.mountain(170, 1560, 800, 620, '#7A1F4A', '#2A0420', false); K.mountain(930, 1560, 800, 680, '#8A2A5A', '#2A0420', false); K.mountain(540, 1700, 900, 620, '#9A2A4A', '#3A0A30', false);
        for (let i = 0; i < 5; i++) R.flame(330 + i * 105, 1130 + Math.abs(i - 2) * 40, 1.2, t, i);
        hira(540, 900, { s: 0.7, hands: [[-60, -400], [60, -400]], eyes: 'closed', mace: false, t });
        title(eo(seg(lt, 0.5, 1.5)) * (1 - seg(lt, d - 0.5, d)), 240);
      } });
    cue(0.1, 'conch', { gain: 0.7 }); cue(0.3, 'rumble', { dur: 4.0, gain: 0.8 }); cue(0.5, 'sizzle', { dur: 3.6, gain: 0.8 });
    add({ id: 'S02', at: un, cam: [540, 800], zoom: 0.1, flash: true, note: 'Brahma descends on his lotus and raises a hand: ask',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A1280', '#B0277F', '#FF8A3D', '#5A0A3A'])); K.rays(540, 560, 1600, t, C.cream, 0.4, 18); K.mandala(540, 560, 520, t, C.cream, 0.5, 4);
        M.brahma(540, lerp(500, 800, eo(seg(lt, 0, 1.0))), 0.8, t);
        K.mountain(540, 1700, 1000, 520, '#9A2A4A', '#3A0A30', false);
        hira(540, 1260, { s: 0.56, kneel: true, hands: [[-120, -300], [120, -300]], eyes: 'open', lookY: -6, mace: false, glow: 0, t });
        K.petals(t, 20, 4, 0.9);
      } });
    cue(un, 'conch', { gain: 0.9 }); cue(un + 0.3, 'bell'); cue(un + 0.5, 'sparkle', { dur: 1.4 });
  }

  // ── 1-3 · the wish ──────────────────────────────────────────────────────
  {
    const st = cut(1), mn = Wd('man', 1) - st;
    add({ id: 'S03', at: st, cam: [540, 820], zoom: 0.1, note: 'he names his wish; the first condition blazes into being',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#12001F', '#5A0A3A', '#B0103A', '#2A0420'])); K.motes(t, 30, C.orange, 0.8, 4);
        ctx.save(); ctx.globalAlpha = 0.5; M.brahma(860, 560, 0.4, t); ctx.restore();
        hira(330, 1080, { s: 1.05, hands: [[-150, -60], [190, -260]], mace: false, t });
        N.badge(0, 760, 860, 170, 1, t, eob(seg(lt, mn - 0.15, mn + 0.25)));
      } });
    cue(st + mn - 0.1, 'pop', { gain: 1.0 }); cue(st + mn, 'slam', { gain: 0.5 }); cue(st, 'rumble', { dur: 2.4 });
    const s2 = cut(2), w = [0, Wd('day', 2) - s2, Wd('indoors', 2) - s2, Wd('earth', 3) - s2, Wd('weapon', 3) - s2];
    add({ id: 'S04', at: s2, cam: [540, 800], zoom: 0.1, note: 'one by one the five conditions ring him like a shield',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#12001F', '#5A0A3A', '#B0103A', '#2A0420'])); K.motes(t, 30, C.orange, 0.8, 4);
        const n = w.filter((x) => lt > x).length;
        ctx.strokeStyle = rgba(C.red, 0.3 + 0.12 * n); ctx.lineWidth = 10 + n * 4; ctx.beginPath(); ctx.arc(540, 800, 400, 0, TAU); ctx.stroke(); glow(540, 800, 520, C.red, 0.1 + 0.07 * n);
        hira(540, 1060, { s: 0.92, hands: [[-200, -200], [200, -200]], mace: false, eyes: n > 3 ? 'wide' : 'open', t });
        for (let i = 0; i < 5; i++) { const a = -PI / 2 + (i - 2) * 0.62 + Math.sin(t * 1.2 + i) * 0.02; N.badge(i, 540 + Math.cos(a) * 400, 800 + Math.sin(a) * 400, 86, 1, t, eob(seg(lt, w[i] - 0.15, w[i] + 0.25))); }
      } });
    w.forEach((x, i) => { if (i) { cue(s2 + x - 0.1, 'pop', { gain: 1.0 }); cue(s2 + x, 'chime', { note: i }); } }); cue(s2, 'rumble', { dur: 6.0, gain: 0.8 });
  }

  // ── 4 · "Feeling invincible, he ordered the whole world to worship him alone." ─
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 800], zoom: 0.1, note: 'a towering gold statue of himself; the whole kingdom bows beneath it',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#12001F', '#5A0A3A', '#E0401A', '#3A0A30'])); K.rays(540, 600, 1600, t, C.gold, 0.3, 16);
        R.towers(1180, { col: '#2A0418', lit: C.orange, n: 8, seed: 3, s: 0.7 });
        rr(300, 1100, 480, 110, 16); ctx.fillStyle = lg(0, 1100, 0, 1210, [C.gold, '#8A3A05']); ctx.fill();
        ctx.save(); ctx.filter = 'sepia(1) saturate(5) hue-rotate(-12deg) brightness(1.05)'; hira(540, lerp(1300, 780, eo(seg(lt, 0, 1.4))), { s: 1.0, hands: [[-200, -200], [200, -200]], mace: false, glow: 0, t: 0 }); ctx.filter = 'none'; ctx.restore();
        rr(300, 1100, 480, 110, 16); ctx.fillStyle = lg(0, 1100, 0, 1210, [C.gold, '#8A3A05']); ctx.fill();
        for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { const x = 60 + i * 120 + r * 60, y = 1290 + r * 70, b = 0.5 + 0.5 * Math.sin(t * 2 + i * 0.5); ell(x, y, 46, 30, '#1A0410'); circle(x + 34 + b * 6, y - 14 + b * 10, 20, '#1A0410'); }
        K.vignette(0.4, '#0A0010');
      } });
    cue(st, 'rumble', { dur: 3.6 }); cue(st + 0.3, 'growl', { gain: 0.8 }); cue(st + 1.4, 'slam', { gain: 0.6 });
  }

  // ── 5 · "But his own little son, Prahlada, loved Vishnu with all his heart." ─
  {
    const st = cut(5), vi = Wd('Vishnu', 5) - st;
    add({ id: 'S06', at: st, cam: [540, 860], zoom: 0.12, note: 'in a quiet corner a small prince prays; Vishnu glows softly above his lamp',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0A4A', '#2A2A9A', '#7B3FE4', '#1B0F5C'])); K.stars(t, 0.8, 4, 80, 700);
        const a = eo(seg(lt, vi - 0.5, vi + 0.6));
        K.rays(540, 560, 1300, t, C.paleGold, 0.4 * a, 16); K.mandala(540, 560, 400, t, C.gold, 0.7 * a, 3);
        ctx.save(); ctx.globalAlpha = a; K.vishnu(540, 720, 0.66, { t, tail: 0 }); K.lotus(540, 810, 1.5, 1); ctx.restore();
        ctx.fillStyle = lg(0, 1200, 0, 1920, ['#3A1F90', '#0D0630']); ctx.fillRect(-400, 1210, W + 800, 1200);
        N.prahlada(540, 1280, { s: 0.9, t, glow: 0.6 });
        R.diya(330, 1280, 0.9, t, 1, 1); R.diya(750, 1280, 0.9, t, 1, 2);
        for (let i = 0; i < 5; i++) { const q = ((t * 0.4 + i / 5) % 1); ctx.save(); ctx.translate(540 + Math.sin(i * 2.4 + t) * 150, 900 - q * 300); ctx.scale(1 - q * 0.4, 1 - q * 0.4); ctx.globalAlpha = (1 - q) * a; ctx.beginPath(); ctx.moveTo(0, 20); ctx.bezierCurveTo(-44, -10, -26, -44, 0, -20); ctx.bezierCurveTo(26, -44, 44, -10, 0, 20); ctx.fillStyle = C.pink; ctx.fill(); ctx.restore(); }
      } });
    cue(st, 'chime', { note: 2 }); cue(st + vi - 0.3, 'shimmer', { dur: 1.8 }); cue(st + vi, 'bell', { gain: 0.8 });
  }

  // ── 6 · "The furious king tried everything to break him, wild elephants, serpents, even fire." ─
  {
    const st = cut(6), a = Wd('wild', 6) - st - 0.25, b = Wd('serpents', 6) - st - 0.2, c = Wd('even', 6) - st - 0.15;
    add({ id: 'S07', at: st, cam: [540, 860], zoom: 0.1, note: 'the king\'s rage: he towers over the boy, who only folds his hands',
      draw(lt, d, t) {
        hall(t); const sh = Math.sin(t * 40) * 5;
        hira(330 + sh, 1020, { s: 1.1, hands: [[-150, -60], [200, -220]], mrot: 0.9 + Math.sin(t * 9) * 0.2, eyes: 'wide', t });
        N.prahlada(820, 1270, { s: 0.6, t, face: -1 });
      } });
    cue(st, 'growl'); cue(st + 0.2, 'rumble', { dur: 2.0 });
    add({ id: 'S08', at: st + a, cam: [540, 860], zoom: 0.1, tr: 0.2, note: 'war elephants thunder toward him',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0103A', '#FF8A3D', '#5A0A2A'])); K.hills(1230, 80, 2, '#3A0A20', 0.003);
        const x = lerp(-500, 60, seg(lt, 0, d + 0.2));
        for (let i = 0; i < 3; i++) { K.elephant(x + i * 240 - 100, 1010 + (i % 2) * 70, 1.0 + (i % 2) * 0.15, t * 1.6 + i, '#2A0A30'); glow(x + i * 240 + 80, 950 + (i % 2) * 70, 30, C.red, 0.9); }
        for (let i = 0; i < 8; i++) { const p = ((t * 1.4 + i / 8) % 1); circle(x - 100 - p * 200 + i * 60, 1180 - p * 60, 40 * (1 - p), rgba('#FFB07A', 0.5 * (1 - p))); }
        N.prahlada(880, 1250, { s: 0.6, t, face: -1, glow: 0.8 });
      } });
    cue(st + a, 'rumble', { dur: b - a, gain: 1.3 }); for (let i = 0; i < 4; i++) cue(st + a + i * 0.3, 'thud', { gain: 0.9 });
    add({ id: 'S09', at: st + b, cam: [540, 860], zoom: 0.1, tr: 0.2, note: 'serpents rear up around him',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#04201A', '#0B5B4F', '#19A86A', '#062A2A']));
        const g = eo(seg(lt, 0, 0.7));
        for (const [x0, x1, y1, sd] of [[60, 330, 760, 1], [1020, 760, 720, -1], [200, 420, 1020, 1], [900, 680, 1000, -1]]) K.serpent([x0, 1400], [lerp(x0, x1, g), lerp(1400, y1, g) + Math.sin(t * 3 + x0) * 14], t, { w: 54, sag: sd * -120, wig: 26 });
        N.prahlada(540, 1260, { s: 0.66, t, glow: 0.9 });
      } });
    cue(st + b, 'hiss', { dur: c - b + 0.2, gain: 1.4 });
    add({ id: 'S10', at: st + c, cam: [540, 860], zoom: 0.1, tr: 0.2, note: 'a ring of fire closes in',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#1A0010', '#7A0A1A', '#FF5A1F', '#FFC83D']));
        for (let i = 0; i < 7; i++) R.flame(60 + i * 160, 1060 - (i % 2) * 50, 2.6 + (i % 3) * 0.5, t, i);
        glow(540, 1050, 300, C.cream, 0.6); circle(540, 1060, 210, rgba('#FFF6DC', 0.25)); ctx.strokeStyle = rgba(C.cream, 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(540, 1060, 210, 0, TAU); ctx.stroke();
        N.prahlada(540, 1260, { s: 0.66, t, glow: 1 });
        for (let i = 0; i < 6; i++) R.flame(100 + i * 180, 1520, 3.0, t, i + 10);
      } });
    cue(st + c, 'sizzle', { dur: 1.8, gain: 1.8 }); cue(st + c + 0.2, 'whoosh');
  }

  // ── 7 · "Each time, the boy simply prayed, and walked away unharmed." ───
  {
    const st = cut(7);
    add({ id: 'S11', at: st, cam: [540, 880], zoom: 0.08, note: 'the elephant kneels, the serpent sleeps, the flames fall as petals; he walks on',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9AC0', '#B07AE8', '#5A2FD0'])); K.rays(540, 800, 1600, t, C.cream, 0.4, 16);
        K.hills(1230, 80, 2, '#5A2FB0', 0.003);
        ctx.save(); ctx.translate(230, 1010); ctx.rotate(0.12); K.elephant(0, 0, 0.9, 0, '#6A4AA8'); ctx.restore();
        K.serpent([960, 1200], [820, 1150], t, { w: 40, sag: -70, wig: 4 }); ell(900, 1210, 110, 40, '#064D3A'); ell(900, 1196, 96, 30, C.emerald);
        N.prahlada(lerp(440, 620, seg(lt, 0, d)), 1250, { s: 0.74, t, walk: true, glow: 0.9 });
        K.petals(t, 44, 2, 1); K.motes(t, 30, C.cream, 0.8, 5);
      } });
    cue(st, 'bell', { gain: 0.8 }); cue(st + 0.2, 'sparkle', { dur: 2.2, gain: 0.7 }); for (let i = 0; i < 4; i++) cue(st + 0.4 + i * 0.5, 'tock', { gain: 0.4 });
  }

  // ── 8 · "At last the king roared, where is your Vishnu? Is he in this pillar?" ─
  {
    const st = cut(8), pl = Wd('pillar', 8) - st;
    add({ id: 'S12', at: st, cam: [540, 820], zoom: 0.1, note: 'the king wheels on a great pillar and jabs his mace at it',
      draw(lt, d, t) {
        const sh = Math.sin(t * 50) * 7 * (1 - seg(lt, 1.2, d)); ctx.save(); ctx.translate(sh, 0);
        hall(t, 0.2); N.pillar(800, 200, 1200, 190, {});
        const p = eio(seg(lt, pl - 0.6, pl));
        hira(350, 1040, { s: 1.15, hands: [[-150, -60], [lerp(170, 260, p), lerp(-260, -190, p)]], mrot: lerp(0.3, 1.25, p), eyes: 'wide', t });
        N.prahlada(600, 1290, { s: 0.5, t, eyes: 'open', lookX: -4, lookY: -4 });
        for (let i = 0; i < 3; i++) M.rings(420, 700, 700, ((t * 0.9 + i / 3) % 1) * (lt < 1.6 ? 1 : 0), C.red, 1);
        ctx.restore();
      } });
    cue(st, 'growl', { gain: 1.3 }); cue(st + 0.1, 'rumble', { dur: 3.0 }); cue(st + pl, 'thud', { gain: 0.8 });
  }

  // ── 9 · "He is everywhere, said Prahlada." ──────────────────────────────
  {
    const st = cut(9);
    add({ id: 'S13', at: st, cam: [540, 860], zoom: 0.14, note: 'the boy smiles: Vishnu\'s shape glimmers in the air, the floor, the stone',
      draw(lt, d, t) {
        hall(t, 0.35); N.pillar(880, 200, 1200, 170, {});
        for (const [vx, vy, vs] of [[220, 620, 0.5], [880, 820, 0.42], [540, 420, 0.6], [260, 1380, 0.4], [800, 1420, 0.36]]) { ctx.save(); ctx.globalAlpha = 0.28 + 0.14 * Math.sin(t * 2 + vx); K.vishnu(vx, vy, vs, { t, tail: 0 }); ctx.restore(); }
        for (let i = 0; i < 16; i++) K.sparkle(rnd(i) * W, rnd(i * 3) * 1500, 26, 0.5 + 0.5 * Math.sin(t * 4 + i), C.cream);
        N.prahlada(540, 1330, { s: 1.25, t, glow: 0.9 });
      } });
    cue(st, 'shimmer', { dur: 1.8 }); cue(st + 0.2, 'bell', { gain: 0.8 });
  }

  // ── 10 · "The king struck the pillar, and it cracked with a sound like thunder." ─
  {
    const st = cut(10), sk = Wd('struck', 10) - st + 0.2, ck = Wd('cracked', 10) - st;
    add({ id: 'S14', at: st, cam: [600, 800], zoom: 0.12, note: 'the mace lands; a seam of white fire runs up the stone',
      draw(lt, d, t) {
        const cr = seg(lt, ck - 0.1, d), sh = Math.sin(t * 60) * 12 * Math.max(0, 1 - Math.abs(lt - sk - 0.1) * 3); ctx.save(); ctx.translate(sh, 0);
        hall(t, 0.3); fillAll(rgba('#FFE9C8', 0.5 * Math.max(0, 1 - Math.abs(lt - sk) * 5)));
        glow(700, 700, 500, C.cream, 0.5 * cr);
        N.pillar(700, 150, 1200, 240, { crack: cr });
        const p = eio(seg(lt, sk - 0.4, sk));
        hira(280, 1040, { s: 0.95, hands: [[-150, -60], [lerp(120, 300, p), lerp(-330, -160, p)]], mrot: lerp(-0.4, 1.35, p), eyes: 'wide', t });
        M.rings(580, 800, 600, seg(lt, sk, sk + 0.8), C.cream, 3);
        K.lightning(700, 6, Math.max(0, 1 - Math.abs(lt - ck - 0.2) * 3), 300);
        ctx.restore();
      } });
    cue(st + sk - 0.3, 'whoosh', { gain: 1.2 }); cue(st + sk, 'slam', { gain: 1.4 }); cue(st + ck, 'thunder', { gain: 1.1 }); cue(st + ck + 0.2, 'rumble', { dur: 2.0, gain: 1.2 });
  }

  // ── 11 · "Out stepped Narasimha, half man, half lion, neither man nor beast." ─
  {
    const st = cut(11), hf = Wd('half', 11) - st - 0.3, ne = Wd('neither', 11) - st;
    add({ id: 'S15', at: st, cam: [540, 800], zoom: 0.12, flash: true, note: 'the pillar bursts open in a flood of light; a maned shape strides out',
      draw(lt, d, t) {
        hall(t, 0.3); const sp = eo(seg(lt, 0, 0.9));
        K.rays(540, 760, 1800, t * 3, C.cream, 0.7, 18); glow(540, 760, 400 + 500 * sp, C.cream, 0.9);
        N.pillar(540, 150, 1200, 260, { crack: 1, split: sp });
        const a = seg(lt, 0.5, 1.3); ctx.save(); ctx.filter = `brightness(${lerp(0.05, 1, a)})`; N.narasimha(540, lerp(1020, 980, a), { s: lerp(0.8, 1.0, a), t, fury: 1 }); ctx.filter = 'none'; ctx.restore();
        for (let i = 0; i < 3; i++) M.rings(540, 760, 1100, ((t * 0.8 + i / 3) % 1), C.gold, 1);
      } });
    cue(st, 'thunder', { gain: 1.0 }); cue(st, 'conch', { gain: 1.2 }); cue(st + 0.5, 'growl', { gain: 1.4 });
    add({ id: 'S16', at: st + hf, cam: [540, 760], zoom: 0.08, note: 'NARASIMHA: lion\'s head and mane on a man\'s golden body; the first condition breaks',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0103A', '#FF8A1F', '#FFD27A'])); K.rays(540, 700, 1700, t, C.cream, 0.45, 18); K.mandala(540, 700, 580, t, C.cream, 0.55, 4);
        for (let i = 0; i < 6; i++) R.flame(60 + i * 190, 1460, 2.2, t, i);
        N.narasimha(540, 1000, { s: 1.08, t, fury: 1, four: true, hands: [[-200, -120], [200, -120]] });
        for (let i = 0; i < 3; i++) M.rings(540, 720, 1200, ((t * 0.7 + i / 3) % 1), C.cream, 1);
        HUD([lt > ne - hf ? 2 : 1, 1, 1, 1, 1], lt, 170);
      } });
    cue(st + hf, 'growl', { gain: 1.2 }); cue(st + ne, 'slam', { gain: 0.7 }); cue(st + ne, 'bell', { gain: 0.9 });
  }

  // ── 12 · "It was twilight, neither day nor night." ──────────────────────
  {
    const st = cut(12), ne = Wd('neither', 12) - st;
    add({ id: 'S17', at: st, cam: [540, 860], zoom: 0.08, note: 'outside, the sun is half-set and the moon half-risen',
      draw(lt, d, t) {
        twilight(t); K.hills(1150, 120, 2, '#3A1466', 0.003); K.palace(540, 1180, 1.0, '#1B0F5C', C.orange);
        glow(540, 1050, 260, C.gold, 0.7); ctx.save(); ctx.filter = 'brightness(0.2)'; N.narasimha(540, 1090, { s: 0.3, t, fury: 1 }); ctx.filter = 'none'; ctx.restore();
        K.hills(1330, 80, 5, '#150A4A', 0.003);
        line([[540, 300], [540, 900]], rgba(C.cream, 0.5), 4, [18, 18]);
        HUD([2, lt > ne ? 2 : 1, 1, 1, 1], lt, 170);
      } });
    cue(st, 'shimmer', { dur: 1.6, gain: 0.6 }); cue(st + ne, 'slam', { gain: 0.6 }); cue(st + ne, 'bell', { gain: 0.9 });
  }

  // ── 13 · "He stood on the doorstep, neither indoors nor outdoors," ──────
  {
    const st = cut(13), ne = Wd('neither', 13) - st;
    add({ id: 'S18', at: st, cam: [540, 860], zoom: 0.1, note: 'on the threshold itself: lamplit hall to one side, open dusk to the other',
      draw(lt, d, t) {
        threshold(t);
        ctx.save(); ctx.translate(730, 1060); ctx.rotate(0.5 + Math.sin(t * 9) * 0.06); hira(0, 0, { s: 0.56, hands: [[-150, -280], [150, -280]], eyes: 'wide', mace: false, glow: 0, t }); ctx.restore();
        N.narasimha(520, 930, { s: 0.9, t, fury: 1, hands: [[-150, -60], [230, -40]] });
        HUD([2, 2, lt > ne ? 2 : 1, 1, 1], lt, 170);
      } });
    cue(st, 'thud', { gain: 0.8 }); cue(st + 0.3, 'growl', { gain: 0.8 }); cue(st + ne, 'slam', { gain: 0.6 }); cue(st + ne, 'bell', { gain: 0.9 });
  }

  // ── 14 · "lifted the king onto his lap, neither earth nor sky," ─────────
  {
    const st = L(14) - 0.12, ne = Wd('neither', 14) - st;
    add({ id: 'S19', at: st, cam: [540, 900], zoom: 0.12, note: 'he sits on the step with the king across his knees, touching neither ground nor air',
      draw(lt, d, t) {
        threshold(t);
        const u = eio(seg(lt, 0, 0.9));
        N.narasimha(540, 1130, { s: 0.92, t, fury: 1, kneel: true, hands: [[-150, lerp(-200, -30, u)], [150, lerp(-200, -30, u)]] });
        ctx.save(); ctx.translate(540, lerp(900, 1110, u)); ctx.rotate(PI / 2); hira(0, 0, { s: 0.5, hands: [[-150, -280], [150, -280]], eyes: 'wide', mace: false, glow: 0, t }); ctx.restore();
        for (const sd of [-1, 1]) { circle(540 + sd * 138, 1108, 26, '#FFE9A8'); for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(540 + sd * 138 + k * 14 - 7, 1124); ctx.lineTo(540 + sd * 138 + k * 14, 1160); ctx.lineTo(540 + sd * 138 + k * 14 + 7, 1124); ctx.closePath(); ctx.fillStyle = C.white; ctx.fill(); } }
        HUD([2, 2, 2, lt > ne ? 2 : 1, 1], lt, 170);
      } });
    cue(st + 0.5, 'thud', { gain: 0.9 }); cue(st + ne, 'slam', { gain: 0.6 }); cue(st + ne, 'bell', { gain: 0.9 });
  }

  // ── 15 · "and with his claws alone, he ended the tyrant's reign." ───────
  {
    const st = cut(15), en = Wd('ended', 15) - st;
    add({ id: 'S20', at: st, cam: [540, 800], zoom: 0.12, note: 'no weapon: only a raised hand of shining claws, then white light; the crown rolls away',
      draw(lt, d, t) {
        const ex = seg(lt, en, en + 1.2);
        fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0103A', '#FF8A1F', '#3A1280'])); K.rays(540, 620, 1700, t * 2, C.cream, 0.4 + 0.5 * Math.sin(clamp(ex) * PI), 18);
        const up = eo(seg(lt, 0, 0.8));
        ctx.save(); ctx.translate(540, lerp(1500, 760, up) + (ex > 0 ? eo(seg(ex, 0, 0.2)) * 260 : 0)); glow(0, -200, 420, C.cream, 0.7);
        line([[0, 900], [0, 0]], lg(-90, 0, 90, 0, ['#D9801A', '#FFB83D', '#FFE9A8']), 190); circle(0, -40, 150, lg(-150, 0, 150, 0, ['#FFB83D', '#FFE9A8']));
        for (let k = -2; k <= 2; k++) { ctx.save(); ctx.translate(k * 62, -150 + Math.abs(k) * 22); ctx.rotate(k * 0.2); ell(0, 0, 34, 60, '#FFD27A'); ctx.beginPath(); ctx.moveTo(-22, -40); ctx.quadraticCurveTo(0, -200, 16, -40); ctx.closePath(); ctx.fillStyle = lg(0, -200, 0, -40, [C.white, C.cream]); ctx.fill(); K.sparkle(2, -190, 30, 0.6 + 0.4 * Math.sin(t * 6 + k), C.white); ctx.restore(); }
        rr(-110, 200, 220, 60, 20); ctx.fillStyle = lg(0, 200, 0, 260, [C.paleGold, C.gold]); ctx.fill(); ctx.restore();
        if (ex > 0) { glow(540, 1000, 300 + 1300 * eo(ex), C.cream, 1 - ex); M.rings(540, 1000, 1200, ex, C.cream, 3);
          for (let i = 0; i < 26; i++) { const an = i * TAU / 26, r = eo(ex) * (240 + rnd(i) * 640); glow(540 + Math.cos(an) * r, 1050 + Math.sin(an) * r, 40 * (1 - ex), i % 2 ? C.red : C.gold, 1 - ex); }
          ctx.save(); ctx.translate(lerp(540, 860, eo(ex)), 1180 - Math.sin(clamp(ex) * PI) * 200); ctx.rotate(ex * 8); ctx.beginPath(); ctx.moveTo(-60, 40); ctx.lineTo(-74, -40); ctx.lineTo(-36, -4); ctx.lineTo(0, -80); ctx.lineTo(36, -4); ctx.lineTo(74, -40); ctx.lineTo(60, 40); ctx.closePath(); ctx.fillStyle = lg(0, -80, 0, 40, [C.cream, C.gold, C.saffron]); ctx.fill(); ctx.restore(); }
        HUD([2, 2, 2, 2, lt > Wd('claws', 15) - st ? 2 : 1], lt, 170);
      } });
    cue(st, 'whoosh', { gain: 1.0 }); cue(st + Wd('claws', 15) - cut(15), 'bell', { gain: 0.9 }); cue(st + en, 'slam', { gain: 1.4 }); cue(st + en, 'thunder', { gain: 1.0 }); cue(st + en + 0.4, 'sparkle', { dur: 1.4 });
  }

  // ── 16 · "Every word of the wish was kept, and still it could not save him." ─
  {
    const st = cut(16), sl = Wd('still', 16) - st;
    add({ id: 'S21', at: st, cam: [540, 820], zoom: 0.08, note: 'all five conditions, each one honoured, each one broken; they crumble',
      draw(lt, d, t) {
        hall(t, 0.5); const f = ei(seg(lt, sl, d + 0.4));
        for (let i = 0; i < 5; i++) { const a = -PI / 2 + (i - 2) * 0.62, x = 540 + Math.cos(a) * 430, y = 780 + Math.sin(a) * 430 + f * (700 + i * 60), rot = f * (i - 2) * 0.8;
          ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = 1 - f * 0.6; N.badge(i, 0, 0, 100, 2, t, eob(seg(lt, i * 0.18, 0.3 + i * 0.18))); ctx.restore(); }
        ctx.save(); ctx.translate(540, 1240); ctx.rotate(0.5); ctx.scale(1.3, 1.3); ctx.beginPath(); ctx.moveTo(-60, 40); ctx.lineTo(-74, -40); ctx.lineTo(-36, -4); ctx.lineTo(0, -80); ctx.lineTo(36, -4); ctx.lineTo(74, -40); ctx.lineTo(60, 40); ctx.closePath(); ctx.fillStyle = lg(0, -80, 0, 40, [C.cream, C.gold, C.saffron]); ctx.fill(); circle(0, -14, 12, C.red); ctx.restore();
        M.mace(330, 1330, 0.8, -1.4);
      } });
    for (let i = 0; i < 5; i++) cue(st + i * 0.18, 'pop', { gain: 0.8 }); cue(st + sl, 'rumble', { dur: 1.6, gain: 0.8 }); cue(st + sl + 0.5, 'thud', { gain: 0.8 });
  }

  // ── 17 · "Only little Prahlada was unafraid. He walked up, and the lion's fury melted into a smile." ─
  {
    const st = cut(17), fu = Wd('fury', 17) - st - 0.6;
    add({ id: 'S22', at: st, cam: [540, 860], zoom: 0.08, note: 'the lion still blazes; gods hide behind the pillars; one small boy walks straight to him',
      draw(lt, d, t) {
        hall(t, 0.1); for (let i = 0; i < 6; i++) R.flame(60 + i * 190, 1470, 2.2, t, i);
        for (let i = 0; i < 3; i++) R.hero(70 + i * 40, 1040 + i * 60, { look: Q.DEVA[i], s: 0.3, eyes: 'wide', hands: [[-60, -200], [60, -200]], lean: -0.15, t });
        for (let i = 0; i < 3; i++) M.rings(640, 760, 900, ((t * 0.8 + i / 3) % 1), C.orange, 1);
        N.narasimha(660, 1000, { s: 0.98, t, fury: 1, four: true, hands: [[-200, -160], [200, -160]] });
        N.prahlada(lerp(120, 380, eo(seg(lt, 1.6, d + 0.3))), 1290, { s: 0.52, t, walk: lt > 1.6, eyes: 'open', lookY: -5, pray: false, glow: 0.6 });
      } });
    cue(st, 'growl', { gain: 1.0 }); cue(st + 0.2, 'sizzle', { dur: 3.0, gain: 1.0 }); for (let i = 0; i < 4; i++) cue(st + 1.7 + i * 0.4, 'tock', { gain: 0.5 });
    add({ id: 'S23', at: st + fu, cam: [540, 880], zoom: 0.12, note: 'the mane settles, the eyes soften; a huge gentle hand rests on the boy\'s head',
      draw(lt, d, t) {
        const u = eio(seg(lt, 0.2, 1.6));
        fillAll(lg(0, 0, 0, H, [mix('#3A0420', '#FFE9A8', u), mix('#B0103A', '#FFB03D', u), mix('#FF8A1F', '#FF7A9A', u), mix('#3A1280', '#7B1FA8', u)])); K.rays(540, 800, 1700, t, C.cream, 0.45, 18); K.mandala(540, 800, 560, t, C.cream, 0.5 * u, 4);
        N.narasimha(600, 1140, { s: 1.0, t, fury: 1 - u, kneel: true, hands: [[lerp(-200, -130, u), lerp(-160, -60, u)], [lerp(200, 60, u), lerp(-160, -20, u)]] });
        N.prahlada(360, 1310, { s: 0.6, t, glow: 0.8, eyes: 'closed' });
        K.petals(t, 40, 3, u);
      } });
    cue(st + fu + 0.2, 'shimmer', { dur: 2.4 }); cue(st + fu + 1.5, 'bell', { gain: 0.9 });
  }

  // ── 18 · "Narasimha blessed the boy, and made him king." ────────────────
  {
    const st = cut(18), kg = Wd('king', 18) - st;
    add({ id: 'S24', at: st, cam: [540, 820], zoom: 0.1, note: 'a small king on a big throne, a crown settling on his head',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9A6B', '#E0218A', '#4A1D96'])); K.rays(540, 640, 1600, t, C.cream, 0.45, 18); K.mandala(540, 640, 600, t, C.cream, 0.55, 4);
        ctx.save(); ctx.globalAlpha = 0.5; N.narasimha(540, 760, { s: 1.5, t, fury: 0, four: true, hands: [[-200, -120], [200, -120]] }); ctx.restore();
        R.throne(540, 1100, 0.9);
        N.prahlada(540, 1150, { s: 0.7, t, pray: false, arms: 'up', eyes: 'open' });
        const g = seg(lt, kg - 0.2, kg + 0.3) * (1 - seg(lt, kg + 0.6, kg + 1.3)); glow(540, 800, 320 * g, C.cream, g); K.sparkle(540, 790, 160 * g, g, C.white);
        K.petals(t, 40, 5, 1);
      } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + kg, 'bell', { gain: 1.1 }); cue(st + kg, 'sparkle', { dur: 1.4 });
  }

  // ── 19 · "This is Narasimha, the fourth avatar of Vishnu," ──────────────
  {
    const st = cut(19), fo = Wd('fourth', 19) - st;
    add({ id: 'S25', at: st, cam: [540, 760], zoom: -0.06, note: 'the icon: Narasimha enthroned in the mandala, Prahlada at his knee; the fourth lotus lit',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 130, 1800);
        K.rays(540, 620, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 620, 590, t, C.gold, 0.8); glow(540, 620, 700, C.magenta, 0.3);
        const b = Math.sin(t * 1.2) * 6;
        N.narasimha(560, 980 + b, { s: 0.98, t, fury: 0, four: true, kneel: true, hands: [[-150, -60], [150, -150]] });
        N.prahlada(300, 1130 + b, { s: 0.5, t, glow: 0.5 });
        K.sea(1160, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 6, crest: C.gold });
        lotusRow(3, eob(seg(lt, fo - 0.15, fo + 0.2)));
        K.petals(t, 20, 8, 0.8);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + fo, 'bell', { gain: 1.0 }); cue(st + fo, 'sparkle', { dur: 1.2 });
  }

  // ── 20 · "a reminder that no power can shield cruelty, and that faith fears nothing." ─
  {
    const st = cut(20), fa = Wd('faith', 20) - st;
    add({ id: 'S26', at: st, cam: [540, 860], zoom: 0.07, tr: 0.6, note: 'the hall at peace: the boy prays by a mended pillar, a lion made of stars above; end title',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0430', '#2A0E78', '#7B1FA8', '#E0218A'])); K.stars(t, 1, 31, 150, 1500);
        const a = eo(seg(lt, fa - 0.5, fa + 0.8));
        ctx.save(); ctx.globalAlpha = 0.5 * a; ctx.filter = 'brightness(1.6) saturate(0.4)'; N.narasimha(540, 760, { s: 1.5, t, fury: 0 }); ctx.filter = 'none'; ctx.restore();
        for (let i = 0; i < 14; i++) { const an = i * TAU / 14; K.sparkle(540 + Math.cos(an) * 260, 330 + Math.sin(an) * 260, 26, a * (0.5 + 0.5 * Math.sin(t * 4 + i)), C.cream); }
        ctx.fillStyle = lg(0, 1200, 0, 1920, ['#3A1280', '#0D0630']); ctx.fillRect(-400, 1210, W + 800, 1200);
        N.pillar(840, 520, 1220, 150, {});
        N.prahlada(470, 1290, { s: 0.74, t, glow: 0.7 }); R.diya(680, 1290, 1.0, t, 1, 2);
        K.motes(t, 40, C.paleGold, 0.8, 6);
        title(eo(seg(lt, Le(20) - st + 0.15, Le(20) - st + 1.0)), 200);
      } });
    cue(st + 0.3, 'shimmer', { dur: 3.0, gain: 0.6 }); cue(st + fa, 'chime', { note: 4 });
    cue(Le(20) + 0.2, 'conch', { gain: 0.9 }); cue(Le(20) + 0.3, 'bell', { gain: 1.1 }); cue(Le(20) + 0.35, 'sparkle', { dur: 1.5 });
  }

  return { shots: S, cues: CUES };
}
