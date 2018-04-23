const imgSkin = { "9gag": "/image/9gag.png" };

class Player {
    constructor(name, xPos, yPos, id, skin) {
        var _this = this;
        this.name = name;
        this.id = id;
        this.lvl = 0;
        this.size = 60;
        this.r = this.size * 0.8;
        this.x = xPos;
        this.y = yPos;
        this.mX = this.x;
        this.mY = this.y - 1;
        this.rad = 0;
        this.fx = 0;
        this.fy = 0
        this.hp = 100;
        this.skin = skin;
        this.visible = false;

        if (this.skin in imgSkin) {
            this.img = new Image();
            this.imgLoad = false;
            this.img.src = imgSkin[this.skin];
            this.img.onload = function () {
                _this.imgW = _this.size * 5 / 4;
                _this.imgH = _this.imgW * _this.img.height / _this.img.width;
                //console.log(this.name +" IMG loaded");
                _this.imgLoad = true;
            };
        }
    }
    push(fx, fy) {
        this.fx += fx;
        this.fy += fy;
    }
    update() {
        var frad = Math.atan2(this.fy, this.fx);
        var dist = Math.sqrt(this.fx * this.fx + this.fy * this.fy);
        for (var i = 0; i < numberPolyY; i++) {
            for (var j = 0; j < numberPolyX; j++) {
                if (!polygonArray[i][j].filled) continue;
                if (Math.sqrt((polygonArray[i][j].x - this.x) * (polygonArray[i][j].x - this.x)
                    + (polygonArray[i][j].y - this.y) * (polygonArray[i][j].y - this.y)) > polySize * 2) continue;
                for (var k = 0; k < numberOfSides; k++) {
                    while (dist > 0 && circleDistFromLineSeg({ x: this.x + dist * Math.cos(frad), y: this.y + dist * Math.sin(frad) }
                        , { p1: polygonArray[i][j].p[k], p2: polygonArray[i][j].p[k + 1] }) < this.r / 2) {
                        var rrad = Math.atan2(polygonArray[i][j].y - this.y, polygonArray[i][j].x - this.x);
                        //var rrad = Polygon.pr[k]* 180 / Math.PI;
                        this.x -= Math.cos(rrad);
                        this.y -= Math.sin(rrad);
                        //frad = Polygon.pr[k]*2-frad;
                        dist --;
                        if (dist <= 0) {
                            dist = 0; break;
                        }
                    }
                }
            }
        }
        this.x += dist * Math.cos(frad);
        this.y += dist * Math.sin(frad);
        this.fx = 0;
        this.fy = 0;

        var deltaX = this.mX - this.x;
        var deltaY = this.mY - this.y;
        this.rad = Math.atan2(deltaY, deltaX) + Math.PI / 2;
    }
    draw(canvas) {
        if (!this.visible) return;

        var ctx = canvas.getContext("2d");

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rad);

        if (this.skin in imgSkin) {
            if (this.imgLoad) ctx.drawImage(this.img, -this.imgW / 2, -this.imgH / 2, this.imgW, this.imgH);
        }
        else {
            ctx.fillStyle = '#C0C0C0';
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2 - this.size / 5);
            ctx.lineTo(0, this.size / 3 - this.size / 5);
            ctx.lineTo(0 - this.size / 1.8, this.size / 1.5 - this.size / 5);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#808080';
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2 - this.size / 5);
            ctx.lineTo(0, this.size / 3 - this.size / 5);
            ctx.lineTo(this.size / 1.8, this.size / 1.5 - this.size / 5);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();

        /*ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.mX,this.mY,10,0,2*Math.PI);
        ctx.stroke();*/
    }
    drawText(canvas) {
        if (!this.visible) return;
        var ctx = canvas.getContext("2d");

        var hpl = 500;
        var wp = (this.hp%hpl) * 0.2, hi = 6, fs = 20;
        ctx.fillStyle = '#DC143C';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x + wp, this.y + this.size + fs / 3);
        ctx.lineTo(this.x - wp, this.y + this.size + fs / 3);
        ctx.lineTo(this.x - wp, this.y + hi + this.size + fs / 3);
        ctx.lineTo(this.x + wp, this.y + hi + this.size + fs / 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold " + fs + "px Arial";
        ctx.textAlign = "right";
        if(this.hp>=hpl)ctx.fillText(Math.floor(this.hp/hpl),this.x + wp, this.y + this.size + fs / 3+hi+fs);

        //canvas.style.letterSpacing = '2px';
        ctx.textAlign = "center";
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeText(this.name, this.x, this.y + this.size);
        ctx.fillStyle = 'white';
        ctx.fillText(this.name, this.x, this.y + this.size);
    }
}