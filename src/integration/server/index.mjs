import mime from 'mime';
import { defaultProfile } from '../../components/mdx/image/profiles';
import { readImage } from '../images/readImage.mjs';
import { transform } from '../images/sharp.mjs';
import { etag } from './etag.mjs';

export async function get({ request }) {
    try {
        const url = new URL(request.url);
        const params = url.searchParams;

        const filename = params.get('src');
        const width = params.get('width') || defaultProfile.widths[0];
        const format = params.get('format') || defaultProfile.formats[0];

        // TODO how to config base path?
        const image = await readImage('src/pages', filename);
        const data = await transform(image, {
            width,
            format,
            quality: 50,
            fit: 'cover',
            position: 'center',
        });

        return new Response(data, {
            status: 200,
            headers: {
                'Content-Type': mime.getType(format) || '',
                'Cache-Control': 'public, max-age=31536000',
                ETag: etag(data.toString()),
                Date: new Date().toUTCString(),
            },
        });
    } catch (err) {
        console.error(err);
        return new Response(`Server Error: ${err}`, { status: 500 });
    }
}
