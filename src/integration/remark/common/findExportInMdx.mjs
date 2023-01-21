import { EXIT as esEXIT, visit as esVisit } from 'estree-util-visit';
import { EXIT, isMdxjsEsm, isObjectExpression, isVariableDeclarator, visit } from 'm2dx-utils';

export function findExportInProgram(program) {
    let found;
    esVisit(program, (n, key, index, ancestors) => {
        if (isVariableDeclarator(n)) {
            const name = n.id.name;
            const declaration = ancestors[ancestors.length - 1];
            if (
                name === 'components' &&
                declaration.kind === 'const' &&
                isObjectExpression(n.init)
            ) {
                found = n;
                return esEXIT;
            }
        }
    });
    return found;
}

export function findExportInMdx(root) {
    let found;
    visit(root, isMdxjsEsm, node => {
        if ((found = findExportInProgram(node.data.estree))) {
            return EXIT;
        }
    });
    return found;
}
