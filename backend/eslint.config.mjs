export default [
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs", 
    },
    rules: {
      "no-unused-vars": "warn", 
      "semi": ["error", "always"], 
      "no-console": "warn", 
      "eqeqeq": "error", 
      "curly": "error", 
    },
  },
];