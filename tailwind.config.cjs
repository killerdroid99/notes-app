/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#222",
        accent: "#00cecb",
      },
      fontFamily: {
        qc: "'Quicksand', sans-serif",
      },
      fontSize: {
        xxs: ["clamp(0.76rem, calc(0.76rem + 0.02vw), 0.77rem)"],
        xs: ["clamp(0.91rem, calc(0.89rem + 0.10vw), 0.96rem)"],
        sm: ["clamp(1.09rem, calc(1.05rem + 0.21vw), 1.20rem)"],
        base: ["clamp(1.31rem, calc(1.24rem + 0.37vw), 1.50rem)"],
        md: ["clamp(1.58rem, calc(1.46rem + 0.59vw), 1.88rem)"],
        lg: ["clamp(1.89rem, calc(1.71rem + 0.89vw), 2.34rem)"],
        xl: ["clamp(2.27rem, calc(2.01rem + 1.29vw), 2.93rem)"],
        "2xl": ["clamp(2.72rem, calc(2.36rem + 1.83vw), 3.66rem)"],
        "3xl": ["clamp(3.27rem, calc(2.75rem + 2.56vw), 4.58rem)"],
      },
    },
  },
  plugins: [],
}
