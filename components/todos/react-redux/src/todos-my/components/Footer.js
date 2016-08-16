import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import {setVidibilityFilter, SET_VISIBILITY_FILTER, VisibilityFilters} from '../actions'
const {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} = VisibilityFilters

class Link extends Component {
    render() {
        const {active, filter, onFilterChange, children} = this.props;
        const style = {
            'marginRight': '10px',
        };
        if (active) {
            return <span  style={style} >{filter}</span>
        }
        return (
            <a href='javascript:'
                className="btn btn-default btn-sm"
                onClick={e => {
                    e.preventDefault()
                    onFilterChange(filter)
                } }
                style={style}
                >
                {children}
            </a>
        )
    }
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onFilterChange: PropTypes.func.isRequired
}

const FilterLink = connect(
    /*mapStateToProps,
    mapDispatchToProps*/
    (state, ownProps) => {
        return {
            active: ownProps.filter === state.visibilityFilter
        }
    }, (dispatch, ownProps) => {
        return {
            onFilterChange: () => {
                dispatch(setVidibilityFilter(ownProps.filter))
            }
        }
    }
)(Link)

export default class Footer extends Component {
    render() {
        const props = this.props;
        return (
            <footer>
                <FilterLink filter={SHOW_ALL} >
                    {SHOW_ALL}
                </FilterLink>
                <FilterLink filter={SHOW_COMPLETED} >
                    {SHOW_COMPLETED}
                </FilterLink>
                <FilterLink filter={SHOW_ACTIVE} >
                    {SHOW_ACTIVE}
                </FilterLink>
            </footer>
        )
    }
}

/*class Footer extends Component {
    renderFilter(filter, name) {
        const {dispatch} = this.props;
        if (filter === this.props.filter) {
            return filter;
        }
        return (
            <a href='#' filter={filter} onClick={e => {
                e.preventDefault()
                this.props.onFilterChange(filter)
            } }>
                {filter}
            </a>
        )
    }
    render() {
        return (
            <footer>
                Show:
                {' '}
                {this.renderFilter(SHOW_ALL) }
                {', '}
                {this.renderFilter(SHOW_COMPLETED) }
                {', '}
                {this.renderFilter(SHOW_ACTIVE) }
            </footer>
        )
    }
}

Footer.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
        SHOW_ALL,
        SHOW_COMPLETED,
        SHOW_ACTIVE
    ]).isRequired
}

Footer = connect()(Footer);
export default Footer;*/

