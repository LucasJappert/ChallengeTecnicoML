workbox.routing.registerRoute(
    /\.(mp4|webm|js|png|jpg|css|json|svg)/,
    new workbox.strategies.CacheFirst({
      plugins: [
        new workbox.rangeRequests.RangeRequestsPlugin(),
      ],
    }),
    'GET'
  );