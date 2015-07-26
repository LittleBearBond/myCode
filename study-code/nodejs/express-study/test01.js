var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
/*app.get('/', function(req, res) {
    app.set('title', 'My Site');
    res.send('hello world' + app.get('title') + app.get('env'));
});*/

/*// all environments
app.configure(function() {
    app.set('title', 'My Application');
})

// development only
app.configure('development', function() {
    app.set('db uri', 'localhost/dev');
})

// production only
app.configure('production', function() {
    app.set('db uri', 'n.n.n.n/prod');
})*/
app.set('title', 'My Site');
// simple logger
app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    //console.dir(req.query)
    //console.dir(req.body)
    //console.dir(req)
    //console.log(app.get('title'))
    //console.log(app.configure);
    /*fs.rename(__dirname + '/tmp/hello1.js', __dirname + '/tmp/hello.js', function(err) {
        if (err) throw err;
        fs.stat(__dirname + '/tmp/hello1.js', function(err, stats) {
            if (err) throw err;
            console.log('stats: ' + JSON.stringify(stats));
        });
    });*/
    fs.writeFile(__dirname + '/tmp/hello.js', JSON.stringify(req.query), function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
    next();
});

app.use(express.static(__dirname + '/tmp'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
//app.use(express.logger());
// respond
app.use(function(req, res, next) {
    res.send('Hello World:' + __dirname);
});
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
app.all('*', function() {
    console.log(1)
    next();
}, function() {
    console.log(2)
    next();
});
app.get('/user/:id?', function(req, res) {
    console.log(req.route);
});
/*app.locals({
  title: 'My App',
  phone: '1-250-858-9990',
  email: 'me@myapp.com'
});*/
//http.createServer(app).listen(3000);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
    secret: 'a743894a0e'
}));
app.listen(3000);
