import { Workbox } from "workbox-window";
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute'



let wb;

if ("serviceWorker" in navigator) {
  wb = new Workbox(`${process.env.BASE_URL}service-worker.js`);

  wb.addEventListener("controlling", () => {
    window.location.reload();
  });
  // other workbox settings
  wb.addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      event.skipWaiting();
    }
    else {
      console.log(event)
    }

  });
  wb.register();
} else {
  wb = null;
}

precacheAndRoute(self.__WB_MANIFEST)

export default wb;