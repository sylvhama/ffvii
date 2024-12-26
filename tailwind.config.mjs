const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        realWhite: "#ffffff",
        white: "#f8f8f2",
        black: "#1d1e26",
        purple: "#7357ff",
        pink: "#ff80bf",
        blue: "#80ffea",
        current: "currentColor",
      },
      fontFamily: {
        mono: ['"Lucida Console"', "Courier", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
