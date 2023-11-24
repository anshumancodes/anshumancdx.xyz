/** @type {import('tailwindcss').Config} */
const tailwindconfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 
  theme: {
    extend: {
      colors:{
        'black-bg': '#0d1117',
        'white-color': '#e5e5e5',
        'purple-color-normal':'#acb4fe',
        'dark-mode-grad':'linear-gradient(99.51deg, #cbbee7 9.03%, #ffffff 89.53%)',

        'white-smoke-color':'#8b949e',
        // 
        'white-color-bg':'#e1e3f9',
        'purple-dark-color':'#ae88fe',
        'purple-smoke':'#cdd0f3',
        'gray-color':'#161b22',
        'line-bg':'linear-gradient(180deg,rgba(36,44,55,0),#575d66);',
        'alert-bg':'#c6f6d5',
        'info-blue':'#bee3f8'
      }, width: {
        '80c': '80%',
         '70c':'70%',
         '60c':'60%',
         '50c':'50%',
         '40c':'40%',
         '30c':'30%',
        //  pixel widths
        '20pwx':'20px',
        '100pwx':'100px',
        '200pwx':'200px',
        '300pwx':'300px',
        '320pwx':'318px',
        '400pwx':'400px',
        '500pwx':'500px',
        '600pwx':'600px',
        '700pwx':'700px',
        

      },
      height:{
        '20phx':'20px',
        '100phx':'100px',
        '160phx':'160px',
        

        '200phx':'200px',
        '300phx':'300px',
        '400phx':'400px',
        '500phx':'500px',
        '600phx':'600px',
        '700phx':'700px',
      }
      
      ,
      margin:{
        '10up':'10vh'  , // mostly  i use it for margin top  thats why 'up' is mentioned
         '5gen':'5vh' ,   // general value for vertical margin 
         '10side':'10vw'  , // this and the below one is used for side margins or whatever 
         '5side':'5vw'
      },
      fontSize:{
        '1x':'1rem',
         '1x+':'1.2rem',
         '1x++':'1.5rem',
        '2x':'2rem',
        '3x':'3rem',
        '4x':'4rem',
        '6x':'6rem',
      },
      borderRadius:{
        'basic':'5px',
         
        'medium-card':'12px',

         'basic-tag':'21px',

         'complete':'50%'
      }
     
    },
  },
  plugins: [],
};

export default tailwindconfig;
