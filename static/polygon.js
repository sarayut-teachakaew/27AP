class Polygon {
    constructor(x, y, size, random) {
        this.x = x; // Position
        this.y = y;
        this.size = size; 
        this.random = random; // number 0 - 5
    }

    draw(myCanvas) {
        var ctx = myCanvas.getContext("2d");
        var numberOfSides = 6; //hexagon
        ctx.beginPath();
        // using cos sin to draw hexagon
        // in other word, draw circle with 6 egde 
        ctx.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));
        for (var i = 1; i <= numberOfSides; i += 1) {
            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / numberOfSides), 
            this.y + this.size * Math.sin(i * 2 * Math.PI / numberOfSides));
        }

        if (this.random === 0) {
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
}