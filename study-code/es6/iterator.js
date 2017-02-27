var it = makeIterator(['a', 'b']);

function makeIterator(array) {
    var nextIndex = 0;

    return function() {
        return nextIndex < array.length ? {
            value: array[nextIndex++],
            done: false
        } : {
            value: undefined,
            done: true
        }

    }
}

var nex = [1, 2, 3][Symbol.iterator]();
console.log(nex.next());
console.log(nex.next());
console.log(nex.next());
console.log(nex.next());

class RangeIterator {
    constructor(strat, stop) {
            this.start = start;
            this.stop = stop;
        }
        [Symbol.iterator]() {
            return this;
        }
    next() {
        var val = this.value;
        if (val < this.stop) {
            this.value++;
            return {
                value: val,
                done: false
            }
        } else {
            return {
                value: undefined,
                done: true
            }
        }
    }
}


function range(start, stop) {
    return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
    console.log(value);
}


let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

for (let item of iterable) {
    console.log(item); // undefined, undefined, undefined
}
