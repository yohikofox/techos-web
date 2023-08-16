import dayjs from "dayjs";
import { registerPushWorker } from "./parts/notification";

const worker = self as any;
const VERSION = dayjs().unix().toString();

const installEvent = () => {
  worker.addEventListener('install', () => {
    worker.skipWaiting();
    console.log(`Push ${VERSION} service worker installed`);
  });
};
installEvent();

const activateEvent = () => {
  worker.addEventListener('activate', () => {
    worker.clients.claim();
    console.log(`Push ${VERSION} service worker activated`);
  });
};
activateEvent();

registerPushWorker(worker)
