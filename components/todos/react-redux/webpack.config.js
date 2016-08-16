/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
// http://www.alloyteam.com/2016/01/webpack-use-optimization/#prettyPhoto
// http://zhizhi.betahouse.us/2016/07/12/webapck-gong-ju-jie-shao-he-you-hua/
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulePath = path.join(__dirname, '/node_modules');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let config = {
    entry: {
        /* 'index': ["webpack-dev-server/client?http://localhost:8080/",
             'webpack/hot/only-dev-server',
             path.join(__dirname, './src/components/app.js')],*/
        'todos-index': ["webpack-dev-server/client?http://localhost:8080/",
            'webpack/hot/only-dev-server',
            path.join(__dirname, './src/todos-my/index.js')],
        //'hotcss': [path.join(__dirname, './src/car-check/js/hotcss.js')],
        'react-lib': ['react', 'react-dom', 'redux', 'react-redux']
    },
    output: {
        publicPath: '/',
        //这个路径配置 真TM的坑啊
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',//.[hash:8]
        chunkFilename: '[name].js',//.[hash:8]
    },
    cache: true,
    debug: true,
    devtool: 'sourcemap',
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': path.join(__dirname, '/src/styles'),
            'mixins': path.join(__dirname, '/src/mixins'),
            'components': path.join(__dirname, '/src/components/')
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["react-lib"]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),*/
        /*new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            filename: 'index.html',
            chunks: ['index', 'react-lib']
        }),*/
        new HtmlWebpackPlugin({
            template: './src/todos-my/index.html',
            inject: 'body',
            filename: 'index.html',
            chunks: ['react-lib', 'todos-index']
        }),
       /* new ExtractTextPlugin('./todos/css/index.css', {
            allChunks: true,
        }),*/
    ],
    module: {
        noParse: [],
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel',
        }, {
                test: /(\.css|\.scss)/,
                loader: 'style!css!postcss!sass?outputStyle=expanded'
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader", "css-loader", "postcss-loader", "sass-loader?outputStyle=expanded")
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url?limit=8192'
            }]
    },
    /*通过引用外部文件的方式引入第三方库
    * externals 对象的 key 是给 require 时用的，比如 require('react')，
    * 对象的 value 表示的是如何在 global 中访问到该对象，
    * 这里是 window.React。这时候 index.html 就变成下面这样
    */
    //为什么去掉这个配置，是因为react单独抽离为一个文件，不是每次手动引入的
    /*externals: {
        react: 'React'
    }*/

};
[
    '/react/dist/react.js',
    '/react/dist/react.min.js',
    '/react-dom/dist/react-dom.js',
    '/react-dom/dist/react-dom.min.js',
    '/react-redux/dist/react-redux.js',
    '/react-redux/dist/react-redux.js',
    '/redux/dist/redux.js',
    '/redux/dist/redux.min.js'
].forEach(function (val) {
    let depPath = path.join(nodeModulePath, val);
    config.resolve.alias[val.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});

module.exports = config;