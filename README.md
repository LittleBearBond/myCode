### [说明地址](https://www.zybuluo.com/xj3614/note/138482)
## 怎么让这个程序跑起来
> * 拿到所有文件（包括所有node_modules）
> * 本机环境配置，安装nodejs，Mysql可以不装，直接连接服务器测试库
> * 添加配置，程序是读取当前电脑的mac地址后，根据mac地址再读取对应的配置项。所以需要知道本机mac地址，然后在根目录，添加一个mac地址名字的js文件，输入相关配置项。具体配置可以参见现有的配置，数据库注意使用测试库。
> * 在config中添加本机相关的配置项，大致代码如下
```javascript
 var aObj = {
                "04-7D-7B-9B-D3-25": { //有线网卡
                    cms: "F:\\work\\cms\\"
                },
                "00-12-7B-71-10-86": { //无线网卡
                    cms: "F:\\work\\cms\\"
                },
                //fe.neibu服务器
                "84-8F-69-E3-B1-91": {
                    cms: "D:\\work\\cms\\"
                },
                //熊建
                "B0-83-FE-84-26-B6": {
                    cms: "E:\\Work-XDF\\cms-svn\\cms\\"
                }
                //这里天机一个自己机器的mac地址
                //cms是本机存储专题的svn文件的地址
            }
```
> * 在程序根目录，按住shift键，右键点击空白处，选择“在此处新建命令窗口” 弹出命令窗口，输入，node app.js。如果没有报错，及时启动成功

一般启动该程序是node app.js但是他这个程序不是这样滴，是有个bat批处理命令，里面写的是
```cmd
@echo off
%~d0
cd %~dp0
:nodeapp
call supervisor app
goto nodeapp
```
最关键的一句supervisor app。这句来启动node。supervisor是一个nodejs包，必须安装到全局，这个包的作用就是监控你的代码，一但你的代码有改动就机会自动重启nodejs服务。如果你要点击feCenter.bat来启动node，那么你就必须要把supervisor这个包先安装到全局

------
