import React, { useEffect } from 'react'
import {
  Switch, Route, useRouteMatch
} from "react-router-dom"

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import Login from './components/Login'
import UserView from './components/UserView'

import { setNotification } from './reducers/notificationReducer'

import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { checkUser, logout } from './reducers/loginReducer'
import userReducer, { getUsers } from './reducers/userReducer'
import UserList from './components/UserList'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const curUser = useSelector(state => state.login)
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

  const match = useRouteMatch('/notes/:id')  
  const user = match     
    ? users.find(user => user.id === Number(match.params.id))    
    : null

  const handleLogout = (event) => {
    event.preventDefault()

    console.log('Logging out curUser', curUser.name )
    try {
      dispatch(logout)
    } catch (exception) {
      dispatch(setNotification(
        `Error: ${curUser.name} could not be logged out`
      ))
    }
    dispatch(setNotification(
      `${curUser.name} has been successfully logged out`
    ))
  }

  // App rendering below
  if ( curUser === null) {
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
          <Route path="/">
            <h2> Blogs </h2>
            <p>
              {curUser.name} logged in
              <button onClick={handleLogout}> logout </button>
            </p>

            <BlogCreationForm />

            {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={curUser}
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