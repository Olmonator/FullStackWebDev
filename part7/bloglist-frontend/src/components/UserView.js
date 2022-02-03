import { useParams } from "react-router-dom"

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
        <h2>{user.name}</h2>
        <h4>added blogs</h4>
        <ul>
            {user.blogs.map(blog => 
                <li key={blog.id}>{blog.title}</li>
            )}
        </ul>
      </div>
    )
}

export default UserView