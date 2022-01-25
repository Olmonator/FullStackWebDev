import React from 'react'
import './../App.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    if (message.substring(0,5) === 'Error') {
      return <div className='error'>
        {message}
      </div>
    } else {
      return <div className='alert'>
        {message}
      </div>
    }
  }
}

export default Notification