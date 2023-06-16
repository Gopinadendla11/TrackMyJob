/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#818cf8",
        matt: "#28282b",
      },
      fontFamily: { Poppins: ["Poppins"] },
    },
  },
  plugins: [],
};
