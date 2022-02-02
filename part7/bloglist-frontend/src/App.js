import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'

import { setNotification } from './reducers/notificationReducer'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initBlogs())      
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      dispatch(setNotification(
        `${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name} has been successfully logged in`
      ))
    } catch (exception) {
      console.log('login failed')
      dispatch(setNotification(
        `Error: ${username} could not be logged in`
      ))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('Logging out user', user.name )
    try {
      window.localStorage.removeItem('loggedBlogappUser')
    //window.localStorage.clear()
    } catch (exception) {
      dispatch(setNotification(
        `Error: ${user.name} could not be logged out`
      ))
    }
    dispatch(setNotification(
      `${user.name} has been successfully logged out`
    ))
  }

  // App rendering below
  if ( user === null) {
    return (
      <div>
        <Notification />

        <h2> Login Here </h2>
        <form onSubmit={handleLogin}>
          <div>
              username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
              password
            <input
              id="password"
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <h2> Blogs </h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}> logout </button>
        </p>

        <BlogCreationForm />

        {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        )}
      </div>
    )
  }
}

export default App