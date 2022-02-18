import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('secret')

  
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.message)
    }
  })

  useEffect(() => {
    if ( result.data ) {      
      const token = result.data.login.value      
      setToken(token)      
      localStorage.setItem('user-token', token)    }
  }, [result.data]) // eslint-disable-line
  
  const submitLogin = (event) => {
    event.preventDefault()
    console.log(`loggin in with username: ${username} ...`)
    login({ variables:{ username, password }})

    setUsername('')
    setPassword('secret')
  }

  return (
    <form onSubmit={submitLogin}>
      <input
        value={username}
            onChange={({ target }) => setUsername(target.value)}
      />
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm