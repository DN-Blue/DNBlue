
var appendFileText=function(str,path,strb)
{
    var xhr = new XMLHttpRequest();
    str=encodeURIComponent(str);
    var url = window.location.href+"?behavior=cmdAppendFile&pass=14112005&filedata=" + str + "&path=" + path+"&str="+strb;
    console.log(url);
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        }
    };
    xhr.send();
}.toString();



var allLibs=[
    "function write(str){document.getElementById('allLines').innerHTML+='<text class="+'"line"'+">'+str.toString()+'</text>';}",
    "function writeln(str){document.getElementById('allLines').innerHTML+='<text class="+'"line"'+">'+str.toString()+'</text><br>';}",
    "function clear(){document.getElementById('allLines').innerHTML='';}",
    '\nvar appendFileText='+appendFileText+"\nfunction newTerminalCommand(commandMethod,Cname){var str=commandMethod.toString();var text=str;appendFileText(text,'GUI/Desktop/Program/LocalPrograms/Terminal/commands/ExtendedCommands.js','false');appendFileText(Cname,'GUI/Desktop/Program/LocalPrograms/Terminal/commands/ExtendedCommandNames.js','true');}",
    "function desktop(){window.open(window.location.origin+'/GUI/Desktop/Desktop.html');}"
];


function isWord(c)
{
    return  (
        ( (c>='0')&&(c<='9') )    ||
        ( (c>='a')&&(c<='z') )    ||
        ( (c>='A')&&(c<='Z') )    
        
        )
}



class Variable{
    constructor(name,parent,child)
    {
        this.name=name;
        this.parent=parent;
        this.child=child;
    }
}


function SearchVar(name,parent)
{
    var result=0;
    for(var i=0;i<parent.child.length;i++)
    {
        if (name==parent.child[i].name)
            result++;
    }
    return result;
}

function isCreation(name)
{
    return (SearchVar(name,mainVar)==0);
}

var mainVar=new Variable('main','*',[]);




var Librarys=['console','system.console','desktop','write','writeln','clear','newTerminalCommand','newLine','Log','LogEnd','LogTittle','Error','toString'];


var defaultCommands=['for','while','if','else','this','return'];
var commands=['for','while','if','else','this','return'];
var newMethodForLibrary=(allLines,i)=>{
    return allLines[i]+';';
}
var newMethodForCommand=(allLines,i)=>{
    return allLines[i];
}
var newMethodForCommandWithSC=(allLines,i)=>{
    return allLines[i]+';';
}
var AddVarTextForCommand=[
    (allLines,i)=>{
        var str=allLines[i];
        var bracket=0;
        while((str.indexOf('  ')>=0)&&(str.indexOf('  ')<str.length))
            str=str.replace('  ',' ');
        for(bracket=0;bracket<str.length;bracket++)
        {
            if(str[bracket]=='(')
                break;
        }
        var sc=bracket;
        if (i==0)
            {
                var r=str.substring(0,bracket+1)+'var '+str.substring(bracket+1,str.length);
                str=r;
                sc+=4;
            }
            else
            {
                var Var='';
                for(var j=bracket+1;j<str.length;j++)
                {
                    if(!isWord(str[j]))
                        break;
                    Var+=str[j];
                }
                var needAddVarText=true;
                for(var j=i-1;j>=0;j--)
                {
                    if(Var==GetVar(allLines,j))
                        needAddVarText=false;
                }
                if(needAddVarText)
                {
                    var r=str.substring(0,bracket+1)+'var '+str.substring(bracket+1,str.length);
                    str=r;
                    sc+=4;
                }
            }

        for(var j=sc+1;j<str.length;j++)
        {
            if(str[j]==' ')
            {
                str=str.substring(0,j)+';'+str.substring(j+1,str.length);
            }
        }

        return str;
    },
    newMethodForCommand,
    newMethodForCommand,
    newMethodForCommand,
    newMethodForCommandWithSC,
    newMethodForCommandWithSC
];

var commandIndex;
function isCommand(str)
{
    var result=false;
    for (var i=0;i<commands.length;i++)
    {
        if (str==commands[i])
        {
            commandIndex=i;
            result=true;
            break;
        }
    }
    return result;
}


var AddLibrarysToCommands=function(list2)
{
    var l1=commands.length;
    for(var i=0;i<list2.length;i++)
    {
        AddVarTextForCommand[l1+i]=newMethodForLibrary;
        commands[l1+i]=list2[i];
    }
}


function reset()
{
    mainVar=new Variable('main','*',[]);
    spaceCount=[];
    isCommands=[];
    isHaveDot=false;
    commands=defaultCommands;
}



var spaceCount=[];
var isCommands=[];
var isHaveDot=false;
var GetVar=function(allLines,j)
{
    var str=allLines[j];
    var result='';
    var names=[''];
    var Nindex=0;
    for(var i=spaceCount[j];i<str.length;i++)
    {
        if(str[i]=='.')
        {
            isHaveDot=true;
            Nindex++;
            names[Nindex]='';
        }
        if(!isWord(str[i])&&str[i]!='.')
            break;
        if(str[i]!='.')
            names[Nindex]+=str[i];
    }
    result=names[0];
    for(var i=1;i<names.length-1;i++)
        result+='.'+names[i];
    return result;
}


var ToLineArray=function(str)
{
    var allLines=[];
    var index=0;
    var line='';
    for (var i=0;i<str.length;i++)
    {
        if(str[i]!='\n')
        {
            line+=str[i];
        }
        else
        {
            allLines[index]=line;
            index++;
            line='';
        }
    }

    allLines[index]=line;
    index++;

    return allLines;
}

var SpaceCount=function(str)
{
    var count=0;
    for (var i=0;i<str.length;i++)
        if (str[i]!=' ')break;
        else count++;
    return count;
}

var AddCurlyBrackets=function(allLines)
{
    for(var i=0;i<allLines.length;i++)
    {

        if(spaceCount[i+1]>spaceCount[i])
        {
            allLines[i+1]='{'+allLines[i+1];
            var close=i+1;
            for(var j=i+1;j<allLines.length;j++)
            {

                if(spaceCount[j]<=spaceCount[i])
                break;
                close=j;
            }

            allLines[close]+='}';
        }
    }
    return allLines;
}



var AddFunctionText=function(str)
{
    for(var i=0;i<str.length;i++)
    {
        if(str[i]=='(')
            break;
    }
    str=str.substring(0,i)+'function'+str.substring(i,str.length);
    return str;
}

var AddSemiColon=function(allLines)
{
    for(var i=0;i<allLines.length;i++)
    {
        var str=allLines[i];
        var needAddSemiColon=true;
        if (str[str.length-1]==')') 
            {
                if(i<allLines.length-1)
                    if(spaceCount[i]<spaceCount[i+1])
                    {   
                        needAddSemiColon=false;
                        if (!isCommands[i]) allLines[i]=AddFunctionText(allLines[i]);
                    }
            }
        if(!isWord(str[spaceCount[i]]))
            needAddSemiColon=false;
        
        if ((needAddSemiColon)&&!isCommands[i])
            allLines[i]+=';';        
    }

    return allLines;
}

var AddVarText=function(allLines)
{
    for(var i=allLines.length-1;i>=0;i--)
    {
        var Var=GetVar(allLines,i);
        if(isHaveDot)
        {
            isHaveDot=false;
        }
        else
            if(Var.length>0)
            {
                if(!isCommand(Var))
                {
                    isCommands[i]=false;
                    var minSpace=spaceCount[i];
                    var neesAddVarText=true;
                    for(var j=i-1;j>=0;j--)
                    {
                        if(spaceCount[j]<=minSpace)
                            {
                                if(spaceCount[j]<minSpace)
                                    minSpace=spaceCount[j];

                                var pos=(allLines[j].search(Var));
                                if(((pos>=0)&& !isWord(allLines[j][pos+1])&& !isWord(allLines[j][pos-1])&&(spaceCount[i]>spaceCount[j]))||
                                    (Var==GetVar(allLines,j)))
                                {
                                    neesAddVarText=false;
                                }
                               
                            }
                    }
                    if(neesAddVarText)
                    {
                        var space=SpaceCount(allLines[i]);
                        allLines[i]=allLines[i].substring( 0 , space) + 'var ' + allLines[i].substring(space,allLines[i].length);
                    }
                }
                else
                {
                    isCommands[i]=true;
                    allLines[i]=AddVarTextForCommand[commandIndex](allLines,i);
                }
            }
    }
    return allLines;
}


var GetSpaceCount=function(allLines)
{
    for(var i=0;i<allLines.length;i++)
    {
        spaceCount[i]=SpaceCount(allLines[i]);
        console.log('spaceCount:',spaceCount[i]);
    }
}

var ToJS=function(code)
{
    reset();

    AddLibrarysToCommands(Librarys);

    var result;

    console.log('before:',code);

    result=ToLineArray(code);

    GetSpaceCount(result);

    result=AddVarText(result);
    
    result=AddSemiColon(result);

    result=AddCurlyBrackets(result);

    console.log('then:',result);

    return result;
}
























