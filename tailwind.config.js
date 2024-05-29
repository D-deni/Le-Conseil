/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        lactic: '#D2C5B3',
        lightLactic: '#EBE3D8',
        lacticElem: '#BA9E74',
        greenDark: '#001E1F'
      },
      colors:{
        titleDark: '#294148',
        titleLactic: '#BA9E74',
        subtitleDark: '#5A5E78',
        subtitleLactic: '#998D7D',
        semiLightGray: '#797979'
      },
      backgroundImage: {
        "subheaderBase": "url('/src/assets/img/bg/bg-one.jpg')",
        "subheaderService": "url('/src/assets/img/bg/bg-two.jpeg')",
        "whyUs": "url('/src/assets/img/bg/bg-two.jpeg')",
        "practice": "url('/src/assets/img/bg/bg-three.jpeg')",
        "about": "url('/src/assets/img/bg/bg-four.jpeg')",
        "team": "url('/src/assets/img/bg/bg-five.jpeg')",
        "news": "url('/src/assets/img/bg/bg-three.jpeg')"
      },
      fontFamily: {
        "evolventaRegular": ["EvolventaRegular", 'sans-serif'],
        "evolventaBold": ["EvolventaBold", 'sans-serif'],
        "timesNewRomanRegular": ["TimesNewRomanRegular", 'sans-serif'],
        "timesNewRomanBold": ["TimesNewRomanBold", 'sans-serif'],
      }
    },
  },
  plugins: [],
}