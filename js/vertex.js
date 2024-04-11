export class Vertex {
    constructor(x, y, r, number, ctx) {
        (this.x = x), (this.y = y);
        this.r = r;
        this.number = number;
        this.ctx = ctx;
    }
    drawVertex() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(this.number, this.x, this.y);
        this.ctx.fillStyle = 'black';
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

export class StrongVertex {
    constructor(x, y, r, name, ctx) {
        (this.x = x), (this.y = y);
        this.r = r;
        this.name = name;
        this.ctx = ctx;
        this.connections = [];
    }
    drawVertex() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(this.name, this.x, this.y);
        this.ctx.fillStyle = 'black';
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    setConnect(ver) {
        this.connections.push(ver);
    }
}
