# knowledge

## http https http2

    expires
    Cache-Control
	Last-Modified，If-Modified-Since
    ETag、If-None-Match

    HTTPS（全称：Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道。即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL

    1. HTTPS需要多次握手，因此网络耗时变长，用户从HTTP跳转到HTTPS需要一些时间；
    2. HTTPS要做RSA校验，这会影响到设备性能；
    3. 所有CDN节点要支持HTTPS，而且需要有极其复杂的解决方案来面对DDoS的挑战。

### https

[大型网站的HTTPS实践（一）---HTTPS协议和原理](http://blog.csdn.net/luocn99/article/details/45460673)

[SSL/TLS 握手过程详解](https://www.jianshu.com/p/7158568e4867)

[HTTPS的工作原理](https://www.cnblogs.com/ttltry-air/archive/2012/08/20/2647898.html)

### http1.1 http2 http3

[http2 http3](https://segmentfault.com/a/1190000018401534?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

### http缓存

[HTTP 缓存——从请求到响应过程的一切](https://juejin.im/post/58b7850ba22b9d005ecd6243)

[浏览器缓存知识小结及应用](http://www.cnblogs.com/lyzg/p/5125934.html#top)

[《图解HTTP》知识点摘录](https://juejin.im/post/5aa62f93f265da23906ba830)

### Expires Cache-Control

    Expires 较老的强缓存管理header，随意修改下客户端时间，就能影响缓存命中的结果

    http1.1的时候，提出了一个新的header，就是Cache-Control，这是一个相对时间，在配置缓存的时候，以秒为单位，用数值表示，如：Cache-Control:max-age=315360000

    Cache-Control描述的是一个相对时间，在进行缓存命中的时候，都是利用客户端时间进行判断，所以相比较Expires，Cache-Control的缓存管理更有效，安全一些，Expires和Cache-Control同时存在时，Cache-Control优先级高于Expires

### 协商缓存是利用的是【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】这两对Header来管理的

    Last-Modified，If-Modified-Since】都是根据服务器时间返回的header，一般来说，在没有调整服务器时间和篡改客户端缓存的情况下，这两个header配合起来管理协商缓存是非常可靠的，但是有时候也会服务器上资源其实有变化，但是最后修改时间却没有变化的情况，而这种问题又很不容易被定位出来，而当这种情况出现的时候，就会影响协商缓存的可靠性。所以就有了另外一对header来管理协商缓存，这对header就是【ETag、If-None-Match】

    协商缓存跟强缓存不一样，强缓存不发请求到服务器，所以有时候资源更新了浏览器还不知道，但是协商缓存会发请求到服务器，所以资源是否更新，服务器肯定知道。大部分web服务器都默认开启协商缓存，而且是同时启用【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】

### 缓存查找过程

    如果资源已经被浏览器缓存下来，在缓存失效之前，再次请求时，默认会先检查是否命中强缓存，如果强缓存命中则直接读取缓存，如果强缓存没有命中则发请求到服务器检查是否命中协商缓存，如果协商缓存命中，则告诉浏览器还是可以从缓存读取，否则才从服务器返回最新的资源。这是默认的处理方式，这个方式可能被浏览器的行为改变：
