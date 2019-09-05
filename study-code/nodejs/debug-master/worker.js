// worker.js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plan'
  });
  res.end('I am worker, pid: ' + process.pid + ', ppid: ' + process.ppid);
  if (Math.random() > 0.5) {
    throw new Error('worker process exception!'); // 测试异常进程退出、重启
  }
});

let worker;
process.title = 'node-worker'
process.on('message', (message, sendHandle) => {
  if (message === 'server') {
    worker = sendHandle;
    worker.on('connection', (socket) => server.emit('connection', socket));
  }
});

process.on('uncaughtException', (err) => {
  console.log(err);
  process.send({ act: 'chongqi' });
  worker.close(() => process.exit(1))
})
