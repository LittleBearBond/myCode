const express = require("express");
const fs = require("fs");
const path = require("path");
const ReactDOMServer = require("react-dom/server");
const favicon = require('serve-favicon');
const React = require("react");
// const { Helmet } = require("react-helmet");

const app = express();
const { matchPath } = require('react-router-dom');
const { ChunkExtractor, ChunkExtractorManager } = require("@loadable/server");
let entrySererManifest = require("../dist/enter-server-manifest.json");
let { render, routes } = require("../dist/entry-server");
let template = fs.readFileSync("./dist/index.html", "utf-8");

// 静态资源映射到dist路径下
app.use("/static", express.static(path.join(__dirname, "../dist/static")));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

app.get("*", (req, res, next) => {
    console.log("======enter server======");
    const url = req.url === '/favicon.ico' ? '/' : req.url
    console.log("visit url: " + req.url);
    const currentRoute = routes.find(route => matchPath(url, route)) || {};
    const promise = currentRoute.fetchData ? currentRoute.fetchData() : Promise.resolve(null);

    const extractor = new ChunkExtractor({
        stats: entrySererManifest,
        entrypoints: ['app']  // 入口entry
    });

    promise.then(data => {
        const context = {
            data,
        };
        const html = ReactDOMServer.renderToString(React.createElement(
            ChunkExtractorManager,
            { extractor },
            render(url, context)));

        // console.log(Helmet.renderStatic())
        console.log(extractor.getLinkTags(), extractor.getStyleTags())
        const htmlStr = template
            .replace("<!--render-string-->", html)
            .replace("<!--react-ssr-head-->",
                `${extractor.getLinkTags()}\n${extractor.getStyleTags()}
                <script>window.__ROUTE_DATA__ = ${JSON.stringify(data)}</script> `)

        // 将渲染后的html字符串发送给客户端
        res.send(htmlStr);
    }).catch(console.log);
});

app.listen(3000, () => {
    console.log("Your app is running, listening port 3000");
});
