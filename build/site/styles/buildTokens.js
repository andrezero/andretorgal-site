import fs from 'fs-extra';
import path from 'node:path';

import * as logger from '../../shared/logger.js';
import { generateCssVarsFromTokens } from './generateCssVarsFromTokens.js';
import { getTokensInputPath } from './getTokensInputPath.js';
import { getTokensOutputPath } from './getTokensOutputPath.js';

function renderCSS(vars) {
    return `/* auto-generated */
:root {
    ${vars.join('\n    ')}
}
`;
}

export async function buildTokens(buildConfig) {
    const { paths: PATHS, css } = buildConfig;

    const inputPath = getTokensInputPath(buildConfig);
    const outputPath = getTokensOutputPath(buildConfig);

    logger.busy('Building Tokens');

    await fs.ensureDir(PATHS.assets);
    const tokens = await fs.readJSON(inputPath);
    const vars = generateCssVarsFromTokens(tokens);

    const renderedCSS = renderCSS(vars);

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, renderedCSS, 'utf-8');

    logger.progress(`Tokens build: '${outputPath}'.`);
}
