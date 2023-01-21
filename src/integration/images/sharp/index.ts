import type { FitEnum, Sharp } from 'sharp';

import type { ImageTransform } from '../types';

type ImageTransformParams = ImageTransform & {
    quality: number;
    fit: keyof FitEnum;
    position: string;
};

export async function transformImage(
    image: Sharp,
    { width, format, quality, fit, position }: ImageTransformParams,
): Promise<Sharp> {
    image.rotate();
    image.resize({
        width: Math.round(width),
        fit,
        position,
    });

    image.toFormat(format, { quality });

    return image.jpeg();
}
