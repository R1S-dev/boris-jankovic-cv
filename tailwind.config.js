/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentSoft: "rgb(var(--accentSoft) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 12px 45px rgba(0,0,0,.30)",
        glow: "0 0 26px rgb(var(--accent) / .14)",
      },
      borderRadius: { xl2: "20px" },
      fontFamily: {
        sans: ["Inter","ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Helvetica","Arial"],
        mono: ["JetBrains Mono","ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","monospace"],
      }
    },
  },
  plugins: [],
}
