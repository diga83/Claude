// KURMA AVATAR: the shot list. One shot (or more) per narration line; everything lands on the voice's clock.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, bigText, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as Q from './core/kit3.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.25);
  const MILK = ['#FFF6FA', '#6A4FE0'];
  const milk = (y, t, o = {}) => K.sea(y, t, { cols: MILK, amp: 18, rows: 8, crest: '#FFD0EC', crestA: 0.95, speed: 1.4, gamma: 1.25, ...o });

  const title = (a, y = 250) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    bigText('KURMA', 540, y, 200, { ls: 12, sc: lerp(0.9, 1, eo(a)) });
    bigText('THE SECOND AVATAR OF VISHNU', 540, y + 140, 42, { ls: 7, fill: C.cream });
    line([[200, y + 192], [470, y + 192]], rgba(C.gold, 0.9), 4); line([[610, y + 192], [880, y + 192]], rgba(C.gold, 0.9), 4); K.lotus(540, y + 208, 0.34, 1);
    ctx.restore();
  };
  const lotusRow = (lit, on, y = 1236) => { for (let i = 0; i < 10; i++) { const x = 135 + i * 90; if (i === lit && on > 0) { glow(x, y - 16, 110 * on, C.gold, 0.8); K.lotus(x, y + 4, 0.5 * on + 0.3, 1); } else K.lotus(x, y, 0.34, 0.6, '#B79AE8', '#7A5AC8'); } };
  const earth = (x, y, r, t) => {
    glow(x, y, r * 1.9, C.cyan, 0.5);
    circle(x, y, r, rg(x - r * 0.35, y - r * 0.35, r * 0.1, r * 1.15, ['#7FE8FF', '#2A8FE8', '#0A2A7A']));
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); const dx = (t * 26) % (r * 4);
    for (let k = -1; k <= 1; k++) for (const [bx, by, br, bq] of [[-0.5, -0.3, 0.42, 0.3], [-0.2, 0.3, 0.3, 0.44], [0.6, -0.1, 0.36, 0.5], [0.9, 0.5, 0.26, 0.2], [1.5, -0.4, 0.4, 0.26], [1.9, 0.25, 0.3, 0.4]])
      ell(x + bx * r + k * r * 4 - dx + r, y + by * r, br * r, bq * r, lg(0, y - r, 0, y + r, [C.leaf, C.emerald, C.forest]), bx);
    ctx.fillStyle = rg(x + r * 0.4, y + r * 0.4, r * 0.3, r * 1.5, [rgba('#05021A', 0), rgba('#05021A', 0.55)]); ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
    ctx.strokeStyle = rgba(C.cream, 0.7); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, r + 4, 0, TAU); ctx.stroke();
  };
  const svarga = (t, bright = 1) => {   // the heaven of the gods: gold spires on banks of cloud
    fillAll(lg(0, 0, 0, H, ['#FFC65C', '#FF6FA0', '#9A4AE0', '#4A2AC8']));
    K.rays(540, 620, 1700, t, C.cream, 0.28 * bright, 16);
    R.towers(1010, { col: '#F2B04D', lit: C.cream, n: 8, seed: 4, s: 0.8 });
    K.clouds(1040, t, rgba('#FFD9EC', 0.95), 3, 6, 14, 1.0); K.clouds(340, t, rgba('#FFE9C8', 0.45), 8, 4, 10, 0.7);
    K.clouds(1260, t, '#FFE4F2', 6, 7, 20, 1.2);
  };
  /** the churning, seen from the surface. o: sink px, mood 0..1 (alarm), teams, eyes */
  const churn = (t, o = {}) => {
    const sink = o.sink || 0, ph = Math.sin(t * 2.6) * (o.power ?? 1), dx = ph * 46, spin = -Math.cos(t * 2.6) * 1.7 * (o.power ?? 1), cy = 650 + sink;
    K.sky('cosmic'); K.stars(t, 1, 12, 110, 1000); K.mandala(540, 560, 620, t, C.gold, 0.22, 4);
    if (o.tint) fillAll(o.tint);
    Q.mandara(540, 290 + sink, 1700, 450, spin);
    K.serpent([20 + dx, 840], [404, cy + 30], t, { w: 38, sag: 26, wig: 5, head: false });
    Q.coils(540, cy, 142, dx * 3, 44);
    K.serpent([684, cy + 104], [1050 + dx, 826], t, { w: 38, sag: 26, wig: 5 });
    for (const sx of [130, 950]) { for (let k = 0; k < 5; k++) circle(sx + (k - 2) * 88, 1000 + Math.sin(k * 2.1) * 16, 96, '#FFF1F6'); }
    if (o.teams !== false) {
      for (let i = 0; i < 3; i++) { const px = 70 + i * 112 + dx, ln = -0.28 - ph * 0.22;
        R.hero(px, 880, { look: Q.DEVA[i], s: 0.42, lean: ln, hands: [[60, -130], [130, -120]], eyes: o.eyes || 'open', t: t + i, lookX: 3 }); }
      for (let i = 0; i < 3; i++) { const px = 1010 - i * 112 + dx, ln = -0.28 + ph * 0.22;
        Q.asura(px, 880, { look: Q.ASURA[i], s: 0.42, face: -1, lean: ln, hands: [[60, -130], [130, -120]], eyes: o.eyes || 'open', t: t + i, lookX: 3 }); }
    }
    milk(1010, t, { amp: 20 + (o.power ?? 1) * 10 });
    for (let i = 0; i < 16; i++) { const p = ((t * 0.9 + i / 16) % 1); circle(540 + Math.cos(i * 2.4) * (180 + p * 190), 1030 - Math.sin(p * PI) * (90 + (i % 3) * 50) * (o.power ?? 1), 26 * (1 - p) + 6, rgba(C.white, 0.9 * (1 - p * 0.6))); }
  };
  /** below the surface: the mountain's foot on Kurma's shell. ky = tortoise y, base = mountain foot y */
  const under = (t, ky, base, o = {}) => {
    fillAll(lg(0, 0, 0, H, ['#EAF8FF', '#8AD0F8', '#3A7FE0', '#12268A']));
    K.shafts(t, 0.3); K.bubbles(t, 30, 5, 0.6, 200);
    for (let i = 0; i < 5; i++) { ctx.strokeStyle = rgba(C.white, 0.25); ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(540, lerp(300, base, i / 5), 330 + i * 26, 60, 0, PI * (0.1 + ((t * 0.5 + i * 0.3) % 1)), PI * (0.7 + ((t * 0.5 + i * 0.3) % 1))); ctx.stroke(); }
    Q.mandara(540, -700, base, 520, t * 2.2 * (o.spin ?? 1));
    Q.kurma(o.kx ?? 500, ky, o.ks || 1.05, { t, glow: o.glow ?? 0.7, eyes: o.eyes, swim: o.swim ?? 0.25, rot: o.rot || 0 });
  };

  // ── 0 · "Long ago, the gods lost their strength to a sage's curse," ─────
  {
    const lo = Wd('lost', 0);
    add({ id: 'S01', at: 0, cam: [540, 820], zoom: 0.1, note: 'heaven on the clouds; the sage Durvasa hurls his curse and the gods dim',
      draw(lt, d, t) {
        const c = seg(lt, lo - 0.1, lo + 1.0); svarga(t, 1 - c * 0.7);
        const fl = Math.max(0, 1 - Math.abs(lt - lo) * 4);
        glow(250, 600, 300, C.red, 0.3 + 0.5 * fl);
        K.sage(250, 700 + Math.sin(t * 1.4) * 8, 1.0, { halo: 1, c1: '#E0501A', c2: '#8A1F1A' });
        if (fl > 0) { const pts = [[320, 640], [420, 700], [400, 760], [520, 800], [500, 850], [610, 880]]; ctx.save(); ctx.globalAlpha = fl; ctx.globalCompositeOperation = 'lighter'; line(pts, rgba(C.magenta, 0.6), 44); line(pts, rgba(C.pink, 0.9), 18); line(pts, C.white, 7); ctx.restore(); }
        for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = 1 - 0.25 * c; R.hero(540 + i * 150, 1010 + (i % 2) * 24, { look: Q.DEVA[i], s: 0.52, lean: 0.25 * c * (i % 2 ? -1 : 1), eyes: c > 0.3 ? 'sad' : 'open', hands: c > 0.3 ? [[-60, 10], [60, 10]] : [[-90, -40], [90, -40]], t }); glow(540 + i * 150, 880, 190 * (1 - c), C.gold, 0.5 * (1 - c)); ctx.restore(); }
        fillAll(rgba('#3A2A6A', 0.3 * c));
        K.clouds(1300, t, '#FFE4F2', 6, 7, 20, 1.2);
        title(eo(seg(lt, 0.5, 1.5)) * (1 - seg(lt, d - 0.5, d)), 240);
      } });
    cue(0.1, 'conch', { gain: 0.8 }); cue(0.6, 'bell'); cue(lo, 'thunder', { gain: 0.8 }); cue(lo + 0.3, 'rumble', { dur: 1.6, gain: 0.6 });
  }

  // ── 1 · "and the demons began to win every battle." ─────────────────────
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [600, 860], zoom: 0.1, note: 'crimson sky: the demons advance, the weakened gods fall back',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#1A0030', '#7A0A3A', '#E0401A', '#3A0A30']));
        K.clouds(260, t, rgba('#1A0420', 0.85), 2, 5, 60, 1.1); K.motes(t, 40, C.orange, 0.8, 4);
        R.towers(1060, { col: '#2A0418', lit: C.orange, n: 7, seed: 6, s: 0.6 });
        K.clouds(1150, t, '#5A1040', 3, 6, 30, 1.0);
        const adv = lerp(120, 0, eo(seg(lt, 0, d)));
        for (let i = 0; i < 3; i++) Q.asura(560 + i * 170 + adv, 960 + (i % 2) * 50 + Math.abs(Math.sin(t * 6 + i)) * -10, { look: Q.ASURA[i], s: 0.62 + (i === 1 ? 0.14 : 0), face: -1, walk: true, t: t + i, hands: [[-150, -300], [140, -260]] });
        for (let i = 0; i < 2; i++) R.hero(150 + i * 130 - (120 - adv) * 0.6, 1100 + i * 30, { look: Q.DEVA[i + 1], s: 0.44, kneel: true, lean: -0.3, eyes: 'sad', hands: [[-60, -200], [60, -190]], t });
        K.clouds(1330, t, '#3A0A30', 6, 7, 40, 1.2); K.vignette(0.5, '#0A0010');
      } });
    cue(st, 'rumble', { dur: 2.4 }); cue(st + 0.3, 'growl', { gain: 0.8 }); cue(st + 1.0, 'slam', { gain: 0.5 });
  }

  // ── 2 · "Desperate, they begged Vishnu for help, and he shared a secret." ─
  {
    const st = cut(2), sc = Wd('secret', 2) - st;
    add({ id: 'S03', at: st, cam: [540, 760], zoom: 0.1, note: 'the gods kneel before Vishnu on his lotus',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 560, 1600, t, C.paleGold, 0.42, 18); K.mandala(540, 560, lerp(300, 560, eo(seg(lt, 0, 1.2))), t, C.gold, 0.75); glow(540, 560, 700, C.magenta, 0.35);
        K.vishnu(540, 780, 0.86, { t, tail: 0 }); K.lotus(540, 900, 2.0, 1);
        milk(930, t, { rows: 6 });
        for (let i = 0; i < 3; i++) R.hero(240 + i * 300, 1150 + (i === 1 ? 30 : 0), { look: Q.DEVA[i], s: 0.42, kneel: true, lean: 0, hands: [[-18, -128], [18, -128]], pray: true, eyes: 'closed', t });
        const g = seg(lt, sc - 0.2, sc + 0.4); for (let i = 0; i < 10; i++) K.sparkle(540 + Math.cos(i * 0.63 + t) * 330, 560 + Math.sin(i * 0.63 + t) * 330, 30, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
      } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + sc, 'bell', { gain: 0.9 }); cue(st + sc, 'sparkle', { dur: 1.2 });
  }

  // ── 3 · "Churn the ocean of milk, and the nectar of immortality will rise." ─
  {
    const st = cut(3), nc = Wd('nectar', 3) - st;
    add({ id: 'S04', at: st, cam: [540, 800], zoom: 0.12, note: 'a vision: the white ocean swirls, and a pot of light rises from its heart',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 9, 110, 900); K.mandala(540, 640, 600, t, C.cream, 0.3, 4);
        milk(760, t, { rows: 10, amp: 16 });
        ctx.save(); ctx.translate(540, 1060); ctx.scale(1, 0.34); ctx.lineCap = 'round';
        for (let i = 0; i < 9; i++) { const r = 110 + i * 62, a0 = -t * (2.6 - i * 0.2) + i * 0.8; ctx.strokeStyle = rgba(i % 2 ? '#8FB8FF' : C.white, 0.85 - i * 0.06); ctx.lineWidth = 26 - i * 1.6; ctx.beginPath(); ctx.arc(0, 0, r, a0, a0 + 2.3); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r, a0 + PI, a0 + PI + 2.3); ctx.stroke(); }
        ctx.restore();
        const g = eo(seg(lt, nc - 0.3, nc + 1.1));
        if (g > 0) { ctx.save(); ctx.globalAlpha = clamp(g * 2); Q.kalasha(540, lerp(1120, 740, g) + Math.sin(t * 2) * 8, 1.5, t, g); ctx.restore(); }
        K.motes(t, 30, C.cream, 0.8, 3);
      } });
    cue(st, 'waves', { dur: 3.6, gain: 0.8 }); cue(st + nc - 0.2, 'shimmer', { dur: 2.2 }); cue(st + nc + 0.3, 'bell', { gain: 0.8 });
  }

  // ── 4 · "The task was so huge that gods and demons had to work together." ─
  {
    const st = cut(4), tg = Wd('together', 4) - st;
    add({ id: 'S05', at: st, cam: [540, 880], zoom: 0.1, note: 'gold meets crimson: a god and a demon clasp hands',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9A6B', '#E0508A', '#5A1F9A']));
        ctx.beginPath(); ctx.moveTo(620, -400); ctx.lineTo(1500, -400); ctx.lineTo(1500, 2400); ctx.lineTo(460, 2400); ctx.closePath(); ctx.fillStyle = lg(0, 0, 0, H, ['#1A0030', '#7A0A3A', '#C0302A', '#2A0430']); ctx.fill();
        K.rays(540, 820, 1500, t, C.cream, 0.3);
        const u = eio(seg(lt, 0.2, tg));
        for (let i = 0; i < 2; i++) { R.hero(110 + i * 130, 1080 - i * 20, { look: Q.DEVA[i + 1], s: 0.42, t, lookX: 3 }); Q.asura(970 - i * 130, 1080 - i * 20, { look: Q.ASURA[i + 1], s: 0.42, face: -1, t, lookX: 3 }); }
        R.hero(lerp(250, 360, u), 1000, { look: Q.DEVA[0], s: 0.82, hands: [[-90, -40], [lerp(90, 212, u), lerp(-40, -120, u)]], eyes: 'open', lookX: 4, t });
        Q.asura(lerp(830, 720, u), 1000, { look: Q.ASURA[0], s: 0.82, face: -1, hands: [[-90, -40], [lerp(90, 212, u), lerp(-40, -120, u)]], lookX: 4, t });
        const g = seg(lt, tg - 0.1, tg + 0.4); glow(540, 900, 260 * g, C.cream, g); K.sparkle(540, 900, 110 * g * (1 - seg(lt, tg + 0.6, tg + 1.4)), g, C.white);
        for (let i = 0; i < 8; i++) K.sparkle(540 + Math.cos(i * 0.8 + t) * 190 * g, 900 + Math.sin(i * 0.8 + t) * 190 * g, 26, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
      } });
    cue(st + tg, 'bell', { gain: 1.0 }); cue(st + tg, 'sparkle', { dur: 1.2 }); cue(st + 0.3, 'tock'); cue(st + 0.8, 'tock');
  }

  // ── 5 · "They used Mount Mandara as a churning rod," ────────────────────
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 760], zoom: 0.08, note: 'Mount Mandara is lowered into the white sea with a mighty splash',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 12, 110, 1000); K.mandala(540, 560, 620, t, C.gold, 0.25, 4);
        const u = eo(seg(lt, 0, 1.3)), top = lerp(-1100, 290, u);
        Q.mandara(540, top, top + 1400, 450, 0);
        for (const sx of [130, 950]) for (let k = 0; k < 5; k++) circle(sx + (k - 2) * 88, 1000 + Math.sin(k * 2.1) * 16, 96, '#FFF1F6');
        milk(1010, t);
        K.splash(380, 1010, 520, seg(lt, 1.0, 2.0), C.white); K.splash(700, 1010, 520, seg(lt, 1.05, 2.05), C.white); K.splash(540, 1000, 700, seg(lt, 1.1, 2.2), '#DFF0FF');
      } });
    cue(st, 'rumble', { dur: 1.6 }); cue(st + 1.1, 'slam', { gain: 1.0 }); cue(st + 1.1, 'waves', { dur: 2.0, gain: 1.2 });
  }

  // ── 6 · "and the serpent Vasuki as the rope." ───────────────────────────
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 700], zoom: 0.14, note: 'Vasuki winds three coils around the mountain',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 12, 110, 1000); glow(540, 700, 700, C.emerald, 0.3);
        Q.mandara(540, 0, 1700, 520, 0);
        const p = eo(seg(lt, 0.1, 1.5));
        ctx.save(); ctx.beginPath(); ctx.rect(-200, 0, 200 + 1300 * p, H); ctx.clip();
        K.serpent([-80, 760], [352, 640], t, { w: 62, sag: 30, wig: 8, head: false });
        Q.coils(540, 590, 190, t * 60, 62);
        ctx.restore();
        if (p > 0.92) K.serpent([722, 730], [1010, 600 + Math.sin(t * 2) * 12], t, { w: 62, sag: -20, wig: 10, draw: seg(p, 0.92, 1) });
        milk(1150, t, { rows: 6 });
      } });
    cue(st + 0.1, 'hiss', { dur: 1.4 }); cue(st + 0.1, 'slide', { dur: 1.4 }); cue(st + 1.5, 'pop');
  }

  // ── 7 · "with the gods at its tail, and the demons at its head." ────────
  {
    const st = cut(7), dm = Wd('demons', 7) - st;
    add({ id: 'S08', at: st, cam: [540, 800], zoom: 0.08, note: 'the great tug: gods haul the tail, demons the head; the mountain turns',
      draw(lt, d, t) {
        churn(t);
        const a = Math.sin(clamp(seg(lt, 0.2, dm - 0.2)) * PI), b = Math.sin(clamp(seg(lt, dm - 0.1, d)) * PI);
        glow(200, 800, 330, C.gold, 0.55 * a); glow(880, 800, 330, C.red, 0.55 * b);
      } });
    cue(st, 'waves', { dur: 3.2, gain: 1.0 }); for (let i = 0; i < 4; i++) cue(st + 0.2 + i * 0.75, 'whoosh', { gain: 0.6 });
  }

  // ── 8 · "But as they pulled, the mountain began to sink." ───────────────
  {
    const st = cut(8), sk = Wd('mountain', 8) - st;
    add({ id: 'S09', at: st, cam: [540, 860], zoom: 0.1, note: 'no floor beneath it: the mountain slides down into the deep',
      draw(lt, d, t) {
        const u = eio(seg(lt, sk - 0.3, d + 0.3));
        churn(t, { sink: u * 420, eyes: u > 0.15 ? 'wide' : 'open', power: 1 - u * 0.6, tint: rgba('#7A0A3A', 0.3 * u) });
        K.bubbles(t, 18, 8, 0.8 * u, 400);
        K.splash(540, 1010, 420, ((lt - sk) * 0.8 % 1 + 1) % 1 * (u > 0 ? 1 : 0), C.white);
      } });
    cue(st + sk - 0.2, 'rumble', { dur: 2.4, gain: 1.2 }); cue(st + sk, 'bubbles', { dur: 2.0, gain: 1.2 }); cue(st + sk, 'alarm', { dur: 1.6, gain: 0.6 });
  }

  // ── 9 · "So Vishnu became Kurma, a giant tortoise," ─────────────────────
  {
    const st = cut(9), ku = Wd('Kurma', 9) - st;
    add({ id: 'S10', at: st, cam: [540, 760], zoom: 0.1, note: 'in a burst of light Vishnu becomes KURMA, the great tortoise',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 700, 1600, t * 2, C.paleGold, 0.45, 18); K.mandala(540, 700, 580, t, C.gold, 0.75); glow(540, 700, 700, C.emerald, 0.3);
        const m = seg(lt, ku - 0.25, ku + 0.2);
        if (m < 1) { ctx.save(); ctx.globalAlpha = 1 - m; K.vishnu(540, 860, 0.9, { t, tail: 0 }); K.lotus(540, 980, 2.0, 1); ctx.restore(); }
        if (m > 0) { ctx.save(); ctx.globalAlpha = m; Q.kurma(490, 860 + Math.sin(t * 1.6) * 12, lerp(0.6, 1.12, eob(m)), { t, glow: 1, swim: 0.5 }); ctx.restore(); }
        glow(540, 760, 900, C.cream, Math.sin(clamp(seg(lt, ku - 0.3, ku + 0.5)) * PI) * 0.9);
        K.petals(t, 20, 3, 0.9);
      } });
    cue(st + ku - 0.2, 'conch', { gain: 1.1 }); cue(st + ku, 'slam', { gain: 0.5 }); cue(st + ku, 'sparkle', { dur: 1.6 }); cue(st + 0.1, 'shimmer', { dur: ku });
  }

  // ── 10 · "and dove beneath the waves to carry the mountain on his back." ─
  {
    const st = cut(10), ca = Wd('carry', 10) - st;
    add({ id: 'S11', at: st, cam: [540, 900], zoom: 0.08, note: 'underwater: Kurma glides beneath the falling mountain and takes its weight',
      draw(lt, d, t) {
        const u = eio(seg(lt, 0, ca)), land = eob(seg(lt, ca - 0.1, ca + 0.5)), ky = lerp(700, 1140, u), base = lerp(lerp(560, 860, seg(lt, 0, ca)), ky - 205, clamp(land));
        under(t, ky, base, { kx: lerp(-420, 500, u), rot: lerp(0.5, 0, u), swim: lerp(1, 0.2, u), spin: lerp(0.2, 1, clamp(land)), glow: 0.9 });
        const g = seg(lt, ca, ca + 0.3) * (1 - seg(lt, ca + 0.5, ca + 1.1)); glow(540, 930, 500 * g, C.cream, g); for (let i = 0; i < 12; i++) K.sparkle(540 + Math.cos(i * 0.52) * 330 * g, 940 + Math.sin(i * 0.52) * 90 * g, 36, g, C.cream);
      } });
    cue(st, 'plop', { gain: 1.2 }); cue(st + 0.1, 'bubbles', { dur: ca }); cue(st + 0.1, 'slide', { dur: ca }); cue(st + ca, 'thud', { gain: 1.2 }); cue(st + ca, 'bell', { gain: 0.9 });
  }

  // ── 11 · "Steady at last, the mountain spun, and the ocean foamed." ─────
  const stack = (t, o = {}) => {   // the whole machine in cross-section
    K.sky('cosmic'); K.stars(t, 1, 12, 110, 800); K.mandala(540, 480, 560, t, C.gold, 0.22, 4);
    const ph = Math.sin(t * 2.6), dx = ph * 34, spin = -Math.cos(t * 2.6) * 1.7;
    for (const sx of [110, 970]) for (let k = 0; k < 5; k++) circle(sx + (k - 2) * 70, 800 + Math.sin(k * 2.1) * 12, 76, '#FFF1F6');
    for (let i = 0; i < 3; i++) { R.hero(70 + i * 76 + dx, 730, { look: Q.DEVA[i], s: 0.25, lean: -0.28 - ph * 0.22, hands: [[60, -130], [130, -120]], t: t + i });
      Q.asura(1010 - i * 76 + dx, 730, { look: Q.ASURA[i], s: 0.25, face: -1, lean: -0.28 + ph * 0.22, hands: [[60, -130], [130, -120]], t: t + i }); }
    Q.mandara(540, 190, 1076, 300, spin);
    K.serpent([30 + dx, 700], [452, 560], t, { w: 26, sag: 20, wig: 4, head: false }); Q.coils(540, 540, 92, dx * 3, 30); K.serpent([630, 612], [1040 + dx, 690], t, { w: 26, sag: 20, wig: 4 });
    ctx.fillStyle = lg(0, 820, 0, 1920, [rgba('#EAF8FF', 0.55), rgba('#6AB0F0', 0.62), rgba('#2A4FC8', 0.8), rgba('#12268A', 0.95)]); ctx.fillRect(-400, 826, W + 800, 1600);
    K.bubbles(t, 22, 5, 0.6, 200);
    Q.kurma(520, 1200, 0.64, { t, glow: o.glow ?? 0.8, eyes: o.eyes, swim: 0.2 });
    ctx.beginPath(); ctx.moveTo(-400, 840); for (let x = -400; x <= W + 400; x += 14) ctx.lineTo(x, 826 - 16 * Math.abs(Math.sin((x + t * 90) / 150 * PI))); ctx.lineTo(W + 400, 880); ctx.lineTo(-400, 880); ctx.closePath(); ctx.fillStyle = rgba(C.white, 0.95); ctx.fill();
    for (let i = 0; i < 16; i++) { const p = ((t * 0.9 + i / 16) % 1); circle(540 + Math.cos(i * 2.4) * (150 + p * 190), 830 - Math.sin(p * PI) * (70 + (i % 3) * 50), 22 * (1 - p) + 5, rgba(C.white, 0.9 * (1 - p * 0.6))); }
  };
  {
    const st = cut(11);
    add({ id: 'S12', at: st, cam: [540, 760], zoom: 0.06, note: 'the whole machine: gods and demons above, the turning mountain, Kurma steady below',
      draw(lt, d, t) { stack(t); } });
    cue(st, 'waves', { dur: 3.6, gain: 1.1 }); for (let i = 0; i < 5; i++) cue(st + 0.2 + i * 0.7, 'whoosh', { gain: 0.6 }); cue(st + 0.3, 'bubbles', { dur: 3.0, gain: 0.6 });
  }

  // ── 12 · "First came a deadly poison, dark enough to end the world," ────
  {
    const st = cut(12), po = Wd('poison', 12) - st;
    add({ id: 'S13', at: st, cam: [540, 800], zoom: 0.1, note: 'HALAHALA: black-violet fumes boil out of the sea; everyone recoils',
      draw(lt, d, t) {
        const u = eo(seg(lt, 0.1, po + 0.6));
        churn(t, { power: 1 - u * 0.8, eyes: u > 0.3 ? 'wide' : 'open', tint: rgba('#0A1A0A', 0.5 * u) });
        Q.poison(540, 1080, 1.15, t, u);
        fillAll(rgba('#2A0A4A', 0.25 * u)); K.vignette(0.5 * u, '#05000F');
      } });
    cue(st + 0.1, 'rumble', { dur: 3.2, gain: 1.2 }); cue(st + 0.2, 'hiss', { dur: 2.6, gain: 1.4 }); cue(st + po, 'growl', { gain: 0.8 }); cue(st + po, 'alarm', { dur: 1.6, gain: 0.5 });
  }

  // ── 13 · "but Shiva drank it, and his throat turned blue forever." ──────
  {
    const st = cut(13), dk = Wd('drank', 13) - st, th = Wd('throat', 13) - st;
    add({ id: 'S14', at: st, cam: [540, 760], zoom: 0.12, note: 'Shiva gathers the poison in his palm and drinks; his throat glows blue',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0A4A', '#2A3FB8', '#7AC8F0', '#EAF8FF']));
        K.stars(t, 0.9, 7, 90, 800); K.mandala(540, 640, 600, t, C.cyan, 0.4, 4);
        K.mountain(180, 1500, 760, 640, '#EAF8FF', '#7A9AE0'); K.mountain(920, 1500, 800, 700, '#FFFFFF', '#8AA8E8');
        const dr = seg(lt, 0.1, dk + 0.1) * (1 - 0.8 * eio(seg(lt, dk + 0.35, dk + 0.95))), bl = eo(seg(lt, th - 0.2, th + 0.7)), done = lt > dk + 0.3;
        if (!done) { ctx.save(); ctx.globalAlpha = 1 - seg(lt, dk - 0.5, dk + 0.2); Q.poison(-40, 1500, 0.7, t, 1); ctx.restore(); }
        Q.shiva(560, 960, 0.84, { t, drink: dr, blue: bl, empty: done });
        milk(1330, t, { rows: 5 });
        for (let i = 0; i < 8; i++) K.sparkle(560 + Math.cos(i * 0.8 + t) * 200 * bl, 870 + Math.sin(i * 0.8 + t) * 130 * bl, 26, bl * (0.5 + 0.5 * Math.sin(t * 5 + i)), C.cyan);
      } });
    cue(st, 'conch', { gain: 0.8 }); cue(st + dk, 'gulp', { gain: 1.2 }); cue(st + th, 'shimmer', { dur: 1.6 }); cue(st + th, 'bell', { gain: 0.9 });
  }

  // ── 14 · "Then the treasures rose. A wish granting cow, a white elephant, a tree of wishes, the shining moon," ─
  {
    const st = cut(14);
    const tre = (id, at, sky, note, drawIt, snd) => {
      add({ id, at, cam: [540, 800], zoom: 0.12, tr: 0.3, note,
        draw(lt, d, t) {
          fillAll(lg(0, 0, 0, H, sky)); K.stars(t, 0.8, 4, 70, 700);
          const r = eob(seg(lt, 0, 0.6));
          K.rays(540, 760, 1400, t, C.cream, 0.4); K.mandala(540, 760, 480, t, C.cream, 0.5, 3);
          drawIt(lerp(1300, 880, clamp(r)) + Math.sin(t * 2) * 8, t, r);
          milk(1040, t, { rows: 7 });
          K.splash(540, 1040, 420, seg(lt, 0, 0.9), C.white);
          for (let i = 0; i < 8; i++) K.sparkle(540 + Math.cos(i * 0.8 + t) * 380, 740 + Math.sin(i * 0.8 + t) * 300, 28, 0.5 + 0.5 * Math.sin(t * 5 + i));
        } });
      cue(at, 'plop', { gain: 0.9 }); cue(at + 0.1, 'chime', { note: snd }); cue(at + 0.15, 'sparkle', { dur: 0.9, gain: 0.6 });
    };
    add({ id: 'S15', at: st, cam: [540, 860], zoom: 0.1, note: 'the sea clears and begins to glow: lights rise from the deep',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 12, 110, 900); K.mandala(540, 600, 600, t, C.gold, 0.3, 4);
        Q.mandara(540, 290, 1700, 450, -Math.cos(t * 2.6) * 1.7); Q.coils(540, 650, 142, t * 80, 44);
        for (let i = 0; i < 9; i++) { const p = ((t * 0.5 + i / 9) % 1), x = 120 + i * 105, y = 1040 - p * 620; glow(x, y, 110, [C.gold, C.pink, C.cyan, C.leaf][i % 4], 1 - p); K.sparkle(x, y, 30, 1 - p, C.white); }
        milk(1010, t);
      } });
    cue(st, 'shimmer', { dur: 1.6 });
    tre('S16', st + Wd('wish', 14) - st - 0.2, ['#FFE9A8', '#FF9AC0', '#C850A8', '#5A2FD0'], 'Kamadhenu, the wish-granting cow', (y, t) => Q.cow(520, y - 30, 1.25, t), 1);
    tre('S17', st + Wd('white', 14) - st - 0.2, ['#1B0F5C', '#3A5FD0', '#7AC8F0', '#DFF6FF'], 'Airavata, the white elephant', (y, t) => { K.elephant(480, y - 40, 1.45, t * 0.3, '#D9D2FF'); }, 2);
    tre('S18', st + Wd('tree', 14) - st - 0.2, ['#0B3B5F', '#0B8B6F', '#5ADC9A', '#FFF1A8'], 'Kalpavriksha, the tree of wishes', (y, t) => Q.wishTree(540, y + 190, 1.25, t), 4);
    tre('S19', st + Wd('shining', 14) - st - 0.2, ['#060321', '#1B0F5C', '#4A2AA8', '#8A5AE0'], 'Chandra, the shining moon', (y, t) => Q.crescent(540, y - 120, 230), 5);
  }

  // ── 15 · "and Lakshmi, goddess of fortune, seated on a lotus." ──────────
  {
    const st = L(15) - 0.15;
    add({ id: 'S20', at: st, cam: [540, 800], zoom: 0.12, note: 'LAKSHMI rises on a great lotus in a rain of gold',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFB03D', '#FF5A8A', '#B0185A']));
        K.rays(540, 700, 1600, t, C.cream, 0.5, 18); K.mandala(540, 700, 580, t, C.cream, 0.6, 4);
        const r = eo(seg(lt, 0, 1.2)), y = lerp(1300, 900, r) + Math.sin(t * 1.6) * 8;
        Q.coins(t, 26, 3, 0.95);
        glow(540, y - 200, 460, C.gold, 0.6);
        R.sita(540, y - 60, { s: 1.0, sit: true, sari: ['#FF6A6A', '#E0183A', '#8A0A3A'], hands: [[-190, -230], [190, -230]], eyes: 'closed', t, holding: () => { K.lotus(-190, -246, 0.5, 1); K.lotus(190, -246, 0.5, 1); } });
        K.lotus(540, y + 150, 3.0, 1);
        milk(1090, t, { rows: 7 });
        K.petals(t, 20, 6, 0.9);
      } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + 0.2, 'shimmer', { dur: 2.6 }); cue(st + 0.5, 'bell', { gain: 0.9 });
  }

  // ── 16 · "At last, the healer Dhanvantari appeared, holding the pot of nectar." ─
  {
    const st = cut(16), pt = Wd('pot', 16) - st;
    add({ id: 'S21', at: st, cam: [540, 760], zoom: 0.12, note: 'Dhanvantari stands from the waves, lifting the glowing pot of amrita',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0B3B6F', '#0FB5A6', '#7AE0D0', '#FFF1B8']));
        K.stars(t, 0.6, 3, 60, 500); K.mandala(540, 620, 600, t, C.gold, 0.5, 4);
        const r = eo(seg(lt, 0, 1.2)), y = lerp(1500, 1040, r), g = seg(lt, pt - 0.3, pt + 0.5);
        K.rays(540, y - 560, 1500, t, C.cream, 0.3 + 0.4 * g, 16);
        R.hero(540, y, { look: { skin: ['#1E4FD0', '#3F7BFF', '#8FB8FF'], dhoti: ['#FFE36B', '#FFC83D', '#E88A1F'], sash: ['#FF6FB5', '#E0218A'], crown: 'prince' }, s: 1.0, hands: [[-92, -420], [92, -420]], eyes: 'closed', t });
        Q.kalasha(540, y - 480, 1.25, t, 0.5 + 0.5 * g);
        milk(1090, t, { rows: 7 });
      } });
    cue(st + 0.2, 'waves', { dur: 2.0, gain: 0.6 }); cue(st + pt - 0.2, 'shimmer', { dur: 2.0 }); cue(st + pt, 'bell', { gain: 1.0 });
  }

  // ── 17 · "The demons snatched it," ──────────────────────────────────────
  {
    const st = cut(17);
    add({ id: 'S22', at: st, cam: [560, 860], zoom: 0.1, tr: 0.2, note: 'a blur of horns: the demons run off with the pot',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#1A0030', '#7A0A3A', '#E0401A', '#3A0A30']));
        ctx.strokeStyle = rgba(C.cream, 0.5); ctx.lineWidth = 10; ctx.lineCap = 'round'; for (let i = 0; i < 16; i++) { const y = 300 + i * 60, x = ((rnd(i) * 1400 - t * 1900) % 1500 + 1500) % 1500 - 200; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 220, y); ctx.stroke(); }
        const x = lerp(260, 660, seg(lt, 0, d));
        Q.asura(x - 210, 1040, { look: Q.ASURA[1], s: 0.56, walk: true, t: t * 1.6, hands: [[-90, -200], [150, -240]] }); Q.asura(x + 250, 1050, { look: Q.ASURA[2], s: 0.56, walk: true, t: t * 1.6 + 1, hands: [[-150, -240], [90, -100]] });
        Q.asura(x, 980 + Math.abs(Math.sin(t * 11)) * -14, { look: Q.ASURA[0], s: 0.86, walk: true, t: t * 1.6, lean: 0.12, hands: [[-80, -400], [80, -400]], holding: () => Q.kalasha(0, -470, 0.9, t, 1) });
        K.clouds(1330, t, '#3A0A30', 6, 7, 400, 1.2);
      } });
    cue(st, 'zip'); cue(st + 0.2, 'growl', { gain: 0.8 }); for (let i = 0; i < 4; i++) cue(st + 0.2 + i * 0.3, 'thud', { gain: 0.5 });
  }

  // ── 18 · "but Vishnu, disguised as the enchanting Mohini, won it back for the gods." ─
  {
    const st = cut(18), mo = Wd('Mohini', 18) - st, wn = Wd('won', 18) - st - 0.2;
    const MO = ['#FFE36B', '#FF4FA0', '#7B1FA8'];
    add({ id: 'S23', at: st, cam: [540, 800], zoom: 0.12, note: 'MOHINI: Vishnu in disguise; the demons stare, enchanted',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A1280', '#B0277F', '#FF6FB5', '#FFD0A0']));
        K.rays(540, 700, 1600, t, C.cream, 0.4, 18); K.mandala(540, 700, 560, t, C.cream, 0.5, 4);
        ctx.save(); ctx.globalAlpha = 0.3 * (1 - seg(lt, mo - 0.3, mo + 0.4)) + 0.12; K.vishnu(540, 900, 1.5, { t, tail: 0 }); ctx.restore();
        const p = eob(seg(lt, 0.15, 0.8));
        for (const [ax, lk] of [[150, 1], [930, 2]]) { Q.asura(ax, 1130, { look: Q.ASURA[lk], s: 0.5, face: ax > 540 ? -1 : 1, eyes: 'wide', lean: Math.sin(t * 2 + ax) * 0.08, hands: [[-60, 10], [60, 10]], t });
          for (let i = 0; i < 3; i++) { const q = ((t * 0.6 + i / 3) % 1); ctx.save(); ctx.translate(ax + Math.sin(i * 3 + t) * 40, 930 - q * 200); ctx.scale(1 - q * 0.4, 1 - q * 0.4); ctx.globalAlpha = 1 - q; ctx.beginPath(); ctx.moveTo(0, 20); ctx.bezierCurveTo(-44, -10, -26, -44, 0, -20); ctx.bezierCurveTo(26, -44, 44, -10, 0, 20); ctx.fillStyle = C.pink; ctx.fill(); ctx.restore(); } }
        ctx.save(); ctx.globalAlpha = clamp(p); R.sita(540, 1000, { s: 0.98 * lerp(0.8, 1, clamp(p)), sari: MO, hands: [[-150, -60], [130, -120]], eyes: 'open', t, holding: () => 0 }); ctx.restore();
        Q.kalasha(680, 850, 0.66, t, 1);
        K.petals(t, 30, 2, 1);
      } });
    cue(st, 'shimmer', { dur: 2.4 }); cue(st + mo, 'bell', { gain: 0.9 }); cue(st + mo, 'sparkle', { dur: 1.2 });
    add({ id: 'S24', at: st + wn, cam: [540, 880], zoom: 0.1, note: 'she pours the nectar for the gods, a ribbon of gold',
      draw(lt, d, t) {
        svarga(t, 1);
        R.sita(760, 940, { s: 0.8, face: -1, sari: MO, hands: [[-70, -30], [170, -170]], eyes: 'closed', t });
        ctx.save(); ctx.translate(590, 790); ctx.rotate(-0.9); Q.kalasha(0, 0, 0.62, t, 0.8); ctx.restore();
        const pts = []; for (let i = 0; i <= 14; i++) { const u = i / 14; pts.push([lerp(530, 330, u) + Math.sin(u * 6 - t * 9) * 5, lerp(770, 1010, u * u)]); }
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; line(pts, rgba(C.gold, 0.6), 34); ctx.restore(); line(pts, C.cream, 12);
        for (let i = 0; i < 3; i++) { const g = seg(lt, 0.4 + i * 0.5, 1.0 + i * 0.5); glow(330 - i * 115, 990 + i * 30, 240 * g, C.gold, 0.6 * g);
          R.hero(330 - i * 115, 1110 + i * 30, { look: Q.DEVA[i], s: 0.5 - i * 0.04, kneel: true, hands: [[10, -150], [70, -150]], eyes: 'closed', t }); }
        K.clouds(1330, t, '#FFE4F2', 6, 7, 20, 1.2); K.motes(t, 30, C.gold, 0.9, 5);
      } });
    cue(st + wn, 'bubbles', { dur: 2.0, gain: 0.7 }); for (let i = 0; i < 3; i++) cue(st + wn + 0.4 + i * 0.5, 'chime', { note: i * 2 });
  }

  // ── 19 · "Their strength returned, and the heavens were safe again." ────
  {
    const st = cut(19);
    add({ id: 'S25', at: st, cam: [540, 800], zoom: 0.1, note: 'the gods blaze with light again above a shining heaven',
      draw(lt, d, t) {
        svarga(t, 1); const g = eo(seg(lt, 0, 1.2));
        for (let i = 0; i < 3; i++) { const x = 260 + i * 280, y = 1000 - (i === 1 ? 60 : 0) - g * 30; glow(x, y - 150, 300 * g, C.gold, 0.4); K.rays(x, y - 150, 460, t + i, C.cream, 0.3 * g, 10);
          R.hero(x, y, { look: Q.DEVA[i], s: i === 1 ? 0.78 : 0.62, hands: [[-150, lerp(-40, -330, g)], [150, lerp(-40, -330, g)]], eyes: 'closed', t: t + i }); }
        K.clouds(1300, t, '#FFE4F2', 6, 7, 20, 1.2); K.petals(t, 34, 4, 1);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + 0.3, 'sparkle', { dur: 2.0 }); cue(st + 0.6, 'bell');
  }

  // ── 20 · "And through it all, Kurma never moved." ───────────────────────
  {
    const st = cut(20);
    add({ id: 'S26', at: st, cam: [540, 1000], zoom: -0.1, note: 'beneath the foam: Kurma, eyes closed, the turning mountain on his back',
      draw(lt, d, t) { under(t, 1150, 945, { eyes: 'closed', swim: 0.08, glow: 0.9 }); } });
    cue(st, 'bubbles', { dur: 2.0, gain: 0.6 }); cue(st + 0.3, 'bell', { gain: 0.7 });
  }

  // ── 21 · "This is Kurma, the second avatar of Vishnu," ──────────────────
  {
    const st = cut(21), sc = Wd('second', 21) - st;
    add({ id: 'S27', at: st, cam: [540, 760], zoom: -0.06, note: 'the icon: Vishnu rising from the tortoise shell; the second lotus lit',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 600, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 600, 590, t, C.gold, 0.8); glow(540, 600, 700, C.magenta, 0.3);
        const b = Math.sin(t * 1.2) * 8;
        K.vishnu(520, 880 + b, 0.84, { t, tail: 0 });
        Q.kurma(500, 1060 + b, 0.98, { t, glow: 0.5, swim: 0.3 });
        K.sea(1150, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 6, crest: C.gold });
        lotusRow(1, eob(seg(lt, sc - 0.15, sc + 0.2)));
        K.petals(t, 20, 8, 0.8);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + sc, 'bell', { gain: 1.0 }); cue(st + sc, 'sparkle', { dur: 1.2 });
  }

  // ── 22 · "a reminder that the greatest strength is sometimes just holding steady." ─
  {
    const st = cut(22);
    add({ id: 'S28', at: st, cam: [540, 800], zoom: 0.07, tr: 0.6, note: 'a tortoise carries the whole world through the stars; end title',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 31, 150, 1900);
        K.rays(520, 700, 1500, t, C.paleGold, 0.3); K.mandala(520, 700, 500, t, C.gold, 0.35, 3);
        const b = Math.sin(t * 1.4) * 6;
        earth(500, 700 + b, 245, t);
        Q.kurma(480, 1140 + b, 1.0, { t, glow: 0.7, eyes: 'closed', swim: 0.6 });
        K.motes(t, 40, C.cream, 0.8, 6);
        title(eo(seg(lt, Le(22) - st + 0.15, Le(22) - st + 1.0)), 190);
      } });
    cue(st + 0.2, 'shimmer', { dur: 3.0 }); cue(Le(22) + 0.2, 'conch', { gain: 0.9 }); cue(Le(22) + 0.3, 'bell', { gain: 1.1 }); cue(Le(22) + 0.35, 'sparkle', { dur: 1.5 });
  }

  return { shots: S, cues: CUES };
}
