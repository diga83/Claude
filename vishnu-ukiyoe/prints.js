// The six prints of "The Patient Tortoise": cached colour blocks (g0 key · g1 blues · g2 secondary · g3 reds/golds) + per-frame paint()
import { clamp, lerp, seg, ss, eio, eo, mulberry, hash, vnoise, TAU } from '/core/lib.js';
import { W, H, FR, PAL, mk, carve, wob, line, fillPath, bokashi, kasumi, smooth, poly, printTex } from './print.js';

const step8 = t => Math.floor(t * 8) / 8, step12 = t => Math.floor(t * 12) / 12;
const GOLD = '#d9a441', GOLDL = '#ecd08a', PINK = '#efc4a8', PINK2 = '#e3a08a';

// ---------- shared motifs ----------
function seaBands(x, y0, y1, cols, seed = 1) {   // banded water, bokashi between bands, paper foam lines
  const n = cols.length, h = (y1 - y0) / n;
  for (let i = 0; i < n; i++) bokashi(x, 0, y0 + i * h, W, y0 + (i + 1) * h + 30, cols[i], .95, .7, { seed: seed + i, rough: 14 });
}
function scallops(x, y0, y1, gap, col, w, seed) {   // rows of shallow wave arcs, carved
  const R = mulberry(seed);
  for (let y = y0; y < y1; y += gap) {
    const off = R() * 120;
    for (let cx = -60 + off; cx < W + 60; cx += 120) carve(x, [[cx - 54, y + 6], [cx - 20, y - 6 - R() * 4], [cx + 22, y - 4], [cx + 54, y + 6]], w, { col, seed: cx + y, taper: [.3, .3] });
  }
}
function figure(x, px, py, s, lean, robe, skin = PAL.skin, dark = false, halo = false) {   // a small flat figure pulling to the side (lean > 0: leaning left)
  x.save(); x.translate(px, py); x.scale(s, s); x.rotate(-lean);
  if (halo) { x.fillStyle = 'rgba(236,208,138,.85)'; x.beginPath(); x.arc(0, -98, 20, 0, TAU); x.fill(); }
  x.fillStyle = dark ? PAL.prusD : robe;   // legs, lunging
  x.beginPath(); x.moveTo(-6, -38); x.lineTo(-30, 0); x.lineTo(-20, 2); x.lineTo(2, -30); x.lineTo(18, 0); x.lineTo(28, 0); x.lineTo(8, -40); x.closePath(); x.fill();
  x.fillStyle = robe; x.beginPath(); x.moveTo(-16, -40); x.lineTo(16, -40); x.lineTo(10, -84); x.lineTo(-10, -84); x.closePath(); x.fill();   // robe
  x.fillStyle = skin; x.beginPath(); x.arc(0, -96, 11, 0, TAU); x.fill();   // head
  x.fillStyle = dark ? PAL.sumi : PAL.sumiL; x.beginPath(); x.arc(2, -104, 7, Math.PI, TAU); x.fill();   // topknot / hair
  x.strokeStyle = skin; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.moveTo(-6, -78); x.lineTo(-38, -66); x.moveTo(6, -76); x.lineTo(-34, -60); x.stroke();   // arms forward to the rope
  x.strokeStyle = PAL.sumi; x.lineWidth = 1.6; x.lineJoin = 'round';
  x.beginPath(); x.moveTo(-16, -40); x.lineTo(16, -40); x.lineTo(10, -84); x.lineTo(-10, -84); x.closePath(); x.stroke();
  x.beginPath(); x.arc(0, -96, 11, 0, TAU); x.stroke();
  x.restore();
}
function rock(x, pts, fill, seed, keyW = 2.6) { fillPath(x, wob(pts, 4, seed), fill); return pts; }
function pads(x, cx, cy, n, r, cols, seed) {   // flat foliage pads with needle fans
  const R = mulberry(seed);
  for (let i = 0; i < n; i++) {
    const px = cx + (R() - .5) * r * 2, py = cy + (R() - .5) * r * .8, w = r * (.5 + R() * .5), h = w * .32;
    x.fillStyle = cols[i % cols.length]; x.beginPath(); x.ellipse(px, py, w, h, 0, 0, TAU); x.fill();
  }
}
function padKeys(x, cx, cy, n, r, seed) {
  const R = mulberry(seed); x.strokeStyle = PAL.sumi; x.lineWidth = 1.4;
  for (let i = 0; i < n; i++) {
    const px = cx + (R() - .5) * r * 2, py = cy + (R() - .5) * r * .8, w = r * (.5 + R() * .5);
    for (let k = -4; k <= 4; k++) { x.beginPath(); x.moveTo(px, py + w * .22); x.lineTo(px + k * w * .2, py - w * .1); x.stroke(); }
  }
}

// ---------- I · the ocean of milk ----------
const V1 = {
  id: 'v1', layers: {
    blue: { g: 1, grain: .12, draw: x => {
      bokashi(x, 0, 44, W, 760, PAL.prus, .9, 0, { seed: 4, rough: 26 });
      for (let i = 0; i < 9; i++) bokashi(x, 0, 1150 + i * 80, W, 1150 + i * 80 + 22, PAL.skyL, .55, 0, { seed: 20 + i, rough: 8 });   // the milk sea: paper, with pale bands
      bokashi(x, 0, 1110, W, 1160, PAL.sky, .7, .15, { seed: 9, rough: 6 });
    } },
    land: { g: 2, grain: .06, draw: x => {
      fillPath(x, [[38, 1880], [38, 1560], [140, 1530], [260, 1548], [380, 1600], [470, 1700], [540, 1880]], PAL.greyL);
      fillPath(x, [[38, 1880], [38, 1640], [160, 1612], [300, 1650], [420, 1760], [470, 1880]], PAL.green);
      for (const [cx, w] of [[740, 140], [930, 90]]) fillPath(x, [[cx - w, 1120], [cx - w * .4, 1088], [cx + w * .2, 1094], [cx + w, 1120]], PAL.greyL);
    } },
    red: { g: 3, draw: x => {
      kasumi(x, 360, 820, 760, 70, PINK, .85); kasumi(x, 760, 960, 620, 58, PINK, .7);
      x.fillStyle = PAL.beniL; x.beginPath(); x.arc(230, 1060, 64, 0, TAU); x.fill();   // a low pale sun
      [[150, 1545], [205, 1540], [258, 1546], [310, 1560]].forEach(([fx, fy], i) => figure(x, fx, fy, .9, -.05, [PAL.ochre, PAL.beniL, PAL.straw, PAL.ochreL][i], PAL.skin, false, true));
    } },
    key: { g: 0, draw: x => {
      carve(x, [[38, 1112], [400, 1108], [760, 1114], [1042, 1110]], 2.4, { col: PAL.sumiL, seed: 2 });
      scallops(x, 1190, 1860, 70, PAL.sumi, 2.2, 7);
      carve(x, [[38, 1560], [140, 1530], [260, 1548], [380, 1600], [470, 1700], [540, 1880]], 3.2, { col: PAL.sumi, seed: 5 });
      x.strokeStyle = PAL.sumi; x.lineWidth = 2; x.beginPath(); x.arc(230, 1060, 64, 0, TAU); x.stroke();
    } },
  },
  paint(x, t, R) { R.L('blue'); R.L('land'); R.L('red'); R.L('key');
    R.D(0, c => { const ts = step8(t); for (let i = 0; i < 2; i++) { const bx = 520 + ((ts * 34 + i * 140) % 700), by = 520 - i * 50 + Math.sin(ts * 2 + i) * 8, f = Math.sin(ts * 9 + i * 2) * 10; c.strokeStyle = PAL.sumi; c.lineWidth = 2.6; c.beginPath(); c.moveTo(bx - 22, by - f); c.quadraticCurveTo(bx - 10, by - 8, bx, by); c.quadraticCurveTo(bx + 10, by - 8, bx + 22, by - f); c.stroke(); } });
  },
};

// ---------- II · the churning ----------
const MT = { cx: 540, top: 300, bot: 1560 };   // the mountain
const mtHalf = y => lerp(90, 210, clamp((y - MT.top) / (MT.bot - MT.top)));
function mountainShape(x, dy) {
  const L = [], Rr = []; for (let y = MT.top; y <= MT.bot + 60; y += 40) { const hw = mtHalf(y) * (1 + .08 * Math.sin(y * .02)); L.push([MT.cx - hw, y + dy]); Rr.unshift([MT.cx + hw, y + dy]); }
  return [[MT.cx - 70, MT.top - 30 + dy], [MT.cx - 10, MT.top - 70 + dy], [MT.cx + 60, MT.top - 40 + dy], ...Rr.reverse().map((p, i) => p), ...L.reverse()];
}
const V2 = {
  id: 'v2', layers: {
    blue: { g: 1, grain: .14, draw: x => { bokashi(x, 0, 44, W, 900, PAL.sky, .75, 0, { seed: 31, rough: 26 }); seaBands(x, 1440, 1880, [PAL.prusL, PAL.prus, PAL.prusD], 33); } },
    shore: { g: 2, grain: .06, draw: x => {
      for (const sd of [1, -1]) { const X = v => sd > 0 ? v : W - v;
        x.fillStyle = PAL.greyL; x.beginPath(); poly(x, [[X(38), 1880], [X(38), 1440], [X(120), 1420], [X(200), 1426], [X(280), 1452], [X(330), 1520], [X(300), 1620], [X(340), 1880]]); x.fill();
        x.fillStyle = PAL.green; x.beginPath(); poly(x, [[X(38), 1440], [X(120), 1420], [X(200), 1426], [X(280), 1452], [X(300), 1478], [X(38), 1478]]); x.fill(); }
    } },
    key: { g: 0, draw: x => {
      for (const sd of [1, -1]) { const X = v => sd > 0 ? v : W - v; carve(x, [[X(38), 1440], [X(120), 1420], [X(200), 1426], [X(280), 1452], [X(330), 1520], [X(300), 1620], [X(340), 1880]], 3.2, { col: PAL.sumi, seed: 3 + sd, per: 2 }); for (let k = 0; k < 4; k++) carve(x, [[X(80 + k * 50), 1520 + k * 60], [X(160 + k * 40), 1500 + k * 64]], 2, { col: PAL.sumi, seed: 9 + k + sd }); }
      scallops(x, 1520, 1860, 64, '#f2ead6', 4, 12);
    } },
  },
  paint(x, t, R) {
    R.L('blue');
    const sink = eio(seg(t, 32.8, 35.4)), dy = sink * 90, rot = sink * .025;
    // the mountain, with the serpent wound round it (back coils first)
    const coil = (front, c) => {
      const ts = step8(t), ph = ts * (t < 35.4 ? 46 : 12);
      for (let k = 0; k < 12; k++) {
        const y = MT.top + 140 + ((k * 104 + ph) % 1248), hw = mtHalf(y);
        if (y > MT.bot - 40) continue;
        const a = [MT.cx - hw - 26, y + 34], b = [MT.cx + hw + 26, y - 34];
        const pts = front ? [a, [MT.cx, y + 18], b] : [b, [MT.cx, y - 50], a];
        c.lineCap = 'round'; c.strokeStyle = front ? '#4f7f5e' : '#3e5a3a'; c.lineWidth = 40; c.beginPath(); smooth(c, pts); c.stroke();
        if (front) { c.strokeStyle = '#b5c07a'; c.lineWidth = 9; c.beginPath(); smooth(c, pts.map(([u, v]) => [u, v + 13])); c.stroke(); c.strokeStyle = PAL.sumi; c.lineWidth = 2.4; c.beginPath(); smooth(c, pts.map(([u, v]) => [u, v - 20])); c.stroke(); c.beginPath(); smooth(c, pts.map(([u, v]) => [u, v + 20])); c.stroke(); }
      }
    };
    R.D(2, c => { c.save(); c.translate(MT.cx, MT.bot); c.rotate(rot); c.translate(-MT.cx, -MT.bot + dy); coil(false, c); c.restore(); });
    R.D(2, c => {
      c.save(); c.translate(MT.cx, MT.bot); c.rotate(rot); c.translate(-MT.cx, -MT.bot + dy);
      const sh = mountainShape(c, 0); fillPath(c, sh, PAL.greyL); c.save(); c.beginPath(); smooth(c, sh, true); c.clip(); printTex(c, .14, .4);
      for (let i = 0; i < 9; i++) { const y = MT.top + 80 + i * 130; c.fillStyle = i % 2 ? PAL.ochreL : PAL.grey; c.globalAlpha = .55; c.fillRect(0, y, W, 34); } c.globalAlpha = 1; c.restore();
      c.strokeStyle = PAL.sumi; c.lineWidth = 3.4; c.beginPath(); smooth(c, sh, true); c.stroke();
      for (let i = 0; i < 9; i++) { const y = MT.top + 80 + i * 130, hw = mtHalf(y); carve(c, [[MT.cx - hw + 20, y + 10], [MT.cx - 20, y - 8], [MT.cx + hw - 30, y + 6]], 2.2, { col: PAL.sumi, seed: i + 40 }); }
      pads(c, MT.cx, MT.top - 40, 5, 80, [PAL.pine, PAL.greenD], 5); padKeys(c, MT.cx, MT.top - 40, 5, 80, 5);
      coil(true, c);
      c.restore();
    });
    // the rope runs out to the pullers on both shores
    R.D(2, c => {
      const ts = step8(t), pull = Math.sin(ts * 2 * Math.PI * .7);
      c.lineCap = 'round';
      for (const [side, x1] of [[-1, 38], [1, 1042]]) {
        const x0 = MT.cx + side * (mtHalf(1380) + 20), pts = [[x0, 1386 + dy], [lerp(x0, x1, .5), 1400 + pull * side * 6], [x1, 1372]];
        c.strokeStyle = '#4f7f5e'; c.lineWidth = 30; c.beginPath(); smooth(c, pts); c.stroke(); c.strokeStyle = PAL.sumi; c.lineWidth = 2.2; c.beginPath(); smooth(c, pts.map(([u, v]) => [u, v - 15])); c.stroke(); c.beginPath(); smooth(c, pts.map(([u, v]) => [u, v + 15])); c.stroke();
      }
    });
    R.L('shore');
    R.D(3, c => {   // gods at the tail (left), demons at the head (right); they pull in turn, stepping at 8 fps
      const ts = step8(t), ph = Math.sin(ts * 2 * Math.PI * .7);
      [[90, 1426], [150, 1420], [212, 1428], [268, 1446]].forEach(([fx, fy], i) => figure(c, fx, fy, 1, .22 + .1 * ph, [PAL.ochre, PAL.beniL, PAL.straw, PAL.ochreL][i], PAL.skin, false, true));
      [[990, 1426], [930, 1420], [868, 1428], [812, 1446]].forEach(([fx, fy], i) => { c.save(); c.translate(fx, 0); c.scale(-1, 1); c.translate(-fx, 0); figure(c, fx, fy, 1.05, .22 - .1 * ph, [PAL.ai, PAL.prusD, '#5b3a4a', PAL.ai][i], '#8a9aa6', true); c.restore(); });
    });
    // churned foam round the base
    R.D(0, c => { const ts = step12(t); c.strokeStyle = '#f6efdc'; c.lineWidth = 6; c.lineCap = 'round'; for (let i = 0; i < 7; i++) { const a = ts * 2.4 + i * .9, rx = 280 + i * 18; c.beginPath(); c.ellipse(MT.cx, 1560 + dy * .5, rx, 46 + i * 6, 0, a, a + 1.4); c.stroke(); } });
    R.L('key');
  },
};

// ---------- III · Kurma ----------
const V3 = {
  id: 'v3', layers: {
    blue: { g: 1, grain: .16, draw: x => {
      bokashi(x, 0, 44, W, 1880, PAL.prusL, .55, 1, { seed: 51, rough: 30, col2: PAL.prusD });
      for (let i = 0; i < 5; i++) kasumi(x, 200 + i * 180, 300 + i * 110, 900, 30, PAL.skyL, .18);
    } },
    rock: { g: 2, grain: .1, draw: x => {
      const sh = [[MT.cx - 220, 44], [MT.cx + 220, 44], [MT.cx + 250, 700], [MT.cx + 160, 860], [MT.cx - 170, 860], [MT.cx - 250, 700]];
      fillPath(x, sh, PAL.greyL); x.save(); x.beginPath(); smooth(x, sh, true); x.clip(); for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? PAL.ochreL : PAL.grey; x.globalAlpha = .5; x.fillRect(0, 100 + i * 130, W, 34); } x.restore(); x.globalAlpha = 1;
    } },
    shell: { g: 3, grain: .08, draw: x => {
      x.fillStyle = '#9a8a56'; x.beginPath(); x.ellipse(540, 1080, 430, 250, 0, Math.PI, TAU); x.lineTo(970, 1110); x.quadraticCurveTo(540, 1200, 110, 1110); x.closePath(); x.fill();
      x.fillStyle = '#c9b06a'; x.beginPath(); x.ellipse(540, 1130, 440, 52, 0, 0, TAU); x.fill();   // the rim
      x.fillStyle = '#7f9a6c'; x.beginPath(); x.ellipse(70, 1170, 90, 58, -.2, 0, TAU); x.fill();   // head
    } },
    key: { g: 0, draw: x => {
      carve(x, [[MT.cx - 220, 44], [MT.cx - 250, 700], [MT.cx - 170, 860]], 3.2, { col: PAL.sumi, seed: 61 }); carve(x, [[MT.cx + 220, 44], [MT.cx + 250, 700], [MT.cx + 160, 860]], 3.2, { col: PAL.sumi, seed: 62 });
      x.strokeStyle = PAL.sumi; x.lineWidth = 3.4; x.beginPath(); x.ellipse(540, 1080, 430, 250, 0, Math.PI, TAU); x.stroke(); x.beginPath(); x.ellipse(540, 1130, 440, 52, 0, 0, TAU); x.stroke();
      // scutes: a hexagon pattern on the dome, carved
      x.lineWidth = 2.4;
      for (let r = 0; r < 3; r++) for (let k = -3 + r; k <= 3 - r; k++) { const cx = 540 + k * 118 + (r % 2) * 0, cy = 1060 - r * 78, s = 52; const hx = [0, 1, 2, 3, 4, 5].map(i => [cx + Math.cos(i * Math.PI / 3) * s * 1.1, cy + Math.sin(i * Math.PI / 3) * s * .72]); x.beginPath(); poly(x, hx); x.stroke(); }
      x.beginPath(); x.ellipse(70, 1170, 90, 58, -.2, 0, TAU); x.stroke(); x.fillStyle = PAL.sumi; x.beginPath(); x.arc(30, 1150, 7, 0, TAU); x.fill();
      x.beginPath(); x.moveTo(-10, 1185); x.quadraticCurveTo(20, 1196, 46, 1190); x.stroke();
    } },
  },
  paint(x, t, R) {
    R.L('blue'); R.L('rock');
    const ts = step8(t), pad = Math.sin(ts * 2.2) * .14;
    R.D(3, c => {   // flippers, paddling slowly
      for (const [fx, fy, base, sd] of [[260, 1170, 2.6, -1], [820, 1170, .55, 1], [330, 1230, 2.2, -1], [760, 1230, .95, 1]]) {
        c.save(); c.translate(fx, fy); c.rotate(base + sd * pad); c.fillStyle = '#7f9a6c'; c.beginPath(); c.ellipse(80, 0, 110, 34, 0, 0, TAU); c.fill(); c.strokeStyle = PAL.sumi; c.lineWidth = 2.6; c.stroke(); c.restore();
      }
    });
    R.L('shell'); R.L('key');
    R.D(0, c => { const tt = step12(t); for (let i = 0; i < 14; i++) { const u = (tt * .12 + hash(i)) % 1, bx = 180 + hash(i * 3.1) * 720 + Math.sin(tt * 2 + i) * 10, by = 1700 - u * 1500, r = 5 + hash(i * 7) * 9; c.strokeStyle = 'rgba(246,239,220,.85)'; c.lineWidth = 2; c.beginPath(); c.arc(bx, by, r, 0, TAU); c.stroke(); } });
    R.D(3, c => { const tt = step8(t); for (let i = 0; i < 4; i++) { const fx = ((tt * 40 + i * 260) % 1200) - 60, fy = 1450 + i * 70; c.fillStyle = PINK2; c.beginPath(); c.ellipse(fx, fy, 26, 10, 0, 0, TAU); c.moveTo(fx - 24, fy); c.lineTo(fx - 40, fy - 10); c.lineTo(fx - 40, fy + 10); c.fill(); } });
  },
};

// ---------- IV · treasures: one sea key block, four impressions ----------
const SKY4 = [[PAL.prusD, PAL.prus], [PAL.beniP, PAL.paper], [PAL.sky, PAL.paper], [PAL.ochreL, PAL.paper]];
function seaKey(x) { carve(x, [[38, 1150], [520, 1146], [1042, 1150]], 2.6, { col: PAL.sumi, seed: 81 }); scallops(x, 1220, 1860, 66, PAL.sumi, 2.2, 82); }
function elephant(x, key) {   // a white elephant (paper white, carved outline), a festive red cloth
  const body = [[290, 1000], [320, 890], [450, 845], [640, 850], [770, 900], [800, 990], [780, 1050], [300, 1060]];
  const legs = [[330, 1030, 70], [430, 1040, 70], [620, 1040, 72], [720, 1030, 72]];
  if (!key) {
    x.fillStyle = '#f6efdc'; for (const [lx, ly, w] of legs) x.fillRect(lx, ly - 40, w, 170);
    fillPath(x, body, '#f6efdc'); x.beginPath(); x.ellipse(800, 900, 96, 104, 0, 0, TAU); x.fill();
    x.fillStyle = PAL.beni; x.beginPath(); x.moveTo(430, 860); x.lineTo(640, 856); x.lineTo(660, 1000); x.lineTo(420, 1004); x.closePath(); x.fill();
    x.fillStyle = GOLD; x.fillRect(420, 990, 240, 16); for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(430 + i * 28, 1014, 7, 0, TAU); x.fill(); }
    x.fillStyle = PINK; x.beginPath(); x.ellipse(735, 905, 66, 92, .1, 0, TAU); x.fill();   // the ear
    return;
  }
  carve(x, body, 4.2, { col: PAL.sumi, seed: 31, closed: true });
  for (const [lx, ly, w] of legs) { carve(x, [[lx, ly], [lx + 2, ly + 128]], 3.6, { col: PAL.sumi, seed: lx }); carve(x, [[lx + w, ly], [lx + w - 2, ly + 128]], 3.6, { col: PAL.sumi, seed: lx + 1 }); carve(x, [[lx - 4, ly + 128], [lx + w + 4, ly + 128]], 3, { col: PAL.sumi, seed: lx + 2 }); }
  carve(x, [[740, 820], [840, 800], [890, 860], [890, 960], [870, 1040], [890, 1150], [870, 1180], [850, 1160]], 4, { col: PAL.sumi, seed: 32 });   // head and trunk
  carve(x, [[735, 813], [790, 840], [800, 950], [740, 1000], [690, 960], [680, 860]], 3, { col: PAL.sumi, seed: 33, closed: true });   // ear
  carve(x, [[850, 980], [920, 1000], [960, 960]], 7, { col: '#f6efdc', seed: 34 }); carve(x, [[850, 980], [920, 1000], [960, 960]], 2.2, { col: PAL.sumi, seed: 35 });   // tusk
  carve(x, [[430, 860], [640, 856], [660, 1000], [420, 1004]], 2.6, { col: PAL.sumi, seed: 36, closed: true });
  x.fillStyle = PAL.sumi; x.beginPath(); x.ellipse(840, 878, 6, 4, -.3, 0, TAU); x.fill();
}
function cow(x, key) {   // a white cow of plenty, a garland at the neck
  const body = [[330, 980], [350, 900], [430, 880], [650, 885], [720, 910], [740, 990], [700, 1040], [360, 1040]];
  const legs = [[370, 1020], [440, 1025], [620, 1025], [680, 1020]];
  if (!key) {
    x.fillStyle = '#f6efdc'; for (const [lx, ly] of legs) x.fillRect(lx, ly - 20, 36, 150);
    fillPath(x, body, '#f6efdc'); x.beginPath(); x.ellipse(790, 900, 62, 46, -.35, 0, TAU); x.fill();
    x.fillStyle = PAL.ochreL; x.beginPath(); x.ellipse(520, 950, 70, 40, 0, 0, TAU); x.fill(); x.beginPath(); x.ellipse(640, 920, 40, 26, 0, 0, TAU); x.fill();   // patches
    for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? GOLD : PAL.beni; x.beginPath(); x.arc(720 + i * 7, 935 + Math.sin(i * .9) * 12, 9, 0, TAU); x.fill(); }
    return;
  }
  carve(x, body, 4.2, { col: PAL.sumi, seed: 41, closed: true }); carve(x, [[740, 900], [770, 862], [830, 870], [850, 910], [820, 940], [770, 940]], 3.6, { col: PAL.sumi, seed: 42, closed: true });
  for (const [lx, ly] of legs) { carve(x, [[lx, ly], [lx + 2, ly + 128]], 3.2, { col: PAL.sumi, seed: lx }); carve(x, [[lx + 36, ly], [lx + 34, ly + 128]], 3.2, { col: PAL.sumi, seed: lx + 1 }); x.fillStyle = PAL.sumi; x.fillRect(lx - 2, ly + 120, 40, 12); }
  carve(x, [[790, 866], [800, 820], [836, 806]], 3.4, { col: PAL.sumi, seed: 43 }); carve(x, [[770, 866], [748, 824], [716, 812]], 3.4, { col: PAL.sumi, seed: 44 });   // horns
  carve(x, [[335, 930], [300, 980], [310, 1060], [296, 1076]], 3, { col: PAL.sumi, seed: 45 });   // tail
  x.fillStyle = PAL.sumi; x.beginPath(); x.ellipse(812, 888, 5, 4, 0, 0, TAU); x.fill();
}
function wishTree(x, key) {
  if (!key) { x.fillStyle = PAL.woodL; x.fillRect(520, 820, 40, 300); pads(x, 540, 720, 7, 260, [PAL.green, PAL.greenD, PAL.greenL], 91); x.fillStyle = GOLD; const R = mulberry(92); for (let i = 0; i < 16; i++) { x.beginPath(); x.arc(320 + R() * 440, 620 + R() * 220, 12, 0, TAU); x.fill(); } x.fillStyle = PAL.beni; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(360 + R() * 360, 640 + R() * 200, 10, 0, TAU); x.fill(); } return; }
  carve(x, [[520, 1120], [528, 950], [520, 820]], 3, { col: PAL.sumi, seed: 93 }); carve(x, [[560, 1120], [552, 950], [560, 820]], 3, { col: PAL.sumi, seed: 94 }); padKeys(x, 540, 720, 7, 260, 91);
}
function moon(x, key) { if (!key) { x.fillStyle = PAL.ochreL; x.beginPath(); x.arc(540, 860, 190, 0, TAU); x.fill(); x.fillStyle = 'rgba(246,239,220,.6)'; for (let i = 0; i < 6; i++) x.fillRect(420 + (i % 2) * 40, 1180 + i * 40, 240 - (i % 2) * 80, 6); return; } x.strokeStyle = PAL.sumi; x.lineWidth = 3; x.beginPath(); x.arc(540, 860, 190, 0, TAU); x.stroke(); }
const OBJ4 = [moon, elephant, wishTree, cow];
const V4 = { id: 'v4', layers: {
    sea: { g: 1, grain: .14, draw: x => seaBands(x, 1150, 1880, [PAL.prusL, PAL.prus, PAL.prusD], 71) },
    key: { g: 0, draw: seaKey },
    ...Object.fromEntries([0, 1, 2, 3].flatMap(k => [[`sky${k}`, { g: 2, grain: .12, draw: x => bokashi(x, 0, 44, W, 1150, SKY4[k][0], .95, .2, { seed: 72 + k, rough: 26, col2: SKY4[k][1] }) }],
      [`obj${k}`, { g: 3, grain: .05, draw: x => OBJ4[k](x, false) }], [`okey${k}`, { g: 0, speck: .2, draw: x => OBJ4[k](x, true) }]])),
  },
  impression: t => 0,
  paint(x, t, R) {
    const k = R.imp(t), prev = Math.max(0, k - 1), pr = R.impRev(t);
    const bob = Math.sin(step8(t) * 1.6) * 6, rise = -40 * eo(clamp(R.impAge(t) / 2.4));
    if (pr < 1 && k > 0) { R.L(`sky${prev}`); }
    R.Lr(`sky${k}`, pr);
    R.L('sea');
    if (pr < 1 && k > 0) { R.Lt(`obj${prev}`, 0, bob); R.Lt(`okey${prev}`, 0, bob); }
    R.Lr(`obj${k}`, pr, rise + bob); R.Lr(`okey${k}`, pr, rise + bob);
    R.L('key');
  },
};

// ---------- V · Lakshmi ----------
const V5 = { id: 'v5', layers: {
    sky: { g: 2, grain: .12, draw: x => { bokashi(x, 0, 44, W, 1150, PAL.ochreL, .6, .1, { seed: 101, rough: 24, col2: PAL.paper }); for (let i = 5; i >= 1; i--) { x.fillStyle = `rgba(236,208,138,${.12 + .05 * (5 - i)})`; x.beginPath(); x.arc(540, 900, 120 + i * 80, 0, TAU); x.fill(); } } },
    sea: { g: 1, grain: .14, draw: x => seaBands(x, 1150, 1880, [PAL.prusL, PAL.prus, PAL.prusD], 102) },
    lotus: { g: 3, grain: .05, draw: x => {
      const P = (a, L, w, col) => { x.fillStyle = col; x.beginPath(); const tx = 540 + Math.cos(a) * L, ty = 1040 + Math.sin(a) * L, nx = -Math.sin(a) * w, ny = Math.cos(a) * w; x.moveTo(540, 1040); x.quadraticCurveTo(540 + Math.cos(a) * L * .5 + nx, 1040 + Math.sin(a) * L * .5 + ny, tx, ty); x.quadraticCurveTo(540 + Math.cos(a) * L * .5 - nx, 1040 + Math.sin(a) * L * .5 - ny, 540, 1040); x.fill(); };
      for (let i = 0; i < 9; i++) P(-Math.PI + .2 + i / 8 * (Math.PI - .4), 260, 70, PINK);
      for (let i = 0; i < 5; i++) P(-Math.PI + .6 + i / 4 * (Math.PI - 1.2), 200, 64, PINK2);
      x.fillStyle = GOLD; x.beginPath(); x.ellipse(540, 980, 60, 24, 0, 0, TAU); x.fill();
      x.fillStyle = '#7f9a6c'; x.beginPath(); x.ellipse(540, 1060, 300, 30, 0, 0, TAU); x.fill();   // a pad under the flower
      x.fillStyle = GOLD; x.beginPath(); x.arc(860, 560, 70, 0, TAU); x.fill(); x.fillStyle = PAL.paper; x.beginPath(); x.arc(860, 560, 44, 0, TAU); x.fill();   // the discus, waiting
      fillPath(x, [[700, 640], [760, 600], [860, 610], [960, 600], [1010, 640], [940, 660], [780, 664]], '#f6efdc');
    } },
    key: { g: 0, draw: x => {
      x.strokeStyle = PAL.sumi; x.lineWidth = 2.4;
      const P = (a, L, w) => { const tx = 540 + Math.cos(a) * L, ty = 1040 + Math.sin(a) * L, nx = -Math.sin(a) * w, ny = Math.cos(a) * w; x.beginPath(); x.moveTo(540, 1040); x.quadraticCurveTo(540 + Math.cos(a) * L * .5 + nx, 1040 + Math.sin(a) * L * .5 + ny, tx, ty); x.quadraticCurveTo(540 + Math.cos(a) * L * .5 - nx, 1040 + Math.sin(a) * L * .5 - ny, 540, 1040); x.stroke(); };
      for (let i = 0; i < 9; i++) P(-Math.PI + .2 + i / 8 * (Math.PI - .4), 260, 70); for (let i = 0; i < 5; i++) P(-Math.PI + .6 + i / 4 * (Math.PI - 1.2), 200, 64);
      x.beginPath(); x.ellipse(540, 1060, 300, 30, 0, 0, TAU); x.stroke(); x.beginPath(); x.arc(860, 560, 70, 0, TAU); x.stroke(); x.beginPath(); x.arc(860, 560, 44, 0, TAU); x.stroke();
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; x.beginPath(); x.moveTo(860 + Math.cos(a) * 44, 560 + Math.sin(a) * 44); x.lineTo(860 + Math.cos(a) * 70, 560 + Math.sin(a) * 70); x.stroke(); }
      x.beginPath(); smooth(x, [[700, 640], [760, 600], [860, 610], [960, 600], [1010, 640], [940, 660], [780, 664]], true); x.stroke();
      seaKey(x);
    } },
  },
  paint(x, t, R) {
    R.L('sky'); R.L('sea'); R.L('lotus'); R.L('key');
    const gp = eio(seg(t, 78.0, 80.4));   // the garland drifts from the lotus to the discus
    if (gp > 0) R.D(3, c => { const ts = step8(t); for (let i = 0; i < 18; i++) { const a = i / 18 * TAU, u = gp, cx = lerp(540, 860, u), cy = lerp(960, 560, u) - Math.sin(u * Math.PI) * 120, r = lerp(46, 78, u); const px = cx + Math.cos(a + ts * .5) * r, py = cy + Math.sin(a + ts * .5) * r * .5; c.fillStyle = i % 2 ? '#f6efdc' : PAL.beni; c.beginPath(); c.arc(px, py, 9, 0, TAU); c.fill(); c.strokeStyle = PAL.sumi; c.lineWidth = 1.2; c.stroke(); } });
  },
};

// ---------- VI · amrita ----------
const V6 = { id: 'v6', layers: {
    sky: { g: 2, grain: .12, draw: x => { bokashi(x, 0, 44, W, 1150, PAL.beniP, .55, .05, { seed: 121, rough: 24, col2: PAL.paper }); kasumi(x, 300, 420, 700, 60, '#f6efdc', .9); kasumi(x, 760, 560, 600, 50, '#f6efdc', .8); } },
    sea: { g: 1, grain: .14, draw: x => seaBands(x, 1150, 1880, [PAL.prusL, PAL.prus, PAL.prusD], 122) },
    key: { g: 0, draw: seaKey },
  },
  paint(x, t, R) {
    R.L('sky'); R.L('sea');
    const rise = -260 * eo(seg(t, 87.0, 91.4)), bob = Math.sin(step8(t) * 1.6) * 5, y = 1210 + rise + bob;
    R.D(3, c => {
      for (let i = 4; i >= 1; i--) { c.fillStyle = `rgba(236,208,138,${.14 * ss(seg(t, 88, 91))})`; c.beginPath(); c.arc(540, y - 120, 90 + i * 60, 0, TAU); c.fill(); }
      c.fillStyle = GOLD; c.beginPath(); c.ellipse(540, y - 80, 130, 120, 0, 0, TAU); c.fill();   // the pot
      c.fillRect(480, y - 230, 120, 70); c.fillStyle = GOLDL; c.beginPath(); c.ellipse(540, y - 232, 90, 22, 0, 0, TAU); c.fill();
      c.fillStyle = PAL.beni; c.beginPath(); c.ellipse(540, y - 250, 34, 30, 0, Math.PI, TAU); c.fill();
      c.strokeStyle = PAL.sumi; c.lineWidth = 3; c.beginPath(); c.ellipse(540, y - 80, 130, 120, 0, 0, TAU); c.stroke(); c.strokeRect(480, y - 230, 120, 70); c.beginPath(); c.ellipse(540, y - 232, 90, 22, 0, 0, TAU); c.stroke();
      c.lineWidth = 2; for (let i = 0; i < 3; i++) { c.beginPath(); c.ellipse(540, y - 100 + i * 30, 120 - i * 6, 18, 0, 0, Math.PI); c.stroke(); }
    });
    R.L('key');
    R.D(0, c => { const ts = step12(t), u = seg(t, 87, 92); for (let i = 0; i < 26; i++) { const a = Math.PI + hash(i) * Math.PI, rr = 120 + ((ts * 60 + hash(i * 3) * 200) % 220); c.fillStyle = '#f6efdc'; c.beginPath(); c.arc(540 + Math.cos(a) * rr, 1180 + Math.sin(a) * rr * .3 - u * 20, 4 + hash(i * 5) * 6, 0, TAU); c.fill(); } });
  },
};

export const VIEWS = [V1, V2, V3, V4, V5, V6];
