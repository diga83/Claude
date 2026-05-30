/* nav-footer.js — shared chrome, theming & motion (injected on every page) */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const pages = [
    { href: 'index.html',      label: 'Home' },
    { href: 'about.html',      label: 'About' },
    { href: 'subhashini.html', label: 'Subhashini' },
    { href: 'books.html',      label: 'Books' },
    { href: 'research.html',   label: 'Research' },
    { href: 'blog.html',       label: 'Blog' },
    { href: 'press.html',      label: 'Press' },
    { href: 'contact.html',    label: 'Contact' },
  ];

  const navLinks = pages.map(p =>
    `<li><a href="${p.href}"${path === p.href ? ' class="active" aria-current="page"' : ''}>${p.label}</a></li>`
  ).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}"${path === p.href ? ' class="active" aria-current="page"' : ''}>${p.label}</a>`
  ).join('');

  const sunIcon  = '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moonIcon = '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';

  document.body.insertAdjacentHTML('afterbegin', `
    <a href="#main" class="skip-link">Skip to content</a>
    <nav aria-label="Main navigation" id="site-nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">Dinesh <span>Deckker</span></a>
        <ul class="nav-links">${navLinks}</ul>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle dark mode">${moonIcon}${sunIcon}</button>
        <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu" id="hamburger">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <div>${mobileLinks}</div>
      </div>
    </nav>
  `);

  // Ensure the main landmark is targetable by the skip link
  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'main';

  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div class="footer-inner">
        <div class="footer-grid">
          <div>
            <div class="footer-brand-name">Dinesh Deckker</div>
            <p class="footer-brand-desc">Bestselling KDP author of 300+ books, PhD researcher in Marketing, and digital strategist. Co-creator of the Bible Adventure Series with Subhashini Sumanasekara.</p>
            <div class="footer-brand-email"><a href="mailto:info@dineshdeckker.com">info@dineshdeckker.com</a></div>
          </div>
          <div>
            <div class="footer-col-title">Pages</div>
            <ul class="footer-col-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="books.html">Books</a></li>
              <li><a href="research.html">Research</a></li>
            </ul>
          </div>
          <div>
            <div class="footer-col-title">More</div>
            <ul class="footer-col-links">
              <li><a href="subhashini.html">Subhashini</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="press.html">Press</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <div class="footer-col-title">Profiles</div>
            <ul class="footer-col-links">
              <li><a href="https://www.amazon.com/stores/author/B0CQK7LXR2" target="_blank" rel="noopener">Amazon</a></li>
              <li><a href="https://www.goodreads.com/author/list/30418038.Dinesh_Deckker" target="_blank" rel="noopener">Goodreads</a></li>
              <li><a href="https://www.researchgate.net/profile/Dinesh-Deckker" target="_blank" rel="noopener">ResearchGate</a></li>
              <li><a href="https://tqg.academia.edu/DineshDeckker" target="_blank" rel="noopener">Academia.edu</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">&copy; ${new Date().getFullYear()} Dinesh Deckker. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="index.html">Home</a>
            <a href="contact.html">Contact</a>
            <a href="press.html">Press</a>
          </div>
        </div>
      </div>
    </footer>
    <button class="to-top" id="to-top" type="button" aria-label="Back to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  `);

  /* ── Theme toggle ── */
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  if (toggle) {
    const sync = () => toggle.setAttribute('aria-pressed', currentTheme() === 'dark');
    sync();
    toggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }

  /* ── Hamburger toggle ── */
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ── Scroll-aware nav + back-to-top ── */
  const nav = document.getElementById('site-nav');
  const toTop = document.getElementById('to-top');
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 12);
    if (toTop) toTop.classList.toggle('show', y > 600);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Scroll reveal (respects reduced motion) ── */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelectors = [
    'main section', '.feature-item', '.book-card', '.book-card-home',
    '.paper-home', '.contact-method', '.exp-card', '.cred-item', '.tl-item',
    '.sidebar-card', '.enquiry-type', '.about-body', '.quals-table-wrap',
    '.press-card', '.blog-card', '.post-card', '.hero-portrait', '.hero-card'
  ];
  const targets = [];
  document.querySelectorAll(revealSelectors.join(',')).forEach(el => {
    if (el.closest('nav') || el.closest('footer')) return;
    // Hero animates itself; don't double-handle it.
    if (el.classList.contains('hero') || el.querySelector('.hero-copy')) return;
    targets.push(el);
  });

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
  } else {
    targets.forEach(el => el.setAttribute('data-reveal', ''));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(el => io.observe(el));
    // Failsafe: never leave content hidden
    window.addEventListener('load', () => setTimeout(() =>
      targets.forEach(el => el.classList.add('is-visible')), 1800));
  }
})();
