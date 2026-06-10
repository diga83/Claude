/* The Cat Encyclopedia — shared client logic (search, rendering, accordions) */
(function () {
  "use strict";

  var DATA = window.CAT_DATA || [];

  /* ---------- SVG icons (Lucide-style, stroke-based) ---------- */

  var STROKE = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

  var ICONS = {
    paw: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><path d="M14.35 17.5c1.4-.84 2.65-2 2.65-3.86 0-2.7-2.55-4.64-5-4.64s-5 1.94-5 4.64c0 1.86 1.25 3.02 2.65 3.86.66.4 1.05 1.12 1.05 1.89V20a1.3 1.3 0 0 0 2.6 0v-.61c0-.77.39-1.49 1.05-1.89Z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    bowl: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z"/><path d="M7 11 9 5"/><path d="m17 11-2-6"/><path d="M12 11V7"/></svg>',
    fish: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/></svg>',
    alert: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    kitten: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>',
    cat: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>',
    brush: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>',
    box: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    chat: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>',
    clock: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    "heart-pulse": '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>',
    home: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
    search: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    chevron: '<svg class="chev" viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    link: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    help: '<svg viewBox="0 0 24 24" ' + STROKE + ' aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>'
  };

  function icon(name) { return ICONS[name] || ICONS.paw; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Flat search index ---------- */

  var INDEX = [];
  DATA.forEach(function (cat) {
    cat.entries.forEach(function (e) {
      INDEX.push({
        cat: cat,
        entry: e,
        haystackQ: e.q.toLowerCase(),
        haystackA: e.a.toLowerCase(),
        haystackT: (e.tags || []).join(" ").toLowerCase()
      });
    });
  });

  var STOPWORDS = ["why", "does", "do", "did", "my", "the", "a", "an", "is", "are", "was",
    "it", "its", "of", "in", "on", "for", "to", "and", "or", "what", "whats", "how",
    "can", "could", "should", "would", "will", "i", "me", "we", "you", "your", "when",
    "where", "which", "with", "from", "at", "be", "have", "has", "cat", "cats", "kitty"];

  function search(query, limit) {
    var raw = query.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!raw.length) return [];
    var terms = raw.filter(function (t) { return STOPWORDS.indexOf(t) === -1; });
    if (!terms.length) terms = raw; // query was all stopwords — fall back
    var phrase = query.toLowerCase().trim();
    var scored = [];
    INDEX.forEach(function (item) {
      var score = 0;
      var matched = 0;
      terms.forEach(function (t) {
        var s = 0;
        if (item.haystackQ.indexOf(t) !== -1) s += 10;
        if (item.haystackT.indexOf(t) !== -1) s += 6;
        if (item.haystackA.indexOf(t) !== -1) s += 2;
        if (s > 0) matched++;
        score += s;
      });
      // require at least half the meaningful terms to match somewhere
      if (matched === 0 || matched < terms.length / 2) return;
      if (matched === terms.length) score += 8;
      if (item.haystackQ.indexOf(phrase) !== -1) score += 15;
      scored.push({ item: item, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, limit || 8).map(function (s) { return s.item; });
  }

  /* ---------- Search dropdown ---------- */

  function wireSearch(input, resultsEl) {
    var activeIdx = -1;

    function render(items, query) {
      activeIdx = -1;
      if (!query.trim()) { resultsEl.hidden = true; resultsEl.innerHTML = ""; return; }
      if (!items.length) {
        resultsEl.innerHTML = '<div class="search-empty">No answers found for &ldquo;' + esc(query) + '&rdquo; &mdash; try different words.</div>';
        resultsEl.hidden = false;
        return;
      }
      resultsEl.innerHTML = items.map(function (it) {
        return '<a class="search-result" href="category.html?cat=' + encodeURIComponent(it.cat.slug) +
          "#" + encodeURIComponent(it.entry.id) + '">' +
          '<span class="sr-cat">' + esc(it.cat.name) + "</span>" +
          '<span class="sr-q">' + esc(it.entry.q) + "</span>" +
          "</a>";
      }).join("");
      resultsEl.hidden = false;
    }

    var debounceTimer;
    input.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        render(search(input.value, 8), input.value);
      }, 120);
    });

    input.addEventListener("keydown", function (ev) {
      var links = resultsEl.querySelectorAll(".search-result");
      if (!links.length) return;
      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault();
        activeIdx += ev.key === "ArrowDown" ? 1 : -1;
        activeIdx = (activeIdx + links.length) % links.length;
        links.forEach(function (l, i) { l.classList.toggle("is-active", i === activeIdx); });
        links[activeIdx].scrollIntoView({ block: "nearest" });
      } else if (ev.key === "Enter" && activeIdx >= 0) {
        ev.preventDefault();
        links[activeIdx].click();
      } else if (ev.key === "Escape") {
        resultsEl.hidden = true;
      }
    });

    document.addEventListener("click", function (ev) {
      if (!resultsEl.contains(ev.target) && ev.target !== input) resultsEl.hidden = true;
    });
  }

  document.querySelectorAll("[data-search]").forEach(function (wrap) {
    var input = wrap.querySelector("input");
    var results = wrap.querySelector(".search-results");
    var iconHolder = wrap.querySelector(".search-icon");
    if (iconHolder) iconHolder.innerHTML = icon("search");
    if (input && results) wireSearch(input, results);
  });

  /* ---------- Brand icon ---------- */

  document.querySelectorAll("[data-brand-icon]").forEach(function (el) {
    el.innerHTML = icon("cat");
  });

  /* ---------- Index page ---------- */

  var grid = document.querySelector("[data-category-grid]");
  if (grid) {
    grid.innerHTML = DATA.map(function (cat) {
      return '<a class="category-card" href="category.html?cat=' + encodeURIComponent(cat.slug) + '">' +
        '<span class="card-icon">' + icon(cat.icon) + "</span>" +
        "<h3>" + esc(cat.name) + "</h3>" +
        "<p>" + esc(cat.tagline) + "</p>" +
        '<span class="count">' + cat.entries.length + " answers</span>" +
        "</a>";
    }).join("");

    var totalQ = INDEX.length;
    var elQ = document.querySelector("[data-stat-questions]");
    var elC = document.querySelector("[data-stat-categories]");
    if (elQ) elQ.textContent = totalQ.toLocaleString();
    if (elC) elC.textContent = DATA.length;
  }

  var popular = document.querySelector("[data-popular]");
  if (popular) {
    var picks = [
      ["behavior", "why-do-cats-purr"],
      ["behavior", "why-do-cats-knead"],
      ["health", "cat-vomiting-when-to-worry"],
      ["can-cats-eat", "can-cats-eat-chocolate"],
      ["toxic", "are-lilies-toxic-to-cats"],
      ["litter-training", "why-is-my-cat-peeing-outside-the-box"],
      ["senior", "how-long-do-cats-live"],
      ["nutrition", "wet-vs-dry-food"],
      ["science", "do-cats-always-land-on-their-feet"],
      ["communication", "cat-tail-positions-meaning"],
      ["kittens", "when-can-kittens-leave-mother"],
      ["science", "do-cats-love-their-owners"]
    ];
    popular.innerHTML = picks.map(function (p) {
      var cat = DATA.find(function (c) { return c.slug === p[0]; });
      if (!cat) return "";
      var entry = cat.entries.find(function (e) { return e.id === p[1]; });
      if (!entry) return "";
      return '<li><a href="category.html?cat=' + encodeURIComponent(cat.slug) + "#" + encodeURIComponent(entry.id) + '">' +
        icon("help") + esc(entry.q) + "</a></li>";
    }).join("");
  }

  /* ---------- Category page ---------- */

  var catRoot = document.querySelector("[data-category-page]");
  if (catRoot) {
    var slug = new URLSearchParams(location.search).get("cat");
    var catIdx = DATA.findIndex(function (c) { return c.slug === slug; });

    if (catIdx === -1) {
      catRoot.innerHTML =
        '<div class="category-hero"><h1>Category not found</h1>' +
        '<p class="tagline">That page doesn&rsquo;t exist. Head back to the <a href="index.html">encyclopedia home</a> to browse all topics.</p></div>';
    } else {
      var cat = DATA[catIdx];
      document.title = cat.name + " — The Cat Encyclopedia";

      var prev = DATA[(catIdx - 1 + DATA.length) % DATA.length];
      var next = DATA[(catIdx + 1) % DATA.length];

      var emergencyNote = "";
      if (cat.slug === "toxic" || cat.slug === "health") {
        emergencyNote =
          '<div class="notice">' + icon("alert") +
          "<div><strong>If this is an emergency:</strong> contact your vet or an emergency clinic now. " +
          "US poison hotlines: ASPCA Animal Poison Control <strong>(888)&nbsp;426-4435</strong> &middot; Pet Poison Helpline <strong>(855)&nbsp;764-7661</strong>.</div></div>";
      }

      catRoot.innerHTML =
        '<div class="category-hero">' +
        '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">All topics</a> / ' + esc(cat.name) + "</nav>" +
        '<h1><span class="card-icon">' + icon(cat.icon) + "</span>" + esc(cat.name) + "</h1>" +
        '<p class="tagline">' + esc(cat.tagline) + "</p>" +
        emergencyNote +
        '<div class="filter-wrap search-wrap">' +
        '<span class="search-icon">' + icon("search") + "</span>" +
        '<label class="visually-hidden" for="filter-input" style="position:absolute;left:-9999px">Filter questions in this category</label>' +
        '<input id="filter-input" class="search-input" type="search" placeholder="Filter ' + cat.entries.length + ' questions in this topic&hellip;" autocomplete="off">' +
        "</div>" +
        '<p class="filter-count" data-filter-count></p>' +
        "</div>" +
        '<div class="qa-list" data-qa-list>' +
        cat.entries.map(function (e) {
          return '<details class="qa-item" id="' + esc(e.id) + '" data-q="' + esc((e.q + " " + (e.tags || []).join(" ")).toLowerCase()) + '">' +
            "<summary>" + esc(e.q) + icon("chevron") + "</summary>" +
            '<div class="qa-body"><p>' + esc(e.a) + "</p>" +
            '<div class="qa-tools"><button class="copy-link" type="button" data-copy="' + esc(e.id) + '">' + icon("link") + "Copy link</button></div>" +
            "</div></details>";
        }).join("") +
        "</div>" +
        '<nav class="cat-nav" aria-label="Category navigation">' +
        '<a href="category.html?cat=' + encodeURIComponent(prev.slug) + '">' + ICONS.arrowLeft + esc(prev.name) + "</a>" +
        '<a href="category.html?cat=' + encodeURIComponent(next.slug) + '">' + esc(next.name) + ICONS.arrowRight + "</a>" +
        "</nav>";

      /* In-category filter */
      var filterInput = catRoot.querySelector("#filter-input");
      var countEl = catRoot.querySelector("[data-filter-count]");
      var items = Array.prototype.slice.call(catRoot.querySelectorAll(".qa-item"));

      function applyFilter() {
        var q = filterInput.value.toLowerCase().trim();
        var visible = 0;
        items.forEach(function (item) {
          var show = !q || item.getAttribute("data-q").indexOf(q) !== -1 ||
            item.querySelector(".qa-body p").textContent.toLowerCase().indexOf(q) !== -1;
          item.style.display = show ? "" : "none";
          if (show) visible++;
        });
        countEl.textContent = q ? visible + " of " + items.length + " questions match" : "";
      }
      filterInput.addEventListener("input", applyFilter);

      /* Copy deep links */
      catRoot.querySelectorAll("[data-copy]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-copy");
          var url = location.origin + location.pathname + "?cat=" + encodeURIComponent(cat.slug) + "#" + encodeURIComponent(id);
          (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
            var original = btn.innerHTML;
            btn.innerHTML = ICONS.link + "Copied!";
            setTimeout(function () { btn.innerHTML = original; }, 1500);
          }).catch(function () {
            window.prompt("Copy this link:", url);
          });
        });
      });

      /* Deep-link: open and highlight the hash target */
      function openHash() {
        var id = decodeURIComponent(location.hash.replace("#", ""));
        if (!id) return;
        var target = document.getElementById(id);
        if (target && target.classList.contains("qa-item")) {
          target.open = true;
          target.classList.add("is-highlighted");
          setTimeout(function () { target.scrollIntoView({ block: "start" }); }, 50);
          setTimeout(function () { target.classList.remove("is-highlighted"); }, 4000);
        }
      }
      openHash();
      window.addEventListener("hashchange", openHash);
    }
  }

  /* ---------- Footer stats ---------- */

  document.querySelectorAll("[data-total-questions]").forEach(function (el) {
    el.textContent = INDEX.length.toLocaleString();
  });
})();
