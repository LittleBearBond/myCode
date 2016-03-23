/**
 * Created by gugaofeng on 2016/3/10.
 *
 * 微信sdk  拍照选择图片 压缩 上传图片
 */




var WxUploadImg = {
    viewDiv : $('.upload_photo .preview'),
    isReady : false,
    wxConf : '',
    images : {
        localId: [],
        serverId: []
    },
    init : function(conf){
        var self = this;
        if(!conf || $.isEmptyObject(conf)){
            console.error('wx conf is null', conf);
            return;
        }
        self.wxConf = conf;
        self.wxInitConfig();

        this.bindEvent();
    },
    wxInitConfig : function(callback){
        var self = this;
        if(self.isReady){
            callback&&callback();
            return;
        }
        var conf = self.wxConf;
        if(!conf || $.isEmptyObject(conf)){
            alert('wx conf is null');
            return;
        }
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: conf.appId, // 必填，公众号的唯一标识
            timestamp: conf.timestamp, // 必填，生成签名的时间戳
            nonceStr:  conf.nonceStr, // 必填，生成签名的随机串
            signature:  conf.signature,// 必填，签名，见附录1
            jsApiList: [
                'scanQRCode','chooseImage', 'uploadImage'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
            self.isReady = true;
            callback&&callback();
        });
        wx.error(function (res) {
            alert('wx.error: ' + JSON.stringify(res));
        });
    },

    choose : function (){
        var self = this;
        debugLog("touch_choose_start");
        self.wxInitConfig(function(){
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['compressed'],//['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: [ 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    debugLog("choose_success");
                    var localIds = res.localIds;
                    self.images.localId = res.localIds;
                    self.images.serverId = [];
                    var url = res.localIds[0];
                    $('.upload_photo').addClass('hasimg');
                    self.viewDiv.css("background-image","url("+url+")");
                    self.upload(res.localIds[0]);
                    self.getImgSize(url,function(w,h){
                        var wrap = $('.upload_photo'), w_width = wrap.width();
                        if(w && h && w_width){
                            wrap.height(w_width*h/w);
                        }
                    });
                },
                fail : function(res){
                    alert("选择图片微信失败，刷新重试");
                    //debugLog('scan_fail_res_is_'+JSON.stringify(res));
                }
            });
        });

    },
    //TMS 上传文件
    tmsUpload : function(imgBase){
        var self = this;
        var url = 'http://tms.xiaojukeji.com/api/base64/upload';
        if(window.GlobalData && GlobalData.environment == "development"){
            url = "http://10.10.38.143:1337/api/base64/upload";
        }
        debugLog('tms url is '+url);
        var param = {
            type: 'public',
            s: 'walle',
            pic : imgBase ||''
        };

        didi.loading();
        $.ajax({
            url:url,
            type :'post',
            data : param || {},
            dataType :'json',
            success : function(data){
                didi.loading(false);
                console.log(data);
                if(data.success){
                    alert('tms success');
                    self.images.serverId.push(data.key);
                    //alert("key "+data.key);
                    //alert("url "+data.url);
                    $('.upload_photo').addClass('hasimg');
                    self.viewDiv.css("background-image","url("+data.url+")");
                }else{
                    didi.alert(data.error || 'TMS 上传失败');
                }
            },
            error : function(xhr, type){
                didi.alert('服务错误 请刷新页面');
                didi.loading(false);
            },
            timeout : 10*1000
        });


    },
    upload : function(){
        var self = this;
        wx.uploadImage({
            localId: self.images.localId[0],
            success: function (res) {
                //alert('upload success');
                debugLog('up res is '+JSON.stringify(res));
                var serverId = res.serverId;
                //self.saveToServer(serverId);
                self.images.serverId.push(res.serverId);
                $('#submit-btn').removeClass('btn-gray');
            },
            fail: function (res) {
                alert('fail is '+JSON.stringify(res));
            }
        });
    },

    saveToServer : function(media_id){
        var url = '';
        var param = {"driver_id":GlobalData.driverId,"key":media_id};
        param.time = new Date().getTime();
        myAjax(url,param,function(res){
            //alert('data is '+JSON.stringify(res));
            debugLog('data is '+JSON.stringify(res));
            if(res.errno*1 == 0){
                var imgUrl = res.data;
                $('.upload_photo').addClass('hasimg');
                self.viewDiv.css("background-image","url("+imgUrl+")");
                //$('#pass-btn').removeClass('btn-gray');//图片上传成功后 按钮可以点击
            }else{
                didi.alert(res.errmsg||'上传出错 请刷新');
            }
        });

    },
    getImgSize:function(url,callback){
        if($("#img-size-cont").length==0){
            $("<div>").attr("id","img-size-cont").css({
                opacity:0,
                position:"absolute",
                zIndex:-1,
                top:-10000,
                overflow:"hidden",
                width:100
            }).appendTo("body");
        }
        var img=$("<img>").attr("src",url).appendTo("#img-size-cont");
        img[0].onload=function(){
            //var initFileSize = img.fileSize;
            callback(img.width(),img.height(),img);
            img.remove();
        };
    },
    preview : function(){

    },
    bindEvent : function(){
        var self = this;
        //$('#driver_sign_img').touch(function(e){
        //    var ua = navigator.userAgent;
        //    //alert(ua);
        //    //if(!(ua.match(/MicroMessenger/i)=="micromessenger")){
        //    //    didi.alert('请在微信里面上传图片');
        //    //    //return;
        //    //}
        //    self.choose();
        //});
    }
};



function zipImg(img , callback){
    //img = "http://10.10.40.19:9101/h5/driver-manager/modules/driver-sign/images/photo_empty.png";
    var cvs = document.createElement('canvas');
    //var cvs = document.getElementById('testCanvas');
    var nw = 100, nh = 50;
    cvs.width = nw;
    cvs.height = nh;
    var ctx = cvs.getContext("2d");
    var newImg = new Image();
    newImg.crossOrigin = "anonymous";
    newImg.onload = function(){
        try{
            ctx.drawImage(newImg, 0, 0,nw,nh);
            var res = cvs.toDataURL();
        }catch (e){
            alert('error 4444');
        }
        if(callback){
            callback(res);
        }
    }
    newImg.onerror = function(e){
        alert('load error');
    }
    newImg.src = img;
}

