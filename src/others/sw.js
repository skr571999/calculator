const cacheName = 'v1';
const contentToCache = [
    './index.html',
    './styles/main.css',
    './images/clear.png',
    './images/icon-144.png',
    './images/icon-192.png',
    './images/icon-512.png',
    './scripts/main.js',
    './scripts/install.js',
];

self.addEventListener('install', (e) => {
    console.log('[sw] Install');
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log('[sw] caching all');
            await cache.addAll(contentToCache);
        })()
    );
});

self.addEventListener('fetch', (e) => {
    console.log('[sw] Fetch');
    e.respondWith(
        (async () => {
            // console.log('[sw] Fetching : ', e.request.url);
            // console.log('[sw] Request', e.request);
            const r = await caches.match(e.request);
            // console.log('[sw] Cache Response', r);
            if (r) return r;

            // console.log('[sw] Not Found in Cache');
            const response = await fetch(e.request);
            // console.log('[sw] Response ', response);
            // Check if we received a valid response
            if (
                !response ||
                response.status !== 200 ||
                response.type !== 'basic' ||
                e.request.method !== 'GET'
                // To cache only 'contentToCache'
                // !contentToCache.find((val) => response.url.includes(val.substring(1)))
            ) {
                return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.

            const cache = await caches.open(cacheName);
            cache.put(e.request, response.clone());
            return response;
        })()
    );
});

self.addEventListener('activate', (event) => {
    console.log('[sw] Activate');
    const cacheWhitelist = [];

    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            // console.log('[sw] Keys ', cacheNames);
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // console.log('[sw] Cache ', cacheName);
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[sw] Deleting cache - ', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })()
    );
});
