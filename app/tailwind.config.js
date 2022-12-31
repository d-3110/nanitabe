/** @type {import('tailwindcss').Config} */
module.exports = {
  // tailwindを適用したいファイル群を指定
  content: [
    "./app.vue",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Docs: https://tailwindcss.com/docs/typography-plugin
    require("@tailwindcss/typography"),
    // Docs: https://daisyui.com/docs
    require("daisyui"),
    // Docs: https://github.com/tailwindlabs/tailwindcss-forms
    require("@tailwindcss/forms"),
    // Docs: https://github.com/tailwindlabs/tailwindcss-aspect-ratio
    require("@tailwindcss/line-clamp"),
    // Docs: https://github.com/tailwindlabs/tailwindcss-line-clamp
    require("@tailwindcss/aspect-ratio"),
  ],
  daisyui: {
    darkTheme: "retro",
  },
};
