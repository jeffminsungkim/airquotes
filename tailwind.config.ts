import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "#0A0A0A",
      },
    },
  },
  plugins: [],
} satisfies Config;
