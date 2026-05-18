/**
 * ESLint 9.x 扁平配置文件
 * 适配 UniApp X + Vue3 + TypeScript/UTS
 */
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import typescriptParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  // 忽略文件
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "unpackage/**",
      ".hbuilderx/**",
      "*.min.js",
      "*.min.css",
    ],
  },

  // JavaScript 推荐配置
  js.configs.recommended,

  // JavaScript 文件配置
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // UniApp X 全局变量
        uni: "readonly",
        plus: "readonly",
        wx: "readonly",
        getApp: "readonly",
        getCurrentPages: "readonly",
        UniApp: "readonly",
        Page: "readonly",
        App: "readonly",
        Component: "readonly",
      },
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "prefer-const": "warn",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-trailing-spaces": "error",
    },
  },

  // TypeScript/UTS 文件配置
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.uts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        uni: "readonly",
        plus: "readonly",
        wx: "readonly",
        getApp: "readonly",
        getCurrentPages: "readonly",
        UniApp: "readonly",
        Page: "readonly",
        App: "readonly",
        Component: "readonly",
      },
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-unused-vars": "off", // 使用 TypeScript 的规则
      "prefer-const": "warn",
      "no-var": "error",
      "no-undef": "off", // TypeScript 会处理
    },
  },

  // Vue 推荐配置
  ...vue.configs["flat/recommended"],

  // Vue/UVUE 文件配置
  {
    files: ["**/*.vue", "**/*.uvue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: typescriptParser,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        uni: "readonly",
        plus: "readonly",
        wx: "readonly",
        getApp: "readonly",
        getCurrentPages: "readonly",
        UniApp: "readonly",
        Page: "readonly",
        App: "readonly",
        Component: "readonly",
        // UniApp X 特有类型
        UTSJSONObject: "readonly",
        UniPointerEvent: "readonly",
        UniEvent: "readonly",
        UniCustomEvent: "readonly",
        // UniApp 生命周期钩子
        onLoad: "readonly",
        onLaunch: "readonly",
        onShow: "readonly",
        onReady: "readonly",
        onHide: "readonly",
        onUnload: "readonly",
        onPullDownRefresh: "readonly",
        onReachBottom: "readonly",
        onShareAppMessage: "readonly",
        onPageScroll: "readonly",
        onTabItemTap: "readonly",
        onResize: "readonly",
        onBackPress: "readonly",
        onNavigationBarButtonTap: "readonly",
        onNavigationBarSearchInputChanged: "readonly",
        onNavigationBarSearchInputConfirmed: "readonly",
        onNavigationBarSearchInputClicked: "readonly",
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "warn",
      "vue/require-default-prop": "off",
      "vue/no-multiple-template-root": "off",
      "no-unreachable": "off",
      // 允许以下划线开头的未使用变量
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Prettier 配置
  prettierConfig,
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // 配置文件特殊规则
  {
    files: [
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "eslint.config.js",
      "eslint.config.mjs",
      ".prettierrc.js",
      "commitlint.config.js",
    ],
    rules: {
      "no-undef": "off",
    },
  },
];
