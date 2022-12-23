const { ERROR } = require('../../constants/severity.cjs');

const rules = {
    'import/order': [
        ERROR,
        {
            alphabetize: {
                order: 'asc',
            },
            'newlines-between': 'always',
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object'],
        },
    ],
    // https://eslint.org/docs/rules/sort-imports
    'sort-imports': [
        'error',
        {
            ignoreDeclarationSort: true,
            allowSeparatedGroups: true,
        },
    ],
};

module.exports = rules;
