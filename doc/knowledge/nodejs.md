# nodejs

## 经典好文

[一篇文章构建你的 NodeJS 知识体系](https://juejin.im/post/5c4c0ee8f265da61117aa527)
[require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)
[进程通信](http://www.ayqy.net/blog/nodejs%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E4%BF%A1/)

## 全局变量

    __dirname：    获得当前执行文件所在目录的完整目录名
    __filename：   获得当前执行文件的带有完整绝对路径的文件名
    process.cwd()：获得当前执行node命令时候的文件夹目录名

### require

* 内建模块直接从内存加载
* 文件模块通过文件查找定位到文件
* 包通过 package.json 里面的 main 字段查找入口文件

### module

```js
    // 通过如下模块包装得到
    // 包装头
    (funciton (exports, require, module, __filename, __dirname) {
        /*
        modules.children
        modules.exports
        modules.filename
        modules.id
        modules.loaded
        modules.parent
        modules.paths
        */
    }); // 包装尾
```

#### module.exports 和 exports

```js
const module.exports = {}
// exports只是module.exports的一个引用而已
const exports = module.exports

```

### process（进程）

#### 获取信息

```js
// 获取平台信息
// x64
process.arch
// darwin
process.platform 
// 获取内存使用情况
process.memoryUsage();
// 获取命令行参数
process.argv
process.cwd()
// "/usr/local/bin/node"
process.execPath
process.version

```

#### nextTick

    process.nextTick 方法允许你把一个回调放在下一次时间轮询队列的头上

#### process 事件

```js
process.exit()
process.on('exit', (code) => {
  console.log(`退出码: ${code}`);
});
process.on('warning', (warning) => {
  console.warn(warning.name);    // 打印告警名称
  console.warn(warning.message); // 打印告警信息
  console.warn(warning.stack);   // 打印堆栈信息
});
process.abort()// 使Node.js进程立即结束，并生成一个core文件。
```

## 文件相关操作

### scan-dir 扫描目录下面的所有文件

```js
function scanDir(dir) {
    var getFullPath = dirPath => fs.readdirSync(dirPath).map(val => path.join(dirPath, val));
    var files = [];
    (function next(list) {
        for (const filePath of list) {
            const stats = fs.statSync(fpath);
            if (stats.isDirectory()) {
                next(getFullPath(filePath))
                continue;
            }
            stats.isFile() && files.push(filePath)
        }
    }(getFullPath(dir)))
    return files;
}
```

### Stream

[Node.js中的stream（流）](https://juejin.im/post/5a75d037f265da4e9e303773)

* Readable - 可读的流（fs.createReadStream()）
* Writable - 可写的流（fs.createWriteStream()）
* Duplex - 可读写的流（net.Socket）
* Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate())

#### var rs = fs.createReadStream(path,[options])

1. path 读取文件的路径

2. options

* flags打开文件的操作, 默认为'r'
* mode 权限位 0o666
* encoding默认为null
* start开始读取的索引位置
* end结束读取的索引位置(包括结束位置)
* highWaterMark读取缓存区默认的大小64kb

#### var ws = fs.createWriteStream(path,[options]);

1. path 读取文件的路径

2. options

* flags打开文件的操作, 默认为'w'
* mode 权限位 0o666
* encoding默认为utf8
* autoClose:true是否自动关闭文件
* highWaterMark读取缓存区默认的大小16kb

>将1.txt的可读流 写入到2.txt文件中 这时我们需要一个可写流

```js
const fs = require('fs')
const path = require('path')
// 创建一个可读流
const rs = fs.createReadStream(path.join(__dirname, './1.txt'))
// 创建一个可写流
const ws = fs.createWriteStream(path.join(__dirname, './2.txt'));
// 通过pipe让可读流流入到可写流 写入文件,读出来 扔给写的流
rs.pipe(ws);

const rs = fs.createReadStream('./1.txt');
const ws = fs.createWriteStream('./2.txt');
rs.setEncoding('utf-8'); // 设置编码格式
rs.on('data', chunk => {
    ws.write(chunk);
});
ws.on('end', () => {
    ws.end();
});
// 错误处理
rs.on('error', (err) => {
  console.trace();
  console.error('Stack:', err.stack);
  console.error('The error raised was:', err);
});
```

#### 流的优点

```js
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((req, res) => {
    fs.readFile(videoPath, (err, data) => {
        res.end(data);
    });
}).listen(8080);
// vs
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.createReadStream(videoPath).pipe(res);// 以流的形式写，不用全部读取完毕
}).listen(8080);

http.createServer((req, res) => {
  res.writeHead(200, {
    'content-encoding': 'gzip',
  });
  fs.createReadStream(`${__dirname}/index.html`)
    .pipe(zlib.createGzip())
    .pipe(res);
}).listen(8000);
```

## 网络

### 获取本地 IP

```js
function getLocalIp() {
    const interfaces = require('os').networkInterfaces();
    let IPAdress = '';
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                IPAdress = alias.address;
                break
            }
        }
        if (IPAdress) {
            break
        }
    }
    return IPAdress;
}
```
