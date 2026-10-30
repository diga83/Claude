// Life-area analysis in the Parashari (Vedic) tradition: planetary dignity,
// house lordship, divisional charts, yogas, and timing via dasha + transits.
// Scores are weighted tallies of classical factors, not measured probabilities.
import { longitude, norm360, angleDiff } from './core.js';
import { toSidereal, DASHA_LORDS, DASHA_YEARS } from './vedic.js';

export const GRAHAS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
export const SIGN_LORDS = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6, Rahu: 1, Ketu: 7 };
const MOOLATRIKONA = { Sun: 4, Moon: 1, Mars: 0, Mercury: 5, Jupiter: 8, Venus: 6, Saturn: 10 };
// Naisargika (natural) relationships.
const FRIENDS = {
  Sun: ['Moon', 'Mars', 'Jupiter'], Moon: ['Sun', 'Mercury'], Mars: ['Sun', 'Moon', 'Jupiter'],
  Mercury: ['Sun', 'Venus'], Jupiter: ['Sun', 'Moon', 'Mars'], Venus: ['Mercury', 'Saturn'],
  Saturn: ['Mercury', 'Venus'], Rahu: ['Venus', 'Saturn', 'Mercury'], Ketu: ['Mars', 'Venus', 'Saturn'],
};
const ENEMIES = {
  Sun: ['Venus', 'Saturn'], Moon: [], Mars: ['Mercury'], Mercury: ['Moon'],
  Jupiter: ['Mercury', 'Venus'], Venus: ['Sun', 'Moon'], Saturn: ['Sun', 'Moon', 'Mars'],
  Rahu: ['Sun', 'Moon', 'Mars'], Ketu: ['Sun', 'Moon'],
};
// Houses aspected counting the occupied house as 1. Every graha aspects the 7th.
const ASPECT_COUNTS = { Mars: [4, 7, 8], Jupiter: [5, 7, 9], Saturn: [3, 7, 10], Rahu: [5, 7, 9], Ketu: [5, 7, 9] };
export const aspectCounts = (p) => ASPECT_COUNTS[p] || [7];
// Maximum distance from the Sun before a planet is combust.
const COMBUST = { Moon: 12, Mars: 17, Mercury: 14, Jupiter: 11, Venus: 10, Saturn: 15 };

export const KENDRA = [1, 4, 7, 10];
export const TRIKONA = [1, 5, 9];
export const DUSTHANA = [6, 8, 12];
export const UPACHAYA = [3, 6, 10, 11];

const SIGN_NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ord = (n) => n + (['th', 'st', 'nd', 'rd'][(n % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][n % 100] || 'th');
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const DAY = 86400000;

// --- Divisional charts -----------------------------------------------------

// D9: each sign split into nine 3°20′ parts; the sequence runs continuously
// through the zodiac, so the navamsa sign is simply floor(lon / 3°20′) mod 12.
export const navamsaSign = (lon) => Math.floor(norm360(lon) * 9 / 30) % 12;

// D10: 3° parts; odd signs count from themselves, even signs from the 9th.
export function dasamsaSign(lon) {
  const l = norm360(lon);
  const sign = Math.floor(l / 30);
  const part = Math.floor((l - sign * 30) / 3);
  const start = sign % 2 === 0 ? sign : sign + 8;
  return (start + part) % 12;
}

// --- Dignity ---------------------------------------------------------------

export function dignity(planet, signIdx) {
  if (EXALT[planet] === signIdx) return { label: 'exalted', score: 2 };
  if ((EXALT[planet] + 6) % 12 === signIdx) return { label: 'debilitated', score: -2 };
  if (planet === 'Rahu' || planet === 'Ketu') return { label: 'neutral', score: 0 };
  if (MOOLATRIKONA[planet] === signIdx) return { label: 'in moolatrikona', score: 1.5 };
  const lord = SIGN_LORDS[signIdx];
  if (lord === planet) return { label: 'in its own sign', score: 1.25 };
  if (FRIENDS[planet].includes(lord)) return { label: 'in a friendly sign', score: 0.5 };
  if (ENEMIES[planet].includes(lord)) return { label: 'in an enemy sign', score: -0.5 };
  return { label: 'in a neutral sign', score: 0 };
}

// --- Chart context -----------------------------------------------------------

export function vedicContext(chart) {
  const v = chart.vedic;
  const moonSid = v.planets.find((p) => p.name === 'Moon');
  const lagnaIdx = v.lagna ? v.lagna.sign.index : moonSid.sign.index;
  const houseOfSign = (s) => ((s - lagnaIdx + 12) % 12) + 1;
  const signOfHouse = (h) => (lagnaIdx + h - 1) % 12;
  const sunTrop = chart.bodies.find((b) => b.name === 'Sun').lon;
  const moonTrop = chart.bodies.find((b) => b.name === 'Moon').lon;
  const waxing = norm360(moonTrop - sunTrop) < 180;

  const planets = {};
  for (const name of GRAHAS) {
    const p = v.planets.find((x) => x.name === name);
    const sign = p.sign.index;
    const d9 = navamsaSign(p.lon);
    const d10 = dasamsaSign(p.lon);
    const sunDist = Math.abs(angleDiff(p.lon, v.planets.find((x) => x.name === 'Sun').lon));
    planets[name] = {
      name, lon: p.lon, sign, degree: p.sign.degree, retro: p.retro,
      house: houseOfSign(sign), d9, d10,
      dignity: dignity(name, sign),
      d9dignity: dignity(name, d9),
      d10dignity: dignity(name, d10),
      vargottama: sign === d9,
      combust: COMBUST[name] !== undefined && sunDist < COMBUST[name],
      benefic: ['Jupiter', 'Venus', 'Mercury'].includes(name) || (name === 'Moon' && waxing),
    };
  }

  const ctx = {
    chart, planets, lagnaIdx, usesMoonLagna: !v.lagna, waxing,
    houseOfSign, signOfHouse,
    lordOf: (h) => SIGN_LORDS[signOfHouse(h)],
    housesRuled: (p) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((h) => SIGN_LORDS[signOfHouse(h)] === p),
    occupants: (h) => GRAHAS.filter((n) => planets[n].house === h),
    aspectsOn: (h) => GRAHAS.filter((n) => planets[n].house !== h
      && aspectCounts(n).some((c) => ((planets[n].house + c - 2) % 12) + 1 === h)),
  };
  ctx.strength = (name) => planetStrength(ctx, name);
  return ctx;
}

function houseFactor(h) {
  if (KENDRA.includes(h) || TRIKONA.includes(h)) return 0.75;
  if (h === 11) return 0.5;
  if (DUSTHANA.includes(h)) return -0.75;
  return 0;
}

export function planetStrength(ctx, name) {
  const p = ctx.planets[name];
  let s = p.dignity.score + houseFactor(p.house) + 0.4 * p.d9dignity.score;
  if (p.vargottama) s += 0.5;
  if (p.combust) s -= 1;
  if (p.retro && !['Sun', 'Moon', 'Rahu', 'Ketu'].includes(name)) s += 0.25;
  // A lord of a dusthana sitting in a dusthana (Viparita) is not weakened by it.
  if (DUSTHANA.includes(p.house) && ctx.housesRuled(name).some((h) => DUSTHANA.includes(h))) s += 0.75;
  return s;
}

// --- Life areas ------------------------------------------------------------

export const LIFE_AREAS = [
  { id: 'self', name: 'Personality & vitality', houses: [1], secondary: [], karakas: ['Sun'] },
  { id: 'career', name: 'Career & status', houses: [10], secondary: [6, 11], karakas: ['Sun', 'Saturn', 'Mercury'], varga: 'd10' },
  { id: 'wealth', name: 'Wealth & finances', houses: [2, 11], secondary: [5, 9], karakas: ['Jupiter', 'Venus'] },
  { id: 'love', name: 'Love & marriage', houses: [7], secondary: [2, 5, 11], karakas: ['Venus', 'Jupiter'], varga: 'd9' },
  { id: 'children', name: 'Children & creativity', houses: [5], secondary: [9, 11], karakas: ['Jupiter'] },
  { id: 'home', name: 'Home, family & property', houses: [4], secondary: [2], karakas: ['Moon', 'Mars'] },
  { id: 'health', name: 'Health & wellbeing', houses: [1, 6], secondary: [8], karakas: ['Sun', 'Moon'], caution: [6, 8, 12] },
  { id: 'education', name: 'Education & intellect', houses: [5, 9], secondary: [4, 2], karakas: ['Mercury', 'Jupiter'] },
  { id: 'travel', name: 'Travel & foreign lands', houses: [12, 9], secondary: [3, 7], karakas: ['Rahu', 'Moon'] },
  { id: 'spirit', name: 'Spirituality & fortune', houses: [9, 12], secondary: [5], karakas: ['Jupiter', 'Ketu'] },
];

export const HOUSE_MEANING = [
  null, 'self, body and vitality', 'wealth, family and speech', 'courage, siblings and initiative',
  'home, mother, property and inner peace', 'children, intelligence and romance', 'work, health, debts and rivals',
  'marriage and partnerships', 'longevity, crises and hidden matters', 'fortune, father, teachers and long journeys',
  'career, status and public action', 'gains, income and friends', 'expenses, foreign lands, sleep and liberation',
];

export const OCCUPANT_EFFECT = {
  Sun: 'brings authority, pride and visibility, with possible ego clashes',
  Moon: 'makes this emotionally central and changeable; results come in waves',
  Mars: 'adds drive and competitiveness, with risk of conflict or haste',
  Mercury: 'brings intelligence, communication and versatility',
  Jupiter: 'protects and expands; one of the best influences a house can have',
  Venus: 'brings harmony, comfort, beauty and pleasure',
  Saturn: 'brings delay and responsibility, but durable results that mature with age',
  Rahu: 'creates intense, unconventional ambitions, often with foreign or modern links',
  Ketu: 'brings detachment or restlessness, pushing toward inner growth',
};

const effectOf = (x) => (x > 0.05 ? 1 : x < -0.05 ? -1 : 0);

function describePlanet(ctx, name) {
  const p = ctx.planets[name];
  const bits = [`${p.dignity.label} in ${SIGN_NAMES[p.sign]}`, `in your ${ord(p.house)} house`];
  if (p.combust) bits.push('combust (close to the Sun)');
  if (p.vargottama) bits.push('vargottama (same sign in D9: strong)');
  if (p.retro && !['Rahu', 'Ketu'].includes(name)) bits.push('retrograde');
  return bits.join(', ');
}

function houseScore(ctx, h, reasons, label) {
  let score = 0;
  const lord = ctx.lordOf(h);
  const ls = ctx.strength(lord);
  score += 0.6 * ls;
  reasons.push({ effect: effectOf(ls), text: `${ord(h)} house (${label}) is ruled by ${lord}, ${describePlanet(ctx, lord)}.` });

  for (const o of ctx.occupants(h)) {
    const p = ctx.planets[o];
    const malefic = !p.benefic;
    let s;
    if (!malefic) s = 0.6 + 0.2 * p.dignity.score;
    else if (UPACHAYA.includes(h)) s = 0.3 + 0.2 * p.dignity.score;
    else s = -0.6 + 0.25 * p.dignity.score;
    if (o === lord) s = Math.max(s, 0.5);
    score += s;
    reasons.push({ effect: effectOf(s), text: `${o} occupies your ${ord(h)} house: it ${OCCUPANT_EFFECT[o]}.` });
  }
  for (const a of ctx.aspectsOn(h)) {
    let s = 0;
    if (a === lord) s = 0.4;
    else if (a === 'Jupiter') s = 0.6;
    else if (ctx.planets[a].benefic) s = 0.3;
    else if (UPACHAYA.includes(h)) s = 0;
    else s = a === 'Rahu' || a === 'Ketu' ? -0.2 : -0.4;
    if (s === 0) continue;
    score += s;
    reasons.push({ effect: effectOf(s), text: `${a} aspects your ${ord(h)} house${s > 0 ? ', protecting it' : ', adding pressure'}.` });
  }
  return score;
}

export const pctFromScore = (s) => Math.round(clamp(50 + 9 * s, 6, 96));
export const bandOf = (pct) => (pct >= 68 ? 'strong' : pct >= 52 ? 'good' : pct >= 38 ? 'mixed' : 'challenged');

export function analyseArea(ctx, area) {
  const reasons = [];
  let score = 0;
  for (const h of area.houses) score += houseScore(ctx, h, reasons, HOUSE_MEANING[h]);
  for (const h of area.secondary) {
    const lord = ctx.lordOf(h);
    score += 0.25 * ctx.strength(lord);
  }
  for (const k of area.karakas) {
    const s = ctx.strength(k);
    score += 0.4 * s;
    reasons.push({ effect: effectOf(s), text: `Significator ${k} is ${describePlanet(ctx, k)}.` });
  }
  if (area.varga) {
    const lord = ctx.lordOf(area.houses[0]);
    const key = area.varga === 'd9' ? 'd9dignity' : 'd10dignity';
    const chartName = area.varga === 'd9' ? 'navamsa (D9)' : 'dasamsa (D10)';
    const d = ctx.planets[lord][key];
    const signIdx = ctx.planets[lord][area.varga];
    score += 0.4 * d.score;
    reasons.push({ effect: effectOf(d.score), text: `In the ${chartName}, ${lord} is ${d.label} in ${SIGN_NAMES[signIdx]}.` });
    if (area.varga === 'd9') {
      const vd = ctx.planets.Venus.d9dignity;
      score += 0.3 * vd.score;
      if (vd.score !== 0) reasons.push({ effect: effectOf(vd.score), text: `Venus is ${vd.label} in the navamsa.` });
    }
  }
  if (area.id === 'love' && manglik(ctx).present) {
    score -= 0.5;
    reasons.push({ effect: -1, text: 'Manglik (Kuja) dosha is present: traditionally matched with a partner who has it too.' });
  }
  const norm = score / (area.houses.length * 0.8 + 0.6);
  const pct = pctFromScore(norm);
  reasons.sort((a, b) => b.effect - a.effect);
  return { area, score: norm, pct, band: bandOf(pct), reasons };
}

// --- Yogas and doshas --------------------------------------------------------

const together = (ctx, a, b) => ctx.planets[a].sign === ctx.planets[b].sign;
const mutualAspect = (ctx, a, b) => {
  const ha = ctx.planets[a].house;
  const hb = ctx.planets[b].house;
  const hits = (from, to, p) => aspectCounts(p).some((c) => ((from + c - 2) % 12) + 1 === to);
  return hits(ha, hb, a) && hits(hb, ha, b);
};
const exchange = (ctx, a, b) => SIGN_LORDS[ctx.planets[a].sign] === b && SIGN_LORDS[ctx.planets[b].sign] === a;
const associated = (ctx, a, b) => a !== b && (together(ctx, a, b) || mutualAspect(ctx, a, b) || exchange(ctx, a, b));
const relation = (ctx, a, b) => (together(ctx, a, b) ? 'conjunct' : exchange(ctx, a, b) ? 'in sign exchange' : 'in mutual aspect');

export function manglik(ctx) {
  const mars = ctx.planets.Mars;
  const fromMoon = ((mars.sign - ctx.planets.Moon.sign + 12) % 12) + 1;
  const bad = [1, 2, 4, 7, 8, 12];
  const fromLagna = !ctx.usesMoonLagna && bad.includes(mars.house);
  const fromMoonHit = bad.includes(fromMoon);
  const cancelled = ['exalted', 'in its own sign', 'in moolatrikona'].includes(mars.dignity.label);
  return { present: (fromLagna || fromMoonHit) && !cancelled, fromLagna, fromMoon: fromMoonHit, cancelled: (fromLagna || fromMoonHit) && cancelled };
}

export function findYogas(ctx) {
  const P = ctx.planets;
  const yogas = [];
  const add = (name, kind, text) => yogas.push({ name, kind, text });
  const fromMoon = (n) => ((P[n].sign - P.Moon.sign + 12) % 12) + 1;

  if (KENDRA.includes(fromMoon('Jupiter'))) {
    add('Gaja Kesari Yoga', 'good', `Jupiter is in a kendra (${ord(fromMoon('Jupiter'))}) from the Moon: wisdom, reputation and lasting good name; help arrives in difficult times.`);
  }
  if (together(ctx, 'Sun', 'Mercury') && !P.Mercury.combust) {
    add('Budha-Aditya Yoga', 'good', 'Sun and Mercury together: sharp intellect, skill in communication, business and administration.');
  } else if (together(ctx, 'Sun', 'Mercury')) {
    add('Budha-Aditya Yoga (weak)', 'neutral', 'Sun and Mercury together, but Mercury is combust: intelligence is strong but can be overshadowed by ego.');
  }
  if (associated(ctx, 'Moon', 'Mars')) {
    add('Chandra-Mangala Yoga', 'good', 'Moon and Mars connected: enterprising, earns through own effort, good with money and property.');
  }
  const MAHAPURUSHA = { Mars: 'Ruchaka', Mercury: 'Bhadra', Jupiter: 'Hamsa', Venus: 'Malavya', Saturn: 'Sasa' };
  const MAHA_TEXT = {
    Mars: 'courage, leadership, success in competitive or technical fields',
    Mercury: 'brilliant intellect, eloquence, success in business and learning',
    Jupiter: 'virtue, wisdom, respect, and a righteous, fortunate life',
    Venus: 'charm, artistic talent, luxury and a happy marriage',
    Saturn: 'authority over many, endurance, success through discipline (often later in life)',
  };
  for (const [planet, name] of Object.entries(MAHAPURUSHA)) {
    const p = P[planet];
    if (KENDRA.includes(p.house) && ['exalted', 'in its own sign', 'in moolatrikona'].includes(p.dignity.label)) {
      add(`${name} Yoga (Pancha Mahapurusha)`, 'good', `${planet} is ${p.dignity.label} in a kendra: ${MAHA_TEXT[planet]}.`);
    }
  }

  // Raja yoga: lords of a kendra and a trikona associate; a planet ruling
  // both is a yogakaraka.
  const kendraLords = new Set([4, 7, 10].map(ctx.lordOf));
  const trikonaLords = new Set([5, 9].map(ctx.lordOf));
  const lagnaLord = ctx.lordOf(1);
  for (const p of GRAHAS.slice(0, 7)) {
    if (kendraLords.has(p) && trikonaLords.has(p)) {
      add('Yogakaraka', 'good', `${p} rules both a kendra and a trikona for your ascendant: its periods are especially productive for status and success.`);
    }
  }
  const seen = new Set();
  for (const k of [...kendraLords, lagnaLord]) {
    for (const t of trikonaLords) {
      if (k === t) continue;
      const key = [k, t].sort().join('-');
      if (seen.has(key) || !associated(ctx, k, t)) continue;
      seen.add(key);
      add('Raja Yoga', 'good', `${k} (kendra lord) and ${t} (trikona lord) are ${relation(ctx, k, t)}: rise in status and authority, especially during their dashas.`);
    }
  }
  // Dhana yoga: wealth lords (2, 11) with fortune lords (1, 5, 9).
  const wealthLords = new Set([2, 11].map(ctx.lordOf));
  const fortuneLords = new Set([1, 5, 9].map(ctx.lordOf));
  const dSeen = new Set();
  for (const w of wealthLords) {
    for (const f of fortuneLords) {
      if (w === f) continue;
      const key = [w, f].sort().join('-');
      if (dSeen.has(key) || !associated(ctx, w, f)) continue;
      dSeen.add(key);
      add('Dhana Yoga', 'good', `${w} (wealth lord) and ${f} (fortune lord) are ${relation(ctx, w, f)}: capacity to accumulate wealth.`);
    }
  }
  // Viparita raja yoga: lords of 6/8/12 in 6/8/12.
  for (const h of DUSTHANA) {
    const lord = ctx.lordOf(h);
    if (DUSTHANA.includes(P[lord].house) && P[lord].house !== h) {
      add('Viparita Raja Yoga', 'good', `${ord(h)} lord ${lord} sits in the ${ord(P[lord].house)}: unexpected success that comes out of difficulty or others' losses.`);
    }
  }
  // Neecha bhanga: debilitation cancelled by the dispositor in a kendra.
  for (const n of GRAHAS.slice(0, 7)) {
    if (P[n].dignity.label !== 'debilitated') continue;
    const disp = SIGN_LORDS[P[n].sign];
    if (KENDRA.includes(P[disp].house) || KENDRA.includes(fromMoon(disp))) {
      add('Neecha Bhanga Raja Yoga', 'good', `${n} is debilitated, but its dispositor ${disp} is in a kendra: early struggle turns into notable success.`);
    }
  }
  // Kemadruma: no planets either side of the Moon.
  const nearMoon = GRAHAS.filter((n) => !['Sun', 'Moon', 'Rahu', 'Ketu'].includes(n) && [2, 12].includes(fromMoon(n)));
  if (nearMoon.length === 0) {
    const cancelled = GRAHAS.some((n) => n !== 'Moon' && !['Rahu', 'Ketu'].includes(n) && KENDRA.includes(fromMoon(n)));
    add('Kemadruma Yoga', cancelled ? 'neutral' : 'bad', cancelled
      ? 'No planets beside the Moon, but cancelled by planets in kendras from the Moon: periods of loneliness pass and support arrives.'
      : 'No planets beside the Moon: periods of emotional isolation or financial ups and downs; self-reliance is the lesson.');
  }
  const m = manglik(ctx);
  if (m.present) {
    add('Manglik (Kuja) Dosha', 'bad', `Mars is in a sensitive house from the ${[m.fromLagna && 'ascendant', m.fromMoon && 'Moon'].filter(Boolean).join(' and ')}: passion and friction in marriage; traditionally matched with another Manglik or eased after age 28.`);
  } else if (m.cancelled) {
    add('Manglik Dosha (cancelled)', 'neutral', 'Mars is in a sensitive house, but in its own or exalted sign, which cancels the dosha.');
  }
  // Kala sarpa: all seven planets on one side of the Rahu-Ketu axis.
  const rahu = P.Rahu.lon;
  const sides = GRAHAS.slice(0, 7).map((n) => norm360(P[n].lon - rahu) < 180);
  if (sides.every((s) => s) || sides.every((s) => !s)) {
    add('Kala Sarpa Yoga', 'bad', 'All planets lie on one side of the Rahu–Ketu axis: intense, fated life with sudden rises and setbacks; strong results after mid-life.');
  }
  // Sign exchanges (parivartana).
  const pSeen = new Set();
  for (const a of GRAHAS.slice(0, 7)) {
    for (const b of GRAHAS.slice(0, 7)) {
      if (a >= b || !exchange(ctx, a, b)) continue;
      const key = `${a}-${b}`;
      if (pSeen.has(key)) continue;
      pSeen.add(key);
      add('Parivartana Yoga', 'good', `${a} and ${b} exchange signs (${ord(P[a].house)} and ${ord(P[b].house)} houses): those two areas of life are bound together and support each other.`);
    }
  }
  return yogas;
}

// --- Sade Sati ---------------------------------------------------------------

const saturnSiderealSign = (date) => Math.floor(toSidereal(longitude('Saturn', date), date) / 30);

// Saturn transiting the 12th, 1st and 2nd from the natal Moon sign (~7.5 years),
// plus the 8th (Ashtama Shani) and 4th (Kantaka Shani).
export function saturnCycles(ctx, from, to) {
  const moonSign = ctx.planets.Moon.sign;
  const phaseOf = (s) => ({ 11: 'rising', 0: 'peak', 1: 'setting', 7: 'ashtama', 3: 'kantaka' })[(s - moonSign + 12) % 12];
  const spans = [];
  let cur = null;
  for (let t = from.getTime(); t <= to.getTime(); t += 7 * DAY) {
    const ph = phaseOf(saturnSiderealSign(new Date(t)));
    const kind = ph === 'rising' || ph === 'peak' || ph === 'setting' ? 'sadesati' : ph || null;
    if (cur && kind !== cur.kind) {
      cur.end = new Date(t);
      cur.phases.at(-1).end = new Date(t);
      spans.push(cur);
      cur = null;
    }
    if (kind && !cur) cur = { kind, start: new Date(t), phases: [] };
    if (cur && ph && cur.phases.at(-1)?.phase !== ph) {
      if (cur.phases.length) cur.phases.at(-1).end = new Date(t);
      cur.phases.push({ phase: ph, start: new Date(t) });
    }
  }
  if (cur) { cur.end = new Date(to); spans.push(cur); }
  // Merge spells broken by brief retrograde exits.
  const merged = [];
  for (const s of spans) {
    const prev = merged.at(-1);
    if (prev && prev.kind === s.kind && s.start - prev.end < 400 * DAY) {
      prev.end = s.end;
      const [first, ...rest] = s.phases;
      if (prev.phases.at(-1).phase === first.phase) prev.phases.at(-1).end = first.end;
      else prev.phases.push(first);
      prev.phases.push(...rest);
    } else merged.push(s);
  }
  for (const s of merged) for (const p of s.phases) p.end = p.end || s.end;
  return merged;
}

// --- Timing ------------------------------------------------------------------

// How strongly a dasha lord is tied to a life area.
export function relevance(ctx, lord, area) {
  const P = ctx.planets;
  let r = 0;
  const why = [];
  const ruled = ctx.housesRuled(lord);
  for (const h of area.houses) {
    if (ruled.includes(h)) { r += 1; why.push(`rules your ${ord(h)}`); }
    if (P[lord].house === h) { r += 1; why.push(`sits in your ${ord(h)}`); }
    else if (aspectCounts(lord).some((c) => ((P[lord].house + c - 2) % 12) + 1 === h)) r += 0.35;
  }
  for (const h of area.secondary) {
    if (ruled.includes(h)) r += 0.4;
    if (P[lord].house === h) r += 0.4;
  }
  if (area.karakas.includes(lord)) { r += 0.6; why.push('is its natural significator'); }
  // Nodes give the results of the sign lord they occupy.
  if (lord === 'Rahu' || lord === 'Ketu') {
    const disp = SIGN_LORDS[P[lord].sign];
    if (disp !== lord) r += 0.5 * relevance(ctx, disp, { ...area, karakas: [] }).score;
  }
  return { score: Math.min(r, 2.5), why };
}

export const toneOf = (ctx, lord) => clamp(ctx.strength(lord) / 2.5, -1, 1);

const DOUBLE_TRANSIT_HELP = { Jupiter: [1, 5, 7, 9], Saturn: [1, 3, 7, 10] };

// Houses (counted from lagna) touched by a transiting planet's occupation or aspect.
function transitTouches(ctx, planet, date) {
  const s = Math.floor(toSidereal(longitude(planet, date), date) / 30);
  const h = ctx.houseOfSign(s);
  return { sign: s, house: h, touched: DOUBLE_TRANSIT_HELP[planet].map((c) => ((h + c - 2) % 12) + 1) };
}

function pratyantar(antar) {
  const len = antar.end - antar.start;
  const i0 = DASHA_LORDS.indexOf(antar.lord);
  let t = antar.start.getTime();
  return DASHA_LORDS.map((_, k) => {
    const lord = DASHA_LORDS[(i0 + k) % 9];
    const l = len * DASHA_YEARS[lord] / 120;
    const p = { lord, start: new Date(t), end: new Date(t + l) };
    t += l;
    return p;
  });
}

export function dashaLevels(ctx, date) {
  const t = date.getTime();
  const maha = ctx.chart.vedic.dashas.find((p) => p.start <= t && t < p.end);
  if (!maha) return null;
  const antar = maha.sub.find((p) => p.start <= t && t < p.end);
  const praty = pratyantar(antar).find((p) => p.start <= t && t < p.end);
  return { maha, antar, praty, pratyantars: pratyantar(antar) };
}

// Monthly activation for every area. `westernHits` are transit events from
// chart.transits, mapped onto areas by their natal target.
const WESTERN_TARGETS = {
  self: ['Sun', 'Ascendant'], career: ['Midheaven', 'Saturn', 'Sun'], wealth: ['Jupiter', 'Venus'],
  love: ['Venus', 'Ascendant', 'Moon'], children: ['Jupiter', 'Sun'], home: ['Moon', 'Midheaven'],
  health: ['Sun', 'Ascendant', 'Mars'], education: ['Mercury', 'Jupiter'], travel: ['Jupiter', 'Mercury'],
  spirit: ['Jupiter', 'Moon'],
};

export function lifeTimeline(ctx, from, months, westernEvents = [], cycles = []) {
  const rows = LIFE_AREAS.map((area) => ({ area, cells: [] }));
  for (let m = 0; m < months; m++) {
    const date = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + m, 15));
    const d = dashaLevels(ctx, date);
    const jup = transitTouches(ctx, 'Jupiter', date);
    const sat = transitTouches(ctx, 'Saturn', date);
    const monthStart = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1);
    const monthEnd = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
    const sadeSati = cycles.some((c) => c.kind !== 'kantaka' && c.start <= date && date < c.end);

    for (const row of rows) {
      const { area } = row;
      const notes = [];
      let act = 0;
      let toneSum = 0;
      let toneW = 0;
      if (d) {
        for (const [lvl, period, w] of [['dasha', d.maha, 1], ['sub-period', d.antar, 0.8], ['pratyantar', d.praty, 0.35]]) {
          const rel = relevance(ctx, period.lord, area);
          if (rel.score <= 0) continue;
          act += w * rel.score;
          toneSum += w * rel.score * toneOf(ctx, period.lord);
          toneW += w * rel.score;
          if (lvl !== 'pratyantar' && rel.score >= 1) notes.push(`${period.lord} ${lvl} (${rel.why.join(', ') || 'linked'})`);
        }
        // Periods of 6th/8th/12th lords are when health needs attention.
        if (area.caution) {
          for (const [lvl, period, w] of [['dasha', d.maha, 1], ['sub-period', d.antar, 0.8]]) {
            const hit = ctx.housesRuled(period.lord).filter((h) => area.caution.includes(h));
            if (ctx.planets[period.lord].house === 8) hit.push(8);
            if (!hit.length) continue;
            act += 0.4 * w;
            toneSum -= 0.6 * w;
            toneW += 0.6 * w;
            notes.push(`${period.lord} ${lvl} activates the ${ord(hit[0])} house: look after your health`);
          }
        }
      }
      const primary = area.houses[0];
      const lordHouse = ctx.planets[ctx.lordOf(primary)].house;
      const jHit = jup.touched.includes(primary);
      const sHit = sat.touched.includes(primary);
      if (jHit) { act += 0.6; toneSum += 0.5; toneW += 0.6; }
      if (sHit) {
        act += 0.4;
        const s = UPACHAYA.includes(primary) ? 0.1 : -0.3;
        toneSum += s; toneW += 0.4;
      }
      if (jHit && sHit) { act += 0.6; notes.push(`Jupiter–Saturn double transit on your ${ord(primary)} house`); }
      else if (jHit) notes.push(`Jupiter transit supports your ${ord(primary)} house`);
      else if (sHit) notes.push(`Saturn transit tests your ${ord(primary)} house`);
      // Jupiter over the natal position of the house lord.
      if (jup.touched.includes(lordHouse) && lordHouse !== primary) { act += 0.3; toneSum += 0.15; toneW += 0.3; }
      if (sadeSati && ['health', 'home', 'career', 'self'].includes(area.id)) {
        toneSum -= 0.3; toneW += 0.3;
        if (m === 0 || !row.cells.at(-1).sade) notes.push('Saturn cycle (Sade Sati / Ashtama) adds pressure');
      }
      for (const e of westernEvents) {
        if (!WESTERN_TARGETS[area.id].includes(e.target)) continue;
        const exact = e.exact.find((x) => x >= monthStart && x < monthEnd);
        if (!exact) continue;
        act += 0.35;
        const s = e.nature === 'harmonious' ? 0.4 : e.nature === 'challenging' ? -0.3 : (e.planet === 'Jupiter' ? 0.4 : -0.1);
        toneSum += s; toneW += 0.35;
        notes.push(`${e.planet} ${e.aspect} natal ${e.target} (Western)`);
      }
      row.cells.push({ date, act, tone: toneW ? clamp(toneSum / toneW, -1, 1) : 0, notes, sade: sadeSati });
    }
  }
  // Best windows: runs of months in the top tier with a positive tone.
  for (const row of rows) {
    const acts = row.cells.map((c) => c.act).sort((a, b) => b - a);
    const threshold = Math.max(acts[Math.floor(acts.length * 0.3)] || 0, 1.6);
    const windows = [];
    let cur = null;
    row.cells.forEach((c) => {
      const hot = c.act >= threshold;
      if (hot && (!cur || Math.sign(c.tone) !== Math.sign(cur.tone))) {
        if (cur) windows.push(cur);
        cur = { start: c.date, end: c.date, tone: c.tone, peak: c.act, notes: new Set(c.notes) };
      } else if (hot) {
        cur.end = c.date;
        cur.peak = Math.max(cur.peak, c.act);
        cur.tone = (cur.tone + c.tone) / 2;
        c.notes.forEach((n) => cur.notes.add(n));
      } else if (cur) { windows.push(cur); cur = null; }
    });
    if (cur) windows.push(cur);
    row.windows = windows.map((w) => ({ ...w, notes: [...w.notes] }));
  }
  return rows;
}

// Which areas each dasha period emphasises (for reviewing past periods).
export function periodThemes(ctx, lord, n = 2) {
  return LIFE_AREAS
    .map((area) => ({ area, r: relevance(ctx, lord, area).score }))
    .filter((x) => x.r > 0)
    .sort((a, b) => b.r - a.r)
    .slice(0, n)
    .map((x) => x.area.name);
}


export const toneLabel = (t) => (t > 0.25 ? 'favourable' : t < -0.15 ? 'challenging' : 'mixed');

export const AREA_SUMMARY = {
  self: {
    strong: 'A strong ascendant: robust vitality, confidence and a personality that carries you through life.',
    good: 'Healthy self-confidence and steady vitality; you grow more sure of yourself with age.',
    mixed: 'Your sense of self develops through challenges; consistent routines keep your energy up.',
    challenged: 'Self-doubt or low energy can hold you back; discipline and self-care unlock your strength.',
  },
  career: {
    strong: 'Strong career promise: recognition, authority and steady rise in your field.',
    good: 'Good professional prospects that build through consistent effort.',
    mixed: 'Career success comes with changes of direction; persistence and timing matter.',
    challenged: 'Career needs patience: delays or obstacles early, with better results from mid-life.',
  },
  wealth: {
    strong: 'A clear capacity to earn and accumulate wealth over time.',
    good: 'Steady income with good potential for savings and assets.',
    mixed: 'Income fluctuates; careful planning turns gains into lasting wealth.',
    challenged: 'Money needs discipline: expenses and debts can outpace income without a plan.',
  },
  love: {
    strong: 'Strong promise for a loving, supportive and lasting partnership.',
    good: 'Good prospects for partnership; commitment deepens with time.',
    mixed: 'Relationships bring growth through some tests; choosing the right timing and partner matters.',
    challenged: 'Partnership may come late or need work; maturity and realistic expectations help most.',
  },
  children: {
    strong: 'Strong indications for children, creativity and joy from self-expression.',
    good: 'Good prospects for children and creative fulfilment.',
    mixed: 'Children or creative projects come with some delay or effort.',
    challenged: 'Matters of children and creativity need patience and care.',
  },
  home: {
    strong: 'A happy home life, support from family, and good chances of owning property.',
    good: 'Generally stable home and family life; property comes with effort.',
    mixed: 'Home life has phases of change or relocation; inner peace is built deliberately.',
    challenged: 'Domestic peace and property need effort; a calm home is something you create.',
  },
  health: {
    strong: 'Strong constitution and good recovery from illness.',
    good: 'Generally good health; stay consistent with routines.',
    mixed: 'Average resilience: watch stress and the body areas linked to weaker planets.',
    challenged: 'Health needs ongoing care; prevention and regular check-ups are important.',
  },
  education: {
    strong: 'Sharp intellect and strong prospects for higher learning and expertise.',
    good: 'Good learning ability; education opens doors for you.',
    mixed: 'Studies may be interrupted or change course, but practical learning is strong.',
    challenged: 'Formal education may be uneven; self-directed learning suits you better.',
  },
  travel: {
    strong: 'Strong links to travel and foreign lands; living or working abroad is well supported.',
    good: 'Good chances of meaningful travel and foreign connections.',
    mixed: 'Travel comes with mixed results; plan carefully.',
    challenged: 'Travel and moves abroad bring more cost than gain unless well planned.',
  },
  spirit: {
    strong: 'Blessed with luck, good mentors and a deep spiritual sense.',
    good: 'Good fortune and faith support you; guidance arrives when needed.',
    mixed: 'Faith and fortune grow through experience and questioning.',
    challenged: 'Luck feels earned rather than given; inner work builds lasting fortune.',
  },
};
