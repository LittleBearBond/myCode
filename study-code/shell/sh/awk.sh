awk '{print $1,$4}' TestFile
ls -l | awk '{print $3,$5}'
ls -al | awk '{print $5,$9}'| sort -nr
du -s * | sort -nr | head -1


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
