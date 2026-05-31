# Dinesh Deckker — v2 "Modern Academic"

A **ground-up redesign** — same content, an entirely new design and new page
layouts. Built static (plain HTML + one stylesheet + a small nav/footer
injector), no build step. Generated with the `ui-ux-pro-max` skill.

## Direction
A crisp, light, **modern-academic** identity that leans into the researcher
side of the brand: white canvas, slate ink, a single **blue-ink accent
(`#2563eb`)**, structured cards, and data-forward metric/citation blocks.

- **Type:** Newsreader (scholarly serif, for display) + Inter (crisp UI/body).
- **Color:** monochrome slate scale + blue accent; deep-ink (`#0b1220`) bands
  for CTAs and the footer.
- **System:** one shared component library in `css/app.css` (nav, footer,
  page headers, buttons, cards, panels, stats/metrics, book grid, publication
  list, post cards, prose, forms) so every page speaks one language.

## What's new vs. the original
- Brand-new homepage: dot-grid hero with a framed portrait card + live
  profile links, a "What I Do" pillar grid (SVG icons, no emoji), a featured
  book grid, a research **metrics band**, and a closing CTA.
- New chrome: translucent blurred top nav with a Contact CTA; deep-ink footer.
- Every page re-laid-out around the shared component system.
- Articles restyled as clean editorial reading pages (Newsreader + generous
  measure, blue links).
- Books (325 titles) and Research (51 publications) keep their live
  search/filter data, re-rendered with the new card system.

## Preview locally
```bash
cd site-v2
python3 -m http.server 8000   # open http://localhost:8000
```

## Notes
- All original content, copy, assets, links, and SEO metadata preserved.
- Accessibility: visible focus rings, labelled form controls, SVG icons
  (no emoji), `prefers-reduced-motion`, and a full contrast pass
  (no dark-on-dark / light-on-light text).
- This lives alongside the earlier dark-luxury restyle in `site-redesign/`;
  `site-v2/` is the brand-new design.
