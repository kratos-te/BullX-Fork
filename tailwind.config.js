// tailwind.config.js
import { nextui } from "@nextui-org/react";
import { amber, colors, orange } from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stroke: "#232325",
        "tizz-background": "#111114",
        "tizz-background-green": "#041409",
        "prediction-yellow": "#ffa800",
        neutral: {
          950: "#0E0E12",
          900: "#14141A",
          800: "#1E1E27",
          700: "#444444",
          600: "#4E7B52",
          500: "#5C9454",
          400: "#B0C5AD",
        },
        red: {
          400: "#FF6767",
          500: "#EA3A3D",
          600: "#E20F00",
        },
        amber: {
          300: "#FFD166",
        },
        yellow: {
          400: "#FFCC00 ",
        },
        emerald: {
          400: "#47D0A5",
        },
        green: {
          950: "#072B11",
          900: "#0E4A1B",
          850: "#26513A",
          800: "#3C614B",
        },
        stone: {
          50: "#FFFDF7 ",
        },
        orange: {
          500: "#FF7A00",
        },
        "slate-300": "#BCDCDB",
        "gray-800": "#282834",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
