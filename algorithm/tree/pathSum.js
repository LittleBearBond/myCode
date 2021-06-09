/*
给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
说明: 叶子节点是指没有子节点的节点。


使用 递归 + 回溯 的思想 DFS 遍历整个二叉树求出每条目标路径

首先创建 一个空数组 result 用来存储满足条件的目标路径，然后定义递归方法 getPath 寻找每条路径上满足条件的路径
用栈来存储当前遍历的节点路径
从根结点开始深度优先遍历，每经过一个节点，将节点入栈，当有遍历到叶子节点的时候，到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组
到达叶子节点，且当前路径之和不等于给定目标值，将节点出栈
所有遍历结束返回 result 即可。
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function (root, sum) {
    const ret = []
    var find = function (head, num, res) {
        if (head === null) {
            return
        }
        if (head.left === null && head.right === null) {
            if (head.val === num) {
                res.push(head.val)
                ret.push(res.slice(0))
            }
            return
        }
        if (sum < 0) {
            return
        }
        res.push(head.val)
        head.left && find(head.left, num - head.val, res)
        head.right && find(head.right, num - head.val, res)
        res.pop();
    }
    find(root, sum)
    return ret
}

/*
给定一个二叉树，它的每个结点都存放着一个整数值。

找出路径和等于给定数值的路径总数。

路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。
 */
var pathSum = function (root, sum) {
    if (root === null) {
        return 0
    }
    return findCount(root.left, sum) + findCount(root, sum) + findCount(root.right, sum)
}

var findCount = function (root, sum) {
    if (root == null) {
        return 0
    }
    const ret = sum - root.val;
    let count = 0
    if (ret === 0) {
        count += 1
    }
    return count + findCount(root.left, ret) + findCount(root.right, ret)
}

var pathSum = function (root, sum) {
    const cache = {
        0: 1
    }

    var dfs = function (node, currSum) {
        if (node === null) {
            return 0
        }
        let curr = currSum + node.val
        // 父级路径中存在这个差值的路径个数，这个是深度优先的遍历
        const res = cache[curr - sum] || 0
        cache[curr] = (cache[curr] || 0) + 1
        const left = dfs(node.left, curr)
        const right = dfs(node.right, curr)
        // 回溯
        cache[curr] = cache[curr] - 1
        return res + left + right
    }

    return dfs(root, 0)
}

