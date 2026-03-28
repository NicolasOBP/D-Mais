// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const importPlugin = require("eslint-plugin-import");

module.exports = defineConfig([
  expoConfig,
  importPlugin.flatConfigs.recommended,
  {
    ignores: ["dist/*"],
    settings: { react: { version: "19.1.0" } },
  },
  {
    settings: { react: { version: "19.1.0" } },
    files: ["**/*.{ts,tsx}"],

    rules: {
      "import/order": [
        "error",
        {
          groups: ["external", "builtin", "internal", "parent", "sibling"],
          pathGroups: [
            {
              pattern: "{react+(|-native),expo*}",
              group: "external",
              position: "before",
            },
            {
              pattern:
                "@+(routes|screens|components|containers|hooks|theme|shopify*)",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/src/components/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "./",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react+(|-native)", "expo*"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      "react-native/no-inline-styles": "off",
    },
  },
]);
