var Queue = {
    // 保存队列信息
    a: [],
    // 添加到队列 queue
    q: function(d){
        // 添加到队列如果不是函数或者数字则不处理
        if(!/function|number/.test(typeof d)) return;
        Queue.a.push(d);
        // 返回对自身的引用
        return Queue;
    },
    // 执行队列 dequeue
    d: function(){
        var s = Queue.a.shift();
        // 如果已经到了队列尽头则返回
        if(!s) return;

        // 如果是函数，直接执行，然后继续 dequeue
        if(typeof s === "function") {
            s(), Queue.d();
            return;
        }
        // 如果是数字，该数字作为延迟时间，延迟 dequeue
        setTimeout(function(){
            Queue.d();
        }, s);
    }
};
