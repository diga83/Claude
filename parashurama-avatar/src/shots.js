// PARASHURAMA AVATAR: the shot list. One shot (or two) per narration line; everything lands on the voice's clock.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, bigText, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as Q from './core/kit3.js';
import * as M from './core/kit4.js';
import * as P from './core/kit6.js';

const PI = Math.PI;

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.25);

  const title = (a, y = 250) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    bigText('PARASHURAMA', 540, y, 106, { ls: 3, sc: lerp(0.9, 1, eo(a)) });
    bigText('THE SIXTH AVATAR OF VISHNU', 540, y + 104, 42, { ls: 8, fill: C.cream });
    line([[220, y + 156], [470, y + 156]], rgba(C.gold, 0.9), 4); line([[610, y + 156], [860, y + 156]], rgba(C.gold, 0.9), 4); K.lotus(540, y + 172, 0.34, 1);
    ctx.restore();
  };
  const lotusRow = (lit, on, y = 1236) => { for (let i = 0; i < 10; i++) { const x = 135 + i * 90; if (i === lit && on > 0) { glow(x, y - 16, 110 * on, C.gold, 0.8); K.lotus(x, y + 4, 0.5 * on + 0.3, 1); } else K.lotus(x, y, 0.34, 0.6, '#B79AE8', '#7A5AC8'); } };
  const forest = (t, dark = 0, sc = 0, ground = 1180) => {
    const m = (a, b) => mix(a, b, dark);
    fillAll(lg(0, 0, 0, H, [m('#FFF1B8', '#0A1A4A'), m('#9BE8A0', '#0B3B5F'), m('#2AB87A', '#0B3B4F'), m('#0B6B4F', '#052A3A')]));
    if (dark < 0.6) K.rays(860, 120, 1900, t, C.cream, 0.35 * (1 - dark), 12);
    for (let i = 0; i < 6; i++) K.tree(((i * 330 - sc * 0.3) % 1980 + 1980) % 1980 - 300, 1010 + (i % 2) * 30, 1.25 + (i % 3) * 0.15, m('#1A8A5F', '#06323F'), m('#3AC88A', '#0A4A55'));
    K.hills(1090, 90, 1.5, m('#19A86A', '#083A45'), 0.003);
    for (let i = 0; i < 4; i++) K.tree(((i * 520 + 60 - sc * 0.6) % 2100 + 2100) % 2100 - 320, 1150 + (i % 2) * 24, 1.6 + (i % 2) * 0.2, m('#0B5B3F', '#04222F'), m('#19A86A', '#073A48'));
    K.hills(ground, 80, 4.1, m('#0B8B5F', '#062F3A'), 0.0025);
  };
  const crimson = (t) => { fillAll(lg(0, 0, 0, H, ['#12001F', '#5A0A3A', '#E0401A', '#3A0A30'])); K.clouds(240, t, rgba('#1A0420', 0.85), 2, 5, 40, 1.1); K.motes(t, 40, C.orange, 0.8, 4); };
  const cosmos = (t) => { K.sky('cosmic'); K.stars(t, 1, 5, 130, 1800); };
  const rope = (a, b, sag = 30) => { const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u) + Math.sin(u * PI) * sag]); } line(pts, '#8A5A2A', 10); line(pts, '#D9A066', 4, [10, 10]); };

  // ── 0 · "Long ago, a boy was born to the sage Jamadagni," ───────────────
  {
    add({ id: 'S01', at: 0, cam: [540, 860], zoom: 0.1, note: 'a forest hermitage at dawn: the sage, his wife and their small son; title',
      draw(lt, d, t) {
        forest(t, 0.05, 0); R.hut(210, 1190, 1.0);
        R.hero(470, 980, { look: P.JAMAD, s: 0.66, hands: [[-90, -40], [130, -60]], eyes: 'closed', t });
        R.sita(830, 990, { s: 0.64, sari: R.SARI.forest, hands: [[-130, -40], [70, -30]], eyes: 'closed', t });
        P.pr(650, 1080, { boy: true, s: 0.36, hands: [[-150, -200], [150, -200]], t });
        K.petals(t, 20, 4, 0.9); K.motes(t, 24, C.cream, 0.8, 5);
        title(eo(seg(lt, 0.5, 1.5)) * (1 - seg(lt, d - 0.5, d)), 250);
      } });
    cue(0.1, 'conch', { gain: 0.8 }); cue(0.6, 'bell'); cue(1.2, 'sparkle', { dur: 1.6, gain: 0.6 });
  }

  // ── 1 · "with the calm of a priest, and the fire of a warrior." ─────────
  {
    const st = cut(1), fi = Wd('fire', 1) - st;
    add({ id: 'S02', at: st, cam: [540, 820], zoom: 0.1, note: 'one boy, two halves: cool lotus-blue on his left, leaping flame on his right',
      draw(lt, d, t) {
        const f = eo(seg(lt, fi - 0.3, fi + 0.5));
        ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, 940, 3000); ctx.clip(); fillAll(lg(0, 0, 0, H, ['#0A2A7A', '#1F8FE0', '#7AE0D0', '#0B6B7F'])); K.stars(t, 0.8, 3, 60, 700); glow(250, 420, 260, C.cream, 0.5); circle(250, 420, 80, C.cream);
        for (const [lx, ly, ls] of [[150, 1180, 0.9], [380, 1280, 0.7], [240, 760, 0.5]]) K.lotus(lx, ly + Math.sin(t * 1.5 + lx) * 6, ls, 1); K.ripples(260, 1230, t, 3, 200, C.white, 0.5); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.rect(540, -400, 940, 3000); ctx.clip(); fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0103A', '#FF6A1F', '#FFC83D']));
        for (let i = 0; i < 5; i++) R.flame(600 + i * 120, 1300 - (i % 2) * 60, (1.6 + (i % 3) * 0.6) * (0.5 + 0.5 * f), t, i); K.motes(t, 30, C.gold, 0.9, 7); ctx.restore();
        line([[540, -100], [540, 2000]], rgba(C.gold, 0.9), 6);
        glow(540, 800, 420, C.cream, 0.4);
        P.pr(540, 1010, { boy: true, s: 0.95, hands: [[-150, -150], [150, -230]], eyes: 'closed', t });
        K.lotus(540 - 150 * 0.95, 1010 - 164 * 0.95, 0.4, 1);
        R.bow(540 + 150 * 0.95, 1010 - 230 * 0.95, 0.62, 0.05, 0, {});
      } });
    cue(st, 'chime', { note: 1 }); cue(st + 0.5, 'chime', { note: 3 }); cue(st + fi, 'sizzle', { dur: 1.6, gain: 1.2 }); cue(st + fi, 'slam', { gain: 0.4 });
  }

  // ── 2 · "He prayed to Shiva for years, and Shiva gave him a blazing axe." ─
  {
    const st = cut(2), gv = Wd('gave', 2) - st - 0.5;
    add({ id: 'S03', at: st, cam: [540, 860], zoom: 0.1, note: 'snow peaks: he sits in prayer while suns and moons wheel overhead',
      draw(lt, d, t) {
        const day = 0.5 + 0.5 * Math.sin(lt * 4.2);
        fillAll(lg(0, 0, 0, H, [mix('#0A0A4A', '#3FA9F5', day), mix('#2A3FB8', '#9BE8E0', day), '#CFE6F8', '#EAF8FF'])); K.stars(t, 1 - day, 7, 90, 800);
        const a = lt * 4.2; K.sun(540 + Math.cos(a - PI / 2) * 480, 760 + Math.sin(a - PI / 2) * 480, 90, t); glow(540 - Math.cos(a - PI / 2) * 480, 760 - Math.sin(a - PI / 2) * 480, 160, C.cream, 0.6); circle(540 - Math.cos(a - PI / 2) * 480, 760 - Math.sin(a - PI / 2) * 480, 60, C.cream);
        K.mountain(180, 1500, 800, 820, '#EAF8FF', '#7A9AE0'); K.mountain(900, 1500, 860, 900, '#FFFFFF', '#8AA8E8'); K.mountain(540, 1560, 900, 560, '#F4FAFF', '#9AB8F0', false);
        P.pr(540, 1010, { s: 0.6, kneel: true, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', axe: false, t });
        for (let i = 0; i < 40; i++) circle((rnd(i) * 1200 + t * 30) % 1200 - 60, (rnd(i * 3) * 1400 + t * 90) % 1400, 4 + rnd(i * 7) * 4, rgba(C.white, 0.8));
      } });
    cue(st, 'bell', { gain: 0.6 }); for (let i = 0; i < 3; i++) cue(st + 0.3 + i * 0.6, 'tock', { gain: 0.4 });
    add({ id: 'S04', at: st + gv, cam: [540, 800], zoom: 0.1, flash: true, note: 'Shiva appears above the peaks and lowers a blazing axe into his hands',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0A4A', '#2A3FB8', '#7AC8F0', '#EAF8FF'])); K.stars(t, 0.9, 7, 90, 800); K.mandala(540, 560, 560, t, C.cyan, 0.45, 4);
        Q.shiva(540, 700, 0.66, { t });
        K.mountain(180, 1600, 800, 620, '#EAF8FF', '#7A9AE0'); K.mountain(920, 1600, 860, 660, '#FFFFFF', '#8AA8E8');
        const u = eo(seg(lt, 0.2, 1.3));
        K.rays(540, lerp(560, 1010, u), 900, t * 2, C.gold, 0.5, 14);
        P.axe(540, lerp(700, 1130, u), 0.8, lerp(-0.6, 0, u), 1);
        P.pr(540, 1280, { s: 0.6, kneel: true, hands: [[-60, -250], [60, -250]], eyes: 'open', lookY: -5, axe: false, t });
      } });
    cue(st + gv, 'conch', { gain: 1.0 }); cue(st + gv + 0.2, 'shimmer', { dur: 1.6 }); cue(st + gv + 1.2, 'bell', { gain: 1.0 });
  }

  // ── 3 · "From that day, he was called Parashurama, Rama with the axe." ──
  {
    const st = cut(3), nm = Wd('Parashurama', 3) - st;
    add({ id: 'S05', at: st, cam: [540, 760], zoom: 0.1, note: 'PARASHURAMA: the axe raised, fire and gold behind him',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0103A', '#FF8A1F', '#FFD27A'])); K.rays(540, 700, 1700, t, C.cream, 0.45, 18); K.mandala(540, 700, 580, t, C.cream, 0.55, 4);
        for (let i = 0; i < 6; i++) R.flame(60 + i * 190, 1420, 2.2, t, i);
        P.pr(500, 1000, { s: 1.12, hands: [[-150, -60], [170, lerp(-100, -260, eo(seg(lt, 0, 0.9)))]], axe: 0.12, t });
        const g = seg(lt, nm - 0.1, nm + 0.5); for (let i = 0; i < 10; i++) K.sparkle(540 + Math.cos(i * 0.63 + t) * 430, 700 + Math.sin(i * 0.63 + t) * 430, 34, g * (0.5 + 0.5 * Math.sin(t * 5 + i)));
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + nm, 'bell', { gain: 1.0 }); cue(st + nm, 'sparkle', { dur: 1.4 }); cue(st + 0.2, 'sizzle', { dur: 2.6, gain: 0.8 });
  }

  // ── 4 · "In those days, a king with a thousand arms ruled without mercy." ─
  {
    const st = cut(4), th = Wd('thousand', 4) - st;
    add({ id: 'S06', at: st, cam: [540, 800], zoom: 0.12, note: 'the thousand-armed king: a wheel of arms and weapons opens behind his throne',
      draw(lt, d, t) {
        crimson(t); R.towers(1300, { col: '#16030E', lit: C.orange, n: 8, seed: 3, s: 0.8 });
        const a = eo(seg(lt, th - 0.5, th + 0.5));
        ctx.save(); ctx.translate(540, 760); ctx.scale(lerp(0.3, 1, a), lerp(0.3, 1, a)); ctx.translate(-540, -760); P.king1000(540, 980, { s: 0.92, hands: [[-150, -60], [150, -60]], eyes: 'open', t }); ctx.restore();
        for (let i = 0; i < 4; i++) P.soldier(120 + i * 280, 1260, 0.8, t, { still: true, face: i < 2 ? 1 : -1 });
        K.vignette(0.5, '#0A0010');
      } });
    cue(st, 'rumble', { dur: 4.0 }); cue(st + th - 0.3, 'whoosh', { gain: 1.2 }); cue(st + th, 'growl'); cue(st + th + 0.3, 'slam', { gain: 0.6 });
  }

  // ── 5 · "One day he visited the sage's quiet home, and saw their wish granting cow." ─
  {
    const st = cut(5), sw = Wd('saw', 5) - st - 0.3;
    add({ id: 'S07', at: st, cam: [540, 880], zoom: 0.08, note: 'the king and his guards arrive in the peaceful glade; the old sage welcomes them',
      draw(lt, d, t) {
        forest(t, 0.1, 0); R.hut(860, 1190, 0.95);
        R.hero(700, 1000, { look: P.JAMAD, s: 0.6, face: -1, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', t });
        const x = lerp(-200, 320, eo(seg(lt, 0, 2.0)));
        for (let i = 0; i < 3; i++) P.soldier(x - 120 - i * 100, 1130 + (i % 2) * 30, 0.8, t, { ph: i, still: lt > 2 });
        R.hero(x, 980, { look: P.KING, s: 0.7, walk: lt < 2, hands: [[-90, -40], [130, -100]], eyes: 'open', lookX: 4, t });
      } });
    for (let i = 0; i < 4; i++) cue(st + 0.2 + i * 0.45, 'thud', { gain: 0.5 });
    add({ id: 'S08', at: st + sw, cam: [600, 860], zoom: 0.12, note: 'Kamadhenu, glowing softly among the trees; the king cannot look away',
      draw(lt, d, t) {
        forest(t, 0.2, 0); K.rays(620, 860, 1300, t, C.cream, 0.45, 14);
        Q.cow(600, 940 + Math.sin(t * 1.5) * 6, 1.25, t);
        for (let i = 0; i < 10; i++) K.sparkle(620 + Math.cos(i * 0.63 + t) * 400, 860 + Math.sin(i * 0.63 + t) * 320, 30, 0.5 + 0.5 * Math.sin(t * 5 + i));
        R.hero(lerp(-260, -40, eo(seg(lt, 0.3, 1.2))), 1150, { look: P.KING, s: 1.25, eyes: 'wide', lookX: 6, hands: [[-90, -40], [90, -40]], t });
      } });
    cue(st + sw, 'shimmer', { dur: 2.0 }); cue(st + sw + 0.2, 'bell', { gain: 0.7 });
  }

  // ── 6 · "She could conjure a feast for a whole army, out of thin air." ──
  {
    const st = cut(6);
    add({ id: 'S09', at: st, cam: [540, 900], zoom: 0.08, note: 'a river of sparks from the cow: dish after dish pops onto leaf plates before the soldiers',
      draw(lt, d, t) {
        forest(t, 0.15, 0);
        Q.cow(210, 900, 0.8, t);
        const N = 6;
        for (let i = 0; i < N; i++) { const p = eob(seg(lt, 0.3 + i * 0.3, 0.6 + i * 0.3)); if (p <= 0) continue; const x = 300 + (i % 3) * 250, y = 1130 + Math.floor(i / 3) * 130;
          ctx.save(); ctx.translate(x, y); ctx.scale(p, p); ell(0, 0, 110, 44, lg(-110, 0, 110, 0, ['#19A86A', '#5ADC9A', '#19A86A'])); line([[-100, 0], [100, 0]], rgba('#0B6B4F', 0.6), 4);
          circle(-40, -16, 34, C.cream); circle(30, -20, 26, [C.saffron, C.gold, C.coral][i % 3]); circle(64, 4, 18, [C.red, C.leaf, C.magenta][i % 3]); circle(-74, 8, 16, C.gold); glow(0, -20, 150, C.gold, 0.4); ctx.restore(); }
        const pts = []; for (let i = 0; i <= 20; i++) { const u = i / 20; pts.push([lerp(330, 900, u), 860 - Math.sin(u * PI) * 240 + Math.sin(u * 10 - t * 6) * 16]); }
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; line(pts, rgba(C.gold, 0.4), 40); ctx.restore(); for (let i = 0; i < 12; i++) { const p = ((t * 0.5 + i / 12) % 1); K.sparkle(lerp(330, 900, p), 860 - Math.sin(p * PI) * 240, 30, Math.sin(p * PI), C.cream); }
        for (let i = 0; i < 3; i++) P.soldier(980 - i * 40, 980 + i * 150, 0.9, t, { still: true, face: -1 });
      } });
    for (let i = 0; i < 6; i++) { cue(st + 0.3 + i * 0.3, 'pop', { gain: 0.8 }); cue(st + 0.35 + i * 0.3, 'chime', { gain: 0.5, note: i }); }
  }

  // ── 7 · "He wanted her, so he simply took her by force." ────────────────
  {
    const st = cut(7), tk = Wd('took', 7) - st;
    add({ id: 'S10', at: st, cam: [540, 900], zoom: 0.1, note: 'ropes on the gentle cow; soldiers haul her away as the sage pleads',
      draw(lt, d, t) {
        const u = eio(seg(lt, tk - 0.3, d + 0.3));
        forest(t, 0.3 + 0.3 * u, 0); fillAll(rgba('#7A0A3A', 0.25 * u)); R.hut(900, 1190, 0.9);
        R.hero(820, 1010, { look: P.JAMAD, s: 0.56, face: -1, eyes: 'sad', hands: [[-60, -200], [200, -180]], t });
        const cx = lerp(560, 300, u);
        rope([cx - 190, 890], [cx - 420, 990], 20);
        Q.cow(cx, 950, 0.9, t * 2);
        for (let i = 0; i < 2; i++) P.soldier(cx - 470 - i * 110, 1130, 0.9, t * 1.4, { ph: i, face: -1 });
        R.hero(120, 780, { look: P.KING, s: 0.4, hands: [[-90, -40], [170, -150]], t });
        for (let i = 0; i < 8; i++) { const p = ((t * 1.2 + i / 8) % 1); circle(cx + 150 + p * 160, 1110 - p * 60 + Math.sin(i * 3) * 20, 34 * (1 - p), rgba('#D9B88A', 0.5 * (1 - p) * u)); }
      } });
    cue(st + tk - 0.2, 'rumble', { dur: 2.4 }); cue(st + tk, 'slide', { dur: 1.6 }); cue(st + tk + 0.2, 'growl', { gain: 0.6 });
  }

  // ── 8 · "When Parashurama returned, he stormed the palace alone," ───────
  {
    const st = cut(8), sm = Wd('stormed', 8) - st - 0.3;
    add({ id: 'S11', at: st, cam: [540, 900], zoom: 0.12, note: 'home again: an empty tether, his father\'s bowed head; his eyes change',
      draw(lt, d, t) {
        const a = seg(lt, 0.9, 1.6); forest(t, 0.3, 0); fillAll(rgba('#B0103A', 0.35 * a)); R.hut(880, 1190, 0.9);
        line([[640, 1210], [640, 1100]], '#8A5A2A', 16); rope([640, 1110], [540, 1230], 30);
        R.hero(800, 1040, { look: P.JAMAD, s: 0.52, face: -1, eyes: 'sad', hands: [[-60, 10], [60, 10]], lean: 0.15, t });
        P.pr(lerp(-100, 300, eo(seg(lt, 0, 0.8))), 960, { s: 0.82, walk: lt < 0.8, eyes: a > 0.3 ? 'wide' : 'open', lookX: 5, hands: [[-90, -40], [150, lerp(-60, -200, a)]], blaze: a, t });
      } });
    cue(st + 0.9, 'slam', { gain: 0.6 }); cue(st + 0.9, 'rumble', { dur: 1.4 });
    add({ id: 'S12', at: st + sm, cam: [600, 860], zoom: 0.1, tr: 0.25, note: 'one man with an axe of fire against the whole palace guard',
      draw(lt, d, t) {
        crimson(t); R.towers(1040, { col: '#2A0418', lit: C.orange, n: 6, seed: 7, s: 0.8 }); K.palace(820, 1080, 0.7, '#3A0A20', C.orange);
        K.hills(1230, 80, 2, '#3A0A20', 0.003);
        for (let i = 0; i < 7; i++) P.soldier(620 + (i % 4) * 120 + Math.floor(i / 4) * 50, 1120 + Math.floor(i / 4) * 90, 0.8, t, { ph: i, face: -1 });
        ctx.strokeStyle = rgba(C.cream, 0.6); ctx.lineWidth = 9; ctx.lineCap = 'round'; for (let i = 0; i < 12; i++) { const y = 620 + i * 50, x = ((rnd(i) * 900 - t * 1600) % 900 + 900) % 900 - 300; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 180, y); ctx.stroke(); }
        const x = lerp(-100, 330, eo(seg(lt, 0, d)));
        for (let i = 1; i < 8; i++) glow(x - i * 50 + 130, 760, 150 - i * 12, C.orange, 0.4 * (1 - i / 8));
        P.pr(x, 1000 + Math.abs(Math.sin(t * 9)) * -14, { s: 0.8, walk: true, t: t * 1.4, lean: 0.14, hands: [[-150, -60], [170, -230]], axe: 0.5 });
      } });
    cue(st + sm, 'whoosh', { gain: 1.2 }); cue(st + sm, 'conch', { gain: 0.8 }); for (let i = 0; i < 4; i++) cue(st + sm + 0.2 + i * 0.3, 'thud', { gain: 0.6 });
  }

  // ── 9 · "defeated the thousand armed king, and brought the cow home." ───
  {
    const st = L(9) - 0.15, br = Wd('brought', 9) - st - 0.3;
    add({ id: 'S13', at: st, cam: [560, 820], zoom: 0.1, tr: 0.2, note: 'the axe sweeps in an arc of light; the wheel of arms flies apart',
      draw(lt, d, t) {
        const hit = 0.7, ex = seg(lt, hit, hit + 1.2), sh = Math.sin(t * 60) * 12 * Math.max(0, 1 - ex * 2) * (ex > 0 ? 1 : 0);
        ctx.save(); ctx.translate(sh, 0); crimson(t); fillAll(rgba('#FFE9C8', 0.5 * Math.max(0, 1 - Math.abs(lt - hit) * 5)));
        if (ex < 1) P.king1000(770 + ex * 120, 1020 + ex * 160, { s: 0.74, face: -1, a: 1 - ex, lean: -ex * 0.5, hands: [[-150, -200], [150, -200]], eyes: 'wide', t });
        if (ex > 0) { K.rays(700, 800, 1600, t * 4, C.cream, 0.7 * (1 - ex), 16); for (let i = 0; i < 26; i++) { const an = -PI * (0.05 + 0.9 * i / 25), r = eo(ex) * (300 + rnd(i) * 500); line([[770 + Math.cos(an) * r, 820 + Math.sin(an) * r + ex * ex * 300], [770 + Math.cos(an) * (r + 90), 820 + Math.sin(an) * (r + 90) + ex * ex * 300]], rgba('#C0304A', 1 - ex), 20); } }
        const u = ei(seg(lt, 0, hit));
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(C.cream, 0.9 * Math.max(0, 1 - Math.abs(lt - hit) * 2.4)); ctx.lineWidth = 46; ctx.beginPath(); ctx.arc(420, 860, 380, -PI * 0.75, -PI * 0.05); ctx.stroke(); ctx.restore();
        P.pr(lerp(60, 330, u), 1010 - Math.sin(u * PI) * 160, { s: 0.8, hands: [[-150, -60], [170, lerp(-300, -60, eo(seg(lt, hit - 0.15, hit + 0.15)))]], axe: lerp(-0.4, 1.5, eo(seg(lt, hit - 0.15, hit + 0.15))), t });
        ctx.restore();
      } });
    cue(st + 0.3, 'whoosh', { gain: 1.3 }); cue(st + 0.7, 'slam', { gain: 1.4 }); cue(st + 0.7, 'thunder', { gain: 0.9 }); cue(st + 0.9, 'sparkle', { dur: 1.2 });
    add({ id: 'S14', at: st + br, cam: [540, 880], zoom: 0.08, note: 'evening: he leads Kamadhenu home along the forest path',
      draw(lt, d, t) {
        K.sky('dusk'); K.sun(280, 880, 220, t, { c2: C.orange, c3: C.magenta }); K.hills(1010, 200, 2, '#6B1FA8');
        K.tree(900, 1100, 1.0, '#2A0E66', '#3D1690'); R.hut(880, 1210, 0.7); K.hills(1260, 90, 1.1, '#2A0E66', 0.002);
        const x = lerp(140, 380, seg(lt, 0, d));
        Q.cow(x, 1000, 0.8, t * 2); rope([x + 170, 920], [x + 300, 950], 16);
        P.pr(x + 340, 950, { s: 0.7, walk: true, t, hands: [[-60, 0], [130, -160]], axe: 0.1, blaze: 0.3 });
        K.motes(t, 24, C.paleGold, 0.7, 9);
      } });
    cue(st + br, 'bell', { gain: 0.7 }); for (let i = 0; i < 3; i++) cue(st + br + 0.3 + i * 0.5, 'tock', { gain: 0.4 });
  }

  // ── 10 · "But the king's sons took a cruel revenge, and his father was lost." ─
  {
    const st = cut(10), ls = Wd('father', 10) - st;
    add({ id: 'S15', at: st, cam: [540, 900], zoom: 0.1, note: 'night: torches close in on the hermitage; the old sage\'s lamp gutters and goes out',
      draw(lt, d, t) {
        const out = seg(lt, ls + 0.2, ls + 0.9);
        forest(t, 0.95, 0); fillAll(rgba('#7A0A2A', 0.25 * (1 - out))); R.hut(210, 1200, 0.9);
        R.hero(430, 1090, { look: P.JAMAD, s: 0.58, kneel: true, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', t });
        R.diya(560, 1210, 1.0, t, 1 - out, 1);
        if (out > 0) for (let i = 0; i < 6; i++) { const p = clamp(out * 1.4 - i * 0.08); circle(560 + Math.sin(p * 6 + i) * 20, 1160 - p * 260, 16 + p * 26, rgba('#B8C8E0', 0.4 * (1 - p))); }
        const x = lerp(1300, 880, eo(seg(lt, 0, 2.2)));
        for (let i = 0; i < 3; i++) { const px = x + i * 120, py = 1010 + (i % 2) * 40; ctx.save(); ctx.globalAlpha = 1 - out; R.hero(px, py, { look: P.PRINCE, s: 0.56, face: -1, hands: [[-90, -40], [130, -230]], eyes: 'open', walk: lt < 2.2, t: t + i }); R.flame(px - 73, py - 150, 0.5, t, i); ctx.restore(); }
        fillAll(rgba('#03041A', 0.55 * out)); K.vignette(0.5, '#01020F');
      } });
    cue(st, 'rumble', { dur: 3.4 }); cue(st + ls + 0.2, 'slide', { dur: 0.8, gain: 0.7 }); cue(st + ls + 0.6, 'bell', { gain: 0.5 });
  }

  // ── 11 · "Heartbroken, Parashurama made a vow, to free the earth from every tyrant." ─
  {
    const st = cut(11), vw = Wd('vow', 11) - st - 0.4;
    add({ id: 'S16', at: st, cam: [540, 940], zoom: 0.12, note: 'rain: he kneels beside the cold lamp',
      draw(lt, d, t) {
        forest(t, 1, 0); R.diya(640, 1230, 1.1, t, 0, 1);
        P.pr(470, 1110, { s: 0.95, kneel: true, lean: 0.25, eyes: 'sad', hands: [[40, -60], [120, -40]], axe: false, t });
        P.axe(250, 1250, 0.7, -1.3, 0.15);
        K.rain(t, 0.5, 160); K.vignette(0.5, '#01020F');
      } });
    cue(st, 'rain', { dur: 2.6 }); cue(st + 0.3, 'bell', { gain: 0.5 });
    add({ id: 'S17', at: st + vw, cam: [540, 780], zoom: 0.12, flash: true, note: 'THE VOW: he rises, axe to the sky, lightning answering',
      draw(lt, d, t) {
        const fl = Math.max(0, 1 - Math.abs(((lt * 0.8) % 1) - 0.1) * 6);
        fillAll(lg(0, 0, 0, H, ['#0A0420', '#3A0A5A', '#B0103A', '#FF6A1F'])); fillAll(rgba('#FFD0C8', 0.3 * fl));
        K.clouds(220, t, '#2A0A40', 1, 6, 80, 1.2); K.lightning(300 + (Math.floor(lt * 0.8) % 3) * 240, Math.floor(lt * 0.8) * 5 + 2, fl, 800);
        for (let i = 0; i < 3; i++) M.rings(540, 800, 1100, ((t * 0.6 + i / 3) % 1), C.orange, 1);
        K.hills(1280, 100, 2, '#1A0420', 0.003);
        P.pr(520, 1000, { s: 1.05, hands: [[-150, -60], [150, -300]], axe: 0, eyes: 'open', t });
        K.rain(t, 0.4, 140);
      } });
    cue(st + vw, 'thunder', { gain: 1.0 }); cue(st + vw, 'conch', { gain: 0.9 }); cue(st + vw + 1.3, 'thunder', { gain: 0.6 }); cue(st + vw, 'rain', { dur: 3.0 });
  }

  // ── 12 · "Twenty one times he crossed the land, and no cruel king could stand before his axe." ─
  {
    const st = cut(12), no = Wd('no', 12) - st - 0.3;
    add({ id: 'S18', at: st, cam: [540, 820], zoom: 0.08, note: 'he strides across the curve of the Earth; twenty-one marks light, one after another',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#0A0420', '#3A0A5A', '#B0103A', '#FF8A3D'])); K.stars(t, 0.6, 5, 80, 700);
        const n = clamp(Math.floor(seg(lt, 0.1, no - 0.2) * 21) + 1, 1, 21);
        for (let i = 0; i < 21; i++) { const u = i / 20, x = 110 + u * 860, y = 560 - Math.sin(u * PI) * 300, on = i < n; if (on) glow(x, y, 50, C.gold, 0.7); circle(x, y, on ? 17 : 11, on ? C.cream : rgba(C.cream, 0.3)); }
        bigText(String(n), 540, 520, 230, { sc: 1 + 0.08 * Math.sin(lt * 30) });
        ctx.save(); ctx.translate(540, 2500); ctx.rotate(-lt * 0.12); M.earth(0, 0, 1300, 0, 0); ctx.restore();
        P.pr(540, 880 + Math.abs(Math.sin(t * 8)) * -10, { s: 0.74, walk: true, t, hands: [[-150, -60], [170, -200]], axe: 0.3 });
      } });
    for (let i = 0; i < 21; i++) cue(st + 0.1 + i * (no - 0.3) / 21, 'tock', { gain: 0.5 }); cue(st, 'rumble', { dur: no });
    add({ id: 'S19', at: st + no, cam: [560, 860], zoom: 0.08, tr: 0.25, note: 'a row of thrones: tyrant after tyrant topples, crowns spinning away',
      draw(lt, d, t) {
        crimson(t); K.hills(1240, 80, 2, '#3A0A20', 0.003);
        for (let i = 0; i < 4; i++) { const f = eio(seg(lt, 0.2 + i * 0.4, 0.9 + i * 0.4)), x = 420 + i * 190, y = 1060 + (i % 2) * 40;
          rr(x - 70, y - 230, 140, 310, 24); ctx.fillStyle = lg(0, y - 230, 0, y + 80, ['#7A1F4A', '#2A0418']); ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.stroke(); circle(x, y - 236, 14, C.gold);
          ctx.save(); ctx.translate(x, y + 70); ctx.rotate(f * 1.3); ctx.globalAlpha = 1 - f * 0.6; R.hero(0, -70, { look: P.PRINCE, s: 0.5, kneel: true, eyes: 'wide', hands: [[-150, -280], [150, -280]], t }); ctx.restore();
          if (f > 0) P.crown(x + f * 120, y - 250 - Math.sin(f * PI) * 220, 0.6, f * 7, 1 - f * 0.4); }
        P.pr(190, 1010, { s: 0.8, hands: [[-150, -60], [170, -250 + Math.sin(t * 6) * 40]], axe: 0.2 + Math.sin(t * 6) * 0.3, t });
      } });
    for (let i = 0; i < 4; i++) { cue(st + no + 0.2 + i * 0.4, 'slam', { gain: 0.7 }); cue(st + no + 0.5 + i * 0.4, 'pop', { gain: 0.6 }); }
  }

  // ── 13 · "His anger burned like a forest fire." ─────────────────────────
  {
    const st = cut(13);
    add({ id: 'S20', at: st, cam: [540, 860], zoom: 0.12, note: 'a dark figure against a wall of flame',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#1A0010', '#7A0A1A', '#FF5A1F', '#FFC83D']));
        for (let i = 0; i < 7; i++) K.tree(-40 + i * 190, 1150 + (i % 2) * 40, 1.3, '#1A0410', '#2A0618');
        for (let i = 0; i < 8; i++) R.flame(40 + i * 150, 1260 - (i % 3) * 70, 2.4 + (i % 2) * 0.9, t, i);
        ctx.save(); ctx.filter = 'brightness(0.12)'; P.pr(540, 1010, { s: 1.0, hands: [[-150, -60], [170, -200]], axe: 0.2, blaze: 0, t }); ctx.filter = 'none'; ctx.restore();
        for (const sd of [-1, 1]) glow(540 + sd * 22, 1010 - 288, 26, C.gold, 1);
        for (let i = 0; i < 6; i++) R.flame(100 + i * 180, 1500, 3.0, t, i + 10);
        K.motes(t, 60, C.gold, 0.9, 3);
      } });
    cue(st, 'sizzle', { dur: 2.4, gain: 1.8 }); cue(st, 'rumble', { dur: 2.4 });
  }

  // ── 14 · "But when it was over, he laid his anger down, and gave away everything he had won," ─
  {
    const st = cut(14), gv = Wd('gave', 14) - st - 0.3;
    add({ id: 'S21', at: st, cam: [540, 900], zoom: 0.1, note: 'the fire sinks to embers and a cool dawn comes up; he kneels and lowers the axe',
      draw(lt, d, t) {
        const u = eio(seg(lt, 0.2, 2.6));
        fillAll(lg(0, 0, 0, H, [mix('#1A0010', '#2B1466', u), mix('#7A0A1A', '#5A6FE0', u), mix('#FF5A1F', '#FF9AC0', u), mix('#FFC83D', '#FFD9A0', u)]));
        K.stars(t, 0.6 * u, 4, 60, 600); K.sun(540, lerp(1400, 980, u), 220, t, { glow: 0.4 * u });
        K.hills(1100, 180, 2, mix('#2A0618', '#5A3A9A', u));
        for (let i = 0; i < 7; i++) R.flame(60 + i * 170, 1300, 2.0 * (1 - u), t, i);
        K.hills(1290, 80, 1, mix('#1A0410', '#2A1466', u), 0.003);
        P.pr(500, 1100, { s: 0.92, kneel: true, lean: 0.15 * u, eyes: 'closed', hands: [[-60, lerp(-60, 20, u)], [150, lerp(-200, 40, u)]], axe: lerp(0.2, 1.45, u), blaze: 1 - u, t });
        K.motes(t, 30, C.cream, 0.7 * u, 5);
      } });
    cue(st, 'slide', { dur: 2.0, gain: 0.6 }); cue(st + 1.6, 'bell', { gain: 0.7 }); cue(st + 0.5, 'shimmer', { dur: 2.0, gain: 0.5 });
    add({ id: 'S22', at: st + gv, cam: [540, 880], zoom: 0.1, note: 'he places the whole Earth in an old sage\'s hands and steps back with nothing',
      draw(lt, d, t) {
        fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9AC0', '#B07AE8', '#5A2FD0'])); K.rays(540, 800, 1600, t, C.cream, 0.4, 16); K.mandala(540, 800, 520, t, C.cream, 0.45, 4);
        K.hills(1250, 90, 2, '#5A2FB0', 0.003);
        const u = eio(seg(lt, 0.2, 1.4)), ex = lerp(400, 690, u), ey = lerp(800, 880, u);
        K.sage(760, 1150, 0.95, { halo: 1 });
        P.pr(280, 1010, { s: 0.82, hands: [[-90, -40], [lerp(170, 110, u), lerp(-240, -80, u)]], eyes: 'closed', axe: false, t });
        M.earth(ex, ey + Math.sin(t * 2) * 6, 110, t, 0);
        K.petals(t, 26, 4, 0.9);
      } });
    cue(st + gv, 'shimmer', { dur: 1.8 }); cue(st + gv + 1.3, 'bell', { gain: 0.8 });
  }

  // ── 15 · "and cast his axe into the sea, where the waters drew back, and new land rose." ─
  {
    const st = cut(15), wh = Wd('where', 15) - st - 0.3;
    add({ id: 'S23', at: st, cam: [600, 800], zoom: 0.08, note: 'from a cliff he hurls the axe; it wheels across the sunset and into the sea',
      draw(lt, d, t) {
        K.sky('dusk'); K.sun(760, 900, 240, t, { c2: C.orange, c3: C.magenta }); K.clouds(330, t, rgba(C.pink, 0.4), 4, 4, 14, 0.8);
        K.sea(940, t, { cols: ['#FF9A8A', '#3A1FA8'], amp: 20, rows: 8, crest: C.cream });
        ctx.beginPath(); ctx.moveTo(-100, 1950); ctx.lineTo(-100, 880); ctx.quadraticCurveTo(200, 860, 330, 940); ctx.quadraticCurveTo(300, 1300, 420, 1950); ctx.closePath(); ctx.fillStyle = lg(0, 880, 0, 1920, ['#5A1F8A', '#1B0F5C']); ctx.fill();
        const u = seg(lt, 0.5, 1.9), ax = lerp(300, 900, u), ay = 640 - Math.sin(u * PI) * 380 + u * 330;
        P.pr(170, 620, { s: 0.74, hands: [[-150, -60], [u > 0 ? 200 : 100, u > 0 ? -150 : -300]], axe: false, lean: u > 0 ? 0.15 : -0.1, t });
        if (lt < 0.5) P.axe(170 + 0.74 * 100, 620 - 0.74 * 300, 0.6, -0.4, 1);
        else if (u < 1) { for (let i = 1; i < 8; i++) { const q = Math.max(0, u - i * 0.03); glow(lerp(300, 900, q), 640 - Math.sin(q * PI) * 380 + q * 330 - 120, 110 - i * 10, C.orange, 0.5 * (1 - i / 8)); } P.axe(ax, ay, 0.6, u * 16, 1); }
        K.splash(900, 960, 420, seg(lt, 1.9, 2.9), C.cream);
      } });
    cue(st + 0.5, 'whoosh', { gain: 1.3 }); cue(st + 1.9, 'plop', { gain: 1.4 }); cue(st + 1.9, 'waves', { dur: 2.0, gain: 1.0 });
    add({ id: 'S24', at: st + wh, cam: [540, 860], zoom: 0.08, note: 'the sea pulls back and a green coast rises, palms springing up along it',
      draw(lt, d, t) {
        K.sky('newdawn'); K.sun(800, 460, 190, t); K.clouds(300, t, rgba(C.white, 0.85), 6, 4, 16, 0.7);
        const u = eio(seg(lt, 0.1, 2.4));
        K.mountain(200, 1300, 700, lerp(100, 520, u), '#5ADC9A', '#0B6B4F', false); K.mountain(620, 1300, 800, lerp(60, 400, u), '#3AC88A', '#0B5B4F', false);
        K.hills(lerp(1400, 1040, u), 140, 2, '#2AB87A'); K.hills(lerp(1500, 1160, u), 90, 4, '#19A86A', 0.003);
        for (let i = 0; i < 6; i++) P.palm(90 + i * 150, lerp(1500, 1150, u) - (i % 2) * 30, 0.8 + (i % 3) * 0.15, t, eob(seg(u, 0.3 + i * 0.1, 0.6 + i * 0.1)));
        ctx.save(); ctx.translate(lerp(0, 520, u), 0); K.sea(1010, t, { cols: [C.cyan, C.ocean], amp: 20, rows: 8, speed: 2 }); ctx.fillStyle = '#FFE9B8'; ctx.restore();
        ctx.beginPath(); ctx.moveTo(lerp(-400, 120, u), 1950); ctx.bezierCurveTo(lerp(-300, 300, u), 1300, lerp(-200, 520, u), 1200, lerp(-100, 600, u), 1010); ctx.lineTo(lerp(-400, 80, u), 1010); ctx.closePath(); ctx.fillStyle = rgba('#FFE9B8', 0.9 * u); ctx.fill();
        P.axe(lerp(900, 640, u), 1140, 0.5, 0.3, 0.8); K.sparkle(lerp(900, 640, u) + 70, 960, 50, 0.6 + 0.4 * Math.sin(t * 5), C.white);
      } });
    cue(st + wh, 'waves', { dur: 3.0, gain: 1.1 }); cue(st + wh + 0.3, 'rumble', { dur: 2.0, gain: 0.7 }); for (let i = 0; i < 6; i++) cue(st + wh + 0.9 + i * 0.22, 'chime', { gain: 0.5, note: i });
  }

  // ── 16 · "Then he climbed a mountain to meditate, where it is said he lives to this day," ─
  const summit = (t, glowA = 1) => {
    K.sky('night'); K.stars(t, 1, 8, 140, 1200);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { const pts = []; for (let k = 0; k <= 20; k++) { const u = k / 20; pts.push([u * 1200 - 60, 360 + i * 60 + Math.sin(u * 5 + t * 0.6 + i) * 70]); } line(pts, rgba([C.leaf, C.cyan, C.violet, C.pink, C.aqua][i], 0.22), 60); } ctx.restore();
    glow(840, 300, 240, C.cream, 0.5); circle(840, 300, 80, C.cream);
    K.mountain(160, 1700, 900, 700, '#3A2A8A', '#150A4A'); K.mountain(940, 1700, 900, 760, '#4A3A9A', '#1B0F5C'); K.mountain(540, 1900, 1100, 1150, '#6A5AC0', '#241A5E');
    glow(540, 700, 300 * glowA, C.gold, 0.6 * glowA);
  };
  {
    const st = cut(16), md = Wd('meditate', 16) - st;
    add({ id: 'S25', at: st, cam: [540, 760], zoom: 0.1, note: 'a tiny figure climbs the great peak and sits at the summit beneath the aurora',
      draw(lt, d, t) {
        const u = eio(seg(lt, 0, md)); summit(t, seg(lt, md, md + 0.8));
        const x = lerp(260, 540, u) + Math.sin(u * 9) * 50 * (1 - u), y = lerp(1500, 860, u);
        if (u < 1) P.pr(x, y - 80, { s: 0.3, walk: true, t, hands: [[-90, -40], [130, -150]], axe: false });
        else P.pr(540, 800, { s: 0.36, kneel: true, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', axe: false, t });
      } });
    cue(st, 'bell', { gain: 0.7 }); cue(st + md, 'shimmer', { dur: 2.4, gain: 0.7 }); for (let i = 0; i < 4; i++) cue(st + 0.2 + i * 0.4, 'tock', { gain: 0.35 });
  }

  // ── 17 · "waiting to teach the heroes yet to come." ─────────────────────
  {
    const st = cut(17);
    add({ id: 'S26', at: st, cam: [540, 860], zoom: 0.1, note: 'sunrise on the summit: three young warriors kneel before the old teacher',
      draw(lt, d, t) {
        K.sky('dawn'); K.rays(540, 760, 1600, t, C.cream, 0.4, 16); K.sun(540, 760, 250, t);
        K.mountain(120, 1500, 700, 500, '#B07AE8', '#5A2FB0'); K.mountain(980, 1500, 700, 560, '#C08AF0', '#6A3FC0');
        ell(540, 1330, 700, 220, lg(0, 1110, 0, 1550, ['#8A6AD0', '#3A1F78']));
        P.pr(540, 1010, { s: 0.74, kneel: true, hands: [[-100, -20], [150, -160]], eyes: 'closed', axe: false, t });
        const looks = [R.LOOK.lakshmana, R.LOOK.ramaForest, Q.DEVA[2]];
        for (let i = 0; i < 3; i++) { const p = eo(seg(lt, 0.2 + i * 0.3, 0.9 + i * 0.3)); ctx.save(); ctx.globalAlpha = p; R.hero(250 + i * 290, 1250 + (i === 1 ? 50 : 0) + (1 - p) * 60, { look: looks[i], s: 0.4, kneel: true, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', t }); ctx.restore(); }
        K.petals(t, 20, 5, 0.9);
      } });
    for (let i = 0; i < 3; i++) cue(st + 0.2 + i * 0.3, 'chime', { note: i * 2 + 1 }); cue(st, 'conch', { gain: 0.7 });
  }

  // ── 18 · "This is Parashurama, the sixth avatar of Vishnu," ─────────────
  {
    const st = cut(18), sx = Wd('sixth', 18) - st;
    add({ id: 'S27', at: st, cam: [540, 760], zoom: -0.06, note: 'the icon: Parashurama with his axe, Vishnu\'s form behind him; the sixth lotus lit',
      draw(lt, d, t) {
        cosmos(t); K.rays(540, 620, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 620, 590, t, C.gold, 0.8); glow(540, 620, 700, C.magenta, 0.3);
        ctx.save(); ctx.globalAlpha = 0.4; K.vishnu(540, 900, 1.5, { t, tail: 0 }); ctx.restore();
        P.pr(510, 840 + Math.sin(t * 1.2) * 6, { s: 0.98, hands: [[-150, -150], [190, -120]], axe: 0.05, eyes: 'closed', t });
        K.sea(1175, t, { cols: ['#7B3FE4', '#150A4A'], amp: 16, rows: 6, crest: C.gold });
        lotusRow(5, eob(seg(lt, sx - 0.15, sx + 0.2)));
        K.petals(t, 20, 8, 0.8);
      } });
    cue(st, 'conch', { gain: 1.0 }); cue(st + sx, 'bell', { gain: 1.0 }); cue(st + sx, 'sparkle', { dur: 1.2 });
  }

  // ── 19 · "a reminder that true strength protects the weak, and knows when to lay its weapon down." ─
  {
    const st = cut(19), ly = Wd('lay', 19) - st;
    add({ id: 'S28', at: st, cam: [540, 880], zoom: 0.07, tr: 0.6, note: 'a quiet shore: the axe planted in the sand, a lotus opening at its foot; end title',
      draw(lt, d, t) {
        K.sky('dusk'); K.stars(t, 0.7, 3, 70, 700); K.rays(540, 940, 1600, t, C.cream, 0.35); K.sun(540, 940, 260, t, { c2: C.orange, c3: C.magenta });
        K.sea(1000, t, { cols: ['#FF9A8A', '#3A1FA8'], amp: 12, rows: 4, bottom: 1140, crest: C.cream, speed: 0.6 });
        K.hills(1210, 90, 2, '#3A1680', 0.002);
        for (const [px, ps] of [[90, 1.0], [990, 1.1]]) P.palm(px, 1230, ps, t, 1);
        const u = eio(seg(lt, ly - 0.6, ly + 0.5));
        P.axe(700, 1250, 0.7, lerp(0.5, 0.12, u), lerp(0.8, 0.25, u));
        K.lotus(700, 1262, 0.9 * eob(seg(lt, ly + 0.2, ly + 1.0)), 1); Q.cow(250, 1110, 0.5, t);
        P.pr(470, 1130, { s: 0.6, kneel: true, hands: [[-16, -128], [16, -128]], pray: true, eyes: 'closed', axe: false, t });
        for (let i = 0; i < 3; i++) K.bird(300 + i * 150 + lt * 30, 430 + (i % 2) * 50, 0.6, t + i, '#3A1680');
        K.motes(t, 30, C.paleGold, 0.8, 6);
        title(eo(seg(lt, Le(19) - st + 0.15, Le(19) - st + 1.0)), 230);
      } });
    cue(st, 'waves', { dur: 4.0, gain: 0.5 }); cue(st + ly, 'thud', { gain: 0.5 }); cue(st + ly + 0.3, 'chime', { note: 4 });
    cue(Le(19) + 0.2, 'conch', { gain: 0.9 }); cue(Le(19) + 0.3, 'bell', { gain: 1.1 }); cue(Le(19) + 0.35, 'sparkle', { dur: 1.5 });
  }

  return { shots: S, cues: CUES };
}
