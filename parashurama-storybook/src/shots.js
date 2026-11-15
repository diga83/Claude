// PARASHURAMA AVATAR (storybook cut): paper puppets in front of soft-focus backdrops. One shot (or two) per narration line.
// A shot: { id, at, cam: [cx, cy], zoom, pan: [dx, dy], tr (dissolve s), flash, note, draw(lt, d, t) }.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, ei, eio, eob, rnd, fillAll, circle, ell, line, rr, lg, rg, glow, rgba, mix } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/kit2.js';
import * as Q from './core/kit3.js';
import * as M from './core/kit4.js';
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
  const axe = (rot = 0, g = 1, s = 0.8) => () => P6.axe(0, -6, s, rot, g);

  // ---------- backdrops (drawn out of focus) ----------
  const bdForest = (t, dark = 0, sc = 0) => { const m = (a, b) => mix(a, b, dark);
    fillAll(lg(0, 0, 0, H, [m('#FFE9A8', '#0A1238'), m('#8AD88A', '#0B2F4F'), m('#2A9A6A', '#0A2F3F'), m('#0B5B3F', '#04202A')]));
    if (dark < 0.6) K.rays(860, 120, 1900, t, C.cream, 0.4 * (1 - dark), 12);
    for (let i = 0; i < 6; i++) K.tree(((i * 330 - sc * 0.3) % 1980 + 1980) % 1980 - 300, 1010 + (i % 2) * 30, 1.3 + (i % 3) * 0.15, m('#1A7A4F', '#06262F'), m('#3AB87A', '#0A3A45'));
    for (let i = 0; i < 4; i++) K.tree(((i * 520 + 60 - sc * 0.6) % 2100 + 2100) % 2100 - 320, 1250 + (i % 2) * 24, 1.9, m('#0B4B2F', '#041A22'), m('#178A5A', '#062A38'));
    K.hills(1300, 80, 4.1, m('#0B6B4F', '#052530'), 0.0025); };
  const bdHermit = (t, dark = 0) => { bdForest(t, dark, 0); R.hut(230, 1330, 1.5); };
  const bdCrimson = (t) => { fillAll(lg(0, 0, 0, H, ['#12001F', '#5A0A3A', '#E0401A', '#3A0A30'])); K.clouds(240, t, rgba('#1A0420', 0.85), 2, 5, 40, 1.1); };
  const bdPalace = (t) => { bdCrimson(t); R.towers(1140, { col: '#2A0418', lit: C.orange, n: 7, seed: 7, s: 0.85 }); K.palace(760, 1180, 0.8, '#3A0A20', C.orange); for (let i = 0; i < 7; i++) P6.soldier(120 + i * 140, 1340 + (i % 2) * 40, 1.1, t, { ph: i, still: true, face: -1 }); };
  const bdCosmos = (t) => { K.sky('cosmic'); K.stars(t, 1, 5, 120, 1700); K.rays(540, 640, 1600, t, C.paleGold, 0.4, 18); K.mandala(540, 640, 560, t, C.gold, 0.8); };
  const bdFire = (t, a = 1) => { fillAll(lg(0, 0, 0, H, ['#1A0010', '#7A0A1A', '#FF5A1F', '#FFC83D'])); for (let i = 0; i < 7; i++) K.tree(-40 + i * 190, 1250 + (i % 2) * 40, 1.5, '#1A0410', '#2A0618'); for (let i = 0; i < 8; i++) R.flame(40 + i * 150, 1300 - (i % 3) * 80, (2.6 + (i % 2)) * a, t, i); };
  const petals = (t, n = 22, seed = 0) => K.petals(t, n, seed, 0.9);
  const rope = (a, b, sag = 30) => { const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u) + Math.sin(u * PI) * sag]); } line(pts, INK, 13); line(pts, '#C98A4A', 8); };
  /** the wheel of a thousand arms, drawn behind the king puppet */
  const fan = (x, y, s, t, a = 1) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; ctx.lineCap = 'round'; glow(0, 0, 640, C.red, 0.3);
    for (let ring = 2; ring >= 0; ring--) { const n = 13 + ring * 6, len = 260 + ring * 110; for (let i = 0; i < n; i++) { const an = -PI * (0.02 + 0.96 * i / (n - 1)) + Math.sin(t * 2 + i + ring) * 0.03, ex = Math.cos(an) * len, ey = Math.sin(an) * len;
      ctx.strokeStyle = INK; ctx.lineWidth = 30 - ring * 5; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 70, Math.sin(an) * 70); ctx.lineTo(ex, ey); ctx.stroke(); ctx.strokeStyle = ring % 2 ? '#8A4A5A' : '#B06A78'; ctx.lineWidth = 24 - ring * 5; ctx.stroke();
      circle(ex, ey, 17 - ring * 3, '#C88A98'); if ((i + ring) % 3 === 0) line([[ex, ey], [ex + Math.cos(an) * 70, ey + Math.sin(an) * 70]], '#E8F0FF', 7); } } ctx.restore(); };

  // ── 0 · "Long ago, a boy was born to the sage Jamadagni," ───────────────
  add({ id: 'S01', at: 0, cam: [540, 900], zoom: 0.08, note: 'a forest hermitage: the old sage, his wife, and their small son; serif title',
    draw(lt, d, t) { B.backdrop(() => bdHermit(t, 0.05), 3); B.bokeh(t, 16, '#FFF1B8', 0.22);
      P(280, 1010, 1.0, { ...Wh.jamadagni, t, eyes: 'happy', armR: [0.5, 0.3] }); P(820, 1020, 0.98, { ...Wh.renuka, t, ph: 1, eyes: 'happy', armL: [0.5, 0.3] });
      P(545, 1230, 0.72, { ...Wh.parashuBoy, t, ph: 2, eyes: 'open', armL: [1.0, 0.8], armR: [1.0, 0.8] });
      const a = eo(seg(lt, 0.3, 1.1)) * (1 - seg(lt, 2.2, 2.9)); B.serif('Parashurama', 540, 600, 150, { italic: true, w: 600, a }); B.serif('the sixth avatar', 540, 676, 56, { a, ls: 3 }); petals(t, 14, 4); } });
  cue(0.1, 'conch', { gain: 0.6 }); cue(0.6, 'bell', { gain: 0.8 });

  // ── 1 · "with the calm of a priest, and the fire of a warrior." ─────────
  { const st = cut(1), fi = Wd('fire', 1) - st;
    add({ id: 'S02', at: st, cam: [540, 900], zoom: 0.1, note: 'one boy, two halves: cool lotus-blue on one side, flame on the other',
      draw(lt, d, t) { const f = eo(seg(lt, fi - 0.3, fi + 0.5));
        B.backdrop(() => { ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, 940, 3000); ctx.clip(); fillAll(lg(0, 0, 0, H, ['#0A2A7A', '#1F8FE0', '#7AE0D0', '#0B6B7F'])); glow(250, 420, 260, C.cream, 0.6); circle(250, 420, 80, C.cream); ctx.restore();
          ctx.save(); ctx.beginPath(); ctx.rect(540, -400, 940, 3000); ctx.clip(); fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0103A', '#FF6A1F', '#FFC83D'])); for (let i = 0; i < 5; i++) R.flame(600 + i * 120, 1400 - (i % 2) * 60, (2.0 + (i % 3) * 0.6) * (0.5 + 0.5 * f), t, i); ctx.restore(); }, 3);
        B.bokeh(t, 14, '#FFE9C8', 0.2, 3);
        P(540, 1060, 1.3, { ...Wh.parashuBoy, t, eyes: 'closed', armL: [0.7, 1.1], armR: [0.7, 1.1], holdL: () => K.lotus(0, 10, 0.5, 1), holdR: () => R.bow(0, -20, 0.6, 0.05, 0, {}) }); } });
    cue(st, 'chime', { note: 1 }); cue(st + fi, 'sizzle', { dur: 1.6, gain: 1.0 }); }

  // ── 2 · "He prayed to Shiva for years, and Shiva gave him a blazing axe." ─
  { const st = cut(2), gv = Wd('gave', 2) - st - 0.5;
    add({ id: 'S03', at: st, cam: [540, 900], zoom: 0.1, note: 'snow peaks; he prays while suns and moons wheel overhead',
      draw(lt, d, t) { const day = 0.5 + 0.5 * Math.sin(lt * 4.2);
        B.backdrop(() => { fillAll(lg(0, 0, 0, H, [mix('#0A0A4A', '#3FA9F5', day), mix('#2A3FB8', '#9BE8E0', day), '#CFE6F8', '#EAF8FF'])); K.stars(t, 1 - day, 7, 90, 800);
          const a = lt * 4.2; K.sun(540 + Math.cos(a - PI / 2) * 480, 760 + Math.sin(a - PI / 2) * 480, 100, t); circle(540 - Math.cos(a - PI / 2) * 480, 760 - Math.sin(a - PI / 2) * 480, 70, C.cream);
          K.mountain(180, 1600, 800, 820, '#EAF8FF', '#7A9AE0'); K.mountain(900, 1600, 860, 900, '#FFFFFF', '#8AA8E8'); }, 3);
        P(540, 1040, 1.25, { ...Wh.parashuYouth, t, eyes: 'closed', armL: NAM, armR: NAM });
        for (let i = 0; i < 40; i++) circle((rnd(i) * 1200 + t * 30) % 1200 - 60, (rnd(i * 3) * 1700 + t * 90) % 1700, 4 + rnd(i * 7) * 5, rgba(C.white, 0.8)); } });
    cue(st, 'bell', { gain: 0.6 });
    add({ id: 'S04', at: st + gv, cam: [540, 880], zoom: 0.1, flash: true, note: 'Shiva, vast and out of focus, lowers a blazing axe into his hands',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#0A0A4A', '#2A3FB8', '#7AC8F0', '#EAF8FF'])); K.stars(t, 0.9, 7, 90, 800); K.mandala(540, 600, 560, t, C.cyan, 0.5, 4); Q.shiva(540, 820, 0.95, { t }); }, 2.5); B.bokeh(t, 14, '#BFE6FF', 0.2, 5);
        const u = eo(seg(lt, 0.2, 1.3)); K.rays(540, lerp(500, 900, u), 800, t * 2, C.gold, 0.5, 14);
        P(540, 1220, 1.1, { ...Wh.parashuYouth, t, eyes: 'open', look: [0, -6], armL: [2.5, 0.4], armR: [2.5, 0.4] });
        P6.axe(lerp(540, 800, u), lerp(520, 950, u), 0.8, lerp(-0.6, 0.1, u), 1); } });
    cue(st + gv, 'conch', { gain: 0.9 }); cue(st + gv + 0.2, 'shimmer', { dur: 1.6 }); cue(st + gv + 1.2, 'bell', { gain: 0.9 }); }

  // ── 3 · "From that day, he was called Parashurama, Rama with the axe." ──
  { const st = cut(3), nm = Wd('Parashurama', 3) - st;
    add({ id: 'S05', at: st, cam: [540, 860], zoom: 0.1, note: 'PARASHURAMA: bearded, beaded, the axe raised against fire and gold',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#3A0420', '#B0103A', '#FF8A1F', '#FFD27A'])); K.rays(540, 700, 1700, t, C.cream, 0.5, 18); for (let i = 0; i < 6; i++) R.flame(60 + i * 190, 1560, 2.4, t, i); }, 3); B.bokeh(t, 18, '#FFD9A0', 0.26, 2);
        P(480, 1020, 1.35, { ...Wh.parashu, t, eyes: 'open', mouth: 'grim', armR: [lerp(0.6, 2.3, eo(seg(lt, 0, 0.9))), 0.5], holdR: axe(0.1, 1, 0.75) }); } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + nm, 'bell', { gain: 0.9 }); cue(st + nm, 'sparkle', { dur: 1.4 }); }

  // ── 4 · "In those days, a king with a thousand arms ruled without mercy." ─
  { const st = cut(4), th = Wd('thousand', 4) - st;
    add({ id: 'S06', at: st, cam: [540, 860], zoom: 0.1, note: 'the thousand-armed king: a wheel of arms opens behind him',
      draw(lt, d, t) { B.backdrop(() => { bdCrimson(t); R.towers(1300, { col: '#16030E', lit: C.orange, n: 8, seed: 3, s: 0.8 }); }, 3, 0.1); B.bokeh(t, 14, '#FF7A4A', 0.2, 7);
        const a = eo(seg(lt, th - 0.5, th + 0.5)); ctx.save(); ctx.translate(540, 900); ctx.scale(lerp(0.3, 1, a), lerp(0.3, 1, a)); ctx.translate(-540, -900); fan(540, 900, 1.05, t, a); ctx.restore();
        P(540, 980, 1.2, { ...Wh.kingK, t, eyes: 'angry', mouth: 'grim', armL: [0.5, 0.5], armR: [0.5, 0.5] }); } });
    cue(st, 'rumble', { dur: 4.0 }); cue(st + th - 0.3, 'whoosh', { gain: 1.1 }); cue(st + th, 'growl', { gain: 0.8 }); }

  // ── 5 · "One day he visited the sage's quiet home, and saw their wish granting cow." ─
  { const st = cut(5), sw = Wd('saw', 5) - st - 0.3;
    add({ id: 'S07', at: st, cam: [540, 900], zoom: 0.08, note: 'the king arrives; the old sage welcomes him with folded hands',
      draw(lt, d, t) { B.backdrop(() => { bdHermit(t, 0.1); for (let i = 0; i < 3; i++) P6.soldier(700 + i * 130, 1380, 1.1, t, { ph: i, still: true, face: -1 }); }, 3); B.bokeh(t, 14, '#FFF1B8', 0.2, 2);
        P(300, 1000, 1.05, { ...Wh.jamadagni, t, eyes: 'happy', armL: NAM, armR: NAM });
        P(lerp(1100, 780, eo(seg(lt, 0, 1.6))), 960 + (lt < 1.6 ? bobY(t) : 0), 1.12, { ...Wh.kingK, t, ph: 1, eyes: 'open', flip: true, look: [3, 0] }); } });
    for (let i = 0; i < 4; i++) cue(st + 0.2 + i * 0.4, 'thud', { gain: 0.4 });
    add({ id: 'S08', at: st + sw, cam: [600, 900], zoom: 0.1, note: 'Kamadhenu glows among the trees; the king cannot look away',
      draw(lt, d, t) { B.backdrop(() => { bdForest(t, 0.2, 0); K.rays(640, 900, 1300, t, C.cream, 0.5, 14); }, 3); B.bokeh(t, 18, '#FFF6DC', 0.26, 4);
        Q.cow(700, 1040 + Math.sin(t * 1.5) * 6, 1.2, t);
        for (let i = 0; i < 10; i++) K.sparkle(660 + Math.cos(i * 0.63 + t) * 400, 940 + Math.sin(i * 0.63 + t) * 320, 30, 0.5 + 0.5 * Math.sin(t * 5 + i));
        P(lerp(-200, 190, eo(seg(lt, 0.3, 1.2))), 1120, 1.0, { ...Wh.kingK, t, eyes: 'wide', look: [7, 2] }); } });
    cue(st + sw, 'shimmer', { dur: 2.0 }); cue(st + sw + 0.2, 'bell', { gain: 0.6 }); }

  // ── 6 · "She could conjure a feast for a whole army, out of thin air." ──
  { const st = cut(6);
    add({ id: 'S09', at: st, cam: [540, 920], zoom: 0.08, note: 'dish after dish pops onto leaf plates in a ribbon of sparks',
      draw(lt, d, t) { B.backdrop(() => bdForest(t, 0.15, 0), 3); B.bokeh(t, 16, '#FFF1B8', 0.22, 6);
        Q.cow(230, 860, 0.85, t);
        for (let i = 0; i < 6; i++) { const p = eob(seg(lt, 0.3 + i * 0.3, 0.6 + i * 0.3)); if (p <= 0) continue; const x = 190 + (i % 3) * 235, y = 1130 + Math.floor(i / 3) * 140;
          ctx.save(); ctx.translate(x, y); ctx.scale(p, p); ctx.beginPath(); ctx.ellipse(0, 0, 110, 44, 0, 0, TAU); ctx.fillStyle = lg(-110, 0, 110, 0, ['#19A86A', '#5ADC9A', '#19A86A']); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3.4; ctx.stroke();
          for (const [fx, fy, fr, fc] of [[-40, -16, 34, C.cream], [30, -20, 26, [C.saffron, C.gold, C.coral][i % 3]], [64, 4, 18, [C.red, C.leaf, C.magenta][i % 3]], [-74, 8, 16, C.gold]]) { ctx.beginPath(); ctx.arc(fx, fy, fr, 0, TAU); ctx.fillStyle = fc; ctx.fill(); ctx.stroke(); } glow(0, -20, 150, C.gold, 0.4); ctx.restore(); }
        const pts = []; for (let i = 0; i <= 20; i++) { const u = i / 20; pts.push([lerp(360, 900, u), 860 - Math.sin(u * PI) * 240 + Math.sin(u * 10 - t * 6) * 16]); }
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; line(pts, rgba(C.gold, 0.4), 40); ctx.restore(); for (let i = 0; i < 12; i++) { const p = ((t * 0.5 + i / 12) % 1); K.sparkle(lerp(360, 900, p), 860 - Math.sin(p * PI) * 240, 30, Math.sin(p * PI), C.cream); }
        P(940, 800, 0.8, { ...Wh.kingK, t, eyes: 'wide', flip: true, look: [3, 5] }); } });
    for (let i = 0; i < 6; i++) { cue(st + 0.3 + i * 0.3, 'pop', { gain: 0.7 }); cue(st + 0.35 + i * 0.3, 'chime', { gain: 0.45, note: i }); } }

  // ── 7 · "He wanted her, so he simply took her by force." ────────────────
  { const st = cut(7), tk = Wd('took', 7) - st;
    add({ id: 'S10', at: st, cam: [540, 920], zoom: 0.1, note: 'a rope on the gentle cow; the old sage reaches after her',
      draw(lt, d, t) { const u = eio(seg(lt, tk - 0.3, d + 0.3));
        B.backdrop(() => { bdHermit(t, 0.3 + 0.3 * u); for (let i = 0; i < 2; i++) P6.soldier(120 - i * 110 - u * 200, 1380, 1.2, t, { ph: i, face: -1 }); fillAll(rgba('#7A0A3A', 0.25 * u)); }, 3); B.bokeh(t, 10, '#FF9A6B', 0.14, 3);
        const cx = lerp(400, 200, u); rope([cx - 240, 1010], [-60, 1100], 20); Q.cow(cx, 1080, 1.0, t * 2);
        P(900, 1000, 1.05, { ...Wh.jamadagni, t, eyes: 'sad', flip: true, armR: [1.3, 0.3], armL: [0.3, 0.2] }); } });
    cue(st + tk - 0.2, 'rumble', { dur: 2.4 }); cue(st + tk, 'slide', { dur: 1.6 }); }

  // ── 8 · "When Parashurama returned, he stormed the palace alone," ───────
  { const st = cut(8), sm = Wd('stormed', 8) - st - 0.3;
    add({ id: 'S11', at: st, cam: [540, 900], zoom: 0.12, note: 'home again: his father\'s bowed head, and his own eyes hardening',
      draw(lt, d, t) { const a = seg(lt, 0.9, 1.6); B.backdrop(() => { bdHermit(t, 0.3); fillAll(rgba('#B0103A', 0.35 * a)); }, 3); B.bokeh(t, 10, '#FF9A6B', 0.14 * a, 3);
        P(880, 1100, 0.9, { ...Wh.jamadagni, t, ph: 1, eyes: 'sad', flip: true, tilt: 0.14 });
        P(300, 990, 1.25, { ...Wh.parashu, t, eyes: a > 0.4 ? 'angry' : 'wide', mouth: 'grim', look: [5, 0], armR: [lerp(0.3, 2.6, a), 0.3], holdR: axe(0.2, a, 0.72) }); } });
    cue(st + 0.9, 'slam', { gain: 0.5 }); cue(st + 0.9, 'rumble', { dur: 1.4 });
    add({ id: 'S12', at: st + sm, cam: [540, 900], zoom: 0.1, tr: 0.3, note: 'one man and an axe of fire against the whole palace guard',
      draw(lt, d, t) { B.backdrop(() => bdPalace(t), 3); B.bokeh(t, 14, '#FF8A4A', 0.2, 5);
        ctx.strokeStyle = rgba(C.cream, 0.6); ctx.lineWidth = 9; ctx.lineCap = 'round'; for (let i = 0; i < 12; i++) { const y = 620 + i * 60, x = ((rnd(i) * 900 - t * 1600) % 1300 + 1300) % 1300 - 300; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 180, y); ctx.stroke(); }
        const x = lerp(-100, 420, eo(seg(lt, 0, d)));
        P(x, 1000 + bobY(t * 1.4), 1.25, { ...Wh.parashu, t, eyes: 'angry', mouth: 'grim', lean: 0.12, look: [5, 0], armR: [2.2, 0.6], holdR: axe(0.4, 1, 0.72) }); } });
    cue(st + sm, 'whoosh', { gain: 1.1 }); cue(st + sm, 'conch', { gain: 0.7 }); }

  // ── 9 · "defeated the thousand armed king, and brought the cow home." ───
  { const st = L(9) - 0.15, br = Wd('brought', 9) - st - 0.3;
    add({ id: 'S13', at: st, cam: [560, 880], zoom: 0.1, tr: 0.2, note: 'the axe sweeps in an arc of light; the wheel of arms flies apart',
      draw(lt, d, t) { const hit = 0.7, ex = seg(lt, hit, hit + 1.2), sh = Math.sin(t * 60) * 12 * Math.max(0, 1 - ex * 2) * (ex > 0 ? 1 : 0);
        ctx.save(); ctx.translate(sh, 0); B.backdrop(() => bdCrimson(t), 3); ctx.fillStyle = rgba('#FFE9C8', 0.5 * Math.max(0, 1 - Math.abs(lt - hit) * 5)); ctx.fillRect(-200, -200, W + 400, H + 400);
        if (ex < 1) { fan(800 + ex * 80, 900 + ex * 120, 0.9, t, 1 - ex); P(800 + ex * 80, 980 + ex * 160, 1.05, { ...Wh.kingK, t, eyes: 'wide', flip: true, lean: -ex * 0.5, a: 1 - ex, armL: [1.6, 0.6], armR: [1.6, 0.6] }); }
        if (ex > 0) K.rays(700, 860, 1600, t * 4, C.cream, 0.7 * (1 - ex), 16);
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(C.cream, 0.9 * Math.max(0, 1 - Math.abs(lt - hit) * 2.4)); ctx.lineWidth = 46; ctx.beginPath(); ctx.arc(420, 900, 400, -PI * 0.75, -PI * 0.05); ctx.stroke(); ctx.restore();
        const sw = eo(seg(lt, hit - 0.15, hit + 0.15));
        P(lerp(140, 330, ei(seg(lt, 0, hit))), 1000, 1.2, { ...Wh.parashu, t, eyes: 'angry', mouth: 'grim', armR: [lerp(2.6, 1.0, sw), 0.4], holdR: axe(lerp(-0.2, 1.2, sw), 1, 0.72) }); ctx.restore(); } });
    cue(st + 0.3, 'whoosh', { gain: 1.2 }); cue(st + 0.7, 'slam', { gain: 1.3 }); cue(st + 0.7, 'thunder', { gain: 0.8 });
    add({ id: 'S14', at: st + br, cam: [540, 920], zoom: 0.08, note: 'evening: he leads Kamadhenu home',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dusk'); K.sun(280, 880, 240, t, { c2: C.orange, c3: C.magenta }); K.hills(1100, 200, 2, '#6B1FA8'); R.hut(860, 1330, 1.2); K.hills(1380, 90, 1.1, '#2A0E66', 0.002); }, 3); B.bokeh(t, 16, '#FFC8A0', 0.22, 9);
        const x = lerp(60, 200, seg(lt, 0, d)); Q.cow(x, 1150, 0.95, t * 2); rope([x + 200, 1060], [x + 420, 1150], 20);
        P(x + 480, 990 + bobY(t), 1.1, { ...Wh.parashu, t, eyes: 'happy', armR: [0.5, 0.4], holdR: axe(0.1, 0.3, 0.7) }); } });
    cue(st + br, 'bell', { gain: 0.6 }); }

  // ── 10 · "But the king's sons took a cruel revenge, and his father was lost." ─
  { const st = cut(10), ls = Wd('father', 10) - st;
    add({ id: 'S15', at: st, cam: [540, 920], zoom: 0.1, note: 'night: torches close in; the old sage\'s lamp gutters and goes out',
      draw(lt, d, t) { const out = seg(lt, ls + 0.2, ls + 0.9), u = eo(seg(lt, 0, 2.2));
        B.backdrop(() => { bdHermit(t, 0.95); fillAll(rgba('#7A0A2A', 0.25 * (1 - out))); for (let i = 0; i < 3; i++) glow(lerp(1300, 860, u) + i * 110, 900 + (i % 2) * 60, 200, C.orange, 0.7 * (1 - out)); }, 3, 0.15 + 0.4 * out);
        for (let i = 0; i < 2; i++) P(lerp(1400, 790, u) + i * 190, 1000 + i * 40, 0.95, { ...Wh.prince, t, ph: i, eyes: 'angry', mouth: 'grim', flip: true, a: 1 - out, armR: [2.0, 0.5], holdR: () => R.flame(0, -20, 0.7, t, i) });
        P(360, 1040, 1.1, { ...Wh.jamadagni, t, eyes: 'closed', armL: NAM, armR: NAM, a: 1 - 0.5 * out });
        R.diya(600, 1560, 1.3, t, 1 - out, 1);
        if (out > 0) for (let i = 0; i < 6; i++) { const p = clamp(out * 1.4 - i * 0.08); circle(600 + Math.sin(p * 6 + i) * 20, 1500 - p * 300, 18 + p * 30, rgba('#B8C8E0', 0.4 * (1 - p))); } } });
    cue(st, 'rumble', { dur: 3.4 }); cue(st + ls + 0.2, 'slide', { dur: 0.8, gain: 0.6 }); cue(st + ls + 0.6, 'bell', { gain: 0.45 }); }

  // ── 11 · "Heartbroken, Parashurama made a vow, to free the earth from every tyrant." ─
  { const st = cut(11), vw = Wd('vow', 11) - st - 0.4;
    add({ id: 'S16', at: st, cam: [540, 940], zoom: 0.12, note: 'rain: he stands over the cold lamp, a tear on his cheek',
      draw(lt, d, t) { B.backdrop(() => bdHermit(t, 1), 3, 0.15);
        P(520, 1040, 1.3, { ...Wh.parashu, t, eyes: 'sad', tilt: 0.16, armR: [0.3, -2.1] }); R.diya(820, 1560, 1.2, t, 0, 1); K.rain(t, 0.45, 150); } });
    cue(st, 'rain', { dur: 2.6 });
    add({ id: 'S17', at: st + vw, cam: [540, 860], zoom: 0.12, flash: true, note: 'THE VOW: axe to the sky, lightning answering',
      draw(lt, d, t) { const fl = Math.max(0, 1 - Math.abs(((lt * 0.8) % 1) - 0.1) * 6);
        B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#0A0420', '#3A0A5A', '#B0103A', '#FF6A1F'])); fillAll(rgba('#FFD0C8', 0.3 * fl)); K.clouds(220, t, '#2A0A40', 1, 6, 80, 1.2); K.lightning(300 + (Math.floor(lt * 0.8) % 3) * 240, Math.floor(lt * 0.8) * 5 + 2, fl, 900); }, 2.5);
        for (let i = 0; i < 3; i++) M.rings(540, 860, 1100, ((t * 0.6 + i / 3) % 1), C.orange, 1);
        P(500, 1040, 1.3, { ...Wh.parashu, t, eyes: 'angry', mouth: 'grim', armR: [2.6, 0.3], holdR: axe(0, 1, 0.72) }); K.rain(t, 0.35, 130); } });
    cue(st + vw, 'thunder', { gain: 0.9 }); cue(st + vw, 'conch', { gain: 0.8 }); cue(st + vw, 'rain', { dur: 3.0 }); }

  // ── 12 · "Twenty one times he crossed the land, and no cruel king could stand before his axe." ─
  { const st = cut(12), no = Wd('no', 12) - st - 0.3;
    add({ id: 'S18', at: st, cam: [540, 860], zoom: 0.08, note: 'he strides on; a serif number climbs to twenty-one',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#0A0420', '#3A0A5A', '#B0103A', '#FF8A3D'])); K.stars(t, 0.6, 5, 80, 700); ctx.save(); ctx.translate(540, 3100); ctx.rotate(-lt * 0.12); M.earth(0, 0, 1700, 0, 0); ctx.restore(); }, 3); B.bokeh(t, 12, '#FF9A6B', 0.18, 2);
        const n = clamp(Math.floor(seg(lt, 0.1, no - 0.2) * 21) + 1, 1, 21);
        for (let i = 0; i < 21; i++) { const u = i / 20, x = 110 + u * 860, y = 640 - Math.sin(u * PI) * 240, on = i < n; if (on) glow(x, y, 50, C.gold, 0.7); circle(x, y, on ? 15 : 9, on ? C.cream : rgba(C.cream, 0.3)); }
        B.serif(String(n), 540, 560, 230, { italic: true, w: 600 });
        P(540, 1060 + bobY(t), 1.15, { ...Wh.parashu, t, eyes: 'angry', mouth: 'grim', look: [4, 0], armR: [1.9, 0.5], holdR: axe(0.3, 1, 0.72) }); } });
    for (let i = 0; i < 21; i++) cue(st + 0.1 + i * (no - 0.3) / 21, 'tock', { gain: 0.45 }); cue(st, 'rumble', { dur: no });
    add({ id: 'S19', at: st + no, cam: [560, 900], zoom: 0.08, tr: 0.3, note: 'tyrant after tyrant topples, crowns spinning away',
      draw(lt, d, t) { B.backdrop(() => bdCrimson(t), 3); B.bokeh(t, 12, '#FF7A4A', 0.18, 6);
        for (let i = 0; i < 3; i++) { const f = eio(seg(lt, 0.2 + i * 0.5, 1.0 + i * 0.5)), x = 500 + i * 210, y = 1020 + (i % 2) * 40;
          P(x + f * 60, y + f * 200, 0.85, { ...(i === 1 ? Wh.kingK : Wh.prince), head: f > 0.1 ? 'jata' : (i === 1 ? 'kingcrown' : 'crown'), t, ph: i, eyes: 'wide', flip: true, lean: -f * 0.9, a: 1 - f * 0.5, armL: [1.6, 0.6], armR: [1.6, 0.6] });
          if (f > 0.1) P6.crown(x + f * 100, y - 360 - Math.sin(f * PI) * 220, 0.8, f * 7, 1 - f * 0.3); }
        P(210, 1020, 1.1, { ...Wh.parashu, t, eyes: 'angry', mouth: 'grim', armR: [2.2 + Math.sin(t * 6) * 0.2, 0.5], holdR: axe(0.2, 1, 0.72) }); } });
    for (let i = 0; i < 3; i++) { cue(st + no + 0.2 + i * 0.5, 'slam', { gain: 0.6 }); cue(st + no + 0.6 + i * 0.5, 'pop', { gain: 0.5 }); } }

  // ── 13 · "His anger burned like a forest fire." ─────────────────────────
  { const st = cut(13);
    add({ id: 'S20', at: st, cam: [540, 900], zoom: 0.12, note: 'a dark figure against a wall of flame, eyes alight',
      draw(lt, d, t) { B.backdrop(() => bdFire(t), 2.5); B.bokeh(t, 22, '#FFB03D', 0.3, 3);
        ctx.save(); ctx.filter = 'brightness(0.16)'; P(540, 1040, 1.3, { ...Wh.parashu, t, eyes: 'angry', mouth: 'grim', armR: [2.2, 0.5], holdR: axe(0.2, 0, 0.72) }); ctx.filter = 'none'; ctx.restore();
        for (const sd of [-1, 1]) glow(540 + sd * 40, 1040 - 138, 30, C.gold, 1); K.motes(t, 60, C.gold, 0.9, 3); } });
    cue(st, 'sizzle', { dur: 2.4, gain: 1.5 }); cue(st, 'rumble', { dur: 2.4 }); }

  // ── 14 · "But when it was over, he laid his anger down, and gave away everything he had won," ─
  { const st = cut(14), gv = Wd('gave', 14) - st - 0.3;
    add({ id: 'S21', at: st, cam: [540, 920], zoom: 0.1, note: 'the fire sinks and a cool dawn comes up; he lowers the axe and closes his eyes',
      draw(lt, d, t) { const u = eio(seg(lt, 0.2, 2.6));
        B.backdrop(() => { fillAll(lg(0, 0, 0, H, [mix('#1A0010', '#2B1466', u), mix('#7A0A1A', '#5A6FE0', u), mix('#FF5A1F', '#FF9AC0', u), mix('#FFC83D', '#FFD9A0', u)])); K.stars(t, 0.6 * u, 4, 60, 600); K.sun(540, lerp(1500, 1000, u), 240, t, { glow: 0.4 * u }); K.hills(1200, 180, 2, mix('#2A0618', '#5A3A9A', u)); for (let i = 0; i < 7; i++) R.flame(60 + i * 170, 1400, 2.2 * (1 - u), t, i); }, 3);
        B.bokeh(t, 16, '#FFD9C0', 0.2 * u, 5);
        P(520, 1040, 1.3, { ...Wh.parashu, t, eyes: u > 0.5 ? 'closed' : 'angry', mouth: u > 0.5 ? 'smile' : 'grim', tilt: 0.08 * u, armR: [lerp(2.2, 0.25, u), lerp(0.5, 0.1, u)], holdR: axe(lerp(0.2, 2.9, u), 1 - u, 0.72) }); } });
    cue(st + 0.5, 'shimmer', { dur: 2.0, gain: 0.5 }); cue(st + 1.8, 'bell', { gain: 0.6 });
    add({ id: 'S22', at: st + gv, cam: [540, 900], zoom: 0.1, note: 'he places the whole Earth in an old sage\'s hands',
      draw(lt, d, t) { B.backdrop(() => { fillAll(lg(0, 0, 0, H, ['#FFE9A8', '#FF9AC0', '#B07AE8', '#5A2FD0'])); K.rays(540, 800, 1600, t, C.cream, 0.45, 16); }, 3); B.bokeh(t, 18, '#FFE0F0', 0.24, 4);
        const u = eio(seg(lt, 0.2, 1.4));
        P(790, 1000, 1.05, { ...Wh.jamadagni, t, ph: 1, eyes: 'happy', flip: true, armL: [0.9, 0.9], armR: [0.9, 0.9] });
        P(290, 980, 1.15, { ...Wh.parashu, t, eyes: 'closed', mouth: 'smile', quiver: false, armR: [lerp(1.3, 0.9, u), 0.5] });
        M.earth(lerp(470, 600, u), lerp(860, 1040, u) + Math.sin(t * 2) * 6, 110, t, 0); petals(t, 24, 4); } });
    cue(st + gv, 'shimmer', { dur: 1.8 }); cue(st + gv + 1.3, 'bell', { gain: 0.7 }); }

  // ── 15 · "and cast his axe into the sea, where the waters drew back, and new land rose." ─
  { const st = cut(15), wh = Wd('where', 15) - st - 0.3;
    add({ id: 'S23', at: st, cam: [560, 880], zoom: 0.08, note: 'he hurls the axe; it wheels across the sunset and into the sea',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dusk'); K.sun(760, 980, 260, t, { c2: C.orange, c3: C.magenta }); K.sea(1040, t, { cols: ['#FF9A8A', '#3A1FA8'], amp: 20, rows: 8, crest: C.cream }); }, 3); B.bokeh(t, 16, '#FFC8A0', 0.22, 2);
        const u = seg(lt, 0.5, 1.9), ax = lerp(420, 920, u), ay = 760 - Math.sin(u * PI) * 380 + u * 380;
        P(260, 1000, 1.2, { ...Wh.parashu, t, eyes: 'open', mouth: 'grim', look: [5, 0], lean: u > 0 ? 0.1 : -0.06, armR: [u > 0 ? 1.4 : 2.7, 0.3], holdR: lt < 0.5 ? axe(-0.3, 1, 0.72) : null });
        if (lt >= 0.5 && u < 1) { for (let i = 1; i < 8; i++) { const q = Math.max(0, u - i * 0.03); glow(lerp(420, 920, q), 760 - Math.sin(q * PI) * 380 + q * 380 - 120, 110 - i * 10, C.orange, 0.5 * (1 - i / 8)); } P6.axe(ax, ay, 0.7, u * 16, 1); }
        K.splash(920, 1100, 420, seg(lt, 1.9, 2.9), C.cream); } });
    cue(st + 0.5, 'whoosh', { gain: 1.2 }); cue(st + 1.9, 'plop', { gain: 1.3 }); cue(st + 1.9, 'waves', { dur: 2.0, gain: 0.9 });
    add({ id: 'S24', at: st + wh, cam: [540, 900], zoom: 0.08, note: 'the sea pulls back and a green coast rises, palms springing up',
      draw(lt, d, t) { const u = eio(seg(lt, 0.1, 2.4));
        B.backdrop(() => { K.sky('newdawn'); K.sun(800, 460, 200, t); K.mountain(200, 1400, 700, lerp(100, 560, u), '#5ADC9A', '#0B6B4F', false); K.mountain(620, 1400, 800, lerp(60, 440, u), '#3AC88A', '#0B5B4F', false); K.hills(lerp(1500, 1140, u), 140, 2, '#2AB87A');
          ctx.save(); ctx.translate(lerp(0, 560, u), 0); K.sea(1100, t, { cols: [C.cyan, C.ocean], amp: 20, rows: 8, speed: 2 }); ctx.restore(); }, 3);
        B.bokeh(t, 14, '#FFF1B8', 0.2, 6);
        for (let i = 0; i < 5; i++) P6.palm(90 + i * 170, lerp(1700, 1330, u) - (i % 2) * 40, 1.2 + (i % 3) * 0.2, t, eob(seg(u, 0.3 + i * 0.1, 0.6 + i * 0.1)));
        P6.axe(lerp(960, 760, u), 1300, 0.8, 0.3, 0.8); } });
    cue(st + wh, 'waves', { dur: 3.0, gain: 1.0 }); for (let i = 0; i < 5; i++) cue(st + wh + 0.9 + i * 0.25, 'chime', { gain: 0.45, note: i }); }

  // ── 16 · "Then he climbed a mountain to meditate, where it is said he lives to this day," ─
  { const st = cut(16);
    add({ id: 'S25', at: st, cam: [540, 880], zoom: 0.1, note: 'under an aurora, on a high peak, he sits in stillness',
      draw(lt, d, t) { B.backdrop(() => { K.sky('night'); K.stars(t, 1, 8, 140, 1200); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { const pts = []; for (let k = 0; k <= 20; k++) { const u = k / 20; pts.push([u * 1200 - 60, 380 + i * 70 + Math.sin(u * 5 + t * 0.6 + i) * 80]); } line(pts, rgba([C.leaf, C.cyan, C.violet, C.pink, C.aqua][i], 0.3), 70); } ctx.restore();
          glow(840, 300, 240, C.cream, 0.5); circle(840, 300, 80, C.cream); K.mountain(160, 1900, 900, 900, '#3A2A8A', '#150A4A'); K.mountain(940, 1900, 900, 960, '#4A3A9A', '#1B0F5C'); }, 3);
        B.bokeh(t, 12, '#9FE8D0', 0.16, 4); glow(540, 900, 520, C.gold, 0.3 * eo(seg(lt, 0.5, 2.5)));
        P(540, 1060, 1.3, { ...Wh.parashu, t, eyes: 'closed', mouth: 'smile', quiver: false, armL: NAM, armR: NAM }); } });
    cue(st, 'bell', { gain: 0.6 }); cue(st + 1.2, 'shimmer', { dur: 2.4, gain: 0.6 }); }

  // ── 17 · "waiting to teach the heroes yet to come." ─────────────────────
  { const st = cut(17);
    add({ id: 'S26', at: st, cam: [540, 920], zoom: 0.08, note: 'sunrise: two young archers bow to the old teacher',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dawn'); K.rays(540, 760, 1600, t, C.cream, 0.45, 16); K.sun(540, 760, 280, t); K.mountain(120, 1600, 700, 560, '#B07AE8', '#5A2FB0'); K.mountain(980, 1600, 700, 620, '#C08AF0', '#6A3FC0'); }, 3); B.bokeh(t, 16, '#FFE0C0', 0.22, 5);
        P(540, 900, 1.05, { ...Wh.parashu, t, eyes: 'happy', quiver: false, armR: [1.3, 1.0] });
        for (const [x, ph, f] of [[210, 1, false], [880, 2, true]]) { const p = eo(seg(lt, 0.2 + ph * 0.25, 0.9 + ph * 0.25)); P(x, 1160 + (1 - p) * 80, 0.9, { ...Wh.student, t, ph, eyes: 'closed', flip: f, a: p, tilt: 0.12, lean: f ? -0.06 : 0.06, armL: NAM, armR: NAM }); } petals(t, 16, 5); } });
    for (let i = 0; i < 2; i++) cue(st + 0.4 + i * 0.3, 'chime', { note: i * 2 + 1 }); }

  // ── 18 · "This is Parashurama, the sixth avatar of Vishnu," ─────────────
  { const st = cut(18);
    add({ id: 'S27', at: st, cam: [540, 860], zoom: 0.08, note: 'Parashurama with his axe; Vishnu\'s form, out of focus, in the mandala behind',
      draw(lt, d, t) { B.backdrop(() => { bdCosmos(t); K.vishnu(540, 1060, 1.6, { t, tail: 0 }); }, 2.5); B.bokeh(t, 16, '#C8A8FF', 0.2, 5);
        P(500, 1020, 1.3, { ...Wh.parashu, t, eyes: 'open', armR: [0.7, 0.9], holdR: axe(0.05, 0.8, 0.75) }); petals(t, 16, 8); } });
    cue(st, 'conch', { gain: 0.9 }); cue(st + 1.6, 'bell', { gain: 0.9 }); }

  // ── 19 · "a reminder that true strength protects the weak, and knows when to lay its weapon down." ─
  { const st = cut(19), ly = Wd('lay', 19) - st;
    add({ id: 'S28', at: st, cam: [540, 900], zoom: 0.06, tr: 0.7, note: 'a quiet shore at sunset: the axe planted in the sand, a lotus at its foot; end title',
      draw(lt, d, t) { B.backdrop(() => { K.sky('dusk'); K.stars(t, 0.7, 3, 70, 700); K.rays(540, 980, 1600, t, C.cream, 0.4); K.sun(540, 980, 280, t, { c2: C.orange, c3: C.magenta }); K.sea(1060, t, { cols: ['#FF9A8A', '#3A1FA8'], amp: 12, rows: 4, bottom: 1240, crest: C.cream, speed: 0.6 }); K.hills(1300, 90, 2, '#3A1680', 0.002); for (const px of [70, 1010]) P6.palm(px, 1400, 1.6, t, 1); }, 3);
        B.bokeh(t, 22, '#FFC8A0', 0.28, 6);
        P(380, 1060, 1.15, { ...Wh.parashu, t, eyes: 'closed', mouth: 'smile', quiver: false, armL: NAM, armR: NAM });
        const u = eio(seg(lt, ly - 0.6, ly + 0.5)); P6.axe(800, 1560, 0.9, lerp(0.5, 0.1, u), lerp(0.8, 0.25, u)); K.lotus(800, 1580, 1.1 * eob(seg(lt, ly + 0.2, ly + 1.0)), 1);
        const a = eo(seg(lt, Le(19) - st + 0.1, Le(19) - st + 1.0)); B.serif('Parashurama', 540, 590, 150, { italic: true, w: 600, a }); B.serif('the sixth avatar of Vishnu', 540, 666, 52, { a, ls: 2 }); } });
    cue(st, 'waves', { dur: 4.0, gain: 0.45 }); cue(st + ly, 'thud', { gain: 0.4 }); cue(st + ly + 0.3, 'chime', { note: 4 });
    cue(Le(19) + 0.2, 'conch', { gain: 0.8 }); cue(Le(19) + 0.3, 'bell', { gain: 1.0 }); }

  return { shots: S, cues: CUES };
}
