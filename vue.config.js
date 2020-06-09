const  WorkboxPlugin  = require("workbox-webpack-plugin");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    plugins: [
      new WorkboxPlugin.InjectManifest({
        swSrc: './src/registerServiceWorker.js',
        swDest: 'service-worker.js'
      })
    ],
  }
}
