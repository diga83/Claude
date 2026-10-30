// SVG chart wheel. The Ascendant sits at 9 o'clock and the zodiac runs
// counter-clockwise, as in a conventional Western chart.
import { SIGN_GLYPHS, PLANET_INFO } from '../astro/interpret.js';
import { norm360 } from '../astro/core.js';

const NS = 'http://www.w3.org/2000/svg';
const ELEMENT_CLASS = ['fire', 'earth', 'air', 'water'];

function el(name, attrs = {}, text) {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text !== undefined) n.textContent = text;
  return n;
}

export function renderWheel(chart) {
  const size = 600;
  const c = size / 2;
  const R = { outer: 290, sign: 250, house: 205, planet: 175, inner: 120 };
  const ascLon = chart.angles ? chart.angles.asc : 0;
  const pos = (lon, r) => {
    const a = (180 + norm360(lon - ascLon)) * Math.PI / 180;
    return [c + r * Math.cos(a), c - r * Math.sin(a)];
  };

  const svg = el('svg', { viewBox: `0 0 ${size} ${size}`, class: 'wheel', role: 'img', 'aria-label': 'Natal chart wheel' });
  svg.append(el('circle', { cx: c, cy: c, r: R.outer, class: 'ring-outer' }));

  for (let i = 0; i < 12; i++) {
    const start = i * 30;
    const [x1, y1] = pos(start, R.outer);
    const [x2, y2] = pos(start + 30, R.outer);
    const [x3, y3] = pos(start + 30, R.sign);
    const [x4, y4] = pos(start, R.sign);
    svg.append(el('path', {
      d: `M${x1},${y1} A${R.outer},${R.outer} 0 0,0 ${x2},${y2} L${x3},${y3} A${R.sign},${R.sign} 0 0,1 ${x4},${y4} Z`,
      class: `sign-seg ${ELEMENT_CLASS[i % 4]}`,
    }));
    const [gx, gy] = pos(start + 15, (R.outer + R.sign) / 2);
    svg.append(el('text', { x: gx, y: gy, class: 'sign-glyph' }, SIGN_GLYPHS[i] + '︎'));
  }
  svg.append(el('circle', { cx: c, cy: c, r: R.sign, class: 'ring' }));
  svg.append(el('circle', { cx: c, cy: c, r: R.inner, class: 'ring' }));

  if (chart.houses) {
    chart.houses.cusps.forEach((cusp, i) => {
      const [x1, y1] = pos(cusp, R.sign);
      const [x2, y2] = pos(cusp, R.inner);
      const angular = i % 3 === 0;
      svg.append(el('line', { x1, y1, x2, y2, class: angular ? 'cusp angular' : 'cusp' }));
      const next = chart.houses.cusps[(i + 1) % 12];
      const mid = cusp + norm360(next - cusp) / 2;
      const [nx, ny] = pos(mid, R.inner + 14);
      svg.append(el('text', { x: nx, y: ny, class: 'house-num' }, String(i + 1)));
    });
  }

  // Spread planets that would overlap.
  const placed = chart.bodies.map((b) => ({ ...b, show: b.lon })).sort((a, b) => a.lon - b.lon);
  for (let pass = 0; pass < 8; pass++) {
    for (let i = 0; i < placed.length; i++) {
      const a = placed[i];
      const b = placed[(i + 1) % placed.length];
      const gap = norm360(b.show - a.show);
      if (gap < 7) {
        const push = (7 - gap) / 2;
        a.show -= push;
        b.show += push;
      }
    }
  }

  for (const asp of chart.aspects) {
    const A = chart.points.find((p) => p.name === asp.a);
    const B = chart.points.find((p) => p.name === asp.b);
    if (A.angle || B.angle || asp.name === 'conjunction') continue;
    const [x1, y1] = pos(A.lon, R.inner);
    const [x2, y2] = pos(B.lon, R.inner);
    svg.append(el('line', { x1, y1, x2, y2, class: `aspect ${asp.nature}` }));
  }

  for (const p of placed) {
    const [tx, ty] = pos(p.lon, R.sign);
    const [tx2, ty2] = pos(p.lon, R.sign - 8);
    svg.append(el('line', { x1: tx, y1: ty, x2: tx2, y2: ty2, class: 'tick' }));
    const [x, y] = pos(p.show, R.planet);
    const g = el('g', { class: 'planet' });
    g.append(el('title', {}, `${p.name} ${Math.floor(p.sign.degree)}° ${p.sign.name}${p.retro && p.name !== 'North Node' ? ' (retrograde)' : ''}`));
    g.append(el('text', { x, y, class: 'planet-glyph' }, PLANET_INFO[p.name].glyph + '︎'));
    const [dx, dy] = pos(p.show, R.planet - 24);
    g.append(el('text', { x: dx, y: dy, class: 'planet-deg' }, `${Math.floor(p.sign.degree)}°${p.retro && p.name !== 'North Node' ? 'ʀ' : ''}`));
    svg.append(g);
  }

  if (chart.angles) {
    for (const [label, lon] of [['AC', chart.angles.asc], ['MC', chart.angles.mc]]) {
      const [x, y] = pos(lon, R.house - 2);
      svg.append(el('text', { x, y, class: 'angle-label' }, label));
    }
  }
  return svg;
}

// South-Indian style Vedic chart: fixed sign boxes in a 4x4 grid.
const SOUTH_GRID = [
  [11, 0, 1, 2],
  [10, null, null, 3],
  [9, null, null, 4],
  [8, 7, 6, 5],
];
const VEDIC_ABBR = { Sun: 'Su', Moon: 'Mo', Mercury: 'Me', Venus: 'Ve', Mars: 'Ma', Jupiter: 'Ju', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke', Uranus: 'Ur', Neptune: 'Ne', Pluto: 'Pl' };
const SIGN_ABBR = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];

export function renderSouthIndian(vedic, label = 'Rāśi (D1)') {
  const grid = document.createElement('div');
  grid.className = 'south-chart';
  const traditional = vedic.planets.filter((p) => !['Uranus', 'Neptune', 'Pluto'].includes(p.name));
  SOUTH_GRID.forEach((row) => row.forEach((signIdx) => {
    const cell = document.createElement('div');
    if (signIdx === null) { cell.className = 'sc-empty'; grid.append(cell); return; }
    cell.className = 'sc-cell';
    const isLagna = vedic.lagna && vedic.lagna.sign.index === signIdx;
    if (isLagna) cell.classList.add('lagna');
    const head = document.createElement('span');
    head.className = 'sc-sign';
    head.textContent = SIGN_ABBR[signIdx] + (isLagna ? ' · Lagna' : '');
    cell.append(head);
    const body = document.createElement('span');
    body.className = 'sc-planets';
    body.textContent = traditional.filter((p) => p.sign.index === signIdx)
      .map((p) => VEDIC_ABBR[p.name] + (p.retro && !['Rahu', 'Ketu'].includes(p.name) ? '(R)' : '')).join(' ');
    cell.append(body);
    grid.append(cell);
  }));
  const centre = document.createElement('div');
  centre.className = 'sc-centre';
  centre.textContent = label;
  grid.append(centre);
  return grid;
}
