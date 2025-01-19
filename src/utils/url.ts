export function isAbsolute(url: string): boolean {
    return url.startsWith('http') || url.startsWith('//');
}
