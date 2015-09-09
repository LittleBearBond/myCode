# ChromeDevTools

- Elements：用来调试网页的HTML源码和CSS代码。
- Resources：查看网页加载的各种资源文件（比如代码文件、字体文件、css文件等），以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage等）。
- Network：查看网页的HTTP通信情况。
- Sources：调试JavaScript代码。
- Timeline：查看各种网页行为随时间变化的情况。
- Profiles：查看网页的性能情况，比如CPU和内存消耗。
- Audits：提供网页优化的建议。
- Console：用来运行JavaScript命令。

##基本设置
- Disable cache (while DevTools is open)
- Enable JavaScript source maps
- Enable CSS source maps
- Log XMLHttpRequests
- Show timestamps
- 是否需要 Preserve log 看自己的需求

##Elements

### Inspecting the DOM and styles 检查DOM和样式
  选中元素右键审查元素

  **DOM Search by CSS Selector**

  **Media Query Inspector**

  **alt+click** 展开所有节点

  **Quick-edit element tags**

####修改 html & 属性

  添加属性(enter)

  修改 html(F2)

  删除元素(delete)

  隐藏元素(H)

  拖拽节点, 调整顺序

  拖拽节点到编辑器

  ctrl + z 撤销修改

  crtl + f 在元素里面查找

####修改样式
  添加、修改属性 同样可以通过 ctrl + z 取消

  在一个class中添加样式，所有使用改clas的元素都立即生效

  给元素添加style

  修改属性值的是数值的时候可以 ctrl+⬆️、shift+⬆️、option+⬆️ 每次改变是以1、 10 、0.1

  **Force element state**可以强制元素处于hover、active、focus、visited

  **Visualize the shadow DOM**

  computed可以查看元素计算后的样式，定位到生效的样式，调试的时候用得较多

  **Change color format **修改颜色，可以直接吸取颜色，在颜色预览功能使用快捷键Shift + Click，可以在rgba、hsl和hexadecimal来回切换颜色的格式

  查看元素properties

css3动画调试



### Improving network performance 提高网络性能
### Audits 审计
### Improving rendering performance 提高渲染性能
### JavaScript & CSS performance# JavaScript和CSS的性能
### Inspecting storage 检查存储

## Network
- Name：请求文件名称
- Method：方法（常见的是get post）
- Status：请求完成的状态
- Type：请求的类型
- Initiator：请求源也就是说该链接通过什么发送（常见的是Parser、Script）
- Size：下载文件或者请求占的资源大小
- Time：请求或下载的时间
- Timeline：该链接在发送过程中的时间状态轴（我们可以把鼠标移动到这些红红绿绿的时间轴上， 对应的会有它的详细信息：开始下载时间，等待加载时间，自身下载耗时）
- `Copy a Response`、`Copy Request Headers`、`Copy Response Headers`、`Copy as cURL`、`Copy all as HAR`、`XXXX`


1. Network是一个监控当前网页所有的http请求的面版，它主体部分展示的是每个http请求，每个字段表示着该请求的不同属性和状态

2. 单击面板中的任意一条http信息，会在底部弹出一个新的面板，其中记录了该条http请求的详细参数header
  （表头信息、返回信息、请求基本状态---请参看http1.1协议内容对号入座）、Preview（返回的格式化转移后文本信息）
  、response（转移之前的原始信息）、Cookies（该请求带的cookies）、Timing（请求时间变化）

3. 在主面板的顶部，有一些按钮从左到右它们的功能分别是：是否启用继续http监控（默认高亮选中过）、
  清空主面板中的http信息、是否启用过滤信息选项（启用后可以对http信息进行筛选）、列出多种属性、
  只列出name和time属性、preserve log（目前不清楚啥用）、Dishable cahe（禁用缓存，
  所有的304返回会和fromm cahe都回变成正常的请求忽视cache conctrol 设定）；

4.  最后在主面板的底部有记录了整体网络请求状态的一些基本信息

##Resources
Resources部分较简单，他主要向我们展示了本界面所加载的资源列表。还有cookie和local storage 、SESSION 等本地存储信息，在这里，我们可以自由地修改、增加、删除本地存储。
webSql 浏览器上的数据库，可以用sql语句操作

##Sources
### Debugging JavaScript 调试JavaScript
F8 F10 F11

1. Beautify Javascript

2. 查看元素绑定了哪些事件
>   默认会列出 All Nodes, 这些包括代理绑定在该节点的父/祖父节点上的事件, 因为在在冒泡或捕获阶段会经过该节点
  Selected Node Only 只会列出当前节点上绑定的事件
  每个事件会有对应的几个属性 handler, isAtribute, lineNumber, listenerBody, sourceName, type, useCapture
  handler是处理函数, 右键可以看到这个函数定义的位置, 一般 js 库绑定事件会包一层, 所以这里很难找到对应handler
  isAtribute 表明事件是否通过 html 属性(类似onClick)形式绑定的
  useCapture 是 addEventListener 的第三个参数, 说明事件是以 冒泡 还是 捕获 顺序执行

3. Ajax 时中断
4. 页面事件中断
5. Javascript 异常时中断
6. DOM Level 3 Event 事件中断
>  在 Elements 面板, 选中一个元素右键, 有两个选项：Break on subtree modifications, Break on attributes modifications, 这两个对应 DOM Level 3 Event 中的DOMSubtreeModified , DOMSubtreeModified 事件 在 Scripts 面板 DOM Breakpoints 处会列出所有 level3 的 event 中断
7. 所有 js 文件中搜索&查找 js 函数定义,以及函数跳转
>   ctrl + shift + F, 在通过 js 钩子查找代码位置时很有用, 查找支持正则表达式
    查找函数定义: ctrl + shift + 0 (在 Scripts panel 下)
    **Quick file switching** 查找文件: ctrl + o  (在 Scripts panel 下)
    **goto  cmd + p**
    **Go to line ** `cmd+L、ctrl+g ` go to function`cmd+shift+o`
8. 实时修改 js 代码生效
>   编辑js cmd+D 不断选中相同的和Sublime text 有许多相似之处

9. console 中执行的代码可断点 debugger
10. 控制台直接输入函数，设置debugger 直接进入我们的代码
11. js条件断点、选中表达式在控制台查看计算值
12. 调用栈分析
13. 当执行听到某个断点的时候，这个时候在控制可以查看当前断点作用域里面的任意变了，以及执行任意表达式。这个很有用，在调试的时候，我们让程序停在断点出，这个时候函数正常流程不执行的语句，你也可以选中人后右键Evalute in Console，执行并且在控制台查看返回值。此时自己也可以在控制台手动编写相关代码。
14。 `alt+鼠标拖动` 块编辑

##Timeline
http://www.cnblogs.com/constantince/p/4585983.html
##Profiles
http://www.cnblogs.com/constantince/p/4607497.html
https://css-tricks.com/six-tips-for-chrome-devtools/
https://developers.google.com/web/updates/chrome-devtools/


