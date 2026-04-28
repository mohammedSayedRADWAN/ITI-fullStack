const CACHE_NAME = 'yalla-stadium-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/booking.html',
  '/contact.html',
  '/myStudiums.html',
  '/success.html',
  '/style.css',
  '/reset.css',
  '/main.js',
  '/myBooking.js',
  '/success.js',
  '/pwa.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request).then((fetchRes) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Only cache successful GET requests
          if (event.request.method === 'GET' && fetchRes.status === 200) {
            cache.put(event.request.url, fetchRes.clone());
          }
          return fetchRes;
        });
      });
    }).catch(() => {
      if (event.request.url.indexOf('.html') > -1) {
        return caches.match('/index.html');
      }
    })
  );
});
