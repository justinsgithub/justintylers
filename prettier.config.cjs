/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
    trailingComma: 'none',
    tabWidth: 4,
    semi: false,
    singleQuote: true
};
