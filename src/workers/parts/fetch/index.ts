
export const registerFetchWorker = (worker: any) => {
  worker.addEventListener('fetch', (event: any) => {
    console.log('event:', event)
    let response: any;
    event.respondWith(caches.match(event.request).catch(function () {
      return fetch(event.request);
    }).then(function (r) {
      response = r;
      caches.open('v1').then(function (cache) {
        cache.put(event.request, response);
      });
      return response.clone();
    }));
  })
}