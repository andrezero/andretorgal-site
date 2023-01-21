const { ERROR, OFF } = require('../../constants/severity.cjs');

const rules = {
    // modules
    'import/no-extraneous-dependencies': ERROR,
    'import/prefer-default-export': OFF,
    'import/extensions': OFF,
    // typescript
    'no-useless-constructor': OFF,
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': ERROR,
    '@typescript-eslint/explicit-module-boundary-types': ERROR,
    '@typescript-eslint/no-non-null-assertion': ERROR,
};

module.exports = rules;
