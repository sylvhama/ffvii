const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
    }),
  ],
  darkMode: "class",
};
