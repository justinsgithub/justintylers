/** @type {import('tailwindcss').Config} */

module.exports = {
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        formal: { DEFAULT: '#1e2127' },
        twitter: { DEFAULT: 'rgb(29, 155, 240)' },
        linkedin: { DEFAULT: '#0A66C2' }
      }
    }
  },
  plugins: []
}
