// const { ERROR } = require('../constants/severity.cjs');

const overrides = [
    {
        files: ['**/*.astro'],
        parser: 'astro-eslint-parser',
    },
    {
        files: ['**/*.mdx'],
        extends: ['plugin:astro/recommended'],
        parser: 'eslint-mdx',
        parserOptions: {
            extraFileExtensions: ['astro', 'mdx'],
        },
        rules: {
            // X 'astro/no-conflict-set-directives': ERROR,
            // X 'astro/no-unused-define-vars-in-style': ERROR,
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
