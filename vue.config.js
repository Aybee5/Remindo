module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
		name: 'Remindo',
		themeColor: '#2d3748',
		msTileColor: '#2d3748',
		appleMobileWebAppCapable: 'no',
		appleMobileWebAppStatusBarStyle: 'default',
		manifestPath: 'manifest.json',
		workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
      // ...other Workbox options...
    }
  }
}
