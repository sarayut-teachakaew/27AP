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
        this.restart();
        this.TS = 0 ;
        this.hardness = hardness;
        this.delTime = delTime;
        this.r = 0;
    }
    restart(){
        this.start = 1;
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

        if(this.start>0){
            this.start--;
            var dist =  Math.sqrt(this.sx * this.sx + this.sy * this.sy)*1.5;
            var speedR = Math.min(this.r,Math.max(this.r/(dist*0.1),0.5));
            ctx.beginPath();
            ctx.arc(this.x-this.sx, this.y-this.sy, speedR, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }else{
            var dist =  Math.sqrt(this.sx * this.sx + this.sy * this.sy)*1.5;
            var speedR = Math.min(this.r,Math.max(this.r/(dist*0.1),0.5));
            ctx.beginPath();
            ctx.ellipse(this.x-this.sx/2, this.y-this.sy/2, Math.max(dist,speedR),speedR , Math.atan2(this.sy, this.sx), 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }
}