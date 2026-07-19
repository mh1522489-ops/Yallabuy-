// ============================================
// YallaBuy Security - Lightweight v4
// حماية خفيفة بدون false positives
// ============================================

(function() {
  'use strict';

  if (window.__yallabuy_security_loaded) return;
  window.__yallabuy_security_loaded = true;

  // ============================================
  // CONFIG
  // ============================================
  const CONFIG = {
    devToolsDetection: true,
    botDetection: true,
    inputSanitization: true,
    antiTamper: true,
    encryption: false,        // ❌ شيلناه — مش محتاجه في الـ frontend
    fingerprinting: false,    // ❌ شيلناه — بيسبب مشاكل
    clickjacking: true,
    blockShortcuts: true,
    blockRightClick: false,   // ❌ شيلناه — بيضايق المستخدمين
    blockSelect: false,       // ❌ شيلناه — بيضايق المستخدمين
  };

  // ============================================
  // 1. ANTI-DEBUG خفيف (بس shortcuts)
  // ============================================
  const AntiDebug = {
    init() {
      if (!CONFIG.devToolsDetection) return;

      document.addEventListener('keydown', (e) => {
        // F12 فقط
        if (e.key === 'F12') {
          e.preventDefault();
          this.warn();
        }
        // Ctrl+Shift+I/J فقط
        if (e.ctrlKey && e.shiftKey && ['I','J'].includes(e.key)) {
          e.preventDefault();
          this.warn();
        }
      }, true);
    },

    warn() {
      console.warn('%c⚠️ DevTools detected', 'color: orange; font-size: 14px;');
      // ❌ ما بنقفلش الصفحة — بس بنحذر
    }
  };

  // ============================================
  // 2. BOT DETECTION خفيف
  // ============================================
  const BotDetection = {
    init() {
      if (!CONFIG.botDetection) return;

      // فحص سريع: webdriver + user agent فقط
      const ua = navigator.userAgent.toLowerCase();
      const isBot = navigator.webdriver === true ||
                    /headless|phantomjs|selenium|puppeteer|playwright|cypress/i.test(ua);

      if (isBot) {
        console.warn('[Security] Bot detected');
        document.body.innerHTML = '<h1 style="text-align:center;padding:50px;">Access Denied</h1>';
      }
    }
  };

  // ============================================
  // 3. ANTI-TAMPER خفيف
  // ============================================
  const AntiTamper = {
    init() {
      if (!CONFIG.antiTamper) return;

      // بس نمنع scripts غريبة
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {
          m.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
              const src = node.src || '';
              const allowed = [
                window.location.origin,
                'https://cdn.jsdelivr.net',
                'https://unpkg.com',
                'https://cdnjs.cloudflare.com',
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com'
              ];
              const isAllowed = allowed.some(d => src.startsWith(d)) || src === '';
              if (!isAllowed) {
                console.warn('[Security] Blocked script:', src);
                node.remove();
              }
            }
          });
        });
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  };

  // ============================================
  // 4. INPUT SANITIZATION
  // ============================================
  const InputProtection = {
    init() {
      if (!CONFIG.inputSanitization) return;

      const sanitize = (str) => {
        if (typeof str !== 'string') return str;
        return str
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
      };

      document.querySelectorAll('input:not([type="password"]), textarea').forEach(input => {
        input.addEventListener('blur', (e) => {
          e.target.value = sanitize(e.target.value);
        });
      });

      // Honeypot للـ forms
      document.querySelectorAll('form').forEach(form => {
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.cssText = 'position:absolute;left:-9999px;opacity:0;';
        honeypot.setAttribute('tabindex', '-1');
        honeypot.setAttribute('autocomplete', 'off');
        form.appendChild(honeypot);

        form.addEventListener('submit', (e) => {
          if (honeypot.value !== '') {
            e.preventDefault();
            console.warn('[Security] Honeypot triggered');
          }
        });
      });
    }
  };

  // ============================================
  // 5. CLICKJACKING
  // ============================================
  const ClickjackingProtection = {
    init() {
      if (!CONFIG.clickjacking) return;

      if (window.self !== window.top) {
        window.top.location = window.self.location;
      }
    }
  };

  // ============================================
  // 6. NETWORK (بس نمنع javascript: links)
  // ============================================
  const NetworkProtection = {
    init() {
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href') || '';
        if (href.startsWith('javascript:') || href.startsWith('data:')) {
          e.preventDefault();
          console.warn('[Security] Blocked:', href);
        }
      });
    }
  };

  // ============================================
  // INIT
  // ============================================
  function init() {
    try {
      AntiDebug.init();
      BotDetection.init();
      AntiTamper.init();
      InputProtection.init();
      ClickjackingProtection.init();
      NetworkProtection.init();
      console.log('[Security] YallaBuy Lightweight active');
    } catch (err) {
      console.error('[Security] Init error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
