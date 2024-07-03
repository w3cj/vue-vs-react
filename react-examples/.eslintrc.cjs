/** @type { import("eslint").Linter.Config } */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'prefer-template': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/no-redeclare': 0,
    'react/self-closing-comp': 0,
    'import/no-named-as-default': 0,
    'import/no-cycle': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'import/prefer-default-export': 0,
    'no-promise-executor-return': 0,
    'no-nested-ternary': 0,
  },
};
