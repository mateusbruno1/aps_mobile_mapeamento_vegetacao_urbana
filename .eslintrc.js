module.exports = {
  env: {
    es6: true,
    jest: true,
    browser: true,
  },
  extends: [
    'airbnb',
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', 'error', {endOfLine: 'auto'}],
    'react/jsx-filename-extension': [
      2,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    'object-shorthand': 'off',
    'no-prototype-builtins': 'warn',
    'no-useless-return': 'off',
    'react/require-default-props': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/prop-types': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'react/default-props-match-prop-types': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/self-closing-comp': 'warn',
    'no-shadow': 'warn',
    'consistent-return': 'warn',
    'import/extensions': 'off',
    'import/no-unresolved': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'warn',
    'import/order': 'off',
    'import/newline-after-import': 'off',
    'no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'no-console': ['warn', {allow: ['tron']}],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/class-name-casing': 'warn',
    '@typescript-eslint/camelcase': 'warn',
    '@typescript-eslint/ban-types': 'warn',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    },
  },
};
