var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');





const pass='14112005';




var CheckExist=function(query,response){
    console.log('check/'+query.path+'/');
    if(fs.existsSync(query.path))
    {
        response.writeHead(605);
        response.end();
        console.log('exist');
    }
    else    
    {
        response.writeHead(404);
        response.end();
        console.log('not exist');
    }
    console.log('end check');
}



var SaveFile=function(query)
{
    try
    {
        var data=query.filedata;
        var thispath=query.path;
        console.log(thispath,' ',data);
        if(fs.existsSync(thispath))
        fs.writeFile(
            thispath,
            data,
            function (err) {
                if (err) throw err;
                console.log('Saved!');
            }
        );

    }
    catch
    {

    }
}


var CMDAppendFile=function(query)
{
    try
    {
        var data=query.filedata;
        var thispath=query.path;
        if(fs.existsSync(thispath))
        {
            var fileText='';
            fs.readFile(thispath, 'utf8', function(err, contents) {
                fileText+=contents;
                fileText=fileText.substring(0,fileText.length-2);
                if (query.str=='false')
                    fileText+=','+data;
                else
                    fileText+=',"'+data+'"';
                fileText+='];';
                fs.writeFile(
                    thispath,
                    fileText,
                    function (err) {
                        if (err) throw err;
                    }
                );
            });

        }

    }
    catch
    {

    }
}


var TestQuery=function(query,response){
    
    if(query.pass!=null)
    if(query.pass==pass)
    {
        if(query.behavior=='saveFile')
        {
            console.log('saveFile');
            SaveFile(query);
        }
        if(query.behavior=='cmdAppendFile')
        {
            console.log('cmdAppendFile');
            CMDAppendFile(query);
        }
        if(query.behavior=='checkExist')
        {
            CheckExist(query,response);
        }
    }

}



http.createServer(function (request, response) {

    var query=url.parse(request.url,true).query;

    TestQuery(query,response);


    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                    console.log(content,filePath);
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8000);











