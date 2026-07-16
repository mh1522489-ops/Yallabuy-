// ============================================
// Yallabuy Service Worker - v1
// تحديث تلقائي عند تعديل الموقع
// ============================================

const CACHE_NAME = 'yallabuy-cache-v13';
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
// 2. التفعيل - حذف الكاش القديم
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
// 3. جلب الطلبات
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});

// ============================================
// 4. استقبال رسالة التحديث من الصفحة
// ============================================
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
