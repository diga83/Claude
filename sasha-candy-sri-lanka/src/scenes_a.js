// Scenes 1-4: intro, map, Sigiriya, tea country
function seaWaves(y0, y1, t, col = 'rgba(255,255,255,.55)', n = 26, seed = 0) {
  for (let i = 0; i < n; i++) {
    const d = rnd(i + seed), y = lerp(y0, y1, d * d), sc = .4 + 1.2 * (y - y0) / (y1 - y0), x = ((rnd(i * 3 + seed) * 2400 + t * 30 * sc * (i % 2 ? 1 : -1)) % 2400 + 2400) % 2400 - 240;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 22 * sc, y - 10 * sc, x + 44 * sc, y); g.quadraticCurveTo(x + 66 * sc, y + 10 * sc, x + 88 * sc, y);
    g.strokeStyle = col; g.lineWidth = 3 + 3 * sc; g.lineCap = 'round'; g.stroke();
  }
}
function titleLogo(x, y, k, t, sub = 'Learn About Sri Lanka') {
  at(x, y, 1, 0, () => {
    const str = 'SASHA & CANDY', size = 168; g.font = `800 ${size}px "Baloo 2"`; g.letterSpacing = '0px';
    let wsum = 0; const ws = [...str].map(ch => { const w = g.measureText(ch).width; wsum += w; return w; }); let cx = -wsum / 2;
    [...str].forEach((ch, i) => {
      const kk = E.back(clamp(k * 2.4 - i * .1)), wob = Math.sin(t * 2.4 + i * .7) * 5;
      if (kk > 0) at(cx + ws[i] / 2, wob, kk, Math.sin(t * 1.5 + i) * .03, () => { txt(ch, 5, 9, size, 'rgba(60,20,90,.28)', { w: 800 }); txt(ch, 0, 0, size, ch === '&' ? C.coral : C.purple, { w: 800, stroke: '#fff', sw: 30 }); });
      cx += ws[i];
    });
    sparks(-wsum / 2 - 40, -40, clamp(k * 2 - 1), -1); sparks(wsum / 2 + 40, -40, clamp(k * 2 - 1), 1);
    const rk = E.back(clamp(k * 2 - .9));
    if (rk > 0) at(0, 138, rk, -.02, () => {
      poly([[-470, -30], [-400, 8], [-470, 62], [-360, 62], [-360, -30]], '#d94a3d'); poly([[470, -30], [400, 8], [470, 62], [360, 62], [360, -30]], '#d94a3d');
      rr(-400, -48, 800, 96, 20, C.coral); rr(-400, -48, 800, 44, 20, 'rgba(255,255,255,.14)');
      txt(sub, 0, 4, 68, '#fff', { w: 700 });
    });
  });
}
function plane(x, y, s, rot, t) {
  at(x, y, s, rot, () => {
    spr('c_playful', -62, -34, 128); spr('s_happy', 44, -30, 178);
    poly([[-250, -40], [-330, -150], [-262, -150], [-170, -52]], '#ffb627');                                   // tail fin
    g.beginPath(); g.moveTo(-270, -50); g.bezierCurveTo(-200, -78, 120, -80, 210, -52); g.bezierCurveTo(262, -30, 262, 44, 205, 62); g.bezierCurveTo(60, 100, -180, 60, -280, -8); g.closePath(); g.fillStyle = '#ff5a4f'; g.fill();
    g.beginPath(); g.moveTo(205, 62); g.bezierCurveTo(60, 100, -180, 60, -280, -8); g.bezierCurveTo(-150, 28, 60, 50, 232, 30); g.closePath(); g.fillStyle = '#d93d3d'; g.fill();
    rr(-130, -22, 250, 20, 10, '#fff'); for (let i = 0; i < 3; i++) heart(-80 + i * 80, 22, .22, '#ffd9d2');
    g.beginPath(); g.moveTo(-40, 26); g.bezierCurveTo(-30, 110, 90, 130, 150, 120); g.bezierCurveTo(160, 90, 120, 40, 90, 26); g.closePath(); g.fillStyle = '#ffb627'; g.fill();   // wing
    ell(236, 4, 34, 46, '#ffc93c'); circ(262, 4, 13, '#7b4a2b');
    g.save(); g.globalAlpha = .55; ell(270, 4, 12, 120, '#fff'); g.globalAlpha = .9; at(270, 4, 1, t * 40, () => { rr(-7, -118, 14, 236, 7, '#7b4a2b'); }); g.restore();
    circ(-20, 78, 26, '#3d2a52'); circ(-20, 78, 11, '#cfc4dd'); line(-20, 50, -10, 30, '#3d2a52', 9);
  });
}
SCENES.intro = (t, sc, s) => {
  const L0 = LN(0), L1 = LN(1), fly = seg(t, L1.a, L1.a + 1.0);
  rect(0, 0, W, H, lg(0, 0, 0, 760, [[0, '#2bb7e8'], [.55, '#8fe3e6'], [1, '#fff0b0']]));
  sunburst(960, 760, 1700, 22, s * .05, '#ffffff', .16);
  glow(960, 760, 620, 'rgba(255,220,110,.9)', .8); circ(960, 760, 190, '#ffd23f'); circ(960, 760, 150, '#ffe27a');
  for (let i = 0; i < 6; i++) cloud(((i * 420 + s * (14 + i * 3)) % 2500) - 300, 110 + (i * 97) % 360, .7 + rnd(i) * .7, .92);
  // the teardrop island rises on the horizon
  const ik = rise(t, L1.a + 2.2, 1.6);
  if (ik > 0) { const iy = 742 - ik * 70; glow(1480, iy, 330 * ik, 'rgba(255,255,255,.8)', .7); island(1480, iy + (1 - ik) * 120, 62 * ik + 1, { shadow: false }); }
  rect(0, 730, W, 360, lg(0, 730, 0, 1080, [[0, '#35c9d6'], [.4, '#17a2c4'], [1, '#0b6fa3']]));
  g.fillStyle = 'rgba(255,240,170,.35)'; g.beginPath(); g.moveTo(820, 730); g.lineTo(1100, 730); g.lineTo(1340, 1080); g.lineTo(580, 1080); g.fill();
  seaWaves(745, 1070, s);
  // flight path + plane
  if (fly > 0) {
    const pp = u => [lerp(-380, 1130, E.o2(u)) + Math.max(0, u - .75) * 1500, 470 - Math.sin(u * 3.3) * 120 + Math.max(0, u - .72) * 760 * (u - .72)];
    const u = seg(t, L1.a + .5, sc.b - .15), sh = 1 - .72 * E.io(seg(u, .7, 1));
    for (let i = 0; i < 60; i++) { const v = i / 60 * u; if (v < u - .45 || i % 2) continue; const p = pp(v); circ(p[0] - 200 * sh, p[1] + 10, 9 * sh, 'rgba(255,255,255,.85)'); }
    const p = pp(u), p2 = pp(u + .01); plane(p[0], p[1] + Math.sin(t * 5) * 6, .92 * sh, Math.atan2(p2[1] - p[1], p2[0] - p[0]) * .6, t);
  }
  // grassy ledge with Sasha and Candy
  const down = E.i2(fly) * 1000;
  g.save(); g.translate(0, down);
  band(x => 905 + Math.sin(x * .004 + 1) * 22, '#58c46b'); band(x => 950 + Math.sin(x * .006) * 14, '#3fae62');
  for (let i = 0; i < 22; i++) { const x = 40 + i * 88 + rnd(i) * 40, y = 930 + rnd(i + 5) * 60; circ(x, y, 9, ['#ff8fb8', '#ffd23f', '#fff', '#ff6b5a'][i % 4]); circ(x, y, 4, '#ffb627'); }
  const sk = E.back(seg(s, .7, 1.4)), ck = E.back(seg(t, Wd(0, 'this') - .1, Wd(0, 'this') + .5));
  const hop = Math.abs(Math.sin(seg(t, L1.a - .1, L1.a + .5) * Math.PI)) * 70;
  shadow(560, 962, 150 * sk); talker('s_wave', 560, 965 + (1 - sk) * 700 - hop, 530, t, { rot: Math.sin(t * 5) * .025 * seg(s, 1.2, 1.6) });
  if (ck > 0) { shadow(1360, 962, 190 * ck); at(1360, 965, ck, 0, () => spr('c_front', 0, -Math.abs(Math.sin(seg(t, Wd(0, 'this'), Wd(0, 'this') + 1.2) * Math.PI * 3)) * 26 - hop, 380)); }
  pill('Sasha', 800, 600, pop(t, Wd(0, 'Sasha')), { size: 46 }); sparks(880, 560, pop(t, Wd(0, 'Sasha') + .1));
  pill('Candy', 1360, 520, pop(t, Wd(0, 'Candy') - .15), { size: 46 }); sparks(1445, 480, pop(t, Wd(0, 'Candy')));
  g.restore();
  const tk = seg(s, .15, 1.6) * (1 - seg(t, L1.a + .2, L1.a + .7));
  if (tk > 0) at(960, 190 - E.i2(seg(t, L1.a + .2, L1.a + .7)) * 500, 1, 0, () => titleLogo(0, 0, seg(s, .15, 1.6), t));
  const nk = pop(t, Wd(1, 'Sri Lanka') - .1, .5);
  if (nk > 0) { at(960, 250, nk, -.03, () => { txt('Sri Lanka!', 6, 10, 190, 'rgba(60,20,90,.28)', { w: 800 }); txt('Sri Lanka!', 0, 0, 190, C.yellow, { w: 800, stroke: C.purple, sw: 44 }); txt('Sri Lanka!', 0, 0, 190, C.yellow, { w: 800, stroke: '#fff', sw: 14 }); }); sparkles(960, 250, 560, 14, t, '#fff', 4); }
};

// ---------------- MAP ----------------
function flag(x, y, s) {
  at(x, y, s, 0, () => {
    rr(-150, -76, 300, 152, 6, '#f7b718');
    rect(-140, -66, 30, 132, '#00534e'); rect(-110, -66, 30, 132, '#f37021'); rr(-70, -66, 210, 132, 2, '#8d153a');
    [[-58, -54], [128, -54], [-58, 54], [128, 54]].forEach(([a, b]) => ell(a, b, 6, 9, '#f7b718', a < 0 ? .6 * Math.sign(b) : -.6 * Math.sign(b)));
    g.fillStyle = '#f7b718';                                                         // simplified golden lion with a sword
    ell(42, 6, 46, 24, '#f7b718'); circ(-2, -14, 24, '#f7b718'); circ(-16, -18, 13, '#f7b718');
    rr(-2, 14, 13, 40, 5, '#f7b718'); rr(22, 18, 13, 36, 5, '#f7b718'); rr(58, 18, 13, 36, 5, '#f7b718'); rr(76, 12, 13, 42, 5, '#f7b718');
    curve([86, 0, 118, -10, 112, -44, 96, -40], '#f7b718', 8); circ(96, -40, 7, '#f7b718');
    line(-18, 2, -40, -8, '#f7b718', 11); line(-42, 8, -42, -52, '#f7b718', 6); line(-50, -6, -34, -6, '#f7b718', 5);
    circ(-20, -20, 2.5, '#8d153a');
  });
}
function pin(x, y, k, label, col = C.coral, side = 1) {
  if (k <= 0) return;
  at(x, y, k, 0, () => { ell(0, 2, 12, 5, 'rgba(0,40,60,.3)'); g.beginPath(); g.moveTo(0, 0); g.bezierCurveTo(-30, -34, -24, -66, 0, -66); g.bezierCurveTo(24, -66, 30, -34, 0, 0); g.fillStyle = col; g.fill(); circ(0, -44, 9, '#fff'); });
  if (label) { const w = tw(label, 30) + 30; at(x + side * (26 + w / 2), y - 40, k, 0, () => { rr(-w / 2, -24, w, 48, 24, '#fff'); txt(label, 0, 2, 30, C.plum); }); }
}
function bubble(x, y, w, h, k, tail = [-0.3, 1], fill = '#fff') {
  at(x, y, k, 0, () => { g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 46); const tx = tail[0] * w / 2, ty = tail[1] * h / 2; g.moveTo(tx - 34, ty - 4 * tail[1]); g.lineTo(tx - 70, ty + 74 * tail[1]); g.lineTo(tx + 34, ty - 4 * tail[1]); g.fillStyle = 'rgba(60,20,90,.22)'; g.save(); g.translate(5, 9); g.fill(); g.restore(); g.fillStyle = fill; g.fill(); g.strokeStyle = C.purple; g.lineWidth = 6; g.lineJoin = 'round'; g.stroke(); rr(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 40, fill); });
}
SCENES.map = (t, sc, s) => {
  const cx = 1190, cy = 545, S = 165, z = 1 + .035 * seg(s, 0, 15);
  rect(0, 0, W, H, rg(1150, 520, 100, 1300, [[0, '#2ccfd6'], [.55, '#139fc6'], [1, '#0a6497']]));
  g.save(); g.translate(960, 540); g.scale(z, z); g.translate(-960, -540);
  g.strokeStyle = 'rgba(255,255,255,.1)'; g.lineWidth = 3; for (let i = 0; i < 7; i++) { g.beginPath(); g.moveTo(0, 120 + i * 150); g.quadraticCurveTo(960, 80 + i * 150, W, 120 + i * 150); g.stroke(); g.beginPath(); g.moveTo(150 + i * 290, 0); g.lineTo(150 + i * 290, H); g.stroke(); }
  seaWaves(60, 1040, s * .6, 'rgba(255,255,255,.35)', 34, 9);
  // India
  const ind = [[1050, -60], [1010, 60], [975, 170], [940, 250], [905, 318], [860, 330], [800, 400], [720, 480], [662, 520], [620, 440], [560, 330], [500, 210], [440, 80], [400, -60]];
  g.save(); g.translate(12, 16); smooth(ind); g.fillStyle = 'rgba(4,50,90,.3)'; g.fill(); g.restore();
  smooth(ind); g.strokeStyle = '#fff3c4'; g.lineWidth = 18; g.stroke(); smooth(ind); g.fillStyle = lg(0, 0, 0, 520, [[0, '#ffc98a'], [1, '#f6a96b']]); g.fill();
  txt('INDIA', 730, 150, 64, 'rgba(120,60,30,.55)', { w: 800, ls: 12 });
  txt('INDIAN OCEAN', 1610, 905, 44, 'rgba(255,255,255,.6)', { w: 700, ls: 14 });
  // dashed flight path, then the island
  const ik = E.el(seg(s, .2, 1.5));
  at(cx, cy, ik, 0, () => { glow(0, 0, 560, 'rgba(255,255,255,.55)', .6); island(0, 0, S); });
  const pk = seg(s, .5, 2.6); g.setLineDash([4, 22]); g.lineDashOffset = 0; g.beginPath(); const A = [300, 620], B = geo(79.86, 6.93, cx, cy, S);
  for (let i = 0; i <= 40 * pk; i++) { const u = i / 40, x = lerp(A[0], B[0], u), y = lerp(A[1], B[1], u) - Math.sin(u * Math.PI) * 150; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.strokeStyle = '#fff'; g.lineWidth = 8; g.lineCap = 'round'; g.stroke(); g.setLineDash([]);
  if (pk > 0 && pk < 1) { const u = pk; at(lerp(A[0], B[0], u), lerp(A[1], B[1], u) - Math.sin(u * Math.PI) * 150, .16, .15, () => plane(0, 0, 1, 0, t)); }
  const P = (lon, lat) => geo(lon, lat, cx, cy, S);
  let p = P(79.86, 6.93); pin(p[0], p[1], pop(s, 2.6), 'Colombo', C.coral, -1);
  p = P(80.64, 7.29); pin(p[0], p[1], pop(s, 3.0), 'Kandy', '#8a4fd8');
  p = P(80.76, 7.96); pin(p[0], p[1], pop(s, 3.4), 'Sigiriya', '#ff9f1c');
  p = P(81.2, 6.35); pin(p[0], p[1], pop(s, 3.8), 'Yala', '#12a5a0');
  pill('SRI LANKA', cx + 30, 190, pop(s, 1.3), { size: 56, bg: C.yellow, fg: C.plum });
  // compass
  at(1790, 140, pop(s, 1.2) * .9, Math.sin(s * .8) * .06, () => { circ(0, 0, 78, 'rgba(255,255,255,.22)', '#fff', 5); poly([[0, -66], [14, 0], [0, 66], [-14, 0]], '#fff'); poly([[0, -66], [14, 0], [-14, 0]], C.coral); poly([[-66, 0], [0, -12], [66, 0], [0, 12]], 'rgba(255,255,255,.7)'); txt('N', 0, -98, 34, '#fff', { w: 800 }); });
  g.restore();
  // little people popping up + counter
  const pa = Wd(3, 'twenty') - .2, n = seg(t, pa, pa + 2.2);
  for (let i = 0; i < 12; i++) { const k = pop(t, pa + i * .14, .35); if (k <= 0) continue; const q = P(80.05 + ((i * 0.37) % 1) * 1.4, 6.35 + ((i * 0.618) % 1) * 2.6), col = ['#ff6b5a', '#ffc93c', '#8a4fd8', '#ff8fb8', '#2bb7e8'][i % 5]; at(q[0], q[1] - Math.abs(Math.sin(t * 4 + i)) * 8, k * .62, 0, () => { rr(-13, -4, 26, 30, 12, col); circ(0, -16, 13, ['#f2b98a', '#c98a5a', '#8a5a3c'][i % 3]); }); }
  const fk = pop(s, 4.3);
  if (fk > 0) at(1640, 330, fk, .04, () => { rr(-185, -125, 370, 262, 30, '#fff'); flag(0, -20, 1); txt('The Lion Flag', 0, 98, 38, C.purple); });
  const ck = pop(t, pa);
  if (ck > 0) at(1640, 620, ck, -.03, () => { rr(-185, -92, 370, 190, 30, '#fff'); txt(Math.round(22 * E.o2(n)) + ' million', 0, -20, 74, C.coral, { w: 800 }); txt('people live here', 0, 46, 38, C.purple); });
  // Ayubowan!
  const ak = pop(t, Wd(3, 'Ayubowan') - .15, .5);
  if (ak > 0) {
    bubble(930, 680, 680, 250, ak, [-.8, 1]);
    at(930, 680, ak, 0, () => { txt('Ayubowan!', 50, -48, 96, C.purple, { w: 800 }); txt('ආයුබෝවන්', 50, 46, 62, C.coral, { f: '"Noto Sans Sinhala"', w: 700 });
      at(-262, 0, 1 + Math.sin(t * 4) * .04, 0, () => { [-1, 1].forEach(d => { g.save(); g.scale(d, 1); g.rotate(.1); g.beginPath(); g.moveTo(2, -84); g.bezierCurveTo(-34, -40, -34, 30, -12, 62); g.lineTo(6, 62); g.bezierCurveTo(8, 10, 8, -40, 2, -84); g.fillStyle = d < 0 ? '#e9a36b' : '#f2b47c'; g.fill(); ell(-30, 6, 9, 22, '#e9a36b', .5); g.restore(); }); rr(-30, 54, 60, 36, 12, '#12a5a0'); rr(-30, 54, 60, 10, 5, '#ffc93c'); }); });
    sparkles(900, 680, 380, 8, t, '#fff8c9', 11);
  }
  const mk = pop(t, LN(4).a + .1, .5);
  if (mk > 0) { at(990, 868, mk, -.02, () => { rr(-330, -44, 660, 88, 44, C.coral); txt('“May you live a long life”', -14, 4, 48, '#fff'); heart(292, 2, .55, '#fff'); }); for (let i = 0; i < 6; i++) { const u = ((t - LN(4).a) * .45 + i / 6) % 1; heart(560 + i * 110 + Math.sin(u * 6 + i) * 20, 840 - u * 260, .5 * Math.sin(u * Math.PI), ['#ff8fb8', '#fff', '#ffc93c'][i % 3]); } }
  return { presenter: true, candy: t > Wd(3, 'Ayubowan') ? 'c_content' : 'c_attentive' };
};

// ---------------- SIGIRIYA ----------------
function treeLine(y, amp, seed, col, t, par) { g.beginPath(); g.moveTo(-50, H); for (let i = -1; i < 34; i++) { const x = i * 64 + par, r = 46 + rnd(i + seed) * 40; g.lineTo(x - r, y + amp * rnd(i * 2 + seed)); g.arc(x, y + amp * rnd(i * 2 + seed), r, Math.PI, 0); } g.lineTo(W + 50, H); g.closePath(); g.fillStyle = col; g.fill(); }
function lionPaw(x, y, s, flip) { at(x, y, s, 0, () => { g.scale(flip, 1); rr(-70, -150, 130, 150, 40, '#d99a5b'); rr(-90, -62, 170, 62, 30, '#e5ad6e'); for (let i = 0; i < 3; i++) { circ(-62 + i * 56, -30, 30, '#e5ad6e'); g.beginPath(); g.moveTo(-74 + i * 56, -8); g.lineTo(-62 + i * 56, 16); g.lineTo(-50 + i * 56, -8); g.fillStyle = '#fff3d6'; g.fill(); } rr(-70, -150, 40, 100, 20, 'rgba(120,60,30,.18)'); }); }
SCENES.sigiriya = (t, sc, s) => {
  const z = 1 + .07 * E.o2(seg(s, 0, 12.6)), par = -s * 5;
  rect(0, 0, W, H, lg(0, 0, 0, 800, [[0, '#4fb4ea'], [.5, '#ffdf9e'], [1, '#ff9e6d']]));
  sunburst(1500, 430, 1500, 18, s * .04, '#fff', .12); glow(1500, 430, 520, 'rgba(255,230,150,.9)', .9); circ(1500, 430, 135, '#fff3bf');
  for (let i = 0; i < 4; i++) cloud(((i * 560 + s * 18) % 2400) - 300, 90 + i * 70, .6 + rnd(i + 3) * .5, .85, '#fff7e8');
  g.save(); g.translate(1150, 620); g.scale(z, z); g.translate(-1150, -620);
  band(x => 700 + Math.sin(x * .004 + 2) * 30 + Math.sin(x * .011) * 12, '#8b7fc7'); band(x => 740 + Math.sin(x * .005) * 26, '#5f9c8a');
  treeLine(770, 18, 3, '#2f8f63', t, par * .4);
  // the rock
  const rock = [[838, 835], [850, 640], [835, 470], [870, 330], [930, 262], [1040, 250], [1160, 240], [1290, 246], [1390, 262], [1450, 330], [1475, 470], [1452, 650], [1480, 835]];
  smooth(rock); g.fillStyle = lg(830, 0, 1480, 0, [[0, '#c9643a'], [.45, '#ef9050'], [1, '#ffb066']]); g.fill();
  g.save(); smooth(rock); g.clip();
  for (let i = 0; i < 26; i++) { const x = 850 + rnd(i) * 620, y0 = 250 + rnd(i + 20) * 120, len = 120 + rnd(i + 7) * 380; g.fillStyle = i % 3 ? 'rgba(120,45,30,.22)' : 'rgba(255,220,170,.25)'; g.beginPath(); g.ellipse(x, y0 + len / 2, 9 + rnd(i + 3) * 12, len / 2, 0, 0, TAU); g.fill(); }
  rect(830, 240, 660, 60, 'rgba(255,240,200,.18)'); g.fillStyle = lg(0, 600, 0, 840, [[0, 'rgba(90,30,60,0)'], [1, 'rgba(90,30,60,.35)']]); g.fillRect(820, 600, 680, 240);

  g.restore();
  for (let i = 0; i < 14; i++) circ(900 + i * 40 + rnd(i) * 14, 254 - rnd(i + 2) * 10 + Math.abs(i - 6.5) * 2.2, 22 + rnd(i + 5) * 14, i % 2 ? '#3fae62' : '#2f8f63');
  // palace of the king appears on top
  const pk = rise(t, Wd(6, 'palace') - .2, 1.1);
  if (pk > 0) { g.save(); g.globalAlpha = pk; glow(1160, 170, 330, 'rgba(255,220,120,.9)', .8); const gold = lg(0, 80, 0, 250, [[0, '#fff1a8'], [1, '#f0a92e']]);
    at(1160, 240 + (1 - pk) * 30, 1, 0, () => { rr(-190, -40, 380, 44, 6, gold); for (let i = 0; i < 7; i++) rr(-170 + i * 52, -34, 28, 34, 6, '#c9742b'); poly([[-215, -40], [215, -40], [150, -78], [-150, -78]], '#e2552f'); rr(-120, -112, 240, 36, 4, gold); poly([[-150, -112], [150, -112], [96, -150], [-96, -150]], '#e2552f'); rr(-56, -176, 112, 28, 4, gold); poly([[-84, -176], [84, -176], [0, -232]], '#e2552f'); line(0, -232, 0, -262, '#ffd23f', 6); circ(0, -266, 9, '#ffd23f'); });
    g.restore(); sparkles(1160, 150, 300, 12, t, '#fffbe0', 21); }
  // lion paws + terrace
  rr(985, 800, 350, 46, 8, '#b85c3c'); rr(960, 830, 400, 30, 8, '#9c4a34'); poly([[1120, 800], [1196, 800], [1182, 720], [1134, 720]], '#5a2a2a'); for (let i = 0; i < 6; i++) line(1124 + i * 2, 792 - i * 13, 1192 - i * 2, 792 - i * 13, '#e8c59a', 5);
  lionPaw(1066, 806, .72, 1); lionPaw(1250, 806, .72, -1);
  treeLine(850, 14, 9, '#3fae62', t, par * .8);
  // height marker
  const hk = rise(t, Wd(6, 'almost') - .2, .8);
  if (hk > 0) { const y1 = 835, y0 = lerp(835, 246, hk); g.setLineDash([14, 14]); line(1530, y1, 1530, y0, '#fff', 7); g.setLineDash([]); poly([[1530, y0 - 22], [1512, y0 + 8], [1548, y0 + 8]], '#fff'); line(1505, y1, 1555, y1, '#fff', 7); pill('almost 200 m tall!', 1640, 600, pop(t, Wd(6, 'almost') + .5), { size: 40, bg: '#fff' }); }
  for (let i = 0; i < 6; i++) bird(300 + i * 90 + s * 46 + (i % 2) * 30, 300 + (i % 3) * 46 + Math.sin(s + i) * 14, .8, t * 9 + i);
  g.restore();
  band(x => 935 + Math.sin(x * .007 + 1) * 16, '#2f9a58'); treeLine(985, 12, 14, '#23834d', t, par * 1.6);
  pill('SIGIRIYA · The Lion Rock', 520, 150, pop(t, Wd(5, 'Sigiriya') - .1), { size: 54, bg: C.yellow, fg: C.plum, rot: -.02 }); sparks(900, 100, pop(t, Wd(5, 'Sigiriya')));
  const yk = pop(t, Wd(6, 'Fifteen'));
  if (yk > 0) at(430, 330, yk, .03, () => { rr(-230, -80, 460, 160, 30, '#fff'); at(-160, 0, 1, Math.sin(t * 2) * .2, () => { poly([[-30, -42], [30, -42], [4, 0], [30, 42], [-30, 42], [-4, 0]], C.yellow, C.purple, 6); }); txt('1,500', 40, -20, 64, C.coral, { w: 800 }); txt('years ago', 40, 36, 40, C.purple); });
  const kk = pop(t, Wd(6, 'king') - .1);
  if (kk > 0) at(600, 520, kk, -.05 + Math.sin(t * 3) * .05, () => { rr(-130, -70, 260, 140, 30, '#fff'); poly([[-70, 40], [-84, -30], [-40, 6], [0, -46], [40, 6], [84, -30], [70, 40]], C.yellow, '#e08a1a', 6); circ(0, -46, 9, C.coral); circ(-84, -30, 8, '#2bb7e8'); circ(84, -30, 8, '#2bb7e8'); });
  return { presenter: true, candy: t > Wd(6, 'palace') ? 'c_surprised' : t < LN(5).b ? 'c_surprised' : 'c_curious' };
};

// ---------------- TEA COUNTRY ----------------
function picker(x, y, s, col, t, ph) {
  at(x, y, s, 0, () => {
    const reach = Math.sin(t * 3 + ph);
    rr(-34, -112, 62, 76, 22, '#c9a36b'); for (let i = 0; i < 4; i++) line(-30, -100 + i * 17, 24, -100 + i * 17, '#a8804a', 3);        // basket on the back
    g.beginPath(); g.moveTo(-6, -130); g.quadraticCurveTo(52, -110, 46, 0); g.lineTo(-30, 0); g.quadraticCurveTo(-26, -90, -6, -130); g.fillStyle = col; g.fill();
    line(22, -96, 62 + reach * 8, -62 + reach * 16, '#b8703f', 13); circ(64 + reach * 8, -58 + reach * 16, 9, '#b8703f');
    circ(12, -146, 26, '#b8703f'); g.beginPath(); g.arc(12, -150, 28, Math.PI * .95, TAU * 1.02); g.lineTo(-22, -110); g.fillStyle = '#fff4d6'; g.fill();
    circ(24, -146, 3.5, '#3d1a5e');
  });
}
function train(x, y, t) {
  at(x, y, 1.5, 0, () => {
    for (let c = 0; c < 4; c++) {
      const cx0 = -c * 330, bob = Math.sin(t * 14 + c) * 1.5;
      at(cx0, bob, 1, 0, () => {
        if (c === 0) { g.beginPath(); g.roundRect(-300, -130, 310, 130, [26, 60, 10, 10]); g.fillStyle = '#1f5fd1'; g.fill(); rr(-40, -108, 34, 46, 10, '#bfe9ff'); rr(-10, -44, 26, 22, 6, '#ffe27a'); rr(-150, -160, 60, 34, 8, '#17489e'); }
        else rr(-310, -130, 316, 130, 22, '#2a6fe0');
        rect(-310 + (c === 0 ? 10 : 0), -52, 310, 16, '#ffc93c'); rect(-310 + (c === 0 ? 10 : 0), -30, 310, 6, '#fff');
        const n = c === 0 ? 2 : 3; for (let i = 0; i < n; i++) { const wx = -280 + i * 96 + (c === 0 ? 20 : 0); rr(wx, -112, 76, 54, 12, '#d9f3ff');
          if (c === 1 && i === 2) { g.save(); g.beginPath(); g.roundRect(wx, -112, 76, 54, 12); g.clip(); spr('s_happy', wx + 38, -44 + Math.sin(t * 3) * 2, 84); g.restore(); }
          if (c === 1 && i === 1) { g.save(); g.beginPath(); g.roundRect(wx, -112, 76, 54, 12); g.clip(); spr('c_curious', wx + 38, -52, 62); g.restore(); }
          rr(wx, -112, 76, 54, 12, null, '#17489e', 5); }
        for (let i = 0; i < 2; i++) { circ(-240 + i * 170, 0, 20, '#2a2140'); circ(-240 + i * 170, 0, 8, '#cfc4dd'); }
        rect(-322, -40, 14, 12, '#2a2140');
      });
    }
    for (let i = 0; i < 7; i++) { const u = ((t * .7 + i / 7) % 1); circ(-120 - u * 260, -170 - u * 110 - Math.sin(u * 5 + i) * 10, 14 + u * 44, `rgba(255,255,255,${.75 * (1 - u)})`); }
  });
}
function teacup(x, y, s, t) {
  at(x, y, s, 0, () => {
    for (let i = 0; i < 3; i++) { const u = (t * .5 + i / 3) % 1; g.beginPath(); const sx = -44 + i * 44; g.moveTo(sx, -70 - u * 60); g.bezierCurveTo(sx - 24, -100 - u * 60, sx + 24, -120 - u * 60, sx, -150 - u * 60); g.strokeStyle = `rgba(255,255,255,${.9 * Math.sin(u * Math.PI)})`; g.lineWidth = 10; g.lineCap = 'round'; g.stroke(); }
    ell(0, 70, 150, 26, '#fff'); ell(0, 66, 150, 22, '#f3e3ff');
    g.beginPath(); g.arc(120, -8, 42, -1.2, 1.4); g.strokeStyle = '#fff'; g.lineWidth = 20; g.stroke();
    g.beginPath(); g.moveTo(-110, -56); g.bezierCurveTo(-110, 40, -60, 66, 0, 66); g.bezierCurveTo(60, 66, 110, 40, 110, -56); g.closePath(); g.fillStyle = '#fff'; g.fill();
    ell(0, -56, 110, 26, '#c9742b'); ell(0, -56, 96, 19, '#e08f3a'); ell(-30, -60, 30, 6, 'rgba(255,255,255,.4)');
    g.strokeStyle = C.coral; g.lineWidth = 8; g.beginPath(); g.moveTo(-98, -12); g.quadraticCurveTo(0, 22, 98, -12); g.stroke(); heart(0, 26, .4, C.coral);
  });
}
function leaf(x, y, s, rot, col = '#3fbf5f') { at(x, y, s, rot, () => { g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(26, -34, 0, -80); g.quadraticCurveTo(-26, -34, 0, 0); g.fillStyle = col; g.fill(); line(0, -6, 0, -66, 'rgba(0,80,40,.35)', 3); }); }
SCENES.tea = (t, sc, s) => {
  rect(0, 0, W, H, lg(0, 0, 0, 520, [[0, '#7fd4f0'], [1, '#f2f8d8']]));
  glow(380, 160, 460, 'rgba(255,245,190,.9)', .8); circ(380, 160, 90, '#fff6c9');
  for (let i = 0; i < 4; i++) cloud(((i * 620 + s * 22) % 2500) - 300, 70 + i * 60, .7, .9);
  band(x => 330 + Math.sin(x * .0035 + 1) * 70 + Math.sin(x * .009) * 22, '#8fc7c9'); band(x => 400 + Math.sin(x * .004 + 3) * 60, '#6fb9a4');
  for (let i = 0; i < 3; i++) { g.fillStyle = lg(0, 380 + i * 40, 0, 470 + i * 40, [[0, 'rgba(255,255,255,0)'], [.5, 'rgba(255,255,255,.55)'], [1, 'rgba(255,255,255,0)']]); g.fillRect(((i * 700 + s * (20 + i * 12)) % 3200) - 1300, 380 + i * 40, 1500, 90); }
  band(x => 500 + Math.sin(x * .0045 + 2) * 50, '#3f9f6a');
  // Nine Arch Bridge
  const dy = 548; g.beginPath(); g.rect(-20, dy, W + 40, 420); for (let i = 0; i < 9; i++) { const ax = 150 + i * 200; g.moveTo(ax - 72, dy + 420); g.lineTo(ax - 72, dy + 130); g.arc(ax, dy + 130, 72, Math.PI, 0); g.lineTo(ax + 72, dy + 420); g.closePath(); }
  g.fillStyle = lg(0, dy, 0, dy + 400, [[0, '#e6c08e'], [1, '#b98a5e']]); g.fill('evenodd');
  for (let i = 0; i < 60; i++) rr(rnd(i) * W, dy + 30 + rnd(i + 9) * 60, 34, 12, 4, 'rgba(120,70,40,.16)');
  rect(-20, dy - 14, W + 40, 26, '#f3d6a8'); for (let i = 0; i < 40; i++) rect(i * 50, dy - 30, 8, 18, '#d9b07c'); rect(-20, dy - 34, W + 40, 6, '#d9b07c');
  train(lerp(-300, 4300, seg(s, .2, 10.6)), dy - 16, t);
  rect(-20, dy - 14, W + 40, 8, '#f3d6a8');
  for (let i = 0; i < 2; i++) { g.fillStyle = lg(0, 620 + i * 60, 0, 740 + i * 60, [[0, 'rgba(255,255,255,0)'], [.5, 'rgba(255,255,255,.5)'], [1, 'rgba(255,255,255,0)']]); g.fillRect(((i * 900 - s * 26) % 3000 + 3000) % 3000 - 1200, 620 + i * 60, 1700, 120); }
  // tea terraces
  const hills = [[x => 760 + Math.sin(x * .0032 + .6) * 70 + Math.sin(x * .0085) * 14, '#4fb85f', '#3a9c50'], [x => 870 + Math.sin(x * .0038 + 3.6) * 60, '#6fd06a', '#49b25a']];
  hills.forEach(([fn, c1, c2], hi) => { band(fn, c1); g.save(); g.beginPath(); g.moveTo(-20, H); for (let x = -20; x <= W + 20; x += 20) g.lineTo(x, fn(x)); g.lineTo(W + 20, H); g.clip();
    for (let r = 1; r < 9; r++) { g.beginPath(); for (let x = -20; x <= W + 20; x += 20) { const y = fn(x) + r * 30 + Math.sin(x * .004 + r) * 6; x === -20 ? g.moveTo(x, y) : g.lineTo(x, y); } g.strokeStyle = c2; g.lineWidth = 12; g.stroke(); for (let x = 10 + (r % 2) * 22; x < W; x += 44) circ(x, fn(x) + r * 30 - 12 + Math.sin(x * .004 + r) * 6, 13, hi ? '#8fe07a' : '#6fcb6a'); }
    g.restore(); });
  picker(300, 880, 1.1, '#ff5fa2', t, 0); picker(640, 800, .82, '#ff9f1c', t, 2); picker(1530, 905, 1.2, '#8a4fd8', t, 4); picker(1180, 790, .7, '#ff6b5a', t, 1);
  // leaves fly into a teacup
  const lk = Wd(8, 'leaves'), ck = pop(t, Wd(8, 'fill') - .5, .55);
  pill('Tea Gardens', 420, 330, pop(t, LN(8).a + .1), { size: 54, bg: C.yellow, fg: C.plum, rot: -.03 });
  if (ck > 0) { glow(1560, 205, 330, 'rgba(255,255,255,.9)', .6 * ck); teacup(1560, 205, ck * .92, t); pill('Ceylon Tea · loved all around the world', 1440, 322, pop(t, Wd(8, 'all around') - .2), { size: 36, bg: '#fff' }); }
  for (let i = 0; i < 9; i++) { const u = seg(t, lk + i * .13, lk + i * .13 + 1.1); if (u <= 0 || u >= 1) continue; const x0 = 500 + i * 130, e = E.io(u); leaf(lerp(x0, 1560, e), lerp(800, 160, e) - Math.sin(u * Math.PI) * 220, .7, u * 9 + i); }
  return {};
};
