const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const RADIUS = 30;

ctx.translate(canvas.width / 2, canvas.height / 2);
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
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.number, this.x, this.y);
        ctx.fillStyle = 'black';
    }
}

const fillVertexes = () => {
    const arrayOfVertex = [];
    let interval = (canvas.width - 100) / 3;
    let startY = -(canvas.height / 3);
    const startX = -(canvas.width / 2) + 50;
    let curX = startX;
    for (let i = 1; i <= 10; i++) {
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

export const drawLine = (graph1, graph2) => {
    ctx.beginPath();
    ctx.moveTo(graph1.x, graph1.y);
    ctx.lineTo(graph2.x, graph2.y);
    ctx.stroke();
};

export const drawArc = (graph1, graph2) => {
    console.log('working');
    ctx.globalCompositeOperation = 'destination-over';
    let middleX = (graph1.x + graph2.x) / 2;
    let middleY = (graph1.y + graph2.y) / 2;
    let radius = Math.abs(graph2.x - graph1.x);

    if (graph1 === graph2) {
        ctx.beginPath();
        ctx.moveTo(graph1.x, graph1.y);
        ctx.lineTo(graph1.x - 30, graph1.y - 50);
        ctx.lineTo(graph1.x + 30, graph1.y - 50);
        ctx.closePath();
        ctx.stroke();
        return;
    }

    if (
        Math.round(graph1.y) === Math.round(graph2.y) &&
        Math.abs(graph1.number - graph2.number) != 1
    ) {
        middleY -= 100;
    } else if (
        Math.round(graph1.x) === Math.round(graph2.x) &&
        Math.abs(graph1.number - graph2.number) != 1
    ) {
        radius = Math.abs(graph2.y - graph1.y);
        middleX += 100;
    } else if (graph2.number - graph1.number === 5) {
        middleY -= 100;
        middleX -= 100;
        radius = Math.abs(graph2.y - graph1.y + graph2.x);
    } else {
        drawLine(graph1, graph2);
        return;
    }

    ctx.beginPath();
    ctx.moveTo(graph1.x, graph1.y);
    ctx.arcTo(middleX, middleY, graph2.x, graph2.y, radius);
    ctx.lineTo(graph2.x, graph2.y);
    ctx.stroke();
};

export const graphs = fillVertexes();
graphs.forEach((el) => el.drawVertex());
