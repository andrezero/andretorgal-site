const { ERROR, OFF } = require('../constants/severity.cjs');

const importOrderRules = require('./rules/_import-order.cjs');
const typescriptRules = require('./rules/typescript.cjs');
const reactRules = require('./rules/react.cjs');
const mdxRules = require('./rules/mdx-airbnb.cjs');

const overrides = [
    {
        files: ['**/*.mdx'],
        plugins: ['@typescript-eslint', 'react', 'mdx'],
        extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
            'plugin:mdx/recommended',
        ],
        parser: 'eslint-mdx',
        parserOptions: {
            extraFileExtensions: ['mdx'],
        },
        rules: {
            ...importOrderRules,
            ...typescriptRules,
            ...reactRules,
            ...mdxRules,
            // modules
            'react/jsx-filename-extension': [ERROR, { extensions: ['.mdx'] }],
            'react/jsx-indent-props': [OFF],
        },
    },
];

module.exports = overrides;
