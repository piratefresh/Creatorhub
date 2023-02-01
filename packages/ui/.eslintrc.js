module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
};
