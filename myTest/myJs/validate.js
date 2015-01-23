function validateLength() {
	$('input[maxlength]').on('input keyup paste', function() {
		var $this = $(this),
			reg = /[\u4e00-\u9fa5]/,
			val = $.trim($this.val()),
			valLen = val.replace(/[\u4e00-\u9fa5]/g, '**').length,
			len = $this.attr('maxlength') | 0,
			ignore = !!$this.attr('ignore'),
			hasLen = 0,
			cutStr;
		//不却分中英文的情况，输入框的maxlength就能搞定
		if (ignore) {
			return;
		}
		if (valLen <= len) {
			return;
		}
		//处理如这种情况最多输入6个汉字  12个英文
		//处理如这种情放到、处理如这种情avb、sadfsdadsafa、sfsdafsdkjsdfhd打发第三方
		$.each(val.split(''), function(index, value) {
			reg.test(value) ? (hasLen += 2) : (hasLen += 1);
			if (hasLen >= len) {
				cutStr = val.substr(0, index + 1);
				return false;
			}
		});
		$this.val(cutStr);
	});
}
