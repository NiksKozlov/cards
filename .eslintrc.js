module.exports = {
  extends: 'eslint-config-it-incubator',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
}
