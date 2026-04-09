export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['gsap'],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Udrink 嗚！好喝 - 社群飲品評鑑平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: '專為手搖飲與超商飲品設計的社群評分與收藏平台。' },
        { name: 'theme-color', content: '#F7F2E0' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
