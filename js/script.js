import { mulmr } from './random.js';
import { vertexes, drawArc, resetCanvas } from './graph.js';

const N = 11;

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

// const printMatrix = (matrix) => {
//     matrix.forEach((el) => {
//         console.log(el.join('  '));
//     });
// };

const dirMatrix = generateDirMatrix();
const unDirMatrix = getUndirMatrix(dirMatrix);

const connectUnDirMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][j]) {
                drawArc(vertexes[i], vertexes[j]);
            }
        }
    }
};

const connectDirMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) {
                drawArc(vertexes[i], vertexes[j], true);
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
