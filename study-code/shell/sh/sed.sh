#sed一次处理一行文件并把输出送往屏幕。sed把当前处理的行存储在临时缓冲区中，
#称为模式空间(pattern space)。一旦sed完成对模式空间中的行的处理，
#模式空间中的行就被送往屏幕。行被处理完成之后，就被移出模式空间，
#程序接着读入下一行，处理，显示，移出......文件输入的最后一行被处理完以后sed结束。
#通过存储每一行在临时缓冲区， 然后在缓冲区中操作该行，保证了原始文件不会被破坏。

#http://www.cnblogs.com/stephen-liu74/archive/2011/11/17/2245130.html

#命令  功能描述
#a\   在当前行的后面加入一行或者文本。
#c\   用新的文本改变或者替代本行的文本。
#d    从pattern space位置删除行。
#i\   在当前行的上面插入文本。
#h    拷贝pattern space的内容到holding buffer(特殊缓冲区)。
#H    追加pattern space的内容到holding buffer。
#g    获得holding buffer中的内容，并替代当前pattern space中的文本。
#G    获得holding buffer中的内容，并追加到当前pattern space的后面。
#n    读取下一个输入行，用下一个命令处理新的行而不是用第一个命令。
#p    打印pattern space中的行。
#P    打印pattern space中的第一行。
#q    退出sed。
#w file   写并追加pattern space到file的末尾。
#!    表示后面的命令对所有没有被选定的行发生作用。
#s/re/string  用string替换正则表达式re。
#=    打印当前行号码。
#
#替换标记
#g    行内全面替换，如果没有g，只替换第一个匹配。
#p    打印行。
#x    互换pattern space和holding buffer中的文本。
#y    把一个字符翻译为另一个字符(但是不能用于正则表达式)。
#
#选项
#-e   允许多点编辑。
#-n   取消默认输出。

#sed '/north/p' testfile #如果模板north被找到，sed除了打印所有行之外，还有打印匹配行。
#sed -n '/north/p' testfile

#sed '3d' testfile  #第三行被删除，其他行默认输出到屏幕。
#sed '3,$d' testfile  #从第三行删除到最后一行，其他行被打印。$表示最后一行。
#sed '$d' testfile    #删除最后一行，其他行打印。
#sed '/north/d' testfile #删除所有包含north的行，其他行打印。

#s表示替换，g表示命令作用于整个当前行。如果该行存在多个west，都将被替换为north，如果没有g，则只是替换第一个匹配。
#sed 's/west/xiongjian-bear/g' testfile

#-n表示只打印匹配行，如果某一行的开头是west，则替换为north。
#sed -n 's/^west/north/p' testfile

#&符号表示替换字符串中被找到的部分。所有以两个数字结束的行，最后的数字都将被它们自己替换，同时追加.5。
sed 's/[0-9][0-9]$/&.5/' testfile
























