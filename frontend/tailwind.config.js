/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark-green': '#233125',
        'light-blue': '#ABAFC5',
        'tan': '#BEAF9D',
        'light-green': '#97B69B',
        'dark-blue': '#292D37',
        'purple': '#312835',
        'charcoal': '#171717',
      },
      fontFamily: {
        'mokoko': ["mokoko-variable", 'sans-serif'],
        'new-science': ['new-science', 'serif'],
        'josefin': ['josefin-sans', 'sans-serif'],
        'roca': ['roca', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

