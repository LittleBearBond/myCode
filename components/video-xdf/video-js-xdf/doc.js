 /*//埋点：播放
     method:'click',  //点击事件
     videoaddress:_this.videoAdd, //当前视频地址
     actionName:'play',  //动作名称
     nowPlayTime:_this.videoNow //当前视频播放时间


 //埋点： pause
     method:'click',  //点击事件
     videoaddress:_this.videoAdd, //当前视频地址
     actionName:'pause', //动作名称
     nowPlayTime:_this.videoNow //当前视频播放时间


 //埋点：结束
 window.videoSetCollectionsData({
     method:'setInterval',  //点击事件
     videoaddress:_this.videoAdd, //当前视频地址
     actionName:'stop', //动作名称
     nowPlayTime:_this.videoNow //当前视频播放时间*/



 //埋点：touch中播放器-播放拖拽   touchMove方法中
 window.videoSetCollectionsData({
     method: 'keyup', //点击事件
     videoaddress: _this.videoAdd, //当前视频地址
     actionName: ' dragVideoBar ', //动作名称
     lastSpeed: _this.videoLast, //拖拽前时间
     nowSpeed: _this.videoNow //拖拽后时间
 });

 //埋点：播放器-播放滚动条点击   drop方法中
 window.videoSetCollectionsData({
     method: 'click', //点击事件
     videoaddress: _this.videoAdd, //当前视频地址
     actionName: ' clickVideoBar ', //动作名称
     lastSpeed: _this.videoLast, //点击前上一次视频时间
     nowSpeed: _this.videoNow //点击后当前视频时间
 });


 /*//埋点：播放器-全屏   fullScreen方法中
 window.videoSetCollectionsData({
     method:'click',  //点击事件
     videoaddress:_this.videoAdd, //当前视频地址
     actionName:'fullScreen ', //动作名称
     nowPlayTime:_this.videoNow //当前视频播放时间
 });

 //埋点：播放器-取消全屏   fullScreen方法中
 window.videoSetCollectionsData({
     method:'click',  //点击事件
     videoaddress:_this.videoAdd, //当前视频地址
     actionName:' cancelFullScreen ', //动作名称
     nowPlayTime:_this.videoNow //当前视频播放时间
 });*/

 //埋点：加载失败
 /*window.videoSetCollectionsData({
     method: 'error', //加载失败事件
     videoaddress: _this.videoAdd, //当前视频地址
     actionName: 'error', //动作名称 1.用户终止 2.网络错误 3.解码错误 4.URL无效
     currErrorCode: _this.oVid.error.code, //动作名称 1.用户终止 2.网络错误 3.解码错误 4.URL无效
     currErrorMsg: currErrorMsg
 });*/


 //6.加载成功时间：connetSuccess
 if (window.videoSetCollectionsData) {
     //埋点：加载成功
     window.videoSetCollectionsData({
         method: 'canplaythrough', //加载完成事件
         videoaddress: _this.videoAdd, //当前视频地址
         actionName: 'connetSuccess', //动作名称
         nowPlayTime: 0, //当前视频播放时间
         totalTime: _this.oVid.duration //视频时长
     });
 }


 //7.  判断是否可以播放的事件 ：canplay\
 //canplay 可以播放，但中途可能因为加载而暂停
/* this.addEvent(_this.oVid, 'canplay', function() {
     if (window.videoSetCollectionsData) {
         //埋点：加载成功
         window.videoSetCollectionsData({
             method: 'canplay', //可以播放，但中途可能因为加载而暂停
             videoaddress: _this.videoAdd, //当前视频地址
             actionName: 'canplay', //动作名称
             nowPlayTime: 0, //当前视频播放时间
             totalTime: _this.oVid.duration //视频时长
         });
     }
 });*/


 //8. 客户端开始请求数据的事件 ：loadstart
 //loadstart 客户端开始请求数据
 /*this.addEvent(_this.oVid, 'loadstart', function() {
     if (window.videoSetCollectionsData) {
         //埋点：加载成功
         window.videoSetCollectionsData({
             method: 'loadstart', // 客户端开始请求数据
             videoaddress: _this.videoAdd, //当前视频地址
             actionName: 'loadstart', //动作名称
             nowPlayTime: 0, //当前视频播放时间
             totalTime: _this.oVid.duration //视频时长
         });
     }
 });*/

 //9. 客户端主动终止下载（不是因为错误引起） : abort
 //abort 客户端主动终止下载（不是因为错误引起）
 /*this.addEvent(_this.oVid, 'abort', function() {
     if (window.videoSetCollectionsData) {
         //埋点：加载成功
         window.videoSetCollectionsData({
             method: 'abort', //客户端主动终止下载（不是因为错误引起）
             videoaddress: _this.videoAdd, //当前视频地址
             actionName: 'abort', //动作名称
             nowPlayTime: 0, //当前视频播放时间
             totalTime: _this.oVid.duration //视频时长
         });
     }
 });*/

 //10. 成功获取资源长度 : loadedmetadata
 //loadedmetadata 成功获取资源长度
 /*this.addEvent(_this.oVid, 'loadedmetadata', function() {
     if (window.videoSetCollectionsData) {
         //埋点：加载成功
         window.videoSetCollectionsData({
             method: 'loadedmetadata', //成功获取资源长度
             videoaddress: _this.videoAdd, //当前视频地址
             actionName: 'loadedmetadata', //动作名称
             nowPlayTime: 0, //当前视频播放时间
             totalTime: _this.oVid.duration //视频时长
         });
     }
 });*/

 //11.开始播放事件：playing
 //playing开始播放
 this.addEvent(_this.oVid, 'playing', function() {
     if (window.videoSetCollectionsData) {
         //埋点：加载成功
         window.videoSetCollectionsData({
             method: 'playing', //开始播放
             videoaddress: _this.videoAdd, //当前视频地址
             actionName: 'playing', //动作名称
             nowPlayTime: 0, //当前视频播放时间
             totalTime: _this.oVid.duration //视频时长
         });
     }
 });

 //12. seeking事件

 //seeking 寻找中
 this.addEvent(_this.oVid, 'seeking', function() {
     if (window.videoSetCollectionsData) {
         //埋点：加载成功
         window.videoSetCollectionsData({
             method: 'seeking', //寻找中
             videoaddress: _this.videoAdd, //当前视频地址
             actionName: 'seeking', //动作名称
             nowPlayTime: 0, //当前视频播放时间
             totalTime: _this.oVid.duration //视频时长
         });
     }
 });

 //13.seeked事件
 //seeked 寻找完毕
 this.addEvent(_this.oVid, 'seeked', function() {
     if (window.videoSetCollectionsData) {
         //埋点：加载成功
         window.videoSetCollectionsData({
             method: 'seeked', //寻找完毕
             videoaddress: _this.videoAdd, //当前视频地址
             actionName: 'seeked', //动作名称
             nowPlayTime: 0, //当前视频播放时间
             totalTime: _this.oVid.duration //视频时长
         });
     }
 });
