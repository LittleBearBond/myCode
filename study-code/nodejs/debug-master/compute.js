const computation = () => {
    let a = 0
    let b;
    console.info('计算开始');
    console.time('计算耗时');
    while (a++ < 10 ** 6) {
        b = Number(new Date)
    }
    console.info('计算结束');
    console.timeEnd('计算耗时');
    return b
}

process.on('message', msg => {
    console.log(msg, 'process.pid', process.pid); // 子进程id
    console.log(msg, 'process.ppid', process.ppid); // 父进程id
    const sum = computation();
    // 如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息
    process.send(sum);
})


