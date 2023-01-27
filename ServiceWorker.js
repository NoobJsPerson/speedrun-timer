self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('better-speedrun-timer').then((cache) => cache.addAll([
      './index.html',
      './icon.png',
      './icon-512.png',
      './new_run.html',
      './new_run.js',
      './settings.html',
      './settings.js',
      './index.js',
    ])),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Try cache
    caches.match(event.request).then((response) =>
      // Fallback to network
      response || fetch(event.request)).catch(() => caches.match('./index.html')),
  );
});
