import fs from 'fs-extra';
import yaml from 'yaml';

export async function readYamlFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        try {
            return yaml.parse(content);
        } catch (error) {
            throw new Error(`Error parsing YAML file: '${filePath}'`);
        }
    } catch (error) {
        throw new Error(`Error reading file: '${filePath}'`);
    }
}
