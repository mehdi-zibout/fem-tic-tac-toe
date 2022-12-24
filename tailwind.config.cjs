/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "650px",
      desktop: "950px",
    },
    fontFamily: { sans: ["Outfit", "sans-serif"] },
    fontSize: {
      hl: ["40px", { fontWeight: 700, letterSpacing: "2.5px" }],
      hm: ["24px", { fontWeight: 700, letterSpacing: "1.5px" }],
      hs: ["20px", { fontWeight: 700, letterSpacing: "1.25px" }],
      hxs: ["16px", { fontWeight: 700, letterSpacing: "1px" }],
      body: ["14px", { fontWeight: 500, letterSpacing: "0.8px" }],
    },
    colors: {
      lightBlue: "#31C3BD",
      lightBlueHover: "#65E9E4",
      lightYellow: "#F2B137",
      lightYellowHover: "#FFC860",
      darkNavy: "#1A2A33",
      semiDarkNavy: "#1F3641",
      silver: "#A8BFC9",
      silverHover: "#DBE8ED",
    },
    extend: {},
  },
  plugins: [],
};
