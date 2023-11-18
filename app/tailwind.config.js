/** @type {import('tailwindcss').Config} */
const tailwindconfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 
  theme: {
    extend: {
      colors:{
        'black-bg': '#0d1117',
        'white-color': '#e5e5e5',
        // 
        'white-color-bg':'#e1e3f9',
        'purple-dark-color':'#ae88fe',
        'purple-smoke':'#cdd0f3',
        'gray-color':'#161b22'
      }, width: {
        '80c': '80%',
      },
     
    },
  },
  plugins: [],
};

export default tailwindconfig;
