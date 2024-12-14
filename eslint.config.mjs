import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,ts}"] },
  { ignores: ["*/node_modules', '.gi'", "dist", "eslint.config.mjs"] },
  {
    rules: {
      semi: ["error", "always"], // requires the semicolon
      quotes: ["error", "single"], // requires single quotes
      "no-console": ["warn"], // notice if there is `console.log`
      eqeqeq: ["error", "always"], // require use the `===` instead of `==`
      "no-unused-vars": ["warn"], // warning about unused variables
    },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
