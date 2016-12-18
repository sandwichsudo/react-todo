module.exports = {
  cacheId: 'my-project-name',
  filename: 'my-service-worker.js',
  maximumFileSizeToCacheInBytes: 4194304,
  runtimeCaching: [{
    urlPattern: /https?:\/\/fonts.+/,
    handler: 'fastest'
  }],
  verbose: true,
  staticFileGlobsIgnorePatterns: [/js.map/],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^\/login/, /^\/shop/, /^\/tab/, /^\/admin/]
};
