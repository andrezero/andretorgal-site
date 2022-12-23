const importOrderRules = require('./rules/_import-order.cjs');
const typescriptRules = require('./rules/typescript.cjs');

const overrides = [
    {
        files: ['**/*.{ts,tsx}'],
        plugins: ['@typescript-eslint'],
        extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: './tsconfig.json',
            ecmaFeatures: {
                jsx: true,
            },
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        rules: {
            ...importOrderRules,
            ...typescriptRules,
        },
    },
];

module.exports = overrides;
