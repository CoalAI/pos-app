var rootDir = 'dist';
module.exports = {
  staticFileGlobs: [
    rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'
  ],
  stripPrefix: rootDir,
  root: rootDir,
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /^http:\/\/localhost:8080\//,
    handler: 'networkFirst'
  }]
}