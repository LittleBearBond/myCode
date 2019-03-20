# https://coolshell.cn/articles/19219.html

# 查看连接你服务器 top10 用户端的 IP 地址：

netstat -nat | awk '{print $5}' | awk -F ':' '{print $1}' | sort | uniq -c | sort -rn | head -n 10

# 查看一下你最常用的10个命令
cat .bash_history | sort | uniq -c | sort -rn | head -n 10 (or cat .zhistory | sort | uniq -c | sort -rn | head -n 10


alias nis="npm install --save "
alias svim='sudo vim'
alias mkcd='foo(){ mkdir -p "$1"; cd "$1" }; foo '
alias install='sudo apt get install'
alias update='sudo apt-get update; sudo apt-get upgrade'
alias ..="cd .."
alias ...="cd ..; cd .."
alias www='python -m SimpleHTTPServer 8000'
alias sock5='ssh -D 8080 -q -C -N -f user@your.server'
