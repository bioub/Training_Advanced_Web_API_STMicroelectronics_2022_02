// sw.js
const CACHE_KEY = 'my-site-cache-v1';
const urlsToCache = ['/', '/main.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_KEY).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('http://localhost:3000')) {
    return event.respondWith(
      fetch(event.request).then((response) => {
        console.log('Network call REST', event.request.url);
        if (!response || response.status !== 200) {
          return response;
        }
        const responseToCache = response.clone();

        caches.open(CACHE_KEY).then((cache) => {
          return cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => caches.match(event.request).then((response) => {
        console.log('Cache hit REST', event.request.url);

        return response;
      }))
    );
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Cache hit', event.request.url);
        return response;
      }
      console.log('Network call', event.request.url);
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