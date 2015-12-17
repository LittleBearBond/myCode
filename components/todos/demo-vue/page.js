/* @grunt-build */
/**
 * author           xj
 * @date            2015-12-16 13:08:00
 * @email           568915669@qq.com
 * @description
 */
(function() {
    'use strict';

    var filters = {
        all: function(todos) {
            return todos;
        },
        //没有完成的
        active: function(todos) {
            return todos.filter(function(todo) {
                return !todo.completed;
            });
        },
        //已经完成的
        completed: function(todos) {
            return todos.filter(function(todo) {
                return todo.completed;
            });
        }
    };

    window.vm = new Vue({
        //节点
        el: '.todoapp',
        //数据
        data: {
            todos: [],
            inputVal: '',
            editedTodo: null,
            visibility: 'all'
        },
        watch: {
            //监听对应对数据做出相应的处理
            todos: {
                handler: function(todos) {
                    //console.log(todos)
                },
                deep: true
            }
        },
        computed: {
            filteredTodos: function() {
                return filters[this.visibility](this.todos);
            },
            remaining: function() {
                return filters.active(this.todos).length;
            },
            completed: function() {
                return filters.completed(this.todos).length;
            },
            allDone: {
                get: function() {
                    return this.remaining === 0;
                },
                set: function(value) {
                    this.todos.forEach(function(todo) {
                        todo.completed = value;
                    });
                }
            }
        },
        methods: {
            addTodo: function() {
                var value = this.inputVal && this.inputVal.trim();
                if (!value) {
                    return;
                }
                this.todos.push({
                    title: value,
                    completed: false,
                    isEditing: false
                });
                this.inputVal = '';
            },
            //移除一个对象
            removeTodo: function(todo) {
                this.todos.$remove(todo);
            },
            removeCurrTodo: function(index) {
                this.todos.splice(index, 1);
            },
            //编辑
            editTodo: function(todo) {
                this.beforeEditCache = todo.title;
                todo.isEditing = true;
                //this.editedTodo = todo;
            },
            //保存
            saveEdit: function(todo) {
                /*if (!this.editedTodo) {
                    return;
                }*/
                todo.isEditing = false;
                todo.title = todo.title.trim();
                if (!todo.title) {
                    this.removeTodo(todo);
                }
            },
            cancelEdit: function(todo) {
                //this.editedTodo = null;
                todo.isEditing = false;
                todo.title = this.beforeEditCache;
            },
            //移除完成的
            removeCompleted: function() {
                this.todos = filters.active(this.todos);
            },
            reverseList: function() {
                this.todos = this.todos.reverse();
            },
            removeAll: function() {
                //这样写监听不到，界面不回刷新
                //this.todos.length = 0;
                this.todos = [];
            }
        },
        directives: {
            'todo-focus': function(value) {
                if (!value) {
                    return;
                }
                var el = this.el;
                Vue.nextTick(function() {
                    el.focus();
                });
            }
        }
    });
    console.log(vm)
}());
