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
