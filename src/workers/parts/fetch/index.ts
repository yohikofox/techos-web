import { SelectedValue } from "xpath";

import HTMLHelper from "@/infrastructure/helper/htmlHelper";

const DISALLOWED_URL_CACHE_PATTERN_LIST = [/^\/(?:admin|api)/];

const ALLOWED_NAVIGATE_URL_CACHE_PATTERN_LIST = [
  /^(?:\/)?$/,
  /^\/(?:post|tag)/,
];
const INSTALL_CACHED_RESOURCES = ["/hors-ligne"];

let VERSION = "";

const defaultResponse = () =>
  new Response("Contenu par défaut", { status: 200, statusText: "OK" });

export const installPointCut = async (version: string) => {
  VERSION = version;
  for (let i = 0; i < INSTALL_CACHED_RESOURCES.length; i++) {
    const key = INSTALL_CACHED_RESOURCES[i];
    const request = new Request(`${key}`);

    const response = await fetch(request, {
      next: {
        revalidate: 0,
      },
    });

    await putInCache(request.url, response);

    const links = await HTMLHelper.getElements(response, {
      selector: "//x:link",
      filter: (it: SelectedValue) => it,
    }); //.getAttribute("rel") === "stylesheet" ? it : undefined,

    await Promise.all(
      links.map(async (link: string | null | undefined) => {
        if (link === undefined || link === null) return;
        const request = new Request(link);

        const response = await fetch(request, { next: { revalidate: 0 } });
        await putInCache(request.url, response.clone());
      })
    );
  }
};

const main = (worker: ServiceWorkerGlobalScope) => {
  worker.addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(
      (async () => {
        const response = await handleEvent(event);
        return response?.clone();
      })()
    );
  });
};
const handleEvent = async (event: FetchEvent): Promise<Response> => {
  if (VERSION === "") console.log("VERSION is not set");
  try {
    switch (event.request.mode) {
      case "no-cors":
      case "same-origin":
      case "cors":
        return handle(event);
      case "navigate": {
        if (
          ALLOWED_NAVIGATE_URL_CACHE_PATTERN_LIST.some((pattern) =>
            pattern.test(new URL(event.request.url).pathname)
          )
        ) {
          return handle(event);
        }
        return defaultResponse();
      }
    }
  } catch (error) {
    console.log("error:", error);
    const url = new URL(event.request.url);

    if (INSTALL_CACHED_RESOURCES.includes(url.pathname)) {
      const cachedResource = await getFromCache(url.pathname);
      if (cachedResource !== undefined) {
        return cachedResource;
      }
    }

    const cacheResponse = await getFromCache("/hors-ligne");
    if (cacheResponse !== undefined) {
      return cacheResponse;
    }
  }

  return defaultResponse();
};

const getFromCache = async (url: string): Promise<Response> => {
  if (VERSION === "") console.log("VERSION is not set");
  const cache = await caches.open(VERSION);
  const response = await cache.match(url);
  if (!response) {
    return defaultResponse();
  }
  return response.clone();
};

const putInCache = async (url: string, response: Response) => {
  if (VERSION === "") console.log("VERSION is not set");
  const cache = await caches.open(VERSION);
  await cache.put(url, response.clone());
};

const handle = async (event: FetchEvent): Promise<Response> => {
  if (
    DISALLOWED_URL_CACHE_PATTERN_LIST.some((pattern) =>
      pattern.test(new URL(event.request.url).pathname)
    )
  ) {
    return await fetch(event.request, { next: { revalidate: 0 } });
  }

  const cachedResource = await getFromCache(event.request.url);

  /**
   * If the resource is cached, return it, otherwise return the network response
   */
  if (cachedResource !== undefined) {
    return cachedResource;
  }

  const networkResponse = await fetch(event.request, {
    next: { revalidate: 0 },
  });

  /**
   * Get newest resource version to serve next request
   */

  await putInCache(event.request.url, networkResponse);

  return await getFromCache(event.request.url);
};

export default main;
