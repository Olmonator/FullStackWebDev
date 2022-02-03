import React from 'react'
import { Link } from "react-router-dom"
import './../App.css'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/userReducer'


const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const handleDelete = (event) => {
    event.preventDefault()
    console.log('deleteding post ...')
    if (window.confirm('Do you really want to delete this Blog?')) {
      try {
        dispatch(deleteBlog(blog.id ))
        console.log('blog deleted', blog)
        dispatch(removeBlog(blog, blog.user))
      } catch (exception) {
        console.log('deleting blog unsuccessful')
        dispatch(setNotification(
          'Error: blog could not be deleted'
        ))
      }
    }
  }

  return (
    <div className='blog'>
      <p> 
        <Link to={`blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} 
        {blog.user.username === user.username && <button onClick={handleDelete}>delete</button>}
      </p>
    </div>
  )
}

export default Blog