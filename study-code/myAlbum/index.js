var total = 12;
var $win = $(window);
var padding = 2,
	isShow = false;

var imgLoad = function(url, callback, index) {
	var img = new Image();
	img.index = index;
	img.onload = function() {
		callback.call(this, img.width, img.height);
		img.onload = null;
	};
	img.src = url;
};

var cb = function(w, h) {
	var cvs = $('#' + this.index)[0].getContext('2d');
	cvs.width = w; //this.width;
	cvs.height = h; //this.height;
	cvs.drawImage(this, 0, 0);
};

var render = function() {
	var w = $win.width(),
		picW = ((w - padding * 3) / 4) | 0,
		i = 1,
		len = 13,
		str = '',
		index = 0;
	for (; i < len; i++) {
		index++;
		str += '<li class="animated bounceIn" index="' + index + '"> <canvas id="1-' + i + '"></canvas></li>';
		index++;
		str += '<li class="animated bounceIn" index="' + index + '"> <canvas id="2-' + i + '"></canvas></li>';
		imgLoad('imgs/p/1-' + i + '.jpg', cb, "1-" + i);
		imgLoad('imgs/p/2-' + i + '.jpg', cb, "2-" + i);
	}
	$('#container').html(str);
};

function viewLarge() {
	$('#container').on('click', 'li', function() {
		var url = 'imgs/p/' + $(this).find('canvas').attr('id') + '.jpg';
		var index = $(this).attr('index');
		imgLoad(url, showLgImg(url, index));
		return false;
	});

	$('#lgimg-wrap').click(function() {
		$(this).hide();
		isShow = false;
		$("html,body").removeAttr("style");
	}).swipeLeft(function() {
		nextOrPre(false);
	}).swipeRight(function() {
		nextOrPre(true);
	});
}

function showLgImg(url, index, isRight) {
	return function() {
		var w = $win.width(),
			h = $win.height(),
			tw = this.width,
			th = this.height,
			isH = th / tw > 1.2,
			$lgimg = $('#lgimg');
		var fn = function() {
			if (isH) {
				/*
			*  修正一个居中的css，可以减少n多代码  使用
				left:0;
				right: 0;
				bottom: 0;
				top: 0;
				margin: auto;
				居中就不用再去计算margin啦
				*/
				//竖图  是否大于window高度
				if (th < h) {
					/*$lgimg.css({'margin-top': -th / 2,'margin-left': -tw / 2});*/
				} else {
					$lgimg.css({
						'height': h /*,'margin-left': -(tw * h) / (2 * th),'margin-top': -h / 2*/
					});
				}
			} else {
				//横图   是否大于window宽度
				if (tw < w) {
					/* $lgimg.css({'margin-top': -th / 2,'margin-left': -tw / 2})*/
				} else {
					$lgimg.css({
						'width': w /*,'margin-left': -w / 2,'margin-top': -(th * w) / (2 * tw)*/
					});
				}
			}
			isShow || $('#lgimg-wrap').show();
			isShow = true;
			$("html,body").css({
				"width": "100%",
				"height": "100%",
				"overflow": "hidden"
			});
			$lgimg.addClass(!isRight ? 'animated bounceInRight' : 'animated bounceInLeft');
			var events = 'webkitAnimationEnd';
			$lgimg[0].addEventListener(events, function() {
				$(this).removeClass('animated bounceInRight bounceInLeft');
				this.removeEventListener(events);
			}, false);
		};
		/*$lgimg.attr('src')  has bug*/
		if (!$lgimg[0].getAttribute('src').length) {
			$lgimg.attr({
				'src': url,
				'index': index,
				'style': ''
			});
			fn();
			return;
		}
		var pro = {
			opacity: '0'
		};
		isRight ? pro.right = -tw + 'px' : pro.left = -tw + 'px';
		$lgimg.animate(pro, 150, 'ease-out',
			function() {
				$lgimg.attr({
					'src': url,
					'index': index,
					'style': ''
				}).css({
					'left': '0',
					'right': '0'
				});
				fn();
			});
	};
}

function nextOrPre(isRight) {
	var $con = $("#lgimg-wrap"),
		index = $con.find('img').attr('index') | 0;
	isRight ? index++ : index--;
	index > 24 && (index = 1);
	index < 1 && (index = 24);
	var src = $('#container').find('[index="' + index + '"]').find('canvas').attr('id');
	var url = 'imgs/p/' + src + '.jpg';
	imgLoad(url, showLgImg(url, index, isRight));
}

function transitionEnd() {
	var el = document.createElement('bootstrap');
	var transEndEventNames = {
		WebkitTransition: 'webkitTransitionEnd',
		MozTransition: 'transitionend',
		OTransition: 'oTransitionEnd otransitionend',
		transition: 'transitionend'
	};
	for (var name in transEndEventNames) {
		if (el.style[name] !== undefined) {
			return transEndEventNames[name];
		}
	}
	return ''; // explicit for ie8 (  ._.)
}
$(function() {
	render();
	viewLarge();
});
