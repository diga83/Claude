# 🐱 The Cat Encyclopedia

A comprehensive, searchable cat encyclopedia answering the cat questions people actually ask on the internet — behavior, health, food safety, toxins, kittens, breeds, grooming, litter box problems, body language, senior care, reproduction, daily life, and cat science.

**~300 answers across 14 topics**, all in a fast, dependency-free static site.

## Running it

No build step, no server required — just open `index.html` in a browser.

To serve it locally (nicer URLs, works around any browser file:// quirks):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

It also deploys as-is to GitHub Pages, Netlify, or any static host.

## Features

- **Full-text search** across all questions, answers, and tags, with keyboard navigation (↑/↓/Enter) and live results
- **14 topic pages** with accordion Q&As, per-topic filtering, and prev/next navigation
- **Deep links** — every answer has a copyable URL (`category.html?cat=behavior#why-do-cats-purr`) that opens and highlights the answer
- **Dark mode** via `prefers-color-scheme`, reduced-motion support, keyboard accessible, semantic HTML
- **Emergency notices** on health/toxin pages with poison-control hotlines

## Structure

```
index.html          Home: hero search, topic grid, most-asked questions
category.html       Topic page template (renders from ?cat=<slug>)
styles.css          Design system (warm palette, Varela Round / Nunito Sans)
app.js              Search, rendering, accordions, deep links
data/*.js           Content — one file per topic, plain JS objects
```

## Adding content

Append an entry to the relevant `data/*.js` file:

```js
{
  id: "unique-slug",            // used for deep links
  q: "The question?",
  a: "The answer text.",
  tags: ["search", "keywords"]
}
```

New topics: create a `data/<slug>.js` following the same shape, add a `<script>` tag for it in both HTML files, and pick an icon key from the `ICONS` map in `app.js`.

## Disclaimer

Educational information, not veterinary advice. For health concerns or emergencies, consult a licensed veterinarian. US poison hotlines: ASPCA Animal Poison Control (888) 426-4435 · Pet Poison Helpline (855) 764-7661.
