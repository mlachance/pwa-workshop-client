importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js')

if (workbox) {
  // npm install workbox-cli --global
  // workbox wizard --injectManifest
  // workbox injectManifest
  workbox.precaching.precacheAndRoute([])

  workbox.routing.registerRoute(
    new RegExp('https://pwa-workshop-munich.herokuapp.com/rooms\/*'),
    new workbox.strategies.NetworkFirst({
      // you can set up requests here (headers, credentials, etc)
      cacheName: 'api-cache'
    })
  )
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}