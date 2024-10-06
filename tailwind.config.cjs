/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}', 
  ],
  theme: {
    extend: {
      colors: {
        fetchorange: '#faa819', 
        fetchpurple: '#62185c', 
        milktea: '#F9F7F2', 
      },
    },
  },
  plugins: [],
};
