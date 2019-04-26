declare const workbox: typeof import('workbox-sw');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

if (workbox) {
  workbox.precaching.precacheAndRoute([]);

  workbox.precaching.precacheAndRoute([
    'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.slim.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
  ]);


  workbox.routing.registerRoute(
    /\.(?:png|jpg|svg|gif)$/, // not using .jpeg or .webp for now, do not cache
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'js-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200] 
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache',
    })
  );

  workbox.routing.registerRoute(
    '/',
    new workbox.strategies.StaleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    new RegExp('https://pwa-workshop-munich.herokuapp.com/rooms\/*'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'api-cache'
    })
  );
} else {
  console.error('Workbox could not be loaded.');
}
