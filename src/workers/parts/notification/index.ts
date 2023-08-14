import { handlePushNotification } from "./handlePushNotification";

export const registerPushWorker = async (worker: any) => {
  worker.addEventListener('push', (event: any) => {
    const data = event.data?.json();

    const title = data.title;
    const notificationOptions = data

    if (event.waitUntil) {
      event.waitUntil(
        worker.registration.showNotification(title, {
          ...notificationOptions,
          data: data
        })
      )
    }
  });

  worker.addEventListener('notificationclick', (event: any) => {
    event.notification.close()

    event.waitUntil(
      handlePushNotification(worker, event.notification.data.url, event.action)
    )
  })
}

/**


 */