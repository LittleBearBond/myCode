var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var config = require('./config');
var _ = require('lodash');
var events = require('events');
var getContentType = require('./content-type-get');

var Server = function(rootPath, opts) {
    var self = this;
    this.rootPath = path.normalize(path.resolve(rootPath || '.'));

    var server = http.createServer(function(request, response) {
        var pathname = decodeURI(url.parse(request.url).pathname);
        var realPath = self.rootPath + pathname;

        fs.stat(realPath, function(err, stat) {
            if (err) {
                response.writeHead(404, getContentType());
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
                return;
            }
            if (stat.isDirectory()) {
                response.writeHead(200, getContentType());
                response.write("This request  isDirectory()");
                response.end();
                return;
            }
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, getContentType());
                    response.end(err);
                    return;
                }

                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Server': 'my-server'
                });

                response.write(file, "binary");
                response.end();
            });
        });
    });

    server.listen(config.port);
    console.log("Server runing at port: " + config.port + ".");
}

_.extend(Server.prototype, {
    isDir: function(path) {
        fs.readdir(path, function(err, list) {

        });
    }
});

exports.server = Server;
