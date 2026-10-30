import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildChart } from '../src/astro/chart.js';
import {
  navamsaSign, dasamsaSign, dignity, vedicContext, analyseArea, LIFE_AREAS,
  findYogas, saturnCycles, lifeTimeline, dashaLevels,
} from '../src/astro/life.js';

test('navamsa follows the movable/fixed/dual starting rule', () => {
  assert.equal(navamsaSign(1), 0); // Aries 1° -> Aries (movable starts from itself)
  assert.equal(navamsaSign(30 + 1), 9); // Taurus 1° -> Capricorn (fixed starts from 9th)
  assert.equal(navamsaSign(60 + 1), 6); // Gemini 1° -> Libra (dual starts from 5th)
  assert.equal(navamsaSign(29.9), 8); // Aries 29.9° -> Sagittarius (9th part)
});

test('dasamsa counts from the 9th for even signs', () => {
  assert.equal(dasamsaSign(1), 0); // Aries -> Aries
  assert.equal(dasamsaSign(30 + 1), 9); // Taurus 1° -> Capricorn
  assert.equal(dasamsaSign(30 + 29), 6); // Taurus 29° -> Libra
});

test('dignity table', () => {
  assert.equal(dignity('Sun', 0).label, 'exalted');
  assert.equal(dignity('Sun', 6).label, 'debilitated');
  assert.equal(dignity('Saturn', 9).label, 'in its own sign');
  assert.equal(dignity('Jupiter', 8).label, 'in moolatrikona');
  assert.equal(dignity('Venus', 4).label, 'in an enemy sign');
});

// 8 Mar 1992 06:45 IST, Mumbai: Aquarius lagna, Venus is yogakaraka.
const chart = buildChart({ date: new Date(Date.UTC(1992, 2, 8, 1, 15)), lat: 19.07, lon: 72.88 });
const ctx = vedicContext(chart);

test('house lordship and yogas for a known chart', () => {
  assert.equal(ctx.lagnaIdx, 10);
  assert.equal(ctx.lordOf(7), 'Sun');
  assert.equal(ctx.planets.Mercury.dignity.label, 'debilitated');
  const names = findYogas(ctx).map((y) => y.name);
  assert.ok(names.includes('Yogakaraka'));
  assert.ok(names.includes('Neecha Bhanga Raja Yoga'));
});

test('every life area gets a bounded score and reasons', () => {
  for (const area of LIFE_AREAS) {
    const r = analyseArea(ctx, area);
    assert.ok(r.pct >= 6 && r.pct <= 96);
    assert.ok(r.reasons.length > 0);
  }
});

test('Sade Sati for an Aries Moon begins when Saturn enters sidereal Pisces (Mar 2025)', () => {
  assert.equal(ctx.planets.Moon.sign, 0);
  const cycles = saturnCycles(ctx, new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2035, 0, 1)));
  const ss = cycles.find((c) => c.kind === 'sadesati');
  assert.equal(ss.start.getUTCFullYear(), 2025);
  assert.ok(Math.abs(ss.start - Date.UTC(2025, 2, 29)) < 8 * 86400000);
});

test('timeline and dasha levels are consistent', () => {
  const now = new Date(Date.UTC(2026, 9, 30));
  const rows = lifeTimeline(ctx, now, 12);
  assert.equal(rows.length, LIFE_AREAS.length);
  for (const r of rows) assert.equal(r.cells.length, 12);
  const d = dashaLevels(ctx, now);
  assert.ok(d.praty.start <= now && now < d.praty.end);
  assert.ok(d.antar.start <= d.praty.start && d.praty.end.getTime() <= d.antar.end.getTime() + 1);
});
