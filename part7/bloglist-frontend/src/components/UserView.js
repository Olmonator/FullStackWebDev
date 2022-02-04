import { useParams } from "react-router-dom"
import Menu from './Menu'
import { Table } from 'react-bootstrap'

const UserView = ({ users }) => {
    console.log(users)
    const id = useParams().id  
    const user = users.find(n => n.id === id)
    if (!user) {
        console.log('User not found!:', user)
        return null  
    }
    return (
      <div>
        <Menu user={user}/>
        <h2>{user.name}</h2>
        <h4>added blogs</h4>
        <Table striped hover>
            <tbody>
              {user.blogs.map(blog => 
                  <tr key={blog.id}>
                    <td>{blog.title}</td>
                  </tr>
              )}
            </tbody>
        </Table>
      </div>
    )
}

export default UserView