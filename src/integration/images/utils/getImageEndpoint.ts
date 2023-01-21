import type { ImageTransform } from '../types';

export function getImageEndpoint(src: string, transform: ImageTransform): string {
    const { width, format } = transform;
    return `/_image?src=${src}&width=${width}&format=${format}`;
}
