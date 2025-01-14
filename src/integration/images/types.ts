import type { ImageInputFormat } from 'astro';

export type ImportedImage = Promise<{
    default: ImageMetadata;
}>;

export type ResolvedImage = {
    href: string;
    width: number;
    height: number;
    format: ImageInputFormat;
};

export type ImportedImageFn = () => ImportedImage;

export type ImageSrc = string | ImageMetadata | ImportedImage;

export type ImageProps = {
    src: ImageSrc;
    title?: string;
    alt?: string;
    width?: number | undefined;
    height?: number | undefined;
};

export type Attribution = { text: string; link: string | undefined };

export type ImageFacts = {
    width: number;
    height: number;
    dominant: string;
};

export type FigureResolvedProps = {
    src: ImageSrc;
    alt: string;
    title: string;
    attribution: Attribution | undefined;
    width?: number | undefined;
    height?: number | undefined;
};
