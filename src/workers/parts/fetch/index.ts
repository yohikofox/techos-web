import HTMLHelper from "@/utils/helper/htmlHelper"

const DISALLOWED_URL_CACHE_PATTERN_LIST = [
  /^\/(?:admin|api)/,
]

const ALLOWED_NAVIGATE_URL_CACHE_PATTERN_LIST = [
  /^(?:\/)?$/,
  /^\/(?:post|tag)/,
]
const INSTALL_CACHED_RESOURCES = [
  '/hors-ligne',
]

let VERSION = ''

export const installPointCut = async (event: any, version: string) => {
  console.log('event:', event)
  VERSION = version
  for (var i = 0; i < INSTALL_CACHED_RESOURCES.length; i++) {
    const key = INSTALL_CACHED_RESOURCES[i]
    const request = new Request(`${key}`)
    const response = await fetch(request)

    await putInCache(request.url, response)

    const links = await HTMLHelper.getElements(response, {
      selector: '//x:link',
      filter: (it: any) => it.getAttribute("rel") === "stylesheet"
    })

    await Promise.all(links.map(async (link: string) => {
      const request = new Request(link)
      const response = await fetch(request)
      await putInCache(request.url, response.clone())
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
  if (!VERSION) console.debug("VERSION is not set")
  try {
    switch (event.request.mode) {
      case 'no-cors':
      case 'same-origin':
      case 'cors':
        return handle(event)
      case 'navigate': {
        if (ALLOWED_NAVIGATE_URL_CACHE_PATTERN_LIST.some((pattern) => pattern.test(new URL(event.request.url).pathname))) {
          console.log("navigate yep", event.request.url)
          return handle(event)
        }
        return
      }
    }
  } catch (error) {
    console.log('error:', error)
    const url = new URL(event.request.url)

    if (INSTALL_CACHED_RESOURCES.includes(url.pathname)) {
      const cachedResource = await getFromCache(url.pathname)
      if (cachedResource) {
        return cachedResource
      }
    }

    const a = await getFromCache('/hors-ligne')
    if (a) {
      return a
    }
  }
}

const getFromCache = async (url: string) => {
  console.log('VERSION:', VERSION, url)
  if (!VERSION) console.debug("VERSION is not set")
  const cache = await caches.open(VERSION)
  return (await cache.match(url))?.clone()
}

const putInCache = async (url: string, response: Response) => {
  if (!VERSION) console.debug("VERSION is not set")
  const cache = await caches.open(VERSION)
  await cache.put(url, response.clone())
}

const handle = async (event: FetchEvent) => {

  if (DISALLOWED_URL_CACHE_PATTERN_LIST.some((pattern) => pattern.test(new URL(event.request.url).pathname))) {
    return await fetch(event.request)
  }

  const cachedResource = await getFromCache(event.request.url)

  /**
   * If the resource is cached, return it, otherwise return the network response
   */
  if (cachedResource) {
    return cachedResource
  }


  const networkResponse = await fetch(event.request)

  /**
   * Get newest resource version to serve next request
   */

  await putInCache(event.request.url, networkResponse)

  return await getFromCache(event.request.url)
}

export default main
