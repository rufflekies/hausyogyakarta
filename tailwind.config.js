/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8a489c", // Ungu
        background: "#ffffff", // Putih untuk light mode
        foreground: "#171717", // Hitam untuk light mode
      },
    },
  },
  darkMode: 'class', // Mengaktifkan mode gelap menggunakan class
  plugins: [],
};
