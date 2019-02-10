self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('rest-static-v6').then(function(cache) {
      return cache.addAll(
        [
          '/sw.js',
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/index.html',
          '/',
          '/restaurant.html',
          '/data/restaurants.json',
          '/img/**.jpg',
          'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
          'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      console.log('Error', event.request);
    })
  );
});
