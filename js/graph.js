export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

const RADIUS = 30;
const N = 11;

ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.globalCompositeOperation = 'destination-over';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '22px serif';

class Vertex {
    constructor(x, y, r, number) {
        (this.x = x), (this.y = y);
        this.r = r;
        this.number = number;
    }
    drawVertex() {
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.number, this.x, this.y);
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const fillVertexes = () => {
    const arrayOfVertex = [];
    const margin = 100;
    let interval = (canvas.width - margin * 2) / 3;
    let startY = -(canvas.height / 3);
    const startX = -(canvas.width / 2) + margin;
    let curX = startX;
    for (let i = 1; i <= N - 1; i++) {
        if (i === 5) {
            arrayOfVertex.push(new Vertex(-startX, 0, RADIUS, i));
            startY = -startY;
            interval *= -1;
            curX = -startX;
            continue;
        }
        if (i === 10) {
            arrayOfVertex.push(new Vertex(startX, 0, RADIUS, i));
            break;
        }
        arrayOfVertex.push(new Vertex(curX, startY, RADIUS, i));
        curX += interval;
    }
    arrayOfVertex.push(new Vertex(0, 0, RADIUS, 11));
    return arrayOfVertex;
};

const drawArrow = (fromx, fromy, tox, toy) => {
    const height = RADIUS / 2;
    const angle = Math.atan2(toy - fromy, tox - fromx);
    const xArrow = tox - RADIUS * Math.cos(angle);
    const yArrow = toy - RADIUS * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(
        xArrow - height * Math.cos(angle - Math.PI / 6),
        yArrow - height * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(xArrow, yArrow);
    ctx.lineTo(
        xArrow - height * Math.cos(angle + Math.PI / 6),
        yArrow - height * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
};

const drawLine = (graph1, graph2, isArrow) => {
    ctx.beginPath();
    ctx.moveTo(graph1.x, graph1.y);
    ctx.lineTo(graph2.x, graph2.y);
    ctx.stroke();
    isArrow && drawArrow(graph1.x, graph1.y, graph2.x, graph2.y);
};

const drawSelfLine = (graph, isArrow) => {
    let height = 50;
    if (graph.y > 0) height = -height;
    ctx.beginPath();
    ctx.moveTo(graph.x, graph.y);
    ctx.lineTo(graph.x - RADIUS, graph.y - height);
    ctx.lineTo(graph.x + RADIUS, graph.y - height);
    ctx.closePath();
    ctx.stroke();
    isArrow && drawArrow(graph.x + RADIUS, graph.y - height, graph.x, graph.y);
};

export const drawArc = (graph1, graph2, isArrow = false) => {
    // console.log('working');
    const interval = 100;
    let middleX = (graph1.x + graph2.x) / 2;
    let middleY = (graph1.y + graph2.y) / 2;
    let radius = Math.abs(graph2.x - graph1.x);

    if (graph1 === graph2) {
        drawSelfLine(graph1, isArrow);
        return;
    }

    if (
        Math.round(graph1.y) === Math.round(graph2.y) &&
        Math.abs(graph1.number - graph2.number) != 1
    ) {
        graph1.y > 0 ? (middleY += interval) : (middleY -= interval);
    } else if (
        Math.round(graph1.x) === Math.round(graph2.x) &&
        Math.abs(graph1.number - graph2.number) != 1
    ) {
        radius = Math.abs(graph2.y - graph1.y);
        graph1.x > 0 ? (middleX += interval) : (middleX -= interval);
    } else if (
        Math.abs(graph2.number - graph1.number) === 5 &&
        graph2.number != N &&
        graph1.number != N
    ) {
        if (graph1.x < 0) {
            middleY += interval;
            middleX -= interval;
        } else {
            middleY -= interval;
            middleX -= interval;
        }
        radius = Math.abs(graph2.y - graph1.y);
    } else {
        drawLine(graph1, graph2, isArrow);
        return;
    }

    ctx.beginPath();
    ctx.moveTo(graph1.x, graph1.y);
    ctx.arcTo(middleX, middleY, graph2.x, graph2.y, radius);
    ctx.lineTo(graph2.x, graph2.y);
    ctx.stroke();

    isArrow && drawArrow(middleX, middleY, graph2.x, graph2.y);
};

export const resetCanvas = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    vertexes.forEach((el) => el.drawVertex());
};

export const vertexes = fillVertexes();
