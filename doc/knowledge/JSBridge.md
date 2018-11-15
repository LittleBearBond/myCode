# knowledge

## 基础

### JavaScript 调用 Native

[JavaScript 调用 Native](https://juejin.im/post/5abca877f265da238155b6bc)

    JavaScript 调用 Native 的方式，主要有两种：注入 API 和 拦截 URL SCHEME。

#### 注入API

    注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的

```swift
    JSContext *context = [uiWebView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    //挂在context对象上
    context[@"postBridgeMessage"] = ^(NSArray<NSArray *> *calls) {
        // Native 逻辑
    };
```

```js
//前端调用
window.postBridgeMessage(message);
```

#### 拦截 URL SCHEME

    URL SCHEME是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的，例如: qunarhy://hy/url?url=ymfe.tech，protocol 是 qunarhy，host 则是 hy。
    拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作