"use strict";
var path = require('path');
var fs = require('fs');
var thunkify = require('thunkify');

var readDir = (dir, done) => {
	var readFiles = [];

	fs.readdir(dir, function (err, list) {
		if (err) {
			return done(null, readFiles);
		}
		var len = list.length;
		var index = 0;

		list = list.map(function (val) {
			return path.join(dir, val);
		});

		(function next() {
			var fullPath = list[index++];
			if (!fullPath) {
				return done(null, readFiles);
			}

			fs.stat(fullPath, function (err, stat) {
				if (stat && stat.isDirectory()) {
					readDir(fullPath, function (err, res) {
						readFiles = readFiles.concat(res);
						next();
					});
					return;
				}
				readFiles.push({
					fileName: path.basename(fullPath),
					fullPath: fullPath,
					size: stat.size
				});
				//readFiles.push(fullPath);
				next();
			});
		}());

	});
}

function scanDir(dir) {
	var getFullPath = dirPath => fs.readdirSync(dirPath).map(val => path.join(dirPath, val));
	var files = [];
	(function next(list) {
		for (const filePath of list) {
			if (fs.statSync(filePath).isDirectory()) {
				next(getFullPath(filePath))
				continue;
			}
			files.push(filePath)
		}
	}(getFullPath(dir)))
	return files;
}
