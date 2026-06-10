/* Lucide-style stroke icons shared by server-rendered components.
   The client script (public/scripts/site.js) carries its own copy. */
const S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

export const ICONS = {
  paw: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><path d="M14.35 17.5c1.4-.84 2.65-2 2.65-3.86 0-2.7-2.55-4.64-5-4.64s-5 1.94-5 4.64c0 1.86 1.25 3.02 2.65 3.86.66.4 1.05 1.12 1.05 1.89V20a1.3 1.3 0 0 0 2.6 0v-.61c0-.77.39-1.49 1.05-1.89Z"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  bowl: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z"/><path d="M7 11 9 5"/><path d="m17 11-2-6"/><path d="M12 11V7"/></svg>`,
  fish: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  kitten: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>`,
  cat: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>`,
  brush: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>`,
  box: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  "heart-pulse": `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>`,
  home: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  search: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
  link: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>`,
  help: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
  check: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
  shuffle: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><path d="M21.17 6.83 17.17 2.83a2 2 0 0 0-2.83 0L3 14.17V21h6.83L21.17 9.66a2 2 0 0 0 0-2.83Z"/><path d="m15 5 4 4"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" ${S} aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`
};

export function icon(name) {
  return ICONS[name] || ICONS.paw;
}
