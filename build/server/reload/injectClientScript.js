import fs from 'fs-extra';

const script = fs.readFileSync('build/server/reload/client/index.js');
const style = fs.readFileSync('build/server/reload/client/index.css');

const CLIENT_SCRIPT = `<script>${script}</script>`;
const CLIENT_STYLE = `<style>${style}</style>`;

export function injectClientScript(body) {
    body = body.replace('</head>', `${CLIENT_STYLE}</head>`);
    body = body.replace('</body>', `${CLIENT_SCRIPT}</body>`);
    return body;
}
