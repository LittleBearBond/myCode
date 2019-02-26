// LeetCode 104. Maximum Depth of Binary Tree
var maxDepth = function (rootNode) {
	var find = function (node) {
		if (node == null) {
			return 0
		}
		var deepL = 1;
		var deepR = 1;
		if (node.left != null) {
			deepL += find(node.left)
		}
		if (node.right != null) {
			deepR += find(node.right)
		}
		return deepL > deepR ? deepL : deepR;
	}
	return find(rootNode);
}

// LeetCode 226. Invert Binary Tree

var TreeNode = function (val) {
	this.left = this.tirht = null;
	this.val = val
}

var invertTree = function (node) {
	if (node == null || (node.left == null && node.right == null)) {
		return node;
	}
	var temp = node.left;
	node.left = invertTree(node.right);
	node.right = invertTree(temp);
	return node;
}

// LeetCode 100. Same Tree

var isSameTree = function (l, r) {
	if (l === null && r === null) {
		return true;
	}

	if ((l === null && r !== null) || (l !== null && r === null)) {
		return false;
	}
	if (l.val !== r.val) {
		return false;
	}
	return isSameTree(l.left, r.left) && isSameTree(l.right, r.right);
}
