require.config({
    //baseUrl: "../../Scripts",
    paths: {
        'jquery': 'Scripts/jquery-2.1.1',
        'common': 'common'
    },
    shim: {

    }
});
require(['jquery', 'common'], function($, common) {
    var data = [
            [0, 2, 2, 0],
            [2, 2, 4, 2],
            [2, 2, 2, 4],
            [2, 4, 2, 2]
        ],
        score = 0;
    $(function() {
        newGame();
    });

    function newGame() {
        //初始化格子
        //init();
        //生成随机的两个数字
        //generateRandomNum();
        //generateRandomNum();
        //初始化行背景
        initCell();
        initCellNum();
        //事件绑定
        initEvent();
    }

    function updateBoradView() {
        initCellNum();
        generateRandomNum();
    }

    function initCell() {
        $('#cellcontainer').remove();
        var $div = $('<div>'),
            $container = $('#container'),
            containerHtmls = [],
            containerCell, len = data.length;
        //初始话背景方块
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len; j++) {
                containerCell = $div.clone()
                    .attr('id', 'col-' + i + '-' + j)
                    .css({
                        left: common.getPosLeft(i, j),
                        top: common.getPosTop(i, j)
                    }).addClass('cell');
                containerHtmls.push(containerCell[0].outerHTML);
            }
        }
        $container.append($('<div id="cellcontainer" >').html(containerHtmls.join('')));
    }

    function initCellNum() {
        $('#cellnumcontainer').remove();
        var $cache = $('<div class="number" ></div>'),
            numberCell,
            currdata, numberCellHtmls = [],
            len = data.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len; j++) {
                numberCell = $cache.clone().attr('id', 'number-' + i + '-' + j);
                currdata = data[i][j];
                if (currdata === 0) {
                    numberCell.css({
                        width: '0',
                        height: '0',
                        left: common.getPosLeft(i, j) + 50,
                        top: common.getPosTop(i, j) + 50
                    });
                } else {
                    numberCell.css({
                        width: '100px',
                        height: '100px',
                        left: common.getPosLeft(i, j),
                        top: common.getPosTop(i, j)
                    }).html(common.getShowTextByNum(currdata)).addClass('title-' + data[i][j]);
                }
                numberCellHtmls.push(numberCell[0].outerHTML);
            }
        }
        $('#container').append($('<div id="cellnumcontainer" >').html(numberCellHtmls.join('')));
    }



    function generateRandomNum() {
        if (!common.hasSpace(data)) {
            return false;
        };
        var number = Math.random() < 0.5 ? 2 : 4;
        //得到随机位置
        var pos = common.getRandomPos(data);
        data[pos.x][pos.y] = number;
        common.showNum(pos.x, pos.y, number);
        return true;
    }

    function initEvent() {
        $(document).on('keydown', function(event) {
            if (!!~[37, 38, 39, 40].indexOf(event.keyCode) && common.keydownEvent[event.keyCode](data)) {
                event.preventDefault();
                setTimeout(updateBoradView, 200);
            }
        });
    }

})
