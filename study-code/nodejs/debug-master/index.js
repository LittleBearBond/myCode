const express = require('express')
const app = express()
const { fork } = require('child_process')

app.get('/', function (req, res) {
    const val = fn()
    res.send(`hello world ${val}`)
})

app.get('/compute', (req, res) => {
    const compute = fork('./compute.js', [], { stdio: 'inherit' });
    compute.send('开启一个新的子进程');

    // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
    compute.on('message', sum => {
        res.end(`Sum is ${sum}`);
        console.log(`Sum is ${sum}`)
        compute.kill();
    });

    // 子进程监听到一些错误消息退出
    compute.on('close', (code, signal) => {
        console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
        compute.kill();
    })

    /* compute.on('exit', (code, signal) => {
        process.exit(code);
    }); */
    /* const exitCompute = () => {
        compute.kill('SIGINT');
    }
    process.off('SIGINT', exitCompute);
    process.on('SIGINT', exitCompute); */
})
app.listen(3000)
