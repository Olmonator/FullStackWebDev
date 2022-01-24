import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Togglable from './components/Togglable'
import Expandable from './components/Expandable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [alertMessage, setAlertMessage] = useState(null)
 
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

  const handleCreate = async (event) => {
    event.preventDefault()

    console.log('creating new blogpost ...', event.target)
    const newBlogObject = {
      title: BlogCreationForm.blogTitle,
      author: BlogCreationForm.blogAuthor,
      url: BlogCreationForm.blogUrl,
      likes: 0
    }
    
    try {
      const savedBlog = await blogService.create(newBlogObject)

      BlogCreationForm.setBlogAuthor('')
      BlogCreationForm.setBlogTitle('')
      BlogCreationForm.setBlogUrl('')
      
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
  
  if ( user === null) {
    return (
      <div>
        <Notification message={alertMessage} />

        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
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
        
        <Togglable buttonLabel='Create New Blog'>
          <BlogCreationForm
            handleCreate={handleCreate}
          />
        </Togglable>
        
        {blogs.map(blog =>
          <Expandable 
            buttonLabel='view'
            title={blog.title}>
            <Blog key={blog.id} blog={blog} />
           </Expandable>
        )}
      </div>
    )
  }
}

export default App