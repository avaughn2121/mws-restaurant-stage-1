var cache_Name = 'restaurant-sw-1';
var cached_Items = [
                  './',
                  '/index.html',
                  '/restaurant.html',
                  '/js/dbhelper.js',
                  '/js/main.js',
                  '/js/restaurant_info.js',
                  '/css/style1.css',
				  '/css/responsive.css',
                  '/data/restaurants.json',
                  '/img/'
                  ]


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_Name)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(cached_Items);
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) { 
          return response; 
        }
        return fetch(event.request);
      }
    )
  );
});


