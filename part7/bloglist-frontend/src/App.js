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
import Menu from './components/Menu'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { checkUser, logout } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import { initComments } from './reducers/commentsReducers'



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

  useEffect(() => {
    dispatch(initComments())
  }, [dispatch])

  // App rendering below
  if ( user === null) {
    return (
      <div className="container">
        <Notification />
        <Login />
      </div>
    )
  } else {
    return (
      <div className="container">
        <Notification />
        <Switch>
          <Route path="/users/:id">
            <UserView users={users} user={user}/>
          </Route>
          <Route path='/users'>
            <UserList users={users} user={user}/>
          </Route>
          <Route path='/blogs/:id'>
            <BlogView blogs={blogs} user={user} />
          </Route>s
          <Route path='/blogs'>
            <BlogList blogs={blogs} user={user} />
          </Route>
          <Route path="/">
            <div>
              <Menu user={user}/>
              <h2>Blog App</h2>
              {!user ? <Login user={user}/> : null}
            </div>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App