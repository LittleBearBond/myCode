	//http://www.365mini.com/page/canvas-draw-image.htm
	function change() {
		var pic = document.getElementById("preview"),
			file = document.getElementById("f");
		var file = file.files[0];
		// 过滤掉 非 image 类型的文件
		if (!file.type.match(/image.*/)) {
			if (window.console) {
				console.log("选择的文件类型不是图片: ", src.type);
			} else {
				window.confirm("只能选择图片文件");
			}
			return;
		}

		var reader = new FileReader();
		var canvas = document.getElementById("myCanvas");
		if (!canvas || !canvas.getContext) {
			return;
		}
		var context = canvas.getContext("2d");
		var imageObj = new Image();
		var url = webkitURL.createObjectURL(file);
		imageObj.onload = function() {
			// canvas清屏
			//context.clearRect(0, 0, canvas.width, canvas.height);
			//生成比例
			var width = imageObj.width,
				height = imageObj.height,
				scale = width / height;
			width = 300;
			height = parseInt(width / scale);
			canvas.style.width = (width + 20) + "px";
			canvas.style.height = (height + 20) + "px";
			// 将图像绘制到canvas上
			//context.drawImage(imageObj, 10, 10, width, height);
			context.drawImage(imageObj, 0, 0, width, height, 0, 0, width, height);
			var base64 = canvas.toDataURL('image/jpeg', 1);
			//base64.substr(22)
		};
		imageObj.src = url;

		reader.readAsDataURL(file);

		reader.onload = function(e) {
			var pic = document.getElementById("preview");
			pic.src = this.result;
			var i = document.getElementById("preview1");
			i.src = compress(pic, 10).src;
			console.log(i.src);
			i.style.display = "block";
		}

	}

	/*
	 * 压缩图片质量
	 */
	function compress(source_img_obj, quality, output_format) {
		var mime_type = "image/jpeg";
		if (output_format != undefined && output_format == "png") {
			mime_type = "image/png";
		}
		var cvs = document.createElement('canvas');
		//naturalWidth真实图片的宽度
		cvs.width = source_img_obj.naturalWidth;
		cvs.height = source_img_obj.naturalHeight;
		var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
		var newImageData = cvs.toDataURL(mime_type, quality / 100);
		var result_image_obj = new Image();
		result_image_obj.src = newImageData;
		return result_image_obj;
	}
