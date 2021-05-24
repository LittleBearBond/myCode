/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
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

/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    if (root == null) {
        return 0
    }

    var left = minDepth(root.left)
    var right = minDepth(root.right)

    return (left === 0 || right === 0) ? left + right + 1 : Math.min(left, right) + 1
};
// 559. Maximum Depth of N-ary Tree

var maxDepth = function (root) {
    if (root === null) {
        return 0
    }
    if (root.children === null || !root.children.length) {
        return 1
    }
    var deep = [0]
    for (const d of root.children) {
        deep.push(maxDepth(d))
    }
    return 1 + Math.max(...deep)
};

// LeetCode 226. Invert Binary Tree

var TreeNode = function (val) {
    this.left = this.right = null;
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
// 617. Merge Two Binary Trees

/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function (t1, t2) {
    if (t1 === null && t2 === null) {
        return null
    }
    if (t1 === null && t2 !== null) {
        return t2
    }
    if (t1 !== null && t2 === null) {
        return t1
    }
    var temp = new TreeNode(0)
    temp.val = t1.val + t2.val
    temp.left = mergeTrees(t1.left, t2.left)
    temp.right = mergeTrees(t1.right, t2.right)
    return temp
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    var checkIsBalanced = function (node) {
        if (node === null) {
            return 0
        }
        var left = checkIsBalanced(node.left)
        var right = checkIsBalanced(node.right)
        return left === -1 || right === -1 ? -1 : Math.abs(left - right) > 1 ? -1 : Math.max(left, right) + 1
    }
    return checkIsBalanced(root) !== -1
};

var getDeep = function (root) {
    if (root === null) {
        return 0
    }
    return Math.max(getDeep(root.left), getDeep(root.right)) + 1
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    if (root === null) {
        return true
    }
    var left = getDeep(root.left)
    var right = getDeep(root.right)
    return Math.abs(left - right) <= 1 && isBalanced(root.left) && isBalanced(root.right)
};

var isBalanced = function (root) {
    var getHeight = function (node) {
        if (node === null) {
            return 0
        }
        const left = getHeight(node.left)
        if (left === -1) {
            return -1
        }
        const right = getHeight(node.right)
        if (right === -1) {
            return -1
        }
        return Math.abs(left - right) > 1 ? -1 : Math.max(left, right) + 1
    }
    return getHeight(root) !== -1
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root, level, counts = []) {
    if (!root) {
        return
    }
    if (!counts[level]) {
        counts[level] = {
            sum: 0,
            nodes: 0
        }
    }
    counts[level].sum += root.val
    counts[level].nodes++
    averageOfLevels(root.left, level + 1, counts)
    averageOfLevels(root.right, level + 1, counts)
    console.log(counts)
    return level || counts.map(({
        sum,
        nodes
    }) => sum / nodes)
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root, list = [], level = 0) {
    if (root == null) {
        return [];
    }
    if (level + 1 > list.length) {
        list.push([])
    }
    list[level].push(root.val);
    for (const child of root.children) {
        levelOrder(child, list, level + 1)
    }
    console.log(list)
};
// 589. N-ary Tree Preorder Traversal

var preorder = function (root, ret = []) {
    //  if (!root) {
    //     return []
    // }
    // ret.push(root.val)
    // for (const child of root.children) {
    //     preorder(child, ret)
    // }
    // return ret

    if (!root) {
        return []
    }
    const temp = [root]
    let node
    while (temp.length) {
        node = temp.shift()
        ret.push(node.val)
        node.children && temp.unshift(...node.children)
    }
    return ret
};
/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function (A) {
    const getOneWord = function (str) {
        var ret = {}
        for (let s of str) {
            if (s in ret) {
                ret[s]++
            } else {
                ret[s] = 1
            }
        }
        return ret
    }
    const ret = []
    var cache = getOneWord(A.shift())
    var temp
    for (const str of A) {
        var curr = getOneWord(str);
        temp = {}
        Object.keys(cache).forEach(key => {
            if (key in cache && key in curr) {
                temp[key] = Math.min(cache[key], curr[key])
            }
        })
        cache = temp
    }
    Object.keys(cache).forEach(key => ret.push(...Array(cache[key]).fill(key)))
    return ret
};
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
const patternToArr = function (p) {
    var arr = []
    var i = 0
    p.split('').reduce((obj, key, index) => {
        if (key in obj) {
            arr[obj[key]].push(index)
        } else {
            obj[key] = i++
            arr.push([index])
        }
        return obj
    }, Object.create(null))
    return arr
}
var wordPattern = function (pattern, str) {
    str = str.split(' ')
    if (str.length !== pattern.length) {
        return false
    }
    var pa = patternToArr(pattern)
    for (const [index, val] of pa.entries()) {
        var curr = str[val[0]]
        if (index > 0 && curr === str[pa[index - 1][0]]) {
            return false
        }
        for (const i of val) {
            if (str[i] !== curr) {
                return false
            }
        }
    }
    return true
};

var isIsomorphic = function (s, t) {
    var sp = patternToArr(s)
    var tp = patternToArr(t)
    return String(sp) === String(tp)
};


