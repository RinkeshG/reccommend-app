/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
    },
  },
  plugins: [],
}
