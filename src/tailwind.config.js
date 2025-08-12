/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blushPink: '#FADADD',
        ivoryCream: '#FFF8F0',
        dustyRose: '#D9A5B3',
        sageGreen: '#B7C7A3',
        champagneBeige: '#EBD9C4',
        lavenderGray: '#C7C3D9',
        skyBlue: '#A3CFF1', // Soft sky blue accent color
      },
      boxShadow: {
        // Soft drop shadows for glued-on photo effect
        'photo-glue': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'photo-glue-md': '0 8px 10px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        handwritten: ['Pacifico', 'cursive'],
        body: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // subtle paper-like texture - you can add your texture image or CSS pattern here
        'paper-texture': "url('/textures/paper-texture.png')",
      },
      borderRadius: {
        // Scrapbook style rounded corners or cutout shapes
        sm: '0.375rem',  // 6px, for sticker/cutout style
        md: '0.75rem',   // 12px for bigger rounded edges
      },
      spacing: {
        // Custom spacing scale if needed for scrapbook blocks
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

