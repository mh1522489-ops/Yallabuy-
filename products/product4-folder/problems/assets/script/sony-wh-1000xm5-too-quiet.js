// ===== Theme Toggle =====
(function() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const icon = document.getElementById('themeIcon');

  const sunSVG = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  const moonSVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

  // Load saved theme
  const saved = localStorage.getItem('yallabuy-theme');
  if (saved === 'dark') {
    html.setAttribute('data-theme', 'dark');
    icon.innerHTML = moonSVG;
  }

  toggle.addEventListener('click', function() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
      html.setAttribute('data-theme', 'light');
      icon.innerHTML = sunSVG;
      localStorage.setItem('yallabuy-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      icon.innerHTML = moonSVG;
      localStorage.setItem('yallabuy-theme', 'dark');
    }
  });
})();

// ===== Mobile Menu =====
(function() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  const close = document.getElementById('mobileMenuClose');

  btn.addEventListener('click', function() {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', function() {
    menu.classList.remove('open');
    document.body.style.overflow = '';
  });
})();

// ===== FAQ Accordion =====
(function() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(function(item) {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', function() {
      const isOpen = item.classList.contains('active');

      // Close all
      items.forEach(function(i) {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

// ===== Scroll Reveal =====
(function() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function(el) {
    observer.observe(el);
  });
})();

// ===== Back to Top =====
(function() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
