import { Vertex, StrongVertex } from './vertex.js';
import { N } from './matrix.js';
import { ctx1, canvas } from './ctx.js';
import { ctx2, canvasComponents } from './ctx.js';
import { RADIUS } from './consts.js';

const fillVertexes = () => {
    const arrayOfVertex = [];
    const margin = 100;
    let interval = (canvas.width - margin * 2) / 3;
    let curY = -(canvas.height / 3);
    const startX = -(canvas.width / 2) + margin;
    let curX = startX;
    for (let i = 1; i <= N - 1; i++) {
        if (i === 5) {
            arrayOfVertex.push(new Vertex(-startX, 0, RADIUS, i, ctx1));
            curY = -curY;
            interval *= -1;
            curX = -startX;
            continue;
        }
        if (i === 10) {
            arrayOfVertex.push(new Vertex(startX, 0, RADIUS, i, ctx1));
            break;
        }
        arrayOfVertex.push(new Vertex(curX, curY, RADIUS, i, ctx1));
        curX += interval;
    }
    arrayOfVertex.push(new Vertex(0, 0, RADIUS, 11, ctx1));
    return arrayOfVertex;
};

const drawArrow = (fromX, fromY, toX, toY, ctx = ctx1) => {
    const height = RADIUS / 2;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowX = toX - RADIUS * Math.cos(angle);
    const arrowY = toY - RADIUS * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(
        arrowX - height * Math.cos(angle - Math.PI / 6),
        arrowY - height * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(arrowX, arrowY);
    ctx.lineTo(
        arrowX - height * Math.cos(angle + Math.PI / 6),
        arrowY - height * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
};

const drawLine = (ver1, ver2, isArrow, ctx = ctx1) => {
    ctx.beginPath();
    ctx.moveTo(ver1.x, ver1.y);
    ctx.lineTo(ver2.x, ver2.y);
    ctx.stroke();
    isArrow && drawArrow(ver1.x, ver1.y, ver2.x, ver2.y, ctx);
};

const drawSelfLine = (ver, isArrow) => {
    let height = 50;
    if (ver.y > 0) height = -height;
    ctx1.beginPath();
    ctx1.moveTo(ver.x, ver.y);
    ctx1.lineTo(ver.x - RADIUS, ver.y - height);
    ctx1.lineTo(ver.x + RADIUS, ver.y - height);
    ctx1.closePath();
    ctx1.stroke();
    isArrow && drawArrow(ver.x + RADIUS, ver.y - height, ver.x, ver.y);
};

const drawConnection = (ver1, ver2, isArrow = false) => {
    if (ver1 === ver2) {
        drawSelfLine(ver1, isArrow);
        return;
    }

    if (
        Math.round(ver1.y) === Math.round(ver2.y) &&
        Math.abs(ver1.number - ver2.number) != 1
    ) {
        drawArc(ver1, ver2, isArrow);
    } else if (
        Math.round(ver1.x) === Math.round(ver2.x) &&
        Math.abs(ver1.number - ver2.number) != 1
    ) {
        drawArc(ver1, ver2, isArrow);
    } else if (
        Math.abs(ver2.number - ver1.number) === 5 &&
        ver2.number != N &&
        ver1.number != N
    ) {
        drawArc(ver1, ver2, isArrow);
    } else {
        drawLine(ver1, ver2, isArrow);
    }
};

const drawArc = (ver1, ver2, isArrow = false) => {
    let middleX = (ver1.x + ver2.x) / 2;
    let middleY = (ver1.y + ver2.y) / 2;
    let radius = Math.max(Math.abs(ver2.x - ver1.x), Math.abs(ver2.y - ver1.y));

    middleX += (ver2.y - ver1.y) / 5;
    middleY += (ver2.x - ver1.x) / 5;

    ctx1.beginPath();
    ctx1.moveTo(ver1.x, ver1.y);
    ctx1.arcTo(middleX, middleY, ver2.x, ver2.y, radius);
    ctx1.lineTo(ver2.x, ver2.y);
    ctx1.stroke();

    isArrow && drawArrow(middleX, middleY, ver2.x, ver2.y);
};

const drawConnectUnDirMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][j]) {
                drawConnection(vertices[i], vertices[j]);
            }
        }
    }
};

const drawConnectDirMatrix = (matrix) => {
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

const drawCondensationGraph = (components, ctx) => {
    const n = Object.keys(components).length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const radius =
        Math.min(canvasComponents.width, canvasComponents.height) / 3;
    const angleStep = (2 * Math.PI) / n;

    const vertices = [];
    for (let i = 0; i < n; i++) {
        const angle = i * angleStep;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        vertices.push(
            new StrongVertex(x, y, RADIUS, Object.keys(components)[i], ctx)
        );
    }

    for (let i = 0; i < vertices.length; i++) {
        vertices[i].connections = components[vertices[i].name];
    }

    for (const key in components) {
        const K = vertices.find((el) => el.name === key);
        K.connections = components[key].map((ver) =>
            vertices.find((el) => el.name === ver)
        );
    }

    vertices.forEach((ver) => ver.drawVertex());
    vertices.forEach((ver) => {
        ver.connections.forEach((el) => drawLine(ver, el, true, ctx));
    });
};

export {
    drawArc,
    drawConnection,
    drawCondensationGraph,
    drawConnectDirMatrix,
    drawConnectUnDirMatrix,
};
export const vertices = fillVertexes();
