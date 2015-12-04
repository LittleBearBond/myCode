awk '{print $1,$4}' TestFile
ls -l | awk '{print $3,$5}'
ls -al | awk '{print $5,$9}'| sort -nr
du -s * | sort -nr | head -1



