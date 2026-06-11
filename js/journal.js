/* Somnia — dream journal: private, localStorage-only. Entries never leave
   the browser. Supports moods, tags, lucid/recurring flags, stats,
   search, and JSON export/import. */
(function () {
  'use strict';

  const KEY = 'somnia-journal-v1';
  const form = document.getElementById('journal-form');
  const listEl = document.getElementById('journal-list');
  if (!form || !listEl) return;

  const statsEl = document.getElementById('journal-stats');
  const searchEl = document.getElementById('journal-search');
  const emptyEl = document.getElementById('journal-empty');
  const editIdEl = document.getElementById('entry-id');
  const submitBtn = document.getElementById('journal-submit');

  const MOODS = ['Peaceful', 'Joyful', 'Strange', 'Anxious', 'Scary', 'Sad'];

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function save(entries) {
    localStorage.setItem(KEY, JSON.stringify(entries));
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function fmtDate(iso) {
    const dt = new Date(iso + 'T00:00:00');
    return dt.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }

  function detectedSymbols(text) {
    if (typeof DREAM_DATA === 'undefined') return [];
    const norm = function (s) { return s.toLowerCase().replace(/[’‘]/g, "'"); };
    const t = ' ' + norm(text).replace(/[^a-z']+/g, ' ') + ' ';
    return DREAM_DATA.symbols
      .filter(function (s) {
        return s.keywords.some(function (k) { return t.indexOf(' ' + norm(k) + ' ') !== -1; });
      })
      .slice(0, 5);
  }

  function entryHtml(e) {
    const symbols = detectedSymbols(e.title + ' ' + e.text);
    const flags = [];
    if (e.lucid) flags.push('<span class="tag">Lucid</span>');
    if (e.recurring) flags.push('<span class="tag">Recurring</span>');
    if (e.nightmare) flags.push('<span class="tag" style="background: color-mix(in srgb, var(--color-danger) 16%, transparent); color: var(--color-danger);">Nightmare</span>');
    return (
      '<article class="card journal-entry" data-id="' + e.id + '">' +
      '<div class="entry-date">' + fmtDate(e.date) + (e.mood ? ' &middot; ' + esc(e.mood) : '') + '</div>' +
      '<h3>' + esc(e.title) + '</h3>' +
      (flags.length ? '<p>' + flags.join(' ') + '</p>' : '') +
      '<p class="entry-text muted">' + esc(e.text) + '</p>' +
      (e.tags && e.tags.length
        ? '<p>' + e.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join(' ') + '</p>'
        : '') +
      (symbols.length
        ? '<p class="small muted">Symbols spotted: ' + symbols.map(function (s) {
            return '<a href="dictionary.html#' + s.id + '">' + esc(s.name) + '</a>';
          }).join(', ') + '</p>'
        : '') +
      '<div class="entry-actions">' +
      '<button type="button" class="btn btn-secondary btn-sm" data-edit>Edit</button>' +
      '<button type="button" class="btn btn-danger btn-sm" data-delete>Delete</button>' +
      '</div></article>'
    );
  }

  function render() {
    const q = (searchEl && searchEl.value.trim().toLowerCase()) || '';
    let entries = load().sort(function (a, b) {
      return b.date.localeCompare(a.date) || (b.created || 0) - (a.created || 0);
    });
    if (q) {
      entries = entries.filter(function (e) {
        return (e.title + ' ' + e.text + ' ' + (e.tags || []).join(' ') + ' ' + (e.mood || ''))
          .toLowerCase().includes(q);
      });
    }
    listEl.innerHTML = entries.map(entryHtml).join('');
    if (emptyEl) emptyEl.classList.toggle('hidden', load().length > 0);
    renderStats();
  }

  function renderStats() {
    if (!statsEl) return;
    const entries = load();
    if (!entries.length) {
      statsEl.innerHTML = '';
      return;
    }
    const lucidCount = entries.filter(function (e) { return e.lucid; }).length;
    const nightmareCount = entries.filter(function (e) { return e.nightmare; }).length;

    /* Streak: consecutive days ending today or yesterday */
    const days = new Set(entries.map(function (e) { return e.date; }));
    let streak = 0;
    const cursor = new Date();
    if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setDate(cursor.getDate() - 1);
    while (days.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    const moodCounts = {};
    entries.forEach(function (e) {
      if (e.mood) moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
    });
    const maxMood = Math.max.apply(null, Object.values(moodCounts).concat([1]));

    statsEl.innerHTML =
      '<div class="stats-grid">' +
      '<div class="stat-card"><div class="stat-value">' + entries.length + '</div><div class="stat-label">Dreams logged</div></div>' +
      '<div class="stat-card"><div class="stat-value">' + streak + '</div><div class="stat-label">Day streak</div></div>' +
      '<div class="stat-card"><div class="stat-value">' + lucidCount + '</div><div class="stat-label">Lucid dreams</div></div>' +
      '<div class="stat-card"><div class="stat-value">' + nightmareCount + '</div><div class="stat-label">Nightmares</div></div>' +
      '</div>' +
      (Object.keys(moodCounts).length
        ? '<div class="card"><h3>Mood breakdown</h3><div class="bar-chart">' +
          Object.entries(moodCounts).sort(function (a, b) { return b[1] - a[1]; }).map(function (m) {
            return '<div class="bar-row"><span>' + esc(m[0]) + '</span>' +
              '<div class="bar-track"><div class="bar-fill" style="width:' + Math.round((m[1] / maxMood) * 100) + '%"></div></div>' +
              '<span class="muted">' + m[1] + '</span></div>';
          }).join('') +
          '</div></div>'
        : '');
  }

  /* Mood chips */
  const moodRow = document.getElementById('mood-row');
  let selectedMood = '';
  if (moodRow) {
    moodRow.innerHTML = MOODS.map(function (m) {
      return '<button type="button" class="chip" data-mood="' + m + '" aria-pressed="false">' + m + '</button>';
    }).join('');
    moodRow.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-mood]');
      if (!btn) return;
      selectedMood = selectedMood === btn.dataset.mood ? '' : btn.dataset.mood;
      moodRow.querySelectorAll('.chip').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.mood === selectedMood));
      });
    });
  }

  function resetForm() {
    form.reset();
    editIdEl.value = '';
    selectedMood = '';
    if (moodRow) {
      moodRow.querySelectorAll('.chip').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    }
    document.getElementById('entry-date').value = new Date().toISOString().slice(0, 10);
    submitBtn.textContent = 'Save dream';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('entry-title').value.trim();
    const text = document.getElementById('entry-text').value.trim();
    const date = document.getElementById('entry-date').value;
    const errEl = document.getElementById('journal-error');
    if (!title || !text || !date) {
      errEl.textContent = 'Please add a title, a date, and a description of your dream.';
      errEl.classList.remove('hidden');
      return;
    }
    errEl.classList.add('hidden');

    const entry = {
      id: editIdEl.value || String(Date.now()),
      created: Date.now(),
      title: title,
      text: text,
      date: date,
      mood: selectedMood,
      tags: document.getElementById('entry-tags').value.split(',')
        .map(function (t) { return t.trim(); })
        .filter(Boolean)
        .slice(0, 8),
      lucid: document.getElementById('entry-lucid').checked,
      recurring: document.getElementById('entry-recurring').checked,
      nightmare: document.getElementById('entry-nightmare').checked
    };

    const entries = load();
    const idx = entries.findIndex(function (x) { return x.id === entry.id; });
    if (idx >= 0) {
      entry.created = entries[idx].created;
      entries[idx] = entry;
      window.somniaToast('Dream updated');
    } else {
      entries.push(entry);
      window.somniaToast('Dream saved — stored only on this device');
    }
    save(entries);
    resetForm();
    render();
  });

  listEl.addEventListener('click', function (e) {
    const card = e.target.closest('.journal-entry');
    if (!card) return;
    const id = card.dataset.id;
    if (e.target.closest('[data-delete]')) {
      if (!confirm('Delete this dream entry? This cannot be undone.')) return;
      save(load().filter(function (x) { return x.id !== id; }));
      window.somniaToast('Entry deleted');
      render();
    } else if (e.target.closest('[data-edit]')) {
      const entry = load().find(function (x) { return x.id === id; });
      if (!entry) return;
      editIdEl.value = entry.id;
      document.getElementById('entry-title').value = entry.title;
      document.getElementById('entry-text').value = entry.text;
      document.getElementById('entry-date').value = entry.date;
      document.getElementById('entry-tags').value = (entry.tags || []).join(', ');
      document.getElementById('entry-lucid').checked = !!entry.lucid;
      document.getElementById('entry-recurring').checked = !!entry.recurring;
      document.getElementById('entry-nightmare').checked = !!entry.nightmare;
      selectedMood = entry.mood || '';
      if (moodRow) {
        moodRow.querySelectorAll('.chip').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b.dataset.mood === selectedMood));
        });
      }
      submitBtn.textContent = 'Update dream';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('entry-title').focus();
    }
  });

  if (searchEl) searchEl.addEventListener('input', render);

  /* Export / import */
  const exportBtn = document.getElementById('journal-export');
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      const blob = new Blob([JSON.stringify(load(), null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'somnia-dream-journal-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  const importInput = document.getElementById('journal-import');
  if (importInput) {
    importInput.addEventListener('change', function () {
      const file = importInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const incoming = JSON.parse(reader.result);
          if (!Array.isArray(incoming)) throw new Error('bad format');
          const entries = load();
          const ids = new Set(entries.map(function (e) { return e.id; }));
          let added = 0;
          incoming.forEach(function (e) {
            if (e && e.id && e.title && e.text && e.date && !ids.has(e.id)) {
              entries.push(e);
              added++;
            }
          });
          save(entries);
          render();
          window.somniaToast('Imported ' + added + ' dream' + (added === 1 ? '' : 's'));
        } catch (err) {
          window.somniaToast('Could not import — file is not a valid journal export');
        }
        importInput.value = '';
      };
      reader.readAsText(file);
    });
  }

  resetForm();
  render();
})();
