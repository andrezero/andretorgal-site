import fs from 'fs-extra';

export async function checkEntryFile(entryFilePath) {
    const exists = await fs.pathExists(entryFilePath);

    if (!exists) {
        throw new Error(`JS entry file not found: '${entryFilePath}'.`);
    }
}
