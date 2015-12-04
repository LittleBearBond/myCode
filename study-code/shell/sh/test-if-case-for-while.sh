#! /bin/bash

#http://www.cnblogs.com/stephen-liu74/archive/2011/12/19/2265416.html

#echo -e "are you ok (y/n or Maybe) \c"
#
#read input
#
##if [ "$input" = y -o "$Input" = Y ]
#if [[ "$input" == [yY]* || "$input" = Maybe ]]
#then
#	echo "you are right"
#fi

#echo 'input you names'
#read -a names
#echo "names ${names[0]}-${names[1]}-${names[2]}"

#------------------------------------------
#echo $0- $1-$2- $3- $4
#echo $#
#if (( $# != 2 ))                    #等同于 [ $# -ne 2 ]
#then
#    echo "Usage: $0 arg1 arg2" 1>&2
#    exit 1                         #exit退出值为0-255之间，只有0表示成功。
#fi
#if (( $1 < 0 || $1 > 30 ))      #等同于 [ $1 -lt 0 -o $1 -gt 30 ]
#then
#    echo "arg1 is out of range."
#    exit 2
#fi
#if (( $2 <= 20 ))                  #等同于 [ $2 -le 20 ]
#then
#    echo "arg2 is out of range."
#fi
#------------------------------------------


#if [ "$name" = "" ]                #双引号就表示空字符串。
#then
#    echo "name is null."
#fi
#


#echo -e "How old are you? \c"
#read age
#if [ $age -lt 0 -o $age -gt 120 ]                #等同于 (( age < 0 || age > 120 ))
#then
#    echo "You are so old."
#elif [ $age -ge 0 -a $age -le 12 ]               #等同于 (( age >= 0 && age <= 12 ))
#then
#    echo "You are child."
#elif [ $age -ge 13 -a $age -le 19 ]             #等同于 (( age >= 13 && age <= 19 ))
#then
#    echo "You are 13--19 years old."
#elif [ $age -ge 20 -a $age -le 29 ]             #等同于 (( age >= 20 && age <= 29 ))
#then
#    echo "You are 20--29 years old."
#elif [ $age -ge 30 -a $age -le 39 ]             #等同于 (( age >= 30 && age <= 39 ))
#then
#    echo "You are 30--39 years old."
#else
#    echo "You are above 40."
#fi



#echo -n "Choose a color: "
#read color
#case "$color" in
#[Bb]l??)
#    echo "you select blue color."
#    ;;
#[Gg]ree*)
#    echo "you select green color."
#    ;;
#red|orange)
#    echo "you select red or orange."
#    ;;
#*)
#    echo "you select other color."
#    ;;
#esac
#echo "Out of case command."



#for score in math english physics chemist   #for将循环读取in后面的单词列表，类似于Java的for-each。
#do
#    echo "score = $score"
#done
#echo "out of for loop"


for row in $(cat ../listfile.txt) #TestFile) #for将循环读取cat TestFile命令的执行结果。
do
    echo "row = $row"
done
echo "out of for loop."



#for file in ../bigfile[1-8]                #for将读取bigfile1-bigfile8，后缀为.sh的文件
#do
#    if [ -f $file ]                              #判断文件在当前目录是否存在。
#    then
#        echo "$file exists."
#    fi
#done


#for name in $*                                  #读取脚本的命令行参数数组，还可以写成for name的简化形式。
#do
#    echo "Hi, $name"
#done


#num=0
#while (( num < 10 ))               #等同于 [ $num -lt 10 ]
#do
#    echo -n "$num "
#    let num+=1
#done
#echo -e "\nHere's out of loop."


#go=start
#echo Type q to quit.
#while [[ -n $go ]] #等同于[ -n "$go" ]，如使用该风格，$go需要被双引号括起。
#do
#    echo -n How are you.
#    read word
#    if [[ $word == [Qq] ]]      #等同于[ "$word" = Q -o "$word" = q ]
#    then
#        echo Bye.
#        go=                        #将go变量的值置空。
#    fi
#done



#until who | grep stephen           #循环体内的命令将被执行，直到stephen登录，即grep命令的返回值为0时才退出循环。
#do
#    sleep 1
#    echo "Stephen still doesn't login."
#done


#while (( $# > 0 ))                    #等同于 [ $# -gt 0 ]
#do
#    echo $*
#    shift   #移除一个参数值
#done



#while true
#do
#    echo -n "Are you ready to move on?"
#    read answer
#    if [[ $answer == [Yy] ]]
#    then
#        break
#    else
#        echo "Come on."
#    fi
#done
#echo "Here we are."



#for name in $(cat ../listfile.txt)
#do
#    if [[ $name == stephen ]];
#    then
#        continue
#    else
#        echo "Hello, $name."
#    fi
#done


#if (( $# < 1 ))                                #如果脚本参数的数量小于1，则给出错误提示后退出。
#then
#    echo "Usage: $0 filename " >&2
#    exit 1
#fi
#count=1
#cat $1 | while read line    #参数一中的文件被cat命令输出后，通过管道逐行输出给while read line。
#do
#    let $((count == 1)) && echo "Processing file $1..." > /dev/tty  #该行的echo将输出到当前终端窗口。
#    echo -e "$count\t$line"              #将输出行号和文件中该行的内容，中间用制表符隔开。
#    let count+=1
#done > outfile                               #将while循环中所有的输出，除了>/dev/tty之外，其它的全部输出到outfile文件。


#names=Stephen:Ann:Sheryl:John   #names变量包含的值用冒号分隔。
#oldifs=$IFS                   #保留原有IFS到oldifs变量，便于后面的还原。
#IFS=":"
#for friends in $names                     #这是遍历以冒号分隔的names变量值。
#do
#    echo Hi $friends
#done
#IFS=$oldifs                                   #将IFS还原为原有的值。
#set Jerry Tom Angela   #手动设置参数值
#for classmates in $*                      #再以原有IFS的值变量参数列表。
#do
#    echo Hello $classmates
#done


#function increment() {            #定义函数increment。
#    local sum                           #定义本地变量sum。
#    let "sum=$1+1"
#    return $sum                      #返回值是sum的值。
#}
#echo -n "The num is "
#increment 5                          #increment函数调用。
#echo $?                                #输出increment函数的返回值。



#trap 'echo "Control+C will not terminate $0."' 2   #捕获信号2，即在键盘上按CTRL+C。
#trap 'echo "Control+\ will not terminate $0."' 3   #捕获信号3，即在键盘上按CTRL+\。
#echo "Enter stop to quit shell."
#while true                                                        #无限循环。
#do
#    echo -n "Go Go...."
#    read
#    if [[ $REPLY == [Ss]top ]]                            #直到输入stop或Stop才退出循环和脚本。
#   then
#        break
#    fi
#done

#while getopts xy options                           #x和y是合法的选项，并且将-x读入到变量options中，读入时会将x前面的横线去掉。
#do
#    case $options in
#    x) echo "you entered -x as an option" ;;
#    y) echo "you entered -y as an option" ;;
#    esac
#done

#set a b c d
#echo The last argument is \$$#
#eval echo The last argument is \$$#    #eval命令先进行了变量替换，之后再执行echo命令。


# $#         传递到脚本的参数个数
# $*         以一个单字符串显示所有向脚本传递的参数（可大于9个）
# $$         脚本运行的当前进程的ID号
# $!         后台运行的最后一个进程的ID号
# $@         与$#相同，但使用时加引号，并在引号中返回每个参数
# $-         显示shell使用的当前选项
# $?         显示最后命令的退出状态，0表示无错误（这个变量也常常用来打印输出，在脚本调试时标记某个shell命令或某个函数是否正确执行，但是要注意，$?记载的是最近的函数或命令的退出状态，因此打印时应该立即打印以获得正确的信息）

#echo $#
#echo $*
#echo $$
#echo $!
#echo $@
#echo $-
#echo $?

#SYSTEM=`uname -s`
#if [ $SYSTEM = "Linux" ] ; then
#echo "Linux"
#elif [ $SYSTEM = "FreeBSD" ] ; then
#echo "FreeBSD"
#elif [ $SYSTEM = "Solaris" ] ; then
#echo "Solaris"
#elif [ $SYSTEM = "Darwin" ] ; then
#echo "Mac"
#else
#echo "What?"
#fi
#echo $SYSTEM


