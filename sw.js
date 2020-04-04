
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll([
                    //pages
                    'index.html',

                    //CSS
                    'css/bootstrap.min.css',

                    //JavaScript
                    'js/jquery-3.4.1.slim.min.js',
                    'js/popper.min.js',
                    'js/bootstrap.min.js',
                    'js/fetch.js',
                    'js/promise.js',
                    'js/app.js',

                    //Supplément
                    'img/pogona-qui-mange.mp4'
                ]);
            })
    )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                    .then(function (res) {
                        return caches.open('dynamic')
                            .then(function (cache) {
                                cache.put(event.request.url,res.clone());
                                return res;
                            })
                    });
                }
            })
    );
});