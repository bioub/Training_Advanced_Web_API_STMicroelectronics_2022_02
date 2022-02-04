const assets = ['/', '/app.css', '/app.js'];
const CACHE_KEY = 'my-cache-v3';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_KEY).then((cache) => {
      return cache.addAll(assets);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Cache hit');
        return response;
      }
      console.log('Network call');
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) {
          return response;
        }
        const responseToCache = response.clone();

        caches.open(CACHE_KEY).then((cache) => {
          return cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheKeys) =>
      Promise.all(
        cacheKeys.map((cacheKey) => {
          if (cacheKey !== CACHE_KEY) {
            return caches.delete(cacheKey);
          }
        }),
      ),
    ),
  );
});