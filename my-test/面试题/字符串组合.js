function permutate(str) {
    var result = [];
    if (str.length == 1) {
        return [str]
    }
    //['c']
    var preResult = permutate(str.slice(1));
    //1
    for (var j = 0; j < preResult.length; j++) {
        //2
        for (var k = 0; k < preResult[j].length + 1; k++) {
            //c
            //bc cb

            //bc a
            //abc ''+ a +bc
            //bac b + a + c
            //bcz bc + a+ ''

            //cb a
            //abc ''+a+cb
            //cab c+a+b
            //cba cb+a+''

            var temp = preResult[j].slice(0, k) + str[0] + preResult[j].slice(k);
            result.push(temp);
        }
    }
    return result;
}

console.log(permutate("abc"));


function permutate(arr) {
    var result = [];
    var _push = Array.prototype.push;
    if (arr.length == 1) {
        return arr
    }
    var preResult = permutate(arr.slice(1));
    for (var j = 0; j < preResult.length; j++) {
        var len = preResult[j].length + 1;
        if (typeof preResult[j] === 'number') {
            len = 2;
            preResult[j] = String(preResult[j]);
        }
        for (var k = 0; k < len; k++) {
            var newArr = [];
            var pre = preResult[j].slice(0, k);
            var next = preResult[j].slice(k);
            Array.isArray(pre) ? _push.apply(newArr, pre) : pre && newArr.push(pre);
            newArr.push(arr[0]);
            Array.isArray(next) ? _push.apply(newArr, next) : next && newArr.push(next);
            result.push(newArr);
        }
    }
    return result;
}

console.log(permutate(['a', 'b', 'c']));
