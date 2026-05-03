export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        mono: ["DM Mono", "monospace"],
      },
      colors: {
        ink: "#0D0D0D",
        cream: "#F5F0E8",
        warm: "#E8E0D0",
        gold: "#B8976A",
        gold2: "#D4B483",
        studioText: "#2A2A2A",
        mutedStudio: "#888078",
      },
      boxShadow: {
        gold: "0 20px 80px rgba(184,151,106,.18)",
      }
    },
  },
  plugins: [],
};
