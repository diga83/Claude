# 🐱 The Cat Encyclopedia

A comprehensive, searchable cat encyclopedia + blog, built with [Astro](https://astro.build). Every one of the **333 answers across 14 topics** is pre-rendered as a real, indexable HTML page — designed to rank in search and earn through AdSense — with a Decap CMS admin for publishing blog posts without touching code.

## Quick start

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # static production build into dist/
npm run preview   # serve the production build locally
```

## What's inside

| Route | What it is |
|---|---|
| `/` | Interactive home: aurora hero, ⌘K command palette, tilt cards, surprise-me fact modal |
| `/behavior/`, `/toxic/`, … | 14 topic pages with animated accordions, filtering, scroll-spy TOC, `FAQPage` structured data |
| `/behavior/why-do-cats-purr/`, … | **333 individual question pages** — each with its own URL, meta tags, structured data, and related questions (this is what ranks in Google) |
| `/blog/` + `/blog/<slug>/` | The blog — markdown posts with hero images, tags, `BlogPosting` structured data |
| `/admin/` | Decap CMS — log in and write posts in a rich editor (setup below) |
| `/about/`, `/privacy/`, `/contact/` | The policy pages AdSense requires |
| `/rss.xml`, `/sitemap-index.xml`, `/search-index.json`, `/robots.txt` | Feeds and crawl plumbing, generated at build time |

## Publishing blog posts

Two ways:

**1. Write a markdown file** in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "120–155 characters for search results and social cards."
pubDate: 2026-06-15
heroImage: /images/blog/my-image.jpg   # optional
tags: ["guides"]
draft: false
---

Your post content in markdown…
```

Commit and push — the site rebuilds and the post is live, listed on `/blog/`, the home page, and the RSS feed. Set `draft: true` to keep it out of the published site.

**2. Use the admin UI at `/admin/`** (after deploying to Netlify):

1. In Netlify: **Site settings → Identity → Enable Identity**
2. **Identity → Registration → Invite only**, then invite your own email
3. **Identity → Services → Enable Git Gateway**
4. Visit `yoursite.com/admin/`, log in, and write. Posts you publish are committed to the repo and deployed automatically. Drafts go through a Draft → Review → Publish workflow.

Deploying somewhere other than Netlify? Switch the backend in `public/admin/config.yml` to `github` (instructions in that file).

## Going live + AdSense checklist

1. **Buy a domain** and update it in two places: `SITE.url` in `src/config.js` and the `Sitemap:` line in `public/robots.txt`.
2. **Deploy**: push to GitHub, connect the repo to Netlify (or Cloudflare Pages) — `netlify.toml` already configures the build. Every push auto-deploys.
3. **Replace the placeholder email** in `src/pages/contact.astro` (or wire up Netlify Forms).
4. **Submit the sitemap** in [Google Search Console](https://search.google.com/search-console) and let the site index. Give it content age — AdSense rejects brand-new empty-feeling sites; a few blog posts and a few weeks help a lot.
5. **Apply for AdSense** at [adsense.google.com](https://adsense.google.com). When approved:
   - Set `adsenseClient: "ca-pub-XXXXXXXXXXXXXXXX"` and `adsenseEnabled: true` in `src/config.js`
   - Create ad units in AdSense and put their slot ids into the `<AdSlot slot="..." />` components (topic pages, question pages, blog posts)
   - Add the `ads.txt` file AdSense gives you to `public/ads.txt`
   - Enable Google's consent message (Privacy & messaging in AdSense) for EEA/UK visitors
6. **Realistic expectations**: pet content runs roughly $2–10 RPM. Traffic is the product — keep publishing; the blog and the 333 long-tail question pages are the engine.

## Editing encyclopedia content

Q&A content lives in `src/data/*.js` — one module per topic:

```js
{
  id: "unique-slug",        // becomes the URL: /topic/unique-slug/
  q: "The question?",
  a: "The answer text.",
  tags: ["search", "keywords"]
}
```

Add an entry, rebuild, and it gets its own page, joins the topic accordion, the search index, and the sitemap automatically. New topics: add a module in `src/data/`, register it in `src/lib/data.js`, pick an icon in `src/lib/icons.js`.

## Project structure

```
astro.config.mjs        Site URL + sitemap integration
netlify.toml            Build & deploy config
src/
  config.js             Site name, domain, AdSense settings  ← edit before launch
  content/blog/*.md     Blog posts (what /admin/ edits)
  content.config.ts     Blog frontmatter schema
  data/*.js             The 333 Q&As, one module per topic
  lib/data.js           Aggregation, related-questions, URL helpers
  lib/icons.js          SVG icon set (server-side)
  layouts/Base.astro    Head/SEO/header/footer shell
  components/AdSlot.astro  AdSense unit (renders only when configured)
  pages/                Home, topics, questions, blog, policies, feeds
public/
  scripts/site.js       Client interactivity (palette, theme, accordions…)
  admin/                Decap CMS
  robots.txt
```

## Disclaimer

Educational information, not veterinary advice. For health concerns or emergencies, consult a licensed veterinarian. US poison hotlines: ASPCA Animal Poison Control (888) 426-4435 · Pet Poison Helpline (855) 764-7661.
