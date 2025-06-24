// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    baseURL: '/newNTacademy/', // ใส่ / ตาม subfolder ที่ deploy จริง
    head: {
      title: 'NTAcademy',
      meta: [
        { name: 'description', content: 'บริการของสถาบันวิชาการ NTAcademy' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/newNTacademy/imgLogo/logo.png' }
      ]
    }
  },
})