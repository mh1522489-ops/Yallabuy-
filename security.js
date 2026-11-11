
(function () {
  'use strict';

  if (window.__yallabuy_security_loaded) return;
  window.__yallabuy_security_loaded = true;

  const CONFIG = {
    inputProtection: true,
    honeypot: true,
    clickjacking: true,
    blockDangerousLinks: true
  };

  // ============================================
  // 1. INPUT PROTECTION
  // ============================================

  const InputProtection = {
    init() {
      if (!CONFIG.inputProtection) return;

      document.addEventListener('submit', (event) => {
        const form = event.target;

        if (!(form instanceof HTMLFormElement)) return;

        const fields = form.querySelectorAll(
          'input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea'
        );

        for (const field of fields) {
          if (field.disabled) continue;

          if (field.validity.valid === false) {
            event.preventDefault();
            field.reportValidity();
            return;
          }
        }
      }, true);
    }
  };

  // ============================================
  // 2. HONEYPOT
  // ============================================

  const HoneypotProtection = {
    init() {
      if (!CONFIG.honeypot) return;

      document.querySelectorAll('form').forEach((form) => {
        if (form.querySelector('[data-security-honeypot]')) return;

        const honeypot = document.createElement('input');

        honeypot.type = 'text';
        honeypot.name = 'security_website';
        honeypot.autocomplete = 'off';
        honeypot.tabIndex = -1;
        honeypot.setAttribute('aria-hidden', 'true');
        honeypot.setAttribute('data-security-honeypot', '');

        honeypot.style.cssText = [
          'position:absolute',
          'width:1px',
          'height:1px',
          'padding:0',
          'margin:-1px',
          'overflow:hidden',
          'clip:rect(0,0,0,0)',
          'white-space:nowrap',
          'border:0'
        ].join(';');

        form.appendChild(honeypot);

        form.addEventListener('submit', (event) => {
          if (honeypot.value.trim() !== '') {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        }, true);
      });
    }
  };

  // ============================================
  // 3. CLICKJACKING FALLBACK
  // ============================================

  const ClickjackingProtection = {
    init() {
      if (!CONFIG.clickjacking) return;

      try {
        if (window.self !== window.top) {
          document.documentElement.style.display = 'none';
        }
      } catch {
        document.documentElement.style.display = 'none';
      }
    }
  };

  // ============================================
  // 4. DANGEROUS LINK PROTECTION
  // ============================================

  const LinkProtection = {
    init() {
      if (!CONFIG.blockDangerousLinks) return;

      document.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const link = target.closest('a[href]');

        if (!link) return;

        const href = link.getAttribute('href');

        if (!href) return;

        const normalized = href.trim();

        if (/^(javascript|data|vbscript)\s*:/i.test(normalized)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }, true);
    }
  };

  // ============================================
  // 5. INITIALIZATION
  // ============================================

  function init() {
    try {
      InputProtection.init();
      HoneypotProtection.init();
      ClickjackingProtection.init();
      LinkProtection.init();

      console.info('[Security] YallaBuy security initialized');
    } catch (error) {
      console.error('[Security] Initialization error:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {
      once: true
    });
  } else {
    init();
  }
})();
