import React from 'react'
import './../App.css'
import { useSelector } from 'react-redux'


const Notification = () => {
  const message = useSelector(state => state.notification )
    
  if (message === null) {
    return null
  } else {
    if (message.content.substring(0,5) === 'Error') {
      return (
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          {message.content}
        </div>
      )
    } else {
      return (
        <div class="alert alert-success" role="alert">
          {message.content}
        </div>
      )
    }
  }
}

export default Notification