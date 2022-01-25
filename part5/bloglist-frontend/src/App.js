import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import Togglable from './components/Togglable'
import Expandable from './components/Expandable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [alertMessage, setAlertMessage] = useState(null)
 
  const blogFormRef = useRef()
  const blogFormInputRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ...', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('login sucessful')
    } catch (exception) {
      console.log('login failed')
      setAlertMessage(          
        `Error: ${username} could not be logged in`        
      )        
      setTimeout(() => {          
        setAlertMessage(null)        
      }, 5000)
    }
    setAlertMessage(          
      `${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name} has been successfully logged in`        
    )        
    setTimeout(() => {          
      setAlertMessage(null)        
    }, 5000)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('Logging out user', user.name )
    const name = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name
    try {
      window.localStorage.removeItem('loggedBlogappUser')
    //window.localStorage.clear()
    } catch (exception) {
      setAlertMessage(          
        `Error: ${user.name} could not be logged out`        
      )        
      setTimeout(() => {          
        setAlertMessage(null)        
      }, 5000)
    }
    setAlertMessage(          
      `${user.name} has been successfully logged out`        
    )        
    setTimeout(() => {          
      setAlertMessage(null)        
    }, 5000)
  }

  const createBlog = async (blog) => {
   
    try {
      const savedBlog = await blogService.create(blog)
      
      blogFormInputRef.current.resetInputs()
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(savedBlog))
      console.log('blog created', savedBlog)
      setAlertMessage(          
        `Blog has been successfully created`        
      )        
      setTimeout(() => {          
        setAlertMessage(null)        
      }, 5000)
    } catch (exception) {
      console.log('adding new blog unsuccessful')
      setAlertMessage(          
        `Error: blog could not be created`        
      )        
      setTimeout(() => {          
        setAlertMessage(null)        
      }, 5000)
    }
    
  }
  
  const likeBlog = async (blog) => {
    try {
      const savedBlog = await blogService.like(blog)
      
      setBlogs(blogs.filter(b => b.name === savedBlog.name))
      console.log('blog liked', savedBlog)
    } catch (exception) {
      console.log('liking blog unsuccessful')
      setAlertMessage(          
        `Error: blog could not be liked`        
      )        
      setTimeout(() => {          
        setAlertMessage(null)        
      }, 5000)
    }
  }

  const deleteBlog = async (id, user) => {
    try {
     await blogService.deleteBlog(id)
      
      setBlogs(blogs.filter(b => b.id !== id))
      console.log('blog deleted')
    } catch (exception) {
      console.log('deleting blog unsuccessful')
      setAlertMessage(          
        `Error: blog could not be deleted`        
      )        
      setTimeout(() => {          
        setAlertMessage(null)        
      }, 5000)
    }
  }
  if ( user === null) {
    return (
      <div>
        <Notification message={alertMessage} />

        <h2> Login Here </h2>
          <form onSubmit={handleLogin}>
          <div>
              username
              <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
              password
              <input
                  type="text"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
          </form>
      </div>
    )
  } else {
    return (
      <div>
        <Notification message={alertMessage} />
        <h2> Blogs </h2>
        <p>
          {user.name} logged in 
          <button onClick={handleLogout}> logout </button>
        </p>
        
        <Togglable 
          buttonLabel='Create New Blog' 
          ref={blogFormRef}>
          <BlogCreationForm
            createBlog={createBlog}
            ref={blogFormInputRef}
          />
        </Togglable>
        
        {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
          <Expandable 
            key={blog.id} 
            buttonLabel='view'
            title={blog.title}>
            <Blog 
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
           </Expandable>
        )}
      </div>
    )
  }
}

export default App