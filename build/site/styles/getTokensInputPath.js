import path from 'node:path';

export function getTokensInputPath(buildConfig) {
    const { paths: PATHS, css } = buildConfig;

    const sourceFileName = css.tokens.src || 'tokens.json';
    return path.join(PATHS.styles, sourceFileName);
}
