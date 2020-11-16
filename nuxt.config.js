export default {
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
      { name: 'theme-color', content: '#FFE400' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      { 'http-equiv': 'cache-control', content: 'nmax-age=31536000' },
      // { 'http-equiv': 'expires', content: '1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg?version=1' },
      { rel: 'manifest', href: '/manifest.json?version=1' }
    ],
    script: [
      {
        src: '/main.js',
        //async: true,
        //crossorigin: "anonymous"
      }
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
  ],

  serverMiddleware: ['~/middleware/logger'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources', "nuxt-compress"
  ],

  fetchOnServer: true,

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
