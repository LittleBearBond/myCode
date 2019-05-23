/* eslint-disable no-unused-vars */
const Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
}
function BinarySearchTree() {
    this.root = null
}

BinarySearchTree.prototype.insert = function (key) {
    const node = new Node(key);
    if (this.root === null) {
        this.root = node;
    } else {
        this.insertNode(this.root, node)
    }
}
BinarySearchTree.prototype.insertNode = function (node, newNode) {
    //左侧
    if (newNode.key < node.key) {
        if (node.left === null) {
            node.left = newNode
        } else {
            this.insertNode(node.left, newNode)
        }
    } else {
        if (node.right === null) {
            node.right = newNode
        } else {
            this.insertNode(node.right, newNode)
        }
    }
}
var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

tree.insert(6);


var inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.key);
        inOrderTraverseNode(node.right, callback);
    }
};
var preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
        callback(node.key);
        preOrderTraverseNode(node.left, callback);
        preOrderTraverseNode(node.right, callback);
    }
};
var postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
        postOrderTraverseNode(node.left, callback);
        postOrderTraverseNode(node.right, callback);
        callback(node.key);
    }
};
var minNode = function (node) {
    if (node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node.key;
    }
    return null;
};
var maxNode = function (node) {
    if (node) {
        while (node && node.right !== null) {
            node = node.right;
        }
        return node.key;
    }
    return null;
};
var searchNode = function (node, key) {
    if (node === null) {
        return false
    }
    if (node.key < key) {
        searchNode(node.right, key)
    } else if (node.key > key) {
        searchNode(node.left, key)
    } else {
        return true
    }
};
var removeNode = function (node, key) {
    if (node === null) { //{2}
        return null;
    }
    if (key < node.key) { //{3}
        node.left = removeNode(node.left, key); //{4}
        return node; //{5}
    } else if (key > node.key) { //{6}
        node.right = removeNode(node.right, key); //{7}
        return node; //{8}
    } else { //键等于node.key
        //第一种情况——一个叶节点
        if (node.left === null && node.right === null) { //{9}
            node = null; //{10}
            return node; //{11}
        }
        //第二种情况——一个只有一个子节点的节点
        if (node.left === null) { //{12}
            node = node.right; //{13}
            return node; //{14}
        } else if (node.right === null) { //{15}
            node = node.left; //{16}
            return node; //{17}
        }
        //第三种情况——一个有两个子节点的节点
        //找到右侧最小值
        var aux = findMinNode(node.right); //{18}
        //把这个值更新到当前这个节点
        node.key = aux.key; //{19}
        //移除原来这个节点
        node.right = removeNode(node.right, aux.key); //{20}
        //返回给父级
        return node; //{21}
    }
};

var removeNode = function (node, key) {
    if (node === null) {
        return node
    }
    if (node.key < key) {
        node.left = removeNode(node.right, key)
        return node
    }
    if (node.key > key) {
        node.right = removeNode(node.left, key)
        return node
    }
    if (node.left === null && node.right === null) {
        node = null
        return node
    }
    if (node.left === null) {
        node = node.right;
        return node
    }
    if (node.right === null) {
        node = node.left;
        return node
    }
    //找到右侧最小值
    var aux = findMinNode(node.right);
    //把这个值更新到当前这个节点
    node.key = aux.key;
    //移除原来这个节点
    node.right = removeNode(node.right, aux.key);
    //返回给父级
    return node;
}


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
