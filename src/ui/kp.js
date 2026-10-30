// KP (Krishnamurti Paddhati) panel: cuspal sub-lords, significators, event
// promise and timing, ruling planets and 1–249 horary.
import {
  kpChart, KP_EVENTS, HORARY_ONLY, KP_PLANETS, eventTiming, judge, rulingPlanets, horary,
} from '../astro/kp.js';
import { formatDegree } from '../astro/core.js';

const fmtMonth = (d) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
const ord = (n) => n + (['th', 'st', 'nd', 'rd'][(n % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][n % 100] || 'th');
const VERDICT_CLASS = { promised: 'strong', 'promised with obstacles': 'good', doubtful: 'mixed', 'not promised': 'challenged' };
const hl = (list, good, bad) => list.map((h) => `<span class="${good.includes(h) ? 'h-good' : bad.includes(h) ? 'h-bad' : ''}">${h}</span>`).join(' ');
const period = (w) => `${w.dasha}–${w.bhukti}–${w.antaras.join('/')}`;

function eventCard(kp, event, now) {
  const t = eventTiming(kp, event, now, 12);
  const risk = event.risk ? eventTiming(kp, event, now, 12, event.bad) : null;
  const shown = t.windows.slice(0, 3);
  return `
  <article class="card kp-event">
    <header class="area-head"><h3>${event.name}</h3><span class="band ${VERDICT_CLASS[t.verdict]}">${t.verdict}</span></header>
    <p class="small">${ord(event.cusp)} cusp sub lord <strong>${t.csl}</strong> (in ${t.star}'s star) signifies houses ${hl(t.sig, event.good, event.bad)}.
    Favourable: ${event.good.join(', ')}${t.event.bad.length ? ` · Negating: ${event.bad.join(', ')}` : ''}.</p>
    <p class="small">Event significators: ${t.significators.length ? t.significators.join(', ') : 'none strong'}.</p>
    ${shown.length ? `<ul class="compact kp-windows">${shown.map((w) => `<li><strong>${fmtMonth(w.start)} – ${fmtMonth(w.end)}</strong> <span class="small">${period(w)}${w.strength === 3 ? ' · all three lords agree' : ''}</span></li>`).join('')}</ul>`
      : `<p class="small">No dasha–bhukti–antara in the next 12 years where the lords signify this event${t.verdict === 'not promised' ? ', consistent with the sub lord' : ''}.</p>`}
    ${risk && risk.windows.length ? `<p class="small"><strong>Periods needing health care:</strong> ${risk.windows.slice(0, 3).map((w) => `${fmtMonth(w.start)} – ${fmtMonth(w.end)} (${period(w)})`).join(' · ')}</p>` : ''}
  </article>`;
}

function tables(kp) {
  return `
  <div class="grid two">
    <article class="card">
      <h3>Cusps (Placidus, KP ayanamsa)</h3>
      <div class="table-scroll"><table class="positions kp-table">
        <thead><tr><th>Cusp</th><th>Position</th><th>Sign</th><th>Star</th><th>Sub</th><th>S-S</th></tr></thead>
        <tbody>${kp.cusps.map((c) => `<tr><td>${c.house}</td><td>${formatDegree(c.lon)}</td><td>${c.lords.sign}</td><td>${c.lords.star}</td><td><strong>${c.lords.sub}</strong></td><td>${c.lords.subSub}</td></tr>`).join('')}</tbody>
      </table></div>
      <p class="small">KP ayanamsa ${kp.ayan.toFixed(4)}°.${kp.placidus ? '' : ' Placidus is undefined at this latitude; equal-sign cusps are used.'}</p>
    </article>
    <article class="card">
      <h3>Planets</h3>
      <div class="table-scroll"><table class="positions kp-table">
        <thead><tr><th>Planet</th><th>Position</th><th>House</th><th>Star</th><th>Sub</th><th>Signifies</th></tr></thead>
        <tbody>${KP_PLANETS.map((n) => {
          const p = kp.planets[n];
          return `<tr><td>${n}</td><td>${formatDegree(p.lon)}</td><td>${p.house}</td><td>${p.lords.star}</td><td>${p.lords.sub}</td><td title="A: ${p.levels.A} · B: ${p.levels.B} · C: ${p.levels.C} · D: ${p.levels.D}">${p.signifies.join(', ')}</td></tr>`;
        }).join('')}</tbody>
      </table></div>
      <p class="small">Significations combine: houses occupied by its star lord, its own house, houses owned by its star lord, and houses it owns. Rahu and Ketu also carry their sign lord's houses.</p>
    </article>
  </div>
  <article class="card">
    <h3>House significators</h3>
    <div class="table-scroll"><table class="positions kp-table">
      <thead><tr><th>House</th><th>1 · in star of occupants</th><th>2 · occupants</th><th>3 · in star of owner</th><th>4 · owner</th></tr></thead>
      <tbody>${kp.significators.map((s) => `<tr><td>${s.house}</td><td>${s.L1.join(', ') || '—'}</td><td>${s.L2.join(', ') || '—'}</td><td>${s.L3.join(', ') || '—'}</td><td>${s.L4.join(', ')}</td></tr>`).join('')}</tbody>
    </table></div>
  </article>`;
}

export function kpPanel(chart, now) {
  const wrap = document.createElement('div');
  const kp = chart.timeKnown ? kpChart({ date: chart.date, lat: chart.lat, lon: chart.lon }) : null;
  const rp = rulingPlanets(now, chart.lat, chart.lon);

  wrap.innerHTML = `
    <p class="lede small">Krishnamurti Paddhati judges each matter by the <strong>sub lord of the relevant house cusp</strong>: if it signifies the favourable houses, the event is promised. It happens when the dasha, bhukti and antara lords are all significators of those houses.</p>
    ${kp ? `<div class="grid two">${KP_EVENTS.map((e) => eventCard(kp, e, now)).join('')}</div>${tables(kp)}`
      : '<article class="card"><h3>Birth chart needs an exact time</h3><p>KP sub lords change every few minutes of birth time, so natal KP judgement needs an accurate birth time. KP horary below works without one.</p></article>'}
    <div class="grid two">
      <article class="card">
        <h3>Ruling planets now</h3>
        <p class="small">For ${now.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })} at your birth place. KP uses ruling planets to confirm significators and fine-tune timing.</p>
        <ul class="compact">${rp.list.map(([k, v]) => `<li>${k}: <strong>${v}</strong></li>`).join('')}</ul>
      </article>
      <article class="card">
        <h3>KP horary (Prashna)</h3>
        <p class="small">Think of your question sincerely, then give the first number from 1 to 249 that comes to mind. That number fixes the ascendant of the question chart; the rest is cast for this moment.</p>
        <form class="kp-horary" autocomplete="off">
          <div class="row">
            <label class="field"><span>Number (1–249)</span><input id="kp-number" name="number" type="number" min="1" max="249" required /></label>
            <label class="field"><span>Question</span><select id="kp-question" name="question">${[...KP_EVENTS, ...HORARY_ONLY].map((e) => `<option value="${e.id}">${e.question}</option>`).join('')}</select></label>
          </div>
          <button class="primary" type="submit">Answer my question</button>
        </form>
        <div class="kp-answer" aria-live="polite"></div>
      </article>
    </div>`;

  const form = wrap.querySelector('.kp-horary');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const n = Number(form.number.value);
    const out = wrap.querySelector('.kp-answer');
    if (!(n >= 1 && n <= 249)) { out.innerHTML = '<p class="error">Enter a whole number from 1 to 249.</p>'; return; }
    const event = [...KP_EVENTS, ...HORARY_ONLY].find((e) => e.id === form.question.value);
    const when = new Date();
    const h = horary(Math.round(n), when, chart.lat, chart.lon);
    if (!h) { out.innerHTML = '<p class="error">Could not cast a horary chart for this latitude.</p>'; return; }
    const j = judge(h.kp, event);
    const rpNow = rulingPlanets(when, chart.lat, chart.lon);
    const common = j.significators.filter((p) => rpNow.set.includes(p));
    const answer = {
      promised: 'Yes. The matter is indicated.',
      'promised with obstacles': 'Yes, but with delays or conditions.',
      doubtful: 'Doubtful. The indications are weak and mixed.',
      'not promised': 'No, not in the present circumstances.',
    }[j.verdict];
    out.innerHTML = `
      <div class="window ${j.verdict === 'promised' ? 'favourable' : j.verdict === 'not promised' ? 'challenging' : ''}">
        <p><strong>${answer}</strong></p>
        <p class="small">Horary ascendant ${formatDegree(h.entry.start)} (No. ${h.entry.number}: ${h.entry.sign} sign, ${h.entry.star} star, ${h.entry.sub} sub).
        ${ord(event.cusp)} cusp sub lord <strong>${j.csl}</strong> signifies ${hl(j.sig, event.good, event.bad)}.</p>
        <p class="small">${common.length ? `Ruling planets that are also significators: <strong>${common.join(', ')}</strong>. The matter tends to fructify when the Sun or Moon transits their stars or subs.` : 'No ruling planet is a significator right now, which in KP suggests the result is not imminent.'}</p>
      </div>`;
  });
  return wrap;
}
