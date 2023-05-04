/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xs": "320px",
        "2xs": "375px",
        xs: "425px",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0C6291",
          secondary: "#B2CEDE",
          accent: "#071108",
          neutral: "#F0E7D8",
          "base-100": "#E8E9ED",
          info: "#D2D0BA",
          success: "#CACF85",
          warning: "#FCB07E",
          error: "#CD8987",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
