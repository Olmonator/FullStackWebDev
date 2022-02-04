import blogService from '../services/blogs'
import loginService from '../services/login'

import { setNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        case 'INIT':
            return action.data
        default:
            return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
            username, password
          })
          blogService.setToken(user.token)
          window.localStorage.setItem(
              'loggedBlogappUser', JSON.stringify(user)
          )
          dispatch({
              type: 'LOGIN',
              data: user
          })
        } catch (exception) {
            console.log('login failed')
            dispatch(setNotification(
              `Error: ${username} could not be logged in`
            ))
        }
    }
}

export const checkUser = () => {
    return dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'INIT',
                data: user
            })
        } 
    }
}

export const logout = () => {
    return dispatch => {
        console.log('flag')
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}


export default loginReducer