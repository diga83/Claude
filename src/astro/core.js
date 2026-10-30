// Astronomical core: apparent geocentric ecliptic positions, angles and houses.
// Positions come from astronomy-engine (VSOP87 / ELP based, sub-arcminute accuracy),
// referred to the true ecliptic and equinox of date — the tropical zodiac.
import * as Astronomy from 'astronomy-engine';

export const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
];

export const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const DEG = Math.PI / 180;
export const norm360 = (x) => ((x % 360) + 360) % 360;
// Signed shortest angular distance b - a in (-180, 180].
export const angleDiff = (a, b) => {
  const d = norm360(b - a);
  return d > 180 ? d - 360 : d;
};

export function signOf(lon) {
  const l = norm360(lon);
  const idx = Math.floor(l / 30);
  return { index: idx, name: SIGNS[idx], degree: l - idx * 30 };
}

export function formatDegree(lon) {
  const { name, degree } = signOf(lon);
  let d = Math.floor(degree);
  let m = Math.round((degree - d) * 60);
  if (m === 60) { d += 1; m = 0; }
  return `${d}°${String(m).padStart(2, '0')}′ ${name}`;
}

export const toTime = (date) => Astronomy.MakeTime(date);

// Tropical ecliptic longitude (degrees) of a body at a JS Date.
export function longitude(body, date) {
  const time = toTime(date);
  if (body === 'Moon') return norm360(Astronomy.EclipticGeoMoon(time).lon);
  if (body === 'Sun') return norm360(Astronomy.SunPosition(time).elon);
  return norm360(Astronomy.Ecliptic(Astronomy.GeoVector(body, time, true)).elon);
}

// Daily motion in degrees/day (negative = retrograde).
export function speed(body, date) {
  const h = 0.5 * 86400000;
  const a = longitude(body, new Date(date.getTime() - h));
  const b = longitude(body, new Date(date.getTime() + h));
  return angleDiff(a, b);
}

// Mean lunar node (Meeus, Astronomical Algorithms 47.7).
export function meanNode(date) {
  const T = toTime(date).tt / 36525;
  return norm360(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T
    + T * T * T / 467441 - T ** 4 / 60616000);
}

export function obliquity(date) {
  return Astronomy.e_tilt(toTime(date)).tobl;
}

// Local apparent sidereal time expressed as degrees (RAMC).
export function ramc(date, lonDeg) {
  return norm360(Astronomy.SiderealTime(toTime(date)) * 15 + lonDeg);
}

// Ecliptic longitude of the point with the given right ascension.
const raToLon = (ra, eps) => norm360(Math.atan2(Math.sin(ra * DEG), Math.cos(ra * DEG) * Math.cos(eps * DEG)) / DEG);

// `ramcOverride` (degrees) lets horary charts set the sidereal time directly.
export function angles(date, latDeg, lonDeg, ramcOverride) {
  const eps = obliquity(date);
  const R = (ramcOverride ?? ramc(date, lonDeg)) * DEG;
  const e = eps * DEG;
  const phi = latDeg * DEG;
  const mc = raToLon(R / DEG, eps);
  const asc = norm360(Math.atan2(Math.cos(R), -(Math.sin(R) * Math.cos(e) + Math.tan(phi) * Math.sin(e))) / DEG);
  return { asc, mc, ramc: R / DEG, eps };
}

// Placidus: each intermediate cusp trisects the diurnal / nocturnal semi-arc
// of its own degree. Solved iteratively; undefined inside the polar circles.
function placidus(date, latDeg, lonDeg, ramcOverride) {
  const { asc, mc, ramc: RAMC, eps } = angles(date, latDeg, lonDeg, ramcOverride);
  const tanPhi = Math.tan(latDeg * DEG);
  const sinE = Math.sin(eps * DEG);
  const cusp = (fraction, below) => {
    let lon = below ? norm360(asc + 30 * fraction * 3) : norm360(mc + 30 * fraction * 3);
    for (let i = 0; i < 60; i++) {
      const dec = Math.asin(sinE * Math.sin(lon * DEG));
      const x = -tanPhi * Math.tan(dec);
      if (Math.abs(x) > 1) return null;
      const dsa = Math.acos(x) / DEG;
      const ra = below ? RAMC + 180 - (1 - fraction) * (180 - dsa) : RAMC + fraction * dsa;
      const next = raToLon(ra, eps);
      if (Math.abs(angleDiff(lon, next)) < 1e-9) { lon = next; break; }
      lon = next;
    }
    return lon;
  };
  const c11 = cusp(1 / 3, false);
  const c12 = cusp(2 / 3, false);
  const c2 = cusp(1 / 3, true);
  const c3 = cusp(2 / 3, true);
  if ([c11, c12, c2, c3].some((c) => c === null)) return null;
  const c = [asc, c2, c3, norm360(mc + 180), norm360(c11 + 180), norm360(c12 + 180)];
  return [...c, ...c.map((x) => norm360(x + 180))];
}

function wholeSign(asc) {
  const start = Math.floor(norm360(asc) / 30) * 30;
  return Array.from({ length: 12 }, (_, i) => norm360(start + 30 * i));
}

export function houses(date, latDeg, lonDeg, system = 'placidus', ramcOverride) {
  const { asc } = angles(date, latDeg, lonDeg, ramcOverride);
  if (system === 'placidus') {
    const p = placidus(date, latDeg, lonDeg, ramcOverride);
    if (p) return { system: 'placidus', cusps: p };
  }
  return { system: 'whole', cusps: wholeSign(asc) };
}

// House number (1-12) for a longitude given 12 cusps.
export function houseOf(lon, cusps) {
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const end = cusps[(i + 1) % 12];
    const span = norm360(end - start);
    if (norm360(lon - start) < span) return i + 1;
  }
  return 1;
}
