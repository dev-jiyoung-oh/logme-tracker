const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const reactPlugin = require('eslint-plugin-react');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');

// FlatCompat에 추천 설정을 넘겨줌
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

module.exports = [
  {
    ignores: [ // 검사 제외 대상
      'backend/**',        // 백엔드 소스 전부
      'docs/**',           // 문서
      'DB_SCHEMA.md',      // 스키마 문서
      '**/*.png',          // 이미지
      '**/*.config.cjs',   // 설정 파일
      '.prettierrc.js',    // 프리티어 설정
      'vite.config.ts'     // Vite 설정
    ]
  },

  js.configs.recommended, // ESLint 기본 추천 규칙
  ...compat.extends('plugin:react/recommended'), // React 추천 규칙
  ...compat.extends('plugin:react/jsx-runtime'), // React 자동 런타임 지원
  ...compat.extends('plugin:@typescript-eslint/recommended'), // TypeScript 추천 규칙
  ...compat.extends('plugin:prettier/recommended'), // Prettier 연동

  // 코드 파일별 파서·플러그인·커스텀 룰
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        jsxRuntime: 'automatic'   // React 17+ 자동 런타임 설정
      },
      env: {
        browser: true,
        es2021: true,
        node: true // Node 전역 변수 (require, module 등) 허용
      }
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin
    },
    settings: {
      react: { version: 'detect' } // React 버전 자동 감지
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off', // React import 없이 JSX 사용 허용
      'semi': ['error', 'always'], // 세미콜론 강제
    }
  }
];
