importScripts('js/idb.js');
importScripts('js/utility.js');

var CACHE_STATIC_NAME = 'static-v4';
var CACHE_DYNAMIC_NAME = 'dynamic-v4';
var STATIC_FILES=[
    //pages
    'index.html',
    'graphes.html',

    //CSS
    'css/bootstrap.min.css',
    'css/carte.css',
    'css/style.css',

    //JavaScript
    'js/jquery-3.4.1.slim.min.js',
    'js/popper.min.js',
    'js/bootstrap.min.js',
    'js/fetch.js',
    'js/idb.js',
    'js/promise.js',
    'js/app.js',
    'js/highstock.js',
    'js/feed.js',

    //Supplement
    //img
    'img/carte/goutte.jpg',
    'img/carte/light.png',
    'img/carte/lum-intensite.jpg',
    'img/carte/rainbow.png',
    'img/carte/thermometre.png',
    //video
    'img/videos/pogona-qui-mange.mp4'
];

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function(cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll(STATIC_FILES);
            })
    )
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service Worker] Removing old cache...', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
        console.log('matched ', string);
        cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
        cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}

self.addEventListener('fetch', function (event) {

    var url = 'https://pogotron-646fd.firebaseio.com/';
    if (event.request.url.indexOf(url) > -1) {
        event.respondWith(fetch(event.request)
            .then(function (res) {
                var clonedRes = res.clone();
                if(event.request.url.indexOf(url+"posts")>-1){
                    clearAllData('posts')
                        .then(function () {
                            return clonedRes.json();
                        })
                        .then(function (data) {
                            for (var key in data) {
                                writeData('posts', data[key])
                            }
                        });
                    return res;
                }else if(event.request.url.indexOf(url+"parametre")>-1){
                    clearAllData('parametre')
                        .then(function () {
                            return clonedRes.json();
                        })
                        .then(function (data) {
                            for (var key in data) {
                                writeData('parametre', data[key])
                            }
                        });
                    return res;
                }

            })
        );
    } else if (isInArray(event.request.url, STATIC_FILES)) {
        event.respondWith(
            caches.match(event.request)
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    if (response) {
                        return response;
                    } else {
                        return fetch(event.request)
                            .then(function (res) {
                                return caches.open(CACHE_DYNAMIC_NAME)
                                    .then(function (cache) {
                                        // trimCache(CACHE_DYNAMIC_NAME, 3);
                                        cache.put(event.request.url, res.clone());
                                        return res;
                                    })
                            })
                            //.catch(function (err) {
                            //    return caches.open(CACHE_STATIC_NAME)
                            //        .then(function (cache) {
                            //            if (event.request.headers.get('accept').includes('text/html')) {
                            //                return cache.match('/offline.html');
                            //            }
                            //        });
                            //});
                    }
                })
        );
    }
});



/////////////////////////////
self.addEventListener('sync', function(event) {
    console.log('[Service Worker] Background syncing', event);

    //Parameters background syncronisation
    if (event.tag === 'sync-new-parameters') {
        console.log('[Service Worker] Syncing new Parameters');
        event.waitUntil(
            readAllData('sync-parameters')
                .then(function(data) {
                    for (var dt of data) {
                        fetch('https://pogotron-646fd.firebaseio.com/parametre.json', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                id: dt.id,
                                min_temperature:dt.min_temperature,
                                max_temperature:dt.max_temperature
                            })
                        })
                            .then(function(res) {
                                console.log('Sent data', res);
                                if (res.ok) {
                                    deleteItemFromData('sync-parameters', dt.id); // Isn't working correctly!
                                }
                            })
                            .catch(function(err) {
                                console.log('Error while sending data', err);
                            });
                    }

                })
        );
    }
});