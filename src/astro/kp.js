// Krishnamurti Paddhati (KP): KP ayanamsa, Placidus cusps, 249 sub-lords,
// four-level significators, cuspal sub-lord event rules, ruling planets,
// dasha-bhukti-antara timing and 1–249 horary.
import * as Astronomy from 'astronomy-engine';
import { longitude, meanNode, houses, angles, houseOf, norm360, angleDiff, toTime } from './core.js';
import { DASHA_LORDS, DASHA_YEARS, vimshottari } from './vedic.js';
import { SIGN_LORDS } from './life.js';

export const KP_PLANETS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
const NAK = 360 / 27;
const DAY = 86400000;
const YEAR = 365.25 * DAY;

// KP (Krishnamurti) ayanamsa: 22°21′50″ at 1900 Jan 0.5 (JD 2415020.0), with
// IAU 2006 general precession and nutation. About 6′ less than Lahiri.
const precession = (T) => (5028.796195 * T + 1.1054348 * T * T) / 3600;
const T1900 = (2415020.0 - 2451545.0) / 36525;
export function kpAyanamsa(date) {
  const time = toTime(date);
  return 22.363889 + precession(time.tt / 36525) - precession(T1900) + Astronomy.e_tilt(time).dpsi / 3600;
}

// Each nakshatra divides into nine subs proportional to the Vimshottari years,
// starting with the nakshatra's own lord: 243 subs, 249 once split at sign edges.
export const KP_SUBS = (() => {
  const subs = [];
  for (let n = 0; n < 27; n++) {
    const star = DASHA_LORDS[n % 9];
    const i0 = DASHA_LORDS.indexOf(star);
    let start = n * NAK;
    for (let k = 0; k < 9; k++) {
      const sub = DASHA_LORDS[(i0 + k) % 9];
      const len = NAK * DASHA_YEARS[sub] / 120;
      subs.push({ start, end: start + len, star, sub });
      start += len;
    }
  }
  return subs;
})();

export const HORARY_TABLE = (() => {
  const out = [];
  for (const s of KP_SUBS) {
    const edge = Math.ceil(s.start / 30 - 1e-9) * 30;
    if (edge > s.start + 1e-9 && edge < s.end - 1e-9) {
      out.push({ ...s, end: edge });
      out.push({ ...s, start: edge });
    } else out.push(s);
  }
  return out.map((s, i) => ({ ...s, number: i + 1, sign: SIGN_LORDS[Math.floor((s.start + 1e-9) / 30) % 12] }));
})();

export function kpLords(lon) {
  const l = norm360(lon);
  const s = KP_SUBS.find((x) => l >= x.start && l < x.end) || KP_SUBS[KP_SUBS.length - 1];
  // Sub-sub: the sub divided again in the same proportions, from the sub lord.
  const i0 = DASHA_LORDS.indexOf(s.sub);
  let t = s.start;
  let subSub = s.sub;
  for (let k = 0; k < 9; k++) {
    const lord = DASHA_LORDS[(i0 + k) % 9];
    const len = (s.end - s.start) * DASHA_YEARS[lord] / 120;
    if (l < t + len) { subSub = lord; break; }
    t += len;
  }
  return { sign: SIGN_LORDS[Math.floor(l / 30)], star: s.star, sub: s.sub, subSub };
}

function siderealPlanets(date, ayan) {
  const out = {};
  for (const p of KP_PLANETS.slice(0, 7)) out[p] = norm360(longitude(p, date) - ayan);
  out.Rahu = norm360(meanNode(date) - ayan);
  out.Ketu = norm360(out.Rahu + 180);
  return out;
}

// Build a KP chart. `ramc` (degrees) overrides sidereal time, for horary.
export function kpChart({ date, lat, lon, ramc }) {
  const ayan = kpAyanamsa(date);
  const hs = houses(date, lat, lon, 'placidus', ramc);
  const cusps = hs.cusps.map((c) => norm360(c - ayan));
  const pos = siderealPlanets(date, ayan);
  const planets = {};
  for (const name of KP_PLANETS) {
    planets[name] = { name, lon: pos[name], house: houseOf(pos[name], cusps), lords: kpLords(pos[name]) };
  }
  // A planet owns the houses whose cusps fall in its signs.
  const owners = cusps.map((c) => SIGN_LORDS[Math.floor(c / 30)]);
  const owned = (p) => owners.map((o, i) => (o === p ? i + 1 : 0)).filter(Boolean);

  // ABCD significations: A houses occupied by the star lord, B house occupied,
  // C houses owned by the star lord, D houses owned. Nodes also carry their
  // sign lord's houses.
  for (const name of KP_PLANETS) {
    const p = planets[name];
    const star = planets[p.lords.star];
    p.levels = {
      A: [star.house],
      B: [p.house],
      C: owned(star.name),
      D: owned(name),
    };
    if (name === 'Rahu' || name === 'Ketu') {
      const sl = planets[p.lords.sign];
      p.levels.N = [sl.house, ...owned(sl.name)];
    }
    p.signifies = [...new Set(Object.values(p.levels).flat())].sort((a, b) => a - b);
  }

  const cuspInfo = cusps.map((c, i) => ({ house: i + 1, lon: c, lords: kpLords(c) }));
  const significators = cuspInfo.map(({ house }) => {
    const occ = KP_PLANETS.filter((n) => planets[n].house === house);
    const own = KP_PLANETS.filter((n) => owners[house - 1] === n);
    const inStarOf = (list) => KP_PLANETS.filter((n) => list.includes(planets[n].lords.star));
    return { house, L1: inStarOf(occ), L2: occ, L3: inStarOf(own), L4: own };
  });

  return { date, lat, lon, ayan, cusps: cuspInfo, planets, significators, owners, placidus: hs.system === 'placidus' };
}

// --- Event judgement -------------------------------------------------------

export const KP_EVENTS = [
  { id: 'marriage', name: 'Marriage', cusp: 7, good: [2, 7, 11], bad: [1, 6, 10], question: 'Will I get married?' },
  { id: 'job', name: 'Job / employment', cusp: 10, good: [2, 6, 10, 11], bad: [1, 5, 9], question: 'Will I get the job?' },
  { id: 'business', name: 'Success in business', cusp: 10, good: [2, 7, 10, 11], bad: [5, 8, 12], question: 'Will my business succeed?' },
  { id: 'wealth', name: 'Financial gains', cusp: 2, good: [2, 6, 11], bad: [5, 8, 12], question: 'Will I receive the money?' },
  { id: 'children', name: 'Children', cusp: 5, good: [2, 5, 11], bad: [1, 4, 10], question: 'Will I have a child?' },
  { id: 'property', name: 'Property / home', cusp: 4, good: [4, 11, 12], bad: [3, 8], question: 'Will I buy the property?' },
  { id: 'education', name: 'Education / exams', cusp: 4, good: [4, 9, 11], bad: [3, 8, 12], question: 'Will I pass / complete my studies?' },
  { id: 'foreign', name: 'Travel / settling abroad', cusp: 12, good: [3, 9, 12], bad: [2, 4, 11], question: 'Will I go abroad?' },
  { id: 'health', name: 'Good health & recovery', cusp: 1, good: [1, 5, 11], bad: [6, 8, 12], risk: true, question: 'Will I recover / stay healthy?' },
  { id: 'dispute', name: 'Winning disputes & competition', cusp: 6, good: [6, 11], bad: [5, 12], question: 'Will I win the case or competition?' },
];
export const HORARY_ONLY = [
  { id: 'lost', name: 'Recovering a lost item', cusp: 11, good: [2, 6, 11], bad: [5, 8, 12], question: 'Will I find what I lost?' },
];

export function judge(kp, event) {
  const csl = kp.cusps[event.cusp - 1].lords.sub;
  const sig = kp.planets[csl].signifies;
  const star = kp.planets[csl].lords.star;
  const starSig = kp.planets[star].signifies;
  const good = event.good.filter((h) => sig.includes(h));
  const bad = event.bad.filter((h) => sig.includes(h));
  let verdict;
  if (good.length >= 2 && bad.length === 0) verdict = 'promised';
  else if (good.length >= 1 && bad.length <= good.length) verdict = 'promised with obstacles';
  else if (good.length >= 1) verdict = 'doubtful';
  else verdict = 'not promised';
  // Event significators: planets tied to the favourable houses.
  const sigs = KP_PLANETS.map((n) => {
    const p = kp.planets[n];
    const g = event.good.filter((h) => p.signifies.includes(h)).length;
    const b = event.bad.filter((h) => p.signifies.includes(h)).length;
    return { name: n, g, b };
  }).filter((x) => x.g > 0 && x.g > x.b);
  return { event, csl, star, sig, starSig, good, bad, verdict, significators: sigs.map((s) => s.name), sigDetail: sigs };
}

// Dasha / bhukti / antara periods whose lords all signify the event.
// `houses` overrides the target houses (e.g. 6/8/12 for illness-prone periods).
export function eventTiming(kp, event, from, years = 12, houses = null) {
  const j = judge(kp, event);
  const S = new Set(houses
    ? KP_PLANETS.filter((n) => houses.filter((h) => kp.planets[n].signifies.includes(h)).length >= 2)
    : j.significators);
  const periods = vimshottari(kp.date, kp.planets.Moon.lon, 2);
  const to = from.getTime() + years * YEAR;
  const windows = [];
  for (const d of periods) {
    if (d.end <= from || d.start >= to) continue;
    for (const b of d.sub) {
      if (b.end <= from || b.start >= to) continue;
      const len = b.end - b.start;
      const i0 = DASHA_LORDS.indexOf(b.lord);
      let t = b.start.getTime();
      for (let k = 0; k < 9; k++) {
        const a = DASHA_LORDS[(i0 + k) % 9];
        const l = len * DASHA_YEARS[a] / 120;
        const start = t;
        t += l;
        if (t <= from || start >= to) continue;
        const hits = [d.lord, b.lord, a].filter((x) => S.has(x)).length;
        if (S.has(b.lord) && S.has(a) && hits >= 2) {
          windows.push({ dasha: d.lord, bhukti: b.lord, antara: a, start: new Date(start), end: new Date(t), strength: hits });
        }
      }
    }
  }
  // Merge consecutive antaras in the same bhukti.
  const merged = [];
  for (const w of windows) {
    const prev = merged.at(-1);
    if (prev && prev.dasha === w.dasha && prev.bhukti === w.bhukti && Math.abs(prev.end - w.start) < DAY) {
      prev.end = w.end;
      prev.antaras.push(w.antara);
      prev.strength = Math.max(prev.strength, w.strength);
    } else merged.push({ ...w, antaras: [w.antara] });
  }
  return { ...j, windows: merged };
}

// --- Ruling planets ----------------------------------------------------------

const DAY_LORDS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

export function rulingPlanets(date, lat, lon) {
  const kp = kpChart({ date, lat, lon });
  // Vedic weekday begins at sunrise: before ~6 am local mean time, use the previous day.
  const localHours = (date.getUTCHours() + date.getUTCMinutes() / 60 + lon / 15 + 48) % 24;
  const localDay = new Date(date.getTime() + (lon / 15) * 3600000);
  let weekday = localDay.getUTCDay();
  if (localHours < 6) weekday = (weekday + 6) % 7;
  const moon = kp.planets.Moon.lords;
  const lagna = kp.cusps[0].lords;
  const list = [
    ['Day lord', DAY_LORDS[weekday]],
    ['Moon sign lord', moon.sign], ['Moon star lord', moon.star], ['Moon sub lord', moon.sub],
    ['Lagna sign lord', lagna.sign], ['Lagna star lord', lagna.star], ['Lagna sub lord', lagna.sub],
  ];
  return { kp, list, set: [...new Set(list.map((x) => x[1]))] };
}

// --- Horary (Prashna) 1–249 ------------------------------------------------

// Find the sidereal time at which the tropical ascendant equals `targetTrop`.
function ramcForAscendant(date, lat, lon, targetTrop) {
  const f = (r) => angleDiff(targetTrop, angles(date, lat, lon, r).asc);
  let prev = f(0);
  for (let r = 1; r <= 360; r += 1) {
    const cur = f(r);
    if (prev <= 0 && cur > 0 && cur - prev < 90) {
      let lo = r - 1;
      let hi = r;
      for (let i = 0; i < 50; i++) {
        const mid = (lo + hi) / 2;
        if (f(mid) <= 0) lo = mid; else hi = mid;
      }
      return norm360((lo + hi) / 2);
    }
    prev = cur;
  }
  return null;
}

export function horary(number, date, lat, lon) {
  const entry = HORARY_TABLE[number - 1];
  if (!entry) throw new Error('Horary number must be 1–249');
  const ayan = kpAyanamsa(date);
  const ramc = ramcForAscendant(date, lat, lon, norm360(entry.start + ayan + 1e-6));
  if (ramc === null) return null;
  return { entry, kp: kpChart({ date, lat, lon, ramc }) };
}
