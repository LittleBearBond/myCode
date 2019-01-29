// style files regexes
const fs = require("fs");
const path = require("path");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.(less)$/;
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const cssPlugins = () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
        autoprefixer: {
            flexbox: 'no-2009',
        },
        stage: 3,
    }),
];

const getStyleLoaders = (cssOptions, nextProcessor, lodaerOption = {}, preLoader) => {
    const loaders = [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: true,
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: cssPlugins,
            },
        },
    ];
    if (preLoader) {
        loaders.unshift(preLoader)
    }
    if (nextProcessor) {
        loaders.push({
            loader: require.resolve(nextProcessor),
            options: {
                sourceMap: true,
                ...lodaerOption
            },
        });
    }
    return loaders;
};

module.exports = {
    cssRegex,
    cssModuleRegex,
    sassRegex,
    sassModuleRegex,
    lessRegex,
    resolveApp,
    getStyleLoaders
}
