/* eslint-disable no-undef */

self.skipWaiting()
let showNotifications = (title) => {
    self.registration.showNotification(title, {
        body: "You have a new task",
        badge: "./src/assets/remindo.png",
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
        vibrate: [250, 100, 200],
        requireInteraction: true
    })
}
const openApp = () => {
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
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    switch (event.action) {
        case 'discard':
            event.notification.close()
            break;
        case 'view':
            openApp()
            break
        default:
            openApp()
            break
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

