class Player {
    constructor(name,xPos, yPos,id) {
        this.name=name;
        this.id= id;
        this.x=xPos;
        this.y=yPos;
        this.fx=0;
        this.fy=0
        this.visible=false;
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

    }
    draw(canvas) {
        if(!this.visible)return;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, 22, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = "20px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText(this.name,this.x,this.y+40);
    }
}