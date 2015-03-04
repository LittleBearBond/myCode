var http = require('http');
var options = {
	hostname: 'www.example.com',
	port: 9000,
	path: '/upload',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};

/*var request = http.request(options, function(response) {});
request.write('Hello World');
request.end();*/
http.get('http://www.example.com/', function(response) {
	var body = [];

	console.log(response.statusCode);
	console.log(response.headers);

	response.on('data', function(chunk) {
		body.push(chunk);
	});

	response.on('end', function() {
		body = Buffer.concat(body);
		console.log(body.toString());
	});
});
