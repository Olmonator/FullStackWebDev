import userService from "../services/users"

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_USERS':
      return action.data
    case 'ADD_BLOG':
        const user = state.find(user => user.username === action.user.username)

        const newBlog = action.blog
        const newBlogs = user.blogs.concat(newBlog)
        const updatedUser = {...user, blogs: newBlogs}
        console.log('OldUser: ', user)
        console.log('newuser: ', updatedUser)
        return state.map(u =>
          u.id !== user.id ? u : updatedUser
        )
    case 'REMOVE_BLOG':
        console.log('deleteblog(): ', action.user)
        const userToUpdate = state.find(user => user.username === action.user.username)

        const nBlogs = userToUpdate.blogs.filter(blog => blog.id !== action.blog.id)
        const uUser = {...userToUpdate, blogs: nBlogs}
        console.log('OldUser: ', userToUpdate)
        console.log('newuser: ', uUser)
        return state.map(u =>
          u.id !== userToUpdate.id ? u : uUser
        )
    default: 
      return state
  }
}
export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log('USER_REDUCER: getUsers(): users:', users)
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export const addBlog = (blog, user) => {
    console.log('USER_REDUCER: addBlog(): user:', user)
    return async dispatch => {
      dispatch({
        type: 'ADD_BLOG',
        blog: blog,
        user: user
      })
  }
}

export const removeBlog = (blog, user) => {
    console.log('removeUser(): user: ', user)
    return async dispatch => {
    dispatch({
      type: 'REMOVE_BLOG',
      blog: blog,
      user: user
    })
  }
}

export default userReducer