const CACHE_NAME = 'yallabuy-cache-v327';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/favicon.svg',
  '/icons/icon-192x192.jpg',
  '/icons/icon-512x512.jpg',
  '/icons/icon-180x180.jpg'
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

function shouldNeverCache(url) {
  return NEVER_CACHE.some(path => url.includes(path));
}

function isHTMLRequest(request) {
  return (
    request.mode === 'navigate' ||
    request.destination === 'document'
  );
}

function isStaticAsset(request) {
  return [
    'style',
    'script',
    'image',
    'font'
  ].includes(request.destination);
}


// ========================================
// 1. INSTALL
// ========================================

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching core assets...');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('Core assets cached successfully');

        // Activate new Service Worker immediately
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Cache installation failed:', error);
      })
  );
});


// ========================================
// 2. ACTIVATE
// ========================================

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('New Service Worker activated');

        // Take control of all open pages
        return self.clients.claim();
      })
  );
});


// ========================================
// 3. FETCH
// ========================================

self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Only handle HTTP/HTTPS requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Don't cache protected/API routes
  if (shouldNeverCache(request.url)) {
    return;
  }


  // ========================================
  // HTML → NETWORK FIRST
  // ========================================

  if (isHTMLRequest(request)) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {

          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });
          }

          return networkResponse;
        })
        .catch(() => {
          return caches.match(request)
            .then(cachedResponse => {

              if (cachedResponse) {
                return cachedResponse;
              }

              return caches.match('/offline.html');
            });
        })
    );

    return;
  }


  // ========================================
  // CSS / JS → NETWORK FIRST
  // ========================================

  if (isStaticAsset(request)) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {

          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });
          }

          return networkResponse;
        })
        .catch(() => {
          return caches.match(request)
            .then(cachedResponse => {

              if (cachedResponse) {
                return cachedResponse;
              }

              return new Response('Offline', {
                status: 503,
                headers: {
                  'Content-Type': 'text/plain'
                }
              });
            });
        })
    );

    return;
  }


  // ========================================
  // OTHER FILES → CACHE FIRST
  // ========================================

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then(networkResponse => {

            if (
              networkResponse &&
              networkResponse.ok
            ) {
              const responseToCache =
                networkResponse.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(request, responseToCache);
                });
            }

            return networkResponse;
          });
      })
      .catch(() => {
        return new Response('Offline', {
          status: 503,
          headers: {
            'Content-Type': 'text/plain'
          }
        });
      })
  );
});


// ========================================
// 4. SERVICE WORKER UPDATE MESSAGE
// ========================================

self.addEventListener('message', event => {

  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }

});
