
class Paint
{
    constructor()
    {
        this.canvas=document.querySelector('#board');
        this.canvas.height=window.innerHeight*0.7;
        this.canvas.width=window.innerWidth*0.7;
        this.ctx=this.canvas.getContext('2d');
        this.lineWidth=10;
        this.tool='pen';
        this.drawing=false;
        this.color='#000000';
        this.startDraw=true;

        this.allImgs=[new Image];
        this.imgIndex=0;
        this.lastImgIndex=0;

        this.canvas.addEventListener('mousedown',()=>{this.mousedown();});
        this.canvas.addEventListener('mouseup',()=>{this.mouseup();});
        this.canvas.addEventListener('mousemove',(event)=>{
            if(this.drawing)
                this.Draw(event);
        });
    }


    mousedown(){
        this.lastImgIndex=this.imgIndex;
        this.drawing=true;this.startDraw=true;
        this.imgIndex++;
        this.allImgs[this.imgIndex]=new Image;
        this.allImgs[this.imgIndex].src=this.canvas.toDataURL('image/bmp',1.0);
    }


    mouseup(){
        this.lastImgIndex=this.imgIndex;
        this.drawing=false;
        this.allImgs[this.imgIndex]=new Image;
        this.allImgs[this.imgIndex].src=this.canvas.toDataURL('image/bmp',1.0);
    }


    fillSQ(){
        this.ctx.fillStyle='#FFFFFF';
        this.ctx.fillRect(0, 0, window.innerWidth*0.7,window.innerHeight*0.7);
    }

    undo()
    {
        if (this.imgIndex>0)
        {
            this.fillSQ();
            this.imgIndex--;
            this.ctx.drawImage(this.allImgs[this.imgIndex],0,0,window.innerWidth*0.7,window.innerHeight*0.7);
        }
    }

    redo()
    {
        if (this.imgIndex<this.lastImgIndex)
        {
            this.fillSQ();
            this.imgIndex++;
            this.ctx.drawImage(this.allImgs[this.imgIndex],0,0,window.innerWidth*0.7,window.innerHeight*0.7);
        }
    }


    Draw(e){
        if(this.tool=='pen')
        {
            if(!this.startDraw)
            {
                
                this.ctx.lineWidth=this.lineWidth;
                this.ctx.lineCap='round';
                this.ctx.lineTo(e.clientX,e.clientY);
                this.ctx.strokeStyle=this.color;
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(e.clientX,e.clientY);
            }
            else
            {
                this.ctx.moveTo(e.clientX,e.clientY);
                this.startDraw=false;
            }
        }

    }

}

var p=new Paint();


var ChangeColor=function()
{
    console.log('change');
    var red=document.getElementById("red").value;if(red=='')red='0';
    var green=document.getElementById("green").value;if(green=='')green='0';
    var blue=document.getElementById("blue").value;if(blue=='')blue='0';
    console.log('change',red,green,blue);
    p.color='rgb('+red+','+green+','+blue+')';
    p.ctx.fillStyle=p.color;
}