/* eslint-disable no-console */

import { register } from 'register-service-worker'

import localforage from "localforage";
import { setTimeout } from 'core-js';

let showNotifications = () =>{
  new Notification("Hello", {
    body: "Hello, You have a task todo",
    requireInteraction: true,
  })
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      self.addEventListener("message", event=>{
        if (event.data) {
          localforage.getItem("time").then((data)=>{
            if (!data) return;
            setTimeout(showNotifications, 10000)
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
