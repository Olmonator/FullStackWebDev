import React from 'react'
import './../App.css'
import Expandable from './Expandable'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  
  const handleLike = (event) => {
    event.preventDefault()

    console.log('adding Like to blogpost ...')

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
  
        console.log('blog deleted')
      } catch (exception) {
        console.log('deleting blog unsuccessful')
        dispatch(setNotification(
          'Error: blog could not be deleted'
        ))
      }
    }
  }

  const likeId = blog.title + 'Like'

  return (
    <Expandable title={blog.title} author={blog.author} buttonLabel='view'>
      <div className='blog'>
        <p> {blog.title} by {blog.author} </p>
        <p> avaiable at {blog.url} </p>
        <p> likes {blog.likes} <button id={likeId} onClick={handleLike}>like</button> </p>
        <p> posted by {blog.user.name} </p>
        {blog.user.username === user.username && <button onClick={handleDelete}>delete</button>}
      </div>
    </Expandable>
  )
}

export default Blog