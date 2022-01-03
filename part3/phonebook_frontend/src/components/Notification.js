import React from 'react' 
import './../App.css'

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    } else {
        if (type) {
            return <div className='alert'>
                {message}
            </div>
        } else {
            return <div className='error'>
                {message}
            </div>
        }
    }
}

export default Notification