# window.performance
**window.performance** 提供了一组精确的数据，经过简单的计算就能得出一些网页性能数据。
配合上报一些客户端浏览器的设备类型等数据，就可以实现简单的统计！
兼容性在查看 [caniuse.com](http://caniuse.com/#search=Permissions%20API)

Performance API用于精确度量、控制、增强浏览器的性能表现。这个API为测量网站性能，提供以前没有办法做到的精度。

>   **navigationStart：**当前浏览器窗口的前一个网页关闭，发生unload事件时的Unix毫秒时间戳。如果没有前一个网页，则等于fetchStart属性。

>    **unloadEventStart：**如果前一个网页与当前网页属于同一个域名，则返回前一个网页的unload事件发生时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

>    **unloadEventEnd：**如果前一个网页与当前网页属于同一个域名，则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

>    **redirectStart：**返回第一个HTTP跳转开始时的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

>    **redirectEnd：**返回最后一个HTTP跳转结束时（即跳转回应的最后一个字节接受完成时）的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

>    **fetchStart：**返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。

>    **domainLookupStart：**返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

>    **domainLookupEnd：**返回域名查询结束时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

>    **connectStart：**返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。

>    **connectEnd：**返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。

>    **secureConnectionStart：**返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。

>    **requestStart：**返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。

>    **responseStart：**返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。

>    **responseEnd：**返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。

>    **domLoading：**返回当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

>    **domInteractive：**返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

>    **domContentLoadedEventStart：**返回当前网页DOMContentLoaded事件发生时（即DOM结构解析完毕、所有脚本开始运行时）的Unix毫秒时间戳。

>    **domContentLoadedEventEnd：**返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。

>    **domComplete：**返回当前网页DOM结构生成时（即Document.readyState属性变为“complete”，以及相应的readystatechange事件发生时）的Unix毫秒时间戳。

>    **loadEventStart：**返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。如果该事件还没有发生，返回0。

>    **loadEventEnd：**返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。如果该事件还没有发生，返回0。
    
###组合值的意义
>   DNS查询耗时 ：domainLookupEnd - domainLookupStart
    TCP链接耗时 ：connectEnd - connectStart
    request请求耗时 ：responseEnd - responseStart
    解析dom树耗时 ： domComplete - domInteractive
    白屏时间 ：responseStart - navigationStart
    domready时间 ：domContentLoadedEventEnd - navigationStart
    onload时间 ：loadEventEnd - navigationStart

```js
//http://www.alloyteam.com/2015/09/explore-performance/
// 获取 performance 数据
var performance = {
    // memory 是非标准属性，只在 Chrome 有
    // 财富问题：我有多少内存
    memory: {
        usedJSHeapSize: 16100000, // JS 对象（包括V8引擎内部对象）占用的内存，一定小于 totalJSHeapSize
        totalJSHeapSize: 35100000, // 可使用的内存
        jsHeapSizeLimit: 793000000 // 内存大小限制
    },

    //  哲学问题：我从哪里来？
    navigation: {
        redirectCount: 0, // 如果有重定向的话，页面通过几次重定向跳转而来
        type: 0 // 0   即 TYPE_NAVIGATENEXT 正常进入的页面（非刷新、非重定向等）
            // 1   即 TYPE_RELOAD       通过 window.location.reload() 刷新的页面
            // 2   即 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
            // 255 即 TYPE_UNDEFINED    非以上方式进入的页面
    },
    timing: {
        // 在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload 的时间戳，如果无前一个网页 unload ，则与 fetchStart 值相等
        navigationStart: 1441112691935,

        // 前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0
        unloadEventStart: 0,

        // 和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳
        unloadEventEnd: 0,

        // 第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0
        redirectStart: 0,

        // 最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0
        redirectEnd: 0,

        // 浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前
        fetchStart: 1441112692155,

        // DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupStart: 1441112692155,

        // DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupEnd: 1441112692155,

        // HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等
        // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间
        connectStart: 1441112692155,

        // HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等
        // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间
        // 注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过
        connectEnd: 1441112692155,

        // HTTPS 连接开始的时间，如果不是安全连接，则值为 0
        secureConnectionStart: 0,

        // HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存
        // 连接错误重连时，这里显示的也是新建立连接的时间
        requestStart: 1441112692158,

        // HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
        responseStart: 1441112692686,

        // HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
        responseEnd: 1441112692687,

        // 开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件
        domLoading: 1441112692690,

        // 完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件
        // 注意只是 DOM 树解析完成，这时候并没有开始加载网页内的资源
        domInteractive: 1441112693093,

        // DOM 解析完成后，网页内资源加载开始的时间
        // 在 DOMContentLoaded 事件抛出前发生
        domContentLoadedEventStart: 1441112693093,

        // DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）
        domContentLoadedEventEnd: 1441112693101,

        // DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件
        domComplete: 1441112693214,

        // load 事件发送给文档，也即 load 回调函数开始执行的时间
        // 注意如果没有绑定 load 事件，值为 0
        loadEventStart: 1441112693214,

        // load 事件的回调函数执行完毕的时间
        loadEventEnd: 1441112693215

        // 字母顺序
        // connectEnd: 1441112692155,
        // connectStart: 1441112692155,
        // domComplete: 1441112693214,
        // domContentLoadedEventEnd: 1441112693101,
        // domContentLoadedEventStart: 1441112693093,
        // domInteractive: 1441112693093,
        // domLoading: 1441112692690,
        // domainLookupEnd: 1441112692155,
        // domainLookupStart: 1441112692155,
        // fetchStart: 1441112692155,
        // loadEventEnd: 1441112693215,
        // loadEventStart: 1441112693214,
        // navigationStart: 1441112691935,
        // redirectEnd: 0,
        // redirectStart: 0,
        // requestStart: 1441112692158,
        // responseEnd: 1441112692687,
        // responseStart: 1441112692686,
        // secureConnectionStart: 0,
        // unloadEventEnd: 0,
        // unloadEventStart: 0
    }
};

/*具体的含义都在注释里说明了，接下来我们看下能用这些数据做什么？
使用 performance.timing 信息简单计算出网页性能数据
在注释中，我用【重要】标注了我个人认为比较有用的数据，用【原因】标注了为啥要重点关注这个数据*/

// 计算加载时间
function getPerformanceTiming() {
    var performance = window.performance;

    if (!performance) {
        // 当前浏览器不支持
        console.warn('你的浏览器不支持 performance 接口');
        return;
    }

    var t = performance.timing;
    var times = {};

    //【重要】页面加载完成的时间
    //【原因】这几乎代表了用户等待页面可用的时间
    times.loadPage = t.loadEventEnd - t.navigationStart;

    //【重要】解析 DOM 树结构的时间
    //【原因】反省下你的 DOM 树嵌套是不是太多了！
    times.domReady = t.domComplete - t.responseEnd;

    //【重要】重定向的时间
    //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
    times.redirect = t.redirectEnd - t.redirectStart;

    //【重要】DNS 查询时间
    //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
    // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

    //【重要】读取页面第一个字节的时间
    //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
    // TTFB 即 Time To First Byte 的意思
    // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
    times.ttfb = t.responseStart - t.navigationStart;

    //【重要】内容加载完成的时间
    //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
    times.request = t.responseEnd - t.requestStart;

    //【重要】执行 onload 回调函数的时间
    //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
    times.loadEvent = t.loadEventEnd - t.loadEventStart;

    // DNS 缓存时间
    times.appcache = t.domainLookupStart - t.fetchStart;

    // 卸载页面的时间
    times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart;

    return times;
}
```

##使用performance.getEntries() 获取所有资源请求的时间数据
浏览器获取网页时，会对网页中每一个对象（脚本文件、样式表、图片文件等等）发出一个HTTP请求。performance.getEntries方法以数组形式，返回这些请求的时间统计信息，有多少个请求，返回数组就会有多少个成员。
由于该方法与浏览器处理网页的过程相关，所以只能在浏览器中使用。
```js
//performance.getEntries()[0]
var entrie = {
    connectEnd: 9.458000015001744,
    connectStart: 9.458000015001744,
    domainLookupEnd: 9.458000015001744,
    domainLookupStart: 9.458000015001744,
    duration: 4.262000002199784,
    // 资源类型
    entryType: "resource",
    fetchStart: 9.458000015001744,
    /*link 即 <link> 标签
       script 即 <script>
       redirect 即重定向
       */
    // 谁发起的请求
    initiatorType: "link",
    // 资源名称，也是资源的绝对路径
    name: "http://10.155.114.55:8081/my-down-code/videojs-resolution-switcher-master/node_modules/video.js/dist/video-js.css",
    redirectEnd: 0,
    redirectStart: 0,
    requestStart: 11.03500000317581,
    responseEnd: 13.720000017201528,
    responseStart: 11.997000023256987,
    secureConnectionStart: 0,
    startTime: 9.458000015001744
}

// 计算加载时间
function getEntryTiming(entry) {
    var t = entry;
    var times = {};

    // 重定向的时间
    times.redirect = t.redirectEnd - t.redirectStart;

    // DNS 查询时间
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

    // 内容加载完成的时间
    times.request = t.responseEnd - t.requestStart;

    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart;

    // 挂载 entry 返回
    times.name = entry.name;
    times.entryType = entry.entryType;
    times.initiatorType = entry.initiatorType;
    times.duration = entry.duration;

    return times;
}

```

##使用 performance.now() 精确计算程序执行时间

performance.now() 与 Date.now() 不同的是，返回了以微秒（百万分之一秒）为单位的时间，更加精准。

并且与 Date.now() 会受系统程序执行阻塞的影响不同，performance.now() 的时间是以恒定速率递增的，不受系统时间的影响（系统时间可被人为或软件调整）。

注意 Date.now() 输出的是 UNIX 时间，即距离 1970 的时间，而 performance.now() 输出的是相对于 performance.timing.navigationStart(页面初始化) 的时间。

使用 Date.now() 的差值并非绝对精确，因为计算时间时受系统限制（可能阻塞）。但使用 performance.now() 的差值，并不影响我们计算程序执行的精确时间。
```js

// 计算程序执行的精确时间
function getFunctionTimeWithDate (func) {
    var timeStart = Data.now();

    // 执行开始
    func();
    // 执行结束
    var timeEnd = Data.now();

    // 返回执行时间
    return (timeEnd - timeStart);
}
function getFunctionTimeWithPerformance (func) {
    var timeStart = window.performance.now();

    // 执行开始
    func();
    // 执行结束
    var timeEnd = window.performance.now();

    // 返回执行时间
    return (timeEnd - timeStart);
}
```

##performance.navigation对象
除了时间信息，performance还可以提供一些用户行为信息，主要都存放在performance.navigation对象上面
###performance.navigation.type
该属性返回一个整数值，表示网页的加载来源，可能有以下4种情况：
>    0：网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载，相当于常数performance.navigation.TYPE_NAVIGATENEXT。

>    1：网页通过“重新加载”按钮或者location.reload()方法加载，相当于常数performance.navigation.TYPE_RELOAD。

>    2：网页通过“前进”或“后退”按钮加载，相当于常数performance.navigation.TYPE_BACK_FORWARD。

>    3：任何其他来源的加载，相当于常数performance.navigation.TYPE_UNDEFINED。
###performance.navigation.redirectCount
该属性表示当前网页经过了多少次重定向跳转。

##使用 performance.mark() 也可以精确计算程序执行时间

```js
function randomFunc (n) {
    if (!n) {
        // 生成一个随机数
        n = ~~(Math.random() * 10000);
    }
    var nameStart = 'markStart' + n;
    var nameEnd   = 'markEnd' + n;
    // 函数执行前做个标记
    window.performance.mark(nameStart);

    for (var i = 0; i < n; i++) {
        // do nothing
    }

    // 函数执行后再做个标记
    window.performance.mark(nameEnd);

    // 然后测量这个两个标记间的时间距离，并保存起来
    var name = 'measureRandomFunc' + n;
    window.performance.measure(name, nameStart, nameEnd);
}

// 执行三次看看
randomFunc();
randomFunc();
// 指定一个名字
randomFunc(888);

// 看下保存起来的测量 measure
var measure = window.performance.getEntriesByType('measure');
console.log(measure);
// 看下我们自定义的测量
var entries = window.performance.getEntriesByName('measureRandomFunc888');
console.log(entries);

// 清除指定标记
window.performance.clearMarks('markStart888');
// 清除所有标记
window.performance.clearMarks();
// 清除指定测量
window.performance.clearMeasures('measureRandomFunc');
// 清除所有测量
window.performance.clearMeasures();
```

##测量 domReady
```js
// 计算 domReady 时间
var t = performance.timing
var domReadyTime = t.domComplete - t.responseEnd;
console.log(domReadyTime)


window.performance.measure('domReady','responseEnd' , 'domComplete');
var domReadyMeasure = window.performance.getEntriesByName('domReady');
console.log(domReadyMeasure);
```
