export function plural(count: number, name: string, pluralName?: string): string {
    if (count === 1) {
        return name;
    }
    return pluralName || `${name}s`;
}
