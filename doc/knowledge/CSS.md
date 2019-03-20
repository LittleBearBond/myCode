# knowledge

## 布局

[CSS布局解决方案](https://segmentfault.com/a/1190000013565024)

## CSS基础 CSS3 flex grid

[参考地址](https://segmentfault.com/a/1190000010780991)

    transition、animation

    animation-fill-mode : none | forwards | backwards | both;
    transform：rotate、rotateX|Y|Z、rotate3d、translate、translateX|Y|Z、scale、skew  transform-origin

    box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;

    border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘制偏移的量（默认0） 铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;

    background-clip
    background-size
    反射：-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片
    word-break: normal|break-all|keep-all;
    word-wrap: normal|break-word;

```css
/**单行省略号**/
div
{
    width:200px;
    border:1px solid #000000;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}
/**多行省略号**/
div
{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    padding:0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height:30px;
    height:60px;
}
```

    渐变:-webkit-radial-gradient([<position> || <angle>,]?[<shape> || <size>,]?<color-stop>,<color-stop>[,<color-stop>]*);
    background-image: -webkit-radial-gradient(circle,hsla(120,70%,60%,.9),hsla(360,60%,60%,.9));
    background-image: -webkit-radial-gradient(ellipse,hsla(120,70%,60%,.9),hsla(360,60%,60%,.9));
    background-image: -webkit-radial-gradient(ellipse at center, rgb(220, 75, 200),rgb(0, 0, 75));

    -webkit-linear-gradient([<point>||<angle>,]?<stop>,<stop>[,<stop>]*)
    background-image:-webkit-linear-gradient(-180deg, orange, green);

```css
    div { width: 400px; height: 150px; border: 1px solid #666; line-height: 150px; text-align: center; font-weight: 900; font-size: 30px; color: #fff; margin: 10px auto; }
    .toTop { background-image:-webkit-linear-gradient(to top, orange, green); }
    .toTop-deg{ background-image:linear-gradient(0deg,orange,green); }
    .toTop-deg2{ background-image:linear-gradient(360deg,orange,green); }
    .toTop-deg3 { background-image:linear-gradient(-360deg,orange,green); }
```

    滤镜

### CCS3选择器

[选择器](https://sfault-image.b0.upaiyun.com/385/362/3853627759-5996f5581c9a1_articlex)

### CSS选择器优先级？

    !important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性

### Grid布局

>flexbox(盒子布局)，解决了很多布局问题，但是它仅仅是一维布局，而不是复杂的二维布局，实际上它们（flexbox与grid）能很好的配合使用。Grid布局是第一个专门为解决布局问题而创建的

### box-sizing

>content-box | border-box  padding-box(已经删除)

### flex

[css-flex布局](./css.md)

[flex](https://segmentfault.com/a/1190000012275086)

    display:flex
    justify-content:flex-start flex-end center space-bettew space-around
    align-items:flex-start flex-end center baseline（baseline 默认是指首行文字） stretch(拉伸至与父容器一致)
    flex:flex-grow flex-shink flex-basis
    flex:auto flex:1
    align-self: flex-start flex-end center baseline（baseline 默认是指首行文字） stretch(拉伸至与父容器一致)
    flex-direction:row cloumn row-reverse column-reverse
    flex-wrap: nowrap wrap wrap-reverse
    align-content: flex-start flex-end center space-between space-around stretch

    align-content 多行，多轴对齐方式
    align-items 单行 多行均可以 多行实际效果和align-content 也有区别

[flex-grow flex-shrink flex-basis](https://segmentfault.com/a/1190000017826957)
[flex-grow flex-shrink flex-basis 动画演示](https://juejin.im/entry/595624926fb9a06ba5196083)
[properties/f/flex/](https://css-tricks.com/almanac/properties/f/flex/)

## BFC

[理解CSS中的BFC(块级可视化上下文)](https://www.jianshu.com/p/fc1d61dace7b)

    float属性不为none.

    position属性不为static和relative.

    display属性为下列之一:table-cell,table-caption,inline-block,flex,or inline-flex.

    overflow属性不为visible.

>利用BFC可以消除Margin Collapse
>
>利用BFC去容纳浮动元素
>
>利用BFC阻止文本换行

## 如何清除浮动

    方法太多，触发父级BFC、或者使用:after

## 移动端适配1px的问题

1、svg

2、缩放viewport 0.5 0.33333

3、ios可直接设置小数

4、border-image、box-shadow

5、缩放

## 列举HTML5新特性

* 语意化标签(nav、aside、dialog、header、footer等)
* canvas
* 拖放相关api
* Audio、Video
* 获取地理位置
* 更好的input校验
* web存储(localStorage、sessionStorage)
* webWorkers(类似于多线程并发)
* webSocket

## CSS3新特性

* 选择器
* 边框(border-image、border-radius、box-shadow)
* 背景(background-clip、background-origin、background-size)
* 渐变(linear-gradients、radial-gradents)
* 字体(@font-face)
* 转换、形变(transform)
* 过度(transition)
* 动画(animation)
* 弹性盒模型(flex-box)
* 媒体查询(@media)

### css3新增伪类

    p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
    p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
    p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
    p:only-child        选择属于其父元素的唯一子元素的每个 <p> 元素。
    p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。

    :after          在元素之前添加内容,也可以用来做清除浮动。
    :before         在元素之后添加内容
    :enabled
    :disabled       控制表单控件的禁用状态。
    :checked        单选框或复选框被选中。

## 行内元素 块级元素

    行内元素：
    <a> <b> <small> <strong> <i> <img> <input> <textarea> <span>
    块级元素：
    标题类<h1><h2>...，
    列表类<ul><ol><li><dl><dd><dt>
    表格类<table><tbody><thead><th>...，
    <p> header、footer、nav、article、aside、section、div、

## a

    :link   应用于未被访问过的链接；
    :hover  应用于鼠标悬停到的元素；
    :active  应用于被激活的元素；
    :visited 应用于被访问过的链接，与:link互斥。
    :focus   应用于拥有键盘输入焦点的元素。


## transition和animation的区别

    Animation和transition大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是transition需要触发一个事件才能改变属性，而animation不需要触发任何事件的情况下才会随时间改变属性值，并且transition为2帧，从from .... to，而animation可以一帧一帧的。
