# Astra — birth chart & forecast

An astrology website that computes real planetary positions for your birth moment and reads them through the main predictive systems:

- **Western (tropical):** natal chart wheel, Placidus or Whole Sign houses, aspects, transits of Jupiter–Pluto for the next 12 months with exact dates, secondary progressions (progressed Moon and lunar phase), and the solar return.
- **Vedic (sidereal, Lahiri):** South-Indian rāśi chart, nakshatras and padas, and a full Vimshottari dasha timeline with antardashas.

## Accuracy

Positions come from [astronomy-engine](https://github.com/cosinekitty/astronomy) (VSOP87/ELP). The test suite compares results against the Swiss Ephemeris: planets agree to within 30″, and Placidus cusps and the sidereal Moon match too. Birth times are converted to UTC using the historical time-zone and DST rules for the birthplace. Place search uses the free Open-Meteo geocoding API, and coordinates can also be entered by hand.

The interpretations are traditional and symbolic. Controlled studies have not shown astrology to predict events or personality, so the site says this on its Methods page.

## Development

```bash
npm install
npm run dev     # local dev server
npm test        # accuracy tests
npm run build   # static site in dist/
```

`dist/` is a static site that can be hosted anywhere (Netlify, Vercel, GitHub Pages).

## Layout

- `src/astro/core.js` — positions, angles, Placidus/Whole Sign houses
- `src/astro/vedic.js` — Lahiri ayanamsa, nakshatras, Vimshottari dasha
- `src/astro/chart.js` — chart assembly, aspects, transits, progressions, solar return
- `src/astro/interpret.js` — interpretive texts
- `src/astro/time.js` — local time → UTC
- `src/ui/wheel.js` — SVG wheel and South-Indian chart
- `src/main.js` — form and page rendering
