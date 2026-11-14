// Scenes 5-9: wildlife, beach, Perahera, food, outro
function elephant(x, y, s, t, o = {}) {
  const ph = o.ph || 0, wk = (o.walk || 0) * Math.sin(t * 5 + ph), col = o.col || '#a79fbd', dk = o.dk || '#8c84a6', up = o.up || 0;
  at(x, y - Math.abs(wk) * 5, s, 0, () => {
    curve([150, -200, 190, -160, 180, -110 + Math.sin(t * 3 + ph) * 10], dk, 9); circ(180, -108 + Math.sin(t * 3 + ph) * 10, 8, '#5a5370');
    [[-60, 1], [110, -1]].forEach(([lx, d]) => at(lx, -112, 1, wk * .2 * d, () => rr(-31, 0, 62, 114, 24, dk)));
    ell(25, -185, 168, 114, col);
    [[-105, -1], [65, 1]].forEach(([lx, d]) => at(lx, -112, 1, wk * .2 * d, () => { rr(-33, 0, 66, 114, 26, col); for (let i = 0; i < 3; i++) circ(-18 + i * 18, 108, 7, '#f3ecff'); }));
    if (o.cloak) {
      const [c1, c2] = o.cloak; g.beginPath(); g.moveTo(-120, -286); g.quadraticCurveTo(30, -322, 185, -270); g.lineTo(196, -70); for (let i = 0; i < 8; i++) g.quadraticCurveTo(176 - i * 40, -40, 156 - i * 40, -70); g.closePath(); g.fillStyle = c1; g.fill();
      g.strokeStyle = c2; g.lineWidth = 10; g.beginPath(); g.moveTo(-118, -92); g.lineTo(194, -92); g.stroke(); g.beginPath(); g.moveTo(-118, -250); g.quadraticCurveTo(30, -290, 188, -240); g.stroke();
      for (let i = 0; i < 40; i++) { const lx = -100 + (i % 8) * 40 + (Math.floor(i / 8) % 2) * 18, ly = -232 + Math.floor(i / 8) * 30, tw2 = .5 + .5 * Math.sin(t * 7 + i * 1.7); circ(lx, ly, 5, `rgba(255,${230 + 25 * tw2},${150 + 100 * tw2},${.5 + .5 * tw2})`); if (i % 3 === 0) glow(lx, ly, 26, 'rgba(255,220,120,.9)', tw2 * .8); }
    }
    circ(-150, -220, 90, col);
    const tx = lerp(-190 + Math.sin(t * 2 + ph) * 16, -330, up), ty = lerp(-28, -360, up);
    g.beginPath(); g.moveTo(-212, -205); g.quadraticCurveTo(lerp(-262, -300, up), lerp(-110, -230, up), tx, ty); g.strokeStyle = col; g.lineWidth = 44; g.lineCap = 'round'; g.stroke();
    if (o.cloak) { const [c1, c2] = o.cloak; poly([[-205, -300], [-120, -300], [-150, -180], [-200, -140], [-236, -190]], c1, c2, 7); for (let i = 0; i < 6; i++) circ(-205 + (i % 3) * 30, -272 + Math.floor(i / 3) * 40, 5, `rgba(255,240,180,${.6 + .4 * Math.sin(t * 8 + i)})`); }
    at(-100, -232, 1, Math.sin(t * 3 + ph) * .1, () => { ell(0, 14, 60, 84, dk); ell(4, 18, 40, 60, '#c9a7c7'); });
    if (o.tusk) curve([-196, -172, -230, -140, -250, -160], '#fff8e6', 13);
    circ(-180, -238, 9, '#2a2140'); circ(-182, -241, 3.2, '#fff'); curve([-196, -256, -182, -264, -166, -256], '#5a5370', 4);
    if (o.casket) { rr(-70, -330, 190, 40, 10, '#f0b429'); poly([[-50, -330], [100, -330], [80, -390], [-30, -390]], '#ffd866'); rr(-20, -430, 90, 44, 16, '#fff1a8'); poly([[-30, -430], [80, -430], [25, -486]], '#f0b429'); circ(25, -490, 9, '#fff1a8'); glow(25, -400, 190, 'rgba(255,220,120,.9)', .7); line(-64, -330, -64, -470, '#f0b429', 6); line(114, -330, 114, -470, '#f0b429', 6); poly([[-90, -470], [140, -470], [110, -505], [-60, -505]], '#d62839'); }
    o.tip = [tx, ty];
  });
}
function peacock(x, y, s, open, t) {
  at(x, y, s, Math.sin(t * 4) * .07 * open, () => {
    for (let row = 0; row < 2; row++) { const n = row ? 12 : 13, L = (row ? 170 : 262) * (.35 + .65 * open); for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i - (n - 1) / 2) * (.235 * open + .012), ex = Math.cos(a) * L, ey = -70 + Math.sin(a) * L; line(0, -70, ex, ey, row ? '#22b07f' : '#159a6c', 12); g.save(); g.translate(ex, ey); g.rotate(a + Math.PI / 2); ell(0, 0, 22, 28, '#3fe0a0'); ell(0, 2, 15, 19, '#ffc93c'); ell(0, 4, 10, 12, '#2a62d9'); ell(0, 6, 5, 6, '#1b2a6b'); g.restore(); } }
    line(-12, -10, -14, 30, '#c98a3a', 6); line(12, -10, 14, 30, '#c98a3a', 6);
    ell(0, -52, 46, 62, '#1f5fd1'); ell(8, -40, 26, 40, '#17a2c4', -.3);
    curve([0, -96, -14, -140, 10, -176], '#2a6fe0', 28); circ(12, -182, 22, '#2a6fe0');
    poly([[30, -186], [56, -178], [30, -172]], '#ffb627'); circ(18, -188, 5, '#fff'); circ(19, -188, 2.6, '#1b2a4b');
    for (let i = 0; i < 3; i++) { const a = -1.9 + i * .3; line(8, -200, 8 + Math.cos(a) * 34, -200 + Math.sin(a) * 34, '#17489e', 3); circ(8 + Math.cos(a) * 36, -200 + Math.sin(a) * 36, 5, '#3fe0a0'); }
  });
}
function leopard(x, y, s, t, wink) {
  at(x, y, s, 0, () => {
    const sw = Math.sin(t * 2);
    curve([200, -50, 290, -30, 262 + sw * 14, 70, 300 + sw * 26, 130], '#e2a53a', 28);
    rr(-150, -118, 380, 118, 58, '#f2b750'); ell(170, -56, 78, 60, '#e9ab45');
    rr(-160, -44, 54, 104, 26, '#f2b750'); rr(-96, -44, 54, 90, 26, '#e2a53a');
    [[-60, -86], [0, -60], [50, -92], [100, -52], [150, -88], [200, -40], [-20, -26], [70, -22], [130, -18], [-100, -70], [180, -70], [20, -100]].forEach(([a, b], i) => { g.beginPath(); g.arc(a, b, 12, i, i + 4.6); g.strokeStyle = '#6b3a1a'; g.lineWidth = 7; g.stroke(); circ(a, b, 4, '#c9852f'); });
    circ(-258, -196, 30, '#f2b750'); circ(-258, -196, 15, '#d96a7a'); circ(-138, -202, 30, '#f2b750'); circ(-138, -202, 15, '#d96a7a');
    circ(-196, -126, 88, '#f2b750'); ell(-200, -94, 50, 36, '#fff3d6');
    [[-250, -170], [-150, -176], [-200, -190]].forEach(([a, b]) => circ(a, b, 6, '#6b3a1a'));
    poly([[-212, -112], [-188, -112], [-200, -98]], '#d96a7a'); curve([-200, -98, -214, -78, -228, -88], '#6b3a1a', 4); curve([-200, -98, -186, -78, -172, -88], '#6b3a1a', 4);
    ell(-232, -136, 17, 19, '#c8f060'); ell(-232, -136, 6, 15, '#1b2a2b');
    if (wink > 0) curve([-180, -134, -164, -148, -148, -134], '#6b3a1a', 6); else { ell(-164, -136, 17, 19, '#c8f060'); ell(-164, -136, 6, 15, '#1b2a2b'); }
    for (let i = 0; i < 3; i++) { line(-244, -92 + i * 8, -300, -100 + i * 14, '#fff', 3); line(-156, -92 + i * 8, -100, -100 + i * 14, '#fff', 3); }
  });
}
function whale(x, y, s, t) {
  at(x, y + Math.sin(t * .9) * 16, s, Math.sin(t * .9 + 1) * .025, () => {
    at(560, -14, 1, Math.sin(t * 1.7) * .16, () => { g.beginPath(); g.moveTo(-20, 0); g.bezierCurveTo(40, -30, 90, -140, 190, -150); g.bezierCurveTo(160, -70, 150, -30, 120, 0); g.bezierCurveTo(150, 30, 160, 80, 190, 150); g.bezierCurveTo(90, 140, 40, 40, -20, 12); g.fillStyle = '#3f74a8'; g.fill(); });
    const body = () => { g.beginPath(); g.moveTo(-620, 20); g.bezierCurveTo(-620, -120, -300, -160, 0, -128); g.bezierCurveTo(300, -100, 480, -44, 580, -14); g.bezierCurveTo(480, 30, 250, 124, -100, 136); g.bezierCurveTo(-420, 142, -620, 110, -620, 20); };
    body(); g.fillStyle = lg(0, -150, 0, 140, [[0, '#6aa6d8'], [1, '#3f74a8']]); g.fill();
    g.save(); body(); g.clip(); ell(-280, 170, 470, 110, '#d6ebf7'); for (let i = 0; i < 9; i++) curve([-600, 70 + i * 9, -400, 100 + i * 9, -150 + i * 20, 96 + i * 8], 'rgba(90,140,180,.5)', 3);
    for (let i = 0; i < 16; i++) circ(-500 + rnd(i) * 950, -100 + rnd(i + 3) * 120, 6 + rnd(i + 6) * 10, 'rgba(255,255,255,.12)'); g.restore();
    poly([[250, -96], [300, -138], [330, -90]], '#3f74a8');
    at(-250, 96, 1, .5 + Math.sin(t * 1.4) * .12, () => ell(70, 0, 130, 34, '#356596'));
    circ(-480, 14, 15, '#14223f'); circ(-484, 9, 5, '#fff'); curve([-610, 52, -540, 78, -470, 58], '#2b527d', 6);
  });
}
function fish(x, y, s, col, t) { at(x, y, s, 0, () => { poly([[-26, 0], [-48, -16 + Math.sin(t * 12) * 5], [-48, 16 - Math.sin(t * 12) * 5]], col); ell(0, 0, 30, 17, col); circ(14, -4, 4, '#fff'); circ(15, -4, 2, '#14223f'); }); }
SCENES.wild = (t, sc, s) => {
  const tB = LN(10).a - .35, tC = LN(11).a - .5, ab = E.io(seg(t, tB - .35, tB + .35)), bc = E.io(seg(t, tC - .4, tC + .4));
  // --- A: elephants and peacock at the waterhole
  if (ab < 1) {
    g.save(); g.translate(-W * ab, 0);
    rect(0, 0, W, H, lg(0, 0, 0, 640, [[0, '#7fdcd6'], [1, '#fff4b8']])); glow(1500, 200, 520, 'rgba(255,240,170,.9)', .8); circ(1500, 200, 100, '#fff6c9');
    for (let i = 0; i < 3; i++) cloud(((i * 700 + s * 16) % 2500) - 300, 90 + i * 80, .7, .9);
    band(x => 520 + Math.sin(x * .004) * 50, '#8fcfb0'); treeLine(600, 20, 31, '#2f9a63', t, 0); treeLine(640, 16, 37, '#3fae62', t, 30);
    band(x => 660 + Math.sin(x * .005 + 2) * 10, '#b6e06a'); band(x => 760 + Math.sin(x * .004) * 12, '#9bd45a');
    ell(1180, 900, 700, 120, '#5a9fd0'); ell(1180, 896, 690, 114, '#4fc8e6'); for (let i = 0; i < 6; i++) { const u = (s * .3 + i / 6) % 1; ell(900 + i * 110, 880 + (i % 3) * 22, 40 + u * 80, 8 + u * 12, null, 0, `rgba(255,255,255,${.6 * (1 - u)})`, 4); }
    for (let i = 0; i < 30; i++) { const x = rnd(i) * W, y = 700 + rnd(i + 8) * 90; line(x, y, x - 6, y - 22, '#6fb84a', 5); line(x, y, x + 8, y - 26, '#6fb84a', 5); }
    const arr = E.o2(seg(s, .2, 3.4)), walk = arr < 1 ? 1 : 0, up = E.io(seg(t, Wd(9, 'Gentle') - .1, Wd(9, 'Gentle') + .7));
    const mom = {}; elephant(lerp(2400, 1580, arr), 812, 1.22, t, Object.assign(mom, { walk, up, tusk: 1 }));
    const bx = lerp(2100, 1130, arr); elephant(bx, 836, .62, t, { walk, ph: 2, col: '#b9b2cd', dk: '#9d95b6' });
    if (up > .6) { const tx = 1580 + mom.tip[0] * 1.22, ty = 812 + mom.tip[1] * 1.22; for (let i = 0; i < 16; i++) { const u = (t * 1.1 + i / 16) % 1; circ(lerp(tx, bx + 30, u), lerp(ty, 640, u) - Math.sin(u * Math.PI) * 130, 9 - u * 3, 'rgba(160,235,255,.95)'); } }
    const open = E.el(seg(t, Wd(9, 'dancing') - .25, Wd(9, 'dancing') + 1.1));
    peacock(770, 880, 1.0, open, t);
    if (open > .5) for (let i = 0; i < 4; i++) { const u = ((t * .5 + i / 4) % 1); txt('♪', 560 + i * 130 + Math.sin(u * 6) * 14, 560 - u * 150, 60, `rgba(91,42,134,${Math.sin(u * Math.PI)})`, { f: 'sans-serif' }); }
    pill('Elephants', 1500, 250, pop(t, Wd(9, 'Gentle') - .1), { size: 48, bg: '#fff' }); pill('Peacock', 760, 470, pop(t, Wd(9, 'dancing') + .5), { size: 48, bg: '#fff' });
    pill('Amazing Animals!', 620, 140, pop(s, .6), { size: 58, bg: C.yellow, fg: C.plum, rot: -.03 });
    g.restore();
  }
  // --- B: the leopard
  if (ab > 0 && bc < 1) {
    g.save(); g.translate(W * (1 - ab), -H * bc);
    rect(0, 0, W, H, lg(0, 0, 0, H, [[0, '#0d5a4a'], [1, '#1f8f5e']]));
    for (let i = 0; i < 5; i++) { g.fillStyle = 'rgba(255,255,200,.07)'; g.beginPath(); g.moveTo(300 + i * 330, 0); g.lineTo(420 + i * 330, 0); g.lineTo(160 + i * 330 + Math.sin(t * .5 + i) * 30, H); g.lineTo(-60 + i * 330, H); g.fill(); }
    for (let i = 0; i < 22; i++) { const x = rnd(i) * W, y = rnd(i + 4) * 520; at(x, y, 1.6 + rnd(i + 9) * 1.6, rnd(i + 2) * TAU + Math.sin(t + i) * .05, () => { g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(40, -50, 0, -130); g.quadraticCurveTo(-40, -50, 0, 0); g.fillStyle = ['#167a55', '#1b8f60', '#0f6648', '#27a66c'][i % 4]; g.fill(); }); }
    curve([2000, 560, 1500, 600, 1000, 640, 520, 720], '#5a3622', 84); curve([2000, 548, 1500, 588, 1000, 628, 520, 708], '#7a4a2c', 40);
    const rv = Wd(10, 'leopards') - .3, lk = E.back(seg(t, rv, rv + .6));
    if (lk <= 0) { const bl = Math.sin(t * 5) > -.8 ? 1 : .1; [[-232, -136], [-164, -136]].forEach(([a, b]) => { glow(1270 + a * 1.15, 600 + b * 1.15, 60, 'rgba(220,255,100,.9)', .8); ell(1270 + a * 1.15, 600 + b * 1.15, 20, 22 * bl, '#d8ff70'); ell(1270 + a * 1.15, 600 + b * 1.15, 6, 16 * bl, '#0b3a2a'); }); }
    else at(1270, 600, lk, 0, () => leopard(0, 0, 1.45, t, seg(t, Wd(10, 'cousins') - .2, Wd(10, 'cousins')) * (1 - seg(t, LN(10).b + .2, LN(10).b + .3))));
    for (let i = 0; i < 9; i++) { const x = 700 + i * 150, sl = (1 - E.o2(seg(t, rv, rv + .5))) ; at(x + (i - 4) * 260 * (1 - sl), 330 - (1 - sl) * 520, 3.3, (i - 4) * .12 + Math.PI, () => { g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(40, -50, 0, -130); g.quadraticCurveTo(-40, -50, 0, 0); g.fillStyle = i % 2 ? '#1b8f60' : '#27a66c'; g.fill(); }); }
    pill('Sri Lankan Leopard', 1260, 190, pop(t, rv + .5), { size: 50, bg: C.yellow, fg: C.plum });
    const hk = Wd(10, 'cousins'); for (let i = 0; i < 5; i++) { const u = seg(t, hk + i * .12, hk + i * .12 + 1.3); if (u > 0 && u < 1) heart(900 + i * 60 - u * 120, 500 - u * 200 + Math.sin(u * 8 + i) * 16, .7 * Math.sin(u * Math.PI), '#ff8fb8'); }
    if (lk > 0 && t < Wd(10, "Don't") + .4) { sparks(700, 770, 1, 1); sparks(380, 770, 1, -1); }
    g.restore();
  }
  // --- C: the blue whale
  if (bc > 0) {
    g.save(); g.translate(0, H * (1 - bc));
    rect(0, 0, W, 190, '#c8f0f7'); circ(300, 90, 60, '#fff6c9');
    rect(0, 170, W, H, lg(0, 170, 0, H, [[0, '#2fc0de'], [.5, '#1483bd'], [1, '#0a3f78']]));
    for (let i = 0; i < 7; i++) { g.fillStyle = 'rgba(255,255,255,.07)'; g.beginPath(); g.moveTo(120 + i * 290, 170); g.lineTo(260 + i * 290, 170); g.lineTo(140 + i * 290 + Math.sin(t * .6 + i) * 60, H); g.lineTo(-140 + i * 290 + Math.sin(t * .6 + i) * 60, H); g.fill(); }
    g.beginPath(); g.moveTo(0, 190); for (let x = 0; x <= W; x += 30) g.lineTo(x, 172 + Math.sin(x * .02 + t * 2) * 9); g.lineTo(W, 150); g.lineTo(0, 150); g.fillStyle = '#c8f0f7'; g.fill();
    at(1480, 168 + Math.sin(t * 2) * 7, 1, Math.sin(t * 2 + 1) * .05, () => { poly([[-90, -30], [90, -30], [60, 14], [-60, 14]], C.coral); line(0, -30, 0, -120, '#7a4a2c', 7); poly([[6, -116], [70, -44], [6, -44]], '#fff'); });
    const u = E.o2(seg(t, tC - .3, sc.b + 1));
    whale(lerp(2900, 1050, u), 590, 1.02, t);
    for (let i = 0; i < 9; i++) fish(((i * 260 + t * 70) % 2300) - 150, 330 + (i * 173) % 560 + Math.sin(t * 2 + i) * 12, .8 + (i % 3) * .25, ['#ffb627', '#ff8fb8', '#ffe27a'][i % 3], t + i);
    for (let i = 0; i < 26; i++) { const v = (t * (.12 + rnd(i) * .1) + rnd(i + 3)) % 1; circ(rnd(i + 7) * W + Math.sin(v * 9 + i) * 14, H - v * 860, 5 + rnd(i + 1) * 12, null, 'rgba(255,255,255,.5)', 3); }
    const bk = Wd(11, 'biggest') - .2; pill('Blue Whale', 1150, 290, pop(t, bk), { size: 58, bg: C.yellow, fg: C.plum });
    const rk = rise(t, bk + .6, .8); if (rk > 0) { const x0 = 1150 - 560 * rk, x1 = 1150 + 560 * rk; line(x0, 830, x1, 830, '#fff', 7); poly([[x0 - 22, 830], [x0 + 6, 812], [x0 + 6, 848]], '#fff'); poly([[x1 + 22, 830], [x1 - 6, 812], [x1 - 6, 848]], '#fff'); pill('up to 30 metres long!', 1150, 880, pop(t, bk + 1.1), { size: 40, bg: '#fff' }); }
    g.restore();
  }
  const rv = Wd(10, 'leopards') - .3;
  return { presenter: true, candy: t > rv && t < Wd(10, "Don't") + .7 ? 'c_surprised' : t >= Wd(10, "Don't") + .7 && t < tC ? 'c_content' : t >= tC ? 'c_curious' : 'c_playful' };
};

// ---------------- BEACH ----------------
function stilt(x, y, s, t, ph, col) {
  at(x, y, s, Math.sin(t * 1.2 + ph) * .012, () => {
    const b = Math.sin(t * 2 + ph) * 10;
    line(0, 40, 0, -300, '#4a2c22', 11, 'butt'); line(-44, -196, 50, -196, '#4a2c22', 9); line(0, -150, 36, -196, '#4a2c22', 7);
    line(14, -250, -200, -340 + b, '#3d2a1a', 4); line(-200, -340 + b, -206, 20, 'rgba(255,255,255,.5)', 2);
    line(-6, -206, -34, -168, '#7a4a30', 13); line(-34, -168, -22, -128, '#7a4a30', 12);
    rr(-24, -228, 44, 38, 12, '#fff3d6'); rr(-22, -288, 42, 70, 16, col); line(0, -268, -40, -246, '#7a4a30', 11);
    circ(-2, -306, 21, '#7a4a30'); poly([[-40, -314], [36, -314], [-2, -348]], '#f3d28a');
  });
}
function turtle(x, y, s, rot, t, ph) {
  at(x, y, s, rot, () => {
    const f = Math.sin(t * 10 + ph) * .55;
    at(-22, -14, 1, -.5 + f, () => ell(-18, 0, 24, 9, '#6fd07a')); at(22, -14, 1, .5 - f, () => ell(18, 0, 24, 9, '#6fd07a'));
    at(-18, 22, 1, .5 - f * .6, () => ell(-9, 0, 13, 7, '#6fd07a')); at(18, 22, 1, -.5 + f * .6, () => ell(9, 0, 13, 7, '#6fd07a'));
    ell(0, -36, 13, 15, '#7fdc88'); circ(-5, -41, 2.4, '#2a2140'); circ(5, -41, 2.4, '#2a2140');
    ell(0, 0, 27, 33, '#2c8a57'); ell(0, 0, 19, 25, '#4bb86f'); poly([[0, -12], [10, -4], [7, 9], [-7, 9], [-10, -4]], '#2c8a57');
  });
}
SCENES.beach = (t, sc, s) => {
  rect(0, 0, W, H, lg(0, 0, 0, 540, [[0, '#6a6ee8'], [.45, '#ff8fb0'], [.8, '#ffc27a'], [1, '#ffe08f']]));
  sunburst(1280, 500, 1500, 20, s * .03, '#fff', .1); glow(1280, 500, 560, 'rgba(255,225,140,.95)', .9); circ(1280, 500, 120, '#fff4c4');
  for (let i = 0; i < 4; i++) cloud(((i * 640 + s * 14) % 2500) - 300, 120 + i * 60, .6, .55, '#ffd9e6');
  for (let i = 0; i < 4; i++) bird(500 + i * 80 + s * 30, 220 + (i % 2) * 40, .7, t * 8 + i, '#5b2a86');
  rect(0, 520, W, 420, lg(0, 520, 0, 860, [[0, '#ff9f8a'], [.25, '#58c4cf'], [1, '#19b3c4']]));
  g.fillStyle = 'rgba(255,240,180,.55)'; g.beginPath(); g.moveTo(1190, 520); g.lineTo(1370, 520); g.lineTo(1540, 860); g.lineTo(1020, 860); g.fill();
  seaWaves(535, 800, s, 'rgba(255,255,255,.6)', 26, 4);
  [[840, 742, .9, '#ff6b5a'], [1120, 722, .8, '#ffc93c'], [1430, 752, 1, '#8a4fd8']].forEach(([x, y, k, col], i) => { g.save(); g.globalAlpha = .25; for (let j = 0; j < 5; j++) rr(x - 8 + Math.sin(t * 2 + j + i) * 7, y + 42 * k + j * 16, 16, 9, 4, '#3d1a5e'); g.restore(); stilt(x, y, k, t, i * 2, col); });
  // shoreline
  const sh = x => 800 + Math.sin(x * .003 + 1) * 26 + Math.sin(t * 1.4) * 14;
  band(x => sh(x) - 16, 'rgba(255,255,255,.9)'); band(x => 818 + Math.sin(x * .003 + 1) * 26, '#f9dc9c'); band(x => sh(x) + 6, 'rgba(255,255,255,.35)'); band(x => 850 + Math.sin(x * .003 + 1) * 26, '#f9dc9c');
  for (let i = 0; i < 50; i++) circ(rnd(i) * W, 870 + rnd(i + 5) * 200, 3 + rnd(i + 2) * 4, 'rgba(200,150,90,.3)');
  palm(1790, 960, 1.5, Math.sin(t * 1.2), '#7a4a30', '#167a55', '#27a66c', -.42); palm(1660, 930, 1.05, Math.sin(t * 1.2 + 1), '#8a5a3c', '#1f9d6b', '#35c486', -.3);
  // baby turtles scurry to the waves
  const tk = Wd(12, 'baby') - .8;
  for (let i = 0; i < 6; i++) { const u = seg(t, tk + i * .25, tk + i * .25 + 5.2), x = 1010 + i * 92 + Math.sin(u * 9 + i) * 14, y = lerp(945, 812, u); if (u <= 0) continue; for (let j = 0; j < 8; j++) { const yy = y + 30 + j * 22; if (yy < 960) { circ(x - 12, yy, 4, 'rgba(180,130,80,.45)'); circ(x + 12, yy + 10, 4, 'rgba(180,130,80,.45)'); } } g.save(); g.globalAlpha = 1 - seg(u, .9, 1); turtle(x, y, 1.15, Math.sin(u * 9 + i) * .2, t, i); g.restore(); }
  // Sasha and Candy stroll in
  const SH = 470, CH = 250, wu = seg(s, .3, 4.6), sx = lerp(-180, 520, wu), walking = wu < 1, pk = E.io(seg(t, Wd(12, 'fishermen') - .4, Wd(12, 'fishermen'))) * (1 - E.io(seg(t, Wd(12, 'baby') - .5, Wd(12, 'baby') - .1))), tk2 = E.io(seg(t, Wd(12, 'baby') - .3, Wd(12, 'baby') + .1));
  const cx = sx - 300 + tk2 * 0;
  shadow(cx, 938, 130); candy(cx, 942, CH, t, walking ? { flip: true, walk: cx / (234 * CH / 880) * Math.PI, look: [-.4, -.2] } : { flip: true, expr: tk2 > .5 ? 'surprised' : 'calm', look: [-.6, .3 * tk2], tilt: -.12 * tk2, tailAmp: 60, tailSpeed: 4 });
  shadow(sx, 938, 120);
  sasha(sx, 942, SH, t, walking ? { walk: sx / (251 * SH / 1410) * Math.PI, dir: 1, talk: true, look: [.6, 0], armR: null } : { talk: true, expr: 'happy', look: [.6, .2 * tk2], armR: mixPose(mixPose(POSE.rest, POSE.point, pk), POSE.low, tk2), tilt: .03 });
  pill('Stilt fishermen', 1120, 330, pop(t, Wd(12, 'fishermen') - .1), { size: 46, bg: '#fff' });
  pill('Baby sea turtles', 1280, 760, pop(t, Wd(12, 'baby') + .2), { size: 42, bg: '#fff' });
  pill('Golden Beaches', 470, 150, pop(s, .7), { size: 58, bg: C.yellow, fg: C.plum, rot: -.03 });
  return {};
};

// ---------------- PERAHERA ----------------
function fig(x, y, s, t, ph, kind) {
  const hopv = Math.abs(Math.sin(t * 6 + ph)), sw = Math.sin(t * 6 + ph);
  at(x, y - hopv * (kind === 'dancer' ? 16 : 7), s, kind === 'dancer' ? sw * .07 : 0, () => {
    const skin = '#a8683c';
    if (kind === 'dancer') { line(-10, -70, -16 - sw * 14, 0, skin, 13); line(10, -70, 22 + sw * 14, -6 - hopv * 14, skin, 13); poly([[-44, -64], [44, -64], [30, -126], [-30, -126]], '#fff'); rect(-44, -76, 88, 12, '#d62839'); for (let i = 0; i < 5; i++) circ(-36 + i * 18, -62, 6, '#fff'); }
    else { rr(-24, -84, 20, 84, 8, '#fff'); rr(4, -84, 20, 84, 8, '#fff'); rr(-30, -130, 60, 58, 12, '#fff'); rect(-30, -108, 60, 13, '#d62839'); }
    rr(-26, -196, 52, 78, 18, skin);
    if (kind === 'dancer') { for (let i = 0; i < 5; i++) circ(-18 + i * 9, -168 + Math.abs(i - 2) * -5, 5, '#e8e8f5'); line(-24, -180, -70 - sw * 10, -230 + sw * 20, skin, 12); line(24, -180, 70 - sw * 10, -230 - sw * 20, skin, 12); }
    else if (kind === 'drummer') { rr(-74, -138, 104, 50, 22, '#8a4a2a'); ell(-74, -113, 10, 25, '#f3e3c2'); ell(30, -113, 10, 25, '#f3e3c2'); rect(-50, -138, 6, 50, '#d62839'); rect(-4, -138, 6, 50, '#d62839'); line(-24, -178, -70, -128 - Math.max(0, sw) * 26, skin, 12); line(24, -178, 34, -128 - Math.max(0, -sw) * 26, skin, 12); }
    else { line(-24, -180, -74, -214, skin, 12); line(24, -180, 60, -150, skin, 12); }
    circ(0, -218, 24, skin);
    if (kind === 'dancer') { poly([[-30, -232], [30, -232], [22, -254], [-22, -254]], '#e8e8f5'); for (let i = 0; i < 7; i++) { const a = -Math.PI + i * Math.PI / 6; line(Math.cos(a) * 22, -250 + Math.sin(a) * 8, Math.cos(a) * 44, -254 + Math.sin(a) * 34, '#e8e8f5', 5); } circ(0, -262, 7, '#d62839'); }
    else { rr(-26, -250, 52, 26, 12, '#fff'); rect(-26, -236, 52, 7, '#d62839'); }
    if (kind === 'fire') { for (let i = 0; i < 18; i++) { const a = t * 9 + ph - i * .32, r = 92, fx = -74 + Math.cos(a) * r, fy = -214 + Math.sin(a) * r, k = 1 - i / 18; glow(fx, fy, 60 * k + 10, 'rgba(255,150,40,.9)', k); circ(fx, fy, 15 * k + 2, `rgba(255,${200 * k + 55},60,${k})`); } }
  });
}
function temple(x, y, s, t) {
  at(x, y, s, 0, () => {
    glow(0, -150, 800, 'rgba(255,190,90,.8)', .5);
    rr(40, -340, 380, 340, 6, '#f3e6cc'); poly([[0, -340], [460, -340], [400, -420], [60, -420]], '#f0b429'); poly([[80, -420], [380, -420], [330, -480], [130, -480]], '#ffd866'); line(230, -480, 230, -530, '#ffd866', 8);
    for (let i = 0; i < 4; i++) { rr(90 + i * 80, -280, 44, 80, [22, 22, 0, 0], '#ffb347'); glow(112 + i * 80, -240, 70, 'rgba(255,200,100,.9)', .5); }
    rr(-300, -260, 240, 260, 6, '#fff6e4'); rect(-312, -150, 264, 16, '#e9d7b3'); poly([[-340, -260], [-20, -260], [-80, -340], [-280, -340]], '#c9452f'); poly([[-280, -340], [-80, -340], [-180, -420]], '#e2552f'); line(-180, -420, -180, -460, '#ffd866', 7);
    for (let i = 0; i < 3; i++) { rr(-270 + i * 76, -236, 40, 66, [20, 20, 0, 0], '#ffcf70'); rr(-270 + i * 76, -120, 40, 70, [20, 20, 0, 0], '#ffb347'); }
    rr(-760, -120, 1520, 120, 4, '#fff6e4'); g.fillStyle = '#fff6e4'; for (let i = 0; i < 38; i++) circ(-740 + i * 40, -120, 20, '#fff6e4');
    for (let i = 0; i < 19; i++) { const fl = .7 + .3 * Math.sin(t * 9 + i * 2.1); rr(-730 + i * 80, -84, 26, 34, [13, 13, 0, 0], '#5a2a3a'); circ(-717 + i * 80, -62, 7, `rgba(255,${190 + 50 * fl},90,1)`); glow(-717 + i * 80, -62, 44, 'rgba(255,180,80,.9)', fl * .7); }
  });
}
SCENES.perahera = (t, sc, s) => {
  rect(0, 0, W, H, lg(0, 0, 0, 660, [[0, '#140c3f'], [.55, '#4a1d73'], [1, '#b8356f']]));
  for (let i = 0; i < 90; i++) { const tw2 = .4 + .6 * Math.abs(Math.sin(t * (1 + rnd(i) * 2) + i)); circ(rnd(i) * W, rnd(i + 50) * 520, 1.5 + rnd(i + 9) * 3, `rgba(255,255,230,${tw2})`); }
  glow(300, 170, 300, 'rgba(255,245,200,.8)', .7); circ(300, 170, 76, '#fff6d0'); circ(332, 150, 66, '#221255');
  treeLine(600, 30, 51, '#1d0f45', t, 0);
  temple(1180, 660, .95, t);
  palm(110, 700, 1.3, Math.sin(t), '#150a33', '#150a33', '#1d0f45', .3); palm(1840, 690, 1.2, Math.sin(t + 1), '#150a33', '#150a33', '#1d0f45', -.3);
  rect(0, 650, W, 440, lg(0, 650, 0, H, [[0, '#5a2466'], [1, '#24123f']]));
  for (let i = 0; i < 6; i++) ell(200 + i * 330, 900, 260, 60, 'rgba(255,170,80,.10)');
  // string lights
  for (let r = 0; r < 2; r++) { g.beginPath(); for (let i = 0; i <= 5; i++) { const x0 = -100 + i * 420 + r * 210; g.moveTo(x0, 40 + r * 60); g.quadraticCurveTo(x0 + 210, 190 + r * 60, x0 + 420, 40 + r * 60); } g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 3; g.stroke();
    for (let i = 0; i < 60; i++) { const u = (i % 10 + .5) / 10, x0 = -100 + Math.floor(i / 10) * 420 + r * 210, x = x0 + u * 420, y = 40 + r * 60 + 300 * u * (1 - u), col = ['#ffd23f', '#ff6b5a', '#3fe0d0', '#ff8fb8', '#b98cff'][i % 5], tw2 = .55 + .45 * Math.sin(t * 5 + i * 1.3); glow(x, y + 12, 46, col, tw2 * .8); circ(x, y + 12, 10, col); } }
  // the procession
  const X = off => 2150 + off - 240 * s, by = 905;
  const items = [[-380, 'fire'], [-190, 'fire'], [20, 'drummer'], [150, 'drummer'], [280, 'drummer'], [410, 'drummer'], [560, 'dancer'], [700, 'dancer'], [840, 'dancer'], [980, 'dancer'], [1330, 'e1'], [1620, 'torch'], [1960, 'e2'], [2330, 'torch'], [2600, 'e3']];
  items.forEach(([off, kind], i) => {
    const x = X(off); if (x < -500 || x > W + 500) return;
    ell(x, by + 6, kind[0] === 'e' ? 260 : 60, kind[0] === 'e' ? 34 : 14, 'rgba(10,0,30,.4)');
    if (kind === 'e1') elephant(x, by, 1.05, t, { walk: 1, ph: 1, cloak: ['#1f5fd1', '#ffd23f'], col: '#8f86ad', dk: '#766d96' });
    else if (kind === 'e2') elephant(x, by + 10, 1.38, t, { walk: 1, ph: 3, cloak: ['#c9252f', '#ffd23f'], tusk: 1, casket: 1, col: '#8f86ad', dk: '#766d96' });
    else if (kind === 'e3') elephant(x, by, 1.05, t, { walk: 1, ph: 5, cloak: ['#7a2fb8', '#ffd23f'], col: '#8f86ad', dk: '#766d96' });
    else if (kind === 'torch') { fig(x, by, 1.25, t, i, 'torch'); line(x - 92, by - 268, x - 92, by - 380, '#7a4a2c', 9); const fl = Math.sin(t * 13 + i) * 6; glow(x - 92, by - 400, 150, 'rgba(255,160,50,.9)', .9); ell(x - 92, by - 404 + fl * .3, 20, 34 + fl, '#ff8a2a'); ell(x - 92, by - 396, 11, 20, '#ffe27a'); }
    else fig(x, by, 1.12, t, i * 1.3, kind);
  });
  for (let i = 0; i < 30; i++) { const u = (t * (.06 + rnd(i) * .06) + rnd(i + 3)) % 1; glow(rnd(i + 7) * W + Math.sin(u * 8 + i) * 30, 900 - u * 800, 26, ['rgba(255,210,90,.9)', 'rgba(255,140,170,.9)'][i % 2], Math.sin(u * Math.PI) * .7); }
  // crowd + Sasha and Candy watching from the front
  g.fillStyle = '#12082b'; g.beginPath(); g.moveTo(0, H); for (let i = 0; i < 30; i++) { const x = 640 + i * 46, r = 34 + rnd(i) * 16; g.lineTo(x - r, 1080); g.arc(x, 1060 + rnd(i + 4) * 24 - Math.abs(Math.sin(t * 3 + i)) * 6, r, Math.PI, 0); } g.lineTo(W, H); g.fill();
  glow(330, 900, 420, 'rgba(255,170,90,.8)', .35);
  { const ch = E.io(seg(t, Wd(14, 'Drummers') - .2, Wd(14, 'Drummers') + .3)), bo = Math.abs(Math.sin(t * 6)) * 14 * ch, up = mixPose(POSE.rest, [2.5 + Math.sin(t * 6) * .12, 2.9, 1], ch); tinted(() => { candyBack(640, 1120 - Math.abs(Math.sin(t * 3)) * 5, 320, t); sasha(330, 1420 - bo, 1000, t, { back: true, armL: up, armR: up }); }, 'rgba(45,14,95,.42)'); }
  const pk = Wd(13, 'Perahera') - .15;
  if (pop(t, pk) > 0) { at(960, 150, pop(t, pk, .5), -.02, () => { txt('Esala Perahera', 0, 0, 120, C.yellow, { w: 800, stroke: '#5a1040', sw: 34 }); txt('Esala Perahera', 0, 0, 120, C.yellow, { w: 800 }); }); sparkles(960, 150, 520, 12, t, '#fff3b0', 31); }
  pill('Kandy · Festival of lights', 960, 268, pop(t, pk + .6), { size: 40, bg: '#fff' });
  return { capX: 1200 };
};

// ---------------- FOOD ----------------
function riceCurry(x, y, s) {
  at(x, y, s, 0, () => {
    ell(8, 14, 200, 196, 'rgba(60,20,20,.2)'); circ(0, 0, 196, '#fff'); circ(0, 0, 172, '#f1e6f7'); circ(0, 0, 160, '#3fae62'); for (let i = 0; i < 9; i++) line(-150 + i * 37, -60, -130 + i * 37, 60, 'rgba(255,255,255,.14)', 4);
    [[0, 0, 62], [-34, -22, 40], [34, -18, 40], [-18, 30, 42], [26, 30, 40]].forEach(([a, b, r]) => circ(a, b, r, '#fffdf2')); for (let i = 0; i < 26; i++) ell(-60 + rnd(i) * 120, -50 + rnd(i + 4) * 100, 6, 3, '#eee3c8', rnd(i) * 3);
    const dish = (a, col, col2, n) => { const dx = Math.cos(a) * 112, dy = Math.sin(a) * 112; circ(dx, dy, 44, col); for (let i = 0; i < n; i++) circ(dx - 24 + rnd(i + a) * 48, dy - 24 + rnd(i + a + 5) * 48, 8, col2); };
    dish(-2.4, '#f2c03a', '#ffe08a', 6); dish(-1.2, '#b5442a', '#7d2a1a', 5); dish(0, '#b0245a', '#d94a82', 5); dish(1.2, '#3f9a3f', '#8fdc6a', 8); dish(2.5, '#ff7a3a', '#fff3d6', 7);
    circ(-120, 120, 50, '#f6d57a'); for (let i = 0; i < 6; i++) circ(-140 + rnd(i) * 44, 100 + rnd(i + 3) * 44, 6, '#e9b94a');
  });
}
function hopper(x, y, s) {
  at(x, y, s, 0, () => {
    ell(0, 120, 150, 24, 'rgba(60,20,20,.2)');
    g.beginPath(); g.moveTo(-186, -30); g.bezierCurveTo(-170, 90, -70, 122, 0, 122); g.bezierCurveTo(70, 122, 170, 90, 186, -30); g.closePath(); g.fillStyle = lg(0, -30, 0, 122, [[0, '#f0c070'], [1, '#c98036']]); g.fill();
    for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; circ(Math.cos(a) * 186, -30 + Math.sin(a) * 58, 13, '#c98036'); }
    ell(0, -30, 186, 58, '#f8e6b4'); ell(0, -18, 150, 42, '#fff3d0');
    ell(0, -6, 92, 30, '#fff'); ell(0, -10, 40, 17, '#ffb627'); ell(-10, -14, 12, 5, 'rgba(255,255,255,.6)'); for (let i = 0; i < 9; i++) circ(-70 + rnd(i) * 140, -18 + rnd(i + 2) * 24, 2.4, '#3d2a1a');
  });
}
function kingCoconut(x, y, s) {
  at(x, y, s, 0, () => {
    ell(0, 150, 130, 22, 'rgba(60,20,20,.2)');
    at(96, 50, .8, .25, () => { ell(0, 0, 100, 122, '#f08a1c'); ell(-30, -40, 30, 44, 'rgba(255,255,255,.22)', -.4); });
    ell(0, 20, 120, 142, lg(0, -120, 0, 160, [[0, '#ffb23a'], [1, '#f07a1c']])); ell(-44, -30, 30, 56, 'rgba(255,255,255,.28)', -.3);
    ell(0, -104, 70, 22, '#fff8e6'); ell(0, -102, 52, 14, '#d9f3ff');
    g.save(); g.translate(18, -104); g.rotate(.22); rr(-9, -150, 18, 160, 9, '#fff'); for (let i = 0; i < 5; i++) rect(-9, -140 + i * 30, 18, 12, C.coral); g.restore();
    at(-52, -112, 1, -.4, () => { for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; ell(Math.cos(a) * 16, Math.sin(a) * 16, 14, 9, '#ff8fb8', a); } circ(0, 0, 8, '#ffd23f'); });
  });
}
function cinnamon(x, y, s, t) {
  at(x, y, s, -.12, () => {
    for (let i = 0; i < 3; i++) { const u = (t * .45 + i / 3) % 1, sx = -90 + i * 90; g.beginPath(); g.moveTo(sx, -70 - u * 70); g.bezierCurveTo(sx - 30, -105 - u * 70, sx + 30, -125 - u * 70, sx, -160 - u * 70); g.strokeStyle = `rgba(255,255,255,${.85 * Math.sin(u * Math.PI)})`; g.lineWidth = 9; g.lineCap = 'round'; g.stroke(); }
    [[0, -36, '#a8571a'], [-8, -6, '#c26a22'], [6, 24, '#b5601d'], [0, 52, '#cf7a2c']].forEach(([dx, dy, col], i) => { rr(-200 + dx, dy - 17, 400, 34, 17, col); rect(-170 + dx, dy - 7, 340, 5, 'rgba(255,220,170,.3)'); ell(200 + dx, dy, 9, 17, '#7d3f12'); g.beginPath(); g.arc(200 + dx, dy, 6, 0, 4.5); g.strokeStyle = '#e9a05a'; g.lineWidth = 3; g.stroke(); });
    rect(-20, -58, 26, 132, '#fff3d6'); at(-7, -62, 1, 0, () => { ell(-24, -8, 24, 13, '#fff3d6', .5); ell(24, -8, 24, 13, '#fff3d6', -.5); circ(0, 0, 9, '#e9d7b3'); });
  });
}
SCENES.food = (t, sc, s) => {
  rect(0, 0, W, H, '#ffbe3d'); sunburst(1250, 520, 1700, 20, s * .05, '#ffd76a', 1); glow(1250, 520, 700, 'rgba(255,255,220,.8)', .6);
  for (let i = 0; i < 26; i++) { const x = 40 + i * 76; circ(x, 40 + Math.sin(i + s) * 5, 13, i % 2 ? C.coral : '#fff'); circ(x, 40 + Math.sin(i + s) * 5, 5, i % 2 ? '#fff' : C.purple); }
  // banana-leaf table
  g.beginPath(); g.moveTo(-40, H); g.lineTo(-40, 680); g.quadraticCurveTo(960, 520, W + 40, 650); g.lineTo(W + 40, H); g.closePath(); g.fillStyle = lg(0, 560, 0, H, [[0, '#3fbf6a'], [1, '#1f8f4f']]); g.fill();
  g.save(); g.clip(); for (let i = 0; i < 16; i++) curve([-100 + i * 140, 560, 0 + i * 140, 800, 60 + i * 140, H], 'rgba(255,255,255,.13)', 7); curve([-40, 640, 960, 500, W + 40, 610], 'rgba(255,255,255,.3)', 12); g.restore();
  const c16 = Wd(16, 'cinnamon') - .3, shift = E.io(seg(t, LN(16).a - .2, LN(16).a + .5));
  const dishes = [[880, 'rice', riceCurry, 'Rice & Curry', 1.0], [1290, 'crispy', hopper, 'Hoppers', 1.08], [1690, 'sweet', kingCoconut, 'King Coconut', .98]];
  dishes.forEach(([x, w, fn, label, sz], i) => {
    const a = Wd(15, w) - .25, k = E.el(seg(t, a, a + .9)); if (k <= 0) return;
    const y = 690 + shift * 30; glow(x, y, 300, 'rgba(255,255,255,.7)', .5 * k);
    at(x, y - Math.abs(Math.sin(seg(t, a, a + .9) * Math.PI)) * 50, k, Math.sin(t * 1.6 + i) * .02, () => fn(0, i === 2 ? -30 : i === 1 ? -30 : 0, sz));
    pill(label, x, 902, pop(t, a + .35), { size: 42, bg: '#fff' });
    if (t < a + 1.4) sparkles(x, y, 250, 8, t, '#fff', 40 + i);
  });
  const tk = pop(s, .5) * (1 - shift);
  if (tk > 0) { at(1250, 230 - shift * 300, tk, -.02, () => { txt('Yummy time!', 0, 0, 150, '#fff', { w: 800, stroke: C.coral, sw: 44 }); txt('Yummy time!', 0, 0, 150, '#fff', { w: 800 }); }); at(820, 240, tk, -.3 + Math.sin(t * 4) * .1, () => { rr(-8, -20, 16, 110, 8, '#fff'); ell(0, -50, 26, 38, '#fff'); }); at(1680, 240, tk, .3 - Math.sin(t * 4) * .1, () => { rr(-8, -20, 16, 110, 8, '#fff'); for (let i = -1; i < 2; i++) rr(-5 + i * 16, -84, 10, 60, 5, '#fff'); rr(-22, -34, 44, 18, 8, '#fff'); }); }
  const ck = E.el(seg(t, c16, c16 + .9));
  if (ck > 0) { glow(1250, 300, 420, 'rgba(255,255,255,.9)', .6 * ck); at(1250, 250, ck, 0, () => cinnamon(0, 0, 1.2, t)); sparkles(1250, 250, 380, 12, t, '#fff', 55); pill('Real cinnamon comes from Sri Lanka!', 1250, 400, pop(t, c16 + .5), { size: 44, bg: C.yellow, fg: C.plum }); }
  return { presenter: true, candy: t > LN(15).a + 2 ? 'c_playful' : 'c_attentive' };
};

// ---------------- OUTRO ----------------
function badge(x, y, r, col, fn) { at(x, y, 1, 0, () => { circ(4, 8, r, 'rgba(60,20,90,.25)'); circ(0, 0, r, '#fff'); circ(0, 0, r - 9, col); g.save(); g.beginPath(); g.arc(0, 0, r - 9, 0, TAU); g.clip(); fn(); g.restore(); }); }
SCENES.outro = (t, sc, s) => {
  const end = Wd(19, 'Bye') + 1.0, ek = E.io(seg(t, end, end + .6));
  rect(0, 0, W, H, rg(960, 430, 80, 1250, [[0, '#fff0a0'], [.45, '#ffb07a'], [.8, '#ff7fa6'], [1, '#9a4fd8']]));
  sunburst(960, 430, 1700, 24, s * .06, '#fff', .2);
  for (let i = 0; i < 70; i++) { const u = (s * (.08 + rnd(i) * .08) + rnd(i + 3)) % 1, x = rnd(i + 7) * W + Math.sin(u * 7 + i) * 40; at(x, -40 + u * 1180, 1, u * 9 + i, () => rr(-9, -5, 18, 10, 3, ['#ffd23f', '#ff6b5a', '#3fe0d0', '#fff', '#b98cff', '#ff8fb8'][i % 6])); }
  // orbiting memory badges
  const icons = [['#ffd9a0', () => { smooth([[-34, 40], [-30, -10], [-10, -30], [24, -28], [36, 0], [38, 40]]); g.fillStyle = '#e8894a'; g.fill(); rr(-26, -38, 54, 14, 7, '#3fae62'); }], ['#c8f0d0', () => teacup(0, 14, .34, t)], ['#d6ecff', () => elephant(18, 46, .2, t, {})], ['#bfe6ff', () => whale(4, 4, .085, t)], ['#ffe9b0', () => turtle(0, 6, 1.3, .3, t, 0)], ['#ffe0c0', () => hopper(0, 6, .3)], ['#e9dcf5', () => peacock(0, 44, .2, 1, t)], ['#fff1b8', () => kingCoconut(0, 0, .28)]];
  const bk = (1 - ek);
  icons.forEach(([col, fn], i) => { const k = pop(s, .5 + i * .12) * bk; if (k <= 0) return; const a = s * .35 + i * TAU / icons.length, x = 960 + Math.cos(a) * 640, y = 420 + Math.sin(a) * 310; at(x, y, k, 0, () => badge(0, 0, 76, col, fn)); });
  const hk = E.el(seg(t, Wd(17, 'heart') - .5, Wd(17, 'heart') + .6)) * bk, ik = E.el(seg(s, .2, 1.2)) * bk;
  if (hk > 0) { glow(960, 420, 620, 'rgba(255,255,255,.9)', .6); heart(960, 440, 6.6 * hk * (1 + Math.sin(t * 5) * .03), '#ff4f7a'); heart(960, 440, 5.6 * hk * (1 + Math.sin(t * 5) * .03), '#ff7f9c'); }
  if (ik > 0) at(960, 420, ik, Math.sin(t * 1.2) * .03, () => island(0, 0, 92));
  // characters
  const bye = Wd(19, 'Bye'), jm = Math.abs(Math.sin(seg(t, bye, bye + 1.2) * Math.PI * 3)) * 50, wv = Math.max(E.io(seg(s, .3, .8)) * (1 - E.io(seg(t, LN(17).b, LN(17).b + .4))), E.io(seg(t, bye - .3, bye)));
  const th = E.io(seg(t, Wd(18, 'Thank') - .2, Wd(18, 'Thank') + .2)) * (1 - E.io(seg(t, bye - .5, bye - .3)));
  let aR = mixPose(mixPose(POSE.rest, [2.3, 2.95 + Math.sin(t * 10) * .35, 1], wv), POSE.show, th * (1 - wv)); if (wv > .05) aR[2] = 1;
  shadow(310, 942, 150); sasha(310, 946 - jm, 600, t, { talk: true, expr: curLine(t, 'outro').expr, armR: aR, armL: mixPose(POSE.rest, wv > .5 && t > bye ? [2.3, 2.95 - Math.sin(t * 10) * .35, 1] : POSE.show, Math.max(th, t > bye ? wv : 0)), look: [.3, 0] });
  const mw = bye + 1.35, mj = Math.abs(Math.sin(seg(t, mw, mw + .7) * Math.PI)) * 60, mo = Math.sin(seg(t, mw, mw + .8) * Math.PI);
  shadow(1640, 942, 190); candy(1640, 946 - mj, 430, t, { expr: mo > .05 ? 'calm' : t > LN(17).a && t < LN(17).b ? 'happy' : 'calm', meow: mo, tailAmp: 70, tailSpeed: 4.5, look: [-.5, -.1] });
  const bb = pop(t, Wd(18, 'Bohoma') - .2, .5) * (1 - seg(t, end - .3, end));
  if (bb > 0) { bubble(700, 190, 700, 300, bb, [-.7, 1]); at(700, 190, bb, 0, () => { txt('Bohoma sthuthi!', 0, -84, 82, C.purple, { w: 800 }); txt('බොහොම ස්තුතියි', 0, 2, 64, C.coral, { f: '"Noto Sans Sinhala"', w: 700 }); txt('= Thank you very much!', 0, 86, 44, C.plum, { w: 600 }); }); sparkles(680, 210, 460, 10, t, '#fff', 77); }
  if (ek > 0) { at(960, 300, 1, 0, () => { titleLogo(0, 0, ek, t, 'See you next time!'); }); const tk = pop(t, end + .5); at(960, 580, tk, .02, () => { txt('Sri Lanka', 0, 0, 110, C.yellow, { w: 800, stroke: C.purple, sw: 34 }); txt('Sri Lanka', 0, 0, 110, C.yellow, { w: 800 }); heart(310, -6, .9, '#ff4f7a'); heart(-310, -6, .9, '#ff4f7a'); }); sparkles(960, 380, 700, 16, t, '#fff', 91); }
  const mk = pop(t, mw, .35);
  if (mk > 0) { bubble(1740, 440, 300, 124, mk, [-.6, 1], '#fff'); at(1740, 440, mk, 0, () => txt('Meow!', 0, 4, 76, C.coral, { w: 800 })); sparks(1880, 380, mk, 1); }
  return { fade: E.i2(seg(t, T.dur - .7, T.dur - .05)) };
};
