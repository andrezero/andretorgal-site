/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-object-injection */
import fs from 'fs';
import { readFile } from 'fs/promises';
import {
    createJsxElement,
    createProgram,
    isIdentifier,
    isImage,
    isMdxJsxAttribute,
    isMdxJsxFlowElement,
    isObjectExpression,
    isProperty,
    parseEsm,
    visit,
} from 'm2dx-utils';
import path, { isAbsolute, join } from 'path';
import { isObjectLike } from '../common/assert.mjs';
import { findExportInMdx, findExportInProgram } from '../common/findExportInMdx.mjs';
import { toLinux } from '../common/path.mjs';
import { shortHash } from '../common/shortHash.mjs';

export async function processFile(root, baseDir, files) {
    const relativeImages = [];
    visit(root, isImage, (node, parent) => {
        if (!isAbsolute(node.url)) {
            relativeImages.push([node, parent]);
        }
    });

    let imageComponent = { name: 'img' };
    if (relativeImages.length > 0) {
        imageComponent = (await findImageComponent(root, files)) ?? imageComponent;
        if (imageComponent.requiredImport) {
            root.children.push(imageComponent.requiredImport);
        }
    }
    let imageCount = 0;
    for (const [image, parent] of relativeImages) {
        const path = join(baseDir, image.url);
        if (fs.existsSync(path)) {
            const index = parent.children.indexOf(image);
            if (index < 0) {
                throw new Error(
                    `relativeImages: image (${image.url} [${image.position?.start.line}:${image.position?.start.column}]) does not have a parent`,
                );
            }
            const name = `relImg__${imageCount++}`;
            const src = `src={${name}}`;
            const alt = image.alt ? ` alt="${image.alt}"` : '';
            const title = image.title ? ` title="${image.title}"` : '';
            const attributes = hPropertiesToAttributes(image.data?.hProperties);
            parent.children[index] = createJsxElement(
                `<${imageComponent.name} ${src}${alt}${title}${attributes} />`,
            );
            const imageImport = createProgram(`import ${name} from '${toLinux(path)}';`);
            root.children.push(imageImport);
        }
    }

    const relativeJsxImages = findAllRelativeJsxImageReferences(root);
    for (const attribute of relativeJsxImages) {
        const path = join(baseDir, attribute.value);
        if (fs.existsSync(path)) {
            const name = `relImg__${imageCount++}`;
            attribute.value = toAttributeValueExpressionStatement(name);
            const imageImport = createProgram(`import ${name} from '${toLinux(path)}';`);
            root.children.push(imageImport);
        }
    }
}

async function findImageComponent(root, files) {
    let img = findImgProperty(findExportInMdx(root));
    if (img) {
        return { name: img };
    } else if (files && files.length > 0) {
        files = [...files].reverse();
        for (const file of files) {
            img = findImgProperty(await findExportInFile(file));
            if (img) {
                const alias = `_ic__${shortHash(file)}`;
                return {
                    name: `${alias}.img`,
                    requiredImport: createProgram(
                        `import { components as ${alias} } from '${toLinux(file)}';`,
                    ),
                };
            }
        }
    }
    return undefined;
}

function findImgProperty(decl) {
    const init = decl?.init;
    if (isObjectExpression(init)) {
        const imgProperty = init.properties.filter(isProperty).find(p => p.key?.name === 'img');
        if (imgProperty && isIdentifier(imgProperty.value)) {
            return imgProperty.value.name;
        }
    }
    return undefined;
}

async function findExportInFile(file) {
    const src = await readFile(file, 'utf8');
    const program = parseEsm(src);
    return findExportInProgram(program);
}

function hPropertiesToAttributes(properties) {
    if (!isObjectLike(properties)) {
        return '';
    }

    return (
        ' ' +
        Object.keys(properties)
            .map(k => `${k}="${properties[k]}"`)
            .join(' ')
    );
}

const imageExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif', '.tiff', '.avif'];
function findAllRelativeJsxImageReferences(root) {
    const result = [];
    visit(root, isMdxJsxFlowElement, node => {
        for (const attribute of node.attributes.filter(isMdxJsxAttribute)) {
            const value = attribute.value;
            if (typeof value === 'string' && (value.startsWith('./') || value.startsWith('../'))) {
                if (imageExtensions.includes(path.extname(value))) {
                    result.push(attribute);
                }
            }
        }
    });

    return result;
}

function toAttributeValueExpressionStatement(value) {
    return {
        type: 'mdxJsxAttributeValueExpression',
        value,
        data: {
            estree: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Identifier',
                            name: value,
                        },
                    },
                ],
                sourceType: 'module',
            },
        },
    };
}
