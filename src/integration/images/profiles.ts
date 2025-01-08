import type { ImageFormat, ImageProfile } from './types';

export const DEFAULT_IMAGE_SIZE = 700;
export const DEFAULT_IMAGE_FORMAT: ImageFormat = 'avif';

export const defaultProfile: ImageProfile = {
    widths: [700, 1400],
    sizes: '(max-width: 650px) 86vw, (max-width: 1200px) 650px, 1400px',
    fit: 'cover',
    position: 'center',
    formats: ['avif'],
};

export const heroImageProfile: ImageProfile = {
    widths: [700, 1400, 2800],
    sizes: '(max-width: 650px) 100vw, (max-width: 1200px) 1400px, 2800px',
    fit: 'cover',
    position: 'center',
    formats: ['jpeg'],
};
