import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
	// 在createStore里面 enhancer(createStore)(reducer, preloadedState)
	// ...args ---> (reducer, preloadedState)
	return createStore => (...args) => {
		// 调用createStore
		// 此时会调用dispatch({type:init})
		const store = createStore(...args)
		let dispatch = () => {
			throw new Error(
				`Dispatching while constructing your middleware is not allowed. ` +
				`Other middleware would not be applied to this dispatch.`
			)
		}

		const middlewareAPI = {
			getState: store.getState,
			dispatch: (...args) => dispatch(...args)
		}

		// 所有middlewares 调用一次传递进去getState和dispatch，中间件里面能拿到getState和dispatch
		const chain = middlewares.map(middleware => middleware(middlewareAPI))

		// dispatch = f1(f2(f3(store.dispatch))))，一层包一层，这是洋葱模型，直到抛到最根上的store.dispatch
		// next(action) 最终会调用到store.dispatch(action)
		dispatch = compose(...chain)(store.dispatch)
		// 返回一个包装后的 dispatch
		return {
			...store,
			dispatch
		}
	}
}
