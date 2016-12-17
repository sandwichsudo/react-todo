module.exports = {
  cacheId: 'my-project-name',
  filename: 'my-service-worker.js',
  maximumFileSizeToCacheInBytes: 4194304,
  runtimeCaching: [{
    handler: 'cacheFirst',
    urlPattern: /[.]mp3$/,
  }],
  staticFileGlobsIgnorePatterns: [/js.map/],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^\/login/, /^\/shop/, /^\/tab/, /^\/admin/]
};
