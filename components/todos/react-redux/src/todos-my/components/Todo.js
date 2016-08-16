import React, { Component, PropTypes } from 'react'
import classNames from 'classnames';
export default class Todo extends Component {
    render() {
        return (
            <li className={classNames({
                'list-group-item': true,
                'edit': this.props.isEdit
            }) }
                data-id={this.props.id}
                onDoubleClick={this.props.onDoubleClick}
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none',
                    cursor: this.props.completed ? 'default' : 'pointer'
                }}>
                <div className="checkbox">
                    <input type="checkbox" defaultChecked={this.props.completed}  onClick={this.props.onClick} />
                    <label> {this.props.text} </label>
                    <span className="glyphicon glyphicon-remove" onClick={this.props.onRemove}></span>
                </div>
                <div className="input-group input-group-lg">
                    <input type="text" ref="editinput"  defaultValue={this.props.text} className="form-control" onKeyUp={e => {
                        if (e.keyCode !== 13) {
                            return;
                        }
                        let text = this.refs.editinput.value.trim();
                        this.props.onSaveEdit(text ? text : this.props.text);
                    } } />
                </div>
            </li>
        )
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onSaveEdit: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isEdit: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired
}