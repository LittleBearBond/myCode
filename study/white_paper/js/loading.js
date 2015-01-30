$(function() {
	//loading动画  定时器通过类loader_spot的动态添加控制css3动画
	var spotLoader = document.getElementById('loader_spot');
	setInterval(function() {
		spotLoader.className = "";
		setTimeout(function() {
			spotLoader.className = "loader_spot";
		}, 20);
	}, 2100);

	//loading
	// var num = 0,
	//     $loaderNum = $("#loader .loader_num"),
	//     $swipe = $(".swipe"),
	//     $loader = $("#loader"),
	//     $swipeImg = $swipe.find("img"),
	//     imgleng = dd= $(".swipe img").length,
	//     topThreeImg = $("#page1 img, #page2 img, #page3 img"),
	//     topThreeLength = topThreeImg.length;
	//  function imgLoader($img){
	//     var _src = $img.attr("_src");
	//     $img.attr("src",_src);
	//     $img.get(0).onload = function(){
	//         num++;
	//         if(num < topThreeLength){
	//             $loaderNum.html(Math.ceil((num)/(topThreeLength)*100)+"%");
	//             imgLoader(topThreeImg.eq(num));
	//         }else{
	//             if( num === topThreeLength ){
	//                 $loaderNum.html(100+"%");
	//                 $swipe.show();
	//                 $loader.hide();
	//             }
	//             if( num === imgleng ){
	//                 return;
	//             }
	//             imgLoader($swipeImg.eq(num));
	//         }
	//     };
	//     $img.get(0).onerror =function(){
	//             $swipe.show();
	//             $loader.hide();
	//     }
	//  }
	//  imgLoader(topThreeImg.eq(num));
	var num = 0,
		$loaderNum = $("#loader .loader_num"),
		$swipe = $(".swipe"),
		$loader = $("#loader"),
		$swipeImg = $swipe.find("img"),
		imgleng = $swipeImg.length;

	function imgLoader($img) {
		var _src = $img.attr("_src");
		$img.attr("src", _src);
		$img.get(0).onload = function() {
			num++;
			if (num < imgleng) {
				$loaderNum.html(Math.ceil((num) / (imgleng) * 100) + "%");
				imgLoader($swipeImg.eq(num));
			} else {
				$loaderNum.html(100 + "%");
				$swipe.show();
				$loader.hide();
			}
		};
		$img.get(0).onerror = function() {
			$swipe.show();
			$loader.hide();
		}
	}
	imgLoader($swipeImg.eq(num));

});
