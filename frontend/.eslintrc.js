module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "@typescript-eslint", "simple-import-sort"],
  settings: {
    react: {
      version: "16.13.1",
    },
  },   
  rules: {
    "no-empty": "off",
    "no-console": [
      "warn",
      {
        allow: ["error", "info", "warn"],
      },
    ],
    "no-param-reassign": "warn",
    "prefer-const": "warn",
    "sort-imports": "off", // we use the simple-import-sort plugin instead
    "spaced-comment": [
      "warn",
      "always",
      { line: { markers: ["/ <reference"] } },
    ],
    "simple-import-sort/imports": "warn",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unused-vars": 0,
  },
  overrides: [
    {
      files: "**/*.js",
      rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ],
};
