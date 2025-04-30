/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content:  [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '540px',
      'sm': '640px',
      'md': '850px',
      'lg': '1000px',
      'xl': '1200px',
      '2xl': '1400px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [plugin(({ addUtilities }:any) => {
    addUtilities({
      ".x-center": { left: "50%", transform: "translateX(-50%)" },
      ".y-center": { top: "50%", transform: "translateY(-50%)" },
      ".xy-center": {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      },
    });
  })],
}

