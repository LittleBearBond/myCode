import config from './config';

import {
    model,
    text
} from './directives/index';

import {
    toArray,
    replaceNode
} from './utils';

let {
    regTag
} = config;

export function compileRoot(el, options) {
    return function (vm, el) {
        // TODO
    }
}

export function compile(el, options) {
    //当前这个根节点
    let nodeLinkFn = compileNode(el, options)

    //所有子节点
    let childLinkFn = el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null

    return function compositeLinkFn(vm, el) {
        var childNodes = [].slice.call(el.childNodes)
        linkAndCapture(function () {
            if (nodeLinkFn) {
                //===> vm._bindDir(dir, el)
                nodeLinkFn(vm, el)
            }
            if (childLinkFn) {
                childLinkFn(vm, childNodes)
            }
        }, vm)
    }
}

const linkAndCapture = function (linker, vm) {
    var originalDirCount = vm._directives.length
    linker()
    var dirs = vm._directives.slice(originalDirCount)
    dirs.forEach(function (dir) {
        dir._bind()
    })
    return dirs
}

/** 
 * 递归编译所有子节点
 */
const compileNodeList = function (nodeList, options) {
    let linkFns = []
    let nodeLinkFn, childLinkFn, node
    for (let i = 0, l = nodeList.length; i < l; i++) {
        node = nodeList[i]
        nodeLinkFn = compileNode(node, options)
        childLinkFn = node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null
        linkFns.push(nodeLinkFn, childLinkFn)
    }
    return linkFns.length ? makeChildLinkFn(linkFns) : null
}

const makeChildLinkFn = function (linkFns) {
    return function childLinkFn(vm, nodes) {
        let node, nodeLinkFn, childrenLinkFn
        for (let i = 0, n = 0, l = linkFns.length; i < l; n++) {
            node = nodes[n]
            nodeLinkFn = linkFns[i++]
            childrenLinkFn = linkFns[i++]
            if (nodeLinkFn) {
                nodeLinkFn(vm, node)
            }
            if (childrenLinkFn) {
                childrenLinkFn(vm, toArray(node.childNodes))
            }
        }
    }
}

const compileNode = function (node, options) {
    if (node.nodeType === 1) {
        //dom节点
        return compileElement(node, options)
    } else if (node.nodeType === 3) {
        //文本节点
        return compileTextNode(node, options)
    } else {
        return null
    }
}

const compileElement = function (node, options) {
    // 只处理 input[type="text"][v-model]
    if (node.tagName === 'INPUT' && node.hasAttribute('v-model')) {
        let exp = node.getAttribute('v-model').trim()
        return exp && makeNodeLinkFn({
            name: 'model',
            //data key 
            exp: exp,
            def: model
        })
    }
    return null
}

const compileTextNode = function (node, options) {
    let tokens = parseText(node.wholeText)
    if (!tokens.length) {
        return null;
    }
    //创建文档片段,用来包裹文本
    let frag = document.createDocumentFragment();
    /**
     * 
     tokens:[{
        tag: true,
        value: ''
        descriptor: {
            name: 'text',
            exp: token.value,
            def: text
        }
        }]
    */
    tokens.forEach(function (token) {
        let el = token.tag ? processTextToken(token) : document.createTextNode(token.value)
        frag.appendChild(el)
    })
    return makeTextNodeLinkFn(tokens, frag)
}

/**
 * xxx{{name}}xxx==>[{},{}]
 */
const parseText = function (text) {
    let tokens = []
    if (regTag.test(text)) {
        // just copy from vue, and simplify
        let lastIndex = regTag.lastIndex = 0
        let match, index, value

        while (match = regTag.exec(text)) {
            index = match.index

            // push text token
            if (index > lastIndex) {
                tokens.push({
                    value: text.slice(lastIndex, index)
                })
            }

            value = match[1]

            tokens.push({
                tag: true,
                value: value.trim()
            });
            //移动lastindex
            lastIndex = index + match[0].length
        }
        //截取最后半段
        if (lastIndex < text.length) {
            tokens.push({
                value: text.slice(lastIndex)
            })
        }
        return tokens
    }
    return tokens
}

const processTextToken = function (token) {
    let el = document.createTextNode(' ')
    // 简化，双向绑定，text 模式
    token.descriptor = {
        name: 'text',
        //data key 
        exp: token.value,
        def: text
    }
    return el
}

const makeNodeLinkFn = function (dir) {
    return function nodeLinkFn(vm, el) {
        vm._bindDir(dir, el)
    }
}

const makeTextNodeLinkFn = function (tokens, frag) {

    return function textNodeLinkFn(vm, el) {
        let fragClone = frag.cloneNode(true)
        let childNodes = toArray(fragClone.childNodes)
        tokens.forEach(function (token, i) {
            let value = token.value
            if (token.tag) {
                vm._bindDir(token.descriptor, childNodes[i])
            }
        })
        replaceNode(el, fragClone)
    }
}