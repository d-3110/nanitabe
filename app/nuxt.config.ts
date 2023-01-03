import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  css: [
    '@/assets/styles/tailwind.css',
    '@/assets/styles/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  // plugins: ['@/plugins/fontawesome.ts'],
  app: {
    head: {
      htmlAttrs: {
        "data-theme": "cupcake",
      },
    },
  },
});

