var Log=function(str)
{
    var Lines=document.getElementById('allLines');
    var innerHTML='<text class="line">'+str+'</text>'+'<br>';
    Lines.innerHTML= innerHTML + Lines.innerHTML;
}

var LogTittle=function(str)
{
    var Lines=document.getElementById('allLines');
    var innerHTML='<text class="tittle-line">'+str+'</text>'+'<br>';
    Lines.innerHTML= innerHTML + Lines.innerHTML;
}

var LogEnd=function()
{
    var Lines=document.getElementById('allLines');
    var innerHTML='<hr class="end-line"></hr>'+'<br>';
    Lines.innerHTML= innerHTML + Lines.innerHTML;
}

var Error=function(str)
{
    var Lines=document.getElementById('allLines');
    var innerHTML='<text class="error-line">'+str+'</text>'+'<br>';
    Lines.innerHTML= innerHTML + Lines.innerHTML;
}

var Command=class
{
    constructor(name,comment,method)
    {
        this.name=name;
        this.method=method;
        this.comment=comment;
    }
}








var commandList=[
    new Command('','write something to display',(str)=>{
        LogEnd();
        Log(str.substring(2,str.length));
    }),
    new Command('compileToJS','compile a .bs file to javascript',(str)=>{
        LogEnd();
        CompileAndShow(str.substring(13,str.length),ToJS);
    }),
    new Command('search',null,(str)=>{
        LogEnd();
        LogTittle('Search '+str);
        Search(str.substring(8,str.length));
    }),
    new Command('clear',null,(str)=>{
        var Lines=document.getElementById('allLines');
        Lines.innerHTML='';
    }),
    new Command('help',null,(str)=>{
        LogEnd();
        if (str!='/help/')
            Help(commandList,str);
        else
            Help(commandList,'all')
    }),
    new Command('open','open a program',(str)=>{
        LogEnd();
        LogTittle('open '+str.substring(6,str.length));
        OpenProgramWithName(str.substring(6,str.length),directoryPath);
    }),
    new Command('cd','change directory',(str)=>{
        LogTittle('cd to "'+str.substring(4,str.length)+'"');
        ChangeDirectoryTo(str.substring(4,str.length),()=>{
            Error('folder not found');
        });

    }),
    new Command('ide','open ide',()=>{
        OpenProgramWithPath('GUI/Desktop/Program/LocalPrograms/IDE/app.html');
    }),
    new Command('paint','open ide',()=>{
        OpenProgramWithPath('GUI/Desktop/Program/LocalPrograms/Paint/app.html');
    }),
    new Command('terminal','open ide',()=>{
        OpenProgramWithPath('GUI/Desktop/Program/LocalPrograms/Terminal/app.html');
    }),
    new Command('searchTool','open ide',()=>{
        OpenProgramWithPath('GUI/Desktop/Program/LocalPrograms/SearchTool/app.html');
    }),
    new Command('desktop','open ide',()=>{
        OpenProgramWithPath('GUI/Desktop/Desktop.html');
    })
];

var StartMethod=function(str,i)
{
    commandList[i].method(str);
}

var StartExtendedMethod=function(str,i)
{
    extendedCommands[i](str.substring(extendedCommandNames[i].length+2,str.length));
}

var commandIndex;
var isEx=false;

var isError2=function(commandName)
{
    commandIndex=null;
    for(var i=0;i<commandList.length;i++)
    if(commandList[i].name==commandName)
    {
        isEx=false;
        commandIndex=i;
        break;
    }
    return (commandIndex==null);
}

var isError3=function(commandName)
{
    commandIndex=null;
    for (var i=1;i<extendedCommandNames.length;i++)
    {
        if (commandName==extendedCommandNames[i])
        {
            isEx=true;
            commandIndex=i;
            break;
        }
    }

    return (commandIndex==null);
}

var SearchCommand=function(str)
{
    var commandName='';
    var start=0;
    for(var i=0;i<str.length;i++)
    {
        if(str[i]=='/')break;
        start=i;
    }
    for(var i=start+1;i<str.length;i++)
    {   
        if(str[i]=='/')break;
        commandName+=str[i];
    }

    if(isError2(commandName)&&isError3(commandName))
        Error("Can't find "+'"'+commandName+'"'+" !");

    return commandIndex;
}

var isError1=function(str)
{
    var d=0;
    for(var i=0;i<str.length;i++)
        if(str[i]=='/')d++;
    return (d<2)
}

var reset=function()
{
    commandIndex=null;
}

var RunCommand=function(str)
{
    reset();
    if(!isError1(str))
    {

        var commandIndex=SearchCommand(str);
        
        if (commandIndex!=null)
            if(isEx==false)
                StartMethod(str,commandIndex);
            else
                StartExtendedMethod(str,commandIndex);

    }
}