/* Somnia — dream dictionary page: render, filter, alpha nav, deep links */
(function () {
  'use strict';

  const list = document.getElementById('dict-list');
  const countEl = document.getElementById('dict-count');
  const filterInput = document.getElementById('dict-filter');
  const alphaNav = document.getElementById('alpha-nav');
  const chipRow = document.getElementById('category-chips');
  if (!list || typeof DREAM_DATA === 'undefined') return;

  const symbols = DREAM_DATA.symbols.slice().sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  let activeLetter = null;
  let activeCategory = null;

  const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function frameworkBlock(title, text) {
    if (!text) return '';
    return '<h4>' + title + '</h4><p>' + esc(text) + '</p>';
  }

  function entryHtml(s) {
    return (
      '<details class="dict-entry" id="' + s.id + '" data-letter="' + s.name[0].toUpperCase() + '" data-category="' + esc(s.category) + '">' +
      '<summary>' + esc(s.name) +
      '<span class="entry-meta"><span class="tag">' + esc(s.category) + '</span>' + CHEV + '</span>' +
      '</summary>' +
      '<div class="dict-body">' +
      '<p class="mt-3">' + esc(s.overview) + '</p>' +
      frameworkBlock('Psychological view', s.psychology) +
      frameworkBlock('Jungian &amp; symbolic view', s.symbolic) +
      frameworkBlock('Cultural &amp; spiritual notes', s.cultural) +
      frameworkBlock('Questions to ask yourself', s.reflect) +
      '<p class="mt-3"><a class="entry-link" href="interpreter.html">Analyze a full dream containing this symbol &rarr;</a> ' +
      '<button class="chip" type="button" data-copy-link="' + s.id + '">Copy link</button></p>' +
      '</div></details>'
    );
  }

  function render() {
    let filtered = symbols;
    const q = (filterInput && filterInput.value.trim().toLowerCase()) || '';
    if (q) {
      filtered = filtered.filter(function (s) {
        return s.name.toLowerCase().includes(q) ||
          s.keywords.some(function (k) { return k.includes(q); });
      });
    }
    if (activeLetter) {
      filtered = filtered.filter(function (s) { return s.name[0].toUpperCase() === activeLetter; });
    }
    if (activeCategory) {
      filtered = filtered.filter(function (s) { return s.category === activeCategory; });
    }
    list.innerHTML = filtered.length
      ? filtered.map(entryHtml).join('')
      : '<p class="search-empty text-center">No symbols match. Try clearing filters, or <a href="interpreter.html">describe your dream to the interpreter</a>.</p>';
    if (countEl) {
      countEl.textContent = filtered.length + ' of ' + symbols.length + ' symbols';
    }
  }

  /* Alphabet nav */
  if (alphaNav) {
    const present = new Set(symbols.map(function (s) { return s.name[0].toUpperCase(); }));
    const letters = ['All'].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    alphaNav.innerHTML = letters.map(function (l) {
      const disabled = l !== 'All' && !present.has(l) ? ' disabled' : '';
      const active = l === 'All' ? ' class="active"' : '';
      return '<button type="button" data-letter="' + l + '"' + active + disabled + '>' + l + '</button>';
    }).join('');
    alphaNav.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-letter]');
      if (!btn || btn.disabled) return;
      activeLetter = btn.dataset.letter === 'All' ? null : btn.dataset.letter;
      alphaNav.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      render();
    });
  }

  /* Category chips */
  if (chipRow) {
    const cats = Array.from(new Set(symbols.map(function (s) { return s.category; }))).sort();
    chipRow.innerHTML = '<button type="button" class="chip active" data-cat="">All categories</button>' +
      cats.map(function (c) {
        return '<button type="button" class="chip" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('');
    chipRow.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-cat]');
      if (!btn) return;
      activeCategory = btn.dataset.cat || null;
      chipRow.querySelectorAll('.chip').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      render();
    });
  }

  if (filterInput) {
    filterInput.addEventListener('input', render);
  }

  /* Copy deep links */
  list.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-copy-link]');
    if (!btn) return;
    const url = location.origin + location.pathname + '#' + btn.dataset.copyLink;
    navigator.clipboard.writeText(url).then(function () {
      window.somniaToast('Link copied to clipboard');
    }, function () {
      window.somniaToast(url);
    });
  });

  /* Deep link: open entry from hash */
  function openFromHash() {
    const id = location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el && el.classList.contains('dict-entry')) {
      el.open = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render();
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
