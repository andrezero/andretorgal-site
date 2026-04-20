import express from 'express';
import http from 'http';
import { redirector } from '../middlewares/redirector.js';
import { injectClientScript } from '../reload/injectClientScript.js';
import { interceptHtml } from '../reload/interceptHtml.js';

function errorPage(title, message, details) {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
    <style>body { font-family: sans-serif; h1 { font-size: 3rem } p { font-size: 2rem } pre { font-size: 1.1rem } }</style>
  </head>
  <body>
    <h1>${title}</h1>
    <p>${message}</p>
    ${details ? `<pre>${details}</pre>` : ''}
  </body>
</html>`;
}

export function createHttpServer(port, distPath, base) {
    const app = express();
    const server = http.createServer(app);

    if (base) {
        app.use(redirector(base));
    }
    app.use(interceptHtml(distPath));
    app.use(express.static(distPath, { fallthrough: true }));
    app.use((req, res, nex) => {
        const payload = injectClientScript(errorPage('404 - Not found', `Requested: ${req.path}`));
        res.type('html');
        res.send(payload);
    });
    app.use((error, req, res, next) => {
        console.error(req.path, error);
        const payload = injectClientScript(
            errorPage(
                '503 - Unavailable',
                `Error: ${error.message}`,
                error.stack.replace(`Error: ${error.message}`, ''),
            ),
        );
        res.type('html');
        res.send(payload);
    });

    const listen = callback => {
        server.listen(port, callback);
    };

    const close = () => {
        server.close();
    };

    const api = {
        listen,
        close,
        http: server,
    };

    return api;
}
