/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class' ,
  theme: {
    extend: {
      colors:{
        'buttonModal': '#6AAA64',
        'bgBlack': '#262B3C',
        'bgBlackSquare': 'rgba(218, 220, 224, 0.03)',
        'bgKeyBlack': '#565F7E',
        'blackSquare': 'rgba(147, 155, 159, 0.2)',
      },
      backgroundImage:{
        'whiteMode': 'linear-gradient(180deg, #66FFED 0%, #FFEEB2 100%)',
        'blackMode': 'linear-gradient(183.67deg, #2B4485 6.6%, #AFCAFF 96.98%)',
        'toggleBlack': 'linear-gradient(to bottom, #ddedff, #cbe3ff, #bad8ff, #a9cdff, #99c2ff);',
        'toggleWhite': 'linear-gradient(180deg, #FFC123 0%, #F8832E 100%)',
      }
    },
  },
  plugins: [],

}