module.exports = {
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  // Fine tune rules
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^React',
      },
    ],
  },
  // rules: {
  //   '@typescript-eslint/no-var-requires': 0,
  //   'react/display-name': "error",
  //   'react/jsx-key': "error",
  //   'react/jsx-no-comment-textnodes': "error",
  //   'react/jsx-no-duplicate-props': "error",
  //   'react/jsx-no-target-blank': "error",
  //   'react/jsx-no-undef': "error",
  //   'react/jsx-uses-react': "error",
  //   'react/jsx-uses-vars': "error",
  //   'react/no-children-prop': "error",
  //   'react/no-danger-with-children': "error",
  //   'react/no-deprecated': "error",
  //   'react/no-direct-mutation-state': "error",
  //   'react/no-find-dom-node': "error",
  //   'react/no-is-mounted': "error",
  //   'react/no-render-return-value': "error",
  //   'react/no-string-refs': "error",
  //   'react/no-unescaped-entities': "error",
  //   'react/no-unknown-property': "error",
  //   'react/prop-types': 0,
  //   'react/react-in-jsx-scope': "error",
  //   'react/require-render-return': "error"
  // },
}
