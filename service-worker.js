// ============================================
// Yallabuy Service Worker - v5 (FINAL FIX)
// ============================================

const CACHE_NAME = 'yallabuy-cache-v20'; // ← غيّر الرقم كل مرة

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
// 1. التثبيت - امسح القديم FIRST
// ============================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    // ✅ امسح كل الكاش القديم FIRST
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => caches.delete(name))
      );
    }).then(() => {
      // ✅ بعد كده اعمل كاش جديد
      return caches.open(CACHE_NAME);
    }).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    }).then(() => {
      // ✅ فعل فوراً
      return self.skipWaiting();
    })
  );
});

// ============================================
// 2. التفعيل - خد تحكم فوري
// ============================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // ✅ امسح أي كاش قديم تاني (احتياط)
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      // ✅ خد تحكم في كل الصفحات فوراً
      return self.clients.claim();
    })
  );
});

// ============================================
// 3. جلب الطلبات
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  // صور → Stale While Revalidate
  if (request.destination === 'image') {
    event.respondWith(imageStaleWhileRevalidate(request));
    return;
  }

  // صفحات → Network First
  event.respondWith(pageNetworkFirst(request));
});

async function imageStaleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cached);

  return cached || fetchPromise;
}

async function pageNetworkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const clone = networkResponse.clone();
      cache.put(request, clone);
    }
    return networkResponse;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/offline.html');
      if (offlinePage) return offlinePage;
      return cache.match('/');
    }
    
    return new Response('⚠️ Offline', { status: 503 });
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
