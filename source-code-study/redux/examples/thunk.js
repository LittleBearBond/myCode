
/**
 * @author xiongjian
 * @email xiongjian@xx.com
 * @create date 2018-11-26 10:29:19
 * @modify date 2018-11-26 10:29:28
 * @desc [description]
*/
function createThunkMiddleware(extraArgument) {
	//  在applyMiddleware里面  const chain = middlewares.map(middleware => middleware(middlewareAPI))
	//  第一次调用该函数，这里内部就能够拿到 dispatch getState
	return function (_ref) {
		var dispatch = _ref.dispatch,
			getState = _ref.getState;
		// 在compose里面，return funcs.reduce((a, b) => (...args) => a(b(...args)))
		return function (next) {
			return function (action) {
				// 当dispatch的action的一个function的时候，调用这个function 并且传入dispatch 和getState参数
				// 异步的action 当异步执行完成的时候，内部会再次调用dispatch 但是传入的参数是个object 这个时候这里就会调用next(action)
				if (typeof action === 'function') {
					return action(dispatch, getState, extraArgument);
				}
				return next(action);
			};
		};
	};
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
