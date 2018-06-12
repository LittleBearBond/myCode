// https://juejin.im/post/5b0f9e50518825155911e7be
// https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/how-to-use-service-worker
const CACHE_NAME = `my-web-app-cache${1}`;
const ENV = "development"
const urlsToCache = [
	// '/',
	'/css/main.css',
	'/js/app.js',
	'/js/lib.js'
];

// 监听 service worker 的 install 事件
self.addEventListener('install', function (event) {
	// event.waitUntil takes a promise to know how
	// long the installation takes, and whether it
	// succeeded or not.
	// 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
	if (ENV === 'development') {
		self.skipWaiting();
	}
	event.waitUntil(
		// 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
		caches.open(CACHE_NAME)
			.then(function (cache) {
				console.log('Opened cache');
				// 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
				return cache.addAll(urlsToCache);
			})
	);
});

// self.addEventListener('install', function () {
// 	self.skipWaiting();
// });
self.addEventListener('fetch', function (event) {
	event.respondWith(
		// This method looks at the request and
		// finds any cached results from any of the
		// caches that the Service Worker has created.
		caches.match(event.request).then(function (response) {
			// If a cache is hit, we can return thre response.
			// 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
			if (response && event.request.referrer !== '') {
				return response;
			}

			// Clone the request. A request is a stream and
			// can only be consumed once. Since we are consuming this
			// once by cache and once by the browser for fetch, we need
			// to clone the request.
			// 如果 service worker 没有返回，那就得直接请求真实远程服务
			var fetchRequest = event.request.clone();

			// A cache hasn't been hit so we need to perform a fetch,
			// which makes a network request and returns the data if
			// anything can be retrieved from the network.
			return fetch(fetchRequest).then(function (response) {
				// Check if we received a valid response
				// http请求的返回已被抓到，可以处置了。
				// 请求失败了，直接返回失败的结果就好了。。
				if (!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}

				// Cloning the response since it's a stream as well.
				// Because we want the browser to consume the response
				// as well as the cache consuming the response, we need
				// to clone it so we have two streams.
				var responseToCache = response.clone();
				// 请求成功的话，将请求缓存起来。
				caches.open(CACHE_NAME).then(function (cache) {
					// Add the request to the cache for future queries.
					cache.put(event.request, responseToCache);
				});
				return response;
			});
		})
	);
});

/* self.addEventListener('activate', function (event) {
	var cacheWhitelist = ['page-1', 'page-2'];
	event.waitUntil(
		// Retrieving all the keys from the cache.
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				// Looping through all the cached files.
				cacheNames.map(function (cacheName) {
					// If the file in the cache is not in the whitelist
					// it should be deleted.
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
}); */

self.addEventListener('activate', function (event) {
	event.waitUntil(
		Promise.all([

			// 更新客户端
			self.clients.claim(),

			// 清理旧版本
			caches.keys().then(function (cacheList) {
				return Promise.all(
					cacheList.map(function (cacheName) {
						if (cacheName !== CACHE_NAME) {
							return caches.delete(cacheName);
						}
					})
				);
			})
		])
	);
});
