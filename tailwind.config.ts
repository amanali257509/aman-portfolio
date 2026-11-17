import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
          border: 'var(--card-border)',
        },
        navy: {
          950: '#060A14',
          900: '#0B1224',
          850: '#0F182F',
          800: '#141F3D',
          700: '#1C2B54',
          600: '#263B73',
        },
        gold: {
          DEFAULT: '#F5B74D',
          400: '#FCD37A',
          500: '#F5B74D',
          600: '#D97706',
          700: '#B45309',
          glow: 'rgba(245, 183, 77, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow-line': 'flowLine 3s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        flowLine: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
