/* Somnia — dream interpreter: client-side analysis of a free-text dream.
   Detects known symbols, emotions, and themes, then composes a reading
   through the lens the user selects. All processing happens in-browser. */
(function () {
  'use strict';

  const form = document.getElementById('interpreter-form');
  const output = document.getElementById('interpreter-output');
  if (!form || !output || typeof DREAM_DATA === 'undefined') return;

  const EMOTIONS = [
    { id: 'fear', label: 'fear or anxiety', words: ['afraid', 'scared', 'terrified', 'fear', 'panic', 'anxious', 'anxiety', 'dread', 'horror', 'frightened', 'nervous'] },
    { id: 'sadness', label: 'sadness or loss', words: ['sad', 'crying', 'cried', 'tears', 'grief', 'mourning', 'lonely', 'alone', 'lost', 'missing', 'empty'] },
    { id: 'anger', label: 'anger or frustration', words: ['angry', 'furious', 'rage', 'mad', 'frustrated', 'annoyed', 'yelling', 'screaming', 'fight', 'fighting', 'argument'] },
    { id: 'joy', label: 'joy or relief', words: ['happy', 'joy', 'laughing', 'laughed', 'excited', 'wonderful', 'beautiful', 'peaceful', 'calm', 'relief', 'free', 'amazing'] },
    { id: 'confusion', label: 'confusion or disorientation', words: ['confused', 'strange', 'weird', 'odd', 'disoriented', 'maze', 'couldn’t find', 'could not find', 'searching', 'looking for'] },
    { id: 'shame', label: 'embarrassment or exposure', words: ['embarrassed', 'ashamed', 'shame', 'humiliated', 'naked', 'exposed', 'everyone was looking', 'staring'] },
    { id: 'powerless', label: 'powerlessness', words: ['stuck', 'trapped', 'frozen', 'paralyzed', 'helpless', 'couldn’t move', 'could not move', 'couldn’t run', 'could not run', 'couldn’t scream', 'could not scream', 'slow motion'] }
  ];

  const LENS_INTROS = {
    balanced: 'This reading blends modern dream psychology with classic symbolism. Treat each idea as a question to explore, not a verdict.',
    psychology: 'This reading follows the continuity hypothesis: dreams tend to echo your waking concerns, relationships, and emotions rather than deliver coded prophecies.',
    jungian: 'This reading uses a Jungian lens: dream figures and places are treated as parts of your own psyche — including qualities you may not consciously acknowledge.',
    freudian: 'This reading uses a Freudian-inspired lens: the dream’s surface story (manifest content) may disguise underlying wishes and tensions (latent content).',
    spiritual: 'This reading draws on cross-cultural and spiritual dream traditions. Many cultures treat dreams as meaningful messages — hold these ideas lightly and keep what resonates.'
  };

  const ICONS = {
    symbols: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    emotion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>',
    reading: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>',
    questions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>'
  };

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function norm(s) {
    return s.toLowerCase().replace(/[’‘]/g, "'");
  }

  function detectSymbols(text) {
    const t = ' ' + norm(text).replace(/[^a-z']+/g, ' ') + ' ';
    const found = [];
    DREAM_DATA.symbols.forEach(function (s) {
      const hit = s.keywords.some(function (k) {
        return t.indexOf(' ' + norm(k) + ' ') !== -1;
      });
      if (hit) found.push(s);
    });
    return found.slice(0, 6);
  }

  function detectEmotions(text) {
    const t = norm(text);
    return EMOTIONS.filter(function (e) {
      return e.words.some(function (w) { return t.includes(norm(w)); });
    });
  }

  function lensText(sym, lens) {
    switch (lens) {
      case 'psychology': return sym.psychology || sym.overview;
      case 'jungian': return sym.symbolic || sym.overview;
      case 'freudian': return sym.freudian || sym.symbolic || sym.overview;
      case 'spiritual': return sym.cultural || sym.symbolic || sym.overview;
      default: return sym.overview;
    }
  }

  function buildReading(text, lens, symbols, emotions) {
    const parts = [];
    parts.push(LENS_INTROS[lens] || LENS_INTROS.balanced);

    if (emotions.length) {
      const labels = emotions.map(function (e) { return e.label; });
      const listed = labels.length > 1
        ? labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1]
        : labels[0];
      parts.push('The strongest signal in any dream is its emotion. Your description suggests ' + listed +
        '. Dream researchers consider the feeling of a dream more revealing than its imagery — ask where this same feeling shows up in your waking life right now.');
    } else {
      parts.push('You didn’t mention how the dream felt. Emotion is the most informative part of a dream — when you recall it, note whether the feeling was fear, relief, frustration, or something else, and where that feeling appears in waking life.');
    }

    if (symbols.length) {
      symbols.forEach(function (s) {
        parts.push('• ' + s.name + ': ' + lensText(s, lens));
      });
    } else {
      parts.push('No common symbols from our dictionary appear in your description, which is normal — most dream content is personal. Focus on what each person, place, or object means to you specifically.');
    }
    return parts;
  }

  function reflectionQuestions(symbols, emotions) {
    const qs = [
      'What happened in the last few days that this dream might be replaying or exaggerating?',
      'If every character and object in the dream were a part of you, what part would each be?'
    ];
    if (emotions.some(function (e) { return e.id === 'fear' || e.id === 'powerless'; })) {
      qs.push('Is there a situation in waking life where you feel pursued, pressured, or unable to act?');
    }
    if (emotions.some(function (e) { return e.id === 'shame'; })) {
      qs.push('Where do you currently feel exposed, judged, or afraid of being “found out”?');
    }
    if (symbols.length) {
      qs.push('What is your personal history with ' + symbols[0].name.toLowerCase() + '? Personal associations outweigh any dictionary meaning.');
    }
    qs.push('If this dream were trying to be helpful, what would it want you to pay attention to?');
    return qs;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('dream-text').value.trim();
    const lens = document.getElementById('lens-select').value;
    const errEl = document.getElementById('dream-error');

    if (text.length < 20) {
      errEl.textContent = 'Please describe your dream in a little more detail (at least a sentence or two) so the analysis has something to work with.';
      errEl.classList.remove('hidden');
      document.getElementById('dream-text').focus();
      return;
    }
    errEl.classList.add('hidden');

    const symbols = detectSymbols(text);
    const emotions = detectEmotions(text);
    const reading = buildReading(text, lens, symbols, emotions);
    const questions = reflectionQuestions(symbols, emotions);

    let html = '';

    html += '<div class="result-card"><h3>' + ICONS.symbols + 'Symbols detected</h3>';
    if (symbols.length) {
      html += '<div class="symbol-pill-row">' + symbols.map(function (s) {
        return '<a class="chip" href="dictionary.html#' + s.id + '">' + esc(s.name) + '</a>';
      }).join('') + '</div><p class="muted small mb-0">Tap a symbol to read its full dictionary entry.</p>';
    } else {
      html += '<p class="mb-0">No dictionary symbols matched — your reading below focuses on emotion and personal context instead.</p>';
    }
    html += '</div>';

    html += '<div class="result-card"><h3>' + ICONS.emotion + 'Emotional tone</h3><p class="mb-0">' +
      (emotions.length
        ? 'Detected: ' + emotions.map(function (e) { return esc(e.label); }).join(', ') + '.'
        : 'No explicit emotions detected in your description — try adding how the dream felt.') +
      '</p></div>';

    html += '<div class="result-card"><h3>' + ICONS.reading + 'Your reading</h3>' +
      reading.map(function (p) { return '<p>' + esc(p).replace(/^• /, '<strong>&bull;</strong> ') + '</p>'; }).join('') +
      '</div>';

    html += '<div class="result-card"><h3>' + ICONS.questions + 'Questions to reflect on</h3><ul>' +
      questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul></div>';

    html += '<div class="result-card" style="border-left-color: var(--color-warning);"><h3>' + ICONS.note + 'Keep in mind</h3>' +
      '<p class="mb-0">There is no scientific evidence that dream symbols have fixed, universal meanings. The most useful interpretation is the one <em>you</em> build from your own associations. This tool is for reflection and entertainment — it is not medical, psychological, or spiritual advice. If distressing dreams are affecting your sleep or daily life, consider talking to a healthcare professional.</p></div>';

    html += '<p class="text-center mt-4"><a class="btn btn-secondary" href="journal.html">Save this dream in your journal</a></p>';

    output.innerHTML = html;
    output.classList.remove('hidden');
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* Example dream buttons */
  document.querySelectorAll('[data-example]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.getElementById('dream-text').value = btn.dataset.example;
      document.getElementById('dream-text').focus();
    });
  });
})();
