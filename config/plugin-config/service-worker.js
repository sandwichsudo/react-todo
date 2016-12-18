module.exports = {
  cacheId: 'my-project-name',
  filename: 'static/js/my-service-worker.js',
  maximumFileSizeToCacheInBytes: 4194304,
  runtimeCaching: [{
    urlPattern: /https?:\/\/fonts.+/,
    handler: 'fastest'
  }],
  staticFileGlobs: [
     "build/index.html",
     "build/static/js/**.js",
     "build/images/**/**.*"
  ],
  verbose: true,
  staticFileGlobsIgnorePatterns: [/js.map/],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^\/login/, /^\/shop/, /^\/tab/, /^\/admin/]
};
