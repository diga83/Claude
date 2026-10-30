// Reference values computed with the Swiss Ephemeris (Moshier mode).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { longitude, houses, angleDiff, houseOf } from '../src/astro/core.js';
import { toSidereal, nakshatra, vimshottari, currentDasha } from '../src/astro/vedic.js';
import { localToUtc } from '../src/astro/time.js';
import { buildChart, transits, solarReturn } from '../src/astro/chart.js';

const NYC = new Date(Date.UTC(1990, 4, 15, 12, 30));
const close = (a, b, tol, msg) => assert.ok(Math.abs(angleDiff(a, b)) <= tol, `${msg}: ${a} vs ${b}`);

test('planet longitudes match Swiss Ephemeris within 30″', () => {
  const ref = { Sun: 54.4162, Moon: 297.4193, Mercury: 38.01, Venus: 12.8421, Mars: 348.3493, Jupiter: 99.5456, Saturn: 295.2491, Uranus: 279.1834, Neptune: 284.3526, Pluto: 226.1669 };
  for (const [body, lon] of Object.entries(ref)) close(longitude(body, NYC), lon, 30 / 3600, body);
});

test('Placidus cusps match Swiss Ephemeris (north and south hemispheres)', () => {
  const nyc = [97.4791, 117.0988, 138.5688, 165.3107, 200.3307, 241.0298, 277.4791, 297.0988, 318.5688, 345.3107, 20.3307, 61.0298];
  houses(NYC, 40.7, -74).cusps.forEach((c, i) => close(c, nyc[i], 0.001, `NYC cusp ${i + 1}`));
  const syd = [322.0658, 346.046, 14.5523, 47.1502, 81.032, 113.0579, 142.0658, 166.046, 194.5523, 227.1502, 261.032, 293.0579];
  houses(new Date(Date.UTC(2010, 10, 3, 2, 5)), -33.87, 151.2).cusps.forEach((c, i) => close(c, syd[i], 0.001, `Sydney cusp ${i + 1}`));
});

test('Placidus falls back to whole sign inside the polar circle', () => {
  const h = houses(new Date(Date.UTC(2000, 5, 21, 12)), 78.2, 15.6);
  assert.equal(h.system, 'whole');
  assert.equal(houseOf(h.cusps[0] + 1, h.cusps), 1);
});

test('Lahiri sidereal Moon matches Swiss Ephemeris within 30″', () => {
  close(toSidereal(longitude('Moon', NYC), NYC), 273.6935, 30 / 3600, 'sidereal Moon');
});

test('nakshatra and Vimshottari dasha sequence', () => {
  const nk = nakshatra(273.6935);
  assert.equal(nk.name, 'Uttara Ashadha');
  assert.equal(nk.lord, 'Sun');
  const periods = vimshottari(NYC, 273.6935);
  assert.deepEqual(periods.map((p) => p.lord), ['Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus']);
  const years = (periods.at(-1).end - periods[0].start) / (365.25 * 86400000);
  assert.ok(Math.abs(years - 120) < 1e-9);
  assert.ok(periods[0].start < NYC && NYC < periods[0].end);
  const d = currentDasha(periods, NYC);
  assert.equal(d.maha.lord, 'Sun');
  assert.equal(d.maha.sub[0].lord, 'Sun');
});

test('local birth time converts with historical DST', () => {
  assert.equal(localToUtc({ year: 1990, month: 5, day: 15, hour: 8, minute: 30 }, 'America/New_York').toISOString(), '1990-05-15T12:30:00.000Z');
  assert.equal(localToUtc({ year: 1990, month: 1, day: 15, hour: 8, minute: 30 }, 'America/New_York').toISOString(), '1990-01-15T13:30:00.000Z');
  assert.equal(localToUtc({ year: 1975, month: 8, day: 2, hour: 5, minute: 29 }, 'Asia/Kolkata').toISOString(), '1975-08-01T23:59:00.000Z');
  assert.equal(localToUtc({ year: 2000, month: 1, day: 1, hour: 0, minute: 0 }, 5.5).toISOString(), '1999-12-31T18:30:00.000Z');
});

test('transit exact dates are genuinely exact', () => {
  const chart = buildChart({ date: NYC, lat: 40.7, lon: -74 });
  const events = transits(chart, new Date(Date.UTC(2026, 0, 1)), 365);
  assert.ok(events.length > 0);
  const angle = { conjunction: 0, sextile: 60, square: 90, trine: 120, opposition: 180 };
  for (const e of events) {
    const target = chart.points.find((p) => p.name === e.target).lon;
    for (const t of e.exact) {
      const sep = Math.abs(angleDiff(longitude(e.planet, t), target));
      assert.ok(Math.abs(sep - angle[e.aspect]) < 0.001, `${e.planet} ${e.aspect} ${e.target}`);
    }
  }
});

test('solar return returns the Sun to its natal degree', () => {
  const chart = buildChart({ date: NYC, lat: 40.7, lon: -74 });
  const sr = solarReturn(chart, new Date(Date.UTC(2026, 0, 1)));
  assert.equal(sr.getUTCFullYear(), 2026);
  close(longitude('Sun', sr), chart.bodies[0].lon, 1 / 3600, 'solar return Sun');
});

test('chart without birth time has no houses or lagna', () => {
  const chart = buildChart({ date: NYC, lat: 40.7, lon: -74, timeKnown: false });
  assert.equal(chart.houses, null);
  assert.equal(chart.vedic.lagna, null);
  assert.ok(!chart.points.some((p) => p.name === 'Ascendant'));
});
