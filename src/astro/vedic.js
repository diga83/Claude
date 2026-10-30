// Vedic (Jyotish) layer: Lahiri sidereal zodiac, nakshatras and Vimshottari dasha.
import * as Astronomy from 'astronomy-engine';
import { norm360, toTime } from './core.js';

// Lahiri (Chitrapaksha) ayanamsa, as defined by the Indian Calendar Reform
// Committee: 23°15′00.658″ at 21 March 1956 0h TT (JD 2435553.5), carried
// forward with the IAU 2006 general precession in longitude. Includes nutation
// so it can be subtracted directly from apparent tropical longitudes.
const T0 = (2435553.5 - 2451545.0) / 36525;
const precession = (T) => (5028.796195 * T + 1.1054348 * T * T) / 3600;

export function ayanamsa(date) {
  const time = toTime(date);
  const T = time.tt / 36525;
  const nutation = Astronomy.e_tilt(time).dpsi / 3600;
  return 23.245524743 + precession(T) - precession(T0) + nutation;
}

export const toSidereal = (tropicalLon, date) => norm360(tropicalLon - ayanamsa(date));

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu',
  'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta',
  'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati',
];

// Vimshottari sequence and period lengths in years (total 120).
export const DASHA_LORDS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
export const DASHA_YEARS = { Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17 };
const SPAN = 360 / 27;
const YEAR_MS = 365.25 * 86400000;

export function nakshatra(siderealLon) {
  const l = norm360(siderealLon);
  const index = Math.floor(l / SPAN);
  const within = l - index * SPAN;
  return {
    index,
    name: NAKSHATRAS[index],
    pada: Math.floor(within / (SPAN / 4)) + 1,
    lord: DASHA_LORDS[index % 9],
    fraction: within / SPAN,
  };
}

function subPeriods(lord, start, totalMs) {
  const i0 = DASHA_LORDS.indexOf(lord);
  let t = start;
  return DASHA_LORDS.map((_, k) => {
    const sub = DASHA_LORDS[(i0 + k) % 9];
    const len = totalMs * DASHA_YEARS[sub] / 120;
    const p = { lord: sub, start: new Date(t), end: new Date(t + len) };
    t += len;
    return p;
  });
}

// Full Vimshottari timeline from birth: mahadashas with antardashas.
// The first mahadasha is entered part-way, by the fraction of the Moon's
// nakshatra already traversed at birth.
export function vimshottari(birthDate, moonSidereal, cycles = 1) {
  const nk = nakshatra(moonSidereal);
  const i0 = DASHA_LORDS.indexOf(nk.lord);
  const firstLen = DASHA_YEARS[nk.lord] * YEAR_MS;
  let t = birthDate.getTime() - nk.fraction * firstLen;
  const periods = [];
  for (let k = 0; k < 9 * cycles; k++) {
    const lord = DASHA_LORDS[(i0 + k) % 9];
    const len = DASHA_YEARS[lord] * YEAR_MS;
    periods.push({ lord, start: new Date(t), end: new Date(t + len), sub: subPeriods(lord, t, len) });
    t += len;
  }
  return periods;
}

export function currentDasha(periods, date) {
  const t = date.getTime();
  const maha = periods.find((p) => p.start <= t && t < p.end);
  if (!maha) return null;
  const antar = maha.sub.find((p) => p.start <= t && t < p.end);
  return { maha, antar };
}
