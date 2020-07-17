module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    serviceWorker: false
  }
  // pwa: {
  //   name: 'Remindo',
  //   themeColor: '#0c9041',
  //   msTileColor: '#fff',
  //   appleMobileWebAppCapable: 'no',
  //   appleMobileWebAppStatusBarStyle: 'default',
  //   manifestPath: 'manifest.json',
  //   manifestOptions: {
  //     "name": "Remindo",
  //     "short_name": "Remindo",
  //     "theme_color": "#0c9041",
  //     "background_color": "#ffffff",
  //     "display": "standalone",
  //     "scope": "/",
  //     "start_url": ".",
  //     "icons": [
  //       {
  //         "src": "img/icons/icon-72x72.png",
  //         "sizes": "72x72",
  //         "type": "image/png"
  //       },
  //       {
  //         "src": "img/icons/icon-96x96.png",
  //         "sizes": "96x96",
  //         "type": "image/png"
  //       },
  //       {
  //         "src": "img/icons/icon-128x128.png",
  //         "sizes": "128x128",
  //         "type": "image/png"
  //       },
  //       {
  //         "src": "img/icons/icon-144x144.png",
  //         "sizes": "144x144",
  //         "type": "image/png"
  //       },
  //       {
  //         "src": "img/icons/icon-152x152.png",
  //         "sizes": "152x152",
  //         "type": "image/png"
  //       },
  //       {
  //         "src": "img/icons/icon-192x192.png",
  //         "sizes": "192x192",
  //         "type": "image/png"
  //       },
  //       {
  //         "src": "img/icons/icon-384x384.png",
  //         "sizes": "384x384",
  //         "type": "image/png"
  //       },
  //       {
  //         "src": "img/icons/icon-512x512.png",
  //         "sizes": "512x512",
  //         "type": "image/png"
  //       }
  //     ],
  //   },
  //   iconPaths: {
  //     favicon32: 'img/icons/favicon-32x32.png',
  //     favicon16: 'img/icons/favicon-16x16.png',
  //     appleTouchIcon: 'img/icons/apple-touch-icon.png',
  //     maskIcon: 'img/icons/safari-pinned-tab.svg',
  //     msTileImage: 'img/icons/mstile-150x150.png'
  //   },
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     exclude: [/\.map$/, /_redirects/],
  //     // ...other Workbox options...
  //     swSrc: "src/service-worker.js"
  //   }
  // }
}
