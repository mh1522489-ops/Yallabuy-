// ============================================
// Yallabuy Service Worker - v4 (Hybrid)
// صفحات: Network First | صور: Stale While Revalidate
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
// 3. جلب الطلبات
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  // 🔴 صور → Stale While Revalidate
  // (رجع الكاش فوراً + حدّث في الخلفية)
  if (request.destination === 'image') {
    event.respondWith(imageStaleWhileRevalidate(request));
    return;
  }

  // 🔵 صفحات وملفات → Network First
  event.respondWith(pageNetworkFirst(request));
});

// ============================================
// استراتيجيات الكاش
// ============================================

// 🔴 Stale While Revalidate للصور
async function imageStaleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // حدّث في الخلفية (مهما يحصل)
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // لو النت قطع، مافيش مشكلة
    console.log('Image update failed, using cache');
  });

  // رجع الكاش فوراً (لو موجود)
  if (cached) {
    return cached;
  }

  // لو مافيش كاش، استنى النت
  return fetchPromise;
}

// 🔵 Network First للصفحات
async function pageNetworkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    // جرب النت أولاً
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      // خزّن في الكاش
      const clone = networkResponse.clone();
      cache.put(request, clone);
    }

    return networkResponse;

  } catch (error) {
    // النت قطع → جرب الكاش
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    // لو الصفحة مش موجودة → offline.html
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/offline.html');
      if (offlinePage) return offlinePage;

      // fallback أخير
      return cache.match('/');
    }

    return new Response('⚠️ Offline - No cached data', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// ============================================
// 4. رسائل التحديث
// ============================================
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
