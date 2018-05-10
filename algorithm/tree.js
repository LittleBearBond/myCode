var node7 = {
    num: 7,
    children: []
}; //节点7
var node6 = {
    num: 6,
    children: []
};
var node5 = {
    num: 5,
    children: []
};
var node4 = {
    num: 4,
    children: []
};

var node3 = {
    num: 3,
    children: [node6, node7]
};
var node2 = {
    num: 2,
    children: [node4, node5]
};

var node1 = {
    num: 1,
    children: [node2, node3]
};

function logTree({
    num,
    children
}) {
    if (typeof num !== 'undefinded') {
        console.log(num)
    }
    const [left, right] = children;
    left && logTree(left)
    right && logTree(right)
}

logTree(node1)

var preOrderUnRecursion = function (node) {
    if (!node) { //判断二叉树是否为空
        return;
    }
    var preListUnRec = []; //定义保存先序遍历结果的数组
    var stack = [node]; //将二叉树压入栈
    while (stack.length !== 0) { //如果栈不为空，则循环遍历
        node = stack.pop(); //从栈中取出一个结点
        preListUnRec.push(node.value); //将取出结点的值存入数组中
        node.right && stack.push(node.right); //如果存在右子树，将右子树压入栈
        node.left && stack.push(node.left); //如果存在左子树，将左子树压入栈
    }
}

/* 
    前序遍历：访问根–>遍历左子树–>遍历右子树;
    中序遍历：遍历左子树–>访问根–>遍历右子树;
    后序遍历：遍历左子树–>遍历右子树–>访问根;
    广度遍历：按照层次一层层遍历;
 */
var tree = {
    value: "-",
    left: {
        value: '+',
        left: {
            value: 'a',
        },
        right: {
            value: '*',
            left: {
                value: 'b',
            },
            right: {
                value: 'c',
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd',
        },
        right: {
            value: 'e',
        }
    }
}