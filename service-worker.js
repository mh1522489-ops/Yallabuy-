// service-worker.js ← عدل الملف دا بس!

const CACHE_NAME = 'yallabuy-cache-v57';

// ═══════════════════════════════════════════════════════
// استدعي ملفات إضافية (لو عايز تفصل الكود)
// ═══════════════════════════════════════════════════════
// importScripts('/sw-push.js');      // للـ Push Notifications
// importScripts('/sw-sync.js');      // للـ Background Sync
// importScripts('/sw-analytics.js'); // للـ Analytics

// ═══════════════════════════════════════════════════════
// الكود الأساسي بتاعك (زي ما هو)
// ═══════════════════════════════════════════════════════
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/logo.png',
  '/favicon.ico',
  '/offline.html'
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

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (!request.url.startsWith('http') || request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        if (shouldCache(request.url)) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline - Content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});

// ═══════════════════════════════════════════════════════
// رسائل التحديث (زي ما هو)
// ═══════════════════════════════════════════════════════
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// ═══════════════════════════════════════════════════════
// ═══ الميزات الجديدة ← ضيفها هنا من غير ما تلمس الصفحات! ═══
// ═══════════════════════════════════════════════════════

// ─── 1. PUSH NOTIFICATIONS ───
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  
  event.waitUntil(
    self.registration.showNotification(data.title || '🔥 YallaBuy', {
      body: data.body || 'عرض جديد متاح!',
      icon: '/logo.png',
      badge: '/favicon.ico',
      data: { url: data.url || '/' },
      actions: [
        { action: 'open', title: '👁️ شوف العرض' },
        { action: 'close', title: '❌ لاحقاً' }
      ],
      vibrate: [200, 100, 200]
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

// ─── 2. BACKGROUND SYNC ───
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCart());
  }
});

async function syncFavorites() {
  const db = await openDB('yallabuy-db', 1);
  const items = await db.getAll('pending-favorites');
  for (const item of items) {
    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      await db.delete('pending-favorites', item.id);
    } catch (e) { console.error('Sync failed:', e); }
  }
}

async function syncCart() {
  const db = await openDB('yallabuy-db', 1);
  const items = await db.getAll('pending-cart');
  for (const item of items) {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      await db.delete('pending-cart', item.id);
    } catch (e) { console.error('Sync failed:', e); }
  }
}

// ─── 3. PERIODIC SYNC (عروض يومية) ───
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-deals') {
    event.waitUntil(updateDeals());
  }
});

async function updateDeals() {
  try {
    const response = await fetch('/api/deals/today');
    const deals = await response.json();
    const cache = await caches.open('daily-deals');
    await cache.put('/api/deals/today', new Response(JSON.stringify(deals)));
  } catch (e) { console.error('Update deals failed:', e); }
}

// ─── 4. IndexedDB Helper ───
function openDB(name, version) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending-favorites')) {
        db.createObjectStore('pending-favorites', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('pending-cart')) {
        db.createObjectStore('pending-cart', { keyPath: 'id' });
      }
    };
  });
}

// ─── 5. GEO-REDIRECT للـ Amazon Affiliate ───
// لو عايز تضيف Geo-targeting للروابط
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // مثال: لو المستخدم داخل على /amazon/redirect
  if (url.pathname === '/amazon/redirect') {
    event.respondWith(handleAmazonGeoRedirect(event.request));
  }
});

async function handleAmazonGeoRedirect(request) {
  try {
    const geoRes = await fetch('https://ipapi.co/json/');
    const geo = await geoRes.json();
    
    const amazonLinks = {
      'EG': 'https://www.amazon.eg',
      'SA': 'https://www.amazon.sa',
      'AE': 'https://www.amazon.ae',
      'US': 'https://www.amazon.com'
    };
    
    const target = amazonLinks[geo.country_code] || amazonLinks['US'];
    return Response.redirect(target, 302);
    
  } catch (e) {
    return Response.redirect('https://www.amazon.com', 302);
  }
}

console.log('🚀 YallaBuy Service Worker v57 loaded with all features!');
