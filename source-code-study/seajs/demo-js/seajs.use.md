------
```
<script src="path/to/sea.js"></script>
<script>
  seajs.use('./main');
</script>
```
##seajs.use seajs.use(id, callback?)
通过 `use` 方法，可以在页面中加载任意模块：

```js
// 加载模块 main，并在加载完成时，执行指定回调
seajs.use('./main', function(main) {
  main.init();
});

//并发加载模块 a 和模块 b，并在都加载完成时，执行指定回调
seajs.use(['./a', './b'], function(a, b) {
  a.init();
  b.init();
});
```

##与 DOM ready 的关系
**注意**：`seajs.use` 与 `DOM ready` 事件没有任何关系。如果某些操作要确保在 DOM ready 后执行，需要使用 `jquery` 等类库来保证，比如：
```js
seajs.use(['jquery', './main'], function($, main) {
  $(function() {
    main.init();
  });
});
```
