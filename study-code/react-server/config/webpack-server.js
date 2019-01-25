const path = require("path");
const webpack = require("webpack");
const PnpWebpackPlugin = require('pnp-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
// const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
// const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { cssRegex, cssModuleRegex, sassRegex, sassModuleRegex, lessRegex, serverGetStyleLoaders, resolveApp } = require('./utils')
// // const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodeExternals = require("webpack-node-externals");
const appSrc = resolveApp('src')

// let env = "dev";
// const publicPath = '/';

module.exports = {
    target: "node",
    mode: 'production', //isProd ? 'production' : 'development',
    devtool: 'source-map',
    // entry: resolveApp('src/server.js'),
    entry: resolveApp('src/entry-server.js'),
    output: {
        path: resolveApp('dist'),
        filename: "entry-server.js",
        libraryTarget: "umd"  // 打包成commonjs2规范
    },
    resolve: {
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx',],
        alias: {
            'src': appSrc,
        },
        plugins: [
            PnpWebpackPlugin,
        ],
    },
    resolveLoader: {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.(woff|woff2|eot|ttf|svg)$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        test: /\.(js|mjs|jsx)$/,
                        include: appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides'
                            ),
                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                                            },
                                        },
                                    },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                        },
                    },
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [
                                [
                                    require.resolve('babel-preset-react-app/dependencies'),
                                    { helpers: true },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            sourceMaps: true,
                        },
                    },
                    {
                        test: /\.(ts|tsx)$/,
                        include: appSrc,
                        use: [
                            {
                                loader: require.resolve('ts-loader'),
                                options: {
                                    transpileOnly: true,
                                },
                            },
                        ],
                    },
                    /* {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: serverGetStyleLoaders({
                            importLoaders: 1,
                        }),
                    },
                    {
                        test: cssModuleRegex,
                        use: serverGetStyleLoaders({
                            importLoaders: 1,
                            modules: true,
                            sourceMap: true,
                            getLocalIdent: getCSSModuleLocalIdent,
                        }),
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: serverGetStyleLoaders({ importLoaders: 2, sourceMap: true }, 'sass-loader'),
                    },
                    {
                        test: sassModuleRegex,
                        use: serverGetStyleLoaders(
                            {
                                importLoaders: 2,
                                modules: true,
                                sourceMap: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                            'sass-loader'
                        ),
                    },
                    {
                        test: lessRegex,
                        use: serverGetStyleLoaders({ importLoaders: 2, sourceMap: true }, 'less-loader', { javascriptEnabled: true }),
                    }, */
                    {
                        exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    /*  optimization: {
         splitChunks: {
             chunks: 'all',
             name: false,
         },
         runtimeChunk: true,
     }, */
    externals: [
        NodeExternals({
            whitelist: [/\.css$/]  // 忽略css，让webpack处理
        })
    ],
    plugins: [
        /* new HtmlWebpackPlugin({
            inject: true,
            template: resolveApp('public/index.html'),
            NODE_ENV: process.env.NODE_ENV === "development",
        }), */
        // new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        // new ModuleNotFoundPlugin(resolveApp('.')),
        // new webpack.HotModuleReplacementPlugin(),
        // new serverGetStyleLoaders(),
        // new WatchMissingNodeModulesPlugin(resolveApp('node_modules')),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        /*  new ManifestPlugin({
             fileName: 'asset-manifest.json',
             publicPath: publicPath,
         }), */
        new webpack.DefinePlugin({
            "process.env.REACT_ENV": JSON.stringify("server")
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ],
}
