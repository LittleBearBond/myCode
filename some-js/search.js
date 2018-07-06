const Searcher = (() => {
	let escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
	//转义特殊正则字符
	let escapeReg = reg => reg.replace(escapeRegExp, '\\$&');
	//groupLeft 与 groupRight是对结果进一步处理所使用的分割符，可以修改
	let groupLeft = '(';
	let groupRight = ')';

	let groupReg = new RegExp(escapeReg(groupRight + groupLeft), 'g');

	let groupExtractReg = new RegExp('(' + escapeReg(groupLeft) + '[\\s\\S]+?' + escapeReg(groupRight) + ')', 'g');

	//从str中找到最大的匹配长度
	let findMax = (str, keyword) => {
		let max = 0;
		keyword = groupLeft + keyword + groupRight;
		str.replace(groupExtractReg, m => {
			//keyword完整的出现在str中，则优秀级最高，排前面
			if (keyword == m) {
				max = Number.MAX_SAFE_INTEGER;
			} else if (m.length > max) {//找最大长度
				max = m.length;
			}
		});
		return max;
	};

	const keyReg = key => {
		let src = ['(.*?)('];
		let ks = key.split('');
		if (ks.length) {
			while (ks.length) {
				src.push(escapeReg(ks.shift()), ')(.*?)(');
			}
			src.pop();
		}
		src.push(')(.*?)');
		src = src.join('');
		let reg = new RegExp(src, 'i');
		let replacer = [];
		let start = key.length;
		let begin = 1;
		while (start > 0) {
			start--;
			replacer.push('$', begin, groupLeft + '$', begin + 1, groupRight);
			begin += 2;
		}
		replacer.push('$', begin);

		info = {
			regexp: reg,
			replacement: replacer.join('')
		};
		return info;
	};

	return {
		search(list, keyword) {
			//生成搜索正则
			let kr = keyReg(userInput);
			let result = [];
			for (let e of list) {
				//如果匹配
				if (kr.regexp.test(e)) {
					//把结果放入result数组中
					result.push(e.replace(kr.regexp, kr.replacement)
						.replace(groupReg, ''));
				}
			}
			//对搜索结果进行排序
			//1. 匹配关键字大小写一致的优先级最高，比如搜索up, 结果中的[user-page,beginUpdate,update,endUpdate]，update要排在最前面，因为大小写匹配
			//2. 匹配关键字长的排在前面
			result = result.sort((a, b) => findMax(b, keyword) - findMax(a, keyword));
			return result;
		}
	};
})();

//假设list是待搜索的列表
let list = ['config', 'user-page', 'bind', 'render', 'beginUpdate', 'update', 'endUpdate'];
//假设userInput是用户输入的关键字
let userInput = 'up';

//获取搜索的结果
console.log(Searcher.search(list, userInput));
// ["(up)date", "begin(Up)date", "end(Up)date", "(u)ser-(p)age"]
