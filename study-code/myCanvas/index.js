;
(function() {
    var myCanvas, context, myCanvas1, context1, ww, hh, polygon = 9,
        radius, width, height, $mainwrap, pixel = window.devicePixelRatio | 0 || 2,
        pixW, pixH, reDrawTimmer, $btn;
    /*pixel = pixel > 2 ? 2 : pixel;*/

    function init() {
        myCanvas = document.getElementById("myCanvas"),
        context = myCanvas.getContext("2d"),
        myCanvas1 = document.getElementById("myCanvas1"),
        context1 = myCanvas1.getContext("2d"),
        $mainwrap = $('.mainwrap'),
        ww = $(window).width(),
        ww = ww < 320 ? 320 : ww;
        ww = ww > 800 ? 800 : ww;

        hh = parseInt(ww * 5 / 8),
        hh = hh > 320 ? parseInt(ww * 7 / 8) : hh;
        pixel = parseInt(pixel);
        pixW = ww * pixel;
        pixH = hh * pixel;
        width = pixW / 2,
        height = pixH / 2,
        //适配高分屏
        //控制极限值
        radius = parseInt((ww - 190) / 2);
        radius = radius * pixel;
        radius = radius > 300 * pixel ? 300 * pixel : radius;

        myCanvas.width = pixW;
        myCanvas.height = pixH;
        myCanvas1.width = pixW;
        myCanvas1.height = pixH;
        var ccsObj = {
            'height': hh,
            'width': ww
        };
        $mainwrap.css(ccsObj);
        $(myCanvas).css(ccsObj);
        $(myCanvas1).css(ccsObj);
    }

    function initEvent() {
        $btn = $('.btn');
        $btn.on('click', getIsShare);
        $('.giveup').on('click', function() {
            $('.mask').hide();
            return false;
        });
        $('.mask').on('touchmove', function() {
            return false;
        }).on('click', function() {
            $(this).hide();
        });
    }

    function getIsShare($el) {
        $el = $(this);
        $.ajax({
            url: pageData.url,
            type: pageData.type,
            dataType: 'json',
            data: pageData.postData || {},
            beforeSend: function() {
                if ($el.hasClass('loading-1')) {
                    return false;
                }
                $el.addClass('loading-1');
            },
            success: function(result) {
                if (result && result.result == '0') {
                    location.href = $el.attr('href').replace('{msg}', result.message);
                } else {
                    $('.mask').show();
                }
            },
            error: function() {
                setTimeout(function(){
                    showTip('网络不给力哦^_^');
                },3000);
            },
            complete: function() {
                $el.removeClass('loading-1');
            }
        });
        return false;
    }

    function drawPath(x, y, n, r, color) {
        var i, ang;
        ang = Math.PI * 2 / n; //旋转的角度
        context.save(); //保存状态
        context.fillStyle = color; //填充红色，半透明
        context.strokeStyle = 'rgba(15,160,71,.5)'; //填充绿色
        context.lineWidth = 3; //设置线宽
        context.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context.moveTo(0, -r); //据中心r距离处画点
        context.beginPath();
        for (i = 0; i < n; i++) {
            context.rotate(ang); //旋转
            context.lineTo(0, -r); //据中心r距离处连线
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore(); //返回原始状态
    }

    function drawPathInnerLine(x, y, n, r, color) {
        var i, ang;
        ang = Math.PI * 2 / n; //旋转的角度
        context.save(); //保存状态
        context.strokeStyle = 'rgba(15,160,71,.5)'; //填充绿色
        context.lineWidth = 2; //设置线宽
        context.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context.moveTo(0, -r); //据中心r距离处画点
        context.beginPath();
        for (i = 0; i < n; i++) {
            context.rotate(ang); //旋转
            context.lineTo(0, 0); //据中心r距离处连线
            context.lineTo(0, -r); //据中心r距离处连线
        }
        context.stroke();
        context.restore(); //返回原始状态
    }


    function drawArc(x, y, n, r, color) {
        var i, ang;
        ang = Math.PI * 2 / n; //旋转的角度
        context1.save(); //保存状态
        context1.fillStyle = '#128c41'; //填充红色，半透明
        context1.strokeStyle = '#18a850'; //填充绿色
        context1.lineWidth = 4; //设置线宽
        context1.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context1.moveTo(0, -r); //据中心r距离处画点
        for (i = 0; i < n; i++) {
            context1.rotate(ang); //旋转
            context1.beginPath();
            context1.arc(0, -r, 2, 0, 2 * Math.PI);
            context1.closePath();
            context1.stroke();
            context1.fill();
        }
        context1.restore(); //返回原始状态
    }

    function drawText(x, y, n, r, color) {
        var i,
            curr,
            currText,
            ang = Math.PI * 2 / n, //旋转的角度
            se = parseInt(n / 2),
            data = pageData.showData || ['不错的薪资', '环境好', '老板很nice', '帅哥美女多', '福利够赞', '良好成长空间', '团队够牛', '看好公司前景 ', '位置优越'],
            posData = [],
            disx,
            disy;
        for (i = 0; i < n; i++) {
            posData.push({
                'x': Math.sin(ang * i),
                'y': -Math.cos(ang * i)
            });
        }
        context1.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context1.fillStyle = color;
        context1.font = "15px 'Arial'";
        for (i = 0; i < n; i++) {
            curr = posData[i];
            currText = data[i];
            disx = r * curr.x;
            disy = r * curr.y + 5;
            if (i <= se) {
                disx += 10;
            } else {
                disx -= getLength(currText) * 7.5;
            }

            context1.fillText(data[i], disx, disy);
        }
        context1.restore(); //返回原始状态
    }

    function getLength(str) {
        var realLength = 0,
            len = str.length,
            charCode;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    };

    function drawTip(x, y, n, r, color, data) {
        var ang = Math.PI * 2 / n,
            disx,
            disy;
        r = r / 3;
        context.save(); //保存状态
        context.fillStyle = color; //填充红色，半透明
        context.strokeStyle = 'rgba(15,160,71,0)'; //填充绿色
        context.lineWidth = 0; //设置线宽
        context.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context.beginPath();
        for (var i = 0, len = data.length; i < len; i++) {
            disx = Math.sin((data[i] - 1) * ang) * r * (3 - i);
            disy = -Math.cos((data[i] - 1) * ang) * r * (3 - i);
            i === 0 ? context.moveTo(disx, disy) : context.lineTo(disx, disy);
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore(); //返回原始状态
    }

    function draw() {
        init();
        context.clearRect(0, 0, pixW, pixH);
        context1.clearRect(0, 0, pixW, pixH);
        var one = parseInt(radius / 3);
        drawPath(width, height, polygon, radius, '#08682d'); //width,height处画一个半径为40的八边形
        drawPath(width, height, polygon, one * 2, '#0c7334'); //width,height处画一个半径为40的八边形
        drawPath(width, height, polygon, one, '#097c36'); //width,height处画一个半径为40的八边形
        drawArc(width, height, polygon, radius, '#08682d');
        drawPathInnerLine(width, height, polygon, radius, '#08682d');
        drawText(width, height, polygon, radius, '#fff');
        drawTip(width, height, polygon, radius, 'rgba(206,225,10,.8)', pageData.data || [1, 3, 5]);
        drawTip(width, height, polygon, radius, 'rgba(79,220,255,.8)', pageData.selData || [1, 6, 8]);
    }

    //Document onload
    $(function() {
        draw();
        initEvent();
        $(window).on('resize orientationchange', function() {
            clearTimeout(reDrawTimmer);
            reDrawTimmer = setTimeout(draw, 200);
        });
    });
})();
