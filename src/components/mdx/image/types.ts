export type ImageFormat = 'jpg' | 'avif' | 'webp';

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
    src: Image | string;
    width?: number;
    height?: number;
    title?: string;
    alt?: string;
};

export type Attribution = { text: string; link?: string };

export type ImageResolvedProps = Omit<ImageProps, 'src' | 'width' | 'height'> & {
    src: string;
    width: number;
    height: number;
    attribution?: Attribution;
};

export type ImageParams = {
    [key: string]: string | undefined;
};
