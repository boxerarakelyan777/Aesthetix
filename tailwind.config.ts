import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'midnight-black': '#121212',
        'soft-white': '#F5F5F5',
        'electric-cyan': '#00FFFF',
        'royal-purple': '#7B2CBF',
        'royal-purple-dark': '#5A1E8C', // This is a darker shade of royal purple
        'vibrant-coral': '#FF6B6B',
        'slate-gray': '#2E2E2E',
      },
      boxShadow: {
        'glow': '0 0 10px rgba(0, 255, 255, 0.3)',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
      scale: ['hover', 'group-hover'],
    },
  },
  plugins: [],
};
export default config;
