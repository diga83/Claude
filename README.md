# Somnia — AI Dream Interpretation (SaaS)

A complete dream-interpretation product: an AI interpreter that reads **any** dream
(Claude-powered), a 77-symbol dream dictionary, a private journal, evidence-based guides,
and a freemium tier system with credits and packages.

The frontend is fully static (works on any host, including GitHub Pages); the AI reading
runs through one serverless function (`api/interpret.js`). Without the backend deployed,
the site still works end-to-end — the interpreter falls back to its free on-device engine.

## Features

| Surface | What it does |
|---|---|
| `interpreter.html` | **Dual-mode interpreter.** AI mode: POSTs the dream to `/api/interpret` and renders a personalized reading (summary, emotional tone, contextual symbols, multi-paragraph reading in 5 selectable lenses, reflection questions, gentle note) with shimmer loading and staggered reveal. Instant mode: free, unlimited, 100% on-device. AI failures auto-refund the credit and fall back to instant |
| `pricing.html` | **SaaS tiers.** Dreamer (free, 5 AI readings/mo) · Lucid ($4.99/mo or $39.99/yr, 100/mo, "most popular") · Oneironaut ($9.99/mo or $79.99/yr, unlimited). Monthly/yearly toggle, one-time credit packs (20/$2.99, 60/$6.99, 150/$12.99), feature comparison table, pricing FAQ, demo checkout modal |
| `api/interpret.js` | Serverless Claude endpoint: structured JSON output (`output_config.format`), adaptive thinking, refusal/rate-limit handling, input validation, CORS |
| `js/credits.js` | Credit ledger: monthly allowances per plan + non-expiring pack credits, monthly reset, spend/refund, nav credit badge |
| `dictionary.html` | 77-symbol dictionary: search, A–Z nav, category filters, deep links; psychology/Jungian/Freudian/cultural readings per symbol |
| `journal.html` | Private localStorage journal: moods, tags, lucid/nightmare flags, symbol detection, stats & streaks, JSON export/import |
| `guides/` | Five research-backed guides (lucid dreaming, recall, nightmares & IRT, sleep science, history of dream theory) |
| `quiz.html`, `faq.html`, `about.html` | 12-question science quiz, 15-item FAQ, methodology + disclaimers |

## Deploying the AI backend (Vercel)

```bash
npm install
npx vercel            # deploys static site + api/interpret.js together
```

Set environment variables in the Vercel dashboard (or `vercel env add`):

| Variable | Required | Default | Notes |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ | — | From https://platform.claude.com |
| `ANTHROPIC_MODEL` | — | `claude-opus-4-8` | e.g. `claude-sonnet-4-6` or `claude-haiku-4-5` to trade quality for cost |
| `ANTHROPIC_EFFORT` | — | `low` | `low`/`medium`/`high` — reading depth vs latency/cost |
| `CORS_ORIGIN` | — | `*` | Set to your domain in production |

Any platform that runs Node serverless functions works (Netlify/Cloudflare need the
handler signature adapted). Without the backend, AI mode degrades gracefully to the
free on-device engine.

### Going to production (what's demo vs real)

This repo ships a **working product with demo billing**. The credit/plan state lives in
`localStorage` and "checkout" is simulated client-side. To take real money:

1. **Stripe**: replace `purchasePack`/`changePlan` in `js/credits.js` with Stripe Checkout
   sessions; grant credits from a webhook handler.
2. **Auth + storage**: add user accounts and move the credit balance server-side
   (e.g. Vercel KV / Postgres); have `api/interpret.js` check and decrement the balance
   before calling Claude (client-side enforcement is UX, not security).
3. **Rate limiting**: add per-user/IP limits on the API route.

The UI, plan structure, credit flows, and AI endpoint are production-shaped; only the
billing/auth internals are stubs, and each stub is marked with a comment.

## Design

Dark-first night-sky theme with light mode, Lora + Raleway type, glassmorphism pricing
cards, pointer-tracked card glow, scroll reveals, count-up stats, shimmer loading
skeletons, staggered result animations — all gated behind `prefers-reduced-motion`,
WCAG-minded contrast and focus states, responsive from 375px.

## Content standards

All factual claims trace to [`RESEARCH.md`](RESEARCH.md) (claim-by-claim sources +
confidence ratings). Symbol meanings are labeled as interpretive tradition, never
science; every interpretation surface carries a disclaimer; the AI system prompt
forbids prediction/diagnosis and adds care language for distressing content.

## Local development

```bash
python3 -m http.server 8000   # static site (AI mode falls back to instant)
npx vercel dev                # full stack including /api/interpret
```

```
├── index.html · dictionary.html · interpreter.html · journal.html
│   pricing.html · quiz.html · faq.html · about.html · 404.html
├── guides/              # hub + 5 articles
├── api/interpret.js     # Claude-powered reading endpoint (serverless)
├── css/styles.css       # design tokens + all styling
└── js/
    ├── dream-data.js    # 77-symbol database
    ├── interpreter.js   # dual-mode interpreter (AI + on-device)
    ├── credits.js       # plans, credits, badge (demo billing)
    ├── effects.js       # reveals, count-ups, card glow
    ├── main.js          # theme, nav, search, toast
    ├── dictionary.js · journal.js · quiz.js
```
