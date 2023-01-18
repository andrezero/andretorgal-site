import { Code } from 'astro/components';

import Abstract from './components/mdx/Abstract.astro';
import Audio from './components/mdx/Audio.astro';
import Image from './components/mdx/Image.astro';
import Note from './components/mdx/Note.astro';
import Year from './components/mdx/Year.astro';

export const autoimports = {
    Abstract,
    Year,
    Audio,
    Image,
    Code,
    Note,
};