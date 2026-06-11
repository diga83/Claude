/* Somnia — shared site behavior: theme, nav, search, toast, hero stars */
(function () {
  'use strict';

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const stored = localStorage.getItem('somnia-theme');
  if (stored === 'light' || stored === 'dark') {
    root.setAttribute('data-theme', stored);
  } else {
    root.setAttribute('data-theme', 'dark');
  }

  function initThemeToggle() {
    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('somnia-theme', next);
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!links.contains(e.target) && !toggle.contains(e.target) && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  window.somniaToast = function (message) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove('show');
    }, 3500);
  };

  /* ---------- Hero stars ---------- */
  function initStars() {
    const wrap = document.querySelector('.stars');
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const count = 28;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
      s.style.animationDuration = (2.4 + Math.random() * 2.4).toFixed(2) + 's';
      wrap.appendChild(s);
    }
  }

  /* ---------- Symbol search (pages that include dream-data.js) ---------- */
  function initSearch() {
    const input = document.querySelector('[data-symbol-search]');
    const results = document.querySelector('[data-search-results]');
    if (!input || !results || typeof DREAM_DATA === 'undefined') return;

    const base = input.getAttribute('data-dict-path') || 'dictionary.html';
    let activeIndex = -1;

    function render(query) {
      const q = query.trim().toLowerCase();
      activeIndex = -1;
      if (q.length < 2) {
        results.hidden = true;
        results.innerHTML = '';
        return;
      }
      const matches = DREAM_DATA.symbols
        .map(function (s) {
          let score = 0;
          if (s.name.toLowerCase().startsWith(q)) score = 3;
          else if (s.name.toLowerCase().includes(q)) score = 2;
          else if (s.keywords.some(function (k) { return k.includes(q); })) score = 1;
          return { s: s, score: score };
        })
        .filter(function (m) { return m.score > 0; })
        .sort(function (a, b) { return b.score - a.score || a.s.name.localeCompare(b.s.name); })
        .slice(0, 8);

      if (!matches.length) {
        results.innerHTML = '<div class="search-empty">No symbols found. Try the <a href="interpreter.html">Dream Interpreter</a> for a full reading.</div>';
        results.hidden = false;
        return;
      }
      results.innerHTML = matches
        .map(function (m) {
          return '<a href="' + base + '#' + m.s.id + '">' + m.s.name +
            '<span class="sr-cat">' + m.s.category + '</span></a>';
        })
        .join('');
      results.hidden = false;
    }

    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('keydown', function (e) {
      const links = results.querySelectorAll('a');
      if (!links.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = e.key === 'ArrowDown'
          ? (activeIndex + 1) % links.length
          : (activeIndex - 1 + links.length) % links.length;
        links.forEach(function (l, i) { l.classList.toggle('active', i === activeIndex); });
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        links[activeIndex].click();
      } else if (e.key === 'Escape') {
        results.hidden = true;
      }
    });
    document.addEventListener('click', function (e) {
      if (!results.contains(e.target) && e.target !== input) {
        results.hidden = true;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initNav();
    initStars();
    initSearch();
    const year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
