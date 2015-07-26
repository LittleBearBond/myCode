LocalResizeIMG
==============

# 前端HTML5本地压缩图片，兼容移动设备IOS,android。

## 概述
* 通常压缩图片需要上传到后端，由后端处理。
* 但是如果要上传的图片很大，特别是手机当场拍摄下来的照片（约2M+），那样效率会很低，用户也不会愿意等待。
* 现在能够由前端本地压缩的话，效率将会极大的提升。

## BUG修复 1.0
* 修复android下压缩无效果的问题
* 修复IOS压缩图片扭曲的问题。
* 微信的话... 经过测试，目前新版本都支持触发上传了，大赞！XD


## BUG修复 1.1
* 修复某些网友反映IOS图片方向不对的问题。（说出原因估计会被打死.. 因为我写错参数了..）
* 增加 `angularJs` 支持，双向绑定方式。

## 关于IOS下图片方向依旧不对的问题
> FAQ
Q. Photos from iPhone is rotated and not in correct orientation.
A. Orientation of jpeg file is recorded in EXIF format. This library won't detect exif information automatically. To detect the information in JavaScript, use exif.js (https://github.com/jseidelin/exif-js).

以上是采用的修复IOS Bug的插件中的说明，大意的解决办法是使用 `exif.js` 目前木有精力去修复，愿意帮忙的朋友可以 PR 本库。


![图1](http://think2011.qiniudn.com/LocalResizeIMG1.gif)


## 使用方法-jquery
```javascript
	$('input:file').localResizeIMG({
	     width: 100,
	     quality: 0.1,
	     // before: function () {},
	     success: function (result) {
	     var img = new Image();
	     img.src = result.base64;

	     $('body').append(img);
	     console.log(result);
	     }
	 });
```


## 使用方法-angularjs
1. 引入 `patch/angular-localResizeIMG.js`
2. 直接看代码吧。
```coffeescript
	# js（coffeescript版）
	app = angular.module 'app', ['localResizeIMG']

	# html (任何元素都能够响应上传，无关view，意味着你可以用任何姿势调用)
	<button local-resize-img l-width="300" l-quality="0.7" ng-model="pic">上传</button>
	<img ng-src="pic.base64" />
```


demo
---
具体详情请查看 源代码，或者 [demo](http://think2011.github.io/localResizeIMG/)。

## PS
这是8个月前的测试文章的延伸，[点我去看看](http://my.oschina.net/hzplay/blog/160806)。


> ##### 技术： jquery
> ##### 时间： 2014年5月
> ##### 博客： [think2011](http://think2011.github.io)
