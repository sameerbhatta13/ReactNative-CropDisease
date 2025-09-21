/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",      // optional if you have App.tsx
    "./app/**/*.{js,jsx,ts,tsx}",  // include all router screens
    "./components/**/*.{js,jsx,ts,tsx}" // your custom components
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
