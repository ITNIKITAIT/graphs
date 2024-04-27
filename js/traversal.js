import { drawConnection, vertices } from './draw.js';
import { createClearMatrix } from './matrix.js';

const renderVertices = (stack) => {
    vertices.forEach((el) => {
        if (stack.includes(el) && stack.at(-1) !== el) {
            el.newState = 'opened';
        }
        stack.at(-1).newState = 'current';
    });
};

export const matrixDfs = createClearMatrix(vertices.length);
export const arrNumberingDfs = [];

export const wrapperDfs = (matrix, start = 0) => {
    let count = 1;
    let currentRow = start;
    const stack = [vertices[start]];

    vertices[start].newState = 'current';
    arrNumberingDfs.push([start + 1, count++]);

    const dfs = () => {
        const row = currentRow;
        if (stack.length === 0) return;

        for (let j = 0; j < matrix.length; j++) {
            if (matrix[row][j] && vertices[j].state === 'new') {
                drawConnection(stack.at(-1), vertices[j], true);
                stack.push(vertices[j]);
                renderVertices(stack);
                console.log(`From V${currentRow + 1} to V${j + 1}`);
                arrNumberingDfs.push([j + 1, count++]);
                matrixDfs[currentRow][j] = 1;
                currentRow = j;
                return dfs;
            }
        }
        vertices[currentRow].newState = 'opened';
        stack.pop();

        if (stack.length === 0) return;
        currentRow = stack.at(-1).number - 1;
        renderVertices(stack);
        return dfs;
    };
    return dfs;
};

export const matrixBfs = createClearMatrix(vertices.length);
export const arrNumberingBfs = [];

export const wrapperBfs = (matrix, start = 0) => {
    let count = 1;
    let currentRow = start;
    const queue = [vertices[start]];

    vertices[start].newState = 'current';
    arrNumberingBfs.push([start + 1, count++]);

    const bfs = () => {
        const row = currentRow;
        if (queue.length === 0) return;

        for (let j = 0; j < matrix.length; j++) {
            if (matrix[row][j] && vertices[j].state === 'new') {
                drawConnection(queue.at(-1), vertices[j], true);
                queue.unshift(vertices[j]);
                renderVertices(queue);
                console.log(`From V${currentRow + 1} to V${j + 1}`);
                arrNumberingBfs.push([j + 1, count++]);
                matrixBfs[currentRow][j] = 1;
                return bfs;
            }
        }
        vertices[currentRow].newState = 'opened';
        queue.pop();
        if (queue.length === 0) return;
        currentRow = queue.at(-1).number - 1;
        renderVertices(queue);
        return bfs;
    };
    return bfs;
};
