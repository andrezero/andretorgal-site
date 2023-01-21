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
    src: string;
    title?: string;
    alt?: string;
    profile?: ImageProfile | undefined;
};

export type Attribution = { text: string; link: string | undefined };

export type ImageFacts = {
    width: number;
    height: number;
    dominant: string;
};

export type FigureResolvedProps = Omit<ImageProps, 'title' | 'alt'> &
    ImageFacts & {
        src: string;
        title: string;
        attribution: Attribution | undefined;
    };

export type Source = {
    type: string;
    srcset: string;
    sizes: string;
};

export type ImageResolvedProps = Omit<ImageProps, 'src' | 'width' | 'height'> & {
    src: string;
    alt: string;
    fit: 'cover';
    position: 'center';
    loading: 'lazy';
    decoding: 'async' | 'auto' | 'sync';
    sources: Source[];
};

export type ImageTransform = {
    width: number;
    format: ImageFormat;
};

export type ImageParams = {
    [key: string]: string | undefined;
};
