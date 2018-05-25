/**
 * @author 熊建
 * @email
 * @create date 2018-04-27 03:29:41
 * @modify date 2018-04-27 03:29:41
 * @desc [description]
 */
function createStore(state, stateChanger) {
    const listeners = []
    const subscribe = listenr => listeners.push(listenr)
    const getState = () => state
    const dispatch = (action) => {
        state = stateChanger(state, action)
        listeners.forEach(fn => fn())
    }
    dispatch({}) // 初始化 state
    return {
        subscribe,
        dispatch,
        getState
    }
}
