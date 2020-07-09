/* eslint-disable no-undef */

self.skipWaiting()
let showNotifications = (title) => {
    self.registration.showNotification("You have a new task", {
        body: title,
        badge: "./assets/logo.png",
        tag: Date.now().toString(36),
        actions: [
            {
                action: "view",
                title: "View",
            },
            {
                action: "discard",
                title: "Discard",
            }
        ],
        renotify: true,
        silent: false,
        vibrate: [1000, 1000, 500],
        requireInteraction: true
    })
}
self.addEventListener("notificationclick", (event) => {
    if (event.action === "discard") {
        event.notification.close()
    }
    else {
        event.waitUntil(async function () {
            const allClients = await clients.matchAll({
                includeUncontrolled: true
            });
            let chatClient;
            let appUrl = 'https://remindo.netlify.app';
            for (const client of allClients) {
                if (client['url'].indexOf(appUrl) >= 0) {
                    client.focus();
                    chatClient = client;
                    break;
                }
            }
            if (!chatClient) {
                chatClient = await clients.openWindow(appUrl);
            }
        }());
    }

});
self.addEventListener("message", event => {
    if (event.data.time && event.data.title) {
        let time = event.data.time
        let title = event.data.title
        setTimeout(showNotifications, time, title)
    }
})

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

