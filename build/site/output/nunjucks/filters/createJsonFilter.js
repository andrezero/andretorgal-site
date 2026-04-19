export function createJsonFilter() {
    return data => {
        return JSON.stringify(data);
    };
}
