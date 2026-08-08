/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF6EE",
          soft: "#F6EFE3",
        },
        beige: {
          DEFAULT: "#E9DCC9",
          dark: "#D9C7AC",
        },
        "coffee-brown": {
          DEFAULT: "#4B3621",
          light: "#6B4E33",
          dark: "#3A2A19",
        },
        "henna-brown": {
          DEFAULT: "#7A3E1D",
          dark: "#5A2D14",
          light: "#9A5A32",
        },
        "soft-gold": {
          DEFAULT: "#C9A24B",
          light: "#DDBE73",
          dark: "#A8823A",
        },
        dark: {
          DEFAULT: "#2A1D12",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["Inter", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px rgba(75, 54, 33, 0.15)",
        "luxury-lg": "0 20px 45px rgba(75, 54, 33, 0.22)",
        gold: "0 8px 20px rgba(201, 162, 75, 0.35)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};