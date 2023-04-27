/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0C6291",
          secondary: "#BAD1CD",
          accent: "#071108",
          neutral: "#F0E7D8",
          "base-100": "#FFFFFF",
          info: "#D2D0BA",
          success: "#566246",
          warning: "#D36135",
          error: "#D9594C",
        },
      }
    ],
  },
  plugins: [require("daisyui")],
};
