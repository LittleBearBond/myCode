import React, { useEffect, useLayoutEffect, useState } from 'react'
/*
useEffect: 我们可以看到上面上一篇文章里面对useEffect的介绍：useEffect用于处理大多数副作用，其中的回调函数会在render执行之后在调用，确保不会阻止浏览器的渲染，这跟componentDidMount和componentDidUpdate是不一样的，他们会在渲染之后同步执行。
useLayoutEffect: 在大多数情况下，我们都可以使用useEffect处理副作用，但是，如果副作用是跟DOM相关的，就需要使用useLayoutEffect。useLayoutEffect中的副作用会在DOM更新之后同步执行。Î
*/
const colors = ['black', '#f00', '#000']
export default function EffectDemo() {
    const [num, setNum] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setNum(n => { return n === 2 ? 0 : n + 1 })
        }, 1000)
    }, 1000)
    useLayoutEffect(() => { console.log(num) })
    return <div style={{ background: colors[num] }} > {num} </div>
}