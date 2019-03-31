# xx经历

- [百度、有赞、阿里前端面试总结](https://mp.weixin.qq.com/s/gcG-JL3wt0-Aexwt5nV99g)
- [2018头条春招前端实习生面试题目总结](https://juejin.im/post/5adc5d2f51882567183eb4a9)
- [1月前端面试记](https://juejin.im/post/587dab348d6d810058d87a0a)
- [前端最全知识点](https://juejin.im/entry/59a1a3e25188252444425aee)
- [一年前端面试打怪升级之路](https://juejin.im/post/5a98a8be518825556140ad4c)
- [2017、2018面试分享（js面试题记录）](https://segmentfault.com/a/1190000013827826)
- [3月web前端面试小结 | 掘金技术征文](https://juejin.im/post/5abb44c06fb9a028df22ab37)
- [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)

## 30秒系列

- [30秒JS-多看多学很多高级的写法](https://github.com/30-seconds/30-seconds-of-code)
- [30秒React](https://github.com/30-seconds/30-seconds-of-react)
- [30秒css](https://30-seconds.github.io/30-seconds-of-css/)
- [30秒面试](https://30secondsofinterviews.org/)
- [面试 30 秒翻译](https://github.com/Yangfan2016/learn-translate/blob/master/3-30secondsofinterviews_zh.md)

## 题目系列

- [2018美团前端面试题](https://juejin.im/post/5a96c6326fb9a063626408c8)
- [面试分享：2018阿里巴巴前端面试总结(题目+答案)](https://blog.ihoey.com/posts/Interview/2018-02-28-alibaba-interview.html)
- [Web前端年后跳槽面试复习指南](http://www.jackpu.com/nian-hou-fu-xi-zhi-nan/)
- [饥人谷2018前端面试押题（讲义）](https://zhuanlan.zhihu.com/p/34536462)
- [前端面试题总结](https://segmentfault.com/a/1190000014401170?utm_source=index-hottest)
- [jsliang 的 2019 面试准备](https://juejin.im/post/5c8e4cd3f265da67c87454a0)

## 最棒的 JavaScript 学习指南（2018版）

[](http://www.cnblogs.com/lhb25/p/javascript-book-2018.html)

## JavaScript 基础

## NODE

## 正则表达式

```js
    //候选
    /(red|black)/
    //非捕获性分组
    /#(?:\d+)/
    //前瞻
    /bed(?=room)/
    /*正则表达式  边界
    ^     行开头
    $     行结尾
    \b    单词的边界
    \B    非单词的边界
    */
    //反向引用
    //回溯
    //贪婪
    //懒惰（非贪婪）
```

## 移动端

[浅谈混合应用的演进](https://juejin.im/post/5b189fc9f265da6e326c5104)

## 性能优化

[2018 前端性能优化清单](https://juejin.im/post/5a966bd16fb9a0635172a50a)

## 前端监控

[监控](http://rapheal.sinaapp.com/2014/11/06/javascript-error-monitor/?f=http://blogread.cn/)

```javascript
window.onerror = function(msg,url,line,col,error){
    //没有URL不上报！上报也不知道错误
    if (msg != "Script error." && !url){
        return true;
    }
    //采用异步的方式
    //我遇到过在window.onunload进行ajax的堵塞上报
    //由于客户端强制关闭webview导致这次堵塞上报有Network Error
    //我猜测这里window.onerror的执行流在关闭前是必然执行的
    //而离开文章之后的上报对于业务来说是可丢失的
    //所以我把这里的执行流放到异步事件去执行
    //脚本的异常数降低了10倍
    setTimeout(function(){
        var data = {};
        //不一定所有浏览器都支持col参数
        col = col || (window.event && window.event.errorCharacter) || 0;
        data.url = url;
        data.line = line;
        data.col = col;
        if (!!error && !!error.stack){
            //如果浏览器有堆栈信息
            //直接使用
            data.msg = error.stack.toString();
        }else if (!!arguments.callee){
            //尝试通过callee拿堆栈信息
            var ext = [];
            var f = arguments.callee.caller, c = 3;
            //这里只拿三层堆栈信息
            while (f && (--c>0)) {
               ext.push(f.toString());
               if (f  === f.caller) {
                    break;//如果有环
               }
               f = f.caller;
            }
            ext = ext.join(",");
            data.msg = ext;
        }
        //把data上报到后台！
    },0);
    return true;
};
```

## 数据可视化

## 算法

## 前端安全

    xss crsf

## 数组

[](https://www.jianshu.com/p/66b04163948b)
[](https://juejin.im/entry/5a406b88f265da430d583cf1)

## 基础

### script async defer

    defer: HTML 4.0 规范，其作用是，告诉浏览器，等到 DOM+CSSOM 渲染完成，再执行指定脚本。有顺序，阻塞DOMContentLoaded。能够保证脚本下载顺序。
    async: HTML 5 规范，其作用是，使用另一个进程下载脚本，下载时不会阻塞渲染，并且下载完成后立刻执行。不会阻塞DOMContentLoaded，和defer同事存在的时候，优先级高于defer。不能保证脚本下载顺序
