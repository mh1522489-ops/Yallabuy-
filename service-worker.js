// ============================================
// Yallabuy Service Worker - Network First Strategy
// يحل مشكلة التحديث التلقائي
// ============================================

const CACHE_NAME = 'yallabuy-cache-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/logo.png',
  '/favicon.ico'
];

// ============================================
// 1. التثبيت
// ============================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ============================================
// 2. التفعيل
// ============================================
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

// ============================================
// 3. جلب الطلبات - Network First (أولاً من النت)
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  event.respondWith(
    // أولاً: جرب النت
    fetch(request).then((networkResponse) => {
      // لو النت شغال → احفظ في الكاش وارجع الرد
      if (networkResponse && networkResponse.status === 200) {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      // لو النت مقطوع → ارجع من الكاش
      return caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // لو مش موجود في الكاش → الصفحة الرئيسية
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});

// ============================================
// 4. استقبال رسالة التحديث
// ============================================
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
