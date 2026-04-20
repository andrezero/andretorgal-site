import chroma from 'chroma-js';

const EXCLUDE_TYPES = ['typography'];
const EXCLUDE_TOKENS = ['--padding', '--type-size'];

function getColorValue(value) {
    return chroma(value).css('oklch');
}

function getVarValue(value) {
    if (value.$type === 'color') {
        return getColorValue(value.$value);
    }

    if (value.$type === 'fontSizes' || value.$type === 'sizing') {
        if (!value.$value.endsWith('%')) {
            return `${value.$value}px`;
        }
    }
    return value.$value;
}

export function generateCssVarsFromTokens(tokens) {
    const vars = [];

    function traverse(node, path = '') {
        for (const [key, value] of Object.entries(node)) {
            const newPath = path ? `${path}.${key}` : key;

            const varName = `--${newPath
                .replace(/global\./i, '')
                .replace(/\./g, '-')
                .toLowerCase()}`;

            if (value && typeof value === 'object' && '$value' in value) {
                if (EXCLUDE_TYPES.includes(value.$type)) {
                    continue;
                }

                if (EXCLUDE_TOKENS.find(e => varName.startsWith(e))) {
                    continue;
                }

                const varValue = getVarValue(value);

                vars.push(`${varName}: ${varValue};`);
            } else if (typeof value === 'object') {
                traverse(value, newPath);
            }
        }
    }

    traverse(tokens);
    return vars;
}
