const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        realWhite: "#ffffff",
        realBlack: "#000000",
        white: "#f8f8f2",
        black: "#1d1e26",
        purple: "#7357ff",
        pink: "#ff80bf",
        blue: "#80ffea",
        cyan: "#20B2AA",
        ff7Pink: "#ffaaaa",
      },
      fontFamily: {
        mono: ['"Lucida Console"', "Courier", ...defaultTheme.fontFamily.mono],
      },
      screens: {
        xs: "440px",
        sm: "550px",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("ff7", [".ff7 & ", "&.ff7"]);
      addVariant("starting", "@starting-style");
    }),
  ],
  darkMode: "class",
};
