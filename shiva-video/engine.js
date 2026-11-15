// Deterministic, seekable player. window.seek(t) renders the exact frame for time t (seconds).
(function () {
  const TLD = window.TL, root = document.getElementById('shots'), dyn = document.getElementById('dyn');
  const cap = document.getElementById('cap'), chap = document.getElementById('chap'), hch = document.getElementById('hch'), hdr = document.getElementById('hdr');
  const XF = 0.7; // crossfade seconds
  const els = [];
  let css = '';
  TLD.shots.forEach((sh, i) => {
    const next = TLD.shots[i + 1];
    sh.vis0 = i ? sh.start - XF : -1; sh.vis1 = next ? next.start : TLD.total;
    const dur = sh.vis1 - sh.start + 0.05;
    CTX = { css: '', dur, n: 0, id: i };
    const ctx = { dur, L: sh.lines.map(l => l.t - sh.start), E: sh.lines.map(l => l.t + l.dur - sh.start), W: (li, wi) => sh.lines[li].t + sh.lines[li].words[wi].t - sh.start, pre: sh.pre || 0, i };
    // find word time by text
    ctx.at = (word, li) => { for (let a = (li ?? 0); a < sh.lines.length; a++) { const w = sh.lines[a].words.find(w => w.w.toLowerCase().replace(/[^a-z]/g, '').startsWith(word.toLowerCase())); if (w) return sh.lines[a].t + w.t - sh.start; if (li != null) break; } console.warn('word not found', word, sh.id); return 0; };
    const fn = SHOTS[sh.id] || SHOTS._missing;
    const html = fn(ctx);
    css += CTX.css;
    const el = document.createElement('div'); el.className = 'shot'; el.style.setProperty('--dur', dur + 's'); el.innerHTML = html; el.dataset.id = sh.id;
    root.appendChild(el); els.push(el);
  });
  dyn.textContent = css;
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = x => x * x * (3 - 2 * x);
  let lastCap = null;
  window.seek = function (t) {
    TLD.shots.forEach((sh, i) => {
      const el = els[i], on = t >= sh.vis0 && t < sh.vis1;
      if (!on) { if (el.style.display !== 'none') el.style.display = 'none'; return; }
      el.style.display = 'block';
      el.style.opacity = i === 0 ? 1 : ease(clamp((t - sh.vis0) / XF));
      el.style.zIndex = i;
      const lt = Math.max(0, (t - sh.start)) * 1000;
      for (const a of el.getAnimations({ subtree: true })) { if (a.playState !== 'paused') a.pause(); a.currentTime = lt; }
    });
    document.getElementById('stage').style.filter = t < 1.2 || t > TLD.total - 2 ? `brightness(${clamp(Math.min(t / 1.2, (TLD.total - 0.3 - t) / 1.7))})` : '';
    // header chapter
    let cur = TLD.shots[0]; for (const sh of TLD.shots) if (t >= sh.start - XF / 2) cur = sh;
    hch.textContent = cur.ch.toUpperCase();
    hdr.style.opacity = clamp((t - 1) / 1.5) * (1 - clamp((t - (TLD.total - 6)) / 2));
    // chapter card
    let co = 0;
    for (const c of TLD.chapters) { if (t >= c.t && t < c.t + c.d) { const x = t - c.t; co = clamp(x / 0.7) * clamp((c.d - x) / 0.6); if (chap.dataset.k !== c.name) { chap.dataset.k = c.name; chap.innerHTML = `<small>CHAPTER ${c.roman}</small><b>${c.name}</b><u></u>`; } chap.style.transform = `translateY(${(1 - ease(clamp(x / 0.9))) * 26}px)`; } }
    chap.style.opacity = co;
    // captions: current chunk
    let found = null;
    for (const sh of TLD.shots) for (const l of sh.lines) if (t >= l.t - 0.05 && t < l.t + l.dur + 0.45) found = l;
    if (!found) { cap.style.opacity = 0; lastCap = null; return; }
    const lt = t - found.t; let ci = 0;
    for (const w of found.words) if (lt >= w.t - 0.06) ci = w.c;
    const key = found.t + ':' + ci;
    const ws = found.words.filter(w => w.c === ci);
    if (key !== lastCap) { lastCap = key; cap.innerHTML = ws.map(w => `<${w.em ? 'i' : 'span'}>${w.w} </${w.em ? 'i' : 'span'}>`).join(''); }
    [...cap.children].forEach((n, j) => { const x = ease(clamp((lt - ws[j].t + 0.08) / 0.22)); n.style.opacity = x; n.style.transform = `translateY(${(1 - x) * 14}px)`; });
    cap.style.opacity = clamp((found.t + found.dur + 0.45 - t) / 0.3);
  };
  window.READY = document.fonts.ready.then(() => { seek(0); return true; });
  // live preview with audio when opened directly
  if (location.hash !== '#render') {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080); document.getElementById('stage').style.transform = `scale(${s})`;
    const au = new Audio('build/final_audio.m4a'); let t0 = null, off = parseFloat((location.hash.match(/t=([\d.]+)/) || [])[1] || 0);
    const loop = () => { const t = au.paused && t0 == null ? off : (au.currentTime || (performance.now() - t0) / 1000 + off); seek(Math.min(t, TLD.total - 0.01)); requestAnimationFrame(loop); };
    document.body.addEventListener('click', () => { au.currentTime = off; au.play().catch(() => { t0 = performance.now(); }); t0 = performance.now(); }, { once: true });
    window.READY.then(loop);
  }
})();
