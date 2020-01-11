
var RunProgram=function(path)
{
    console.log('Run Program '+path);
    var wd = window.open(path,'_blank');
    wd.focus();
}

var programs=['Program\\LocalPrograms\\IDE\\app.html','Program\\LocalPrograms\\Setting\\app.html','Program\\LocalPrograms\\SearchTool\\app.html','Program\\LocalPrograms\\Image\\app.html','Program\\LocalPrograms\\Paint\\app.html','Program\\LocalPrograms\\Terminal\\app.html'];
var index=0;

var OnProgramButtonClicked=function(i)
{
    

    var button = document.getElementById('button'+i);
    button.style.borderColor='#386f94';

    RunProgram(programs[parseInt(i)-1]);

    setTimeout(() => {
        button.style.borderColor='white';
    }, 100);

}

