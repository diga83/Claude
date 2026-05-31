# Dinesh Deckker — Dark Luxury Redesign

A full restyle of the 18-page author site into a **dark, literary, "candlelit
gold"** aesthetic. Built with the `ui-ux-pro-max` skill. Stays a **static
HTML/CSS site** — no build step, no dependencies. Deploys anywhere.

## What changed

- **Palette** → deep ink backgrounds (`#0b0a0f` / `#16131d` surfaces) with a
  candlelit **gold** accent system (`#d6ac5a` → `#f1cd7e`) and a warm
  terracotta secondary. A subtle radial gold "aura" sits behind every page.
- **Typography** → display headings in **Cormorant Garamond** (high-contrast
  literary serif); long-form article prose in **Libre Baskerville**; small UI
  labels/buttons stay in **Source Sans 3** for crisp legibility.
- **Navigation** → translucent blurred bar with a gold hairline and an animated
  underline on hover/active.
- **Components** → gold gradient primary buttons, dark cards with gold-tinted
  hairlines, gold filter/category active states, gold focus rings, and a
  dark-mode contact success message.
- **Accessibility** → visible `:focus-visible` rings, `prefers-reduced-motion`
  support, and a full contrast pass (no dark-on-dark / light-on-light text).

## Architecture

The site shares one global stylesheet (`css/style.css`) plus per-page inline
`<style>` blocks, and injects the nav/footer via `nav-footer.js`. The redesign
is driven primarily through **`:root` design tokens** so the per-page inline
styles inherit the dark theme automatically. The legacy variable names are kept
but remapped:

| Token | Old (light) | New (dark luxury) |
|-------|-------------|-------------------|
| `--navy` | deep chocolate (dark anchor) | dark ink anchor `#16131d` |
| `--white` | surface **and** light text | warm paper **text** `#f6efe2` |
| `--cream` / `--cream-dark` | light backgrounds | base / raised **ink** |
| `--gold` | mustard `#d99a00` | candlelit gold `#d6ac5a` |
| `--text-*` | near-black | warm light tints |

Two mechanical transforms resolved the only overloaded cases:
`background:var(--white)` → dark surface, and heading `color:var(--navy)` →
light paper text. Genuine dark-on-gold chips (avatars, the lightbox close,
gold filter pills) keep dark `#1b1305` ink.

## Preview locally

```bash
cd site-redesign
python3 -m http.server 8000
# open http://localhost:8000
```

(The site is the original content — every page, asset, and link preserved —
restyled. No copy was changed.)
