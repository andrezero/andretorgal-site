import type { FormatEnum } from 'sharp';

export type ImageFormat = keyof FormatEnum;

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

export type ImageProps = {
    src:
        | string
        | ImageMetadata
        | Promise<{
              default: ImageMetadata;
          }>;
    title?: string;
    alt?: string;
    width?: number;
    height?: number;
    profile?: ImageProfile | undefined;
};

export type Attribution = { text: string; link: string | undefined };

export type ImageFacts = {
    width: number;
    height: number;
    dominant: string;
};

export type FigureResolvedProps = {
    src: string;
    title: string;
    attribution: Attribution | undefined;
};

export type Source = {
    type: string;
    srcset: string;
    sizes: string;
};

export type ImageResolvedProps = Omit<ImageProps, 'src' | 'height'> & {
    src: string;
    height?: number | undefined;
    alt: string;
    fit: 'cover';
    position: 'center';
    loading: 'lazy';
    decoding: 'async' | 'auto' | 'sync';
};

export type ImageTransform = {
    width: number;
    format: ImageFormat;
};

export type ImageParams = {
    [key: string]: string | undefined;
};

export type AstroImage = {
    src: string;
    width: number;
    height: number;
    format: string;
};
