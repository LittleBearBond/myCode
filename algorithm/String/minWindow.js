/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    if (!t || !s || t.length > s.length) {
        return ''
    }
    const mapT = {}
    for (const sT of t) {
        mapT[sT] = sT in mapT ? mapT[sT] + 1 : 1
    }
    const len = t.length;
    let tSize = len;
    let left = 0
    let right = 0
    let res = ''
    while (right < len) {
        const curr = s[right];
        if (curr in mapT) {
            mapT[curr]--
            if (mapT[curr] === 0) {
                tSize--
            }
        }
        while (tSize === 0) {
            const newRes = s.substring(l, r + 1)
            if (!res || newRes.length < res.length) {
                res = newRes
            }
            const ls = s[l]
            if (ls in mapT) {
                mapT[ls]++
                if (mapT[ls] === 1) {
                    tSize++
                }
            }
            left++
        }
        right++
    }
    return res
};
