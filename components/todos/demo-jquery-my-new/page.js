/* @grunt-build */
/**
 * author           xj
 * @date            2015-12-15 14:29:02
 * @email           568915669@qq.com
 * @description
 */

var itemView = baseView.extend({
    'events': {
        //双击进入编辑状态
        'dblclick label': 'toEditItem',
        //删除一条
        'click .glyphicon-remove': 'removeItem',
        //选中单条，这个时候需要改变相关现时状态
        'click :checkbox': 'checkItem',
        //编辑单条回车保存
        'keypress .form-control': 'saveItemOnEnter',
        //编辑单条失去焦点保存
        'blur .form-control': 'saveEditItem'
    },
    onAfterViewInit() {
        this.$el = $(this.templateFn(this.opts.model));
    },
    init() {},
    toEditItem: function(e) {
        this.trigger('resetItemToDefault');
        $(e.currentTarget).closest('.list-group-item').addClass('edit').find('.form-control').focus();
    },
    removeItem: function(e) {
        $(e.currentTarget).closest('li').remove();
        this.trigger('updateStatus');
    },
    checkItem: function(e) {
        this.trigger('updateStatus');
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
});

var mainView = baseView.extend({
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
        //添加
        'keyup $input': 'addItem',
        //清除选中的
        'click $clearCompleted': 'clearItems',
        //选中全部 或者取消选中
        'click $markComplete': 'toggleAllItem'
    },
    init() {
        //单条数据模板处理
        this.itemView = itemView.extend({
            templateFn: _.template(this.$itemView.html())
        });
    },
    resetItemToDefault: function() {
        this.$listGroup.find('.list-group-item').removeClass('edit');
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
        var itemView = new this.itemView({
            model: {
                val: val
            }
        });

        itemView.on('updateStatus', this.updateStatus.bind(this));
        itemView.on('resetItemToDefault', this.resetItemToDefault.bind(this));

        this.$listGroup.append(itemView.$el);

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
