import { NextResponse } from "next/server"
const INSTALL_CACHED_RESOURCES = [
  '/hors-ligne',
  '/_next/static/css/app/(offline)/layout.css',
  '/_next/static/css/app/(offline)/hors-ligne/page.css',
  '/offline.css']

let VERSION = ''

const main = (worker: any) => {
  worker.addEventListener('fetch', (event: any) => {
    handlePreloadedResponse(event)
  })
}

export const installPointCut = async (worker: any, event: any, version: string) => {
  VERSION = version
  console.log('VERSION:', VERSION)
  const cache = await caches.open(VERSION)
  for (var i = 0; i < INSTALL_CACHED_RESOURCES.length; i++) {
    const key = INSTALL_CACHED_RESOURCES[i]
    const request = new Request(`${key}`)
    const response = await fetch(request)
    await cache.put(request, response)
  }
}

const handlePreloadedResponse = async (event: any) => {
  event.respondWith((async () => {
    try {
      const preloadedResponse = await event.preloadResponse

      if (preloadedResponse) {
        console.log(VERSION, 'preloadedResponse:', preloadedResponse)
        return preloadedResponse
      }

      const networkResponse = await fetch(event.request)

      return networkResponse
    } catch (error) {
      const cache = await caches.open(VERSION)
      const requestedUrl = new URL(event.request.url)
      if (INSTALL_CACHED_RESOURCES.includes(requestedUrl.pathname)) {
        return cache.match(requestedUrl.pathname)
      }
      return cache.match('/hors-ligne')
    }
  })())
}

const helloResponse = (event: any) => {
  event.respondWith((async () => {
    return NextResponse.json({
      status: 200,
      body: {
        message: 'Hello from the service worker',
        version: VERSION
      }
    })
  })())
}

export default main

/**
 * worker.addEventListener('fetch', (event: any) => {
    console.log('event:', event)
    let response: any;
    event.respondWith(caches.match(event.request).catch(function () {
      return fetch(event.request);
    }).then(function (r) {
      response = r;
      caches.open('v1').then(function (cache) {
        cache.put(event.request, response);
      });
      return response.clone();
    }));
  })
 */

// self.addEventListener('fetch', function (event: any) {
//   switch (event.request.mode) {
//     case 'navigate':
//       break;
//     case 'same-origin':
//       break;
//     case 'no-cors':
//       break;
//     case 'cors':
//       break;
//     default:
//       break;
//   }
// });