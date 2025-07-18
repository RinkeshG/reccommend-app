/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'lexend': ['Lexend Deca', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'accent': '#3fa7ff',
        'accent-tint': '#3fa7ff1a',
        'surface': '#1a1a1d',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
