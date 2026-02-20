import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#0A0A0A',
        foreground: '#FFFFFF',
        muted: '#888888',
        'muted-light': '#AAAAAA',
        card: '#1A1A1A',
        'card-hover': '#1E1E1E',
        border: '#2A2A2A',
        accent: '#FFFFFF',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      letterSpacing: {
        'widest': '0.15em',
      },
    },
  },
  plugins: [],
}
export default config
