import HTMLHelper from "@/utils/helper/htmlHelper"


const INSTALL_CACHED_RESOURCES = [
  '/hors-ligne',
]

let VERSION = ''

export const installPointCut = async (worker: any, event: any, version: string) => {
  VERSION = version
  const cache = await caches.open(VERSION)
  for (var i = 0; i < INSTALL_CACHED_RESOURCES.length; i++) {
    const key = INSTALL_CACHED_RESOURCES[i]
    const request = new Request(`${key}`)
    const response = await fetch(request)

    await cache.put(request, response.clone())

    const links = await HTMLHelper.getElements(response, {
      selector: '//x:link',
      filter: (it: any) => it.getAttribute("rel") === "stylesheet"
    })

    await Promise.all(links.map(async (link: string) => {
      const request = new Request(link)
      const response = await fetch(request)
      await cache.put(request, response.clone())
    }))
  }
}



const main = (worker: any) => {
  worker.addEventListener('fetch', (event: any) => {
    event.respondWith(
      (async () => {
        const response = await handleEvent(event)
        return response?.clone()
      })()
    )
  })
}
const handleEvent = async (event: FetchEvent): Promise<Response | undefined> => {
  const cache = await caches.open(VERSION)
  try {
    switch (event.request.mode) {
      case 'no-cors':
      case 'same-origin':
      case 'cors':
      case 'navigate': {
        const cachedResource = await cache.match(event.request.url)

        const networkResponse = await fetch(event.request)

        /**
         * If the resource is cached, return it, otherwise return the network response
         */
        if (cachedResource) {
          return cachedResource.clone()
        }

        /**
         * Get newest resource version to serve next request
         */
        const clonedNetworkResponse = networkResponse.clone()
        await cache.put(event.request.url, clonedNetworkResponse)

        const retrievedResource = await cache.match(event.request.url)

        return retrievedResource?.clone()
      }
    }
  } catch (error) {
    const url = new URL(event.request.url)

    if (INSTALL_CACHED_RESOURCES.includes(url.pathname)) {
      const cachedResource = await cache.match(url.pathname)
      if (cachedResource) {
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
