# knowledge

## ES6

[ECMAScript 6 入门](http://es6.ruanyifeng.com/)

- let const

- 解构赋值：默认值，数组解构，Object解构，多层级object结构并且赋默认值，字符串解构，函数参数解构以及设置默认值，解构用户遍历map

- 字符串扩展：charAt、charCodeAt、for...of循环遍历、includes()、startsWith(）、endsWith() 、repeat() 、padStart()，padEnd()、模板字符串

- 可以使用正则表达式：match()、replace()、search()和split()。

- 正则的扩展：u、y 修饰符

- 数值的扩展：Number.isFinite()、 Number.isNaN()、Number.isInteger()、Number.isSafeInteger()、Number.EPSILON（小数精度）

- 函数的扩展：函数参数的默认值、解构赋值默认值结合使用、rest 参数（形式为...变量名），用于获取函数的多余参数、[箭头函数](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/101)

- 数组的扩展：扩展运算符...、console.log(...[1,2,3])；aa.push(...bb)；[...document.querySelectorAll('div')]、

    扩展运算符的应用:复制数组、替代函数的 apply 方法、合并数组、与解构赋值结合、字符串解构为数组、实现了 Iterator 接口的对象可直接使用...,扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符

    Array.from方法用于将两类对象转为真正的数组，Array.from({length:10},(v,index)=>index)

    Array.of方法用于将一组值，转换为数组、find()、findIndex() 、fill()、entries()，keys() 和 values()、includes()

    数组实例的 flat()，flatMap() 拉平数组

- 对象的扩展：属性的简洁表示法、属性名表达式 （属性名是个变量）、方法的 name 属性、Object.is()、Object.assign() object、array都可以；Object.keys()，Object.values()，Object.entries()、对象的扩展运算符、

    Object.create(null)创建一个真空对象

    Object.getOwnPropertyDescriptor(obj, 'foo') 方法可以获取该属性的描述对象

    Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名

- Symbol：一种新的原始数据类型Symbol，表示独一无二的值。
        可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
        消除魔术字符串
        属性名的遍历:Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
        Symbol.for()，Symbol.keyFor()
        内置的 Symbol 值：ES6 提供了 11 个内置的 Symbol 值，指向语言内部使用的方法
        Symbol.iterator：Symbol.iterator属性，指向该对象的默认遍历器方法

```js
    const myIterable = {};
    myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    [...myIterable] // [1, 2, 3]
```

- Set：size、add、has、clear、delete、key、values、entries、forEach、Array.from方法可以将 Set 结构转为数组
    map:Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应

- Promise:pending、fulfilled、rejected、then、catch、finally、all、race、resolve、reject
    Promise 新建后就会立即执行： [练习题](https://juejin.im/post/5a96c6326fb9a063626408c8)

- Iterator 和 for...of 循环，Iterator 接口主要供for...of消费，Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环

    调用 Iterator 接口的场合：解构赋值、扩展运算符、yield*、for...of、Array.from()、Map(), Set(), WeakMap(), WeakSet()、Promise.all()、Promise.race()
    Iterator 接口与 Generator 函数：

```js
    let generator = function* () {
        yield 1;
        yield * [2,3,4];
        yield 5;
    };
    var iterator = generator();
    iterator.next() // { value: 1, done: false }
    iterator.next() // { value: 2, done: false }
    iterator.next() // { value: 3, done: false }
    iterator.next() // { value: 4, done: false }
    iterator.next() // { value: 5, done: false }
    iterator.next() // { value: undefined, done: true }
```

    Generator 函数的语法
    yield表达式只能用在 Generator 函数里面，用在其他地方都会报错

```js
    var arr = [1, [[2, 3], 4], [5, 6]];
    var splitArr = function* (arr){
        for (let v of arr) {
            if(Array.isArray(v)){
                yield * splitArr(v)
            }else{
                yield v;
            }
        }
    }
    var splitArr = arr => {
        return [].concat(...arr.map(v => Array.isArray(v) ? splitArr(v) : v))
    }
```

    任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。
    由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口

```js
    var myIterable = {};
    myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    [...myIterable] // [1, 2, 3]
    //demo
    function* objectEntries() {
        const keys = Object.keys(this)
        for (let key of keys) {
            yield [key, this[key]]
        }
    }
    const aa = {
        a: 1,
        b: 2,
        [Symbol.iterator]:objectEntries
    }
    [...aa]; Array.from(aa);for(let item of aa)
```

    for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用 next 方法
    Generator 函数的异步应用

    async 函数
    async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已
    await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中
    多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发，使用Promise.all
    await命令只能用在async函数之中，如果用在普通函数，就会报错。

    Class 的基本语法

### async/await

[我眼中的 async/await](https://zhuanlan.zhihu.com/p/33932184?group_id=951215290030317568)

## babel transform-runtime以及stage-2

[Babel入门教程](https://www.kancloud.cn/digest/babel/217104)

    Babel 默认只转换新的 JavaScript 语法，而不转换新的 API,Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill

    .babelrc配置文件中，主要是对预设（presets）和插件（plugins）进行配置。babel-preset-env、babel-preset-es2015、babel-preset-es2016、babel-preset-es2017、babel-preset-latest等。在实际开发中可以只选用babel-preset-env来代替余下的

    presets，也就是一堆plugins的预设，起到方便的作用。如果你不采用presets，完全可以单独引入某个功能，比如以下的设置就会引入编译箭头函数的功能
    还有一些方法是presets中不提供的，这时候就需要单独引入了:transform-runtime

```js
//ES7不同阶段语法提案的转码规则（共有4个阶段）
// babel-preset-stage-0(stage-0)
// babel-preset-stage-1(stage-1)
// babel-preset-stage-2(stage-2)
// babel-preset-stage-3(stage-3)
// babel-preset-stage-3(stage-4)
{
 // 此项指明，转码的规则
    "presets": [
            // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
            ["env", { "modules": false }],
            "react",
            // 下面这个是不同阶段出现的es语法，包含不同的转码插件
            "stage-2"
    ],
    // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
    "plugins": ["transform-runtime"],
}
```

### ES6 模块与 CommonJS 模块的差异

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
- ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。
- ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块
