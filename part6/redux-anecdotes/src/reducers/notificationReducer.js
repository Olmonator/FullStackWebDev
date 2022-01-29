const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW':
            if (state !== null) {
                clearTimeout(state.timeoutId)
            }
            return action.data
        case 'HIDE':
            return null
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => {
            dispatch({
                type: 'HIDE'
            })
        }, time * 1000)
        dispatch({
            type: 'SHOW',
            data: { content, timeoutId }
        })
    }
}


export default notificationReducer