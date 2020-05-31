# demo

```base
mkdir webpack-react

cd webpack-react

tnpm init -y

tnpm i webpack webpack-cli -D

```

## package.json 中 scripts  add build

```json
"scripts": {
    "dev": "NODE_ENV=development webpack --config webpack.conf.js",
    "build": "NODE_ENV=production webpack --config webpack.conf.js"
}
```

## add src/index.js

## add webpack.conf.js

```js
const path = require('path')

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
console.log(isEnvDevelopment, isEnvProduction)

const rootDir = process.cwd();
const resolvePath = relativePath => path.resolve(rootDir, relativePath);

module.exports = {
  entry: ['./src/index.js', './src/index1.js'],
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  devtool: isEnvDevelopment ? 'cheap-module-source-map' : 'source-map',
  output: {
    // 告诉Webpack结果存储在哪里
    path: resolvePath('./build'),
    // 在 bundle 中引入「所包含模块信息」
    pathinfo: isEnvDevelopment,
    // 打包后的文件名
    filename: isEnvProduction ? 'bundle.js' : '[name].[contenthash:8].chunk.js',
    // TODO: remove this when upgrading to webpack 5
    futureEmitAssets: true,
    //模板、样式、脚本、图片等资源对应的server上的路径
    publicPath: "/",
  }
};
```
