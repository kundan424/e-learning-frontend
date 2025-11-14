
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        Inter: ['Inter'],
        Roboto: ['Roboto']
      },
      colors: {
        'custom-blue': '#0D5EA6',
        'dark-blue' : "#064175", 
        'custom-gray': '#D5CED6',
        'custom-dark-gray': '#212121',
        'lavender': '#BB86FE', 
        'bright-green' : '#1CB55D',
        'custom-teal' : '#14B8A6',
        'light-teal' : '#2DD4BF',
        'peach' : '#DAD7E0', 
        'custom-white' : '#FDFDFD', 
        'custom-green': '#008060', // A professional, slightly dark green
        'soft-purple': '#F5F3FF', // For '1:1 Expert Sessions' card bg
        'soft-pink': '#FFF5F7',   // For 'Personalized Feed' card bg
        'soft-blue': '#ECF2FF',   // For 'Flexible & Affordable' card bg
        'soft-orange': '#FFF8ED', // For 'Build Your Network' card bg
      },
    },
  },
  plugins: [],
}

