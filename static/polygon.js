class Polygon {
    constructor(x, y, size, filled) {
        this.x = x; // Position
        this.y = y;
        this.size = size;
        this.filled = filled; // number 0 - 5
        this.p = [];
        for (var i = 0; i <= numberOfSides; i += 1) {
            this.p.push({
                x: (this.x + this.size * Math.cos(i * 2 * Math.PI / numberOfSides))
                , y: (this.y + this.size * Math.sin(i * 2 * Math.PI / numberOfSides))
            });
        }
    }

    draw(myCanvas) {
        var ctx = myCanvas.getContext("2d");
        ctx.beginPath();
        // using cos sin to draw hexagon
        // in other word, draw circle with 6 egde 
        ctx.moveTo(this.p[0].x, this.p[0].y);
        for (var i = 1; i <= numberOfSides; i += 1) {
            ctx.lineTo(this.p[i].x,
                this.p[i].y);
        }

        if (this.filled) {
            // 1/6 chance that polygon will be filled
            ctx.strokeStyle = "#333333";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = "#333333";
            ctx.fill();
        }
        else {
            ctx.strokeStyle = "rgba(33,33,33,0.25)";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    get pr() {
        return this.constructor.pr;
    }
}
var numberOfSides=6;
Polygon.pr=[];
for (var i = -1; i < numberOfSides-1; i += 1) {
    Polygon.pr.push(i * 2 * Math.PI / numberOfSides);
}