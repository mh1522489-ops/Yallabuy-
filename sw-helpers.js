// ═══════════════════════════════════════════════════════
// sw-helpers.js - دوال مساعدة للتعامل مع Service Worker
// ضيف الملف دا في أي صفحة عايز تستخدم الميزات
// ═══════════════════════════════════════════════════════

const SWHelpers = {
  
  // ─── 1. Push Notifications ───
  async subscribeToPush(vapidPublicKey) {
    try {
      const reg = await navigator.serviceWorker.ready;
      
      // شيك لو المستخدم مشترك قبل كدا
      const existingSub = await reg.pushManager.getSubscription();
      if (existingSub) {
        console.log('✅ Already subscribed');
        return existingSub;
      }
      
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this._urlBase64ToUint8Array(vapidPublicKey)
      });
      
      // ابعت للسيرفر
      await fetch('/api/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });
      
      console.log('🔔 Push subscribed!');
      return subscription;
      
    } catch (err) {
      console.error('❌ Push subscription failed:', err);
      throw err;
    }
  },
  
  async unsubscribeFromPush() {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      await sub.unsubscribe();
      await fetch('/api/push-unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: sub.endpoint })
      });
      console.log('🔕 Unsubscribed');
    }
  },
  
  // ─── 2. Background Sync ───
  async sync(tag) {
    try {
      const reg = await navigator.serviceWorker.ready;
      await reg.sync.register(tag);
      console.log('🔄 Sync registered:', tag);
    } catch (err) {
      console.error('❌ Sync failed:', err);
    }
  },
  
  // ─── 3. Periodic Sync ───
  async registerPeriodicSync(tag, minInterval = 24 * 60 * 60 * 1000) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if ('periodicSync' in reg) {
        const status = await navigator.permissions.query({
          name: 'periodic-background-sync'
        });
        
        if (status.state === 'granted') {
          await reg.periodicSync.register(tag, { minInterval });
          console.log('📅 Periodic sync registered:', tag);
        } else {
          console.log('⚠️ Periodic sync permission denied');
        }
      }
    } catch (err) {
      console.error('❌ Periodic sync failed:', err);
    }
  },
  
  // ─── 4. Cache Management ───
  async clearCache() {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    console.log('🗑️ All caches cleared');
  },
  
  async getCacheSize() {
    let totalSize = 0;
    let totalItems = 0;
    
    for (const name of await caches.keys()) {
      const cache = await caches.open(name);
      const requests = await cache.keys();
      totalItems += requests.length;
      
      for (const request of requests) {
        const response = await cache.match(request);
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
    
    return {
      items: totalItems,
      size: this._formatBytes(totalSize)
    };
  },
  
  // ─── 5. IndexedDB Helpers ───
  async openDB(name, version, stores) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (stores) {
          stores.forEach(store => {
            if (!db.objectStoreNames.contains(store)) {
              db.createObjectStore(store, { keyPath: 'id' });
            }
          });
        }
      };
    });
  },
  
  async saveForSync(storeName, data) {
    const db = await this.openDB('yallabuy-db', 1, [
      'pending-favorites',
      'pending-cart',
      'pending-analytics'
    ]);
    
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.add({ ...data, id: Date.now(), timestamp: new Date().toISOString() });
    
    // سجل للـ sync
    await this.sync(`sync-${storeName.replace('pending-', '')}`);
  },
  
  // ─── 6. Geo Redirect ───
  async getUserCountry() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      return data.country_code;
    } catch {
      return 'US'; // default
    }
  },
  
  getAmazonLink(countryCode, asin = '') {
    const links = {
      'EG': 'https://www.amazon.eg',
      'SA': 'https://www.amazon.sa',
      'AE': 'https://www.amazon.ae',
      'US': 'https://www.amazon.com',
      'UK': 'https://www.amazon.co.uk',
      'DE': 'https://www.amazon.de',
      'FR': 'https://www.amazon.fr'
    };
    
    const base = links[countryCode] || links['US'];
    return asin ? `${base}/dp/${asin}` : base;
  },
  
  // ─── 7. Install Prompt (PWA) ───
  initInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // أظهر زر التثبيت
      const installBtn = document.getElementById('install-btn');
      if (installBtn) {
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', async () => {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log('Install prompt outcome:', outcome);
          deferredPrompt = null;
        });
      }
    });
    
    window.addEventListener('appinstalled', () => {
      console.log('🎉 App installed!');
      deferredPrompt = null;
    });
  },
  
  // ─── 8. Connection Status ───
  initConnectionStatus() {
    const updateStatus = () => {
      const isOnline = navigator.onLine;
      document.body.classList.toggle('offline', !isOnline);
      
      // أظهر/اخفي banner
      const banner = document.getElementById('offline-banner');
      if (banner) {
        banner.style.display = isOnline ? 'none' : 'block';
      }
      
      console.log(isOnline ? '🌐 Online' : '📴 Offline');
    };
    
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
  },
  
  // ─── Private Helpers ───
  _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  },
  
  _formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

// اجعلها متاحة عالمياً
window.SWHelpers = SWHelpers;
