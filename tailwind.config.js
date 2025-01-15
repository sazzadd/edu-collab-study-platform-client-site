/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"], // For body text
        heading: ["Poppins", "sans-serif"], // For headings
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}