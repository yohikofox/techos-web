import registerFetchWorker, { installPointCut } from "./parts/fetch";

const worker = self as unknown as ServiceWorkerGlobalScope;
const VERSION = "v1.0.2";//dayjs().unix().toString()

const installEvent = () => {
  worker.addEventListener('install', (event: ExtendableEvent) => {
    worker.skipWaiting();
    event.waitUntil((async () => {
      await installPointCut(VERSION)//event,
    })())
    console.log(`Fetch ${VERSION} service worker installed`);
  });
};
installEvent();

const activateEvent = () => {
  worker.addEventListener('activate', (event: ExtendableEvent) => {
    worker.clients.claim();
    event.waitUntil((async () => {
      await Promise.all((await caches.keys()).map((key: string) => {
        if (key.includes(VERSION)) return;
        console.debug(`Fetch ${VERSION} service worker delete cache ${key}`);
        caches.delete(key);
      }))
    })())
    console.log(`Fetch ${VERSION} service worker activated`);
  });
};
activateEvent();


registerFetchWorker(worker);