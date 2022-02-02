const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW':
            if (state !== null) {
                clearTimeout(state.timeoutId)
                console.log('notification timer cleared')
            }
            return action.data
        case 'HIDE':
            return null
        default:
            return state
    }
}

export const setNotification = (content) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => {
            dispatch({
                type: 'HIDE'
            })
        }, 2000)
        dispatch({
            type: 'SHOW',
            data: { content, timeoutId }
        })
    }
}


export default notificationReducer