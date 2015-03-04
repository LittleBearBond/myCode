/*var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
bin[0]; // => 0x68;
var str = bin.toString('utf-8'); // => "hello"
var bin = new Buffer('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>*/

/*var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>*/


/*var rs = fs.createReadStream(src);

rs.on('data', function (chunk) {
    rs.pause();
    doSomething(chunk, function () {
        rs.resume();
    });
});

rs.on('end', function () {
    cleanUp();
});*/

//根据.write方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了，
//并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data', function(chunk) {
	if (ws.write(chunk) === false) {
		rs.pause();
	}
});

rs.on('end', function() {
	ws.end();
});

ws.on('drain', function() {
	rs.resume();
});
