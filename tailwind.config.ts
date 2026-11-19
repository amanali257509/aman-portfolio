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
        canvas: '#0f1410',
        surface: {
          DEFAULT: '#171e18',
          hover: '#1d261e',
        },
        line: '#28332a',
        ink: '#efeadc',
        muted: '#98a08f',
        brass: {
          DEFAULT: '#c9a24d',
          hover: '#d8b45e',
        },
        sage: '#8fae78',
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '8px',
        md: '8px',
        lg: '8px',
        xl: '8px',
        '2xl': '8px',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '6xl': '72rem', // 1152px
      },
    },
  },
  plugins: [],
}

export default config
