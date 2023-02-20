// const { ERROR } = require('../constants/severity.cjs');

const { OFF } = require('../constants/severity.cjs');
const overrides = [
    {
        files: ['**/*.astro'],
        parser: 'astro-eslint-parser',
        parserOptions: {
            parser: '@typescript-eslint/parser',
            extraFileExtensions: ['.astro'],
        },
    },
    {
        files: ['**/*.mdx'],
        extends: ['plugin:astro/recommended'],
        parser: 'eslint-mdx',
        parserOptions: {
            extraFileExtensions: ['astro', 'mdx'],
        },
        globals: {
            Abstract: false,
            Audio: false,
            Code: false,
            Hero: false,
            Image: false,
            Note: false,
            Todo: false,
            Iframe: false,
            Picture: false,
            Year: false,
        },
        rules: {
            // X 'astro/no-conflict-set-directives': ERROR,
            // X 'astro/no-unused-define-vars-in-style': ERROR,
            'react/jsx-indent-props': [OFF],
            'react/jsx-no-undef': [OFF],
        },
    },
    {
        files: ['**/*.astro/*.js', '*.astro/*.js'],
        rules: {
            // X 'no-unused-vars': ERROR
        },
    },
];

module.exports = overrides;
