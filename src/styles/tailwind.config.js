// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Colors, typography, and other design tokens will be added here
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ],
};