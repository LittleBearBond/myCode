var path = require('path');

    /*
    var url1 = path.normalize('a/b/c/../user/vajoy/bin');
    var url2 = path.normalize('a/b/c///../user/vajoy/bin/');
    var url3 = path.normalize('a/b/c/../../user/vajoy/bin');
    var url4 = path.normalize('a/b/c/.././///../user/vajoy/bin/..');
    var url5 = path.normalize('a/b/c/../../user/vajoy/bin/../../');
    var url6 = path.normalize('a/../../user/vajoy/bin/../../');
    var url7 = path.normalize('a/../../user/vajoy/bin/../../../../');
    var url8 = path.normalize('./au/.././ser/vajoy/bin/./');

    console.log('url1:',url1);  // a/b/user/vajoy/bin
    console.log('url2:',url2);  // a/b/user/vajoy/bin/
    console.log('url3:',url3);  // a/user/vajoy/bin
    console.log('url4:',url4);  // a/user/vajoy
    console.log('url5:',url5);  // a/user/
    console.log('url6:',url6);  // ../user/
    console.log('url7:',url7);  // ../../
    console.log('url8:',url8);  // user/vajoy/bin/
    */


// var url3 = path.join('a', '../../', {}, 'vajoy', '..');

// console.log('url1:', path.join('////./a', 'b////c', 'user/', 'vajoy', '..')); // \a\b\c\user
//console.log('url2:', path.join('a', '../../', 'user/', 'vajoy', '..')); // ..\user
//console.log('url3:', url3); // 存在非路径字符串，故抛出异常
 console.log(path.resolve('./'))
