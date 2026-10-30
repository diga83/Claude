// Reference values from the Swiss Ephemeris (SE_SIDM_KRISHNAMURTI, Placidus).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { angleDiff } from '../src/astro/core.js';
import {
  kpAyanamsa, KP_SUBS, HORARY_TABLE, kpLords, kpChart, judge, eventTiming, KP_EVENTS, horary, rulingPlanets,
} from '../src/astro/kp.js';

const BIRTH = new Date(Date.UTC(1992, 2, 8, 1, 15));

test('KP ayanamsa matches Swiss Ephemeris within 2″', () => {
  const ref = [[Date.UTC(1900, 0, 1), 22.36852], [Date.UTC(1992, 0, 1), 23.65325], [Date.UTC(2026, 0, 1), 24.12496]];
  for (const [t, v] of ref) assert.ok(Math.abs(kpAyanamsa(new Date(t)) - v) < 2 / 3600);
});

test('243 subs and the 249-number horary table', () => {
  assert.equal(KP_SUBS.length, 243);
  assert.equal(HORARY_TABLE.length, 249);
  assert.deepEqual([HORARY_TABLE[0].star, HORARY_TABLE[0].sub], ['Ketu', 'Ketu']);
  assert.ok(Math.abs(HORARY_TABLE[0].end - 7 / 9) < 1e-9); // 0°46′40″
  const last = HORARY_TABLE[248];
  assert.deepEqual([last.sign, last.star, last.sub], ['Jupiter', 'Mercury', 'Saturn']);
  // Every entry stays inside one sign.
  for (const h of HORARY_TABLE) assert.equal(Math.floor(h.start / 30), Math.floor((h.end - 1e-9) / 30));
});

test('sub lords at known degrees', () => {
  assert.deepEqual(kpLords(0.01), { sign: 'Mars', star: 'Ketu', sub: 'Ketu', subSub: 'Ketu' });
  assert.equal(kpLords(0.5).sub, 'Ketu');
  const l = kpLords(13.3333 + 0.1); // Bharani starts with a Venus sub
  assert.equal(l.star, 'Venus');
  assert.equal(l.sub, 'Venus');
});

test('KP Placidus cusps match Swiss Ephemeris within 2″', () => {
  const kp = kpChart({ date: BIRTH, lat: 19.07, lon: 72.88 });
  const ref = [320.5763, 357.4994, 28.5789, 54.9670, 80.0202, 107.3553];
  ref.forEach((v, i) => assert.ok(Math.abs(angleDiff(kp.cusps[i].lon, v)) < 2 / 3600 + 1e-4, `cusp ${i + 1}`));
});

test('event judgement and timing use the cuspal sub lord', () => {
  const kp = kpChart({ date: BIRTH, lat: 19.07, lon: 72.88 });
  const marriage = KP_EVENTS.find((e) => e.id === 'marriage');
  const j = judge(kp, marriage);
  assert.equal(j.csl, kp.cusps[6].lords.sub);
  const t = eventTiming(kp, marriage, new Date(Date.UTC(2026, 9, 30)), 12);
  for (const w of t.windows) {
    assert.ok(t.significators.includes(w.bhukti));
    for (const a of w.antaras) assert.ok(t.significators.includes(a));
  }
});

test('horary ascendant equals the chosen number\'s start', () => {
  const now = new Date(Date.UTC(2026, 9, 30, 6));
  for (const n of [1, 57, 128, 249]) {
    const h = horary(n, now, 19.07, 72.88);
    assert.ok(Math.abs(angleDiff(h.kp.cusps[0].lon, HORARY_TABLE[n - 1].start)) < 1e-4, `No. ${n}`);
  }
});

test('ruling planets day lord follows the weekday', () => {
  // 30 Oct 2026 is a Friday (Venus); noon in Mumbai.
  const rp = rulingPlanets(new Date(Date.UTC(2026, 9, 30, 6, 30)), 19.07, 72.88);
  assert.equal(rp.list[0][1], 'Venus');
});
