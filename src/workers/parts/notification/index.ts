import { handlePushNotification } from "./handlePushNotification";

export const registerPushWorker = async (worker: ServiceWorkerGlobalScope) => {

  worker.addEventListener("push", (event: PushEvent) => {
    console.log("🚀 ~ worker.addEventListener ~ event:", event)
    const data = event.data?.json();

    const title = data.title;
    const notificationOptions = data;

    event.waitUntil(
      worker.registration.showNotification(title, {
        ...notificationOptions,
        data: data,
      })
    );
  });

  worker.addEventListener("notificationclick", (event: NotificationEvent) => {
    event.notification.close();

    event.waitUntil(
      handlePushNotification(worker, event.notification.data.url, event.action)
    );
  });
};
