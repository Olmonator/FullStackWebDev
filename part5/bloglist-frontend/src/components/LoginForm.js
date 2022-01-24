import React from 'react'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
    return (
        <div>
            <h2> Login Here </h2>
            <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => handleUsernameChange(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="text"
                    value={password}
                    name="Password"
                    onChange={({ target }) => handlePasswordChange(target.value)}
                />
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm