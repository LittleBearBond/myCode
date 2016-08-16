import {ADD_TODO, COMPLETE_TODO, REMOVE_TODO, DEIT_TODO, SAVE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters} from '../actions'
import { combineReducers } from 'redux'
const {SHOW_ALL} = VisibilityFilters;

const todo = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                completed: false,
                isEdit: false,
                text: action.text
            }
        case COMPLETE_TODO:
            return state.map(curr => {
                if (curr.id !== action.id) {
                    return curr;
                }
                return Object.assign({}, curr, {
                    completed: !curr.completed
                });
            });
        case DEIT_TODO:
        case SAVE_TODO:
            let isEdit = DEIT_TODO === action.type;
            return state.map(curr => {
                if (curr.id !== action.id) {
                    return curr;
                }
                let text = isEdit ? {} : { text: action.text };
                return Object.assign({}, curr, {
                    isEdit: isEdit
                }, text);
            });
        default:
            return state;
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(undefined, action)
            ]
        case COMPLETE_TODO:
        case DEIT_TODO:
        case SAVE_TODO:
            return todo(state, action)
        case REMOVE_TODO:
            return state.filter(item => {
                return item.id !== action.id
            });
        default:
            return state;
    }
}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp