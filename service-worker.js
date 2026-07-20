const CACHE_NAME = 'yallabuy-cache-v23';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/logo.png',
  '/favicon.ico'
];

// ✅ أضف الـ API endpoints اللي ممنوع تتخزن
const NEVER_CACHE = [
  '/api/',
  '/auth/',
  '/login',
  '/register',
  '/checkout',
  '/user/',
  '/admin/'
];

// ✅ دالة تتحقق لو الرابط ممنوع من التخزين
function shouldCache(url) {
  return !NEVER_CACHE.some(path => url.includes(path));
}

// 1. التثبيت
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 2. التفعيل
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

// 3. جلب الطلبات
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        // ✅ لو مش ناجح، رجعه زي ما هو
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // ✅ فقط static assets تتخزن
        if (shouldCache(request.url)) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }

        return networkResponse;
      }).catch(() => {
        // ✅ التصحيح: return دايماً
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        
        // ✅ رجع رسالة خطأ مناسبة
        return new Response('Offline - Content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});

// 4. رسائل التحديث
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
