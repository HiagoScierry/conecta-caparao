import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'azul-claro': '#0096E1',
        'rosa-suave': '#F09BBE',
        'branco': '#FFFFFF',
        'verde-floresta': '#2A7C4F',
        'cinza-rochoso': '#4A4A4A',
        'bege-areia': '#F5E8C8',
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
