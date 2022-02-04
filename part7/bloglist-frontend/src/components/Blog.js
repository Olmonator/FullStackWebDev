import React from 'react'
import { Link } from "react-router-dom"
import './../App.css'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/userReducer'

import { Button } from 'react-bootstrap'


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
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} 
      </td>
      <td>
        {blog.user.username === user.username && <Button onClick={handleDelete}>delete</Button>}
      </td>
    </tr>
  )
}

export default Blog