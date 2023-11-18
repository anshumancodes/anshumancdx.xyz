/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black-bg':'#0d1117',
        'whiteColorBg': '#e1e3f9',
        'purple-color': '#acb4fe',
        'purple-smoke-color': '#cdd0f3',
        'gray-color': '#161b22',
        'white-smoke-color': '#8b949e',
        'white-color': '#e5e5e5',
        'gradient-color': 'linear-gradient(99.51deg, #cbbee7 9.03%, #fff 89.53%)',
        'white-gradient-color': 'linear-gradient(99.51deg, #acb4fe 9.03%, #ae88fe 89.53%)',
      },
    },
    
  },
  plugins: [],
}

