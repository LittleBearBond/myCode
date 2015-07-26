module.exports = function(app) {
    app.get('/', function(arguments) {
        console.log(req.method, req.url);
    });
    app.get('/test', function(arguments) {
        console.log('test')
    });

    app.route('/book')
        .get(function(req, res) {
            res.send('Get a random book');
        })
        .post(function(req, res) {
            res.send('Add a book');
        })
        .put(function(req, res) {
            res.send('Update the book');
        });
};
