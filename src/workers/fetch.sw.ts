import dayjs from "dayjs";
import registerFetchWorker, { installPointCut } from "./parts/fetch";

const worker = self as any;
const VERSION = dayjs().unix().toString();

const installEvent = () => {
  worker.addEventListener('install', (event: any) => {
    worker.skipWaiting();
    event.waitUntil((async () => {
      await installPointCut(worker, event, VERSION)
    })())
    console.log(`Fetch ${VERSION} service worker installed`);
  });
};
installEvent();

const activateEvent = () => {
  worker.addEventListener('activate', (event: any) => {
    worker.clients.claim();
    event.waitUntil((async () => {
      await Promise.all((await caches.keys()).map((key: any) => {
        if (key.includes(VERSION)) return;
        caches.delete(key);
      }))
    })())
    console.log(`Fetch ${VERSION} service worker activated`);
  });
};
activateEvent();


registerFetchWorker(worker);