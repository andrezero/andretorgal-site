const { ERROR, OFF } = require('../constants/severity.cjs');

const reactRules = require('./rules/react.cjs');

const overrides = [
    {
        files: ['**/*.tsx'],
        plugins: ['react', 'react-hooks', 'jsx-a11y'],
        extends: [
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
            'plugin:jsx-a11y/recommended',
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: './tsconfig.json',
            ecmaFeatures: {
                jsx: true,
            },
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        env: {
            browser: true,
        },
        rules: {
            ...reactRules,
            // because we are using preact
            'react/react-in-jsx-scope': [OFF],
            'jsx-a11y/iframe-has-title': [OFF],
            // modules
            'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx'] }],
            'react/jsx-indent-props': [OFF],
        },
    },
];

module.exports = overrides;
