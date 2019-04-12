# knowledge

## webpack

- [参考地址](https://fengmiaosen.github.io/2017/03/21/webpack-core-code/)
- [参考地址](https://doc.webpack-china.org/contribute/writing-a-plugin/)
- [参考地址](http://taobaofed.org/blog/2016/09/09/webpack-flow/)
- [参考地址](https://juejin.im/post/5980752ef265da3e2e56e82e)
- [参考地址-tapable](https://www.jianshu.com/p/01a606c97d76)
- [参考地址-loader plugin](https://juejin.im/post/5980752ef265da3e2e56e82e)
- [干货！撸一个webpack插件(内含tapable详解+webpack流程)](https://juejin.im/post/5beb8875e51d455e5c4dd83f)

    提供了很多开箱即用的功能，同时它可以用loader和plugin来扩展。webpack本身结构精巧，**基于tapable的插件架构** ，扩展性强，众多的loader或者plugin让webpack显得很复杂
webpack4.0打包优化策略

- [优化策略1](https://juejin.im/post/5abbc2ca5188257ddb0fae9b)
- [优化策略2](https://juejin.im/post/5ac769e7f265da237b225490)
- [优化策略3](https://juejin.im/post/5ac76a8f51882555677ecc06)
- [简单手写webpack](https://github.com/dykily/simple_webpack/blob/master/bundler.js)

### tapable 面向切面的插件思想

>声明一个全局的变量this._plugins = {}，插件中使用plugin(name, fn)方法给事件name注册处理方法fn，多次注册形成了事件name的监听链，当事件name触发的时候，执行这些处理方法。处理方法的执行顺序和执行方式依据事件name的触发方式的不同而不同

```js
import  {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } from 'tapable'

const hook1 = new SyncHook(["arg1", "arg2", "arg3"]);

//绑定事件到webapck事件流
hook1.tap('hook1', (arg1, arg2, arg3) => console.log(arg1, arg2, arg3)) //1,2,3

//执行绑定的事件
hook1.call(1,2,3)

```

| type | function |
| ------ | ------ |
| Hook| 所有钩子的后缀 |
| Waterfall| 同步方法，但是它会传值给下一个函数 |
| Bail| 熔断：当函数有任何返回值，就会在当前执行函数停止 |
| Loop| 监听函数返回true表示继续循环，返回undefine表示结束循环 |
| Sync| 同步方法 |
| AsyncSeries| 异步串行钩子 |
| AsyncParallel| 异步并行执行钩子 |
|   |   |

### 执行流程

    1、optimist 和 commander 一样，optimist 实现了 node 命令行的解析

```js
var optimist = require("optimist");

optimist
.boolean("json").alias("json", "j").describe("json")
.boolean("colors").alias("colors", "c").describe("colors")
.boolean("watch").alias("watch", "w").describe("watch")
```

    2、config 合并与插件加载。在加载插件之前，webpack 将 webpack.config.js 中的各个配置项拷贝到 options 对象中，并加载用户配置在 webpack.config.js 的 plugins 。接着 optimist.argv 会被传入到 ./node_modules/webpack/bin/convert-argv.js 中，通过判断 argv 中参数的值决定是否去加载对应插件

    3、编译与构建流程。在加载配置文件和 shell 后缀参数申明的插件，并传入构建信息 options 对象后，开始整个 webpack 打包最漫长的一步。而这个时候，真正的 webpack 对象才刚被初始化，具体的初始化逻辑在 lib/webpack.js 中

```js
function webpack(options) {
  var compiler = new Compiler();
  ...// 检查options,若watch字段为true,则开启watch线程
  return compiler;
}
```

    webpack 的实际入口是 Compiler 中的 run 方法，run 一旦执行后，就开始了编译和构建流程 ，其中有几个比较关键的 webpack 事件节点。

    - compile 开始编译
    - make 从入口点分析模块及其依赖的模块，创建这些模块对象
    - build-module 构建模块
    - after-compile 完成构建
    - seal 封装构建结果
    - emit 把各个chunk输出到结果文件
    - after-emit 完成输出

    4、compiler.run 后首先会触发 compile ，这一步会构建出 Compilation 对象

### loader

    能转换各类资源，并处理成对应模块的加载器。loader 间可以串行使用
    [参考地址](https://juejin.im/post/59df06e6f265da430d5701d0)
    [参考地址](http://www.css88.com/doc/webpack/development/how-to-write-a-loader/)

```js
    module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    const layoutHtml = fs.readFileSync(options.layout, 'utf-8')
    return layoutHtml.replace('{{__content__}}', source)
    }
```

### lugin

```js
//编写webpack 插件步骤
/*
1、编写一个JavaScript命名函数。
2、在它的原型上定义一个apply方法。
3、指定挂载的webpack事件钩子。
4、处理webpack内部实例的特定数据。
5、功能完成后调用webpack提供的回调。编写插件之前要理解compiler和compilation两个对象，以及webpack生命周期的各个阶段和钩子，plugin比loader强大，通过plugin你可以访问compliler和compilation过程，通过钩子拦截webpack的执行
*/
function UglifyJsPlugin(options) {
  this.options = options;
}

module.exports = UglifyJsPlugin;
// 原型上定义一个apply方法。
UglifyJsPlugin.prototype.apply = function(compiler) {
  // 绑定compilation事件
  compiler.plugin("compilation", function(compilation) {
    compilation.plugin("build-module", function(module) {
    });
    compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
      // Uglify 逻辑
    });
    compilation.plugin("normal-module-loader", function(context) {
    });
  });
};
//在 webpack 中你经常可以看到 compilation.plugin(‘xxx’, callback) ，你可以把它当作是一个事件的绑定，这些事件在打包时由 webpack 来触发。
```

    Webpack中的require.context妙用

```js
// 创建一个test文件夹（不包含子目录）的上下文，可以require其下的所有js文件
const context = require.context("./test", false, /\.js$/)
const importAll = context => {
    // context.keys() 返回找到的js文件路径
    context.keys().forEach(key => context(key)
}
importAll()
```

### 优化

webpack优化

- webpack-bundle-analyzer  分析代码体积组成
- 配置externals
- 引入 DllPlugin 和 DllReferencePlugin
- 删除无用的依赖
- 压缩的时候去掉sourcemap,去掉警告信息
- 选择合适devtool
- 减少构建搜索或编译路径 配置alias和noPase
- 区分线上和开发环境，线上环境自动移除相关代码
- 多线程压缩，开启cache loader
