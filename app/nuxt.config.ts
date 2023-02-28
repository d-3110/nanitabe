import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', 'nuxt-lodash', 'vue-swatches/nuxt'],
  css: [
    '@/assets/styles/tailwind.css',
    '@/assets/styles/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  app: {
    head: {
      title: "なにたべ",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "152x152", href: "/apple-touch-icon.png" },
      ],
      htmlAttrs: {
        "data-theme": "retro",
      },
    },
  },
  build: { transpile: ['@vee-validate/rules'] }
});

