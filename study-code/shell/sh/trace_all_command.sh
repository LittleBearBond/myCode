#! /bin/bash
set -x                                #从该命令之后打开跟踪功能
echo 1st echo                     #将被打印输出的Shell命令
set +x                               #该Shell命令也将被打印输出，然而在该命令被执行之后，所有的命令将不再打印输出
echo 2nd echo                    #该Shell命令将不再被打印输出。
CTRL + D                           #退出命令行文件编辑状态


