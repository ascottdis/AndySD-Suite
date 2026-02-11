/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "hsl(var(--accent))",
        slate: {
          950: "hsl(var(--slate-950))"
        }
      }
    }
  },
  plugins: [],
}
