self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('better-speedrun-timer').then(function(cache) {
      return cache.addAll([
        './index.html',
        './icon.png',
        './icon-512.png',
        './new_run.html',
        './new_run.js',
        './settings.html',
        './settings.js',
        './index.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try cache
    caches.match(event.request).then(function(response) {
      // Fallback to network
      return response || fetch(event.request);
    }).catch(function() {
      return caches.match('./index.html');
    })
  );
});