import React from 'react'
import './../App.css'
import { useSelector } from 'react-redux'


const Notification = () => {
  const message = useSelector(state => state.notification )
    
  if (message === null) {
    return null
  } else {
    if (message.content.substring(0,5) === 'Error') {
      return <div className='error'>
        {message.content}
      </div>
    } else {
      return <div className='alert'>
        {message.content}
      </div>
    }
  }
}

export default Notification