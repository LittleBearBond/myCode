const LEFT = {
    '(': ")",
    '[': "]",
    '{': "}",
}

const RIGHT = {
    ")": '(',
    "]": '[',
    "}": '{',
}


function isCLose(str) {
    if (!str) {
        return null
    }
    const arr = [];
    for (let charStr of str) {
        if (charStr in LEFT) {
            arr.push(charStr)
        } else if (charStr in RIGHT) {
            if (LEFT[arr[arr.length - 1]] === charStr) {
                console.log(arr.pop(), charStr)
            }
        }
    }
    console.log(arr.length === 0)
}
isCLose('{{{{[[]]}}([])}}')