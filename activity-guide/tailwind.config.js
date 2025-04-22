/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-marine': '#002147',  // Royal Marine Blue
        'copper': '#B87333',        // Copper
        'copper-green': '#4C7355',  // Copper Green
        'sparkly-gold': '#FFD700',  // 24K Sparkly Gold
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
