# Somnia — Dream Interpretation Site

A complete, fully static dream interpretation website: dream dictionary, in-browser dream
interpreter, private dream journal, evidence-based guides, FAQ, and a dream-science quiz.
No build step, no dependencies, no backend — open `index.html` or host the folder anywhere
(GitHub Pages works out of the box).

## Features

| Page | What it does |
|---|---|
| `index.html` | Landing page with instant symbol search, feature overview, and prevalence stats |
| `dictionary.html` | 60+ symbol dream dictionary with text filter, A–Z nav, category chips, deep links (`#snake`), and copy-link buttons. Every entry gives modern-psychology, Jungian/Freudian, and cross-cultural readings plus reflection questions |
| `interpreter.html` | Describe a dream → detected symbols, emotional tone, a reading in the lens you pick (balanced / psychology / Jungian / Freudian / spiritual), and reflection questions. Runs 100% client-side |
| `journal.html` | Private dream journal in `localStorage`: moods, tags, lucid/recurring/nightmare flags, automatic symbol detection, stats (streaks, mood breakdown), search, JSON export/import |
| `guides/` | Five long-form guides: lucid dreaming (evidence-based techniques), dream recall, nightmares & night terrors (incl. IRT), sleep science & hygiene, and 4,000 years of dream-interpretation history |
| `quiz.html` | 12-question dream-science quiz with explanations |
| `faq.html` | 15 research-backed Q&As + full disclaimer |
| `about.html` | Methodology, what the site won't claim, privacy, sources |

## Design

Dark-first "night sky" theme with a light mode toggle (persisted), Lora + Raleway type,
WCAG-minded contrast and focus states, keyboard-navigable search, `prefers-reduced-motion`
support, responsive from 375px up. All icons are inline SVG.

## Content standards

All factual claims (prevalence statistics, technique success rates, treatment
recommendations) come from the research dossier in [`RESEARCH.md`](RESEARCH.md), which
lists sources and confidence ratings claim by claim. Interpretive content (symbol
meanings) is explicitly labeled as tradition, not science, and every interpretation
surface carries a disclaimer. The site takes no position it can't back: no universal
symbol meanings, no prophecy, no diagnosis.

## Development

There is nothing to install. To preview locally:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Structure:

```
├── index.html, dictionary.html, interpreter.html, journal.html,
│   quiz.html, faq.html, about.html, 404.html
├── guides/            # guide hub + 5 articles
├── css/styles.css     # design tokens + all styling (dark/light themes)
└── js/
    ├── dream-data.js  # the 60+ symbol database (powers search, dictionary, interpreter, journal)
    ├── main.js        # theme, nav, toast, hero stars, symbol search
    ├── dictionary.js  # dictionary rendering/filtering/deep links
    ├── interpreter.js # client-side dream analysis engine
    ├── journal.js     # localStorage journal + stats + import/export
    └── quiz.js        # quiz engine
```
