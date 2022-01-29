const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data
        case 'HIDE':
            return null
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE'
            })
          }, time * 1000)
    }
}


export default notificationReducer