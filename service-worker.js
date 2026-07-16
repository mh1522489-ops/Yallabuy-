// ============================================
// Yallabuy Service Worker - v2
// كاشات منفصلة لكل نوع
// ============================================

const CACHE_NAME = 'yallabuy-pages-v10';
const IMAGE_CACHE = 'yallabuy-images-v1';
const STATIC_CACHE = 'yallabuy-static-v1';

const CORE_PAGES = [
  '/',
  '/index.html',
  '/offline.html',           // ← صفحة Offline
  '/terms-of-service.html',
  '/privacy-policy.html',
  '/affiliate-disclosure.html',
  '/contact.html',
  '/about.html'
];

const STATIC_ASSETS = [
  '/style.css',
  '/script.js',
  '/manifest.json'
];

const CORE_IMAGES = [
  '/logo.png',
  '/favicon.ico',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// ============================================
// 1. التثبيت - تخزين كل حاجة
// ============================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // كاش الصفحات
      caches.open(CACHE_NAME).then(c => c.addAll(CORE_PAGES)),
      // كاش الملفات الثابتة
      caches.open(STATIC_CACHE).then(c => c.addAll(STATIC_ASSETS)),
      // كاش الصور الأساسية
      caches.open(IMAGE_CACHE).then(c => c.addAll(CORE_IMAGES))
    ]).then(() => self.skipWaiting())
  );
});

// ============================================
// 2. التفعيل - حذف الكاش القديم
// ============================================
self.addEventListener('activate', (event) => {
  const allowedCaches = [CACHE_NAME, IMAGE_CACHE, STATIC_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !allowedCaches.includes(name))
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

  const url = new URL(request.url);

  // 🔴 صور → Cache First
  if (request.destination === 'image') {
    event.respondWith(imageCacheFirst(request));
    return;
  }

  // 🟡 ملفات CSS/JS/JSON → Cache First (بتتغير قليل)
  if (['style', 'script', 'manifest'].includes(request.destination)) {
    event.respondWith(staticCacheFirst(request));
    return;
  }

  // 🔵 صفحات HTML → Network First + Fallback لـ offline.html
  event.respondWith(pageNetworkFirst(request));
});

// ============================================
// استراتيجيات الكاش
// ============================================

// 🔴 Cache First للصور
async function imageCacheFirst(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return cached; // fallback
  }
}

// 🟡 Cache First للملفات الثابتة
async function staticCacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    // تحديث في الخلفية
    fetch(request).then(response => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
    });
    return cached;
  }
  
  const response = await fetch(request);
  if (response && response.status === 200) {
    cache.put(request, response.clone());
  }
  return response;
}

// 🔵 Network First للصفحات
async function pageNetworkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Offline → جرب الكاش
    const cached = await cache.match(request);
    if (cached) return cached;
    
    // لو الصفحة مش موجودة → offline.html
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/offline.html');
      if (offlinePage) return offlinePage;
      
      // fallback أخير
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
