#!/bin/sh
#cd /Users/little_bear/files/my-code/myCode/study-code/shell
#
#for ((i=0; i<10; i++)); do
#    touch test_$i.txt
#done
#echo -e "this echo's 3 new lines\n\n\n"
#echo "OK"

##echo "$LOGNAME carried them out at `date`">>myfile
#echo "The log files have all been done"> myfile

#追加到一个文件的末尾，这意味着不覆盖原有的内容
#echo "$LOGNAME carried them out at `date`">>myfile1

#创建一个包含上述三个文件的内容，名为b i g f i l e的文件，可以用输出重定向到新文件中
#cat myfile1 myfile > bigfile

#把 bigfile 的内容加上行号后输入bigfile1 这个文件里
#cat -n bigfile > bigfile1


#cat -b bigfile bigfile1 >>bigfile2

#sort myfile > myfile.sorted

#hello ()
#{
#        echo "Hello there today's date is `date`"
#}
#echo "now going to the function hello"
##调用function
#hello
#echo "back from the function"

#./test01.sh start bond
#./test01.sh stop bond
#./test01.sh stop bond bond

#usage()
#{
#        echo "usage: `basename $0` start|stop process name `date`"
#}
#OPT=$1
#PROCESSID=$1
#
#if [ $# -ne 2 ]; then
#        usage
#        exit 1
#fi
#case $OPT in
#        start|Start) echo "Starting..$PROCESSID"
#        # some process to go here
#        ;;
#        stop|Stop) echo "Stopping..$PROCESSID"
#        # some process to go here
#        ;;
#        *)usage
#        ;;
#esac


#向脚本传递参数时，有时需要将每一个参数偏移以处理选项，这就是s h i f t命令的功能。
#它每次将参数位置向左偏移一位，下面用一段简单脚本详述其功能。脚本使用w h i l e循环反馈
#所有传递到脚本的参数
#loop=0
#while [ $# -ne 0 ] # while there are still arguments
#do
#    echo $1
#    #使用s h i f t命令来处理传递到脚本的每一个参数
#    shift
#done



# tr_case.sh
# case conversion
usage()
{
    # usage
    echo "usage: `basename $0` -[l|u] file [files]" >&2
    exit 1
}
if [ $# -eq 0 ]; then
    # no parameters passed !
    echo "no parameters passed"
    exit 1
fi
while [ $# -gt 0 ]
do
    case $1 in
            -u|-U) echo "-u option specified"
            # do any setting of variables here for lowercase then shift
            shift
            ;;
            -l|-L) echo "-l option specified"
            # do any setting of variables here for uppercase then shift
            shift
            ;;
            #默认走这里
            *) usage
            ;;
    esac
done





