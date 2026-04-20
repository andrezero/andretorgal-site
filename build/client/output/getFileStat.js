import fs from 'fs-extra';

export async function getFileStat(filePath) {
    return fs.stat(filePath);
}
