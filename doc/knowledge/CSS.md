# knowledge

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

### Grid布局

>flexbox(盒子布局)，解决了很多布局问题，但是它仅仅是一维布局，而不是复杂的二维布局，实际上它们（flexbox与grid）能很好的配合使用。Grid布局是第一个专门为解决布局问题而创建的

多列布局
box-sizing

### flex

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

### BFC

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

### 如何清除浮动

    方法太多，触发父级BFC、或者使用:after