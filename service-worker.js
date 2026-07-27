const CACHE_NAME = 'yallabuy-cache-v63';  // غيّر الرقم!
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/logo.png',
  '/favicon.ico'
];

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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

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
// الحل: Stale While Revalidate
// ═══════════════════════════════════════════════════════
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      
      // جرب الشبكة في الخلفية (مهما حصل)
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && shouldCache(request.url)) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
            console.log('🔄 Cache updated:', request.url);
          });
        }
        return networkResponse;
      }).catch(() => {
        // الشبكة فشلت
        return cachedResponse;
      });

      // رجع الكاش فوراً (لو موجود)
      // لو مش موجود، استنى الشبكة
      return cachedResponse || fetchPromise;
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
