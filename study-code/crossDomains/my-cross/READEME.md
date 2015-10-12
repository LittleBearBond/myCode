#跨域通信文档
在线地址：https://www.zybuluo.com/xj3614/note/191940
高级浏览器使用html5高级APIpostMessage，低版本浏览器使用setInterval 监听hash变化

运行demo需要先绑定host 10.155.114.106 static.koolearn.com
10.155.114.106为我本机的ip，我在我的机器上部署了几个跨域的页面进行测试

主要有三个页面一个是`main.html`、`iframe1`、`iframe2`三个页面，分别部署在不同的地方，本机模拟设置端口不一样来模拟跨域

>三个页面的地址
>http://10.155.114.106:8000/study-code/crossDomains/my-cross/main.html
>http://static.koolearn.com:8081/my-code/myCode/study-code/crossDomains/my-cross/iframe1.html
>http://static.koolearn.com:8088/test-page/iframe2.html

##main.html 主页面

主页面有两个iframe页面，分别是iframe1和iframe2，均是跨域子页面

主页面和两个子页面进行通信非常简单，页面先引入我们的message.js
然后编写如下js代码如下：

```js
/**
 * 初始话一个messnger实例对象，必须指定Messenger的名字
 * parent 当前对象的name
 * MessengerDemo项目名字 这个参数可以不传
 * @type {Messenger}
 */
var messenger = new Messenger('parent', 'MessengerDemo'),
    //js取到iframe1对象
    iframe1 = document.getElementById('iframe1'),
    //js取到iframe2对象
    iframe2 = document.getElementById('iframe2');
    
    //添加监听函数，主要是用于接收子页面向本页面发送的信息
    messenger.listen(function(msg) {
        console.log(msg);
    });
    
    //把获取到的两个iframe添加到 messenger对象
    messenger.addTarget(iframe1.contentWindow, 'iframe1');
    messenger.addTarget(iframe2.contentWindow, 'iframe2');
    
    /**
     * 向子页面发送信息，发送消息调用该方法
     * @param  {string} name 开始指定的名字  iframe1、iframe2
     * @return {undefined} 
     */
    function sendMessage(name) {
        messenger.targets[name].send("message from parent: " + msg);
    }

```

##iframe1 
这个页面和mian.html主页页面通信，同时也可以和iframe2通信
先引入message.js
然后编写如下js代码：

```js
    //同理创建一个Messenger实例对象，指定name为iframe1，项目名称为MessengerDemo
    var messenger = new Messenger('iframe1', 'MessengerDemo');

     //添加监听响应函数，接收其他页面发送来的消息
     messenger.listen(function(msg) {
         console.log(msg);
     });
        
    //添加消息对象，主页面。制定name为parent
     messenger.addTarget(window.parent, 'parent');
    
    //主页面上的iframe2，指定name为iframe2
     messenger.addTarget(window.parent.frames[1], 'iframe2');

     function sendMessage(name) {
         messenger.targets[name].send("message from iframe1: " + msg);
     }
```


##iframe2
同iframe1步骤一样
最后js代码如下

```js
    var messenger = new Messenger('iframe2', 'MessengerDemo');;

     messenger.listen(function(msg) {
        console.log(msg)
     });

     messenger.addTarget(window.parent, 'parent');
     messenger.addTarget(window.parent.frames[0], 'iframe1');

     function sendMessage(name) {
         messenger.targets[name].send("message from iframe2: " + msg);
     }
```

[demo地址](http://10.155.114.106:8000/study-code/crossDomains/my-cross/main.html)
