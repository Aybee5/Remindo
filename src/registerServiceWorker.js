/* eslint-disable no-console */

import { register } from 'register-service-worker'

import localforage from "localforage";
import { setTimeout } from 'core-js';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready (registration) {  
      let showNotifications = () => {
        registration.showNotification("You have a new task", {
          body: "You ask me to remind you of this",
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
          requireInteraction: true
        })
      }
      self.addEventListener("notificationclick", event=>{
        event.notification.close()
        console.log("notification closed",event)
      })
      self.addEventListener("message", event=>{
        console.log("message receiveds", event)
        if (event.data) {
          localforage.getItem("time").then((data)=>{
            if (!data) return;
            setTimeout(showNotifications, 5000)
          })
        }
      })
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      self.skipWaiting().then(console.log("skipped"))
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
