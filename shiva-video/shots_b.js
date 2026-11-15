// ================= CH1 — THE THREE =================
const focus = (px, py, s) => `scale(${s}) translate(${960 - px}px,${540 - py}px)`;
const burst = (a, b, c2, d, cx = 960, cy = 460, rc = 'rgba(255,240,200,.26)') => sky(`radial-gradient(ellipse at ${cx / 19.2}% ${cy / 10.8}%,${a} 0%,${b} 30%,${c2} 62%,${d} 100%)`) + rays(cx, cy, 3000, rc, { d: 110 });
function chakra(s = 1) { let p = ''; for (let i = 0; i < 12; i++) p += `<path d="M0,-52 L8,-70 L-8,-70Z" fill="#ffd15c" ${S} transform="rotate(${i * 30})"/>`; return `<g transform="scale(${s})"><g class="spin" style="--d:6s;transform-origin:0px 0px">${p}<circle r="52" fill="#ffd15c" ${S}/><circle r="34" fill="#ff8a2e" ${S}/><path d="M-34,0 h68 M0,-34 v68 M-24,-24 l48,48 M24,-24 l-48,48" stroke="${OUT}" stroke-width="3"/><circle r="10" fill="#fff3c4" ${S}/></g></g>`; }
function flame(s = 1) { return `<g transform="scale(${s})"><path d="M0,-110 C40,-60 60,-20 40,20 C30,44 -30,44 -40,20 C-60,-20 -20,-50 0,-110Z" fill="#ff7a2e" ${S} class="flick"/><path d="M0,-60 C20,-30 30,-6 20,14 C12,28 -12,28 -20,14 C-30,-6 -10,-28 0,-60Z" fill="#ffd15c" class="flick"/></g>`; }
SHOTS.s05_trimurti = (c) => {
  const T = [c.L[1], c.L[2], c.L[3]], X = [470, 960, 1450], col = ['rgba(255,150,80,.75)', 'rgba(90,170,255,.8)', 'rgba(200,120,255,.85)'];
  const figs = [brahma({ armL: { s: 30, e: 80 }, propL: { svg: lotus(0.7), rot: 0 } }), vishnu({ armR: { s: 40, e: 100 }, propR: { svg: `<g transform="translate(0,-70)">${chakra(0.8)}</g>` } }), shiva({ armR: { s: 44, e: 110 }, propR: { svg: `<g transform="translate(0,-30)">${flame(0.8)}</g>` } })];
  const names = ['Brahma', 'Vishnu', 'Shiva'], role = ['CREATES', 'PROTECTS', 'TRANSFORMS'];
  return cam('scale(1.0)', 'scale(1.07) translateY(-14px)',
    sky('linear-gradient(180deg,#241062 0%,#5a2aa8 40%,#c2338b 78%,#ff8a4a 100%)') + rays(960, 560, 3000, 'rgba(255,220,250,.14)', { d: 140 }) + bokeh(26, ['#ffd98a', '#ff8fb8', '#8fd0ff', '#fff'], 12, { op: 0.26 }) +
    div('left:-100px;right:-100px;top:930px;height:300px;background:linear-gradient(#3a1470,#1a0b40);border-radius:50%/40px 40px 0 0') +
    X.map((x, i) => glow(x, 520, 900, col[i], { st: blink(T[i] - 0.2, i < 2 ? T[i + 1] - 0.3 : c.dur + 5, 0.6) }) + rays(x, 520, 1300, 'rgba(255,255,255,.3)', { st: blink(T[i] - 0.2, i < 2 ? T[i + 1] - 0.3 : c.dur + 5, 0.6), d: 40 })).join('') +
    svg(X.map((x, i) => at(x, 1200, 0.9, `<g style="${K([[c.pre + i * 0.35, 'opacity:0;transform:translateY(80px)'], [c.pre + 0.9 + i * 0.35, 'opacity:1;transform:translateY(0)']])}"><g style="transform-origin:0px -400px;${K([[T[i] - 0.2, 'transform:scale(1)'], [T[i] + 0.4, 'transform:scale(1.1)'], [i < 2 ? T[i + 1] - 0.2 : c.dur + 4, 'transform:scale(1.1)'], [i < 2 ? T[i + 1] + 0.4 : c.dur + 5, 'transform:scale(1)']])}">${figs[i]}</g></g>`)).join('')) +
    X.map((x, i) => `<div class="abs ttl" style="left:${x - 250}px;top:96px;width:500px;${blink(T[i], i < 2 ? T[i + 1] - 0.3 : c.dur + 5, 0.5)}"><div style="font-style:italic;font-size:84px;font-weight:500;line-height:1">${names[i]}</div><div style="font:600 18px Archivo;letter-spacing:.5em;color:#ffe9b0;margin-top:8px">${role[i]}</div></div>`).join(''));
};
SHOTS.s06_tree = (c) => {
  const sp = c.at('spring', 1), nw = c.at('new', 1);
  const r = RNG(77); let aut = '', spr = '';
  for (let i = 0; i < 26; i++) { const a = r() * 6.28, d = 40 + r() * 170, x = Math.cos(a) * d * 1.3, y = -430 + Math.sin(a) * d * 0.8, s = 60 + r() * 50, t = 1 + r() * (sp - 2); aut += `<circle cx="${x | 0}" cy="${y | 0}" r="${s | 0}" fill="${['#ff9a2e', '#ffb84a', '#e8612e', '#ffd15c'][i % 4]}" ${S} style="${K([[t, 'opacity:1;transform:scale(1)'], [t + 1.6, 'opacity:0;transform:scale(.4)']])};transform-box:fill-box;transform-origin:center"/>`; const t2 = sp + r() * (nw - sp + 1); spr += `<circle cx="${x | 0}" cy="${y | 0}" r="${s | 0}" fill="${['#ff9ec0', '#ffc4d8', '#ff7aa8', '#fff0f5'][i % 4]}" ${S} style="${K([[t2, 'opacity:0;transform:scale(.2)'], [t2 + 0.5, 'opacity:1;transform:scale(1.15)'], [t2 + 0.8, 'opacity:1;transform:scale(1)']])};transform-box:fill-box;transform-origin:center"/>`; }
  return cam('scale(1.12) translateY(40px)', 'scale(1) translateY(0)',
    sky('linear-gradient(180deg,#ff8a3d 0%,#ffb85a 45%,#ffe0a0 100%)') + div(`inset:-60px;background:linear-gradient(180deg,#4fc3d8 0%,#a8ecd0 50%,#fff3c4 100%);${fadeIn(sp - 0.5, 3)}`) +
    div('left:660px;top:-60px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,#fffbe0,rgba(255,240,180,0) 70%)', '', 'pulse') + rays(960, 240, 2600, 'rgba(255,255,255,.22)', { d: 100 }) +
    bokeh(20, ['#fff', '#ffe9b0', '#ffc4d8'], 31, { op: 0.3 }) +
    div('left:-100px;right:-100px;top:800px;height:400px;background:linear-gradient(#c9641f,#8a3a14);border-radius:50%/90px 90px 0 0') + div(`left:-100px;right:-100px;top:800px;height:400px;background:linear-gradient(#58c26d,#2f8f50);border-radius:50%/90px 90px 0 0;${fadeIn(sp - 0.5, 3)}`) +
    svg(at(960, 900, 1.25, tree({ crown: aut + spr }))) +
    `<div class="abs" style="inset:0;${fadeOut(sp - 1, 2)}">${particles('leaf', 46, 4, { d: 7 })}</div><div class="abs" style="inset:0;${fadeIn(sp + 1, 2)}">${particles('petal', 46, 6, { d: 9 })}</div>`);
};
SHOTS.s07_gentle = (c) => cam(focus(960, 520, 1.0), focus(960, 480, 1.12),
  burst('#fff3c4', '#ffb347', '#ff5f8f', '#8a2ab8', 960, 430) + glow(960, 430, 1100, 'rgba(255,250,220,.8)') + bokeh(24, ['#fff', '#ffe9b0', '#ffc4d8', '#ffd15c'], 14, { op: 0.34 }) +
  svg(at(960, 1790, 1.75, shiva({ eyes: 'happy', armR: { s: [58, 64, 3], e: 124 }, armL: { s: 10, e: 10 }, headRot: [-4, 4, 4] }))) + particles('petal', 50, 9, { d: 9 }));

// ================= CH2 — READING SHIVA =================
const THEMES = {
  rose: ['#ffd98a', '#ff7a5a', '#c2338b', '#3a1470'], teal: ['#d8fff0', '#3fd0b0', '#1f7fa8', '#162a6a'], night: ['#9fb8ff', '#4a5ae0', '#2a1f8a', '#0d0830'],
  aqua: ['#f0ffff', '#7fe0ff', '#3a8ae0', '#2a2a9a'], fire: ['#fff3c4', '#ffab2e', '#e2452f', '#5a0f2a'], green: ['#f3ffd0', '#8fe06a', '#1fa878', '#0f3a5a'],
  gold: ['#fffbe0', '#ffd15c', '#ff8a2e', '#8a2a5a'], magenta: ['#ffe0f0', '#ff6fb0', '#a82ac2', '#2a0f5a'], ash: ['#fff', '#d8d0f0', '#8f84c8', '#3a2f6a'], violet: ['#f0d8ff', '#b07aff', '#6a2ad0', '#1a0b40'],
};
function look(c, theme, camFrames, o = {}) {
  const T = THEMES[theme];
  const fig = shiva({ armR: { s: 52, e: 28 }, armL: { s: 10, e: 8 }, ...(o.fig || {}) });
  const inner = burst(T[0], T[1], T[2], T[3], 960, 430) + (o.bg || '') + glow(960, 430, 900, 'rgba(255,255,255,.5)') + bokeh(18, [T[0], '#fff', T[1]], o.seed || 3, { op: 0.28 }) +
    svg(at(960, 1120, 1, fig) + (o.noTrident ? '' : at(1262, 640, 0.8, trishul({ down: 640, ...(o.tri || {}) }))) + (o.svg || ''));
  return (camFrames.length === 2 && typeof camFrames[0] === 'string' ? cam(camFrames[0], camFrames[1], inner) : camK(camFrames, inner)) + (o.over || '');
}
SHOTS.s08_look = (c) => look(c, 'rose', [focus(960, 600, 0.96), focus(960, 520, 1.12)], { over: particles('petal', 24, 3) });
SHOTS.s09_hair = (c) => look(c, 'teal', [focus(960, 400, 1.7), focus(960, 300, 2.5)], { seed: 5 });
SHOTS.s10_moon = (c) => {
  const g = c.at('growing'); let ph = '';
  for (let i = 0; i < 7; i++) { const a = Math.PI * (0.12 + 0.76 * i / 6), x = 960 - Math.cos(a) * 760, y = 720 - Math.sin(a) * 560, k = [-1, -0.6, -0.25, 0, 0.25, 0.6, 1][i]; const t = g + i * 0.5;
    ph += `<div class="abs" style="left:${x - 46}px;top:${y - 46}px;width:92px;height:92px;border-radius:50%;background:#fff8d8;box-shadow:0 0 40px rgba(255,248,216,.8);overflow:hidden;${popIn(t, 0.5)}"><div style="position:absolute;left:${k * 92}px;top:0;width:92px;height:92px;border-radius:50%;background:#1a1560;${i === 3 ? 'display:none' : ''};transform:scaleX(${1 + Math.abs(k) * 0.3})"></div></div>`; }
  return look(c, 'night', [focus(1010, 300, 2.4), focus(1022, 280, 3.3)], { bg: stars(90, 9), seed: 7 }) + ph;
};
SHOTS.s11_gangahair = (c) => look(c, 'aqua', [focus(930, 300, 2.1), focus(900, 250, 2.9)], { fig: { ganga: 1 }, seed: 8, over: particles('spark', 40, 4, { y: 500, yh: 500, rise: 400, d: 6 }) });
SHOTS.s12_eye = (c) => {
  const t = c.at('opens', 1) + 0.25;
  return look(c, 'violet', [[0, focus(960, 400, 3.0)], [c.E[0], focus(960, 385, 4.0)], [t, focus(960, 380, 4.2)], [t + 0.5, focus(960, 380, 4.9)], [c.dur, focus(960, 380, 4.6)]], { fig: { third: 'anim', thirdAt: t }, noTrident: 1, seed: 9,
    bg: `<div class="abs" style="inset:-60px;${fadeIn(t, 0.5)}">${burst('#fff3c4', '#ffab2e', '#e2452f', '#5a0f2a', 960, 380)}</div>`,
    over: div(`inset:0;background:#fff8e0;${K([[t - 0.05, 'opacity:0'], [t + 0.12, 'opacity:.95'], [t + 1, 'opacity:0']])}`) + `<div class="abs" style="inset:0;${fadeIn(t, 0.5)}">${particles('ember', 70, 5, { y: 200, yh: 800, rise: 600, d: 5 })}</div>` });
};
SHOTS.s13_snake = (c) => look(c, 'green', [focus(1040, 470, 2.0), focus(1080, 440, 2.8)], { seed: 11, noTrident: 1 });
SHOTS.s14_trishul = (c) => {
  const a = c.at('creation'), b = c.at('protection'), d = c.at('dissolution');
  const lit = [a, b, d].map(t => K([[t - 0.1, 'opacity:0'], [t + 0.3, 'opacity:1']]));
  return look(c, 'gold', [[0, focus(1150, 520, 1.25)], [c.at('trident'), focus(1262, 300, 1.9)], [c.dur, focus(1262, 250, 2.2)]], { tri: { lit: [lit[0], lit[2], lit[1]] }, seed: 12 });
};
SHOTS.s15_drum = (c) => `<div class="abs" style="inset:0;filter:blur(7px)">${look(c, 'magenta', [focus(820, 470, 1.5), focus(800, 460, 1.7)], { seed: 13 })}</div>` + ringsFx(1240, 520, 1500, 'rgba(255,230,245,.85)', 4, 1.9) + glow(1240, 520, 800, 'rgba(255,240,200,.7)') +
  svg(`<path d="M1240,-20 L1240,420" stroke="#e2452f" stroke-width="9"/>` + at(1240, 520, 3.1, `<g class="swing" style="--a0:-9deg;--a1:9deg;--d:1.9s;transform-origin:0px -170px"><g transform="rotate(90)">${damaru(1)}</g></g>`));
SHOTS.s16_ash = (c) => {
  const t = c.L[1];
  return look(c, 'ash', [[0, focus(960, 520, 1.5)], [t - 0.6, focus(960, 500, 1.7)], [t + 1.2, focus(960, 840, 1.9)], [c.at('rudraksha', 1), focus(960, 840, 1.9)], [c.at('rudraksha', 1) + 1.6, focus(960, 560, 2.0)], [c.dur, focus(960, 540, 1.8)]], { seed: 14, over: particles('ash', 80, 6, { d: 11 }) });
};
