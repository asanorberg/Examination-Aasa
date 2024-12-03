/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      coal: "#353131",
      ash: "#eeeeee",
      bacon: "#fbe9e8",
      darkmint: "#489078",
      clay: "#605858",
      alert: "#EB5757",
      snow: "#F4F3F1F0",
      lightmint: "#dbfbef",
      mint: "#8ed8bf",
      shadelight: "rgba(241, 240, 236, 0.24)",
      shadedark: "rgba(53, 49, 49, 0.24)",
    },
    extend: {
      fontFamily: {
        sans: ["Fira Sans", "sans-serif"],
      },
    },
    plugins: [],
  },
};
