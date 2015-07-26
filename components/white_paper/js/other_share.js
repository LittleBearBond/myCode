;$(function(){
(function qilinShare(){
	var url = encodeURIComponent(top.location.href);
	var title = encodeURIComponent(top.document.title);

	var baidu = document.getElementById("share_baidu");
	var bsh = document.getElementById("share_bsh");
	var qqbm = document.getElementById("share_qqbm");
	var qqzone = document.getElementById("share_qqzone");
	var sina = document.getElementById("share_sina");
	var douban = document.getElementById("share_douban");
	var renren = document.getElementById("share_renren");
	var kaixin = document.getElementById("share_kaixin");
	var wy = document.getElementById("share_wy");
	var qqwb = document.getElementById("share_qqwb");
	var ty = document.getElementById("share_ty");

	if(baidu) baidu.href = "http://cang.baidu.com/do/add?it=" + title + "&iu=" + url;
	if(bsh) bsh.href = "http://bai.sohu.com/share/blank/addbutton.do?from=fengyin&link=" + url + "&title=" + title;
	if(qqbm) qqbm.href = "http://shuqian.qq.com/post?from=3&title=" + title + "&uri=" + url;
	if(qqzone) qqzone.href = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + url;
	if(sina) sina.href = "http://v.t.sina.com.cn/share/share.php?url=" + url + "&title=" + title;
	if(douban) douban.href = "http://www.douban.com/recommend/?url=" + url + "&title=" + title;
	if(renren) renren.href = "http://share.renren.com/share/buttonshare.do?link=" + url + "&title=" + title;
	if(kaixin) kaixin.href = "http://www.kaixin001.com/repaste/share.php?rtitle=" + url + "&rcontent=" + title;
	if(wy) wy.href = "http://t.163.com/article/user/checkLogin.do?source="+ "&info=" + title + url;
	if(qqwb) qqwb.href = "http://v.t.qq.com/share/share.php?title=" + title + "&url=" + url;
})();

});