import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
        <h2> Users </h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Blogs Created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => 
                    <User key={user.id} user={user} />
                )}
            </tbody>
        </table>
    </div>
  )
}

export default UserList