const base = require('./config/_base.cjs');
const typescript = require('./config/typescript.cjs');
const astro = require('./config/astro.cjs');
const react = require('./config/react.cjs');
const mdx = require('./config/mdx.cjs');
const configs = require('./config/configs.cjs');
const scripts = require('./config/scripts.cjs');
const tests = require('./config/tests.cjs');

const config = {
    ...base,
    ignorePatterns: ['node_modules/', 'coverage/', 'dist/'],
    overrides: [...typescript, ...astro, ...react, ...mdx, ...configs, ...scripts, ...tests],
};

module.exports = config;
