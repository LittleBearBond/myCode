#cat TestFile

#-d后面的冒号表示字段之间的分隔符，-f表示取分割后的哪些字段
#cut -d : -f 1,5 TestFile #这里取出的是第一个和第五个字段。

#从第三个字段开始显示，直到最后一个字段。
#cut -d: -f 3- TestFile

#取每行的前1-4个字符。
#cut -c1-4 TestFile

#取每行的前4个字符。
#cut -c-4 TestFile

#取每行的第4个到最后字符。
#cut -c4- TestFile

#取每行的第一个和第四个字符。
#cut -c1,4 TestFile

#取每行的1-4和第5个字符。
cut -c1-4,5 TestFile
