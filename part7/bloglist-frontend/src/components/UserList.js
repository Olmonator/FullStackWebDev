import React from 'react'
import User from './User'
import Menu from './Menu'
import { Table } from 'react-bootstrap'
const UserList = ({ users, user }) => {

  return (
    <div>
        <Menu user={user}/>
        <h2> Users </h2>
        <Table striped hover>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Blogs Created</td>
                </tr>
            </thead>
            <tbody>
                {users.map(user => 
                    <User key={user.id} user={user} />
                )}
            </tbody>
        </Table>
    </div>
  )
}

export default UserList