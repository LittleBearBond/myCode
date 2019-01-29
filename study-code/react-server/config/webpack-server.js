const path = require("path");
const webpack = require("webpack");
const PnpWebpackPlugin = require('pnp-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
// const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { cssRegex, cssModuleRegex, sassRegex, sassModuleRegex, lessRegex, serverGetStyleLoaders, resolveApp } = require('./utils')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");
const appSrc = resolveApp('src')
const shouldUseSourceMap = true;

module.exports = {
    target: "node",
    mode: 'production', //isProd ? 'production' : 'development',
    devtool: 'source-map',
    entry: { app: resolveApp('src/entry-server.js') },
    output: {
        path: resolveApp('dist'),
        filename: "entry-server.js",
        libraryTarget: "umd"
    },
    /* optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({ƒ
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: {
                        inline: false,
                        annotation: true,
                    }
                },
            }),
        ],
    }, */
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
                test: /\.(js|mjs|jsx)$/,
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
                            cacheCompression: true,
                            compact: true,
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
                            cacheCompression: true,

                            sourceMaps: false,
                        },
                    },
                    /* {
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
                     }, */
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        loader: serverGetStyleLoaders({
                            importLoaders: 1,
                            sourceMap: shouldUseSourceMap,
                        }),
                        sideEffects: true,
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        loader: serverGetStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap,
                            },
                            'sass-loader'
                        ),
                        sideEffects: true,
                    },
                    /* {
                        test: cssModuleRegex,
                        sideEffects: true,
                        loader: serverGetStyleLoaders({
                            importLoaders: 1,
                            sourceMap: shouldUseSourceMap,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent,
                        }),
                    }, */
                    /* {
                        test: sassModuleRegex,
                        sideEffects: true,
                        loader: serverGetStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                            'sass-loader'
                        ),
                    },
                    {
                        test: lessRegex,
                        sideEffects: true,
                        use: serverGetStyleLoaders({
                            importLoaders: 2,
                            sourceMap: shouldUseSourceMap,
                        }, 'less-loader', { javascriptEnabled: true }),
                    }, */
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/],
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
        })
    ],
    plugins: [
        /* new HtmlWebpackPlugin({
            inject: true,
            template: resolveApp('public/index.html'),
            NODE_ENV: process.env.NODE_ENV === "development",
        }), */
        new LoadablePlugin({
            filename: "enter-server-manifest.json",
        }),
        /* new ManifestPlugin({
            fileName: 'enter-sever-asset-manifest.json',
            publicPath: '/',
        }), */
        new webpack.DefinePlugin({
            "process.env.REACT_ENV": JSON.stringify("server")
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ],
}
