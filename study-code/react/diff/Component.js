import { renderComponent } from './ReactDOM'

class Component {
    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }
    setState(stateChange) {
        // 将修改合并到state
        Object.assign(this.state, stateChange);
        renderComponent(this);
    }
}
export {
    Component,
}

export default Component;