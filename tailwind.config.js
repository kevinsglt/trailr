/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Background
        background: "#050505",
        "background-elevated": "#0a0a0a",

        // Glass effect
        glass: "rgba(255, 255, 255, 0.06)",
        "glass-border": "rgba(255, 255, 255, 0.08)",

        // Accent - Violet
        violet: {
          DEFAULT: "#7c3aed",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },

        // Text
        "text-primary": "#ffffff",
        "text-secondary": "rgba(255, 255, 255, 0.7)",
        "text-muted": "rgba(255, 255, 255, 0.4)",

        // Border
        border: "rgba(255, 255, 255, 0.1)",

        // Status
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
        like: "#ef4444",
      },
      fontFamily: {
        montserrat: ["Montserrat_400Regular"],
        "montserrat-medium": ["Montserrat_500Medium"],
        "montserrat-semibold": ["Montserrat_600SemiBold"],
        "montserrat-bold": ["Montserrat_700Bold"],
        "montserrat-extrabold": ["Montserrat_800ExtraBold"],
        "montserrat-black": ["Montserrat_900Black"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
