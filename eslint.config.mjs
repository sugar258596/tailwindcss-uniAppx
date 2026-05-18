import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';

const sharedGlobals = {
  ...globals.browser,
  ...globals.node,
  uni: 'readonly',
  plus: 'readonly',
  getApp: 'readonly',
  getCurrentPages: 'readonly',
};

const sharedTsRules = {
  'no-debugger': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-self-assign': 'error',
  'no-unreachable': 'error',
  'no-unused-vars': 'off',
  'no-undef': 'off',
  'valid-typeof': 'error',
  '@typescript-eslint/no-redeclare': 'error',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
};

export default [
  {
    ignores: ['.git/**', '.hbuilderx/**', 'node_modules/**', 'unpackage/**'],
  },
  {
    files: ['**/*.{js,cjs,mjs,ts,uts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        extraFileExtensions: ['.uts', '.uvue'],
      },
      globals: sharedGlobals,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: sharedTsRules,
  },
  {
    files: ['**/*.uvue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.uts', '.uvue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: sharedGlobals,
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...sharedTsRules,
      'vue/no-dupe-keys': 'error',
      'vue/no-parsing-error': 'error',
      'vue/no-unused-vars': 'warn',
    },
  },
];
