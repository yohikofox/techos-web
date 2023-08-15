import { registerPushWorker } from "./parts/notification";
import { registerFetchWorker } from "./parts/fetch";

const worker = self as any;

const installEvent = () => {
  worker.addEventListener('install', () => {
    worker.skipWaiting();
    console.log('service worker installed');
  });
};
installEvent();

const activateEvent = () => {
  worker.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};
activateEvent();

self.addEventListener('fetch', (event: any) => {
  postMessage('fetch event in service worker')
})

registerPushWorker(worker)
// registerFetchWorker(worker)
