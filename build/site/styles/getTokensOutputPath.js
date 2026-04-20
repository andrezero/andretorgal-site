import path from 'node:path';
export function getTokensOutputPath(buildConfig) {
    const { paths: PATHS, css } = buildConfig;

    const outputFileName = css.tokens.target || 'tokens.css';
    const outputPath = path.join(PATHS.styles, outputFileName);

    return outputPath;
}
