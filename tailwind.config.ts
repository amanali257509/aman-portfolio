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
        bg: '#0b0f17',
        surface: '#111827',
        text: '#f1f5f9',
        muted: '#94a3b8',
        border: '#1e293b',
        accent: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
        },
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '6px',
        md: '6px',
        lg: '6px',
        xl: '6px',
        '2xl': '6px',
      },
      maxWidth: {
        container: '1275px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}

export default config
