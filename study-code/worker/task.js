self.onmessage = function (message) {
	console.log(message)
	var data = message.data;
	data.msg = 'Hi from task.js';
	self.postMessage(data);
}

// File: worker.js
// self.close();
