/**
 * author           xj
 * @date            2015-12-15 15:46:52
 * @email           568915669@qq.com
 * @description
 */

/*$(function () {

});*/
//extend，todo继承与model 现在就具有model的所有行为
//小的实体
var ToDo = Backbone.Model.extend({
    defaults: function() {
        return {
            title: 'little bear',
            order: Todos.nextOrder(),
            done: false
        }
    },
    toggle: function() {
        this.save({
            //自己是否已经执行过取反
            done: !this.get('done')
        });
    }
});

//集合对象，todos 主要是针对列表的操作，添加，删除，修改，其实就是对数据的添加修改删除
//单条数据对于ToDo对象，列表对于TodoList
//具体操作也就对应相关的事件
var TodoList = Backbone.Collection.extend({
    model: ToDo,
    localStorage: new Backbone.LocalStorage("todos-backbone"),
    getData: function(flag) {
        return this.where({
            done: flag
        });
    },
    done: function() {
        //返回已经执行过的数据
        return this.getData(true);
    },
    remaining: function() {
        return this.getData(false);
    },
    //下一个的索引值
    nextOrder: function() {
        //默认从1开始
        if (!this.length) {
            return 1;
        }
        //返回最后一个的order加1
        return this.last().get('order') + 1;
    },
    //集合根绝order进行排序
    comparator: 'order'
});

//TodoList 继承自Backbone.Collection
//TodoList已经具有Backbone.Collection所有的行为了，并且附加上了自己的一些行为
//等会这个集合的真删改就可以驱动试图变化，试图订阅集合的 添加 销毁 改变事件即可根据数据的变化试图做出对应的处理
var Todos = new TodoList();


//数据准备完毕，下面进行试图的拆分
//老规矩 试图从从Backbone.View继承，先把试图拆分成小块的，最后进行组装，这样有利于维护
//就行山地自行车一样，各个零件独立才开，最后组装起来，各自有各自的智能
//试图对应数据，创建这个试图对应这一个model。 model发生变化试图就做出对应的处理
var TodoView = Backbone.View.extend({
    //看源码可知道这是默认使用div进行包裹，这里改成li
    tagName: 'li',
    template: _.template($('#jq-itemview').html()),
    //事件配置，我写那个viewinit 借鉴了这里的设计，不过比这个更强大点点
    events: {
        "click :checkbox": "toggleDone",
        "dblclick label": "toEditItem",
        "click span.glyphicon-remove": "clear",
        "keypress .form-control": "updateOnEnter",
        "blur .form-control": "close"
    },
    initialize: function() {
        //监听model的改变
        this.listenTo(this.model, 'change', this.render);
        //监听model的销毁
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()))
            .addClass('list-group-item').find(':checkbox').prop('checked', this.model.get('done'));
        this.$input = this.$('.text');
        return this;
    },
    //切换是否已完成
    toggleDone: function() {
        this.model.toggle();
    },
    toEditItem: function() {
        this.$el.addClass('edit');
        this.$input.focus();
    },
    close: function() {
        var value = $.trim(this.$input.val());
        if (value) {
            this.model.save({
                title: value
            });
            this.$el.removeClass("edit");
            return;
        }
        this.clear();
    },
    updateOnEnter: function(e) {
        if (e.keyCode === 13) {
            this.close();
        }
    },
    clear: function() {
        this.model.destroy();
    }
});



var MainView = Backbone.View.extend({
    el: $('.todoapp'),
    statsTemplate: _.template($('#stats-template').html()),
    events: {
        "keypress #jq-input": "addItem",
        "click #jq-clear-completed": "clearCompleted",
        "click #jq-mark-complete": "toggleAllComplete"
    },
    initialize: function() {

        this.$input = this.$("#jq-input");
        this.$listGroup = this.$('#jq-list-group');

        this.allCheckbox = this.$("#jq-mark-complete")[0];

        //监听数据todos这个实例集合
        //由数据来驱动试图
        //一个数据变化可以通知到所有订阅了事件的试图
        this.listenTo(Todos, 'add', this.addOne);
        this.listenTo(Todos, 'reset', this.addAll);
        //发生任何变化都需要重新渲染一下
        this.listenTo(Todos, 'all', this.render);

        this.$footer = this.$('footer');
        this.$main = $('#main');

        //Todos.fetch();
    },
    addItem: function(e) {
        if (e.keyCode !== 13 || !$.trim(this.$input.val())) {
            return;
        }
        //调用集合创建，集合会通知订阅的了创建时间的所有试图，说我新添加的一条数据，然后试图收到通知做出处理
        Todos.create({
            title: this.$input.val()
        });
        //trigger ---->this.addOne --->new TodoView--->render
        this.$input.val('');
    },
    render: function() {
        var done = Todos.done().length;
        var remaining = Todos.remaining().length;

        //如果有数据需要显示对于区域
        if (Todos.length) {
            this.$main.show();

            this.$footer.html(this.statsTemplate({
                done: done,
                remaining: remaining
            }));
            //先加入dom再显示
            this.$footer.show();

        } else {
            //当然木有数据就需要隐藏他们
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },
    addOne: function(todo) {
        //创建一个试图实力，并且指定一个demo
        //不过页面这样做比如消耗更带的内存，每个小的试图就需要各种初始话，各种绑定事件
        //为了更好的可维护性，这个内存就牺牲掉了
        var view = new TodoView({
            model: todo
        });
        this.$listGroup.append(view.render().el);
    },
    addAll: function() {
        Todos.each(this.addOne, this);
    },
    clearCompleted: function() {
        _.invoke(Todos.done(), 'destroy');
        return false;
    },
    toggleAllComplete: function() {
        var done = this.allCheckbox.checked;
        Todos.each(function(todo) {
            todo.save({
                'done': done
            });
        });
    }
});

$(function() {
    var App = new MainView();
})
