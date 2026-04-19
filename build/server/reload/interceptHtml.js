import fs from 'fs-extra';
import path from 'node:path';

import { injectClientScript } from './injectClientScript.js';

export function interceptHtml(distDir) {
    return async (req, res, next) => {
        const reqPath = req.path.endsWith('/') ? path.join(req.path, 'index.html') : req.path;
        if (!reqPath.endsWith('.html')) {
            return next();
        }

        const filePath = path.join(distDir, reqPath);
        try {
            await fs.access(filePath);
            const contents = await fs.readFile(filePath, 'utf-8');
            const payload = injectClientScript(contents);
            res.type('html');
            res.send(payload);
        } catch (err) {
            next();
        }
    };
}
