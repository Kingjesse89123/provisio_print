/** @type {import('tailwindcss').Config} */

let primarycolor = '#0072ce'
let accentcolor = '#228B22'
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'default': ['Red Hat Display', 'sans-serif']
      },
      colors:{
        'bpb':primarycolor,
        'accent':accentcolor,
      }
    },
  },
  plugins: [],
}