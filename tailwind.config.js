const { faVectorSquare } = require("@fortawesome/free-solid-svg-icons");
const { url } = require("inspector");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    fontFamily: {
      sans: ["IRANSansX"],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
