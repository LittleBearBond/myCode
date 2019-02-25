if (window.Promise) {
	debugger
	console.log('Promise found');
	var promise = new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();
		request.open('GET', 'http://api.icndb.com/jokes/random');
		request.onload = function() {
			if (request.status == 200) {
				resolve(request.response); //我们在此处获得了数据，因此解析Promise
			} else {
				reject(Error(request.statusText)); //状态码不是200，因此调用reject
			}
		};
		request.onerror = function() {
			reject(Error('Error fetching data')); //错误发生，拒绝Promise
		};
		request.send(); //发送请求
	});
	console.log('Asynchronous request made.');
	debugger
	promise.then(function(data) {
		debugger
		console.log('Got data! Promise fulfilled.');
		document.getElementByTagName('body')[0].textContent = JSON.parse(data).value.joke;
	}, function(error) {
		debugger
		console.log('Promise rejected');
		console.log(error.message);
	});
} else {
	console.log('Promise not available');
}
