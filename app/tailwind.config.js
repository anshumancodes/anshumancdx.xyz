/** @type {import('tailwindcss').Config} */
const tailwindconfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '100c':'100%',
        '90c':'90%',
        '80c': '80%',
         '70c':'70%',
         '60c':'60%',
         '50c':'50%',
         '40c':'40%',
         '30c':'30%',
        //  pixel widths
        '20pwx':'20px',
        '100pwx':'100px',
        '150pwx':'150px',
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
      },
      screens:{
        'Large':'535px'
      }
     
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default tailwindconfig;
