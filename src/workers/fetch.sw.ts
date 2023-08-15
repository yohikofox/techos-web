self.addEventListener('install', () => {
  console.log('service worker installed')
});

self.addEventListener('activate', () => {
  console.log('service worker activated')
});

self.addEventListener('fetch', function (event: any) {
  console.log('fetch event', event.request.url);
});