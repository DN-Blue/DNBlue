var Page=class
{
    constructor(start,end)
    {
        this.start=start;
        this.end=end;
    }
}
var Pages=[
    new Page(0,3),
    new Page(4,7)
];

var Help=function(commandList,str)
{
    var e=commandList.length-1;
    var s=0;
    if(str!='all')
    {
        var index=parseInt(str.substring(6,str.length));
        console.log(Pages[index]);
        e=Pages[index].end;
        s=Pages[index].start;
    }
    for(var i=e;i>=s;i--)
    if (commandList[i]!=null)
    {
        var Lines=document.getElementById('allLines');
        var comment=commandList[i].comment;
        if (comment==null)
            comment='';
        else
            comment='('+comment+')';
        var innerHTML='<text style="padding-left: 5px;font-size: 15px;color: rgb(153, 176, 255);font-family: cursive;"> ['+String(i)+']:</text>';
        var innerHTML2='<text style="padding-left: 5px;font-size: 15px;color: rgb(194, 195, 72);font-family: cursive;">'+'/'+commandList[i].name+'/'+'</text>';
        var innerHTML3='<text style="padding-left: 5px;font-size: 15px;color: rgb(90, 72, 86);font-family: cursive;">'+comment+'</text>';
        Lines.innerHTML= innerHTML+innerHTML2+innerHTML3 + '<br>' + Lines.innerHTML;
    }
}