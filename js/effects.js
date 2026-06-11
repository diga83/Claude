/* Somnia — interactive polish: scroll reveals, count-up stats, card glow.
   Everything respects prefers-reduced-motion. */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal on scroll */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 4) * 45 + 'ms';
      io.observe(el);
    });
  }

  /* Count-up numbers: <span data-countup="81" data-suffix="%"> */
  function initCountUp() {
    const els = document.querySelectorAll('[data-countup]');
    if (!els.length) return;
    function finish(el) {
      el.textContent = el.dataset.prefix !== undefined ? (el.dataset.prefix || '') : '';
      el.textContent = (el.dataset.prefix || '') + el.dataset.countup + (el.dataset.suffix || '');
    }
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(finish);
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        const target = parseFloat(el.dataset.countup);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const dur = 900;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* Pointer-tracked glow on cards (subtle, desktop only) */
  function initGlow() {
    if (reduced || !window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('.card, .plan-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCountUp();
    initGlow();
  });
})();
