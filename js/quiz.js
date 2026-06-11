/* Somnia — dream science quiz. Questions are based on published research;
   see the FAQ and guides for sources. */
(function () {
  'use strict';

  const root = document.getElementById('quiz-root');
  if (!root) return;

  const QUESTIONS = [
    {
      q: 'Roughly how much time does the average adult spend dreaming each night?',
      options: ['About 10 minutes', 'About 30 minutes', 'About 2 hours', 'About 5 hours'],
      answer: 2,
      why: 'Adults spend roughly 1.5–2 hours dreaming per night across 4–6 REM periods, with the longest dreams near morning.'
    },
    {
      q: 'What share of people are estimated to have had at least one lucid dream in their lifetime?',
      options: ['About 5%', 'About 25%', 'About 55%', 'Nearly everyone (95%)'],
      answer: 2,
      why: 'A 2016 meta-analysis covering ~24,000 participants estimated 55% have experienced at least one lucid dream, and about 23% have them monthly or more.'
    },
    {
      q: 'Which lucid dreaming technique performed best in controlled induction studies?',
      options: ['Reality testing alone', 'MILD (mnemonic induction)', 'Eating cheese before bed', 'Sleeping with the lights on'],
      answer: 1,
      why: 'In the 2017 and 2020 induction studies, MILD (often combined with wake-back-to-bed) was the best performer. Reality testing alone was ineffective over a one-week period.'
    },
    {
      q: 'Who described dreams as "the royal road to the unconscious"?',
      options: ['Carl Jung', 'Sigmund Freud', 'Fritz Perls', 'Allan Hobson'],
      answer: 1,
      why: 'Freud used the phrase in The Interpretation of Dreams (1899), where he argued dreams are disguised fulfillments of unconscious wishes.'
    },
    {
      q: 'In Jungian psychology, the "shadow" refers to…',
      options: ['Nightmares about darkness', 'Traits we deny or disown in ourselves', 'A ghost archetype', 'The memory of past lives'],
      answer: 1,
      why: 'The shadow is Jung’s term for the parts of ourselves we don’t consciously acknowledge — they often appear in dreams as threatening or disliked figures.'
    },
    {
      q: 'What does the “continuity hypothesis” of dreaming claim?',
      options: [
        'Dreams predict future events',
        'Dreams continue all night without pause',
        'Dreams reflect our waking-life concerns and experiences',
        'Everyone dreams the same universal symbols'
      ],
      answer: 2,
      why: 'The continuity hypothesis — one of the best-supported ideas in dream research — holds that dream content mirrors the dreamer’s waking thoughts, concerns, and emotions.'
    },
    {
      q: 'Why do we forget most of our dreams?',
      options: [
        'Dreams are stored in a part of the brain we can’t access',
        'Memory-consolidating chemicals like norepinephrine are at low levels during REM sleep',
        'The brain deletes dreams to save space',
        'We only dream a few seconds per night'
      ],
      answer: 1,
      why: 'During REM sleep, norepinephrine drops to near zero and the hippocampus is under-engaged, so most dream content is never written to long-term memory.'
    },
    {
      q: 'Do people who are blind from birth dream?',
      options: [
        'No, dreaming requires visual experience',
        'Yes, but only in abstract shapes',
        'Yes — vividly, through sound, touch, smell, taste, and emotion',
        'Science doesn’t know'
      ],
      answer: 2,
      why: 'People blind from birth dream richly in non-visual senses, while those who lose sight after early childhood usually keep visual imagery in dreams for life.'
    },
    {
      q: 'What is the best-supported treatment for chronic nightmares?',
      options: ['Avoiding sleep', 'Imagery Rehearsal Therapy (IRT)', 'Eating before bed', 'Cold showers'],
      answer: 1,
      why: 'The American Academy of Sleep Medicine recommends Imagery Rehearsal Therapy — rescripting the nightmare into a new narrative and rehearsing it while awake — for nightmare disorder.'
    },
    {
      q: 'Is there a fixed, universal meaning for symbols like snakes or falling?',
      options: [
        'Yes — dream dictionaries are scientifically validated',
        'Yes, but only for animals',
        'No — research finds no universal symbol meanings; context and personal associations matter most',
        'Only Jungian archetypes are universal'
      ],
      answer: 2,
      why: 'No empirical evidence supports universal symbol meanings. The same image can mean opposite things to different dreamers — which is why good interpretation starts with your own associations.'
    },
    {
      q: 'Where did the threat simulation theory say nightmares come from?',
      options: [
        'Undigested food',
        'An evolved mechanism rehearsing responses to danger',
        'Suppressed wishes',
        'Random eye movements'
      ],
      answer: 1,
      why: 'Revonsuo’s threat simulation theory (2000) proposes that dreaming evolved to simulate threatening events so we can rehearse detection and avoidance — one reason being chased is so common.'
    },
    {
      q: 'The oldest known dream-interpretation manual comes from…',
      options: ['Victorian England', 'Ancient Egypt and Mesopotamia', 'Medieval France', '1960s California'],
      answer: 1,
      why: 'Mesopotamian dream-omen collections date to around 2000 BCE, and the Egyptian “Dream Book” papyrus (c. 1200 BCE) lists over 200 dream interpretations.'
    }
  ];

  let index = 0;
  let score = 0;
  let answered = false;

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function renderQuestion() {
    answered = false;
    const item = QUESTIONS[index];
    root.innerHTML =
      '<div class="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + QUESTIONS.length + '" aria-valuenow="' + index + '" aria-label="Quiz progress">' +
      '<div class="quiz-progress-fill" style="width:' + Math.round((index / QUESTIONS.length) * 100) + '%"></div></div>' +
      '<p class="muted">Question ' + (index + 1) + ' of ' + QUESTIONS.length + ' &middot; Score: ' + score + '</p>' +
      '<h2>' + esc(item.q) + '</h2>' +
      item.options.map(function (opt, i) {
        return '<button type="button" class="quiz-option" data-i="' + i + '">' + esc(opt) + '</button>';
      }).join('') +
      '<div id="quiz-feedback"></div>';
  }

  function renderResult() {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    let verdict;
    if (pct >= 90) verdict = 'Oneirology expert — you know your dream science.';
    else if (pct >= 70) verdict = 'Impressive! You know more about dreams than most people.';
    else if (pct >= 40) verdict = 'A solid start — our guides will fill in the gaps.';
    else verdict = 'Plenty of myths busted today. Explore the guides to learn more.';
    root.innerHTML =
      '<div class="card text-center">' +
      '<h2>You scored ' + score + ' / ' + QUESTIONS.length + '</h2>' +
      '<p class="muted">' + verdict + '</p>' +
      '<p><button type="button" class="btn btn-primary" id="quiz-restart">Try again</button> ' +
      '<a class="btn btn-secondary" href="guides/index.html">Read the guides</a></p>' +
      '</div>';
    document.getElementById('quiz-restart').addEventListener('click', function () {
      index = 0;
      score = 0;
      renderQuestion();
    });
  }

  root.addEventListener('click', function (e) {
    const btn = e.target.closest('.quiz-option');
    if (!btn || answered) return;
    answered = true;
    const item = QUESTIONS[index];
    const chosen = Number(btn.dataset.i);
    root.querySelectorAll('.quiz-option').forEach(function (b, i) {
      b.disabled = true;
      if (i === item.answer) b.classList.add('correct');
      else if (i === chosen) b.classList.add('incorrect');
    });
    if (chosen === item.answer) score++;
    const fb = document.getElementById('quiz-feedback');
    fb.innerHTML =
      '<div class="quiz-feedback"><p><strong>' + (chosen === item.answer ? 'Correct!' : 'Not quite.') + '</strong> ' + esc(item.why) + '</p>' +
      '<button type="button" class="btn btn-primary btn-sm" id="quiz-next">' + (index + 1 < QUESTIONS.length ? 'Next question' : 'See results') + '</button></div>';
    document.getElementById('quiz-next').addEventListener('click', function () {
      index++;
      if (index < QUESTIONS.length) renderQuestion();
      else renderResult();
    });
  });

  renderQuestion();
})();
