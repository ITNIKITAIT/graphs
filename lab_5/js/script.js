import { mulmr } from './random.js';
import { vertices, drawConnection, resetCanvas, drawArc } from './graph.js';
import { matrixBfs, matrixDfs, wrapperBfs, wrapperDfs } from './traversal.js';

const N = 11;
vertices.forEach((ver) => ver.drawVertex());
const generateDirMatrix = () => {
    const matrix = [];
    for (let i = 0; i < N; i++) {
        matrix.push([]);
        for (let j = 0; j < N; j++) {
            matrix[i].push(mulmr());
        }
    }
    return matrix;
};

const getUndirMatrix = (matrix) => {
    const undirMatrix = structuredClone(matrix);
    for (let i = 0; i < undirMatrix.length; i++) {
        for (let j = 0; j < undirMatrix.length; j++) {
            if (undirMatrix[i][j] === 1) undirMatrix[j][i] = 1;
        }
    }
    return undirMatrix;
};

const connectUnDirMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][j]) {
                drawConnection(vertices[i], vertices[j]);
            }
        }
    }
};

const connectDirMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) {
                if (matrix[j][i] && i > j)
                    drawArc(vertices[i], vertices[j], true);
                else drawConnection(vertices[i], vertices[j], true);
            }
        }
    }
};

function fillMatrix(list, matrix) {
    list.innerHTML = '';
    const ROW_WIDTH = 20;
    const GAP = 5;
    const PADDING = 10;
    list.style.maxWidth = `${
        N * ROW_WIDTH + (N - 1) * GAP + PADDING * 2 + 2
    }px`;
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].forEach((el) => {
            list.insertAdjacentHTML(
                'beforeend',
                `<li id="${i}" class="item">${el}</li>`
            );
        });
    }
}

export const dirMatrix = generateDirMatrix();
const unDirMatrix = getUndirMatrix(dirMatrix);

// Buttons and lists

const list1 = document.querySelector('.dirmatrix');
const list2 = document.querySelector('.undirmatrix');
fillMatrix(list1, dirMatrix);
fillMatrix(list2, unDirMatrix);

const btnDirMatrix = document.querySelector('.btn-dirmatrix');
const btnUnDirMatrix = document.querySelector('.btn-undirmatrix');

btnDirMatrix.addEventListener('click', () => {
    resetCanvas();
    connectDirMatrix(dirMatrix);
});
btnUnDirMatrix.addEventListener('click', () => {
    resetCanvas();
    connectUnDirMatrix(unDirMatrix);
});

// vertices.forEach((el) => el.drawVertex());

const dfsButton = document.querySelector('.createdfs-btn');
const bfsButton = document.querySelector('.createbfs-btn');
const nextDfsBtn = document.querySelector('.nextDfs-btn');
const nextBfsBtn = document.querySelector('.nextBfs-btn');
nextDfsBtn.style.display = 'none';
nextBfsBtn.style.display = 'none';

// DFS

const dfsFunc = () => {
    resetCanvas();
    let dfsIterator = wrapperDfs(dirMatrix);
    nextDfsBtn.addEventListener('click', () => {
        if (vertices.every((ver) => ver.state === 'opened')) {
            console.log('matrixDfs:');
            console.log(matrixDfs);
        }
        if (!dfsIterator) {
            for (let i = 0; i < vertices.length; i++) {
                if (vertices[i].state === 'new') {
                    dfsIterator = wrapperDfs(dirMatrix, i);
                    break;
                }
            }
        } else dfsIterator = dfsIterator();
    });
};

dfsButton.addEventListener('click', () => {
    dfsButton.classList.add('btn-active');
    if (bfsButton.classList.contains('btn-active')) {
        bfsButton.classList.remove('btn-active');
    }
    nextDfsBtn.style.display = 'block';
    nextBfsBtn.style.display = 'none';
    dfsFunc();
});

// BFS

const bfsFunc = () => {
    resetCanvas();
    let bfsIterator = wrapperBfs(dirMatrix);
    nextBfsBtn.addEventListener('click', () => {
        if (vertices.every((ver) => ver.state === 'opened')) {
            console.log('matrixBfs:');
            console.log(matrixBfs);
        }
        if (!bfsIterator) {
            for (let i = 0; i < vertices.length; i++) {
                if (vertices[i].state === 'new') {
                    bfsIterator = wrapperBfs(dirMatrix, i);
                    break;
                }
            }
        } else bfsIterator = bfsIterator();
    });
};

bfsButton.addEventListener('click', () => {
    bfsButton.classList.add('btn-active');
    if (dfsButton.classList.contains('btn-active')) {
        dfsButton.classList.remove('btn-active');
    }
    nextDfsBtn.style.display = 'none';
    nextBfsBtn.style.display = 'block';
    bfsFunc();
});
