import fs from 'fs-extra';
import path from 'node:path';

export async function geLayoutFilename(templatesDir, templateName) {
    if (templateName) {
        const name = path.join('layouts', `${templateName}.njk`);
        const templateFilename = path.join(templatesDir, name);
        if (await fs.pathExists(templateFilename)) {
            return name;
        }
        throw new Error(`Template not found: '${templateFilename}'`);
    }
}
