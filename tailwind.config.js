/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // These classes are dynamically generated in the app
    {
      pattern: /bg-(blue|indigo|green|red|yellow|purple|teal|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(blue|indigo|green|red|yellow|purple|teal|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(blue|indigo|green|red|yellow|purple|teal|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
}
