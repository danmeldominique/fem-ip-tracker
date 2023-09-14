import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        VeryDarkGray: 'hsl(0, 0%, 17%)',
        DarkGray: 'hsl(0, 0%, 59%)',
      },
      fontFamily: {
        'sans': ['Rubik', 'sans-serif'],
      },
      backgroundImage:{
        'desktop': 'url(public/static/pattern-bg-desktop.png)',
        'mobile': 'url(public/static/pattern-bg-mobile.png)',
      }
    },
  },
  plugins: [],
} satisfies Config

