const { ERROR, OFF } = require('../../constants/severity.cjs');

const rules = {
    // modules
    'import/prefer-default-export': OFF,
    // format
    'prettier/prettier': ERROR,
    'max-len': [
        ERROR,
        {
            tabWidth: 4,
            code: 100,
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        },
    ],
    // security
    'no-console': [ERROR, { allow: ['info', 'warn', 'error'] }],
    // X 'security/detect-object-injection': OFF,
    // X 'security/detect-possible-timing-attacks': OFF,
};

module.exports = rules;
