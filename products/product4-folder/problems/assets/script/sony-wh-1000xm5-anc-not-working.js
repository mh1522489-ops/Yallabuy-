(function () {
  'use strict';

  /* ===== 1) THEME TOGGLE (مع localStorage + تفضيل النظام) ===== */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var saved = null;
  try { saved = localStorage.getItem('yb-theme'); } catch (e) {}

  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.setAttribute('data-theme', 'dark');
  }

  toggle.addEventListener('click', function () {
    var isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      try { localStorage.setItem('yb-theme', 'light'); } catch (e) {}
    } else {
      root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('yb-theme', 'dark'); } catch (e) {}
    }
  });

  /* ===== 2) MOBILE MENU ===== */
  var menu = document.getElementById('mobileMenu');
  var openBtn = document.getElementById('menuOpen');
  var closeBtn = document.getElementById('menuClose');

  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768 && menu.classList.contains('open')) closeMenu();
  });

  /* ===== 3) FAQ ACCORDION ===== */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.toggle('active');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : '0px';
    });
  });

  /* ===== 4) SCROLL REVEAL ===== */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ===== 5) BACK TO TOP ===== */
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== 6) FOOTER YEAR ===== */
  document.getElementById('year').textContent = new Date().getFullYear();
})();