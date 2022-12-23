const { OFF } = require('../constants/severity.cjs');

const overrides = [
    {
        files: ['**/scripts/**/*.js'],
        rules: {
            'global-require': OFF,
            'import/no-dynamic-require': OFF,
            'import/no-extraneous-dependencies': OFF,
            'security/detect-non-literal-fs-filename': OFF,
            'security/detect-non-literal-require': OFF,
            'security/detect-child-process': OFF,
        },
    },
];

module.exports = overrides;
