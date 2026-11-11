// VAMANA AVATAR: the shot list. One shot (or two) per narration line; everything lands on the voice's clock.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, bigText, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as Q from './core/kit3.js';
import * as M from './core/kit4.js';
import * as V from './core/kit5.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.25);
  const COURTIER = { skin: ['#A4673F', '#C98A5E', '#E0A77C'], dhoti: ['#5CE1FF', '#1F8FE0', '#1257C8'], sash: ['#FFE36B', '#E0901A'], crown: 'jata' };

  const title = (a, y = 250) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    bigText('VAMANA', 540, y, 186, { ls: 10, sc: lerp(0.9, 1, eo(a)) });
    bigText('THE FIFTH AVATAR OF VISHNU', 540, y + 136, 42, { ls: 8, fill: C.cream });
    line([[220, y + 188], [470, y + 188]], rgba(C.gold, 0.9), 4); line([[610, y + 188], [860, y + 188]], rgba(C.gold, 0.9), 4); K.lotus(540, y + 204, 0.34, 1);
    ctx.restore();
  };
  const lotusRow = (lit, on, y = 1236) => { for (let i = 0; i < 10; i++) { const x = 135 + i * 90; if (i === lit && on > 0) { glow(x, y - 16, 110 * on, C.gold, 0.8); K.lotus(x, y + 4, 0.5 * on + 0.3, 1); } else K.lotus(x, y, 0.34, 0.6, '#B79AE8', '#7A5AC8'); } };
  const court = (t, dim = 0) => {
    fillAll(lg(0, 0, 0, H, ['#3A1280', '#8A1FA8', '#E0507A', '#3A1280']));
    for (const px of [90, 990]) { rr(px - 60, 120, 120, 1200, 20); ctx.fillStyle = lg(px - 60, 0, px + 60, 0, ['#8A3A05', C.gold, C.cream, C.gold, '#8A3A05']); ctx.fill(); rr(px - 90, 90, 180, 60, 16); ctx.fillStyle = C.gold; ctx.fill(); }
    K.mandala(540, 720, 520, t, C.gold, 0.3, 4);
    ctx.fillStyle = lg(0, 1180, 0, 1920, ['#4A1580', '#1B0F5C']); ctx.fillRect(-400, 1190, W + 800, 1200);
    if (dim) fillAll(rgba('#0D0630', dim));
  };
  const fest = (t) => {   // the open-air sacrifice ground by the river
    K.sky('gold'); K.sun(820, 420, 170, t); K.clouds(330, t, rgba(C.cream, 0.5), 4, 4, 12, 0.7);
    K.hills(980, 180, 2, '#E0703A'); K.sea(1000, t, { cols: ['#FFD27A', '#E0508A'], amp: 10, rows: 3, bottom: 1100, crest: C.cream });
    K.hills(1180, 80, 1, '#7A1F6A', 0.002);
    for (const px of [70, 1010]) { rr(px - 34, 380, 68, 860, 16); ctx.fillStyle = lg(px - 34, 0, px + 34, 0, ['#8A3A05', C.gold, C.cream, '#8A3A05']); ctx.fill(); }
    for (let i = 0; i < 9; i++) { const x = 70 + i * 117.5, y = 400 + Math.sin(i / 8 * PI) * 70; ctx.beginPath(); ctx.moveTo(x - 40, y); ctx.lineTo(x + 40, y); ctx.lineTo(x, y + 80 + Math.sin(t * 3 + i) * 6); ctx.closePath(); ctx.fillStyle = [C.magenta, C.saffron, C.cyan, C.gold][i % 4]; ctx.fill(); }
  };
  const flag = (x, y, h, t, a = 1) => { if (a <= 0) return; line([[x, y], [x, y - h * a]], C.gold, 9); ctx.beginPath(); ctx.moveTo(x, y - h * a); ctx.quadraticCurveTo(x + 60, y - h * a + 14 + Math.sin(t * 5) * 8, x + 120, y - h * a + 34); ctx.quadraticCurveTo(x + 60, y - h * a + 50, x, y - h * a + 66); ctx.closePath(); ctx.fillStyle = lg(x, 0, x + 120, 0, ['#B07AE8', '#6B1FA8']); ctx.fill(); circle(x + 44, y - h * a + 34, 12, C.gold); };
  const worlds = (t) => {
    ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, W + 800, 860); ctx.clip(); fillAll(lg(0, 0, 0, 460, ['#FFC65C', '#FF6FA0', '#9A4AE0'])); R.towers(440, { col: '#F2B04D', lit: C.cream, n: 7, seed: 4, s: 0.5 }); K.clouds(440, t, '#FFE4F2', 3, 6, 14, 0.7); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-400, 460, W + 800, 500); ctx.clip(); fillAll(lg(0, 460, 0, 960, ['#8FD8F0', '#5ADC9A', '#0B8B5F'])); K.hills(900, 160, 1.2, '#2AB87A'); K.tree(170, 930, 0.5, '#0B5B3F', '#19A86A'); K.tree(900, 940, 0.6, '#0B5B3F', '#19A86A'); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(-400, 960, W + 800, 1400); ctx.clip(); fillAll(lg(0, 960, 0, 1500, ['#3A1280', '#1B0F5C', '#07031F'])); for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(i * 140 - 60, 950); ctx.lineTo(i * 140, 1060 + (i % 3) * 50); ctx.lineTo(i * 140 + 60, 950); ctx.closePath(); ctx.fillStyle = '#5A2FB0'; ctx.fill(); } K.motes(t, 20, C.violet, 0.8, 9); ctx.restore();
    line([[-100, 460], [1180, 460]], rgba(C.gold, 0.9), 6); line([[-100, 960], [1180, 960]], rgba(C.gold, 0.9), 6);
  };
  const cosmos = (t) => { K.sky('cosmic'); K.stars(t, 1, 5, 130, 1800); };

  // ── 0 · "Long ago, a demon king named Bali ruled so well that his power spread across all three worlds." ─
  {
    const pw = Wd('power', 0) - 0.25;
    add({ id: 'S01', at: 0, cam: [540, 820], zoom: 0.1, note: 'King Bali on his throne, open-handed, gold at his feet; title',
      draw(lt, d, t) {
        court(t); K.rays(540, 640, 1500, t, C.paleGold, 0.3);
        R.throne(540, 1090, 0.86);
        V.bali(540, 960, { s: 0.74, kneel: true, hands: [[-190, -90], [190, -90]], eyes: 'closed', t });
        V.gold(180, 1250, 0.9, t); V.gold(900, 1250, 0.9, t);
        K.motes(t, 26, C.paleGold, 0.8, 3);
        title(eo(seg(lt, 0.5, 1.5)) * (1 - seg(lt, d - 0.5, d)), 230);
      } });
    cue(0.1, 'conch', { gain: 0.8 }); cue(0.6, 'bell'); cue(1.2, 'sparkle', { dur: 1.6, gain: 0.6 });
    add({ id: 'S02', at: pw, cam: [540, 860], zoom: 0.08, note: 'heaven, earth and underworld: his banner rises over each',
      draw(lt, d, t) {
        worlds(t);
        flag(820, 1330, 300, t, eob(seg(lt, 0.2, 0.7))); flag(820, 900, 300, t, eob(seg(lt, 0.9, 1.4))); flag(820, 420, 300, t, eob(seg(lt, 1.6, 2.1)));
        V.bali(360, 960, { s: 0.9, hands: [[-200, -200], [200, -200]], eyes: 'open', t });
      } });
    for (let i = 0; i < 3; i++) cue(pw + 0.2 + i * 0.7, 'thud', { gain: 0.7 }); cue(pw, 'rumble', { dur: 2.4, gain: 0.6 });
  }

  // ── 1 · "Even the gods lost their heaven," ──────────────────────────────
  {
    const st = cut(1);
    add({ id: 'S03', at: st, cam: [540, 860], zoom: 0.08, note: 'the gods trudge down a stair of cloud, looking back at the gates',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A2A8A', '#8A4AC8', '#E07A9A', '#4A2AC8']));
        R.towers(820, { col: '#B07A3D', lit: '#FFD9A0', n: 7, seed: 4, s: 0.7 }); flag(540, 300, 200, t, 1);
        K.clouds(860, t, '#C8A8E0', 3, 6, 12, 1.0);
        const u = seg(lt, 0, d + 0.4);
        for (let i = 0; i < 3; i++) { const x = lerp(620, 220, u) + i * 150, y = lerp(900, 1060, u) + i * 70; for (let k = 0; k < 3; k++) circle(x + (k - 1) * 70, y + 180, 70, '#E8D0F0');
          R.hero(x, y, { look: Q.DEVA[i], s: 0.46, face: -1, walk: true, t: t + i, eyes: 'sad', hands: [[-60, 10], [60, 10]] }); }
        K.clouds(1360, t, '#A88AD8', 6, 7, 16, 1.2); fillAll(rgba('#1B0F5C', 0.25));
      } });
    cue(st, 'bell', { gain: 0.6 }); for (let i = 0; i < 3; i++) cue(st + 0.3 + i * 0.5, 'tock', { gain: 0.5 });
  }

  // ── 2 · "and their mother Aditi prayed to Vishnu for help." ─────────────
  {
    const st = cut(2), vi = Wd('Vishnu', 2) - st;
    add({ id: 'S04', at: st, cam: [540, 800], zoom: 0.1, note: 'Aditi prays by lamplight; Vishnu appears above her in a ring of gold',
      draw(lt, d, t) {
        K.sky('night'); K.stars(t, 1, 4, 100, 900);
        const a = eo(seg(lt, vi - 0.5, vi + 0.6));
        K.rays(540, 520, 1400, t, C.paleGold, 0.4 * a, 16); K.mandala(540, 520, 440, t, C.gold, 0.7 * a, 3);
        ctx.save(); ctx.globalAlpha = a; K.vishnu(540, 700, 0.74, { t, tail: 0 }); K.lotus(540, 800, 1.7, 1); ctx.restore();
        K.hills(1180, 110, 2, '#1B0F5C', 0.003); K.tree(110, 1200, 1.1, '#0D0630', '#1B0F5C'); K.tree(980, 1210, 1.2, '#0D0630', '#1B0F5C');
        R.sita(540, 1130, { s: 0.74, sit: true, sari: R.SARI.queen, hands: [[-16, -124], [16, -124]], pray: true, eyes: 'closed', t });
        R.diya(330, 1250, 0.9, t, 1, 1); R.diya(750, 1250, 0.9, t, 1, 2);
      } });
    cue(st + vi - 0.3, 'shimmer', { dur: 1.8 }); cue(st + vi, 'bell', { gain: 0.9 });
  }

  // ── 3 · "So Vishnu was born as her son, a small and smiling boy named Vamana." ─
  {
    const st = cut(3), sm = Wd('small', 3) - st - 0.25, nm = Wd('Vamana', 3) - st;
    add({ id: 'S05', at: st, cam: [540, 860], zoom: 0.1, note: 'the light gathers itself into a child at his mother\'s side',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9A8A', '#C850A8', '#5A1F9A'])); K.rays(660, 900, 1500, t, C.cream, 0.4, 16);
        K.hills(1220, 110, 2, '#7A1F8A', 0.003); R.hut(210, 1230, 0.9);
        R.sita(400, 1010, { s: 0.82, sari: R.SARI.queen, hands: [[-70, -30], [150, -110]], eyes: 'closed', t });
        const p = eo(seg(lt, 0.3, 1.6)); glow(700, lerp(400, 1000, p), lerp(420, 220, p), C.cream, 0.9); for (let i = 0; i < 10; i++) K.sparkle(700 + Math.cos(i * 0.63 + t * 2) * 260 * (1 - p * 0.5), lerp(400, 1000, p) + Math.sin(i * 0.63 + t * 2) * 260 * (1 - p * 0.5), 30, 0.5 + 0.5 * Math.sin(t * 5 + i));
        if (p > 0.6) { ctx.save(); ctx.globalAlpha = seg(p, 0.6, 1); V.vamana(700, 1270, { s: 0.8, t, eyes: 'closed', glow: 1, props: false }); ctx.restore(); }
        K.petals(t, 24, 4, 0.9);
      } });
    cue(st, 'conch', { gain: 0.8 }); cue(st + 0.3, 'shimmer', { dur: 1.6 });
    add({ id: 'S06', at: st + sm, cam: [540, 800], zoom: 0.1, note: 'VAMANA: small, bright-eyed, umbrella over his shoulder',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFB03D', '#FF5A8A', '#7B1FA8']));
        K.rays(540, 760, 1600, t, C.cream, 0.5, 18); K.mandala(540, 760, 560, t, C.cream, 0.6, 4);
        V.vamana(520, 1230 + Math.sin(t * 2) * 6, { s: lerp(1.5, 1.75, eob(seg(lt, 0, 0.5))), t, glow: 0.8 });
        const g = seg(lt, nm - sm - 0.1, nm - sm + 0.4); for (let i = 0; i < 10; i++) K.sparkle(540 + Math.cos(i * 0.63 + t) * 420, 760 + Math.sin(i * 0.63 + t) * 420, 34, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
        K.petals(t, 20, 6, 0.9);
      } });
    cue(st + sm, 'chime', { note: 3 }); cue(st + nm, 'bell', { gain: 1.0 }); cue(st + nm, 'sparkle', { dur: 1.2 });
  }

  // ── 4 · "One day, King Bali held a grand ceremony, promising a gift to anyone who asked." ─
  {
    const st = cut(4), pr = Wd('promising', 4) - st - 0.25;
    add({ id: 'S07', at: st, cam: [540, 860], zoom: 0.1, note: 'the great sacrifice by the river: banners, a roaring altar fire',
      draw(lt, d, t) {
        fest(t);
        K.sage(250, 1150, 0.8, { halo: 0, c1: '#F4F0FF', c2: '#B8A8E0' });
        V.altar(540, 1260, 0.95, t);
        V.bali(830, 1010, { s: 0.68, face: -1, hands: [[-90, -40], [170, -150]], t });
        K.motes(t, 30, C.gold, 0.9, 5);
      } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + 0.2, 'sizzle', { dur: 2.4, gain: 1.2 }); cue(st + 0.5, 'bell');
    add({ id: 'S08', at: st + pr, cam: [560, 900], zoom: 0.08, note: 'gifts for all: gold, an elephant, coins tumbling into waiting hands',
      draw(lt, d, t) {
        fest(t); Q.coins(t, 16, 2, 0.9);
        K.elephant(210, 1010, 0.8, t * 0.3, '#6A3A8A');
        V.bali(760, 1000, { s: 0.74, face: -1, hands: [[-90, -40], [200, -110]], t });
        for (let i = 0; i < 3; i++) R.hero(470 - i * 130, 1160 + i * 16, { look: [COURTIER, R.LOOK.lakshmana, Q.DEVA[2]][i], s: 0.44, kneel: true, hands: [[40, -150], [100, -150]], eyes: 'closed', t });
        V.gold(880, 1260, 0.8, t);
      } });
    for (let i = 0; i < 4; i++) cue(st + pr + 0.2 + i * 0.4, 'chime', { gain: 0.6, note: i });
  }

  // ── 5 · "Vamana walked in, carrying only a little umbrella and a water pot." ─
  {
    const st = cut(5);
    add({ id: 'S09', at: st, cam: [540, 900], zoom: 0.1, note: 'between towering guards, a very small boy walks up the carpet',
      draw(lt, d, t) {
        court(t, 0.2);
        ctx.beginPath(); ctx.moveTo(380, 1950); ctx.lineTo(480, 1190); ctx.lineTo(600, 1190); ctx.lineTo(700, 1950); ctx.closePath(); ctx.fillStyle = lg(0, 1190, 0, 1920, ['#E0218A', '#8A0F5A']); ctx.fill();
        const x = lerp(-80, 540, eo(seg(lt, 0, 2.6)));
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); ctx.moveTo(x - 60, -100); ctx.lineTo(x + 60, -100); ctx.lineTo(x + 260, 1320); ctx.lineTo(x - 260, 1320); ctx.closePath(); ctx.fillStyle = lg(0, 0, 0, 1320, [rgba(C.paleGold, 0.4), rgba(C.paleGold, 0.06)]); ctx.fill(); ctx.restore();
        for (const [gx, f] of [[150, 1], [930, -1]]) { R.hero(gx, 900, { look: COURTIER, s: 1.05, face: f, eyes: 'wide', lookX: 3, lookY: 6, hands: [[-90, -40], [130, -100]], t }); line([[gx + f * 138, 1240], [gx + f * 138, 380]], C.paleGold, 12); ctx.beginPath(); ctx.moveTo(gx + f * 138 - 26, 390); ctx.lineTo(gx + f * 138, 300); ctx.lineTo(gx + f * 138 + 26, 390); ctx.closePath(); ctx.fillStyle = '#E8F0FF'; ctx.fill(); }
        V.vamana(x, 1250, { s: 0.6, t, walk: lt < 2.6, glow: 0.5 });
      } });
    for (let i = 0; i < 6; i++) cue(st + 0.2 + i * 0.4, 'tock', { gain: 0.45 }); cue(st + 2.6, 'chime', { note: 2 });
  }

  // ── 6 · "Bali smiled. Ask for anything, gold, elephants, a whole kingdom." ─
  {
    const st = cut(6), w = ['gold', 'elephants', 'kingdom'].map((x) => Wd(x, 6) - st);
    add({ id: 'S10', at: st, cam: [540, 860], zoom: 0.08, note: 'Bali offers the world: three bright wishes float up as he names them',
      draw(lt, d, t) {
        court(t);
        V.bali(280, 940, { s: 0.82, hands: [[-90, -40], [200, -250]], eyes: 'closed', t });
        V.vamana(840, 1270, { s: 0.6, t, face: -1, lookY: -4 });
        const bub = (i, x, y, fn) => { const p = eob(seg(lt, w[i] - 0.15, w[i] + 0.25)); if (p <= 0) return; ctx.save(); ctx.translate(x, y + Math.sin(t * 2 + i) * 8); ctx.scale(p, p); glow(0, 0, 220, C.cream, 0.6); circle(0, 0, 130, rgba('#FFF6DC', 0.92)); ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 130, 0, TAU); ctx.stroke(); fn(); ctx.restore(); };
        bub(0, 560, 380, () => V.gold(0, 50, 0.6, t)); bub(1, 820, 560, () => K.elephant(-20, 0, 0.46, t * 0.2, '#6A3A8A')); bub(2, 620, 760, () => K.palace(0, 70, 0.28, '#B0277F', C.gold));
      } });
    w.forEach((x, i) => { cue(st + x - 0.1, 'pop', { gain: 0.9 }); cue(st + x, 'chime', { note: i * 2 }); });
  }

  // ── 7 · "But the boy asked only for three steps of land, measured by his own tiny feet." ─
  {
    const st = cut(7), th = Wd('three', 7) - st, me = Wd('measured', 7) - st - 0.25;
    add({ id: 'S11', at: st, cam: [540, 800], zoom: 0.1, note: 'he holds up three fingers; three small footprints light in the air',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#2A0E78', '#7B1FA8', '#E0218A', '#FF8A3D'])); K.rays(540, 800, 1600, t, C.cream, 0.3, 16); K.mandala(540, 800, 560, t, C.cream, 0.35, 4);
        V.vamana(430, 1250, { s: 1.5, t, fingers: lt > th - 0.2 ? 3 : 0, props: lt <= th - 0.2 });
        for (let i = 0; i < 3; i++) V.footprint(720 + i * 110, 560 - i * 150, 1.0, eob(seg(lt, th - 0.1 + i * 0.25, th + 0.2 + i * 0.25)), 0.5);
      } });
    for (let i = 0; i < 3; i++) cue(st + th - 0.1 + i * 0.25, 'chime', { note: i * 2 + 1 });
    add({ id: 'S12', at: st + me, cam: [540, 900], zoom: 0.14, note: 'close on two tiny feet pacing out the ground: one, two, three',
      draw(lt, d, t) {
        fest(t); ctx.fillStyle = lg(0, 1000, 0, 1920, ['#F2B04D', '#C9601A', '#7A2A0A']); ctx.fillRect(-400, 1010, W + 800, 1200);
        for (let i = 0; i < 3; i++) V.footprint(300 + i * 240, 1140 - (i % 2) * 40, 1.5, seg(lt, 0.3 + i * 0.5, 0.6 + i * 0.5), 1.4);
        const k = clamp(Math.floor((lt - 0.1) / 0.5), 0, 2), fr = clamp((lt - 0.1) / 0.5 - k);
        V.vamana(lerp(180 + k * 240, 180 + (k + 1) * 240, lt > 1.6 ? 1 : eo(fr)) - 60, 1060 - Math.sin(fr * PI) * 30 * (lt > 1.6 ? 0 : 1), { s: 0.7, t, walk: lt < 1.6, lookY: 4 });
      } });
    for (let i = 0; i < 3; i++) cue(st + me + 0.3 + i * 0.5, 'tock', { gain: 0.9 });
  }

  // ── 8 · "Bali's teacher warned him, this is no ordinary child." ─────────
  {
    const st = cut(8), no = Wd('this', 8) - st;
    add({ id: 'S13', at: st, cam: [540, 820], zoom: 0.1, note: 'the old teacher whispers; on the wall the boy\'s shadow has four arms and a crown',
      draw(lt, d, t) {
        court(t, 0.45);
        rr(560, 200, 440, 1000, 30); ctx.fillStyle = lg(0, 200, 0, 1200, ['#B07AE8', '#7A3FC8']); ctx.fill();
        const a = eo(seg(lt, no - 0.3, no + 0.6));
        ctx.save(); ctx.beginPath(); ctx.roundRect(560, 200, 440, 1000, 30); ctx.clip(); ctx.filter = 'brightness(0)'; ctx.globalAlpha = 0.6 * a; K.vishnu(790, 1010, 1.25, { t, tail: 0, halo: 0 }); ctx.filter = 'none'; ctx.restore();
        K.sage(170, 1130, 0.82, { halo: 0, c1: '#F4F0FF', c2: '#B8A8E0' });
        line([[236, 1140], [330, 1060]], '#C98A5E', 26); circle(336, 1054, 20, '#E0A77C');
        V.bali(400, 1010, { s: 0.72, hands: [[-90, -40], [90, -40]], eyes: a > 0.4 ? 'wide' : 'open', lookX: 5, t });
        V.vamana(790, 1250, { s: 0.6, t, face: -1, eyes: 'closed' });
        glow(790, 1050, 240, C.gold, 0.4 * a);
      } });
    cue(st, 'rumble', { dur: 3.2, gain: 0.7 }); cue(st + no, 'shimmer', { dur: 1.8, gain: 0.7 }); cue(st + no, 'bell', { gain: 0.6 });
  }

  // ── 9 · "But Bali had given his word, and he poured the water to seal the gift." ─
  {
    const st = cut(9), po = Wd('poured', 9) - st - 0.3;
    add({ id: 'S14', at: st, cam: [540, 760], zoom: 0.14, note: 'Bali closes his eyes, hand on his heart: a promise is a promise',
      draw(lt, d, t) {
        court(t); K.rays(540, 700, 1500, t, C.paleGold, 0.35);
        V.bali(540, 1200, { s: 1.45, hands: [[-90, -40], [30, -130]], eyes: 'closed', t });
        glow(560, 1010, 150 + 30 * Math.sin(t * 5), C.gold, 0.7);
      } });
    cue(st + 0.2, 'bell', { gain: 0.8 });
    add({ id: 'S15', at: st + po, cam: [540, 900], zoom: 0.14, note: 'water streams from the king\'s pot into two small cupped hands',
      draw(lt, d, t) {
        fest(t); fillAll(rgba('#FF8A3D', 0.2));
        const p = seg(lt, 0.2, 0.7), g = seg(lt, 0.8, d);
        V.vamana(660, 1300, { s: 1.15, t, cup: p >= 1 ? 0.4 + 0.6 * g : 0.01, eyes: 'closed', glow: g });
        line([[-100, 1000], [200, 980]], '#C0603A', 84); circle(214, 980, 52, '#E8946A');
        ctx.save(); ctx.translate(320, 930); ctx.rotate(1.0); K.pot(0, 0, 1.35, { glow: 0.3 }); ctx.restore();
        if (p > 0) { const pts = []; for (let i = 0; i <= 16; i++) { const u = i / 16 * p; pts.push([lerp(440, 652, u) + Math.sin(u * 8 - t * 10) * 4, lerp(985, 1100, u * u)]); } ctx.save(); ctx.globalCompositeOperation = 'lighter'; line(pts, rgba(C.cyan, 0.5), 40); ctx.restore(); line(pts, '#DFF6FF', 14); }
        for (let i = 0; i < 8; i++) K.sparkle(660 + Math.cos(i * 0.8 + t * 2) * 240 * g, 1090 + Math.sin(i * 0.8 + t * 2) * 160 * g, 30, g * (0.5 + 0.5 * Math.sin(t * 5 + i)), C.cyan);
      } });
    cue(st + po + 0.2, 'bubbles', { dur: 1.4 }); cue(st + po + 0.7, 'plop'); cue(st + po + 0.9, 'shimmer', { dur: 1.4 });
  }

  // ── 10 · "The moment it touched his hands, Vamana began to grow, past the trees, past the clouds, past the stars." ─
  {
    const st = cut(10), gr = Wd('grow', 10) - st - 0.5;
    add({ id: 'S16', at: st, cam: [540, 860], zoom: 0.12, flash: true, note: 'light pours out of the boy; rings of gold roll across the ground',
      draw(lt, d, t) {
        fest(t); fillAll(rgba('#FFE9A8', 0.25));
        for (let i = 0; i < 3; i++) M.rings(540, 1000, 1100, ((t * 0.7 + i / 3) % 1), C.cream, 1);
        K.rays(540, 950, 1700, t * 3, C.cream, 0.6, 18);
        V.vamana(540, 1260, { s: lerp(0.9, 1.3, ei(seg(lt, 0, d))), t, eyes: 'closed', glow: 1.4, props: false });
        V.bali(160, 1060, { s: 0.5, lean: -0.2, eyes: 'wide', hands: [[-150, -280], [150, -280]], t });
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + 0.1, 'shimmer', { dur: gr }); cue(st + 0.3, 'rumble', { dur: gr });
    const marks = ['trees', 'clouds', 'stars'].map((x) => Wd(x, 10) - st - gr);
    add({ id: 'S17', at: st + gr, cam: [540, 860], zoom: 0.04, tr: 0.3, note: 'TRIVIKRAMA: he grows past trees, clouds and stars until the Earth is a ball beneath his feet',
      draw(lt, d, t) {
        const g = eio(seg(lt, 0, d + 0.3)), w = Math.pow(0.03, g), FY = 1190, Rp = 9000 * w;
        fillAll(lg(0, 0, 0, H, [mix('#3FA9F5', '#0A0430', g), mix('#9BE8E0', '#2A0E78', g), mix('#FFF1B8', '#7B1FA8', g), mix('#FFC65C', '#E0218A', g)]));
        K.stars(t, seg(g, 0.45, 0.8), 5, 140, 1900); K.rays(540, 700, 1700, t, C.paleGold, 0.35, 16); K.mandala(540, 700, 600, t, C.gold, 0.5 * seg(g, 0.5, 1), 4);
        if (Rp > 700) { circle(540, FY + Rp, Rp, lg(0, FY, 0, FY + 600, ['#5ADC9A', '#0B8B5F', '#0B5B4F'])); for (let i = -3; i <= 3; i++) { if (!i) continue; const a = i * 0.045 / Math.max(w, 0.2); if (Math.abs(a) > 1.2) continue; K.tree(540 + Math.sin(a) * Rp, FY + Rp - Math.cos(a) * Rp, 1.2 * w, '#0B5B3F', '#19A86A'); }
          K.palace(540 + Math.sin(0.02 / Math.max(w, 0.2)) * Rp + 260 * w, FY + 10 * w, 0.7 * w, '#B0277F', C.gold); }
        else M.earth(540, FY + Rp, Rp, t, 0);
        const cy = FY - 900 * w; if (w > 0.06) { ctx.save(); ctx.globalAlpha = clamp(w * 6) * 0.95; for (let i = 0; i < 7; i++) for (let k = 0; k < 4; k++) circle(540 + (i - 3) * 520 * w + k * 150 * w + Math.sin(t * 0.4 + i) * 30, cy + Math.sin(i * 2 + k) * 60 * w, 180 * w + 20, '#FFF1F6'); ctx.restore(); }
        glow(540, 760, 620, C.gold, 0.5);
        R.hero(540, 880, { look: V.TRIV, s: 0.9, hands: [[-190, -230], [190, -230]], eyes: 'closed', t });
        ctx.strokeStyle = rgba(C.paleGold, 0.95); ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(540, 880 - 284 * 0.9, 120, 0, TAU); ctx.stroke();
        K.conch(540 - 190 * 0.9, 880 - 290 * 0.9, 0.9); K.chakra(540 + 190 * 0.9, 880 - 300 * 0.9, 44, t);
      } });
    marks.forEach((m, i) => { cue(st + gr + m - 0.15, 'whoosh', { gain: 0.8 + i * 0.2 }); cue(st + gr + m, 'chime', { note: i * 2 + 2 }); });
    cue(st + gr, 'rumble', { dur: 5.0, gain: 1.1 });
  }

  // ── 11 · "With his first step, he covered the whole earth." ─────────────
  {
    const st = cut(11), cv = Wd('covered', 11) - st;
    add({ id: 'S18', at: st, cam: [540, 800], zoom: 0.08, note: 'STEP ONE: a foot the size of a continent settles on the Earth',
      draw(lt, d, t) {
        cosmos(t); K.mandala(540, 1000, 620, t, C.gold, 0.3, 4);
        const u = ei(seg(lt, 0.1, cv)), land = seg(lt, cv, cv + 1.0), sh = Math.sin(t * 60) * 10 * Math.max(0, 1 - land * 2) * (land > 0 ? 1 : 0);
        ctx.save(); ctx.translate(sh, 0);
        M.earth(540, 1120, 330, t, 0);
        V.foot(520, lerp(-300, 792, u), 0.82, lerp(-0.25, 0, u));
        M.rings(540, 800, 900, land, C.cream, 3); glow(540, 800, 500 * Math.sin(clamp(land) * PI), C.cream, 0.7 * Math.sin(clamp(land) * PI));
        ctx.restore();
      } });
    cue(st + 0.1, 'whoosh', { gain: 1.2 }); cue(st + cv, 'slam', { gain: 1.4 }); cue(st + cv, 'thunder', { gain: 0.8 }); cue(st + cv + 0.1, 'bell', { gain: 0.9 });
  }

  // ── 12 · "With his second, he covered the heavens and all the stars." ───
  {
    const st = cut(12), cv = Wd('covered', 12) - st;
    add({ id: 'S19', at: st, cam: [540, 760], zoom: 0.08, note: 'STEP TWO: the other foot sweeps up through the heavens; a river of light springs from his toe',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0430', '#4A1D96', '#B0277F', '#FF9A6B'])); K.stars(t, 1, 9, 140, 1500);
        R.towers(1260, { col: '#F2B04D', lit: C.cream, n: 7, seed: 4, s: 0.6 }); K.clouds(1300, t, '#FFE4F2', 3, 6, 14, 1.0);
        const u = eo(seg(lt, 0.05, cv + 0.2));
        ctx.save(); ctx.translate(lerp(-200, 470, u), lerp(2300, 700, u)); ctx.rotate(lerp(-1.2, -0.62, u)); V.foot(0, 0, 0.84, 0); ctx.restore();
        const tx = lerp(-200, 470, u) + 330, ty = lerp(2300, 700, u) - 240, g = seg(lt, cv, cv + 0.6);
        if (g > 0) { const pts = []; for (let i = 0; i <= 20; i++) { const q = i / 20 * g; pts.push([tx + 60 + q * 180 + Math.sin(q * 9 - t * 8) * 14, ty + q * q * 900]); } ctx.save(); ctx.globalCompositeOperation = 'lighter'; line(pts, rgba(C.cyan, 0.5), 60); ctx.restore(); line(pts, '#DFF6FF', 18); glow(tx + 40, ty, 200, C.cream, 0.9);
          for (let i = 0; i < 8; i++) K.sparkle(tx + Math.cos(i * 0.8 + t * 2) * 200, ty + Math.sin(i * 0.8 + t * 2) * 200, 34, 0.5 + 0.5 * Math.sin(t * 5 + i)); }
        for (let i = 0; i < 3; i++) R.hero(160 + i * 120, 1190 + (i % 2) * 20, { look: Q.DEVA[i], s: 0.3, kneel: true, hands: [[-18, -128], [18, -128]], pray: true, eyes: 'closed', t });
      } });
    cue(st, 'whoosh', { gain: 1.3 }); cue(st + cv, 'slam', { gain: 1.0 }); cue(st + cv, 'waves', { dur: 2.0, gain: 0.8 }); cue(st + cv + 0.2, 'sparkle', { dur: 1.6 });
  }

  // ── 13 · "Then he asked, where shall I place my third?" ─────────────────
  const prints3 = (lt, at, y) => { for (let i = 0; i < 3; i++) { const x = 300 + i * 240; if (i < 2) V.footprint(x, y, 1.3, 1, 0.2); else { ctx.save(); ctx.setLineDash([16, 14]); ctx.strokeStyle = rgba(C.cream, 0.6 + 0.4 * Math.sin(lt * 8)); ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(x, y, 62, 96, 0.2, 0, TAU); ctx.stroke(); ctx.restore(); bigText('?', x, y, 110, { a: seg(lt, at, at + 0.3) }); } } };
  {
    const st = cut(13), wh = Wd('where', 13) - st;
    add({ id: 'S20', at: st, cam: [540, 760], zoom: 0.1, note: 'the giant looks down from among the stars: two footprints lit, the third an empty outline',
      draw(lt, d, t) {
        cosmos(t); K.rays(540, 620, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 620, 600, t, C.gold, 0.6, 4);
        K.vishnu(540, 1180 + Math.sin(t * 1.2) * 8, 1.45, { t, tail: 0 });
        K.clouds(1260, t, '#7B3FE4', 6, 7, 20, 1.2);
        prints3(lt, wh, 1210);
        V.bali(990, 1100, { s: 0.26, face: -1, hands: [[-60, 10], [60, 10]], t });
      } });
    cue(st + wh, 'bell', { gain: 0.8 }); cue(st + wh + 0.3, 'pop');
  }

  // ── 14 · "The universe was his, and nothing was left to give." ──────────
  {
    const st = cut(14);
    add({ id: 'S21', at: st, cam: [540, 860], zoom: 0.08, note: 'heaven above and Earth below both bear his mark; Bali stands between with empty hands',
      draw(lt, d, t) {
        cosmos(t);
        R.towers(520, { col: '#F2B04D', lit: C.cream, n: 7, seed: 4, s: 0.5 }); K.clouds(540, t, '#FFE4F2', 3, 6, 14, 0.8); V.footprint(540, 300, 1.7, 1, 0.2);
        M.earth(540, 1560, 420, t, 0); V.footprint(540, 1230, 1.5, 1, 0.2);
        for (let k = 0; k < 4; k++) circle(540 + (k - 1.5) * 90, 1000, 80, '#C8A8F0');
        V.bali(540, 800, { s: 0.6, hands: [[-170, -60], [170, -60]], eyes: 'closed', t });
      } });
    cue(st, 'shimmer', { dur: 2.4, gain: 0.6 }); cue(st + 0.4, 'bell', { gain: 0.6 });
  }

  // ── 15 · "Bali bowed low, and offered his own head." ────────────────────
  {
    const st = cut(15), hd = Wd('head', 15) - st;
    add({ id: 'S22', at: st, cam: [540, 900], zoom: 0.12, note: 'the king sets his crown aside and bows; the great foot waits above him',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#2A0E78', '#7B1FA8', '#E0507A', '#FFB85C'])); K.stars(t, 0.7, 5, 80, 800); K.rays(540, 500, 1600, t, C.cream, 0.4, 16);
        V.foot(520, lerp(360, 470, eio(seg(lt, 0, d))) + Math.sin(t * 1.4) * 8, 0.7, 0, { glow: 0.7 });
        K.clouds(1300, t, '#B07AE8', 6, 7, 16, 1.2);
        const b = eio(seg(lt, 0.1, 1.2));
        V.bali(560, 1130, { s: 0.86, bare: true, kneel: true, lean: 0.5 * b, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', t });
        ctx.save(); ctx.translate(250, 1210); ctx.scale(0.8, 0.8); ctx.beginPath(); ctx.moveTo(-60, 40); ctx.lineTo(-74, -40); ctx.lineTo(-36, -4); ctx.lineTo(0, -80); ctx.lineTo(36, -4); ctx.lineTo(74, -40); ctx.lineTo(60, 40); ctx.closePath(); ctx.fillStyle = lg(0, -80, 0, 40, [C.cream, C.gold, C.saffron]); ctx.fill(); circle(0, -14, 12, C.red); ctx.restore();
        const g = seg(lt, hd - 0.2, hd + 0.5); glow(600, 880, 260 * g, C.cream, 0.7 * g);
      } });
    cue(st + 0.2, 'thud', { gain: 0.5 }); cue(st + hd, 'bell', { gain: 0.9 });
  }

  // ── 16 · "Moved by his humility, Vishnu blessed him, made him king of the world below," ─
  const sutala = (t) => {
    fillAll(lg(0, 0, 0, H, ['#0A0430', '#3A1280', '#0F6B8A', '#0B3B5F']));
    for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(i * 130 - 80, -20); ctx.lineTo(i * 130 - 20, 200 + (i % 3) * 110); ctx.lineTo(i * 130 + 50, -20); ctx.closePath(); ctx.fillStyle = i % 2 ? '#5A2FB0' : '#3A1F90'; ctx.fill(); }
    for (let i = 0; i < 40; i++) { const x = rnd(i) * W, y = rnd(i * 3) * 1300; glow(x, y, 34, [C.cyan, C.pink, C.leaf, C.gold][i % 4], 0.5 + 0.4 * Math.sin(t * 3 + i)); K.sparkle(x, y, 14, 0.6 + 0.4 * Math.sin(t * 4 + i), C.white); }
    R.towers(1100, { col: '#0FB5A6', lit: C.gold, n: 8, seed: 12, s: 0.75 });
    ctx.fillStyle = lg(0, 1180, 0, 1920, ['#3A1280', '#0D0630']); ctx.fillRect(-400, 1190, W + 800, 1200);
  };
  {
    const st = cut(16), mk = Wd('made', 16) - st - 0.25;
    add({ id: 'S23', at: st, cam: [540, 880], zoom: 0.1, note: 'the foot rests on his head as gently as a hand; gold light and petals',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFB03D', '#FF5A8A', '#7B1FA8'])); K.rays(560, 800, 1700, t * 2, C.cream, 0.6, 18);
        const u = eio(seg(lt, 0, 1.0));
        V.bali(560, 1160, { s: 0.86, bare: true, kneel: true, lean: 0.5, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', t });
        V.foot(470, lerp(560, 792, u), 0.7, 0, { glow: 0.8 });
        const g = seg(lt, 0.9, 1.6); glow(600, 860, 600 * g, C.cream, 0.8 * g); M.rings(600, 860, 900, seg(lt, 0.9, 2.2), C.cream, 3);
        K.petals(t, 40, 3, 1);
      } });
    cue(st + 0.9, 'bell', { gain: 1.1 }); cue(st + 0.9, 'sparkle', { dur: 2.0 }); cue(st, 'conch', { gain: 0.7 });
    add({ id: 'S24', at: st + mk, cam: [540, 860], zoom: 0.1, note: 'Sutala, the jewelled world below: Bali crowned on a throne among glowing gems',
      draw(lt, d, t) {
        sutala(t); K.rays(540, 700, 1400, t, C.paleGold, 0.3);
        R.throne(540, 1090, 0.86);
        V.bali(540, 960, { s: 0.74, kneel: true, hands: [[-100, -20], [150, -150]], eyes: 'closed', t });
        V.gold(170, 1260, 0.8, t); V.gold(910, 1260, 0.8, t);
      } });
    cue(st + mk, 'shimmer', { dur: 2.0 }); cue(st + mk + 0.3, 'chime', { note: 4 });
  }

  // ── 17 · "and promised to guard his door forever." ──────────────────────
  {
    const st = cut(17);
    add({ id: 'S25', at: st, cam: [540, 860], zoom: 0.1, note: 'at the palace gate stands the guard: Vishnu himself, mace in hand',
      draw(lt, d, t) {
        sutala(t);
        ctx.beginPath(); ctx.moveTo(300, 1200); ctx.lineTo(300, 620); ctx.bezierCurveTo(300, 420, 460, 400, 540, 280); ctx.bezierCurveTo(620, 400, 780, 420, 780, 620); ctx.lineTo(780, 1200); ctx.closePath(); ctx.fillStyle = lg(0, 280, 0, 1200, [C.cream, C.gold, '#B5720A']); ctx.fill();
        ctx.beginPath(); ctx.moveTo(350, 1200); ctx.lineTo(350, 640); ctx.bezierCurveTo(350, 480, 480, 460, 540, 370); ctx.bezierCurveTo(600, 460, 730, 480, 730, 640); ctx.lineTo(730, 1200); ctx.closePath(); ctx.fillStyle = lg(0, 370, 0, 1200, ['#FFE9A8', '#FF9A6B', '#B0277F']); ctx.fill();
        line([[540, 380], [540, 1200]], rgba('#8A3A05', 0.6), 8); circle(510, 820, 16, C.gold); circle(570, 820, 16, C.gold);
        const p = eo(seg(lt, 0, 0.8));
        ctx.save(); ctx.globalAlpha = p; glow(540, 800, 520, C.gold, 0.5);
        R.hero(540, 900, { look: V.TRIV, s: 0.9, hands: [[-150, -60], [170, -150]], eyes: 'closed', t });
        M.mace(540 + 170 * 0.9, 900 - 150 * 0.9, 0.7, 0.1); ctx.restore();
        for (const dx of [200, 880]) R.diya(dx, 1250, 1.1, t, 1, dx);
      } });
    cue(st, 'conch', { gain: 0.8 }); cue(st + 0.6, 'thud', { gain: 0.6 }); cue(st + 0.7, 'bell', { gain: 0.8 });
  }

  // ── 18 · "This is Vamana, the fifth avatar of Vishnu," ──────────────────
  {
    const st = cut(18), fi = Wd('fifth', 18) - st;
    add({ id: 'S26', at: st, cam: [540, 760], zoom: -0.06, note: 'the icon: the small boy and, behind him, the giant he became; the fifth lotus lit',
      draw(lt, d, t) {
        cosmos(t); K.rays(540, 620, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 620, 590, t, C.gold, 0.8); glow(540, 620, 700, C.magenta, 0.3);
        ctx.save(); ctx.globalAlpha = 0.4; R.hero(540, 760, { look: V.TRIV, s: 2.0, hands: [[-190, -230], [190, -230]], eyes: 'closed', t }); ctx.restore();
        V.vamana(520, 1150 + Math.sin(t * 1.2) * 6, { s: 1.3, t, glow: 0.8 });
        K.sea(1160, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 6, crest: C.gold });
        lotusRow(4, eob(seg(lt, fi - 0.15, fi + 0.2)));
        K.petals(t, 20, 8, 0.8);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + fi, 'bell', { gain: 1.0 }); cue(st + fi, 'sparkle', { dur: 1.2 });
  }

  // ── 19 · "a reminder that true greatness is found in humility, and in keeping your word." ─
  {
    const st = cut(19);
    add({ id: 'S27', at: st, cam: [540, 860], zoom: 0.07, tr: 0.6, note: 'sunset: a small boy with an umbrella walks on, three glowing footprints behind him; end title',
      draw(lt, d, t) {
        K.sky('dusk'); K.stars(t, 0.7, 3, 70, 700); K.rays(540, 900, 1600, t, C.cream, 0.35); K.sun(540, 900, 260, t, { c2: C.orange, c3: C.magenta });
        K.hills(1060, 180, 2, '#6B1FA8'); K.tree(150, 1110, 0.8, '#2A0E66', '#3D1690'); K.tree(960, 1130, 0.9, '#2A0E66', '#3D1690');
        K.hills(1230, 90, 1, '#2A0E66', 0.002);
        const x = lerp(300, 700, seg(lt, 0, d));
        for (let i = 0; i < 3; i++) V.footprint(x - 150 - i * 130, 1250 + (i % 2) * 24, 0.8, seg(lt, 0.4 + i * 0.3, 0.8 + i * 0.3), 1.5);
        V.vamana(x, 1240, { s: 0.62, t, walk: true, glow: 0.5 });
        K.motes(t, 30, C.paleGold, 0.8, 6);
        title(eo(seg(lt, Le(19) - st + 0.15, Le(19) - st + 1.0)), 200);
      } });
    for (let i = 0; i < 6; i++) cue(st + 0.3 + i * 0.55, 'tock', { gain: 0.4 }); cue(st + 0.4, 'shimmer', { dur: 2.6, gain: 0.6 });
    cue(Le(19) + 0.2, 'conch', { gain: 0.9 }); cue(Le(19) + 0.3, 'bell', { gain: 1.1 }); cue(Le(19) + 0.35, 'sparkle', { dur: 1.5 });
  }

  return { shots: S, cues: CUES };
}
