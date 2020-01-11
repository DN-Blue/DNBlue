var KeyDown=function(e)
{
    if(e.key=='Enter')
    {
        RunCommand(document.getElementById('input').value);
        document.getElementById('input').value='';
    }
}

