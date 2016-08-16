
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { addTodo } from '../actions'

class AddTodo extends Component {
    render() {
        return (
            <div>
                <form className="form-inline"  onSubmit={e => {
                    e.preventDefault()
                } }>
                    <div className="form-group">
                        <input  className="form-control" ref="input"/>
                    </div>
                    <button type="submit"  className="btn btn-default" onClick={(e) => this.handleClick(e) }>
                        Add Todo
                    </button>
                </form>
            </div>
        )
    }
    handleClick(e) {
        e.preventDefault();
        const {dispatch} = this.props;
        const node = this.refs.input
        const text = node.value.trim();
        if (!text) {
            return;
        }
        dispatch(addTodo(text));
        node.value = ''
        node.focus();
    }
}


AddTodo = connect()(AddTodo)

export default AddTodo;