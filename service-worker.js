// ============================================
// Yallabuy Service Worker - v3 (Simple)
// كل حاجة في كاش واحد
// ============================================

const CACHE_NAME = 'yallabuy-cache-v12';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/terms-of-service.html',
  '/privacy-policy.html',
  '/affiliate-disclosure.html',
  '/contact.html',
  '/style.css',
  '/script.js',
  '/logo.png',
  '/favicon.ico'
];

// ============================================
// 1. التثبيت - امسح القديم وحط الجديد
// ============================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // امسح كل الكاشات القديمة
      return Promise.all(
        cacheNames.map((name) => caches.delete(name))
      );
    }).then(() => {
      // اعمل كاش جديد
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(CORE_ASSETS);
      });
    }).then(() => self.skipWaiting())
  );
});

// ============================================
// 2. التفعيل
// ============================================
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// ============================================
// 3. جلب الطلبات - كل حاجة Network First
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  event.respondWith(
    fetch(request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(request).then((cached) => {
        if (cached) return cached;
        
        // لو مش موجودة → offline.html
        if (request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        
        return null;
      });
    })
  );
});

// ============================================
// 4. رسائل التحديث
// ============================================
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
