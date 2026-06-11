# 🐱 KittyDrama — the cat encyclopedia

A comprehensive, searchable cat encyclopedia + blog with its own **self-hosted backend**. The public site is a set of pre-built static pages ([Astro](https://astro.build)) — every one of the **333 answers across 14 topics** is a real, indexable HTML page designed to rank in search and earn through AdSense. A Node.js server (Express + SQLite) provides the admin at `/admin`: log in, write blog posts, edit any encyclopedia answer, moderate comments, and collect newsletter signups — no third-party services involved.

## Quick start

```bash
npm install
npm run build     # generate the static site into dist/
npm start         # run the server: site + /admin + /api on port 4321
```

First visit to `/admin` asks you to create your admin account (one time). For front-end-only development there's still `npm run dev` (Astro dev server, no backend).

## What's inside

| Route | What it is |
|---|---|
| `/` | Interactive home: aurora hero, ⌘K command palette, tilt cards, surprise-me fact modal |
| `/behavior/`, `/toxic/`, … | 14 topic pages with animated accordions, filtering, scroll-spy TOC, `FAQPage` structured data |
| `/behavior/why-do-cats-purr/`, … | **333 individual question pages** — each with its own URL, meta tags, structured data, related questions, and comments |
| `/blog/` + `/blog/<slug>/` | The blog — markdown posts with hero images, tags, comments, `BlogPosting` structured data |
| `/admin` | **The backend**: dashboard, post editor with live markdown preview + image uploads, encyclopedia editor, comment moderation, subscriber list, publish button |
| `/api/comments`, `/api/subscribe` | Public JSON API the static pages call for comments + newsletter |
| `/about/`, `/privacy/`, `/contact/` | The policy pages AdSense requires |
| `/rss.xml`, `/sitemap-index.xml`, `/search-index.json`, `/robots.txt` | Feeds and crawl plumbing, regenerated on every publish |

## How publishing works

Content lives in files (blog: `src/content/blog/*.md`, encyclopedia: `content/encyclopedia/*.json`); everything dynamic (accounts, sessions, comments, subscribers) lives in one SQLite file (`data/site.db`). When you save in the admin with **“Publish site after saving”** checked — or click **Publish site** in the sidebar — the server reruns the Astro build into a staging directory and atomically swaps it in. The public site is never served half-built, and readers always get static HTML. Comments and newsletter signups are live instantly and never need a publish.

The admin's spam defenses: comments are held for moderation, forms have honeypot fields and minimum-fill-time checks, and the public API is rate-limited per IP. Login is bcrypt + rate-limited, sessions are HttpOnly cookies, and all admin writes are CSRF-protected.

## Deploying on cPanel

See **[DEPLOY-CPANEL.md](DEPLOY-CPANEL.md)** for the step-by-step (Setup Node.js App → npm install → visit `/admin`). Short version: it's one Node app with `server.js` as the startup file; the first boot builds the site automatically.

**Back up two things**: the `data/` folder (database + cookie secret) and `public/images/` (uploads). Content files (`src/content/blog/`, `content/encyclopedia/`) are worth backing up too if you edit via the admin in production.

## Going live + AdSense checklist

1. **Domain**: `kittydrama.com` is already configured in `src/config.js` and `public/robots.txt`. Point the domain at your hosting and make sure HTTPS (AutoSSL) is active — the admin login requires it.
2. **Replace the placeholder email** in `src/pages/contact.astro`.
3. **Submit the sitemap** in [Google Search Console](https://search.google.com/search-console) and let the site index. Give it content age — AdSense rejects brand-new empty-feeling sites; a few blog posts and a few weeks help a lot.
4. **Apply for AdSense** at [adsense.google.com](https://adsense.google.com). When approved:
   - Set `adsenseClient: "ca-pub-XXXXXXXXXXXXXXXX"` and `adsenseEnabled: true` in `src/config.js`
   - Create ad units in AdSense and put their slot ids into the `<AdSlot slot="..." />` components (topic pages, question pages, blog posts)
   - Add the `ads.txt` file AdSense gives you to `public/ads.txt`
   - Enable Google's consent message (Privacy & messaging in AdSense) for EEA/UK visitors
   - Click **Publish site** in the admin to roll all of it out
5. **Realistic expectations**: pet content runs roughly $2–10 RPM. Traffic is the product — keep publishing; the blog and the 333 long-tail question pages are the engine.

## Editing content without the admin

Everything the admin edits is a plain file, so you can also edit directly:

- **Blog posts**: markdown with frontmatter in `src/content/blog/` (schema in `src/content.config.ts`)
- **Encyclopedia**: `content/encyclopedia/<topic>.json` — entries are `{ id, q, a, tags }`; `id` becomes the URL `/topic/id/`
- New topics: add a JSON file with `slug/name/tagline/icon/order`, pick an icon in `src/lib/icons.js`

Rebuild (`npm run build` or the admin's Publish button) and new entries get their own page, join the accordion, search index, and sitemap automatically.

## Project structure

```
server.js                  Server entry (cPanel startup file): static site + /admin + /api
server/
  routes-admin.js          All admin pages and actions
  routes-api.js            Public API: comments, newsletter
  auth.js                  Sessions, bcrypt, CSRF, rate limiting
  build.js                 Publish pipeline (astro build → atomic swap)
  content.js               File-backed content ops (posts, encyclopedia)
  db.js                    SQLite schema (users, sessions, comments, subscribers)
  ui.js + static/          Admin layout, styles, client JS
content/encyclopedia/*.json  The 333 Q&As — edited by the admin
src/
  config.js                Site name, domain, AdSense settings  ← edit before launch
  content/blog/*.md        Blog posts — edited by the admin
  lib/data.js              Loads encyclopedia JSON; related-questions, URL helpers
  layouts/Base.astro       Head/SEO/header/footer shell (incl. newsletter form)
  components/              AdSlot, Comments, Logo
  pages/                   Home, topics, questions, blog, policies, feeds
public/
  scripts/site.js          Client interactivity (palette, theme, accordions…)
  scripts/dynamic.js       Comments + newsletter (talks to /api)
  images/blog/             Uploaded images
data/                      Runtime state: SQLite DB + cookie secret (not in git — back it up!)
```

## Disclaimer

Educational information, not veterinary advice. For health concerns or emergencies, consult a licensed veterinarian. US poison hotlines: ASPCA Animal Poison Control (888) 426-4435 · Pet Poison Helpline (855) 764-7661.
