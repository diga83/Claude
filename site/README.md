# Al Injaz International Private School — bestschoolmuscat.com

A fast, SEO-optimised, fully static marketing website for **Al Injaz International Private
School (AIIPS)**, Muscat, Oman. Built with hand-crafted HTML + Tailwind CSS (Play CDN) and a
small amount of vanilla JavaScript — **no build step required**.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, stats, why-choose-us, academic pathways, inclusion, FAQ, CTA |
| `about.html` | About — mission/vision/values, principal's message, inclusion (`#inclusion`) |
| `academics.html` | Curriculum + learning stages (`#kindergarten` `#primary` `#secondary` `#sixthform`) |
| `admissions.html` | Process, requirements, fees, and an admission enquiry form (`#enquire`) |
| `contact.html` | Contact details, hours, contact form, Google Map |
| `404.html` | Friendly not-found page |
| `robots.txt`, `sitemap.xml` | SEO crawling support |

## Design system

- **Style:** Trustworthy & academic (clean, professional)
- **Colours:** Navy `#0a2240` / Blue CTA `#0369a1` / Warm gold accent `#c9a227`
- **Typography:** EB Garamond (headings) + Inter (body)
- **Tokens & components:** `assets/css/styles.css`
- **Interactions:** `assets/js/main.js` (mobile nav, accordions, scroll reveal, stat counters, form handling)

## SEO features included

- Unique `<title>` + meta description per page, keyword-rich rewritten copy
- Canonical URLs, Open Graph + Twitter cards
- JSON-LD structured data (`School` + `BreadcrumbList`)
- Semantic HTML, single `<h1>` per page, logical heading order, alt text
- `sitemap.xml`, `robots.txt`, mobile-first responsive layout, fast static load
- Local-SEO signals: NAP (name/address/phone), areaServed, geo-relevant copy (Muscat, Al Ansab, Oman)

---

## ⚠️ Placeholders to replace before launch

Search the codebase for these and swap in the real values:

| Placeholder | Where | Replace with |
|-------------|-------|--------------|
| `+968 2459 5900` / `tel:+96824595900` | all pages | Real school phone number |
| `96890000000` (WhatsApp links) | all pages | Real WhatsApp number (intl. format, no `+`) |
| `admissions@alinjaz.edu.om` | all pages | Real contact email |
| `YOUR_WEB3FORMS_ACCESS_KEY` | `admissions.html`, `contact.html` | Free key from [web3forms.com](https://web3forms.com) |
| `assets/img/*.jpg` | all pages | Real campus/classroom/inclusion photos (use WebP, add `og-cover.jpg` 1200×630) |
| Logo monogram "AI" | header/footer | Official school logo (SVG preferred) |
| Stats (15+, 1200+, 25+) | `index.html` | Verified figures |
| Office hours | `contact.html` | Confirmed hours |
| Google Map query | `contact.html` | Exact campus location / embed pin |
| Principal quote & name | `about.html` | Real principal message + photo |

> All copy was rewritten for SEO based on publicly available information. Please have the
> school review and approve factual claims (years, student numbers, qualifications) before launch.

## Local preview

```bash
cd site
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Upload the contents of `site/` to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, or traditional cPanel) and point `bestschoolmuscat.com` at it. No server-side
runtime is required.

> Note: Tailwind is loaded via the Play CDN for zero-config editing. For best production
> performance, you can later compile a static Tailwind build to remove the CDN runtime.
