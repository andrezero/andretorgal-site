import path from 'node:path';

export function makePath(rootDir, key, value, defaultValue) {
    return path.join(rootDir, value || defaultValue);
}
