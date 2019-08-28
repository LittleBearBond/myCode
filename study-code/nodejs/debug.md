# debug


## Inspector

Inspector 协议
HTTP 服务

## vscode 运行调试

### launch.json

// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${file}"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "test-index",
            "program": "${workspaceRoot}/test-index.js"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to process",
            "program": "5858"
        },
         {
            "type": "node",
            "request": "launch",
            "name": "Gulp task",
            "program": "${workspaceFolder}/node_modules/gulp/bin/gulp.js",
            "args": [
                "task"
            ]
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via NPM",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run-script",
                "debug"
            ],
            "port": 9229
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach by Process ID",
            "processId": "${command:PickProcess}"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to Remote",
            "address": "TCP/IP address of process to be debugged",
            "port": 9229,
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "Absolute path to the remote directory containing the program"
        },
    ]
}
```

通过vscode 调试node程序

>运行调试有一下输出：

    /usr/local/bin/node --inspect-brk=20702 test-index.js
    Debugger listening on ws://127.0.0.1:20702/303f2e95-ad0b-4c98-a5cf-b528ec761800
    For help, see: https://nodejs.org/en/docs/inspector
    Debugger attached.

### 127.0.0.1:20702/303f2e95-ad0b-4c98-a5cf-b528ec761800

WebSockets request was expected

### 127.0.0.1:20702/json

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

chrome://inspect--> Discover network targets Configure

chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:5493/655a23a8-987e-41d1-942d-5311cb56a02f
