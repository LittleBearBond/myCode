# ChromeDevTools

- Elements：用来调试网页的HTML源码和CSS代码。
- Resources：查看网页加载的各种资源文件（比如代码文件、字体文件、css文件等），以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage等）。
- Network：查看网页的HTTP通信情况。
- Sources：调试JavaScript代码。
- Timeline：查看各种网页行为随时间变化的情况。
- Profiles：查看网页的性能情况，比如CPU和内存消耗。
- Audits：提供网页优化的建议。
- Console：用来运行JavaScript命令。

##Elements

### Inspecting the DOM and styles 检查DOM和样式
  选中元素右键审查元素
####修改 html & 属性
  添加属性(enter)
  修改 html(F2)
  删除元素(delete)
  隐藏元素(H)
  拖拽节点, 调整顺序
  拖拽节点到编辑器
  ctrl + z 撤销修改
####修改样式
  添加、修改属性 同样可以通过 ctrl + z 取消
  在一个class中添加样式，所有使用改clas的元素都立即生效
  给元素添加style
  修改属性值的是数值的时候可以 ctrl+⬆️、shift+⬆️、option+⬆️ 每次改变是以1、 10 、0.1
  可以强制元素处于hover、active、focus、visited
  computed可以查看元素计算后的样式，定位到生效的样式，调试的时候用得较多
  修改颜色，可以直接吸取颜色，在颜色预览功能使用快捷键Shift + Click，可以在rgba、hsl和hexadecimal来回切换颜色的格式
  查看元素properties

css3动画调试


### Debugging JavaScript 调试JavaScript

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
    查找文件: ctrl + o  (在 Scripts panel 下)
    **goto  cmd + p**
    goto line cmd+L、go to function cmd+shift+o
8. 实时修改 js 代码生效
>   编辑js cmd+D 不断选中相同的和Sublime text 有许多相似之处

9. console 中执行的代码可断点 debugger
10. 控制台直接输入函数，设置debugger 直接进入我们的代码
11. js条件断点、选中表达式在控制台查看计算值
12. 调用栈分析

### Improving network performance 提高网络性能
### Audits 审计
### Improving rendering performance 提高渲染性能
### JavaScript & CSS performance# JavaScript和CSS的性能
### Inspecting storage 检查存储
