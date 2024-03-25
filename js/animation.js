const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
        ctx.font = '20px serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.number, this.x, this.y);
        ctx.fillStyle = 'black';
    }
}

ctx.translate(canvas.width / 2, canvas.height / 2);
const fillVertexes = () => {
    const arrayOfVertex = [];
    const interval = canvas.width / 5;
    let startY = -(canvas.height / 4);
    const startX = -(canvas.width / 2) + interval;
    let curX = startX;
    for (let i = 0; i < 8; i++) {
        if (i === 4) {
            startY = -startY;
            curX = startX;
        }
        arrayOfVertex.push(new Vertex(curX, startY, 30, i));
        curX += interval;
    }
    arrayOfVertex.push(new Vertex(startX, 0, 30));
    arrayOfVertex.push(new Vertex(-startX, 0, 30));
    arrayOfVertex.push(new Vertex(0, 0, 30));
    return arrayOfVertex;
};

export const drawLines = (graph1, graph2) => {
    ctx.moveTo(graph1.x, graph1.y);
    ctx.lineTo(graph2.x, graph2.y);
    ctx.stroke();
    ctx.beginPath();
};

export const graphs = fillVertexes();
console.log(graphs);
graphs.forEach((el) => el.drawVertex());
