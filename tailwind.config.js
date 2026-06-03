/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c0c1ff',
          container: '#313264',
        },
        'on-primary': {
          DEFAULT: '#1a1b4b',
          container: '#e1e0ff',
        },
        surface: {
          DEFAULT: '#131315',
          container: {
            lowest: '#0a0a0c',
            high: '#232326',
          },
        },
        'on-surface': {
          DEFAULT: '#ffffff',
          variant: '#a0a0a8',
        },
      },
      maxWidth: {
        'container-max': '1280px',
      },
    },
  },
  plugins: [],
}
