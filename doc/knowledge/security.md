# security

* XSS攻击与防御

1、反射型XSS

2、存储型XSS

3、DOM XSS

    过滤转义输入输出、避免使用eval，new Function、对用户输入或者获取的关键字符都进行过滤与转义、cookiehttp only

* CSRF攻击 跨站请求伪造

1、检测http referer

2、避免登录的session长时间存储在客户端中

3、验证码或者token机制

* HTTP劫持与对策

1、最好的解决方式也就是使用HTTPS，不过HTTPS也可能被运营商劫持，去掉js后缀名

* 界面操作劫持

1、页面被iframe嵌套了，监测top
