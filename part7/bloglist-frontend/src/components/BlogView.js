import { useParams } from "react-router-dom"
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog } from '../reducers/userReducer'
import { useHistory } from "react-router-dom"

import CommentList from './CommentList'
import CommentCreationForm from './CommentCreationForm'
 
const BlogView = ({ blogs, user }) => {
    const id = useParams().id  

    const blog = blogs.find(b => {
        return b.id === id
    })

    const history = useHistory()
    const dispatch = useDispatch()
    
    const handleLike = (event) => {
        event.preventDefault()
    
        console.log('adding Like to blogpost ...', blog)
    
        const updatedBlogObject = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes += 1,
          id: blog.id
        }

        try {
          dispatch(likeBlog(updatedBlogObject))
          console.log('blog liked')
          dispatch(setNotification(
            `Blog liked`
          ))
        } catch (exception) {
          console.log('liking blog unsuccessful')
          dispatch(setNotification(
            'Error: blog could not be liked!'
          ))
        }
        
      }
    const handleDelete = (event) => {
        event.preventDefault()
        console.log('deleteding post ...')
        if (window.confirm('Do you really want to delete this Blog?')) {
            try {
                dispatch(deleteBlog(blog.id ))
                console.log('blog deleted', blog)
                dispatch(removeBlog(blog, blog.user))
                history.push('/')
            } catch (exception) {
                console.log('deleting blog unsuccessful')
                dispatch(setNotification(
                    'Error: blog could not be deleted'
                ))
            }
        }
    }
    if (!blog || !user) {
        console.log('Loading :', blog, user)

        return null  
    } else {
        const likeId = blog.title + 'Like'
        return (
            <div>
              <h2>{blog.title}</h2>
              <p> avaiable at {blog.url} </p>
              <p> likes {blog.likes} <button id={likeId} onClick={handleLike}>like</button> </p>
              <p> posted by {blog.user.name} </p>
              {blog.user.username === user.username && <button onClick={handleDelete}>delete</button>}
              <h3>Comments</h3>
              <CommentList blog_id={blog.id}/>
              <CommentCreationForm blog_id={blog.id}/>
            </div>
          )
    }
}

export default BlogView