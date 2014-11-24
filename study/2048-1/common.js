((function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else {
		root.layoutUi = factory(root.jQuery);
	}
})(window, function($) {

	function getPos(d) {
			return 20 + (d | 0) * 120;
		}
		/*
		 * x y 原来的坐标
		 *nx ny  即使newx  newy  新的位置
		 */
	function move(x, y, nx, ny) {
		var w = '100px';
		exports.getNumAndCell(x, y).number.animate({
			width: w,
			height: w,
			top: exports.getPosTop(nx, ny),
			left: exports.getPosLeft(nx, ny)
		}, 200);
	}

	function canMove(data, direction) {
		var len = data.length,
			i = 0,
			j = 1,
			k = 0,
			d,
			moveDirection = {
				'left': function() {
					for (; i < len; i++) {
						for (j = 1; j < len; j++) {
							d = data[i][j];
							if (d !== 0) {
								//	从最左边开始到j这个元素
								for (k = 0; k < j; k++) {
									if (data[i][k] === 0 || data[i][k] === d) {
										return true;
									}
								}
							}
						}
					}
					return false;
				},
				right: function() {
					for (; i < len; i++) {
						for (j = len - 2; j >= 0; j--) {
							d = data[i][j];
							if (d !== 0) {
								for (k = len - 1; k > j; k--) {
									if (data[i][k] === 0 || data[i][k] === d) {
										return true;
									}
								}
							}
						}
					}
					return false;
				},
				down: function() {
					for (; i < len; i++) {
						for (j = len - 2; j >= 0; j--) {
							d = data[j][i];
							if (d !== 0) {
								for (k = len - 1; k > j; k--) {
									if (data[k][i] === 0 || data[k][i] === d) {
										return true;
									}
								}
							}
						}
					}
					return false;
				},
				up: function() {
					for (; i < len; i++) {
						for (j = 1; j < len; j++) {
							d = data[j][i];
							if (d !== 0) {
								for (k = 0; k < j; k++) {
									if (data[k][i] === 0 || data[k][i] === d) {
										return true;
									}
								}
							}
						}
					}
					return false;
				}
			},
			func = moveDirection[direction];

		return func && func();
	}

	/*
	 *向左移动
	 */
	function moveLeft(boardData) {
		if (!canMove(boardData, 'left')) {
			return false;
		}
		var i = 0,
			j,
			k,
			len = boardData.length,
			hasMerge = {},
			cellData,
			hasNum = false;
		for (; i < len; i++) {
			for (j = 1; j < len; j++) {
				cellData = boardData[i];
				for (k = 0; k < j; k++) {
					if (boardData[i][j] === 0) {
						continue;
					}
					if (cellData[k] === 0) {
						cellData[k] = boardData[i][j];
						cellData[j] = 0;
						move(i, j, i, k, boardData[i][j]);
						//hasMerge[i + '-' + k + ''] = 1; //标记改位置已经被加过一次了
						continue;
					}
					if (boardData[i][j] === cellData[k] && !hasMerge[i + '-' + k + '']) {
						if ((k + 1) < j) { //中间间隔多个
							for (var m = k + 1; m < j; m++) {
								if (boardData[i][m] > 0) {
									hasNum = true;
									break;
								}
							}
						} else {
							hasNum = false;
						}
						if (!hasNum) { //没有阻挡
							cellData[k] *= 2;
							cellData[j] = 0;
							move(i, j, i, k, boardData[i][k]);
							hasMerge[i + '-' + k + ''] = 1; //标记改位置已经被加过一次了
						};
						continue;
					}
				}
			}
		}
		return true;
	}

	function moveRight(boardData) {
		if (!canMove(boardData, 'right')) {
			return false;
		}
		var i = 0,
			j, k,
			len = boardData.length,
			hasMerge = {},
			cellData,
			hasNum = false;
		for (; i < len; i++) {
			for (j = len - 2; j >= 0; j--) {
				cellData = boardData[i];
				for (k = len - 1; k > j; k--) {
					if (boardData[i][j] === 0) {
						continue;
					}
					if (cellData[k] === 0) {
						cellData[k] = boardData[i][j];
						cellData[j] = 0;
						move(i, j, i, k, boardData[i][j]);
						continue;
					}
					if (boardData[i][j] === cellData[k] && !hasMerge[i + '-' + k + '']) {
						if ((j + 1) < k) { //中间间隔多个
							for (var m = j + 1; m < k; m++) {
								if (boardData[i][m] > 0) {
									hasNum = true;
									break;
								}
							}
						} else {
							hasNum = false;
						}
						if (!hasNum) { //没有阻挡
							cellData[k] *= 2;
							cellData[j] = 0;
							move(i, j, i, k, boardData[i][k]);
							hasMerge[i + '-' + k + ''] = 1; //标记改位置已经被加过一次了
						};
						continue;
					}
				}
			}
		}
		return true;
	}

	/*
	 *向下移动
	 */
	function moveDown(boardData) {
		if (!canMove(boardData, 'down')) {
			return false;
		}
		var i = 0,
			j, k,
			len = boardData.length,
			hasMerge = {},
			hasNum = false;
		for (; i < len; i++) {
			//从下面倒数第二个数开始遍历
			for (j = len - 2; j >= 0; j--) {
				for (k = len - 1; k > j; k--) {
					if (boardData[j][i] === 0) {
						continue;
					}
					if (boardData[k][i] === 0) {
						boardData[k][i] = boardData[j][i];
						boardData[j][i] = 0;
						move(j, i, k, i);
						continue;
					}
					if (boardData[j][i] === boardData[k][i] && !hasMerge[k + '-' + i + '']) {
						//中间没有间隔
						if ((k - 1) > j) { //中间间隔多个
							for (var m = k - 1; m > j; m--) {
								if (boardData[m][i] > 0) {
									hasNum = true;
									break;
								}
							}
						} else {
							hasNum = false;
						}
						if (!hasNum) {
							boardData[k][i] *= 2;
							boardData[j][i] = 0;
							move(j, i, k, i);
							hasMerge[k + '-' + i + ''] = 1; //标记改位置已经被加过一次了
						};
						continue;
					}
				}
			}
		}
		return true;
	}

	function moveUp(boardData) {
		if (!canMove(boardData, 'up')) {
			return false;
		}
		var i = 0,
			j, k,
			len = boardData.length,
			hasMerge = {},
			hasNum = false;
		for (; i < len; i++) {
			//从下面倒数第二个数开始遍历
			for (j = 1; j < len; j++) {
				for (k = 0; k < j; k++) {
					if (boardData[j][i] === 0) {
						continue;
					}
					if (boardData[k][i] === 0) {
						boardData[k][i] = boardData[j][i];
						boardData[j][i] = 0;
						move(j, i, k, i);
						continue;
					}
					if (boardData[j][i] === boardData[k][i] && !hasMerge[k + '-' + i + '']) {
						//中间没有间隔
						if ((k + 1) > j) { //中间间隔多个
							for (var m = k + 1; m < j; m++) {
								if (boardData[m][i] > 0) {
									hasNum = true;
									break;
								}
							}
						} else {
							hasNum = false;
						}
						if (!hasNum) {
							boardData[k][i] *= 2;
							boardData[j][i] = 0;
							move(j, i, k, i);
							hasMerge[k + '-' + i + ''] = 1; //标记改位置已经被加过一次了
						};

						continue;
					}
				}
			}
		}
		return true;
	}
	var exports = {
		getPosTop: function(x, y) {
			return getPos(x) + 'px';
		},
		getPosLeft: function(x, y) {
			return getPos(y) + 'px';
		},
		getShowTextByNum: function(number) {
			//默认直接返回数字
			return number;
		},
		getNumAndCell: function(x, y) {
			return {
				'number': $('#number-' + x + '-' + y),
				'col': $('#col-' + x + '-' + y)
			};
		},
		hasSpace: function(d) {
			return !!~d.join(',').split(',').indexOf('0');
		},
		//获取位置循环16次
		getRandomPos: function(d) {
			var newArr = [],
				i = 0,
				j,
				len = d.length; //记录是0的位置
			for (; i < len; i++) {
				for (j = 0; j < len; j++) {
					d[i][j] === 0 && newArr.push({
						'x': i,
						'y': j
					});
				}
			}
			return newArr[Math.random() * newArr.length | 0];
		},
		showNum: function(x, y, number) {
			var w = '100px';
			exports.getNumAndCell(x, y).number
				.text(number)
				.css({
					top: exports.getPosTop(x, y),
					left: exports.getPosLeft(x, y)
				})
				.animate({
					width: w,
					height: w
				}, 60)
				.removeAttr('class').addClass('number title-' + number);
		},
		keydownEvent: {
			37: moveLeft, //left
			38: moveUp, //up
			39: moveRight, //right
			40: moveDown //down
		}
	};
	return exports;

}))
