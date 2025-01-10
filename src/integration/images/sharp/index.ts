import type { FitEnum, FormatEnum, Sharp } from 'sharp';

export type Image = {
    src: string;
    width?: number;
    height?: number;
    format?: string;
};

export type ImageProfile = {
    widths: number[];
    sizes: string;
    fit: 'cover';
    position: 'center';
    formats: ImageFormat[];
};

export type ImageFormat = keyof FormatEnum;

export type ImageTransform = {
    width: number;
    format: ImageFormat;
};

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
