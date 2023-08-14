import { registerPushWorker } from "./parts/notification";

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

registerPushWorker(worker);
