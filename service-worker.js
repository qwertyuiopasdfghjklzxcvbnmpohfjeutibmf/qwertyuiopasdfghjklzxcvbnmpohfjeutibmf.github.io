// public/service-worker.js — self-unregistering SW
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();

      const clientsArr = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      clientsArr.forEach((client) => client.navigate(client.url));
    })(),
  );
});

self.addEventListener("fetch", () => {});
