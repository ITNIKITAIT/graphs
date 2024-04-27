import {
    drawConnectDirMatrix,
    drawConnectUnDirMatrix,
    drawCondensationGraph,
    vertices,
    drawMinSkelet,
} from './draw.js';
import { ctx2, resetCanvas } from './ctx.js';
import { findRoutes, fillRoutes } from './routes.js';
import {
    findStrongComponents,
    findStrongConnections,
} from './strongComponents.js';
import {
    findUndirMatrixDegree,
    findDirMatrixTotalDegree,
    isRegularMatrix,
    findIsolatedVertices,
    findHangingVertices,
} from './degrees.js';
import {
    generateDirMatrix,
    getUndirMatrix,
    multiplyMatrixIndivid,
    reachabilityMatrix,
    matrixT,
    fillMatrix,
    matrixW,
    createListEdges,
} from './matrix.js';
import {
    wrapperBfs,
    wrapperDfs,
    matrixBfs,
    matrixDfs,
    arrNumberingDfs,
    arrNumberingBfs,
} from '../js/traversal.js';

const dirMatrix = generateDirMatrix();
const unDirMatrix = getUndirMatrix(dirMatrix);
const reachMatrix = reachabilityMatrix(dirMatrix);
const strongConnectMatrix = multiplyMatrixIndivid(
    reachMatrix,
    matrixT(reachMatrix)
);

// Buttons and lists

const list1 = document.querySelector('.dirmatrix');
const list2 = document.querySelector('.undirmatrix');
const list3 = document.querySelector('.reachmatrix');
const list4 = document.querySelector('.strongmatrix');

fillMatrix(list1, dirMatrix);
fillMatrix(list2, unDirMatrix);
fillMatrix(list3, reachMatrix);
fillMatrix(list4, strongConnectMatrix);

const btnDirMatrix = document.querySelector('.btn-dirmatrix');
const btnUnDirMatrix = document.querySelector('.btn-undirmatrix');

btnDirMatrix.addEventListener('click', () => {
    resetCanvas();
    drawConnectDirMatrix(dirMatrix);
});
btnUnDirMatrix.addEventListener('click', () => {
    resetCanvas();
    drawConnectUnDirMatrix(unDirMatrix);
});

const AllRoutes2 = findRoutes(dirMatrix, 2);
const AllRoutes3 = findRoutes(dirMatrix, 3);

const tableRoute2 = document.getElementById('table-route-ln2');
const tableRoute3 = document.getElementById('table-route-ln3');

fillRoutes(AllRoutes2, tableRoute2);
fillRoutes(AllRoutes3, tableRoute3);

const strongComponents = findStrongComponents(strongConnectMatrix);

const list5 = document.querySelector('.strong-components-list');

for (const key in strongComponents) {
    list5.insertAdjacentHTML(
        'beforeend',
        `<li class="component">${key} = {${strongComponents[key].join(
            ', '
        )}}</li>`
    );
}

const connections = findStrongConnections(strongComponents, dirMatrix);

window.addEventListener('DOMContentLoaded', () => {
    drawCondensationGraph(connections, ctx2);
});

//For console

const degreesMatix = findDirMatrixTotalDegree(dirMatrix);
findUndirMatrixDegree(unDirMatrix);
isRegularMatrix(degreesMatix);
findIsolatedVertices(degreesMatix);
findHangingVertices(degreesMatix);

// Buttons for dfs, bfs

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
            console.log(
                'A list of correspondence between vertex numbers and their new numbering (DFS)'
            );
            const sortedList = arrNumberingDfs.sort(
                (arr1, arr2) => arr1[0] - arr2[0]
            );
            sortedList.forEach((el) => {
                console.log(
                    `Vertex index: ${el[0]}, vertex number by detour: ${el[1]}`
                );
            });
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
            console.log(
                'A list of correspondence between vertex numbers and their new numbering (BFS)'
            );
            const sortedList = arrNumberingBfs.sort(
                (arr1, arr2) => arr1[0] - arr2[0]
            );
            sortedList.forEach((el) => {
                console.log(
                    `Vertex index: ${el[0]}, vertex number by detour: ${el[1]}`
                );
            });
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

const weightMatrix = matrixW(unDirMatrix);
console.log(weightMatrix);
const list = createListEdges(weightMatrix);
console.log(list);

const SkeletIterator = drawMinSkelet(list);
document.addEventListener('keydown', () => {
    SkeletIterator();
});
