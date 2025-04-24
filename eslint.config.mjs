import path from "node:path"
import { fileURLToPath } from "node:url"

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"

import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

import _import from "eslint-plugin-import"
import jsxA11Y from "eslint-plugin-jsx-a11y"
import prettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import sonarjs from "eslint-plugin-sonarjs"
import unusedImports from "eslint-plugin-unused-imports"
import globals from "globals"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      "node_modules",
      "node_modules/*",
      "node_modules/**/*",
      "*.config.*",
      "build",
      "dist",
      "public",
      "out",
      ".husky",
      ".next",
      ".next/*",
      ".next/**/*",
      ".vercel",
      ".cache",
      ".vscode",
      ".idea",
      "yarn.lock",
      "package.json",
      "package-lock.json",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "plugin:prettier/recommended"
    )
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      sonarjs,
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2024,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: ["./tsconfig.json"],
      },
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/resolver": {
        typescript: {},

        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    rules: {
      "prettier/prettier": [
        "error",
        {
          bracketSpacing: true,
          semi: false,
          singleQuote: false,
          singleAttributePerLine: true,
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          trailingComma: "es5",
        },
      ],

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^(react/(.*)$)|^(react$)", "^(next/(.*)$)|^(next$)", "<THIRD_PARTY_MODULES>", "^[a-z]", "^@"],
            ["^.+\\.type$"],
            [
              "^@/assets",
              "^@/atoms",
              "^@/components",
              "^@/config",
              "^@/constants",
              "^@/context",
              "^@/data",
              "^@/errors",
              "^@/events",
              "^@/hooks",
              "^@/interface",
              "^@/lib",
              "^@/models",
              "^@/plugins",
              "^@/providers",
              "^@/server",
              "^@/services",
              "^@/styles",
              "^@/types",
              "^@/ui",
              "^@/utils",
              "^@/views",
              "^@/web3",
            ],
            ["^~", "^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
            ["^.+\\.(png|svg|jpg|jpeg|gif|webp|mp4|mp3|wav|ogg|ico|bmp|tiff)$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",

      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^React$",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
        {
          selector: "property",
          format: ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
        },
        {
          selector: "method",
          format: ["camelCase", "PascalCase"],
        },
      ],

      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      "func-style": [
        "error",
        "declaration",
        {
          allowArrowFunctions: true,
        },
      ],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],

      "sonarjs/cognitive-complexity": ["warn", 15],
      "sonarjs/no-duplicate-string": "warn",
      "import/order": "off",

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],

      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "brace-style": "off",
      semi: "off",
      quotes: "off",
      trailingComma: "off",
      "comma-dangle": "off",
      "arrow-spacing": "off",
    },
  },
]
