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

const COSMOS = 'radial-gradient(ellipse at 50% 60%,#3a1a78 0%,#1a0b40 45%,#07031a 100%)';
const focus = (px, py, s) => `scale(${s}) translate(${960 - px}px,${540 - py}px)`;
const burst = (a, b, c2, d, cx = 960, cy = 460, rc = 'rgba(255,240,200,.26)') => sky(`radial-gradient(ellipse at ${cx / 19.2}% ${cy / 10.8}%,${a} 0%,${b} 30%,${c2} 62%,${d} 100%)`) + rays(cx, cy, 3000, rc, { d: 110 });
function chakra(s = 1) { let p = ''; for (let i = 0; i < 12; i++) p += `<path d="M0,-52 L8,-70 L-8,-70Z" fill="#ffd15c" ${S} transform="rotate(${i * 30})"/>`; return `<g transform="scale(${s})"><g class="spin" style="--d:6s;transform-origin:0px 0px">${p}<circle r="52" fill="#ffd15c" ${S}/><circle r="34" fill="#ff8a2e" ${S}/><path d="M-34,0 h68 M0,-34 v68 M-24,-24 l48,48 M24,-24 l-48,48" stroke="${OUT}" stroke-width="3"/><circle r="10" fill="#fff3c4" ${S}/></g></g>`; }
function flame(s = 1) { return `<g transform="scale(${s})"><path d="M0,-110 C40,-60 60,-20 40,20 C30,44 -30,44 -40,20 C-60,-20 -20,-50 0,-110Z" fill="#ff7a2e" ${S} class="flick"/><path d="M0,-60 C20,-30 30,-6 20,14 C12,28 -12,28 -20,14 C-30,-6 -10,-28 0,-60Z" fill="#ffd15c" class="flick"/></g>`; }
const NAM = { armL: { s: 25, e: -115 }, armR: { s: 25, e: -115 }, armsFront: true };
const waves = (y, c, amp = 26, d = 8, op = 1) => { let p = `M-400,${y}`; for (let i = 0; i < 14; i++) p += ` q100,${-amp} 200,0 t200,0`; return `<path class="wave" style="--d:${d}s" d="${p} L5200,1300 L-400,1300Z" fill="${c}" opacity="${op}"/>`; };
const DAWN = 'linear-gradient(180deg,#2a1a7a 0%,#7a3ab8 30%,#ff7a9a 62%,#ffd08a 100%)';
const clouds = (n, seed, y0 = 100, yh = 500, op = 0.8) => { const r = RNG(seed * 31); let h = ''; for (let i = 0; i < n; i++) h += `<div class="abs drift" style="left:${r() * 2000 - 200 | 0}px;top:${y0 + r() * yh | 0}px;--dx:${120 + r() * 160 | 0}px;--dy:0px;--d:${14 + r() * 10 | 0}s;animation-delay:-${r() * 10 | 0}s">${cloud(260 + r() * 300, '#fff', op * (0.5 + r() * 0.5), 8)}</div>`; return h; };
const NIGHT = 'linear-gradient(180deg,#07062a 0%,#1a1a6a 45%,#3a4ab8 100%)';
const nameTag = (txt, sub, st, x = 1180, y = 200) => `<div class="abs ttl" style="left:${x}px;top:${y}px;width:640px;${st}"><div style="font-style:italic;font-weight:500;font-size:120px;line-height:1">${txt}</div><div style="width:100px;height:2px;background:#ffd98a;margin:14px auto"></div><div style="font:600 19px Archivo;letter-spacing:.42em;color:#ffe9b0">${sub}</div></div>`;
const MEADOW = (seed = 3) => sky('linear-gradient(180deg,#3ab8e8 0%,#a8ecf8 45%,#fff3c4 70%)') + glow(1500, 200, 800, 'rgba(255,250,200,.95)') + rays(1500, 200, 2600, 'rgba(255,255,255,.3)') + clouds(5, seed, 40, 240, 0.9) + div('left:-100px;right:-100px;top:760px;height:440px;background:linear-gradient(#7ad86a,#3fa858);border-radius:50%/110px 110px 0 0') + bokeh(14, ['#fff', '#ffe9b0'], seed, { op: 0.25 });
const child = (o = {}) => person({ skin: '#e0a070', long: false, hair: '#2a1a1a', eyes: 'happy', mouth: 'big', top: '#ff7a5a', sleeve: '#ff7a5a', bottom: '#3ab8e8', bottom2: '#1a7aa8', ...o });
const half = (left, inner, st = '') => `<div class="abs" style="left:${left ? 0 : 960}px;top:0;width:960px;height:1080px;overflow:hidden;${st}"><div class="abs" style="left:${left ? -480 : -480}px;top:0;width:1920px;height:1080px">${inner}</div></div>`;
const THEMES = {
  rose: ['#ffd98a', '#ff7a5a', '#c2338b', '#3a1470'], teal: ['#d8fff0', '#3fd0b0', '#1f7fa8', '#162a6a'], night: ['#9fb8ff', '#4a5ae0', '#2a1f8a', '#0d0830'],
  aqua: ['#f0ffff', '#7fe0ff', '#3a8ae0', '#2a2a9a'], fire: ['#fff3c4', '#ffab2e', '#e2452f', '#5a0f2a'], green: ['#f3ffd0', '#8fe06a', '#1fa878', '#0f3a5a'],
  gold: ['#fffbe0', '#ffd15c', '#ff8a2e', '#8a2a5a'], magenta: ['#ffe0f0', '#ff6fb0', '#a82ac2', '#2a0f5a'], ash: ['#fff', '#d8d0f0', '#8f84c8', '#3a2f6a'], violet: ['#f0d8ff', '#b07aff', '#6a2ad0', '#1a0b40'],
};
