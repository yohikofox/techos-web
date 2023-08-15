import { NextResponse } from "next/server"
const INSTALL_CACHED_RESOURCES = [
  '/hors-ligne',
  '/_next/static/css/app/(offline)/layout.css',
  '/_next/static/css/app/(offline)/hors-ligne/page.css',
]

let VERSION = ''

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

const main = (worker: any) => {
  worker.addEventListener('fetch', (event: any) => {
    event.respondWith(
      (async () => {
        const response = await toto(event)
        return response?.clone()
      })()
    )
  })
}
const toto = async (event: FetchEvent): Promise<Response | undefined> => {
  const cache = await caches.open(VERSION)
  try {
    switch (event.request.mode) {
      case 'no-cors':
      case 'same-origin':
      case 'cors':
      case 'navigate': {
        const cachedResource = await cache.match(event.request.url)

        if (cachedResource) {
          console.info(`Retrieve from cache ${event.request.url}`)
          return cachedResource.clone()
        }

        console.info(`Retrieve from network ${event.request.url}`)

        const networkResponse = await fetch(event.request)

        const clonedNetworkResponse = networkResponse.clone()
        await cache.put(event.request.url, clonedNetworkResponse)

        const retrievedResource = await cache.match(event.request.url)
        console.log(`Resource ${event.request.url} put in cache`)
        return retrievedResource?.clone()
      }
    }
  } catch (error) {
    console.error('error:', error)
    const url = new URL(event.request.url)

    if (INSTALL_CACHED_RESOURCES.includes(url.pathname)) {
      const cachedResource = await cache.match(url.pathname)
      if (cachedResource) {
        console.info(`Retrieve Installed Resource from cache ${event.request.url}`)
        return cachedResource.clone()
      }
    }
    url.pathname
    const a = await cache.match('/hors-ligne')
    if (a) {
      return a.clone()
    }
  }
}



export default main
