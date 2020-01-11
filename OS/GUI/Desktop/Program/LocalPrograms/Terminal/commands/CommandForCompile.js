var publicPath;

function CompileAndShow(path,method){       //this will read file and send information to other function
    publicPath=path;
    var xmlhttp;
    var data;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();               
    }           
    else {               
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");               
    }

    xmlhttp.onreadystatechange = function () {               
        if (xmlhttp.readyState == 4) {                   
            data=(xmlhttp.responseText);
            allLines=method(data);
            for(var i=0;i<allLines.length;i++)
            {
                Log(allLines[i]);
            }
            path=publicPath;
            LogTittle('Compile "'+path+'" to JS:');
        }               
    }

    xmlhttp.open("GET", path, true);
    xmlhttp.send();    
    return data;
}
