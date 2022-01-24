import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
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
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }
    
    try {
      const savedBlog = await blogService.create(newBlogObject)

      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
      
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

  // loginForm
  const loginForm = () => (
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
  )

  // blogsForm
  const blogForm = () => (
    <form onSubmit={handleCreate}>
      <div> 
        title:
          <input 
            type="text"
            value={blogTitle}
            name="Blogtitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
      </div>
      <div>
        author:
          <input 
            type="text"
            value={blogAuthor}
            name="Blogauthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
      </div>
      <div>
        url:
          <input 
            type="text"
            value={blogUrl}
            name="BlogURL"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
      </div>
      <button type="submit"> create </button>
    </form>
  )
  if ( user === null) {
    return (
      <div>
        <Notification message={alertMessage} />
        <h2>Log in to bloglists</h2>
        {loginForm()}
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
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App