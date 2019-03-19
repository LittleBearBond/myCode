# progressive web app： 渐进式网页应用

- [饿了么的 PWA 升级实践](https://zhuanlan.zhihu.com/p/27853228)
- [PWA介绍及快速上手搭建一个PWA应用](https://juejin.im/post/5ae2f82f6fb9a07acd4d761e)
- [深入理解 PWA](https://juejin.im/post/5c07493951882516cd70d213#heading-11)

## 关键技术

- Service Worker （可以理解为服务工厂）
- Manifest （应用清单）
- Push Notification（推送通知）
- Web storage（IndexedDB, Caches）

## Service Worker

[test-code](../../study-code/serviceworker/index.html)

## 桌面小图标

```html
<!-- 加载清单 -->
<link rel="manifest" href="./manifest.json">
```

### manifest

```json
{
    "short_name": "pwa",
    "name": "pwa - demo", // 应用名称
    "icons": [ // 应用显示图标，根据容器大小适配
        {
            "src": "assets/imgs/48.png",
            "type": "image/png",
            "sizes": "48x48"
        },
        {
            "src": "assets/imgs/96.png",
            "type": "image/png",
            "sizes": "96x96"
        },
        {
            "src": "assets/imgs/192.png",
            "type": "image/png",
            "sizes": "192x192"
        }
    ],
    "background_color": "#2196F3", // 刚打开页面时的背景
    "theme_color": "#2196F3", // 主题颜色
    "display": "standalone", //独立显示
    "start_url": "index.html?launcher=true" // 启动的页面
}
```
