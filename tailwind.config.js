/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
         '3xl': '1920px',
         '4xl': '2560px',
         '5xl': '3440px'
      }
   }
  },
  plugins: [],
  safelist: [
    {
      pattern: /from-(red|green|yellow|gray)-(300|500|700|900)/,
    },
  ],
};
