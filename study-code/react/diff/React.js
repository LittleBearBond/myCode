import Component from './Component'
function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

const React = {
    createElement,
    Component
}

export default React;