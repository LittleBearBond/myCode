var twoSum2 = function (nums, target) {
    var l = 0,
        r = nums.length - 1,
        results = [];
    while (l < r) {
        var sum = nums[l] + nums[r];
        if (sum === target) {
            results.push([l, r]);
            while (l < r && nums[l] === nums[l + 1]) {
                l++;
            }
            while (r > l && nums[r] === nums[r - 1]) {
                r++;
            }
            l++;
            r--;
        } else if (sum < target) {
            l++;
        } else {
            r--;
        }
    }
    return results
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    var res = [];
    nums.sort(function (a, b) {
        return a - b;
    });
    for (var i = 0; i < nums.length - 1; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        var l = i + 1;
        var r = nums.length - 1;
        while (l < r) {
            var s = nums[i] + nums[l] + nums[r];
            if (s < 0) {
                l++;
            } else if (s > 0) {
                r--;
            } else {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) {
                    l++;
                }
                while (r > l && nums[r] === nums[r - 1]) {
                    r++;
                }
                l++;
                r--;
            }
        }
    }
    return res;
};