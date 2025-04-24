import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#F9EFE5",
        },
        whites: {
          wallet_modal_background: "#F8F9FB",
        },
        dark: {
          0: "#1E2224",
          1: "#16181A",
          2: "#181B1D",
          3: "#101213",
          4: "#222629",
          5: "#1F2224",
          6: "#353333",
        },
        light: {
          0: "#FFFFFF",
          1: "#FBFBFB",
          2: "#F6F6F6",
          3: "#F0EDF4",
        },
        texts: {
          0: "#EFEFEF",
          1: "#E6E6E6",
          2: "#D0D0D0",
          3: "#909090",
          4: "#4A4A4A",
          5: "#BFBFBF",
          6: "#7D7D7D",
          7: "#9C9C9C",
        },
        customGray: {
          0: "#2C3235",
          1: "#808080",
          2: "#1D1D1D",
          3: "#BCBBBC",
          4: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
}
export default config
