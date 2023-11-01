module.exports = {
  extends: ["react-app", "react-app/jest"],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    chrome: "writable",
  },
  settings: {
    "eslint.validate": ["javascript", "javascriptreact", "chrome"],
  },
  // Add other custom ESLint rules or configuration as needed
};
