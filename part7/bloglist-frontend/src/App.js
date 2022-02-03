import React, { useEffect } from 'react'
import {
  Switch, Route
} from "react-router-dom"

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import Login from './components/Login'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

import { setNotification } from './reducers/notificationReducer'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { checkUser, logout } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import UserList from './components/UserList'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initBlogs())      
  }, [dispatch])

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  /*
  const match = useRouteMatch('/notes/:id')  
  const user = match     
    ? users.find(user => user.id === Number(match.params.id))    
    : null
  */
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
        <Switch>
          <Route path="/users/:id">
            <UserView users={users} />
          </Route>
          <Route path='/blogs/:id'>
            <BlogView blogs={blogs} user={user} />
          </Route>
          <Route path="/">
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

           <UserList users={users}/>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App