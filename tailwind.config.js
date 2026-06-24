const { appColors, tailwindColors } = require("./src/theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: tailwindColors,
      boxShadow: {
        consent: appColors.shadow.consent,
      },
    },
  },
  plugins: [],
};
