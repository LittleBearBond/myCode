#!/bin/sh
#============ get the file name ===========
#echo -e "请输入你要读取的文件夹路径\n当前路径为${PWD}"
#read inputDir
#echo "你输入的文件夹路径为${inputDir}"
#
#echo -e "请输入你要将数据输出保存的文件路径n当前路径为${PWD}"
#read outputFile
#echo "输出保存的文件路径为${outputFile}"
#
#: > $outputFile   #清空outputFile
#
#
#循环读取文件夹名
#
tempPath=`pwd`/temp.txt
tempPathAnalysis=`pwd`/temp-analysis.txt
: > $tempPath #清空
: > $tempPathAnalysis #清空

function analysis(){
    for row in $(cat $tempPath)
    do
        ls -al $row >>$tempPathAnalysis
    done
}

function analysisSize(){
    num=`cat $tempPathAnalysis | wc -l`
    echo $num
    awk '{print $5,$9}' $tempPathAnalysis | sort -nr | head -n $num
}

function getFiles() {
    for file in $1/*
    do
        #temp_file=`basename $file_a`
        #echo $temp_file >> $outputFile
        if [ -d $file ]
        then
            #echo -e "$file \033[31m是目录\033[0m"
            getFiles $file
        elif [ -f $file ]
        then
            #echo -e "$file \033[31m是文件\033[0m"
            echo $file >> $tempPath
        fi
    done
}
getFiles /Users/little_bear/files/my-code/myCode/study-code/shell
analysis
analysisSize
#
#filelist=`ls ./`
#for file in $filelist
#do
#    echo $file
#done


# 统计文件大小
#sed -n '$=' filename
#grep '.*' -c filename
#perl -ne 'END {print "$i"} ++$i' filename
#perl -ne 'END {print $.."\n"}' filename
#awk 'END{print NR}' filename
#awk '{print NR}' filename |tail -n1
#grep -n "" filename|awk -F: '{print '}|tail -n1
#wc -l filename|awk '{print }'
#cat filename |wc -l


#function ergodic(){
#  for file in `ls $1`
#  do
#    if [ -d $1"/"$file ]
#    then
#      ergodic $1"/"$file
#    else
#      local path=$1"/"$file
#      local name=$file
#      local size=`du --max-depth=1 $path|awk '{print $1}'`
#      echo $name  $size $path
#    fi
#  done
#}
