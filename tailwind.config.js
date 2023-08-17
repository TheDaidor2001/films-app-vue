/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/mario.jpeg')",
      }
    },
  },
  plugins: [require("daisyui")],
}

