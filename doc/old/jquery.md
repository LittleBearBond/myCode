# 前端代码规范、如何编写简洁的代码

标签（空格分隔）： 未分类

---

## 关于jquery

### 写jquery,统一使用$(xx),不要使用jQuery(xx)

```js
//wave_static/common/core/labor-company/labor-company.js
 $.fn.laborList = function(userOptions){
    userOptions = $.extend(true,{
    },default_laborlist_options,userOptions||{});
    $(this).selectList(userOptions);
};
$.fn.setlaborValue = function(value,options){
    var options = $.extend(true,{
    },default_laborlist_options,options||{});
    $(this).setSelectValue(value,options);
};
```

### 摒弃弃用方法。jquery事件绑定统一使用on，不管是直接绑定还是委托绑定，统一接口方便升级

```js
    //使用链式和on 统一绑定事件
   $('.js-btn').on('click',function(){})
        .on('click','delegate selector',function(){});

```

### 绑定事件的元素，挂接钩子经量按规范绑定，加上js-xx、id、class以及自定义属性，都加上js-前缀

```js
    //使用链式和on 统一绑定事件
    //$con 自己spa的顶级容器

        //挂接class
    $con.on('click','.js-del',function(){})
        //挂接自定义属性
        .on('click','[js-add]',function(){})
        //挂接id
        .on('click','#js-add',function(){})
```

### 不要随意挂接$.fn.xx  或者$.xxx

### jquery 对象 统一$开头和原生DOM对象和普通变量区分开

```js
    var $this = $(this);
    var $btn = $('.js-btn');
```

### 缓存、缓存、缓存jquery对象缓存，不要看到相同的$(seletor)

```js
//不要反复查找。DOM遍历是昂贵的，所以尽量将会重用的元素缓存
//1、
//缓存this
var $this = $(this);

//2、
//缓存其他对象
//页面上尽量不要出现相同的 $('xxx')，当然下面这代码可以链式搞定
$("#cancel-stat-contain").css("height",width);            
$('#cancel-stat-contain').highcharts();

//3、
//以下代码，执行一次click 就会执行查找里面的N个元素各一次
//如果click 执行一次还说得过去，如果click是多次执行的情况，一下代码写法很不合理
//$("#selected-td") 每次都要查找两次。这里可以使用缓存对象，或者链式
$("#query-reset").click(function(){
    //这个初始话也是一坑，代码应该抽出
    $("#statDate").daterangepicker({
        startDate:dateUtil.getDate(-14),
        endDate:dateUtil.getDate(-1),
        minDate:minStatDate,
        maxDate:dateUtil.getDate(-1)
    });
    $(".quick-date").removeClass("active");
    $('input:checkbox').each(function () {
        $(this).attr('checked',false);
    });
    $("#selected-td").children("span").each(function(){
          $(this).remove();
    });
    $("#selected-td").hide();
    var param = _this.getQueryParam();
    _this.bulidStat(param)
    _this.queryOrderList(param);
});

//4、使用子查询缓存的父元素
// 糟糕
var $container = $('#container'),
    $containerLi = $('#container li'),//相同的#container
    $containerLiSpan = $('#container li span');

// 建议 (高效)
var $container = $('#container '),
    $containerLi = $container.find('li'),
    $containerLiSpan= $containerLi.find('span');
```

### 避免通用选择符

```js
// 糟糕
$('.container > *'); 

// 建议
$('.container').children();
```

## 优化选择符 避免多个ID选择符

```js
// 糟糕
$('div#myid'); 
$('div#footer a.myLink');

// 建议
$('#myid');
$('#footer .myLink');

// 糟糕
$('#outer #inner');

// 建议
$('#inner');
```

### 通过父元素查找子元素写法优化

```js
//通过父元素查找子元素
//最有的写法是 先找到父元素，父元素在find到子元素

//bad
$('.child', $parent)
$parent.children('.child')
$('#parent > .child')
$('#parent .child')
$('.child', $('#parent'))

//good
$parent.find('.child') //这种写法最快，推荐这种写法
```

### 尽量使用jquery链式,end的使用

```js
// 糟糕
$second.html(value);
$second.on('click',function(){
    console.log('hello everybody');
});
$second.fadeIn('slow');
$second.animate({height:'120px'},500);

// 建议
$second.html(value);
$second.on('click',function(){
    console.log('hello everybody');
}).fadeIn('slow').animate({height:'120px'},500);


//bad
$('#con').find('.js-xxx').addClass('xx')
$('#con').find('.js-xxxxx').removeClass('xxx')

//good
$('#con').find('.js-xxx').addClass('xx')
    .end().find('js-xxxxx').removeClass('xxx');
```

### 简洁的jquery代码

```js
// 糟糕
$first.click(function(){
    $first.css('border','1px solid red');
    $first.css('color','blue');
});
// 建议
$first.on('click',function(){
    $first.css({
        'border':'1px solid red',
        'color':'blue'
    });
});

//创建元素并且加上属性
$('<div>',{
    className:'',
    xxAttr:'xxx',
    xxAttr:'xxx',
    xxAttr:'xxx',
});

// 糟糕：调用了三次attr
$myLink.attr("href", "#").attr("title", "my link").attr("rel", "external");
// 建议
$myLink.attr({
    href: "#",
    title: "my link",
    rel: "external"
});
```

### 减少DOM操作次数，字符串拼接之后一次性append

```js
var list = [], // 假设这里是100个独一无二的字符串
    $mylist = $("#mylist"); // jQuery 选择到 <ul> 元素
for (var i=0, l=list.length; i<l; i++){
  $mylist.append("<li>"+ list[i] +"</li>");
}
//建议
var list = [],
    $mylist = $("#mylist"),
    strLis =""; // 这个变量将用来存储我们的列表元素

for (var i=0, l=list.length; i<l; i++){
    // 使用+= 和数组push 的方式在高级浏览器中，性能无差异，甚至+=更好
      strLis +="<li>"+ list[i] +"</li>";
    }
    $mylist.html(strLis);
```

### ajax 推荐写法

```js
//方式一
$.ajax({

})
//把successFn抽出避免一层嵌套
//$.ajax() 返回一个promise对象，其实这里可以把数据获取和获取之后才操作分离开
.done(successFn)
.error(errorFn)
.always(alwaysFn)
.then(successFn,errorFn)

//方式二
var jqxhr = $.ajax({
    url: 'url',
    type: "GET",
    data: {},
    dataType: "json"
});
jqxhr.done(successHandler);
jqxhr.fail(failureHandler);

//方式三
//一般可能是这样写的
function getData(){
    //获取数据的逻辑抽离，这里返回一个promise对象
    return $.ajax({
        url: 'url',
        type: "GET",
        data: {},
        dataType: "json"
    });
}
//业务处理
getData().done(function(data){
    console.log(data);
})
```

### 统一domReady写法

```js
//bad
$(document).ready(function(){})
//good
$(function(){})
```

## 基本规范

### js html css 编码基本规范见[基本规范](http://codeguide.bootcss.com/)

### 变量声明，无须加下划线，使用驼峰，编码规范

### 变量声明，不是为了特殊调试，使用一次变量不需要声明，减少不必要代码，让代码保持简洁

### 移除没用的代码，不要把没用的代码注释在真正的代码中。调试代码console.log也一并删除

### 代码里面避免大量换行（上下代码相隔七八个换行符），这样代码看起来很怪。

### 保存this使用that 不使用self

### 使用统一组件

## 关于SPA

### spa css 命名空间

//sass 写法

```css
    //自己模块的代码，css 都必须有顶级命名空间，所有的其他css 必须在改命名空间下面，避免影响其他模块的样式
    //sass 写法
    .con{
        .btn{

        }
        .tab{

        }
        .tab-li{

        }
    }
    //css 自己模块的样式必须在自己模块的命名空间下面
    //.con 就是自己模块的顶级html
    .con .btn{}
    .con .tab{}
    .con .tab-li{}
```

### spa命名空间，容器内查找元素避免使用ID选择器，查找也从自己的顶级容器开始，这样保证不影响外部结构。

```js
    var $con = $('#container');
    var $xx = $con.find('jq-xxx');
    var $xx1 = $con.find('.jq-xxx1');
    var $xx2 = $con.find('[jq-xxx]');
```

### 委托的容器不要超出自己SPA模块的容器，如果超出加上事件命名空间

```js
    var $con = $('#container');
    $con.on('click','.js-del',function(){})
        .on('click','[js-add]',function(){})
        .on('click','#js-add',function(){});

    //如果真是超出了$con，时间加上命名空间，并且记得关系
    $("body").on('click.daterangepicker',function(){});
    //容器被销毁的时候
    $("body").off('click.daterangepicker');
```

### 相同控件的初始话代码抽离业务，放到一个独立模块，使用的时候引用模块，把需要初始话的元素传入即可，这样把初始话的逻辑封装到一个地方，方便将来替换或者修改该组件。或者是组件出bug可以统一修复，统一修改。

```js
//bad 在每个业务代码里面去初始话相同的组件,将来出问题或者做统一修改,将会非常麻.
$("#statDateWeek").daterangepicker({
    showWeekNumbers:true,
    canClick:false,
    startDate:firstDay,
    endDate:lastDay
});

//good
//daterangepicker.js
define(function(require, exports, module){
    var defaultOpts = {
        showWeekNumbers:true,
        canClick:false,
        startDate:firstDay,
        endDate:lastDay
    };
    return function($el , opts){
        //把初始话的逻辑封装在一个地方，将来更换空间，或者统一修改，只在这里修改即可
        $el.daterangepicker($.extend(true,{},opts||{}));
    };
});
//使用的时候
var daterangepicker = require('daterangepicker');
daterangepicker($("#statDateWeek") , {});
```

### 配置文件抽离业务，把和业务无关或者可以重用的东西抽离出业务方便独立维护

### 减少循环嵌套，IF ELSE 的书写技巧， switch 的书写技巧

```js
//bad
if(isxx){
    if(isxx1){

    }else{

    }
}else{
     //xxx
}

//good 把代码拉平了
if(!isxx){
    //xx
    return;
}
if(!isxx2){
    //do
    return;
}
//do
```

### 简单的if else 可以直接使用三元表达式搞定

```js
//bad
var result;
if(isOk){
  result=funA();
}else{
 result=funB();
}
//good
var result=isOk? funA():funB()

//bad
public bool IsAdult(int age) {
    bool isAdult;
    if (age > 18){
        isAdult = true;
    }
    else{
        isAdult = false;
    }
    return isAdult;
}

//good
public bool IsAdult(int age) {
    return age > 18;
}
```

### 善用 && || {} 减少if else

```js
if(!$myVar) {
    $myVar = $('#selector');
}
//good
$myVar = $myVar || $('#selector');


if(isOk){
     doSomething();
}
//good
isOk&&doSomething();

if(xx===null || xx ==='' || xx ===undefined){}
//good
if（!xx）{}


//数组长度校验
var arr=[];
if(arr.length ===0 ){
    console.log(1)
}
//good
if(!arr.length){
    console.log(1)
}
//good good 如果里是一句话，就可以这样写了
arr.length && console.log(1);

//判断jquery元素是否存在
if($btn.length){
    //存在……
}

function getColorByVal(val) {
    var color = "";
    if (val == 0){
        color = "white";
    }else if (val == 1) {
        color = "red";
    } else if (val == 2) {
        color = "green";
    } else if (val == 3) {
        color = "yellow";
    } else if (val == 4) {
        color = "gray";
    } else if (val == 5) {
        color = "blue";
    }
    return color;
}
//good
function getColorByVal(val) {
   return ["white","red","green","yellow","gray","blue"][val];
}
```

## 代码减少嵌套，最好不要超过四层

wave_static/src/mis/modules/car/car/batch/init.js
96行N级嵌套

### 善用循环，重复的代码用循环搞定，方便扩展维护。

以下代码可以使用自定义属性，初始话的时候扫描自定义熟悉进行自动初始话。
wave_static/src/mis/modules/asset/fixed/list/init.js

```js
$("#sumCityId").cityList(cityParam);
$("#carCityId").cityList(cityParam);
$("#oilCityId").cityList(cityParam);
$("#obdCityId").cityList(cityParam);
$("#carType").select2();
$("#assetType").select2();

if(datas['company_id'] =='' ){
    datas['company_id'] ='All';
}
if(datas['driving_manage_id'] =='' ){
    datas['driving_manage_id'] ='All';
}
if(datas['check_level'] =='' ){
    datas['check_level'] ='All';
}
if(datas['signup_status'] =='' ){
    datas['signup_status'] ='All';
}
'company_id driving_manage_id check_level signup_status'.split(' ').forEach(function(val){
    datas[val]= datas[val] || 'All';
})
```

### 封装相同逻辑的代码,干掉重复的代码、干掉重复的代码、干掉重复的代码

### 一下代码使用简单的模板引擎处理

```js
var cycleHtml = tipsHtml.replace(/\{title}/,'周期检测模式').replace(/\{left}/,-10).replace(/\{tips}/,'此工作模式下，设备周期性唤醒与服务器端同步配置，检查是否需要激活，如果‘是’则激活设备上报坐标，否则休眠');
var timeHtml = tipsHtml.replace(/\{title}/,'定时操作模式').replace(/\{left}/,-10).replace(/\{tips}/,'此工作模式下，设备在指定时间唤醒与服务器端同步配置，根据配置决定该时间段是否需要激活设备');
var activeHtml = tipsHtml.replace(/\{title}/,'激活后的上报频率：').replace(/\{left}/,-10).replace(/\{tips}/,'激活后的上报频率');

function format(str, obj) {
    var toStr = {}.toString,
        array = Array.prototype.slice.call(arguments, 1),
        result = [];
    if (toStr.call(obj) === '[object Array]') {
        var i = 0,
            len = obj.length;
        for (; i < len; i++) {
            result.push(format(str, obj[i]));
        }
        return result.join('');
    }
    return str.replace(/\\?\{\{([^{}]+)\}\}/gm, function(match, name) {
        if (match.charAt(0) == '\\') {
            return match.slice(1);
        }
        var index = Number(name);
        if (index >= 0) {
            return array[index];
        }
        if (obj && obj[name] !== void 0) {
            return obj[name];
        }
        return '';
    });
}
//用法1
var tipsHtml='xxxxx{{title}}xxxx{{tips}}xxxx{{left}} {{title}}';
var cycleHtml=format(tipsHtml,{
    left:'',
    tips:'',
    title:''
    });
//用法二
var tipsHtml='xxxxx{{0}}xxxx{{0}}xxxx{{1}} {{1}}';
var cycleHtml=format(tipsHtml,'xxx0','xxx1');
```

### 使用===取代==

### 业务页面代码结构示例

```js
//静态初始话的方式
var page = {
    init: function(){
            this.opts = $.extend(true, {}, options, opts || {});
            this.initView().initEvent().initXX();
        },
    initView: function(){
        var that = this;
        var $con=$(con);
        $.each({
                $key1:'js-selector1',
                $key2:'js-selector2',
                $key3:'js-selector3',
                $key4:'js-selector4'
            }, function (key, sel) {
                //在容器呢查找
                that[key] = $con.find(sel);
            });
            return this;
        },
    initEvent: function(){
        //直接绑定
        this.$key1.on('type',this.xxxFn.bind(this))
            //委托绑定
            .on('type','selector',this.xxxFn.bind(this))
            //绑定window下的函数
            .on('type',window.XXX);
        //找到一个元素在绑定事件
        this.$key2.on('type',fn)
        return this;
    },
    //其他的初始话的都以init开头
    initDatePicker(){

    }
    //具体业务代码
    getData(){
        reutrn $.ajax({});
    }
    //具体业务代码
    //……
};
module.exports = function(args){
    page.init(args);
}

//实例初始话, 用到的时候才去初始话
var page = function(args){
    this.init(args);
};
$.extend(page.prototype,{
    init: function(){
            this.opts = $.extend(true, {}, options, opts || {});
            this.initView().initEvent().initXX();
        },
    initView: function(){
        var that = this;
        var $con=$(con);
        $.each({
                $key1:'js-selector1',
                $key2:'js-selector2',
                $key3:'js-selector3',
                $key4:'js-selector4'
            }, function (key, sel) {
                //在容器呢查找
                that[key] = $con.find(sel);
            });
            return this;
        },
    initEvent: function(){
        //直接绑定
        this.$key1.on('type',this.xxxFn.bind(this))
            //委托绑定
            .on('type','selector',this.xxxFn.bind(this))
            //绑定window下的函数
            .on('type',window.XXX);
        //找到一个元素在绑定事件
        this.$key2.on('type',fn)
        return this;
    },
    //其他的初始话的都以init开头
    initDatePicker(){

    }
    //具体业务代码
    getData(){
        reutrn $.ajax({});
    }
    //具体业务代码
    //……
});
module.exports = function(args){
    return new page(args);
}
//##最佳做法 抽象出一个父类， 很多公共的方法或者模块在父类中去加载，子类可以重写父类的方法
```