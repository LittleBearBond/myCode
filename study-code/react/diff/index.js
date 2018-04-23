/**
 * @author 熊建
 * @email xiongjian@didichuxing.com
 * @create date 2018-04-23 11:11:55
 * @modify date 2018-04-23 11:11:55
 * @desc [description]
*/
//https://github.com/hujiulong/blog/issues/6
import ReactDOM from './ReactDOM'
import React from './React'

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }

    componentWillUpdate() {
        console.log('update');
    }

    componentWillMount() {
        console.log('mount');
    }

    onClick() {
        this.setState({ num: this.state.num + 1 });
    }

    render() {
        return (
            <div onClick={() => this.onClick()}>
                <h1>number: {this.state.num}</h1>
                <button>add</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Counter />,
    document.getElementById('root')
);


