const imgSkin = {"9gag":"/image/9gag.png"};
class Player {
    constructor(name,xPos, yPos,id,skin) {
        var _this = this;
        this.name=name;
        this.id= id;
        this.size=60;
        this.x=xPos;
        this.y=yPos;
        this.mX=this.x;
        this.mY=this.y-1;
        this.rad=0;
        this.fx=0;
        this.fy=0
        this.skin=skin;
        this.visible=false;
        if(this.skin in imgSkin){
            this.img = new Image();
            this.imgLoad=false;
            this.img.src = imgSkin[this.skin];
            this.img.onload = function() {
                _this.imgW = _this.size*5/4;
                _this.imgH = _this.imgW * _this.img.height / _this.img.width;
                //console.log(this.name +" IMG loaded");
                _this.imgLoad = true;
            };
        }
    }
    push(fx,fy){
        this.fx+=fx;
        this.fy+=fy;
    }
    update(){
        this.x+=this.fx;
        this.y+=this.fy;
        this.fx=0;
        this.fy=0;

        var deltaX = this.mX - this.x;
        var deltaY = this.mY - this.y;
        this.rad = Math.atan2(deltaY, deltaX) +Math.PI/2;
    }
    draw(canvas) {
        if(!this.visible)return;
        var ctx = canvas.getContext("2d");

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rad);

        if(this.skin in imgSkin){
            if(this.imgLoad)ctx.drawImage(this.img,-this.imgW/2, -this.imgH/2,this.imgW,this.imgH);
        }
        else{
            ctx.fillStyle = '#C0C0C0';
            ctx.beginPath();
            ctx.moveTo(0, -this.size/2);
            ctx.lineTo(0,this.size/3);
            ctx.lineTo(0-this.size/1.8,this.size/1.5);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#808080';
            ctx.beginPath();
            ctx.moveTo(0, -this.size/2);
            ctx.lineTo(0,this.size/3);
            ctx.lineTo(this.size/1.8,this.size/1.5);
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
        if(!this.visible)return;
        var ctx = canvas.getContext("2d");

        ctx.font = "bold 20px Arial";
        canvas.style.letterSpacing = '4px';
        ctx.textAlign = "center";
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText(this.name, this.x, this.y+this.size);
        ctx.fillStyle = 'white';
        ctx.fillText(this.name, this.x, this.y+this.size);
    }
}