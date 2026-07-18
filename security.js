// ============================================
// YallaBuy Security - Maximum Protection v3
// Anti-Debug | Anti-Tamper | Fingerprinting | Encryption
// ============================================

(function() {
  'use strict';

  // 🚫 منع إعادة التشغيل
  if (window.__yallabuy_security_loaded) return;
  window.__yallabuy_security_loaded = true;

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    devToolsDetection: true,
    botDetection: true,
    inputSanitization: true,
    antiTamper: true,
    encryption: true,
    fingerprinting: true,
    selfDestruct: true,
    obfuscation: true
  };

  // ============================================
  // 1. ENCRYPTION ENGINE (محرك التشفير)
  // ============================================
  const CryptoEngine = {
    key: null,
    
    init() {
      // توليد مفتاح من domain + user agent
      const seed = window.location.hostname + navigator.userAgent + screen.width + screen.height;
      this.key = this.deriveKey(seed);
    },

    deriveKey(seed) {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(36).padStart(16, '0');
    },

    encrypt(text) {
      if (typeof text !== 'string') text = JSON.stringify(text);
      let result = '';
      const key = this.key;
      for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(
          text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
      }
      return btoa(result);
    },

    decrypt(encrypted) {
      try {
        const text = atob(encrypted);
        let result = '';
        const key = this.key;
        for (let i = 0; i < text.length; i++) {
          result += String.fromCharCode(
            text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
          );
        }
        return result;
      } catch (e) {
        return null;
      }
    },

    // تشفير AES-256 محاكى (Web Crypto API)
    async encryptAES(data) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      
      const keyBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(this.key));
      const cryptoKey = await crypto.subtle.importKey(
        'raw', keyBuffer, { name: 'AES-GCM' }, false, ['encrypt']
      );
      
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        dataBuffer
      );
      
      const result = new Uint8Array(iv.length + encrypted.byteLength);
      result.set(iv);
      result.set(new Uint8Array(encrypted), iv.length);
      
      return btoa(String.fromCharCode(...result));
    }
  };

  // ============================================
  // 2. BROWSER FINGERPRINTING (بصمة الجهاز)
  // ============================================
  const Fingerprinter = {
    fingerprint: null,
    
    async generate() {
      const components = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height + 'x' + screen.colorDepth,
        new Date().getTimezoneOffset(),
        navigator.hardwareConcurrency || 'unknown',
        navigator.deviceMemory || 'unknown',
        !!window.sessionStorage,
        !!window.localStorage,
        !!window.indexedDB,
        typeof navigator.webdriver,
        this.getCanvasFingerprint(),
        this.getWebGLFingerprint(),
        this.getFontsFingerprint()
      ];
      
      const fingerprint = components.join('###');
      const hash = await this.hashString(fingerprint);
      this.fingerprint = hash;
      return hash;
    },

    getCanvasFingerprint() {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(0, 0, 200, 200);
        ctx.fillStyle = '#069';
        ctx.fillText('YallaBuy Security', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('Fingerprint', 4, 45);
        
        return canvas.toDataURL().slice(-50);
      } catch (e) {
        return 'canvas-blocked';
      }
    },

    getWebGLFingerprint() {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return 'webgl-unavailable';
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          return gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) + '|' +
                 gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
        return 'webgl-no-debug';
      } catch (e) {
        return 'webgl-error';
      }
    },

    getFontsFingerprint() {
      const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Helvetica'];
      const detected = [];
      
      fonts.forEach(font => {
        const span = document.createElement('span');
        span.style.fontFamily = font;
        span.style.fontSize = '72px';
        span.style.position = 'absolute';
        span.style.left = '-9999px';
        span.innerHTML = 'mmmmmmmmlli';
        document.body.appendChild(span);
        
        const width = span.offsetWidth;
        const height = span.offsetHeight;
        document.body.removeChild(span);
        
        detected.push(`${font}:${width}x${height}`);
      });
      
      return detected.join(',');
    },

    async hashString(str) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  };

  // ============================================
  // 3. ANTI-DEBUG (كشف أدوات المطور)
  // ============================================
  const AntiDebug = {
    triggered: false,
    detectionCount: 0,
    
    init() {
      if (!CONFIG.devToolsDetection) return;
      
      this.detectBySize();
      this.detectByDebugger();
      this.detectByConsole();
      this.detectByPerformance();
      this.blockShortcuts();
      this.detectByError();
    },

    detectBySize() {
      const check = () => {
        const threshold = 160;
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        
        if (widthDiff > threshold || heightDiff > threshold) {
          this.detectionCount++;
          if (this.detectionCount > 2) this.trigger();
        }
      };
      
      setInterval(check, 300);
      window.addEventListener('resize', check);
    },

    detectByDebugger() {
      const check = () => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        
        if (end - start > 100) {
          this.trigger();
        }
      };
      
      setInterval(check, 2000);
    },

    detectByConsole() {
      // طريقة 1: Image trap
      const img = new Image();
      Object.defineProperty(img, 'id', {
        get: () => {
          this.trigger();
          return 'trap';
        }
      });
      
      // طريقة 2: Function toString
      const fn = function() {};
      fn.toString = () => {
        this.trigger();
        return '';
      };
      
      console.log('%c', img);
      console.log(fn);
    },

    detectByPerformance() {
      // كشف عبر performance timing
      const check = () => {
        const timing = performance.timing;
        if (timing.domContentLoadedEventEnd - timing.navigationStart < 100) {
          // صفحة تحملت بسرعة غير طبيعية (headless browser)
          this.detectionCount += 0.5;
        }
      };
      
      setTimeout(check, 3000);
    },

    detectByError() {
      // كشف عبر Error.stack
      const check = () => {
        try {
          throw new Error('test');
        } catch (e) {
          if (e.stack && e.stack.includes('debugger')) {
            this.trigger();
          }
        }
      };
      
      setInterval(check, 5000);
    },

    blockShortcuts() {
      document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
          e.preventDefault();
          e.stopPropagation();
          this.trigger();
          return false;
        }
        
        // Ctrl+Shift+I/J/C/K
        if (e.ctrlKey && e.shiftKey && ['I','J','C','K'].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          this.trigger();
          return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
          e.preventDefault();
          return false;
        }
        
        // Ctrl+S (Save)
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          return false;
        }
        
        // Ctrl+P (Print)
        if (e.ctrlKey && e.key === 'p') {
          e.preventDefault();
          return false;
        }
        
        // Ctrl+A (Select All) - اختياري
        if (e.ctrlKey && e.key === 'a') {
          e.preventDefault();
          return false;
        }
      }, true);
    },

    trigger() {
      if (this.triggered) return;
      this.triggered = true;
      
      // 1. امسح الكونسول
      console.clear();
      
      // 2. رسالة تحذير
      console.log('%c⚠️ SECURITY ALERT', 'color: red; font-size: 30px; font-weight: bold;');
      console.log('%cUnauthorized access detected. Session terminated.', 'color: orange; font-size: 14px;');
      
      // 3. اعطل الصفحة
      setTimeout(() => {
        document.documentElement.innerHTML = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body {
                margin: 0;
                padding: 0;
                background: #0a0a0a;
                color: #ff3333;
                font-family: 'Courier New', monospace;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                overflow: hidden;
              }
              .container {
                text-align: center;
                padding: 40px;
                border: 2px solid #ff3333;
                border-radius: 10px;
                background: rgba(255, 51, 51, 0.05);
              }
              h1 {
                font-size: 48px;
                margin: 0 0 20px;
                text-transform: uppercase;
                letter-spacing: 10px;
                animation: glitch 2s infinite;
              }
              p {
                font-size: 16px;
                color: #888;
                margin: 10px 0;
              }
              .code {
                font-size: 12px;
                color: #444;
                margin-top: 30px;
                padding: 10px;
                background: #111;
                border-radius: 5px;
              }
              @keyframes glitch {
                0%, 100% { text-shadow: 2px 0 #ff0000, -2px 0 #00ff00; }
                25% { text-shadow: -2px 0 #ff0000, 2px 0 #00ff00; }
                50% { text-shadow: 2px 2px #ff0000, -2px -2px #00ff00; }
                75% { text-shadow: -2px 2px #ff0000, 2px -2px #00ff00; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🚫 ACCESS DENIED</h1>
              <p>Security violation detected</p>
              <p>Your session has been terminated</p>
              <div class="code">ERROR: DEVTOOLS_DETECTED | CODE: 403</div>
            </div>
          </body>
          </html>
        `;
        
        // 4. اعطل كل الـ APIs
        window.fetch = () => Promise.reject(new Error('Blocked'));
        window.XMLHttpRequest = function() {};
        window.WebSocket = function() {};
        window.localStorage = null;
        window.sessionStorage = null;
        
        // 5. loop مشبوه
        setInterval(() => {
          debugger;
        }, 100);
      }, 100);
    }
  };

  // ============================================
  // 4. BOT DETECTION (كشف الروبوتات)
  // ============================================
  const BotDetection = {
    score: 0,
    
    init() {
      if (!CONFIG.botDetection) return;
      
      this.checkUserAgent();
      this.checkAutomation();
      this.checkWebdriver();
      this.checkPlugins();
      this.checkLanguages();
      this.trackBehavior();
      this.checkHeadless();
      
      setTimeout(() => this.evaluate(), 4000);
    },

    checkUserAgent() {
      const ua = navigator.userAgent.toLowerCase();
      const bots = [
        /bot|crawler|spider|scraper|curl|wget|httpclient/i,
        /headlesschrome|phantomjs|selenium|puppeteer|playwright/i,
        /python-requests|node-fetch|axios/i,
        /sqlmap|nikto|nmap|burp|zap/i
      ];
      
      bots.forEach(pattern => {
        if (pattern.test(ua)) this.score += 5;
      });
    },

    checkAutomation() {
      if (navigator.webdriver === true) this.score += 5;
      if (window.callPhantom || window._phantom) this.score += 5;
      if (window.__nightmare__) this.score += 5;
      if (window.domAutomation || window.domAutomationController) this.score += 5;
      if (window.Cypress) this.score += 5;
    },

    checkWebdriver() {
      const indicators = [
        'webdriver',
        '__webdriver_script_fn',
        '__selenium_evaluate',
        '__selenium_unwrapped',
        '__fxdriver_evaluate'
      ];
      
      indicators.forEach(ind => {
        if (window[ind]) this.score += 3;
      });
    },

    checkPlugins() {
      if (navigator.plugins.length === 0) this.score += 2;
      if (navigator.mimeTypes.length === 0) this.score += 1;
    },

    checkLanguages() {
      if (!navigator.languages || navigator.languages.length === 0) this.score += 2;
    },

    checkHeadless() {
      // كشف Headless Chrome
      if (navigator.plugins.length === 0 && navigator.languages.length === 0) {
        this.score += 3;
      }
      
      // كشف عبر permissions
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'notifications' }).then(permission => {
          if (Notification.permission === 'default' && permission.state === 'prompt') {
            // طبيعي
          }
        }).catch(() => {
          this.score += 1;
        });
      }
    },

    trackBehavior() {
      let mouseMoves = 0;
      let keyPresses = 0;
      let scrolls = 0;
      let clicks = 0;
      
      document.addEventListener('mousemove', () => mouseMoves++, { once: true });
      document.addEventListener('keydown', () => keyPresses++, { once: true });
      document.addEventListener('scroll', () => scrolls++, { once: true });
      document.addEventListener('click', () => clicks++, { once: true });
      
      setTimeout(() => {
        if (mouseMoves === 0 && keyPresses === 0 && scrolls === 0) {
          this.score += 4;
        }
        if (clicks === 0 && mouseMoves > 0) {
          this.score += 1; // mouse بس من غير click غريب
        }
      }, 5000);
    },

    evaluate() {
      console.log('[Security] Bot score:', this.score);
      
      if (this.score >= 8) {
        console.warn('[Security] Bot detected!');
        
        // blur الصفحة
        document.body.style.filter = 'blur(10px)';
        document.body.style.pointerEvents = 'none';
        
        setTimeout(() => {
          document.body.innerHTML = '<h1 style="text-align:center;padding:50px;">Bot Detected</h1>';
        }, 3000);
      }
    }
  };

  // ============================================
  // 5. ANTI-TAMPER (منع التلاعب)
  // ============================================
  const AntiTamper = {
    init() {
      if (!CONFIG.antiTamper) return;
      
      this.protectGlobals();
      this.detectMutation();
      this.integrityCheck();
      this.protectFunctions();
    },

    protectGlobals() {
      const protectedFns = [
        'fetch', 'XMLHttpRequest', 'WebSocket',
        'localStorage', 'sessionStorage',
        'atob', 'btoa', 'eval', 'Function'
      ];
      
      protectedFns.forEach(name => {
        const original = window[name];
        if (!original) return;
        
        Object.defineProperty(window, name, {
          get: () => original,
          set: (value) => {
            console.warn(`[Security] Blocked modification of ${name}`);
            AntiDebug.trigger();
            return original;
          },
          configurable: false
        });
      });
    },

    detectMutation() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              if (node.tagName === 'SCRIPT') {
                console.warn('[Security] Unauthorized script injection');
                node.remove();
              }
              if (node.tagName === 'IFRAME') {
                console.warn('[Security] Unauthorized iframe');
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
    },

    integrityCheck() {
      const scripts = document.querySelectorAll('script[src]');
      const allowedDomains = [
        window.location.origin,
        'https://cdn.jsdelivr.net',
        'https://unpkg.com',
        'https://cdnjs.cloudflare.com'
      ];
      
      scripts.forEach(script => {
        const src = script.src;
        if (!src) return;
        
        const isAllowed = allowedDomains.some(d => src.startsWith(d));
        if (!isAllowed) {
          console.warn('[Security] Unauthorized script:', src);
          script.remove();
        }
      });
    },

    protectFunctions() {
      // احمي الـ functions بتاعتنا
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'security' || type === 'protected') {
          console.warn('[Security] Protected event blocked');
          return;
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    }
  };

  // ============================================
  // 6. INPUT PROTECTION (حماية المدخلات)
  // ============================================
  const InputProtection = {
    init() {
      if (!CONFIG.inputSanitization) return;
      
      this.sanitizeInputs();
      this.protectForms();
      this.preventPaste();
      this.detectSQLi();
      this.detectXSS();
    },

    sanitizeInputs() {
      const sanitize = (str) => {
        if (typeof str !== 'string') return str;
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/`/g, '&#x60;')
          .replace(/\\/g, '&#x5C;')
          .replace(/\//g, '&#x2F;');
      };

      document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
          const dangerous = /[<>"'`\\/]|javascript:|data:|vbscript:/i;
          if (dangerous.test(e.data || '')) {
            e.preventDefault();
            e.target.value = sanitize(e.target.value);
          }
        });
        
        input.addEventListener('blur', (e) => {
          e.target.value = sanitize(e.target.value);
        });
      });

      window.sanitizeInput = sanitize;
    },

    protectForms() {
      document.querySelectorAll('form').forEach(form => {
        // منع Double Submit
        form.addEventListener('submit', (e) => {
          if (form.dataset.submitted === 'true') {
            e.preventDefault();
            return false;
          }
          form.dataset.submitted = 'true';
          setTimeout(() => form.dataset.submitted = 'false', 5000);
        });

        // Honeypot
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.cssText = 'position:absolute;left:-9999px;opacity:0;tabindex:-1;';
        honeypot.setAttribute('autocomplete', 'off');
        honeypot.setAttribute('aria-hidden', 'true');
        form.appendChild(honeypot);

        form.addEventListener('submit', (e) => {
          if (honeypot.value !== '') {
            e.preventDefault();
            console.warn('[Security] Honeypot triggered');
            AntiDebug.trigger();
          }
        });
      });
    },

    preventPaste() {
      document.querySelectorAll('input[data-sensitive], input[type="password"]').forEach(field => {
        field.addEventListener('paste', (e) => {
          e.preventDefault();
          console.warn('[Security] Paste blocked on sensitive field');
        });
      });
    },

    detectSQLi() {
      const patterns = [
        /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
        /UNION\s+SELECT/i,
        /INSERT\s+INTO/i,
        /DELETE\s+FROM/i,
        /DROP\s+TABLE/i,
        /EXEC\s*\(/i,
        /OR\s+1\s*=\s*1/i
      ];
      
      document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
          if (patterns.some(p => p.test(e.target.value))) {
            console.warn('[Security] SQL Injection detected');
            e.target.value = '';
            AntiDebug.trigger();
          }
        });
      });
    },

    detectXSS() {
      const patterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/i,
        /on\w+\s*=/i,
        /eval\s*\(/i,
        /expression\s*\(/i
      ];
      
      document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
          if (patterns.some(p => p.test(e.target.value))) {
            console.warn('[Security] XSS attempt detected');
            e.target.value = '';
          }
        });
      });
    }
  };

  // ============================================
  // 7. NETWORK PROTECTION (حماية الشبكة)
  // ============================================
  const NetworkProtection = {
    init() {
      this.protectFetch();
      this.protectXHR();
      this.blockMaliciousURLs();
    },

    protectFetch() {
      const originalFetch = window.fetch;
      
      window.fetch = function(url, options = {}) {
        if (typeof url === 'string') {
          const lowerUrl = url.toLowerCase();
          if (lowerUrl.startsWith('javascript:') || 
              lowerUrl.startsWith('data:') ||
              lowerUrl.startsWith('vbscript:') ||
              lowerUrl.startsWith('file:')) {
            console.warn('[Security] Blocked malicious URL:', url);
            return Promise.reject(new Error('Blocked'));
          }
        }
        
        options.headers = {
          ...options.headers,
          'X-Requested-With': 'XMLHttpRequest',
          'X-Security-Token': 'yallabuy-protected'
        };
        
        return originalFetch(url, options);
      };
    },

    protectXHR() {
      const originalOpen = XMLHttpRequest.prototype.open;
      
      XMLHttpRequest.prototype.open = function(method, url, ...args) {
        if (typeof url === 'string') {
          const lowerUrl = url.toLowerCase();
          if (lowerUrl.startsWith('javascript:') || lowerUrl.startsWith('data:')) {
            console.warn('[Security] Blocked XHR to:', url);
            throw new Error('Blocked');
          }
        }
        return originalOpen.call(this, method, url, ...args);
      };
    },

    blockMaliciousURLs() {
      // اعتراض الـ links المشبوهة
      document.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (!target) return;
        
        const href = target.getAttribute('href');
        if (!href) return;
        
        if (href.startsWith('javascript:') || href.startsWith('data:')) {
          e.preventDefault();
          console.warn('[Security] Blocked malicious link:', href);
        }
      });
    }
  };

  // ============================================
  // 8. CLICKJACKING PROTECTION
  // ============================================
  const ClickjackingProtection = {
    init() {
      if (window.self !== window.top) {
        window.top.location = window.self.location;
      }
      
      // أضف CSP meta tag
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "frame-ancestors 'none';";
      document.head.appendChild(meta);
    }
  };

  // ============================================
  // 9. SELF-DESTRUCT (تدمير ذاتي)
  // ============================================
  const SelfDestruct = {
    init() {
      if (!CONFIG.selfDestruct) return;
      
      // تحقق من سلامة الكود
      setInterval(() => {
        if (!window.__yallabuy_security_loaded) {
          document.body.innerHTML = '<h1>Security Error</h1>';
        }
      }, 3000);
      
      // كشف التلاعب في الكود
      const originalToString = Function.prototype.toString;
      Function.prototype.toString = function() {
        const result = originalToString.call(this);
        if (result.includes('yallabuy') && result.length < 100) {
          console.warn('[Security] Code tampering detected');
          AntiDebug.trigger();
        }
        return result;
      };
    }
  };

  // ============================================
  // 10. RIGHT CLICK & SELECT PROTECTION
  // ============================================
  const UIProtection = {
    init() {
      // منع Right Click
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });
      
      // منع Select All
      document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
      });
      
      // منع Drag
      document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
      });
      
      // منع Copy
      document.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
      });
      
      // منع Cut
      document.addEventListener('cut', (e) => {
        e.preventDefault();
        return false;
      });
    }
  };

  // ============================================
  // 11. CONSOLE OBFUSCATION (إخفاء الكونسول)
  // ============================================
  const ConsoleObfuscation = {
    init() {
      const methods = ['log', 'warn', 'error', 'info', 'debug'];
      
      methods.forEach(method => {
        const original = console[method];
        console[method] = function(...args) {
          // امسح أي محاولة استخدام %c styling
          const filtered = args.filter(arg => {
            if (typeof arg === 'string' && arg.includes('%c')) {
              return false;
            }
            return true;
          });
          return original.apply(console, filtered);
        };
      });
      
      // امسح الكونسول كل شوية
      setInterval(() => {
        console.clear();
      }, 15000);
    }
  };

  // ============================================
  // 12. ENCRYPTED STORAGE (تخزين مشفر)
  // ============================================
  const EncryptedStorage = {
    init() {
      if (!CONFIG.encryption) return;
      
      CryptoEngine.init();
      
      // غطّي localStorage
      const originalSetItem = localStorage.setItem;
      const originalGetItem = localStorage.getItem;
      
      localStorage.setItem = function(key, value) {
        try {
          const encrypted = CryptoEngine.encrypt(value);
          return originalSetItem.call(localStorage, key, encrypted);
        } catch (e) {
          return originalSetItem.call(localStorage, key, value);
        }
      };
      
      localStorage.getItem = function(key) {
        try {
          const encrypted = originalGetItem.call(localStorage, key);
          if (!encrypted) return null;
          return CryptoEngine.decrypt(encrypted);
        } catch (e) {
          return originalGetItem.call(localStorage, key);
        }
      };
      
      // نفس الكلام لـ sessionStorage
      const originalSSSetItem = sessionStorage.setItem;
      const originalSSGetItem = sessionStorage.getItem;
      
      sessionStorage.setItem = function(key, value) {
        try {
          const encrypted = CryptoEngine.encrypt(value);
          return originalSSSetItem.call(sessionStorage, key, encrypted);
        } catch (e) {
          return originalSSSetItem.call(sessionStorage, key, value);
        }
      };
      
      sessionStorage.getItem = function(key) {
        try {
          const encrypted = originalSSGetItem.call(sessionStorage, key);
          if (!encrypted) return null;
          return CryptoEngine.decrypt(encrypted);
        } catch (e) {
          return originalSSGetItem.call(sessionStorage, key);
        }
      };
    }
  };

  // ============================================
  // 13. FINGERPRINT LOCK (قفل بالبصمة)
  // ============================================
  const FingerprintLock = {
    async init() {
      if (!CONFIG.fingerprinting) return;
      
      const fingerprint = await Fingerprinter.generate();
      console.log('[Security] Device fingerprint:', fingerprint.slice(0, 16) + '...');
      
      // خزّن البصمة (مشفرة)
      const stored = localStorage.getItem('yallabuy_fp');
      if (!stored) {
        localStorage.setItem('yallabuy_fp', fingerprint);
      }
      
      // تحقق من البصمة
      // (ممكن تضيف logic هنا لو عايز تمنع تغيير الجهاز)
    }
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  async function init() {
    try {
      // ترتيب التفعيل مهم!
      UIProtection.init();
      ConsoleObfuscation.init();
      ClickjackingProtection.init();
      AntiTamper.init();
      NetworkProtection.init();
      InputProtection.init();
      EncryptedStorage.init();
      await FingerprintLock.init();
      BotDetection.init();
      AntiDebug.init();
      SelfDestruct.init();
      
      console.log('[Security] YallaBuy Maximum Protection active');
      console.log('[Security] Fingerprint:', await Fingerprinter.generate());
      
    } catch (err) {
      console.error('[Security] Init failed:', err);
    }
  }

  // شغّل
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
