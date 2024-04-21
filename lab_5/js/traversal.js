import { drawConnection, vertices } from './graph.js';

const renderVertices = (stack) => {
    vertices.forEach((el) => {
        if (stack.includes(el) && stack.at(-1) !== el) {
            el.newState = 'opened';
        }
        stack.at(-1).newState = 'current';
    });
};

export const wrapperDfs = (matrix, start = 0) => {
    let currentRow = start;
    const stack = [vertices[start]];
    vertices[start].newState = 'current';
    const dfs = () => {
        const row = currentRow;
        if (stack.length === 0) return;

        for (let j = 0; j < matrix.length; j++) {
            if (matrix[row][j] && vertices[j].state === 'new') {
                drawConnection(stack.at(-1), vertices[j], true);
                stack.push(vertices[j]);
                renderVertices(stack);
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

export const wrapperBfs = (matrix, start = 0) => {
    let currentRow = start;
    const queue = [vertices[start]];
    vertices[start].newState = 'current';
    const bfs = () => {
        const row = currentRow;
        if (queue.length === 0) return;

        for (let j = 0; j < matrix.length; j++) {
            if (matrix[row][j] && vertices[j].state === 'new') {
                drawConnection(queue.at(-1), vertices[j], true);
                queue.unshift(vertices[j]);
                renderVertices(queue);
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
