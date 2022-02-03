import React from 'react'

const User = ({ user }) => {

  return (
    <tr>
      <th>{user.name}</th>
      <th>{user.blogs.length}</th>
    </tr>
  )
}

export default User