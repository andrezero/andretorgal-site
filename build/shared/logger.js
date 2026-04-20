export function info(...args) {
    console.info(...args);
}

export function busy(...args) {
    const label = args.shift();
    console.info('\n⌛️', label, '...', ...args);
}
export function warn(...args) {
    console.warn('⚠️', ...args);
}

export function progress(...args) {
    console.info('🌿', ...args);
}

export function error(...args) {
    console.error('❌', ...args);
}
export function success(message, ...args) {
    console.info('\n✅ ', message, '\n');
    if (args.length) {
        info(...args);
    }
}

export function fatal(message, ...args) {
    console.error('\n💀 💀 💀 💀 💀', message, '\n');
    error(...args);
}

export function box(message) {
    const messages = Array.isArray(message) ? message : [message];
    const longest = messages.reduce((acc, item) => (item.length > acc.length ? item : acc));
    const width = longest.length + 4;
    const topBorder = ' ┌' + '─'.repeat(width) + '┐';
    const content = messages.map(message => {
        const padLeft = ' '.repeat(Math.ceil((longest.length - message.length) / 2));
        const padRight = ' '.repeat(Math.floor((longest.length - message.length) / 2));
        return ` │  ${padLeft}${message}${padRight}  │`;
    });
    const bottomBorder = ' └' + '─'.repeat(width) + '┘';
    console.info('\n' + topBorder);
    content.forEach(item => console.info(item));
    console.info(bottomBorder + '\n');
}

export function title(message) {
    const text = `🤟 ${message}`;
    return box(text);
}
