module.exports = {
    cacheId: 'tuckshop-prod',
    filename: 'tuckshop-prod-service-worker.js',
    maximumFileSizeToCacheInBytes: 4194304,
    runtimeCaching: [{
        urlPattern: /https?:\/\/fonts.+/,
        handler: 'fastest'
    }, {
        urlPattern: /https?:\/\/img.tesco+/,
        handler: 'fastest'
    }, {
        urlPattern: /https?:\/\/lh5.googleusercontent.com+/,
        handler: 'fastest'
    }],
    verbose: true,
    staticFileGlobsIgnorePatterns: [/js.map/],
    navigateFallback: 'index.html',
    navigateFallbackWhitelist: [/^\/login/, /^\/shop/, /^\/tab/, /^\/admin/]
};
