/**
 * @author xiongjian
 * @email xiongjian
 * @create date 2019-01-29 17:22:16
 * @modify date 2019-03-25 10:53:25
 * @desc [description]
 */
import React, {
    useState,
    useEffect,
    useCallback,
    useReducer
} from 'react';

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })
    return width
}
const useDocumentTitle = (title) => {
    // 只有当 title 的值发生变化时，才会重新执行`document.title`这一句
    useEffect(() => {
        document.title = title
    }, [title])
}

const useInput = (initValue) => {
    const [value, setValue] = useState(initValue);
    return {
        value,
        onChange: useCallback(function (event) {
            setValue(event.currentTarget.value);
        }, [])
    }
}

/*
// 计时器不准了，因为每次 count 变化时都会销毁并重新计时。
// 频繁 生成/销毁 定时器带来了一定性能负担
useEffect(() => {
    const id = setInterval(() => {
        setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
}, [count]);

// 想办法不依赖外部变量
useEffect(() => {
    const id = setInterval(() => {
        setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
}, []);

// componentDidUpdate  vs useEffect

componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage || // ✅ 更新后重新获取数据
      prevProps.query !== this.props.query
    ) {
      this.fetchResults();
    }
  }
useEffect(() => {
    function fetchResults() {
      const url = getFetchUrl();
      // 数据获取...
    }

    function getFetchUrl() {
      return (
        'http://myapi/results?query' + query +
        '&page=' + currentPage
      );
    }
    fetchResults();
  }, [currentPage, query]); // ✅ 更新后重新获取
*/

function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const [temp, setTemp] = React.useState(5);
    const name = useInput('xj');
    const surname = useInput('bear');

    const width = useWindowWidth()
    useDocumentTitle(name + ' ' + surname)

    const log = () => {
        setTimeout(() => {
            console.log('3 秒前 temp = 5，现在 temp =', temp);
        }, 3000);
    };

    return (<>
        <p> You clicked {count} times </p>
        <h1> window width {width} px </h1>
        <button onClick={() => setCount(count + 1)}> Click me </button>
        <div>
            <input {...name} />
        </div>
        <div> <input {...surname} /> </div>
        <div
            onClick={() => {
                log();
                setTemp(3);
                // 3 秒前 temp = 5，现在 temp = 5
            }}
        >
            test setTemp
    </div>
    </>);
}

const initState = { count: 0 }
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return initState;
        default:
            return state;
    }
};

export function UseStateTest() {
    const [state, dispatch] = useReducer(reducer, initState);
    return <div>
        <h1>{state.count}</h1>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
    </div>
}

export default Example
