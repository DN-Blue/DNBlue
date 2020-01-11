var OpenProgramWithName=function(str,directoryPath)
{
    var path=str;
    var wd=window.open('../../../../../'+directoryPath+'/'+path);
    wd.focus();
}

var OpenProgramWithPath=function(str)
{
    var path=str;
    var wd=window.open('../../../../../'+path);
    wd.focus();
}