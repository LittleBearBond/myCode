'use strict';

const webpack = require('webpack');
const path = require('path');
const nodeModulePath = path.join(__dirname, '/node_modules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

let devConfig = require('./webpack.config');

let config = _.extend(true, devConfig, {
    debug: false,
    devtool: false,
});

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    output: {
        comments: false,  // remove all comments
    },
}));

module.exports = config;

// let config = {
//     entry: {
//         'index': ["webpack-dev-server/client?http://localhost:8080/",
//             'webpack/hot/only-dev-server',
//             path.join(__dirname, './src/components/app.js')],
//         'react-lib': ['react', 'react-dom']
//     },
//     output: {
//         publicPath: '/',
//         path: path.join(__dirname, '/dist/'),
//         filename: '[name].[hash:8].js',
//         chunkFilename: '[name].[hash:8].js',
//     },
//     debug: false,
//     devtool: false,
//     stats: {
//         colors: true,
//         reasons: false
//     },
//     /**
//      *   代码热替换, HotModuleReplacementPlugin
//      *   生成html文件，HtmlWebpackPlugin
//      *   将css成生文件，而非内联，ExtractTextPlugin
//      *   报错但不退出webpack进程，NoErrorsPlugin
//      *   代码丑化，UglifyJsPlugin，开发过程中不建议打开
//      *   多个 html共用一个js文件(chunk)，可用CommonsChunkPlugin
//      *   清理文件夹，Clean
//      *   调用模块的别名ProvidePlugin，例如想在js中用$，如果通过webpack加载，需要将$与jQuery对应起来
//      */
//     plugins: [
//         //http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//         new webpack.optimize.CommonsChunkPlugin({
//             name: "react-lib"
//         }),
//         new webpack.optimize.DedupePlugin(),
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.optimize.OccurenceOrderPlugin(),
//         new webpack.optimize.AggressiveMergingPlugin(),
//         new HtmlWebpackPlugin({
//             template: './src/index.html',
//             inject: 'body',
//             filename: 'index.html',
//             chunks: ['index', 'react-lib']
//         }),
//         new webpack.NoErrorsPlugin()
//     ],

//     resolve: {
//         extensions: ['', '.js', '.jsx'],
//         alias: {
//             'styles': path.join(__dirname, '/src/styles'),
//             'mixins': path.join(__dirname, '/src/mixins'),
//             'components': path.join(__dirname, '/src/components/')
//         }
//     },

//     /*externals: {
//         'react': 'React',
//         'react-dom': 'ReactDOM',
//         'redux': 'Redux',
//     },*/

//     module: {
//         noParse: [],
//         loaders: [{
//             test: /\.(js|jsx)$/,
//             exclude: /node_modules/,
//             loader: 'babel-loader'
//         }, {
//                 test: /\.css$/,
//                 loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}'
//             }, {
//                 test: /\.scss/,
//                 loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
//             }, {
//                 test: /\.json$/,
//                 loader: 'json-loader'
//             }, {
//                 test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
//                 loader: 'url-loader?limit=8192'
//             }]
//     }
// };
