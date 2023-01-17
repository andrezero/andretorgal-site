import type { ImageProfile } from './types';

export const defaultProfile: ImageProfile = {
    widths: [700, 1400],
    sizes: '(max-width: 650px) 86vw, (max-width: 1200px) 650px, 1400px',
    fit: 'cover',
    position: 'center',
    formats: ['avif'],
};
