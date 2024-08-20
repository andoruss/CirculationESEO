/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        elevated: "var(--color-elevated)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
      },
      fontFamily: {
        'poppins' : ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

