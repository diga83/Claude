/* ==========================================================================
   Al Injaz International Private School — interactions
   Mobile nav, sticky header shadow, accordions, scroll reveal, form handling
   ========================================================================== */
(function () {
  'use strict';

  /* ----- Current year in footer ----- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ----- Sticky header shadow on scroll ----- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----- Mobile menu toggle ----- */
  var menuBtn = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.querySelector('.icon-open').classList.toggle('hidden', open);
      menuBtn.querySelector('.icon-close').classList.toggle('hidden', !open);
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.querySelector('.icon-open').classList.remove('hidden');
        menuBtn.querySelector('.icon-close').classList.add('hidden');
      });
    });
  }

  /* ----- Accordions (FAQ / academics) ----- */
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var panel = trigger.nextElementSibling;
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.style.maxHeight = expanded ? '0px' : panel.scrollHeight + 'px';
    });
  });

  /* ----- Scroll reveal (respects reduced motion) ----- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ----- Animated stat counters ----- */
  var stats = document.querySelectorAll('[data-count]');
  if (stats.length && 'IntersectionObserver' in window && !reduceMotion) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var start = 0, dur = 1400, t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          el.textContent = Math.floor(p * (target - start) + start) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        statIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (el) { statIO.observe(el); });
  }

  /* ----- Contact / Admissions form (Web3Forms, no backend) ----- */
  document.querySelectorAll('form[data-school-form]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('[type="submit"]');

    var showError = function (field, msg) {
      field.setAttribute('aria-invalid', 'true');
      var err = form.querySelector('[data-error-for="' + field.name + '"]');
      if (err) { err.textContent = msg; err.classList.add('show'); }
    };
    var clearError = function (field) {
      field.removeAttribute('aria-invalid');
      var err = form.querySelector('[data-error-for="' + field.name + '"]');
      if (err) { err.classList.remove('show'); }
    };

    // Validate on blur
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('blur', function () {
        if (!field.value.trim()) showError(field, 'This field is required.');
        else if (field.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value)) showError(field, 'Please enter a valid email address.');
        else clearError(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) { status.textContent = ''; status.className = 'form-status'; status.style.display = 'none'; }

      // Validate
      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        var bad = !field.value.trim() ||
          (field.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value));
        if (bad) { showError(field, field.type === 'email' ? 'Please enter a valid email address.' : 'This field is required.'); if (!firstInvalid) firstInvalid = field; }
        else clearError(field);
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      // Submit to Web3Forms
      var data = new FormData(form);
      submitBtn.disabled = true;
      var original = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (json.success) {
          form.reset();
          if (status) { status.className = 'form-status success'; status.style.display = 'block';
            status.textContent = 'Thank you! Your enquiry has been received. Our admissions team will contact you shortly.'; }
        } else { throw new Error(json.message || 'Submission failed'); }
      })
      .catch(function () {
        if (status) { status.className = 'form-status error'; status.style.display = 'block';
          status.textContent = 'Sorry, something went wrong. Please call us or message us on WhatsApp instead.'; }
      })
      .finally(function () { submitBtn.disabled = false; submitBtn.textContent = original; });
    });
  });
})();
