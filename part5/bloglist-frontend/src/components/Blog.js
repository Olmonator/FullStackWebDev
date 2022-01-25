import React from 'react'
import './../App.css'

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
    if (window.confirm("Do you really want to delete this Blog?")) {
      deleteBlog(blog.id, blog.user)
    }    
  }

  return (
    <div className='blog'>
      {blog.title}
      <br></br>
      avaiable at {blog.url}
      <br></br>
      likes {blog.likes}
      <button onClick={handleLike}>like</button>
      <br></br>
      by {blog.author}
      <br></br>
      
      {blog.user.username === user.username && <button onClick={handleDelete}>delete</button>}
    </div> 
  ) 
}

export default Blog