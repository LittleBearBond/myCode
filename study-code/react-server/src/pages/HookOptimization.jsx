import React, { memo, useState, useCallback, useMemo } from 'react'
/*
useEffect: 我们可以看到上面上一篇文章里面对useEffect的介绍：useEffect用于处理大多数副作用，其中的回调函数会在render执行之后在调用，确保不会阻止浏览器的渲染，这跟componentDidMount和componentDidUpdate是不一样的，他们会在渲染之后同步执行。
useLayoutEffect: 在大多数情况下，我们都可以使用useEffect处理副作用，但是，如果副作用是跟DOM相关的，就需要使用useLayoutEffect。useLayoutEffect中的副作用会在DOM更新之后同步执行。Î
*/
/* 使用useCallback, useMemo 进行渲染优化 */
const colors = ['black', '#f00', '#ff0']

export default function Demo() {
    const [num, setNum] = useState(0)
    const [name, setName] = useState('test')

    const hanleClick = useCallback(() => setNum(num === 2 ? 0 : num + 1), [num])

    const config = useMemo(() => ({
        num: `current num is ${num}`,
        name
    }), [num])

    return <div style={{ background: colors[num] }} >
        {num}
        <h1>{name}</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Child onClick={hanleClick} data={config} />
    </div>
}

const Child = memo(function ({ data, onClick }) {
    console.log(`child render`)
    return <div>
        <h1>{data.num}</h1>
        <h1>name: {data.name}</h1>
        <button onClick={onClick}> Click me  </button>
    </div>
})