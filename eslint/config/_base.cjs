const baseRules = require('./rules/_base.cjs');

const base = {
    plugins: ['import', 'security', 'prettier'],
    extends: [
        'eslint:recommended',
        'standard',
        'plugin:prettier/recommended',
        'plugin:security/recommended',
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
    },
    env: {
        node: true,
    },
    settings: {
        react: {
            version: '16.8',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.cjs', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        ...baseRules,
    },
};

module.exports = base;
