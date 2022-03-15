module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    'default-case-last': 'off',
    // eslint-plugin-importのルール。
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      'error',
      {
        alphabetize: { caseInsensitive: true, order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          'index',
          'sibling',
          'parent',
          'object',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'index',
            pattern: 'src/actions/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/components/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/constants',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/containers/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/hooks/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/reducers/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/store/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/styles/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/utils/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'typings/**',
            position: 'before',
          },
          {
            group: 'parent',
            pattern: '../public/**',
            position: 'after',
          },
          {
            group: 'parent',
            pattern: '../../public/**',
            position: 'after',
          },
          {
            group: 'parent',
            pattern: '../../../public/**',
            position: 'after',
          },
          {
            group: 'parent',
            pattern: '../../../../public/**',
            position: 'after',
          },
          {
            group: 'parent',
            pattern: '../../../../../public/**',
            position: 'after',
          },
        ],
      },
    ],
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'sort-vars': ['error', { ignoreCase: true }],
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
  overrides: [
    // Next.js needs default exports for pages and API points
    {
      files: [
        '*/pages/*',
        '*/pages/api/*',
        '*/pages/api/*/*',
        '*/pages/api/*/*/*',
      ],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
    {
      files: ['*/components/*/*/hooks.test.ts'],
      rules: {
        'no-global-assign': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/await-thenable': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      typescript: {
        alwaysTryTypes: true,
        config: 'tsconfig.json',
      },
    },
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
}
