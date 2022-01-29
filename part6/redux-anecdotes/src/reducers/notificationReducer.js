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

export const showNotification = (content) => {
    return {
        type: 'SHOW',
        data: content
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE'
    }
}

export default notificationReducer