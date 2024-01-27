export async function handlePushNotification(
  worker: ServiceWorkerGlobalScope,
  url: string,
  action: string
) {
  const windowClients = await worker.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  let dataAction = undefined;
  if (action !== '') {
    const splt = action.split("#");
    dataAction = {
      action: splt[0],
      data: splt[1],
    };
  }
  for (let i = 0; i < windowClients.length; i++) {
    const client = windowClients[i];
    if (client.url === url && "focus" in client) {
      dataAction && client.postMessage(dataAction);
      return client.focus();
    }
  }

  return worker.clients.openWindow(url);
}
