import fs from 'fs-extra';

export async function concatFiles(files) {
    let combined = '';
    for (const file of files) {
        combined += (await fs.readFile(file, 'utf-8')) + '\n';
    }
    return combined;
}
