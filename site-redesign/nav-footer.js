/* nav-footer.js — injected on every page */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const pages = [
    { href: 'index.html',    label: 'Home' },
    { href: 'about.html',    label: 'About' },
    { href: 'subhashini.html', label: 'Subhashini' },
    { href: 'books.html',    label: 'Books' },
    { href: 'research.html', label: 'Research' },
    { href: 'blog.html',     label: 'Blog' },
    { href: 'press.html',    label: 'Press' },
    { href: 'contact.html',  label: 'Contact' },
  ];

  const navLinks = pages.map(p =>
    `<li><a href="${p.href}"${path === p.href ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}"${path === p.href ? ' class="active"' : ''}>${p.label}</a>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav aria-label="Main navigation">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">Dinesh <span>Deckker</span></a>
        <ul class="nav-links">${navLinks}</ul>
        <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" id="hamburger">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile" id="mobile-menu" role="navigation">
        ${mobileLinks}
      </div>
    </nav>
  `);

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
  `);

  // Hamburger toggle
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }
})();
