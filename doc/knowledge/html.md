# html

[Prefetch Preload async defer](https://www.404forest.com/2017/09/27/use-code-splitting-with-prefetch-to-improve-spa-web-page-load-performance/)

## defer async

![defer async](https://pic4.zhimg.com/80/v2-b574cf32f8d968ec8546418eac91ac03_hd.png)

## Preload 与 prefetch

[Preload，Prefetch 和 Preconnect](https://juejin.im/post/5b5984b851882561da216311)

    Preload 与 prefetch 不同的地方就是它专注于当前的页面，并以高优先级加载资源，Prefetch 专注于下一个页面将要加载的资源并以低优先级加载。同时也要注意 preload 并不会阻塞 window 的 onload 事件

## prefetch

    延迟拉取，不要和首屏关键资源抢带宽，最好能在 onload 之后再拉取。
    无需执行，避免无谓损耗。使用 prefetch 声明的资源是对浏览器的提示，暗示该资源可能『未来』会被用到，适用于对可能跳转到的其他路由页面进行资源缓存。被 prefetch 的资源的加载时机由浏览器决定，一般来说优先级较低，会在浏览器『空闲』时进行下载。
    link prefetch <link rel="prefetch" href="/uploads/images/pic.png">
    dns-prefetch  <link rel="dns-prefetch" href="//cdn.domain.com">

## preload
