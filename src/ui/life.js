// "Life areas" panel: natal promise per area, timing windows, heatmap,
// yogas and Saturn cycles.
import {
  vedicContext, LIFE_AREAS, analyseArea, findYogas, saturnCycles, lifeTimeline,
  AREA_SUMMARY, toneLabel,
} from '../astro/life.js';
import { transits } from '../astro/chart.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtMonth = (d) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', timeZone: 'UTC' });
const fmtShortMonth = (d) => d.toLocaleDateString(undefined, { month: 'short', timeZone: 'UTC' });
const range = (a, b) => (a.getTime() === b.getTime() ? fmtMonth(a) : `${fmtMonth(a)} – ${fmtMonth(b)}`);
const DAY = 86400000;

const AREA_ICON = {
  self: '☉', career: '♄', wealth: '♃', love: '♀', children: '✿', home: '⌂',
  health: '✚', education: '☿', travel: '✈', spirit: '✧',
};

export function lifeData(chart, now, months = 24) {
  const ctx = vedicContext(chart);
  const cycles = saturnCycles(ctx, chart.date, new Date(now.getTime() + 40 * 365.25 * DAY));
  const western = transits(chart, now, months * 31);
  const rows = lifeTimeline(ctx, now, months, western, cycles);
  const analyses = LIFE_AREAS.map((a) => analyseArea(ctx, a));
  return { ctx, cycles, rows, analyses, yogas: findYogas(ctx) };
}

function toneColor(tone, alpha) {
  const hue = tone >= 0 ? 45 + tone * 100 : 45 + tone * 45;
  return `hsla(${hue.toFixed(0)}, 62%, 58%, ${alpha.toFixed(2)})`;
}

export function lifePanel(chart, now) {
  const { ctx, cycles, rows, analyses, yogas } = lifeData(chart, now);
  const maxAct = Math.max(...rows.flatMap((r) => r.cells.map((c) => c.act)), 1);

  const cards = analyses.map((a, i) => {
    const row = rows[i];
    const next = row.windows.find((w) => w.tone > 0.15) || row.windows[0];
    const summary = AREA_SUMMARY[a.area.id][a.band];
    return `
    <article class="card area-card">
      <header class="area-head">
        <span class="area-icon" aria-hidden="true">${AREA_ICON[a.area.id]}\uFE0E</span>
        <h3>${a.area.name}</h3>
        <span class="band ${a.band}">${a.band}</span>
      </header>
      <div class="meter" role="img" aria-label="Natal promise ${a.pct} out of 100"><i class="${a.band}" style="width:${a.pct}%"></i></div>
      <p>${summary}</p>
      ${next ? `<p class="window ${toneLabel(next.tone)}"><strong>${a.area.id === 'health' && next.tone < 0.15 ? 'Take care' : 'Key window'}: ${range(next.start, next.end)}</strong> · ${toneLabel(next.tone)}<br><span class="small">${next.notes.slice(0, 3).map(esc).join(' · ')}</span></p>` : '<p class="small">No strongly activated period in the next 24 months: a steady time for this area.</p>'}
      <details>
        <summary>Why the chart says this</summary>
        <ul class="reasons">${a.reasons.map((r) => `<li class="${r.effect > 0 ? 'plus' : r.effect < 0 ? 'minus' : 'even'}">${esc(r.text)}</li>`).join('')}</ul>
        ${row.windows.length > 1 ? `<h4>All active periods (next 24 months)</h4><ul class="compact">${row.windows.map((w) => `<li><strong>${range(w.start, w.end)}</strong> · ${toneLabel(w.tone)}: ${w.notes.slice(0, 3).map(esc).join(' · ')}</li>`).join('')}</ul>` : ''}
      </details>
    </article>`;
  }).join('');

  const months = rows[0].cells.map((c) => c.date);
  const heat = `
    <div class="heat-scroll">
      <table class="heat">
        <thead><tr><th></th>${months.map((d, i) => `<th>${i === 0 || d.getUTCMonth() === 0 ? `<b>${d.getUTCFullYear()}</b>` : ''}${fmtShortMonth(d)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((r) => `
          <tr><th>${AREA_ICON[r.area.id]}\uFE0E ${r.area.name}</th>${r.cells.map((c) => {
            const alpha = 0.08 + 0.92 * Math.min(c.act / maxAct, 1);
            const title = `${r.area.name}, ${fmtMonth(c.date)}: ${toneLabel(c.tone)}, activity ${Math.round((c.act / maxAct) * 100)}%${c.notes.length ? `\n• ${c.notes.join('\n• ')}` : ''}`;
            return `<td style="background:${toneColor(c.tone, alpha)}" title="${esc(title)}"></td>`;
          }).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="heat-legend">
      <span><i style="background:${toneColor(1, 0.9)}"></i>favourable</span>
      <span><i style="background:${toneColor(0, 0.9)}"></i>mixed / busy</span>
      <span><i style="background:${toneColor(-1, 0.9)}"></i>challenging</span>
      <span>Stronger colour = more activity. Hover or tap a cell for the reasons.</span>
    </div>`;

  const yogaHtml = yogas.length ? `<ul class="yogas">${yogas.map((y) => `
    <li class="${y.kind}"><strong>${esc(y.name)}</strong><span>${esc(y.text)}</span></li>`).join('')}</ul>`
    : '<p>No major classical yogas or doshas detected.</p>';

  const KIND = {
    sadesati: ['Sade Sati', 'Saturn passes over your natal Moon (about 7½ years): pressure, responsibility and maturing. It is hardest at the peak and often ends with solid rewards.'],
    ashtama: ['Ashtama Shani', 'Saturn in the 8th from your Moon (about 2½ years): obstacles, health and money caution.'],
    kantaka: ['Kantaka Shani', 'Saturn in the 4th from your Moon: domestic and career strain, changes of residence.'],
  };
  const relevantCycles = cycles.filter((c) => c.end > new Date(now.getTime() - 15 * 365.25 * DAY));
  const cyclesHtml = relevantCycles.map((c) => {
    const status = c.start <= now && now < c.end ? 'now' : c.start > now ? 'future' : 'past';
    const firsts = [];
    for (const p of c.phases) if (!firsts.some((f) => f.phase === p.phase)) firsts.push(p);
    return `<li class="${status}">
      <strong>${KIND[c.kind][0]}</strong> <span class="pill ${status === 'now' ? 'hot' : ''}">${status === 'now' ? 'active now' : status}</span>
      <span class="small">${fmtMonth(c.start)} – ${fmtMonth(c.end)}</span>
      ${c.kind === 'sadesati' ? `<span class="small">Phases begin: ${firsts.map((p) => `${p.phase} ${fmtMonth(p.start)}`).join(' · ')}</span>` : ''}
      <span class="small">${KIND[c.kind][1]}</span>
    </li>`;
  }).join('');

  return `
    <p class="lede small">Each area is judged the way a Vedic astrologer would: its house, the lord of that house, planets placed in or aspecting it, the natural significator, and the D9/D10 charts. Timing combines three levels of Vimshottari dasha, Jupiter–Saturn double transits, Saturn cycles and Western transits.${ctx.usesMoonLagna ? ' <strong>Birth time unknown: houses are counted from the Moon sign (Chandra lagna), which is less precise.</strong>' : ''}</p>
    <div class="grid two">${cards}</div>
    <article class="card">
      <h3>Your next 24 months at a glance</h3>
      ${heat}
    </article>
    <div class="grid two">
      <article class="card">
        <h3>Yogas & doshas</h3>
        <p class="small">Classical planetary combinations found in your chart.</p>
        ${yogaHtml}
      </article>
      <article class="card">
        <h3>Saturn cycles</h3>
        <p class="small">Saturn's transits relative to your natal Moon in the sidereal zodiac.</p>
        ${cyclesHtml ? `<ul class="cycles">${cyclesHtml}</ul>` : '<p>No Saturn cycles in this range.</p>'}
      </article>
    </div>`;
}
