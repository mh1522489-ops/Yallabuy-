// ============================================
// Yallabuy Service Worker - v1 (Simple)
// ============================================

const CACHE_NAME = 'yallabuy-cache-v1';

// ============================================
// 1. التثبيت - خزن الصفحات
// ============================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/offline.html'
      ]);
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
// 3. جلب الطلبات - Network First (التعديلات تظهر فوراً)
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (request.method !== 'GET') return;

  event.respondWith(
    // جرب النت أولاً
    fetch(request).then((response) => {
      // خزن في الكاش للمرة الجاية
      if (response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clone);
        });
      }
      return response;
    }).catch(() => {
      // لو النت قطع → جرب الكاش
      return caches.match(request).then((cached) => {
        return cached || caches.match('/offline.html');
      });
    })
  );
});
