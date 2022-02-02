import React, { useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import Login from './components/Login'

import { setNotification } from './reducers/notificationReducer'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { checkUser, logout } from './reducers/loginReducer'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initBlogs())      
  }, [dispatch])

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()

    console.log('Logging out user', user.name )
    try {
      dispatch(logout)
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
        <Login />
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