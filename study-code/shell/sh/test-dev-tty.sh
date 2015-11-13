#!/bin/bash
printf "enter new password" #提示输入
stty -echo #"关闭自动打印输入字符的功能
read p < /dev/tty
printf "\nenter again"
read p1 < /dev/tty
printf "\n"
stty echo #打开自动打印输入
echo "p =" $p
echo "p1 = " $p1
echo  "all done"

#/dev/tty 当程序打开此文件是，Linux会自动将它重定向到一个终端窗口，因此该文件对于读取人工输入时特别有用

#printf "Enter new password: "    #提示输入
#stty -echo                               #关闭自动打印输入字符的功能
#read password < /dev/tty         #读取密码
#printf "\nEnter again: "             #换行后提示再输入一次
#read password2 < /dev/tty       #再读取一次以确认
#printf "\n"                               #换行
#stty echo                                #记着打开自动打印输入字符的功能
#echo "Password = " $password #输出读入变量
#echo "Password2 = " $password2
#echo "All Done"


#Enter new password:             #这里密码的输入被读入到脚本中的password变量
#Enter again:                    #这里密码的输入被读入到脚本中的password2变量
#Password = hello
#Password2 = hello
#All Done
