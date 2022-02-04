import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import Menu from './Menu'

import { Form, Button } from 'react-bootstrap'


const Login = ({ user }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ...', username, password)
    try {
      dispatch(login(username, password))
   
      setUsername('')
      setPassword('')
      
      dispatch(setNotification(
        `${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name} has been successfully logged in`
      ))
    } catch (exception) {

    }

  }

  return (
    <div>
        <Menu user={user}/>

        <h2> Login Here </h2>
    <form onSubmit={handleLogin}>
      <div class='form-group'>
          <label for='username'>username</label>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          class="form-control"
        />
      </div>
      <div class='form-group'>
          <label for='password'>password</label>
        <input
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          class="form-control"
        />
      </div>
      <Button id="login-button" type="submit">login</Button>
    </form>
    </div>
  )
}

export default Login