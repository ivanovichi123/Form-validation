import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier"; // Import the prettier configuration

export default defineConfig([
  {
    files: ["./src/index.js"],
    // No need for 'plugins' entry for 'js' when using js.configs.recommended
    extends: [
      js.configs.recommended, // Correctly reference the recommended JS config
      prettierConfig, // Include the imported prettier configuration
    ],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);
