
var CheckIfFolderIsExist=function(path,Error)
{
    if(directoryPath!='')
        path=directoryPath+'/'+path;
    console.log('p:',path);
    var url=window.location.origin+'?behavior=checkExist&path='+path+'&pass=14112005';

    var req = new XMLHttpRequest();
    req.onload=function(){
        console.log(req.status);
        if(req.status==605)
        {
            directoryPath=path;
            console.log('d:',directoryPath);
            UpdateDirectoryText(directoryPath);
            console.log('exist');

        }
        if(req.status==404)
        {
            Error();
            console.log('not exist');

        }
    }
    req.open('HEAD', url, true);
    req.send();
}


var ChangeDirectoryTo=function(path,Error){
    if(path!='..')
    {
        CheckIfFolderIsExist(path,Error);
        
    }
    else
    {
        DownDirectory();
    }
}

var directoryPath='';

var DownDirectory=function(){
  var end=directoryPath.length-1;

  for(var i=end; i>=0 ;i--)
  {
    end=i;
    if(directoryPath[i]=='/')
      break;
  }
  directoryPath=directoryPath.substring(0,end);
  UpdateDirectoryText(directoryPath);
}



var UpdateDirectoryText=function(url){
    var directoryText=document.getElementById('directory-name-text');
    
    directoryText.textContent='System/'+url;
    if(directoryText.textContent!='System/')
        directoryText.textContent+='/';
}
