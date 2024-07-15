/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'boxshadow': '0 0 20px rgba(0, 0, 0, 0.4)',
      },
      colors: {
        'custom-blue': 'rgba(0, 0, 0, 0.748)',
        'bg-color': 'rgba(0, 0, 0, 0.850)',
      },

    },
  },
  plugins: [],
}

