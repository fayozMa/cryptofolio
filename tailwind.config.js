// tailwind.config.js
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
          lg: "1256px",
        },
        padding: "1.5rem",
      },
      colors: {
        lightBlue: "#87CEEB",
        darkGray: "#14161A",
      },
      boxShadow: {
        "custom-1": "0px 4px 5px 0px #00000024",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
};
