
/* ═══════════════════════════════════════════════════════════════
   VIBRA-CLICK — Haptic Feedback Module for Affiliate Buttons
   Vibration ONLY (no sound)
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── CONFIG ── */
  const CONFIG = {
    vibrateDuration: 60,           // ms — خفيف ومريح
    oncePerSession: true,          // true = مرة واحدة لكل زيارة
    respectReducedMotion: true,    // يحترم إعداد "تقليل الحركة"
    selectors: [
      '.btn--primary',
      'a[href*="amzn.to"]',
      'a[href*="amazon"]',
      '[data-vibra="true"]'
    ]
  };

  /* ── STATE ── */
  const state = {
    hasVibrated: false
  };

  /* ── CHECK: Should we run? ── */
  function shouldRun() {
    // Respect "prefers-reduced-motion"
    if (CONFIG.respectReducedMotion) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return false;
    }
    // Check session flag
    if (CONFIG.oncePerSession && state.hasVibrated) return false;
    // Check if vibration supported
    if (!navigator.vibrate) return false;
    return true;
  }

  /* ── VIBRATE ── */
  function doVibrate() {
    try {
      navigator.vibrate(CONFIG.vibrateDuration);
    } catch (e) {
      // silently fail
    }
  }

  /* ── MAIN TRIGGER ── */
  function triggerFeedback(e) {
    if (!shouldRun()) return;

    // Mark as done for this session
    state.hasVibrated = true;

    // Vibrate only
    doVibrate();

    // Optional: visual pulse on button
    const btn = e.currentTarget;
    btn.style.transform = 'scale(0.96)';
    setTimeout(() => { btn.style.transform = ''; }, 120);
  }

  /* ── ATTACH LISTENERS ── */
  function attachListeners() {
    const selector = CONFIG.selectors.join(', ');
    const buttons = document.querySelectorAll(selector);

    buttons.forEach(btn => {
      // Prevent double-binding
      if (btn.dataset.vibraBound) return;
      btn.dataset.vibraBound = 'true';

      btn.addEventListener('click', triggerFeedback, { passive: true });
    });
  }

  /* ── INIT ── */
  function init() {
    // Attach to existing buttons
    attachListeners();

    // Watch for dynamically added buttons (e.g. after filter/sort)
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── PUBLIC API (optional) ── */
  window.VibraClick = {
    config: CONFIG,
    reset: function() { state.hasVibrated = false; },
    test: function() { triggerFeedback({ currentTarget: document.body }); }
  };

})();
