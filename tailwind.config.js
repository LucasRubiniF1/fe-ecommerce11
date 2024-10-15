/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        blue: '#377DFF',
        green: '#38CB89',
        yellow: '#FFAB00',
        red: '#FF5630',
        neutral: {
          1: '#141718',
          2: '#232627',
          3: '#343839',
          4: '#6C7275',
          5: '#E8ECEF',
          6: '#F3F5F7',
          7: '#FEFEFE',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        hairline: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontSize: {
        hero: ['4rem', { lineHeight: '1.2' }],
        h1: ['3rem', { lineHeight: '1.2' }],
        h2: ['2.5rem', { lineHeight: '1.3' }],
        h3: ['2rem', { lineHeight: '1.4' }],
        h4: ['1.5rem', { lineHeight: '1.4' }],
        h5: ['1.25rem', { lineHeight: '1.5' }],
        h6: ['1rem', { lineHeight: '1.5' }],
        h7: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
      },
    },
  },
  plugins: [],
};
