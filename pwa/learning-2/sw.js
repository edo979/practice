importScripts('/assets/js/idb.js')
importScripts('./src/js/utility')

const VERSION = 'v15'
const CACHE_STATIC_NAME = `static-${VERSION}`
const CACHE_DYNAMIC_NAME = `dynamic-${VERSION}`
const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  // '/src/js/script.js',
  // '/src/js/feed.js',
  // '/src/css/app.css',
  // '/src/css/feed.css',
  '/assets/js/idb.js',
  '/assets/js/material.min.js',
  '/assets/images/main-image.jpg',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
]

// async function trimCache(cacheName, maxItems) {
//   const cache = await caches.open(cacheName)
//   const keys = await cache.keys()

//   if (keys.length > maxItems) {
//     await cache.delete(keys[0])
//     await trimCache(cacheName, maxItems)
//   }
// }

self.addEventListener('install', function (event) {
  console.log('Service worker: Instaling')
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log('[Service worker] Precaching App Shell')
      cache.addAll(STATIC_FILES)
    })
  )
})

self.addEventListener('activate', function (event) {
  console.log('Service worker: Activating')

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
  const url = 'http://localhost:5000/posts'
  if (event.request.url.includes(url) && event.request.method === 'get') {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME).then((cache) =>
        fetch(event.request).then(async (res) => {
          // await trimCache(CACHE_DYNAMIC_NAME, 1)
          const cloneRes = res.clone()
          const data = await cloneRes.json()

          await clearAllData('posts')
          data.forEach((post) => writeData('posts', post))
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
              caches.open(CACHE_DYNAMIC_NAME).then(async (cache) => {
                // await trimCache(CACHE_DYNAMIC_NAME, 1)
                cache.put(event.request.url, res.clone())
                return res
              })
            )
          }
        })
        .catch(async (error) => {
          const staticCache = await caches.open(CACHE_STATIC_NAME)
          if (event.request.headers.get('accept').includes('text/html')) {
            return staticCache.match('/offline.html')
          }
        })
    )
  }
})
