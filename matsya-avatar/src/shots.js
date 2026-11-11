// MATSYA AVATAR: the shot list. One shot (or two) per narration line; everything lands on the voice's clock.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, bigText, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.25);
  const STORM_SEA = ['#3A7BE0', '#07103A'], NIGHT_SEA = ['#2A5FD0', '#050B2E'];

  // helper: earth
  const earth = (x, y, r, t) => {
    glow(x, y, r * 1.9, C.cyan, 0.5);
    circle(x, y, r, rg(x - r * 0.35, y - r * 0.35, r * 0.1, r * 1.15, ['#7FE8FF', '#2A8FE8', '#0A2A7A']));
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
    const dx = (t * 26) % (r * 4);
    for (let k = -1; k <= 1; k++) for (const [bx, by, br, bq] of [[-0.5, -0.3, 0.42, 0.3], [-0.2, 0.3, 0.3, 0.44], [0.6, -0.1, 0.36, 0.5], [0.9, 0.5, 0.26, 0.2], [1.5, -0.4, 0.4, 0.26], [1.9, 0.25, 0.3, 0.4]])
      ell(x + bx * r + k * r * 4 - dx + r, y + by * r, br * r, bq * r, lg(0, y - r, 0, y + r, [C.leaf, C.emerald, C.forest]), bx);
    ctx.fillStyle = rg(x + r * 0.4, y + r * 0.4, r * 0.3, r * 1.5, [rgba('#05021A', 0), rgba('#05021A', 0.55)]); ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.restore();
    ctx.strokeStyle = rgba(C.cream, 0.7); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, r + 4, 0, TAU); ctx.stroke();
  };
  const title = (a, y = 250) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    bigText('MATSYA', 540, y, 190, { ls: 10, sc: lerp(0.9, 1, eo(a)) });
    bigText('THE FIRST AVATAR OF VISHNU', 540, y + 138, 42, { ls: 8, fill: C.cream });
    line([[220, y + 190], [470, y + 190]], rgba(C.gold, 0.9), 4); line([[610, y + 190], [860, y + 190]], rgba(C.gold, 0.9), 4); K.lotus(540, y + 206, 0.34, 1);
    ctx.restore();
  };

  // ── 0 · "Long ago, a gentle king named Satyavrata" ──────────────────────
  {
    const st = 0;
    add({ id: 'S01', at: st, cam: [540, 800], zoom: 0.1, note: 'dawn, mandala sun, king in prayer, title',
      draw(lt, d, t) {
        K.sky('dawn'); K.stars(t, 0.8 * (1 - seg(lt, 0, 3)), 0, 70, 700);
        const sy = lerp(1080, 800, eo(seg(lt, 0, 3.6)));
        K.rays(540, sy, 1300, t, C.paleGold, 0.3); K.sun(540, sy, 230, t);
        K.clouds(430, t, rgba(C.pink, 0.35), 3, 4, 10, 0.8);
        K.hills(1060, 190, 1, '#7A1F8A'); K.palace(210, 985, 0.42, '#5A1580'); K.hills(1150, 150, 3.4, '#4A1580');
        K.sea(1220, t, { cols: ['#FF9A6B', '#7B1FA8'], amp: 14, rows: 7, crest: C.cream });
        K.hills(1330, 130, 0.4, '#2A0E66', 0.003);
        K.king(540, 940, { s: 0.88, hands: [[-22, -128], [22, -128]], pray: true, eyes: 'closed', t });
        K.motes(t, 30, C.paleGold, 0.7, 2);
        title(eo(seg(lt, 0.5, 1.5)) * (1 - seg(lt, d - 0.5, d)));
      } });
    cue(0.1, 'conch', { gain: 0.8 }); cue(0.6, 'bell'); cue(1.2, 'sparkle', { dur: 1.6, gain: 0.6 });
  }

  // ── 1 · "knelt by a river to offer water in prayer." ────────────────────
  {
    const st = cut(1), off = Wd('offer', 1) - st;
    add({ id: 'S02', at: st, cam: [560, 950], zoom: 0.12, note: 'king kneels on the bank, lifts water',
      draw(lt, d, t) {
        K.sky('dawn'); K.sun(820, 520, 150, t); K.clouds(360, t, rgba(C.pink, 0.4), 7, 4, 10, 0.7);
        K.hills(960, 170, 2.2, '#7A1F8A'); K.hills(1010, 110, 5, '#5A1580');
        K.sea(1000, t, { cols: ['#FFB27A', '#5A1FA8'], amp: 16, rows: 9, crest: C.cream });
        K.lotus(830, 1130 + K.bob(t, 1, 6), 0.7, 1); K.lotus(960, 1050 + K.bob(t, 2, 5), 0.45, 1); K.lotus(700, 1260 + K.bob(t, 3, 6), 0.6, 1);
        ell(170, 1210, 440, 170, lg(0, 1040, 0, 1380, ['#6A1F9A', '#2A0E66']));
        for (let i = 0; i < 7; i++) line([[40 + i * 22, 1060], [20 + i * 26 + Math.sin(t * 1.5 + i) * 14, 860 + (i % 3) * 40]], '#3A1466', 9);
        const u = eio(seg(lt, off - 0.3, off + 0.6)), hx = lerp(176, 150, u), hy = lerp(-6, -150, u);
        K.king(370, 1030, { s: 1.05, kneel: true, lean: lerp(0.5, 0.2, u), hands: [[hx - 26, hy], [hx + 10, hy + 8]], eyes: 'closed', t });
        const wx = 370 + 1.05 * (Math.cos(lerp(0.5, 0.2, u)) * hx - Math.sin(lerp(0.5, 0.2, u)) * hy), wy = 1030 + 1.05 * (Math.sin(lerp(0.5, 0.2, u)) * hx + Math.cos(lerp(0.5, 0.2, u)) * hy);
        glow(wx, wy, 90, C.cyan, 0.5 + 0.3 * u);
        if (u > 0.05) for (let i = 0; i < 6; i++) { const p = ((t * 0.9 + i / 6) % 1); circle(wx - 20 + i * 9, wy + 20 + p * 160, 7 * (1 - p), rgba(C.cyan, 0.9)); }
        K.ripples(560, 1110, t, 3, 130, C.cream, 0.6);
        K.bird(300 + lt * 40, 380, 0.7, t, '#3A1466'); K.bird(210 + lt * 40, 440, 0.5, t + 1, '#3A1466');
      } });
    cue(st + 0.5, 'waves', { dur: 3.0, gain: 0.5 }); cue(st + off, 'plop', { gain: 0.6 }); cue(st + off + 0.3, 'sparkle', { dur: 1.0, gain: 0.5 });
  }

  // ── 2 · "A tiny fish shimmered in his cupped hands," ────────────────────
  {
    const st = cut(2), sh = Wd('shimmered', 2) - st;
    add({ id: 'S03', at: st, cam: [540, 780], zoom: 0.28, note: 'cupped hands close-up, tiny golden fish circling',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFC65C', '#FF7A4D', '#B0277F', '#3A1680']));
        K.rays(540, 760, 1400, t, C.cream, 0.28); K.motes(t, 30, C.cream, 0.7, 5);
        const fa = t * 1.8, fx = Math.cos(fa) * 120, fy = -14 + Math.sin(fa) * 30;
        glow(540 + fx * 1.25, 800 + fy * 1.25, 150 + 40 * Math.sin(t * 5), C.gold, 0.5 + 0.4 * seg(lt, sh - 0.2, sh + 0.2));
        K.hands(540, 800, 1.25, t, { water: () => K.fish(fx, fy, 0.34, { t, flip: Math.sin(fa) > 0, glow: 0.7, rot: Math.cos(fa) * 0.15, swish: 14 }) });
        const sp = seg(lt, sh - 0.1, sh + 0.9);
        for (let i = 0; i < 9; i++) K.sparkle(540 + fx * 1.25 + Math.cos(i * 0.7 + t) * (60 + i * 16) * sp, 790 + fy + Math.sin(i * 0.7 + t) * (40 + i * 10) * sp - 30, 26 - i * 1.5, Math.sin(sp * PI), C.cream);
      } });
    cue(st + 0.2, 'bubbles', { dur: 1.2, gain: 0.6 }); cue(st + sh, 'sparkle', { dur: 1.2 }); cue(st + sh, 'bell', { gain: 0.5 });
  }

  // ── 3 · "and whispered, please, protect me." ────────────────────────────
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 800], zoom: 0.14, note: 'underwater: the tiny fish trembles, dark hunters circle',
      draw(lt, d, t) {
        K.underwater(t, { seed: 4 });
        K.seaweed(140, 1500, 500, t, '#0B5B5F', 1); K.seaweed(930, 1560, 620, t, '#0B5B5F', 2);
        K.darkFish(lerp(-420, 420, seg(lt, 0, d)), 420, 1.5, false, t); K.darkFish(lerp(1500, 620, seg(lt, 0, d)), 1130, 1.8, true, t + 1);
        K.darkFish(lerp(1300, 900, seg(lt, 0, d)), 240, 0.8, true, t + 2);
        const tr = Math.sin(t * 34) * 5;
        K.fish(540 + tr, 780 + Math.sin(t * 2) * 14, 0.7, { t, glow: 0.9, eye: 'fear', swish: 16, rot: -0.2 });
        K.vignette(0.55, '#020A2A');
      } });
    cue(st, 'rumble', { dur: 2.2, gain: 0.7 }); cue(st + 0.2, 'bubbles', { dur: 1.8, gain: 0.5 });
  }

  // ── 4 · "So the king carried it home in a water pot." ───────────────────
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [600, 880], zoom: 0.08, note: 'dusk walk home, glowing pot',
      draw(lt, d, t) {
        K.sky('dusk'); K.stars(t, 0.6, 3, 50, 500); K.sun(250, 900, 170, t, { c2: C.orange, c3: C.magenta });
        const sc = lt * 60;
        ctx.save(); ctx.translate(-sc * 0.3, 0); K.hills(1010, 200, 2, '#6B1FA8'); K.palace(900, 960, 0.75, '#3A1280'); ctx.restore();
        ctx.save(); ctx.translate(-sc * 0.7, 0); K.tree(180, 1190, 0.9, '#2A0E66', '#3D1690'); K.tree(1180, 1200, 1.0, '#2A0E66', '#3D1690'); ctx.restore();
        K.hills(1280, 120, 1.1, '#2A0E66', 0.002);
        K.king(500, 900 + Math.abs(Math.sin(t * 7)) * -8, { s: 0.92, walk: true, t, hands: [[36, -70], [150, -70]], eyes: 'open', lookX: 3, lookY: 3,
          holding: (x, y) => { K.fish(x + 4, y - 96 + Math.sin(t * 6) * 5, 0.2, { t, rot: -1.1, glow: 0.8, eye: 'happy', swish: 12 }); K.pot(x, y + 4, 0.8, { glow: 0.6 }); } });
        K.motes(t, 24, C.paleGold, 0.6, 9);
      } });
    for (let i = 0; i < 4; i++) cue(st + 0.3 + i * 0.5, 'tock', { gain: 0.5 }); cue(st + 0.6, 'sparkle', { dur: 1.2, gain: 0.4 });
  }

  // ── 5 · "But by morning, the fish had outgrown it." ─────────────────────
  {
    const st = cut(5), grow = Wd('outgrown', 5) - st;
    add({ id: 'S06', at: st, cam: [540, 820], zoom: 0.1, note: 'morning: fish bursts out of the pot',
      draw(lt, d, t) {
        K.sky('gold'); K.rays(540, 700, 1400, t, C.cream, 0.4); K.sun(540, 620, 300, t, { glow: 0.4 });
        fillAll(rgba('#B0277F', 0.12));
        ctx.fillStyle = lg(0, 1150, 0, 1920, ['#7B1FA8', '#2A0E66']); ctx.fillRect(-400, 1170, W + 800, 1200);
        rr(180, 1150, 720, 60, 20); ctx.fillStyle = lg(0, 1150, 0, 1210, [C.gold, C.saffron]); ctx.fill();
        const g = eob(seg(lt, grow - 0.35, grow + 0.25)), fs = lerp(0.42, 1.55, g), wob = Math.sin(t * 16) * 0.05 * g;
        ctx.save(); ctx.translate(540, 1150); ctx.rotate(wob);
        K.fish(0, -470 - fs * 200, fs, { t, rot: -PI / 2 + Math.sin(t * 5) * 0.08, glow: 0.6, eye: g > 0.5 ? 'fear' : 'happy', swish: 10 });
        K.pot(0, -180, 2.2);
        ctx.restore();
        K.splash(380, 860, 240, seg(lt, grow - 0.2, grow + 0.7), C.cyan); K.splash(700, 860, 240, seg(lt, grow - 0.15, grow + 0.75), C.cyan);
      } });
    cue(st + 0.2, 'bell', { gain: 0.5 }); cue(st + grow - 0.2, 'boing'); cue(st + grow, 'plop'); cue(st + grow + 0.1, 'bubbles', { dur: 0.8 });
  }

  // ── 6-8 · pond → lake → river ───────────────────────────────────────────
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 820], zoom: 0.12, tr: 0.25, note: 'pond: fish fills it',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#19C37D', '#0B8B5F', '#0B5B4F']));
        for (let i = 0; i < 16; i++) K.sprout(60 + (i * 271) % 980, 300 + (i * 173) % 1300, 0.5, 1, i % 2 ? C.pink : C.gold);
        ell(540, 830, 470, 370, C.gold); ell(540, 830, 440, 340, lg(0, 500, 0, 1170, [C.cyan, '#2A9FE8', C.ocean]));
        K.ripples(540, 830, t, 4, 420, C.white, 0.5);
        const g = lerp(0.9, 1.75, eo(seg(lt, 0, d)));
        K.fish(540 + Math.sin(t * 2) * 20, 830, g, { t, rot: -0.25 + Math.sin(t * 1.6) * 0.06, glow: 0.4, swish: 7 });
        K.lotus(210, 1090, 0.7, 1); K.lotus(880, 580, 0.6, 1); K.lotus(860, 1100, 0.5, 1);
        K.splash(540, 800, 300, seg(lt, 0, 0.7), C.cream);
      } });
    cue(st, 'plop'); cue(st + 0.1, 'whoosh', { gain: 0.6 });
  }
  {
    const st = L(7) - 0.12;
    add({ id: 'S08', at: st, cam: [540, 820], zoom: 0.2, tr: 0.18, note: 'lake: bigger',
      draw(lt, d, t) {
        K.sky('day'); K.sun(820, 380, 120, t); K.hills(820, 260, 1.4, '#2A9F7F'); K.hills(880, 160, 4, '#0B7B5F');
        K.sea(860, t, { cols: [C.cyan, C.ocean], amp: 16, rows: 4, bottom: 1100 });
        K.fish(520, 930, lerp(2.0, 2.3, seg(lt, 0, d)), { t, rot: -0.12, glow: 0.4, swish: 7 });
        K.sea(1040, t, { cols: ['#3FB8F0', C.deep], amp: 22, rows: 6 });
        K.splash(540, 900, 380, seg(lt, 0, 0.6), C.cream);
      } });
    cue(st, 'plop', { gain: 1.1 }); cue(st, 'whoosh', { gain: 0.6 });
  }
  {
    const st = L(8) - 0.1;
    add({ id: 'S09', at: st, cam: [540, 820], zoom: 0.14, tr: 0.18, note: 'river: wall to wall',
      draw(lt, d, t) {
        K.sky('day'); K.clouds(300, t, rgba(C.white, 0.7), 2, 4, 14, 0.7);
        K.hills(760, 200, 0.6, '#2A9F7F');
        K.sea(760, t, { cols: [C.cyan, C.ocean], amp: 18, rows: 4, bottom: 1050, speed: 2 });
        const sh = Math.sin(t * 30) * 5 * (1 - seg(lt, 0, 0.6));
        K.fish(500 + sh, 900, lerp(2.9, 3.3, seg(lt, 0, d)), { t, rot: -0.06, glow: 0.45, swish: 6 });
        K.sea(1080, t, { cols: ['#3FB8F0', C.deep], amp: 26, rows: 6, speed: 2 });
        K.tree(-40, 1180, 1.4, '#064D3A', '#0B7B5F'); K.tree(1120, 1160, 1.5, '#064D3A', '#0B7B5F');
        K.splash(300, 980, 420, seg(lt, 0, 0.7), C.cream); K.splash(820, 980, 420, seg(lt, 0.1, 0.8), C.cream);
      } });
    cue(st, 'slam', { gain: 0.6 }); cue(st, 'waves', { dur: 1.6, gain: 0.8 });
  }

  // ── 9 · "until even the ocean could barely hold it." ────────────────────
  {
    const st = cut(9);
    add({ id: 'S10', at: st, cam: [540, 760], zoom: -0.1, note: 'ocean: colossal leap across the sun, tiny king for scale',
      draw(lt, d, t) {
        K.sky('dusk'); K.stars(t, 0.5, 8, 40, 400); K.rays(540, 800, 1500, t, C.paleGold, 0.3); K.sun(540, 800, 330, t, { c2: C.orange, c3: C.magenta });
        K.sea(900, t, { cols: ['#FF8A9A', '#7B1FA8'], amp: 20, rows: 3, bottom: 1060, crest: C.cream });
        const u = eo(seg(lt, 0, d + 0.4));
        K.fish(lerp(380, 600, u), lerp(1000, 720, Math.sin(u * PI * 0.72)), 3.0, { t, rot: lerp(-0.7, 0.1, u), glow: 0.5, swish: 5 });
        K.sea(1040, t, { cols: ['#B03FC8', '#1B0F5C'], amp: 34, rows: 7, speed: 1.6, crest: C.cream });
        K.splash(300, 1040, 520, seg(lt, 0, 1.1), C.cream); K.splash(520, 1060, 420, seg(lt, 0.1, 1.2), C.pink);
        ell(120, 1240, 220, 80, '#12082E'); K.king(130, 1150, { s: 0.3, hands: [[-150, -260], [150, -260]], eyes: 'wide', t });
      } });
    cue(st, 'waves', { dur: 2.6, gain: 1.0 }); cue(st + 0.15, 'slam', { gain: 0.7 }); cue(st + 0.5, 'conch', { gain: 0.5 });
  }

  // ── 10 · "The king bowed and asked, who are you, really?" ───────────────
  {
    const st = cut(10), bow = Wd('bowed', 10) - st, who = Wd('who', 10) - st;
    add({ id: 'S11', at: st, cam: [420, 900], zoom: 0.1, note: 'shore at night: king bows before the vast glowing face',
      draw(lt, d, t) {
        K.sky('night'); K.stars(t, 1, 11, 110, 900);
        K.sea(900, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 3, bottom: 1040 });
        K.fish(1120, 800 + K.bob(t, 0, 10), 2.7, { t, flip: true, glow: 0.6 + 0.3 * seg(lt, who, who + 0.8), swish: 3, eye: 'n' });
        K.sea(1010, t, { cols: ['#5A2FD0', '#0D0630'], amp: 22, rows: 6 });
        ell(160, 1240, 420, 130, lg(0, 1110, 0, 1370, ['#4A1D96', '#1B0F5C']));
        const b = eio(seg(lt, bow - 0.35, bow + 0.25)) * (1 - 0.6 * eio(seg(lt, who - 0.2, who + 0.3)));
        K.king(200, 1090, { s: 0.8, kneel: true, lean: 0.55 * b, hands: [[30, -150], [58, -150]], eyes: lt > who ? 'open' : 'closed', lookX: 4, lookY: -4, t });
        K.motes(t, 26, C.paleGold, 0.8, 13);
      } });
    cue(st + bow, 'thud', { gain: 0.4 }); cue(st + who, 'sparkle', { dur: 1.0, gain: 0.6 });
  }

  // ── 11 · "The golden fish replied, I am Vishnu, protector of the worlds." ─
  {
    const st = cut(11), rev = Wd('I', 11) - st - 0.1;
    add({ id: 'S12', at: st, cam: [540, 780], zoom: 0.3, note: 'the fish blazes with light',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 90, 1500);
        const g = seg(lt, 0, d);
        K.rays(540, 780, 1500, t * 3, C.paleGold, 0.3 + 0.5 * g); K.mandala(540, 780, 300 + 260 * eo(g), t, C.gold, 0.5 * g, 3);
        K.fish(540, 780 + Math.sin(t * 2) * 10, 1.7, { t, glow: 0.6 + g, swish: 4 });
        glow(540, 780, 200 + 900 * ei(g), C.cream, ei(g));
      } });
    cue(st + 0.2, 'shimmer', { dur: rev });
    add({ id: 'S13', at: st + rev, cam: [540, 760], zoom: 0.08, flash: true, tr: 0, note: 'VISHNU rises from the fish: mandala, chakra, conch, petals',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 640, 1600, t, C.paleGold, 0.42, 18); K.mandala(540, 640, lerp(300, 560, eo(seg(lt, 0, 1.2))), t, C.gold, 0.75);
        glow(540, 640, 700, C.magenta, 0.35);
        const r = eo(seg(lt, 0, 1.1));
        K.vishnu(540, lerp(1160, 820, r), 1.02, { t, arms: eo(seg(lt, 0.3, 1.3)) });
        K.sea(1280, t, { cols: ['#7B3FE4', '#150A4A'], amp: 20, rows: 5, crest: C.gold });
        K.petals(t, 26, 3, 0.9);
      } });
    cue(st + rev, 'conch', { gain: 1.1 }); cue(st + rev, 'slam', { gain: 0.5 }); cue(st + rev + 0.2, 'sparkle', { dur: 2.2 }); cue(st + rev + 0.4, 'bell');
  }

  // ── 12 · "In seven days, a great flood will swallow the earth." ─────────
  {
    const st = cut(12), fl = Wd('great', 12) - st, sw = Wd('swallow', 12) - st;
    add({ id: 'S14', at: st, cam: [600, 820], zoom: 0.06, note: 'seven moons count down, then the great wave towers over the land',
      draw(lt, d, t) {
        const dark = seg(lt, fl - 0.3, sw + 0.5);
        K.sky('dusk'); fillAll(rgba('#07031F', 0.55 * dark)); K.stars(t, 0.7, 2, 60, 600);
        K.hills(1080, 220, 2.4, '#6B1FA8'); K.palace(760, 1020, 0.6, '#2A0E66'); K.tree(420, 1090, 0.6, '#2A0E66', '#3A1680'); K.tree(1010, 1110, 0.7, '#2A0E66', '#3A1680');
        K.hills(1200, 110, 0.8, '#2A0E66', 0.003);
        const u = eio(seg(lt, fl - 0.4, d + 0.3));
        K.bigWave(lerp(-560, 300, u), lerp(1500, 1040, eo(seg(lt, fl - 0.4, fl + 0.9))), 1.05, t);
        K.sea(lerp(1500, 1180, u), t, { cols: [C.cyan, C.deep], amp: 30, rows: 5, speed: 2 });
        for (let i = 0; i < 7; i++) {
          const on = seg(lt, 0.1 + i * (fl - 0.3) / 7, 0.25 + i * (fl - 0.3) / 7), x = 180 + i * 120, y = 330 - Math.sin(i / 6 * PI) * 70;
          ctx.strokeStyle = rgba(C.paleGold, 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 40, 0, TAU); ctx.stroke();
          if (on > 0) { glow(x, y, 110 * on, C.gold, 0.6); circle(x, y, 40 * eob(on), rg(x - 10, y - 10, 4, 44, [C.cream, C.gold, C.saffron])); }
        }
        if (dark > 0.3) K.rain(t, 0.3 * dark, 80);
      } });
    for (let i = 0; i < 7; i++) cue(st + 0.1 + i * (fl - 0.3) / 7, 'tock', { gain: 0.7 });
    cue(st + fl - 0.3, 'rumble', { dur: 2.4 }); cue(st + fl, 'waves', { dur: 2.2, gain: 1.2 });
  }

  // ── 13 · "Gather the seven sages, the seeds of every plant," ────────────
  {
    const st = cut(13), sd = Wd('seeds', 13) - st;
    const pos = [[290, 500], [540, 470], [790, 500], [170, 770], [417, 750], [663, 750], [910, 770]];
    add({ id: 'S15', at: st, cam: [540, 760], zoom: 0.08, note: 'the seven sages appear one by one; a bowl of glowing seeds',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 21, 90, 1700); K.mandala(540, 640, 600, t, C.gold, 0.22, 4);
        pos.forEach(([x, y], i) => { const p = seg(lt, 0.15 + i * 0.2, 0.45 + i * 0.2); if (p <= 0) return;
          ctx.save(); ctx.globalAlpha = p; K.sage(x, y + Math.sin(t * 1.4 + i) * 6 + (1 - eo(p)) * 60, 0.92 * lerp(0.7, 1, eob(p)), { halo: p, c1: i % 2 ? C.orange : C.saffron }); ctx.restore(); });
        const b = eob(seg(lt, sd - 0.25, sd + 0.2));
        if (b > 0) { ctx.save(); ctx.translate(540, 1080); ctx.scale(b, b);
          glow(0, -40, 300, C.leaf, 0.5);
          for (let i = 0; i < 9; i++) { const an = -PI * (0.15 + 0.7 * i / 8), r = 70 + ((t * 60 + i * 37) % 150); circle(Math.cos(an) * r, -50 + Math.sin(an) * r, 9, i % 2 ? C.leaf : C.gold); }
          K.sprout(0, -40, 0.7, seg(lt, sd, sd + 1.2), C.pink);
          for (let i = -4; i <= 4; i++) ell(i * 24, -44 + Math.abs(i) * 2, 13, 9, i % 2 ? C.gold : C.leaf, i);
          ctx.beginPath(); ctx.moveTo(-150, -44); ctx.quadraticCurveTo(-120, 70, 0, 70); ctx.quadraticCurveTo(120, 70, 150, -44); ctx.closePath(); ctx.fillStyle = lg(-150, 0, 150, 0, ['#B5520A', C.gold, C.paleGold, C.gold, '#B5520A']); ctx.fill();
          ctx.restore(); }
      } });
    for (let i = 0; i < 7; i++) cue(st + 0.15 + i * 0.2, 'chime', { gain: 0.8, note: i });
    cue(st + sd, 'sparkle', { dur: 1.0 });
  }

  // ── 14 · "and every creature, and wait for me." ─────────────────────────
  {
    const st = L(14) - 0.15, wt = Wd('wait', 14) - st;
    add({ id: 'S16', at: st, cam: [540, 860], zoom: 0.07, note: 'animals in procession against a golden sky; the fish leaps away at sea',
      draw(lt, d, t) {
        K.sky('gold'); K.sun(760, 640, 260, t); K.clouds(330, t, rgba(C.cream, 0.5), 4, 4, 12, 0.7);
        K.sea(830, t, { cols: ['#FFB85C', '#C8327F'], amp: 12, rows: 5, bottom: 1100, crest: C.cream });
        const j = seg(lt, wt - 0.1, wt + 1.0);
        if (j > 0 && j < 1) { K.fish(lerp(880, 1030, j), 850 - Math.sin(j * PI) * 170, 0.36, { t, rot: lerp(-0.8, 0.8, j), glow: 0.8, swish: 14 }); }
        K.splash(1030, 860, 120, seg(lt, wt + 0.9, wt + 1.5), C.cream);
        K.hills(1140, 110, 2, '#4A1580', 0.0025);
        const x0 = -170 + lt * 90;
        K.elephant(x0 + 180, 960, 0.95, t, '#2A0E66'); K.elephant(x0 - 140, 1010, 0.6, t + 1, '#3A1680');
        K.deer(x0 + 560, 990, 0.9, t, '#2A0E66'); K.deer(x0 + 760, 1010, 0.7, t + 0.5, '#3A1680');
        for (let i = 0; i < 5; i++) K.bird(x0 * 1.2 + 200 + i * 90, 420 + (i % 2) * 60 + Math.sin(t + i) * 10, 0.7, t + i, '#3A1466');
        K.hills(1300, 90, 5, '#1B0F5C', 0.003);
      } });
    cue(st, 'tock', { gain: 0.6 }); cue(st + 0.4, 'thud', { gain: 0.3 }); cue(st + 0.9, 'thud', { gain: 0.3 }); cue(st + wt + 0.9, 'plop');
  }

  // ── 15 · "Meanwhile, a demon named Hayagriva stole the sacred Vedas," ───
  {
    const st = cut(15), stl = Wd('stole', 15) - st;
    add({ id: 'S17', at: st, cam: [540, 760], zoom: 0.12, note: 'crimson dark: Hayagriva rises, snatches the glowing Vedas',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0018', '#3A0030', '#8A0A3A', '#1A0020']));
        K.clouds(260, t, rgba('#1A0020', 0.8), 2, 5, 30, 1.0); K.clouds(1500, t, rgba('#0A0018', 0.9), 9, 5, 40, 1.2);
        K.motes(t, 40, C.red, 0.8, 4);
        const rise = eo(seg(lt, 0.1, 1.5)), grab = eio(seg(lt, stl - 0.15, stl + 0.2));
        const dy = lerp(1900, 900, rise) + Math.sin(t * 2) * 8;
        if (grab < 1) K.vedas(540, lerp(280 + Math.sin(t * 2) * 12, dy + 135, grab), lerp(1, 0.9, grab), t, 1);
        K.demon(540, dy, 0.9, { t, hold: grab >= 1 ? lerp(1, 0.55, seg(lt, stl + 0.2, d)) : 0, raise: lerp(0.3, 1.6, seg(lt, stl - 0.6, stl - 0.1)) });
        K.vignette(0.5 + 0.3 * seg(lt, stl, d), '#05000F');
      } });
    cue(st, 'rumble', { dur: 3.6, gain: 1.0 }); cue(st + 0.3, 'growl'); cue(st + stl, 'zip'); cue(st + stl + 0.15, 'slam', { gain: 0.6 });
  }

  // ── 16 · "and hid them deep beneath the sea." ───────────────────────────
  {
    const st = cut(16);
    add({ id: 'S18', at: st, cam: [540, 800], zoom: 0.1, note: 'the demon sinks into the abyss, the light of the Vedas fading',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#1257C8', '#0A2A7A', '#07103A', '#030414']));
        K.shafts(t, 0.16); K.bubbles(t, 30, 2, 0.4, 260);
        const u = eio(seg(lt, 0, d + 0.4));
        K.demon(540 + Math.sin(t) * 30, lerp(260, 1150, u), lerp(0.75, 0.42, u), { t, hold: lerp(0.9, 0.5, u), a: lerp(1, 0.75, u) });
        K.seaweed(120, 1700, 500, t, '#062A4A', 1); K.seaweed(960, 1740, 560, t, '#062A4A', 3);
        K.vignette(0.4 + 0.5 * u, '#01020F');
      } });
    cue(st, 'bubbles', { dur: 2.0 }); cue(st, 'slide', { dur: 1.8 });
  }

  // ── 17 · "On the seventh day, the skies broke open," ────────────────────
  {
    const st = cut(17), br = Wd('broke', 17) - st;
    add({ id: 'S19', at: st, cam: [540, 760], zoom: 0.1, note: 'storm clouds roll in; lightning splits the sky on "broke"',
      draw(lt, d, t) {
        K.sky('storm'); const fl = lt > br ? Math.max(0, 1 - (lt - br) * 2.2) : 0;
        fillAll(rgba('#B8A8FF', 0.4 * fl));
        K.clouds(260, t, '#4A34A8', 1, 6, 60, 1.2); K.clouds(460, t, '#33247F', 5, 6, 90, 1.3); K.clouds(120, t, '#1E1560', 8, 6, 120, 1.4);
        K.lightning(600, 3, fl > 0 ? 0.4 + fl : 0, 1050); K.lightning(250, 9, seg(lt, br + 0.7, br + 0.75) * (1 - seg(lt, br + 0.85, br + 1.3)), 900); K.lightning(880, 21, seg(lt, br + 1.4, br + 1.45) * (1 - seg(lt, br + 1.5, br + 2.0)), 800);
        K.hills(1100, 220, 2.4, '#2A1C70'); K.palace(700, 1040, 0.55, '#120A3A', '#FFB85C'); K.tree(260, 1110, 0.7, '#120A3A', '#1E1560');
        K.sea(1200, t, { cols: STORM_SEA, amp: 30, rows: 5, speed: 2 });
        K.rain(t, 0.55 * seg(lt, br - 0.2, br + 0.5), 170);
      } });
    cue(st, 'rumble', { dur: 2.4 }); cue(st + br, 'thunder'); cue(st + br, 'rain', { dur: 22 });
  }

  // ── 18 · "and the oceans rose above the mountains." ─────────────────────
  {
    const st = cut(18);
    add({ id: 'S20', at: st, cam: [540, 800], zoom: 0.06, note: 'the sea climbs until the snow peaks drown',
      draw(lt, d, t) {
        K.sky('storm'); const fl = Math.max(0, 1 - Math.abs(lt - 1.3) * 5);
        fillAll(rgba('#B8A8FF', 0.3 * fl));
        K.clouds(240, t, '#4A34A8', 1, 6, 60, 1.2); K.clouds(100, t, '#1E1560', 8, 6, 120, 1.4);
        K.lightning(820, 14, fl, 700);
        K.mountain(240, 1500, 800, 880, '#5A4AA8', '#1B1250'); K.mountain(820, 1500, 900, 1000, '#6A5AC0', '#4A34A8'); K.mountain(540, 1500, 760, 720, '#4A3A98', '#150E40');
        const lv = lerp(1280, 500, eio(seg(lt, 0, d + 0.3)));
        K.sea(lv, t, { cols: STORM_SEA, amp: 44, rows: 9, speed: 2.4, wl: 190 });
        K.rain(t, 0.6, 180);
      } });
    cue(st, 'waves', { dur: 2.6, gain: 1.3 }); cue(st + 1.3, 'thunder', { gain: 0.7 });
  }

  // ── 19 · "Just then, a shining boat appeared, and so did Matsya," ───────
  {
    const st = cut(19), so = Wd('so', 19) - st - 0.15;
    add({ id: 'S21', at: st, cam: [540, 820], zoom: 0.1, note: 'a shining boat descends in a shaft of light',
      draw(lt, d, t) {
        K.sky('storm'); K.clouds(200, t, '#33247F', 5, 6, 90, 1.3);
        const a = eo(seg(lt, 0.2, 1.2));
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); ctx.moveTo(440, -200); ctx.lineTo(640, -200); ctx.lineTo(1000, 1100); ctx.lineTo(80, 1100); ctx.closePath(); ctx.fillStyle = lg(0, 0, 0, 1100, [rgba(C.paleGold, 0.5 * a), rgba(C.paleGold, 0.05 * a)]); ctx.fill(); ctx.restore();
        K.sea(900, t, { cols: STORM_SEA, amp: 30, rows: 3, bottom: 1080, speed: 2 });
        ctx.save(); ctx.globalAlpha = a; K.boat(540, lerp(840, 930, a) + K.bob(t, 0, 16), 0.9, t, { rot: Math.sin(t * 1.6) * 0.04, glow: 0.6 }); ctx.restore();
        K.sea(1010, t, { cols: ['#2A5FD0', '#050B2E'], amp: 40, rows: 7, speed: 2.2 });
        K.rain(t, 0.5, 150);
        for (let i = 0; i < 8; i++) K.sparkle(540 + Math.cos(i * 0.8 + t) * 330, 760 + Math.sin(i * 1.3 + t * 1.2) * 150, 22, a * (0.5 + 0.5 * Math.sin(t * 4 + i)));
      } });
    cue(st + 0.2, 'shimmer', { dur: 1.6 }); cue(st + 0.3, 'bell');
    add({ id: 'S22', at: st + so, cam: [540, 860], zoom: 0.1, note: 'beneath the boat: a vast golden shape rises from the deep',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#2A6FD0', '#0A2A7A', '#07103A', '#030414']));
        K.shafts(t, 0.14);
        fillAll(lg(0, 0, 0, 330, ['#33247F', '#4A2AA8']));
        K.boat(540, 262 + K.bob(t, 0, 8), 0.42, t, { rot: Math.sin(t * 1.6) * 0.04, glow: 0.7 });
        ctx.fillStyle = lg(0, 250, 0, 2000, ['#2A6FD0', '#0A2A7A', '#07103A', '#030414']); ctx.fillRect(-400, 262, W + 800, 2400);
        ctx.save(); ctx.globalAlpha = 0.5; ctx.translate(0, 524 + K.bob(t, 0, 8) * 2); ctx.scale(1, -1); K.boat(540, 262, 0.42, t, { glow: 0 }); ctx.restore();
        ctx.fillStyle = lg(0, 262, 0, 700, [rgba('#8FD8FF', 0.4), rgba('#2A6FD0', 0)]); ctx.fillRect(-400, 262, W + 800, 440);
        line([[-100, 262], [1180, 262]], rgba(C.white, 0.7), 5);

        const u = eo(seg(lt, 0, d + 0.6));
        K.fish(lerp(240, 500, u), lerp(1800, 1000, u), 1.8, { t, rot: lerp(-1.0, -0.5, u), glow: 1, horn: true, swish: 5 });
        K.bubbles(t, 30, 7, 0.5, 300);
      } });
    cue(st + so, 'conch', { gain: 0.9 }); cue(st + so, 'bubbles', { dur: 1.6 });
  }

  // ── 20 · "now vast as a mountain, with one golden horn." ────────────────
  {
    const st = cut(20), hn = Wd('golden', 20) - st;
    add({ id: 'S23', at: st, cam: [700, 600], zoom: 0.12, note: 'Matsya towers over the tiny boat; the horn gleams',
      draw(lt, d, t) {
        K.sky('storm'); fillAll(rgba(C.gold, 0.08)); K.clouds(160, t, '#33247F', 5, 6, 90, 1.3);
        K.sea(860, t, { cols: STORM_SEA, amp: 26, rows: 3, bottom: 1060, speed: 2 });
        const r = eo(seg(lt, 0, 1.4));
        K.fish(360, lerp(1250, 1010, r) + K.bob(t, 0, 10), 2.6, { t, rot: -0.1, glow: 0.8, horn: 0.8, swish: 3 });
        K.sea(1070, t, { cols: NIGHT_SEA, amp: 40, rows: 6, speed: 2.2 });
        K.boat(215, 1130 + K.bob(t, 2, 14), 0.36, t, { rot: Math.sin(t * 1.8) * 0.06, glow: 0.5 });
        K.sea(1190, t, { cols: ['#1A3FA0', '#050B2E'], amp: 40, rows: 4, speed: 2.2 });
        K.rain(t, 0.45, 150);
        const g = seg(lt, hn - 0.1, hn + 0.3) * (1 - seg(lt, hn + 0.8, hn + 1.4));
        K.sparkle(905, 400 + K.bob(t, 0, 10), 130 * g, g, C.white); glow(905, 400, 260 * g, C.cream, g);
      } });
    cue(st, 'waves', { dur: 3.0, gain: 1.1 }); cue(st + 0.3, 'rumble', { dur: 1.6 }); cue(st + hn, 'bell', { gain: 1.2 }); cue(st + hn, 'sparkle', { dur: 0.9 });
  }

  // ── 21 · "Using the serpent Vasuki as a rope," ──────────────────────────
  {
    const st = cut(21), rp = Wd('rope', 21) - st;
    add({ id: 'S24', at: st, cam: [540, 760], zoom: 0.1, note: 'Vasuki the emerald serpent rises and stretches into a rope',
      draw(lt, d, t) {
        K.sky('storm'); K.clouds(200, t, '#33247F', 5, 6, 90, 1.3);
        const fl = Math.max(0, 1 - Math.abs(lt - 0.5) * 5); fillAll(rgba('#B8FFD8', 0.2 * fl));
        glow(540, 760, 700, C.emerald, 0.35);
        K.sea(1000, t, { cols: STORM_SEA, amp: 30, rows: 3, bottom: 1150, speed: 2 });
        const u = eio(seg(lt, rp - 0.4, rp + 0.4)), grow = eo(seg(lt, 0, 1.0));
        K.serpent([lerp(180, -60, u), lerp(1180, 900, u)], [lerp(860, 1010, u), lerp(420, 640, u)], t, { w: 92, sag: lerp(-260, 30, u), wig: lerp(90, 14, u), draw: grow });
        K.sea(1130, t, { cols: NIGHT_SEA, amp: 40, rows: 6, speed: 2.2 });
        K.rain(t, 0.45, 150);
      } });
    cue(st + 0.1, 'hiss', { dur: 1.4 }); cue(st + 0.5, 'thunder', { gain: 0.5 }); cue(st + rp, 'zip', { gain: 0.6 });
  }

  // ── 22 · "the king tied the boat to that horn." ─────────────────────────
  {
    const st = cut(22), hn = Wd('horn', 22) - st;
    add({ id: 'S25', at: st, cam: [600, 760], zoom: 0.1, note: 'the serpent-rope runs from the prow and knots around the horn',
      draw(lt, d, t) {
        K.sky('storm'); K.clouds(200, t, '#33247F', 5, 6, 90, 1.3);
        K.sea(840, t, { cols: STORM_SEA, amp: 26, rows: 3, bottom: 1000, speed: 2 });
        const fy = 830 + K.bob(t, 0, 12), by = 960 + K.bob(t, 2, 14);
        K.fish(800, fy, 1.2, { t, glow: 0.8, horn: true, swish: 4, rot: -0.05 });
        const hx = 800 + 1.2 * 156, hy = fy - 1.2 * 128, dr = eo(seg(lt, 0.15, hn));
        K.boat(195, by, 0.42, t, { rot: Math.sin(t * 1.8) * 0.05, glow: 0.5, kingHands: [[60, -200], [90, -190]] });
        K.serpent([355, by - 60], [hx, hy], t, { w: 26, sag: lerp(90, 14, seg(lt, hn, hn + 0.4)), wig: lerp(12, 3, seg(lt, hn, hn + 0.4)), draw: dr, head: dr < 0.98 });
        if (dr >= 0.98) { for (let i = 0; i < 3; i++) { ctx.strokeStyle = i % 2 ? C.leaf : C.emerald; ctx.lineWidth = 18; ctx.beginPath(); ctx.ellipse(hx + 4 + i * 5, hy - i * 16 + 6, 34 - i * 5, 12, -0.3, 0, TAU); ctx.stroke(); } }
        K.sea(1010, t, { cols: NIGHT_SEA, amp: 40, rows: 7, speed: 2.2 });
        K.rain(t, 0.45, 150);
        const g = seg(lt, hn, hn + 0.25) * (1 - seg(lt, hn + 0.5, hn + 1.0)); K.sparkle(hx, hy, 110 * g, g, C.white);
      } });
    cue(st + 0.15, 'slide', { dur: hn - 0.15 }); cue(st + hn, 'pop'); cue(st + hn, 'bell', { gain: 0.8 });
  }

  // ── 23 · "All through the stormy night, Matsya pulled them across the waves." ─
  {
    const st = cut(23), m = Wd('Matsya', 23) - st - 0.15;
    const tow = (lt, t, fx, fy, fs, bx, by, bs) => {
      const f1 = Math.max(0, 1 - Math.abs(((t * 0.45) % 1) - 0.5) * 14);
      K.sky('storm'); fillAll(rgba('#B8A8FF', 0.3 * f1)); K.stars(t, 0.3, 4, 30, 300);
      K.clouds(200, t, '#4A34A8', 1, 6, 260, 1.2); K.clouds(60, t, '#1E1560', 8, 6, 380, 1.4);
      K.lightning(200 + (Math.floor(t * 0.45) % 3) * 320, Math.floor(t * 0.45) * 7, f1, 760);
      K.sea(820, t, { cols: STORM_SEA, amp: 34, rows: 3, bottom: 1000, speed: 5 });
      const fyy = fy + K.bob(t, 0, 22), byy = by + K.bob(t, 1.4, 26);
      K.fish(fx, fyy, fs, { t, glow: 0.9, horn: true, swish: 9, rot: Math.sin(t * 1.6) * 0.07 });
      K.boat(bx, byy, bs, t, { rot: Math.sin(t * 1.6 + 1.4) * 0.07, glow: 0.6 });
      K.serpent([bx + 390 * bs, byy - 140 * bs], [fx + fs * 156, fyy - fs * 128], t, { w: 52 * bs, sag: 16, wig: 3, head: false });
      K.sea(1000, t, { cols: NIGHT_SEA, amp: 50, rows: 7, speed: 5, wl: 200 });
      for (let i = 0; i < 10; i++) { const p = ((t * 1.4 + i / 10) % 1); circle(fx - 140 * fs - p * 500, fyy + 90 * fs + Math.sin(i * 3) * 30 - Math.sin(p * PI) * 60, 16 * (1 - p), rgba(C.cream, 0.8)); }
      K.rain(t, 0.6, 200);
    };
    add({ id: 'S26', at: st, cam: [600, 800], zoom: 0.1, pan: [60, 0], note: 'the tow: Matsya hauls the boat through a storm sea, lightning',
      draw(lt, d, t) { tow(lt, t, 800, 800, 1.25, 190, 930, 0.42); } });
    add({ id: 'S27', at: st + m, cam: [420, 860], zoom: 0.12, tr: 0.35, note: 'closer: sages serene in the golden glow as waves crash past',
      draw(lt, d, t) { tow(lt, t, 1560, 700, 1.9, 420, 960, 0.92); } });
    cue(st, 'waves', { dur: 4.0, gain: 1.3 }); cue(st + 0.5, 'thunder', { gain: 0.8 }); cue(st + m + 0.6, 'thunder', { gain: 0.6 }); cue(st + m, 'conch', { gain: 0.6 });
  }

  // ── 24 · "Then he dove into the deep, defeated the demon," ──────────────
  {
    const st = cut(24), df = Wd('defeated', 24) - st - 0.1;
    add({ id: 'S28', at: st, cam: [540, 800], zoom: 0.1, pan: [0, 80], note: 'Matsya dives, a comet of gold into the abyss',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#2ED3C6', '#1257C8', '#07103A', '#030414']));
        K.shafts(t, 0.25); K.bubbles(t, 30, 3, 0.5, 400);
        const u = eio(seg(lt, 0, d + 0.3)), x = lerp(300, 620, u), y = lerp(100, 980, u);
        for (let i = 0; i < 14; i++) { const p = ((t * 1.6 + i / 14) % 1); circle(x - 260 * p - 60 + Math.sin(i * 5) * 40, y - 520 * p - 100, 20 * (1 - p), rgba(C.cream, 0.7)); glow(x - 200 * p, y - 420 * p, 90 * (1 - p), C.gold, 0.25); }
        K.fish(x, y, 1.3, { t, rot: 1.05, glow: 1, horn: true, swish: 12 });
      } });
    cue(st, 'plop', { gain: 1.2 }); cue(st + 0.1, 'slide', { dur: df }); cue(st + 0.1, 'bubbles', { dur: df });
    add({ id: 'S29', at: st + df, cam: [540, 820], zoom: 0.1, tr: 0.25, note: 'the horn strikes: Hayagriva shatters in a burst of light, the Vedas float free',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A2A7A', '#07103A', '#1A0030', '#030414']));
        K.bubbles(t, 24, 9, 0.35, 200);
        const hit = 0.45, u = ei(seg(lt, 0, hit)), ex = seg(lt, hit, hit + 0.9);
        if (ex < 1) K.demon(600 + Math.sin(t * 40) * 6 * (ex > 0 ? 1 : 0), 900, 0.8 * (1 + ex * 0.25), { t, hold: ex > 0 ? 0 : 0.8, a: 1 - ex, raise: 1.4 });
        if (ex > 0) { for (let i = 0; i < 26; i++) { const an = i * TAU / 26 + rnd(i), r = eo(ex) * (300 + rnd(i * 3) * 600); ctx.save(); ctx.translate(600 + Math.cos(an) * r, 800 + Math.sin(an) * r); ctx.rotate(an + ex * 5); ctx.globalAlpha = 1 - ex; ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(34, 0); ctx.lineTo(-20, 30); ctx.closePath(); ctx.fillStyle = i % 3 ? '#3A0C5E' : C.magenta; ctx.fill(); ctx.restore(); }
          K.rays(600, 800, 1500, t * 4, C.cream, 0.7 * (1 - ex), 16); glow(600, 800, 300 + 900 * eo(ex), C.cream, 1 - ex);
          K.vedas(600, lerp(1020, 840, eo(ex)), lerp(0.8, 1.1, eo(ex)), t, 1); }
        K.fish(lerp(-200, 430, u) + (ex > 0 ? -eo(ex) * 110 : 0), lerp(300, 720, u) + (ex > 0 ? -eo(ex) * 60 : 0), 1.25, { t, rot: 0.5 * (1 - eo(ex)), glow: 1, horn: true, swish: 14 });
      } });
    cue(st + df, 'whoosh'); cue(st + df + 0.45, 'slam', { gain: 1.2 }); cue(st + df + 0.45, 'thunder', { gain: 0.5 }); cue(st + df + 0.6, 'sparkle', { dur: 1.2 });
  }

  // ── 25 · "and carried the Vedas back into the light." ───────────────────
  {
    const st = cut(25);
    add({ id: 'S30', at: st, cam: [540, 760], zoom: 0.1, pan: [0, -60], note: 'Matsya rises toward the surface, the Vedas blazing above him',
      draw(lt, d, t) {
        const u = eio(seg(lt, 0, d + 0.4));
        fillAll(lg(0, 0, 0, H, [mix('#8FE8FF', '#FFF6DC', u), '#2ED3C6', '#1257C8', '#07103A']));
        K.shafts(t, 0.35 + 0.25 * u); K.bubbles(t, 30, 6, 0.6, 320);
        K.rays(540, -100, 1700, t, C.cream, 0.3 + 0.3 * u);
        const y = lerp(1320, 800, u);
        K.fish(520, y, 1.3, { t, rot: -1.25, glow: 1, horn: true, swish: 10 });
        K.vedas(600, y - 500 + Math.sin(t * 2) * 10, 1.0, t, 1);
        for (let i = 0; i < 8; i++) K.sparkle(600 + Math.cos(i + t * 1.4) * 230, y - 500 + Math.sin(i * 1.7 + t) * 160, 26, 0.5 + 0.5 * Math.sin(t * 4 + i));
      } });
    cue(st, 'shimmer', { dur: 2.0 }); cue(st + 0.2, 'bubbles', { dur: 1.6, gain: 0.6 }); cue(st + 1.0, 'conch', { gain: 0.6 });
  }

  // ── 26 · "When the waters settled, a new dawn rose," ────────────────────
  {
    const st = cut(26), dn = Wd('new', 26) - st;
    add({ id: 'S31', at: st, cam: [540, 760], zoom: 0.1, note: 'calm sea, rainbow, the sun climbs; the boat rests by a peak',
      draw(lt, d, t) {
        K.sky('newdawn'); const u = eo(seg(lt, dn - 0.6, d + 0.5));
        ctx.save(); ctx.globalAlpha = 0.55 * u; ctx.lineWidth = 26; ['#FF5A5F', '#FFA63D', '#FFE36B', '#3DDC84', '#5CE1FF', '#7B3FE4'].forEach((c, i) => { ctx.strokeStyle = c; ctx.beginPath(); ctx.arc(540, 1040, 760 - i * 26, PI, TAU); ctx.stroke(); }); ctx.restore();
        K.rays(540, lerp(1040, 700, u), 1500, t, C.cream, 0.4); K.sun(540, lerp(1040, 700, u), 230, t);
        K.clouds(300, t, rgba(C.white, 0.85), 6, 4, 16, 0.75); K.clouds(520, t, rgba('#FFD0E0', 0.7), 2, 3, 10, 0.6);
        K.mountain(880, 1240, 560, 520, '#8A6AD0', '#4A2A98');
        K.sea(960, t, { cols: ['#9BE8F0', '#2A7FD0'], amp: 9, rows: 3, bottom: 1080, speed: 0.6, crest: C.white, crestA: 0.7 });
        K.boat(420, 1040 + K.bob(t, 0, 5), 0.62, t, { rot: Math.sin(t) * 0.015, glow: 0.3 });
        K.sea(1070, t, { cols: ['#5CC8F0', '#1257C8'], amp: 12, rows: 7, speed: 0.6, crest: C.white, crestA: 0.6 });
        for (let i = 0; i < 4; i++) K.bird(160 + i * 110 + lt * 50, 420 + (i % 2) * 50, 0.6, t + i, '#4A2A98');
      } });
    cue(st, 'waves', { dur: 2.6, gain: 0.5 }); cue(st + dn, 'bell'); cue(st + dn, 'sparkle', { dur: 1.4, gain: 0.7 });
  }

  // ── 27 · "and life began again." ────────────────────────────────────────
  {
    const st = cut(27);
    add({ id: 'S32', at: st, cam: [600, 900], zoom: 0.1, note: 'green hills, sprouts burst into flower, the king plants seeds',
      draw(lt, d, t) {
        K.sky('newdawn'); K.sun(800, 460, 190, t); K.clouds(300, t, rgba(C.white, 0.85), 6, 4, 16, 0.7);
        K.hills(900, 240, 1.2, '#5ADC9A'); K.hills(1010, 170, 4.2, '#2AB87A');
        K.deer(820, 880, 0.55, t * 0.3, '#0B6B4F'); K.tree(120, 1010, 0.8, '#0B5B3F', '#19A86A');
        K.hills(1180, 110, 2.5, '#0B8B5F', 0.003);
        K.king(270, 1090, { s: 0.62, kneel: true, lean: 0.35, hands: [[130, -40], [160, -30]], eyes: 'closed', t });
        const fl = [C.pink, C.gold, C.coral, C.cream, C.magenta, C.orange];
        for (let i = 0; i < 6; i++) K.sprout(430 + i * 105, 1140 + (i % 2) * 34, 1.0 + (i % 3) * 0.14, seg(lt, 0.05 + i * 0.13, 0.9 + i * 0.13), fl[i]);
        for (let i = 0; i < 5; i++) K.bird(200 + i * 150 + lt * 70, 360 + (i % 2) * 70 + Math.sin(t + i) * 10, 0.6, t + i, '#0B6B4F');
        K.motes(t, 30, C.cream, 0.8, 17); K.petals(t, 12, 5, 0.8);
      } });
    for (let i = 0; i < 6; i++) cue(st + 0.05 + i * 0.13, 'chime', { gain: 0.6, note: i });
  }

  // ── 28 · "This is Matsya, the first avatar of Vishnu," ──────────────────
  {
    const st = cut(28), fs = Wd('first', 28) - st;
    add({ id: 'S33', at: st, cam: [540, 760], zoom: -0.06, note: 'the icon: Matsya in a great mandala; ten lotuses, the first one lit',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 620, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 620, 590, t, C.gold, 0.8); glow(540, 620, 700, C.magenta, 0.3);
        K.vishnu(540, 730 + Math.sin(t * 1.2) * 8, 0.95, { t });
        K.sea(1170, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 6, crest: C.gold });
        for (let i = 0; i < 10; i++) { const x = 135 + i * 90, on = i === 0 ? eob(seg(lt, fs - 0.15, fs + 0.2)) : 0;
          if (on > 0) { glow(x, 1220, 110 * on, C.gold, 0.8); K.lotus(x, 1240, 0.5 * on + 0.3, 1); } else K.lotus(x, 1236, 0.34, 0.6, '#B79AE8', '#7A5AC8'); }
        K.petals(t, 20, 8, 0.8);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + fs, 'bell', { gain: 1.0 }); cue(st + fs, 'sparkle', { dur: 1.2 });
  }

  // ── 29 · "a reminder that one small act of kindness can save the world." ─
  {
    const st = cut(29), sv = Wd('save', 29) - st - 0.1;
    add({ id: 'S34', at: st, cam: [540, 800], zoom: 0.2, note: 'callback: the tiny fish in cupped hands',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFC65C', '#FF7A4D', '#B0277F', '#3A1680']));
        K.rays(540, 780, 1400, t, C.cream, 0.3); K.motes(t, 30, C.cream, 0.7, 5);
        const fa = t * 1.6, fx = Math.cos(fa) * 120, fy = -14 + Math.sin(fa) * 30;
        glow(540 + fx * 1.25, 800 + fy * 1.25, 170, C.gold, 0.7);
        K.hands(540, 800, 1.25, t, { water: () => K.fish(fx, fy, 0.34, { t, flip: Math.sin(fa) > 0, glow: 0.7, eye: 'happy', swish: 12 }) });
        for (let i = 0; i < 6; i++) { const p = ((t * 0.5 + i / 6) % 1); K.sparkle(540 + Math.sin(i * 2.2) * 260, 760 - p * 420, 22, Math.sin(p * PI), C.cream); }
      } });
    cue(st + 0.2, 'sparkle', { dur: 1.6, gain: 0.6 });
    add({ id: 'S35', at: st + sv, cam: [540, 760], zoom: 0.06, tr: 0.6, note: 'the hands now cradle the whole world; Matsya circles it; end title',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 31, 130, 1700);
        const end = eo(seg(lt, Le(29) - (st + sv) + 0.15, Le(29) - (st + sv) + 1.0));
        K.rays(540, 720, 1500, t, C.paleGold, 0.35); K.mandala(540, 720, 470, t, C.gold, 0.4, 3);
        K.hands(540, 1130, 1.15, t);
        const an = t * 1.3, ox = Math.cos(an) * 360, oy = Math.sin(an) * 90, front = Math.sin(an) > 0;
        const f = () => { for (let i = 1; i < 12; i++) { const a2 = an - i * 0.07; circle(540 + Math.cos(a2) * 360, 720 + Math.sin(a2) * 90, 9 * (1 - i / 12), rgba(C.gold, 0.8 * (1 - i / 12))); } K.fish(540 + ox, 720 + oy, 0.36, { t, flip: Math.sin(an) > 0, glow: 0.9, horn: true, swish: 14 }); };
        if (!front) f();
        earth(540, 720 + Math.sin(t * 1.2) * 8, 235, t);
        if (front) f();
        title(end, 190);
      } });
    cue(st + sv, 'conch', { gain: 0.9 }); cue(st + sv + 0.2, 'shimmer', { dur: 2.5 }); cue(Le(29) + 0.2, 'bell', { gain: 1.1 }); cue(Le(29) + 0.25, 'sparkle', { dur: 1.5 });
  }

  return { shots: S, cues: CUES };
}
