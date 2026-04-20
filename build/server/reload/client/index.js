function isLocalStylesheet(link) {
    try {
        return new URL(link.href, window.location.href).origin === window.location.origin;
    } catch {
        return false;
    }
}

function refreshStyle(link) {
    return new Promise(resolve => {
        const next = link.cloneNode();

        const url = new URL(link.href, window.location.href);
        url.searchParams.set('t', Date.now());

        next.href = url.toString();
        const finish = success => {
            console.log(next, success);
            resolve(success ? { link, next } : { link });
        };

        next.addEventListener('load', () => finish(true), { once: true });
        next.addEventListener('error', () => finish(false), { once: true });

        link.after(next);
    });
}

async function refreshStyles() {
    const promises = [];
    const links = document.querySelectorAll('link[rel="stylesheet"]');

    for (const link of links) {
        if (!isLocalStylesheet(link)) {
            continue;
        }
        promises.push(refreshStyle(link));
    }

    try {
        const results = await Promise.all(promises);
        for (const { link, next } of results) {
            link.remove();
        }
    } catch (err) {
        console.error(err);
    }
}

function getErrorOverlayElement() {
    return document.getElementById('dev-server-error-overlay');
}

function removeErrorOverlayElement() {
    const existing = getErrorOverlayElement();

    if (existing) {
        existing.remove();
    }
}

function handleErrorMessage(payload) {
    removeErrorOverlayElement();

    const div = document.createElement('div');
    div.id = 'dev-server-error-overlay';

    const close = document.createElement('button');
    div.appendChild(close);

    const pre = document.createElement('pre');
    pre.textContent = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);

    div.appendChild(pre);
    document.body.appendChild(div);

    close.addEventListener('click', () => div.remove());
}

function handleCSSMessage() {
    removeErrorOverlayElement();
    refreshStyles();
}

function handleReloadMessage() {
    removeErrorOverlayElement();
    window.location.reload();
}

const SOCKET_RETRY_MS = 2000;

function getSocketURL() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return protocol + '//' + window.location.host;
}

function handleSocketMessage(event) {
    const data = JSON.parse(event.data);
    console.info(data);

    if (data.type === 'error') {
        handleErrorMessage(data.payload);
    } else if (data.type === 'css') {
        handleCSSMessage();
    } else if (data.type === 'reload') {
        handleReloadMessage();
    }
}

function scheduleSocketReconnect() {
    window.setTimeout(createSocketClient, SOCKET_RETRY_MS);
}

function bindSocketClient(socket) {
    socket.addEventListener('message', handleSocketMessage);

    socket.addEventListener('close', () => {
        scheduleSocketReconnect();
    });

    socket.addEventListener('error', () => {
        socket.close();
    });
}

function createSocketClient() {
    const socket = new WebSocket(getSocketURL());

    bindSocketClient(socket);

    return socket;
}

createSocketClient();
