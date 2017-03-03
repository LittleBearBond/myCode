var myIterable = {};
myIterable[Symbol.iterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable]


function* foo(x) {
    var y = 2 * (yield(x + 1));
    var z = yield(y / 3);
    return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
//x=5
b.next() // { value:6, done:false }
    //y=24
b.next(12) // { value:8, done:false }
    //z=13
b.next(13) // { value:42, done:true }

function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (let v of foo()) {
    console.log(v);
}


function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}

let jane = {
    first: 'Jane',
    last: 'Doe'
};

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
    console.log(`${key}: ${value}`);
}
