/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
    if (root === null) {
        return null
    }
    if (root.val === val) {
        return root
    }
    return searchBST(val < root.val ? root.left : root.right, val)
};

var searchBST = function (root, val) {
    if (root === null) {
        return null
    }
    if (root.val === val) {
        return root
    }
    let node = root
    while (node) {
        node = val < node.val ? node.left : node.right
        if (node.val === val) {
            return node
        }
    }
    return node
};
