module.exports = {
  root: true,
  plugins: ['jest'],
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'linebreak-style': 0,
    'prefer-const': 0,
    'no-alert': 0,
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-iterator': 0,
    'no-restricted-syntax': [2, 'WithStatement'],
    'func-style': 0,
    'guard-for-in': 0,
    'no-console': 0,
  },
};
