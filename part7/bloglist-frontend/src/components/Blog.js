import React from 'react'
import './../App.css'
import Expandable from './Expandable'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
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
    likeBlog(updatedBlogObject)
  }
  const handleDelete = (event) => {
    event.preventDefault()
    console.log('deleteding post ...')
    if (window.confirm('Do you really want to delete this Blog?')) {
      deleteBlog(blog.id, blog.user)
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