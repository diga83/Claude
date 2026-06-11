/* Service Worker for IGCSE ICT Study Book
   Caches all site files so the app works offline once installed.
*/

const CACHE_NAME = 'igcse-ict-v15';
const ASSETS = [
  './',
  './index.html',
  './videos.html',
  './mcq.html',
  './essay.html',
  './exam-papers.html',
  './drill-print.html',
  './explorer.html',
  './tools.html',
  './writing-tools.html',
  './summaries.html',
  './panic-kit.html',
  './flashcards.html',
  './command-words.html',
  './worked-examples.html',
  './mindmaps.html',
  './mindmap-builder.html',
  './diagrams.html',
  './streaks.html',
  './notes.html',
  './bookmarks.html',
  './glossary.html',
  './progress.html',
  './quiz.html',
  './revision-guide.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/app.js',
  './assets/js/ui.js',
  './assets/js/videos.js',
  './assets/js/data.js',
  './assets/js/question-bank.js',
  './assets/js/streaks.js',
  './assets/js/search-index.js',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './chapters/chapter-1.html',
  './chapters/chapter-2.html',
  './chapters/chapter-3.html',
  './chapters/chapter-4.html',
  './chapters/chapter-5.html',
  './chapters/chapter-6.html',
  './chapters/chapter-7.html',
  './chapters/chapter-8.html',
  './chapters/chapter-9.html',
  './chapters/chapter-10.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Add files one by one — don't fail entire install if one is missing
      return Promise.all(
        ASSETS.map(url => cache.add(url).catch(err => console.warn('SW: failed to cache', url)))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first for HTML, cache-first for assets
  const url = new URL(e.request.url);

  // Skip non-GET and cross-origin
  if (e.request.method !== 'GET') return;
  // Skip Google Fonts and external — let them go to network normally (or fail gracefully)
  if (url.origin !== self.location.origin) return;

  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    // Network-first for navigation requests
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          const respClone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, respClone));
          return resp;
        })
        .catch(() => caches.match(e.request).then(cached => cached || caches.match('./index.html')))
    );
  } else {
    // Cache-first for assets
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(resp => {
          const respClone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, respClone));
          return resp;
        });
      })
    );
  }
});
