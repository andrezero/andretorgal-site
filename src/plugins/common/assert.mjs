export function isObjectLike(object) {
    return (
        !!object &&
        typeof object === 'object' &&
        !Array.isArray(object) &&
        !(object instanceof Date)
    );
}
