# nginx

[](https://zhuanlan.zhihu.com/p/38485095)

```bash
brew install nginx

vim /usr/local/etc/nginx/nginx.conf

ps -ef | grep nginx | grep -v grep

sudo kill -9 `ps -ef | grep nginx  | grep -v grep|awk '{print $2}'`

kill -TERM ps -ef | grep nginx | grep -v grep | awk '{print $2}' #（立刻停止）

sudo nginx -s stop && sudo nginx

sudo pkill nginx

sudo nginx

sudo nginx -s stop

sudo nginx -s reload
```

## 报错解决

> nginx: [error] open() "/usr/local/var/run/nginx.pid" failed (2: No such file or directory)

    sudo nginx (执行该命令之后，nginx 会在 /usr/local/var/run/ 路径下创建一个名为nginx.pid 的文件 )
    sudo nginx -s stop (删除pid文件) 所以在stop后，使用reload启动nginx便会报错，此时使用nginx直接启动便可。
