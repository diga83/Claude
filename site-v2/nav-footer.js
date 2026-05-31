/* nav-footer.js — v2 modern-academic chrome, injected on every page */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const pages = [
    { href: 'index.html',     label: 'Home' },
    { href: 'about.html',     label: 'About' },
    { href: 'books.html',     label: 'Books' },
    { href: 'research.html',  label: 'Research' },
    { href: 'blog.html',      label: 'Writing' },
    { href: 'subhashini.html',label: 'Co-Author' },
    { href: 'press.html',     label: 'Press' },
  ];

  const isActive = h => path === h ? ' class="active"' : '';
  const navLinks = pages.map(p => `<li><a href="${p.href}"${isActive(p.href)}>${p.label}</a></li>`).join('');
  const mobileLinks = pages.concat([{href:'contact.html',label:'Contact'}])
    .map(p => `<a href="${p.href}"${isActive(p.href)}>${p.label}</a>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav aria-label="Main navigation">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo" aria-label="Dinesh Deckker — home">
          <span class="nm">Dinesh <b>Deckker</b></span>
          <span class="rl">Author · Researcher</span>
        </a>
        <ul class="nav-links">${navLinks}</ul>
        <a href="contact.html" class="btn btn-primary nav-cta">Contact</a>
        <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" id="hamburger">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile" id="mobile-menu" role="navigation">${mobileLinks}</div>
    </nav>
  `);

  const year = new Date().getFullYear();
  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div class="ft-inner">
        <div class="ft-grid">
          <div>
            <div class="ft-name">Dinesh Deckker</div>
            <p class="ft-desc">Bestselling KDP author of 300+ books, PhD researcher in Marketing, and digital strategist. Co-creator of the Bible Adventure Series with Subhashini Sumanasekara.</p>
            <a class="ft-email" href="mailto:info@dineshdeckker.com">info@dineshdeckker.com</a>
          </div>
          <div>
            <div class="ft-col-title">Explore</div>
            <ul class="ft-links">
              <li><a href="about.html">About</a></li>
              <li><a href="books.html">Books</a></li>
              <li><a href="research.html">Research</a></li>
              <li><a href="blog.html">Writing</a></li>
            </ul>
          </div>
          <div>
            <div class="ft-col-title">More</div>
            <ul class="ft-links">
              <li><a href="subhashini.html">Co-Author</a></li>
              <li><a href="press.html">Press</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <div class="ft-col-title">Profiles</div>
            <ul class="ft-links">
              <li><a href="https://www.amazon.com/stores/author/B0CQK7LXR2" target="_blank" rel="noopener">Amazon</a></li>
              <li><a href="https://scholar.google.com/citations?user=O1ClPTwAAAAJ" target="_blank" rel="noopener">Google Scholar</a></li>
              <li><a href="https://www.researchgate.net/profile/Dinesh-Deckker" target="_blank" rel="noopener">ResearchGate</a></li>
              <li><a href="https://www.goodreads.com/author/list/30418038.Dinesh_Deckker" target="_blank" rel="noopener">Goodreads</a></li>
            </ul>
          </div>
        </div>
        <div class="ft-bottom">
          <p class="ft-copy">© ${year} Dinesh Deckker. All rights reserved.</p>
          <div class="ft-bottom-links">
            <a href="index.html">Home</a>
            <a href="contact.html">Contact</a>
            <a href="press.html">Press</a>
          </div>
        </div>
      </div>
    </footer>
  `);

  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }
})();

/* ============================================================
   Dynamic effects: scroll progress, reactive nav, back-to-top,
   scroll-reveal entrances, count-up stats, portrait tilt.
   Progressive enhancement — gated behind prefers-reduced-motion.
   ============================================================ */
(function () {
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- always-on (motion-light) chrome: progress bar, nav state, back-to-top --- */
  const bar = document.createElement('div');
  bar.className = 'scrollbar';
  document.body.appendChild(bar);

  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  document.body.appendChild(toTop);

  const nav = document.querySelector('nav');
  let ticking = false;
  function onScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', st > 8);
    toTop.classList.toggle('show', st > 480);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (reduce) return; // honor reduced-motion: no entrance / count / parallax

  function init() {
    const vh = window.innerHeight;

    /* --- scroll-reveal --- */
    const sel = '.pillar,.bk,.metric,.pub,.post-card,.post-featured,.card,.cmethod,.enq,' +
      '.exp,.clip-card,.speaking-card,.retailer-card,.panel,.bio-box,.coverage-item,' +
      '.tl-item,.cred,.pc,.stat-band,.cta-band,.online-band,.side-cta,.press-cta,' +
      '.sec-title,.sec-lead,.rule,.related-card,.subscribe';
    const els = [].slice.call(document.querySelectorAll(sel));
    const counter = new Map();
    // content-aware reveal variant
    const ZOOM = '.bk,.card,.metric,.clip-card,.retailer-card,.related-card,.post-card,.pillar,.enq,.pc,.exp,.cmethod';
    const CLIP = '.sec-title';
    const LEFT = '.panel,.side-cta,.press-cta,.subscribe';
    function variant(el) {
      if (el.classList.contains('rule')) return null;        // rule has its own draw
      if (el.matches(CLIP)) return 'clip';
      if (el.matches(ZOOM)) return 'zoom';
      if (el.matches(LEFT)) return 'left';
      return 'rise';
    }
    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });
    }
    els.forEach((el) => {
      const v = variant(el);
      if (v) el.setAttribute('data-rv', v);
      el.classList.add('reveal');
      const p = el.parentElement;
      const i = counter.get(p) || 0; counter.set(p, i + 1);
      const r = el.getBoundingClientRect();
      const inView = r.top < vh * 0.94 && r.bottom > 0;
      if (inView || !io) {
        el.classList.add('in'); // already visible → no flash, no animation
      } else {
        el.style.setProperty('--d', Math.min(i * 80, 360) + 'ms');
        io.observe(el);
      }
    });
    // safety net: ensure nothing stays hidden
    setTimeout(() => els.forEach((el) => el.classList.add('in')), 2600);

    /* --- count-up numbers --- */
    function countUp(el) {
      const raw = el.textContent.trim();
      const m = raw.match(/^(\D*?)(\d[\d,]*)(\D*)$/);
      if (!m) return;
      const pre = m[1], suf = m[3], target = parseInt(m[2].replace(/,/g, ''), 10);
      if (!isFinite(target) || target === 0) return;
      const dur = 1100; let start = null;
      const fmt = (n) => n.toLocaleString('en-US');
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const val = Math.round((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = pre + fmt(val) + suf;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = pre + fmt(target) + suf;
      }
      requestAnimationFrame(step);
    }
    const nums = [].slice
      .call(document.querySelectorAll('.metric .n,.stat-band .n,.stat-num,.stat-num b'))
      .filter((el) => el.children.length === 0 && /\d/.test(el.textContent));
    if ('IntersectionObserver' in window) {
      const io2 = new IntersectionObserver((ents) => {
        ents.forEach((e) => { if (e.isIntersecting) { countUp(e.target); io2.unobserve(e.target); } });
      }, { threshold: 0.5 });
      nums.forEach((el) => io2.observe(el));
    } else { nums.forEach(countUp); }

    /* --- portrait tilt (fine pointers only) --- */
    if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
      const pcard = document.querySelector('.pcard');
      if (pcard && pcard.parentElement) {
        const wrap = pcard.parentElement;
        wrap.addEventListener('pointermove', (ev) => {
          const r = pcard.getBoundingClientRect();
          const dx = (ev.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (ev.clientY - (r.top + r.height / 2)) / r.height;
          pcard.style.transform =
            'perspective(900px) rotateY(' + (dx * 4).toFixed(2) + 'deg) rotateX(' +
            (-dy * 4).toFixed(2) + 'deg) translateY(-2px)';
        });
        wrap.addEventListener('pointerleave', () => { pcard.style.transform = ''; });
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
