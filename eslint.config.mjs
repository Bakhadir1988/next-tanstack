// eslint.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: ['.next/**', 'dist/**', 'build/**'],
  },
  ...compat.extends('next/core-web-vitals'),
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Сортировка импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // встроенные модули Node.js
            'external', // сторонние пакеты (react, lodash и т.д.)
            'internal', // алиасы и внутренние пути (@/, shared/, features/ и т.д.)
            'parent', // ../
            'sibling', // ./same-dir
            'index', // ./index
            'object', // require(...)
            'type', // type-only импорты
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
            {
              pattern: 'shared/**',
              group: 'internal',
            },
            {
              pattern: 'entities/**',
              group: 'internal',
            },
            {
              pattern: 'features/**',
              group: 'internal',
            },
            {
              pattern: 'widgets/**',
              group: 'internal',
            },
            {
              pattern: 'app/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: true,
      },
    },
  },
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  eslintConfigPrettier,
);
