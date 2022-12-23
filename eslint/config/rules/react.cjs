const { ERROR, OFF } = require('../../constants/severity.cjs');

const rules = {
    'react/jsx-indent': [ERROR, 4],
    'react/jsx-indent-props': [ERROR, 4],
    'react/prop-types': OFF,
    'react/jsx-props-no-spreading': OFF,
};

module.exports = rules;
