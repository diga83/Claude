// Chart assembly: natal chart, aspects, transits and secondary progressions.
import {
  PLANETS, longitude, speed, meanNode, angles, houses, houseOf, signOf, angleDiff, norm360,
} from './core.js';
import { toSidereal, ayanamsa, nakshatra, vimshottari, currentDasha } from './vedic.js';

export const ASPECTS = [
  { name: 'conjunction', angle: 0, orb: 8, nature: 'fusion' },
  { name: 'sextile', angle: 60, orb: 4, nature: 'harmonious' },
  { name: 'square', angle: 90, orb: 7, nature: 'challenging' },
  { name: 'trine', angle: 120, orb: 7, nature: 'harmonious' },
  { name: 'opposition', angle: 180, orb: 8, nature: 'challenging' },
];

// Smaller orbs when neither point is a luminary.
const orbFor = (aspect, a, b) => {
  const luminary = ['Sun', 'Moon'].includes(a) || ['Sun', 'Moon'].includes(b);
  return luminary ? aspect.orb : aspect.orb - 2;
};

export function findAspect(lonA, lonB, a = '', b = '') {
  const sep = Math.abs(angleDiff(lonA, lonB));
  for (const asp of ASPECTS) {
    const orb = Math.abs(sep - asp.angle);
    if (orb <= orbFor(asp, a, b)) return { ...asp, orb };
  }
  return null;
}

export function buildChart({ date, lat, lon, timeKnown = true, houseSystem = 'placidus' }) {
  const bodies = PLANETS.map((name) => {
    const l = longitude(name, date);
    return { name, lon: l, speed: speed(name, date), retro: speed(name, date) < 0 };
  });
  const node = meanNode(date);
  bodies.push({ name: 'North Node', lon: node, speed: -0.053, retro: true });

  let ang = null;
  let hs = null;
  if (timeKnown) {
    ang = angles(date, lat, lon);
    hs = houses(date, lat, lon, houseSystem);
    for (const b of bodies) b.house = houseOf(b.lon, hs.cusps);
  }
  for (const b of bodies) b.sign = signOf(b.lon);

  const points = [...bodies];
  if (ang) {
    points.push({ name: 'Ascendant', lon: ang.asc, sign: signOf(ang.asc), house: 1, angle: true });
    points.push({ name: 'Midheaven', lon: ang.mc, sign: signOf(ang.mc), house: 10, angle: true });
  }

  const aspects = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const A = points[i];
      const B = points[j];
      if (A.angle && B.angle) continue;
      const asp = findAspect(A.lon, B.lon, A.name, B.name);
      if (!asp) continue;
      // Only conjunctions to the node are traditionally read.
      if ((A.name === 'North Node' || B.name === 'North Node') && asp.name !== 'conjunction') continue;
      aspects.push({ a: A.name, b: B.name, ...asp });
    }
  }
  aspects.sort((x, y) => x.orb - y.orb);

  // Vedic layer.
  const ayan = ayanamsa(date);
  const sidereal = bodies.map((b) => {
    const sl = norm360(b.lon - ayan);
    return { name: b.name === 'North Node' ? 'Rahu' : b.name, lon: sl, sign: signOf(sl), retro: b.retro };
  });
  const rahu = sidereal.find((b) => b.name === 'Rahu');
  const ketuLon = norm360(rahu.lon + 180);
  sidereal.push({ name: 'Ketu', lon: ketuLon, sign: signOf(ketuLon), retro: true });
  let lagna = null;
  if (ang) {
    const sl = toSidereal(ang.asc, date);
    lagna = { lon: sl, sign: signOf(sl) };
    // Vedic charts use whole-sign houses counted from the lagna sign.
    for (const b of sidereal) b.house = ((b.sign.index - lagna.sign.index + 12) % 12) + 1;
  }
  const moonSid = sidereal.find((b) => b.name === 'Moon').lon;
  const dashas = vimshottari(date, moonSid, 2);

  return {
    date, lat, lon, timeKnown,
    bodies, points, aspects,
    angles: ang, houses: hs,
    vedic: {
      ayanamsa: ayan, planets: sidereal, lagna,
      moonNakshatra: nakshatra(moonSid),
      dashas,
    },
  };
}

export const dashaAt = (chart, date) => currentDasha(chart.vedic.dashas, date);

// --- Transits -------------------------------------------------------------

export const TRANSITING = ['Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
const NATAL_TARGETS = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Ascendant', 'Midheaven'];
const TRANSIT_ORB = 1.5;
const DAY = 86400000;

// Scan day by day for outer-planet aspects to natal points. Each hit becomes one
// event spanning the time the aspect is within orb, with every exact pass
// (retrograde motion can produce three).
export function transits(chart, from, days = 365) {
  const targets = chart.points.filter((p) => NATAL_TARGETS.includes(p.name));
  const events = [];
  for (const planet of TRANSITING) {
    const series = [];
    for (let d = -1; d <= days + 1; d++) {
      const date = new Date(from.getTime() + d * DAY);
      series.push({ date, lon: longitude(planet, date) });
    }
    for (const target of targets) {
      for (const asp of ASPECTS) {
        const dev = series.map((s) => {
          const sep = Math.abs(angleDiff(s.lon, target.lon));
          return Math.abs(sep - asp.angle);
        });
        let open = null;
        for (let i = 1; i < series.length - 1; i++) {
          const inside = dev[i] <= TRANSIT_ORB;
          if (inside && !open) open = { start: series[i].date, exact: [], minOrb: dev[i] };
          if (open) {
            open.minOrb = Math.min(open.minOrb, dev[i]);
            // A local minimum is only "exact" if the aspect perfects; a planet
            // can also station just short of it.
            if (dev[i] <= dev[i - 1] && dev[i] < dev[i + 1] && dev[i] < 0.6) {
              const hit = refineExact(planet, target.lon, asp.angle, series[i].date);
              if (hit.orb < 0.01) open.exact.push(hit.date);
            }
          }
          if (open && (!inside || i === series.length - 2)) {
            open.end = series[i].date;
            events.push({
              planet, target: target.name, aspect: asp.name, nature: asp.nature,
              start: open.start, end: open.end, exact: open.exact, minOrb: open.minOrb,
              ongoing: open.start <= from,
            });
            open = null;
          }
        }
      }
    }
  }
  // Retrograde loops make the same aspect drop out of orb and return; read
  // those passes as one extended transit.
  const merged = [];
  const byKey = new Map();
  for (const e of events.sort((a, b) => a.start - b.start)) {
    const key = `${e.planet}|${e.target}|${e.aspect}`;
    const prev = byKey.get(key);
    if (prev && e.start - prev.end < 200 * DAY) {
      prev.end = e.end;
      prev.exact.push(...e.exact);
      prev.minOrb = Math.min(prev.minOrb, e.minOrb);
    } else {
      byKey.set(key, e);
      merged.push(e);
    }
  }
  return merged.sort((a, b) => (a.exact[0] || a.start) - (b.exact[0] || b.start));
}

function refineExact(planet, targetLon, aspAngle, approx) {
  const f = (t) => Math.abs(Math.abs(angleDiff(longitude(planet, new Date(t)), targetLon)) - aspAngle);
  let lo = approx.getTime() - DAY;
  let hi = approx.getTime() + DAY;
  for (let i = 0; i < 40; i++) {
    const m1 = lo + (hi - lo) / 3;
    const m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) hi = m2; else lo = m1;
  }
  const t = (lo + hi) / 2;
  return { date: new Date(t), orb: f(t) };
}

// Which natal house each slow planet is moving through right now.
export function houseTransits(chart, date) {
  if (!chart.houses) return [];
  return ['Jupiter', 'Saturn'].map((planet) => {
    const l = longitude(planet, date);
    return { planet, lon: l, sign: signOf(l), house: houseOf(l, chart.houses.cusps) };
  });
}

// --- Secondary progressions ("a day for a year") ---------------------------

const TROPICAL_YEAR = 365.24219 * DAY;

export function progressions(chart, date) {
  const age = (date - chart.date) / TROPICAL_YEAR;
  const pDate = new Date(chart.date.getTime() + age * DAY);
  const sun = longitude('Sun', pDate);
  const moon = longitude('Moon', pDate);
  const phase = norm360(moon - sun);
  // Date the progressed Moon enters its next sign (~ every 2.5 years).
  const moonSpeedPerYear = speed('Moon', pDate);
  const toNext = (30 - signOf(moon).degree) / moonSpeedPerYear;
  return {
    age,
    sun: { lon: sun, sign: signOf(sun), house: chart.houses ? houseOf(sun, chart.houses.cusps) : null },
    moon: { lon: moon, sign: signOf(moon), house: chart.houses ? houseOf(moon, chart.houses.cusps) : null },
    moonNextSign: new Date(date.getTime() + toNext * TROPICAL_YEAR),
    phase,
  };
}

// Next exact solar return (Sun back on its natal degree) after `date`.
export function solarReturn(chart, date) {
  const natalSun = chart.bodies.find((b) => b.name === 'Sun').lon;
  let t = date.getTime();
  // Approach in steps, then refine with the Sun's ~0.9856°/day motion.
  const ahead = norm360(natalSun - longitude('Sun', new Date(t)));
  t += (ahead / 0.9856) * DAY;
  for (let i = 0; i < 6; i++) {
    t += (angleDiff(longitude('Sun', new Date(t)), natalSun) / 0.9856) * DAY;
  }
  return new Date(t);
}
