
let WebpackDevServer = require("webpack-dev-server");
let webpack = require("webpack");
let config = require("./webpack.config");
let compiler = webpack(config);
let server = new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: false,
    stats: {
        colors: true
    },
    publicPath: config.output.publicPath
});
server.listen(8080, "localhost", function() {});
// server.close();
