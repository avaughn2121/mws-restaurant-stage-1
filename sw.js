//Cache Variables
var cache_Name = 'restaurant-sw-2';
var cached_Items = [
                  '/',
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




//Function to install Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_Name)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(cached_Items);
      })
  );
});

//Function to activate Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    // Gets the keys from cache
    caches.keys().then(function(cacheNames) {
    // Used to wait until all promises care completed before deleting and adding in new cache
    return Promise.all(
      // Filter out caache names not used by restaurant finder
      cacheNames.filter(function(cacheName) {
        // TReturns caches names that start with restaurant- that does not match our new cache
        return cacheName.startsWith('restaurant-') && cacheName !== cache_Name;
      })
      // Deletes Old Cache out and puts new cache in
      .map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
    })
  );
});

//Function to fetch items out of the cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Searches cache for URL requested
    caches.match(event.request)
    .then(function(response) {
      // Returns the URL if there OR reponds with a request event
      return response || fetch(event.request);
      })
  );
});


