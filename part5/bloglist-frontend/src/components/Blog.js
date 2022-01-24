import React from 'react'
import './../App.css'

const Blog = ({blog}) => {


  return (
    <div className='blog'>
      {blog.title}
      <br></br>
      avaiable at {blog.url}
      <br></br>
      likes {blog.likes}
      <button>like</button>
      <br></br>
      by {blog.author}
    </div> 
  ) 
}

export default Blog