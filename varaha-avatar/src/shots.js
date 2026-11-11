// VARAHA AVATAR: the shot list. One shot (or two) per narration line; everything lands on the voice's clock.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, bigText, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as Q from './core/kit3.js';
import * as M from './core/kit4.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.25);
  const HIRA = { skin: ['#7A1030', '#C0304A', '#F0707A'], dhoti: ['#FFD86B', '#D9901A', '#7A3A0A'], sash: ['#3A1680', '#150A4A'], crown: 'king' };

  const title = (a, y = 250) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    bigText('VARAHA', 540, y, 186, { ls: 10, sc: lerp(0.9, 1, eo(a)) });
    bigText('THE THIRD AVATAR OF VISHNU', 540, y + 136, 42, { ls: 8, fill: C.cream });
    line([[220, y + 188], [470, y + 188]], rgba(C.gold, 0.9), 4); line([[610, y + 188], [860, y + 188]], rgba(C.gold, 0.9), 4); K.lotus(540, y + 204, 0.34, 1);
    ctx.restore();
  };
  const lotusRow = (lit, on, y = 1236) => { for (let i = 0; i < 10; i++) { const x = 135 + i * 90; if (i === lit && on > 0) { glow(x, y - 16, 110 * on, C.gold, 0.8); K.lotus(x, y + 4, 0.5 * on + 0.3, 1); } else K.lotus(x, y, 0.34, 0.6, '#B79AE8', '#7A5AC8'); } };
  /** Hiranyaksha with his mace. o: s, face, t, hands, mrot, eyes, walk, lean */
  const hira = (x, y, o = {}) => {
    const s = o.s || 1, f = o.face || 1, hands = o.hands || [[-150, -60], [170, -200]];
    glow(x, y - 200 * s, 520 * s, C.red, 0.3);
    Q.asura(x, y, { look: HIRA, s, face: f, t: o.t, hands, eyes: o.eyes || 'open', walk: o.walk, lean: o.lean || 0, lookX: 3 });
    M.mace(x + f * s * hands[1][0], y + s * hands[1][1], s * 0.9, f * (o.mrot ?? 0.3));
  };
  const crimson = (t) => { fillAll(lg(0, 0, 0, H, ['#12001F', '#5A0A3A', '#E0401A', '#3A0A30'])); K.clouds(240, t, rgba('#1A0420', 0.85), 2, 5, 40, 1.1); K.motes(t, 40, C.orange, 0.8, 4); };
  const deep = (t, dark = 0.5, seed = 3) => {   // the cosmic ocean, below the surface
    fillAll(lg(0, 0, 0, H, [mix('#2AB8D0', '#0A2A5A', dark), mix('#1257C8', '#07184A', dark), mix('#0A2A7A', '#040A2A', dark), '#02040F']));
    K.shafts(t, 0.22 * (1 - dark)); K.bubbles(t, 26, seed, 0.45, 160);
    for (let i = 0; i < 26; i++) { const x = rnd(i + seed) * W, y = (rnd(i * 3 + seed) * H + t * 20) % H; glow(x, y, 26, i % 2 ? C.cyan : C.leaf, 0.5 + 0.4 * Math.sin(t * 2 + i)); }
  };
  const floor = (t, y = 1150) => { K.hills(y, 150, 2, '#0A1F4A', 0.004); for (const [rx, rs] of [[130, 1], [420, 0.7], [930, 1.2]]) ell(rx, y + 20, 150 * rs, 90 * rs, '#081838'); K.seaweed(90, y + 60, 420, t, '#0B4B5F', 1); K.seaweed(980, y + 80, 520, t, '#0B4B5F', 3); K.hills(y + 150, 80, 5, '#050E2A', 0.003); };
  const carry = (r, dim = 0) => (x, y) => M.earth(x + 10, y - r * 0.6, r, 0, dim);

  // ── 0 · "Long ago, a demon named Hiranyaksha grew so powerful that nothing could harm him." ─
  {
    const nt = Wd('nothing', 0) - 0.25;
    add({ id: 'S01', at: 0, cam: [540, 800], zoom: 0.1, note: 'Hiranyaksha towers over mountains and clouds, mace raised; title',
      draw(lt, d, t) {
        crimson(t);
        for (const [mx, mw, mh] of [[160, 520, 300], [540, 600, 380], [930, 520, 320]]) K.mountain(mx, 1420, mw, mh, '#7A1F4A', '#2A0420', true);
        hira(560, lerp(1500, 1040, eo(seg(lt, 0, 1.6))), { s: 1.16, t, hands: [[-150, -60], [170, lerp(-100, -300, eo(seg(lt, 1.2, 2.2)))]], mrot: 0.2 });
        K.clouds(1180, t, '#5A1040', 3, 6, 30, 1.0); K.clouds(1420, t, '#2A0430', 6, 7, 40, 1.2);
        K.vignette(0.45, '#0A0010');
        title(eo(seg(lt, 0.5, 1.5)) * (1 - seg(lt, d - 0.5, d)), 230);
      } });
    cue(0.1, 'conch', { gain: 0.7 }); cue(0.3, 'rumble', { dur: 4.0 }); cue(1.3, 'growl');
    add({ id: 'S02', at: nt, cam: [540, 800], zoom: 0.12, tr: 0.3, note: 'arrows and thunderbolts shatter against him; he only laughs',
      draw(lt, d, t) {
        crimson(t);
        ctx.strokeStyle = rgba(C.gold, 0.6 + 0.3 * Math.sin(t * 6)); ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(540, 760, 470, 0, TAU); ctx.stroke(); glow(540, 760, 560, C.gold, 0.2);
        hira(540, 1240, { s: 1.5, t, hands: [[-190, -60], [200, -110]], mrot: 0.5, eyes: 'wide' });
        for (let i = 0; i < 7; i++) { const p = ((t * 0.9 + i / 7) % 1), an = -PI * (0.1 + 0.8 * rnd(i)), sx = 540 + Math.cos(an) * 1100, sy = 760 + Math.sin(an) * 1100, hx = 540 + Math.cos(an) * 470, hy = 760 + Math.sin(an) * 470;
          if (p < 0.5) { const u = p / 0.5; line([[lerp(sx, hx, u) + Math.cos(an) * 120, lerp(sy, hy, u) + Math.sin(an) * 120], [lerp(sx, hx, u), lerp(sy, hy, u)]], i % 2 ? C.cream : C.cyan, 9); }
          else { const u = (p - 0.5) / 0.5; M.rings(hx, hy, 150, u, C.cream, 2); for (let k = 0; k < 5; k++) K.sparkle(hx + Math.cos(an + (k - 2) * 0.5) * 160 * u, hy + Math.sin(an + (k - 2) * 0.5) * 160 * u, 30 * (1 - u), 1 - u, C.cream); } }
      } });
    for (let i = 0; i < 4; i++) cue(nt + 0.4 + i * 0.5, 'pop', { gain: 0.9 }); cue(nt + 0.2, 'zip'); cue(nt + 0.9, 'zip');
  }

  // ── 1 · "He stormed through the three worlds, and even the gods fled before him." ─
  {
    const st = cut(1), fl = Wd('fled', 1) - st;
    add({ id: 'S03', at: st, cam: [540, 860], zoom: 0.08, note: 'three worlds stacked: heaven, earth, underworld; he strides across them, the gods run',
      draw(lt, d, t) {
        ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, W + 800, 860); ctx.clip(); fillAll(lg(0, 0, 0, 460, ['#FFC65C', '#FF6FA0', '#9A4AE0'])); R.towers(440, { col: '#F2B04D', lit: C.cream, n: 7, seed: 4, s: 0.5 }); K.clouds(440, t, '#FFE4F2', 3, 6, 14, 0.7); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.rect(-400, 460, W + 800, 500); ctx.clip(); fillAll(lg(0, 460, 0, 960, ['#8FD8F0', '#5ADC9A', '#0B8B5F'])); K.hills(900, 160, 1.2, '#2AB87A'); K.tree(170, 930, 0.5, '#0B5B3F', '#19A86A'); K.tree(880, 940, 0.6, '#0B5B3F', '#19A86A'); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.rect(-400, 960, W + 800, 1400); ctx.clip(); fillAll(lg(0, 960, 0, 1500, ['#3A1280', '#1B0F5C', '#07031F'])); for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(i * 140 - 60, 950); ctx.lineTo(i * 140, 1060 + (i % 3) * 50); ctx.lineTo(i * 140 + 60, 950); ctx.closePath(); ctx.fillStyle = '#5A2FB0'; ctx.fill(); } K.motes(t, 20, C.violet, 0.8, 9); ctx.restore();
        line([[-100, 460], [1180, 460]], rgba(C.gold, 0.9), 6); line([[-100, 960], [1180, 960]], rgba(C.gold, 0.9), 6);
        const u = seg(lt, 0, d), run = eio(seg(lt, fl - 0.4, d));
        for (let i = 0; i < 3; i++) R.hero(lerp(520, -160, run) - i * 110, 380 + Math.abs(Math.sin(t * 9 + i)) * -10, { look: Q.DEVA[i], s: 0.24, face: -1, walk: true, t: t * 1.5 + i, eyes: 'wide', hands: [[-150, -280], [150, -280]] });
        const sh = Math.sin(t * 40) * 4 * Math.max(0, Math.sin(t * 7));
        hira(lerp(200, 760, u) + sh, 1010 + Math.abs(Math.sin(t * 7)) * -14, { s: 0.98, t, walk: true, mrot: 0.3 + Math.sin(t * 7) * 0.3 });
      } });
    for (let i = 0; i < 6; i++) cue(st + 0.3 + i * 0.55, 'thud', { gain: 0.8 }); cue(st, 'rumble', { dur: 3.6 });
  }

  // ── 2 · "Drunk on his own strength, he seized the Earth herself," ───────
  {
    const st = cut(2), sz = Wd('seized', 2) - st;
    add({ id: 'S04', at: st, cam: [540, 800], zoom: 0.12, note: 'two vast hands close around the Earth; her light begins to fail',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700); fillAll(rgba('#3A0420', 0.5 * seg(lt, sz, d)));
        const g = eio(seg(lt, sz - 0.5, sz + 0.1)), sq = eob(seg(lt, sz, sz + 0.3));
        hira(540, 1260, { s: 1.6, t, hands: [[-340, -330], [340, -330]], eyes: 'wide' });
        fillAll(rgba('#07031F', 0.35));
        M.earth(540, 800 + Math.sin(t * 1.4) * 8, 250 - 12 * clamp(sq), t, 0.5 * seg(lt, sz, d));
        for (const sd of [-1, 1]) { const hx = 540 + sd * lerp(620, 318, g), hy = 800; ctx.save(); ctx.translate(hx, hy); ctx.scale(sd, 1);
          ell(30, 0, 110, 200, lg(-80, 0, 140, 0, ['#C0304A', '#7A1030']));
          for (let k = -1.5; k <= 1.5; k++) { ctx.save(); ctx.translate(-40, k * 86); ctx.rotate(k * 0.1); rr(-130, -34, 150, 68, 34); ctx.fillStyle = lg(-130, 0, 20, 0, ['#F0707A', '#C0304A']); ctx.fill(); ell(-112, 0, 22, 20, '#FFD0C8'); ctx.restore(); }
          rr(96, -150, 56, 300, 20); ctx.fillStyle = lg(96, 0, 152, 0, [C.paleGold, C.gold]); ctx.fill(); circle(124, 0, 16, C.red); ctx.restore(); }
        M.rings(540, 800, 620, seg(lt, sz, sz + 0.9), C.red, 3);
      } });
    cue(st, 'rumble', { dur: 3.4 }); cue(st + sz, 'slam', { gain: 1.1 }); cue(st + sz + 0.1, 'growl', { gain: 0.8 });
  }

  // ── 3 · "and dragged her down to the bottom of the cosmic ocean." ───────
  {
    const st = cut(3);
    add({ id: 'S05', at: st, cam: [540, 800], zoom: 0.08, pan: [0, 90], note: 'he plunges into the cosmic ocean, hauling the Earth down into blackness',
      draw(lt, d, t) {
        const u = eio(seg(lt, 0, d + 0.4)); deep(t, 0.2 + 0.7 * u, 2);
        const x = lerp(330, 620, u), y = lerp(260, 900, u);
        for (let i = 0; i < 14; i++) { const p = ((t * 1.3 + i / 14) % 1); circle(x - 60 - p * 240 + Math.sin(i * 4) * 60, y - 320 - p * 420, 22 * (1 - p) + 4, rgba(C.white, 0.6 * (1 - p))); }
        ctx.save(); ctx.translate(x, y); ctx.rotate(2.5); hira(0, 0, { s: 0.7, t, hands: [[-60, -400], [60, -400]], mrot: 3.0 }); ctx.restore();
        M.earth(x + 170, y + 250, 150, t, 0.5 + 0.4 * u);
        K.vignette(0.3 + 0.6 * u, '#01020F');
      } });
    cue(st, 'plop', { gain: 1.3 }); cue(st + 0.1, 'slide', { dur: 2.4 }); cue(st + 0.1, 'bubbles', { dur: 2.6 });
  }

  // ── 4 · "The world went dark, and the gods cried out for help." ─────────
  {
    const st = cut(4);
    add({ id: 'S06', at: st, cam: [540, 800], zoom: 0.1, note: 'an empty ring where the Earth was; the gods reach up from a cold cloud',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#03041A', '#0A0F3A', '#1A2260', '#0A0F3A'])); K.stars(t, 0.45, 5, 90, 1500);
        ctx.save(); ctx.setLineDash([26, 22]); ctx.lineDashOffset = -t * 30; ctx.strokeStyle = rgba('#8FB8FF', 0.6); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(540, 620, 230, 0, TAU); ctx.stroke(); ctx.restore();
        glow(540, 620, 300, '#3F7BFF', 0.18 + 0.08 * Math.sin(t * 2));
        K.clouds(1180, t, '#2A3070', 3, 6, 12, 1.0);
        for (let i = 0; i < 3; i++) R.hero(260 + i * 280, 1090 + (i === 1 ? -30 : 0), { look: Q.DEVA[i], s: 0.52, eyes: 'sad', hands: [[-120, -330 + Math.sin(t * 2 + i) * 16], [120, -330 - Math.sin(t * 2 + i) * 16]], t: t + i });
        fillAll(rgba('#0A0F3A', 0.3)); K.clouds(1360, t, '#1A2260', 6, 7, 16, 1.2);
      } });
    cue(st, 'bell', { gain: 0.6 }); cue(st + 0.2, 'rumble', { dur: 2.4, gain: 0.5 });
  }

  // ── 5 · "Without the Earth, there was nowhere left for life to stand." ──
  {
    const st = cut(5);
    add({ id: 'S07', at: st, cam: [540, 800], zoom: 0.08, note: 'trees, deer, an elephant, birds: all adrift and tumbling in the dark',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#03041A', '#0A0F3A', '#1A2260', '#0A0F3A'])); K.stars(t, 0.5, 9, 110, 1900);
        const dr = (x, y, rot, fn) => { ctx.save(); ctx.translate(x + Math.sin(t * 0.6 + x) * 30, y + Math.cos(t * 0.5 + y) * 30); ctx.rotate(rot + t * 0.25 * (x % 2 ? 1 : -1)); ctx.globalAlpha = 0.9; fn(); ctx.restore(); };
        dr(260, 420, 0.4, () => K.tree(0, 150, 0.7, '#3A5AA8', '#5A8AE0')); dr(790, 560, -0.6, () => K.elephant(0, 0, 0.8, 0, '#4A6AC0'));
        dr(330, 900, 0.9, () => K.deer(0, 0, 0.9, 0, '#5A7AD0')); dr(820, 1050, -0.3, () => K.tree(0, 150, 0.55, '#3A5AA8', '#5A8AE0'));
        dr(560, 730, 0.2, () => K.sprout(0, 60, 1.2, 1, '#8FB8FF')); for (let i = 0; i < 4; i++) dr(180 + i * 230, 250 + (i % 2) * 900, i, () => K.bird(0, 0, 0.8, t, '#8FB8FF'));
        K.vignette(0.55, '#01020F');
      } });
    cue(st + 0.2, 'shimmer', { dur: 2.4, gain: 0.5 });
  }

  // ── 6 · "Then, from the breath of Brahma the creator, a tiny boar appeared, no bigger than a thumb." ─
  {
    const st = cut(6), br = Wd('breath', 6) - st, tn = Wd('tiny', 6) - st - 0.25;
    add({ id: 'S08', at: st, cam: [540, 760], zoom: 0.1, note: 'Brahma on his lotus; a curl of golden breath leaves him',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A1280', '#B0277F', '#FF8A3D', '#FFD27A']));
        K.rays(540, 640, 1600, t, C.cream, 0.4, 18); K.mandala(540, 640, 580, t, C.cream, 0.55, 4);
        M.brahma(520, 1010, 0.98, t);
        const p = seg(lt, br - 0.1, d + 0.3);
        if (p > 0) for (let i = 0; i < 14; i++) { const u = clamp(p * 1.3 - i * 0.03), x = lerp(560, 860, u) + Math.sin(u * 7) * 40, y = lerp(730, 420, eo(u)); glow(x, y, 60 - i * 3, C.cream, (1 - i / 14) * 0.7 * (u > 0 ? 1 : 0)); }
        K.petals(t, 20, 4, 0.9);
      } });
    cue(st, 'conch', { gain: 0.8 }); cue(st + br, 'shimmer', { dur: 1.6 });
    add({ id: 'S09', at: st + tn, cam: [600, 800], zoom: 0.14, note: 'a boar no bigger than a thumb, glowing in the air',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A1280', '#B0277F', '#FF8A3D', '#FFD27A'])); K.rays(700, 800, 1500, t, C.cream, 0.4, 16);
        const th = eo(seg(lt, 0.9, 1.6));
        ctx.save(); ctx.translate(lerp(-200, 300, th), 1010); rr(-120, -330, 240, 900, 110); ctx.fillStyle = lg(-120, 0, 120, 0, ['#C98A5E', '#E6B088', '#F8D2A8']); ctx.fill(); rr(-76, -300, 152, 170, 60); ctx.fillStyle = '#FFE4D0'; ctx.fill(); ctx.strokeStyle = rgba('#A4673F', 0.7); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-90, 20); ctx.quadraticCurveTo(0, 50, 90, 20); ctx.moveTo(-90, 70); ctx.quadraticCurveTo(0, 100, 90, 70); ctx.stroke(); ctx.restore();
        const p = eob(seg(lt, 0.1, 0.7)), y = 820 + Math.sin(t * 3) * 14;
        glow(700, y, 300, C.cream, 0.8); M.rings(700, y, 320, seg(lt, 0.1, 1.0), C.cream, 2);
        M.varaha(660, y + 30, 0.34 * clamp(p), { t, run: 0.5, glow: 1 });
        for (let i = 0; i < 8; i++) K.sparkle(700 + Math.cos(i * 0.8 + t * 2) * 230, y + Math.sin(i * 0.8 + t * 2) * 230, 28, 0.5 + 0.5 * Math.sin(t * 5 + i));
      } });
    cue(st + tn + 0.1, 'pop'); cue(st + tn + 0.1, 'chime', { note: 5 }); cue(st + tn + 0.3, 'sparkle', { dur: 1.2, gain: 0.7 });
  }

  // ── 7 · "In moments it grew as large as a mountain, and its roar shook the heavens." ─
  {
    const st = cut(7), ro = Wd('roar', 7) - st - 0.2;
    add({ id: 'S10', at: st, cam: [540, 800], zoom: 0.06, note: 'it swells in pulses until the mountains look like pebbles',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#1B0F5C', '#6B1FA8', '#E0507A', '#FFB85C'])); K.stars(t, 0.7, 3, 60, 600); K.rays(540, 800, 1600, t, C.cream, 0.3, 16);
        for (const [mx, mw, mh] of [[150, 460, 300], [520, 520, 380], [920, 480, 320]]) K.mountain(mx, 1330, mw, mh, '#8A6AD0', '#3A1F78');
        const g = seg(lt, 0, ro), st3 = Math.floor(g * 4), fr = eob(clamp((g * 4 - st3) * 2)), sc = 0.16 * Math.pow(1.9, Math.min(4, st3 + fr));
        M.rings(540, 900, 300 + sc * 500, clamp((g * 4 - st3)), C.cream, 2);
        M.varaha(540 - 90 * sc, 1040 - 330 * sc, sc, { t, run: 0.2, glow: 1 });
        K.clouds(1300, t, '#4A2A98', 6, 7, 20, 1.2);
      } });
    for (let i = 0; i < 4; i++) cue(st + i * ro / 4, 'boing', { gain: 0.7 + i * 0.15 }); cue(st, 'rumble', { dur: ro });
    add({ id: 'S11', at: st + ro, cam: [540, 800], zoom: 0.1, tr: 0.15, note: 'THE ROAR: rings of sound roll out and the stars shudder',
      draw(lt, d, t) {
        const sh = Math.sin(t * 60) * 12 * (1 - seg(lt, 1.2, d)); ctx.save(); ctx.translate(sh, Math.cos(t * 47) * 8);
        fillAll(lg(0, 0, 0, H, ['#1B0F5C', '#6B1FA8', '#E0507A', '#FFB85C'])); K.stars(t * 6, 1, 3, 90, 1200);
        for (let i = 0; i < 4; i++) M.rings(780, 760, 1500, ((t * 0.9 + i / 4) % 1), i % 2 ? C.cream : C.gold, 1);
        M.varaha(-260, 1000, 1.9, { t, roar: 1, glow: 0.8 });
        K.clouds(1500, t, '#4A2A98', 6, 7, 500, 1.2);
        ctx.restore();
      } });
    cue(st + ro, 'growl', { gain: 1.4 }); cue(st + ro, 'thunder', { gain: 0.9 }); cue(st + ro + 0.1, 'conch', { gain: 1.1 }); cue(st + ro + 0.2, 'rumble', { dur: 1.8, gain: 1.2 });
  }

  // ── 8 · "This was Varaha, Vishnu in the form of a mighty boar." ─────────
  {
    const st = cut(8), vi = Wd('Vishnu', 8) - st;
    add({ id: 'S12', at: st, cam: [540, 760], zoom: 0.08, note: 'VARAHA revealed against a great mandala, Vishnu\'s form shimmering behind',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 660, 1600, t, C.paleGold, 0.42, 18); K.mandala(540, 660, 590, t, C.gold, 0.8); glow(540, 660, 700, C.magenta, 0.3);
        ctx.save(); ctx.globalAlpha = 0.45 * Math.sin(clamp(seg(lt, vi - 0.4, vi + 1.6)) * PI); K.vishnu(540, 760, 1.3, { t, tail: 0 }); ctx.restore();
        M.varaha(430, 860 + Math.sin(t * 1.4) * 8, 0.9, { t, glow: 0.9 });
        K.clouds(1260, t, '#7B3FE4', 6, 7, 20, 1.2); K.petals(t, 20, 3, 0.9);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + 0.3, 'bell'); cue(st + vi, 'sparkle', { dur: 1.6 });
  }

  // ── 9 · "He plunged into the dark waters, searching the deep for the lost Earth," ─
  {
    const st = cut(9), se = Wd('searching', 9) - st - 0.25;
    add({ id: 'S13', at: st, cam: [540, 820], zoom: 0.08, note: 'the boar dives: a wall of spray as he hits the sea',
      draw(lt, d, t) {
        K.sky('night'); K.stars(t, 1, 8, 110, 800);
        K.sea(900, t, { cols: ['#5A6FE0', '#150A4A'], amp: 24, rows: 3, bottom: 1060, speed: 2 });
        const u = ei(seg(lt, 0, 1.2));
        M.varaha(lerp(240, 560, u), lerp(260, 1250, u), 0.82, { t, rot: 0.95, swim: true, glow: 0.8 });
        K.sea(1040, t, { cols: ['#3A4FD0', '#07031F'], amp: 34, rows: 7, speed: 2.2 });
        for (const [sx, sd] of [[440, 0.75], [620, 0.8], [540, 0.85]]) K.splash(sx, 1040, 300, seg(lt, sd, sd + 1.3), '#DCE8FF');
      } });
    cue(st, 'whoosh'); cue(st + 0.85, 'slam', { gain: 0.9 }); cue(st + 0.85, 'waves', { dur: 2.2, gain: 1.3 });
    add({ id: 'S14', at: st + se, cam: [600, 860], zoom: 0.1, pan: [0, 60], note: 'into the black: his tusks throw a cone of light ahead of him',
      draw(lt, d, t) {
        deep(t, 0.85, 4);
        const x = lerp(160, 330, seg(lt, 0, d)), y = lerp(520, 760, seg(lt, 0, d)) + Math.sin(t * 2) * 14, rot = 0.38;
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); ctx.moveTo(330, -120); ctx.lineTo(1500, -620 + Math.sin(t * 1.3) * 80); ctx.lineTo(1500, 380 + Math.sin(t * 1.3) * 80); ctx.closePath(); ctx.fillStyle = lg(330, 0, 1400, 0, [rgba(C.cream, 0.55), rgba(C.cream, 0)]); ctx.fill(); ctx.restore();
        K.darkFish(880, 300 + Math.sin(t) * 20, 0.6, true, t); K.darkFish(820, 1350, 0.9, true, t + 1);
        M.varaha(x, y, 0.62, { t, rot, swim: true, glow: 0.9 });
        K.vignette(0.5, '#01020F');
      } });
    cue(st + se, 'bubbles', { dur: 2.0 }); cue(st + se + 0.2, 'shimmer', { dur: 1.6, gain: 0.5 });
  }

  // ── 10 · "and found her resting on the ocean floor, cold and silent." ───
  {
    const st = cut(10);
    add({ id: 'S15', at: st, cam: [600, 900], zoom: 0.1, note: 'the Earth, grey and half-buried on the sea bed; his light finds her',
      draw(lt, d, t) {
        deep(t, 0.9, 6); const u = eio(seg(lt, 0.2, 2.2));
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); ctx.moveTo(-100, 300); ctx.lineTo(lerp(200, 620, u) + 300, 1300); ctx.lineTo(lerp(200, 620, u) - 300, 1300); ctx.closePath(); ctx.fillStyle = lg(0, 300, 0, 1300, [rgba(C.cream, 0.5), rgba(C.cream, 0.05)]); ctx.fill(); ctx.restore();
        M.earth(640, 1020, 220, 0, lerp(0.9, 0.45, u));
        floor(t, 1130);
        for (let i = 0; i < 8; i++) K.sparkle(640 + Math.cos(i * 0.8) * 280, 980 + Math.sin(i * 0.8) * 200, 22, u * (0.4 + 0.6 * Math.sin(t * 4 + i)), '#BFE8FF');
        M.varaha(lerp(-560, -330, u), 640, 1.0, { t, swim: true, glow: 0.7 });
        K.vignette(0.45, '#01020F');
      } });
    cue(st + 0.2, 'bell', { gain: 0.6 }); cue(st + 0.3, 'bubbles', { dur: 2.4, gain: 0.6 }); cue(st + 1.6, 'chime', { note: 0 });
  }

  // ── 11 · "Gently, he lifted her onto his shining tusks." ────────────────
  {
    const st = cut(11), tk = Wd('tusks', 11) - st;
    add({ id: 'S16', at: st, cam: [640, 800], zoom: 0.12, note: 'close: the tusks slide beneath the Earth and raise her; colour floods back',
      draw(lt, d, t) {
        deep(t, 0.7, 7); const u = eio(seg(lt, 0.1, tk)), g = seg(lt, tk - 0.4, tk + 0.5);
        K.rays(700, 620, 1300, t, C.cream, 0.4 * g, 14); floor(t, lerp(1180, 1420, u));
        M.varaha(-170, lerp(1200, 1010, u), 1.5, { t, glow: 0.8, carry: carry(150, lerp(0.5, 0, g)) });
        for (let i = 0; i < 10; i++) K.sparkle(690 + Math.cos(i * 0.63 + t) * 300, lerp(840, 650, u) - 180 + Math.sin(i * 0.63 + t) * 300, 30, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
      } });
    cue(st + 0.2, 'slide', { dur: tk }); cue(st + tk, 'bell', { gain: 1.0 }); cue(st + tk, 'sparkle', { dur: 1.2 });
  }

  // ── 12 · "But Hiranyaksha blocked his path, swinging his mace." ─────────
  {
    const st = cut(12);
    add({ id: 'S17', at: st, cam: [540, 820], zoom: 0.1, note: 'the water turns red: Hiranyaksha bars the way, mace whirling',
      draw(lt, d, t) {
        deep(t, 0.75, 8); fillAll(rgba('#7A0A2A', 0.4 * seg(lt, 0, 0.8)));
        M.varaha(120, 800 + Math.sin(t * 2) * 10, 0.6, { t, glow: 0.8, carry: carry(150, 0) });
        const x = lerp(1300, 850, eo(seg(lt, 0, 0.9)));
        hira(x, 1020 + Math.sin(t * 2.4) * 12, { s: 1.02, face: -1, t, hands: [[-150, -60], [150, -260]], mrot: Math.sin(t * 5) * 0.9, eyes: 'wide' });
        K.vignette(0.4, '#0A0010');
      } });
    cue(st, 'rumble', { dur: 3.0 }); cue(st + 0.3, 'growl'); for (let i = 0; i < 4; i++) cue(st + 0.9 + i * 0.6, 'whoosh', { gain: 0.7 });
  }

  // ── 13 · "They fought a thunderous battle that shook all three worlds," ─
  {
    const st = cut(13);
    add({ id: 'S18', at: st, cam: [540, 820], zoom: 0.1, tr: 0.25, note: 'tusk against mace: each blow rings out in light',
      draw(lt, d, t) {
        const k = Math.sin(t * 5.5), hit = Math.max(0, k) ** 6, sh = Math.sin(t * 60) * 12 * hit; ctx.save(); ctx.translate(sh, Math.cos(t * 50) * 8 * hit);
        deep(t, 0.75, 8); fillAll(rgba('#7A0A2A', 0.35)); fillAll(rgba('#FFE9C8', 0.35 * hit));
        M.earth(170, 330 + Math.sin(t * 1.5) * 10, 100, t, 0); glow(170, 330, 200, C.cyan, 0.4);
        const gap = lerp(260, 40, Math.max(0, k));
        M.varaha(250 - gap, 900, 0.6, { t, run: 1, glow: 0.8, rot: -0.1 * Math.max(0, k) });
        hira(840 + gap, 1040, { s: 0.92, face: -1, t, hands: [[-150, -60], [170, -200]], mrot: lerp(-0.6, 1.3, Math.max(0, k)) });
        M.rings(580, 800, 520, hit > 0.02 ? 1 - hit : 0, C.cream, 2); glow(580, 800, 420 * hit, C.cream, hit);
        for (let i = 0; i < 10; i++) K.sparkle(580 + Math.cos(i * 0.63) * 260 * (1 - hit * 0.5), 800 + Math.sin(i * 0.63) * 260 * (1 - hit * 0.5), 46 * hit, hit, i % 2 ? C.gold : C.white);
        K.lightning(300 + (Math.floor(t * 1.7) % 3) * 240, Math.floor(t * 1.7) * 5, hit * 0.8, 600);
        ctx.restore();
      } });
    cue(st, 'rumble', { dur: 3.2, gain: 1.2 }); for (let i = 0; i < 4; i++) { cue(st + 0.3 + i * 0.8, 'slam', { gain: 0.9 }); } cue(st + 0.6, 'thunder', { gain: 0.7 });
  }

  // ── 14 · "until, with one final blow, Varaha struck the demon down." ────
  {
    const st = cut(14), bl = Wd('blow', 14) - st;
    add({ id: 'S19', at: st, cam: [600, 820], zoom: 0.1, note: 'the last charge: a burst of white, and the demon is gone',
      draw(lt, d, t) {
        deep(t, lerp(0.75, 0.35, seg(lt, bl, d)), 8); fillAll(rgba('#7A0A2A', 0.35 * (1 - seg(lt, bl, bl + 1))));
        const u = ei(seg(lt, bl - 0.7, bl)), ex = seg(lt, bl, bl + 1.3);
        if (ex < 1) { ctx.save(); ctx.globalAlpha = 1 - ex; ctx.translate(820 + ex * 260, 1000 - ex * 120); ctx.rotate(-ex * 1.1); hira(0, 0, { s: 0.92 * (1 + ex * 0.2), face: -1, t, hands: [[-150, -60], [170, -200]], eyes: 'wide' }); ctx.restore(); }
        if (ex > 0) { K.rays(700, 820, 1700, t * 4, C.cream, 0.8 * (1 - ex), 18); glow(700, 820, 300 + 1200 * eo(ex), C.cream, 1 - ex); M.rings(700, 820, 1100, ex, C.cream, 3);
          M.mace(lerp(760, 1000, eo(ex)), lerp(700, 200, eo(ex)), 0.8, ex * 9);
          for (let i = 0; i < 24; i++) { const an = i * TAU / 24, r = eo(ex) * (240 + rnd(i) * 620); glow(760 + Math.cos(an) * r, 900 + Math.sin(an) * r, 40 * (1 - ex), i % 2 ? C.red : C.gold, 1 - ex); } }
        M.varaha(lerp(-120, 300, u) - eo(ex) * 60, 880, 0.66, { t, run: 1 - ex, glow: 1, rot: -0.12 * u * (1 - ex) });
      } });
    cue(st + bl - 0.6, 'whoosh', { gain: 1.2 }); cue(st + bl, 'slam', { gain: 1.4 }); cue(st + bl, 'thunder', { gain: 1.0 }); cue(st + bl + 0.4, 'sparkle', { dur: 1.6 });
  }

  // ── 15 · "Then he rose from the sea, the Earth balanced on his tusks," ──
  {
    const st = cut(15);
    add({ id: 'S20', at: st, cam: [540, 780], zoom: 0.08, flash: true, note: 'sunrise: Varaha bursts from the sea, the shining Earth held high',
      draw(lt, d, t) {
        K.sky('dawn'); const sy = lerp(1000, 820, eo(seg(lt, 0, 3))); K.rays(540, sy, 1700, t, C.cream, 0.4, 16); K.sun(540, sy, 280, t);
        K.clouds(360, t, rgba(C.pink, 0.45), 3, 4, 12, 0.8);
        K.sea(960, t, { cols: ['#FF9A8A', '#5A1FA8'], amp: 22, rows: 3, bottom: 1080, crest: C.cream });
        const u = eo(seg(lt, 0, 1.5));
        M.varaha(lerp(300, 330, u), lerp(1700, 930, u), 0.84, { t, rot: lerp(-0.7, -0.22, u), glow: 0.9, carry: carry(170, 0) });
        K.sea(1080, t, { cols: ['#E0508A', '#2A0E66'], amp: 30, rows: 7, speed: 1.6, crest: C.cream });
        for (const [sx, sd] of [[320, 0.1], [560, 0.15], [440, 0.2]]) K.splash(sx, 1080, 300, seg(lt, sd, sd + 1.4), C.white);
        for (let i = 0; i < 12; i++) { const p = ((t * 0.8 + i / 12) % 1); circle(240 + i * 50, lerp(760, 1080, p), 9, rgba(C.white, 0.8 * (1 - p) * u)); }
      } });
    cue(st, 'conch', { gain: 1.1 }); cue(st, 'waves', { dur: 3.0, gain: 1.3 }); cue(st + 0.4, 'sparkle', { dur: 2.0, gain: 0.7 });
  }

  // ── 16 · "and set her softly back in her place among the stars." ────────
  {
    const st = cut(16), pl = Wd('place', 16) - st;
    add({ id: 'S21', at: st, cam: [600, 740], zoom: 0.08, note: 'he lowers his head; the Earth floats up to her place and the stars relight',
      draw(lt, d, t) {
        K.sky('cosmic'); const u = eio(seg(lt, 0.2, pl + 0.3)); K.stars(t, 0.4 + 0.6 * u, 5, 140, 1700);
        K.mandala(650, 560, 520, t, C.gold, 0.35 * u, 3);
        const ex = lerp(700, 650, u), ey = lerp(760, 560, u);
        ctx.strokeStyle = rgba(C.cyan, 0.6 * u); ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(ex, ey, 300, 80, -0.25, 0, TAU); ctx.stroke();
        M.earth(ex, ey + Math.sin(t * 1.4) * 8, 190, t, 0);
        circle(ex + Math.cos(t * 0.8) * 300 * Math.cos(-0.25) + Math.sin(t * 0.8) * 80 * Math.sin(0.25), ey + Math.sin(t * 0.8) * 80 - Math.cos(t * 0.8) * 70, 22 * u, C.cream);
        M.varaha(250, 1060, 0.7, { t, rot: lerp(-0.22, 0.02, u), glow: 0.7 });
        K.sea(1230, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 6, crest: C.gold });
        for (let i = 0; i < 12; i++) K.sparkle(100 + rnd(i) * 880, 120 + rnd(i * 3) * 700, 34, seg(u, i / 14, i / 14 + 0.15) * (0.5 + 0.5 * Math.sin(t * 4 + i)));
      } });
    cue(st + 0.2, 'shimmer', { dur: 2.4 }); cue(st + pl + 0.2, 'bell', { gain: 1.0 });
  }

  // ── 17 · "The Earth goddess, Bhudevi, bowed in thanks." ─────────────────
  {
    const st = cut(17), bw = Wd('bowed', 17) - st;
    add({ id: 'S22', at: st, cam: [600, 860], zoom: 0.1, note: 'Bhudevi, in green and gold, joins her hands and bows to the boar',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFF1A8', '#9BE8A0', '#19A86A', '#0B5B5F']));
        K.rays(720, 760, 1600, t, C.cream, 0.45, 16); K.mandala(720, 760, 480, t, C.cream, 0.6, 3);
        const b = eio(seg(lt, bw - 0.3, bw + 0.5));
        K.lotus(740, 1290, 3.0, 1);
        R.sita(740, 1010, { s: 0.92, face: -1, sari: ['#C8F5A0', '#19A86A', '#0B5B3F'], hands: [[-16, -124], [16, -124]], pray: true, lean: 0.3 * b, eyes: 'closed', t });
        M.varaha(-210, 900 + Math.sin(t * 1.4) * 8, 0.9, { t, glow: 0.6, rot: 0.06 * b });
        K.petals(t, 30, 4, 1); K.motes(t, 24, C.cream, 0.8, 5);
      } });
    cue(st, 'bell', { gain: 0.8 }); cue(st + bw, 'chime', { note: 4 }); cue(st + bw + 0.3, 'sparkle', { dur: 1.2, gain: 0.6 });
  }

  // ── 18 · "Forests grew, rivers ran, and life returned." ─────────────────
  {
    const st = cut(18), rv = Wd('rivers', 18) - st, lf = Wd('life', 18) - st;
    add({ id: 'S23', at: st, cam: [540, 880], zoom: 0.08, note: 'trees spring up, a river unrolls, and the animals come home',
      draw(lt, d, t) {
        K.sky('newdawn'); K.sun(800, 440, 190, t); K.clouds(300, t, rgba(C.white, 0.85), 6, 4, 16, 0.7);
        K.hills(900, 240, 1.2, '#5ADC9A'); K.hills(1010, 170, 4.2, '#2AB87A');
        for (let i = 0; i < 6; i++) { const g = eob(seg(lt, 0.05 + i * 0.12, 0.5 + i * 0.12)); if (g > 0) K.tree(80 + i * 190, 1020 + (i % 2) * 40, 0.75 * g, '#0B5B3F', i % 2 ? '#19A86A' : '#2AC87A'); }
        K.hills(1190, 110, 2.5, '#0B8B5F', 0.003);
        const r = eo(seg(lt, rv - 0.1, rv + 1.0));
        if (r > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-400, 0, 400 + 1500 * r, H); ctx.clip(); ctx.beginPath(); ctx.moveTo(-50, 1210); ctx.bezierCurveTo(260, 1160, 420, 1330, 720, 1260); ctx.bezierCurveTo(900, 1220, 1000, 1300, 1200, 1280); ctx.lineTo(1200, 1380); ctx.bezierCurveTo(1000, 1390, 900, 1320, 720, 1360); ctx.bezierCurveTo(420, 1440, 260, 1250, -50, 1310); ctx.closePath(); ctx.fillStyle = lg(0, 1160, 0, 1440, [C.cyan, '#2A8FE8']); ctx.fill(); ctx.restore(); }
        const a = eo(seg(lt, lf - 0.1, lf + 0.8));
        if (a > 0) { K.deer(lerp(-200, 300, a), 1130, 0.7, t, '#C9601A'); K.elephant(lerp(1300, 780, a), 1090, 0.6, t, '#6A5AA8'); for (let i = 0; i < 5; i++) K.bird(lerp(-200, 200 + i * 150, a), 360 + (i % 2) * 70 + Math.sin(t + i) * 10, 0.6, t + i, '#0B6B4F'); }
        for (let i = 0; i < 5; i++) K.sprout(140 + i * 200, 1210 - (i % 2) * 40, 0.7, seg(lt, 0.3 + i * 0.15, 1.1 + i * 0.15), [C.pink, C.gold, C.coral][i % 3]);
        K.motes(t, 24, C.cream, 0.8, 7);
      } });
    for (let i = 0; i < 6; i++) cue(st + 0.05 + i * 0.12, 'chime', { gain: 0.6, note: i }); cue(st + rv, 'waves', { dur: 1.4, gain: 0.5 }); cue(st + lf, 'sparkle', { dur: 1.2, gain: 0.6 });
  }

  // ── 19 · "This is Varaha, the third avatar of Vishnu," ──────────────────
  {
    const st = cut(19), th = Wd('third', 19) - st;
    add({ id: 'S24', at: st, cam: [540, 760], zoom: -0.06, note: 'the icon: boar-headed Vishnu, the Earth resting on his tusk; the third lotus lit',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 620, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 620, 590, t, C.gold, 0.8); glow(540, 620, 700, C.magenta, 0.3);
        const b = Math.sin(t * 1.2) * 8, y = 900 + b, s = 0.94;
        K.vishnu(540, y, s, { t, tail: 0 }); M.boarHead(540, y - 300 * s, s * 1.02);
        M.earth(540 + 128 * s, y - 392 * s, 62, t, 0);
        K.lotus(540, y + 120, 2.2, 1);
        K.sea(1160, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 6, crest: C.gold });
        lotusRow(2, eob(seg(lt, th - 0.15, th + 0.2)));
        K.petals(t, 20, 8, 0.8);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + th, 'bell', { gain: 1.0 }); cue(st + th, 'sparkle', { dur: 1.2 });
  }

  // ── 20 · "a reminder that no matter how deep the world sinks, it can always be lifted again." ─
  {
    const st = cut(20), li = Wd('lifted', 20) - st;
    add({ id: 'S25', at: st, cam: [540, 800], zoom: 0.07, tr: 0.6, note: 'out of the dark water the Earth rises again on golden tusks; end title',
      draw(lt, d, t) {
        const u = eio(seg(lt, 0.3, li + 0.4));
        fillAll(lg(0, 0, 0, H, [mix('#03041A', '#2A0E78', u), mix('#0A0F3A', '#7B1FA8', u), mix('#1A2260', '#E0218A', u), mix('#0A0F3A', '#3A1280', u)])); K.stars(t, 0.4 + 0.6 * u, 31, 150, 1900);
        K.rays(560, 620, 1600, t, C.paleGold, 0.4 * u, 16); K.mandala(560, 620, 520, t, C.gold, 0.4 * u, 3);
        M.varaha(330, lerp(1560, 1010, u), 0.8, { t, rot: -0.2, glow: 0.4 + 0.5 * u, carry: carry(170, lerp(0.8, 0, u)) });
        K.sea(1180, t, { cols: ['#7B3FE4', '#0D0630'], amp: 20, rows: 6, crest: C.gold, crestA: 0.3 + 0.5 * u }); fillAll(rgba('#03041A', 0.55 * (1 - u)));
        K.motes(t, 40, C.cream, 0.8 * u, 6);
        title(eo(seg(lt, Le(20) - st + 0.15, Le(20) - st + 1.0)), 180);
      } });
    cue(st + 0.3, 'waves', { dur: 3.0, gain: 0.7 }); cue(st + li, 'shimmer', { dur: 2.4 }); cue(Le(20) + 0.2, 'conch', { gain: 0.9 }); cue(Le(20) + 0.3, 'bell', { gain: 1.1 }); cue(Le(20) + 0.35, 'sparkle', { dur: 1.5 });
  }

  return { shots: S, cues: CUES };
}
