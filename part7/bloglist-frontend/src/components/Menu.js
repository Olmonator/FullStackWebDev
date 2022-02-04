import { Navbar, Nav } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Link, useHistory } from "react-router-dom"
import { Button } from 'react-bootstrap'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

    const handleLogout = (event) => {
        event.preventDefault()
    
        console.log('Logging out', user.name )
        try {
          dispatch(logout())
        } catch (exception) {
          dispatch(setNotification(
            `Error: ${user.name} could not be logged out`
          ))
        }
        dispatch(setNotification(
          `${user.name} has been successfully logged out`
        ))
        history.push('/')
      }
    
    
    const padding = {
        padding: 10
      }
    
    return (
      /*
      <div>
        <Link to={`blogs/`}>blogs</Link>
        <Link to={`users/`}>users</Link>

        {user.name} logged in
        <button onClick={handleLogout}> logout </button>

        <h2>blog app</h2>
      </div>
      */  
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
              {user 
                ? <div>
                  <em style={padding}>{user.name} logged in</em>
                  <Button onClick={handleLogout}>logout</Button>
                </div>
                : <span>please login</span>
              }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }

export default Menu