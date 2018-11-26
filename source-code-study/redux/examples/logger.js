const logger = ({ getState }) => {
	return next => {
		return action => {
			console.log('dispatching', action)
			const result = next(action)
			console.log('next state', getState())
			return result
		}
	}
}
