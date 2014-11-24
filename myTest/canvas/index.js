;
(function() {
    var myCanvas = document.getElementById("myCanvas");
    var context = myCanvas.getContext("2d");
    var myCanvas1 = document.getElementById("myCanvas1");
    var context1 = myCanvas1.getContext("2d"),
        polygon = 9,
        radius = 60;

    function drawPath(x, y, n, r, color) {
        var i, ang;
        ang = Math.PI * 2 / n //旋转的角度
        context.save(); //保存状态
        context.fillStyle = color; //填充红色，半透明
        context.strokeStyle = 'rgba(15,160,71,.5)'; //填充绿色
        context.lineWidth = 3; //设置线宽
        context.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context.moveTo(0, -r); //据中心r距离处画点
        context.beginPath();
        for (i = 0; i < n; i++) {
            context.rotate(ang) //旋转
            context.lineTo(0, -r); //据中心r距离处连线
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore(); //返回原始状态
        //drawArc(x, y, n, r, color);
    }

    function drawPathInnerLine(x, y, n, r, color) {
        var i, ang;
        ang = Math.PI * 2 / n //旋转的角度
        context.save(); //保存状态
        context.strokeStyle = 'rgba(15,160,71,.5)'; //填充绿色
        context.lineWidth = 2; //设置线宽
        context.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context.moveTo(0, -r); //据中心r距离处画点
        context.beginPath();
        for (i = 0; i < n; i++) {
            context.rotate(ang) //旋转
            context.lineTo(0, 0); //据中心r距离处连线
            context.lineTo(0, -r); //据中心r距离处连线
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore(); //返回原始状态
    }

    function drawArc(x, y, n, r, color) {
        var i, ang;
        ang = Math.PI * 2 / n //旋转的角度
        context1.save(); //保存状态
        context1.fillStyle = '#128c41'; //填充红色，半透明
        context1.strokeStyle = '#18a850'; //填充绿色
        context1.lineWidth = 5; //设置线宽
        context1.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context1.moveTo(0, -r); //据中心r距离处画点
        for (i = 0; i < n; i++) {
            context1.rotate(ang) //旋转
            context1.beginPath();
            context1.arc(0, -r, 3, 0, 2 * Math.PI);
            context1.closePath();
            context1.stroke();
            context1.fill();
        }
        context1.restore(); //返回原始状态
    }

    function drawText(x, y, n, r, color) {
        var i, curr,
            ang = Math.PI * 2 / polygon, //旋转的角度
            se = parseInt(polygon / 2),
            data = ['薪资丰厚', '环境好', '老板很nice', '帅哥美女多', '福利够赞', '良好成长空间', '团队够牛', '看好公司前景 ', '位置优越'],
            posData = [];
        for (i = 0; i < n; i++) {
            posData.push({
                'x': Math.sin(ang * i),
                'y': -Math.cos(ang * i)
            })
        }
        context1.translate(x, y); //原点移到x,y处，即要画的多边形中心
        context1.fillStyle = color;
        for (i = 0; i < polygon; i++) {
            curr = posData[i];
            context1.fillText(data[i], r * curr.x, r * curr.y);
        }
        context1.restore(); //返回原始状态
    }

    function GetLength(str) {
        var realLength = 0,
            len = str.length,
            charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    };
    drawPath(160, 200, polygon, radius, '#08682d') //在300,200处画一个半径为40的八边形
    drawPath(160, 200, polygon, 40, '#0c7334') //在300,200处画一个半径为40的八边形
    drawPath(160, 200, polygon, 20, '#097c36') //在300,200处画一个半径为40的八边形
    drawArc(160, 200, polygon, radius, '#08682d')
    drawPathInnerLine(160, 200, polygon, radius, '#08682d')
    drawText(160, 200, polygon, radius, '#fff');
})();
