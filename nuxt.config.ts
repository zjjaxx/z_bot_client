// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vant:{
    importStyle:false
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL??'http://47.92.125.144:3001'
    }
  },
  modules: ['@vant/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
