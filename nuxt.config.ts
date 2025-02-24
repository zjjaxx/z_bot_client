// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vant:{
    importStyle:false
  },
  $production: {
    runtimeConfig: {
      public: {
        baseURL: 'http://47.92.125.144:3001'
      }
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        baseURL:'http://127.0.0.1:3001'
      }
    },
  },
 
  modules: ['@vant/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
