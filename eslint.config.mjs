import globals from "globals";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginQuery from "@tanstack/eslint-plugin-query";
import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import checkFile from "eslint-plugin-check-file";

const nextFileConvention = [
  "default",
  "error",
  "global-error",
  "forbidden",
  "instrumentation",
  "layout",
  "loading",
  "mdx-components",
  "proxy",
  "not-found",
  "page",
  "route",
  "template",
  "unauthorized",
  "robots",
  "sitemap",
  "manifest",
];

const excludedNextFiles = [
  ...nextFileConvention.map((name) => `src/**/${name}.{ts,tsx}`),
  "src/graphql/generated.ts",
];

const config = [
  {
    ignores: [
      "node_modules/*",
      "src/app/favicon.ico",
      "src/styles/*.css",
      ".next/*",
      "dist/*",
      "src/api/generated/*",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^node:"],
            ["^next/(.*)$", "^next$"],
            ["^react$", "^react/(.*)$", "^react-dom$"],
            ["^@?\\w"],
            [
              "^@/components",
              "^@/hooks",
              "^@/lib",
              "^@/store",
              "^@/config",
              "^@/types",
            ],
            ["^@/api", "^@/services"],
            ["^@/public"],
            ["^\\..*\\.(js|ts|tsx|jsx)?$", "^\\./"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "import/no-default-export": "error",
    },
  },
  {
    files: excludedNextFiles,
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    files: ["src/**/*"],

    plugins: {
      "check-file": checkFile,
    },

    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],

      "check-file/folder-naming-convention": [
        "error",
        {
          "!(src/app)/**/*": "KEBAB_CASE",
          "!(**/__tests__)/**/*": "KEBAB_CASE",
        },
      ],
    },
  },
];

export default config;
