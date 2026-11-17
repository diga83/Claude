// ---------- Vishnu-specific art ----------
const VSKIN = '#5f8fe8';
function conch(s = 1) {
  return `<g transform="scale(${s})"><path d="M-10,-70 C40,-74 74,-30 60,14 C50,50 10,74 -24,66 C-4,50 0,30 -14,14 C-40,-12 -40,-52 -10,-70Z" fill="#fff8ea" ${S}/>
  <path d="M-24,66 C-50,84 -70,70 -74,52 C-56,60 -36,54 -14,14" fill="#ffd9c4" ${S}/><path d="M-10,-70 C-18,-86 -6,-98 6,-92 C4,-82 2,-76 4,-70" fill="#ffd15c" ${S}/>
  <path d="M6,-50 C30,-44 44,-20 40,4 M-4,-30 C16,-26 28,-8 22,14 M-6,-8 C6,-4 10,8 4,22" fill="none" stroke="#e8b8a0" stroke-width="5" stroke-linecap="round"/></g>`;
}
function gada(s = 1) {
  let ribs = ''; for (let i = -2; i <= 2; i++) ribs += `<path d="M${i * 22},186 Q${i * 34},250 ${i * 22},314" fill="none" ${S} opacity=".6"/>`;
  return `<g transform="scale(${s})"><rect x="-9" y="-44" width="18" height="250" rx="9" fill="#e8a92e" ${S}/><circle cx="0" cy="-48" r="16" fill="#ffd15c" ${S}/>
  <path d="M-9,20 h18 M-9,80 h18 M-9,140 h18" stroke="${OUT}" stroke-width="3"/><ellipse cx="0" cy="250" rx="70" ry="66" fill="#ffd15c" ${S}/>${ribs}
  <ellipse cx="0" cy="190" rx="34" ry="12" fill="#e2452f" ${S}/><path d="M-16,312 L0,346 L16,312Z" fill="#e8a92e" ${S}/><path d="M-40,222 Q-24,206 -6,204" fill="none" stroke="#fff6cf" stroke-width="7" stroke-linecap="round"/></g>`;
}
const kaustubha = `<g transform="translate(0,-520)"><circle r="46" fill="url(#gGlow)" class="pulse" style="--d:1.8s"/><path d="M0,-22 L20,0 L0,26 L-20,0Z" fill="#e2304a" ${S}/><path d="M0,-22 L6,0 L0,26 L-6,0Z" fill="#ff8aa0"/></g>`;
const flowerMala = (d) => beads(d, '#fff', 15, 17) + `<path d="${d}" fill="none" stroke="#ff7aa8" stroke-width="13" stroke-linecap="round" stroke-dasharray="0.1 34"/><path d="${d}" fill="none" stroke="#ffd15c" stroke-width="6" stroke-linecap="round" stroke-dasharray="0.1 17"/>`;
function vishnuBase(o = {}) {
  return { skin: VSKIN, head: humanHead, crown: true, tilak: true, sash: '#f6c12e', bottom: '#f6c12e', bottom2: '#c9920f', belt: '#e2452f', armlet: '#ffd15c', bangle: '#ffd15c', eyes: 'calm',
    onTorso: flowerMala('M-66,-610 C-80,-420 80,-420 66,-610') + (o.jewel === false ? '' : kaustubha), ...o };
}
// four-armed Vishnu. viewer-left up: chakra, viewer-right up: conch, left low: lotus, right low: mace
function vishnu4(o = {}) {
  const L = o.lit || ['', '', '', ''];
  const g = (st) => st ? `<g style="${st}"><circle r="120" fill="url(#gGlow)"/></g>` : '';
  return figure(vishnuBase({ armsBack: o.back || [{ s: [118, 124, 3], e: 10 }, { s: [118, 124, 3.4], e: 10 }],
    propBL: { svg: `<g transform="translate(0,-74)">${g(L[0])}${chakra(0.95)}</g>`, rot: -131 }, propBR: { svg: `<g transform="translate(6,-70)">${g(L[1])}${conch(0.95)}</g>`, rot: 131 },
    armL: { s: 36, e: 62 }, armR: { s: 30, e: 20 }, propL: { svg: `<g transform="translate(-6,-30)">${g(L[2])}${lotus(0.78)}</g>`, rot: -98 }, propR: { svg: `${g(L[3])}${gada(0.8)}`, rot: 50 }, ...o }));
}
const vishnu2 = (o = {}) => figure(vishnuBase(o));
function lakshmiHead(o) { return parvatiHead(o) + `<g transform="translate(0,-34) scale(.74)">${crownSvg('#ffd15c')}</g>`; }
function lakshmi(o = {}) { return parvati({ head: lakshmiHead, color: '#e0244e', color2: '#a8123a', veil: '#e0244e', dots: '#ffd98a', ...o }); }
function coin(s = 1) { return `<g transform="scale(${s})"><circle r="16" fill="#ffd15c" ${S}/><circle r="8" fill="none" stroke="#e8a92e" stroke-width="3"/></g>`; }
// Shesha: coils + canopy of hoods. origin = centre top of the coil bed
function hood(sc = 1, c = '#2fb89a') { return `<g transform="scale(${sc})"><path d="M0,40 C-26,-20 -30,-60 -22,-110 L22,-110 C30,-60 26,-20 0,40Z" fill="${c}" ${S}/><path d="M0,-250 C74,-240 92,-150 46,-104 L-46,-104 C-92,-150 -74,-240 0,-250Z" fill="${c}" ${S}/>
  <path d="M0,-218 C40,-206 50,-150 24,-126 L-24,-126 C-50,-150 -40,-206 0,-218Z" fill="#ffe27a" ${S}/><circle cx="-18" cy="-178" r="7" fill="${OUT}"/><circle cx="18" cy="-178" r="7" fill="${OUT}"/>
  <path d="M0,-142 L0,-112 l-8,12 M0,-112 l8,12" fill="none" stroke="#e2301f" stroke-width="4" stroke-linecap="round" class="tongue"/><circle cx="0" cy="-232" r="9" fill="#e2304a" ${S}/></g>`; }
function shesha(o = {}) {
  const n = o.n || 7, w = o.w || 900, c = '#2fb89a', c2 = '#1f8f7a';
  let hoods = ''; for (let i = 0; i < n; i++) { const a = (i - (n - 1) / 2) * (o.spread || 17); hoods += `<g transform="translate(0,${-(o.rise || 330)}) rotate(${a})"><path d="M0,10 L0,-230" stroke="${OUT}" stroke-width="40" stroke-linecap="round"/><path d="M0,10 L0,-230" stroke="${i % 2 ? c2 : c}" stroke-width="34" stroke-linecap="round"/><g class="swing" style="--a0:-2.5deg;--a1:2.5deg;--d:${2.4 + (i % 3) * 0.5}s;transform-origin:0px 300px"><g transform="translate(0,-250)">${hood(1.15, i % 2 ? c2 : c)}</g></g></g>`; }
  let coils = ''; for (let i = 2; i >= 0; i--) { const y = i * 78, ww = w * (1 - i * 0.07); coils += `<rect x="${-ww / 2}" y="${y}" width="${ww}" height="96" rx="48" fill="${i % 2 ? c2 : c}" ${S}/><path d="M${-ww / 2 + 50},${y + 48} h${ww - 100}" stroke="#ffe27a" stroke-width="12" stroke-linecap="round" stroke-dasharray="0.1 34"/>`; }
  return { back: `<path d="M0,40 L0,${-(o.rise || 330)}" stroke="${OUT}" stroke-width="150" stroke-linecap="round"/><path d="M0,40 L0,${-(o.rise || 330)}" stroke="${c2}" stroke-width="144" stroke-linecap="round"/>` + hoods, front: coils };
}
// Garuda, facing viewer, wings spread. origin = centre of body
function garuda(s = 1) {
  const wing = (sd) => `<g transform="scale(${sd},1)"><g class="swing" style="--a0:-9deg;--a1:12deg;--d:.7s;transform-origin:70px -40px">
   <path d="M60,-70 C240,-240 470,-250 640,-150 C560,-130 520,-90 500,-40 C440,-60 400,-30 380,20 C320,-10 280,20 260,70 C200,40 150,60 120,100Z" fill="#e2452f" ${S}/>
   <path d="M90,-60 C240,-190 420,-200 560,-140 M130,-20 C250,-100 360,-100 450,-60 M150,30 C230,-20 300,-20 350,0" fill="none" stroke="#ffd15c" stroke-width="9" stroke-linecap="round"/></g></g>`;
  return `<g transform="scale(${s})">${wing(1)}${wing(-1)}
  <path d="M-60,120 L-80,260 L-30,220 L0,280 L30,220 L80,260 L60,120Z" fill="#e2452f" ${S}/>
  <path d="M-110,-60 C-120,60 -80,160 0,170 C80,160 120,60 110,-60 C80,-110 -80,-110 -110,-60Z" fill="#f6b12e" ${S}/><path d="M-70,10 q70,40 140,0 M-60,60 q60,36 120,0 M-44,106 q44,26 88,0" fill="none" stroke="#c97f1f" stroke-width="6" stroke-linecap="round"/>
  <path d="M-84,-150 C-90,-230 90,-230 84,-150 C84,-90 40,-60 0,-60 C-40,-60 -84,-90 -84,-150Z" fill="#fffaf0" ${S}/>
  <path d="M-22,-140 L22,-140 L0,-76Z" fill="#ffb02e" ${S}/><path d="M-22,-140 Q0,-120 22,-140" fill="none" ${S}/>
  <path d="M-56,-166 l30,10 M56,-166 l-30,10" stroke="${OUT}" stroke-width="6" stroke-linecap="round"/><circle cx="-40" cy="-150" r="8" fill="${OUT}"/><circle cx="40" cy="-150" r="8" fill="${OUT}"/>
  <g transform="translate(0,-170) scale(.62)">${crownSvg('#ffd15c')}</g>
  <path d="M-60,190 l-10,40 M-40,200 l0,40 M60,190 l10,40 M40,200 l0,40" stroke="#ffb02e" stroke-width="9" stroke-linecap="round"/></g>`;
}
// ---------- avatar heads & figures ----------
function boarHead(o) {
  const c = o.skin;
  return `<path d="M-70,-50 l-30,-70 l60,30Z M70,-50 l30,-70 l-60,30Z" fill="${c}" ${S}/><rect x="-84" y="-84" width="168" height="170" rx="78" fill="${c}" ${S}/>${crownSvg('#ffd15c')}
  <path d="M-52,-10 Q-36,-24 -20,-10 M20,-10 Q36,-24 52,-10" fill="none" ${S} stroke-width="5"/><circle cx="-36" cy="-2" r="8" fill="${OUT}"/><circle cx="36" cy="-2" r="8" fill="${OUT}"/>
  <path d="M-50,30 C-56,90 -40,128 0,132 C40,128 56,90 50,30 C30,14 -30,14 -50,30Z" fill="#8fb0f0" ${S}/><ellipse cx="0" cy="104" rx="34" ry="20" fill="#f3a9b8" ${S}/><circle cx="-12" cy="104" r="6" fill="${OUT}"/><circle cx="12" cy="104" r="6" fill="${OUT}"/>
  <path d="M-44,84 C-70,70 -76,40 -66,20 C-56,44 -44,56 -30,62Z M44,84 C70,70 76,40 66,20 C56,44 44,56 30,62Z" fill="#fffaf0" ${S}/>
  <path d="M-7,-58 L-7,-34 Q0,-26 7,-34 L7,-58" fill="none" stroke="#fff" stroke-width="4.5"/>`;
}
function lionHead(o) {
  let mane = ''; for (let i = 0; i < 16; i++) mane += `<path d="M0,-150 L26,-96 L-26,-96Z" fill="${i % 2 ? '#e8802e' : '#f6a02e'}" ${S} transform="rotate(${i * 22.5})"/>`;
  return `<g class="swing" style="--a0:-3deg;--a1:3deg;--d:.5s;transform-origin:0px 0px">${mane}</g><circle r="104" fill="#e8802e" ${S}/>
  <circle cx="-70" cy="-70" r="24" fill="#f6c05a" ${S}/><circle cx="70" cy="-70" r="24" fill="#f6c05a" ${S}/><rect x="-78" y="-80" width="156" height="166" rx="74" fill="#f6c05a" ${S}/>
  <g transform="translate(0,-10) scale(.8)">${crownSvg('#ffd15c')}</g>
  <path d="M-54,-24 L-16,-8 M54,-24 L16,-8" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/><ellipse cx="-32" cy="6" rx="16" ry="11" fill="#fff" ${S}/><ellipse cx="32" cy="6" rx="16" ry="11" fill="#fff" ${S}/><circle cx="-32" cy="7" r="7" fill="#c8301f"/><circle cx="32" cy="7" r="7" fill="#c8301f"/>
  <path d="M-16,26 L16,26 L0,44Z" fill="#7a2a1a" ${S}/><path d="M0,44 L0,54 M-34,56 Q-16,72 0,54 Q16,72 34,56" fill="none" ${S} stroke-width="4"/>
  <path d="M-26,60 Q0,96 26,60Z" fill="#7a1f2e" ${S}/><path d="M-18,62 l5,14 l5,-14Z M18,62 l-5,14 l-5,-14Z" fill="#fff" ${S} stroke-width="2"/>
  <path d="M-60,40 h-34 M-60,50 l-32,10 M60,40 h34 M60,50 l32,10" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/>`;
}
function vamanaHead(o) { return `${headBase(o)}<path d="M-72,-20 C-72,-66 -40,-84 0,-84 C40,-84 72,-66 72,-20 C50,-48 -50,-48 -72,-20Z" fill="#2a1a1a" ${S}/><path d="M-4,-84 C-20,-130 0,-160 26,-164 C10,-140 16,-110 14,-84Z" fill="#2a1a1a" ${S}/>
  <path d="M-7,-44 L-7,-20 Q0,-12 7,-20 L7,-44" fill="none" stroke="#fff" stroke-width="4.5"/><path d="M0,-40 L0,-22" stroke="#e2452f" stroke-width="5" stroke-linecap="round"/>${face(o)}`; }
function umbrella(s = 1) { return `<g transform="scale(${s})"><rect x="-5" y="-360" width="10" height="460" rx="5" fill="#b9792a" ${S}/><path d="M-170,-330 Q0,-470 170,-330 Q0,-362 -170,-330Z" fill="#f6b12e" ${S}/><path d="M-110,-352 Q-60,-420 0,-436 M110,-352 Q60,-420 0,-436 M0,-436 L0,-346" fill="none" stroke="#c97f1f" stroke-width="4"/><path d="M-166,-330 Q0,-362 166,-330" fill="none" stroke="#e2452f" stroke-width="9" stroke-dasharray="0.1 26" stroke-linecap="round"/><circle cx="0" cy="-444" r="10" fill="#e2452f" ${S}/></g>`; }
const kamandalu = `<g><path d="M-22,0 Q0,-44 22,0" fill="none" ${S} stroke-width="5"/><path d="M-30,6 C-40,40 -24,62 0,62 C24,62 40,40 30,6Z" fill="#e8a92e" ${S}/><rect x="-18" y="-4" width="36" height="12" rx="5" fill="#ffd15c" ${S}/></g>`;
function vamana(o = {}) { return figure({ skin: VSKIN, head: vamanaHead, bottom: '#e9a13b', bottom2: '#b9772a', belt: '#f0b63c', mala: '#8a3b1c', eyes: 'happy', onTorso: `<path d="M-70,-608 L60,-420" stroke="#fff" stroke-width="5"/>`, armR: { s: 60, e: 30 }, propR: { svg: umbrella(0.9), rot: 96 }, armL: { s: 14, e: 10 }, propL: { svg: `<g transform="translate(0,36)">${kamandalu}</g>` }, ...o }); }
function axe(s = 1) { return `<g transform="scale(${s})"><rect x="-7" y="-380" width="14" height="560" rx="7" fill="#8a5a2a" ${S}/><path d="M6,-370 C90,-400 140,-340 130,-270 C100,-300 60,-300 6,-280Z" fill="#dfe6f5" ${S}/><path d="M-6,-370 C-60,-380 -80,-340 -74,-300 C-50,-316 -30,-310 -6,-296Z" fill="#b7c3e8" ${S}/><path d="M40,-360 C80,-360 108,-330 112,-300" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>`; }
function parashurama(o = {}) { return figure({ skin: '#d99a6c', head: humanHead, bun: true, beard: '#2a1a1a', long: true, tilak: true, eyes: 'open', bottom: '#f28a2e', bottom2: '#b85a14', mala: '#8a3b1c', armlet: '#8a3b1c', bangle: '#8a3b1c', belt: '#8a4a22', onTorso: `<path d="M-70,-608 L60,-420" stroke="#fff" stroke-width="5"/>`, armR: { s: 56, e: 26 }, propR: { svg: axe(1), rot: 86 }, ...o }); }
function bow(s = 1) { return `<g transform="scale(${s})"><path d="M0,-300 C150,-200 150,200 0,300" fill="none" stroke="${OUT}" stroke-width="26" stroke-linecap="round"/><path d="M0,-300 C150,-200 150,200 0,300" fill="none" stroke="#f6b12e" stroke-width="19" stroke-linecap="round"/><path d="M0,-300 L0,300" stroke="#fff" stroke-width="3"/><rect x="92" y="-36" width="32" height="72" rx="10" fill="#e2452f" ${S}/><circle cx="0" cy="-300" r="12" fill="#ffd15c" ${S}/><circle cx="0" cy="300" r="12" fill="#ffd15c" ${S}/></g>`; }
function rama(o = {}) { return figure({ skin: '#6f9bea', head: humanHead, bun: true, long: true, crown: false, tilak: true, eyes: 'happy', sash: '#f29a2e', bottom: '#e9a13b', bottom2: '#b9772a', mala: '#8a3b1c', armlet: '#8a3b1c', belt: '#f0b63c',
  behind: `<g transform="translate(-70,-640) rotate(-24)"><rect x="-22" y="-10" width="44" height="130" rx="12" fill="#e8a92e" ${S}/><path d="M-10,-10 l0,-60 l-10,-6 l10,-22 l10,22 l-10,6 M12,-10 l0,-44 l-10,-6 l10,-22 l10,22 l-10,6" fill="#e2452f" ${S} stroke-width="2"/></g>`,
  armR: { s: 62, e: 24 }, propR: { svg: `<g transform="translate(-104,0)">${bow(0.9)}</g>`, rot: 90, behind: true }, ...o }); }
function flute(s = 1) { return `<g transform="scale(${s})"><rect x="-150" y="-9" width="300" height="18" rx="9" fill="#e8a92e" ${S}/><circle cx="-60" cy="0" r="4" fill="${OUT}"/><circle cx="-20" cy="0" r="4" fill="${OUT}"/><circle cx="20" cy="0" r="4" fill="${OUT}"/><circle cx="60" cy="0" r="4" fill="${OUT}"/><path d="M130,-9 v18 M-130,-9 v18" stroke="#e2452f" stroke-width="7"/><path d="M-140,6 q-10,40 -24,60" fill="none" stroke="#e2452f" stroke-width="4"/></g>`; }
function krishna(o = {}) { return figure({ skin: '#4f7fe0', head: humanHead, crown: '#ffd15c', feather: true, tilak: true, long: true, eyes: 'happy', sash: '#f6c12e', bottom: '#f6c12e', bottom2: '#c9920f', belt: '#e2452f', armlet: '#ffd15c',
  onTorso: flowerMala('M-66,-610 C-80,-420 80,-420 66,-610'), armsFront: true, armL: { s: 34, e: -128 }, armR: { s: 70, e: -150 }, front: `<g transform="translate(60,-640) rotate(-8)">${flute(1)}</g>`, headRot: [-8, -2, 2], ...o }); }
function buddhaHead(o) { let curls = ''; for (let r = 0; r < 2; r++) for (let i = 0; i < 9 - r * 2; i++) curls += `<circle cx="${-64 + r * 16 + i * 16}" cy="${-70 - r * 16}" r="10" fill="#27306a" ${S} stroke-width="2"/>`;
  return `<circle r="150" fill="url(#gGlow)" opacity=".8"/><path d="M-74,0 q-14,30 -4,70 q10,-10 8,-60Z M74,0 q14,30 4,70 q-10,-10 -8,-60Z" fill="${o.skin}" ${S}/><rect x="-74" y="-80" width="148" height="164" rx="72" fill="${o.skin}" ${S}/>
  <path d="M-74,-14 C-76,-70 -40,-88 0,-88 C40,-88 76,-70 74,-14 C50,-50 -50,-50 -74,-14Z" fill="#27306a" ${S}/><circle cx="0" cy="-104" r="28" fill="#27306a" ${S}/>${curls}<circle cx="0" cy="-30" r="6" fill="#ffd15c" ${S} stroke-width="2"/>${face(o)}`; }
function buddha(o = {}) { return figure({ skin: '#f3c896', head: buddhaHead, seated: true, top: '#f28a2e', sleeve: '#f28a2e', sash: '#c85a14', bottom: '#f28a2e', bottom2: '#c85a14', belt: '#c85a14', eyes: 'calm', armL: { s: 22, e: -26 }, armR: { s: 22, e: -26 }, headRot: [-1, 1, 5], ...o }); }
function sword(s = 1) { return `<g transform="scale(${s})"><path d="M-12,-40 L-12,-360 Q0,-420 12,-360 L12,-40Z" fill="#eef3ff" ${S}/><path d="M0,-400 L0,-40" stroke="#b7c3e8" stroke-width="4"/><rect x="-46" y="-44" width="92" height="16" rx="8" fill="#ffd15c" ${S}/><rect x="-9" y="-30" width="18" height="60" rx="8" fill="#e2452f" ${S}/></g>`; }
// horse facing left, origin = ground under centre
function horse(s = 1) {
  const leg = (x, a0, a1, d) => `<g class="swing" style="--a0:${a0}deg;--a1:${a1}deg;--d:.36s;animation-delay:${d}s;transform-origin:${x}px -250px"><path d="M${x - 22},-260 L${x - 18},-20 L${x + 22},-20 L${x + 24},-260Z" fill="#fbf8f2" ${S}/><rect x="${x - 22}" y="-30" width="46" height="30" rx="6" fill="#ffd15c" ${S}/></g>`;
  return `<g transform="scale(${s})"><ellipse cx="0" cy="6" rx="330" ry="26" fill="#000" opacity=".2"/>
  <path d="M250,-420 C340,-400 360,-300 330,-200 C320,-260 290,-300 240,-320Z" fill="#ffe9a8" ${S} class="swing" style="--a0:-8deg;--a1:10deg;--d:.5s;transform-origin:250px -400px"/>
  ${leg(-170, 30, -24, 0)}${leg(180, -26, 28, 0)}${leg(-110, -26, 30, -0.18)}${leg(120, 28, -24, -0.18)}
  <path d="M-230,-420 C-200,-480 180,-480 260,-420 C300,-340 270,-240 180,-230 L-150,-230 C-230,-250 -250,-340 -230,-420Z" fill="#fbf8f2" ${S}/>
  <path d="M-90,-462 L-80,-250 Q20,-226 110,-250 L116,-462 Q10,-446 -90,-462Z" fill="#e2452f" ${S}/><path d="M-82,-270 Q20,-246 112,-270" fill="none" stroke="#ffd15c" stroke-width="12"/>
  <g class="swing" style="--a0:-4deg;--a1:5deg;--d:.36s;transform-origin:-200px -400px"><path d="M-240,-400 C-260,-520 -300,-600 -330,-640 L-250,-700 C-200,-640 -150,-540 -150,-440Z" fill="#fbf8f2" ${S}/>
   <path d="M-250,-700 C-190,-660 -140,-560 -130,-450 C-160,-520 -200,-600 -262,-664Z" fill="#ffe9a8" ${S}/>
   <path d="M-270,-720 l-6,-56 l40,40Z" fill="#fbf8f2" ${S}/><path d="M-380,-560 C-400,-600 -360,-700 -260,-716 C-220,-690 -230,-640 -260,-610 L-340,-540Z" fill="#fbf8f2" ${S}/>
   <circle cx="-300" cy="-654" r="9" fill="${OUT}"/><circle cx="-370" cy="-566" r="5" fill="${OUT}"/><path d="M-380,-560 L-250,-640" stroke="#e2452f" stroke-width="7"/></g></g>`;
}
// elephant facing right, trunk raised. origin = ground centre
function elephant(o = {}) {
  const c = '#9aa6c8', c2 = '#7f8ab0';
  return `<g><path d="M-250,-260 L-250,0 L-160,0 L-150,-240 M40,-240 L40,0 L130,0 L140,-260" fill="${c2}" ${S}/><path d="M-170,-240 L-170,0 L-80,0 L-70,-240 M110,-240 L110,0 L200,0 L210,-260" fill="${c}" ${S}/>
  <path d="M-300,-420 C-290,-540 120,-560 220,-470 C280,-380 250,-230 170,-220 L-220,-220 C-300,-240 -310,-340 -300,-420Z" fill="${c}" ${S}/><path d="M-300,-400 C-340,-380 -350,-320 -340,-270" fill="none" ${S} stroke-width="8"/>
  <path d="M-120,-500 L-110,-300 Q0,-270 110,-300 L116,-512 Q0,-520 -120,-500Z" fill="#e2452f" ${S}/><path d="M-112,-320 Q0,-290 112,-320" fill="none" stroke="#ffd15c" stroke-width="12"/>
  <g style="transform-origin:200px -480px;${rotStyle(o.head ?? [-4, 3, 2])}">
   <g style="transform-origin:330px -470px;${rotStyle(o.trunk ?? [-6, 6, 1.6])}"><path d="M300,-520 C400,-560 470,-640 470,-740 C470,-790 430,-800 420,-760 C416,-680 370,-610 290,-560Z" fill="${c}" ${S}/><path d="M440,-700 q20,6 30,-4 M430,-650 q20,8 34,0 M410,-610 q18,10 34,6" fill="none" ${S} opacity=".5"/>${o.lotus ? `<g transform="translate(446,-780) rotate(10)">${lotus(0.8)}</g>` : ''}</g>
   <path d="M150,-620 C100,-640 80,-520 120,-440 C150,-400 200,-420 220,-470Z" fill="${c2}" ${S} class="swing" style="--a0:-6deg;--a1:6deg;--d:1.4s;transform-origin:200px -560px"/>
   <path d="M160,-560 C150,-680 340,-690 350,-560 C350,-470 300,-430 250,-430 C200,-430 164,-470 160,-560Z" fill="${c}" ${S}/>
   <g transform="translate(250,-560) scale(.6)">${crownSvg('#ffd15c')}</g><path d="M290,-470 C330,-440 370,-440 390,-470 C360,-466 330,-476 310,-500Z" fill="#fffaf0" ${S}/>
   ${o.sad ? `<path d="M270,-540 Q286,-552 302,-540" fill="none" ${S} stroke-width="5"/><circle cx="296" cy="-516" r="6" fill="#8fd0ff"/>` : `<path d="M270,-548 Q286,-534 302,-548" fill="none" ${S} stroke-width="5"/>`}
  </g></g>`;
}
function crocodile(s = 1) { return `<g transform="scale(${s})"><path d="M-300,-20 C-200,-90 60,-100 160,-60 L330,-70 L330,-44 L170,-30 L330,-20 L330,6 L150,10 C40,30 -200,30 -300,-20Z" fill="#3f9a4a" ${S}/><path d="M-240,-50 l20,-30 l20,24 l20,-30 l20,26 l20,-30 l20,26 l20,-28 l20,26 l20,-26 l20,26" fill="none" ${S}/>
  <path d="M190,-58 l10,18 l10,-19 l10,18 l10,-19 l10,18 l10,-19 l10,18 l10,-19 M190,-6 l10,-16 l10,16 l10,-16 l10,16 l10,-16 l10,16 l10,-16 l10,16" fill="#fff" ${S} stroke-width="2"/><circle cx="130" cy="-64" r="12" fill="#ffe27a" ${S}/><circle cx="132" cy="-64" r="5" fill="${OUT}"/></g>`; }
function globe(s = 1) { return `<g transform="scale(${s})"><circle r="150" fill="url(#gBlue)" transform="scale(1.5)"/><circle r="150" fill="#2f7fe0" ${S}/><path d="M-90,-100 C-30,-130 30,-110 20,-60 C10,-20 -50,-10 -70,30 C-100,10 -130,-50 -90,-100Z M40,10 C90,-10 130,30 110,80 C80,120 30,110 20,70 C16,44 20,24 40,10Z M-60,80 C-30,70 0,96 -20,126 C-50,136 -80,110 -60,80Z" fill="#4fc86a" ${S}/><path d="M-110,-70 C-80,-110 -20,-126 30,-116" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".5"/></g>`; }
function turtle(s = 1) { return `<g transform="scale(${s})"><path d="M-330,-30 C-380,-10 -400,40 -360,60 C-320,60 -290,30 -280,0Z M330,-30 C380,-10 400,40 360,60 C320,60 290,30 280,0Z" fill="#58b86a" ${S}/>
  <g class="swing" style="--a0:-4deg;--a1:5deg;--d:2s;transform-origin:-300px -60px"><path d="M-300,-90 C-380,-150 -470,-130 -480,-70 C-470,-20 -380,-10 -300,-30Z" fill="#6fd07a" ${S}/><circle cx="-420" cy="-90" r="9" fill="${OUT}"/><path d="M-470,-58 q20,12 40,2" fill="none" ${S}/><g transform="translate(-400,-128) scale(.4)">${crownSvg('#ffd15c')}</g></g>
  <path d="M-320,0 C-320,-200 320,-200 320,0 C200,40 -200,40 -320,0Z" fill="#2f9a6a" ${S}/><path d="M-200,-90 l70,-50 l90,0 l40,60 l-50,60 l-100,0Z M0,-80 l40,-60 l100,0 l60,60 l-60,60 l-90,0Z M-290,-20 l90,-70 l50,70 M320,-10 l-120,-70 l-50,60" fill="none" stroke="#ffe27a" stroke-width="7" stroke-linejoin="round"/>
  <path d="M-320,0 C-200,40 200,40 320,0" fill="none" stroke="#ffd15c" stroke-width="14"/></g>`; }
function scale(tilt) { // balance; tilt = style for beam rotation
  return `<g><rect x="-12" y="-40" width="24" height="420" rx="10" fill="#e8a92e" ${S}/><path d="M-130,380 L130,380 L90,330 L-90,330Z" fill="#ffd15c" ${S}/>
  <g style="transform-origin:0px -30px;${tilt}"><rect x="-340" y="-42" width="680" height="24" rx="12" fill="#ffd15c" ${S}/>
   ${[-1, 1].map(sd => `<g style="transform-origin:${sd * 320}px -30px;${tilt.replace(/rotate\(([-\d.]+)deg\)/g, (m, a) => `rotate(${-a}deg)`).replace(/k(\d+_\d+)/, 'k$1')}"><path d="M${sd * 320},-30 L${sd * 320 - 100},170 M${sd * 320},-30 L${sd * 320 + 100},170" stroke="#ffe9a8" stroke-width="5"/><path d="M${sd * 320 - 120},170 Q${sd * 320},250 ${sd * 320 + 120},170Z" fill="#ffd15c" ${S}/>${sd < 0 ? `<g transform="translate(-320,100) scale(.46)">${globe()}</g>` : `<g transform="translate(320,150) scale(.7)">${lotus()}</g>`}</g>`).join('')}
  </g><circle cx="0" cy="-34" r="26" fill="#e2452f" ${S}/></g>`;
}
