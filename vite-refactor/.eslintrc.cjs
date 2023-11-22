module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: false,
      },
    ]
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.ts', '**/*.test.jsx', '**/*.test.tsx'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    }
  ],
  settings: {
    react: {
      version: 'detect'
    },
    jest: {
      version: require('jest/package.json').version
    }
  },
}
