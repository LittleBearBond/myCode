
import Component from './Component'

function _render(vNode) {
    if (vNode === undefined || vNode === null || typeof vNode === 'boolean') {
        vNode = '';
    }
    if (typeof vNode === 'number') {
        vNode = String(vNode);
    }

    if (typeof vNode === 'string') {
        return document.createTextNode(vNode)
    }

    if (typeof vNode.tag === 'function') {
        const component = createComponent(vNode.tag, vNode.attrs);
        setComponentProps(component, vNode.attrs);
        return component.base;
    }

    if (!vNode.tag) {
        console.error('vNode tag is null')
        return null;
    }

    const el = document.createElement(vNode.tag)
    if (vNode.attrs) {
        for (let [name, value] of Object.entries(vNode.attrs)) {
            setAttribute(el, name, value)
        }
    }
    vNode.children.forEach(child => render(child, el))
    return el;
}

function render(vNode, container) {
    container.appendChild(_render(vNode))
}

function renderComponent(component) {
    let base;
    const renderer = component.render();

    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    base = _render(renderer);

    if (component.base) {
        if (component.componentDidUpdate) {
            component.componentDidUpdate();
        }
    } else if (component.componentDidMount) {
        component.componentDidMount();
    }

    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base);
    }

    component.base = base;
    base._component = component;
}

// 创建组件
function createComponent(component, props) {
    let inst;
    // 如果是类定义组件，则直接返回实例
    if (component.prototype && component.prototype.render) {
        inst = new component(props);
    } else {
        // 如果是函数定义组件，则将其扩展为类定义组件
        inst = new Component(props);
        inst.constructor = component;
        inst.render = function () {
            return this.constructor(props);
        }
    }
    return inst;
}

// set props
function setComponentProps(component, props) {

    if (!component.base) {
        if (component.componentWillMount) {
            component.componentWillMount();
        }
    } else if (component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }
    component.props = props;
    renderComponent(component);
}
function setAttribute(dom, name, value) {
    name = name.trim();
    // 如果属性名是className，则改回class
    if (name === 'className') {
        name = 'class';
    }

    // 如果属性名是onXXX，则是一个事件监听方法
    if (/on\w+/.test(name)) {
        name = name.toLowerCase();
        dom.addEventListener(name.replace(/on/, ''), value, false)
        // 如果属性名是style，则更新style对象
    } else if (name === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (value && typeof value === 'object') {
            for (let [name, val] of Object.entries(value)) {
                dom.style[name] = typeof val === 'number' ? val + 'px' : val;
            }
        }
        // 普通属性则直接更新属性
    } else {
        if (name in dom) {
            dom[name] = value || '';
        }
        dom[value ? 'setAttribute' : 'removeAttribute'](name, value);
    }
}

const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = '';
        return render(vnode, container);
    }
}

export {
    renderComponent
}
export default ReactDOM;