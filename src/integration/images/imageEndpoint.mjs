export function imageEndpoint(src, transform) {
    const { width, format } = transform;
    return `/_image?src=${src}&width=${width}&format=${format}`;
}
