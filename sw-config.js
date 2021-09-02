var rootDir = 'dist';
module.exports = {
  staticFileGlobs: [
    rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'
  ],
  stripPrefix: rootDir,
  root: rootDir,
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: process.env.VUE_APP_FRONTEND_URL_PATTERN ? new RegExp(process.env.VUE_APP_FRONTEND_URL_PATTERN) : /^http:\/\/localhost:8080\//,
    handler: 'networkFirst'
  }]
}