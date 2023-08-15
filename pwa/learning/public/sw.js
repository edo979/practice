const VERSION = 'v10'
const CACHE_STATIC_NAME = `static-${VERSION}`
const CACHE_DYNAMIC_NAME = `dynamic-${VERSION}`
const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/js/app.js',
  '/src/js/feed.js',
  '/src/js/material.min.js',
  '/src/css/app.css',
  '/src/css/feed.css',
  '/src/images/main-image.jpg',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
]

self.addEventListener('install', function (event) {
  console.log('Service worker: Instaling', event)
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log('[Service worker] Precaching App Shell')
      cache.addAll(STATIC_FILES)
    })
  )
})

self.addEventListener('activate', function (event) {
  console.log('Service worker: Activating', event)

  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('Service worker: Deleting key', key)
            return caches.delete(key)
          }
        })
      )
      self.clients.claim()
    })()
  )
})

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         if (response) {
//           return response
//         } else {
//           return fetch(event.request).then((res) =>
//             caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
//               cache.put(event.request.url, res.clone())
//               return res
//             })
//           )
//         }
//       })
//       .catch(async (e) => {
//         const staticCache = await caches.open(CACHE_STATIC_NAME)
//         return staticCache.match('/offline.html')
//       })
//   )
// })

self.addEventListener('fetch', (event) => {
  const url = 'https://httpbin.org/get'

  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME).then((cache) =>
        fetch(event.request).then((res) => {
          cache.put(event.request, res.clone())
          return res
        })
      )
    )
  } else if (STATIC_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request))
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          if (response) {
            return response
          } else {
            return fetch(event.request).then((res) =>
              caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                cache.put(event.request.url, res.clone())
                return res
              })
            )
          }
        })
        .catch(async (error) => {
          const staticCache = await caches.open(CACHE_STATIC_NAME)
          if (event.request.url.indexOf('/help')) {
            return staticCache.match('/offline.html')
          }
        })
    )
  }
})
