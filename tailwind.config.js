/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E3F2FD",
          100: "#BBDEFB",
          500: "#1565C0",
          700: "#0D47A1",
        },
        success: "#2E7D32",
        warning: "#E65100",
        danger: "#B71C1C",
      },
      fontFamily: { sans: ["Roboto", "Helvetica", "Arial", "sans-serif"] },
      borderRadius: { xl: "1rem", "2xl": "1.5rem" },
    },
  },
  plugins: [],
};
