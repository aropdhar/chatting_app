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
      borderWidth: {
        '2' : '1px'
      },
      colors: {
        'custom-blue': 'rgba(0, 0, 0, 0.748)',
        'bg-color': 'rgba(0, 0, 0, 0.850)',
        'notibg' : 'rgba(238, 238, 238, 0.3);',
        'frndbg' : 'rgba(0, 0, 0, 0.2);',
      },

    },
  },
  plugins: [],
}

