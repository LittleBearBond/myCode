# debug


## Inspector

Inspector 协议
HTTP 服务

## vscode 运行调试

>运行调试有一下输出：

    /usr/local/bin/node --inspect-brk=20702 test-index.js
    Debugger listening on ws://127.0.0.1:20702/303f2e95-ad0b-4c98-a5cf-b528ec761800
    For help, see: https://nodejs.org/en/docs/inspector
    Debugger attached.

## 127.0.0.1:20702/303f2e95-ad0b-4c98-a5cf-b528ec761800

WebSockets request was expected

## 127.0.0.1:20702/json

```json
[
    {
        "description": "node.js instance",
        "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:5493/655a23a8-987e-41d1-942d-5311cb56a02f",
        "devtoolsFrontendUrlCompat": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:5493/655a23a8-987e-41d1-942d-5311cb56a02f",
        "faviconUrl": "https://nodejs.org/static/favicon.ico",
        "id": "655a23a8-987e-41d1-942d-5311cb56a02f",
        "title": "test-index.js",
        "type": "node",
        "url": "file:///Users/little_bear/files/my-code/myCode/test-index.js",
        "webSocketDebuggerUrl": "ws://127.0.0.1:5493/655a23a8-987e-41d1-942d-5311cb56a02f"
    }
]
```

## 激活调试

node --inspect ./test-debug/index.js
