var CACHE = 'vision-logbook-v62';
var SHELL = ['./', './index.html', './app.js', './styles.css', './manifest.webmanifest', './icon-192.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).catch(function () {}));
  self.skipWaiting();
});
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  try {
    var url = new URL(e.request.url);
    if (e.request.method !== 'GET') { return; }
    if (url.pathname.indexOf('/api/') === 0) { return; }
    e.respondWith(caches.match(e.request).then(function (hit) {
      if (hit) { return hit; }
      return fetch(e.request).then(function (res) {
        try { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); } catch (err) {}
        return res;
      }).catch(function () { return caches.match('./index.html'); });
    }));
  } catch (err) {}
});