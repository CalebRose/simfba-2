/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /from-(red|green|yellow|gray)-(300|500|700|900)/,
    },
  ],
};
