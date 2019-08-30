# console

### console.xxx

- console.log：普通信息
- console.info：提示类信息
- console.error：错误信息
- console.warn：警示信息

```js
console.log(id);//元素的id 直接能找到对应元素,`id`不要加引号
console.log('翯翯翯翯~');
console.log(1,2,3,4)//输出多个值
console.log('%cBlue! %cRed!', 'color: blue;', 'color: red;');
console.log('%chello world','font-size:25px;color:red;');
console.log('%chello world', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
console.log("%c", "padding:100px 300px;line-height:200px;background:url('http://images.cnitblog.com/blog/431064/201409/132234240277278.gif') no-repeat;");
//console的恶作剧
var _log = console.log;
console.log = function() {
  _log.call(console, '%c' + [].slice.call(arguments).join(' '), 'color:transparent;text-shadow:0 0 2px rgba(0,0,0,.5);');
};

console.info('翯翯翯翯~');

console.warn('翯翯翯翯~');
console.warn('Warning! Too few nodes (%d)', 2);

console.error('翯翯翯翯~');
console.error("Error: %s (%i)", "Server is  not responding",500);

//console对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义console.log方法
["log", "info", "warn", "error"].forEach(function(method) {
    console[method] = console[method].bind(
        console,
        new Date().toISOString()
    );
});
```

<table>
  <tr>
    <th>Format</th>
    <th>pecifier  Description</th>
  </tr>
  <tr>
    <td>%s</td>
    <td>Formats the value as a string.</td>
  </tr>
  <tr>
    <td>%d or %i</td>
    <td>Formats the value as an integer.</td>
  </tr>
  <tr>
    <td>%f</td>
    <td>Formats the value as a floating point value.</td>
  </tr>
  <tr>
    <td>%o </td>
    <td>Formats the value as an expandable DOM element (as in the Elements panel).</td>
  </tr>
  <tr>
    <td>%O</td>
    <td>Formats the value as an expandable JavaScript object.</td>
  </tr>
  <tr>
    <td>%c </td>
    <td>Formats the output string according to CSS styles you provide.</td>
  </tr>
</table>

### console.clear()


### console.assert(expression, object)

```js
var isDebug=false;
console.assert(isDebug,'断言，前面的是否正确。。。');
```

### console.group  console.groupEnd console.groupCollapsed(object[, object, ...])

```js
console.group("app.foo");
console.log("来自foo模块的信息 blah blah blah...");
console.groupEnd();
console.group("app.bar");
console.log("来自bar模块的信息 blah blah blah...");
console.groupEnd();

//------------------------------------------------
var user = "jsmith", authenticated = false;
console.group("Authentication phase");
console.log("Authenticating user '%s'", user);
// authentication code here...
if (!authenticated) {
    console.log("User '%s' not authenticated.", user)
}
console.groupEnd();
```

### console.table

```js
var data = [{'品名': 'xx', '数量': 4}, {'品名': 'xxx', '数量': 3}];
console.table(data);

console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
console.table([[1,2,3], [2,3,4]]);

function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

var family = {};
family.mother = new Person("Susan", "Doyle", 32);
family.father = new Person("John", "Doyle", 33);
family.daughter = new Person("Lily", "Doyle", 5);
family.son = new Person("Mike", "Doyle", 8);

console.table(family, ["firstName", "lastName", "age"]);
```

### console.count(label)

``` js
function foo(){
    //其他函数逻辑blah blah。。。
    console.count('foo 被执行的次数：');
}
foo();
foo();
foo();
```

### console.dir(object)

经常使用，查看一个对象的属性以及属性值
``` js
console.dir(document.body);
console.log(document.body);
```

### console.time & console.timeEnd

代码执行时间测试
```js
console.time("Array initialize");
var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
};
console.timeEnd("Array initialize");
array = null;
```

### console.profile console.profileEnd  console.timeLine console.timeLineEnd

```js
profile("init")
profileEnd("init")
profile("init")
profileEnd("init")

```

###  $

Chrome 控制台中原生支持选择器
|$()  |  document.querySelector()|
|$$() |  返回一个选中的DOM对象，等同于document.querySelectorAll|
|$x() |  R$x(path)方法返回一个数组，包含匹配特定XPath表达式的所有DOM元素|
|$_   |   属性返回上一个表达式的值|

### inspect

```js
inspect($('p'))//方法打开相关面板，并选中相应的元素：DOM元素在Elements面板中显示，JavaScript对象在Profiles中显示
```

### copy

通过此命令可以将在控制台获取到的内容复制到剪贴板

### keys & values

```js
var tboy={name:'xj',gender:'unknown',hobby:'opposite to the gender'};
keys(tboy);
values(tboy);
```

### monitor & unmonitor

monitor(function)，它接收一个函数名作为参数，比如function a,每次a被执行了，都会在控制台输出一条信息，里面包含了函数的名称a及执行时所传入的参数。
而unmonitor(function)便是用来停止这一监听

```js
function sayHello(name){
    alert('hello,'+name);
    console.log('12346')
}
monitor(sayHello);
sayHello('xj');
unmonitor(sayHello);
sayHello('xj');
```

### debug & undebug

```js
function sayHello(name){
    debugger
    alert('hello,'+name);
    console.log('12346')
}
sayHello('xj');
```

### Frame Selection

![Frame Selection](https://developer.chrome.com/devtools/docs/console-files/frame-selection.png)

### Filtering console output

- All Shows all console output.
- Errors Only show output from console.error().
- Warnings Only show output from console.warn().
- Info Only show output from console.info().
- Logs Only show output from console.log().
- Debug Only show output from console.timeEnd() and console.debug().
![Frame Selection](https://developer.chrome.com/devtools/docs/console-files/filter-errors.png)

### Monitoring events

```js
monitorEvents(document.body, "click");
unmonitorEvents(document.body);
```

### multi-line commands

`Shift` + `Enter`

### 设置控制台输出Log XMLHttpRequests


  可以看到页面发出的ajax请求，然后更具调用栈定位到相关代码，还可以在network看到相关发送和返回的数据，以及该请求的其他信息
