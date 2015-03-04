var fs = require('fs');

function copy(src, dst) {
	//fs.writeFileSync(dst + '.js', fs.readFileSync(src));
	//大文件拷贝
	fs.createReadStream(src).pipe(fs.createWriteStream(dst+ '.js'));
}

function main(argv) {
	copy(argv[1], argv[0]);
}

console.log(process.argv.slice(0))
main(process.argv.slice(0));
