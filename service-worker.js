
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

if (workbox) {
  workbox.precaching.precacheAndRoute([
  {
    "url": "core/dom-api.js",
    "revision": "036b72e3014aebe71c8be32816312a68"
  },
  {
    "url": "core/router.js",
    "revision": "457ac7bc068f4bf16dcab3535951c945"
  },
  {
    "url": "favicon.ico",
    "revision": "9656182e5073d81906249a95eb234f9d"
  },
  {
    "url": "index.html",
    "revision": "6587999835fb4f9074ecb62847184b86"
  },
  {
    "url": "index.js",
    "revision": "f57836d3bfc2319749cbb7a92c905298"
  },
  {
    "url": "package.json",
    "revision": "ea4eb85222645798f29c0a22c1d09a70"
  },
  {
    "url": "pages/chat.js",
    "revision": "e552fe6ab7ccb5a82d644025f7f5a27d"
  },
  {
    "url": "pages/roomInfo.js",
    "revision": "41f32d469c47d1810faa8e3b58f2d1ca"
  },
  {
    "url": "pages/rooms.js",
    "revision": "dba9947aceac878dd4a4df6160c92168"
  },
  {
    "url": "site.webmanifest.json",
    "revision": "4d28f8ca6e5fac8fae4766cc042cba34"
  },
  {
    "url": "styles.css",
    "revision": "96dfd17e301642e39b9dbbad7bb4b1fe"
  },
  {
    "url": "utils/loadExternalLib.js",
    "revision": "4e764c6039be85f984003611659f411e"
  },
  {
    "url": "utils/showJoinModal.js",
    "revision": "d6a71fb24ef9872aa4add1f84610a373"
  },
  {
    "url": "utils/showModal.js",
    "revision": "f7b943302cd3fff2307e34009aad5d52"
  },
  {
    "url": "utils/urls.js",
    "revision": "d8f236483fd5d62f169be22f4bb07cba"
  },
  {
    "url": "workbox-config.js",
    "revision": "a247b54608ee3276fc6e4d83a3936975"
  }
]);

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
