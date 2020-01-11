var Search=function(keyWord)
{
    var url='https://www.google.com/search?q='+keyWord;
    var wd=window.open(url,'_blank');
    wd.focus();
}


