/* eslint-disable no-redeclare */
// 56. Merge Intervals
/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function (intervals) {
    const res = []
    intervals.sort((a, b) => a[0] - b[0])
        .concat([
            [Number.MAX_VALUE, Number.MAX_VALUE]
        ])
        .reduce((curr, next) => {
            console.log(curr, next)
            if (curr[curr.length - 1] > next[0]) {
                curr[curr.length - 1] = Math.max(curr[curr.length - 1], next[next.length - 1])
                return curr
            } else {
                res.push(curr)
                return next
            }
        })
    return res
};

//   Definition for an interval.
function Interval(start, end) {
    this.start = start;
    this.end = end;
}

var merge = function (intervals) {
    var res = [];
    intervals
        .sort((a, b) => a.start - b.start)
        .concat(new Interval(Number.MAX_VALUE, Number.MAX_VALUE))
        .reduce((curr, next) => {
            if (next.start <= curr.end) {
                curr.end = Math.max(curr.end, next.end);
                return curr;
            } else {
                res.push(curr);
                return next;
            }
        });
    return res;
};
console.log(
    merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18]
    ])
)
