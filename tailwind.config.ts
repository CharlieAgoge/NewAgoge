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
        // DevSecAI Brand Colors
        devsecai: {
          dark: '#11151C',
          DEFAULT: '#1a1f2e',
          light: '#252b3d',
        },
        accent: {
          teal: '#3EBBB7',
          lime: '#41DC7A',
          cyan: '#00D4FF',
        },
        card: {
          DEFAULT: '#1e2433',
          hover: '#252b3d',
        },
        border: {
          DEFAULT: '#2d3548',
          light: '#3d4558',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3EBBB7 0%, #41DC7A 100%)',
        'gradient-dark': 'linear-gradient(180deg, #11151C 0%, #1a1f2e 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(62, 187, 183, 0.1) 0%, rgba(65, 220, 122, 0.05) 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(62, 187, 183, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(62, 187, 183, 0.3)',
        'glow-lime': '0 0 20px rgba(65, 220, 122, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(62, 187, 183, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(62, 187, 183, 0.4)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
