import './style.css';
import { buildChart, dashaAt, transits, houseTransits, progressions, solarReturn } from './astro/chart.js';
import { formatDegree } from './astro/core.js';
import { nakshatra } from './astro/vedic.js';
import { localToUtc, offsetLabel } from './astro/time.js';
import {
  SIGN_INFO, PLANET_INFO, HOUSE_INFO, BIG_THREE, placementText, aspectText, transitText,
  HOUSE_TRANSIT, PROGRESSED_MOON_SIGN, lunarPhaseName, dashaText, ord,
} from './astro/interpret.js';
import { renderWheel, renderSouthIndian } from './ui/wheel.js';

const $ = (sel, root = document) => root.querySelector(sel);
const form = $('#birth-form');
const STORE_KEY = 'astra.birth';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtDate = (d) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
const fmtMonth = (d) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });

// --- Form setup -----------------------------------------------------------

const tzSelect = $('#tz-select');
const zones = typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('timeZone') : ['UTC'];
const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
tzSelect.innerHTML = zones.map((z) => `<option ${z === localZone ? 'selected' : ''}>${esc(z)}</option>`).join('');

// Browsers list some zones under legacy names (e.g. Asia/Calcutta), so a zone
// from the geocoder may be valid yet missing from the list: add it.
function ensureZoneOption(zone) {
  if (!zone || [...tzSelect.options].some((o) => o.value === zone)) return;
  try { new Intl.DateTimeFormat('en-US', { timeZone: zone }); } catch { return; }
  tzSelect.add(new Option(zone, zone), 0);
}

form.unknownTime.addEventListener('change', () => {
  form.time.disabled = form.unknownTime.checked;
  $('#time-hint').textContent = form.unknownTime.checked
    ? 'Without a birth time we use noon: houses, Ascendant and Vedic lagna are skipped, and the Moon may be off by up to ~7°.'
    : 'An exact time (from a birth certificate) matters: the Ascendant moves about 1° every 4 minutes.';
});

let searchTimer;
let searchSeq = 0;
const suggestions = $('#suggestions');
const placeStatus = $('#place-status');

form.place.addEventListener('input', () => {
  clearTimeout(searchTimer);
  const q = form.place.value.trim();
  if (q.length < 2) { suggestions.hidden = true; return; }
  searchTimer = setTimeout(() => searchPlaces(q), 300);
});

async function searchPlaces(q) {
  const seq = ++searchSeq;
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`);
    const data = await res.json();
    if (seq !== searchSeq) return;
    const results = data.results || [];
    suggestions.innerHTML = results.map((r, i) => `<li role="option" data-i="${i}">${esc(r.name)}<small>${esc([r.admin1, r.country].filter(Boolean).join(', '))}</small></li>`).join('')
      || '<li class="none">No matches — try another spelling or enter coordinates manually.</li>';
    suggestions.hidden = false;
    suggestions.onclick = (ev) => {
      const li = ev.target.closest('li[data-i]');
      if (!li) return;
      choosePlace(results[Number(li.dataset.i)]);
    };
  } catch {
    placeStatus.textContent = 'Place search is unavailable right now — enter coordinates manually below.';
    $('#manual').open = true;
  }
}

function choosePlace(r) {
  form.place.value = [r.name, r.admin1, r.country].filter(Boolean).join(', ');
  form.lat.value = r.latitude.toFixed(4);
  form.lon.value = r.longitude.toFixed(4);
  ensureZoneOption(r.timezone);
  form.tz.value = r.timezone;
  placeStatus.textContent = `${r.latitude.toFixed(2)}°, ${r.longitude.toFixed(2)}° · ${r.timezone}`;
  suggestions.hidden = true;
}

document.addEventListener('click', (ev) => {
  if (!ev.target.closest('.place-field')) suggestions.hidden = true;
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const err = $('#form-error');
  err.textContent = '';
  const data = Object.fromEntries(new FormData(form));
  data.unknownTime = form.unknownTime.checked;
  if (!data.date) { err.textContent = 'Please enter your date of birth.'; return; }
  if (data.lat === '' || data.lon === '') { err.textContent = 'Please choose your birth place from the list, or enter coordinates manually.'; return; }
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* storage unavailable */ }
  show(data);
});

$('#edit-btn').addEventListener('click', () => {
  $('#results').hidden = true;
  $('#tabs').hidden = true;
  $('#intro').hidden = false;
  window.scrollTo(0, 0);
});

$('#tabs').addEventListener('click', (ev) => {
  const btn = ev.target.closest('button[data-tab]');
  if (btn) selectTab(btn.dataset.tab);
});

function selectTab(name) {
  document.querySelectorAll('#tabs button').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.panel').forEach((p) => { p.hidden = p.dataset.panel !== name; });
}

// --- Rendering ------------------------------------------------------------

function show(data) {
  const [year, month, day] = data.date.split('-').map(Number);
  const [hour, minute] = (data.unknownTime ? '12:00' : data.time || '12:00').split(':').map(Number);
  const date = localToUtc({ year, month, day, hour, minute }, data.tz);
  const lat = Number(data.lat);
  const lon = Number(data.lon);
  const chart = buildChart({ date, lat, lon, timeKnown: !data.unknownTime, houseSystem: data.houseSystem });
  const now = new Date();

  $('#r-title').textContent = data.name ? `${data.name}'s chart` : 'Your chart';
  $('#r-meta').textContent = `${fmtDate(date)} · ${data.unknownTime ? 'time unknown' : `${data.time} (${offsetLabel(data.tz, date)})`} · ${data.place || `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`}`;

  const panels = {
    overview: overviewPanel(chart, now),
    forecast: forecastPanel(chart, now),
    natal: natalPanel(chart),
    vedic: vedicPanel(chart, now),
    methods: methodsPanel(),
  };
  for (const [name, content] of Object.entries(panels)) {
    const panel = $(`.panel[data-panel="${name}"]`);
    panel.replaceChildren();
    if (typeof content === 'string') panel.innerHTML = content; else panel.append(content);
  }
  $('#intro').hidden = true;
  $('#results').hidden = false;
  $('#tabs').hidden = false;
  selectTab('overview');
  window.scrollTo(0, 0);
}

const pointOf = (chart, name) => chart.points.find((p) => p.name === name);

function overviewPanel(chart, now) {
  const sun = pointOf(chart, 'Sun');
  const moon = pointOf(chart, 'Moon');
  const asc = pointOf(chart, 'Ascendant');
  const big = [['Sun', sun], ['Moon', moon], ['Ascendant', asc]].filter(([, p]) => p);
  const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  for (const b of chart.bodies.slice(0, 10)) elements[SIGN_INFO[b.sign.name].element] += ['Sun', 'Moon'].includes(b.name) ? 2 : 1;
  const total = Object.values(elements).reduce((a, b) => a + b, 0);
  const dominant = Object.entries(elements).sort((a, b) => b[1] - a[1])[0][0];
  const d = dashaAt(chart, now);
  const upcoming = transits(chart, now, 120).slice(0, 3);

  return `
    <div class="grid three">
      ${big.map(([label, p]) => `
        <article class="card big">
          <div class="big-glyph">${PLANET_INFO[label].glyph}</div>
          <h3>${label} in ${p.sign.name}</h3>
          <p class="deg">${formatDegree(p.lon)}${p.house && label !== 'Ascendant' ? ` · ${ord(p.house)} house` : ''}</p>
          <p>${BIG_THREE[label](p.sign.name)}</p>
        </article>`).join('')}
      ${asc ? '' : '<article class="card big muted"><h3>Rising sign</h3><p>Needs an exact birth time.</p></article>'}
    </div>

    <div class="grid two">
      <article class="card">
        <h3>Elemental balance</h3>
        ${Object.entries(elements).map(([el, n]) => `
          <div class="bar-row"><span>${el}</span><div class="bar"><i class="${el.toLowerCase()}" style="width:${(n / total) * 100}%"></i></div><b>${Math.round((n / total) * 100)}%</b></div>`).join('')}
        <p class="small">Dominant element: <strong>${dominant}</strong>. ${{
          Fire: 'You run on enthusiasm, action and inspiration.',
          Earth: 'You are grounded, practical and results-oriented.',
          Air: 'You live in ideas, conversation and connection.',
          Water: 'You are led by feeling, intuition and empathy.',
        }[dominant]}</p>
      </article>
      <article class="card">
        <h3>Right now</h3>
        ${d ? `<p><span class="pill">Vedic dasha</span> <strong>${d.maha.lord}</strong> mahadasha, <strong>${d.antar.lord}</strong> sub-period until ${fmtDate(d.antar.end)}.</p>` : ''}
        ${upcoming.length ? `<p><span class="pill">Next transits</span></p><ul class="compact">${upcoming.map((e) => `<li><strong>${e.planet} ${e.aspect} ${e.target}</strong> — ${e.exact.length ? `exact ${fmtDate(e.exact[0])}` : `in orb until ${fmtDate(e.end)}`}</li>`).join('')}</ul>` : '<p>No major outer-planet transits in the next four months.</p>'}
        <button class="link" type="button" onclick="document.querySelector('[data-tab=forecast]').click()">See full forecast →</button>
      </article>
    </div>

    <article class="card">
      <h3>Strongest aspects in your chart</h3>
      <ul class="aspect-list">
        ${chart.aspects.slice(0, 5).map((a) => `<li><span class="asp ${a.nature}">${PLANET_INFO[a.a].glyph} ${a.name} ${PLANET_INFO[a.b].glyph}</span> ${aspectText(a.a, a.name, a.b)} <small>orb ${a.orb.toFixed(1)}°</small></li>`).join('')}
      </ul>
    </article>`;
}

function forecastPanel(chart, now) {
  const events = transits(chart, now, 365);
  const prog = progressions(chart, now);
  const phase = lunarPhaseName(prog.phase);
  const ht = houseTransits(chart, now);
  const sr = solarReturn(chart, now);
  const d = dashaAt(chart, now);
  const lordHouse = (lord) => chart.vedic.planets.find((p) => p.name === lord)?.house;
  const major = (e) => ['Saturn', 'Uranus', 'Neptune', 'Pluto'].includes(e.planet) && ['Sun', 'Moon', 'Ascendant', 'Midheaven'].includes(e.target);
  const nextAntars = d ? [...d.maha.sub, ...(chart.vedic.dashas[chart.vedic.dashas.indexOf(d.maha) + 1]?.sub || [])]
    .filter((p) => p.start > now).slice(0, 4) : [];

  return `
    <p class="lede small">Forecast from ${fmtDate(now)} for the next 12 months. Predictive astrologers combine several timing techniques and give the most weight to themes that repeat across them.</p>
    <div class="grid two">
      <article class="card">
        <h3><span class="pill">Vedic</span> Vimshottari dasha</h3>
        ${d ? `
        <p class="deg">${d.maha.lord} / ${d.antar.lord} · ${fmtMonth(d.antar.start)} – ${fmtMonth(d.antar.end)}</p>
        <p>${dashaText(d.maha.lord, chart.timeKnown ? lordHouse(d.maha.lord) : null)}</p>
        <p>Within it, the <strong>${d.antar.lord}</strong> sub-period colours events with ${dashaText(d.antar.lord, chart.timeKnown ? lordHouse(d.antar.lord) : null).replace(/^The \w+ period brings themes of /, '')}</p>
        <p class="small">Mahadasha runs ${fmtMonth(d.maha.start)} – ${fmtMonth(d.maha.end)}.</p>` : '<p>Dasha unavailable.</p>'}
        ${nextAntars.length ? `<h4>Coming sub-periods</h4><ul class="compact">${nextAntars.map((p) => `<li>${fmtMonth(p.start)}: <strong>${p.lord}</strong> — ${dashaLine(p.lord)}</li>`).join('')}</ul>` : ''}
      </article>
      <article class="card">
        <h3><span class="pill">Western</span> Progressed Moon</h3>
        <p class="deg">${formatDegree(prog.moon.lon)}${prog.moon.house ? ` · ${ord(prog.moon.house)} house` : ''}</p>
        <p>Your progressed Moon (the emotional "clock", about 2.5 years per sign) is in <strong>${prog.moon.sign.name}</strong>: ${PROGRESSED_MOON_SIGN[SIGN_INFO[prog.moon.sign.name].element]}.${prog.moon.house ? ` Emotional focus falls on ${HOUSE_INFO[prog.moon.house].area}.` : ''} It enters the next sign around <strong>${fmtMonth(prog.moonNextSign)}</strong>.</p>
        <p><strong>Progressed lunar phase: ${phase.name}.</strong> ${phase.text}</p>
        <p class="small">Progressed Sun: ${formatDegree(prog.sun.lon)}. Age ${prog.age.toFixed(1)}.</p>
      </article>
    </div>

    ${ht.length ? `<div class="grid two">${ht.map((t) => `
      <article class="card">
        <h3>${PLANET_INFO[t.planet].glyph} ${t.planet} in your ${ord(t.house)} house</h3>
        <p class="deg">Transiting ${formatDegree(t.lon)}</p>
        <p>${HOUSE_TRANSIT[t.planet](t.house)}</p>
      </article>`).join('')}</div>` : ''}

    <article class="card">
      <h3>Solar return</h3>
      <p>Your next solar return — the Sun back on its exact birth degree, starting your astrological year — is on <strong>${fmtDate(sr)}</strong> at ${sr.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} (your local time).</p>
    </article>

    <h3 class="section-title">Transit timeline · next 12 months</h3>
    ${events.length ? `<ol class="timeline">${events.map((e) => `
      <li class="${e.nature}${major(e) ? ' major' : ''}">
        <div class="when">${e.exact.length ? e.exact.map(fmtDate).join(' · ') : `Active ${fmtMonth(e.start)}`}</div>
        <div class="what">
          <h4>${PLANET_INFO[e.planet].glyph} ${e.planet} ${e.aspect} natal ${e.target} ${major(e) ? '<span class="pill hot">Major</span>' : ''}</h4>
          <p>${transitText(e)}</p>
          <p class="small">In effect ${fmtDate(e.start)} – ${fmtDate(e.end)}${e.exact.length > 1 ? ` · ${e.exact.length} exact passes (retrograde loop)` : ''}${e.ongoing ? ' · already active' : ''}</p>
        </div>
      </li>`).join('')}</ol>` : '<p>No outer-planet aspects to your personal points this year — a quieter, steady period.</p>'}`;
}

function dashaLine(lord) {
  return dashaText(lord).replace(/^The \w+ period brings themes of /, '').replace(/\.$/, '');
}

function natalPanel(chart) {
  const wrap = document.createElement('div');
  const top = document.createElement('div');
  top.className = 'grid wheel-grid';
  const wheelCard = document.createElement('article');
  wheelCard.className = 'card wheel-card';
  wheelCard.append(renderWheel(chart));
  if (!chart.timeKnown) {
    const p = document.createElement('p');
    p.className = 'small';
    p.textContent = 'Birth time unknown: houses are not shown and the wheel starts at 0° Aries.';
    wheelCard.append(p);
  }
  top.append(wheelCard);

  const table = document.createElement('article');
  table.className = 'card';
  table.innerHTML = `
    <h3>Placements</h3>
    <table class="positions">
      <thead><tr><th>Point</th><th>Position</th>${chart.houses ? '<th>House</th>' : ''}</tr></thead>
      <tbody>${chart.points.map((p) => `
        <tr><td>${PLANET_INFO[p.name].glyph} ${p.name}</td><td>${formatDegree(p.lon)}${p.retro && !p.angle && p.name !== 'North Node' ? ' <span class="retro" title="Retrograde">ʀ</span>' : ''}</td>${chart.houses ? `<td>${p.house}</td>` : ''}</tr>`).join('')}
      </tbody>
    </table>
    ${chart.houses ? `<p class="small">Houses: ${chart.houses.system === 'placidus' ? 'Placidus' : 'Whole Sign'}${chart.houses.system === 'whole' && form.houseSystem.value === 'placidus' ? ' (Placidus is undefined at polar latitudes)' : ''}.</p>
    <details><summary>House cusps</summary><ol class="cusps">${chart.houses.cusps.map((c) => `<li>${formatDegree(c)}</li>`).join('')}</ol></details>` : ''}`;
  top.append(table);
  wrap.append(top);

  const reading = document.createElement('article');
  reading.className = 'card';
  reading.innerHTML = `
    <h3>Planet by planet</h3>
    <ul class="readings">${chart.bodies.filter((b) => b.name !== 'North Node').map((b) => `<li>${placementText(b.name, b.sign.name, b.house)}${b.retro ? ' Retrograde: this energy turns inward and develops in its own time.' : ''}</li>`).join('')}</ul>
    <h3>All aspects</h3>
    <ul class="aspect-list">${chart.aspects.map((a) => `<li><span class="asp ${a.nature}">${a.a} ${a.name} ${a.b}</span> ${aspectText(a.a, a.name, a.b)} <small>orb ${a.orb.toFixed(1)}°</small></li>`).join('')}</ul>`;
  wrap.append(reading);
  return wrap;
}

function vedicPanel(chart, now) {
  const v = chart.vedic;
  const wrap = document.createElement('div');
  const top = document.createElement('div');
  top.className = 'grid two';

  const chartCard = document.createElement('article');
  chartCard.className = 'card';
  chartCard.innerHTML = '<h3>Rāśi chart (South Indian)</h3>';
  chartCard.append(renderSouthIndian(v));
  const note = document.createElement('p');
  note.className = 'small';
  note.textContent = `Sidereal zodiac, Lahiri ayanamsa ${v.ayanamsa.toFixed(4)}°. ${v.lagna ? `Lagna ${formatDegree(v.lagna.lon)}.` : 'Lagna needs a birth time.'}`;
  chartCard.append(note);
  top.append(chartCard);

  const nk = v.moonNakshatra;
  const info = document.createElement('article');
  info.className = 'card';
  info.innerHTML = `
    <h3>Janma nakshatra</h3>
    <p class="deg">${nk.name}, pada ${nk.pada} · lord ${nk.lord}</p>
    <p>Your Moon's nakshatra sets the starting point of the Vimshottari dasha: you were born in the ${nk.lord} period with ${((1 - nk.fraction) * ({ Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17 }[nk.lord])).toFixed(1)} years remaining.</p>
    <table class="positions">
      <thead><tr><th>Graha</th><th>Sidereal</th><th>Nakshatra</th>${v.lagna ? '<th>House</th>' : ''}</tr></thead>
      <tbody>${v.planets.filter((p) => !['Uranus', 'Neptune', 'Pluto'].includes(p.name)).map((p) => {
        const n = nakshatra(p.lon);
        return `<tr><td>${p.name}</td><td>${formatDegree(p.lon)}</td><td>${n.name} ${n.pada}</td>${v.lagna ? `<td>${p.house}</td>` : ''}</tr>`;
      }).join('')}</tbody>
    </table>`;
  top.append(info);
  wrap.append(top);

  const dashas = document.createElement('article');
  dashas.className = 'card';
  dashas.innerHTML = `
    <h3>Vimshottari dasha timeline</h3>
    <div class="dashas">${v.dashas.filter((m) => m.end > chart.date && m.start < new Date(chart.date.getTime() + 110 * 365.25 * 86400000)).map((m) => {
      const current = m.start <= now && now < m.end;
      return `<details ${current ? 'open' : ''} class="${current ? 'current' : ''}">
        <summary><strong>${m.lord}</strong> mahadasha <span>${fmtMonth(m.start < chart.date ? chart.date : m.start)} – ${fmtMonth(m.end)}</span></summary>
        <p class="small">${dashaText(m.lord, chart.timeKnown ? v.planets.find((p) => p.name === m.lord)?.house : null)}</p>
        <ul class="antars">${m.sub.filter((s) => s.end > chart.date).map((s) => `<li class="${s.start <= now && now < s.end ? 'current' : ''}">${m.lord}–${s.lord} <span>${fmtMonth(s.start < chart.date ? chart.date : s.start)} – ${fmtMonth(s.end)}</span></li>`).join('')}</ul>
      </details>`;
    }).join('')}</div>`;
  wrap.append(dashas);
  return wrap;
}

function methodsPanel() {
  return `
  <article class="card prose">
    <h3>How this site works</h3>
    <p><strong>1. The sky is computed, not looked up.</strong> Planet positions come from <em>astronomy-engine</em>, an implementation of the VSOP87 and ELP planetary theories. We checked it against the Swiss Ephemeris (the engine behind most professional astrology software): planets agree to within about 20 arcseconds, and house cusps agree exactly. Your local birth time is converted to UTC using the historical time-zone and daylight-saving rules for your birthplace.</p>

    <p><strong>2. Western (tropical) chart.</strong> Zodiac measured from the equinox. Houses use Placidus (the modern default) or Whole Sign (the oldest system, used in Hellenistic and Vedic astrology). Aspects use standard orbs: 8° for conjunctions and oppositions, 7° for squares and trines, 4° for sextiles, 2° tighter when no luminary is involved.</p>

    <p><strong>3. Vedic (sidereal) chart.</strong> Zodiac anchored to the stars using the Lahiri ayanamsa, the official standard of the Indian government. Houses are whole signs from the lagna, as in classical Parashari astrology.</p>

    <h3>The prediction techniques we use</h3>
    <p>These are the techniques practising astrologers rely on most for timing:</p>
    <ul>
      <li><strong>Transits:</strong> where the slow planets (Jupiter to Pluto) are now, compared with your birth chart. This is the most widely used Western forecasting method. Exact dates are found to within minutes, including the repeated passes caused by retrograde motion.</li>
      <li><strong>Secondary progressions:</strong> one day after birth stands for one year of life. The progressed Moon moves through a sign about every 2.5 years and is read as your shifting emotional focus.</li>
      <li><strong>Vimshottari dasha:</strong> the main timing system of Vedic astrology. It splits a 120-year cycle into planetary periods, starting from the Moon's nakshatra at birth.</li>
      <li><strong>Solar return:</strong> the exact moment the Sun comes back to its birth position each year.</li>
    </ul>
    <p>Professional astrologers give the most weight to themes that come up in several techniques at once. For example, a Saturn transit to your Midheaven during a Saturn dasha would be read as a strong signal about your career.</p>

    <h3>An honest note on accuracy</h3>
    <p>The <em>astronomy</em> here is precise. The <em>astrology</em> is a traditional symbolic language, and controlled studies have not found that it predicts personality or events better than chance. In a 1985 double-blind test published in <em>Nature</em>, astrologers could not match birth charts to personality profiles. Large studies of "time twins" (people born minutes apart) found no shared traits. Use your chart as a mirror for reflection and a calendar for planning. It should not replace medical, financial, legal or psychological advice.</p>
  </article>`;
}

// Restore last session.
try {
  const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
  if (saved) {
    for (const [k, val] of Object.entries(saved)) {
      const field = form.elements[k];
      if (!field) continue;
      if (k === 'tz') ensureZoneOption(val);
      if (field.type === 'checkbox') field.checked = Boolean(val); else field.value = val;
    }
    form.unknownTime.dispatchEvent(new Event('change'));
    if (saved.lat) placeStatus.textContent = `${Number(saved.lat).toFixed(2)}°, ${Number(saved.lon).toFixed(2)}° · ${saved.tz}`;
  }
} catch { /* storage unavailable */ }
