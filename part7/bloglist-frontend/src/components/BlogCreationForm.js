import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { addBlog } from '../reducers/userReducer'

import { Form, Button } from 'react-bootstrap'


const BlogCreationForm =  React.forwardRef((props, ref) => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  BlogCreationForm.displayName = 'BlogCreationForm'

  const resetInputs = () => {
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  const handleCreate = (event) => {
    event.preventDefault()

    console.log('creating new blogpost ...', event.target)
    const newBlogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }

    try {
      dispatch(createBlog(newBlogObject))
      console.log('blog created')
      dispatch(setNotification(
        'Blog has been successfully created'
      ))
      // after creation functions
      resetInputs()
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(newBlogObject, JSON.parse(window.localStorage.getItem('loggedBlogappUser'))))
      
    } catch (exception) {
      console.log('adding new blog unsuccessful')
      dispatch(setNotification(
        'Error: blog could not be created'
      ))
    }
  }

  return (
    <Togglable
          buttonLabel='Create New Blog'
          buttonId='viewForm'
          ref={blogFormRef}
          >
      <div className='blogCreationDiv'>
        <h2>Create a new Blog</h2>
        <form onSubmit={handleCreate}>
          <div class='form-group'>
            <label for='blogTitle'>Title</label>
            <input
              id='blogTitle'
              type="text"
              value={blogTitle}
              name="Blogtitle"
              onChange={({ target }) => setBlogTitle(target.value)}
              class="form-control"
            />
          </div>
          <div class='form-group'>
            <label for='blogAuthor'>Author</label>
            <input
              id='blogAuthor'
              type="text"
              value={blogAuthor}
              name="Blogauthor"
              onChange={({ target }) => setBlogAuthor(target.value)}
              class="form-control"
            />
          </div>
          <div class='form-group'>
            <label for='blogUrl'>Url</label>
            <input
              id='blogUrl'
              type="text"
              value={blogUrl}
              name="BlogURL"
              onChange={({ target }) => setBlogUrl(target.value)}
              class="form-control"
            />
          </div>
          <Button id='submit' type="submit"> create </Button>
        </form>
      </div>
    </Togglable>
  )
})

export default BlogCreationForm