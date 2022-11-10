/** @type {import('tailwindcss').Config} */
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
        'bpb':'#0072ce'
      }
    },
  },
  plugins: [],
}