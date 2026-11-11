// RAMA AVATAR: the shot list. One shot (or two) per narration line; everything lands on the voice's clock.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, bigText, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.25);
  const LK = R.LOOK;

  const title = (a, y = 250) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    bigText('RAMA', 540, y, 230, { ls: 16, sc: lerp(0.9, 1, eo(a)) });
    bigText('THE SEVENTH AVATAR OF VISHNU', 540, y + 156, 42, { ls: 7, fill: C.cream });
    line([[200, y + 208], [470, y + 208]], rgba(C.gold, 0.9), 4); line([[610, y + 208], [880, y + 208]], rgba(C.gold, 0.9), 4); K.lotus(540, y + 224, 0.34, 1);
    ctx.restore();
  };
  /** layered forest. dark 0..1, sc = scroll px */
  const forest = (t, dark = 0, sc = 0, ground = 1180) => {
    const m = (a, b) => mix(a, b, dark);
    fillAll(lg(0, 0, 0, H, [m('#FFF1B8', '#0A1A4A'), m('#9BE8A0', '#0B3B5F'), m('#2AB87A', '#0B3B4F'), m('#0B6B4F', '#052A3A')]));
    if (dark < 0.6) K.rays(860, 120, 1900, t, C.cream, 0.35 * (1 - dark), 12);
    for (let i = 0; i < 6; i++) K.tree(((i * 330 - sc * 0.3) % 1980 + 1980) % 1980 - 300, 1010 + (i % 2) * 30, 1.25 + (i % 3) * 0.15, m('#1A8A5F', '#06323F'), m('#3AC88A', '#0A4A55'));
    K.hills(1090, 90, 1.5, m('#19A86A', '#083A45'), 0.003);
    for (let i = 0; i < 5; i++) K.tree(((i * 420 + 160 - sc * 0.6) % 2100 + 2100) % 2100 - 320, 1150 + (i % 2) * 24, 1.6 + (i % 2) * 0.2, m('#0B5B3F', '#04222F'), m('#19A86A', '#073A48'));
    K.hills(ground, 80, 4.1, m('#0B8B5F', '#062F3A'), 0.0025);
  };
  const rak = (x, y, s, t, ph = 0) => {   // rakshasa soldier silhouette, facing left
    ctx.save(); ctx.translate(x, y + Math.abs(Math.sin(t * 8 + ph)) * -8); ctx.scale(s, s); ctx.lineCap = 'round';
    const c = '#2A0418'; ctx.strokeStyle = c; ctx.lineWidth = 24; const w = Math.sin(t * 8 + ph) * 16;
    ctx.beginPath(); ctx.moveTo(-14, 10); ctx.lineTo(-14 - w, 90); ctx.moveTo(14, 10); ctx.lineTo(14 + w, 90); ctx.stroke();
    ell(0, -40, 50, 70, c); circle(0, -130, 42, c);
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 20, -160); ctx.lineTo(sd * 56, -210); ctx.lineTo(sd * 40, -150); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); }
    glow(-14, -134, 30, C.red, 0.9); circle(-14, -134, 6, '#FFD0D0');
    ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(-30, -60); ctx.lineTo(-80, -90 - w); ctx.stroke(); line([[-80, -90 - w], [-150, -200 - w]], '#C8D0F0', 9);
    ctx.restore();
  };
  const lotusRow = (lit, on, y = 1236) => { for (let i = 0; i < 10; i++) { const x = 135 + i * 90; if (i === lit && on > 0) { glow(x, y - 16, 110 * on, C.gold, 0.8); K.lotus(x, y + 4, 0.5 * on + 0.3, 1); } else K.lotus(x, y, 0.34, 0.6, '#B79AE8', '#7A5AC8'); } };

  // ── 0 · "Long ago, in the golden city of Ayodhya," ──────────────────────
  {
    add({ id: 'S01', at: 0, cam: [540, 820], zoom: 0.1, note: 'Ayodhya at sunrise: golden spires, river, title',
      draw(lt, d, t) {
        K.sky('gold'); const sy = lerp(900, 700, eo(seg(lt, 0, 3.6)));
        K.rays(540, sy, 1500, t, C.cream, 0.4); K.sun(540, sy, 250, t);
        K.clouds(420, t, rgba(C.cream, 0.5), 3, 4, 10, 0.7);
        R.towers(1040, { col: '#F2A04D', lit: C.cream, n: 9, seed: 2, s: 0.95 });
        K.palace(540, 1110, 1.05, '#D9601A', C.cream);
        R.towers(1210, { col: '#A8275A', lit: C.gold, n: 7, seed: 5, s: 0.6 });
        K.sea(1230, t, { cols: ['#FFB85C', '#B0277F'], amp: 12, rows: 7, crest: C.cream });
        for (let i = 0; i < 5; i++) K.bird(120 + i * 120 + lt * 40, 470 + (i % 2) * 50, 0.6, t + i, '#8A1F5A');
        K.motes(t, 30, C.cream, 0.8, 2);
        title(eo(seg(lt, 0.5, 1.5)) * (1 - seg(lt, d - 0.5, d)));
      } });
    cue(0.1, 'conch', { gain: 0.8 }); cue(0.6, 'bell'); cue(1.2, 'sparkle', { dur: 1.6, gain: 0.6 });
  }

  // ── 1 · "a prince was born to King Dasharatha, and his name was Rama." ──
  {
    const st = cut(1), nm = Wd('Rama', 1) - st;
    add({ id: 'S02', at: st, cam: [540, 820], zoom: 0.14, note: 'palace nursery: the glowing cradle, the king overjoyed',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FF8A9A', '#C8327F', '#5A1F9A', '#2A0E66']));
        for (const ax of [150, 540, 930]) { ctx.beginPath(); ctx.moveTo(ax - 150, 1200); ctx.lineTo(ax - 150, 520); ctx.bezierCurveTo(ax - 150, 330, ax - 40, 300, ax, 200); ctx.bezierCurveTo(ax + 40, 300, ax + 150, 330, ax + 150, 520); ctx.lineTo(ax + 150, 1200); ctx.closePath(); ctx.fillStyle = lg(0, 200, 0, 1200, ['#FFE9A8', '#FF9A6B', '#C8327F']); ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 10; ctx.stroke(); }
        const g = seg(lt, nm - 0.2, nm + 0.5);
        K.rays(540, 800, 1300, t, C.cream, 0.3 + 0.4 * g); K.mandala(540, 800, 420, t, C.gold, 0.4 + 0.3 * g, 3);
        ctx.fillStyle = lg(0, 1140, 0, 1920, ['#7B1FA8', '#2A0E66']); ctx.fillRect(-400, 1150, W + 800, 1200);
        R.hero(190, 1010, { look: LK.dasharatha, s: 0.6, hands: [[-150, -330], [150, -330]], eyes: 'closed', t });
        R.sita(890, 1020, { s: 0.6, sari: R.SARI.royal, hands: [[-18, -130], [18, -130]], pray: true, eyes: 'closed', t });
        R.cradle(540, 900, 0.95, t);
        glow(520, 790, 200 + 500 * g, C.cream, 0.5 * g);
        K.petals(t, 22, 4, 0.9);
        for (let i = 0; i < 8; i++) K.sparkle(540 + Math.cos(i * 0.8 + t) * 300 * g, 790 + Math.sin(i * 0.8 + t) * 220 * g, 28, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
      } });
    cue(st + 0.2, 'chime', { note: 2 }); cue(st + 0.8, 'chime', { note: 4 }); cue(st + nm, 'bell', { gain: 1.0 }); cue(st + nm, 'sparkle', { dur: 1.4 });
  }

  // ── 2 · "He was Vishnu himself, the seventh avatar," ────────────────────
  {
    const st = cut(2), sv = Wd('seventh', 2) - st;
    add({ id: 'S03', at: st, cam: [540, 760], zoom: 0.08, flash: true, note: 'Vishnu on the lotus; ten lotuses, the seventh lit',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 620, 1600, t, C.paleGold, 0.42, 18); K.mandala(540, 620, lerp(320, 580, eo(seg(lt, 0, 1.2))), t, C.gold, 0.75); glow(540, 620, 700, C.magenta, 0.35);
        K.vishnu(540, lerp(960, 860, eo(seg(lt, 0, 1))), 1.0, { t, tail: 0, arms: eo(seg(lt, 0.2, 1.2)) });
        K.lotus(540, 990, 2.3, 1);
        K.sea(1010, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 7, crest: C.gold });
        lotusRow(6, eob(seg(lt, sv - 0.15, sv + 0.2)));
        K.petals(t, 22, 3, 0.9);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + 0.2, 'sparkle', { dur: 1.6 }); cue(st + sv, 'bell', { gain: 1.0 });
  }

  // ── 3 · "born to end the terror of Ravana, the ten headed king of Lanka." ─
  {
    const st = cut(3), ten = Wd('ten', 3) - st;
    add({ id: 'S04', at: st, cam: [540, 760], zoom: 0.12, note: 'Ravana rises over the spires of Lanka, ten crowned heads',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0018', '#4A0028', '#B0103A', '#1A0020']));
        const fl = Math.max(0, 1 - Math.abs(lt - ten) * 4); fillAll(rgba('#FF8A6B', 0.3 * fl));
        K.clouds(240, t, rgba('#1A0020', 0.85), 2, 5, 30, 1.0);
        K.lightning(200, 5, fl, 700); K.lightning(900, 12, fl * 0.8, 600);
        R.towers(1290, { col: '#16030E', lit: C.orange, n: 8, seed: 3, s: 0.8 });
        K.motes(t, 40, C.red, 0.8, 4);
        R.ravana(555, lerp(1900, 930, eo(seg(lt, 0.1, 1.7))) + Math.sin(t * 1.6) * 8, 0.9, { t, sword: eo(seg(lt, ten, ten + 0.8)) });
        K.clouds(1560, t, rgba('#0A0018', 0.95), 9, 5, 40, 1.2);
        K.vignette(0.55, '#05000F');
      } });
    cue(st, 'rumble', { dur: 4.4, gain: 1.0 }); cue(st + 0.4, 'growl'); cue(st + ten, 'thunder', { gain: 0.8 }); cue(st + ten + 0.6, 'slam', { gain: 0.6 });
  }

  // ── 4 · "Rama grew up brave and gentle, and when he lifted the mighty bow of Shiva," ─
  const court = (t) => {
    fillAll(lg(0, 0, 0, H, ['#2A0E66', '#6B1FA8', '#C8327F', '#3A1280']));
    for (const px of [90, 990]) { rr(px - 60, 120, 120, 1200, 20); ctx.fillStyle = lg(px - 60, 0, px + 60, 0, ['#8A3A05', C.gold, C.cream, C.gold, '#8A3A05']); ctx.fill(); rr(px - 90, 90, 180, 60, 16); ctx.fillStyle = C.gold; ctx.fill(); }
    K.mandala(540, 760, 520, t, C.gold, 0.3, 4);
    ctx.fillStyle = lg(0, 1180, 0, 1920, ['#4A1580', '#1B0F5C']); ctx.fillRect(-400, 1190, W + 800, 1200);
    for (let i = 0; i < 14; i++) circle(40 + i * 78, 1300 + (i % 2) * 26, 50, '#1B0F5C');
  };
  {
    const st = cut(4), wh = Wd('when', 4) - st - 0.15, lf = Wd('lifted', 4) - st;
    add({ id: 'S05', at: st, cam: [560, 900], zoom: 0.1, note: 'young Rama in the palace garden, a fawn at his hand',
      draw(lt, d, t) {
        K.sky('newdawn'); K.sun(800, 430, 180, t); K.clouds(300, t, rgba(C.white, 0.8), 6, 4, 14, 0.7);
        K.hills(940, 220, 1.2, '#5ADC9A'); K.palace(250, 900, 0.5, '#E88A3D', C.cream); K.tree(960, 1080, 1.0, '#0B5B3F', '#19A86A');
        K.hills(1160, 110, 2.5, '#0B8B5F', 0.003);
        R.hero(400, 960, { look: LK.rama, s: 0.8, hands: [[-90, -40], [170, -60]], eyes: 'closed', t });
        K.deer(700, 1080, 1.0, t * 0.2, '#C9601A');
        for (let i = 0; i < 5; i++) K.sprout(120 + i * 210, 1250 + (i % 2) * 30, 0.8, 1, [C.pink, C.gold, C.coral][i % 3]);
        for (let i = 0; i < 3; i++) K.bird(200 + i * 130 + lt * 50, 380 + i * 40, 0.6, t + i, '#0B6B4F');
        K.motes(t, 24, C.cream, 0.8, 7);
      } });
    cue(st + 0.3, 'chime', { note: 1 }); cue(st + 0.9, 'chime', { note: 3 }); cue(st + 1.5, 'chime', { note: 5 });
    add({ id: 'S06', at: st + wh, cam: [540, 820], zoom: 0.12, note: 'the court of Mithila: Rama raises the great bow of Shiva',
      draw(lt, d, t) {
        court(t); const u = eio(seg(lt, lf - wh - 0.3, lf - wh + 0.9)), rot = lerp(-1.25, -0.12, u), by = lerp(1040, 800, u);
        glow(600, by, 500, C.cyan, 0.35 + 0.3 * u);
        R.bow(600, by, 1.7, rot, 0, { ornate: true });
        R.hero(430, 1010, { look: LK.rama, s: 0.8, hands: [[110, lerp(-30, -180, u)], [212, lerp(40, -262, u)]], eyes: 'open', lookX: 4, lookY: -3, t });
        for (let i = 0; i < 6; i++) K.sparkle(600 + Math.cos(i + t) * 300, by + Math.sin(i * 1.4 + t) * 300, 24, u * (0.5 + 0.5 * Math.sin(t * 5 + i)), C.cyan);
      } });
    cue(st + lf - 0.2, 'shimmer', { dur: 1.4 }); cue(st + lf, 'rumble', { dur: 1.2, gain: 0.6 });
  }

  // ── 5 · "it snapped in two," ────────────────────────────────────────────
  {
    const st = L(5) - 0.1, sn = Wd('snapped', 5) - st;
    add({ id: 'S07', at: st, cam: [600, 800], zoom: 0.16, tr: 0, note: 'CRACK: the bow breaks in a burst of light',
      draw(lt, d, t) {
        court(t); const p = seg(lt, sn - 0.05, sn + 0.5), sh = Math.sin(t * 60) * 10 * Math.max(0, 1 - Math.abs(lt - sn - 0.1) * 3);
        ctx.save(); ctx.translate(sh, 0);
        fillAll(rgba('#DFF6FF', 0.6 * Math.max(0, 1 - Math.abs(lt - sn) * 4)));
        K.rays(600, 800, 1500, t * 4, C.cyan, 0.6 * p * (1 - seg(lt, sn + 0.6, d)), 16);
        R.bow(600, 800, 1.7, -0.12, 0, { ornate: true, snap: eo(p) });
        R.hero(430, 1010, { look: LK.rama, s: 0.8, hands: [[110, -180], [212, -262]], eyes: p > 0 ? 'wide' : 'open', t });
        K.lightning(600, 4, Math.max(0, 1 - Math.abs(lt - sn) * 5), 800);
        for (let i = 0; i < 16; i++) { const an = i * TAU / 16, r = eo(p) * (200 + rnd(i) * 420); K.sparkle(600 + Math.cos(an) * r, 800 + Math.sin(an) * r, 34, p > 0 ? 1 - p * 0.7 : 0, i % 2 ? C.cyan : C.cream); }
        ctx.restore();
      } });
    cue(st + sn, 'thunder', { gain: 1.0 }); cue(st + sn, 'slam'); cue(st + sn + 0.2, 'sparkle', { dur: 1.0 });
  }

  // ── 6 · "and he won the hand of Princess Sita." ─────────────────────────
  {
    const st = cut(6), si = Wd('Sita', 6) - st;
    add({ id: 'S08', at: st, cam: [540, 860], zoom: 0.1, note: 'Rama and Sita, one garland around them both',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFC65C', '#FF7A9A', '#E0218A', '#5A1F9A']));
        K.rays(540, 760, 1500, t, C.cream, 0.4); K.mandala(540, 760, 540, t, C.cream, 0.5, 4);
        K.lotus(540, 1290, 3.6, 1);
        R.hero(370, 990, { look: LK.rama, s: 0.8, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', t });
        R.sita(710, 990, { s: 0.8, hands: [[-14, -120], [14, -120]], pray: true, eyes: 'closed', t });
        R.garland(330, 860, 750, 868, 150 * eo(seg(lt, 0, 0.8)), t);
        K.petals(t, 34, 2, 1);
        const g = seg(lt, si - 0.1, si + 0.5); for (let i = 0; i < 8; i++) K.sparkle(710 + Math.cos(i * 0.8 + t) * 190, 760 + Math.sin(i * 0.8 + t) * 190, 26, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
      } });
    cue(st, 'bell'); cue(st + 0.2, 'sparkle', { dur: 1.8, gain: 0.7 }); cue(st + si, 'chime', { note: 5 });
  }

  // ── 7 · "But on the eve of his crowning, his stepmother claimed an old promise from the king," ─
  {
    const st = cut(7), sm = Wd('stepmother', 7) - st - 0.25;
    add({ id: 'S09', at: st, cam: [540, 760], zoom: 0.14, note: 'the waiting throne and crown, lamps lit for tomorrow',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A1280', '#8A1FA8', '#E0507A', '#3A1280']));
        K.rays(540, 620, 1400, t, C.paleGold, 0.3); R.throne(540, 1060, 0.85);
        const cy = 800 + Math.sin(t * 1.5) * 10; glow(540, cy, 260, C.gold, 0.8);
        ctx.save(); ctx.translate(540, cy); ctx.scale(1.5, 1.5); ctx.beginPath(); ctx.moveTo(-60, 40); ctx.lineTo(-74, -40); ctx.lineTo(-36, -4); ctx.lineTo(0, -80); ctx.lineTo(36, -4); ctx.lineTo(74, -40); ctx.lineTo(60, 40); ctx.closePath(); ctx.fillStyle = lg(0, -80, 0, 40, [C.cream, C.gold, C.saffron]); ctx.fill(); rr(-64, 24, 128, 24, 8); ctx.fillStyle = C.paleGold; ctx.fill(); circle(0, -14, 12, C.red); circle(-40, 36, 6, C.cyan); circle(40, 36, 6, C.cyan); ctx.restore();
        for (const dx of [150, 930]) R.diya(dx, 1260, 1.2, t, 1, dx);
        K.motes(t, 24, C.paleGold, 0.8, 3);
      } });
    cue(st + 0.2, 'shimmer', { dur: 1.6, gain: 0.7 });
    add({ id: 'S10', at: st + sm, cam: [540, 860], zoom: 0.1, note: 'Queen Kaikeyi claims her promise; the old king crumples',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#120636', '#3A1280', '#7A1F6A', '#120636']));
        glow(760, 700, 620, C.red, 0.25);
        ctx.save(); ctx.globalAlpha = 0.5; R.throne(540, 1060, 0.85); ctx.restore(); fillAll(rgba('#120636', 0.45));
        const u = eio(seg(lt, 0.2, 1.4));
        R.hero(300, 1100, { look: LK.dasharatha, s: 0.78, kneel: true, lean: 0.35 * u, hands: [[-30, lerp(-60, -250, u)], [60, -30]], eyes: 'sad', t });
        R.sita(770, 1010, { s: 0.86, face: -1, sari: R.SARI.queen, skin: ['#B07A55', '#D49A6A', '#EDB98A'], hands: [[-60, -20], [lerp(70, 200, u), lerp(-30, -200, u)]], eyes: 'open', lookX: 3, t });
        K.vignette(0.6, '#07031F');
      } });
    cue(st + sm, 'rumble', { dur: 3.0, gain: 0.8 }); cue(st + sm + 0.9, 'thud', { gain: 0.5 });
  }

  // ── 8 · "fourteen years of exile in the forest." ────────────────────────
  {
    const st = cut(8);
    add({ id: 'S11', at: st, cam: [540, 900], zoom: 0.12, note: 'a pale path winds from the palace gate into the dark forest',
      draw(lt, d, t) {
        K.sky('night'); K.stars(t, 1, 4, 100, 800); glow(800, 380, 260, C.cream, 0.5); circle(800, 380, 90, C.cream); circle(840, 360, 80, '#1A0D52');
        K.hills(1000, 220, 2.2, '#150A4A');
        for (let i = 0; i < 7; i++) K.tree(-60 + i * 200, 1040 + (i % 2) * 40, 1.3 + (i % 3) * 0.2, '#0A0630', '#150A4A');
        K.hills(1180, 80, 1, '#0D0630', 0.003);
        ctx.beginPath(); ctx.moveTo(380, 1950); ctx.bezierCurveTo(420, 1500, 760, 1420, 600, 1220); ctx.bezierCurveTo(520, 1120, 560, 1080, 548, 1040); ctx.lineTo(560, 1040); ctx.bezierCurveTo(590, 1080, 620, 1130, 720, 1220); ctx.bezierCurveTo(940, 1420, 760, 1500, 760, 1950); ctx.closePath(); ctx.fillStyle = lg(0, 1040, 0, 1920, [rgba(C.paleGold, 0.9), rgba('#B79AE8', 0.5)]); ctx.fill();
        const a = eob(seg(lt, 0, 0.5));
        bigText('14', 320, 520, 330, { sc: a, a: clamp(a) }); bigText('YEARS', 320, 720, 70, { ls: 16, fill: C.cream, a: seg(lt, 0.3, 0.8) });
        for (let i = 0; i < 3; i++) { const s = 0.2 - i * 0.03; ctx.save(); ctx.globalAlpha = 0.9; R.hero(600 - i * 30 + (i === 1 ? 26 : 0), 1160 - i * 34, { look: i === 0 ? LK.lakshmana : LK.ramaForest, s, walk: true, t: t + i }); ctx.restore(); }
      } });
    cue(st, 'bell', { gain: 0.9 }); cue(st + 0.2, 'rumble', { dur: 2.0, gain: 0.6 });
  }

  // ── 9 · "Rama simply smiled and obeyed," ────────────────────────────────
  {
    const st = cut(9);
    add({ id: 'S12', at: st, cam: [540, 760], zoom: 0.12, note: 'Rama, serene: crown set aside, hands joined',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FFB85C', '#3AC88A', '#0B6B4F']));
        K.rays(540, 700, 1500, t, C.cream, 0.45); K.mandala(540, 700, 430, t, C.cream, 0.6, 3); glow(540, 700, 520, C.gold, 0.4);
        R.hero(540, 1190, { look: LK.ramaForest, s: 1.55, hands: [[-18, -124], [18, -124]], pray: true, eyes: 'closed', t });
        K.petals(t, 16, 6, 0.8); K.motes(t, 24, C.cream, 0.8, 8);
      } });
    cue(st + 0.2, 'chime', { note: 2 }); cue(st + 0.9, 'chime', { note: 4 });
  }

  // ── 10 · "and Sita and his brother Lakshmana walked beside him." ────────
  {
    const st = L(10) - 0.15;
    add({ id: 'S13', at: st, cam: [540, 880], zoom: 0.07, note: 'three travellers through the sunlit forest',
      draw(lt, d, t) {
        forest(t, 0, lt * 130);
        for (const [x, who, ph] of [[250, 'l', 0.5], [500, 's', 1.1], [760, 'r', 0]]) {
          const y = 960 + Math.abs(Math.sin(t * 7 + ph)) * -8;
          if (who === 's') R.sita(x, y + 4, { s: 0.62, sari: R.SARI.forest, walk: true, t: t + ph, hands: [[-60, -20], [60, -30]], lookX: 2 });
          else R.hero(x, y, { look: who === 'r' ? LK.ramaForest : LK.lakshmana, s: who === 'r' ? 0.66 : 0.62, walk: true, t: t + ph, lookX: 3 });
        }
        for (let i = 0; i < 4; i++) K.bird(160 + i * 200 - lt * 30, 330 + (i % 2) * 70, 0.6, t + i, '#0B5B3F');
        K.motes(t, 30, C.cream, 0.8, 5);
      } });
    for (let i = 0; i < 6; i++) cue(st + 0.3 + i * 0.5, 'tock', { gain: 0.4 });
  }

  // ── 11 · "One day, a dazzling golden deer lured Rama away," ─────────────
  {
    const st = cut(11), dz = Wd('dazzling', 11) - st;
    add({ id: 'S14', at: st, cam: [600, 860], zoom: 0.1, note: 'the golden deer bounds through the glade; Rama follows',
      draw(lt, d, t) {
        forest(t, 0.15, lt * 60);
        R.hero(lerp(-140, 240, seg(lt, 0.8, d)), 1010, { look: LK.ramaForest, s: 0.5, walk: true, t, lookX: 4 });
        const x = lerp(260, 820, eio(seg(lt, 0, d + 0.5))), y = 900 - Math.abs(Math.sin(lt * 3.2)) * 120;
        glow(x, y - 30, 380, C.gold, 0.7 * seg(lt, dz - 0.2, dz + 0.3) + 0.2);
        for (let i = 1; i < 9; i++) { const xx = x - i * 46; K.sparkle(xx, 900 - Math.abs(Math.sin((lt - i * 0.045) * 3.2)) * 120 - 40 + Math.sin(i * 3) * 30, 34 - i * 3, 1 - i / 9, i % 2 ? C.cream : C.gold); }
        K.deer(x, y, 1.45, t, '#FFB21F');
        for (let i = 0; i < 6; i++) circle(x - 60 + i * 30, y - 20 + (i % 2) * 18, 8, C.cream);
      } });
    cue(st + dz, 'shimmer', { dur: 2.0 }); cue(st + dz, 'bell', { gain: 0.6 }); cue(st + 0.6, 'boing', { gain: 0.4 }); cue(st + 1.6, 'boing', { gain: 0.4 });
  }

  // ── 12 · "and Ravana swooped down in his flying chariot," ───────────────
  {
    const st = cut(12);
    add({ id: 'S15', at: st, cam: [540, 860], zoom: 0.1, note: 'a shadow falls on the hut: Ravana\'s dark chariot descends on Sita',
      draw(lt, d, t) {
        const u = eio(seg(lt, 0, d));
        forest(t, 0.35 + 0.4 * u, 0); fillAll(rgba('#7A0A3A', 0.3 * u));
        R.hut(250, 1180, 1.0);
        R.sita(520, 1040, { s: 0.6, sari: R.SARI.forest, eyes: 'open', lookX: 3, hands: [[-60, lerp(-20, -200, u)], [60, lerp(-30, -220, u)]], t });
        ell(560, 1260, 300 * u, 50 * u, rgba('#05000F', 0.5));
        R.chariot(lerp(1500, 720, u), lerp(-100, 560, u), 0.72, t, { dark: true, rot: lerp(0.35, 0.05, u), face: -1, riders: () => R.ravana(0, -130, 0.3, { t, sword: 0.2 }) });
        K.vignette(0.3 + 0.3 * u, '#05000F');
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'rumble', { dur: 2.6 }); cue(st + 1.4, 'growl', { gain: 0.7 });
  }

  // ── 13 · "and carried Sita off across the sea." ─────────────────────────
  const redSky = (t) => { fillAll(lg(0, 0, 0, H * 0.8, ['#1A0030', '#7A0A4A', '#E0403A', '#FF9A4D'])); K.sun(540, 980, 240, t, { c2: C.orange, c3: C.red, glow: 0.4 }); K.clouds(260, t, rgba('#2A0430', 0.85), 2, 5, 80, 1.1); };
  {
    const st = cut(13);
    add({ id: 'S16', at: st, cam: [540, 800], zoom: 0.08, note: 'the chariot streaks over the ocean; Sita\'s jewels fall like stars',
      draw(lt, d, t) {
        redSky(t); const x = lerp(240, 820, seg(lt, 0, d + 0.4)), y = 640 + Math.sin(t * 2) * 14;
        for (let i = 0; i < 9; i++) { const p = ((t * 0.7 + i / 9) % 1); K.sparkle(x - 260 - p * 200 + Math.sin(i * 4) * 40, y + 40 + p * 480, 24 * (1 - p * 0.5), 1 - p, i % 2 ? C.gold : C.cream); }
        R.chariot(x, y, 0.72, t, { dark: true, rot: -0.08, riders: () => { R.ravana(70, -130, 0.28, { t, sword: 0.2 }); R.sita(-110, -110, { s: 0.42, sari: R.SARI.forest, face: -1, eyes: 'sad', hands: [[150, -250], [100, -280]], t }); } });
        K.sea(1080, t, { cols: ['#E0507A', '#2A0440'], amp: 30, rows: 7, speed: 3, crest: C.cream });
      } });
    cue(st, 'whoosh'); cue(st, 'waves', { dur: 2.4, gain: 0.8 }); cue(st + 0.4, 'sparkle', { dur: 1.6, gain: 0.5 });
  }

  // ── 14 · "The brave old eagle Jatayu fought to stop him, but could not." ─
  {
    const st = cut(14), bt = Wd('but', 14) - st - 0.2;
    add({ id: 'S17', at: st, cam: [540, 760], zoom: 0.1, note: 'Jatayu the eagle king dives at the chariot, talons and sparks',
      draw(lt, d, t) {
        redSky(t); const u = eio(seg(lt, 0, 1.3));
        R.chariot(840, 600 + Math.sin(t * 2) * 12, 0.56, t, { dark: true, rot: -0.05, riders: () => R.ravana(0, -130, 0.28, { t, sword: 0.9 }) });
        R.eagle(lerp(-200, 400, u), lerp(300, 720, u) + Math.sin(t * 3) * 12, 1.25, t, { rot: lerp(0.5, -0.1, u), flap: 9 });
        const hit = seg(lt, 1.2, 1.6); if (hit > 0) { for (let i = 0; i < 12; i++) K.sparkle(640 + Math.cos(i * 0.52) * 120 * hit, 640 + Math.sin(i * 0.52) * 120 * hit, 40, 1 - hit * 0.6, i % 2 ? C.gold : C.white); glow(640, 640, 240, C.cream, Math.sin(clamp((lt - 1.2) / 0.5) * PI)); }
        K.sea(1140, t, { cols: ['#E0507A', '#2A0440'], amp: 30, rows: 6, speed: 3, crest: C.cream });
      } });
    cue(st, 'conch', { gain: 0.6 }); cue(st + 0.2, 'whoosh'); cue(st + 1.3, 'slam', { gain: 0.8 });
    add({ id: 'S18', at: st + bt, cam: [540, 860], zoom: 0.08, pan: [0, 60], note: 'Jatayu falls, feathers drifting; the chariot shrinks into the distance',
      draw(lt, d, t) {
        redSky(t); fillAll(rgba('#1A0030', 0.3));
        R.chariot(lerp(820, 1000, seg(lt, 0, d)), lerp(420, 300, seg(lt, 0, d)), lerp(0.3, 0.16, seg(lt, 0, d)), t, { dark: true, glow: 0.3 });
        const u = seg(lt, 0, d + 0.3);
        R.eagle(lerp(420, 380, u), lerp(560, 1000, ei(u) * 0.6 + u * 0.4), 1.1, t, { rot: lerp(0.3, 1.5, u), flap: 2 });
        for (let i = 0; i < 12; i++) { const p = ((t * 0.3 + i / 12) % 1), fx = 300 + rnd(i) * 420 + Math.sin(t * 2 + i) * 50, fy = 420 + p * 800; ctx.save(); ctx.translate(fx, fy); ctx.rotate(t * 1.4 + i); ctx.globalAlpha = 1 - p; ell(0, 0, 12, 42, i % 2 ? '#FFE09A' : '#D9782A'); ctx.restore(); }
        K.sea(1180, t, { cols: ['#C0407A', '#2A0440'], amp: 26, rows: 6, speed: 2, crest: C.cream });
      } });
    cue(st + bt, 'slide', { dur: 1.6 }); cue(st + bt + 0.2, 'rumble', { dur: 1.6, gain: 0.5 });
  }

  // ── 15 · "Heartbroken, Rama searched the forests," ──────────────────────
  {
    const st = cut(15);
    add({ id: 'S19', at: st, cam: [520, 940], zoom: 0.12, note: 'blue dusk and rain: Rama kneels over a fallen jewel',
      draw(lt, d, t) {
        forest(t, 0.95, 0);
        R.hero(790, 980, { look: LK.lakshmana, s: 0.62, eyes: 'sad', face: -1, t });
        R.hero(430, 1090, { look: LK.ramaForest, s: 0.9, kneel: true, lean: 0.2, eyes: 'sad', hands: [[40, -70], [110, -60]], t });
        glow(520, 1010, 150, C.gold, 0.8); K.sparkle(520, 1010, 40 + Math.sin(t * 5) * 8, 1, C.gold); circle(520, 1010, 12, C.red);
        K.rain(t, 0.45, 150); K.vignette(0.45, '#030A2A');
      } });
    cue(st, 'rain', { dur: 3.2 }); cue(st + 0.3, 'bell', { gain: 0.5 });
  }

  // ── 16 · "until he met Hanuman, the mighty monkey hero, who vowed to find her." ─
  {
    const st = L(16) - 0.15, hn = Wd('Hanuman', 16) - st, vw = Wd('who', 16) - st - 0.2;
    add({ id: 'S20', at: st, cam: [540, 760], zoom: 0.12, note: 'sunrise: HANUMAN, mace on his shoulder, in a blaze of saffron',
      draw(lt, d, t) {
        K.sky('gold'); K.rays(540, 700, 1600, t, C.cream, 0.45, 16); K.sun(540, 700, 330, t); K.mandala(540, 700, 520, t, C.cream, 0.5, 3);
        K.mountain(180, 1500, 700, 620, '#C9501A', '#7A1F4A', false); K.mountain(900, 1500, 800, 700, '#D9601A', '#8A1F5A', false);
        K.hills(1280, 120, 1, '#5A1466', 0.003);
        const p = eob(seg(lt, hn - 0.35, hn + 0.15));
        R.hanuman(540, lerp(1500, 950, clamp(p)), { s: 0.98, t, mace: 0.5, hands: [[-150, -60], [150, -150]], eyes: 'open', tailCurl: 3.4 });
        K.motes(t, 26, C.cream, 0.8, 4);
      } });
    cue(st + hn - 0.3, 'conch', { gain: 1.0 }); cue(st + hn, 'slam', { gain: 0.5 }); cue(st + hn + 0.2, 'sparkle', { dur: 1.2 });
    add({ id: 'S21', at: st + vw, cam: [540, 900], zoom: 0.1, note: 'Hanuman kneels before Rama and takes his vow',
      draw(lt, d, t) {
        K.sky('gold'); K.sun(760, 520, 220, t); K.clouds(330, t, rgba(C.cream, 0.5), 4, 4, 12, 0.7);
        K.mountain(240, 1500, 800, 640, '#D9601A', '#8A1F5A', false); K.hills(1210, 130, 2, '#6A1670', 0.003);
        R.hero(720, 960, { look: LK.ramaForest, s: 0.78, face: -1, hands: [[-90, -40], [160, -170]], eyes: 'open', lookX: 3, lookY: 3, t });
        R.hanuman(310, 1110, { s: 0.72, kneel: true, t, lean: 0, hands: [[-22, -130], [22, -130]], pray: true, eyes: 'closed' });
        glow(560, 800, 220, C.gold, 0.5 + 0.2 * Math.sin(t * 3));
        K.motes(t, 26, C.cream, 0.8, 6);
      } });
    cue(st + vw + 0.2, 'bell', { gain: 0.7 });
  }

  // ── 17 · "With one giant leap, Hanuman crossed the ocean," ──────────────
  {
    const st = cut(17);
    add({ id: 'S22', at: st, cam: [600, 760], zoom: 0.1, note: 'THE LEAP: Hanuman flies over the sea, clouds streaking past',
      draw(lt, d, t) {
        K.sky('day'); K.sun(880, 380, 200, t);
        K.clouds(300, t, rgba(C.white, 0.9), 2, 6, 700, 0.9); K.clouds(560, t, rgba('#FFE9D0', 0.8), 7, 5, 1000, 0.7);
        K.mountain(lerp(140, -500, seg(lt, 0, d)), 1300, 700, 520, '#3AC88A', '#0B6B4F', false);
        K.sea(1080, t, { cols: [C.cyan, C.deep], amp: 30, rows: 7, speed: 6, wl: 190 });
        const u = eo(seg(lt, 0, 1.2)), x = lerp(120, 560, u), y = lerp(980, 660, u) + Math.sin(t * 2.2) * 16;
        ctx.save(); ctx.strokeStyle = rgba(C.white, 0.75); ctx.lineWidth = 8; ctx.lineCap = 'round'; for (let i = 0; i < 14; i++) { const ly = y - 260 + i * 40 + Math.sin(i * 7) * 14, lx = ((rnd(i) * 1300 - t * 1500) % 1400 + 1400) % 1400 - 200; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx - 150, ly + 26); ctx.stroke(); } ctx.restore();
        glow(x, y, 440, C.gold, 0.45);
        R.hanuman(x, y, { s: 0.9, rot: 1.28, t, hands: [[-40, -430], [40, -430]], eyes: 'fierce', tailCurl: 1.2 });
      } });
    cue(st, 'whoosh', { gain: 1.4 }); cue(st + 0.1, 'conch', { gain: 0.8 }); cue(st + 0.3, 'waves', { dur: 3.2, gain: 0.9 });
  }

  // ── 18 · "found Sita in a garden in Lanka, and gave her Rama's ring." ───
  const grove = (t) => {
    fillAll(lg(0, 0, 0, H, ['#0A0A4A', '#1F2A8A', '#0B6B7F', '#062F3A']));
    K.stars(t, 0.9, 6, 70, 700); glow(210, 330, 230, C.cream, 0.5); circle(210, 330, 80, C.cream);
    R.towers(1060, { col: '#150A40', lit: C.orange, n: 7, seed: 9, s: 0.6 });
    K.hills(1160, 100, 2, '#0B4B5F', 0.003);
    K.tree(700, 1160, 1.9, '#3A1F0A', '#0B6B4F');
    for (let i = 0; i < 26; i++) { const an = rnd(i) * TAU, r = rnd(i * 3) * 250; circle(700 + Math.cos(an) * r * 1.2, 480 + Math.sin(an) * r * 0.9 + 20, 14 + rnd(i * 5) * 8, i % 3 ? C.red : C.coral); }
    K.hills(1250, 70, 4, '#083A45', 0.0025);
  };
  {
    const st = cut(18), gv = Wd('gave', 18) - st - 0.2;
    add({ id: 'S23', at: st, cam: [620, 880], zoom: 0.12, note: 'the Ashoka grove by moonlight: Sita alone; Hanuman peers from the leaves',
      draw(lt, d, t) {
        grove(t);
        R.sita(600, 1090, { s: 0.85, sit: true, sari: R.SARI.forest, eyes: 'sad', hands: [[-60, 30], [60, 30]], t });
        const p = eo(seg(lt, 0.8, 1.5)); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 700); ctx.clip(); R.hanuman(430, lerp(900, 760, p), { s: 0.36, t, hands: [[-110, -200], [110, -200]], eyes: 'open', lookX: 3 }); ctx.restore();
        for (let i = 0; i < 6; i++) { const q = ((t * 0.25 + i / 6) % 1); ctx.save(); ctx.translate(520 + rnd(i) * 400, 560 + q * 600); ctx.rotate(t + i); ctx.globalAlpha = 1 - q; ell(0, 0, 16, 9, C.coral); ctx.restore(); }
        K.vignette(0.4, '#030A2A');
      } });
    cue(st + 0.2, 'chime', { note: 0 }); cue(st + 1.0, 'pop', { gain: 0.6 });
    add({ id: 'S24', at: st + gv, cam: [540, 860], zoom: 0.14, note: 'Rama\'s ring, shining between them; hope returns to Sita\'s face',
      draw(lt, d, t) {
        grove(t); fillAll(rgba('#0A0A4A', 0.3));
        const g = eo(seg(lt, 0.2, 1.0));
        R.hanuman(270, 1130, { s: 0.66, kneel: true, t, hands: [[150, -230], [200, -190]], eyes: 'open', lookX: 3 });
        R.sita(810, 1120, { s: 0.74, sit: true, face: -1, sari: R.SARI.forest, eyes: g > 0.5 ? 'open' : 'sad', lookX: 3, hands: [[lerp(60, 180, g), lerp(30, -150, g)], [lerp(-60, 120, g), lerp(30, -110, g)]], t });
        K.rays(540, 850, 900, t, C.paleGold, 0.5 * g, 12);
        R.ring(540, 850 + Math.sin(t * 2) * 8, lerp(0.7, 1.5, g), t);
        for (let i = 0; i < 8; i++) K.sparkle(540 + Math.cos(i * 0.8 + t) * 220, 850 + Math.sin(i * 0.8 + t) * 220, 24, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
      } });
    cue(st + gv + 0.3, 'bell', { gain: 0.9 }); cue(st + gv + 0.3, 'sparkle', { dur: 1.4 });
  }

  // ── 19 · "Then he set the demon city ablaze with his burning tail." ─────
  {
    const st = cut(19);
    add({ id: 'S25', at: st, cam: [540, 800], zoom: 0.1, note: 'Lanka burns: Hanuman vaults the rooftops trailing fire',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0018', '#5A0A2A', '#E0401A', '#FFB03D']));
        K.clouds(200, t, rgba('#1A0410', 0.85), 3, 6, 50, 1.2);
        R.towers(1120, { col: '#3A0A20', lit: C.gold, n: 8, seed: 3, s: 0.75 });
        const u = seg(lt, 0, d + 0.2);
        for (let i = 0; i < 9; i++) { const g = seg(u, i / 12, i / 12 + 0.25); if (g > 0) R.flame(40 + i * 125, 900 + (i % 3) * 70, (1.6 + (i % 2) * 0.8) * g, t, i); }
        R.towers(1420, { col: '#16030E', lit: C.orange, n: 7, seed: 11, s: 0.7 });
        for (let i = 0; i < 7; i++) { const g = seg(u, 0.15 + i / 12, 0.4 + i / 12); if (g > 0) R.flame(100 + i * 150, 1170 + (i % 2) * 60, 2.2 * g, t, i + 20); }
        const x = lerp(60, 1000, u), y = 640 - Math.abs(Math.sin(u * PI * 2.5)) * 240;
        for (let i = 1; i < 12; i++) { const uu = u - i * 0.015; glow(lerp(60, 1000, uu) - 90, 640 - Math.abs(Math.sin(uu * PI * 2.5)) * 240 + 20, 110 - i * 7, C.orange, 0.5 * (1 - i / 12)); }
        R.hanuman(x, y, { s: 0.5, rot: 0.7, t, hands: [[-60, -400], [60, -380]], eyes: 'fierce', fire: 1.6, tailCurl: 2 });
        K.motes(t, 50, C.orange, 0.9, 9);
      } });
    cue(st, 'whoosh'); cue(st + 0.2, 'sizzle', { dur: 3.2, gain: 1.6 }); cue(st + 0.3, 'rumble', { dur: 3.0 }); cue(st + 1.2, 'whoosh'); cue(st + 2.2, 'whoosh');
  }

  // ── 20 · "Back on the shore, an army of monkeys built a bridge of floating stones," ─
  {
    const st = cut(20), bl = Wd('built', 20) - st - 0.2;
    add({ id: 'S26', at: st, cam: [540, 900], zoom: 0.08, note: 'the vanara army hauls boulders down to the sea',
      draw(lt, d, t) {
        K.sky('dawn'); K.sun(820, 560, 190, t); K.clouds(330, t, rgba(C.pink, 0.45), 3, 4, 12, 0.7);
        K.sea(900, t, { cols: ['#FFB27A', '#5A1FA8'], amp: 16, rows: 5, bottom: 1100, crest: C.cream });
        K.hills(1120, 120, 2.2, '#5A1F8A', 0.0022);
        R.hero(150, 900, { look: LK.ramaForest, s: 0.42, hands: [[-90, -40], [170, -150]], t }); R.hero(60, 930, { look: LK.lakshmana, s: 0.4, t });
        for (let i = 0; i < 9; i++) { const x = ((i * 150 + lt * 170) % 1350) - 130, row = i % 3; R.monkey(x, 1030 + row * 80, 0.75 + row * 0.2, t, { carry: true, ph: i, col: ['#C9601A', '#A84A12', '#E0782A'][row] }); }
        K.hills(1330, 70, 5, '#2A0E66', 0.003);
      } });
    for (let i = 0; i < 5; i++) cue(st + 0.2 + i * 0.4, 'tock', { gain: 0.6 });
    add({ id: 'S27', at: st + bl, cam: [600, 760], zoom: 0.1, note: 'stone after stone floats: the bridge reaches for Lanka',
      draw(lt, d, t) {
        K.sky('dawn'); K.sun(280, 520, 170, t);
        ctx.save(); ctx.globalAlpha = 0.85; R.towers(820, { col: '#5A1466', lit: C.gold, n: 5, seed: 3, s: 0.34 }); ctx.restore();
        K.sea(800, t, { cols: ['#FF9A8A', '#3A1FA8'], amp: 18, rows: 10, crest: C.cream });
        const N = 11;
        for (let i = N - 1; i >= 0; i--) { const u = i / (N - 1), p = seg(lt, 0.1 + i * 0.2, 0.3 + i * 0.2); if (p <= 0) continue;
          const x = lerp(150, 880, u), y = lerp(1220, 850, Math.pow(u, 0.8)), s = lerp(0.85, 0.22, u);
          K.ripples(x, y + 30 * s, t + i, 2, 190 * s, C.white, 0.5);
          R.stone(x, y + K.bob(t, i, 5) + (1 - eob(p)) * -140, s, Math.sin(i * 3) * 0.08, true);
          K.splash(x, y, 200 * s, seg(lt, 0.25 + i * 0.2, 0.75 + i * 0.2), C.cream); }
        R.monkey(150, 1150, 0.9, t, { ph: 0 }); R.monkey(330, 1085, 0.7, t, { ph: 2, carry: lt < 1.2 });
      } });
    for (let i = 0; i < 9; i++) cue(st + bl + 0.25 + i * 0.2, 'plop', { gain: 0.8 });
    cue(st + bl, 'waves', { dur: 2.6, gain: 0.6 });
  }

  // ── 21 · "each one carved with Rama's name." ────────────────────────────
  {
    const st = cut(21), nm = Wd('name', 21) - st;
    add({ id: 'S28', at: st, cam: [540, 820], zoom: 0.16, note: 'close on one stone: राम carved in gold, afloat',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFB27A', '#E0508A', '#5A2FD0', '#1B0F5C']));
        K.sea(560, t, { cols: ['#FF9A8A', '#2A1F9A'], amp: 22, rows: 10, crest: C.cream });
        const g = seg(lt, nm - 0.3, nm + 0.3), y = 840 + K.bob(t, 0, 16);
        K.ripples(540, y + 110, t, 4, 520, C.white, 0.6);
        K.rays(540, y, 1100, t, C.paleGold, 0.45 * g, 14);
        R.stone(540, y, 2.2, Math.sin(t * 1.2) * 0.04, true, 0.4 + 0.5 * g);
        for (let i = 0; i < 8; i++) K.sparkle(540 + Math.cos(i * 0.8 + t) * 420, y + Math.sin(i * 0.8 + t) * 260, 30, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
      } });
    cue(st, 'bubbles', { dur: 1.0, gain: 0.5 }); cue(st + nm, 'bell', { gain: 1.0 }); cue(st + nm, 'sparkle', { dur: 1.0 });
  }

  // ── 22 · "They marched into Lanka, and a great battle shook the earth." ─
  {
    const st = cut(22), gr = Wd('great', 22) - st - 0.3;
    add({ id: 'S29', at: st, cam: [600, 860], zoom: 0.08, pan: [50, 0], note: 'the army crosses the bridge toward the dark gates',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H * 0.8, ['#2A0440', '#B0274A', '#FF8A3D', '#FFD27A']));
        R.towers(1010, { col: '#2A0418', lit: C.orange, n: 6, seed: 3, s: 0.8 });
        K.sea(1040, t, { cols: ['#E0507A', '#2A0440'], amp: 20, rows: 3, bottom: 1160, crest: C.cream });
        for (let i = 0; i < 9; i++) R.stone(-40 + i * 150, 1150 + K.bob(t, i, 4), 0.55, 0, false);
        R.hero(820, 890, { look: LK.ramaForest, s: 0.6, walk: true, t, hands: [[-90, -40], [150, -170]] });
        R.hanuman(610, 930, { s: 0.5, walk: true, t, mace: 0.3, hands: [[-110, -40], [130, -120]] });
        for (let i = 0; i < 8; i++) R.monkey(((i * 95 + lt * 110) % 560) - 60, 1110 - (i % 2) * 14, 0.8, t, { spear: true, ph: i, col: i % 2 ? '#A84A12' : '#C9601A' });
        K.sea(1200, t, { cols: ['#B0407A', '#1A0430'], amp: 26, rows: 6, crest: C.cream });
      } });
    for (let i = 0; i < 4; i++) cue(st + 0.2 + i * 0.3, 'thud', { gain: 0.45 }); cue(st + 0.1, 'conch', { gain: 0.8 });
    add({ id: 'S30', at: st + gr, cam: [540, 860], zoom: 0.1, tr: 0.25, note: 'BATTLE: monkeys and rakshasas collide, arrows rake the red sky',
      draw(lt, d, t) {
        const sh = Math.sin(t * 50) * 7; ctx.save(); ctx.translate(sh, Math.cos(t * 43) * 5);
        fillAll(lg(0, 0, 0, H, ['#3A0420', '#C0302A', '#FF8A3D', '#5A0A2A']));
        R.towers(1040, { col: '#2A0418', lit: C.orange, n: 6, seed: 7, s: 0.7 });
        K.clouds(980, t, rgba('#FFB07A', 0.5), 4, 5, 120, 0.9);
        for (let i = 0; i < 9; i++) { const p = ((t * 1.3 + i / 9) % 1); const ax = lerp(-100, 1200, p), ay = 300 + i * 46 - Math.sin(p * PI) * 140; line([[ax - 90, ay + 20 - Math.cos(p * PI) * 30], [ax, ay]], i % 3 ? C.cream : C.gold, 6); }
        K.hills(1230, 80, 2, '#3A0A20', 0.003);
        for (let i = 0; i < 5; i++) rak(700 + i * 90 + Math.sin(t * 3 + i) * 20, 1090 + (i % 2) * 70, 1.0 + (i % 2) * 0.25, t, i);
        for (let i = 0; i < 5; i++) R.monkey(80 + i * 90 + Math.sin(t * 3 + i) * 20, 1100 + (i % 2) * 70, 1.0 + (i % 2) * 0.2, t, { spear: true, ph: i, col: i % 2 ? '#A84A12' : '#E0782A' });
        const j = Math.abs(Math.sin(t * 3.2));
        R.hanuman(520, 860 - j * 150, { s: 0.62, t, mace: -0.6 + j * 1.6, hands: [[-150, -60], [150, -230]], eyes: 'fierce' });
        for (let i = 0; i < 6; i++) { const p = ((t * 1.7 + i / 6) % 1); K.sparkle(560 + Math.cos(i * 1.1) * 160 * p, 1010 + Math.sin(i * 1.1) * 110 * p, 44 * (1 - p), 1 - p, C.cream); }
        K.motes(t, 40, C.orange, 0.8, 3);
        ctx.restore();
      } });
    cue(st + gr, 'slam', { gain: 1.0 }); cue(st + gr, 'rumble', { dur: 2.2, gain: 1.2 }); cue(st + gr + 0.5, 'thunder', { gain: 0.6 }); cue(st + gr + 0.9, 'slam', { gain: 0.6 }); cue(st + gr + 1.4, 'slam', { gain: 0.6 });
  }

  // ── 23 · "At last, Rama drew a blazing arrow," ──────────────────────────
  const fallAt = Le(23) + 0.1;
  {
    const st = cut(23), dr = Wd('drew', 23) - st;
    add({ id: 'S31', at: st, cam: [600, 800], zoom: 0.16, note: 'Rama draws the bow: the arrowhead burns like a small sun',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0274A', '#FF9A3D', '#3A1280']));
        K.mandala(430, 760, 600, t, C.gold, 0.45, 4); K.rays(430, 760, 1500, t, C.paleGold, 0.3);
        const p = eio(seg(lt, dr - 0.3, dr + 0.6)), bx = 630, by = 700, hy = 950;
        ctx.save(); ctx.globalAlpha = 0.14 + 0.1 * p; K.vishnu(430, 860, 1.5, { t, tail: 0 }); ctx.restore();
        R.hero(430, hy, { look: LK.ramaForest, s: 0.95, hands: [[(bx - 105 * p - 430) / 0.95, (by + 12 * p - hy) / 0.95], [(bx + 16 - 430) / 0.95, (by - hy) / 0.95]], eyes: 'open', lookX: 5, t });
        R.bow(bx, by, 0.9, -0.1, p, { arrow: true, blaze: p });
        for (let i = 0; i < 8; i++) K.sparkle(bx + 300 - 117 * p + Math.cos(i + t * 2) * 90, by - 30 + Math.sin(i * 1.3 + t * 2) * 90, 26, p * (0.5 + 0.5 * Math.sin(t * 6 + i)));
      } });
    cue(st + dr - 0.2, 'slide', { dur: 0.9 }); cue(st + dr, 'shimmer', { dur: 1.4 }); cue(st + 0.1, 'conch', { gain: 0.7 });
    // ── 24 · "and Ravana fell." ───────────────────────────────────────────
    add({ id: 'S32', at: fallAt, cam: [560, 800], zoom: 0.1, tr: 0, note: 'the arrow strikes; Ravana topples in a storm of light, crowns scattering',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0274A', '#FF9A3D', '#3A1280']));
        const hit = 0.4, a = seg(lt, 0, hit), f = eio(seg(lt, hit, d + 0.2));
        R.towers(1300, { col: '#2A0418', lit: C.orange, n: 6, seed: 7, s: 0.7 });
        R.ravana(600 + f * 120, 950 + f * 500, 0.82, { t, rot: f * 0.75, a: 1 - f * 0.5, sword: lerp(0.9, 0, f) });
        if (a < 1) R.arrowFly(lerp(-200, 600, a), lerp(1000, 900, a), -0.12, 1.1, 1, t);
        else { const b = seg(lt, hit, hit + 0.8); K.rays(600, 900, 1700, t * 4, C.cream, 0.8 * (1 - b), 18); glow(600, 900, 300 + 1200 * eo(b), C.cream, 1 - b);
          for (let i = 0; i < 10; i++) { const an = -PI * (0.1 + 0.8 * i / 9), r = eo(b) * (300 + rnd(i) * 300); ctx.save(); ctx.translate(600 + Math.cos(an) * r, 760 + Math.sin(an) * r + b * b * 500); ctx.rotate(b * 6 + i); ctx.beginPath(); ctx.moveTo(-34, 20); ctx.lineTo(-40, -30); ctx.lineTo(-16, -8); ctx.lineTo(0, -44); ctx.lineTo(16, -8); ctx.lineTo(40, -30); ctx.lineTo(34, 20); ctx.closePath(); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore(); } }
      } });
    cue(fallAt, 'zip'); cue(fallAt + 0.4, 'slam', { gain: 1.3 }); cue(fallAt + 0.4, 'thunder', { gain: 0.9 }); cue(fallAt + 0.9, 'thud', { gain: 0.8 });
  }

  // ── 25 · "Rama and Sita were together again," ───────────────────────────
  {
    const st = L(25) - 0.12;
    add({ id: 'S33', at: st, cam: [540, 860], zoom: 0.12, flash: true, note: 'reunion at sunrise: hands joined, petals falling',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9A8A', '#E0508A', '#5A1F9A']));
        const sy = lerp(980, 720, eo(seg(lt, 0, 2))); K.rays(540, sy, 1600, t, C.cream, 0.45); K.sun(540, sy, 260, t);
        K.hills(1180, 120, 2, '#7A1F8A', 0.003);
        R.hero(370, 1000, { look: LK.ramaForest, s: 0.82, hands: [[-90, -40], [190, -110]], eyes: 'closed', t });
        R.sita(710, 1004, { s: 0.82, face: -1, sari: R.SARI.forest, hands: [[-70, -30], [196, -112]], eyes: 'closed', t });
        glow(540, 908, 150, C.cream, 0.7);
        R.hanuman(120, 1190, { s: 0.36, kneel: true, t, hands: [[-22, -130], [22, -130]], pray: true, eyes: 'closed' });
        R.hero(960, 1120, { look: LK.lakshmana, s: 0.4, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', t });
        K.petals(t, 36, 3, 1); K.motes(t, 24, C.cream, 0.8, 3);
      } });
    cue(st, 'bell', { gain: 1.0 }); cue(st + 0.2, 'sparkle', { dur: 2.0, gain: 0.7 });
  }

  // ── 26 · "and after fourteen long years, they flew home to Ayodhya," ────
  {
    const st = cut(26), fl = Wd('they', 26) - st - 0.2;
    add({ id: 'S34', at: st, cam: [540, 800], zoom: 0.08, note: 'fourteen lamps kindle one by one: the exile is over',
      draw(lt, d, t) {
        K.sky('dusk'); K.stars(t, 0.8, 3, 70, 700); K.sun(540, 1010, 230, t, { c2: C.orange, c3: C.magenta });
        K.hills(1080, 180, 2, '#4A1580');
        R.hero(430, 1090, { look: LK.lakshmana, s: 0.3, walk: true, t }); R.sita(535, 1092, { s: 0.3, sari: R.SARI.forest, walk: true, t: t + 1 }); R.hero(640, 1090, { look: LK.ramaForest, s: 0.32, walk: true, t: t + 2 });
        K.hills(1260, 80, 1, '#150A4A', 0.003);
        for (let i = 0; i < 14; i++) { const u = i / 13, x = 110 + u * 860, y = 620 - Math.sin(u * PI) * 240, on = seg(lt, 0.1 + i * (fl - 0.3) / 14, 0.25 + i * (fl - 0.3) / 14); R.diya(x, y, 0.62, t, eob(on), i); }
      } });
    for (let i = 0; i < 14; i++) cue(st + 0.1 + i * (fl - 0.3) / 14, 'chime', { gain: 0.5, note: i % 7 });
    add({ id: 'S35', at: st + fl, cam: [540, 760], zoom: 0.08, note: 'the golden Pushpaka sails home through the clouds',
      draw(lt, d, t) {
        K.sky('dusk'); K.stars(t, 0.9, 3, 80, 900); K.sun(240, 1100, 260, t, { c2: C.orange, c3: C.magenta });
        K.clouds(1050, t, rgba('#FF9AC0', 0.7), 2, 5, 200, 1.0);
        const x = lerp(340, 600, eo(seg(lt, 0, d + 0.5))), y = 800 + Math.sin(t * 1.6) * 16;
        R.chariot(x, y, 0.82, t, { rot: -0.06, glow: 0.7, riders: () => { R.hero(-110, -110, { look: LK.lakshmana, s: 0.36, t }); R.hero(-10, -116, { look: LK.ramaForest, s: 0.4, t }); R.sita(96, -112, { s: 0.38, sari: R.SARI.forest, t }); } });
        R.hanuman(x + 330, y - 290 + Math.sin(t * 2) * 10, { s: 0.26, rot: 1.2, t, hands: [[-40, -420], [40, -420]], tailCurl: 1.2 });
        K.clouds(1320, t, rgba('#FFD0E0', 0.85), 6, 5, 320, 1.1); K.clouds(330, t, rgba('#B07AE0', 0.5), 9, 4, 140, 0.8);
        for (let i = 0; i < 8; i++) { const p = ((t * 0.6 + i / 8) % 1); K.sparkle(x - 300 - p * 300, y + Math.sin(i * 3) * 80, 24 * (1 - p), 1 - p, C.gold); }
      } });
    cue(st + fl, 'whoosh'); cue(st + fl + 0.1, 'shimmer', { dur: 2.0 }); cue(st + fl + 0.2, 'conch', { gain: 0.6 });
  }

  // ── 27 · "where every street glowed with tiny lamps." ───────────────────
  const cityNight = (t, lit = 1) => {
    K.sky('night'); K.stars(t, 1, 8, 110, 900);
    glow(540, 1100, 900, C.orange, 0.3 * lit);
    R.towers(1040, { col: '#3A1680', lit: C.gold, n: 9, seed: 2, s: 0.95, dim: 1 - lit * 0.9 });
    K.palace(540, 1110, 1.05, '#2A0E66', mix('#3A1680', '#FFD27A', lit));
    R.towers(1210, { col: '#1B0F5C', lit: C.gold, n: 7, seed: 5, s: 0.6, dim: 1 - lit * 0.9 });
  };
  {
    const st = cut(27), gl = Wd('glowed', 27) - st;
    add({ id: 'S36', at: st, cam: [540, 900], zoom: 0.1, note: 'Ayodhya at night: lamps ripple across every roof and street',
      draw(lt, d, t) {
        const w = seg(lt, 0.2, gl + 0.8); cityNight(t, w);
        K.sea(1240, t, { cols: ['#5A2FD0', '#0D0630'], amp: 12, rows: 6, crest: C.gold, crestA: 0.6 });
        for (let i = 0; i < 46; i++) { const x = 40 + rnd(i) * 1000, y = 640 + rnd(i * 3) * 600, on = seg(w, x / 1400, x / 1400 + 0.12); if (on > 0) R.diya(x, y, 0.26 + rnd(i * 7) * 0.14, t, on, i); }
        for (let i = 0; i < 9; i++) { const on = seg(w, i / 12, i / 12 + 0.15); R.diya(70 + i * 118, 1226, 0.5, t, on, i + 50); }
        R.chariot(lerp(1100, 800, seg(lt, 0, d)), lerp(260, 420, seg(lt, 0, d)), 0.22, t, { glow: 0.8 });
      } });
    cue(st + 0.2, 'shimmer', { dur: 2.4 }); cue(st + gl, 'bell', { gain: 0.8 });
  }

  // ── 28 · "That night of lights is still celebrated as Diwali." ──────────
  {
    const st = cut(28), dw = Wd('Diwali', 28) - st;
    const fw = [[250, 420, 230, 0.2, C.gold], [820, 360, 260, 0.7, C.pink], [540, 560, 200, 1.2, C.cyan], [200, 700, 180, 1.7, C.leaf], [880, 680, 210, 2.1, C.saffron], [540, 330, 300, 2.6, C.magenta], [300, 520, 220, 3.0, C.cream]];
    add({ id: 'S37', at: st, cam: [540, 860], zoom: 0.1, note: 'DIWALI: fireworks bloom over the city, a row of lamps in front',
      draw(lt, d, t) {
        cityNight(t, 1);
        for (const [x, y, r, at, c] of fw) R.firework(x, y, r, seg(lt, at, at + 1.1), c);
        ctx.fillStyle = lg(0, 1160, 0, 1920, ['#3A1280', '#150A4A']); ctx.fillRect(-400, 1180, W + 800, 1200);
        K.mandala(540, 1420, 330, t, C.pink, 0.5, 3);
        for (let i = 0; i < 5; i++) R.diya(130 + i * 205, 1250 + Math.abs(i - 2) * -14, 1.25, t, 1, i);
        K.motes(t, 40, C.gold, 0.9, 6);
        const g = seg(lt, dw - 0.1, dw + 0.4); glow(540, 800, 900 * g, C.gold, 0.25 * g);
      } });
    for (const f of fw) { cue(st + f[3], 'pop', { gain: 1.0 }); cue(st + f[3] + 0.1, 'sparkle', { dur: 0.8, gain: 0.6 }); }
    cue(st + dw, 'bell', { gain: 1.0 });
  }

  // ── 29 · "Rama was crowned king, and his reign became an age of peace." ─
  {
    const st = cut(29), cr = Wd('crowned', 29) - st;
    add({ id: 'S38', at: st, cam: [540, 800], zoom: 0.12, note: 'the coronation: Rama and Sita enthroned, Hanuman at their feet',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9A6B', '#E0218A', '#4A1D96']));
        K.rays(540, 640, 1600, t, C.cream, 0.45, 18); K.mandala(540, 640, 600, t, C.cream, 0.55, 4);
        R.throne(540, 1040, 0.92);
        const k = lt > cr + 0.25;
        R.hero(425, 950, { look: k ? LK.ramaKing : LK.ramaForest, s: 0.66, kneel: true, hands: [[-100, -20], [150, -150]], eyes: 'closed', t });
        R.sita(665, 952, { s: 0.64, sit: true, sari: R.SARI.royal, hands: [[-60, 20], [60, 20]], eyes: 'closed', t });
        const g = seg(lt, cr, cr + 0.3) * (1 - seg(lt, cr + 0.5, cr + 1.2)); glow(425, 700, 300 * g, C.cream, g); K.sparkle(425, 690, 150 * g, g, C.white);
        R.hero(900, 1130, { look: LK.lakshmanaRoyal, s: 0.46, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', t });
        R.hanuman(190, 1200, { s: 0.5, kneel: true, t, hands: [[-22, -130], [22, -130]], pray: true, eyes: 'closed' });
        K.petals(t, 40, 5, 1);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + cr + 0.25, 'bell', { gain: 1.1 }); cue(st + cr + 0.25, 'sparkle', { dur: 1.6 });
  }

  // ── 30 · "This is Rama, the seventh avatar of Vishnu," ──────────────────
  {
    const st = cut(30), sv = Wd('seventh', 30) - st;
    add({ id: 'S39', at: st, cam: [540, 760], zoom: -0.06, note: 'the icon: Rama with his bow, Vishnu\'s form behind him; the seventh lotus lit',
      draw(lt, d, t) {
        K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700);
        K.rays(540, 640, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 640, 590, t, C.gold, 0.8); glow(540, 640, 700, C.magenta, 0.3);
        ctx.save(); ctx.globalAlpha = 0.4; K.vishnu(540, 900, 1.5, { t, tail: 0 }); ctx.restore();
        R.bow(770, 760, 0.95, 0.06, 0, {});
        R.hero(540, 840 + Math.sin(t * 1.2) * 6, { look: LK.ramaKing, s: 0.98, hands: [[-150, -150], [222, -80]], eyes: 'closed', t });
        K.sea(1175, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 6, crest: C.gold });
        lotusRow(6, eob(seg(lt, sv - 0.15, sv + 0.2)));
        K.petals(t, 20, 8, 0.8);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + sv, 'bell', { gain: 1.0 }); cue(st + sv, 'sparkle', { dur: 1.2 });
  }

  // ── 31 · "a reminder to do what is right, even when it is hard," ────────
  {
    const st = cut(31);
    add({ id: 'S40', at: st, cam: [600, 900], zoom: 0.1, note: 'one figure, one lamp, walking on through the dark forest',
      draw(lt, d, t) {
        forest(t, 1, lt * 90);
        const x = 520, y = 990 + Math.abs(Math.sin(t * 7)) * -8;
        glow(x + 120, y - 110, 620, C.gold, 0.5); glow(x + 120, y - 110, 300, C.cream, 0.4);
        R.hero(x, y, { look: LK.ramaForest, s: 0.82, walk: true, t, hands: [[-90, -40], [150, -100]], eyes: 'open', lookX: 4, holding: () => R.diya(150, -122, 0.7, t, 1, 2) });
        K.rain(t, 0.25, 90); K.motes(t, 20, C.gold, 0.7, 4); K.vignette(0.5, '#030A2A');
      } });
    cue(st, 'rain', { dur: 3.6, gain: 0.7 }); for (let i = 0; i < 6; i++) cue(st + 0.3 + i * 0.55, 'tock', { gain: 0.4 });
  }

  // ── 32 · "because the light always finds its way home." ─────────────────
  {
    const st = cut(32);
    add({ id: 'S41', at: st, cam: [540, 800], zoom: 0.08, tr: 0.6, note: 'cupped hands hold a single lamp before the glowing city; end title',
      draw(lt, d, t) {
        cityNight(t, 1); fillAll(rgba('#1A0D52', 0.35));
        for (const [x, y, r, at, c] of [[230, 520, 200, 1.0, C.gold], [850, 470, 230, 2.0, C.pink], [540, 420, 190, 3.2, C.cyan]]) R.firework(x, y, r, seg(lt, at, at + 1.3), c);
        K.rays(540, 880, 1300, t, C.paleGold, 0.35);
        K.hands(540, 1010, 1.15, t, { water: () => { ctx.fillStyle = lg(0, -100, 0, 80, ['#FFE9A8', '#FF9A3D', '#B5420A']); ctx.fillRect(-300, -120, 600, 240); } });
        glow(540, 900, 520, C.gold, 0.6);
        R.diya(540, 990, 2.3, t, 1, 1);
        K.motes(t, 40, C.gold, 0.9, 6);
        title(eo(seg(lt, Le(32) - st + 0.1, Le(32) - st + 1.0)), 200);
      } });
    cue(st, 'shimmer', { dur: 2.6 }); cue(st + 1.0, 'pop'); cue(st + 2.0, 'pop'); cue(Le(32) + 0.15, 'conch', { gain: 0.9 }); cue(Le(32) + 0.25, 'bell', { gain: 1.1 }); cue(Le(32) + 0.3, 'sparkle', { dur: 1.5 });
  }

  return { shots: S, cues: CUES };
}
