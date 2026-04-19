import fs from 'fs-extra';

export async function readJsonFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        try {
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`Error parsing JSON file: '${filePath}'`);
        }
    } catch (error) {
        throw new Error(`Error reading file: '${filePath}'`);
    }
}
