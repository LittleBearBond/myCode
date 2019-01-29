process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const wpconfig = require('../config/webpack.config.dev');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const webpack = require('webpack');
const extend = require('extend');
const { resolveApp } = require('../config/utils')

const PORT = process.env.PORT || 3008
const HOST = process.env.HOST || 'localhost'
const isInteractive = process.stdout.isTTY;
const devServerConfig = {
    stats: 'minimal',

    contentBase: resolveApp('./public'),
    watchContentBase: true,
    compress: true,
    publicPath: '/',
    historyApiFallback: {
        disableDotRule: true,
    },
    hot: true,
    quiet: true,
    port: PORT,
    noInfo: false,
    watchOptions: {
        poll: 1000 // 每秒检查一次变更
    },
    before(app, server) {
        app.use(evalSourceMapMiddleware(server));
        app.use(errorOverlayMiddleware());
        app.use(noopServiceWorkerMiddleware());
    }
}
const webpackConfig = extend(true, wpconfig, {
    devServer: devServerConfig
});

(async function start() {
    let port;
    try {
        await checkBrowsers(resolveApp('.'), isInteractive)
        port = await choosePort(HOST, PORT);
    } catch (err) {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
        return
    }
    const devServer = new WebpackDevServer(webpack(webpackConfig), extend(devServerConfig, {
        port: port
    }))
    // devServer.app.use(mock.reWriteResponseMiddleware);
    devServer.listen(port, HOST, err => {
        if (err) {
            return console.log(err);
        }
        if (isInteractive) {
            clearConsole();
        }
        console.log(chalk.cyan('Starting the development server...\n'));
        console.log(chalk.cyan('启动服务中...\n'));
        openBrowser(`http://${HOST}:${PORT}`);
    });
    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
        process.on(sig, function () {
            devServer.close();
            process.exit();
        });
    });
}())
