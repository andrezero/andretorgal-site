const NOW = new Date();

export const today = (): string => {
    return NOW.toISOString().slice(0, 10);
};

export const shortDate = (date: Date): string => {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} ${day}, ${year}`;
};
