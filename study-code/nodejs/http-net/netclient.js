var net = require('net');
var options = {
	port: 9000,
	host: 'www.example.com'
};

var client = net.connect(options, function() {
	client.write([
		'GET / HTTP/1.1',
		'User-Agent: curl/7.26.0',
		'Host: www.baidu.com',
		'Accept: */*',
		'',
		''
	].join('\n'));
});

client.on('data', function(data) {
	console.log(data.toString());
	client.end();
});

client.on('error', function(data) {
	console.log(data.toString());
});
