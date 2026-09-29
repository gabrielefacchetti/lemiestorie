const CACHE_NAME = 'storie-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Usiamo una strategia più tollerante per evitare blocchi stringenti
      return cache.addAll(ASSETS);
    }).catch(err => console.error("Errore cache iniziale:", err))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
