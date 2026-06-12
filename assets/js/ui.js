/* ═══════════════════════════════════════════════════════════════════════════
   UI ENHANCEMENT ENGINE
   Scroll reveal, count-up stats, reading progress, card tilt + spotlight,
   ripple feedback, back-to-top, Ctrl/Cmd+K search, confetti celebrations.
   Loaded by app.js on every page. Every effect respects reduced motion and
   degrades silently — the site works identically without this file.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ───── Scroll reveal with stagger ───── */
  const REVEAL_SELECTOR = [
    '.chapter-card', '.quick-action', '.feat-card', '.gloss-term',
    '.progress-stat', '.rev-section', '.cp-item', '.callout'
  ].join(',');

  let revealObserver = null;

  function setupReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    tagRevealTargets(document);

    // Most lists (chapter cards, glossary, dashboards) render after load —
    // watch for them so late content animates in too.
    const mo = new MutationObserver((muts) => {
      muts.forEach(m => m.addedNodes.forEach(node => {
        if (node.nodeType === 1) tagRevealTargets(node);
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function tagRevealTargets(root) {
    if (!revealObserver) return;
    const items = root.querySelectorAll ? root.querySelectorAll(REVEAL_SELECTOR) : [];
    let i = 0;
    items.forEach(el => {
      if (el.classList.contains('reveal')) return;
      const rect = el.getBoundingClientRect();
      // Don't hide elements already in the viewport on first paint
      if (rect.top < window.innerHeight && rect.bottom > 0 && document.readyState !== 'loading' && performance.now() < 1500) {
        return;
      }
      el.classList.add('reveal');
      el.style.setProperty('--rd', `${Math.min(i, 8) * 45}ms`);
      revealObserver.observe(el);
      i++;
    });
  }

  /* ───── Count-up numbers (hero stats, progress stats) ───── */
  function setupCountUp() {
    const els = document.querySelectorAll('.hero-stat .v, .progress-stat .ps-value');
    if (!els.length) return;
    els.forEach(el => {
      const raw = el.textContent.trim();
      const match = raw.match(/^(\d[\d,]*)(.*)$/);
      if (!match) return;
      const target = parseInt(match[1].replace(/,/g, ''), 10);
      if (isNaN(target) || target === 0) return;
      const suffix = match[2] || '';
      if (reduceMotion) return; // leave final value in place
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          animateCount(el, target, suffix);
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  function animateCount(el, target, suffix) {
    const dur = 1100;
    const t0 = performance.now();
    function frame(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4); // ease-out-quart
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ───── Reading progress bar (long content pages) ───── */
  function setupReadProgress() {
    const content = document.querySelector('.chapter-content, .rev-section');
    if (!content) return;
    const bar = document.createElement('div');
    bar.className = 'read-progress no-print';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    let ticking = false;
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${p})`;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ───── Topbar elevation on scroll ───── */
  function setupTopbarScroll() {
    let ticking = false;
    function update() {
      const tb = document.querySelector('.topbar');
      if (tb) tb.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ───── Card spotlight + 3D tilt (desktop, fine pointer only) ───── */
  function setupCardEffects() {
    if (!finePointer || reduceMotion) return;
    const MAX_TILT = 4; // degrees — subtle, not seasick
    document.body.addEventListener('pointermove', (e) => {
      const card = e.target.closest && e.target.closest('.chapter-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      const rx = ((y / r.height) - 0.5) * -2 * MAX_TILT;
      const ry = ((x / r.width) - 0.5) * 2 * MAX_TILT;
      card.style.transform = `perspective(900px) translateY(-5px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    });
    document.body.addEventListener('pointerout', (e) => {
      const card = e.target.closest && e.target.closest('.chapter-card');
      if (card && (!e.relatedTarget || !card.contains(e.relatedTarget))) {
        card.style.transform = '';
      }
    });
  }

  /* ───── Ripple feedback on tap ───── */
  function setupRipple() {
    if (reduceMotion) return;
    document.body.addEventListener('pointerdown', (e) => {
      const host = e.target.closest && e.target.closest('.btn, .answer-opt, .qopt, .quick-action, .alpha-btn');
      if (!host || host.disabled) return;
      host.classList.add('ripple-host');
      const r = host.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.1;
      const ink = document.createElement('span');
      ink.className = 'ripple-ink';
      ink.style.width = ink.style.height = `${size}px`;
      ink.style.left = `${e.clientX - r.left - size / 2}px`;
      ink.style.top = `${e.clientY - r.top - size / 2}px`;
      host.appendChild(ink);
      setTimeout(() => ink.remove(), 600);
    });
  }

  /* ───── Back to top ───── */
  function setupBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top no-print';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    document.body.appendChild(btn);
    let ticking = false;
    function update() {
      btn.classList.toggle('show', window.scrollY > 600);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ───── Ctrl/Cmd+K search shortcut ───── */
  function setupSearchShortcut() {
    const wrap = document.querySelector('.search-wrap');
    const input = document.getElementById('searchInput');
    if (!wrap || !input) return;
    if (!wrap.querySelector('.search-kbd')) {
      const kbd = document.createElement('span');
      kbd.className = 'search-kbd';
      kbd.textContent = navigator.platform && /Mac/i.test(navigator.platform) ? '⌘K' : 'Ctrl K';
      wrap.appendChild(kbd);
    }
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  /* ───── Confetti celebrations ─────
     window.celebrate(intensity 0..1) — fired automatically when a quiz
     score circle appears with a passing score. */
  function celebrate(intensity) {
    if (reduceMotion) return;
    intensity = Math.max(0.2, Math.min(intensity == null ? 0.7 : intensity, 1));
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const colors = ['#1D4ED8', '#6D28D9', '#0F766E', '#B45309', '#15803D', '#DC2626', '#F472B6'];
    const count = Math.round(90 * intensity) + 30;
    const parts = [];
    for (let i = 0; i < count; i++) {
      parts.push({
        x: canvas.width * (0.2 + Math.random() * 0.6),
        y: -20 - Math.random() * canvas.height * 0.25,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        vx: (Math.random() - 0.5) * 5,
        vy: 2.5 + Math.random() * 3.5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.25,
        color: colors[i % colors.length]
      });
    }
    const t0 = performance.now();
    const DURATION = 2800;
    function frame(t) {
      const elapsed = t - t0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const fade = elapsed > DURATION - 500 ? Math.max(0, (DURATION - elapsed) / 500) : 1;
      ctx.globalAlpha = fade;
      parts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (elapsed < DURATION) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }
  window.celebrate = celebrate;

  function setupQuizCelebration() {
    const mo = new MutationObserver((muts) => {
      muts.forEach(m => m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        const circle = node.matches && node.matches('.score-circle') ? node :
          (node.querySelector ? node.querySelector('.score-circle') : null);
        if (!circle || circle.dataset.celebrated) return;
        circle.dataset.celebrated = '1';
        const valEl = circle.querySelector('.score-value');
        const score = valEl ? parseInt(valEl.textContent, 10) : NaN;
        if (!isNaN(score) && score >= 50) celebrate(score / 100);
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ───── Init ───── */
  function init() {
    setupReveal();
    setupCountUp();
    setupReadProgress();
    setupTopbarScroll();
    setupCardEffects();
    setupRipple();
    setupBackToTop();
    setupSearchShortcut();
    setupQuizCelebration();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init(); // loaded dynamically after DOM ready
  }
})();
