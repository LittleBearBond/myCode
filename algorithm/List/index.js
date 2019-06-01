function Node(val) {
    this.val = val
    this.next = null
}

function List(array) {
    this.head = null
    let i = 0,
        temp = null
    while (i < array.length) {
        if (i === 0) {
            this.head = new Node(array[i])
            temp = this.head
        } else {
            let newNode = new Node(array[i])
            temp.next = newNode
            temp = temp.next
        }
        i++
    }
}

function reverseList(listHead) {
    let pre = null
    while (listHead) {
        // 拿到next
        let next = listHead.next
        // 把当前节点的指到上一个节点
        listHead.next = pre
        //下一个节点的前一个节点就是当前节点
        pre = listHead
        // 移动到下一个节点
        listHead = next
    }
    return pre
}
