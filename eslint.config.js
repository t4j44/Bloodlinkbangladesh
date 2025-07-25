import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "eslint.config.js", "vite.config.ts"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReactConfig,
    files: ["**/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReactConfig.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];