self.addEventListener("install", (event) => {
  // console.log("[Service Worker]: Service worker installing...", event);
});

self.addEventListener("activate", (event) => {
  // console.log("[Service Worker]: Service worker activating...", event);
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // console.log("[Service Worker]: Service worker fetching...", event);
});
