import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'


const Login = () => {
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

  return (
    <div>
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
}

export default Login