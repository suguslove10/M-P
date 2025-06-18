// Service Worker for PWA capabilities
const CACHE_NAME = 'suguresh-portfolio-v1';
const urlsToCache = [
    '/',
    '/css/bootstrap.min.css',
    '/css/style.css',
    '/css/modern-updates.css',
    '/js/jquery-1.12.3.min.js',
    '/js/bootstrap.min.js',
    '/js/custom.js',
    '/js/modern-enhancements.js',
    '/images/logo.png',
    '/images/about.png'
];

// Install event
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            }
        )
    );
});

// Activate event
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});