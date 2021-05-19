function Node(val) {
    this.val = val
    this.next = null
}

function isPalindrome(head) {

    let curr = head;
    const reverse = function (node) {
        if (node === null) {
            return true;
        }
        const res = reverse(node.next);
        let ret = res && curr.val === node.val
        curr = curr.next
        return ret
    }
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

// 请判断一个链表是否为回文链表。
// 1221
function List() {
    let next = this.head = new Node(1);
    next = next.next = new Node(2)
    next = next.next = new Node(3)
    next = next.next = new Node(4)
    next = next.next = new Node(3)
    next = next.next = new Node(2)
    next = next.next = new Node(1)
    return this.head
}

let list = new List();
// https://leetcode-cn.com/problems/palindrome-linked-list/submissions/
/**
 * 判断链表是否是回文，主要通过递归加栈的数据结构来搞
 * @param {*} head
 */
const isPalindrome = function (head) {
    let left = head
    const traverse = function (right) {
        if (right === null) {
            return true
        }
        let res = traverse(right.next)
        res = res && (left.val === right.val)
        left = left.next
        return res
    };
    return traverse(head)
};
/**
 * 三个指针  三句话搞定
 * @param {}} head
 * @returns
 */
function reverse(head) {
    let pre = null
    while (head) {
        head.next = pre
        pre = heads
        head = head.next
    }
    return head
}

function findListCenter(head) {

}
// https://leetcode-cn.com/problems/merge-k-sorted-lists/comments/
/**
 * 分而治之，两两合并再合并，这个效率肯定是一般的
 * @param {} list
 */
var mergeKLists = function (lists) {
    if (!lists) {
        return lists
    }
    if (lists.length === 1) {
        return lists[0]
    }
    if (lists.length === 2) {
        return mergeList(lists[0], lists[1])
    }
    const mid = Math.floor(lists.length / 2)
    return mergeList(lists.slice(0, mid), lists.slice(mid))
};


// 合并两个链表
function mergeList(l, r) {
    if (l === null && r === null) {
        return null
    }
    if (l === null) {
        return r
    }
    if (r === null) {
        return l
    }
    let preHead, head
    while (l && r) {
        if (l.val < r.val) {
            if (!preHead) {
                preHead = l
                head = l
            } else {
                head.next = l
                head = head.next
            }
            l = l.next
        } else {
            if (!preHead) {
                preHead = r
                head = r
            } {
                head.next = r;
                head = head.next
            }
            r = r.next
        }
    }
    head.next = l ? l : r;
    return preHead
}

function reverseKGroup(head, k) {
    let start = head;
    let end = head;
    for (let i = 0; i < k; i++) {
        if (end == null) {
            return head
        } else {
            end = end.next
        }
    }
    const newHead = reverse(start, end)
    start.next = reverseKGroup(end, k)
    return newHead
}

function reverse(start, end) {
    let pre = null;
    let curr = start;
    let next = start
    while (curr != end) {
        next = curr.next
        curr.next = pre
        pre = curr
        curr = next
    }
    return pre
}

function reverse(head) {
    let pre = null;
    let curr = head
    while (curr) {
        let next = curr.next
        curr.next = pre
        pre = curr
        curr = next
    }
}

var hasCycle = function (head) {
    if (!head || !head.next) {
        return false
    }
    let slow = head;
    let fast = head
    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if (fast === slow) {
            return true
        }
    }
    return false
};

var sortList = function (head) {
    if (!head) {
        return null
    }
    if (!head.next) {
        return head
    }
    const center = findCenter(head);
    const nextHead = center.next
    // 断开
    center.next = null
    const leftSort = sortList(head)
    const rightSort = sortList(nextHead)
    return mergeList(leftSort, rightSort)
};

function findCenter(head) {
    if (head === null || !head.next) {
        return head
    }
    let slow = head
    let fast = head.next
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    return slow
}

function mergeList(l, r) {
    if (l === null && r === null) {
        return null
    }
    if (l === null) {
        return r
    }
    if (r === null) {
        return l
    }
    let newHead, head;
    while (l && r) {
        if (l.val < r.val) {
            if (!newHead) {
                head = l;
                newHead = l
            } else {
                head.next = l
            }
            l = l.next
        } else {
            if (!newHead) {
                head = r;
                newHead = r
            } else {
                head.next = r
            }
            r = r.next
        }
    }
    head.next = l ? l : r
    return newHead;
}
