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
    useCallback
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

function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const name = useInput('xj');
    const surname = useInput('bear');

    const width = useWindowWidth()
    useDocumentTitle(name + ' ' + surname)

    return (<>
        <p> You clicked {count} times </p>
        <h1> window width {width} times </h1>
        <button onClick={() => setCount(count + 1)}> Click me </button>
        <div>
            <input {...name} />
        </div>
        <div> <input {...surname} /> </div>
    </>);
} export default Example
