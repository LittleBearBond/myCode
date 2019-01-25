const path = require("path");
const webpack = require("webpack");
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const { cssRegex, cssModuleRegex, sassRegex, sassModuleRegex, lessRegex, getStyleLoaders, resolveApp } = require('./utils')
// // const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

const appSrc = resolveApp('src')

let env = "dev";
let isProd = false;
if (process.env.NODE_ENV === "production") {
    env = "prod";
    isProd = true;
}

const publicPath = '/';

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        resolveApp('src/entry-client.js'),
    ],
    output: {
        path: resolveApp('dist'),
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    resolve: {
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx',],
        alias: {
            'react-native': 'react-native-web',
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
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),

                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: appSrc,
            },
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
                        use: getStyleLoaders({
                            importLoaders: 1,
                        }),
                    },
                    {
                        test: cssModuleRegex,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            modules: true,
                            sourceMap: true,
                            getLocalIdent: getCSSModuleLocalIdent,
                        }),
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: getStyleLoaders({ importLoaders: 2, sourceMap: true }, 'sass-loader'),
                    },
                    {
                        test: sassModuleRegex,
                        use: getStyleLoaders(
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
                        use: getStyleLoaders({ importLoaders: 2, sourceMap: true }, 'less-loader', { javascriptEnabled: true }),
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
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        runtimeChunk: true,
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: resolveApp('public/index.html'),
            NODE_ENV: process.env.NODE_ENV === "development",
        }),
        // new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        new ModuleNotFoundPlugin(resolveApp('.')),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(resolveApp('node_modules')),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: publicPath,
        }),
        new webpack.DefinePlugin({
            "process.env": require("./" + env + ".env")
        })
    ],
}
