import React, { Component, PropTypes } from 'react'
import Todo from './Todo'


export default class Todos extends Component {
    render() {
        return (
            <ul className="list-group">
                {this.props.todos.map((todo, index) =>
                    <Todo {...todo}
                        key={todo.id}
                        onClick={() => this.props.onTodoClick(todo.id) }
                        onDoubleClick={() => this.props.onDoubleClick(todo.id) }
                        onRemove={() => this.props.onRemove(todo.id) }
                        onSaveEdit={(text) => this.props.onSaveEdit(todo.id, text) } />
                ) }
            </ul>
        )
    }
}

Todos.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onSaveEdit: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        isEdit: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired).isRequired
}