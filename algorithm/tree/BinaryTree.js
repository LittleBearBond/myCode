/**
 * @author 熊建
 * @email xiongjian@didichuxing.com
 * @create date 2018-05-25 11:18:51
 * @modify date 2018-05-25 11:18:51
 * @desc [description]
 */
const Node = function (key) {
	this.left = null
	this.right = null
	this.key = key
}

function BinaryTree() {
	this.root = null

	//中  前   后
	let inOrderTraverseNode, preOrderTraverseNode, postOrderTraverseNode;
	//中，先遍历左节点 再输出自己 再遍历右节点，输出的值是有序的
	this.inOrderTraverseNode = inOrderTraverseNode = function (node, callback) {
		if (node !== null) {
			inOrderTraverseNode(node.left, callback)
			callback(node.key)
			inOrderTraverseNode(node.right, callback)
		}
	}

	//前序遍历 复制一个二叉树
	this.preOrderTraverseNode = preOrderTraverseNode = function (node, callback) {
		if (node !== null) {
			//先输出当前节点
			callback(node.key)
			//再访问左子树
			preOrderTraverseNode(node.left, callback)
			//再访问右字数
			preOrderTraverseNode(node.right, callback)
		}
	}
	this.postOrderTraverseNode = postOrderTraverseNode = function (node, callback) {
		if (node !== null) {
			//先访问左子树
			postOrderTraverseNode(node.left, callback)
			//再访问右字数
			postOrderTraverseNode(node.right, callback)
			//最后出当前节点
			callback(node.key)
		}
	}
	let searchNode = this.searchNode = function (node, key) {
		if (node === null) {
			return;
		}
		if (key < node.key) {
			return searchNode(node.left, key)
		} else if (key > node.key) {
			return searchNode(node.right, key)
		} else {
			return node
		}
	}
	const findMaxNode = function () {
		while (node && node.right !== null) {
			node = node.right
		}
		return node
	}
	this.findMaxNode = function () {
		if (!this.root) {
			return null
		}
		return findMaxNode(this.root)
	}
	const findMinNode = function (node) {
		while (node && node.left !== null) {
			node = node.left
		}
		return node
	}
	this.findMinNode = function () {
		if (!this.root) {
			return null
		}
		return findMinNode(this.root)
	}
	const removeNode = function (node, key) {
		if (key < node.key) {
			node.left = removeNode(node.left, key)
		} else if (key > node.key) {
			node.right = removeNode(node.right, key)
		} else {
			if (node.left === null && node.right === null) {
				node = null
				return node
			}
			if (node.left === null) {
				return node = node.right
			}
			if (node.right === null) {
				return node = node.left
			}
			const maxNode = findMinNode(node.right)
			node.key = maxNode.key
			node.right = removeNode(node.right, key)
			return node;
		}
	}
	this.removeNode = function (key) {
		removeNode(this.root, key)
	}
}

Object.assign(BinaryTree.prototype, {
	insert: function (key) {
		const node = new Node(key)
		if (this.root === null) {
			this.root = node;
			return
		}
		this.insertNode(this.root, node)
	},
	insertNode: function (node, newNode) {
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
	},
	inOrderTraverse: function (callback) {
		this.inOrderTraverseNode(this.root, callback)
	},
	preOrderTraverse: function (callback) {
		this.preOrderTraverseNode(this.root, callback)
	},
	postOrderTraverse: function (callback) {
		this.postOrderTraverseNode(this.root, callback)
	},
	findNode: function (key) {
		return this.searchNode(this.root, key)
	}
})

var tree = new BinaryTree();
const arr = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6]
arr.forEach(val => tree.insert(val))

//中序遍历，直接输入有序的值
// tree.inOrderTraverse(console.log)
//输出值是有序的
//[3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25]

//前序遍历，用于拷贝一颗数
// tree.preOrderTraverse(console.log)
//输出值和当初构造这棵树的数组一样，复制一份
//[11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6]

//后续遍历，先输出最下层的值
// tree.postOrderTraverse(console.log)

tree.findNode(6)
