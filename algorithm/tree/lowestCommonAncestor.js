/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    //发现目标节点则通过返回值标记该子树发现了某个目标结点
    if (root === null || root === p || root === q) {
        return root;
    }
    //查看左子树中是否有目标结点，没有为null
    var left = lowestCommonAncestor(root.left, p, q);

    //查看右子树是否有目标节点，没有为null
    var right = lowestCommonAncestor(root.right, p, q);

    //都不为空，说明做右子树都有目标结点，则公共祖先就是本身
    if (left !== null && right !== null) {
        return root;
    }
    //如果发现了目标节点，则继续向上标记为该目标节点
    return left == null ? right : left;
};
