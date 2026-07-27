// ═══════════════════════════════════════════════════════
// service-worker.js - YallaBuy Offline Only (v58)
// ═══════════════════════════════════════════════════════

const CACHE_NAME = 'yallabuy-cache-v59';

// الملفات الأساسية اللي هتتخزن
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/logo.png',
  '/favicon.ico',
  '/offline.html'
];

// ممنوع التخزين
const NEVER_CACHE = [
  '/api/',
  '/auth/',
  '/login',
  '/register',
  '/checkout',
  '/user/',
  '/admin/'
];

function shouldCache(url) {
  return !NEVER_CACHE.some(path => url.includes(path));
}

// ═══════════════════════════════════════════════════════
// 1. INSTALL - تثبيت
// ═══════════════════════════════════════════════════════
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ═══════════════════════════════════════════════════════
// 2. ACTIVATE - تفعيل
// ═══════════════════════════════════════════════════════
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ═══════════════════════════════════════════════════════
// 3. FETCH - جلب الطلبات
// ═══════════════════════════════════════════════════════
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // تجاهل غير HTTP وغير GET
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // لو في الكاش، رجعه
      if (cachedResponse) {
        return cachedResponse;
      }

      // جرب الشبكة
      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // خزن في الكاش
        if (shouldCache(request.url)) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }

        return networkResponse;
      }).catch(() => {
        // النت قطع!
        if (request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        
        return new Response('Offline', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});

// ═══════════════════════════════════════════════════════
// 4. MESSAGE - رسائل التحديث
// ═══════════════════════════════════════════════════════
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('✅ YallaBuy Offline Ready (v58)');
