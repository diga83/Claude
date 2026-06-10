/* The Cat Encyclopedia — client interactivity.
   Pages are fully server-rendered; this layers on: command palette (lazy
   search index), theme toggle, reveals, tilt, accordions, TOC spy, toasts. */
(function () {
  "use strict";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COARSE = window.matchMedia("(pointer: coarse)").matches;

  var S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    paw: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><path d="M14.35 17.5c1.4-.84 2.65-2 2.65-3.86 0-2.7-2.55-4.64-5-4.64s-5 1.94-5 4.64c0 1.86 1.25 3.02 2.65 3.86.66.4 1.05 1.12 1.05 1.89V20a1.3 1.3 0 0 0 2.6 0v-.61c0-.77.39-1.49 1.05-1.89Z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    bowl: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z"/><path d="M7 11 9 5"/><path d="m17 11-2-6"/><path d="M12 11V7"/></svg>',
    fish: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/></svg>',
    alert: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    kitten: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>',
    cat: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>',
    brush: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>',
    box: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    chat: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>',
    clock: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    "heart-pulse": '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>',
    home: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
    search: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    link: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>',
    check: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>',
    enter: '<svg viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>',
    sun: '<svg class="theme-icon-sun" viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    moon: '<svg class="theme-icon-moon" viewBox="0 0 24 24" ' + S + ' aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
  };
  function icon(name) { return ICONS[name] || ICONS.paw; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- lazy search index ---------- */

  /* In the portable (file://) build, window.__CE_BASE holds the relative
     prefix to the site root; site-absolute URLs must be rewritten. */
  function resolveUrl(u) {
    if (!window.__CE_BASE || u.charAt(0) !== "/") return u;
    var hashIdx = u.search(/[#?]/);
    var path = hashIdx === -1 ? u : u.slice(0, hashIdx);
    var suffix = hashIdx === -1 ? "" : u.slice(hashIdx);
    path = path.slice(1);
    if (path === "" || path.slice(-1) === "/") path += "index.html";
    return window.__CE_BASE + path + suffix;
  }

  var indexPromise = null;
  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch("/search-index.json").then(function (r) { return r.json(); });
    }
    return indexPromise;
  }

  var STOPWORDS = ["why", "does", "do", "did", "my", "the", "a", "an", "is", "are", "was",
    "it", "its", "of", "in", "on", "for", "to", "and", "or", "what", "whats", "how",
    "can", "could", "should", "would", "will", "i", "me", "we", "you", "your", "when",
    "where", "which", "with", "from", "at", "be", "have", "has", "cat", "cats", "kitty"];

  function search(data, query, limit) {
    var raw = query.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!raw.length) return [];
    var terms = raw.filter(function (t) { return STOPWORDS.indexOf(t) === -1; });
    if (!terms.length) terms = raw;
    var phrase = query.toLowerCase().trim();
    var scored = [];
    data.index.forEach(function (item) {
      var hq = item.q.toLowerCase(), ha = item.a.toLowerCase(), ht = item.t.toLowerCase();
      var score = 0, matched = 0;
      terms.forEach(function (t) {
        var s = 0;
        if (hq.indexOf(t) !== -1) s += 10;
        if (ht.indexOf(t) !== -1) s += 6;
        if (ha.indexOf(t) !== -1) s += 2;
        if (s > 0) matched++;
        score += s;
      });
      if (matched === 0 || matched < terms.length / 2) return;
      if (matched === terms.length) score += 8;
      if (hq.indexOf(phrase) !== -1) score += 15;
      scored.push({ item: item, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, limit || 10).map(function (s) { return s.item; });
  }

  /* ---------- theme ---------- */

  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.innerHTML = ICONS.sun + ICONS.moon;
    themeBtn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("ce-theme", next); } catch (e) { /* private mode */ }
    });
  }

  /* ---------- toast ---------- */

  var toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");
  document.body.appendChild(toastEl);
  var toastTimer;
  function toast(msg) {
    toastEl.innerHTML = ICONS.check + esc(msg);
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ---------- recents ---------- */

  function getRecents() {
    try { return JSON.parse(localStorage.getItem("ce-recents") || "[]"); } catch (e) { return []; }
  }
  function pushRecentUrl(url) {
    var r = getRecents().filter(function (x) { return x !== url; });
    r.unshift(url);
    try { localStorage.setItem("ce-recents", JSON.stringify(r.slice(0, 5))); } catch (e) { /* ignore */ }
  }

  /* ---------- command palette ---------- */

  var overlay = document.createElement("div");
  overlay.className = "palette-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Search the encyclopedia");
  overlay.innerHTML =
    '<div class="palette">' +
    '<div class="palette-head">' + ICONS.search +
    '<input class="palette-input" type="text" placeholder="Ask anything about cats&hellip;" aria-label="Search questions" autocomplete="off" spellcheck="false">' +
    '<button class="palette-close" type="button" aria-label="Close search">ESC</button></div>' +
    '<div class="palette-body" role="listbox"><div class="palette-empty">Loading&hellip;</div></div>' +
    '<div class="palette-foot"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> navigate</span>' +
    "<span><kbd>&crarr;</kbd> open</span><span><kbd>esc</kbd> close</span></div></div>";
  document.body.appendChild(overlay);

  var palInput = overlay.querySelector(".palette-input");
  var palBody = overlay.querySelector(".palette-body");
  var palActive = -1;
  var lastFocus = null;

  function itemHtml(item, iconName) {
    return '<a class="palette-item" role="option" href="' + esc(resolveUrl(item.url)) + '" data-track="1">' +
      '<span class="pi-icon">' + icon(iconName || item.icon) + "</span>" +
      '<span class="pi-text"><span class="pi-q">' + esc(item.q) + '</span><span class="pi-cat">' + esc(item.catName) + "</span></span>" +
      '<span class="pi-enter">' + ICONS.enter + "</span></a>";
  }

  function renderDefault(data) {
    var html = "";
    var recents = getRecents()
      .map(function (url) { return data.index.find(function (it) { return it.url === url; }); })
      .filter(Boolean);
    if (recents.length) {
      html += '<div class="palette-section-label">Recently viewed</div>';
      html += recents.map(function (it) { return itemHtml(it, "clock"); }).join("");
    }
    html += '<div class="palette-section-label">Browse topics</div>';
    html += data.categories.map(function (c) {
      return '<a class="palette-item" role="option" href="' + esc(resolveUrl(c.url)) + '">' +
        '<span class="pi-icon">' + icon(c.icon) + "</span>" +
        '<span class="pi-text"><span class="pi-q">' + esc(c.name) + '</span><span class="pi-cat">' + c.count + " answers</span></span>" +
        '<span class="pi-enter">' + ICONS.enter + "</span></a>";
    }).join("");
    palBody.innerHTML = html;
    palActive = -1;
  }

  function renderResults(data, q) {
    var items = search(data, q, 10);
    if (!items.length) {
      palBody.innerHTML = '<div class="palette-empty">No answers found for &ldquo;' + esc(q) + '&rdquo;<br>Try different words &mdash; or blame the cat.</div>';
      palActive = -1;
      return;
    }
    palBody.innerHTML = '<div class="palette-section-label">' + items.length + " answers</div>" +
      items.map(function (it) { return itemHtml(it); }).join("");
    palActive = 0;
    highlightActive();
  }

  function highlightActive() {
    var links = palBody.querySelectorAll(".palette-item");
    links.forEach(function (l, i) { l.classList.toggle("active", i === palActive); });
    if (palActive >= 0 && links[palActive]) links[palActive].scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    lastFocus = document.activeElement;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    palInput.value = "";
    loadIndex().then(renderDefault);
    setTimeout(function () { palInput.focus(); }, 60);
  }

  function closePalette() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  var palTimer;
  palInput.addEventListener("input", function () {
    clearTimeout(palTimer);
    palTimer = setTimeout(function () {
      var q = palInput.value.trim();
      loadIndex().then(function (data) {
        if (q) renderResults(data, q); else renderDefault(data);
      });
    }, 110);
  });

  palInput.addEventListener("keydown", function (ev) {
    var links = palBody.querySelectorAll(".palette-item");
    if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
      ev.preventDefault();
      if (!links.length) return;
      palActive += ev.key === "ArrowDown" ? 1 : -1;
      palActive = (palActive + links.length) % links.length;
      highlightActive();
    } else if (ev.key === "Enter") {
      if (palActive >= 0 && links[palActive]) { ev.preventDefault(); links[palActive].click(); }
      else if (links.length) { ev.preventDefault(); links[0].click(); }
    }
  });

  palBody.addEventListener("click", function (ev) {
    var item = ev.target.closest(".palette-item");
    if (item && item.hasAttribute("data-track")) pushRecentUrl(item.getAttribute("href"));
  });

  overlay.addEventListener("click", function (ev) { if (ev.target === overlay) closePalette(); });
  overlay.querySelector(".palette-close").addEventListener("click", closePalette);

  document.addEventListener("keydown", function (ev) {
    if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === "k") {
      ev.preventDefault();
      overlay.classList.contains("open") ? closePalette() : openPalette();
    } else if (ev.key === "Escape" && overlay.classList.contains("open")) {
      closePalette();
    } else if (ev.key === "/" && !overlay.classList.contains("open") &&
      !/^(input|textarea|select)$/i.test((document.activeElement || {}).tagName || "")) {
      ev.preventDefault();
      openPalette();
    }
  });

  document.querySelectorAll("[data-open-palette]").forEach(function (el) {
    el.addEventListener("click", function () { openPalette(); });
  });

  /* ---------- surprise me ---------- */

  var factOverlay = document.createElement("div");
  factOverlay.className = "palette-overlay fact-modal";
  factOverlay.setAttribute("role", "dialog");
  factOverlay.setAttribute("aria-modal", "true");
  factOverlay.setAttribute("aria-label", "Random cat fact");
  factOverlay.innerHTML =
    '<div class="palette">' +
    '<div class="fact-content"></div>' +
    '<div class="fact-actions">' +
    '<button class="btn-primary" type="button" data-another>' + ICONS.shuffle + "Another one</button>" +
    '<a class="chip-btn" href="#" data-open-full>' + ICONS.arrowRight + "Read in context</a>" +
    '<button class="chip-btn" type="button" data-close-fact>Close</button>' +
    "</div></div>";
  document.body.appendChild(factOverlay);

  var factContent = factOverlay.querySelector(".fact-content");
  var factFull = factOverlay.querySelector("[data-open-full]");

  function showRandomFact(data) {
    var pick = data.index[Math.floor(Math.random() * data.index.length)];
    factContent.innerHTML =
      '<span class="fact-cat">' + icon(pick.icon) + esc(pick.catName) + "</span>" +
      "<h2>" + esc(pick.q) + "</h2>" +
      "<p>" + esc(pick.a) + "</p>";
    factFull.setAttribute("href", resolveUrl(pick.url));
    pushRecentUrl(pick.url);
  }

  function openFact() {
    loadIndex().then(function (data) {
      showRandomFact(data);
      factOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
      setTimeout(function () { factOverlay.querySelector("[data-another]").focus(); }, 60);
    });
  }
  function closeFact() {
    factOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  factOverlay.querySelector("[data-another]").addEventListener("click", function () {
    loadIndex().then(showRandomFact);
  });
  factOverlay.querySelector("[data-close-fact]").addEventListener("click", closeFact);
  factOverlay.addEventListener("click", function (ev) { if (ev.target === factOverlay) closeFact(); });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && factOverlay.classList.contains("open")) closeFact();
  });
  document.querySelectorAll("[data-surprise]").forEach(function (el) {
    el.addEventListener("click", function (ev) { ev.preventDefault(); openFact(); });
  });

  /* ---------- back to top + progress bar ---------- */

  var backTop = document.createElement("button");
  backTop.className = "back-top";
  backTop.type = "button";
  backTop.setAttribute("aria-label", "Back to top");
  backTop.innerHTML = ICONS.arrowUp;
  document.body.appendChild(backTop);
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
  });

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      backTop.classList.toggle("show", window.scrollY > 600);
      var bar = document.querySelector(".progress-bar");
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
      }
      ticking = false;
    });
  }, { passive: true });

  /* ---------- reveals ---------- */

  var revealEls = document.querySelectorAll(".reveal:not(.in)");
  if (REDUCED || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3D tilt ---------- */

  if (!REDUCED && !COARSE) {
    document.querySelectorAll(".category-card").forEach(function (card) {
      card.addEventListener("mousemove", function (ev) {
        var r = card.getBoundingClientRect();
        var rx = ((ev.clientY - r.top) / r.height - 0.5) * -7;
        var ry = ((ev.clientX - r.left) / r.width - 0.5) * 7;
        card.style.transform = "perspective(700px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ---------- hero typewriter + parallax ---------- */

  var phEl = document.querySelector("[data-typewriter]");
  if (phEl) {
    var SAMPLES = [
      "why does my cat knead me?",
      "can cats eat chocolate?",
      "are lilies dangerous?",
      "why the 3am zoomies?",
      "how long do cats live?",
      "do cats love their owners?"
    ];
    if (REDUCED) {
      phEl.textContent = 'Ask anything… "' + SAMPLES[0] + '"';
    } else {
      var si = 0, ci = 0, deleting = false;
      var caret = document.createElement("span");
      caret.className = "type-caret";
      (function tick() {
        var word = SAMPLES[si];
        ci += deleting ? -1 : 1;
        phEl.textContent = "Ask anything… “" + word.slice(0, ci) + "”";
        phEl.appendChild(caret);
        var delay = deleting ? 28 : 55;
        if (!deleting && ci === word.length) { deleting = true; delay = 1900; }
        else if (deleting && ci === 0) { deleting = false; si = (si + 1) % SAMPLES.length; delay = 350; }
        setTimeout(tick, delay);
      })();
    }

    if (!REDUCED && !COARSE) {
      var decors = document.querySelectorAll(".float-decor");
      document.addEventListener("mousemove", function (ev) {
        var dx = (ev.clientX / window.innerWidth - 0.5);
        var dy = (ev.clientY / window.innerHeight - 0.5);
        decors.forEach(function (d, i) {
          var depth = (i % 3 + 1) * 9;
          d.style.transform = "translate(" + (dx * depth) + "px," + (dy * depth) + "px)";
        });
      }, { passive: true });
    }
  }

  /* ---------- counters ---------- */

  document.querySelectorAll("[data-count-to]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count-to"), 10);
    if (isNaN(target) || REDUCED || !("IntersectionObserver" in window)) return;
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io2.disconnect();
        var start = null, dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    io2.observe(el);
  });

  /* ---------- accordions (topic pages) ---------- */

  var qaList = document.querySelector("[data-qa-list]");
  if (qaList) {
    var items = Array.prototype.slice.call(qaList.querySelectorAll(".qa-item"));

    function setOpen(item, open) {
      item.classList.toggle("open", open);
      var btn = item.querySelector(".qa-toggle");
      if (btn) btn.setAttribute("aria-expanded", String(open));
    }

    qaList.querySelectorAll(".qa-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".qa-item");
        setOpen(item, !item.classList.contains("open"));
      });
    });

    var filterInput = document.getElementById("filter-input");
    var countEl = document.querySelector("[data-filter-count]");
    if (filterInput) {
      filterInput.addEventListener("input", function () {
        var q = filterInput.value.toLowerCase().trim();
        var visible = 0;
        items.forEach(function (item) {
          var body = item.querySelector(".qa-body p");
          var show = !q || item.getAttribute("data-q").indexOf(q) !== -1 ||
            (body && body.textContent.toLowerCase().indexOf(q) !== -1);
          item.style.display = show ? "" : "none";
          if (show) visible++;
        });
        if (countEl) countEl.textContent = q ? visible + " of " + items.length + " questions match" : "";
      });
    }

    function openHash() {
      var id = decodeURIComponent(location.hash.replace("#", ""));
      if (!id) return;
      var target = document.getElementById(id);
      if (target && target.classList.contains("qa-item")) {
        setOpen(target, true);
        target.classList.add("is-highlighted", "in");
        setTimeout(function () { target.scrollIntoView({ block: "start", behavior: REDUCED ? "auto" : "smooth" }); }, 80);
        setTimeout(function () { target.classList.remove("is-highlighted"); }, 4000);
      }
    }
    openHash();
    window.addEventListener("hashchange", openHash);

    var tocLinks = document.querySelectorAll("[data-toc]");
    if (tocLinks.length && "IntersectionObserver" in window) {
      var spyIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            tocLinks.forEach(function (l) {
              l.classList.toggle("active", l.getAttribute("data-toc") === en.target.id);
            });
          }
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      items.forEach(function (item) { spyIo.observe(item); });
    }
    tocLinks.forEach(function (l) {
      l.addEventListener("click", function () {
        var target = document.getElementById(l.getAttribute("data-toc"));
        if (target) setOpen(target, true);
      });
    });
  }

  /* ---------- copy links (any page) ---------- */

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = location.origin + btn.getAttribute("data-copy");
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
        toast("Link copied to clipboard");
      }).catch(function () {
        window.prompt("Copy this link:", url);
      });
    });
  });

  /* remember question pages as recents */
  var path = location.pathname;
  if (/^\/[a-z-]+\/[a-z0-9-]+\/?$/.test(path) && path.indexOf("/blog/") !== 0) {
    loadIndex().then(function (data) {
      var hit = data.index.find(function (it) { return it.url === path || it.url === path + "/" || it.url === path.replace(/\/$/, "") + "/"; });
      if (hit) pushRecentUrl(hit.url);
    });
  }
})();
