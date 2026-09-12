// Theme Toggle
      const themeToggle = document.getElementById('theme-toggle');
      const currentTheme = localStorage.getItem('theme') || 'light';
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      });

      // Mobile Menu
      const mobileBtn = document.getElementById('nav-mobile-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileClose = document.getElementById('mobile-menu-close');
      
      mobileBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
      mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

      // FAQ Accordion
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all
          faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = '0';
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          });
          
          // Toggle current
          if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            question.setAttribute('aria-expanded', 'true');
          }
        });
      });

      // Back to Top & Scroll Reveal
      const backToTop = document.getElementById('back-to-top');
      const revealElements = document.querySelectorAll('.reveal');

      window.addEventListener('scroll', () => {
        // Back to top
        if (window.scrollY > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }

        // Scroll Reveal
        revealElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 50) {
            el.classList.add('visible');
          }
        });
      });

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
