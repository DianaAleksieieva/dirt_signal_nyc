/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "eco-green-dark": "var(--eco-green-dark)",
        "eco-green-soft": "var(--eco-green-soft)",
        "eco-beige": "var(--eco-beige)",
        "eco-text-dark": "var(--eco-text-dark)",
      },
    },
  },
  plugins: [],
};

export default config;
