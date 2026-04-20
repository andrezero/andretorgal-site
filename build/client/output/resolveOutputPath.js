import path from 'node:path';

export function resolveOutputPath(srcFile, srcDir, distDir) {
    const relativePath = path.relative(srcDir, srcFile);

    return path.join(distDir, relativePath);
}
