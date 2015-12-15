/* @grunt-build */
/**
 * author           xj
 * @date            2015-12-15 14:29:02
 * @email           568915669@qq.com
 * @description
 */
var mainView = MyView.extend({
    opts: {},
    'viewData': {
        $input: '#jq-input',
        $listGroup: '#jq-list-group',
        $clearCompleted: '#jq-clear-completed',
        $todoCount: '#jq-todo-count',
        $markComplete: '#jq-mark-complete',
        $itemView: '#jq-itemview',
        $footer: '#jq-footer'
    },
    'events': {
        //双击进入编辑状态
        'dblclick $listGroup .list-group-item label': 'toEditItem',
        //删除一条
        'click $listGroup .list-group-item .glyphicon-remove': 'removeItem',
        //选中单条，这个时候需要改变相关现时状态
        'click $listGroup .list-group-item :checkbox': 'checkItem',
        //编辑单条回车保存
        'keypress $listGroup .list-group-item .form-control': 'saveItemOnEnter',
        //编辑单条失去焦点保存
        'blur $listGroup .list-group-item .form-control': 'saveEditItem',

        //添加
        'keyup $input': 'addItem',
        //清除选中的
        'click $clearCompleted': 'clearItems',
        //选中全部 或者取消选中
        'click $markComplete': 'toggleAllItem',
    },
    init() {
        //单条数据模板处理
        this.$itemViewFn = _.template(this.$itemView.html());
    },
    resetItemToDefault: function() {
        this.$listGroup.find('.list-group-item').removeClass('edit');
    },
    toEditItem: function(e) {
        var $curr = $(e.currentTarget);
        this.resetItemToDefault();
        $curr.closest('.list-group-item').find('.form-control').val($curr.text())
            //回到.list-group-item
            .end().addClass('edit');
    },
    removeItem: function(e) {
        $(e.currentTarget).closest('li').remove();
        this.updateStatus();
    },
    checkItem: function(e) {
        this.updateStatus();
    },
    saveItemOnEnter: function(e) {
        if (e.keyCode === 13) {
            this.saveEditItem(e);
        }
    },
    saveEditItem: function(e) {
        var $curr = $(e.currentTarget);
        var val = $.trim($curr.val());
        var $li = $curr.closest('.list-group-item');
        if (val) {
            $li.find('label').html(val);
        }
        $li.removeClass('edit');
    },
    addItem: function(e) {
        if (e.keyCode !== 13) {
            return;
        }
        var $curr = $(e.currentTarget);
        var val = $.trim($curr.val());
        if (!val) {
            return;
        }
        this.$listGroup.append(this.$itemViewFn({
            val: val
        }));
        $curr.focus().val('');
        this.updateStatus();
    },
    clearItems: function() {
        this.$listGroup.find(':checkbox:checked').each(function() {
            $(this).closest('li').remove();
        });
        this.updateStatus();
    },
    toggleAllItem: function(e) {
        var isChecked = $(e.currentTarget).prop('checked');
        this.resetItemToDefault();
        this.$listGroup.find(':checkbox').each(function() {
            $(this).prop('checked', isChecked);
        });
        this.updateStatus();
    },
    updateStatus: function() {
        var $lis = this.$listGroup.find('li');
        var len = $lis.length;
        var checkedLen = this.$listGroup.find(':checkbox:checked').length;

        //footer 是否显示
        this.$footer[checkedLen ? 'show' : 'hide']();
        //是否为选中状态
        this.$markComplete.prop('checked', checkedLen > 0 && checkedLen === len);

        this.$clearCompleted.html('Clear ' + checkedLen + ' completed items');
        this.$todoCount.html('<b>' + (len - checkedLen) + '</b> items left');
    }
});
new mainView();
