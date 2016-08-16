/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const DEIT_TODO = 'DEIT_TODO';
export const SAVE_TODO = 'SAVE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
let id = 0;

export function addTodo(text) {
    return {
        type: ADD_TODO,
        id: id++,
        completed: false,
        isEdit: false,
        text,
    }
}

export function completeTodo(id) {
    return {
        type: COMPLETE_TODO,
        id
    }
}

export function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

export function editTodo(id) {
    return {
        type: DEIT_TODO,
        id
    }
}
export function saveTodo(id, text) {
    return {
        type: SAVE_TODO,
        text,
        id
    }
}

export function setVidibilityFilter(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}

/*
 * 其它的常量
 */
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};
