self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('smartfarm-v1').then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './disease.html',
                './styles.css',
                './script.js',
                './manifest.json',
                './icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});