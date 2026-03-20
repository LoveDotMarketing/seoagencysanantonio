/* ============================================================
   SEO Agency San Antonio — Main JavaScript
   Lightweight, performance-focused, no dependencies
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Dropdown Toggle (Mobile) ---
  document.querySelectorAll('.nav__item--dropdown > .nav__link').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        var parent = trigger.closest('.nav__item--dropdown');
        parent.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', parent.classList.contains('is-open'));
      }
    });
  });

  // --- Header Scroll Shadow ---
  var header = document.getElementById('header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY > 20) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // --- Scroll Reveal Animation ---
  var revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- Animated Counter ---
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  // --- Results Bar Animation ---
  var bars = document.querySelectorAll('.results-card__fill');
  if (bars.length > 0 && 'IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var width = entry.target.getAttribute('data-width');
          entry.target.style.setProperty('--target-width', width);
          entry.target.classList.add('is-visible');
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (bar) {
      barObserver.observe(bar);
    });
  }

  // --- Footer Year ---
  var yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Contact Form Validation (basic) ---
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      var valid = true;

      // Basic validation
      contactForm.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#D32F2F';
        } else {
          field.style.borderColor = '';
        }
      });

      // Email validation
      var emailField = contactForm.querySelector('[type="email"]');
      if (emailField && emailField.value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          valid = false;
          emailField.style.borderColor = '#D32F2F';
        }
      }

      if (valid) {
        // Show success message
        var btn = contactForm.querySelector('[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = '#2E7D32';
        btn.disabled = true;
        contactForm.reset();

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  // --- Audit Form ---
  var auditForm = document.getElementById('audit-form');
  if (auditForm) {
    auditForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = auditForm.querySelector('[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Audit Requested!';
      btn.style.background = '#2E7D32';
      btn.disabled = true;
      auditForm.reset();

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  }

})();
