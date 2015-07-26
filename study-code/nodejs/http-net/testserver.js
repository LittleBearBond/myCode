var http = require('http');

http.createServer(function(request, response) {
	/*    response.writeHead(200, { 'Content-Type': 'text-plain' });
	response.end('Hello World\n');
	*/
	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	var body = [];

	console.log(request.method);
	console.log(request.headers);

	request.on('data', function(chunk) {
		body.push(chunk);
		response.write(chunk);
	});

	request.on('end', function() {
		body = Buffer.concat(body);
		console.log(body.toString());
		response.end('Hello World--end\n');
	});

}).listen(9000);
