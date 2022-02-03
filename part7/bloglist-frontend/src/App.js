import React, { useEffect } from 'react'
import {
  Switch, Route, Link
} from "react-router-dom"

import Notification from './components/Notification'
import Login from './components/Login'
import UserView from './components/UserView'
import UserList from './components/UserList'
import BlogView from './components/BlogView'
import BlogList from './components/BlogList'

import { setNotification } from './reducers/notificationReducer'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { checkUser, logout } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'


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

  const Menu = ({ user }) => {
    return (
      <div>
        <Link to={`blogs/`}>blogs</Link>
        <Link to={`users/`}>users</Link>

        {user.name} logged in
        <button onClick={handleLogout}> logout </button>

        <h2>blog app</h2>
      </div>
    )
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
          <Route path='/users'>
            <UserList users={users}/>
          </Route>
          <Route path='/blogs/:id'>
            <BlogView blogs={blogs} user={user} />
          </Route>s
          <Route path='/blogs'>
            <BlogList blogs={blogs} user={user} />
          </Route>
          <Route path="/">
            <Menu user={user}/>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App