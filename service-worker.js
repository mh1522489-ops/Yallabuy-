'use strict';

// ========================================
// 1. CACHE CONFIGURATION
// ========================================

const CACHE_VERSION = 'v329';

const CACHE_PREFIX = 'yallabuy-';

const CACHE_NAME = `yallabuy-cache-${CACHE_VERSION}`;

const IMAGE_CACHE_NAME = 'yallabuy-images-v1';

const MAX_CACHED_IMAGES = 150;


// ========================================
// 2. CORE ASSETS
// ========================================

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


// offline.html is required for installation.
// Other assets are optional so one missing icon
// won't prevent the entire Service Worker installing.

const REQUIRED_ASSETS = [
  '/offline.html'
];


// ========================================
// 3. ROUTES THAT MUST NOT BE CACHED
// ========================================

const NEVER_CACHE_PATHS = [
  '/api',
  '/auth',
  '/login',
  '/register',
  '/checkout',
  '/user',
  '/admin'
];


// ========================================
// 4. HELPER FUNCTIONS
// ========================================

function isHttpRequest(request) {
  return (
    request.url.startsWith('https://') ||
    request.url.startsWith('http://')
  );
}


function isSameOrigin(url) {
  return url.origin === self.location.origin;
}


function shouldNeverCache(url) {
  if (!isSameOrigin(url)) {
    return false;
  }

  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  return NEVER_CACHE_PATHS.some(path => {
    return (
      pathname === path ||
      pathname.startsWith(`${path}/`)
    );
  });
}


function isHTMLRequest(request) {
  return (
    request.mode === 'navigate' ||
    request.destination === 'document'
  );
}


function isImageRequest(request) {
  return request.destination === 'image';
}


function isStaticAsset(request) {
  return [
    'style',
    'script',
    'font'
  ].includes(request.destination);
}


function isCacheableResponse(response) {
  if (!response || response.status !== 200) {
    return false;
  }

  if (
    response.type !== 'basic' &&
    response.type !== 'cors' &&
    response.type !== 'default'
  ) {
    return false;
  }

  const cacheControl =
    response.headers.get('Cache-Control') || '';

  if (/no-store/i.test(cacheControl)) {
    return false;
  }

  const vary = response.headers.get('Vary');

  if (vary && vary.trim() === '*') {
    return false;
  }

  return true;
}


function isCacheableImageResponse(response) {
  if (!response) {
    return false;
  }

  // Cross-origin images may return opaque responses
  // when loaded using no-cors mode.
  if (response.type === 'opaque') {
    return true;
  }

  if (!isCacheableResponse(response)) {
    return false;
  }

  const contentType =
    response.headers.get('Content-Type') || '';

  return contentType.toLowerCase().startsWith('image/');
}


async function getCachedResponse(request) {
  return caches.match(request);
}


async function cacheResponse(cacheName, request, response) {
  try {
    const cache = await caches.open(cacheName);

    await cache.put(request, response.clone());

    return true;
  } catch (error) {
    console.warn(
      '[Service Worker] Could not cache response:',
      request.url,
      error
    );

    return false;
  }
}


// ========================================
// 5. LIMIT IMAGE CACHE SIZE
// ========================================

async function trimImageCache() {
  try {
    const cache = await caches.open(IMAGE_CACHE_NAME);

    const keys = await cache.keys();

    if (keys.length <= MAX_CACHED_IMAGES) {
      return;
    }

    const excess = keys.length - MAX_CACHED_IMAGES;

    await Promise.all(
      keys.slice(0, excess).map(request => {
        return cache.delete(request);
      })
    );
  } catch (error) {
    console.warn(
      '[Service Worker] Could not trim image cache:',
      error
    );
  }
}


// ========================================
// 6. INSTALL
// ========================================

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Cache the required offline page first.
      // If this fails, installation should fail.
      await cache.addAll(REQUIRED_ASSETS);

      // Cache other core assets individually.
      // A missing optional asset won't break installation.
      const results = await Promise.allSettled(
        CORE_ASSETS
          .filter(path => !REQUIRED_ASSETS.includes(path))
          .map(async path => {
            const request = new Request(path, {
              cache: 'reload'
            });

            const response = await fetch(request);

            if (!isCacheableResponse(response)) {
              throw new Error(
                `Invalid core asset response: ${path}`
              );
            }

            await cache.put(request, response);
          })
      );

      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(
            '[Service Worker] Optional asset was not cached:',
            result.reason
          );
        }
      });

      console.log(
        '[Service Worker] Installation completed:',
        CACHE_NAME
      );

      // Activate this version after installation.
      await self.skipWaiting();
    })()
  );
});


// ========================================
// 7. ACTIVATE
// ========================================

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      const cachesToKeep = [
        CACHE_NAME,
        IMAGE_CACHE_NAME
      ];

      // Delete only old caches belonging to this project.
      const oldProjectCaches = cacheNames.filter(name => {
        const belongsToProject =
          name.startsWith('yallabuy-cache-') ||
          name.startsWith('yallabuy-images-');

        return (
          belongsToProject &&
          !cachesToKeep.includes(name)
        );
      });

      await Promise.all(
        oldProjectCaches.map(name => caches.delete(name))
      );

      // Take control of currently open pages.
      await self.clients.claim();

      console.log(
        '[Service Worker] Activated:',
        CACHE_NAME
      );
    })()
  );
});


// ========================================
// 8. FETCH: REQUEST HANDLING
// ========================================

self.addEventListener('fetch', event => {
  const request = event.request;

  // Only handle GET requests.
  if (request.method !== 'GET') {
    return;
  }

  // Ignore non-HTTP requests.
  if (!isHttpRequest(request)) {
    return;
  }

  const url = new URL(request.url);

  // Never cache protected or excluded same-origin routes.
  if (shouldNeverCache(url)) {
    return;
  }


  // ========================================
  // A. IMAGES: CACHE FIRST
  // ========================================

  if (isImageRequest(request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(IMAGE_CACHE_NAME);

        // Check the cache first.
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        // If not cached, fetch from the network.
        const networkResponse = await fetch(request);

        if (isCacheableImageResponse(networkResponse)) {
          // Cache in the background.
          event.waitUntil(
            (async () => {
              const saved = await cacheResponse(
                IMAGE_CACHE_NAME,
                request,
                networkResponse
              );

              if (saved) {
                await trimImageCache();
              }
            })()
          );
        }

        return networkResponse;
      })().catch(async error => {
        console.warn(
          '[Service Worker] Image request failed:',
          request.url,
          error
        );

        // A cached response may have become available.
        const cachedResponse = await getCachedResponse(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        return new Response('', {
          status: 503,
          statusText: 'Image unavailable offline'
        });
      })
    );

    return;
  }


  // ========================================
  // B. HTML: NETWORK FIRST
  // ========================================

  if (isHTMLRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);

          const contentType =
            networkResponse.headers.get('Content-Type') || '';

          const isHTML =
            contentType.toLowerCase().includes('text/html');

          if (
            networkResponse.status === 200 &&
            isHTML &&
            isCacheableResponse(networkResponse)
          ) {
            event.waitUntil(
              cacheResponse(
                CACHE_NAME,
                request,
                networkResponse
              )
            );
          }

          return networkResponse;
        } catch (error) {
          const cachedResponse = await caches.match(request);

          if (cachedResponse) {
            return cachedResponse;
          }

          const offlinePage = await caches.match('/offline.html');

          if (offlinePage) {
            return offlinePage;
          }

          return new Response(
            'You are offline. Please try again later.',
            {
              status: 503,
              headers: {
                'Content-Type': 'text/plain; charset=utf-8'
              }
            }
          );
        }
      })()
    );

    return;
  }


  // ========================================
  // C. CSS / JAVASCRIPT / FONTS: NETWORK FIRST
  // ========================================

  if (isStaticAsset(request)) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);

          if (isCacheableResponse(networkResponse)) {
            event.waitUntil(
              cacheResponse(
                CACHE_NAME,
                request,
                networkResponse
              )
            );
          }

          return networkResponse;
        } catch (error) {
          const cachedResponse = await caches.match(request);

          if (cachedResponse) {
            return cachedResponse;
          }

          return new Response('Asset unavailable offline', {
            status: 503,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8'
            }
          });
        }
      })()
    );

    return;
  }


  // ========================================
  // D. OTHER RESOURCES: CACHE FIRST
  // ========================================

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(request);

        if (isCacheableResponse(networkResponse)) {
          event.waitUntil(
            cacheResponse(
              CACHE_NAME,
              request,
              networkResponse
            )
          );
        }

        return networkResponse;
      } catch (error) {
        return new Response('Resource unavailable offline', {
          status: 503,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8'
          }
        });
      }
    })()
  );
});
