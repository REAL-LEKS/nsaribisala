/* ============================================================
   Portfolio interactions: theme, nav, filters, reveals
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var stored = null;
  try { stored = localStorage.getItem('nsa-theme'); } catch (e) { /* private mode */ }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  var toggle = document.getElementById('themeToggle');
  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('nsa-theme', next); } catch (e) { /* ignore */ }
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var links = document.querySelector('.nav__links');

  function closeMenu() {
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Scroll: sticky border + progress bar ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('is-stuck', y > 8);

    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Active section in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add('is-in'); }, Math.min(i, 5) * 70);
        obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealables, function (el) { revealer.observe(el); });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Language bars ---------- */
  var bars = document.querySelectorAll('.bar');
  if ('IntersectionObserver' in window) {
    var barObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-filled');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(bars, function (b) { barObs.observe(b); });
  } else {
    Array.prototype.forEach.call(bars, function (b) { b.classList.add('is-filled'); });
  }

  /* ---------- Experience filters ---------- */
  var filters = document.querySelectorAll('.filter');
  var items = document.querySelectorAll('#timeline .tl');

  Array.prototype.forEach.call(filters, function (btn) {
    btn.addEventListener('click', function () {
      var track = btn.dataset.filter;
      // Hiding entries shortens the page, which would otherwise yank the
      // viewport upward, so keep the filter row pinned where the user left it.
      var anchor = btn.getBoundingClientRect().top;

      Array.prototype.forEach.call(filters, function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      Array.prototype.forEach.call(items, function (item) {
        var show = track === 'all' || item.dataset.track === track;
        item.classList.toggle('is-hidden', !show);
        if (show) {
          var card = item.querySelector('.reveal');
          if (card) card.classList.add('is-in');
        }
      });

      var drift = btn.getBoundingClientRect().top - anchor;
      if (drift) window.scrollBy({ top: drift, behavior: 'auto' });
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
