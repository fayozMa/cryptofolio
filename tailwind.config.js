/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          lg: '1256px',
        },
        padding:"1.5rem"
      },
      colors: {
        lightBlue: '#87CEEB',
        darkGray: '#14161A',
      },
    },
  },
  plugins: [],
};
