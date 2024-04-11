import {
    drawConnectDirMatrix,
    drawConnectUnDirMatrix,
    drawCondensationGraph,
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
} from './matrix.js';

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
isRegularMatrix(dirMatrix);
findIsolatedVertices(degreesMatix);
findHangingVertices(degreesMatix);
