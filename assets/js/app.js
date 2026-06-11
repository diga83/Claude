/* ═══════════════════════════════════════════════════════════════════════════
   IGCSE ICT 4IT1 — SHARED APP LOGIC (v3)
   Navigation, theme, progress, search, Pomodoro timer, bookmarks, PWA
   ═══════════════════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'igcse_ict_progress_v2';
const THEME_KEY = 'igcse_ict_theme';
const BOOKMARKS_KEY = 'igcse_ict_bookmarks_v1';
const TIMER_KEY = 'igcse_ict_timer_v1';

const state = {
  readChapters: new Set(),
  quizScores: {},
  specProgress: {},
  theme: 'light'
};

/* ───── PERSISTENCE ───── */
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    state.readChapters = new Set(saved.readChapters || []);
    state.quizScores = saved.quizScores || {};
    state.specProgress = saved.specProgress || {};
  } catch(e) { /* localStorage unavailable or invalid */ }
  try {
    state.theme = localStorage.getItem(THEME_KEY) || 'light';
  } catch(e) {
    state.theme = 'light';
  }
  try {
    document.documentElement.setAttribute('data-theme', state.theme);
  } catch(e) {}
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      readChapters: [...state.readChapters],
      quizScores: state.quizScores,
      specProgress: state.specProgress
    }));
  } catch(e) {}
}

/* ───── THEME ───── */
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  try { localStorage.setItem(THEME_KEY, state.theme); } catch(e) {}
  updateThemeIcons();
}

function updateThemeIcons() {
  const sun = document.getElementById('sunIcon');
  const moon = document.getElementById('moonIcon');
  if (sun) sun.style.display = state.theme === 'dark' ? 'block' : 'none';
  if (moon) moon.style.display = state.theme === 'dark' ? 'none' : 'block';
}

/* ───── SIDEBAR ───── */
function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('backdrop')?.classList.toggle('show');
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('chapter-')) return 'chapter';
  if (path.includes('revision-guide')) return 'revision';
  if (path.includes('mcq')) return 'mcq';
  if (path.includes('essay')) return 'essay';
  if (path.includes('exam-papers')) return 'exam';
  if (path.includes('command-words')) return 'commandwords';
  if (path.includes('worked-examples')) return 'worked';
  if (path.includes('drill-print')) return 'drillprint';
  if (path.includes('videos')) return 'videos';
  if (path.includes('diagrams')) return 'diagrams';
  if (path.includes('explorer')) return 'explorer';
  if (path.includes('tools')) return 'tools';
  if (path.includes('summaries')) return 'summaries';
  if (path.includes('panic-kit')) return 'panic';
  if (path.includes('writing-tools')) return 'writing';
  if (path.includes('flashcards')) return 'flashcards';
  if (path.includes('mindmap-builder')) return 'mmbuilder';
  if (path.includes('mindmaps')) return 'mindmaps';
  if (path.includes('streaks')) return 'streaks';
  if (path.includes('notes')) return 'notes';
  if (path.includes('bookmarks')) return 'bookmarks';
  if (path.includes('quiz')) return 'quiz';
  if (path.includes('glossary')) return 'glossary';
  if (path.includes('progress')) return 'progress';
  return 'home';
}

function getCurrentChapterId() {
  const m = window.location.pathname.match(/chapter-(\d+)\.html/);
  return m ? parseInt(m[1], 10) : null;
}

function pathTo(file) {
  const inSub = window.location.pathname.includes('/chapters/');
  const prefix = inSub ? '../' : '';
  if (file.startsWith('chapter-')) return prefix + 'chapters/' + file;
  return prefix + file;
}

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const currentPage = getCurrentPage();
  const currentCh = getCurrentChapterId();
  const total = CHAPTERS.length;
  const read = state.readChapters.size;
  const pct = total ? Math.round((read / total) * 100) : 0;

  const navItem = (file, label, icon, color, activeKey) => {
    const active = currentPage === activeKey;
    return `<a href="${pathTo(file)}" class="nav-item ${active ? 'active' : ''}"
      style="--ch-color:${color}; --ch-light:${color}25;">
      <span class="num" style="background:${color}25; color:${color}">${icon}</span>
      ${label}
    </a>`;
  };

  let html = `
    <div class="progress-summary">
      <div class="label">${studentFirstName() ? studentFirstName() + "'s progress" : "Your progress"}</div>
      <div style="display:flex; justify-content:space-between; align-items:baseline;">
        <span class="progress-pct">${pct}%</span>
        <span style="font-size:0.78rem; color:var(--mid)">${read} of ${total} chapter${total === 1 ? '' : 's'}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div>

    <h3>Navigate</h3>
    ${navItem('index.html', 'Home', '⌂', '#1D4ED8', 'home')}
    ${navItem('revision-guide.html', 'Revision guide', '⚡', '#DC2626', 'revision')}
    ${navItem('videos.html', 'Video lessons', '🎬', '#B91C1C', 'videos')}
    ${navItem('mindmaps.html', 'Mind maps', '◈', '#3730A3', 'mindmaps')}
    ${navItem('diagrams.html', 'Interactive diagrams', '🔬', '#7C3AED', 'diagrams')}

    <h3>Practice</h3>
    ${navItem('mcq.html', 'MCQ practice', '?', '#B45309', 'mcq')}
    ${navItem('essay.html', 'Essay practice', '✎', '#0F766E', 'essay')}
    ${navItem('explorer.html', 'Question explorer', '🔎', '#1E40AF', 'explorer')}
    ${navItem('command-words.html', 'Command words', '⌘', '#7C3AED', 'commandwords')}
    ${navItem('worked-examples.html', 'Worked examples', '🎓', '#047857', 'worked')}
    ${navItem('exam-papers.html', 'Exam papers', '📝', '#B91C1C', 'exam')}
    ${navItem('drill-print.html', 'Print drill', '🖨', '#334155', 'drillprint')}
    ${navItem('flashcards.html', 'Flashcards (SRS)', '⌬', '#6D28D9', 'flashcards')}
    ${navItem('mindmap-builder.html', 'Mind map builder', '◇', '#DC2626', 'mmbuilder')}

    <h3>Tools</h3>
    ${navItem('tools.html', 'ICT calculators', '🧮', '#0F766E', 'tools')}
    ${navItem('writing-tools.html', 'Writing tools', '✏', '#15803D', 'writing')}
    ${navItem('summaries.html', 'Print summaries', '📄', '#475569', 'summaries')}
    ${navItem('panic-kit.html', 'Exam panic kit', '🚨', '#DC2626', 'panic')}

    <h3>My stuff</h3>
    ${navItem('streaks.html', 'Streaks & badges', '🔥', '#DC2626', 'streaks')}
    ${navItem('notes.html', 'Notes', '✎', '#1D4ED8', 'notes')}
    ${navItem('bookmarks.html', 'Bookmarks', '★', '#B45309', 'bookmarks')}
    ${navItem('progress.html', 'Progress', '↑', '#15803D', 'progress')}
    ${navItem('glossary.html', 'Glossary', 'A', '#0F766E', 'glossary')}

    <h3>Paper 1 — Topics 1–4</h3>
  `;

  CHAPTERS.filter(c => c.paper === 1).forEach(ch => {
    const isCurrent = currentPage === 'chapter' && currentCh === ch.id;
    const isRead = state.readChapters.has(ch.id);
    html += `<a href="${pathTo(ch.file)}" class="nav-item ${isCurrent ? 'active' : ''} ${isRead ? 'read' : ''}"
      style="--ch-color:${ch.color}; --ch-light:${ch.colorLight};">
      <span class="num">${ch.id}</span>
      <span>${ch.title}</span>
      <span class="progress-dot"></span>
    </a>`;
  });

  html += '<h3>Paper 2 — Topics 5–6</h3>';
  CHAPTERS.filter(c => c.paper === 2).forEach(ch => {
    const isCurrent = currentPage === 'chapter' && currentCh === ch.id;
    const isRead = state.readChapters.has(ch.id);
    html += `<a href="${pathTo(ch.file)}" class="nav-item ${isCurrent ? 'active' : ''} ${isRead ? 'read' : ''}"
      style="--ch-color:${ch.color}; --ch-light:${ch.colorLight};">
      <span class="num">${ch.id}</span>
      <span>${ch.title}</span>
      <span class="progress-dot"></span>
    </a>`;
  });

  sidebar.innerHTML = html;
}

/* ───── CHAPTER READ STATE ───── */
function toggleRead(chId) {
  if (state.readChapters.has(chId)) state.readChapters.delete(chId);
  else state.readChapters.add(chId);
  saveState();
  updateReadButton(chId);
  renderSidebar();
  if (state.readChapters.has(chId) && window.recordActivity) {
    window.recordActivity('reading');
  }
}

function updateReadButton(chId) {
  const btn = document.getElementById('readBtn');
  if (!btn) return;
  const isRead = state.readChapters.has(chId);
  btn.className = 'btn read-toggle' + (isRead ? ' read' : '');
  btn.textContent = isRead ? '✓ Marked as read' : '◯ Mark as read';
}

/* ───── SPEC CHECKLIST PROGRESS ───── */
function toggleSpecPoint(chId, specId, checked) {
  if (!state.specProgress[chId]) state.specProgress[chId] = [];
  if (checked) {
    if (!state.specProgress[chId].includes(specId)) state.specProgress[chId].push(specId);
  } else {
    state.specProgress[chId] = state.specProgress[chId].filter(s => s !== specId);
  }
  saveState();
}

function initSpecChecklists() {
  const chId = getCurrentChapterId();
  if (!chId) return;
  const checked = state.specProgress[chId] || [];
  document.querySelectorAll('.spec-checklist input[type="checkbox"]').forEach(cb => {
    const specId = cb.dataset.spec;
    cb.checked = checked.includes(specId);
    cb.addEventListener('change', () => toggleSpecPoint(chId, specId, cb.checked));
  });
}

/* ───── BOOKMARKS ───── */
function loadBookmarks() {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]'); }
  catch(e) { return []; }
}

function saveBookmarks(arr) {
  try { localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(arr)); } catch(e) {}
}

function toggleBookmark(chId, headingId, title) {
  const bookmarks = loadBookmarks();
  const id = `ch${chId}-${headingId}`;
  const idx = bookmarks.findIndex(b => b.id === id);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push({
      id,
      chId,
      title,
      url: pathTo(`chapter-${chId}.html`) + '#' + headingId,
      savedAt: Date.now()
    });
  }
  saveBookmarks(bookmarks);
  updateBookmarkIcon(id);
}

function updateBookmarkIcon(bookmarkId) {
  const bookmarks = loadBookmarks();
  const isBookmarked = bookmarks.some(b => b.id === bookmarkId);
  const btn = document.querySelector(`[data-bookmark-id="${bookmarkId}"]`);
  if (btn) {
    btn.textContent = isBookmarked ? '★' : '☆';
    btn.title = isBookmarked ? 'Remove bookmark' : 'Add bookmark';
    btn.style.color = isBookmarked ? '#B45309' : 'var(--mid)';
  }
}

/* ───── TEXT-TO-SPEECH (browser-native, no API needed) ───── */
let currentUtterance = null;

function ttsAvailable() {
  return 'speechSynthesis' in window;
}

function speakText(text, btn) {
  if (!ttsAvailable()) {
    alert('Sorry, your browser does not support text-to-speech.');
    return;
  }
  // If currently speaking, stop
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    // If the button clicked was the active one, just stop
    if (btn && btn._isSpeakingButton) {
      btn.innerHTML = btn._originalContent || '🔊';
      btn._isSpeakingButton = false;
      return;
    }
  }
  // Otherwise, speak the new text
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  // Prefer English voices
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
  if (englishVoice) utterance.voice = englishVoice;

  if (btn) {
    btn._originalContent = btn.innerHTML;
    btn._isSpeakingButton = true;
    btn.innerHTML = '⏸';
    btn.title = 'Stop reading';
  }

  utterance.onend = () => {
    if (btn) {
      btn.innerHTML = btn._originalContent || '🔊';
      btn._isSpeakingButton = false;
      btn.title = 'Read aloud';
    }
  };
  utterance.onerror = () => {
    if (btn) {
      btn.innerHTML = btn._originalContent || '🔊';
      btn._isSpeakingButton = false;
    }
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function makeTTSButton(getText, className) {
  const btn = document.createElement('button');
  btn.className = (className || '') + ' no-print tts-btn';
  btn.innerHTML = '🔊';
  btn.title = 'Read aloud';
  btn.style.cssText = `
    background: transparent;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    color: var(--text-mid);
    font-size: 0.9rem;
    margin-left: 0.5rem;
    vertical-align: middle;
    transition: all 0.15s;
    padding: 0;
  `;
  btn.onmouseenter = () => { btn.style.background = 'var(--surface-2)'; btn.style.borderColor = 'var(--blue)'; };
  btn.onmouseleave = () => { btn.style.background = 'transparent'; btn.style.borderColor = 'var(--border)'; };
  btn.onclick = (e) => {
    e.stopPropagation();
    const text = typeof getText === 'function' ? getText() : getText;
    speakText(text, btn);
  };
  return btn;
}

function addTTSToChapter() {
  const chId = getCurrentChapterId();
  if (!chId || !ttsAvailable()) return;

  // Add a "Read this section" button next to every h2 and h3 in chapter content
  document.querySelectorAll('.chapter-content h2, .chapter-content h3').forEach(h => {
    if (h.querySelector('.tts-btn')) return; // already has one
    // Find the text content of this section (until the next h2/h3)
    const btn = makeTTSButton(() => {
      // Get the heading text plus all following content until next heading at same/higher level
      let content = h.textContent.replace(/[☆★🔊⏸]/g, '').trim();
      let sibling = h.nextElementSibling;
      while (sibling && !['H2', 'H3'].includes(sibling.tagName)) {
        // Skip nested headings; collect text
        content += ' ' + sibling.textContent.replace(/[☆★🔊⏸]/g, '').trim();
        sibling = sibling.nextElementSibling;
      }
      return content.substring(0, 4000); // Cap to avoid extremely long playback
    });
    h.appendChild(btn);
  });

  // Add an "audio walkthrough" hero button at the top of the chapter
  const firstHeading = document.querySelector('.chapter-content h1, .chapter-content h2');
  if (firstHeading && !document.getElementById('chapterAudioBanner')) {
    const banner = document.createElement('div');
    banner.id = 'chapterAudioBanner';
    banner.className = 'no-print';
    banner.style.cssText = `display:flex; gap:0.5rem; align-items:center; padding:0.85rem 1rem; background:var(--blue-light); border-left:4px solid var(--blue); border-radius:8px; margin: 0.5rem 0 1.5rem; font-size:0.9rem;`;
    banner.innerHTML = `
      <span>🎧 <strong>Podcast mode:</strong> Have this chapter read aloud while you commute, exercise, or revise hands-free.</span>
      <button class="btn" id="playWholeChapterBtn" style="margin-left:auto; padding:0.5rem 0.9rem; font-size:0.85rem; background:var(--blue); color:white; border-color:var(--blue);">▶ Listen to chapter</button>
    `;
    firstHeading.parentNode.insertBefore(banner, firstHeading);
    document.getElementById('playWholeChapterBtn').onclick = () => {
      const btn = document.getElementById('playWholeChapterBtn');
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        btn.textContent = '▶ Listen to chapter';
        return;
      }
      const content = document.querySelector('.chapter-content');
      if (!content) return;
      const text = content.textContent.replace(/[☆★🔊⏸]/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 15000);
      btn.textContent = '⏸ Stop listening';
      speakText(text, null);
      // Reset button when finished
      const checkDone = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          btn.textContent = '▶ Listen to chapter';
          clearInterval(checkDone);
        }
      }, 500);
    };
  }
}

// Stop TTS when navigating away
window.addEventListener('beforeunload', () => {
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
});

function initBookmarkIcons() {
  const chId = getCurrentChapterId();
  if (!chId) return;
  const bookmarks = loadBookmarks();
  let headingCounter = 0;
  document.querySelectorAll('.chapter-content h2, .chapter-content h3').forEach(h => {
    headingCounter++;
    const headingId = `h-${headingCounter}`;
    h.id = headingId;
    const bookmarkId = `ch${chId}-${headingId}`;
    const isBookmarked = bookmarks.some(b => b.id === bookmarkId);
    const title = h.textContent.trim();
    const btn = document.createElement('button');
    btn.textContent = isBookmarked ? '★' : '☆';
    btn.title = isBookmarked ? 'Remove bookmark' : 'Bookmark this section';
    btn.setAttribute('data-bookmark-id', bookmarkId);
    btn.className = 'no-print bookmark-toggle';
    btn.style.cssText = `
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.3rem;
      margin-left: 0.6rem;
      vertical-align: middle;
      color: ${isBookmarked ? '#B45309' : '#94A3B8'};
      transition: transform 0.15s, color 0.15s;
      padding: 0.15rem 0.4rem;
      border-radius: 6px;
      line-height: 1;
      opacity: ${isBookmarked ? '1' : '0.7'};
    `;
    btn.onmouseenter = () => {
      btn.style.transform = 'scale(1.25)';
      btn.style.opacity = '1';
    };
    btn.onmouseleave = () => {
      btn.style.transform = 'scale(1)';
      const bm = loadBookmarks().some(b => b.id === bookmarkId);
      btn.style.opacity = bm ? '1' : '0.7';
    };
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleBookmark(chId, headingId, title);
    };
    h.appendChild(btn);
  });
}

/* ───── SEARCH ───── */
function setupSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (query.length < 2) { results.classList.remove('show'); return; }
    const hits = [];

    CHAPTERS.forEach(ch => {
      if (ch.title.toLowerCase().includes(query) || ch.summary.toLowerCase().includes(query)) {
        hits.push({
          url: pathTo(ch.file),
          title: `Chapter ${ch.id}: ${ch.title}`,
          meta: `Paper ${ch.paper} · Spec ${ch.spec}`,
          priority: 1
        });
      }
    });

    if (typeof GLOSSARY !== 'undefined') {
      GLOSSARY.forEach(g => {
        if (g.t.toLowerCase().includes(query) || g.d.toLowerCase().includes(query)) {
          hits.push({
            url: pathTo('glossary.html') + '#term-' + encodeURIComponent(g.t),
            title: g.t,
            meta: 'Glossary — ' + g.d.substring(0, 80) + (g.d.length > 80 ? '…' : ''),
            priority: 2
          });
        }
      });
    }

    // Full-text chapter content search
    if (typeof CHAPTER_SEARCH_INDEX !== 'undefined') {
      CHAPTER_SEARCH_INDEX.forEach(chapter => {
        chapter.sections.forEach(section => {
          const lowerText = section.text.toLowerCase();
          const lowerHeading = section.heading.toLowerCase();
          if (lowerHeading.includes(query) || lowerText.includes(query)) {
            // Get a snippet around the match
            let snippet = section.heading;
            const matchIdx = lowerText.indexOf(query);
            if (matchIdx >= 0) {
              const start = Math.max(0, matchIdx - 40);
              const end = Math.min(section.text.length, matchIdx + 120);
              snippet = (start > 0 ? '…' : '') + section.text.substring(start, end) + (end < section.text.length ? '…' : '');
            }
            hits.push({
              url: pathTo(`chapter-${chapter.chId}.html`) + '#' + section.id,
              title: `Ch ${chapter.chId}: ${section.heading}`,
              meta: snippet,
              priority: lowerHeading.includes(query) ? 3 : 4
            });
          }
        });
      });
    }

    // Sort by priority and deduplicate
    hits.sort((a, b) => a.priority - b.priority);
    const seen = new Set();
    const unique = hits.filter(h => {
      if (seen.has(h.url)) return false;
      seen.add(h.url);
      return true;
    });

    if (unique.length === 0) {
      results.innerHTML = `<div class="search-result"><div class="search-result-title">No results</div><div class="search-result-meta">No matches for "${query}"</div></div>`;
    } else {
      results.innerHTML = unique.slice(0, 15).map(h => `
        <a class="search-result" href="${h.url}">
          <div class="search-result-title">${highlight(h.title, query)}</div>
          <div class="search-result-meta">${highlight(h.meta, query)}</div>
        </a>
      `).join('');
    }
    results.classList.add('show');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) results.classList.remove('show');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { input.value = ''; results.classList.remove('show'); input.blur(); }
  });
}

function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

/* ───── POMODORO TIMER WIDGET ───── */
const timerState = {
  isOpen: false,
  isRunning: false,
  mode: 'work',
  remaining: 25 * 60,
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  intervalId: null,
  completedSessions: 0
};

function injectTimerWidget() {
  if (document.getElementById('pomodoroWidget')) return;

  try {
    const saved = JSON.parse(localStorage.getItem(TIMER_KEY) || '{}');
    timerState.completedSessions = saved.completedSessions || 0;
  } catch(e) {}

  const widget = document.createElement('div');
  widget.id = 'pomodoroWidget';
  widget.className = 'no-print';
  widget.innerHTML = `
    <button id="timerToggleBtn" onclick="toggleTimerWidget()" title="Study timer">
      <span id="timerIcon">⏱</span>
    </button>
    <div id="timerPanel" style="display:none;">
      <div class="timer-header">
        <strong id="timerMode">Work session</strong>
        <button onclick="toggleTimerWidget()" style="background:transparent; border:none; cursor:pointer; color:var(--mid); font-size:1.1rem;">✕</button>
      </div>
      <div class="timer-display" id="timerDisplay">25:00</div>
      <div class="timer-controls">
        <button onclick="startPauseTimer()" id="timerPlayPauseBtn" class="btn btn-primary">▶ Start</button>
        <button onclick="resetTimer()" class="btn">↻ Reset</button>
        <button onclick="skipTimer()" class="btn">⤳ Skip</button>
      </div>
      <div class="timer-config">
        <label>Work
          <input type="number" id="workMins" min="1" max="60" value="25" onchange="updateDurations()">
        </label>
        <label>Break
          <input type="number" id="breakMins" min="1" max="30" value="5" onchange="updateDurations()">
        </label>
      </div>
      <div class="timer-stats">
        Today: <strong id="timerSessions">${timerState.completedSessions}</strong> work session${timerState.completedSessions === 1 ? '' : 's'} done
      </div>
    </div>
  `;
  const style = document.createElement('style');
  style.textContent = `
    #pomodoroWidget {
      position: fixed;
      bottom: 1.25rem;
      right: 1.25rem;
      z-index: 95;
      font-family: var(--font-body);
    }
    #timerToggleBtn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #DC2626, #C2410C);
      color: white;
      border: none;
      box-shadow: 0 4px 16px rgba(220, 38, 38, 0.35);
      cursor: pointer;
      font-size: 1.5rem;
      display: grid;
      place-items: center;
      transition: transform 0.2s;
    }
    #timerToggleBtn:hover { transform: scale(1.08); }
    #timerToggleBtn.running { animation: pomoPulse 2s ease-in-out infinite; }
    @keyframes pomoPulse {
      0%, 100% { box-shadow: 0 4px 16px rgba(220, 38, 38, 0.35); }
      50% { box-shadow: 0 4px 24px rgba(220, 38, 38, 0.7); }
    }
    #timerPanel {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 280px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow-lg);
      padding: 1.25rem;
    }
    #timerPanel.break-mode { border-color: var(--green); }
    .timer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-family: var(--font-display);
    }
    .timer-display {
      font-family: var(--font-mono);
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      color: var(--text);
      margin-bottom: 1rem;
      letter-spacing: 0.02em;
    }
    .timer-controls {
      display: flex;
      gap: 0.4rem;
      margin-bottom: 1rem;
    }
    .timer-controls .btn {
      flex: 1;
      padding: 0.55rem 0.7rem;
      font-size: 0.82rem;
    }
    .timer-config {
      display: flex;
      gap: 0.6rem;
      font-size: 0.82rem;
      color: var(--text-mid);
      margin-bottom: 0.85rem;
      padding-top: 0.85rem;
      border-top: 1px solid var(--border);
    }
    .timer-config label {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .timer-config input {
      width: 100%;
      padding: 0.4rem 0.5rem;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-mono);
      font-size: 0.9rem;
    }
    .timer-stats {
      font-size: 0.82rem;
      color: var(--text-mid);
      text-align: center;
      padding-top: 0.6rem;
      border-top: 1px solid var(--border);
    }
    @media (max-width: 480px) {
      #pomodoroWidget { bottom: 0.85rem; right: 0.85rem; }
      #timerPanel { width: calc(100vw - 2rem); right: -0.6rem; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(widget);
  updateTimerDisplay();
}

function toggleTimerWidget() {
  timerState.isOpen = !timerState.isOpen;
  document.getElementById('timerPanel').style.display = timerState.isOpen ? 'block' : 'none';
}

function startPauseTimer() {
  if (timerState.isRunning) {
    clearInterval(timerState.intervalId);
    timerState.isRunning = false;
    document.getElementById('timerPlayPauseBtn').textContent = '▶ Resume';
    document.getElementById('timerToggleBtn').classList.remove('running');
  } else {
    timerState.intervalId = setInterval(tickTimer, 1000);
    timerState.isRunning = true;
    document.getElementById('timerPlayPauseBtn').textContent = '⏸ Pause';
    document.getElementById('timerToggleBtn').classList.add('running');
  }
}

function tickTimer() {
  timerState.remaining--;
  if (timerState.remaining <= 0) {
    clearInterval(timerState.intervalId);
    timerState.isRunning = false;
    document.getElementById('timerToggleBtn').classList.remove('running');

    if (timerState.mode === 'work') {
      timerState.completedSessions++;
      try { localStorage.setItem(TIMER_KEY, JSON.stringify({ completedSessions: timerState.completedSessions })); } catch(e) {}
      timerState.mode = 'break';
      timerState.remaining = timerState.breakDuration;
      alert('🎉 Work session complete! Time for a break.');
    } else {
      timerState.mode = 'work';
      timerState.remaining = timerState.workDuration;
      alert('🔔 Break over! Ready for another work session?');
    }
    document.getElementById('timerPlayPauseBtn').textContent = '▶ Start';
    updateTimerDisplay();
    return;
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const m = Math.floor(timerState.remaining / 60);
  const s = timerState.remaining % 60;
  const display = `${m}:${s.toString().padStart(2, '0')}`;
  const disp = document.getElementById('timerDisplay');
  if (disp) disp.textContent = display;
  const modeEl = document.getElementById('timerMode');
  if (modeEl) {
    modeEl.textContent = timerState.mode === 'work' ? '🍅 Work session' : '☕ Break';
    modeEl.style.color = timerState.mode === 'work' ? 'var(--red)' : 'var(--green)';
  }
  const panel = document.getElementById('timerPanel');
  if (panel) panel.classList.toggle('break-mode', timerState.mode === 'break');
  const sessEl = document.getElementById('timerSessions');
  if (sessEl) sessEl.textContent = timerState.completedSessions;
}

function resetTimer() {
  if (timerState.isRunning) clearInterval(timerState.intervalId);
  timerState.isRunning = false;
  timerState.remaining = timerState.mode === 'work' ? timerState.workDuration : timerState.breakDuration;
  document.getElementById('timerPlayPauseBtn').textContent = '▶ Start';
  document.getElementById('timerToggleBtn').classList.remove('running');
  updateTimerDisplay();
}

function skipTimer() {
  if (timerState.isRunning) clearInterval(timerState.intervalId);
  timerState.isRunning = false;
  if (timerState.mode === 'work') {
    timerState.mode = 'break';
    timerState.remaining = timerState.breakDuration;
  } else {
    timerState.mode = 'work';
    timerState.remaining = timerState.workDuration;
  }
  document.getElementById('timerPlayPauseBtn').textContent = '▶ Start';
  document.getElementById('timerToggleBtn').classList.remove('running');
  updateTimerDisplay();
}

function updateDurations() {
  const w = parseInt(document.getElementById('workMins').value, 10);
  const b = parseInt(document.getElementById('breakMins').value, 10);
  if (w >= 1 && w <= 60) timerState.workDuration = w * 60;
  if (b >= 1 && b <= 30) timerState.breakDuration = b * 60;
  if (!timerState.isRunning) {
    timerState.remaining = timerState.mode === 'work' ? timerState.workDuration : timerState.breakDuration;
    updateTimerDisplay();
  }
}

/* ───── INLINE NOTES WIDGET (chapter pages only) ───── */
const NOTES_KEY = 'igcse_ict_notes_v1';
let notesWidgetSaveTimer = null;

function getChapterNote(chId) {
  try {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    return all[chId] || { text: '', edited: null };
  } catch(e) { return { text: '', edited: null }; }
}

function saveChapterNote(chId, text) {
  let all = {};
  try { all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'); } catch(e) {}
  all[chId] = { text, edited: Date.now() };
  try { localStorage.setItem(NOTES_KEY, JSON.stringify(all)); } catch(e) {}
}

function injectNotesWidget() {
  const chId = getCurrentChapterId();
  if (!chId) return; // Only on chapter pages
  if (document.getElementById('notesWidget')) return;

  const existing = getChapterNote(chId);
  const hasContent = existing.text && existing.text.trim().length > 0;

  const widget = document.createElement('div');
  widget.id = 'notesWidget';
  widget.className = 'no-print';
  widget.innerHTML = `
    <button id="notesToggleBtn" onclick="toggleNotesWidget()" title="Take notes on this chapter">
      <span>✎</span>
      ${hasContent ? '<span class="notes-dot"></span>' : ''}
    </button>
    <div id="notesPanel" style="display:none;">
      <div class="notes-widget-header">
        <strong>📝 Notes — Chapter ${chId}</strong>
        <button onclick="toggleNotesWidget()" style="background:transparent; border:none; cursor:pointer; color:var(--mid); font-size:1.1rem;">✕</button>
      </div>
      <textarea id="notesWidgetText" placeholder="Jot down your notes for this chapter. Saves automatically..."
                oninput="onNotesWidgetInput()">${escapeHtmlForAttr(existing.text)}</textarea>
      <div class="notes-widget-footer">
        <span id="notesWidgetStatus" class="notes-saved">✓ Saved</span>
        <a class="notes-widget-link" href="${pathTo('notes.html')}#ch${chId}">Open full editor →</a>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #notesWidget {
      position: fixed;
      bottom: 1.25rem;
      right: 5.5rem;
      z-index: 95;
      font-family: var(--font-body);
    }
    #notesToggleBtn {
      position: relative;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1D4ED8, #6D28D9);
      color: white;
      border: none;
      box-shadow: 0 4px 16px rgba(29, 78, 216, 0.35);
      cursor: pointer;
      font-size: 1.5rem;
      display: grid;
      place-items: center;
      transition: transform 0.2s;
    }
    #notesToggleBtn:hover { transform: scale(1.08); }
    .notes-dot {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--green);
      border: 2px solid white;
    }
    #notesPanel {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 340px;
      max-width: calc(100vw - 2rem);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow-lg);
      padding: 1rem 1.1rem;
    }
    .notes-widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6rem;
      font-family: var(--font-display);
      font-size: 0.95rem;
    }
    #notesWidgetText {
      width: 100%;
      height: 220px;
      padding: 0.75rem 0.85rem;
      background: var(--surface-2);
      border: 1.5px solid var(--border);
      border-radius: 8px;
      font-family: var(--font-body);
      font-size: 0.92rem;
      line-height: 1.55;
      color: var(--text);
      resize: vertical;
    }
    #notesWidgetText:focus { outline: none; border-color: var(--blue); }
    .notes-widget-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.6rem;
      font-size: 0.82rem;
    }
    .notes-saved { color: var(--green); font-weight: 600; }
    .notes-saving { color: var(--amber); font-weight: 600; }
    .notes-widget-link {
      color: var(--blue);
      text-decoration: none;
      font-weight: 500;
    }
    .notes-widget-link:hover { text-decoration: underline; }
    @media (max-width: 480px) {
      #notesWidget { bottom: 0.85rem; right: 5rem; }
      #notesPanel { width: calc(100vw - 1.5rem); right: -4rem; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(widget);
}

function escapeHtmlForAttr(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toggleNotesWidget() {
  const panel = document.getElementById('notesPanel');
  if (!panel) return;
  const opening = panel.style.display === 'none';
  panel.style.display = opening ? 'block' : 'none';
  if (opening) {
    setTimeout(() => document.getElementById('notesWidgetText')?.focus(), 50);
  }
}

function onNotesWidgetInput() {
  const chId = getCurrentChapterId();
  if (!chId) return;
  const textarea = document.getElementById('notesWidgetText');
  const status = document.getElementById('notesWidgetStatus');
  if (!textarea || !status) return;
  status.textContent = '◌ Saving...';
  status.className = 'notes-saving';
  if (notesWidgetSaveTimer) clearTimeout(notesWidgetSaveTimer);
  notesWidgetSaveTimer = setTimeout(() => {
    saveChapterNote(chId, textarea.value);
    status.textContent = '✓ Saved';
    status.className = 'notes-saved';
    // Update the green dot
    const btn = document.getElementById('notesToggleBtn');
    if (btn) {
      const existing = btn.querySelector('.notes-dot');
      const hasContent = textarea.value.trim().length > 0;
      if (hasContent && !existing) {
        const dot = document.createElement('span');
        dot.className = 'notes-dot';
        btn.appendChild(dot);
      } else if (!hasContent && existing) {
        existing.remove();
      }
    }
  }, 500);
}

/* ───── TOPBAR INJECTION ───── */
function injectTopbar() {
  const existing = document.querySelector('.topbar');
  if (existing) return;

  const tb = document.createElement('header');
  tb.className = 'topbar no-print';
  tb.innerHTML = `
    <button class="menu-btn" onclick="toggleSidebar()" aria-label="Menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
    </button>
    <a href="${pathTo('index.html')}" class="brand">
      <span class="brand-mark">4IT</span>
      <span class="brand-text">
        <span>IGCSE ICT Study</span>
        <span class="sub">Edexcel 4IT1</span>
      </span>
    </a>
    <div class="search-wrap">
      <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" class="search-input" id="searchInput" placeholder="Search chapters, terms, topics..." autocomplete="off">
      <div class="search-results" id="searchResults"></div>
    </div>
    <div class="actions">
      <button class="icon-btn" onclick="window.print()" aria-label="Print this page" title="Print this page">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/></svg>
      </button>
      <button class="icon-btn" onclick="toggleTheme()" aria-label="Toggle theme" id="themeBtn">
        <svg id="sunIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        <svg id="moonIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
    </div>
  `;
  document.body.insertBefore(tb, document.body.firstChild);
}

/* ───── GLOBAL FOOTER (LEGAL DISCLAIMER) ───── */
function injectFooter() {
  if (document.querySelector('.site-footer')) return;
  const f = document.createElement('footer');
  f.className = 'site-footer no-print';
  f.innerHTML = `
    <div class="footer-inner">
      <p class="footer-author">
        <strong>IGCSE ICT 4IT1 Interactive Study Book</strong> · Author: Subhashini Sumanasekara BSc (Computing)(UK), MSc (Strategic IT)(UK), B.Ed., MA (Education Management)
      </p>
      <p class="footer-disclaimer">
        This is an independent revision resource. It is not affiliated with, endorsed by, or approved by Pearson Education Ltd or Edexcel. 'Edexcel' and 'Pearson' are trademarks of Pearson Education Ltd.
      </p>
    </div>
  `;
  // Insert at end of body — sits below main content
  document.body.appendChild(f);
}

/* ───── CHAPTER IMAGE PLACEHOLDERS ─────
   Each <figure class="fig" data-img="filename.jpg" data-caption="..."> is
   rendered as a styled "image coming soon" placeholder. When you add the real
   image file to assets/images/, this helper detects it and swaps it in
   automatically — no need to edit the chapter HTML.
   To add an image: drop the file (matching data-img) into assets/images/.
*/
function hydrateChapterImages() {
  const figs = document.querySelectorAll('figure.fig[data-img]');
  if (!figs.length) return;
  const inSub = window.location.pathname.includes('/chapters/');
  const prefix = inSub ? '../' : '';
  figs.forEach(fig => {
    const file = fig.getAttribute('data-img');
    const caption = fig.getAttribute('data-caption') || '';
    const label = fig.getAttribute('data-label') || '';
    if (!file) return;
    const src = prefix + 'assets/images/' + file;
    // Try to load the real image; if it exists, swap in. Otherwise leave placeholder.
    const probe = new Image();
    probe.onload = () => {
      fig.innerHTML =
        '<img src="' + src + '" alt="' + caption.replace(/"/g, '&quot;') + '" loading="lazy">' +
        (caption ? '<figcaption>' + (label ? '<span class="fig-label">' + label + '</span>' : '') + caption + '</figcaption>' : '');
    };
    probe.onerror = () => { /* keep placeholder */ };
    probe.src = src;
  });
}

/* ───── SERVICE WORKER REGISTRATION (PWA) ───── */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  // Service workers need an absolute path or scope; only register over http(s)
  if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
  window.addEventListener('load', () => {
    const swPath = pathTo('sw.js');
    navigator.serviceWorker.register(swPath, { scope: pathTo('') || './' })
      .then(reg => console.log('SW registered'))
      .catch(err => console.warn('SW registration failed:', err));
  });
}

/* ───── INIT ───── */
/* ═══════════════════════════════════════════════════════════════════════════
   STUDENT PROFILE — personalisation (no security)
   ═══════════════════════════════════════════════════════════════════════════ */

const PROFILE_KEY = 'igcse_ict_profile_v1';

// ─── Robust storage that works around Firefox file:// quirks ───
// Some browsers (Firefox in particular) treat subfolder file:// URLs as
// separate origins, breaking localStorage sharing between index.html and
// chapters/chapter-1.html. We mirror the profile to a cookie as a fallback.

function safeLocalGet(key) {
  try { return localStorage.getItem(key); }
  catch(e) { return null; }
}

function safeLocalSet(key, val) {
  try { localStorage.setItem(key, val); return true; }
  catch(e) { return false; }
}

function readCookie(name) {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\\/+^]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  } catch(e) { return null; }
}

function writeCookie(name, value, days) {
  try {
    const d = new Date();
    d.setTime(d.getTime() + (days || 3650) * 86400000);
    // Cookies work cross-folder on file:// in most browsers
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + d.toUTCString() + '; path=/';
  } catch(e) {}
}

function getProfile() {
  // Try localStorage first
  let raw = safeLocalGet(PROFILE_KEY);
  // Fall back to cookie if localStorage empty (Firefox file:// case)
  if (!raw) {
    raw = readCookie(PROFILE_KEY);
    // If we found in cookie but not localStorage, restore localStorage too
    if (raw) safeLocalSet(PROFILE_KEY, raw);
  }
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    return p && p.name ? p : null;
  } catch(e) { return null; }
}

function saveProfile(name, schoolOrTeacher) {
  const trimmedName = (name || '').trim();
  if (!trimmedName) return false;
  const data = JSON.stringify({
    name: trimmedName,
    school: (schoolOrTeacher || '').trim(),
    createdAt: Date.now()
  });
  // Write to BOTH localStorage AND cookie for cross-folder robustness
  safeLocalSet(PROFILE_KEY, data);
  writeCookie(PROFILE_KEY, data);
  return true;
}

function clearProfile() {
  try { localStorage.removeItem(PROFILE_KEY); } catch(e) {}
  writeCookie(PROFILE_KEY, '', -1); // expire cookie
}

// Detect if localStorage actually persists across pages (it doesn't on Firefox file:// by default)
function checkStorageWorks() {
  const TEST_KEY = '__igcse_storage_test__';
  try {
    localStorage.setItem(TEST_KEY, 'works');
    const works = localStorage.getItem(TEST_KEY) === 'works';
    localStorage.removeItem(TEST_KEY);
    return works;
  } catch(e) { return false; }
}

function studentFirstName() {
  const p = getProfile();
  if (!p) return null;
  return p.name.split(/\s+/)[0]; // first name only
}

function studentFullName() {
  const p = getProfile();
  return p ? p.name : null;
}

function showWelcomeScreen() {
  // Already has a profile? Skip.
  if (getProfile()) return;

  // Detect the Firefox file:// localStorage isolation problem.
  // On Firefox file://, localStorage is scoped per-file (privacy.file_unique_origin=true),
  // which means saving a name on index.html won't persist to chapters/chapter-1.html.
  // In that case, save anonymously and show the welcome only once per "session" via URL hash.
  const isFileProtocol = location.protocol === 'file:';
  const storageWorksHere = checkStorageWorks();
  const referrerIsFromSameSite = document.referrer && (
    document.referrer.startsWith('file://') ||
    document.referrer.includes(location.host)
  );

  // If we arrived from another page on the same site, the user has already
  // been through the welcome flow — skip showing it again, even if profile
  // didn't persist due to file:// isolation.
  if (isFileProtocol && referrerIsFromSameSite) {
    // Try to recover the name from the URL hash (set on submit)
    const hashMatch = location.hash.match(/name=([^&]+)/);
    if (hashMatch) {
      const nameFromUrl = decodeURIComponent(hashMatch[1]);
      saveProfile(nameFromUrl, '');
    }
    return; // Don't show welcome again
  }

  const overlay = document.createElement('div');
  overlay.id = 'welcomeOverlay';
  overlay.className = 'no-print';
  // Different copy if storage is broken
  const storageNote = isFileProtocol
    ? `<p class="welcome-warning" style="background:#FEF3C7; border-left:3px solid #B45309; padding:0.6rem 0.85rem; border-radius:6px; font-size:0.82rem; color:#78350F; margin: 0.5rem 0 1rem; text-align:left;">
        <strong>💡 Tip:</strong> For best results on Firefox, open this site via a local server or use Chrome/Edge. Otherwise your name &amp; progress may not persist between chapter pages.
       </p>`
    : '';
  overlay.innerHTML = `
    <div class="welcome-box">
      <div class="welcome-mark">4IT</div>
      <h1>Welcome!</h1>
      <p class="welcome-sub">Before you start studying, tell us your name. We'll use it to personalise your experience — your progress, notes, and exported files. Nothing is sent anywhere; it's stored only on this device.</p>
      ${storageNote}

      <form id="welcomeForm" onsubmit="submitWelcome(event)">
        <label class="welcome-label">
          <span>Your name <em>(required)</em></span>
          <input type="text" id="welcomeName" required autocomplete="name"
                 placeholder="e.g. Alex Patel" autofocus>
        </label>

        <label class="welcome-label">
          <span>School or teacher <em>(optional)</em></span>
          <input type="text" id="welcomeSchool" autocomplete="organization"
                 placeholder="e.g. St. Mary's School">
        </label>

        <button type="submit" class="welcome-btn">Start studying →</button>

        <p class="welcome-note">
          Your name stays on this device only. No accounts, no servers, no tracking.
          You can change or clear it later from the settings menu.
        </p>
      </form>
    </div>
  `;

  // Styles for welcome screen
  const style = document.createElement('style');
  style.textContent = `
    #welcomeOverlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: linear-gradient(135deg, #1B3A6B 0%, #6D28D9 60%, #DC2626 100%);
      display: grid;
      place-items: center;
      padding: 1rem;
      animation: welcomeFadeIn 0.4s ease;
    }
    @keyframes welcomeFadeIn { from { opacity: 0; } to { opacity: 1; } }

    .welcome-box {
      background: var(--surface);
      max-width: 480px;
      width: 100%;
      border-radius: 20px;
      padding: 2.5rem 2.25rem 2rem;
      box-shadow: 0 25px 80px -20px rgba(0,0,0,0.5);
      text-align: center;
      animation: welcomePop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes welcomePop {
      from { transform: scale(0.92) translateY(20px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }

    .welcome-mark {
      display: inline-grid;
      place-items: center;
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #1B3A6B, #6D28D9);
      color: white;
      border-radius: 18px;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }

    .welcome-box h1 {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      letter-spacing: -0.025em;
      color: var(--text);
    }

    .welcome-sub {
      color: var(--text-mid);
      line-height: 1.5;
      margin-bottom: 1.75rem;
      font-size: 0.95rem;
    }

    .welcome-label {
      display: block;
      text-align: left;
      margin-bottom: 1rem;
    }
    .welcome-label > span {
      display: block;
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--text);
      margin-bottom: 0.35rem;
    }
    .welcome-label em {
      font-style: normal;
      font-weight: 500;
      color: var(--mid);
      font-size: 0.78rem;
    }
    .welcome-label input {
      width: 100%;
      padding: 0.75rem 0.95rem;
      background: var(--surface-2);
      border: 1.5px solid var(--border);
      border-radius: 10px;
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--text);
      transition: border-color 0.15s;
    }
    .welcome-label input:focus {
      outline: none;
      border-color: #1D4ED8;
      box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15);
    }

    .welcome-btn {
      width: 100%;
      padding: 0.85rem 1rem;
      background: linear-gradient(135deg, #1D4ED8, #6D28D9);
      color: white;
      border: none;
      border-radius: 10px;
      font-family: var(--font-body);
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 0.4rem;
      transition: transform 0.1s, box-shadow 0.15s;
    }
    .welcome-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px -6px rgba(29, 78, 216, 0.5);
    }

    .welcome-note {
      font-size: 0.78rem;
      color: var(--mid);
      margin-top: 1.25rem;
      line-height: 1.55;
    }

    @media (max-width: 480px) {
      .welcome-box { padding: 2rem 1.5rem 1.5rem; border-radius: 16px; }
      .welcome-box h1 { font-size: 1.65rem; }
      .welcome-sub { font-size: 0.9rem; }
    }

    /* When welcome is showing, block scroll on body */
    body.welcome-active { overflow: hidden; }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);
  document.body.classList.add('welcome-active');
}

function submitWelcome(event) {
  event.preventDefault();
  const name = document.getElementById('welcomeName').value;
  const school = document.getElementById('welcomeSchool').value;
  if (!name.trim()) return;
  if (saveProfile(name, school)) {
    // On file:// where localStorage doesn't share between folders, propagate
    // the name via a URL hash so links to other pages can recover it.
    // We intercept link clicks once after sign-in to add the hash.
    if (location.protocol === 'file:') {
      installFileProtocolNameRelay(name);
    }

    // Remove overlay with animation
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.3s';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        document.body.classList.remove('welcome-active');
        // Re-render to show personalised content
        renderSidebar();
        injectProfileButton();
        injectGreetingIfHome();
      }, 300);
    }
  }
}

// On file:// Firefox/Safari where localStorage is per-file, append name=... to
// internal links so the welcome screen on the next page can recover the name.
function installFileProtocolNameRelay(name) {
  const encoded = encodeURIComponent(name);
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    // Skip external, mailto, javascript: links and anchors-only
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('javascript:') || href.startsWith('#')) return;
    // Skip if already has hash with name
    if (link.href.includes('name=')) return;
    // Append (or merge) into hash
    try {
      const url = new URL(link.href, location.href);
      if (url.hash) url.hash = url.hash + '&name=' + encoded;
      else url.hash = 'name=' + encoded;
      link.href = url.toString();
    } catch(_) {}
  }, true);
}

/* ───── PERSONALISED GREETING (home page hero) ───── */
function injectGreetingIfHome() {
  if (getCurrentPage() !== 'home') return;
  const profile = getProfile();
  if (!profile) return;
  const heroH1 = document.querySelector('.hero h1');
  if (!heroH1) return;
  // Don't double-inject
  if (document.querySelector('.hero-greeting')) return;
  const greeting = document.createElement('div');
  greeting.className = 'hero-greeting';
  greeting.style.cssText = `
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.6rem;
    opacity: 0.9;
    font-family: var(--font-body);
  `;
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  greeting.textContent = `${timeOfDay}, ${studentFirstName()} 👋`;
  heroH1.parentElement.insertBefore(greeting, heroH1);
}

/* ───── PROFILE MENU (clickable name in topbar) ───── */
function injectProfileButton() {
  const profile = getProfile();
  if (!profile) return;
  const actions = document.querySelector('.topbar .actions');
  if (!actions) return;
  if (document.getElementById('profileBtn')) return;

  const btn = document.createElement('button');
  btn.id = 'profileBtn';
  btn.className = 'icon-btn profile-btn';
  btn.title = `Signed in as ${profile.name}`;
  btn.innerHTML = `<span class="profile-initial">${(studentFirstName() || '?').charAt(0).toUpperCase()}</span>`;
  btn.style.cssText = `
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1D4ED8, #6D28D9);
    color: white;
    font-weight: 700;
    font-size: 0.85rem;
    display: grid;
    place-items: center;
    border: none;
    cursor: pointer;
  `;
  btn.onclick = openProfileMenu;
  actions.appendChild(btn);
}

function openProfileMenu() {
  // Remove existing
  const existing = document.getElementById('profileMenu');
  if (existing) { existing.remove(); return; }
  const profile = getProfile();
  if (!profile) return;

  const menu = document.createElement('div');
  menu.id = 'profileMenu';
  menu.className = 'no-print';
  menu.innerHTML = `
    <div class="profile-menu-header">
      <div class="profile-menu-avatar">${(studentFirstName() || '?').charAt(0).toUpperCase()}</div>
      <div>
        <div class="profile-menu-name">${escapeForHtml(profile.name)}</div>
        ${profile.school ? `<div class="profile-menu-school">${escapeForHtml(profile.school)}</div>` : ''}
      </div>
    </div>
    <div class="profile-menu-actions">
      <button onclick="closeProfileMenu(); showShortcutsOverlay();">⌨ Keyboard shortcuts</button>
      <button onclick="closeProfileMenu(); restartTour();">🎬 Restart welcome tour</button>
      <button onclick="editProfile()">✎ Change name / school</button>
      <button onclick="signOut()" style="color: var(--red);">⤴ Sign out</button>
    </div>
  `;
  menu.style.cssText = `
    position: fixed;
    top: calc(var(--header-h) + 0.5rem);
    right: 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    width: 260px;
    z-index: 200;
    overflow: hidden;
  `;
  // Inject menu CSS inline
  const css = `
    .profile-menu-header {
      padding: 1rem 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid var(--border);
      background: var(--surface-2);
    }
    .profile-menu-avatar {
      width: 42px; height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1D4ED8, #6D28D9);
      color: white;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 1.1rem;
      font-family: var(--font-display);
    }
    .profile-menu-name {
      font-weight: 700;
      font-size: 0.95rem;
    }
    .profile-menu-school {
      font-size: 0.78rem;
      color: var(--mid);
      margin-top: 0.1rem;
    }
    .profile-menu-actions button {
      display: block;
      width: 100%;
      text-align: left;
      padding: 0.75rem 1.1rem;
      background: transparent;
      border: none;
      font-family: var(--font-body);
      font-size: 0.92rem;
      cursor: pointer;
      color: var(--text);
      transition: background 0.15s;
    }
    .profile-menu-actions button:hover { background: var(--surface-2); }
  `;
  if (!document.getElementById('profileMenuCSS')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'profileMenuCSS';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }
  document.body.appendChild(menu);

  // Close on outside click
  setTimeout(() => {
    document.addEventListener('click', closeProfileMenuOnClick);
  }, 0);
}

function closeProfileMenuOnClick(e) {
  const menu = document.getElementById('profileMenu');
  if (!menu) {
    document.removeEventListener('click', closeProfileMenuOnClick);
    return;
  }
  if (!menu.contains(e.target) && e.target.id !== 'profileBtn' && !e.target.closest('#profileBtn')) {
    menu.remove();
    document.removeEventListener('click', closeProfileMenuOnClick);
  }
}

function closeProfileMenu() {
  const m = document.getElementById('profileMenu');
  if (m) m.remove();
  document.removeEventListener('click', closeProfileMenuOnClick);
}

function editProfile() {
  const menu = document.getElementById('profileMenu');
  if (menu) menu.remove();
  const profile = getProfile();
  const newName = prompt('Your name:', profile?.name || '');
  if (newName === null) return;
  if (!newName.trim()) { alert('Name cannot be empty.'); return; }
  const newSchool = prompt('School or teacher (optional):', profile?.school || '');
  if (newSchool === null) return;
  saveProfile(newName, newSchool);
  alert('Profile updated! Reloading...');
  location.reload();
}

function signOut() {
  if (!confirm('Sign out? Your study progress, notes, and bookmarks will be kept — you\'ll just be asked your name again next time. Continue?')) return;
  clearProfile();
  location.reload();
}

function escapeForHtml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ═══════════════════════════════════════════════════════════════════════════
   KEYBOARD SHORTCUT OVERLAY (press ? anywhere to open)
   ═══════════════════════════════════════════════════════════════════════════ */

const SHORTCUTS = [
  { key: '?', desc: 'Show this shortcuts list', where: 'Any page' },
  { key: '/', desc: 'Focus search box', where: 'Any page' },
  { key: 'Esc', desc: 'Close dialogs, clear search', where: 'Any page' },
  { key: 't', desc: 'Toggle light/dark theme', where: 'Any page' },
  { key: 'h', desc: 'Go home', where: 'Any page' },
  { key: '←/→', desc: 'Navigate between cards', where: 'Flashcards' },
  { key: 'Space', desc: 'Flip flashcard', where: 'Flashcards' },
  { key: '1/2/3/4', desc: 'Rate flashcard: Again / Hard / Good / Easy', where: 'Flashcards' },
  { key: '1/2/3', desc: 'Mark glossary test: Wrong / Partial / Correct', where: 'Glossary test' },
  { key: 'S', desc: 'Skip current term', where: 'Glossary test' },
  { key: 'N', desc: 'Add a new node', where: 'Mind Map Builder' },
  { key: 'C', desc: 'Add child to selected node', where: 'Mind Map Builder' },
  { key: 'Del', desc: 'Delete selected node', where: 'Mind Map Builder' }
];

function showShortcutsOverlay() {
  // Toggle: if already open, close it
  const existing = document.getElementById('shortcutsOverlay');
  if (existing) { existing.remove(); return; }

  const overlay = document.createElement('div');
  overlay.id = 'shortcutsOverlay';
  overlay.className = 'no-print';
  overlay.innerHTML = `
    <div class="sc-backdrop" onclick="closeShortcuts()"></div>
    <div class="sc-modal" onclick="event.stopPropagation()">
      <div class="sc-header">
        <h2>⌨ Keyboard shortcuts</h2>
        <button onclick="closeShortcuts()" class="sc-close" aria-label="Close">✕</button>
      </div>
      <div class="sc-grid">
        ${SHORTCUTS.map(s => `
          <div class="sc-row">
            <kbd class="sc-key">${s.key}</kbd>
            <div class="sc-desc">
              <div>${s.desc}</div>
              <div class="sc-where">${s.where}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="sc-footer">Press <kbd>?</kbd> any time to open this · <kbd>Esc</kbd> to close</div>
    </div>
  `;

  if (!document.getElementById('shortcutsCSS')) {
    const css = document.createElement('style');
    css.id = 'shortcutsCSS';
    css.textContent = `
      #shortcutsOverlay {
        position: fixed; inset: 0; z-index: 9000;
        display: grid; place-items: center;
        padding: 1rem;
        animation: scFade 0.2s ease;
      }
      @keyframes scFade { from { opacity: 0; } to { opacity: 1; } }
      .sc-backdrop {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(2px);
      }
      .sc-modal {
        position: relative;
        background: var(--surface);
        border-radius: 16px;
        box-shadow: 0 25px 80px -20px rgba(0,0,0,0.5);
        width: 100%;
        max-width: 560px;
        max-height: 88vh;
        overflow-y: auto;
        animation: scPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes scPop {
        from { transform: scale(0.95) translateY(10px); opacity: 0; }
        to { transform: scale(1) translateY(0); opacity: 1; }
      }
      .sc-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border);
      }
      .sc-header h2 { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; margin: 0; }
      .sc-close {
        background: transparent; border: none; cursor: pointer;
        color: var(--mid); font-size: 1.3rem;
        width: 36px; height: 36px; border-radius: 50%;
        display: grid; place-items: center;
        transition: background 0.15s;
      }
      .sc-close:hover { background: var(--surface-2); color: var(--text); }
      .sc-grid {
        padding: 1rem 1.5rem;
      }
      .sc-row {
        display: flex; gap: 1rem;
        padding: 0.65rem 0;
        align-items: flex-start;
        border-bottom: 1px solid var(--border);
      }
      .sc-row:last-child { border-bottom: none; }
      .sc-key {
        background: var(--surface-2);
        border: 1px solid var(--border);
        border-bottom-width: 2px;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        font-family: var(--font-mono);
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text);
        min-width: 64px;
        text-align: center;
        flex-shrink: 0;
      }
      .sc-desc { flex: 1; }
      .sc-desc > div:first-child { font-size: 0.95rem; font-weight: 500; }
      .sc-where { font-size: 0.78rem; color: var(--mid); margin-top: 0.15rem; }
      .sc-footer {
        padding: 0.85rem 1.5rem;
        border-top: 1px solid var(--border);
        font-size: 0.82rem;
        color: var(--text-mid);
        text-align: center;
        background: var(--surface-2);
        border-radius: 0 0 16px 16px;
      }
      .sc-footer kbd {
        background: var(--surface);
        border: 1px solid var(--border);
        padding: 0.1em 0.4em;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 0.85em;
      }
    `;
    document.head.appendChild(css);
  }
  document.body.appendChild(overlay);
}

function closeShortcuts() {
  const o = document.getElementById('shortcutsOverlay');
  if (o) o.remove();
}

// Global keyboard listener
document.addEventListener('keydown', e => {
  // Ignore if typing in input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
  // ? to open shortcuts (Shift+/)
  if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
    e.preventDefault();
    showShortcutsOverlay();
    return;
  }
  // / to focus search
  if (e.key === '/') {
    const input = document.getElementById('searchInput');
    if (input) { e.preventDefault(); input.focus(); }
    return;
  }
  // Esc to close shortcuts
  if (e.key === 'Escape') {
    closeShortcuts();
    return;
  }
  // t = toggle theme
  if (e.key === 't' || e.key === 'T') { toggleTheme(); return; }
  // h = home
  if (e.key === 'h' || e.key === 'H') {
    location.href = pathTo('index.html');
    return;
  }
});

/* ═══════════════════════════════════════════════════════════════════════════
   ONBOARDING TOUR (multi-step, first visit only)
   ═══════════════════════════════════════════════════════════════════════════ */

const TOUR_KEY = 'igcse_ict_tour_seen_v1';

const TOUR_STEPS = [
  {
    title: 'Welcome to your study site! 👋',
    body: `This is your home base. From here, you can access all 10 chapters, 226 MCQs, 88 essay questions, mock exam papers, and lots more. Let me show you around quickly — it'll only take 30 seconds.`,
    target: null // centered modal, no spotlight
  },
  {
    title: '⭐ Question of the Day',
    body: `Every day, a different question appears here. Answer it daily to build a study habit — your streak is tracked on the Streaks page.`,
    target: '#dailyDashboard'
  },
  {
    title: '🎯 Your Weak Spots',
    body: `As you take quizzes, this section shows the chapters where you scored lowest, so you can focus where it matters most.`,
    target: '#dailyDashboard'
  },
  {
    title: '⚡ Practice Mode',
    body: `Six different practice tools: MCQs, essays, command word drills, worked examples, mock exam papers, and flashcards with spaced repetition. Pick what matches your study mood.`,
    target: '.quick-actions'
  },
  {
    title: '📖 The 10 Chapters',
    body: `Scroll down to read full chapter content. Each chapter has bookmarks, notes, text-to-speech, and a "mark as read" button so you can track your progress.`,
    target: '.chapter-grid'
  },
  {
    title: '⌨ Pro tip: Press <kbd>?</kbd> any time',
    body: `Press the <kbd>?</kbd> key on any page to see all keyboard shortcuts. You can also use <kbd>/</kbd> to jump to the search box, and <kbd>t</kbd> to toggle dark mode.`,
    target: null
  },
  {
    title: 'Ready to start! 🚀',
    body: `That's the basics! Anything else you discover (the floating Pomodoro timer, mind maps, glossary self-test...) is icing on the cake. Good luck with your IGCSE preparation!`,
    target: null
  }
];

let tourState = { stepIdx: 0 };

function startOnboardingTour() {
  // Only on home page
  if (getCurrentPage() !== 'home') return;
  // Skip if already done
  try { if (localStorage.getItem(TOUR_KEY) === 'yes') return; } catch(e) {}
  // Only show if user has signed in (welcome screen done)
  if (!getProfile()) return;
  // Delay a moment so the page is rendered
  setTimeout(() => { tourState.stepIdx = 0; renderTourStep(); }, 1000);
}

function renderTourStep() {
  // Remove existing
  document.getElementById('tourOverlay')?.remove();
  if (tourState.stepIdx >= TOUR_STEPS.length) {
    finishTour();
    return;
  }
  const step = TOUR_STEPS[tourState.stepIdx];

  const overlay = document.createElement('div');
  overlay.id = 'tourOverlay';
  overlay.className = 'no-print';

  // If step has a target, compute spotlight position
  let spotlightStyles = '';
  if (step.target) {
    const targetEl = document.querySelector(step.target);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const pad = 8;
      spotlightStyles = `
        position: fixed;
        top: ${rect.top - pad}px;
        left: ${rect.left - pad}px;
        width: ${rect.width + pad*2}px;
        height: ${rect.height + pad*2}px;
        border-radius: 12px;
        box-shadow: 0 0 0 9999px rgba(0,0,0,0.55);
        pointer-events: none;
        transition: all 0.3s;
        border: 2px solid #1D4ED8;
      `;
      // Scroll into view
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  overlay.innerHTML = `
    <div class="tour-backdrop" ${step.target ? '' : 'style="background: rgba(0,0,0,0.55);"'}></div>
    ${step.target ? `<div class="tour-spotlight" style="${spotlightStyles}"></div>` : ''}
    <div class="tour-tooltip">
      <div class="tour-step-label">Step ${tourState.stepIdx + 1} of ${TOUR_STEPS.length}</div>
      <h3>${step.title}</h3>
      <p>${step.body}</p>
      <div class="tour-controls">
        <button class="tour-btn-skip" onclick="finishTour()">Skip tour</button>
        <div style="flex:1;"></div>
        ${tourState.stepIdx > 0 ? `<button class="tour-btn-prev" onclick="prevTourStep()">← Back</button>` : ''}
        <button class="tour-btn-next" onclick="nextTourStep()">
          ${tourState.stepIdx === TOUR_STEPS.length - 1 ? 'Get started 🎉' : 'Next →'}
        </button>
      </div>
      <div class="tour-progress">
        ${TOUR_STEPS.map((_, i) => `
          <span class="${i === tourState.stepIdx ? 'active' : i < tourState.stepIdx ? 'done' : ''}"></span>
        `).join('')}
      </div>
    </div>
  `;

  if (!document.getElementById('tourCSS')) {
    const css = document.createElement('style');
    css.id = 'tourCSS';
    css.textContent = `
      #tourOverlay {
        position: fixed; inset: 0; z-index: 8000;
        pointer-events: none;
      }
      .tour-backdrop {
        position: fixed; inset: 0;
        pointer-events: auto;
      }
      .tour-spotlight {
        z-index: 8001;
      }
      .tour-tooltip {
        position: fixed;
        bottom: 2rem; left: 50%;
        transform: translateX(-50%);
        background: var(--surface);
        border-radius: 14px;
        box-shadow: 0 20px 60px -10px rgba(0,0,0,0.4);
        padding: 1.5rem 1.75rem 1.25rem;
        width: calc(100% - 2rem);
        max-width: 500px;
        z-index: 8002;
        pointer-events: auto;
        animation: tourSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes tourSlide {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      .tour-step-label {
        font-size: 0.78rem; color: var(--blue); font-weight: 700; letter-spacing: 0.05em;
        text-transform: uppercase; margin-bottom: 0.5rem;
      }
      .tour-tooltip h3 {
        font-family: var(--font-display);
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        line-height: 1.3;
      }
      .tour-tooltip p {
        color: var(--text-mid);
        font-size: 0.92rem;
        line-height: 1.55;
        margin-bottom: 1.1rem;
      }
      .tour-tooltip p kbd {
        background: var(--surface-2);
        border: 1px solid var(--border);
        padding: 0.1em 0.45em;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 0.85em;
        font-weight: 600;
      }
      .tour-controls {
        display: flex; gap: 0.5rem; align-items: center;
      }
      .tour-btn-skip {
        background: transparent; border: none;
        color: var(--mid); cursor: pointer;
        font-size: 0.85rem; padding: 0.5rem 0.75rem;
        font-family: var(--font-body);
      }
      .tour-btn-skip:hover { color: var(--text); }
      .tour-btn-prev {
        background: var(--surface-2);
        border: 1px solid var(--border);
        color: var(--text);
        cursor: pointer;
        padding: 0.55rem 1rem;
        border-radius: 8px;
        font-size: 0.88rem;
        font-family: var(--font-body);
        font-weight: 500;
      }
      .tour-btn-next {
        background: linear-gradient(135deg, #1D4ED8, #6D28D9);
        color: white;
        border: none;
        cursor: pointer;
        padding: 0.6rem 1.1rem;
        border-radius: 8px;
        font-size: 0.92rem;
        font-family: var(--font-body);
        font-weight: 600;
      }
      .tour-progress {
        display: flex; gap: 4px;
        margin-top: 1rem;
        justify-content: center;
      }
      .tour-progress span {
        width: 22px; height: 4px;
        background: var(--border);
        border-radius: 100px;
        transition: all 0.2s;
      }
      .tour-progress .active { background: #1D4ED8; width: 32px; }
      .tour-progress .done { background: #6D28D9; }
    `;
    document.head.appendChild(css);
  }
  document.body.appendChild(overlay);
}

function nextTourStep() {
  tourState.stepIdx++;
  renderTourStep();
}

function prevTourStep() {
  tourState.stepIdx = Math.max(0, tourState.stepIdx - 1);
  renderTourStep();
}

function finishTour() {
  try { localStorage.setItem(TOUR_KEY, 'yes'); } catch(e) {}
  document.getElementById('tourOverlay')?.remove();
}

function restartTour() {
  try { localStorage.removeItem(TOUR_KEY); } catch(e) {}
  if (getCurrentPage() === 'home') {
    tourState.stepIdx = 0;
    renderTourStep();
  } else {
    location.href = pathTo('index.html');
  }
}




/* ───── UI ENHANCEMENT ENGINE LOADER ─────
   Loads assets/js/ui.js (scroll reveal, count-up, tilt, ripple, confetti…)
   after the page chrome is in place. The site works fully without it. */
function loadUiEnhancements() {
  if (document.querySelector('script[data-ui-engine]')) return;
  const s = document.createElement('script');
  s.src = pathTo('assets/js/ui.js');
  s.defer = true;
  s.setAttribute('data-ui-engine', '');
  document.head.appendChild(s);
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  injectTopbar();
  injectFooter();
  loadUiEnhancements();
  updateThemeIcons();
  renderSidebar();
  setupSearch();
  initSpecChecklists();
  injectTimerWidget();
  initBookmarkIcons();
  injectNotesWidget();
  addTTSToChapter();
  hydrateChapterImages();
  showChapterFeaturesHint();
  registerServiceWorker();
  // Show welcome screen if no profile yet
  showWelcomeScreen();
  // On file:// (where localStorage doesn't cross folders), keep relaying the name in links
  if (location.protocol === 'file:') {
    const p = getProfile();
    if (p) installFileProtocolNameRelay(p.name);
  }
  // Add profile button to topbar if signed in
  injectProfileButton();
  // Add greeting if on home page
  injectGreetingIfHome();
  // Start onboarding tour for first-time users on home page
  startOnboardingTour();
  // Note: streaks.js auto-runs its own DOMContentLoaded handler

  const chId = getCurrentChapterId();
  if (chId) updateReadButton(chId);
});

/* ───── FIRST-VISIT HINT (shown once per chapter page) ───── */
function showChapterFeaturesHint() {
  const chId = getCurrentChapterId();
  if (!chId) return;
  const HINT_KEY = 'igcse_ict_features_hint_seen_v2';
  try { if (localStorage.getItem(HINT_KEY) === 'yes') return; } catch(e) {}

  // Wait a moment for content to render
  setTimeout(() => {
    const hint = document.createElement('div');
    hint.className = 'no-print';
    hint.style.cssText = `
      position: fixed;
      bottom: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 4px solid var(--blue);
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
      padding: 1rem 1.25rem;
      z-index: 90;
      max-width: 540px;
      width: calc(100vw - 2rem);
      font-size: 0.9rem;
      animation: slideUp 0.4s ease;
    `;
    hint.innerHTML = `
      <div style="display:flex; align-items:flex-start; gap:0.85rem;">
        <div style="font-size:1.4rem;">💡</div>
        <div style="flex:1;">
          <strong style="display:block; margin-bottom:0.3rem;">Three quick tips for this chapter:</strong>
          <div style="font-size:0.85rem; color:var(--text-mid); line-height:1.5;">
            • Click the <strong style="color:#94A3B8;">☆</strong> next to any heading to <strong>bookmark</strong> that section<br>
            • Click <strong style="color:var(--blue);">🔊</strong> next to a heading to <strong>listen</strong> to that section read aloud<br>
            • Click the blue <strong style="color:#1D4ED8;">✎</strong> button (bottom-right) to <strong>take notes</strong> on this chapter
          </div>
        </div>
        <button onclick="dismissChapterHint(this)" style="background:transparent; border:none; cursor:pointer; color:var(--mid); font-size:1.2rem; padding:0; line-height:1;">✕</button>
      </div>
    `;
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
    `;
    document.head.appendChild(styleEl);
    document.body.appendChild(hint);
  }, 800);
}

function dismissChapterHint(btn) {
  try { localStorage.setItem('igcse_ict_features_hint_seen_v2', 'yes'); } catch(e) {}
  btn.closest('div[style*="position: fixed"]').remove();
}
