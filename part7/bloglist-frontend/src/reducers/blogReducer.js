import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const id = action.data.id 
      const changedBlog = action.data
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    case 'DELETE_BLOG':
        const toDeleteId = action.data
        return state.filter(blog => {
            return blog.id !== toDeleteId
        })
    default: 
      return state
  }
}

export const createBlog = (content) => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
        dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
        })
    }
}

export const likeBlog = (blogToChange) => {  
  const changedBlog = {
    ...blogToChange, 
    likes: blogToChange.likes +1
  }
  return async dispatch => {
    const updatedBlog = await blogService.likeBlog(changedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        })
    }
}

export default blogReducer