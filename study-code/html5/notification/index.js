// https://www.zhangxinxu.com/wordpress/2016/07/know-html5-web-notification/
// https://juejin.im/post/5c6df433f265da2de80f5eda
var options = {
	// tag：代表通知的一个识别标签，相同tag时只会打开一个通知窗口。
	// renotify: 布尔值。相同tag，新通知出现的时候是否替换之前的(开启此项，tag必须设置)。
	dir: "auto", // 文字方向
	body: "通知：OBKoro1评论了你的朋友圈", // 通知主体
	requireInteraction: true, // 不自动关闭通知
	// 通知图标
	icon: "https://upload-images.jianshu.io/upload_images/5245297-818e624b75271127.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
};

notifyMe('这是通知的标题', options);

function notifyMe(title, options) {
	// 先检查浏览器是否支持
	if (!window.Notification) {
		console.log('浏览器不支持通知');
		return;
	}
	// 检查用户曾经是否同意接受通知
	if (Notification.permission === 'granted') {
		return new Notification(title, options); // 显示通知
	}

	if (Notification.permission !== 'default') {
		// denied 用户拒绝
		console.log('用户曾经拒绝显示通知');
		return;
	}

	// 用户还未选择，可以询问用户是否同意发送通知
	Notification.requestPermission()
		.then(permission => {
			if (permission === 'granted') {
				console.log('用户同意授权');
				return new Notification(title, options); // 显示通知
			}
			if (permission === 'default') {
				console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
				return
			}
			// denied
			console.log('用户拒绝授权 不能显示通知');
		});
}
