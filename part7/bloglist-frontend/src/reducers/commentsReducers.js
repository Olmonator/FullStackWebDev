const initialComments = [
    {blog_id: '61fbc845f57a964acc36f1a1', 
    contents:[
        {id: 0, text: "great post"}, 
        {id: 1, text: "amazing story"}
    ]}, 
    {blog_id: '61fbc873f57a964acc36f1a9', 
    contents: [
        {id: 2, text: "cool blog"},
        {id: 3, text: "lovely text"}
    ]}
]

const getNumberOfComments = (state) => {
    return state.map(blog => blog.contents.length).reduce((pre, cur) => pre + cur)
}

const commentsReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_COMMENTS':
      return action.data
    case 'ADD_COMMENT':
      const newContent = {text: action.contents, id: getNumberOfComments(state)}
      console.log('newcontent: ', newContent)
      const comments = state.find(comment => comment.blog_id === action.blog_id)
      if (comments) {
        const updatedContents = comments.contents.concat(newContent)
        const updatedComment = {... comments, contents: updatedContents}
        return state.map(comments => comments.blog_id !== action.blog_id ? comments : updatedComment)
      }
      console.log('Creating first comment for blog')
      const newComment = {
          blog_id: action.blog_id,
          contents: [newContent]
      }
      console.log('newcomment: ', newComment)
      return [...state, newComment] 
    default:
      return state
  }
}

export const addComment = (content, blog_id) => {
    // create Comment data structure
    return dispatch => {
        dispatch({
            type: 'ADD_COMMENT',
            contents: content,
            blog_id: blog_id
        })
    }
}

export const initComments = () => {
  return dispatch => {
    dispatch({
      type: 'INIT_COMMENTS',
      data: initialComments
    })
  }
}

export default commentsReducer