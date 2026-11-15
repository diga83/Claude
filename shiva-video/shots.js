// ---------- scene helpers ----------
const SHOTS = {};
const svg = (inner, st = '') => `<svg class="L" viewBox="0 0 1920 1080" style="${st}">${inner}</svg>`;
const at = (x, y, s, inner, st = '') => `<g transform="translate(${x},${y}) scale(${s})"><g style="${st}">${inner}</g></g>`;
const flip = (inner) => `<g transform="scale(-1,1)">${inner}</g>`;
const div = (st, inner = '', cls = '') => `<div class="abs ${cls}" style="${st}">${inner}</div>`;
const sky = (g) => div(`inset:-60px;background:${g}`);
const cam = (c0, c1, inner) => `<div class="cam" style="--c0:${c0};--c1:${c1};animation:cam var(--dur) cubic-bezier(.35,.1,.45,1) both">${inner}</div>`;
const camK = (frames, inner) => `<div class="cam" style="${K(frames.map(([t, v]) => [t, 'transform:' + v]))}">${inner}</div>`;
function bokeh(n, colors, seed = 1, o = {}) {
  const r = RNG(seed * 7919); let h = '';
  for (let i = 0; i < n; i++) {
    const s = (o.min || 40) + r() * (o.max || 170), x = r() * 2000 - 60, y = (o.y0 ?? 0) + r() * (o.yh ?? 1080) - 40;
    h += `<div class="bokeh drift" style="left:${x | 0}px;top:${y | 0}px;width:${s | 0}px;height:${s | 0}px;background:${colors[i % colors.length]};opacity:${(0.12 + r() * (o.op || 0.3)).toFixed(2)};--b:${(o.blur ?? 6) + r() * 10 | 0}px;--dx:${(r() * 80 - 40) | 0}px;--dy:${(-10 - r() * 50) | 0}px;--d:${(6 + r() * 8).toFixed(1)}s;animation-delay:-${(r() * 8).toFixed(1)}s"></div>`;
  }
  return h;
}
function rays(x, y, size, color, o = {}) {
  const al = parseFloat((color.match(/,\s*([\d.]+)\)\s*$/) || [0, 1])[1]);
  return `<div class="abs" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;opacity:${Math.min(1, (o.op ?? 1) * al * 1.25).toFixed(3)}"><div class="abs" style="inset:0;${o.st || ''}"><div class="rays ${o.rev ? 'spinr' : 'spin'}" style="inset:0;background-image:url(build/rays_${o.w === 4 ? 4 : 7}.png);--d:${o.d || 90}s"></div></div></div>`;
}
const glow = (x, y, size, color, o = {}) => `<div class="glow ${o.cls ?? 'pulse'}" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background:radial-gradient(circle,${color} 0%,transparent 68%);--d:${o.d || 3}s;${o.st || ''}"></div>`;
function stars(n, seed = 3, o = {}) {
  const r = RNG(seed * 104729); let h = '';
  for (let i = 0; i < n; i++) { const s = 2 + r() * (o.max || 5); h += `<div class="abs twk" style="left:${r() * 1920 | 0}px;top:${r() * (o.h || 1080) | 0}px;width:${s.toFixed(1)}px;height:${s.toFixed(1)}px;border-radius:50%;background:${o.c || '#fff'};box-shadow:0 0 ${s * 2 | 0}px ${o.c || '#fff'};--d:${(1 + r() * 3).toFixed(1)}s;animation-delay:-${(r() * 4).toFixed(1)}s"></div>`; }
  return h;
}
function particles(kind, n, seed = 5, o = {}) {
  const r = RNG(seed * 15485863); let h = '';
  const cols = o.colors || { petal: ['#ff9ec0', '#ffd0df', '#ff6f9f', '#fff'], snow: ['#fff'], leaf: ['#ffb02e', '#ff7a2e', '#ffd15c', '#e2452f'], ash: ['#e9e4dc', '#bfb8ae'], ember: ['#ffd15c', '#ff8a2e', '#fff3b0'], spark: ['#fff', '#dff6ff'] }[kind];
  for (let i = 0; i < n; i++) {
    const c = cols[i % cols.length], x = r() * 2000 - 40, d = (o.d || 8) * (0.7 + r() * 0.8), del = -(r() * d);
    if (kind === 'ember' || kind === 'spark') { const s = 4 + r() * 8; h += `<div class="abs rise" style="left:${x | 0}px;top:${(o.y ?? 1000) + r() * (o.yh ?? 80) | 0}px;width:${s | 0}px;height:${s | 0}px;border-radius:50%;background:${c};box-shadow:0 0 12px ${c};--dx:${(r() * 240 - 120) | 0}px;--dy:${-(o.rise || 700) * (0.5 + r()) | 0}px;--d:${(d * 0.6).toFixed(1)}s;animation-delay:${del.toFixed(1)}s"></div>`; continue; }
    const s = kind === 'snow' ? 5 + r() * 9 : kind === 'ash' ? 4 + r() * 7 : 14 + r() * 16;
    const shape = kind === 'snow' || kind === 'ash' ? 'border-radius:50%' : kind === 'leaf' ? 'border-radius:80% 10% 80% 10%' : 'border-radius:70% 30% 70% 30%';
    h += `<div class="abs fall" style="left:${x | 0}px;top:0;width:${s | 0}px;height:${(kind === 'petal' ? s * 0.62 : kind === 'leaf' ? s * 0.7 : s) | 0}px;${shape};background:${c};opacity:${(0.55 + r() * 0.45).toFixed(2)};${kind === 'snow' ? 'filter:blur(' + (r() * 2).toFixed(1) + 'px);' : ''}--dx:${(r() * 300 - 150) | 0}px;--r:${(r() * 720 - 360) | 0}deg;--d:${d.toFixed(1)}s;animation-delay:${del.toFixed(1)}s"></div>`;
  }
  return h;
}
function ringsFx(x, y, size, color, n = 3, d = 2.4, st = '') { let h = ''; for (let i = 0; i < n; i++) h += `<div class="abs ring" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;border-radius:50%;border:5px solid ${color};box-shadow:0 0 30px ${color};--d:${d}s;animation-delay:-${(i * d / n).toFixed(2)}s"></div>`; return `<div class="abs" style="inset:0;${st}">${h}</div>`; }
function mountains(o = {}) {
  const c1 = o.c1 || '#6d5bd0', c2 = o.c2 || '#8f7fe8', snow = o.snow || '#f4f0ff', by = o.y || 1080;
  return `<path d="M-40,${by} L160,${by - 330} L300,${by - 250} L460,${by - 420} L640,${by - 230} L760,${by - 300} L960,${by - 140} L1160,${by - 320} L1300,${by - 240} L1480,${by - 440} L1700,${by - 250} L1960,${by - 360} L1960,${by}Z" fill="${c1}"/>
  <path d="M460,${by - 420} L400,${by - 345} L440,${by - 356} L470,${by - 330} L500,${by - 360} L528,${by - 345}Z M1480,${by - 440} L1410,${by - 350} L1456,${by - 366} L1486,${by - 340} L1520,${by - 372} L1560,${by - 352}Z M160,${by - 330} L112,${by - 265} L150,${by - 276} L176,${by - 256} L204,${by - 305}Z" fill="${snow}"/>`;
}
function kailash(x, y, s = 1, o = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-520,0 L-300,-250 L-200,-190 L0,-560 L210,-200 L320,-270 L540,0Z" fill="${o.c || '#5a57c8'}" ${S}/>
  <path d="M0,-560 L-150,-284 L-90,-320 L-40,-260 L10,-330 L60,-270 L120,-330 L172,-268Z" fill="#fbfaff" ${S}/><path d="M-300,-250 L-356,-186 L-306,-204 L-270,-176 L-236,-212Z M320,-270 L262,-206 L312,-226 L352,-196 L374,-204Z" fill="#fbfaff" ${S}/>
  <path d="M-60,-200 L60,-200 M-90,-140 L90,-140 M-120,-80 L120,-80" stroke="#8f8cf0" stroke-width="5" opacity=".6"/></g>`;
}
const ground = (c, y = 860, h = 300) => div(`left:-100px;right:-100px;top:${y}px;height:${h}px;background:${c};border-radius:50% 50% 0 0 / 60px 60px 0 0`);
function seatedShiva(o = {}) { return shiva({ seated: true, armL: { s: 22, e: -26 }, armR: { s: 22, e: -26 }, eyes: 'calm', ...o }); }
function sil(inner) { return `<g style="filter:brightness(0) saturate(0);opacity:.92">${inner}</g>`; }

SHOTS._missing = (c) => sky('linear-gradient(#2a1458,#7a2a8a)') + svg(at(960, 1000, 0.9, shiva({})));

// ================= CH0 — THE FIRST SOUND =================
const COSMOS = 'radial-gradient(ellipse at 50% 60%,#3a1a78 0%,#1a0b40 45%,#07031a 100%)';
SHOTS.s01_cosmos = (c) => cam('scale(1.18)', 'scale(1)',
  sky(COSMOS) + glow(600, 500, 1300, 'rgba(120,60,220,.5)', { d: 6 }) + glow(1400, 420, 1000, 'rgba(230,60,150,.32)', { d: 7 }) +
  `<div class="abs spin" style="left:-200px;top:-620px;width:2320px;height:2320px;--d:240s">${stars(170, 2, { h: 2320 }).replace(/left:(\d+)/g, (m, a) => 'left:' + (a * 1.2 | 0))}</div>` +
  bokeh(16, ['#8a5cff', '#ff5fb0', '#4fd2ff'], 4, { op: 0.16, blur: 16 }));
SHOTS.s02_damaru = (c) => {
  const b = c.at('drumbeat'), w = c.L[1];
  let hits = ''; for (let i = 0; i < 9; i++) { const t = b + i * 0.62; hits += `<div class="abs" style="left:460px;top:40px;width:1000px;height:1000px;border-radius:50%;border:6px solid #ffd98a;box-shadow:0 0 50px #ffb02e,inset 0 0 50px #ffb02e;${K([[t, 'opacity:0;transform:scale(.12)'], [t + 0.12, 'opacity:.95;transform:scale(.3)'], [t + 1.9, 'opacity:0;transform:scale(1.9)']], 'ease-out')}"></div>`; }
  return cam('scale(1)', 'scale(1.1)', sky(COSMOS) + stars(120, 8) + glow(960, 540, 900, 'rgba(255,170,60,.55)', { st: fadeIn(b - 0.4, 1) }) +
    rays(960, 540, 2400, 'rgba(255,200,120,.28)', { st: fadeIn(w, 2), d: 60 }) + hits +
    svg(at(960, 540, 2.3, `<g style="${K([[b - 0.9, 'opacity:0;transform:scale(.4) rotate(-30deg)'], [b - 0.1, 'opacity:1;transform:scale(1) rotate(-14deg)'], [b + 0.1, 'transform:scale(1.14) rotate(-14deg)'], [b + 0.4, 'transform:scale(1) rotate(-12deg)'], [c.dur, 'opacity:1;transform:scale(1.05) rotate(8deg)']])}">${damaru(1)}</g>`)) +
    `<div class="abs" style="inset:0;${fadeIn(w, 1.5)}">${particles('ember', 60, 3, { y: 300, yh: 600, rise: 500, d: 7 })}</div>`);
};
SHOTS.s03_silhouette = (c) => cam('scale(1.02) translateY(10px)', 'scale(1.14) translateY(-10px)',
  sky('radial-gradient(ellipse at 50% 45%,#ff7a3d 0%,#c2338b 34%,#3a1470 68%,#12062e 100%)') + rays(960, 470, 2600, 'rgba(255,220,150,.22)', { d: 120 }) +
  div('left:560px;top:70px;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,#fff6d8 0%,#ffd98a 45%,#ffab4a 100%);box-shadow:0 0 160px 40px rgba(255,190,90,.7)', '', 'pulse') +
  bokeh(18, ['#ffd98a', '#ff8fb8', '#fff'], 6, { op: 0.25 }) +
  svg(`<path d="M-40,1080 L300,820 L620,900 L960,840 L1300,900 L1640,810 L1960,1080Z" fill="#12062e"/>` + at(960, 880, 0.86, sil(seatedShiva({ propR: null })) ) + at(1250, 890, 0.8, sil(trishul({ down: 10 })))) + stars(40, 5, { h: 400 }));
SHOTS.s04_title = (c) => {
  const t2 = c.L[1], t3 = c.L[2];
  return cam('scale(1.1) translate(0,30px)', 'scale(1) translate(0,0)',
    sky('radial-gradient(ellipse at 50% 42%,#ffb347 0%,#ff5f8f 30%,#7a2ab8 62%,#1a0b40 100%)') + rays(960, 440, 2800, 'rgba(255,240,190,.3)', { d: 100 }) + rays(960, 440, 1800, 'rgba(255,255,255,.22)', { d: 70, rev: 1, w: 4 }) +
    glow(960, 420, 900, 'rgba(255,240,200,.75)') + bokeh(22, ['#ffd98a', '#ff8fb8', '#b08cff', '#fff'], 9, { op: 0.3 }) +
    svg(`<g style="${K([[0, 'transform:translateX(0)'], [t2 - 0.3, 'transform:translateX(0)'], [t2 + 1.2, 'transform:translateX(-430px)']])}">` + at(960, 1010, 0.92, seatedShiva({ ganga: 1, propR: null }) + `<g transform="translate(300,-10)">${trishul({ down: 10 })}</g>`) + '</g>') +
    `<div class="abs ttl" style="left:880px;top:250px;width:900px;${K([[t2, 'opacity:0;transform:translateY(40px)'], [t2 + 1.2, 'opacity:1;transform:translateY(0)']])}"><div style="font:600 20px Archivo;letter-spacing:.55em;color:#ffe9b0">AN INTRODUCTION TO</div><div style="font-style:italic;font-weight:500;font-size:250px;line-height:.95">Shiva</div><div style="width:150px;height:2px;background:#ffd98a;margin:22px auto"></div><div style="font-size:54px;font-weight:500;${fadeIn(t3, 1)}">in ten minutes</div></div>` +
    particles('petal', 34, 2, { d: 10 }));
};
