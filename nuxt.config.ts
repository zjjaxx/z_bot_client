// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    }
  },
  modules: ['@vant/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
