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
          50: '#e6f4f7',
          100: '#cce9ef',
          200: '#99d3df',
          300: '#66bdcf',
          400: '#4da8b9',
          500: '#2b8fa3',
          600: '#227283',
          700: '#1a5562',
          800: '#113841',
          900: '#091b21',
        },
        accent: {
          50: '#e0f7f6',
          100: '#c1efed',
          200: '#83dfdb',
          300: '#45cfc9',
          400: '#24c0b9',
          500: '#04b1af',
          600: '#038e8c',
          700: '#026a69',
          800: '#014746',
          900: '#012423',
        },
      },
    },
  },
  plugins: [],
}

