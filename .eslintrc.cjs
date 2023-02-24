module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.check.json",
    tsconfigRootDir: __dirname,
    jsx: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
  },
  ignorePatterns: [
    "dist/**",
    "types/**",
    "node_modules/**",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
  ],
};
