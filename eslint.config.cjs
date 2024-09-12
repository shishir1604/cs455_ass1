// eslint.config.js
const js = require("@eslint/js");

module.exports = {
  files: ["js/game.js", "index.html"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: {
    "@eslint/js": js,
    "html": require('eslint-plugin-html')
  },
  rules: { 
    "no-unused-vars": ["warn"],
    "semi": ["error", "always"],
    "eqeqeq": ["error"],
    "quotes": ["error", "single"],
    "curly": ["error"],
    "no-console": ["warn"],
    "no-debugger": ["error"],
    "comma-dangle": ["error", "never"],
    "max-len": ["warn", { "code": 80 }],
    "object-curly-spacing": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "camelcase": ["error"],
    "no-implicit-coercion": ["warn"],
    "no-var": ["error"],
    "prefer-template": ["error"],
    "complexity": ["warn", { "max": 10 }]
  },
};
