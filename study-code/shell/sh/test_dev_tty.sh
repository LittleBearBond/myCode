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
