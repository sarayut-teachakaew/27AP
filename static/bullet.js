var sizeMax = 100;
var sizeMin = 4;
class Bullet {
    constructor(id, cid, dmg, x, y, sx, sy, hardness, delTime, bullets) {
        this.cid = cid;
        this.id = id;
        this.dmg = dmg;
        this.bullets = bullets;
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.hardness = hardness;
        this.delTime = delTime;
        this.r = 0;
    }
    update() {
        this.x += this.sx;
        this.y += this.sy;
        this.r = Math.min(sizeMax, this.hardness / 80 + sizeMin);
        if (this.delTime > 0) this.delTime -= Math.sqrt(this.sx * this.sx + this.sy * this.sy)+this.hardness/1000;
        if (this.hardness <= 0 || this.delTime <= 0) {
            this.bullets.splice(this.bullets.indexOf(this), 1);
            delete (this);
        }
    }
    draw(canvas, clr) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = clr;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}