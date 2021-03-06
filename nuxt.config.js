export default {
  // If you provide a version, it will be stored inside cache.
  // Later when you deploy a new version, old cache will be
  // automatically purged.
  version: "Version3",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'es'
    },
    title: 'Challenge Técnico | ML',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'Challenge Técnico | ML' },
      { name: 'author', content: 'Lucas Jappert' },
      { name: 'keywords', content: '¡ofertas black friday!, Challenge tecnico ML' },
      { name: 'theme-color', content: '#FFE400' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      { 'http-equiv': 'cache-control', content: 'nmax-age=31536000' },
      // { 'http-equiv': 'expires', content: '1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg?version=1' },
      // { rel: 'preload', as: 'font', href: '/_nuxt/assets/fonts/proximanova-light.woff2', crossOrigin: "anonymous" },
      // { rel: 'preload', as: 'font', href: '/_nuxt/assets/fonts/proximanova-regular.woff2', crossOrigin: "anonymous" },
    ],
  },

  loading: { color: '#000' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/css/generales'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/pwa',
  ],

  pwa: {
    manifest: {
      start_url: "/",
      lang: 'es',
      theme_color: "#FFE400",
      background_color: "#FFE400",
      description: "Challenge Tecnico ML"
    },
    icon: {
      fileName: 'iconoPWA.png',
    },
    workbox: {
      /* workbox options */
      // workboxURL: "https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js",
      // enabled: true,
      // config: {
      //   debug: false,
      // },
      preCaching: [
        { url: "/favicon.svg?version=1", revision: null},
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://http2.mlstatic.com/.*',
          strategyOptions: {
            cacheName: 'Cache-mlstatic',
          },
          strategyPlugins: [{
             use: 'Expiration',
             config: {
               maxEntries: 10,
               maxAgeSeconds: 300
             }
           }]
        },
      ],

    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources', 
    "nuxt-compress",
    'nuxt-ssr-cache',
  ],

  //Server Side
  cache: {
      useHostPrefix: false,
      pages: [
        { url: "/", revision: null},
      ],
      
      key(route, context) {
        // custom function to return cache key, when used previous
        // properties (useHostPrefix, pages) are ignored. return 
        // falsy value to bypass the cache
        //console.log(route);
      },
  
      store: {
        type: 'memory',
        // maximum number of pages to store in memory
        // if limit is reached, least recently used page
        // is removed.
        max: 100,
        // number of seconds to store this page in cache
        ttl: 60,
      },
    },

  "nuxt-compress": {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },

  styleResources: {
    scss: [
      '~assets/css/variables.scss'
    ]
  },

  serverMiddleware: ['~middleware/setHeader'],
  
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue|scss|js)$/,
            chunks: 'all',
            enforce: true
          }
        },
        chunks: 'async'
      }
    },
    splitChunks: {
      pages: false,
      vendor: false,
      commons: false,
      runtime: false,
      layouts: false
    }
  },

}
