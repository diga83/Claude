// ---------- helpers ----------
const OUT = '#1f1438';
const S = `stroke="${OUT}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
function RNG(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
let CTX = { css: '', dur: 10, n: 0 };
// timed keyframes: frames = [[tSeconds, 'css decls'], ...] -> returns style string
function K(frames, ease = 'ease-in-out') {
  const name = 'k' + (CTX.id || '') + '_' + (CTX.n++), D = CTX.dur;
  let css = `@keyframes ${name}{`;
  const f = frames.slice().sort((a, b) => a[0] - b[0]);
  if (f[0][0] > 0) css += `0%{${f[0][1]}}`;
  for (const [t, d] of f) css += `${Math.max(0, Math.min(100, t / D * 100)).toFixed(3)}%{${d};animation-timing-function:${ease}}`;
  css += `100%{${f[f.length - 1][1]}}}`;
  CTX.css += css;
  return `animation:${name} ${D}s linear both;`;
}
const fadeIn = (t, d = 0.8) => K([[t, 'opacity:0'], [t + d, 'opacity:1']]);
const fadeOut = (t, d = 0.8) => K([[t, 'opacity:1'], [t + d, 'opacity:0']]);
const blink = (t0, t1, d = 0.6) => K([[t0, 'opacity:0'], [t0 + d, 'opacity:1'], [t1, 'opacity:1'], [t1 + d, 'opacity:0']]);
const popIn = (t, d = 0.7) => K([[t, 'opacity:0;transform:scale(.3)'], [t + d * 0.6, 'opacity:1;transform:scale(1.12)'], [t + d, 'opacity:1;transform:scale(1)']]);
// joint rotation: number | [a0,a1,dur?] (sway) | {k:[[t,a],...]}
function rotStyle(a, sign = 1) {
  if (a == null) a = 0;
  if (typeof a === 'number') return `transform:rotate(${sign * a}deg);`;
  if (Array.isArray(a)) return `--a0:${sign * a[0]}deg;--a1:${sign * a[1]}deg;animation:sway ${a[2] || 4}s ease-in-out ${a[3] || 0}s infinite alternate both;`;
  return K(a.k.map(([t, v]) => [t, `transform:rotate(${sign * v}deg)`]));
}
const beads = (d, c = '#8a3b1c', w = 11, gap = 13) => `<path d="${d}" fill="none" stroke="${OUT}" stroke-width="${w + 3}" stroke-linecap="round" stroke-dasharray="0.1 ${gap}"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="0.1 ${gap}"/>`;

// ---------- props ----------
function diya(s = 1, glow = true) {
  return `<g transform="scale(${s})">${glow ? `<circle cx="0" cy="-34" r="60" fill="url(#gGlow)" class="pulse" style="--d:1.7s"/>` : ''}
  <path d="M0,-58 C14,-40 12,-22 0,-16 C-12,-22 -14,-40 0,-58Z" fill="#ffd34d" class="flick"/><path d="M0,-42 C6,-34 5,-24 0,-20 C-5,-24 -6,-34 0,-42Z" fill="#fff6c9" class="flick"/>
  <path d="M-46,-14 Q0,-26 46,-14 Q40,22 0,24 Q-40,22 -46,-14Z" fill="#c7641f" ${S}/><path d="M-46,-14 Q0,-2 46,-14" fill="none" ${S}/>
  <path d="M-34,4 Q0,16 34,4" fill="none" stroke="#ffe9b0" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 11"/></g>`;
}
function damaru(s = 1) {
  return `<g transform="scale(${s})"><path d="M-46,-30 L46,-30 L12,0 L46,30 L-46,30 L-12,0Z" fill="#c9541e" ${S}/>
  <ellipse cx="0" cy="-30" rx="46" ry="9" fill="#f6d9a0" ${S}/><ellipse cx="0" cy="30" rx="46" ry="9" fill="#e9b85f" ${S}/>
  <path d="M-30,-22 L-8,0 L-30,22 M30,-22 L8,0 L30,22 M-12,-22 L0,-6 L12,-22 M-12,22 L0,6 L12,22" fill="none" stroke="#ffd15c" stroke-width="3"/>
  <rect x="-14" y="-6" width="28" height="12" rx="5" fill="#ffd15c" ${S}/>
  <g class="swing" style="--a0:-38deg;--a1:38deg;--d:.32s;transform-origin:0px 0px"><path d="M12,0 Q40,0 52,-16" fill="none" stroke="#fff3d0" stroke-width="3"/><circle cx="54" cy="-18" r="7" fill="#ffd15c" ${S}/></g>
  <g class="swing" style="--a0:38deg;--a1:-38deg;--d:.32s;transform-origin:0px 0px"><path d="M-12,0 Q-40,0 -52,16" fill="none" stroke="#fff3d0" stroke-width="3"/><circle cx="-54" cy="18" r="7" fill="#ffd15c" ${S}/></g></g>`;
}
// trident, origin at grip point; staff extends up 520 and down `down`
function trishul(o = {}) {
  const down = o.down ?? 330, drum = o.drum !== false, lit = o.lit || ['', '', ''];
  return `<g>
  <rect x="-7" y="-470" width="14" height="${470 + down}" rx="7" fill="#e8a92e" ${S}/>
  <path d="M-7,-300 h14 M-7,-200 h14 M-7,-100 h14 M-7,60 h14 M-7,160 h14" stroke="${OUT}" stroke-width="3"/>
  <path d="M-78,-560 C-80,-470 -40,-452 0,-452 C40,-452 80,-470 78,-560 C92,-520 100,-420 0,-420 C-100,-420 -92,-520 -78,-560Z" fill="#ffd15c" ${S}/>
  <path d="M-78,-560 l-14,-52 l28,30Z M78,-560 l14,-52 l-28,30Z" fill="#fff0b0" ${S}/>
  <path d="M0,-690 C22,-640 20,-600 12,-560 L12,-440 L-12,-440 L-12,-560 C-20,-600 -22,-640 0,-690Z" fill="#ffd15c" ${S}/>
  <path d="M0,-670 L0,-470" stroke="#fff6cf" stroke-width="4" stroke-linecap="round"/>
  <g style="${lit[0]}"><circle cx="-84" cy="-590" r="42" fill="url(#gGlow)"/></g><g style="${lit[1]}"><circle cx="0" cy="-680" r="46" fill="url(#gGlow)"/></g><g style="${lit[2]}"><circle cx="84" cy="-590" r="42" fill="url(#gGlow)"/></g>
  <ellipse cx="0" cy="-428" rx="26" ry="12" fill="#e2452f" ${S}/>
  ${drum ? `<g class="swing" style="--a0:-7deg;--a1:7deg;--d:2.1s;transform-origin:0px -416px"><path d="M0,-416 L0,-350" stroke="#e2452f" stroke-width="5"/><g transform="translate(0,-322) rotate(90)">${damaru(0.62)}</g>
  <path d="M-6,-296 l-6,34 M6,-296 l6,34" stroke="#e2452f" stroke-width="5" stroke-linecap="round"/></g>` : ''}
  </g>`;
}
function crescent(s = 1) { return `<g transform="scale(${s})"><circle r="46" fill="url(#gGlowW)" class="pulse" style="--d:2.6s"/><path d="M-6,-30 A30,30 0 1,0 24,10 A24,24 0 1,1 -6,-30Z" fill="#fff8d8" ${S}/></g>`; }
function lotus(s = 1, c = '#ff8fb8', c2 = '#ffd0e2') {
  let p = ''; for (const a of [-70, -42, 42, 70]) p += `<path d="M0,0 C-22,-30 -14,-64 0,-84 C14,-64 22,-30 0,0Z" fill="${c}" ${S} transform="rotate(${a})"/>`;
  for (const a of [-20, 20, 0]) p += `<path d="M0,0 C-22,-30 -14,-70 0,-92 C14,-70 22,-30 0,0Z" fill="${c2}" ${S} transform="rotate(${a})"/>`;
  return `<g transform="scale(${s})">${p}<ellipse cx="0" cy="2" rx="60" ry="10" fill="#3fae6a" ${S}/></g>`;
}
function linga(s = 1) {
  return `<g transform="scale(${s})">
  <path d="M-250,0 L250,0 L330,40 Q340,70 300,74 L-220,74 Q-260,70 -250,40Z" fill="#3a3550" ${S}/>
  <ellipse cx="0" cy="0" rx="250" ry="62" fill="#55507a" ${S}/><ellipse cx="0" cy="-6" rx="205" ry="46" fill="#3a3550" ${S}/>
  <path d="M-92,-10 L-92,-220 C-92,-330 92,-330 92,-220 L92,-10 C60,12 -60,12 -92,-10Z" fill="#2a2740" ${S}/>
  <path d="M-62,-250 C-50,-296 -10,-304 14,-300" fill="none" stroke="#7d78a8" stroke-width="10" stroke-linecap="round" opacity=".7"/>
  <path d="M-70,-170 h140 M-74,-150 h148 M-70,-130 h140" stroke="#f3efe2" stroke-width="9" stroke-linecap="round"/>
  <circle cx="0" cy="-150" r="15" fill="#e2452f" ${S}/>
  <path d="M-92,-60 Q0,-20 92,-60" fill="none" stroke="#ffb02e" stroke-width="12" stroke-linecap="round" stroke-dasharray="0.1 17"/>
  <path d="M-92,-60 Q0,-20 92,-60" fill="none" stroke="#ff5d8f" stroke-width="12" stroke-linecap="round" stroke-dasharray="0.1 34"/></g>`;
}
function bilva(s = 1) { return `<g transform="scale(${s})"><path d="M0,10 L0,40" stroke="#2f7d43" stroke-width="5" stroke-linecap="round"/>${[-48, 0, 48].map(a => `<path d="M0,12 C-20,-8 -16,-44 0,-62 C16,-44 20,-8 0,12Z" fill="#58c26d" ${S} transform="rotate(${a} 0 12)"/>`).join('')}</g>`; }
function cloud(w = 400, c = '#fff', op = 0.9, blur = 6) { return `<div style="width:${w}px;height:${w * 0.36}px;position:relative;filter:blur(${blur}px);opacity:${op}"><i style="position:absolute;left:0;bottom:0;width:100%;height:55%;background:${c};border-radius:999px"></i><i style="position:absolute;left:14%;bottom:20%;width:34%;height:74%;background:${c};border-radius:50%"></i><i style="position:absolute;left:40%;bottom:24%;width:40%;height:86%;background:${c};border-radius:50%"></i></div>`; }

// ---------- face / head ----------
function face(o) {
  const skin = o.skin, eyes = o.eyes || 'calm', mouth = o.mouth || 'smile';
  let e = '';
  const brow = o.brow ?? '#2a1a1a';
  if (eyes === 'calm') e = `<path d="M-46,4 Q-30,18 -14,4 M14,4 Q30,18 46,4" fill="none" ${S} stroke-width="4"/>`;
  else if (eyes === 'happy') e = `<path d="M-46,10 Q-30,-8 -14,10 M14,10 Q30,-8 46,10" fill="none" ${S} stroke-width="4"/>`;
  else if (eyes === 'open' || eyes === 'fierce' || eyes === 'wide') {
    const ry = eyes === 'wide' ? 13 : 10;
    e = [-30, 30].map(x => `<ellipse cx="${x}" cy="6" rx="17" ry="${ry}" fill="#fff" ${S}/><circle cx="${x}" cy="7" r="${ry - 2.5}" fill="#3a2212"/><circle cx="${x + 3}" cy="4" r="2.6" fill="#fff"/>`).join('');
  } else if (eyes === 'anim') { // closed -> open at o.eyeAt
    e = `<g style="${fadeOut(o.eyeAt, 0.3)}"><path d="M-46,4 Q-30,18 -14,4 M14,4 Q30,18 46,4" fill="none" ${S} stroke-width="4"/></g><g style="${fadeIn(o.eyeAt, 0.3)}">` +
      [-30, 30].map(x => `<ellipse cx="${x}" cy="6" rx="17" ry="10" fill="#fff" ${S}/><circle cx="${x}" cy="7" r="7.5" fill="#3a2212"/><circle cx="${x + 3}" cy="4" r="2.6" fill="#fff"/>`).join('') + `</g>`;
  }
  const br = eyes === 'fierce' ? `<path d="M-50,-22 L-14,-8 M50,-22 L14,-8" stroke="${brow}" stroke-width="6" stroke-linecap="round"/>`
    : `<path d="M-48,-14 Q-30,-24 -12,-14 M12,-14 Q30,-24 48,-14" fill="none" stroke="${brow}" stroke-width="5" stroke-linecap="round"/>`;
  const m = { smile: `<path d="M-16,44 Q0,58 16,44" fill="none" ${S} stroke-width="4"/>`, big: `<path d="M-20,42 Q0,66 20,42Z" fill="#7a1f2e" ${S}/>`, flat: `<path d="M-12,48 L12,48" ${S} stroke-width="4"/>`, o: `<ellipse cx="0" cy="50" rx="8" ry="10" fill="#7a1f2e" ${S}/>`, sad: `<path d="M-14,52 Q0,42 14,52" fill="none" ${S} stroke-width="4"/>` }[mouth];
  return `${br}${e}<path d="M0,10 L-5,30 L4,31" fill="none" ${S} stroke-width="3.5"/>${m}
  <circle cx="-46" cy="32" r="13" fill="#ff7a9a" opacity=".38"/><circle cx="46" cy="32" r="13" fill="#ff7a9a" opacity=".38"/>${o.stache ? `<path d="M0,38 C-14,30 -34,36 -42,50 C-30,46 -14,48 0,42 C14,48 30,46 42,50 C34,36 14,30 0,38Z" fill="#241414" ${S}/>` : ''}`;
}
function headBase(o) { // head centered at 0,0
  const skin = o.skin;
  return `<circle cx="-74" cy="8" r="15" fill="${skin}" ${S}/><circle cx="74" cy="8" r="15" fill="${skin}" ${S}/>
  ${o.earring !== false ? `<circle cx="-78" cy="28" r="9" fill="none" stroke="${OUT}" stroke-width="7"/><circle cx="-78" cy="28" r="9" fill="none" stroke="#ffd15c" stroke-width="4"/><circle cx="78" cy="28" r="9" fill="none" stroke="${OUT}" stroke-width="7"/><circle cx="78" cy="28" r="9" fill="none" stroke="#ffd15c" stroke-width="4"/>` : ''}
  <rect x="-74" y="-80" width="148" height="164" rx="72" fill="${skin}" ${S}/>`;
}
function thirdEye(o) {
  if (o.third === 'open') return `<circle cx="0" cy="-44" r="34" fill="url(#gFire)" class="pulse" style="--d:.9s"/><path d="M0,-66 Q16,-44 0,-22 Q-16,-44 0,-66Z" fill="#fff3c4" ${S}/><ellipse cx="0" cy="-44" rx="6" ry="10" fill="#e2301f"/>`;
  if (o.third === 'anim') return `<g style="${fadeOut(o.thirdAt, .4)}"><path d="M0,-60 L0,-28" ${S} stroke-width="4"/><circle cx="0" cy="-44" r="5" fill="#e2452f"/></g>
   <g style="${fadeIn(o.thirdAt, .4)}"><circle cx="0" cy="-44" r="46" fill="url(#gFire)" class="pulse" style="--d:.9s"/><path d="M0,-68 Q18,-44 0,-20 Q-18,-44 0,-68Z" fill="#fff3c4" ${S}/><ellipse cx="0" cy="-44" rx="6" ry="11" fill="#e2301f"/></g>`;
  return `<path d="M0,-60 L0,-30" ${S} stroke-width="4"/><circle cx="0" cy="-45" r="5.5" fill="#e2452f" stroke="${OUT}" stroke-width="2"/>`;
}
const HAIR = '#2b1b22', HAIR2 = '#4a2f38';
function shivaHead(o) {
  const g = o.ganga, moon = o.moon !== false;
  return `
  <path d="M-80,-40 C-110,40 -118,150 -150,230 C-110,236 -84,210 -70,160 L-60,60Z" fill="${HAIR}" ${S}/>
  <path d="M80,-40 C110,40 118,150 150,230 C110,236 84,210 70,160 L60,60Z" fill="${HAIR}" ${S}/>
  <path d="M-98,60 C-104,120 -116,170 -132,214 M98,60 C104,120 116,170 132,214" fill="none" stroke="${HAIR2}" stroke-width="5" stroke-linecap="round"/>
  ${g ? `<g>${gangaSpout(g)}</g>` : ''}
  <ellipse cx="0" cy="-176" rx="36" ry="30" fill="${HAIR}" ${S}/><path d="M-22,-186 Q0,-200 22,-186 M-26,-170 Q0,-184 26,-170" fill="none" stroke="${HAIR2}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="0" cy="-122" rx="58" ry="46" fill="${HAIR}" ${S}/><path d="M-40,-136 Q0,-160 40,-136 M-46,-114 Q0,-140 46,-114 M-42,-94 Q0,-118 42,-94" fill="none" stroke="${HAIR2}" stroke-width="5" stroke-linecap="round"/>
  ${beads('M-46,-150 Q0,-134 46,-150', '#a04a1f', 12, 14)}
  ${headBase(o)}
  <path d="M-74,-14 C-76,-70 -40,-86 0,-86 C40,-86 76,-70 74,-14 C60,-52 30,-62 0,-50 C-30,-62 -60,-52 -74,-14Z" fill="${HAIR}" ${S}/>
  ${beads('M-66,-66 Q0,-96 66,-66', '#a04a1f', 11, 13)}
  <g opacity=".95"><path d="M-36,-40 h72 M-40,-30 h80 M-34,-20 h68" stroke="#f4f0ea" stroke-width="5.5" stroke-linecap="round" transform="translate(0,-9)"/></g>
  ${thirdEye(o)}
  ${face(o)}
  ${moon ? `<g transform="translate(62,-150) rotate(18)">${crescent(0.92)}</g>` : ''}`;
}
function gangaSpout(mode) {
  // small spring from the top-knot
  return `<g transform="translate(0,-200)"><path d="M0,0 C-10,-70 -70,-80 -96,-30 C-108,-6 -112,30 -112,70" fill="none" stroke="${OUT}" stroke-width="28" stroke-linecap="round"/><path d="M0,0 C-10,-70 -70,-80 -96,-30 C-108,-6 -112,30 -112,70" fill="none" stroke="#eafaff" stroke-width="22" stroke-linecap="round"/>
  <path d="M0,0 C-10,-70 -70,-80 -96,-30 C-108,-6 -112,30 -112,70" fill="none" stroke="#6fc8ff" stroke-width="10" stroke-linecap="round" stroke-dasharray="26 22" class="flow"/>
  <circle cx="-112" cy="92" r="7" fill="#dff6ff" class="drip"/><circle cx="-126" cy="80" r="5" fill="#bfeaff" class="drip" style="animation-delay:-.5s"/><circle cx="-98" cy="84" r="5" fill="#bfeaff" class="drip" style="animation-delay:-.9s"/>
  <path d="M-14,-6 q14,-16 28,0" fill="#dff6ff" ${S}/></g>`;
}
function snake(o = {}) {
  const c = '#3fbf7f', c2 = '#1f8f5a';
  return `<g>
  <path d="M-64,-12 C-60,36 60,40 66,-10" fill="none" stroke="${OUT}" stroke-width="29" stroke-linecap="round"/>
  <path d="M-64,-12 C-60,36 60,40 66,-10" fill="none" stroke="${c}" stroke-width="23" stroke-linecap="round"/>
  <path d="M-64,-12 C-60,36 60,40 66,-10" fill="none" stroke="#ffe27a" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.1 17"/>
  <path d="M-64,-12 C-76,-30 -70,-40 -58,-36" fill="none" stroke="${OUT}" stroke-width="17" stroke-linecap="round"/><path d="M-64,-12 C-76,-30 -70,-40 -58,-36" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round"/>
  <g class="swing" style="--a0:-5deg;--a1:7deg;--d:2.4s;transform-origin:66px -10px">
    <path d="M66,-10 C100,-16 130,-40 142,-74" fill="none" stroke="${OUT}" stroke-width="27" stroke-linecap="round"/><path d="M66,-10 C100,-16 130,-40 142,-74" fill="none" stroke="${c}" stroke-width="21" stroke-linecap="round"/>
    <g transform="translate(58,6)"><path d="M86,-150 C124,-146 132,-96 104,-72 L70,-72 C44,-96 50,-146 86,-150Z" fill="${c}" ${S}/>
    <path d="M86,-132 C106,-126 110,-100 96,-84 L78,-84 C62,-100 66,-126 86,-132Z" fill="#ffe27a" ${S}/>
    <circle cx="76" cy="-112" r="5" fill="${OUT}"/><circle cx="97" cy="-112" r="5" fill="${OUT}"/>
    <path d="M86,-92 L86,-70 l-7,10 M86,-70 l7,10" fill="none" stroke="#e2301f" stroke-width="3.5" stroke-linecap="round" class="tongue"/></g>
  </g></g>`;
}

// ---------- generic figure ----------
// origin: feet centre. o: skin, head(fn string), top, bottom, armL, armR, propL, propR, seated, extras...
function limbArm(side, A = {}, o) {
  const sx = side * 98, sy = -592, skin = o.skin, sl = o.sleeve;
  const up = sl || skin;
  const cuff = o.bangle || '#ffd15c';
  const prop = side > 0 ? o.propR : o.propL;
  return `<g style="transform-origin:${sx}px ${sy}px;${rotStyle(A.s ?? 8, -side)}">
    <g style="transform-origin:${sx}px ${sy + 104}px;${rotStyle(A.e ?? 6, -side)}">
      <rect x="${sx - 18}" y="${sy + 88}" width="36" height="122" rx="18" fill="${o.sleeveLong ? up : skin}" ${S}/>
      <rect x="${sx - 19}" y="${sy + 176}" width="38" height="13" rx="6" fill="${cuff}" ${S}/>
      ${prop && prop.behind ? `<g transform="translate(${sx},${sy + 214}) rotate(${prop.rot || 0})">${prop.svg}</g>` : ''}
      <circle cx="${sx}" cy="${sy + 214}" r="21" fill="${skin}" ${S}/>
      ${prop && !prop.behind ? `<g transform="translate(${sx},${sy + 214}) rotate(${prop.rot || 0})">${prop.svg}</g><path d="M${sx - 19},${sy + 206} q19,-22 38,0 q-19,22 -38,0Z" fill="${skin}" ${S}/>` : ''}
    </g>
    <rect x="${sx - 21}" y="${sy - 20}" width="42" height="134" rx="21" fill="${up}" ${S}/>
    ${o.armlet ? beads(`M${sx - 18},${sy + 52} h36`, o.armlet, 10, 12) : ''}
    <circle cx="${sx}" cy="${sy + 104}" r="8" fill="none" ${S} opacity=".55"/>
  </g>`;
}
function figure(o) {
  const skin = o.skin || '#7fa6ee';
  o.skin = skin;
  const seated = !!o.seated, up = seated ? 300 : 0;
  // bottoms
  let legs = '';
  const bc = o.bottom || '#e9a13b', bc2 = o.bottom2 || '#c97f1f';
  const stripes = (x0, x1, n, y0, y1) => Array.from({ length: n }, (_, i) => { const x = x0 + (x1 - x0) * (i + 0.5) / n; return `<path d="M${x},${y0} L${x * 1.06},${y1}" stroke="${bc2}" stroke-width="3" opacity=".8"/>`; }).join('');
  const tiger = (pts) => pts.map(([x, y, r]) => `<path d="M${x - 16},${y} q16,${-10} 32,0 q-16,${6} -32,0Z" fill="#3a1d12" transform="rotate(${r} ${x} ${y})"/>`).join('');
  if (o.legsSvg) legs = o.legsSvg;
  else if (seated) {
    legs = `<ellipse cx="0" cy="6" rx="250" ry="26" fill="#000" opacity=".22"/>
    <path d="M-80,-118 C-190,-120 -262,-80 -250,-34 C-240,2 -120,6 0,2 C120,6 240,2 250,-34 C262,-80 190,-120 80,-118Z" fill="${bc}" ${S}/>
    <path d="M-250,-34 C-150,-66 -40,-58 40,-22 M250,-34 C150,-66 60,-60 -10,-36" fill="none" ${S}/>
    ${o.tiger ? tiger([[-170, -74, -20], [-110, -92, -10], [-200, -40, 10], [170, -74, 20], [110, -92, 10], [200, -40, -10], [-60, -22, 5], [70, -18, -5], [0, -84, 0]]) : stripes(-200, 200, 9, -100, -10)}
    <ellipse cx="60" cy="-14" rx="46" ry="17" fill="${skin}" ${S}/><ellipse cx="-70" cy="-16" rx="46" ry="17" fill="${skin}" ${S}/>`;
  } else if (o.skirt) {
    legs = `<ellipse cx="0" cy="4" rx="170" ry="20" fill="#000" opacity=".22"/><path d="M-78,-402 L78,-402 L150,-8 Q0,22 -150,-8Z" fill="${bc}" ${S}/>
    ${o.dots ? Array.from({ length: 5 }, (_, r) => Array.from({ length: 4 + r }, (_, i) => { const y = -350 + r * 72, w = 60 + r * 24; const x = -w + (2 * w) * (i + 0.5) / (4 + r); return `<path d="M${x},${y - 7} l6,7 l-6,7 l-6,-7Z" fill="${o.dots}"/>`; }).join('')).join('') : stripes(-100, 100, 7, -380, -20)}
    <path d="M-146,-30 Q0,0 146,-30" fill="none" stroke="${o.hem || '#ffd15c'}" stroke-width="12"/><path d="M-150,-8 Q0,22 150,-8" fill="none" ${S}/>`;
  } else {
    legs = `<ellipse cx="0" cy="4" rx="150" ry="18" fill="#000" opacity=".22"/>
    <ellipse cx="-46" cy="-6" rx="40" ry="15" fill="${skin}" ${S}/><ellipse cx="46" cy="-6" rx="40" ry="15" fill="${skin}" ${S}/>
    <path d="M-80,-402 L80,-402 L96,-22 L8,-22 L0,-250 L-8,-22 L-96,-22Z" fill="${bc}" ${S}/>
    ${o.tiger ? tiger([[-50, -350, -12], [40, -330, 14], [-60, -270, 8], [56, -250, -10], [-52, -180, -14], [58, -160, 12], [-58, -90, 10], [54, -70, -8], [0, -300, 0]]) : stripes(-82, -8, 4, -390, -30) + stripes(8, 82, 4, -390, -30)}`;
  }
  const tc = o.top;
  const torso = `<path d="M-100,-612 Q0,-628 100,-612 L80,-398 L-80,-398Z" fill="${tc || skin}" ${S}/>` +
    (o.sash ? `<path d="M-100,-612 L-56,-618 L80,-430 L80,-398 L44,-398Z" fill="${o.sash}" ${S}/>` + (o.sashTiger ? tiger([[-60, -580, 50], [-20, -520, 50], [20, -468, 50], [56, -420, 50]]) : '') : '') +
    (o.vneck ? `<path d="M-30,-620 L0,-570 L30,-620Z" fill="${skin}" ${S}/>` : '');
  const belt = `<rect x="-88" y="-412" width="176" height="24" rx="10" fill="${o.belt || '#f0b63c'}" ${S}/><circle cx="0" cy="-400" r="6" fill="#e2452f"/>`;
  const neck = `<rect x="-24" y="-650" width="48" height="50" rx="10" fill="${skin}" ${S}/>` +
    (o.throat ? `<g style="${o.throat === true ? '' : o.throat}"><rect x="-24" y="-650" width="48" height="50" rx="10" fill="#27349e" ${S}/><circle cx="0" cy="-622" r="60" fill="url(#gBlue)" class="pulse" style="--d:2s"/></g>` : '');
  const head = `<g transform="translate(0,-700)"><g style="transform-origin:0px 70px;${rotStyle(o.headRot ?? [-2, 2, 5])}">${o.head(o)}</g></g>`;
  const mala = o.mala ? beads('M-58,-612 C-50,-520 50,-520 58,-612', o.mala, 12, 14) + (o.mala2 ? beads('M-70,-610 C-70,-450 70,-450 70,-610', o.mala2, 10, 13) : '') : '';
  const body = `${o.behind || ''}
    ${o.armsBack ? limbArm(-1, o.armsBack[0], { ...o, propL: o.propBL, propR: null }) + limbArm(1, o.armsBack[1], { ...o, propR: o.propBR, propL: null }) : ''}
    ${o.backHair || ''}
    ${o.armsFront ? '' : limbArm(-1, o.armL, o) + limbArm(1, o.armR, o)}
    ${torso}${neck}${o.onTorso || ''}${mala}${belt}
    ${o.armsFront ? limbArm(-1, o.armL, o) + limbArm(1, o.armR, o) : ''}
    ${head}${o.onNeck ? `<g transform="translate(0,-610)">${o.onNeck}</g>` : ''}${o.front || ''}`;
  const breathe = `class="breathe" style="transform-origin:0px ${-400 + up}px"`;
  return `<g>${legs}<g transform="translate(0,${up})"><g ${breathe}>${body}</g></g></g>`;
}

// ---------- characters ----------
function shiva(o = {}) {
  return figure({
    skin: '#7fa6ee', head: shivaHead, bottom: '#f29a2e', tiger: true, belt: '#8a4a22', mala: '#8a3b1c', mala2: '#a85a2a', armlet: '#8a3b1c', bangle: '#8a3b1c',
    onNeck: o.snake === false ? '' : snake(), ...o,
  });
}
function crownSvg(c = '#ffd15c') {
  return `<path d="M-70,-62 L-76,-150 L-40,-112 L0,-190 L40,-112 L76,-150 L70,-62Z" fill="${c}" ${S}/><circle cx="0" cy="-196" r="7" fill="#fff" ${S}/>
  <rect x="-74" y="-78" width="148" height="26" rx="10" fill="#ffe9a8" ${S}/><path d="M-60,-65 h120" stroke="#e2452f" stroke-width="8" stroke-linecap="round" stroke-dasharray="0.1 15"/>
  <circle cx="0" cy="-118" r="10" fill="#e2452f" ${S}/><circle cx="-34" cy="-98" r="6" fill="#2fbf8f" ${S}/><circle cx="34" cy="-98" r="6" fill="#2fbf8f" ${S}/>`;
}
function humanHead(o) {
  const hair = o.hair || '#2a1a1a';
  const long = o.long !== false;
  return `${long ? `<path d="M-84,-30 C-96,60 -92,120 -104,170 L-50,150 L-50,40Z M84,-30 C96,60 92,120 104,170 L50,150 L50,40Z" fill="${hair}" ${S}/>` : ''}
  ${o.bun ? `<circle cx="0" cy="-110" r="40" fill="${hair}" ${S}/>${beads('M-34,-86 Q0,-74 34,-86', '#ffd15c', 9, 11)}` : ''}
  ${o.beard ? `<path d="M-70,20 C-74,110 -30,150 0,160 C30,150 74,110 70,20Z" fill="${o.beard}" ${S}/>` : ''}
  ${headBase(o)}
  <path d="M-74,-10 C-76,-70 -40,-86 0,-86 C40,-86 76,-70 74,-10 C60,-50 30,-58 0,-46 C-30,-58 -60,-50 -74,-10Z" fill="${hair}" ${S}/>
  ${o.beard ? `<path d="M-66,34 C-50,96 -20,120 0,124 C20,120 50,96 66,34 C40,60 20,40 0,42 C-20,40 -40,60 -66,34Z" fill="${o.beard}" ${S}/>` : ''}
  ${o.crown ? crownSvg(o.crown === true ? '#ffd15c' : o.crown) : ''}
  ${o.tilak ? `<path d="M-7,-44 L-7,-16 Q0,-8 7,-16 L7,-44" fill="none" stroke="#fff" stroke-width="4.5"/><path d="M0,-40 L0,-20" stroke="#e2452f" stroke-width="5" stroke-linecap="round"/>` : ''}
  ${o.bindi ? `<circle cx="0" cy="-30" r="7" fill="#e2301f" stroke="${OUT}" stroke-width="2"/>` : ''}
  ${o.feather ? `<g transform="translate(26,-96) rotate(20)"><path d="M0,0 C-22,-40 -16,-80 0,-104 C16,-80 22,-40 0,0Z" fill="#1fa58a" ${S}/><ellipse cx="0" cy="-64" rx="11" ry="16" fill="#2a4fd0" ${S}/><ellipse cx="0" cy="-62" rx="5" ry="8" fill="#ffd15c"/></g>` : ''}
  ${face(o)}`;
}
function parvatiHead(o) {
  const veil = o.veil || '#e23a6e';
  return `<path d="M-96,-40 C-120,60 -128,200 -150,330 L-70,300 L-56,60Z M96,-40 C120,60 128,200 150,330 L70,300 L56,60Z" fill="${veil}" ${S}/>
  ${headBase(o)}
  <path d="M-74,-6 C-76,-70 -40,-86 0,-86 C40,-86 76,-70 74,-6 C56,-56 20,-66 0,-66 C-20,-66 -56,-56 -74,-6Z" fill="#2a1a1a" ${S}/>
  <path d="M-88,-10 C-100,-90 -50,-112 0,-112 C50,-112 100,-90 88,-10 C80,-64 44,-84 0,-84 C-44,-84 -80,-64 -88,-10Z" fill="${veil}" ${S}/>
  <path d="M-84,-28 C-80,-78 -44,-96 0,-96 C44,-96 80,-78 84,-28" fill="none" stroke="#ffd15c" stroke-width="6" stroke-dasharray="0.1 12" stroke-linecap="round"/>
  <path d="M0,-84 L0,-52" stroke="#ffd15c" stroke-width="4"/><circle cx="0" cy="-50" r="8" fill="#ffd15c" ${S}/><circle cx="0" cy="-30" r="6.5" fill="#e2301f" stroke="${OUT}" stroke-width="2"/>
  ${face(o)}<circle cx="-9" cy="30" r="4" fill="none" stroke="#ffd15c" stroke-width="2.5"/>`;
}
function parvati(o = {}) {
  const c = o.color || '#e23a6e', c2 = o.color2 || '#b81f58';
  return figure({ skin: '#f0b68c', head: parvatiHead, veil: c, top: c, sleeve: c, bottom: c, bottom2: c2, skirt: true, dots: '#ffd98a', hem: '#ffd15c', belt: '#ffd15c', mala: '#ffd15c', bangle: '#ffd15c', eyes: 'happy', ...o });
}
function elephantHead(o) {
  const c = o.skin, c2 = '#ff9ea8';
  return `<g class="swing" style="--a0:-7deg;--a1:5deg;--d:1.8s;transform-origin:-60px 0px"><path d="M-60,-40 C-170,-110 -200,20 -150,80 C-120,110 -80,80 -62,50Z" fill="${c}" ${S}/><path d="M-76,-20 C-140,-60 -160,20 -130,58" fill="none" stroke="${c2}" stroke-width="10" stroke-linecap="round" opacity=".7"/></g>
  <g class="swing" style="--a0:7deg;--a1:-5deg;--d:1.8s;transform-origin:60px 0px"><path d="M60,-40 C170,-110 200,20 150,80 C120,110 80,80 62,50Z" fill="${c}" ${S}/><path d="M76,-20 C140,-60 160,20 130,58" fill="none" stroke="${c2}" stroke-width="10" stroke-linecap="round" opacity=".7"/></g>
  <rect x="-84" y="-84" width="168" height="170" rx="80" fill="${c}" ${S}/>
  ${crownSvg('#ffd15c')}
  <path d="M-10,-44 L-10,-22 Q0,-14 10,-22 L10,-44" fill="none" stroke="#fff" stroke-width="4"/><circle cx="0" cy="-34" r="5" fill="#e2301f"/>
  <path d="M-52,-6 Q-36,8 -20,-6 M20,-6 Q36,8 52,-6" fill="none" ${S} stroke-width="4"/>
  <circle cx="-56" cy="24" r="13" fill="#ff5f8a" opacity=".35"/><circle cx="56" cy="24" r="13" fill="#ff5f8a" opacity=".35"/>
  <path d="M-40,50 l-22,34 l20,-12Z" fill="#fff8e8" ${S}/><path d="M40,50 l16,22 l-18,-6Z" fill="#fff8e8" ${S}/>
  <g class="swing" style="--a0:-4deg;--a1:6deg;--d:2.3s;transform-origin:0px 20px"><path d="M-26,14 C-28,90 -20,150 30,160 C66,166 76,120 52,112 C40,130 14,120 20,70 L26,14Z" fill="${c}" ${S}/>
  <path d="M-22,60 q22,10 42,0 M-20,90 q22,10 40,2 M-10,122 q20,8 34,-2" fill="none" ${S} opacity=".5"/></g>`;
}
function ganesha(o = {}) {
  return figure({ skin: '#f79aa0', head: elephantHead, bottom: '#f6c12e', bottom2: '#d99a14', sash: '#e23a3a', belt: '#e23a3a', mala: '#ffd15c', headRot: [-3, 3, 3], ...o,
    onTorso: `<ellipse cx="0" cy="-470" rx="104" ry="84" fill="${'#f79aa0'}" ${S}/><path d="M-60,-530 L60,-420" stroke="#fff" stroke-width="6"/>` });
}
function modak(s = 1) { return `<g transform="scale(${s})"><path d="M0,-40 C26,-20 36,6 26,20 Q0,30 -26,20 C-36,6 -26,-20 0,-40Z" fill="#fff3d0" ${S}/><path d="M0,-38 L0,22 M-12,-22 Q-18,4 -14,22 M12,-22 Q18,4 14,22" fill="none" ${S} stroke-width="2" opacity=".6"/></g>`; }
function spear(s = 1) { return `<g transform="scale(${s})"><rect x="-6" y="-420" width="12" height="720" rx="6" fill="#e8a92e" ${S}/><path d="M0,-560 C40,-500 34,-450 0,-410 C-34,-450 -40,-500 0,-560Z" fill="#f4f6ff" ${S}/><path d="M0,-540 L0,-420" stroke="#b7c3e8" stroke-width="4"/><ellipse cx="0" cy="-408" rx="20" ry="9" fill="#e2452f" ${S}/></g>`; }
function kartikeya(o = {}) { return figure({ skin: '#f0b68c', head: humanHead, long: false, crown: '#ffd15c', feather: true, tilak: true, eyes: 'happy', top: '#2f9fd6', sleeve: '#2f9fd6', sash: '#ffd15c', bottom: '#e2452f', bottom2: '#a82a1c', mala: '#ffd15c', ...o }); }
function vishnu(o = {}) { return figure({ skin: '#6f9bea', head: humanHead, crown: true, tilak: true, sash: '#f6c12e', bottom: '#f6c12e', bottom2: '#c9920f', mala: '#fff', mala2: '#e2452f', armlet: '#ffd15c', ...o }); }
function brahmaHead(o) {
  const side = (sx) => `<g transform="translate(${sx * 84},6) scale(${sx * 0.8},0.9)"><rect x="-60" y="-78" width="110" height="156" rx="52" fill="${o.skin}" ${S}/><path d="M-60,20 C-60,100 -20,120 10,116 L30,40Z" fill="#f4f1ea" ${S}/><path d="M-40,2 q10,8 22,0" fill="none" ${S}/><path d="M-62,10 l-14,16 l14,2" fill="${o.skin}" ${S}/><path d="M-58,-60 L-62,-130 L-20,-96 L20,-140 L48,-70Z" fill="#ffd15c" ${S}/></g>`;
  return side(-1) + side(1) + humanHead({ ...o, long: false, crown: '#ffd15c', beard: '#f4f1ea', hair: '#f4f1ea', brow: '#bdb6a6', tilak: true });
}
function brahma(o = {}) { return figure({ skin: '#f3c08a', head: brahmaHead, top: '#e2452f', sleeve: '#e2452f', vneck: true, sash: '#ffd15c', bottom: '#fff1d6', bottom2: '#d6b98a', mala: '#fff', headRot: 0, ...o }); }
function person(o = {}) { return figure({ skin: '#d99a6c', head: humanHead, bottom: '#f4ead2', bottom2: '#cdb890', ...o }); }
function deva(o = {}) { return person({ skin: '#f0c08c', crown: true, tilak: true, top: '#f6c12e', sleeve: '#f6c12e', sash: '#e2452f', bottom: '#fff1d6', mala: '#fff', ...o }); }
function asura(o = {}) { return person({ skin: '#8e6bb8', crown: '#b9c2d6', stache: true, eyes: 'open', hair: '#1a1020', top: '#3a2a5a', sleeve: '#3a2a5a', sash: '#e2452f', bottom: '#5a2a7a', bottom2: '#3a1650', mala: '#ffd15c', ...o }); }

function nandi(s = 1) {
  return `<g transform="scale(${s})"><ellipse cx="0" cy="6" rx="300" ry="26" fill="#000" opacity=".22"/>
  <path d="M250,-250 C300,-200 290,-140 300,-90" fill="none" ${S} stroke-width="9"/><path d="M300,-90 l-10,34 l22,-8Z" fill="#3a2a2a" ${S}/>
  <path d="M-150,-120 L-150,-10 L-100,-10 L-96,-120 M150,-130 L150,-10 L200,-10 L206,-130 M-30,-120 L-34,-10 L14,-10 L16,-120 M70,-120 L70,-10 L118,-10 L120,-120" fill="#f1ede6" ${S}/>
  <path d="M-150,-24 h50 M150,-24 h50 M-34,-24 h48 M70,-24 h48" stroke="#5a4a4a" stroke-width="14"/>
  <path d="M-220,-260 C-200,-330 -80,-330 -20,-300 C40,-360 110,-330 130,-290 C230,-300 280,-250 262,-170 C250,-110 200,-100 120,-100 L-150,-100 C-230,-110 -240,-200 -220,-260Z" fill="#fbf8f2" ${S}/>
  <path d="M-110,-296 L-104,-130 Q-10,-96 96,-130 L100,-296 Q0,-270 -110,-296Z" fill="#e2452f" ${S}/><path d="M-106,-150 Q-6,-116 98,-150" fill="none" stroke="#ffd15c" stroke-width="12"/>
  <path d="M-80,-250 l14,14 l-14,14 l-14,-14Z M0,-240 l14,14 l-14,14 l-14,-14Z M72,-250 l14,14 l-14,14 l-14,-14Z" fill="#ffd15c"/>
  <g class="swing" style="--a0:-3deg;--a1:4deg;--d:3s;transform-origin:-200px -250px">
   <path d="M-250,-380 C-300,-400 -330,-450 -312,-490 C-290,-450 -260,-430 -226,-420Z M-150,-380 C-100,-400 -80,-450 -96,-490 C-116,-450 -140,-430 -176,-420Z" fill="#ffd15c" ${S}/>
   <path d="M-300,-350 l-50,-10 l30,36Z M-110,-350 l50,-10 l-30,36Z" fill="#fbf8f2" ${S}/>
   <path d="M-290,-400 C-300,-440 -110,-440 -116,-400 L-130,-250 C-140,-200 -270,-200 -276,-250Z" fill="#fbf8f2" ${S}/>
   <path d="M-262,-262 C-262,-218 -144,-218 -144,-262 C-160,-290 -246,-290 -262,-262Z" fill="#f3c9c0" ${S}/><circle cx="-226" cy="-254" r="6" fill="${OUT}"/><circle cx="-180" cy="-254" r="6" fill="${OUT}"/>
   <path d="M-262,-340 Q-246,-326 -230,-340 M-176,-340 Q-160,-326 -144,-340" fill="none" ${S} stroke-width="4"/>
   <path d="M-240,-410 Q-203,-388 -166,-410" fill="none" stroke="#ffd15c" stroke-width="9" stroke-dasharray="0.1 13" stroke-linecap="round"/>
   <circle cx="-270" cy="-300" r="12" fill="#ff7a9a" opacity=".35"/><circle cx="-136" cy="-300" r="12" fill="#ff7a9a" opacity=".35"/>
   <g class="swing" style="--a0:-12deg;--a1:12deg;--d:1.1s;transform-origin:-203px -214px"><path d="M-203,-214 L-203,-190" ${S}/><path d="M-222,-160 Q-222,-192 -203,-192 Q-184,-192 -184,-160Z" fill="#ffd15c" ${S}/><circle cx="-203" cy="-156" r="6" fill="#e8a92e" ${S}/></g>
  </g></g>`;
}
function deer(s = 1, c = '#d9a05c') { return `<g transform="scale(${s})"><path d="M-60,-90 L-60,0 M-30,-90 L-30,0 M40,-90 L40,0 M66,-90 L66,0" stroke="${OUT}" stroke-width="14" stroke-linecap="round"/><path d="M-60,-90 L-60,0 M-30,-90 L-30,0 M40,-90 L40,0 M66,-90 L66,0" stroke="${c}" stroke-width="9" stroke-linecap="round"/>
 <path d="M-84,-150 C-80,-176 60,-180 84,-150 C96,-110 80,-84 50,-84 L-56,-84 C-84,-90 -90,-120 -84,-150Z" fill="${c}" ${S}/><circle cx="-30" cy="-140" r="6" fill="#fff" opacity=".8"/><circle cx="10" cy="-150" r="6" fill="#fff" opacity=".8"/><circle cx="40" cy="-128" r="6" fill="#fff" opacity=".8"/>
 <g class="swing" style="--a0:-5deg;--a1:5deg;--d:2.6s;transform-origin:-70px -150px"><path d="M-84,-150 L-110,-230 L-70,-236 L-50,-160Z" fill="${c}" ${S}/><path d="M-132,-270 C-140,-240 -120,-214 -92,-214 C-64,-214 -56,-240 -62,-262 C-80,-284 -116,-286 -132,-270Z" fill="${c}" ${S}/><path d="M-66,-270 l26,-18 l-10,28Z" fill="${c}" ${S}/>
 <path d="M-92,-280 C-96,-310 -110,-320 -118,-336 M-96,-304 l-18,2 M-80,-280 C-78,-310 -66,-322 -62,-340 M-78,-306 l16,0" fill="none" ${S} stroke-width="5"/><circle cx="-108" cy="-250" r="5" fill="${OUT}"/><circle cx="-134" cy="-244" r="5" fill="${OUT}"/></g></g>`; }
function bird(c = '#ffd15c') { return `<g><path d="M-22,0 C-22,-22 14,-24 22,-6 L36,-10 L26,4 C22,20 -22,20 -22,0Z" fill="${c}" ${S}/><path d="M-6,-2 C-20,-30 -40,-26 -44,-14 C-30,-14 -20,-6 -6,6Z" fill="#fff" ${S} class="swing" style="--a0:-24deg;--a1:22deg;--d:.25s;transform-origin:-6px 0px"/><circle cx="16" cy="-6" r="3" fill="${OUT}"/></g>`; }
function tree(o = {}) {
  const leaf = o.leaf || '#3fae6a';
  return `<g><path d="M-30,0 C-20,-120 -26,-200 -10,-300 L24,-300 C16,-200 30,-110 44,0Z" fill="#6b3f2a" ${S}/><path d="M-6,-240 C-60,-300 -110,-320 -150,-360 M14,-260 C60,-320 110,-330 160,-380 M4,-300 L0,-420" fill="none" stroke="${OUT}" stroke-width="20" stroke-linecap="round"/><path d="M-6,-240 C-60,-300 -110,-320 -150,-360 M14,-260 C60,-320 110,-330 160,-380 M4,-300 L0,-420" fill="none" stroke="#6b3f2a" stroke-width="14" stroke-linecap="round"/>${o.crown || ''}</g>`;
}
if (typeof module !== 'undefined') module.exports = {};
