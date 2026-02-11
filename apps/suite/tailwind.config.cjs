/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "andysd-bg": "#020617",
        "andysd-bg-soft": "#0f172a",
        "andysd-primary": "#22d3ee",
        "andysd-primary-soft": "#0ea5e9",
        "andysd-accent": "#7c3aed",
        "andysd-accent-hot": "#ec4899"
      }
    }
  },
  plugins: []
};

// apps/suite/tailwind.config.cjs

const designPreset = require("../../packages/design/tailwind-preset.cjs").default;

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [designPreset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/**/*.{ts,tsx}",
  ],
};
