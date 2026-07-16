// ============================================
// Yallabuy Service Worker - v2 (Fixed)
// ============================================

const CACHE_NAME = 'yallabuy-cache-v10';
const IMAGE_CACHE = 'yallabuy-images-v1';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',           // ← ✅ ضيف ده
  '/terms-of-service.html',   // ← ✅ ضيف الصفحات المهمة
  '/privacy-policy.html',
  '/affiliate-disclosure.html',
  '/contact.html',
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
          .filter((name) => name !== CACHE_NAME && name !== IMAGE_CACHE)
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

  // 🔴 صور → Cache First
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 🔵 صفحات وملفات → Network First
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
        
        // ✅ لو مش موجودة → offline.html
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
